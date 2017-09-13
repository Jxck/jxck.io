certbot-auto certonly \
  -n \
  --webroot \
  --agree-tos \
  --email admin@jxck.io \
  -w ../www.jxck.io \
  --expand \
  -d jxck.io \
  -d www.jxck.io \
  -d blog.jxck.io \
  -d files.jxck.io \
  -d slide.jxck.io \
  -d admin.jxck.io \
  -d ws.jxck.io \
  -d rails.jxck.io \
  -d api.jxck.io \
  -d report-uri.jxck.io \
  -d sfu.jxck.io \
  -d spec.jxck.io \
  -d logo.jxck.io

# no https
# turn.jxck.io
# stun.jxck.io

# ダメ絶対
# labs.jxck.io
