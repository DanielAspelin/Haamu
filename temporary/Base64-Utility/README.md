# Base64 Utility

## Overview

`base64` is a dependency-free C++17 binary-to-text codec and command-line
utility. It supports standard Base64 and the URL-safe Base64 alphabet, padded
and unpadded encoding, strict decoding, optional whitespace tolerance, file
processing, and standard-input/output pipelines.

Base64 is an encoding mechanism, not encryption. It provides representation
compatibility but does not provide confidentiality, integrity, or
authentication.

## Structure

```text
base64/
├── base64.cpp
├── base64.hpp
├── base64.md
└── Makefile
```

| File | Responsibility |
| --- | --- |
| `base64.hpp` | Codec types, options, errors, and public API |
| `base64.cpp` | Codec implementation and invokable command interface |
| `base64.md` | Operational and developer reference |
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

Additional targets:

```bash
make debug
make rebuild
make clean
```

The integrated checks cover standard encoding and decoding, URL-safe encoding,
unpadded encoding, whitespace-tolerant decoding, and file round trips.

## Installation

```bash
sudo make install
base64 --version
```

The default target is `/usr/local/bin/base64`.

This name may already be provided by GNU coreutils. To keep both executables,
install this project under a separate prefix or rename `TARGET` in the
Makefile before installation.

Custom prefix:

```bash
sudo make install PREFIX=/opt/valimo
```

Staged installation:

```bash
make install DESTDIR=/tmp/base64-package PREFIX=/usr
```

Uninstall:

```bash
sudo make uninstall
```

## Encode literal text

```bash
base64 encode --text hello
```

```text
aGVsbG8=
```

Text input is treated as its exact byte sequence. UTF-8 text is encoded as
UTF-8 bytes; Base64 itself does not interpret character semantics.

## Decode literal data

```bash
base64 decode --text aGVsbG8=
```

```text
hello
```

Decoded output is binary-safe and does not receive an automatic newline.

## Encode a file

```bash
base64 encode \
    --input source.bin \
    --output source.bin.base64
```

The output file is replaced if it already exists.

## Decode a file

```bash
base64 decode \
    --input source.bin.base64 \
    --output restored.bin
```

Confirm an exact round trip:

```bash
cmp source.bin restored.bin
```

## Standard-input pipelines

When neither `--text` nor `--input` is supplied, input is read from standard
input.

Encode from a pipeline:

```bash
base64 encode < source.bin > source.bin.base64
```

Decode from a pipeline:

```bash
base64 decode < source.bin.base64 > restored.bin
```

`--output` can be combined with standard input:

```bash
base64 decode --output restored.bin < source.bin.base64
```

## URL-safe alphabet

```bash
base64 encode --url-safe --text '~~~'
```

```text
fn5-
```

Decode using the same alphabet:

```bash
base64 decode --url-safe --text fn5-
```

The URL-safe alphabet replaces:

| Standard | URL-safe |
| --- | --- |
| `+` | `-` |
| `/` | `_` |

The decoder intentionally does not mix the two alphabets. The caller must
select the representation explicitly.

## Padding

Standard encoding emits `=` padding by default.

Omit padding:

```bash
base64 encode --no-padding --text test
```

```text
dGVzdA
```

The decoder accepts canonical padded and unpadded input by default.

Require a complete padded quantum:

```bash
base64 decode --require-padding --text dGVzdA==
```

`--require-padding` rejects incomplete four-character quanta. Inputs that
naturally occupy complete quanta require no `=` characters.

## Wrapped output

Wrap encoded output at a selected column:

```bash
base64 encode --wrap 76 --input source.bin
```

The encoder inserts linefeeds between output sections and does not insert a
trailing linefeed inside the encoded value. Terminal output adds its ordinary
final newline.

Decode wrapped input by explicitly allowing whitespace:

```bash
base64 decode \
    --ignore-whitespace \
    --input wrapped.base64 \
    --output restored.bin
```

Strict decoding rejects whitespace by default.

## Option reference

### Shared options

| Option | Purpose |
| --- | --- |
| `--text TEXT` | Use literal argument input |
| `--input FILE` | Read binary input from a file |
| `--output FILE` | Write binary output to a file |
| `--url-safe` | Select the URL-safe alphabet |
| `--help`, `-h` | Show help |
| `--version`, `-v` | Show the program version |

`--text` and `--input` are mutually exclusive. If neither is present, standard
input is used. If `--output` is absent, standard output is used.

### Encoding-only options

| Option | Purpose |
| --- | --- |
| `--no-padding` | Omit `=` padding |
| `--wrap COLUMNS` | Insert linefeeds at a positive column width |

### Decoding-only options

| Option | Purpose |
| --- | --- |
| `--ignore-whitespace` | Ignore whitespace in encoded input |
| `--require-padding` | Require complete four-character quanta |

Options used with the wrong operation are rejected.

## Validation behavior

The decoder validates:

- Alphabet membership
- Encoded-length constraints
- Padding placement and count
- Standard versus URL-safe alphabet selection
- Canonical unused trailing bits
- Whitespace policy

Malformed input is rejected rather than partially returned.

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Encoding or decoding completed successfully |
| `2` | Invalid option or malformed Base64 input |
| `3` | Input or output operation failed |

Normal data uses standard output and diagnostics use standard error.

## C++ API

```cpp
#include "base64.hpp"
```

### Encode bytes

```cpp
std::vector<std::uint8_t> input {
    'h', 'e', 'l', 'l', 'o'
};

CODING::BASE64_ENCODE_OPTIONS options;
options.Alphabet = CODING::BASE64_ALPHABET::Standard;
options.Padding = true;
options.Wrap = 0;

std::string encoded = CODING::BASE64::Encode(input, options);
```

### Decode text

```cpp
std::vector<std::uint8_t> output;
CODING::BASE64_ERROR error;
CODING::BASE64_DECODE_OPTIONS options;

bool decoded = CODING::BASE64::Decode(
    "aGVsbG8=",
    output,
    error,
    options
);
```

### URL-safe API configuration

```cpp
options.Alphabet = CODING::BASE64_ALPHABET::URL_Safe;
```

Encoding and decoding must use the same alphabet.

### Encoded-size calculation

```cpp
std::size_t padded = CODING::BASE64::Encoded_Size(input.size(), true);
std::size_t unpadded = CODING::BASE64::Encoded_Size(input.size(), false);
```

The returned size excludes optional line wrapping and terminal newlines.

## Error model

`CODING::BASE64_ERROR` contains:

```cpp
error.Code
error.Position
```

Possible codes are:

```cpp
CODING::BASE64_ERROR::CODE::None
CODING::BASE64_ERROR::CODE::Invalid_Character
CODING::BASE64_ERROR::CODE::Invalid_Length
CODING::BASE64_ERROR::CODE::Invalid_Padding
CODING::BASE64_ERROR::CODE::Noncanonical_Trailing_Bits
```

`Position` identifies the failing position in normalized encoded input. When
whitespace is ignored, positions refer to the normalized Base64 sequence.

## Security boundary

Base64 output is directly reversible and must not be treated as protected data.
For protected storage, apply authenticated encryption independently and use
Base64 only as the external text representation when needed.

A suitable high-level order is:

```text
plaintext → authenticated encryption → Base64 encoding → storage or transport
```

The reverse order is:

```text
Base64 decoding → authentication and decryption → plaintext
```

## Version

```text
1.0.0
```
