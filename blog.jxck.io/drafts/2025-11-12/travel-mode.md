# [1password][security] 1Password AC #9: Travel Mode

## Intro

このエントリは、1Password Advent Calendar の 9 日目である。

- 1Password - Qiita Advent Calendar 2025 - Qiita
  - https://qiita.com/advent-calendar/2025/1password

このシリーズでは、組織において 1Password Business を運用する上での考慮点を解説していく。

- 1Password Business 運用ガイド素案 - Google ドキュメント
  - https://docs.google.com/document/d/1CZ5xdOz2IRHXRKVzcUZG-d4wQmlexBet8_Iee_EJlmw


## 入国管理でのリスク

検閲の厳しい国への入国などでは、入国管理などで PC の中を見せるように言われることがある。

このとき、1Password もアンロックして、中身の確認を求められ、拒否すると入国できないといった事態に遭遇することがあるのだ。

せっかく厳重に管理している 1Password の中身が、このような事情で漏洩するリスクがあると、海外にデバイスを持っていくのが難しくなる。しかし、そうもいかない。

こうしたリスクを軽減するために、1Password には Travel Mode という機能がある。


## Travel Mode

Travel Mode を無効にすると、デバイスに保存されている 1Password の Vault の中身を全て削除することができる。

このときログアウトやアンインストールは必要なく、次にネットワークに繋がった際に Vault を復元できるのだ。

つまり、海外への移動前に Travel Mode を有効にし、ホテルに到着してから無効にすれば、道中の安全を確保できるのだ。


## 設定方法

設定は 1Password の Web にアクセスし、設定画面から行う。

個人のアカウントでは以下だ。

![TODO]()

有効にすれば、無効に戻すまで 1Password を開いても中身が空っぽになる。

![空っぽの 1Password]()

Business では、自分だけでなく管理者が有効/無効を切り替えることもできる。

![]()

対象は Vault 単位で指定できるため、例えば移動中も見えるようにしておきたいアイテムは、別の Vault に分けておき、Travel Mode から除外すれば、移動中も見ることができる。


## Outro

筆者は、話には聞いたことがあるが、実際にこのような場面に遭遇したことがないため、実情はわからない。

例えば 1Password を開けるように命じられた時、Travel Mode も解除するように求められて、拒否できるのかは不明だ。

本当にそこをリスクと感じるのであれば、一旦 1Password をアンインストールした状態で移動し、移動先でインストールしなおしたり、デバイスを持たずに行き、現地でレンタルするといった手段を考える方がよいのかもしれない。