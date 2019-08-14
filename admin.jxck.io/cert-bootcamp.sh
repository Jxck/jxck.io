certbot-auto certonly \
  -n \
  --webroot \
  --agree-tos \
  --email admin@jxck.io \
  -w ../www.jxck.io \
  --expand \
  -d bootcamp.labs.jxck.io \
  -d bootcamp2.labs.jxck.io
