certbot-auto certonly \
  -n \
  --webroot \
  --agree-tos \
  --email admin@jxck.io \
  -w ../www.jxck.io \
  --expand \
  -d localhost.jxck.io
