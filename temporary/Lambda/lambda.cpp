#define _POSIX_C_SOURCE 200809L

#include <cerrno>
#include <cstring>
#include <fcntl.h>
#include <iostream>
#include <string>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <vector>

struct invocation
{
    std::string target;
    pid_t process_id {-1};
};

static bool write_exact(int descriptor, const void* data, std::size_t size)
{
    const char* bytes = static_cast<const char*>(data);
    std::size_t written = 0;

    while (written < size) {
        const ssize_t amount = write(descriptor, bytes + written, size - written);
        if (amount < 0 && errno == EINTR)
            continue;
        if (amount <= 0)
            return false;
        written += static_cast<std::size_t>(amount);
    }
    return true;
}

static bool read_exact(int descriptor, void* data, std::size_t size)
{
    char* bytes = static_cast<char*>(data);
    std::size_t received = 0;

    while (received < size) {
        const ssize_t amount = read(descriptor, bytes + received, size - received);
        if (amount < 0 && errno == EINTR)
            continue;
        if (amount <= 0)
            return false;
        received += static_cast<std::size_t>(amount);
    }
    return true;
}

static void report_child_error(int descriptor, int error_number)
{
    (void)write_exact(descriptor, &error_number, sizeof error_number);
}

static pid_t invoke_detached(const std::string& target)
{
    int process_pipe[2] {-1, -1};
    int error_pipe[2] {-1, -1};

    if (pipe(process_pipe) != 0 || pipe(error_pipe) != 0) {
        const int error_number = errno;
        if (process_pipe[0] >= 0) close(process_pipe[0]);
        if (process_pipe[1] >= 0) close(process_pipe[1]);
        if (error_pipe[0] >= 0) close(error_pipe[0]);
        if (error_pipe[1] >= 0) close(error_pipe[1]);
        errno = error_number;
        return -1;
    }

    if (fcntl(error_pipe[1], F_SETFD, FD_CLOEXEC) == -1) {
        const int error_number = errno;
        close(process_pipe[0]);
        close(process_pipe[1]);
        close(error_pipe[0]);
        close(error_pipe[1]);
        errno = error_number;
        return -1;
    }

    const pid_t first_child = fork();
    if (first_child < 0) {
        const int error_number = errno;
        close(process_pipe[0]);
        close(process_pipe[1]);
        close(error_pipe[0]);
        close(error_pipe[1]);
        errno = error_number;
        return -1;
    }

    if (first_child == 0) {
        close(process_pipe[0]);
        close(error_pipe[0]);

        if (setsid() < 0) {
            report_child_error(error_pipe[1], errno);
            _exit(126);
        }

        const pid_t detached_child = fork();
        if (detached_child < 0) {
            report_child_error(error_pipe[1], errno);
            _exit(126);
        }

        if (detached_child > 0) {
            (void)write_exact(
                process_pipe[1],
                &detached_child,
                sizeof detached_child
            );
            close(process_pipe[1]);
            close(error_pipe[1]);
            _exit(0);
        }

        close(process_pipe[1]);

        const int null_descriptor = open("/dev/null", O_RDWR);
        if (null_descriptor < 0 ||
            dup2(null_descriptor, STDIN_FILENO) < 0 ||
            dup2(null_descriptor, STDOUT_FILENO) < 0 ||
            dup2(null_descriptor, STDERR_FILENO) < 0) {
            report_child_error(error_pipe[1], errno);
            _exit(126);
        }

        if (null_descriptor > STDERR_FILENO)
            close(null_descriptor);

        char* const arguments[] = {
            const_cast<char*>(target.c_str()),
            nullptr
        };

        execvp(arguments[0], arguments);

        report_child_error(error_pipe[1], errno);
        _exit(127);
    }

    close(process_pipe[1]);
    close(error_pipe[1]);

    pid_t detached_process_id {-1};
    const bool received_process_id = read_exact(
        process_pipe[0],
        &detached_process_id,
        sizeof detached_process_id
    );
    close(process_pipe[0]);

    int intermediate_status = 0;
    while (waitpid(first_child, &intermediate_status, 0) < 0) {
        if (errno != EINTR)
            break;
    }

    int execution_error = 0;
    ssize_t error_size;
    do {
        error_size = read(error_pipe[0], &execution_error, sizeof execution_error);
    } while (error_size < 0 && errno == EINTR);
    close(error_pipe[0]);

    if (!received_process_id || detached_process_id <= 0) {
        errno = error_size == static_cast<ssize_t>(sizeof execution_error)
            ? execution_error
            : ECHILD;
        return -1;
    }

    if (error_size == static_cast<ssize_t>(sizeof execution_error)) {
        errno = execution_error;
        return -1;
    }

    if (error_size < 0)
        return -1;

    return detached_process_id;
}

int main(int argument_count, char* arguments[])
{
    if (argument_count < 2) {
        std::cout
            << "usage:\n"
            << "  ./lambda file\n"
            << "  ./lambda file_1 file_2 file_3\n";
        return 0;
    }

    std::vector<invocation> invocations;
    bool failed = false;

    for (int argument = 1; argument < argument_count; ++argument) {
        invocation current;
        current.target = arguments[argument];
        current.process_id = invoke_detached(current.target);

        if (current.process_id < 0) {
            failed = true;
            std::cerr
                << "lambda: invocation failed: "
                << current.target
                << ": "
                << std::strerror(errno)
                << '\n';
            continue;
        }

        invocations.push_back(current);

        std::cout
            << "lambda detached: "
            << current.target
            << " -> PID "
            << current.process_id
            << '\n';
    }

    std::cout
        << "lambda released "
        << invocations.size()
        << " detached process"
        << (invocations.size() == 1 ? "" : "es")
        << '\n';

    return failed ? 1 : 0;
}