# UTF Utility

## Overview

`utf` is a dependency-free C++17 Unicode codec and command-line utility. It
validates UTF-8, decodes text into Unicode scalar values, encodes scalar values
as UTF-8, and exposes the corresponding UTF-8, UTF-16, and UTF-32 code units.

The project extends the ASCII layer without merging ASCII and Unicode
responsibilities. ASCII remains the compatible range `U+0000` through
`U+007F`; UTF manages the complete Unicode scalar range.

## Structure

```text
utf/
├── Makefile
├── utf16.hpp
├── utf32.hpp
├── utf8.hpp
├── utf.cpp
├── utf.hpp
└── utf.md
```

| File | Responsibility |
| --- | --- |
| `utf.hpp` | Shared types, encodings, errors, limits, and scalar validation |
| `utf8.hpp` | UTF-8 codec interface and byte-sequence metadata |
| `utf16.hpp` | UTF-16 codec interface and surrogate metadata |
| `utf32.hpp` | UTF-32 validation and codec interface |
| `utf.cpp` | Codec implementations and invokable command interface |
| `Makefile` | Build, test, installation, and cleanup workflow |

## Requirements

- GCC, Clang, or another C++17-compatible compiler
- GNU Make
- A POSIX-compatible environment for installation targets

On Debian-based systems:

```bash
sudo apt update
sudo apt install g++ make
```

## Build and test

```bash
make
make check
```

Additional targets:

```bash
make debug
make rebuild
make clean
```

`make check` validates UTF-8 decoding, Unicode code-point output, UTF-8
encoding, and UTF-16/UTF-32 code-unit generation.

## Installation

```bash
sudo make install
utf --version
```

The default installation target is `/usr/local/bin/utf`.

Custom prefix:

```bash
sudo make install PREFIX=/opt/utf
```

Staged installation:

```bash
make install DESTDIR=/tmp/utf-package PREFIX=/usr
```

Uninstall:

```bash
sudo make uninstall
```

## Commands

### Validate UTF-8

```bash
utf validate utf8 "Hello, maailma"
```

Successful result:

```text
valid
```

Invalid input produces a diagnostic identifying the error and failing code-unit
position. The command-line environment supplies arguments as UTF-8, so this
command validates UTF-8 directly. UTF-16 and UTF-32 validation remain available
through their C++ APIs.

### List Unicode code points

```bash
utf codepoints "Hi"
```

Result:

```text
U+0048 U+0069
```

### Inspect text

```bash
utf inspect "A€"
```

The report includes, per scalar value:

- Sequence index
- Unicode code point
- Required UTF-8 code-unit count
- Required UTF-16 code-unit count
- UTF-32 code-unit count
- ASCII compatibility

### Encode Unicode scalar values

```bash
utf encode U+0048 U+0069
```

Result:

```text
Hi
```

Accepted hexadecimal prefixes are:

```text
U+
u+
0x
0X
```

Surrogate values and values above `U+10FFFF` are rejected.

### Display encoded code units

UTF-8 bytes:

```bash
utf units utf8 "A€"
```

UTF-16 code units:

```bash
utf units utf16 "A€"
```

UTF-32 code units:

```bash
utf units utf32 "A€"
```

The output is hexadecimal and represents logical code units. Byte serialization
and endianness are deliberately separate from scalar transcoding.

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Operation completed successfully |
| `2` | Invalid command, encoding, sequence, argument, or scalar value |

Normal results are written to standard output. Diagnostics are written to
standard error, allowing predictable shell composition.

## Shared API

Include the common Unicode model and the required codec headers:

```cpp
#include "utf.hpp"
#include "utf8.hpp"
#include "utf16.hpp"
#include "utf32.hpp"
```

The canonical scalar type is:

```cpp
UTF::CODE_POINT
```

It aliases `char32_t`, which can represent every Unicode code point.

### Scalar validation

```cpp
bool scalar = UTF::UNICODE::Is_Scalar(U'A');
bool surrogate = UTF::UNICODE::Is_Surrogate(0xD800);
bool ascii = UTF::UNICODE::Is_ASCII(U'A');
```

A valid Unicode scalar is within `U+0000` through `U+10FFFF`, excluding the
surrogate range `U+D800` through `U+DFFF`.

## UTF-8 API

Decode UTF-8 into Unicode scalar values:

```cpp
std::string input = "Text";
std::u32string scalars;
UTF::ERROR error;

bool valid = UTF::UTF8::Decode(input, scalars, error);
```

Encode scalar values as UTF-8:

```cpp
std::string output;
bool encoded = UTF::UTF8::Encode(scalars, output, error);
```

Validate without retaining the decoded sequence:

```cpp
bool valid = UTF::UTF8::Validate(input, error);
```

The decoder rejects:

- Invalid lead bytes
- Invalid continuation bytes
- Truncated sequences
- Overlong sequences
- Encoded surrogate values
- Values above `U+10FFFF`

## UTF-16 API

```cpp
std::u16string input;
std::u32string scalars;
UTF::ERROR error;

bool valid = UTF::UTF16::Decode(input, scalars, error);
```

Encoding:

```cpp
std::u16string output;
bool encoded = UTF::UTF16::Encode(scalars, output, error);
```

The decoder validates surrogate pairing. An isolated high or low surrogate is
reported as an error.

## UTF-32 API

```cpp
std::u32string input;
std::u32string output;
UTF::ERROR error;

bool valid = UTF::UTF32::Validate(input, error);
bool decoded = UTF::UTF32::Decode(input, output, error);
```

UTF-32 uses one code unit per code point, but each value must still be checked
because surrogate values and values above `U+10FFFF` are not Unicode scalars.

## Error model

Operations report a structured `UTF::ERROR` containing:

```cpp
error.Code
error.Position
```

Possible codes include:

```cpp
UTF::ERROR::CODE::None
UTF::ERROR::CODE::Invalid_Argument
UTF::ERROR::CODE::Invalid_Lead_Unit
UTF::ERROR::CODE::Invalid_Continuation_Unit
UTF::ERROR::CODE::Truncated_Sequence
UTF::ERROR::CODE::Overlong_Sequence
UTF::ERROR::CODE::Isolated_Surrogate
UTF::ERROR::CODE::Invalid_Scalar
UTF::ERROR::CODE::Out_Of_Range
```

`Position` identifies the failing code-unit index in the input representation.

## Encoding boundaries

| Encoding | Code-unit type | Units per scalar |
| --- | --- | ---: |
| UTF-8 | `char` | 1–4 |
| UTF-16 | `char16_t` | 1–2 |
| UTF-32 | `char32_t` | 1 |

The codec layer transforms logical code units. File byte order, BOM policy,
streaming buffers, normalization, grapheme segmentation, and Unicode database
properties are appropriate follow-on modules rather than implicit codec work.

## Version

```text
1.0.0
```
