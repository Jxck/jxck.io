all:
	make key
	make issue
	make redemption


trust-token:
	gcc -I./boringssl/include c/trust_token.c boringssl/build/crypto/libcrypto.a -lpthread
	./a.out

key: c/key_generation.c
	gcc -I./boringssl/include c/key_generation.c -o key_generation boringssl/build/crypto/libcrypto.a -lpthread

issue: ./c/issue.c
	gcc -I./boringssl/include c/issue.c -o issue boringssl/build/crypto/libcrypto.a -lpthread

redemption: ./c/redemption.c
	gcc -I./boringssl/include c/redemption.c -o redemption boringssl/build/crypto/libcrypto.a -lpthread

generate_key:
	./key_generation 2>/dev/null 1>./trust_token_key.json
