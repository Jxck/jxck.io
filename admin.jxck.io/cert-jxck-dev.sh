sudo certbot certonly \
  --agree-tos \
  --cert-name jxck.dev \
  --force-renewal \
  --manual \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns \
  --email jxck@jxck.io \
  --domain jxck.dev
