sudo certbot certonly \
  --manual \
  --agree-tos \
  --preferred-challenges dns \
  --email admin@jxck.io \
  --manual-public-ip-logging-ok \
  --domain localhost.jxck.io
