CC := gcc
CFLAGS := -I./boringssl/include -L./boringssl/build/crypto -lcrypto -lpthread

all:
	make trust_token
	make key_generator
	make issue
	make redemption

trust_token: c/trust_token.c
	$(CC) c/trust_token.c -o ./bin/trust_token $(CFLAGS)
	./bin/trust_token

key_generator: c/key_generator.c
	$(CC) c/key_generator.c -o ./bin/key_generator $(CFLAGS)

issue: c/issue.c
	$(CC) c/issue.c -o ./bin/issue $(CFLAGS)

redemption: c/redemption.c
	$(CC) c/redemption.c -o ./bin/redemption $(CFLAGS)


.PHONY: generate_key, clean
generate_key:
	./bin/key_generator 2>/dev/null 1>./trust_token_key.json

clean:
	rm -f ./bin/*
