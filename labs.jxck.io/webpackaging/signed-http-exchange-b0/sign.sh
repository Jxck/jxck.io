go get github.com/nyaxt/webpackage/go/signedexchange/cmd/gen-certurl
go get github.com/nyaxt/webpackage/go/signedexchange/cmd/gen-signedexchange

./bin/gen-certurl /etc/letsencrypt/live/mozaic.fm/cert.pem  > cert.pem.msg

./bin/gen-signedexchange \
  -uri https://mozaic.fm/index.html \
  -content /home/jxck/server/jxck.io/mozaic.fm/index.html \
  -certificate /etc/letsencrypt/live/mozaic.fm/cert.pem \
  -certUrl https://labs.jxck.io/webpackaging/signed-http-exchange/cert.pem.msg \
  -validityUrl https://labs.jxck.io/webpackaging/signed-http-exchange/cert.pem.msg \
  -privateKey /etc/letsencrypt/live/mozaic.fm/privkey.pem \
  -expire 24h0m0s \
  -o ./mozaic.sxg
