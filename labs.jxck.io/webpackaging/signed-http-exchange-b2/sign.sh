#  go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-certurl
#  go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-signedexchange
#  go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-certurl
#  go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-signedexchange
#
#
# # Generate prime256v1 ecdsa private key.
# openssl ecparam -out priv.key -name prime256v1 -genkey
#
# # Create a certificate signing request for the private key.
# openssl req -new -sha256 -key priv.key -out cert.csr -subj '/CN=mozaic.fm/O=Test/C=US'
#
# # Self-sign the certificate with "CanSignHttpExchanges" extension.
# openssl x509 -req -days 360 -in cert.csr -signkey priv.key -out cert.pem

# dummy file
echo ocsp > tmp

# Fill in dummy data for OCSP, since the certificate is self-signed.
./bin/gen-certurl -pem cert.pem -ocsp tmp > cert.cbor

./bin/gen-signedexchange \
  -uri         https://mozaic.fm/index.html \
  -content     ../../../mozaic.fm/index.html \
  -certificate cert.pem \
  -privateKey  priv.key \
  -certUrl     https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor \
  -validityUrl https://mozaic.fm/cert.cbor \
  -o           mozaic.sxg


export LIST=`openssl x509 -noout -pubkey -in cert.pem | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64`
echo $LIST

echo "open -a Google\ Chrome\ Canary --args --ignore-certificate-errors-spki-list=$LIST"
