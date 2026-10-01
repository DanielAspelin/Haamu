# ghostwait

`ghostwait` is a detached Linux process monitor and guarded lifecycle controller. It tracks explicitly registered PIDs, publishes their current conditions into dot files, consumes lifecycle and corruption requests, and terminates only processes that pass ownership and identity validation.

The monitor is designed for application-local process coordination. It is not a replacement for `systemd`, an operating-system init process, or a system-wide process manager.

## Build

```bash
g++ -std=c++17 -O2 -Wall -Wextra -Wpedantic ghostwait.cpp -o ghostwait
```

No third-party libraries are required.

## Start

Start the monitor directly:

```bash
./ghostwait
```

Or use the explicit form:

```bash
./ghostwait start
```

Both forms start the same detached monitor.

During startup, `ghostwait` forks a child process, creates a new session with `setsid()`, redirects standard input, output, and error to `/dev/null`, and confirms initialization to the launcher. The launcher then exits and returns control of the terminal.

The shell does not require `&`, `nohup`, or `disown`:

```bash
./ghostwait
```

Expected launcher output:

```text
ghostwait started: 4101
```

## Working-directory scope

`ghostwait` operates in the directory from which it starts. All management commands should be invoked from that same directory because its PID and condition files use relative paths.

One working directory supports one monitor instance.

## Register a process

```bash
./ghostwait track PID
```

Example:

```bash
./ghostwait track 5201
```

This appends the requested state pair to `.pid.tasks`:

```text
5201=1
```

The daemon accepts the process only when:

- the PID is greater than 1;
- the process exists;
- the process belongs to the same real user as `ghostwait`;
- the PID is not `ghostwait` itself or its protected parent process.

When accepted, the process start time from `/proc/PID/stat` is recorded in `.pid.identity`. This start time distinguishes the original process from a later process that might reuse the same numeric PID.

## Monitor status

Check whether `ghostwait` itself is active:

```bash
./ghostwait status
```

Example:

```text
ghostwait running: 4101
```

The monitor refreshes process conditions every 500 milliseconds.

## Condition files

| File | Role |
| --- | --- |
| `.ghostwait.pid` | Monitor PID and start-time identity |
| `.pid.tasks` | Currently tracked live PID/state pairs |
| `.pid.identity` | PID/start-time identity pairs used against PID reuse |
| `.pid.active` | Tracked processes currently considered active |
| `.pid.passive` | Missing, zombie, or dead tracked identities |
| `.pid.queue` | Processes awaiting termination completion or escalation |
| `.pid.corrupted` | Input queue for explicit corruption requests |
| `.pid.lifecycle` | Input queue for explicit lifecycle-end requests |
| `.pid.report` | Append-only event and decision report |

Snapshot files are written through temporary files and atomically renamed into place. Readers therefore receive a complete old snapshot or a complete new snapshot.

## PID/state records

Control and identity data use compact PID/state pairs:

```text
PID=STATE
```

Examples:

```text
5201=1
5201=0
5201=564522
```

The meaning depends on the file:

| File | Required meaning |
| --- | --- |
| `.pid.tasks` | `PID=1` requests or confirms tracking |
| `.pid.corrupted` | `PID=1` declares the tracked process corrupted |
| `.pid.lifecycle` | `PID=0` requests lifecycle completion |
| `.pid.identity` | `PID=start_time` records the Linux process identity |

Invalid states are ignored and reported. Lifecycle and corruption files are consumed as request queues and truncated after processing.

## Active and passive conditions

`.pid.active` contains records such as:

```text
5201=S
```

The value is the Linux process state from `/proc/PID/stat`.

Common states include:

| State | Meaning |
| --- | --- |
| `R` | Running or runnable |
| `S` | Interruptible sleep |
| `D` | Uninterruptible sleep |
| `T` | Stopped or traced |
| `I` | Idle kernel thread |
| `Z` | Zombie |
| `X` | Dead process |

Zombie and dead states are published as passive. A missing process or an identity mismatch is represented in `.pid.passive` as:

```text
5201=missing
```

Passive detection by itself does not authorize signals. Termination requires an explicit lifecycle or corruption request.

## Request lifecycle completion

```bash
./ghostwait end PID
```

Example:

```bash
./ghostwait end 5201
```

This submits:

```text
5201=0
```

to `.pid.lifecycle`.

## Declare corruption

```bash
./ghostwait corrupt PID
```

Example:

```bash
./ghostwait corrupt 5201
```

This submits:

```text
5201=1
```

to `.pid.corrupted`.

Corruption is an explicit external declaration. `ghostwait` does not infer application-level corruption merely from CPU use, memory consumption, sleep state, or lack of output.

## Guarded termination sequence

Before signalling a process, `ghostwait` verifies all of the following:

1. The PID is explicitly tracked.
2. The PID is greater than 1.
3. The PID is not the monitor itself.
4. The PID is not the monitor's protected parent.
5. The process belongs to the same user.
6. The current `/proc/PID/stat` start time matches `.pid.identity`.

If validation succeeds:

1. `SIGTERM` is sent.
2. The request enters `.pid.queue`.
3. The process receives a three-second cleanup period.
4. If the same process identity remains alive, `SIGKILL` is sent.
5. If it exits or becomes a zombie, the queue entry is completed.

If validation fails, no signal is sent. The rejection is written to `.pid.report`.

## PID-reuse protection

A numeric PID can be reused after its original process exits. `ghostwait` therefore binds each tracked PID to the start-time field supplied by the Linux kernel.

Conceptually:

```text
process_identity = PID + start_time
```

If the PID still exists but its start time has changed, the process is treated as a different identity. An old lifecycle request cannot propagate into the replacement process.

## Termination queue

During the cleanup interval, `.pid.queue` contains a reason such as:

```text
5201=lifecycle=0
```

or:

```text
5201=corrupted=1
```

The entry disappears after the termination sequence completes or escalation has been attempted.

## Event report

Display the report:

```bash
./ghostwait report
```

`.pid.report` records events using an epoch timestamp, condition, PID, and detail:

```text
1757062800 TRACKED PID=5201 worker
1757062810 SIGTERM PID=5201 lifecycle=0
1757062811 TERMINATED PID=5201 lifecycle=0
```

Other possible conditions include:

```text
PID_REUSE_REJECTED
REQUEST_REJECTED
REQUEST_IGNORED
SIGNAL_FAILED
SIGKILL
SIGKILL_FAILED
```

## Stop the monitor

```bash
./ghostwait stop
```

This sends `SIGTERM` to the validated `ghostwait` monitor identity. The monitor publishes one final condition snapshot and removes `.ghostwait.pid` before exiting.

Stopping `ghostwait` does not terminate every tracked process. Tracked processes are signalled only through valid `end` or `corrupt` requests.

## Safety boundaries

- Never run multiple instances in the same working directory.
- Use the command interface to update queues; arbitrary concurrent file edits can create operational ambiguity.
- Restrict access to the working directory because lifecycle files authorize process termination requests.
- Run `ghostwait` as the same unprivileged service account that owns the managed processes.
- Do not run it as root unless the directory and every writer are strictly controlled.
- Do not remove `.pid.identity` while processes are actively tracked.
- Review `.pid.report` after rejected or escalated operations.

## Command summary

| Command | Operation |
| --- | --- |
| `./ghostwait` | Start detached monitor |
| `./ghostwait start` | Start detached monitor explicitly |
| `./ghostwait status` | Report monitor status |
| `./ghostwait track PID` | Register a process identity |
| `./ghostwait end PID` | Request controlled lifecycle termination |
| `./ghostwait corrupt PID` | Declare corruption and request termination |
| `./ghostwait report` | Display the event report |
| `./ghostwait stop` | Stop only the monitor |

## Platform requirements

`ghostwait` targets Linux and depends on a consistent PID namespace and `/proc` process view. Containers must mount a `/proc` instance corresponding to the container's PID namespace. If the numeric PID returned by the process API does not identify the same process under `/proc/PID`, identity validation fails safely and the monitor will not start or signal processes.
