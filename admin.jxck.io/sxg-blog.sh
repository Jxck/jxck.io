#!/usr/bin/env zsh

openssl ecparam -name prime256v1 -genkey -out /keys/sxg/sxg.key
openssl req -new -key ./sxg/sxg.key -sha256 -out /keys/sxg/sxg.csr
