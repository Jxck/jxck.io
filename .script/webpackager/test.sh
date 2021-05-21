export URL="https://blog.jxck.io/entries/2020-12-03/masonry-layout.html"

# validate signature
dump-signedexchange -uri $URL -version=1b3 -headers=false -payload=false  -verify

# dump file via curl
curl -s --output - -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' $URL > dump.sxg
dump-signedexchange -i dump.sxg -signature

# dump certurl
curl -s --output - https://blog.jxck.io/webpkg/cert/g8zY1NBH4DQt9qIWOWBqLWvs6jAnJmURAtNRc2WChDE > cert.cbor
dump-certurl -i cert.cbor
rm cert.cbor

# /priv/doc must be hidden
curl -s https://blog.jxck.io:11000/priv/doc/$URL -o /dev/null -w '%{http_code}\n'

# works internally
curl -s --output - -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' http://127.0.0.1:11000/priv/doc/$URL > dump.sxg
dump-signedexchange -i dump.sxg -signature


rm dump.sxg
