sudo certbot certonly \
  --agree-tos \
  --cert-name localhost.jxck.io \
  --force-renewal \
  --manual \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns \
  --email admin@jxck.io \
  --domain localhost.jxck.io
