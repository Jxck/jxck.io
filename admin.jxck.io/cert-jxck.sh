certbot-auto certonly \
  # --force-renewal \
  --manual \
  --email admin@jxck.io \
  --agree-tos \
  -d jxck.io \
  -d *.jxck.io \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns-01 \
  --server https://acme-v02.api.letsencrypt.org/directory



# certbot-auto certonly \
#   -n \
#   --webroot \
#   --agree-tos \
#   --email admin@jxck.io \
#   -w ../www.jxck.io \
#   --expand \
#   -d jxck.io \
#   -d www.jxck.io \
#   -d blog.jxck.io \
#   -d files.jxck.io \
#   -d slide.jxck.io \
#   -d admin.jxck.io \
#   -d ws.jxck.io \
#   -d rails.jxck.io \
#   -d api.jxck.io \
#   -d report-uri.jxck.io \
#   -d sfu.jxck.io \
#   -d spec.jxck.io \
#   -d logo.jxck.io \
#   -d labs.jxck.io \
#   -d lab2.jxck.io

# no https
# turn.jxck.io
# stun.jxck.io
