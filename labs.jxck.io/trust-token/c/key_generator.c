#include <stdio.h>
#include <stdlib.h>
#include <openssl/base64.h>
#include <openssl/bytestring.h>
#include <openssl/curve25519.h>
#include <openssl/evp.h>
#include <openssl/mem.h>
#include <openssl/rand.h>
#include <openssl/sha.h>
#include <openssl/trust_token.h>

void hexdump(uint8_t *s, size_t len) {
  for(int i = 0; i < 3; i++) {
    fprintf(stderr, "0x%02x,", s[i]);
  }
  fprintf(stderr, "...");
  for(int j = len-3; j < len; j++) {
    fprintf(stderr, "0x%02x,", s[j]);
  }
  fprintf(stderr, "\n");
}

int base64_encode(uint8_t *buff, size_t buff_len,
                  uint8_t **out, size_t *out_len) {
  size_t encoded_len;
  if (!EVP_EncodedLength(&encoded_len, buff_len)) {
    fprintf(stderr, "failed to calculate base64 length");
    return 0;
  }

  *out = (uint8_t*)malloc((encoded_len)*sizeof(uint8_t));
  *out_len  = EVP_EncodeBlock(*out, buff, buff_len);
  return 1;
}

int base64_decode(uint8_t *buff, size_t buff_len,
                  uint8_t **out, size_t *out_len) {

  size_t decoded_len;
  if (!EVP_DecodedLength(&decoded_len, buff_len)) {
    fprintf(stderr, "failed to calculate decode length\n");
    return 0;
  }

  *out = (uint8_t*)malloc(decoded_len*sizeof(uint8_t));
  if (!EVP_DecodeBase64(*out, out_len, decoded_len, buff, buff_len)) {
    fprintf(stderr, "failed to decode base64\n");
    return 0;
  }

  return 1;
}

int main(int argc, char **argv) {

  // TRUST_TOKEN_experiment_v1 is an experimental Trust Tokens protocol using
  // PMBTokens and P-384.
  const TRUST_TOKEN_METHOD *method = TRUST_TOKEN_experiment_v1();
  uint8_t priv_key[TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE],
          pub_key[TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE];
  size_t  priv_key_len,
          pub_key_len;

  uint32_t key_id = 0x0001;

  // Trust Token keypair を生成
  // |id| がラベル
  // 秘密鍵の値と長さを |out_priv_key|  |*out_priv_key_len| に
  // 公開鍵の値と長さを |out_pub_key|   |*out_pub_key_len| に
  //
  // 最大長は |max_priv_key_len| and |max_pub_key_len| で
  // |TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE| and |TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE| にする
  //
  // WARNING: API は変わるかも。値は保存されないので自分で保持する。
  //
  // 1:success, 0:error
  if (!TRUST_TOKEN_generate_key(TRUST_TOKEN_experiment_v1(),
                                priv_key, &priv_key_len, TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE,
                                pub_key,  &pub_key_len,  TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE,
                                key_id)) {
    fprintf(stderr, "failed to generate TRUST_TOKEN key.\n");
    exit(0);
  }
  fprintf(stderr, "priv_key(%zu): \t", priv_key_len);
  hexdump(priv_key, priv_key_len);
  fprintf(stderr, "pub_key(%zu): \t", pub_key_len);
  hexdump(pub_key, pub_key_len);

  // ED25519 の公開鍵と秘密鍵のペアを生成
  // generated, public/private key pair.
  size_t srr_priv_key_len = ED25519_PRIVATE_KEY_LEN;
  size_t srr_pub_key_len  = ED25519_PUBLIC_KEY_LEN;
  uint8_t srr_priv_key[srr_priv_key_len];
  uint8_t srr_pub_key[srr_pub_key_len];
  ED25519_keypair(srr_pub_key, srr_priv_key);

  fprintf(stderr, "srr_priv_key(%lu): \t", srr_priv_key_len);
  hexdump(srr_priv_key, srr_priv_key_len);
  fprintf(stderr, "srr_pub_key(%lu): \t", srr_pub_key_len);
  hexdump(srr_pub_key, srr_pub_key_len);

  // Public Key の Base64
  size_t pub_key_base64_len;
  uint8_t* pub_key_base64;
  if (!base64_encode(pub_key, pub_key_len, &pub_key_base64, &pub_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    exit(0);
  }
  fprintf(stderr, "pub_key_base64(%lu): %s\n", pub_key_base64_len, pub_key_base64);

  // Private Key の Base64
  size_t priv_key_base64_len;
  uint8_t* priv_key_base64;
  if (!base64_encode(priv_key, priv_key_len, &priv_key_base64, &priv_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    exit(0);
  }
  fprintf(stderr, "priv_key_base64(%lu): %s\n", priv_key_base64_len, priv_key_base64);

  // SRR Public Key を Base64 にする
  size_t srr_pub_key_base64_len;
  uint8_t* srr_pub_key_base64;
  if (!base64_encode(srr_pub_key, srr_pub_key_len, &srr_pub_key_base64, &srr_pub_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    exit(0);
  }
  fprintf(stderr, "srr_pub_key_base64(%lu): %s\n", srr_pub_key_base64_len, srr_pub_key_base64);

  // SRR Private Key を Base64 にする
  size_t srr_priv_key_base64_len;
  uint8_t* srr_priv_key_base64;
  if (!base64_encode(srr_priv_key, srr_priv_key_len, &srr_priv_key_base64, &srr_priv_key_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    exit(0);
  }
  fprintf(stderr, "srr_priv_key_base64(%lu): %s\n", srr_priv_key_base64_len, srr_priv_key_base64);

  fprintf(stdout,
      "{\n"
      "  \"pub_key_base64\": \"%s\",\n"
      "  \"priv_key_base64\": \"%s\",\n"
      "  \"srr_priv_key_base64\": \"%s\",\n"
      "  \"srr_pub_key_base64\": \"%s\"\n"
      "}\n",
      pub_key_base64,
      priv_key_base64,
      srr_priv_key_base64,
      srr_pub_key_base64
      );

  size_t srr_priv_key_decoded_len;
  uint8_t* srr_priv_key_decoded;
  base64_decode(srr_priv_key_base64, srr_priv_key_base64_len, &srr_priv_key_decoded, &srr_priv_key_decoded_len);
  fprintf(stderr, "srr_priv_key(%li): \t", srr_priv_key_decoded_len);
  hexdump(srr_priv_key_decoded, srr_priv_key_decoded_len);

  size_t srr_pub_key_decoded_len;
  uint8_t* srr_pub_key_decoded;
  base64_decode(srr_pub_key_base64, srr_pub_key_base64_len, &srr_pub_key_decoded, &srr_pub_key_decoded_len);
  fprintf(stderr, "srr_pub_key(%li): \t", srr_pub_key_decoded_len);
  hexdump(srr_pub_key_decoded, srr_pub_key_decoded_len);

  free(pub_key_base64);
  free(priv_key_base64);
  free(srr_pub_key_base64);
  free(srr_priv_key_base64);
  free(srr_pub_key_decoded);
  free(srr_priv_key_decoded);
}
