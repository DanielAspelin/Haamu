#include <algorithm>
#include <atomic>
#include <cerrno>
#include <chrono>
#include <csignal>
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <string>
#include <thread>
#include <vector>

#include <fcntl.h>
#include <sys/file.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

namespace fs = std::filesystem;

namespace Ghostwait
{
    constexpr const char* daemon_pid_file = ".ghostwait.pid";
    constexpr const char* tasks_file = ".pid.tasks";
    constexpr const char* identity_file = ".pid.identity";
    constexpr const char* queue_file = ".pid.queue";
    constexpr const char* active_file = ".pid.active";
    constexpr const char* passive_file = ".pid.passive";
    constexpr const char* corrupted_file = ".pid.corrupted";
    constexpr const char* lifecycle_file = ".pid.lifecycle";
    constexpr const char* report_file = ".pid.report";
    constexpr std::chrono::milliseconds poll_interval {500};
    constexpr std::chrono::seconds termination_grace {3};

    struct Process
    {
        pid_t pid {};
        unsigned long long start_time {};
        char state {'?'};
        std::string name;
    };

    struct Termination
    {
        unsigned long long start_time {};
        std::chrono::steady_clock::time_point deadline;
        std::string reason;
    };

    inline std::atomic_bool running {true};
    inline std::map<pid_t, unsigned long long> identities;
    inline std::map<pid_t, Termination> termination_queue;

    void on_signal(int)
    {
        running = false;
    }

    bool parse_pid(const std::string& text, pid_t& pid)
    {
        try {
            std::size_t used = 0;
            const long long value = std::stoll(text, &used, 10);
            if (used != text.size() || value <= 1 || value > 4194304)
                return false;
            pid = static_cast<pid_t>(value);
            return true;
        } catch (...) {
            return false;
        }
    }

    std::map<pid_t, unsigned long long> read_pairs(const char* path)
    {
        std::map<pid_t, unsigned long long> pairs;
        std::ifstream input(path);
        std::string line;
        while (std::getline(input, line)) {
            const auto separator = line.find('=');
            if (separator == std::string::npos)
                continue;
            pid_t pid {};
            if (!parse_pid(line.substr(0, separator), pid))
                continue;
            try {
                std::size_t used = 0;
                const auto value = std::stoull(line.substr(separator + 1), &used, 10);
                if (used == line.size() - separator - 1)
                    pairs[pid] = value;
            } catch (...) { }
        }
        return pairs;
    }

    bool atomic_write(const char* path, const std::vector<std::string>& lines)
    {
        const std::string temporary = std::string(path) + ".tmp";
        {
            std::ofstream output(temporary, std::ios::trunc);
            if (!output)
                return false;
            for (const auto& line : lines)
                output << line << '\n';
            output.flush();
            if (!output)
                return false;
        }
        std::error_code error;
        fs::rename(temporary, path, error);
        if (error) {
            fs::remove(temporary);
            return false;
        }
        return true;
    }

    bool write_pairs(const char* path,
                     const std::map<pid_t, unsigned long long>& pairs)
    {
        std::vector<std::string> lines;
        for (const auto& [pid, value] : pairs)
            lines.push_back(std::to_string(pid) + "=" + std::to_string(value));
        return atomic_write(path, lines);
    }

    void log(const std::string& condition, pid_t pid, const std::string& detail)
    {
        const int descriptor = open(report_file, O_WRONLY | O_CREAT | O_APPEND, 0600);
        if (descriptor < 0)
            return;
        if (flock(descriptor, LOCK_EX) == 0) {
            const auto now = std::chrono::system_clock::to_time_t(
                std::chrono::system_clock::now()
            );
            const std::string line = std::to_string(static_cast<long long>(now)) +
                " " + condition + " PID=" + std::to_string(pid) + " " + detail + "\n";
            const ssize_t ignored = write(descriptor, line.data(), line.size());
            (void)ignored;
            (void)flock(descriptor, LOCK_UN);
        }
        close(descriptor);
    }

    bool inspect(pid_t pid, Process& process)
    {
        std::ifstream input("/proc/" + std::to_string(pid) + "/stat");
        std::string line;
        if (!input || !std::getline(input, line))
            return false;

        const auto open_name = line.find('(');
        const auto close_name = line.rfind(')');
        if (open_name == std::string::npos || close_name == std::string::npos ||
            close_name + 2 >= line.size())
            return false;

        process.pid = pid;
        process.name = line.substr(open_name + 1, close_name - open_name - 1);
        std::istringstream fields(line.substr(close_name + 2));
        fields >> process.state;
        std::string field;
        for (int number = 4; number <= 21; ++number)
            fields >> field;
        fields >> process.start_time;
        return static_cast<bool>(fields);
    }

    bool same_user(pid_t pid)
    {
        std::ifstream input("/proc/" + std::to_string(pid) + "/status");
        std::string label;
        while (input >> label) {
            if (label == "Uid:") {
                unsigned long real_uid {};
                input >> real_uid;
                return real_uid == static_cast<unsigned long>(getuid());
            }
            std::string remainder;
            std::getline(input, remainder);
        }
        return false;
    }

    bool protected_pid(pid_t pid)
    {
        return pid <= 1 || pid == getpid() || pid == getppid();
    }

    void refresh_tasks()
    {
        const auto requested = read_pairs(tasks_file);
        bool changed = false;
        for (const auto& [pid, enabled] : requested) {
            if (enabled != 1 || protected_pid(pid) || !same_user(pid))
                continue;
            Process process;
            if (!inspect(pid, process))
                continue;
            const auto existing = identities.find(pid);
            if (existing == identities.end()) {
                identities[pid] = process.start_time;
                log("TRACKED", pid, process.name);
                changed = true;
            } else if (existing->second != process.start_time) {
                log("PID_REUSE_REJECTED", pid, process.name);
            }
        }
        if (changed)
            (void)write_pairs(identity_file, identities);
    }

    std::map<pid_t, unsigned long long> consume_requests(const char* path)
    {
        const int descriptor = open(path, O_RDWR | O_CREAT, 0600);
        if (descriptor < 0)
            return {};
        std::map<pid_t, unsigned long long> result;
        if (flock(descriptor, LOCK_EX) == 0) {
            std::string content;
            char buffer[4096];
            (void)lseek(descriptor, 0, SEEK_SET);
            for (;;) {
                const ssize_t amount = read(descriptor, buffer, sizeof buffer);
                if (amount <= 0)
                    break;
                content.append(buffer, static_cast<std::size_t>(amount));
            }
            const int truncate_result = ftruncate(descriptor, 0);
            (void)truncate_result;
            (void)flock(descriptor, LOCK_UN);

            std::istringstream input(content);
            std::string line;
            while (std::getline(input, line)) {
                const auto separator = line.find('=');
                pid_t pid {};
                if (separator == std::string::npos ||
                    !parse_pid(line.substr(0, separator), pid))
                    continue;
                try {
                    result[pid] = std::stoull(line.substr(separator + 1));
                } catch (...) { }
            }
        }
        close(descriptor);
        return result;
    }

    void request_termination(pid_t pid, const std::string& reason)
    {
        const auto identity = identities.find(pid);
        Process process;
        if (identity == identities.end()) {
            log("REQUEST_REJECTED", pid, "not tracked");
            return;
        }
        if (protected_pid(pid) || !same_user(pid) || !inspect(pid, process) ||
            process.start_time != identity->second) {
            log("REQUEST_REJECTED", pid, "identity or ownership mismatch");
            return;
        }
        if (termination_queue.count(pid) != 0)
            return;
        if (kill(pid, SIGTERM) == 0) {
            termination_queue[pid] = {
                identity->second,
                std::chrono::steady_clock::now() + termination_grace,
                reason
            };
            log("SIGTERM", pid, reason);
        } else {
            log("SIGNAL_FAILED", pid, std::strerror(errno));
        }
    }

    void process_control_requests()
    {
        for (const auto& [pid, state] : consume_requests(lifecycle_file)) {
            if (state == 0)
                request_termination(pid, "lifecycle=0");
            else
                log("REQUEST_IGNORED", pid, "lifecycle must equal 0");
        }
        for (const auto& [pid, state] : consume_requests(corrupted_file)) {
            if (state == 1)
                request_termination(pid, "corrupted=1");
            else
                log("REQUEST_IGNORED", pid, "corrupted must equal 1");
        }
    }

    void advance_terminations()
    {
        const auto now = std::chrono::steady_clock::now();
        for (auto item = termination_queue.begin(); item != termination_queue.end();) {
            Process process;
            if (!inspect(item->first, process) || process.start_time != item->second.start_time ||
                process.state == 'Z' || process.state == 'X') {
                log("TERMINATED", item->first, item->second.reason);
                identities.erase(item->first);
                item = termination_queue.erase(item);
                continue;
            }
            if (now >= item->second.deadline) {
                if (same_user(item->first) && !protected_pid(item->first) &&
                    kill(item->first, SIGKILL) == 0)
                    log("SIGKILL", item->first, item->second.reason);
                else
                    log("SIGKILL_FAILED", item->first, std::strerror(errno));
                item = termination_queue.erase(item);
                continue;
            }
            ++item;
        }
        (void)write_pairs(identity_file, identities);
    }

    void publish_conditions()
    {
        std::vector<std::string> active;
        std::vector<std::string> passive;
        std::vector<std::string> queue;
        std::map<pid_t, unsigned long long> current_tasks;

        for (const auto& [pid, start_time] : identities) {
            Process process;
            if (inspect(pid, process) && process.start_time == start_time) {
                const std::string record = std::to_string(pid) + "=" + process.state;
                if (process.state == 'Z' || process.state == 'X')
                    passive.push_back(record);
                else
                    active.push_back(record);
                current_tasks[pid] = 1;
            } else {
                passive.push_back(std::to_string(pid) + "=missing");
            }
        }
        for (const auto& [pid, termination] : termination_queue)
            queue.push_back(std::to_string(pid) + "=" + termination.reason);

        (void)atomic_write(active_file, active);
        (void)atomic_write(passive_file, passive);
        (void)atomic_write(queue_file, queue);
        (void)write_pairs(tasks_file, current_tasks);
    }

    int daemon_loop(int ready_descriptor)
    {
        identities = read_pairs(identity_file);
        refresh_tasks();
        {
            Process self;
            if (!inspect(getpid(), self)) {
                std::cerr << "ghostwait: cannot inspect daemon identity\n";
                return 1;
            }
            std::ofstream pid_output(daemon_pid_file, std::ios::trunc);
            if (!pid_output) {
                std::cerr << "ghostwait: cannot write " << daemon_pid_file << '\n';
                return 1;
            }
            pid_output << getpid() << '=' << self.start_time << '\n';
        }

        const char ready = '1';
        const ssize_t ready_result = write(ready_descriptor, &ready, 1);
        close(ready_descriptor);
        if (ready_result != 1)
            return 1;

        const int null_descriptor = open("/dev/null", O_RDWR);
        if (null_descriptor >= 0) {
            (void)dup2(null_descriptor, STDIN_FILENO);
            (void)dup2(null_descriptor, STDOUT_FILENO);
            (void)dup2(null_descriptor, STDERR_FILENO);
            if (null_descriptor > STDERR_FILENO)
                close(null_descriptor);
        }

        std::signal(SIGTERM, on_signal);
        std::signal(SIGINT, on_signal);
        std::signal(SIGHUP, on_signal);

        while (running) {
            refresh_tasks();
            process_control_requests();
            advance_terminations();
            publish_conditions();
            std::this_thread::sleep_for(poll_interval);
        }

        publish_conditions();
        fs::remove(daemon_pid_file);
        return 0;
    }

    bool append_request(const char* path, pid_t pid, unsigned long long state)
    {
        const int descriptor = open(path, O_WRONLY | O_CREAT | O_APPEND, 0600);
        if (descriptor < 0)
            return false;
        bool success = false;
        if (flock(descriptor, LOCK_EX) == 0) {
            const std::string line = std::to_string(pid) + "=" +
                std::to_string(state) + "\n";
            success = write(descriptor, line.data(), line.size()) ==
                      static_cast<ssize_t>(line.size());
            (void)flock(descriptor, LOCK_UN);
        }
        close(descriptor);
        return success;
    }

    pid_t daemon_pid()
    {
        std::ifstream input(daemon_pid_file);
        std::string line;
        if (!std::getline(input, line))
            return -1;
        const auto separator = line.find('=');
        pid_t pid {};
        if (separator == std::string::npos || !parse_pid(line.substr(0, separator), pid))
            return -1;
        unsigned long long recorded_start {};
        try {
            recorded_start = std::stoull(line.substr(separator + 1));
        } catch (...) {
            return -1;
        }
        Process process;
        if (!same_user(pid) || !inspect(pid, process) ||
            process.start_time != recorded_start || process.name.find("ghostwait") == std::string::npos)
            return -1;
        return pid;
    }

    bool daemon_running()
    {
        const pid_t pid = daemon_pid();
        return pid > 1 && kill(pid, 0) == 0;
    }

    int start()
    {
        if (daemon_running()) {
            std::cerr << "ghostwait: already running\n";
            return 1;
        }
        int readiness[2];
        if (pipe(readiness) != 0)
            return 1;
        const pid_t child = fork();
        if (child < 0)
            return 1;
        if (child > 0) {
            close(readiness[1]);
            char ready = 0;
            const ssize_t amount = read(readiness[0], &ready, 1);
            close(readiness[0]);
            if (amount == 1 && ready == '1') {
                std::cout << "ghostwait started: " << child << '\n';
                return 0;
            }
            (void)waitpid(child, nullptr, 0);
            std::cerr << "ghostwait: start failed\n";
            return 1;
        }
        close(readiness[0]);
        if (setsid() < 0) {
            std::perror("ghostwait setsid");
            _exit(1);
        }
        _exit(daemon_loop(readiness[1]));
    }
}

static void usage(const char* program)
{
    std::cerr
        << "usage:\n"
        << "  " << program << " [start]\n"
        << "  " << program << " status\n"
        << "  " << program << " stop\n"
        << "  " << program << " track PID\n"
        << "  " << program << " end PID\n"
        << "  " << program << " corrupt PID\n"
        << "  " << program << " report\n";
}

int main(int argc, char** argv)
{
    const std::string command = argc > 1 ? argv[1] : "start";
    if ((argc == 1) || (argc == 2 && command == "start"))
        return Ghostwait::start();
    if (argc == 2 && command == "status") {
        if (Ghostwait::daemon_running()) {
            std::cout << "ghostwait running: " << Ghostwait::daemon_pid() << '\n';
            return 0;
        }
        std::cout << "ghostwait stopped\n";
        return 1;
    }
    if (argc == 2 && command == "stop") {
        const pid_t pid = Ghostwait::daemon_pid();
        if (pid <= 1 || kill(pid, SIGTERM) != 0) {
            std::cerr << "ghostwait: not running\n";
            return 1;
        }
        return 0;
    }
    if (argc == 2 && command == "report") {
        std::ifstream report(Ghostwait::report_file);
        std::cout << report.rdbuf();
        return report ? 0 : 1;
    }
    if (argc == 3 && (command == "track" || command == "end" || command == "corrupt")) {
        pid_t pid {};
        if (!Ghostwait::parse_pid(argv[2], pid)) {
            std::cerr << "ghostwait: invalid or protected PID\n";
            return 1;
        }
        const char* path = command == "track" ? Ghostwait::tasks_file :
                           command == "end" ? Ghostwait::lifecycle_file :
                                              Ghostwait::corrupted_file;
        const unsigned long long state = command == "end" ? 0 : 1;
        return Ghostwait::append_request(path, pid, state) ? 0 : 1;
    }
    usage(argv[0]);
    return 1;
}