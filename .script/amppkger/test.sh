export URL="https://blog.jxck.io/entries/2020-12-03/masonry-layout.amp.html"

## validate signature
dump-signedexchange -uri $URL -requestHeader AMP-Cache-Transform:any -version=1b3 -headers=false -payload=false  -verify

# dump file via curl
curl -s --output - -H 'amp-cache-transform: google;v="3"' -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' $URL > dump.sxg
dump-signedexchange -i dump.sxg
rm dump.sxg

## dump certurl
# curl -s --output - https://blog.jxck.io/amppkg/cert/KmG8nFDyIBqjUzFBg9YYDEcfu20CkBaNIl4m9sFJ9yM > cert.cbor
# dump-certurl -i cert.cbor
# rm cert.cbor

## /priv/doc must be hidden
curl -s https://blog.jxck.io/priv/doc/$URL -o /dev/null -w '%{http_code}\n'
