npm start 2>/dev/stdout \
  | sed "s/mediasoup-worker's stderr: //g" \
  | sed "s/..\/deps\/libsrtp\/srtp\/srtp\///g" \
  | sed "s/..\/deps\/libsrtp\/srtp\/crypto\/cipher\///g" \
  | sed "s/..\/deps\/openssl\/openssl\/crypto\/evp\///g" \
  | tee log
