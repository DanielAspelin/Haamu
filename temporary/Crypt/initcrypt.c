#include "cryptcore.h"
#include <dirent.h>

static const char *master_key_path;
static size_t encrypted_count, skipped_count, failed_count;

static bool metadata_name(const char *name)
{
    const char *suffixes[] = {".checksum", ".hash", ".salt", ".encrypted", ".encoded", ".journal"};
    size_t length = strlen(name);
    for (size_t index = 0; index < sizeof suffixes / sizeof suffixes[0]; ++index) {
        size_t suffix_length = strlen(suffixes[index]);
        if (length >= suffix_length && strcmp(name + length - suffix_length, suffixes[index]) == 0) return true;
    }
    return false;
}

static void walk(const char *directory)
{
    DIR *stream = opendir(directory);
    struct dirent *entry;
    if (!stream) { fprintf(stderr, "initcrypt: %s: %s\n", directory, strerror(errno)); ++failed_count; return; }
    while ((entry = readdir(stream)) != NULL) {
        char path[PATH_MAX]; struct stat status;
        if (!strcmp(entry->d_name, ".") || !strcmp(entry->d_name, "..")) continue;
        if (snprintf(path, sizeof path, "%s/%s", directory, entry->d_name) >= (int)sizeof path) { ++failed_count; continue; }
        if (lstat(path, &status) != 0) { ++failed_count; continue; }
        if (S_ISLNK(status.st_mode)) { ++skipped_count; continue; }
        if (S_ISDIR(status.st_mode)) { walk(path); continue; }
        if (!S_ISREG(status.st_mode) || !strcmp(path, master_key_path) || metadata_name(entry->d_name)) { ++skipped_count; continue; }
        if (status.st_nlink != 1) { fprintf(stderr, "initcrypt: hard link refused: %s\n", path); ++failed_count; continue; }
        if (vc_encrypt_file(path, master_key_path)) { printf("closed: %s\n", path); ++encrypted_count; }
        else if (errno == EALREADY) ++skipped_count;
        else { fprintf(stderr, "initcrypt: %s: %s\n", path, strerror(errno)); ++failed_count; }
    }
    closedir(stream);
}

int main(int argc, char **argv)
{
    const char *directory = argc >= 2 ? argv[1] : ".";
    char generated_key[PATH_MAX];
    if (argc > 3) { fprintf(stderr, "usage: %s [DIRECTORY] [KEY_FILE]\n", argv[0]); return 1; }
    if (argc == 3) master_key_path = argv[2];
    else {
        if (snprintf(generated_key, sizeof generated_key, "%s/.key", directory) >= (int)sizeof generated_key) return 1;
        master_key_path = generated_key;
        if (access(master_key_path, F_OK) != 0 && !vc_create_key(master_key_path)) {
            fprintf(stderr, "initcrypt: cannot create key: %s\n", strerror(errno)); return 1;
        }
    }
    unsigned char test_key[VC_KEY_SIZE];
    if (!vc_read_key(master_key_path, test_key)) { fprintf(stderr, "initcrypt: invalid key file\n"); return 1; }
    OPENSSL_cleanse(test_key, sizeof test_key);
    walk(directory);
    printf("initcrypt complete: encrypted=%zu skipped=%zu failed=%zu\n",
           encrypted_count, skipped_count, failed_count);
    return failed_count ? 1 : 0;
}
