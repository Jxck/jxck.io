# github.com pins Intermediate Certificate
# so add `-showcerts` option for first openssl
# and extract second CERTIFICATE with ruby
echo '---- EXPECTED ----'
openssl s_client -servername github.com -connect github.com:443 -showcerts 2>/dev/null \
  | ruby -nle 'puts $_.scan(/-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----/m)[1]' \
  | openssl x509 -pubkey -noout 2>/dev/null \
  | openssl rsa -pubin -outform der 2>/dev/null \
  | openssl dgst -sha256 -binary 2>/dev/null \
  | openssl enc -base64 2>/dev/null

# get the actual Public-Key-Pins headre
# this will include hash calculated above
echo '---- ACTUAL ----'
curl -sI https://github.com | grep Public-Key-Pins | ruby -nle 'puts $_.gsub(";", "\n")'
