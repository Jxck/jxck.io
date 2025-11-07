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

今回は、1Password への SSH Key 登録と、Git のコミット署名有効化について解説する。


## SSH Key Item

SSH の鍵は、`~/.ssh/` にファイルで保存するのが一般的だ。申し訳程度に `chmod 400` などしても、ユーザ権限でインストールされた Infostealer にとっては、簡単に盗めてしまう。

重要度に対して、ローカルにテキストファイルで保存されている事自体が、リスクをはらみ続けていた。

1Password は、SSH の鍵も保管することができるため、もしファイルで保存しているなら、すぐにでも 1Password に移すべきだ。

![SSH Key Item](ssh-key-item.png#570x290)


## SSH Agent

SSH Agent を有効にすることで、保管した SSH Key で SSH 接続を行うことができる。

- Get started with 1Password for SSH | 1Password Developer
  - https://developer.1password.com/docs/ssh/get-started/#step-3-turn-on-the-1password-ssh-agent

Mac であれば、以下のように、1Password の Socket を Agent として使うよう、SSH の Config を変更するだけだ。

```
Host *
  IdentityAgent "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
```

これで、SSH 接続時に Touch ID でアンロックすれば、登録した鍵を使って接続できる。

![1Password で SSH 接続](ssh-connection.png#283x252)


## Git Commit Signing

Git では、コミットに名前とメールアドレスが載るが、これはあくまでも自己申告であり、`user.name` と `user.email` に設定した値がそのまま使われる。

GitHub に Push すれば、コミットに全く別の人のアイコンを表示させることが、誰でもできてしまうのだ。

これを防ぐために、Git のコミットには SSH の鍵を使って署名をつけることができる。署名を検証すれば、間違いなく SSH 鍵の持ち主であることがわかり、持っていない他人のなりすましを防ぐことができる。

GitHub で署名を付与する操作は、大きく以下の 3 つだ。

1. SSH の鍵を用意する
2. GitHub のアカウントに公開鍵を登録する
3. 秘密鍵で Git のコミットに署名をする

署名したコミットを Push すれば、GitHub に表示する際に公開鍵を用いた検証が行われ、正しければコミットにバッジが表示される。


## 1Password を用いた署名

この署名に使う鍵も、先程 1Password に保存した SSH Key がそのまま使えるのだ。

- Sign Git commits with SSH | 1Password Developer
  - https://developer.1password.com/docs/ssh/git-commit-signing

SSH Key Item のオプションから、必要な設定のスニペットを取得できるので、それを `.gitconfig` に書くだけだ。

![configure git commit signing](commit-signing.png#466x453)

GitHub にも正しく設定すれば、コミットに "Verified" というバッジが付き、クリックすれば署名の検証結果が表示される。

![GitHub に表示される署名の検証バッジ](github-verified-badge.png#503x172)


## Outro

SSH の鍵を使う場面が減ったとはいえ、依然として漏洩のリスクはある。これをまるっと 1Password に預けられるのは、非常に安心感がある。

一度設定すればよく、設定もそこまで難しくないため、組織では移行と設定をルール化しても良いだろう。