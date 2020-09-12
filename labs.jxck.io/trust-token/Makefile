CC := gcc
CFLAGS := -I./boringssl/include -L./boringssl/build/crypto -lcrypto -lpthread
OBJS = src/util.o src/issue.o src/redeem.o src/key_generator.o
MAIN = bin/main
.SUFFIXES: .c .o

.c.o:
	$(CC) $(CFLAGS) -c $< -o $@

all: main

main: $(OBJS)
	$(CC) src/main.c -o $(MAIN) $(OBJS) $(CFLAGS)

example: src/example.c
	$(CC) src/example.c -o ./bin/example $(CFLAGS)
	./bin/example

.PHONY: generate_key, clean, test
generate_key:
	$(MAIN) --key-generate

test:
	$(MAIN) --issue AAoAYQS+dU7FkdUubq9yFgDsN2enZungOLhWHqHnkYjqfTxxJdqq0BRLvQi8vyTZ9z5DIAxvPW+4bj4MG+E/IOs6RlrZLT+zIv7bVmsVZXX+OzWceTvN+RNmNNNnlQqJnt0k1iEAYQQzUDEhab8t+N5F8lKmuUHrkNpZi1cA1YHx4OPMtO832pDkamOkcGpii8z5zLv8D8u0EaRuWr1DQj4WS9ALBW+wlyZSW+p47tlTE8/CTxPLm0cj1V52zbfzIncrqp2j3dQAYQSatdv8VEMuvyoqwEiyxOp7CPuulvtGe15PEEseRtF9cDxvPtwXWDmw2wEz335SdEjlBe1v6NPtTFI32eoaKrb+XAk8a36fWIBdOHnYK9z23RvNzZ2UwDkNcY8uCyJuSHEAYQRBQPDQJqNVNHD/sjgxDAio4PARiL+pmadOIjkf6lgIV3ZSZ9dhpMm38fVSrO6CDZTWwD5lsfHpsxL9Gxof0WI6O5n7s9On+ksZ9uLRZ2Z1GoARFeJjv4ZYN+Leab+GQdkAYQSZd43URZqNlMSQdwKtxGtje4j3/RqwOX0ICHFIbymIC7NT0QMRerqfyW0BGfkOO+kSAczt/ZUuDbhGC+EutDWwY75e66Wia1zZYuy9j7wPg0nANw75OINNwA4Sd/gkIwwAYQRK/QgzJi+hV02DGiSBbFl8t1Ml+KJS4FPDlQ3Qtekc1W+K/yIwC0b4WFnSioS9o+LGf6euF5FnVcmganuqbsMAJvz2rpKVbWHEPHL+fce2jDlcLYCo1vF4Vosfbr+JikUAYQTccU0IIVfIcQD+tl84ZpfoG3WzGY0dvz+L7DC/0/aGuZmA2jX2l0jTJp5YujT6M9je91ViAjP+Ats5kQtmabr5/WURpVFOTm+skSenMArDaM5VPIWRg7BlkNC6L3dlR9QAYQR7GMaUAsI3gddz9b8nnoXz8b3Qnh3XIL+bi6VWtmaiSZxhYvo+5lves2UtyhanYNqYX0qN4sMKKvIvXMqyguI+n2IQ3QUZVSgcy0SAE28e8EShOfVO/+4m/HXNtFeKNJgAYQTBBMVvk73A/aLNVSnN4II4Ec1ixQwlk3iqo40DAd7zCtLKHyPiJpYBWO9bX2pMDV41cX2nCgTxecMqDW3JME/SSglPQmG+yBJ4H3jIhAvoZ1QjND4Sz3QdchkLNIoNh+gAYQSIWOwE6LVrlS6zSAotkSrujEqN3Fgcl0Z9VR4IyjPJE1kz5F60MLciqjc7GdTbnzZSTFjWSRwavC6QV6raK5+L+/Bm+JkhIlwecImVdoZY2X9I5oNe0n3r8rDR072NYkw=
	$(MAIN) --redeem AW0AAAABfuhQGAMe49eRmI5PLhAbdFnvFQJrm1jmckkspGVoNUIO7EyxrvXlQr2H9X47cpTyyooUr0vD4bzqVo/T/UpzzgBhBDCLLCHukw2dCpPAwpAUTIJXgYaNRRTn3qprYs65WABeqzkKpuIR1o4+lO++5WpLjE95dNrlZfOga4q9yNC7unJTHrkhyUYdXr7duYFsvHaEbunUI+jYTxFGtxihioDv7QBhBD0iIhZ+/hTQ1xkbyp3vuurM2/xpL3FRh8NBxbzVn1TtUeXd5IhkPQH9PP3OuJ886u/tqTJYx80Yp8bPEZqDYhc/h6YaUhTPNqnQV57HuoYONSihmDFWTUALDIWdZQkz+wBhBEuitsBDl7Qyf6IYyjgxDgGJ9URTtc9AXuwUen89Cho/hLHQMtJ2DeH1JD/nvOIr5Ijl/hSdljv1FYpT/BIy+CQH+k5GEKvaFnkwAHSMVYSNQXG8W9oUMep3cwz1OPp1SgBso2hrZXktaGFzaFggGgw0lhSDv1q9JbSAu8aEFdBzPRxgb9j06jcFxN8scgRwcmVkZWVtaW5nLW9yaWdpbnRodHRwczovL2xhYnMuanhjay5pb3RyZWRlbXB0aW9uLXRpbWVzdGFtcBpfW38iAAAAAF9bfyI=

clean:
	$(RM) $(OBJS) bin/*
