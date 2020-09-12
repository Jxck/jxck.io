#include <stdio.h>
#include <string.h>
#include <openssl/mem.h>
#include "util.h"
#include "issue.h"
#include "redeem.h"
#include "key_generator.h"

#define FLAG_ISSUE  "--issue"
#define FLAG_REDEEM "--redeem"
#define FLAG_KEY_GENERATE "--key-generate"
#define FLAG_TEST "--test"

int main(int argc, char *argv[]) {

  char *flag = argv[1];

  if (strcmp(flag, FLAG_TEST) == 0) {
    /** test **/
    return EXIT_SUCCESS;
  }

  if (strcmp(flag, FLAG_ISSUE) == 0 && argc == 3) {
    uint8_t* request_base64 = argv[2];
    size_t request_base64_len = strlen(request_base64);
    fprintf(stderr, "\e[0;31mISSUE REQUEST(%lu)\e[0m: %s\n\n", request_base64_len, request_base64);

    uint8_t* response_base64;
    size_t response_base64_len;
    if (!issue(request_base64, request_base64_len, &response_base64, &response_base64_len)) {
      fprintf(stderr, "failed to issue\n");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "\e[0;31mISSUE RESPONSE(%lu)\e[0m: %s\n\n", response_base64_len, response_base64);

    // output for stdout
    printf("%s", response_base64);

    return EXIT_SUCCESS;
  }

  if (strcmp(flag, FLAG_REDEEM) == 0 && argc == 3) {
    uint8_t* request_base64 = argv[2];
    size_t request_base64_len = strlen(request_base64);
    fprintf(stderr, "\e[0;31mREDEEM REQUEST(%lu)\e[0m: %s\n", request_base64_len, request_base64);

    uint8_t* response_base64;
    size_t response_base64_len;
    if (!redeem(request_base64, request_base64_len, &response_base64, &response_base64_len)) {
      fprintf(stderr, "failed to redeem\n");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "\e[0;31mREDEEM RESPONSE(%lu)\e[0m: %s\n", response_base64_len, response_base64);

    // output for stdout
    printf("%s", response_base64);

    return EXIT_SUCCESS;
  }

  if (strcmp(flag, FLAG_KEY_GENERATE) == 0 && argc == 2) {
    base64_keys_t keys;
    if (!key_generate(&keys)) {
      fprintf(stderr, "failed to generate keys\n");
      return EXIT_FAILURE;
    };

    fprintf(stdout,
        "{\n"
        "  \"priv_key_base64\": \"%s\",\n"
        "  \"pub_key_base64\": \"%s\",\n"
        "  \"srr_priv_key_base64\": \"%s\",\n"
        "  \"srr_pub_key_base64\": \"%s\"\n"
        "}\n",
        keys.priv_key_base64,
        keys.pub_key_base64,
        keys.srr_priv_key_base64,
        keys.srr_pub_key_base64
        );

    // save to file
    if (!write_file("./keys/priv_key.txt", keys.priv_key_base64, keys.priv_key_base64_len)) {
      fprintf(stderr, "failed to write key");
      return EXIT_FAILURE;
    }
    if (!write_file("./keys/pub_key.txt", keys.pub_key_base64, keys.pub_key_base64_len)) {
      fprintf(stderr, "failed to write key");
      return EXIT_FAILURE;
    }
    if (!write_file("./keys/srr_priv_key.txt", keys.srr_priv_key_base64, keys.srr_priv_key_base64_len)) {
      fprintf(stderr, "failed to write key");
      return EXIT_FAILURE;
    }
    if (!write_file("./keys/srr_pub_key.txt", keys.srr_pub_key_base64, keys.srr_pub_key_base64_len)) {
      fprintf(stderr, "failed to write key");
      return EXIT_FAILURE;
    }

    free(keys.pub_key_base64);
    free(keys.priv_key_base64);
    free(keys.srr_pub_key_base64);
    free(keys.srr_priv_key_base64);
    return EXIT_SUCCESS;
  }

  fprintf(stderr, "argument error\n");
  return EXIT_FAILURE;
}
