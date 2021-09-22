# systemctl

- このディレクトリに service ファイルを書く
- description には `.jxck.io` を入れる
- /etc/systemd/system に ln
- `sudo systemctl daemon-reload`
- `sudo systemctl enable ${name}`
- `sudo systemctl start ${name}`
- `systemctl list-unit-files`
- `journalctl -u ${name} -b -f`
