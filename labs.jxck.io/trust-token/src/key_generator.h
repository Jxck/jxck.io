typedef struct {
  size_t priv_key_base64_len;
  size_t pub_key_base64_len;
  size_t srr_priv_key_base64_len;
  size_t srr_pub_key_base64_len;
  uint8_t* priv_key_base64;
  uint8_t* pub_key_base64;
  uint8_t* srr_priv_key_base64;
  uint8_t* srr_pub_key_base64;
} base64_keys_t;

int key_generate(base64_keys_t *keys);
