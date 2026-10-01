#include "cryptcore.h"

int main(int argc, char **argv)
{
    const char *key = argc == 3 ? argv[2] : ".key";
    if (argc < 2 || argc > 3) { fprintf(stderr, "usage: %s FILE [KEY_FILE]\n", argv[0]); return 1; }
    if (!vc_decrypt_file(argv[1], key)) { fprintf(stderr, "openfile: %s: %s\n", argv[1], strerror(errno)); return 1; }
    printf("opened: %s\n", argv[1]);
    return 0;
}
