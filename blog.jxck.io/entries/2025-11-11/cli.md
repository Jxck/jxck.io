# [1password][security] 1Password AC #8: 1Password CLI

## Intro

このエントリは、1Password Advent Calendar の 8 日目である。

- 1Password - Qiita Advent Calendar 2025 - Qiita
  - https://qiita.com/advent-calendar/2025/1password

このシリーズでは、組織において 1Password Business を運用する上での考慮点を解説していく。

- 1Password Business 運用ガイド素案 - Google ドキュメント
  - https://docs.google.com/document/d/1CZ5xdOz2IRHXRKVzcUZG-d4wQmlexBet8_Iee_EJlmw

前回、Group/Vault を整備したため、チームの中で活用する準備が整った。


## 1Password CLI

1Password の CLI は、brew などのパッケージマネージャでインストールすることができる。

```sh
$ brew install 1password-cli
```

インストールされた `op` コマンドで、1Password にログインすれば、コマンドラインで 1Password のアイテムにアクセスできるようになる。

```sh
$ op signin
```


## 環境変数のトークンアクセス

### 保存と取得

よくあるユースケースは、NPM のアクセストークンのような値を 1Password に保存し、環境変数で使うケースだ。

まず、取得した NPM のトークンを 1Password に保存する。

![1Password に保存した NPM の Token](npm-access-token.png#555x300)

次に、保存したアイテムの Secret Reference を取得する。これは以下のような値だ。

```
op://Private/NPM_Access_Token/credential
```

この値は `op` コマンドで以下のように取得することができる。

```sh
$ op read op://Private/NPM_Access_Token/credential
test_npm_access_token
```


### 環境変数への埋め込み

次に、この値を環境変数に埋め込んでみる。

まず、`.env.template` ファイルを作成する。

```
# .env.template
NPM_ACCESS_TOKEN="op://Private/NPM_Access_Token/credential"
```

次に、以下のコマンドを実行すると、`op://` の値を埋め込んだ `.env` を生成できる。

```
$ op inject --in-file .env.template --out-file .env
```

生成された `.env` は以下だ。

```
# .env
NPM_ACCESS_TOKEN="test_npm_access_token"
```

この `op inject` のコマンドを、タスクランナーなどに登録しておき、セットアップ時に実行するようにすれば、リポジトリにコミットするのは `.env.template` だけで、そこから各自が `.env` ファイルを生成することができる。


### 動的な環境変数

前述の方法では、依然として環境変数が埋め込まれた `.env` ファイルがローカルに保存されていることになる。

昨今のマルウェアに感染すると、ローカルにあるこうしたファイルが窃取されることが知られている。これは、Infostealer と呼ばれ、窃取した NPM のトークンなどは、さらなるサプライチェーンアタックに転用されるといった事例が発覚している。

こうした攻撃に対策するには、ローカルから環境変数が直接書き込まれた `.env` ファイルをなくし、常に 1Password から値を取得して使うのが理想だ。環境変数であれ、パスワードと同じように常に隠しておいて、必要に応じて取得する方法だ。

1Password では、`op run` を用いると、以下のように実行することができる。

```sh
$ op run --env-file="./.env_template" -- npm start
```

これは、`.env_template` に値を埋め込み、それを環境変数に展開した状態で、後続の `npm start` を実行している。

後続のコマンドにだけ環境変数の値が見える状態になるため、今までどおりに実行できるうえに、環境変数が 1Password 以外のファイルに保存されない状態を作ることができる。

こうすれば、Infostealer に感染しても、被害を最小限に抑えることができるため、非常に効果的だ。


## Secret Reference の共通化

1Password アイテムの Secret Reference は、保存先の Vault 名、アイテム名、セクション名で決まる。

"Private" Vault に保存した "NPM_Access_Token" の "credential" セクションなら以下だ。

```
op://Private/NPM_Access_Token/credential
```

共有しているアイテムなら、メンバー全員が同じ Secret Reference で取得できる。

しかし、同じ環境変数名でも、使う値を個別に取得する必要がある場合は、各自が Private (Employee) Vault に保存することになるだろう。

その名前は自分で指定するが、ここがバラバラだと `.env.template` の中の Secret Reference を個々に書き換える必要が出てしまう。

したがって、保存するアイテムの名前はチーム内でルールを決め、それに合わせて各自が保存すると良いだろう。


## .env の Named Pipe

1Password の Beta 機能で、この `.env` を直接 1Password に保存する機能のトライアルが行われている。

- Access secrets from 1Password through local `.env` files (beta) | 1Password Developer
  - https://developer.1password.com/docs/environments/local-env-file/

これは、`.env` を Text File ではなく Named Pipe にし、プロセスがアクセスした時に、その Read をフックして 1Password に中身を取りに行く機能だ。

これを使うと、`.env` ファイルを用いる運用をそのままに、`op run` などのコマンドも不要で、環境変数を 1Password に移すことができる。

Named Pipe を使うため、Mac/Linux しか対応していないが、環境が揃っているなら期待ができるかもしれない。


## Outro

NPM へのログインに必要なパスワードを、`password.txt` などに平文で書き、Desktop に置いていたら、それが問題であることは誰にでもわかるだろう。

しかし、同じく NPM の操作が可能な Access Token は、`.env` に平文で書いて、ローカルに保存されるのが普通になっている。こちらの運用にも、ずっと問題があったのに、見過ごされていた。

どちらもクレデンシャルであることは変わらないため、1Password に保存し、安全に運用すべきだ。

そして `op` コマンドは、この運用を強力にサポートしてくれるため、ぜひチームで運用したい。