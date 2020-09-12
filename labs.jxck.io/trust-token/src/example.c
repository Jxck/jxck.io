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

int main(int argc, char **argv) {
  // TRUST_TOKEN_experiment_v1 is an experimental Trust Tokens protocol using
  // PMBTokens and P-384.
  const TRUST_TOKEN_METHOD *method = TRUST_TOKEN_experiment_v1();
  uint8_t  priv_key[TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE];
  uint8_t  pub_key[TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE];
  size_t   priv_key_len, pub_key_len;
  uint32_t key_id = 0x0001;

  // generate Trust Token keypair
  // |id|: id for key
  // 1:success, 0:error
  if (!TRUST_TOKEN_generate_key(TRUST_TOKEN_experiment_v1(),
                                priv_key, &priv_key_len, TRUST_TOKEN_MAX_PRIVATE_KEY_SIZE,
                                pub_key,  &pub_key_len,  TRUST_TOKEN_MAX_PUBLIC_KEY_SIZE,
                                key_id)) {
    fprintf(stderr, "failed to generate TRUST_TOKEN key.\n");
    exit(0);
  }
  fprintf(stderr, "priv_key_len: \t%zu\n", priv_key_len);
  fprintf(stderr, "pub_key_len: \t%zu\n",  pub_key_len);

  // Client Side Implementation
  //
  // generate |TRUST_TOKEN_CLIENT|
  // bactch sould be smaller than |max_batchsize|
  // error if |max_batchsize| is too big
  uint16_t client_max_batchsize = 10;
  TRUST_TOKEN_CLIENT* client = TRUST_TOKEN_CLIENT_new(method, client_max_batchsize);
  if (!client) {
    fprintf(stderr, "failed to create TRUST_TOKEN Client. maybe max_batchsize(%i) is too large\n", client_max_batchsize);
    exit(0);
  }

  // Issuer Side Implementation
  //
  // |TRUST_TOKEN_ISSUER| is reusable
  // |const| if pointer then no-mutating else mutating
  // bactch sould be smaller than |max_batchsize|
  // error if |max_batchsize| is too big
  uint16_t issuer_max_batchsize = 10;
  TRUST_TOKEN_ISSUER* issuer = TRUST_TOKEN_ISSUER_new(method, issuer_max_batchsize);
  if (!issuer) {
    fprintf(stderr, "failed to create TRUST_TOKEN Issuer. maybe max_batchsize(%i) is too large\n", issuer_max_batchsize);
    exit(0);
  }

  // add Public Key to Client
  // |*out_key_index| is added index 
  // 1:success, 0:error
  size_t key_index;
  if (!TRUST_TOKEN_CLIENT_add_key(client, &key_index, pub_key, pub_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Client.\n");
    exit(0);
  }
  fprintf(stderr, "Public Key has added to Client with index(%zu)\n", key_index);

  // add Private Key to Issuer
  // key sould be generated via |TRUST_TOKEN_generate_key|
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_add_key(issuer, priv_key, priv_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  // ED25519 Public/Private Key
  uint8_t ed25519_private_key[ED25519_PRIVATE_KEY_LEN];
  uint8_t ed25519_public_key[ED25519_PUBLIC_KEY_LEN];
  ED25519_keypair(ed25519_public_key, ed25519_private_key);

  // convert to EVP_PKEY
  //
  // Some keys types support a "raw" serialization. Currently the only supported
  // raw format is Ed25519, where the public key and private key formats are those
  // specified in RFC 8032. Note the RFC 8032 private key format is the 32-byte
  // prefix of |ED25519_sign|'s 64-byte private key.
  // 1:success, 0:error
  EVP_PKEY* ed25519_priv = EVP_PKEY_new_raw_private_key(EVP_PKEY_ED25519, NULL, ed25519_private_key, 32); // TODO: 64 ??
  EVP_PKEY* ed25519_pub  = EVP_PKEY_new_raw_public_key(EVP_PKEY_ED25519,  NULL, ed25519_public_key,  32);
  if (!ed25519_priv || !ed25519_pub) {
    fprintf(stderr, "failed to generate EVP_PKEY.\n");
    exit(0);
  }

  // add Sign Key for SRR to issuer
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_set_srr_key(issuer, ed25519_priv)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  // add Validation Key for SRR to client
  // 1:success, 0:error
  if (!TRUST_TOKEN_CLIENT_set_srr_key(client, ed25519_pub)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Client.\n");
    exit(0);
  }

  //////////////////////////////////////////////////////////////////////////
  // Ready to Request
  //////////////////////////////////////////////////////////////////////////

  // 1. SRR(Signed Redemption Records) generation
  // Private Metadata (32byte random) for encrypt SRR
  // 1:success, 0:error
  uint8_t metadata_key[32];
  RAND_bytes(metadata_key, sizeof(metadata_key));
  if (!TRUST_TOKEN_ISSUER_set_metadata_key(issuer, metadata_key, sizeof(metadata_key))) {
    fprintf(stderr, "failed to generate trust token metadata key.\n");
    exit(0);
  }

  // 2. Client starts issuing
  // generate trust token by |count|
  // 1:success, 0:error
  uint8_t* request = NULL;
  size_t request_len;
  size_t count = 10;
  if (!TRUST_TOKEN_CLIENT_begin_issuance(client, &request, &request_len, count)) {
    fprintf(stderr, "failed to begin issuance in TRUST_TOKEN Client.\n");
    exit(0);
  }
  printf("CLIENT(begin_issuance)\trequest(%zu): %p\n", request_len, request);

  // 3. ISSUER issues token
  // save blinded token into |out|/|out_len|
  // save count into |*out_tokens_issued|
  // Token is issued by |public_metadata| & |private_metadata|
  // |public_metadata| is key IDs.
  // |private_metadata| is 0 or 1.
  // 1:success, 0:error
  uint8_t* response = NULL;
  size_t   resp_len, tokens_issued;
  size_t   max_issuance = count;
  uint8_t  public_metadata = key_id;
  uint8_t  private_metadata = 0;
  if (!TRUST_TOKEN_ISSUER_issue(issuer,
                                &response, &resp_len,
                                &tokens_issued,
                                request, request_len,
                                public_metadata,
                                private_metadata,
                                max_issuance)) {
    fprintf(stderr, "failed to issue in TRUST_TOKEN Issuer.\n");
    exit(0);
  }
  printf("ISSUER(issue)\tresponse(%zu): %p\n", resp_len, response);
  printf("ISSUER(issue)\ttokens_issued: %zu\n", tokens_issued);

  // 4. Client get token from |response|
  // |out_key_index| is key index for sign
  // |sk_TRUST_TOKEN_pop_free| if finished
  // empty list if fail
  size_t used_key;
  STACK_OF(TRUST_TOKEN)* tokens = TRUST_TOKEN_CLIENT_finish_issuance(client, &used_key, response, resp_len);
  if (sk_TRUST_TOKEN_num(tokens) < 1) {
    fprintf(stderr, "failed to finish issuance in TRUST_TOKEN Client.\n");
    exit(0);
  }
  printf("CLIENT(finish_issuance)\tused_key: %zu, token count: %li\n", used_key, sk_TRUST_TOKEN_num(tokens));

  // 5. take token
  TRUST_TOKEN* token = sk_TRUST_TOKEN_pop(tokens);
  if (!token) {
    fprintf(stderr, "no token in the stack.\n");
    exit(0);
  }

  // 6. client redemption request
  // |token| redemption request
  // sign |data| and serialize into |out|
  // |time| unix time for issuer response validation
  // 1:success, 0:error
  const uint8_t kClientData[] = "TEST CLIENT DATA";
  uint64_t kRedemptionTime    = 13374242;
  uint8_t  *redeem_request     = NULL;
  size_t   redeem_request_len;
  if (!TRUST_TOKEN_CLIENT_begin_redemption(client,
                                           &redeem_request, &redeem_request_len,
                                           token,
                                           kClientData,
                                           sizeof(kClientData),
                                           kRedemptionTime)) {
    fprintf(stderr, "failed to begin redemption in TRUST_TOKEN Client.\n");
    exit(0);
  }
  fprintf(stderr, "CLIENT(begin_redemption)\tredeem_request(%zu): %p\n", redeem_request_len, &redeem_request);

  // 7. issuer redeem
  // redeem |request| token
  // if token is valid, SRR with |lifetime|s are generated.
  // sign requested data & token and save int |out|
  // |TRUST_TOKEN| is |out_token|
  // |out_client_data| is client data
  // |*out_redemption_time| is redemption time
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

  // 8. client redumption finish
  // verify SRR in |response| from issuer
  // return |out_srr| |out_sig| if valid
  // 1:success, 0:error
  uint8_t *srr = NULL, *sig = NULL;
  size_t srr_len, sig_len;
  if (!TRUST_TOKEN_CLIENT_finish_redemption(client,
                                            &srr, &srr_len,
                                            &sig, &sig_len,
                                            redeem_resp, redeem_resp_len)) {
    fprintf(stderr, "failed to finish redemption in TRUST_TOKEN Client.\n");
    exit(0);
  }
  fprintf(stderr, "CLIENT(finish_redemption) srr(%zu): %p\n", srr_len, srr);
  fprintf(stderr, "CLIENT(finish_redemption) sig(%zu): %p\n", sig_len, sig);

  // 9. Private Metadata
  // decode |encrypted_bit| with metadata key |key| & |nonce|
  // |TRUST_TOKEN_experiment_v1| 's nonce are SRR token-hash field.
  // |*out_value| is decrypt result (0 / 1)
  // 1:success, 0:error
  const uint8_t kTokenHashDSTLabel[] = "TrustTokenV0 TokenHash";
  uint8_t token_hash[SHA256_DIGEST_LENGTH];
  SHA256_CTX sha_ctx;
  SHA256_Init(&sha_ctx);
  SHA256_Update(&sha_ctx, kTokenHashDSTLabel, sizeof(kTokenHashDSTLabel));
  SHA256_Update(&sha_ctx, token->data, token->len);
  SHA256_Final(token_hash, &sha_ctx);
  uint8_t decode_private_metadata;
  if (!TRUST_TOKEN_decode_private_metadata(method,
                                           &decode_private_metadata,
                                           metadata_key, sizeof(metadata_key),
                                           token_hash,   sizeof(token_hash),
                                           srr[27])) {
    fprintf(stderr, "failed to decode private metadata in TRUST_TOKEN.\n");
    exit(0);
  }
  fprintf(stderr, "decode_private_metadata: %hhuu\n", decode_private_metadata);

  TRUST_TOKEN_CLIENT_free(client);
  TRUST_TOKEN_ISSUER_free(issuer);
  OPENSSL_free(request);
  OPENSSL_free(response);
}
