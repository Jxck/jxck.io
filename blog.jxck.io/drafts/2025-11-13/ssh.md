# [1password][security] 1Password AC #10: SSH と Git コミット署名

## Intro

このエントリは、1Password Advent Calendar の 10 日目である。

- 1Password - Qiita Advent Calendar 2025 - Qiita
  - https://qiita.com/advent-calendar/2025/1password

このシリーズでは、組織において 1Password Business を運用する上での考慮点を解説していく。

- 1Password Business 運用ガイド素案 - Google ドキュメント
  - https://docs.google.com/document/d/1CZ5xdOz2IRHXRKVzcUZG-d4wQmlexBet8_Iee_EJlmw

SSH の鍵を使って、直接サーバにログインするような運用は減っているかもしれない。

それでも SSH の鍵を使う場面が無くなったわけではない。

今回は、 1Password への SSH Key 登録と、 Git のコミット署名有効化について。


## SSH Key

SSH の鍵は、 `~/.ssh/` にファイルで保存することが多いだろう。 Infostealer による窃取のリスクがある。
