# systemctl

- このディレクトリに service ファイルを書く
- description には `.jxck.io` を入れる
- /etc/systemd/system に ln
- `systemctl daemon-reload`
- `systemctl enable ${name}`
- `systemctl start ${name}`
- `journalctl -u ${name} -b -f`
