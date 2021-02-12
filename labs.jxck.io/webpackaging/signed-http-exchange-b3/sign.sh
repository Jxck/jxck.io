# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-certurl
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-signedexchange
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-certurl
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-signedexchange

CRT=$DOTFILES/keys/sxg/labs.jxck.io.sxg.pem
KEY=$DOTFILES/keys/sxg/labs.jxck.io.sxg.key
CBOR=./labs.jxck.io.sxg.cbor

gen-certurl -pem $CRT > $CBOR

gen-signedexchange \
  -certUrl              https://labs.jxck.io/webpackaging/signed-http-exchange-b3/labs.jxck.io.sxg.cbor \
  -certificate          $CRT \
  -content              ./test.html \
  -dumpHeadersCbor      ./header.dump \
  -dumpSignatureMessage ./sig.dump \
  -expire               24h \
  -o                    test.sxg \
  -privateKey           $KEY \
  -uri                  https://labs.jxck.io/webpackaging/signed-http-exchange-b3/test.html \
  -validityUrl          https://labs.jxck.io/webpackaging/signed-http-exchange-b3/labs.jxck.io.sxg.cbor
