# Symbol Utility

## Overview

`symbol` is a C++17 semantic-symbol library and command-line utility. It joins
a character, Unicode scalar number, escape representation, classification
attributes, and metadata into one canonical symbol record.

The project is designed as the semantic layer following ASCII and UTF:

```text
ASCII character foundation
        ↓
UTF scalar and encoding foundation
        ↓
Symbol identity, attributes, metadata, and indexing
```

The implementation is standalone and depends only on the C++ standard library.
Its types remain compatible with the earlier ASCII and UTF projects through
`char32_t`, UTF-8 strings, and Unicode scalar-value rules.

## Structure

```text
symbol/
├── Makefile
├── metasymbol.hpp
├── newsymbol.hpp
├── symbolattribute.hpp
├── symbolcharacter.hpp
├── symbol.cpp
├── symbolescape.hpp
├── symbol.hpp
├── symbol.md
├── symbolnumber.hpp
└── symboltable.hpp
```

| File | Responsibility |
| --- | --- |
| `symbol.hpp` | Canonical symbol record and scalar-number type |
| `metasymbol.hpp` | Origin, category, description, and version metadata |
| `newsymbol.hpp` | Validated symbol construction |
| `symbolattribute.hpp` | Bitwise semantic attributes and attribute sets |
| `symbolcharacter.hpp` | Scalar validation, classification, and UTF-8 conversion |
| `symbolescape.hpp` | Symbol and text escaping/unescaping |
| `symbolnumber.hpp` | Decimal, hexadecimal, and `U+` number notation |
| `symboltable.hpp` | Bidirectional name/number indexing and default registry |
| `symbol.cpp` | Implementations and invokable command interface |
| `Makefile` | Build, validation, installation, and cleanup workflow |

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

Development targets:

```bash
make debug
make rebuild
make clean
```

The checks cover lookup, Unicode inspection, escaping, unescaping, and default
symbol-table resolution.

## Installation

```bash
sudo make install
symbol --version
```

The default target is `/usr/local/bin/symbol`.

Custom prefix:

```bash
sudo make install PREFIX=/opt/symbol
```

Staged package installation:

```bash
make install DESTDIR=/tmp/symbol-package PREFIX=/usr
```

Uninstall:

```bash
sudo make uninstall
```

## Commands

### Inspect

Inspect a character:

```bash
symbol inspect A
```

Inspect a decimal scalar number:

```bash
symbol inspect 65
```

Inspect Unicode notation:

```bash
symbol inspect U+20AC
```

The result reports:

- Canonical or generated name
- UTF-8 character representation
- Unicode notation
- Decimal number
- Hexadecimal number
- Escape representation
- Semantic category
- ASCII membership
- Printability

### Create

Construct and validate a symbol record:

```bash
symbol new EURO_SIGN U+20AC
```

`new` validates the name and Unicode scalar, generates its UTF-8 and escape
representations, derives its attributes, and prints the resulting record. The
command does not alter a persistent registry.

### Find

Find a built-in symbol by name:

```bash
symbol find PLUS
```

Find by number:

```bash
symbol find U+0041
```

Name lookup is exact and case-sensitive.

### List

```bash
symbol list
```

The built-in table contains Latin uppercase and lowercase letters, decimal
digits, and printable ASCII punctuation symbols. Records are ordered by scalar
number.

### Escape

```bash
symbol escape "A€"
```

Result:

```text
A\u20AC
```

Printable ASCII is retained where safe. Controls, backslashes, quotes, and
non-ASCII scalars are escaped.

### Unescape

```bash
symbol unescape 'A\u20AC'
```

Result:

```text
A€
```

Supported escape forms include:

```text
\0 \a \b \t \n \v \f \r
\\ \' \"
\xNN
\uNNNN
\UNNNNNNNN
```

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Operation completed successfully |
| `2` | Invalid command, argument, UTF-8 sequence, escape, or scalar |
| `3` | Requested symbol was not found |

Normal output uses standard output; diagnostics use standard error.

## Canonical symbol model

```cpp
SYMBOLS::SYMBOL symbol;
```

The record contains:

```cpp
symbol.Name
symbol.Number
symbol.Character
symbol.Escape
symbol.Attributes
symbol.Metadata
```

`Number` uses `char32_t`. `Character` stores the UTF-8 representation, allowing
the same record to carry both semantic identity and an invokable text form.

## Creating symbols in C++

```cpp
#include "newsymbol.hpp"

SYMBOLS::SYMBOL euro;

bool created = SYMBOLS::NEW_SYMBOL::Create(
    "EURO_SIGN",
    U'€',
    euro,
    "Euro currency symbol",
    SYMBOLS::META_SYMBOL::ORIGIN::Unicode
);
```

Construction rejects empty names, surrogate values, and values above
`U+10FFFF`.

## Attributes

Available semantic flags include:

```cpp
SYMBOLS::SYMBOL_ATTRIBUTE::ASCII
SYMBOLS::SYMBOL_ATTRIBUTE::Unicode
SYMBOLS::SYMBOL_ATTRIBUTE::Alphabetic
SYMBOLS::SYMBOL_ATTRIBUTE::Numeric
SYMBOLS::SYMBOL_ATTRIBUTE::Alphanumeric
SYMBOLS::SYMBOL_ATTRIBUTE::Whitespace
SYMBOLS::SYMBOL_ATTRIBUTE::Punctuation
SYMBOLS::SYMBOL_ATTRIBUTE::Control
SYMBOLS::SYMBOL_ATTRIBUTE::Printable
SYMBOLS::SYMBOL_ATTRIBUTE::Identifier
SYMBOLS::SYMBOL_ATTRIBUTE::Operator
SYMBOLS::SYMBOL_ATTRIBUTE::Delimiter
SYMBOLS::SYMBOL_ATTRIBUTE::Custom
```

Test a flag:

```cpp
bool printable = symbol.Attributes.Has(
    SYMBOLS::SYMBOL_ATTRIBUTE::Printable
);
```

Add a contextual flag:

```cpp
symbol.Attributes.Add(SYMBOLS::SYMBOL_ATTRIBUTE::Operator);
```

Core classification is deliberately conservative: alphabetic and numeric
classification covers ASCII directly. Full Unicode script, category, and
property classification belongs in a future Unicode database module.

## Metadata

```cpp
SYMBOLS::META_SYMBOL metadata;
```

Metadata carries:

- `Origin`: built-in, ASCII, Unicode, or user-defined
- `Category`: derived semantic category
- `Description`: optional explanatory text
- `Version`: record schema/version marker

This keeps descriptive and provenance information separate from the character
and numeric identity.

## Number notation

```cpp
#include "symbolnumber.hpp"

SYMBOLS::SYMBOL_NUMBER number;
bool parsed = SYMBOLS::SYMBOL_NUMBER_FORMAT::Parse("U+20AC", number);

std::string unicode = SYMBOLS::SYMBOL_NUMBER_FORMAT::Unicode(number);
std::string decimal = SYMBOLS::SYMBOL_NUMBER_FORMAT::Decimal(number);
std::string hex = SYMBOLS::SYMBOL_NUMBER_FORMAT::Hexadecimal(number);
```

Unprefixed input is decimal. `U+`, `u+`, `0x`, and `0X` inputs are hexadecimal.

## Character and UTF-8 operations

```cpp
#include "symbolcharacter.hpp"

bool scalar = SYMBOLS::SYMBOL_CHARACTER::Is_Scalar(U'€');
bool ascii = SYMBOLS::SYMBOL_CHARACTER::Is_ASCII(U'A');

std::string utf8;
SYMBOLS::SYMBOL_CHARACTER::Encode_UTF8(U'€', utf8);
```

Decode the first UTF-8 scalar:

```cpp
SYMBOLS::SYMBOL_NUMBER number;
std::size_t consumed = 0;

bool decoded = SYMBOLS::SYMBOL_CHARACTER::Decode_UTF8(
    utf8,
    number,
    consumed
);
```

The decoder rejects malformed, overlong, surrogate, and out-of-range input.

## Symbol table

```cpp
#include "symboltable.hpp"

SYMBOLS::SYMBOL_TABLE table;
table.Load_Defaults();
table.Insert(euro);

const SYMBOLS::SYMBOL* by_name = table.Find_Name("EURO_SIGN");
const SYMBOLS::SYMBOL* by_number = table.Find_Number(U'€');
```

The table maintains two coordinated indexes:

```text
name → symbol record
number → canonical name
```

Duplicate names and duplicate scalar numbers are rejected, preserving a
one-to-one canonical mapping inside one table.

## Scope and expansion

This release establishes symbol identity, representation, classification, and
indexing. Suitable follow-on modules include:

- Persistent symbol-table serialization
- Unicode Character Database properties
- Aliases and multiple names per scalar
- Symbol relationships and contextual roles
- Normalization and grapheme clusters
- Operator and delimiter registries
- Integration with tokenizer and parser layers

## Version

```text
1.0.0
```
