#!/usr/bin/env zsh

openssl ecparam -name prime256v1 -genkey -out /keys/sxg/labs_jxck_io.key
openssl req -new -key /keys/sxg/labs_jxck_io.key -sha256 -out /keys/sxg/labs_jxck_io.csr -subj "/C=JP/ST=Tokyo/O=jxck.io/CN=labs.jxck.io"
chmod 400 /keys/sxg/labs_jxck_io.key
