#!/usr/bin/env bash
set -euo pipefail

script_directory="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd -- "$script_directory"

temporary_binary="$(mktemp "./memstore.build.XXXXXX")"
trap 'rm -f -- "$temporary_binary"' EXIT

g++ -std=c++17 -O2 -Wall -Wextra -Wpedantic -Werror \
    memstore.cpp -o "$temporary_binary"

chmod +x "$temporary_binary"
mv -f -- "$temporary_binary" memstore
echo "memstore build completed."
