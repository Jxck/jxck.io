#include <stdio.h>
#include <openssl/evp.h>
#include <openssl/trust_token.h>
#include "util.h"


/**
 * success: 1
 * error: 0
 */
int redeem(uint8_t *request_base64, size_t request_base64_len, uint8_t **response_base64, size_t *response_base64_len) {
  // 1. Sec-Trust-Token
  // fprintf(stderr, "\e[0;31mREDEEM REQUEST(%lu)\e[0m: %s\n", request_base64_len, request_base64);

  // 2. Base64 decode
  size_t request_len;
  uint8_t* request;
  if (!base64_decode(request_base64, request_base64_len, &request, &request_len)) {
    fprintf(stderr, "failed to decode base64\n");
    return 0;
  }

  // 3. Trust Token Issuer
  const TRUST_TOKEN_METHOD *method = TRUST_TOKEN_experiment_v1();
  uint16_t issuer_max_batchsize = 10;
  TRUST_TOKEN_ISSUER* issuer = TRUST_TOKEN_ISSUER_new(method, issuer_max_batchsize);
  if (!issuer) {
    fprintf(stderr, "failed to create TRUST_TOKEN Issuer. maybe max_batchsize(%i) is too large\n", issuer_max_batchsize);
    return 0;
  }

  // 4. Private Key
  size_t priv_key_base64_size;
  uint8_t *priv_key_base64;
  if (!read_file(PRIV_KEY_PATH, &priv_key_base64, &priv_key_base64_size)) {
    fprintf(stderr, "failed to read file\n");
    return 0;
  };

  size_t priv_key_base64_len = priv_key_base64_size  - 1;

  size_t priv_key_len;
  uint8_t* priv_key;
  if (!base64_decode(priv_key_base64, priv_key_base64_len, &priv_key, &priv_key_len)) {
    fprintf(stderr, "failed to decode base64\n");
    return 0;
  }

  // 5. Add Private Key to Issuer
  if (!TRUST_TOKEN_ISSUER_add_key(issuer, priv_key, priv_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Issuer.\n");
    return 0;
  }

  // 6. ED25519 Private Key
  size_t srr_priv_key_base64_size;
  uint8_t *srr_priv_key_base64;
  if (!read_file(SRR_PRIV_KEY_PATH, &srr_priv_key_base64, &srr_priv_key_base64_size)) {
    fprintf(stderr, "failed to read file\n");
    return 0;
  };

  size_t srr_priv_key_base64_len = srr_priv_key_base64_size - 1;

  size_t srr_priv_key_len;
  uint8_t* srr_priv_key;
  if (!base64_decode(srr_priv_key_base64, srr_priv_key_base64_len, &srr_priv_key, &srr_priv_key_len)) {
    fprintf(stderr, "failed to decode base64\n");
    return 0;
  }

  // 7. Private Key to |EVP_PKEY|
  // 1:success, 0:error
  EVP_PKEY* ed25519_priv = EVP_PKEY_new_raw_private_key(EVP_PKEY_ED25519, NULL, srr_priv_key, 32); // TODO: 64 ??
  if (!ed25519_priv) {
    fprintf(stderr, "failed to generate EVP_PKEY.\n");
    return 0;
  }

  // 8. Set Private Key to Issuer
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_set_srr_key(issuer, ed25519_priv)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Issuer.\n");
    return 0;
  }

  /// redeem

  // 7. issuer redeem
  // validate redeemed token
  // if token is valid , SSR generated with |lifetime| sec
  // signed requested data & token are |out|
  // 1:success, 0:error
  uint8_t  *response = NULL;
  size_t   response_len;
  TRUST_TOKEN *rtoken;
  uint8_t  *client_data;
  size_t   client_data_len;
  uint64_t redemption_time;
  int lifetime = 600;
  if (!TRUST_TOKEN_ISSUER_redeem(issuer,
                                 &response, &response_len,
                                 &rtoken,
                                 &client_data, &client_data_len,
                                 &redemption_time,
                                 request, request_len,
                                 lifetime)) {
    fprintf(stderr, "failed to redeem in TRUST_TOKEN Issuer.\n");
    return 0;
  }

  // encode response into Base64
  if (!base64_encode(response, response_len, response_base64, response_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    return 0;
  }

  // fprintf(stderr, "\e[0;31mREDEEM RESPONSE(%ld)\e[0m: %s\n", *response_base64_len, *response_base64);

  return 1;
}
