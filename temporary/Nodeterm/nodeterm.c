#define _POSIX_C_SOURCE 200809L

#include <ctype.h>
#include <dirent.h>
#include <errno.h>
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <time.h>
#include <unistd.h>

struct node_process
{
    pid_t pid;
    unsigned long long start_time;
    char state;
};

struct process_list
{
    struct node_process* items;
    size_t size;
    size_t capacity;
};

static bool parse_pid(const char* text, pid_t* pid)
{
    char* end = NULL;
    errno = 0;
    const long value = strtol(text, &end, 10);
    if (errno != 0 || end == text || *end != '\0' || value <= 1)
        return false;
    *pid = (pid_t)value;
    return true;
}

static bool exact_node_name(pid_t pid)
{
    char path[64];
    char name[64];
    FILE* file;

    if (snprintf(path, sizeof path, "/proc/%ld/comm", (long)pid) >= (int)sizeof path)
        return false;
    file = fopen(path, "r");
    if (!file)
        return false;
    if (!fgets(name, sizeof name, file)) {
        fclose(file);
        return false;
    }
    fclose(file);
    name[strcspn(name, "\r\n")] = '\0';
    return strcmp(name, "node") == 0;
}

static bool owned_by_current_user(pid_t pid)
{
    char path[64];
    struct stat status;
    if (snprintf(path, sizeof path, "/proc/%ld", (long)pid) >= (int)sizeof path)
        return false;
    return stat(path, &status) == 0 && status.st_uid == getuid();
}

static bool process_identity(pid_t pid, struct node_process* process)
{
    char path[64];
    char line[4096];
    char* close_name;
    char* field;
    char* context = NULL;
    FILE* file;
    int index = 0;

    if (snprintf(path, sizeof path, "/proc/%ld/stat", (long)pid) >= (int)sizeof path)
        return false;
    file = fopen(path, "r");
    if (!file)
        return false;
    if (!fgets(line, sizeof line, file)) {
        fclose(file);
        return false;
    }
    fclose(file);

    close_name = strrchr(line, ')');
    if (!close_name || close_name[1] != ' ')
        return false;

    field = strtok_r(close_name + 2, " ", &context);
    while (field) {
        if (index == 0)
            process->state = field[0];
        if (index == 19) {
            char* end = NULL;
            errno = 0;
            process->start_time = strtoull(field, &end, 10);
            if (errno != 0 || end == field || (*end != '\0' && *end != '\n'))
                return false;
            process->pid = pid;
            return true;
        }
        ++index;
        field = strtok_r(NULL, " ", &context);
    }
    return false;
}

static bool inspect_node(pid_t pid, struct node_process* process)
{
    return pid > 1 &&
           pid != getpid() &&
           owned_by_current_user(pid) &&
           exact_node_name(pid) &&
           process_identity(pid, process);
}

static bool same_node_process(const struct node_process* recorded)
{
    struct node_process current;
    return inspect_node(recorded->pid, &current) &&
           current.start_time == recorded->start_time &&
           current.state != 'Z' && current.state != 'X';
}

static bool list_add(struct process_list* list, struct node_process process)
{
    if (list->size == list->capacity) {
        const size_t capacity = list->capacity ? list->capacity * 2 : 8;
        void* allocation = realloc(list->items, capacity * sizeof *list->items);
        if (!allocation)
            return false;
        list->items = allocation;
        list->capacity = capacity;
    }
    list->items[list->size++] = process;
    return true;
}

static int compare_processes(const void* left, const void* right)
{
    const struct node_process* a = left;
    const struct node_process* b = right;
    return (a->pid > b->pid) - (a->pid < b->pid);
}

static bool numeric_name(const char* name)
{
    if (!*name)
        return false;
    while (*name) {
        if (!isdigit((unsigned char)*name++))
            return false;
    }
    return true;
}

static bool find_all_nodes(struct process_list* list)
{
    DIR* directory = opendir("/proc");
    struct dirent* entry;
    if (!directory)
        return false;

    for (;;) {
        pid_t pid;
        struct node_process process;
        errno = 0;
        entry = readdir(directory);
        if (!entry) {
            const int read_error = errno;
            closedir(directory);
            if (read_error != 0)
                return false;
            qsort(list->items, list->size, sizeof *list->items, compare_processes);
            return true;
        }
        if (!numeric_name(entry->d_name) || !parse_pid(entry->d_name, &pid))
            continue;
        if (inspect_node(pid, &process) && !list_add(list, process)) {
            closedir(directory);
            return false;
        }
    }
}

static void show_processes(const struct process_list* list)
{
    if (list->size == 0) {
        puts("No eligible Node.js processes found.");
        return;
    }
    puts("Eligible Node.js processes:");
    for (size_t index = 0; index < list->size; ++index)
        printf("  PID %ld | state %c\n",
               (long)list->items[index].pid,
               list->items[index].state);
}

static void wait_one_second(void)
{
    struct timespec remaining = {1, 0};
    while (nanosleep(&remaining, &remaining) != 0 && errno == EINTR) { }
}

static int terminate_nodes(struct process_list* list)
{
    size_t requested = 0;
    size_t forced = 0;
    size_t failed = 0;

    if (list->size == 0) {
        puts("No eligible Node.js processes found.");
        return 0;
    }

    puts("Requesting Node.js process termination:");
    for (size_t index = 0; index < list->size; ++index) {
        const struct node_process* process = &list->items[index];
        if (!same_node_process(process)) {
            printf("  PID %ld skipped: identity changed or process ended\n",
                   (long)process->pid);
            continue;
        }
        if (kill(process->pid, SIGTERM) == 0) {
            ++requested;
            printf("  PID %ld: SIGTERM\n", (long)process->pid);
        } else if (errno != ESRCH) {
            ++failed;
            printf("  PID %ld: SIGTERM failed: %s\n",
                   (long)process->pid, strerror(errno));
        }
    }

    if (requested)
        wait_one_second();

    for (size_t index = 0; index < list->size; ++index) {
        const struct node_process* process = &list->items[index];
        if (!same_node_process(process))
            continue;
        if (kill(process->pid, SIGKILL) == 0) {
            ++forced;
            printf("  PID %ld: SIGKILL\n", (long)process->pid);
        } else if (errno != ESRCH) {
            ++failed;
            printf("  PID %ld: SIGKILL failed: %s\n",
                   (long)process->pid, strerror(errno));
        }
    }

    printf("Node process termination complete: requested=%zu forced=%zu failed=%zu\n",
           requested, forced, failed);
    return failed ? 1 : 0;
}

static int select_one(struct process_list* destination, pid_t pid)
{
    struct node_process process;
    if (!inspect_node(pid, &process)) {
        fprintf(stderr,
                "nodeterm: PID %ld is not an eligible same-user Node.js process\n",
                (long)pid);
        return 1;
    }
    if (!list_add(destination, process)) {
        perror("nodeterm");
        return 1;
    }
    return 0;
}

static void usage(const char* program)
{
    fprintf(stderr,
            "usage:\n"
            "  %s\n"
            "  %s list\n"
            "  %s PID\n"
            "  %s all\n",
            program, program, program, program);
}

int main(int argc, char** argv)
{
    struct process_list all_nodes = {NULL, 0, 0};
    struct process_list selected = {NULL, 0, 0};
    int result = 0;

    if (argc > 2) {
        usage(argv[0]);
        return 1;
    }

    if (!find_all_nodes(&all_nodes)) {
        perror("nodeterm: cannot inspect /proc");
        return 1;
    }

    if (argc == 2 && strcmp(argv[1], "list") == 0) {
        show_processes(&all_nodes);
        free(all_nodes.items);
        return 0;
    }

    if (argc == 2 && strcmp(argv[1], "all") == 0) {
        selected = all_nodes;
        all_nodes.items = NULL;
        all_nodes.size = 0;
        all_nodes.capacity = 0;
    } else if (argc == 2) {
        pid_t pid;
        if (!parse_pid(argv[1], &pid)) {
            usage(argv[0]);
            result = 1;
            goto cleanup;
        }
        result = select_one(&selected, pid);
        if (result)
            goto cleanup;
    } else {
        char choice[64];
        show_processes(&all_nodes);
        if (all_nodes.size == 0)
            goto cleanup;
        printf("Enter one PID or 'all': ");
        fflush(stdout);
        if (!fgets(choice, sizeof choice, stdin)) {
            result = 1;
            goto cleanup;
        }
        choice[strcspn(choice, "\r\n")] = '\0';
        if (strcmp(choice, "all") == 0) {
            selected = all_nodes;
            all_nodes.items = NULL;
            all_nodes.size = 0;
            all_nodes.capacity = 0;
        } else {
            pid_t pid;
            if (!parse_pid(choice, &pid)) {
                fprintf(stderr, "nodeterm: invalid selection\n");
                result = 1;
                goto cleanup;
            }
            result = select_one(&selected, pid);
            if (result)
                goto cleanup;
        }
    }

    result = terminate_nodes(&selected);

cleanup:
    free(selected.items);
    free(all_nodes.items);
    return result;
}