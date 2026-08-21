# systemctl

- このディレクトリに service ファイルを書く
- description には `.jxck.io` を入れる
- /etc/systemd/system への配備は [`slink.sh`](slink.sh) 1 本で行う
  - スクリプト冒頭の `services` に列挙した unit を対象に、symlink -> daemon-reload -> enable -> status まで通しで行う
  - `start` はしない (unit ごとに `sudo systemctl start ${name}` する)
  - `ln -sf` で上書きするため、新しい unit を追加したら `services` に追記する
- `systemctl list-unit-files`
- `journalctl -u ${name} -b -f`
