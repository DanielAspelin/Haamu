#!/usr/bin/env bash
set -euo pipefail

script_directory="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd -- "$script_directory"

temporary_binary="$(mktemp "./nodeterm.build.XXXXXX")"
trap 'rm -f -- "$temporary_binary"' EXIT

gcc -std=c17 -O2 -Wall -Wextra -Wpedantic -Werror \
    nodeterm.c -o "$temporary_binary"

chmod +x "$temporary_binary"
mv -f -- "$temporary_binary" nodeterm
echo "nodeterm build completed."
