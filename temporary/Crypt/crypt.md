# Valimo file closure encryption

The Valimo cryptographic closure components provide authenticated, in-place file encryption for Linux:

| Component | Responsibility |
| --- | --- |
| `cryptcore.h` | Shared OpenSSL 3 encryption, encoding, metadata, and recovery implementation |
| `closefile` | Encrypt and Base64-encode one file in place |
| `openfile` | Base64-decode and authenticate/decrypt one file in place |
| `initcrypt` | Recursively close regular files in a selected directory |

The system uses AES-256-GCM rather than unauthenticated AES. GCM protects both confidentiality and integrity: a wrong key, modified ciphertext, damaged tag, or altered authenticated header causes opening to fail before the encrypted file is replaced.

## Requirements

- Linux or a compatible POSIX environment
- GCC with C17 support
- OpenSSL 3 development headers and `libcrypto`

On Debian or Ubuntu, the development package is normally:

```bash
sudo apt install build-essential libssl-dev
```

## Build

```bash
gcc -std=c17 -O2 -Wall -Wextra -Wpedantic \
    closefile.c -o closefile -lcrypto

gcc -std=c17 -O2 -Wall -Wextra -Wpedantic \
    openfile.c -o openfile -lcrypto

gcc -std=c17 -O2 -Wall -Wextra -Wpedantic \
    initcrypt.c -o initcrypt -lcrypto
```

For strict builds, add `-Werror`.

## Cryptographic pipeline

Closing a file applies:

```text
plaintext
→ SHA-256 plaintext checksum
→ random 16-byte salt
→ HKDF-SHA-256 per-file key derivation
→ random 12-byte nonce
→ AES-256-GCM encryption
→ authenticated versioned envelope
→ Base64 encoding
→ atomic in-place replacement
```

Opening reverses the pipeline:

```text
Base64 text
→ binary envelope
→ header validation
→ HKDF-SHA-256 per-file key derivation
→ AES-256-GCM authentication and decryption
→ atomic plaintext replacement
```

The raw master key is never used directly as the per-file AES key. HKDF derives a different key from the master key and each file's random salt.

## Envelope format

The Base64 text represents this binary structure:

| Field | Size | Purpose |
| --- | ---: | --- |
| Magic/version | 8 bytes | Identifies the `VCRYPT1` format |
| Salt | 16 bytes | Per-file HKDF salt |
| Nonce | 12 bytes | Per-file AES-GCM nonce |
| Original size | 8 bytes | Unsigned big-endian plaintext size |
| Authentication tag | 16 bytes | AES-GCM integrity tag |
| Ciphertext | Variable | Encrypted file content |

The magic, salt, nonce, and original size are authenticated as additional data. The salt, nonce, tag, size, and ciphertext are therefore self-contained in the encrypted file.

Metadata files assist orchestration and diagnosis, but are not required to reconstruct the cryptographic envelope.

## Raw key file

The master key file must contain exactly 32 raw binary bytes:

```text
32 bytes = 256 bits
```

When `initcrypt` generates `.key`, it creates it with owner-only mode `0600`.

Do not edit the key in a text editor. It is binary data, not hexadecimal or Base64 text.

### Internal key

Generate and retain the key inside the selected directory:

```bash
./initcrypt /intended/directory
```

This creates:

```text
/intended/directory/.key
```

### External key

Use an existing key stored outside the protected tree:

```bash
./initcrypt /intended/directory /secure/keys/valimo.key
```

External key placement provides meaningful protection if the encrypted directory is copied or stolen. A `.key` stored beside the encrypted files supports internal machinery and access-state transformation, but anyone obtaining both the files and key can decrypt them.

Back up the key through a separate protected mechanism. Losing the only key makes authenticated recovery computationally infeasible.

## Close one file

Use the default `.key` in the current working directory:

```bash
./closefile document.txt
```

Use an explicit key:

```bash
./closefile document.txt /secure/keys/valimo.key
```

Successful output:

```text
closed: document.txt
```

`closefile` refuses a file already carrying a valid `VCRYPT1` envelope.

## Open one file

Use the default `.key` in the current working directory:

```bash
./openfile document.txt
```

Use an explicit key:

```bash
./openfile document.txt /secure/keys/valimo.key
```

Successful output:

```text
opened: document.txt
```

The default key path is resolved from the process's current working directory, not automatically from the target file's directory. When opening recursively encrypted nested files, pass the root key explicitly:

```bash
./openfile /data/tree/branch/document.txt /data/tree/.key
```

## Recursively initialise encryption

Encrypt the current directory tree:

```bash
./initcrypt
```

Encrypt another directory tree:

```bash
./initcrypt /intended/directory
```

Encrypt using an external raw key:

```bash
./initcrypt /intended/directory /secure/keys/valimo.key
```

Example summary:

```text
initcrypt complete: encrypted=42 skipped=9 failed=0
```

`initcrypt` descends recursively into ordinary directories. It does not follow symbolic links.

## Per-file metadata

For a file named `document.txt`, the components maintain:

```text
.document.txt.checksum
.document.txt.hash
.document.txt.salt
.document.txt.encrypted
.document.txt.encoded
.document.txt.journal
```

| Metadata | Meaning |
| --- | --- |
| `.checksum` | SHA-256 hash of plaintext content |
| `.hash` | SHA-256 hash of the Base64 encrypted representation |
| `.salt` | Base64 representation of the per-file HKDF salt |
| `.encrypted` | Encryption state, restricted to `0` or `1` |
| `.encoded` | Base64 state, restricted to `0` or `1` |
| `.journal` | Last completed or prepared transformation phase |

After closure:

```text
.encrypted = 1
.encoded   = 1
.journal   = COMMITTED
```

After opening:

```text
.encrypted = 0
.encoded   = 0
.journal   = OPEN
```

Metadata files are owner-only mode `0600`.

## Journal and recovery semantics

Closure transitions through:

```text
PREPARED → COMMITTED
```

Opening transitions through:

```text
OPEN_PREPARED → OPEN
```

The target is written to a temporary file in the same directory, flushed with `fsync()`, and then atomically renamed over the original path.

If a failure occurs before the rename, the original target remains unchanged. If the target has been replaced but metadata publication is interrupted, the envelope itself still contains the cryptographic recovery fields.

Treat `PREPARED` and `OPEN_PREPARED` as conditions requiring inspection before another automated transition.

## Exclusions and refusals

`initcrypt` skips:

- symbolic links;
- its selected key path;
- recognised metadata files;
- files already recognised as `VCRYPT1` envelopes;
- non-regular filesystem objects.

Hard-linked files are refused and counted as failures. Replacing one hard link would break link relationships while leaving other names potentially plaintext, so automatic processing would provide an incomplete security result.

## In-place behavior

Encryption and decryption preserve the target pathname. They do not add an encrypted filename extension.

Before:

```text
document.txt → plaintext bytes
```

After `closefile`:

```text
document.txt → Base64 authenticated encrypted envelope
```

After `openfile`:

```text
document.txt → original plaintext bytes
```

Because transformation is in place, maintain independent backups before processing irreplaceable data.

## Authentication failure

A wrong key or altered envelope produces an error such as:

```text
openfile: document.txt: Bad message
```

Authentication failure occurs before plaintext replacement. The encrypted target remains unchanged.

Never bypass authentication or attempt to treat unauthenticated output as recovered plaintext.

## Exit status

| Component | Status `0` | Non-zero status |
| --- | --- | --- |
| `closefile` | File closed successfully | Validation, key, encryption, encoding, metadata, or replacement failed |
| `openfile` | File opened successfully | Format, key, authentication, decoding, metadata, or replacement failed |
| `initcrypt` | Recursive pass completed without file failures | Invalid key, inaccessible directory, refused hard link, or file transformation failed |

Skipped symbolic links, metadata, and already encrypted envelopes are reported through the summary but do not inherently make the run fail.

## Current limits

- Files are processed in memory rather than streamed.
- Individual file size is limited to `INT_MAX` bytes by the current OpenSSL update interface usage.
- Base64 increases stored size by approximately one third, plus the 60-byte binary envelope before encoding.
- Sparse-file layout is not preserved.
- Original timestamps and extended attributes are not explicitly restored.
- File mode permission bits are retained; ownership follows normal replacement semantics.
- Directory traversal is sequential.
- Key rotation is not yet implemented.
- There is no automatic recursive `opencrypt` counterpart yet.

## Operational safety

1. Test round-trip behavior on disposable copies before production use.
2. Keep at least one verified backup outside the transformed tree.
3. Protect and separately back up the raw master key.
4. Prefer an external key path for confidentiality.
5. Do not run concurrent close/open operations against the same file.
6. Review non-zero `initcrypt` summaries before considering the directory fully closed.
7. Inspect incomplete journal states before retrying.
8. Avoid running as root unless directory ownership and all writers are controlled.

## Command summary

| Command | Operation |
| --- | --- |
| `./closefile FILE` | Close one file using `./.key` |
| `./closefile FILE KEY_FILE` | Close one file using an explicit raw key |
| `./openfile FILE` | Open one file using `./.key` |
| `./openfile FILE KEY_FILE` | Open one file using an explicit raw key |
| `./initcrypt` | Recursively close the current directory using or creating `./.key` |
| `./initcrypt DIRECTORY` | Recursively close a directory using or creating `DIRECTORY/.key` |
| `./initcrypt DIRECTORY KEY_FILE` | Recursively close a directory using an explicit raw key |
