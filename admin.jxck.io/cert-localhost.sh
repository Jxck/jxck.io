sudo certbot certonly \
  --agree-tos \
  --cert-name localhost.jxck.io \
  --force-renewal \
  --manual \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns \
  --email jxck@jxck.io \
  --domain localhost.jxck.io
