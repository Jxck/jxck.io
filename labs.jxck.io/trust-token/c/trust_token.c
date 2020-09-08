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
  fprintf(stderr, "priv_key_len: \t%zu\n", priv_key_len);
  fprintf(stderr, "pub_key_len: \t%zu\n",  pub_key_len);

  // Client 側の実装
  // |TRUST_TOKEN_CLIENT| を生成
  // |max_batchsize| よりも小さい batch を使って issue する必要
  // |max_batchsize| より小さい batch を作るべき
  // |max_batchsize| が大きすぎたらエラー
  uint16_t client_max_batchsize = 10;
  TRUST_TOKEN_CLIENT* client = TRUST_TOKEN_CLIENT_new(method, client_max_batchsize);
  if (!client) {
    fprintf(stderr, "failed to create TRUST_TOKEN Client. maybe max_batchsize(%i) is too large\n", client_max_batchsize);
    exit(0);
  }

  // Issuer 側の実装
  //
  // |TRUST_TOKEN_ISSUER| は複数のやり取りに再利用可能
  // 複数のスレッドで使う場合は mutation に注意
  // |const| pointer な関数なら no-mutating そうでなければ mutating
  // |max_batchsize| より小さい batch を作るべき
  // |max_batchsize| が大きすぎたらエラー
  uint16_t issuer_max_batchsize = 10;
  TRUST_TOKEN_ISSUER* issuer = TRUST_TOKEN_ISSUER_new(method, issuer_max_batchsize);
  if (!issuer) {
    fprintf(stderr, "failed to create TRUST_TOKEN Issuer. maybe max_batchsize(%i) is too large\n", issuer_max_batchsize);
    exit(0);
  }

  // client に公開鍵 |key| を紐付ける
  // |*out_key_index| に登録されたインデックスが入る
  // |key| がパースできなかったり、多すぎるとエラー
  // 1:success, 0:error
  size_t key_index;
  if (!TRUST_TOKEN_CLIENT_add_key(client, &key_index, pub_key, pub_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Client.\n");
    exit(0);
  }
  fprintf(stderr, "Public Key has added to Client with index(%zu)\n", key_index);

  // Issuer に秘密鍵 |key| を紐付ける
  // |TRUST_TOKEN_generate_key| で作られた key に限る
  // |key| がパースできなかったり、多すぎるとエラー
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_add_key(issuer, priv_key, priv_key_len)) {
    fprintf(stderr, "failed to add key in TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  // ED25519 の公開鍵と秘密鍵のペアを生成
  // generated, public/private key pair.
  uint8_t ed25519_private_key[ED25519_PRIVATE_KEY_LEN];
  uint8_t ed25519_public_key[ED25519_PUBLIC_KEY_LEN];
  ED25519_keypair(ed25519_public_key, ed25519_private_key);

  // EVP_PKEY への変換
  // Raw keys
  //
  // Some keys types support a "raw" serialization. Currently the only supported
  // raw format is Ed25519, where the public key and private key formats are those
  // specified in RFC 8032. Note the RFC 8032 private key format is the 32-byte
  // prefix of |ED25519_sign|'s 64-byte private key.

  // 鍵をラップした |EVP_PKEY| を生成する
  // 1:success, 0:error
  EVP_PKEY* ed25519_priv = EVP_PKEY_new_raw_private_key(EVP_PKEY_ED25519, NULL, ed25519_private_key, 32); // TODO: 64 ??
  EVP_PKEY* ed25519_pub  = EVP_PKEY_new_raw_public_key(EVP_PKEY_ED25519,  NULL, ed25519_public_key,  32);
  if (!ed25519_priv || !ed25519_pub) {
    fprintf(stderr, "failed to generate EVP_PKEY.\n");
    exit(0);
  }

  // Issuer が SRR に署名するために秘密鍵を設定
  // 1:success, 0:error
  if (!TRUST_TOKEN_ISSUER_set_srr_key(issuer, ed25519_priv)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Issuer.\n");
    exit(0);
  }

  // Client が SRR を検証するために公開鍵を設定
  // 1:success, 0:error
  if (!TRUST_TOKEN_CLIENT_set_srr_key(client, ed25519_pub)) {
    fprintf(stderr, "failed to set SRR key to TRUST_TOKEN Client.\n");
    exit(0);
  }

  //////////////////////////////////////////////////////////////////////////
  // ここまでで準備完了
  //////////////////////////////////////////////////////////////////////////

  // 1. SRR(Signed Redemption Records) の生成
  // Private Metadata を暗号化して SRR にするための鍵として 32 byte の乱数を設定
  // 1:success, 0:error
  uint8_t metadata_key[32];
  RAND_bytes(metadata_key, sizeof(metadata_key));
  if (!TRUST_TOKEN_ISSUER_set_metadata_key(issuer, metadata_key, sizeof(metadata_key))) {
    fprintf(stderr, "failed to generate trust token metadata key.\n");
    exit(0);
  }

  // 2. CLIENT で issuaunce を開始する
  // |count| 分の trust token リクエストを生成し |out| と |out_len| に入れる
  // 取得したバッファは |OPENSSL_free| で消す
  // 1:success, 0:error
  uint8_t* request = NULL;
  size_t request_len;
  size_t count = 10;
  if (!TRUST_TOKEN_CLIENT_begin_issuance(client, &request, &request_len, count)) {
    fprintf(stderr, "failed to begin issuance in TRUST_TOKEN Client.\n");
    exit(0);
  }
  printf("CLIENT(begin_issuance)\trequest(%zu): %p\n", request_len, request);

  // 3. ISSUER が |request| を元に |max_issuance| 分 token を発行する
  // blinded token を作り、レスポンスをバッファに入れ |out|/|out_len| に返す
  // |*out_tokens_issued| に issue した数を入れる
  // Token は |public_metadata| と |private_metadata| で issue される
  // |public_metadata| はすでに設定された key IDs.
  // |private_metadata| は 0 or 1.
  // 終わったら |OPENSSL_free|.
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

  // 4. Client が |response| から token を取り出す
  // |out_key_index| に token のリストと署名に使った key の index を入れる
  // これで使った鍵がわかり、無かった(新しい key commitment がある)場合は捨てる
  // 終わったら |sk_TRUST_TOKEN_pop_free| (でも中でやってるっぽい?)
  // 失敗したら empty list
  size_t used_key;
  STACK_OF(TRUST_TOKEN)* tokens = TRUST_TOKEN_CLIENT_finish_issuance(client, &used_key, response, resp_len);
  if (sk_TRUST_TOKEN_num(tokens) < 1) {
    fprintf(stderr, "failed to finish issuance in TRUST_TOKEN Client.\n");
    exit(0);
  }
  printf("CLIENT(finish_issuance)\tused_key: %zu, token count: %li\n", used_key, sk_TRUST_TOKEN_num(tokens));

  // 5. token を取り出す
  TRUST_TOKEN* token = sk_TRUST_TOKEN_pop(tokens);
  if (!token) {
    fprintf(stderr, "no token in the stack.\n");
    exit(0);
  }

  // 6. client redemption request
  // |token| を検証するためのリクエストを生成する
  // |data| を署名し、シリアライズしたリクエストを |out| に入れる
  // |time| unix time で issuer response の検証に使う
  // 終わったら |OPENSSL_free|
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

  // 8. client redumption finish
  // issuer からの |response| の SRR を verify する
  // Valid なら |out_srr| |out_sig| を返す
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

  // 9. Private Metadata の取り出し
  // |encrypted_bit| を metadata key |key| と |nonce| を使ってデコード
  // |TRUST_TOKEN_experiment_v1| の nonce は SRR の token-hash field.
  // |*out_value| に decrypt された値(0 か 1)
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
