#ifndef VALIMO_CRYPTCORE_H
#define VALIMO_CRYPTCORE_H

#define _POSIX_C_SOURCE 200809L

#include <errno.h>
#include <fcntl.h>
#include <limits.h>
#include <openssl/core_names.h>
#include <openssl/crypto.h>
#include <openssl/evp.h>
#include <openssl/kdf.h>
#include <openssl/params.h>
#include <openssl/rand.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#define VC_KEY_SIZE 32
#define VC_SALT_SIZE 16
#define VC_NONCE_SIZE 12
#define VC_TAG_SIZE 16
#define VC_HEADER_SIZE 60

static const unsigned char vc_magic[8] = {'V','C','R','Y','P','T','1','\0'};

static void vc_u64_write(unsigned char *out, uint64_t value)
{
    for (int index = 7; index >= 0; --index) { out[index] = (unsigned char)value; value >>= 8; }
}

static uint64_t vc_u64_read(const unsigned char *in)
{
    uint64_t value = 0;
    for (int index = 0; index < 8; ++index) value = (value << 8) | in[index];
    return value;
}

static bool vc_read_bytes(const char *path, unsigned char **data, size_t *size,
                          struct stat *status)
{
    FILE *file = NULL;
    unsigned char *buffer = NULL;
    long length;
    if (stat(path, status) != 0 || !S_ISREG(status->st_mode)) return false;
    file = fopen(path, "rb");
    if (!file) return false;
    if (fseek(file, 0, SEEK_END) != 0 || (length = ftell(file)) < 0 ||
        fseek(file, 0, SEEK_SET) != 0) { fclose(file); return false; }
    buffer = malloc((size_t)length + 1);
    if (!buffer) { fclose(file); errno = ENOMEM; return false; }
    if ((size_t)length && fread(buffer, 1, (size_t)length, file) != (size_t)length) {
        free(buffer); fclose(file); return false;
    }
    if (fclose(file) != 0) { free(buffer); return false; }
    *data = buffer; *size = (size_t)length;
    return true;
}

static bool vc_atomic_replace(const char *path, const unsigned char *data,
                              size_t size, mode_t mode)
{
    char temporary[PATH_MAX];
    int descriptor;
    size_t written = 0;
    if (snprintf(temporary, sizeof temporary, "%s.vcrypt.tmp.%ld", path,
                 (long)getpid()) >= (int)sizeof temporary) { errno = ENAMETOOLONG; return false; }
    descriptor = open(temporary, O_WRONLY | O_CREAT | O_EXCL, mode & 0777);
    if (descriptor < 0) return false;
    while (written < size) {
        ssize_t amount = write(descriptor, data + written, size - written);
        if (amount < 0 && errno == EINTR) continue;
        if (amount <= 0) { close(descriptor); unlink(temporary); return false; }
        written += (size_t)amount;
    }
    if (fsync(descriptor) != 0 || close(descriptor) != 0 || rename(temporary, path) != 0) {
        int saved = errno; unlink(temporary); errno = saved; return false;
    }
    return true;
}

static bool vc_write_text(const char *path, const char *suffix, const char *value)
{
    char metadata[PATH_MAX], temporary[PATH_MAX];
    const char *slash = strrchr(path, '/');
    const char *name = slash ? slash + 1 : path;
    int prefix = slash ? (int)(slash - path + 1) : 0;
    int descriptor;
    size_t length = strlen(value), written = 0;
    if (snprintf(metadata, sizeof metadata, "%.*s.%s.%s", prefix, path, name, suffix) >=
        (int)sizeof metadata || snprintf(temporary, sizeof temporary, "%s.tmp.%ld", metadata,
        (long)getpid()) >= (int)sizeof temporary) { errno = ENAMETOOLONG; return false; }
    descriptor = open(temporary, O_WRONLY | O_CREAT | O_EXCL, 0600);
    if (descriptor < 0) return false;
    while (written < length) {
        ssize_t amount = write(descriptor, value + written, length - written);
        if (amount < 0 && errno == EINTR) continue;
        if (amount <= 0) { close(descriptor); unlink(temporary); return false; }
        written += (size_t)amount;
    }
    if (write(descriptor, "\n", 1) != 1 || fsync(descriptor) != 0 ||
        close(descriptor) != 0 || rename(temporary, metadata) != 0) {
        int saved = errno; unlink(temporary); errno = saved; return false;
    }
    return true;
}

static bool vc_read_key(const char *path, unsigned char key[VC_KEY_SIZE])
{
    struct stat status;
    FILE *file;
    if (stat(path, &status) != 0 || !S_ISREG(status.st_mode) || status.st_size != VC_KEY_SIZE) {
        errno = EINVAL; return false;
    }
    file = fopen(path, "rb");
    if (!file) return false;
    bool ok = fread(key, 1, VC_KEY_SIZE, file) == VC_KEY_SIZE && fgetc(file) == EOF;
    fclose(file);
    if (!ok) errno = EINVAL;
    return ok;
}

static bool __attribute__((unused)) vc_create_key(const char *path)
{
    unsigned char key[VC_KEY_SIZE];
    int descriptor;
    if (RAND_priv_bytes(key, sizeof key) != 1) return false;
    descriptor = open(path, O_WRONLY | O_CREAT | O_EXCL, 0600);
    if (descriptor < 0) { OPENSSL_cleanse(key, sizeof key); return false; }
    bool ok = write(descriptor, key, sizeof key) == (ssize_t)sizeof key &&
              fsync(descriptor) == 0 && close(descriptor) == 0;
    if (!ok) { int saved = errno; close(descriptor); unlink(path); errno = saved; }
    OPENSSL_cleanse(key, sizeof key);
    return ok;
}

static bool vc_derive(const unsigned char master[VC_KEY_SIZE],
                      const unsigned char salt[VC_SALT_SIZE],
                      unsigned char key[VC_KEY_SIZE])
{
    EVP_KDF *kdf = EVP_KDF_fetch(NULL, "HKDF", NULL);
    EVP_KDF_CTX *context = kdf ? EVP_KDF_CTX_new(kdf) : NULL;
    char digest[] = "SHA256";
    unsigned char info[] = "valimo-file-closure-v1";
    OSSL_PARAM parameters[] = {
        OSSL_PARAM_construct_utf8_string(OSSL_KDF_PARAM_DIGEST, digest, 0),
        OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_KEY, (void *)master, VC_KEY_SIZE),
        OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_SALT, (void *)salt, VC_SALT_SIZE),
        OSSL_PARAM_construct_octet_string(OSSL_KDF_PARAM_INFO, info, sizeof info - 1),
        OSSL_PARAM_construct_end()
    };
    bool ok = context && EVP_KDF_derive(context, key, VC_KEY_SIZE, parameters) == 1;
    EVP_KDF_CTX_free(context); EVP_KDF_free(kdf);
    return ok;
}

static void vc_hex_sha256(const unsigned char *data, size_t size, char output[65])
{
    unsigned char digest[32]; unsigned int digest_size = 0;
    if (EVP_Digest(data, size, digest, &digest_size, EVP_sha256(), NULL) != 1) {
        strcpy(output, "unavailable"); return;
    }
    for (unsigned int index = 0; index < digest_size; ++index)
        snprintf(output + index * 2, 3, "%02x", digest[index]);
    output[64] = '\0';
}

static bool vc_is_envelope(const unsigned char *text, size_t size)
{
    unsigned char decoded[12];
    if (size < 12 || EVP_DecodeBlock(decoded, text, 12) < 8) return false;
    return memcmp(decoded, vc_magic, sizeof vc_magic) == 0;
}

static bool __attribute__((unused)) vc_encrypt_file(const char *path, const char *key_path)
{
    struct stat status;
    unsigned char *plain = NULL, *cipher = NULL, *envelope = NULL, *encoded = NULL;
    size_t plain_size = 0, encoded_size;
    unsigned char master[VC_KEY_SIZE], key[VC_KEY_SIZE], salt[VC_SALT_SIZE];
    unsigned char nonce[VC_NONCE_SIZE], tag[VC_TAG_SIZE], header[44];
    EVP_CIPHER_CTX *context = NULL;
    int output_size = 0, final_size = 0;
    char checksum[65], hash[65], salt_text[4 * ((VC_SALT_SIZE + 2) / 3) + 1];
    bool ok = false;

    if (!vc_read_bytes(path, &plain, &plain_size, &status) || status.st_nlink != 1) goto done;
    if (vc_is_envelope(plain, plain_size)) { errno = EALREADY; goto done; }
    if (plain_size > INT_MAX) { errno = EFBIG; goto done; }
    if (!vc_read_key(key_path, master) || RAND_priv_bytes(salt, sizeof salt) != 1 ||
        RAND_priv_bytes(nonce, sizeof nonce) != 1 || !vc_derive(master, salt, key)) goto done;

    memcpy(header, vc_magic, 8); memcpy(header + 8, salt, 16); memcpy(header + 24, nonce, 12);
    vc_u64_write(header + 36, plain_size);
    cipher = malloc(plain_size + 16); envelope = malloc(VC_HEADER_SIZE + plain_size);
    if (!cipher || !envelope) { errno = ENOMEM; goto done; }
    context = EVP_CIPHER_CTX_new();
    if (!context || EVP_EncryptInit_ex(context, EVP_aes_256_gcm(), NULL, NULL, NULL) != 1 ||
        EVP_CIPHER_CTX_ctrl(context, EVP_CTRL_GCM_SET_IVLEN, VC_NONCE_SIZE, NULL) != 1 ||
        EVP_EncryptInit_ex(context, NULL, NULL, key, nonce) != 1 ||
        EVP_EncryptUpdate(context, NULL, &output_size, header, sizeof header) != 1 ||
        EVP_EncryptUpdate(context, cipher, &output_size, plain, (int)plain_size) != 1 ||
        EVP_EncryptFinal_ex(context, cipher + output_size, &final_size) != 1 ||
        EVP_CIPHER_CTX_ctrl(context, EVP_CTRL_GCM_GET_TAG, VC_TAG_SIZE, tag) != 1) goto done;
    memcpy(envelope, header, 44); memcpy(envelope + 44, tag, 16);
    memcpy(envelope + VC_HEADER_SIZE, cipher, (size_t)(output_size + final_size));
    encoded_size = 4 * ((VC_HEADER_SIZE + plain_size + 2) / 3);
    encoded = malloc(encoded_size + 1);
    if (!encoded) { errno = ENOMEM; goto done; }
    if (EVP_EncodeBlock(encoded, envelope, (int)(VC_HEADER_SIZE + plain_size)) < 0) goto done;
    encoded[encoded_size] = '\0';

    vc_hex_sha256(plain, plain_size, checksum); vc_hex_sha256(encoded, encoded_size, hash);
    EVP_EncodeBlock((unsigned char *)salt_text, salt, VC_SALT_SIZE);
    if (!vc_write_text(path, "journal", "PREPARED") ||
        !vc_atomic_replace(path, encoded, encoded_size, status.st_mode) ||
        !vc_write_text(path, "checksum", checksum) || !vc_write_text(path, "hash", hash) ||
        !vc_write_text(path, "salt", salt_text) || !vc_write_text(path, "encrypted", "1") ||
        !vc_write_text(path, "encoded", "1") || !vc_write_text(path, "journal", "COMMITTED")) goto done;
    ok = true;
done:
    EVP_CIPHER_CTX_free(context);
    OPENSSL_cleanse(master, sizeof master); OPENSSL_cleanse(key, sizeof key);
    if (plain) { OPENSSL_cleanse(plain, plain_size); free(plain); }
    free(cipher); free(envelope); free(encoded);
    return ok;
}

static bool __attribute__((unused)) vc_decrypt_file(const char *path, const char *key_path)
{
    struct stat status;
    unsigned char *encoded = NULL, *envelope = NULL, *plain = NULL;
    size_t encoded_size = 0, envelope_size, padding = 0, cipher_size;
    unsigned char master[VC_KEY_SIZE], key[VC_KEY_SIZE];
    EVP_CIPHER_CTX *context = NULL;
    int output_size = 0, final_size = 0, decoded_size;
    uint64_t expected_size;
    char checksum[65];
    bool ok = false;
    if (!vc_read_bytes(path, &encoded, &encoded_size, &status) || status.st_nlink != 1 ||
        encoded_size > INT_MAX || encoded_size % 4 != 0 || !vc_read_key(key_path, master)) goto done;
    envelope = malloc(3 * (encoded_size / 4) + 1);
    if (!envelope) { errno = ENOMEM; goto done; }
    decoded_size = EVP_DecodeBlock(envelope, encoded, (int)encoded_size);
    if (decoded_size < 0) { errno = EINVAL; goto done; }
    if (encoded_size && encoded[encoded_size - 1] == '=') ++padding;
    if (encoded_size > 1 && encoded[encoded_size - 2] == '=') ++padding;
    envelope_size = (size_t)decoded_size - padding;
    if (envelope_size < VC_HEADER_SIZE || memcmp(envelope, vc_magic, 8) != 0) { errno = EINVAL; goto done; }
    expected_size = vc_u64_read(envelope + 36); cipher_size = envelope_size - VC_HEADER_SIZE;
    if (expected_size != cipher_size || cipher_size > INT_MAX) { errno = EINVAL; goto done; }
    if (!vc_derive(master, envelope + 8, key)) goto done;
    plain = malloc(cipher_size + 1);
    if (!plain) { errno = ENOMEM; goto done; }
    context = EVP_CIPHER_CTX_new();
    if (!context || EVP_DecryptInit_ex(context, EVP_aes_256_gcm(), NULL, NULL, NULL) != 1 ||
        EVP_CIPHER_CTX_ctrl(context, EVP_CTRL_GCM_SET_IVLEN, VC_NONCE_SIZE, NULL) != 1 ||
        EVP_DecryptInit_ex(context, NULL, NULL, key, envelope + 24) != 1 ||
        EVP_DecryptUpdate(context, NULL, &output_size, envelope, 44) != 1 ||
        EVP_DecryptUpdate(context, plain, &output_size, envelope + VC_HEADER_SIZE,
                          (int)cipher_size) != 1 ||
        EVP_CIPHER_CTX_ctrl(context, EVP_CTRL_GCM_SET_TAG, VC_TAG_SIZE, envelope + 44) != 1 ||
        EVP_DecryptFinal_ex(context, plain + output_size, &final_size) != 1) { errno = EBADMSG; goto done; }
    vc_hex_sha256(plain, (size_t)(output_size + final_size), checksum);
    if (!vc_write_text(path, "journal", "OPEN_PREPARED") ||
        !vc_atomic_replace(path, plain, (size_t)(output_size + final_size), status.st_mode) ||
        !vc_write_text(path, "checksum", checksum) || !vc_write_text(path, "encrypted", "0") ||
        !vc_write_text(path, "encoded", "0") || !vc_write_text(path, "journal", "OPEN")) goto done;
    ok = true;
done:
    EVP_CIPHER_CTX_free(context);
    OPENSSL_cleanse(master, sizeof master); OPENSSL_cleanse(key, sizeof key);
    if (plain) { OPENSSL_cleanse(plain, cipher_size); free(plain); }
    free(encoded); free(envelope);
    return ok;
}

#endif
