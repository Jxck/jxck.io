all:
	gcc -I./boringssl/include c/trust_token.c boringssl/build/crypto/libcrypto.a -lpthread
	./a.out

key:
	gcc -I./boringssl/include c/key_generation.c -o key_generation boringssl/build/crypto/libcrypto.a -lpthread

issue: ./c/issue.c
	gcc -I./boringssl/include c/issue.c -o issue boringssl/build/crypto/libcrypto.a -lpthread

redemption: ./c/redemption.c
	gcc -I./boringssl/include c/redemption.c -o redemption boringssl/build/crypto/libcrypto.a -lpthread
