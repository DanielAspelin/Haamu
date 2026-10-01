/*
 * Terraformer finalization/containerization sidecar.
 * v0.48.12 — experimental; does not replace the JavaScript/JSON runtime.
 * No automatic privilege, persistence, execution, or binary generation.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#define TF_BIN "terraformer.bin"
#define TF_ENTRY "terraformer.js"

static int run_node(const char *mode) {
    char command[512];
    if (mode && *mode)
        snprintf(command,sizeof(command),"node %s %s",TF_ENTRY,mode);
    else
        snprintf(command,sizeof(command),"node %s",TF_ENTRY);
    printf("Explicit invocation: %s\n",command);
    return system(command);
}
static int prepare_bin(void) {
    puts("terraformer.bin finalization is PREPARATION_ONLY in v0.48.12.");
    puts("No binary image is generated until the container manifest/format is qualified.");
    return 0;
}
int main(void) {
    char line[32];
    for (;;) {
        puts("\nTerraformer C Sidecar");
        puts("1. Invoke canonical Node.js entry");
        puts("2. Invoke Temporary compatibility mode");
        puts("3. Prepare terraformer.bin finalization");
        puts("0. Exit");
        fputs("> ",stdout);
        if (!fgets(line,sizeof(line),stdin)) return 0;
        if (!strcmp(line,"1\n")) run_node("");
        else if (!strcmp(line,"2\n")) run_node("--temporary");
        else if (!strcmp(line,"3\n")) prepare_bin();
        else if (!strcmp(line,"0\n")) return 0;
        else puts("Unknown selection.");
    }
}
