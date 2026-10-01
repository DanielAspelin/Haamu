# Datetime Utility

## Overview

`datetime` is a standalone C++17 clock and timestamp utility. Invoking it reads
the current system clock, formats one consistent snapshot, prints it, and can
write the same value into a selected file.

The default invocation returns the current local datetime:

```bash
datetime
```

Example:

```text
2026-09-06T03:22:48+02:00
```

## Structure

```text
datetime/
├── date.hpp
├── datetime.cpp
├── datetime.hpp
├── datetime.md
├── Makefile
└── time.hpp
```

| File | Responsibility |
| --- | --- |
| `date.hpp` | Calendar date representation and validation |
| `time.hpp` | Clock time and fractional-second representation |
| `datetime.hpp` | Combined snapshot, options, formatting, and output API |
| `datetime.cpp` | Implementations and invokable command interface |
| `Makefile` | Build, validation, installation, and cleanup |

## Requirements

- A C++17-compatible compiler
- GNU Make
- A POSIX-compatible environment for installation

On Debian-based systems:

```bash
sudo apt update
sudo apt install g++ make
```

## Build and validate

```bash
make
make check
```

Additional build targets:

```bash
make debug
make rebuild
make clean
```

The integrated checks validate date-only, time-only, stamp, Unix epoch, and
file-output behavior.

## Installation

Install under `/usr/local/bin`:

```bash
sudo make install
```

Confirm the installation:

```bash
datetime --version
```

Custom installation prefix:

```bash
sudo make install PREFIX=/opt/datetime
```

Staged installation:

```bash
make install DESTDIR=/tmp/datetime-package PREFIX=/usr
```

Uninstall:

```bash
sudo make uninstall
```

## Invocation model

The program captures the clock once per invocation. Formatting, terminal
output, and file output therefore use the same time point rather than reading
the clock independently.

```text
system clock → datetime snapshot → formatter → terminal and/or file
```

## Scope options

Output the complete datetime:

```bash
datetime --datetime
```

Output only the date:

```bash
datetime --date
```

Output only the time:

```bash
datetime --time
```

`--datetime` is the default.

## Clock-zone options

Use the operating system's local timezone:

```bash
datetime --local
```

Use Coordinated Universal Time:

```bash
datetime --utc
```

Local time is the default. UTC output uses `UTC` in stamp format and `Z` in ISO
format.

## Formats

### ISO

```bash
datetime --format iso
```

Local example:

```text
2026-09-06T03:22:48+02:00
```

UTC example:

```bash
datetime --utc --format iso
```

```text
2026-09-06T01:22:48Z
```

### Compact

```bash
datetime --format compact
```

```text
20260906032248
```

Date and time can be selected independently:

```bash
datetime --date --format compact
datetime --time --format compact
```

### Stamp

Stamp format follows the project's sortable timestamp convention:

```bash
datetime --utc --format stamp --precision nanoseconds
```

```text
20260906.012248.228316861.UTC
```

Its field order is:

```text
YYYYMMDD.HHMMSS.fraction.ZONE
```

This format is suitable for history records, generation identifiers, filenames,
change logs, checkpoints, and provenance markers.

### Unix epoch

```bash
datetime --format unix
```

The selected precision controls the epoch unit:

| Precision | Unix result unit |
| --- | --- |
| Seconds | Seconds since epoch |
| Milliseconds | Milliseconds since epoch |
| Microseconds | Microseconds since epoch |
| Nanoseconds | Nanoseconds since epoch |

## Precision

Available precision settings are:

```bash
datetime --precision seconds
datetime --precision milliseconds
datetime --precision microseconds
datetime --precision nanoseconds
```

Fractional digit counts are:

| Precision | Digits |
| --- | ---: |
| Seconds | 0 |
| Milliseconds | 3 |
| Microseconds | 6 |
| Nanoseconds | 9 |

Seconds are the default.

Example:

```bash
datetime --utc --time --precision microseconds
```

```text
01:22:48.228316Z
```

## File stamping

Write the timestamp to a selected file:

```bash
datetime --output .datetime
```

By default, the file is replaced and the same timestamp is also printed to the
terminal.

Write without terminal output:

```bash
datetime --output .datetime --quiet
```

Append a new timestamp record:

```bash
datetime --output History/Runtime_History.time --append
```

Create missing parent directories:

```bash
datetime \
    --utc \
    --format stamp \
    --precision nanoseconds \
    --output History/Timestamps/.current \
    --create-directories \
    --quiet
```

If `--output` identifies an existing directory, the program writes to:

```text
datetime.stamp
```

inside that directory.

## Recommended project stamp

For deterministic cross-machine records, use UTC, stamp format, and nanosecond
precision:

```bash
datetime \
    --utc \
    --format stamp \
    --precision nanoseconds \
    --output .current.timestamp \
    --quiet
```

For an append-only history:

```bash
datetime \
    --utc \
    --format stamp \
    --precision nanoseconds \
    --output History/Runtime_History.log \
    --create-directories \
    --append \
    --quiet
```

## Option reference

| Option | Purpose |
| --- | --- |
| `--date` | Output only the date |
| `--time` | Output only the time |
| `--datetime` | Output date and time |
| `--local` | Use the system local timezone |
| `--utc` | Use UTC |
| `--format iso` | Use ISO-style formatting |
| `--format compact` | Use compact numeric formatting |
| `--format stamp` | Use sortable dotted stamp formatting |
| `--format unix` | Output a Unix epoch value |
| `--precision seconds` | Use second precision |
| `--precision milliseconds` | Use millisecond precision |
| `--precision microseconds` | Use microsecond precision |
| `--precision nanoseconds` | Use nanosecond precision |
| `--output FILE` | Write the timestamp to a file |
| `--append` | Append instead of replacing the file |
| `--create-directories` | Create missing parent directories |
| `--quiet` | Suppress standard output |
| `--help`, `-h` | Show usage information |
| `--version`, `-v` | Show the program version |

When mutually exclusive options are repeated, the last applicable option takes
effect. For example, `--local --utc` selects UTC.

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Timestamp operation completed successfully |
| `2` | Invalid, unknown, or incomplete command option |
| `3` | Output directory or file operation failed |

Normal results use standard output. Diagnostics use standard error, making the
utility suitable for Bash scripts, runtime layers, and build pipelines.

## C++ API

Include the combined interface:

```cpp
#include "datetime.hpp"
```

### Capture a snapshot

```cpp
CHRONO::DATETIME local = CHRONO::DATETIME::Now(
    CHRONO::ZONE::Local
);

CHRONO::DATETIME utc = CHRONO::DATETIME::Now(
    CHRONO::ZONE::UTC
);
```

The snapshot contains:

```cpp
utc.Date
utc.Time
utc.Zone
utc.Zone_Name
utc.UTC_Offset
utc.Point
```

### Configure formatting

```cpp
CHRONO::OPTIONS options;
options.Zone = CHRONO::ZONE::UTC;
options.Scope = CHRONO::SCOPE::Date_Time;
options.Format = CHRONO::FORMAT::Stamp;
options.Precision = CHRONO::PRECISION::Nanoseconds;

std::string timestamp = utc.Format(options);
```

### Write a timestamp

```cpp
std::string error;

bool written = CHRONO::DATETIME::Write(
    "History/.timestamp",
    timestamp,
    false,
    true,
    error
);
```

The Boolean arguments select append mode and parent-directory creation,
respectively.

## Date API

```cpp
#include "date.hpp"

CHRONO::DATE date;
date.Year = 2026;
date.Month = 9;
date.Day = 6;

bool valid = date.Is_Valid();
std::string iso = date.ISO();
std::string compact = date.Compact();
```

Date validation accounts for month lengths and leap years.

## Time API

```cpp
#include "time.hpp"

CHRONO::TIME time;
time.Hour = 12;
time.Minute = 34;
time.Second = 56;
time.Nanosecond = 123456789;

bool valid = time.Is_Valid();
std::string iso = time.ISO(9);
std::string compact = time.Compact(9);
```

The fractional-digit argument accepts the precision selected by the caller.
The command interface uses only `0`, `3`, `6`, or `9` digits.

## Operational boundaries

`datetime` reads the wall clock through `std::chrono::system_clock`. It does not
modify the system clock, synchronize time, contact an NTP service, or guarantee
that the underlying platform clock has true nanosecond accuracy. Nanosecond
formatting represents the clock resolution exposed by the platform.

UTC stamps are preferred for portable history and transaction records. Local
stamps remain useful for operator-facing output where the system timezone is
part of the intended context.

## Version

```text
1.0.0
```
