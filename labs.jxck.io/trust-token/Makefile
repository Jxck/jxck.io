all:
	gcc -I./boringssl/include c/trust_token.c boringssl/build/crypto/libcrypto.a -lpthread
	./a.out

key:
	gcc -I./boringssl/include c/key_generation.c boringssl/build/crypto/libcrypto.a -lpthread
	./a.out
