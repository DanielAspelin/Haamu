# ASCII Utility

## Overview

`ascii` is a standalone C++17 command-line utility and reusable header for
inspecting, classifying, encoding, decoding, and listing characters in the
7-bit ASCII character set.

The project separates the ASCII domain model from the executable interface:

- `ascii.hpp` defines character types, metadata, classifiers, converters,
  sequencing operations, and named ASCII character classes.
- `ascii.cpp` implements the invokable command-line interface.
- `Makefile` controls compilation, validation, installation, and cleanup.

## Project structure

```text
ascii/
├── ascii.cpp
├── ascii.hpp
├── ascii.md
└── Makefile
```

## Requirements

- A C++17-compatible compiler such as GCC or Clang
- GNU Make
- A POSIX-compatible installation environment for `make install`

On Debian-based systems:

```bash
sudo apt update
sudo apt install g++ make
```

## Build

Compile the executable:

```bash
make
```

This produces:

```text
ascii
```

Run the integrated validation checks:

```bash
make check
```

Build with debugging symbols and without optimization:

```bash
make debug
```

Rebuild from a clean state:

```bash
make rebuild
```

Remove generated build artifacts:

```bash
make clean
```

## Installation

Install the executable under `/usr/local/bin`:

```bash
sudo make install
```

Confirm that it is invokable:

```bash
ascii --version
```

Install to a different prefix:

```bash
sudo make install PREFIX=/opt/ascii
```

For staged packaging, use `DESTDIR`:

```bash
make install DESTDIR=/tmp/ascii-package PREFIX=/usr
```

Remove the installed executable:

```bash
sudo make uninstall
```

## Command interface

### Help

```bash
ascii --help
```

Aliases:

```bash
ascii -h
ascii help
```

### Version

```bash
ascii --version
ascii -v
```

### Inspect a character

Inspect a literal ASCII character:

```bash
ascii inspect A
```

Inspect the character represented by a decimal ASCII code:

```bash
ascii inspect 65
```

Example result:

```text
Decimal:     65
Hexadecimal: 0x41
Character:   A
Type:        uppercase
Printable:   yes
```

Control codes include their standard abbreviated names:

```bash
ascii inspect 10
```

```text
Decimal:     10
Hexadecimal: 0x0A
Character:   \n
Type:        control
Printable:   no
Control name: LF
```

### Classify a character

```bash
ascii classify A
ascii classify 65
```

The command prints one classification, such as:

```text
uppercase
lowercase
digit
whitespace
punctuation
control
printable
invalid
```

### Encode text

Convert ASCII text into space-separated decimal character codes:

```bash
ascii encode "ASCII"
```

Result:

```text
65 83 67 73 73
```

The encoder rejects bytes outside the ASCII range `0` through `127`.

### Decode character codes

Convert decimal ASCII codes back into characters:

```bash
ascii decode 65 83 67 73 73
```

Result:

```text
ASCII
```

Each code must be between `0` and `127`.

### Display the ASCII table

Display all ASCII records:

```bash
ascii table
ascii table all
```

Display only printable characters:

```bash
ascii table printable
```

Display only control characters:

```bash
ascii table control
```

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Operation completed successfully |
| `2` | Invalid command, argument, character, or ASCII code |

The utility writes normal results to standard output and diagnostics to
standard error. This makes it suitable for scripts and command pipelines.

Example:

```bash
if ascii inspect 65 >/dev/null; then
    echo "Valid ASCII input"
fi
```

## Header API

Include the domain model in another C++ translation unit:

```cpp
#include "ascii.hpp"
```

### Fundamental types

```cpp
ASCII::Integer_Type
ASCII::Character_Type
ASCII::String_Type
```

These correspond to:

```cpp
std::uint8_t
char
std::string_view
```

### Named characters

Uppercase letters are exposed as classes:

```cpp
ASCII::A::Integer
ASCII::A::Character
ASCII::A::String
```

Their values are:

```cpp
65
'A'
"A"
```

Lowercase letters use the `LOWER_` prefix:

```cpp
ASCII::LOWER_A::Integer
ASCII::LOWER_A::Character
ASCII::LOWER_A::String
```

Digits use their full names:

```cpp
ASCII::ZERO::Character
ASCII::ONE::Character
ASCII::NINE::Character
```

Essential whitespace and control classes include:

```cpp
ASCII::NUL
ASCII::TAB
ASCII::LINE_FEED
ASCII::VERTICAL_TAB
ASCII::FORM_FEED
ASCII::CARRIAGE_RETURN
ASCII::ESCAPE
ASCII::SPACE
ASCII::DELETE
```

### Classification

```cpp
bool alphabetic = ASCII::CLASSIFIER::Is_Alphabetic('A');
bool numeric = ASCII::CLASSIFIER::Is_Digit('7');
bool whitespace = ASCII::CLASSIFIER::Is_Whitespace('\n');
bool printable = ASCII::CLASSIFIER::Is_Printable(65);
bool valid = ASCII::CLASSIFIER::Is_ASCII(127);
```

Resolve the primary character category:

```cpp
ASCII::SPECIFIER::TYPE type =
    ASCII::CLASSIFIER::Classify('A');
```

### Conversion

```cpp
auto integer = ASCII::CONVERTER::To_Integer('A');
auto character = ASCII::CONVERTER::To_Character(65);
auto uppercase = ASCII::CONVERTER::To_Uppercase('a');
auto lowercase = ASCII::CONVERTER::To_Lowercase('A');
```

### Validation

```cpp
bool valid = ASCII::CONDITION::Is_Valid(65);
ASCII::CONDITION::STATE state = ASCII::CONDITION::Evaluate(65);
```

`Evaluate` returns one of:

```cpp
ASCII::CONDITION::STATE::Invalid
ASCII::CONDITION::STATE::Valid
ASCII::CONDITION::STATE::Printable
ASCII::CONDITION::STATE::Nonprintable
```

### Sequencing

```cpp
char next = ASCII::SEQUENCE::Next('A');
char previous = ASCII::SEQUENCE::Previous('B');

ASCII::SEQUENCE::ORDER order =
    ASCII::SEQUENCE::Compare('A', 'B');
```

The sequence comparison result is `Before`, `Equal`, or `After`.

### Context resolution

```cpp
ASCII::CONTEXTUAL::CONTEXT context =
    ASCII::CONTEXTUAL::Resolve('A');
```

Context resolution distinguishes identifiers, numbers, whitespace, control
characters, and general text.

## Architectural model

The header is organized into distinct responsibilities:

| Component | Responsibility |
| --- | --- |
| `SPECIFIER` | Defines character classification terminology |
| `REFERENTIAL` | Defines ASCII boundaries and reference ranges |
| `CLASSIFIER` | Tests and classifies characters |
| `CONTEXTUAL` | Resolves a character's likely parsing context |
| `SEQUENCE` | Compares and traverses ASCII values |
| `CONDITION` | Evaluates validity and printability states |
| `CONVERTER` | Converts character representations and case |
| `CHARACTER` | Supplies the reusable compile-time character model |

The named character classes inherit from `CHARACTER`. Consequently, their
integer, character, escape, and string representations remain consistent
without duplicating storage logic in each class.

## Integration

The header is self-contained and can be copied into another project's include
directory. Because its stored data members are `inline static constexpr`, it
can be included by multiple translation units without creating duplicate-symbol
linker errors.

Compile an integrating program with:

```bash
g++ -std=c++17 program.cpp -o program
```

The command-line executable depends only on the C++ standard library and does
not require an external runtime library.

## Scope

This project intentionally handles 7-bit ASCII only:

```text
Minimum code: 0
Maximum code: 127
Total codes:  128
```

UTF-8 and other multibyte encodings should be implemented as separate encoding
layers that can reference this ASCII foundation for their compatible range.

## Version

Current command-line interface version:

```text
1.0.0
```
