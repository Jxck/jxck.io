# [1password][security] 1Password AC #8: 1Password CLI

## Intro

このエントリは、1Password Advent Calendar の 8 日目である。

- 1Password - Qiita Advent Calendar 2025 - Qiita
  - https://qiita.com/advent-calendar/2025/1password

このシリーズでは、組織において 1Password Business を運用する上での考慮点を解説していく。

- 1Password Business 運用ガイド素案 - Google ドキュメント
  - https://docs.google.com/document/d/1CZ5xdOz2IRHXRKVzcUZG-d4wQmlexBet8_Iee_EJlmw

前回 Group/Vault を整備したため、チームの中で活用する準備が整った。

ここからは、 CLI を使いた自動化について考える。

##

チームの中でアイテムが Share できるということは、



## 1Password CLI

1Password の CLI は、 brew などのパッケージマネージャで入れることができる。

```sh
$ brew install 1password-cli
```

インストールされた `op` コマンドで、 1Password にログインすれば、コマンドラインで 1Password のアイテムにアクセスできるようになる。

```sh
$ op signin
```

## 環境変数のトークンアクセス

### 保存と取得

よくあるユースケースは、 NPM のアクセストークンのような値を 1Password に保存し、環境変数で使うケースだ。

まず、取得した NPM のトークンを 1Password に保存する。

![TODO]()

次に、保存したアイテムの Reference Path を取得する。これは以下のような値だ。

```sh
op://TODO
```

この値は `op` で以下のように取得することができる。

```sh
$ op read TODO
```

### 環境変数への埋め込み

次に、この値を環境変数に埋め込んでみよう。

まず `.env.template` ファイルを作る。

```
NPM_ACCESS_TOKEN="TODO"
```

次に、以下のコマンドを実行すると、 `op://` の値を埋め込んだ `.env` を生成できる。

```$
TODO
```

これを用いると、 `.env.template` のみをリポジトリにコミットし、そこから各自が `.env` ファイルを生成することができる。

### 動的な環境変数

前述の方法は、依然として環境変数の埋め込まれた `.env` ファイルがローカルに生成されていることになる。

昨今のマルウェアは、感染するとローカルにあるこうしたファイルを窃取するものが知られている。これは、 Infostealer と呼ばれ、摂取した NPM の Token などは、さらなるサプライチェーンアタックに転用されるといった事例が発覚している。

こうした攻撃に対策するには、ローカルから環境変数の直接書き込まれた `.env` ファイルを無くし、常に 1Password から値を取得して使うのが理想だ。環境変数であれ、パスワードと同じように常に隠しておいて、必要に応じて取得する方法だ。

1Password では、 `op inject` を用いると、以下のように実行することができる。

```sh
TODO
```

これは、 `.env.template` に値を埋め込み、それを環境変数に展開した状態で、後続のコマンドを実行している。

環境変数はファイルにのこらず、後続のコマンドにだけ見える状態になるため、今までどおりに実行できるうえに、環境変数が 1Password 以外のファイルに保存されない状態を作ることができる。

こうすれば、 Infostealer に感染しても、被害を最小限に抑えることができるため、非常に効果的だ。

## Reference Path の共通化

1Password アイテムの Reference Path は、保存時に指定するアイテムの名前で決まる。

共有しているアイテムなら、メンバー全員が同じ Reference Path を共有しているため、特に問題はない。

しかし、同じ環境変数名だが、使う値は個別に取得する必要がある場合は、個々が Private (Employee) Vault に保存することになるだろう。

その名前は自分で指定するが、ここがバラバラだと `.env.template` の中の Reference Path を個々に書き換える必要が出てしまう。

したがって、保存するアイテムの名前はチーム内でルールを決め、それに合わせて各自が保存すると良いだろう。


## .env の Named Pipe

TODO


## Outro

NPM へのログインに必要なパスワードを、 `password.txt` などに平文で書き、 Desktop に置いておいたら、それが問題なことは誰にでもわかるだろう。

しかし、類する操作が可能な NPM の Access Token は、 `.env` に平文で書いて、ローカルに保存されるのが普通になっている。こちらの運用にも、ずっと問題があったのに、見過ごされていた。

どちらもクレデンシャルであることは変わらないため、 1Password に保存し、安全に運用すべきだ。

そして `op` コマンドは、この運用を強力にサポートしてくれる。



