#include <algorithm>
#include <atomic>
#include <cerrno>
#include <charconv>
#include <csignal>
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <string>
#include <unordered_map>
#include <variant>
#include <vector>

#include <fcntl.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/un.h>
#include <sys/wait.h>
#include <unistd.h>

namespace fs = std::filesystem;

namespace Memstore
{
    using Value = std::variant<
        std::monostate,
        bool,
        std::int64_t,
        std::uint64_t,
        double,
        std::string
    >;

    using Entries = std::unordered_map<std::string, Value>;
    using Store = std::unordered_map<std::string, Entries>;

    inline Store memory;
    inline std::atomic_bool running {true};

    constexpr const char* socket_path = ".memstore.socket";
    constexpr const char* pid_path = ".memstore.pid";
    constexpr const char* store_path = "memstore.d";

    bool valid_name(const std::string& name)
    {
        if (name.empty())
            return false;
        return std::all_of(name.begin(), name.end(), [](unsigned char character) {
            return (character >= 'a' && character <= 'z') ||
                   (character >= 'A' && character <= 'Z') ||
                   (character >= '0' && character <= '9') ||
                   character == '_' || character == '-';
        });
    }

    std::string type_name(const Value& value)
    {
        static constexpr const char* names[] = {
            "null", "boolean", "integer", "unsigned", "double", "string"
        };
        return names[value.index()];
    }

    std::string value_text(const Value& value)
    {
        return std::visit([](const auto& item) -> std::string {
            using Type = std::decay_t<decltype(item)>;
            if constexpr (std::is_same_v<Type, std::monostate>) {
                return "null";
            } else if constexpr (std::is_same_v<Type, bool>) {
                return item ? "true" : "false";
            } else if constexpr (std::is_same_v<Type, double>) {
                std::ostringstream output;
                output << std::setprecision(std::numeric_limits<double>::max_digits10)
                       << item;
                return output.str();
            } else if constexpr (std::is_same_v<Type, std::string>) {
                return item;
            } else {
                return std::to_string(item);
            }
        }, value);
    }

    Value detect_value(const std::string& text)
    {
        if (text == "null")
            return std::monostate {};
        if (text == "true")
            return true;
        if (text == "false")
            return false;

        if (!text.empty() && text.front() == '-') {
            std::int64_t number {};
            const auto result = std::from_chars(
                text.data(), text.data() + text.size(), number
            );
            if (result.ec == std::errc {} && result.ptr == text.data() + text.size())
                return number;
        } else if (!text.empty()) {
            std::uint64_t number {};
            const auto result = std::from_chars(
                text.data(), text.data() + text.size(), number
            );
            if (result.ec == std::errc {} && result.ptr == text.data() + text.size()) {
                if (number <= static_cast<std::uint64_t>(
                                  std::numeric_limits<std::int64_t>::max()))
                    return static_cast<std::int64_t>(number);
                return number;
            }
        }

        if (text.find_first_of(".eE") != std::string::npos) {
            char* end = nullptr;
            errno = 0;
            const double number = std::strtod(text.c_str(), &end);
            if (errno == 0 && end == text.c_str() + text.size())
                return number;
        }

        return text;
    }

    Value typed_value(const std::string& type, const std::string& text)
    {
        if (type == "null")
            return std::monostate {};
        if (type == "boolean" && (text == "true" || text == "false"))
            return text == "true";
        if (type == "integer") {
            std::int64_t number {};
            const auto result = std::from_chars(text.data(), text.data() + text.size(), number);
            if (result.ec == std::errc {} && result.ptr == text.data() + text.size())
                return number;
        }
        if (type == "unsigned") {
            std::uint64_t number {};
            const auto result = std::from_chars(text.data(), text.data() + text.size(), number);
            if (result.ec == std::errc {} && result.ptr == text.data() + text.size())
                return number;
        }
        if (type == "double") {
            char* end = nullptr;
            errno = 0;
            const double number = std::strtod(text.c_str(), &end);
            if (errno == 0 && end == text.c_str() + text.size())
                return number;
        }
        if (type == "string")
            return text;
        return detect_value(text);
    }

    bool atomic_write(const fs::path& path, const std::string& value)
    {
        const fs::path temporary = path.string() + ".tmp";
        {
            std::ofstream output(temporary, std::ios::trunc);
            if (!output)
                return false;
            output << value << '\n';
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

    bool export_store()
    {
        std::error_code error;
        fs::create_directories(store_path, error);
        if (error)
            return false;

        bool success = true;
        for (const auto& [group, entries] : memory) {
            for (const auto& [entry, value] : entries) {
                const fs::path base = fs::path(store_path) / ("." + group + "." + entry);
                success = atomic_write(base, value_text(value)) && success;
                success = atomic_write(base.string() + ".type", type_name(value)) && success;
            }
        }
        return success;
    }

    std::string read_line(const fs::path& path)
    {
        std::ifstream input(path);
        std::string line;
        if (input)
            std::getline(input, line);
        return line;
    }

    void load_store()
    {
        std::error_code error;
        if (!fs::is_directory(store_path, error))
            return;

        for (const auto& item : fs::directory_iterator(store_path, error)) {
            if (error || !item.is_regular_file())
                continue;
            const std::string filename = item.path().filename().string();
            const bool type_file = filename.size() > 5 &&
                filename.compare(filename.size() - 5, 5, ".type") == 0;
            if (filename.empty() || filename.front() != '.' || type_file)
                continue;

            const std::size_t separator = filename.find('.', 1);
            if (separator == std::string::npos)
                continue;
            const std::string group = filename.substr(1, separator - 1);
            const std::string entry = filename.substr(separator + 1);
            if (!valid_name(group) || !valid_name(entry))
                continue;

            const std::string text = read_line(item.path());
            const std::string type = read_line(item.path().string() + ".type");
            memory[group][entry] = typed_value(type, text);
        }
    }

    std::vector<std::string> fields(const std::string& request)
    {
        std::vector<std::string> result;
        std::size_t begin = 0;
        for (;;) {
            const std::size_t end = request.find('\t', begin);
            result.push_back(request.substr(begin, end - begin));
            if (end == std::string::npos)
                break;
            begin = end + 1;
        }
        return result;
    }

    std::string format_entry(const std::string& group,
                             const std::string& entry,
                             const Value& value)
    {
        return group + " " + entry + " " + type_name(value) + " " + value_text(value);
    }

    std::string output_selection(const std::string& group,
                                 const std::string& entry)
    {
        std::vector<std::string> lines;
        for (const auto& [stored_group, entries] : memory) {
            if (group != "all" && stored_group != group)
                continue;
            for (const auto& [stored_entry, value] : entries) {
                if (!entry.empty() && stored_entry != entry)
                    continue;
                lines.push_back(format_entry(stored_group, stored_entry, value));
            }
        }
        std::sort(lines.begin(), lines.end());
        if (lines.empty())
            return "ERR\tnot found\n";

        std::string response = "OK\n";
        for (const auto& line : lines)
            response += line + '\n';
        return response;
    }

    std::string process_request(const std::string& request)
    {
        const auto part = fields(request);
        if (part.empty())
            return "ERR\tempty request\n";

        if (part[0] == "SET" && part.size() == 4) {
            if (!valid_name(part[1]) || !valid_name(part[2]))
                return "ERR\tinvalid group or entry name\n";
            memory[part[1]][part[2]] = detect_value(part[3]);
            return "OK\t" + type_name(memory[part[1]][part[2]]) + "\n";
        }
        if (part[0] == "GET" && part.size() == 3)
            return output_selection(part[1], part[2]);
        if (part[0] == "OUTPUT" && (part.size() == 2 || part.size() == 3))
            return output_selection(part[1], part.size() == 3 ? part[2] : "");
        if (part[0] == "STOP" && part.size() == 1) {
            const bool saved = export_store();
            running = false;
            return saved ? "OK\tstored and stopped\n" :
                           "ERR\tstorage export failed\n";
        }
        if (part[0] == "PING" && part.size() == 1)
            return "OK\trunning\n";
        return "ERR\tinvalid command\n";
    }

    bool send_all(int descriptor, const std::string& data)
    {
        std::size_t sent = 0;
        while (sent < data.size()) {
            const ssize_t amount = send(descriptor, data.data() + sent,
                                        data.size() - sent, MSG_NOSIGNAL);
            if (amount <= 0)
                return false;
            sent += static_cast<std::size_t>(amount);
        }
        return true;
    }

    std::string receive_all(int descriptor)
    {
        std::string data;
        char buffer[4096];
        for (;;) {
            const ssize_t amount = recv(descriptor, buffer, sizeof buffer, 0);
            if (amount < 0) {
                if (errno == EINTR)
                    continue;
                return {};
            }
            if (amount == 0)
                break;
            data.append(buffer, static_cast<std::size_t>(amount));
            if (data.size() > 1024 * 1024)
                return {};
        }
        if (!data.empty() && data.back() == '\n')
            data.pop_back();
        return data;
    }

    int connect_socket()
    {
        const int descriptor = socket(AF_UNIX, SOCK_STREAM, 0);
        if (descriptor < 0)
            return -1;
        sockaddr_un address {};
        address.sun_family = AF_UNIX;
        std::strncpy(address.sun_path, socket_path, sizeof address.sun_path - 1);
        if (connect(descriptor, reinterpret_cast<sockaddr*>(&address),
                    sizeof address) != 0) {
            close(descriptor);
            return -1;
        }
        return descriptor;
    }

    int client(const std::string& request, bool quiet = false)
    {
        const int descriptor = connect_socket();
        if (descriptor < 0) {
            if (!quiet)
                std::cerr << "memstore: service is not running\n";
            return 1;
        }
        if (!send_all(descriptor, request + "\n")) {
            close(descriptor);
            return 1;
        }
        shutdown(descriptor, SHUT_WR);
        const std::string response = receive_all(descriptor);
        close(descriptor);

        if (response.rfind("OK\n", 0) == 0)
            std::cout << response.substr(3) << '\n';
        else if (response.rfind("OK\t", 0) == 0)
            std::cout << response.substr(3) << '\n';
        else if (!quiet)
            std::cerr << "memstore: "
                      << (response.rfind("ERR\t", 0) == 0 ? response.substr(4) : response)
                      << '\n';
        return response.rfind("OK", 0) == 0 ? 0 : 1;
    }

    void signal_handler(int)
    {
        running = false;
    }

    int server(int ready_descriptor)
    {
        const int descriptor = socket(AF_UNIX, SOCK_STREAM, 0);
        if (descriptor < 0) {
            std::perror("memstore socket");
            return 1;
        }

        unlink(socket_path);
        sockaddr_un address {};
        address.sun_family = AF_UNIX;
        std::strncpy(address.sun_path, socket_path, sizeof address.sun_path - 1);
        if (bind(descriptor, reinterpret_cast<sockaddr*>(&address), sizeof address) != 0 ||
            chmod(socket_path, 0600) != 0 || listen(descriptor, 16) != 0) {
            std::perror("memstore service socket");
            close(descriptor);
            unlink(socket_path);
            return 1;
        }

        {
            std::ofstream pid(pid_path, std::ios::trunc);
            if (!pid) {
                std::cerr << "memstore: cannot write " << pid_path << '\n';
                close(descriptor);
                unlink(socket_path);
                return 1;
            }
            pid << getpid() << '\n';
        }

        load_store();
        const char ready = '1';
        const ssize_t ready_result = write(ready_descriptor, &ready, 1);
        close(ready_descriptor);
        if (ready_result != 1) {
            close(descriptor);
            unlink(socket_path);
            unlink(pid_path);
            return 1;
        }

        const int null_descriptor = open("/dev/null", O_RDWR);
        if (null_descriptor >= 0) {
            (void)dup2(null_descriptor, STDIN_FILENO);
            (void)dup2(null_descriptor, STDOUT_FILENO);
            (void)dup2(null_descriptor, STDERR_FILENO);
            if (null_descriptor > STDERR_FILENO)
                close(null_descriptor);
        }

        std::signal(SIGTERM, signal_handler);
        std::signal(SIGINT, signal_handler);
        std::signal(SIGHUP, signal_handler);
        std::signal(SIGPIPE, SIG_IGN);

        while (running) {
            const int connection = accept(descriptor, nullptr, nullptr);
            if (connection < 0) {
                if (errno == EINTR)
                    continue;
                break;
            }
            const std::string request = receive_all(connection);
            const std::string response = request.empty() ?
                "ERR\tempty request\n" : process_request(request);
            (void)send_all(connection, response);
            close(connection);
        }

        if (!running)
            (void)export_store();
        close(descriptor);
        unlink(socket_path);
        unlink(pid_path);
        return 0;
    }

    int start()
    {
        if (client("PING", true) == 0) {
            std::cerr << "memstore: service is already running\n";
            return 1;
        }

        int readiness[2];
        if (pipe(readiness) != 0) {
            std::perror("memstore");
            return 1;
        }

        const pid_t child = fork();
        if (child < 0) {
            std::perror("memstore");
            return 1;
        }
        if (child > 0) {
            close(readiness[1]);
            char ready = 0;
            const ssize_t amount = read(readiness[0], &ready, 1);
            close(readiness[0]);
            if (amount == 1 && ready == '1') {
                std::cout << "memstore started: " << child << '\n';
                return 0;
            }
            (void)waitpid(child, nullptr, 0);
            std::cerr << "memstore: start failed\n";
            return 1;
        }

        close(readiness[0]);
        if (setsid() < 0)
            _exit(1);
        const int status = server(readiness[1]);
        _exit(status);
    }
}

static void usage(const char* program)
{
    std::cerr
        << "usage:\n"
        << "  " << program << " start\n"
        << "  " << program << " <group> <entry> <value>\n"
        << "  " << program << " <group> <entry>\n"
        << "  " << program << " output all\n"
        << "  " << program << " output <group> [entry]\n"
        << "  " << program << " stop\n";
}

int main(int argc, char** argv)
{
    if (argc == 2 && std::string(argv[1]) == "start")
        return Memstore::start();
    if (argc == 2 && std::string(argv[1]) == "stop")
        return Memstore::client("STOP");

    if (argc >= 3 && std::string(argv[1]) == "output") {
        if (argc > 4) {
            usage(argv[0]);
            return 1;
        }
        std::string request = "OUTPUT\t" + std::string(argv[2]);
        if (argc == 4)
            request += "\t" + std::string(argv[3]);
        return Memstore::client(request);
    }

    if (argc == 3) {
        return Memstore::client(
            "GET\t" + std::string(argv[1]) + "\t" + argv[2]
        );
    }

    if (argc >= 4) {
        std::string value = argv[3];
        for (int index = 4; index < argc; ++index)
            value += " " + std::string(argv[index]);
        if (value.find_first_of("\t\r\n") != std::string::npos) {
            std::cerr << "memstore: values cannot contain tabs or newlines\n";
            return 1;
        }
        return Memstore::client(
            "SET\t" + std::string(argv[1]) + "\t" + argv[2] + "\t" + value
        );
    }

    usage(argv[0]);
    return 1;
}