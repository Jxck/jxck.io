certbot-auto certonly \
  -n \
  --webroot \
  --agree-tos \
  --email admin@mozaic.fm \
  -w ../mozaic.fm \
  -d mozaic.fm \
  -d files.mozaic.fm \
  -d feed.mozaic.fm
