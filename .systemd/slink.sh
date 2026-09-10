#!/bin/bash
set -euo pipefail

services=(
  h2o.service
  # certbot の renewal は snap.certbot.renew.timer (snap 標準、毎日 2 回) が担い、
  # h2o の reload は /etc/letsencrypt/renewal-hooks/deploy/reload-h2o (deploy hook、
  # 実体は .systemd/.letsencrypt/) が行う。
  # 自前の certbot.service / certbot.timer は 2026-09-10 に撤去した
  # (mozaic.fm repo の plan 20260910-1537 参照)
  ws.service
  # webauthn-demo.service
)

for service in "${services[@]}"; do
  sudo ln -sf ~/develop/jxck.io/.systemd/${service} /etc/systemd/system/
done

# certbot の deploy hook (証明書が実際に更新されたときに h2o を reload する)。
# 実体は .systemd/.letsencrypt/ にあり、certbot が hooks dir から実行する
sudo ln -sf ~/develop/jxck.io/.systemd/.letsencrypt/renewal-hooks/deploy/reload-h2o /etc/letsencrypt/renewal-hooks/deploy/

sudo systemctl daemon-reload

for service in "${services[@]}"; do
  sudo systemctl enable ${service}
done

sudo systemctl status --no-pager "${services[@]}" || true
