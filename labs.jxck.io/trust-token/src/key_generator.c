#include <stdio.h>
#include <openssl/curve25519.h>
#include <openssl/trust_token.h>
#include "util.h"
#include "key_generator.h"

/**
 * success: 1
 * error: 0
 */
int key_generate(base64_keys_t *keys) {
  size_t  priv_key_len,
          pub_key_len,
          srr_priv_key_len = ED25519_PRIVATE_KEY_LEN,
          srr_pub_key_len  = ED25519_PUBLIC_KEY_LEN;

  uint8_t priv_key[TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE],
          pub_key[TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE],
          srr_priv_key[srr_priv_key_len],
          srr_pub_key[srr_pub_key_len];

  // KeyID of trust_token keys
  uint32_t key_id = 0x0001;

  // generate Trust Token keypair
  // 1:success, 0:error
  if (!TRUST_TOKEN_generate_key(TRUST_TOKEN_experiment_v1(),
                                priv_key, &priv_key_len, TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE,
                                pub_key,  &pub_key_len,  TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE,
                                key_id)) {
    fprintf(stderr, "failed to generate TRUST_TOKEN key.\n");
    return 0;
  }

  // generated, ED25519 public/private key pair.
  ED25519_keypair(srr_pub_key, srr_priv_key);

  // Base64 Public Key
  if (!base64_encode(pub_key, pub_key_len, &keys->pub_key_base64, &keys->pub_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    return 0;
  }

  // Base64 Private Key
  if (!base64_encode(priv_key, priv_key_len, &keys->priv_key_base64, &keys->priv_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    return 0;
  }

  // Base64 SRR Public Key
  if (!base64_encode(srr_pub_key, srr_pub_key_len, &keys->srr_pub_key_base64, &keys->srr_pub_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    return 0;
  }

  // Base64 SRR Private Key
  if (!base64_encode(srr_priv_key, srr_priv_key_len, &keys->srr_priv_key_base64, &keys->srr_priv_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    return 0;
  }

  return 1;
}
