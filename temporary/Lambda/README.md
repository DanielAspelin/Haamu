# lambda

`lambda` is a compact C++17 launcher that invokes one or more executable targets concurrently as fully detached processes. It reports each detached PID and then exits, immediately releasing the input terminal.

## Build

Release build:

```bash
g++ -std=c++17 -O2 -Wall -Wextra -Wpedantic lambda.cpp -o lambda
```

Strict validated build:

```bash
g++ -std=c++17 -O2 -Wall -Wextra -Wpedantic -Werror lambda.cpp -o lambda
```

Debug build:

```bash
g++ -std=c++17 -O0 -g3 -Wall -Wextra -Wpedantic lambda.cpp -o lambda
```

## Invoke one target

```bash
./lambda /full/path/to/program
```

Example:

```bash
./lambda /opt/valimo/service
```

Successful output:

```text
lambda detached: /opt/valimo/service -> PID 4101
lambda released 1 detached process
```

## Invoke several targets concurrently

```bash
./lambda program_1 program_2 program_3
```

Example:

```bash
./lambda ./http_service ./https_service ./runtime_monitor
```

All targets are started before `lambda` exits. They then continue independently and concurrently.

## Executable lookup

`lambda` uses `execvp()`. A target may therefore be:

- an explicit absolute path;
- a relative executable path;
- an executable name available through `$PATH`.

Examples:

```bash
./lambda /usr/local/bin/worker
./lambda ./worker
./lambda node
```

The target must be executable. Scripts require executable permission and a valid shebang:

```bash
chmod +x service.js
./lambda ./service.js
```

Example JavaScript shebang:

```javascript
#!/usr/bin/env node
```

## Detachment model

Each invocation follows this lifecycle:

1. Create a PID-reporting pipe.
2. Create an execution-error pipe.
3. Fork an intermediate child.
4. Create a new session with `setsid()`.
5. Fork the final detached process.
6. Let the intermediate process report the detached PID and exit.
7. Redirect the detached process's standard streams to `/dev/null`.
8. Replace the detached process with the requested executable through `execvp()`.
9. Let the original `lambda` process confirm startup and exit.

The second fork ensures that the final target is not a session leader and cannot accidentally reacquire a controlling terminal.

The resulting relationship is conceptually:

```text
terminal
  └── lambda launcher — exits

detached runtime
  ├── target_1
  ├── target_2
  └── target_3
```

No shell-level background operator is required:

```bash
./lambda ./target
```

Do not add these unless another supervisory layer specifically requires them:

```bash
&
nohup
disown
```

## Standard streams

Each detached target receives:

```text
stdin  -> /dev/null
stdout -> /dev/null
stderr -> /dev/null
```

The targets cannot occupy the invoking terminal or print into it. A target requiring logs should open its own log file, use a logging service, or publish state through another Valimo component.

## Startup confirmation

The error pipe is marked `FD_CLOEXEC`. This creates a compact execution handshake:

- successful `execvp()` automatically closes the pipe;
- failed setup or execution writes its `errno` value to the launcher;
- `lambda` reports a PID only after successful execution replacement is confirmed.

Example failure:

```text
lambda: invocation failed: ./missing_program: No such file or directory
lambda released 0 detached processes
```

## Concurrent behavior

The launcher confirms each `fork`/`exec` sequence in argument order, but it does not wait for a detached target to finish. Once launched, all successful targets execute concurrently.

`lambda` returns after startup confirmation, not after workload completion.

## Exit status

| Status | Meaning |
| --- | --- |
| `0` | Every requested target detached successfully |
| `1` | One or more requested targets failed to detach or execute |

If no targets are supplied, `lambda` prints usage information and returns successfully.

## Current limitations

The current interface treats every command-line argument as a separate executable target. It does not group additional arguments with a target.

This command starts two separate targets:

```bash
./lambda node index.js
```

It does not mean `node index.js`. To launch the script with this version, make the script directly executable:

```bash
chmod +x index.js
./lambda ./index.js
```

The current component also does not:

- wait for detached process completion;
- collect target exit codes;
- terminate targets;
- restart failed targets;
- create PID files;
- capture standard output or error;
- measure target uptime after release.

These responsibilities belong to a monitoring or lifecycle component rather than the detached launcher.

## Integration with ghostwait

`lambda` prints the actual detached PID:

```text
lambda detached: ./service -> PID 4101
```

That PID can be registered with `ghostwait`:

```bash
./ghostwait track 4101
```

The operational division is:

| Component | Responsibility |
| --- | --- |
| `lambda` | Create and detach executable processes |
| `ghostwait` | Monitor explicitly tracked process identities |
| `memstore` | Maintain typed runtime values |
| `softinit` | Publish machine and system specification values |

## Platform scope

`lambda` targets POSIX/Linux environments providing:

- `fork()`;
- `setsid()`;
- `pipe()`;
- `fcntl()`;
- `dup2()`;
- `execvp()`;
- `waitpid()`;
- `/dev/null`.

It is not directly portable to native Windows process APIs.

## Command summary

| Command | Operation |
| --- | --- |
| `./lambda file` | Detach one executable target |
| `./lambda file_1 file_2` | Detach several concurrent targets |
| `./lambda` | Display usage information |
