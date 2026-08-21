#!/bin/bash
set -euo pipefail

services=(
  h2o.service
  certbot.service
  certbot.timer
  ws.service
  # webauthn-demo.service
)

for service in "${services[@]}"; do
  sudo ln -sf ~/develop/jxck.io/.systemd/${service} /etc/systemd/system/
done

sudo systemctl daemon-reload

for service in "${services[@]}"; do
  sudo systemctl enable ${service}
done

sudo systemctl status --no-pager "${services[@]}" || true
