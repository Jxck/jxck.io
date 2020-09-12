#define PRIV_KEY_PATH      "./keys/priv_key.txt"
#define PUB_KEY_PATH       "./keys/pub_key.txt"
#define SRR_PRIV_KEY_PATH  "./keys/srr_priv_key.txt"
#define SRR_PUB_KEY_PATH   "./keys/srr_pub_key.txt"

int read_file(char *file_name, uint8_t **file_body, size_t *file_size);

int write_file(char *file_name, uint8_t *file_body, size_t file_size);

void hexdump(uint8_t *s, size_t len);

int base64_encode(uint8_t *buff, size_t buff_len,
                  uint8_t **out, size_t *out_len);

int base64_decode(uint8_t *buff, size_t buff_len,
                  uint8_t **out, size_t *out_len);
