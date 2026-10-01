# nodeterm

`nodeterm` is a Linux-specific C utility for listing and terminating Node.js processes owned by the invoking user. It can operate interactively, terminate one explicitly selected Node process, or terminate every eligible Node process.

The utility replaces the original `pgrep`/`kill` Bash workflow with direct `/proc` inspection, exact process-name matching, ownership validation, and PID-reuse protection.

## Build

Release build:

```bash
gcc -std=c17 -O2 -Wall -Wextra -Wpedantic nodeterm.c -o nodeterm
```

Strict validated build:

```bash
gcc -std=c17 -O2 -Wall -Wextra -Wpedantic -Werror nodeterm.c -o nodeterm
```

Debug build:

```bash
gcc -std=c17 -O0 -g3 -Wall -Wextra -Wpedantic nodeterm.c -o nodeterm
```

## List eligible Node processes

```bash
./nodeterm list
```

Example:

```text
Eligible Node.js processes:
  PID 4101 | state S
  PID 4102 | state R
```

If none are eligible:

```text
No eligible Node.js processes found.
```

## Interactive selection

Run without arguments:

```bash
./nodeterm
```

`nodeterm` displays the eligible processes and prompts for either one PID or `all`:

```text
Enter one PID or 'all':
```

Terminate one process:

```text
4101
```

Terminate every listed process:

```text
all
```

## Terminate one particular Node process

```bash
./nodeterm PID
```

Example:

```bash
./nodeterm 4101
```

The PID is accepted only when it currently represents an eligible same-user process whose exact Linux process name is `node`.

## Terminate all eligible Node processes

```bash
./nodeterm all
```

This selects every exact-name `node` process owned by the invoking user. Processes belonging to other users are excluded.

The `all` argument is explicit and non-interactive, making it suitable for controlled scripts and deployment procedures.

## Eligibility rules

A process must pass every condition before it can be selected:

1. Its PID must be numeric and greater than 1.
2. It must exist under `/proc/PID`.
3. Its exact `/proc/PID/comm` value must be `node`.
4. `/proc/PID` must be owned by the invoking user's real UID.
5. It must not be the running `nodeterm` process.
6. Its `/proc/PID/stat` record must provide a valid process start time.

The exact-name requirement preserves the behavior of:

```bash
pgrep -x node
```

Names such as these are not matched:

```text
nodejs
node_worker
my-node
```

## Termination lifecycle

For every selected process, `nodeterm` performs this sequence:

1. Record the PID and Linux process start time.
2. Revalidate process name, ownership, state, and start time.
3. Send `SIGTERM`.
4. Allow all selected processes one second for orderly shutdown.
5. Inspect every selected identity again.
6. Send `SIGKILL` only if the same Node process identity remains alive.
7. Print aggregate requested, forced, and failed counts.

Example:

```text
Requesting Node.js process termination:
  PID 4101: SIGTERM
  PID 4102: SIGTERM
  PID 4102: SIGKILL
Node process termination complete: requested=2 forced=1 failed=0
```

`SIGTERM` allows the Node runtime to execute normal signal handling and cleanup. `SIGKILL` is reserved for processes that remain alive after the grace period.

## PID-reuse protection

Linux can reuse a numeric PID after a process exits. A newly created process must not inherit the termination decision made for the previous process.

`nodeterm` therefore identifies each target using:

```text
process_identity = PID + start_time
```

Before both `SIGTERM` and `SIGKILL`, the current process start time must equal the originally recorded value. A mismatch causes the target to be skipped.

Example:

```text
PID 4101 skipped: identity changed or process ended
```

## Process states

The `list` command displays the state reported by `/proc/PID/stat`.

Common states include:

| State | Meaning |
| --- | --- |
| `R` | Running or runnable |
| `S` | Interruptible sleep |
| `D` | Uninterruptible sleep |
| `T` | Stopped or traced |
| `Z` | Zombie |
| `X` | Dead process |

Zombie and dead processes are not treated as surviving identities during force-termination validation.

## Exit status

| Status | Meaning |
| --- | --- |
| `0` | The requested operation completed without a signalling failure |
| `1` | Invalid command, invalid selection, ineligible PID, `/proc` inspection failure, allocation failure, or signal failure |

Finding no eligible Node processes is a successful no-op and returns `0`.

## Automation examples

Review processes before taking action:

```bash
./nodeterm list
```

Terminate a PID stored by another component:

```bash
node_pid="$(<.node.pid)"
./nodeterm "$node_pid"
```

Terminate all same-user Node processes:

```bash
./nodeterm all
```

Use the final exit status in a deployment procedure:

```bash
if ./nodeterm all; then
    echo "Node termination phase completed."
else
    echo "Node termination phase requires review." >&2
fi
```

## Safety boundaries

- Prefer explicit PID termination when only one service must stop.
- Use `all` only when terminating every same-user Node runtime is intended.
- The utility does not terminate processes owned by other users.
- PID 1 is always rejected.
- A recycled PID is rejected through start-time comparison.
- No process is selected through partial-name matching.
- Running as root expands the eligible set to root-owned Node processes; use that mode only when operationally necessary.
- `SIGKILL` prevents application cleanup and is used only after the one-second grace interval.

## Relationship to other components

| Component | Responsibility |
| --- | --- |
| `nodeterm` | One-time selection and termination of Node.js processes |
| `ghostwait` | Continuous monitoring and lifecycle control of explicitly tracked PIDs |
| `lambda` | Detached concurrent process invocation |
| `memstore` | Typed runtime-value storage |
| `softinit` | System and machine specification publication |

Use `nodeterm` for direct Node-specific cleanup. Use `ghostwait` when a process must participate in a monitored lifecycle with identity records and condition files.

## Platform requirements

`nodeterm` targets Linux and requires:

- a mounted `/proc` filesystem corresponding to the current PID namespace;
- permission to inspect the selected same-user processes;
- permission to send `SIGTERM` and `SIGKILL`;
- POSIX process and signal interfaces.

In a container, `/proc` must represent the same PID namespace as the utility. A mismatched or restricted process view causes inspection to fail safely.

## Command summary

| Command | Operation |
| --- | --- |
| `./nodeterm` | Interactively choose one PID or all eligible Node processes |
| `./nodeterm list` | List eligible Node processes without terminating them |
| `./nodeterm PID` | Terminate one eligible Node process |
| `./nodeterm all` | Terminate all eligible same-user Node processes |
