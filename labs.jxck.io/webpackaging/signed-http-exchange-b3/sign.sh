# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-certurl
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-signedexchange
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-certurl
# go get -u github.com/WICG/webpackage/go/signedexchange/cmd/dump-signedexchange

CRT=/keys/sxg/labs_jxck_io_full.crt
KEY=/keys/sxg/labs_jxck_io.key
CBOR=labs_jxck_io_sxg.cbor

gen-certurl -pem $CRT > $CBOR

gen-signedexchange \
  -certUrl              https://labs.jxck.io/webpackaging/signed-http-exchange-b3/$CBOR \
  -certificate          $CRT \
  -content              ./test.html \
  -dumpHeadersCbor      ./header.dump \
  -dumpSignatureMessage ./sig.dump \
  -expire               168h \
  -o                    test.sxg \
  -privateKey           $KEY \
  -uri                  https://labs.jxck.io/webpackaging/signed-http-exchange-b3/test.html \
  -validityUrl          https://labs.jxck.io/webpackaging/signed-http-exchange-b3/$CBOR

dump-signedexchange -i test.sxg -json
