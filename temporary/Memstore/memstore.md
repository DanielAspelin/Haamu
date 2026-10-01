# memstore

`memstore` is a compact C++17 background service for storing typed values in a nested in-memory hashmap. Each value is addressed through a group and an entry name:

```text
memory[group][entry] = value
```

Example:

```text
memory[process][name]   = valimo
memory[process][number] = 1
```

The service detects the value type, keeps the current allocation in memory, answers lookup and output commands, and exports the store into `memstore.d/` during a controlled shutdown. Previously exported values are restored on the next start.

## Build

```bash
g++ -std=c++17 -O2 -Wall -Wextra -Wpedantic memstore.cpp -o memstore
```

`memstore` targets Linux and uses a local Unix-domain socket. It does not require third-party libraries.

## Working-directory scope

Run all commands from the same working directory. The service creates and resolves these relative paths there:

```text
.memstore.socket
.memstore.pid
memstore.d/
```

A client launched from another directory addresses a different socket and storage scope.

## Start

```bash
./memstore start
```

`start` detaches the service from the terminal, creates the local socket, records the background process ID, and loads previously exported values from `memstore.d/`.

Only one `memstore` service should run in a working directory. Starting it again while it is active reports an error.

## Store values

Syntax:

```bash
./memstore <group> <entry> <value>
```

Examples:

```bash
./memstore process name valimo
./memstore process number 1
./memstore process active true
./memstore metric ratio 12.5
./memstore system description "Valimo runtime service"
```

Supplying another value for the same group and entry replaces the current in-memory value.

## Automatic type detection

The stored representation is selected from a controlled `std::variant`:

| Input | Detected type | C++ representation |
| --- | --- | --- |
| `null` | `null` | `std::monostate` |
| `true`, `false` | `boolean` | `bool` |
| `-1`, `0`, `4101` | `integer` | `std::int64_t` |
| Integer above `INT64_MAX` | `unsigned` | `std::uint64_t` |
| `12.5`, `1e6` | `double` | `double` |
| Other content | `string` | `std::string` |

Positive integers fitting inside `std::int64_t` are stored as signed integers. Larger non-negative integers fitting inside `std::uint64_t` are stored as unsigned integers.

Values may contain spaces when passed as quoted text. Tabs and line breaks are rejected because they conflict with the compact internal command protocol and scalar persistence format.

## Read one allocation

Syntax:

```bash
./memstore <group> <entry>
```

Example:

```bash
./memstore process name
```

Output:

```text
process name string valimo
```

The output fields are:

```text
group entry detected-type value
```

If the requested allocation does not exist, `memstore` reports `not found` and exits unsuccessfully.

## Output current allocations

Output every value currently held in the nested hashmap:

```bash
./memstore output all
```

Example:

```text
metric ratio double 12.5
process active boolean true
process name string valimo
process number integer 1
```

Output one group:

```bash
./memstore output process
```

Output one entry within a group:

```bash
./memstore output process number
```

Results are sorted lexically for stable display. “Current allocations” means logical entries held in the hashmap. It does not presently report allocator addresses, heap capacity, hash buckets, load factors, or container overhead.

## Stop and persist

```bash
./memstore stop
```

A controlled stop performs the following sequence:

1. Creates `memstore.d/` when it does not exist.
2. Exports every current value and its detected type.
3. Writes each file through an atomic temporary-file replacement.
4. Stops the background service.
5. Removes `.memstore.socket` and `.memstore.pid`.

Example export:

```text
memstore.d/.process.name
memstore.d/.process.name.type
memstore.d/.process.number
memstore.d/.process.number.type
```

The value file contains one scalar value:

```text
valimo
```

Its companion type file contains:

```text
string
```

The double-dot-style filename hierarchy encodes:

```text
.<group>.<entry>
.<group>.<entry>.type
```

## Restart and restore

Starting `memstore` after a controlled stop reloads the exported files:

```bash
./memstore start
./memstore output all
```

When a valid companion `.type` file exists, the stored type is restored explicitly. If type metadata is absent or invalid, the value is detected again from its text.

## Naming rules

Group and entry names may contain:

```text
A-Z  a-z  0-9  _  -
```

They cannot be empty and cannot contain periods, slashes, whitespace, or other punctuation. These restrictions make persistence filenames deterministic and prevent directory traversal.

Valid examples:

```text
process
process_state
process-1
PID
```

Invalid examples:

```text
process.name
../process
process name
```

## Runtime files

| Path | Purpose |
| --- | --- |
| `.memstore.socket` | Owner-only local command channel |
| `.memstore.pid` | Background service process ID |
| `memstore.d/` | Persistent scalar value directory |
| `memstore.d/.<group>.<entry>` | Persisted value |
| `memstore.d/.<group>.<entry>.type` | Persisted detected type |

The Unix socket is assigned mode `0600`, restricting normal access to its owner.

## Exit behavior

| Result | Meaning |
| --- | --- |
| Exit `0` | Command completed successfully |
| Non-zero exit | Service unavailable, command invalid, allocation missing, startup failed, or persistence failed |

The client reports operational errors through standard error.

## Operational considerations

- Use `memstore stop` for controlled persistence before shutdown or deployment.
- An abrupt process termination can leave the most recent in-memory changes unexported.
- Exported files contain their values as readable text; do not store secrets unless filesystem permissions and the operating environment are appropriately controlled.
- Keep the socket, PID file, and `memstore.d/` within a private application directory.
- The current server processes local commands sequentially, providing a deterministic mutation order.
- The service is local to one machine and does not expose a TCP network listener.
