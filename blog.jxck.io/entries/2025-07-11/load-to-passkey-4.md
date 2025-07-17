# [passkey] Passkey への道 #4: 文字列の限界

## Intro

パスワードと TOTP の問題は、「人間が入力する必要がある」ことだった。

対策は Autofill であり、そのためにもパスワードマネージャ相当が必要になる。

では、パスワードマネージャを使っていれば、パスワードと TOTP で十分なのだろうか?


## パスワードマネージャ

パスワードマネージャを使っているならば、以下のことが達成されているはずだ。

- パスワードをサイトごとに自動生成
- それを保存し、暗号化して管理
- TOTP もドメインに紐づけて登録する
- ログイン時にそれらを Autofill

しかも、最近はスマホを使っていれば Apple や Google のパスワードマネージャが最初から統合されている。

自分のアカウントに紐づけてパスワードを保存し、端末を移行しても自動で同期される。

ここまでできていれば、解説してきたほとんどの問題に対策できていそうだ。

確かに、記憶に頼ってパスワードを管理し、スマホの画面を見て TOTP を手打ちしていたころと比べれば、だいぶ良くなっている。

はずだった。


## Infostealer

特に近年の金融アカウント乗っ取り詐欺は、前述のフィッシングサイト以外にもう 1 つ重要なファクターがある。

それが **Infostealer** と呼ばれるマルウェアだ。

名前の通り、感染するとローカルのあらゆる情報を盗み出し、用が済んだらすぐ自己消滅するため、ウィルス対策ソフトなどにもひっかからないようなものが主流らしい。

どちらもダークネットで取引されており、最近はソースを買ってきて自分でばらまくのではなく、感染済みの Infostealer をサブスクで借りられるようなビジネスもあるようだ。

感染経路は、様々なものがある。

例えば「私はロボットではありません」でおなじみの CAPTCHA で、Windows にバイナリをダウンロード/インストールするショートカットを表示して、実行させるような方式だ。いつも「信号を選べ」といった意味がわからない操作を要求されているので、同じようなノリで意味のわからないキー操作を受け入れてしまうユーザがいる。

![CAPTCHA に表示したショートカットでマルウェアをダウンロードさせる](captcha-infostealer.png#515x427)

- Chasing Eddies: New Rust-based InfoStealer used in CAPTCHA campaigns
  - https://www.elastic.co/security-labs/eddiestealer

他にも、架空の会社が LinkedIn で技術面接を持ちかけてきて、準備のためにと送られた GitHub をクローンして Init したらマルウェアがインストールされる例もある。

- 北朝鮮を背景とするサイバー攻撃グループ TraderTraitor による暗号資産関連事業者を標的としたサイバー攻撃について
  - https://www.npa.go.jp/bureau/cyber/pdf/020241224_pa.pdf

最近では、Zoom で表示されたフェイクの相手が、音声トラブルに対応するためにスクリプトを送って実行させる攻撃もある。

- BlueNoroff Deepfake Zoom Scam Hits Crypto Employee with macOS Backdoor Malware
  - https://thehackernews.com/2025/06/bluenoroff-deepfake-zoom-scam-hits.html

本当によく考えるなと思う。

よく「サイトを見るだけで感染する」といった不安を煽る話もあるが、基本的にブラウザで閲覧するだけでマルウェアに感染させることはできない。もし本当にそんな方法を見つけたのなら、億では効かない報奨金が貰えるだろう。悪用するより、報告してキレイなお金を受け取る方が良い。

基本的に「感染」と言われているものは、ユーザが何らかの方法で「ダウンロード/インストール」をさせられている。つまり自分で能動的に感染していることがほとんどだ。その方法が巧妙で、気づいてすらない場合も多い。iPhone のように、審査済みのアプリだけが並ぶストアからしか、アプリがダウンロードできなければ、こうした攻撃はかなり防げる。しかし、PC はそれが難しい。iPhone もサイドローディングの解禁が始まり、別のストアも選べるようになれば、安心とは言えなくなるだろう。

さて、問題はそうした Infostealer が何を盗んでいるかという点だ。


## User Bound Encryption の限界

ブラウザには、フォームへの入力を保存して、次回から Autofill する機能がある。ブラウザはこうしたユーザ固有の値をどこに保存するかというと、ローカルの SQLite などである場合が多い。

普通に Chrome 配下を探せば、様々な SQLite ファイルがあり、実行して SQL を叩けば中が覗ける。平文テキストに書かれているのと、セキュリティレベルは変わらない。

しかし、さすがにパスワードやカード情報などが、そこまで緩く保存されているとマズイので、クレデンシャルは別の安全な場所に保存する。では、「別の安全な場所」とはどこだろうか?

Infostealer(マルウェア)は、ユーザがインストールして感染しているため、ユーザの権限で動いている。つまりユーザの権限で開けるファイルは、覗き放題だ。暗号化しても、その鍵が同じようにアクセスできれば意味がない。つまり、同一ファイルシステム上で隠せる場所を用意するのは、本質的に難しいことなのだ。

そこで、OS によっては、こうした重要な情報を隠す API が提供されている。Mac であれば KeyChain, Linux なら Kwallet などがそれにあたる。

Windows には DPAPI というデータ保護 API があり、Chrome で使われているが、これではログインユーザの権限での攻撃耐性がないため、App-Bound Encryption という「どのアプリなら読めるか」までチェックする API への移行を進めている。

- Improving the security of Chrome cookies on Windows
  - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html

この変更アナウンスは昨年のものだ。時期的にも、昨今の攻撃トレンドを鑑みての変更に見えなくない。つまり、少なくとも Windows Chrome のクレデンシャルは Infostealer の餌食になりやすかった可能性がある。

こうした対策が終われば完璧か? というと、そんなこともない。


## 文字列の限界

パスワードマネージャは、保存したパスワードを暗号化して秘匿するだろう。

ブラウザも、保存されたパスワードを暗号化して秘匿する。

OS もそのための API を用意する。

ハードウェアレベルで達成するために、TPM という秘匿用モジュールがついたチップが使われるようにもなった。

しかし、パスワードをどんなに暗号化しても、そのままでは使えない。`<input type=password>` には平文文字列で入力する必要が出るのだ。

つまり、ログインプロセスの中で、絶対に一度は暗号が解かれ、むき出しになった状態で、ブラウザに入力され送信されるタイミングがある。

むき出しの平文になった値を、同じ権限でインストールされ、隙あらばと狙っている Infostealer から完全に守り切るのは、実際のところ非常に難しいのだ。

Windows なら、Chrome に DLL でも差し込めれば、プロセス上の値にアクセスできる。Chrome に DLL なんか差し込めるのか? と思うかもしれないが、アンチウイルスソフトなんかは、まさしくそれをやるものがある。Chrome から見れば、どちらも同じような振る舞いをしているのは皮肉そのものだ。


## Outro

であれば、なんとかして平文ではなく暗号化したままのパスワードが、そのままサービスに送られ、サービスだけが解読できれば良さそうだ。

その通りだ、だいぶ話は核心に近づいてきた。


## Links

- [Passkey への道 #0: Intro](https://blog.jxck.io/entries/2025-07-07/load-to-passkey-0.html)
- [Passkey への道 #1: 平成の Password 感](https://blog.jxck.io/entries/2025-07-08/load-to-passkey-1.html)
- [Passkey への道 #2: 2FA/TOTP](https://blog.jxck.io/entries/2025-07-09/load-to-passkey-2.html)
- [Passkey への道 #3: 手入力の限界](https://blog.jxck.io/entries/2025-07-10/load-to-passkey-3.html)
- [Passkey への道 #4: 文字列の限界](https://blog.jxck.io/entries/2025-07-11/load-to-passkey-4.html)
- [Passkey への道 #5: 2FA/WebAuthn](https://blog.jxck.io/entries/2025-07-12/load-to-passkey-5.html)
- [Passkey への道 #6: タブーを破った Apple](https://blog.jxck.io/entries/2025-07-13/load-to-passkey-6.html)
- [Passkey への道 #7: そして Username-Less へ](https://blog.jxck.io/entries/2025-07-14/load-to-passkey-7.html)
- [Passkey への道 #8: サービスにとって「移行」のゴールは何か?](https://blog.jxck.io/entries/2025-07-15/load-to-passkey-8.html)
- [Passkey への道 #9: ユーザに求められる令和のアカウントリテラシ](https://blog.jxck.io/entries/2025-07-16/load-to-passkey-9.html)