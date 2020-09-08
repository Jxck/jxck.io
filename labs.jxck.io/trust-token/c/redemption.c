#include <stdio.h>
#include <stdlib.h>
#include <string.h>
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


int main(int argc,char *argv[]) {
  if (argc < 2) {
    return 1;
  }
  fprintf(stderr, "\n\nnew redemption request =========================================\n");

  // 1. Sec-Trust-Token
  uint8_t* sec_trust_token = argv[1];
  int sec_trust_token_len = strlen(sec_trust_token);
  fprintf(stderr, "\nsec_trust_token[%u]: %s\n", sec_trust_token_len, sec_trust_token);

  // 2. Base64 decode
  size_t redeem_request_len;
  uint8_t* redeem_request;
  base64_decode(sec_trust_token, sec_trust_token_len, &redeem_request, &redeem_request_len);
  fprintf(stderr, "\nredeem_request(%li):", redeem_request_len);
  hexdump(redeem_request, redeem_request_len);

  // 3. Trust Token Issuer
  const TRUST_TOKEN_METHOD *method = TRUST_TOKEN_experiment_v1();
  uint16_t issuer_max_batchsize = 10;
  TRUST_TOKEN_ISSUER* issuer = TRUST_TOKEN_ISSUER_new(method, issuer_max_batchsize);
  if (!issuer) {
    fprintf(stderr, "failed to create TRUST_TOKEN Issuer. maybe max_batchsize(%i) is too large\n", issuer_max_batchsize);
    exit(0);
  }

  // 4. Private Key
  uint8_t priv_key_base64[] = "AAAAAQgqmjlRQTPB3JZVxDkpKFpxkQVIi1hznN4HU7vgEAQ5lT90Q1hGHBBH55we8HSUgeqq2t6KwjHnwWcLQeHCafpqQvSfeaOQwHOS9+1k9ccuu7d35BmrVE0dQl7l/yRg9nEEqX9Aopn/81tO//ImdvtV5540r8iJbRzhQI8t+DBNmnxRWm4ECq2idPgLet80raieM+3B+SBJaLSQxZF1e4vcdkxZx1ke1fig4PMOmdIYclP9rFxK2iOX46CccSSfi0sU+l5hS4ayXJM5C9ybkk9cM5JfBGMnNJNOAJWs2oznW13TW/N8G2Y8upc8AO4EhBqDVt/pm1QLCqb6ov06Uh0dKby78xZYrAn0l6RAL62w6ocAF6NeD9uOSXgEAYKVBw==";
  size_t priv_key_base64_len = sizeof(priv_key_base64) - 1;

  size_t priv_key_len;
  uint8_t* priv_key;
  base64_decode(priv_key_base64, priv_key_base64_len, &priv_key, &priv_key_len);
  fprintf(stderr, "\npriv_key(%li):", priv_key_len);
  hexdump(priv_key, priv_key_len);

  // 5. Add Private Key to Issuer
  if (!TRUST_TOKEN_ISSUER_add_key(issuer, priv_key, priv_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  // 6. ED25519 Private Key
  uint8_t srr_priv_key_base64[]  = "h3bsKoAIBeghGumCc5KOcrpvTDwx9wpYFir+HPIVgaNe3/jA/GfHdRkWbMF9p1jARGu+nRfewtbu8UeGtAzujA==";
  size_t srr_priv_key_base64_len = sizeof(srr_priv_key_base64) - 1;

  size_t srr_priv_key_len;
  uint8_t* srr_priv_key;
  base64_decode(srr_priv_key_base64, srr_priv_key_base64_len, &srr_priv_key, &srr_priv_key_len);
  fprintf(stderr, "\nsrr_priv_key(%li):", srr_priv_key_len);
  hexdump(srr_priv_key, srr_priv_key_len);

  // 7. Private Key to |EVP_PKEY|
  // 1:success, 0:error
  EVP_PKEY* ed25519_priv = EVP_PKEY_new_raw_private_key(EVP_PKEY_ED25519, NULL, srr_priv_key, 32); // TODO: 64 ??
  if (!ed25519_priv) {
    fprintf(stderr, "failed to generate EVP_PKEY.\n");
    exit(0);
  }

  // 8. Set Private Key to Issuer
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_set_srr_key(issuer, ed25519_priv)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  /// redeem

  // 7. issuer redeem
  // |request| を redemption し token を検証する
  // token が valid なら、 |lifetime| 秒の SRR が生成され、
  // リクエストされた data と token を署名し、
  // |out| に入れて返す
  // 取り出された |TRUST_TOKEN| は |out_token|
  // 取り出された client data が |out_client_data|
  // redemption time は |*out_redemption_time|
  // 終わったら |OPENSSL_free|
  // 1:success, 0:error
  uint8_t  *redeem_resp = NULL;
  size_t   redeem_resp_len;
  TRUST_TOKEN *rtoken;
  uint8_t  *client_data;
  size_t   client_data_len;
  uint64_t redemption_time;
  int lifetime = 600;
  if (!TRUST_TOKEN_ISSUER_redeem(issuer,
                                 &redeem_resp, &redeem_resp_len,
                                 &rtoken,
                                 &client_data, &client_data_len,
                                 &redemption_time,
                                 redeem_request, redeem_request_len,
                                 lifetime)) {
    fprintf(stderr, "failed to redeem in TRUST_TOKEN Issuer.\n");
    exit(0);
  }
  fprintf(stderr, "ISSUER(redeem) redeem_resp:      %p\n",  redeem_resp);
  fprintf(stderr, "ISSUER(redeem) rtoken:           %p\n",  rtoken);
  fprintf(stderr, "ISSUER(redeem) client_data(%zu): %s\n",  client_data_len, client_data);
  fprintf(stderr, "ISSUER(redeem) redemption_time:  %lu\n", redemption_time);

  // encode response into Base64
  size_t response_base64_len;
  uint8_t* response_base64;
  if (!base64_encode(redeem_resp, redeem_resp_len, &response_base64, &response_base64_len)) {
    fprintf(stderr, "fail to encode base64\n");
    exit(0);
  }
  fprintf(stderr, "response_base64(%lu): %s\n", response_base64_len, response_base64);

  printf("%s", response_base64);

  return 0;
}
