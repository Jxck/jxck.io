sudo certbot certonly \
  --agree-tos \
  --cert-name jxck.dev \
  --force-renewal \
  --manual \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns \
  --email admin@jxck.io \
  --domain jxck.dev
