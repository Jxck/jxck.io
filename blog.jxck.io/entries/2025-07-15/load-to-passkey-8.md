# [passkey] Passkey への道 #8: サービスにとって「移行」のゴールは何か?

## Intro

パスワード + TOTP は限界を迎え、Passkey へ移行しなければ、サービスがユーザを守りきれなくなった。

逆を言えば、サービスがユーザを守りたいと思うのであれば、Passkey を提供しないわけにはいかない時代に突入している。

では、令和のこの状況において、サービスはどう対応していくべきだろうか?


## サービスの対応

理想だけを言うなら、Passkey をサポートし、Username-Less のログインを可能にする。その上で、パスワード+TOTP の認証はサポートを止め、保持していてもリスクでしかないパスワードのハッシュを、サーバから消す。鍵の管理とリカバリにだけに注力すれば良い。

というところまで到達できればよいが、現実的にはまだまだ過渡期どころか黎明期だ。サービスをそのように実装できればシンプルで堅牢だが、ユーザはそこまでの準備が整っているとは言えない。

サービスがパスワードを無くせば、パスワードと共にユーザの一部/大部分を失う可能性が高い。したがって、しばらくは Password + TOTP という旧来の方式を並行サポートする。

ただし、準備のできたユーザから順に Passkey へ移行を促せるよう、選択肢としてきっちり導入しておくのが今のフェーズと言えるだろう。


## いかにユーザを移行させるか

Passkey 対応ログイン画面を実装するためのノウハウはいくらでも出てくるし、ガイドラインも多々ある。AI に聞けば動くものはいくらでもできるだろう。プロンプトには、以下のチェックリストを渡しておくと良い。

- Secure and seamless passkeys: A deployment checklist
  - https://web.dev/articles/passkey-checklist

こうして、ログイン画面を Passkey 対応した。これで移行タスクは完了。

ではない。

ユーザのアカウントを守るためには、サービスはとにかく「Passkey に移行してもらう」必要がある。しかし、一般ユーザの多くは、パスワードのサポートが切られでもしない限り、従来通りそちらを使うだろう。ユーザは特に困っていないからだ。

そうしたユーザに、どうアドバタイズし、どう移行させるかは、まだまだ課題が多い。Passkey に対応したサービスを見ても、この点の取り組みは、まだまだ消極的に感じるものが多い。あまりしつこく勧めると UX を損ねるため、プラクティス不足で様子見な部分もあるだろう。

「移行」は、今サービスが「ユーザを守るために」取り組むべき、最も重要なテーマであるはずなのだ。


### Passkey の通知

最もナイーブな発想は、ユーザの環境が Passkey に対応しているかを調べ、対応しているユーザに Passkey 作成を促すプロンプトを出すことだ。

出すタイミングは、ユーザがパスワードでログインした直後が良いだろう。

![Passkey 対応のアドバタイズ](start-using-passkeys.png#1000x650)

- Passkeys user journeys
  - https://developers.google.com/identity/passkeys/ux/user-journeys

ユーザの遷移に挟んでもまで、これをしっかりとアドバタイズしているサイトは、パッとは思いつかなかった。

体感でも、そこまで見ないような気がする。

ところが、ユーザが「Passkey に対応した環境にいる」ということは、すでにパスワードマネージャなどを導入しているということだ。

もしパスワードマネージャを生体認証でアンロックし、パスワードを Autofill してログインできているのであれば、そのユーザが Passkey に移行しない強い理由はないだろう。体験はほぼ同じだからだ。

そこで Apple は、こうしたユーザに対してまたもや積極的なアプローチを展開した。


### Automatic Passkey Upgrade

少なくとも、iPhone を使っていれば Passwords が、Android を使っていれば Google Password Manager が使える状態にある。ユーザによっては、既にパスワードをそれらパスワードマネージャで管理し、ログインを Autofill で行っている場合もあるだろう。

他にも、1Password, Bitwarden, Enpass などに移行済みで、ブラウザに拡張を入れて、パスワードを Autofill しているユーザもいる。

こうしたユーザは、「あとは Passkey を登録するだけ」の状態だ。アカウントを選択し、アンロックしてログインするという動線は、パスワードも Passkey も大差ないため、もはや移行をしない理由のほうが少ない。

ユーザにとって重要なのは、その導線だった。

そこで、Apple は「特定の条件が揃ったユーザに対して、自動的に Passkey を登録する」という方式を発表した。いつも通り WWDC でだ。

- Passkeys user journeys
  - https://developers.google.com/identity/passkeys/ux/user-journeys

2024 年、iOS 18 には Passwords という純正のパスワードマネージャが搭載された。iCloud Keychain は証明書管理まで含む、かなりプロユースなものだったため、よりわかりやすい「パスワードマネージャ」として提供したものだ。そこを起点に iCloud ユーザを Passkey に移行していくため、準備の整ったユーザは裏で自動的に Passkey を登録するようになったのだ。かなり強力な施策だったと思う。

後に、Google も GPM で同様の Auto Upgrade に対応する。

- Automatically create passkeys in Google Password Manager on Chrome desktop
  - https://developer.chrome.com/blog/passkey-automatic-upgrades

で、自動で登録される条件とは何か? が気になるだろう。もちろん「パスワードマネージャにパスワードを保存しており、それを使ってログインした直後」といったものだが、このクライテリアはパスワードマネージャやブラウザが決めることで、また段階的に更新されていく部分だ。

要するに「どのような条件にすれば、もっともスムーズに Passkey への移行を促せるか」について完全には答えが出ていないため、実装に委ねることで更新の余白を残しているのだ。その答えは時間とともに変わり、パスワードが無くなる日まで模索し続けることになる。サービス開発者は下手な "過対応" をするのではなく、素直に「ログイン後に API を呼ぶ」だけにしておき、各プラットフォームやパスワードマネージャに条件判断を委ねるのが良いだろう。


### パスワードマネージャへの通知

#### 1Password

パスワードマネージャにパスワードを登録しているサービスが、Passkey に対応しているのであれば、その事実をパスワードマネージャに伝えることで、ユーザに移行を促すことができる。

1Password が運営する Passkeys.directory というサイトには、Passkey への対応が完了したサービスがリストされている。

- Passkeys.directory
  - https://passkeys.directory/

単なる対応有無だけではなく、どのエンドポイントで登録できるか、登録フローはどうなるか、などが細かく登録されている。

![GitHub の passkeys.directory 登録](github-passkey-directory.png#498x918)

これにより、1Password 上の該当アカウントに、Passkey 対応が通知され、移行の導線が表示されるのだ。

![1Password の GitHub アイテムに Passkey 対応が通知される](github-passkey-1password.png#776x466)

Watchtower という項目では、まだ Passkey 移行が済んでいないアイテムが一覧できる。

![Watchtower で未移行のアイテムが表示される](watchtower.png#516x6512)

このリストが 1Password 以外に使われているかはわからないが、今のところ最も網羅されていると思うので、ここに登録しない理由は特にない。

登録はコミュニティドリブンで、気付いた人がフォームから登録するスタイルだ。自分のサービスで対応が済んだら、自分で登録をリクエストしても良いだろう。


#### Google Password Manager

Google Password Manager は、独自の登録フォームを別途持っている。

- Promote passkey upgrades in Google Password Manager | Sign in with Google for Web
  - https://developers.google.com/identity/passkeys/developer-guides/upgrades

ただし、こちらは `/.well-known/passkey-endpoints` の対応も含めている。


## /.well-known/passkey-endpoints

Passkey に対応したサービスは、`/.well-known/passkey-endpoints` に対応し、以下のような JSON を返す。

```json
{
  "enroll": "https://example.com/sign-up",
  "manage": "https://example.com/settings/passkeys"
}
```

`enroll` が Passkey 登録画面で、`manage` が管理画面だ。

これにより、パスワードマネージャがこの URL を使って、ユーザを登録画面や管理画面に誘導できる。

パスワード変更画面へのリダイレクトとして `/.well-known/change-password` という仕様もあり、パスワードが危殆化したときに、パスワードマネージャがユーザを変更画面に誘導するために使われてきた。その Passkey 版だ。

- ms-id-standards/MSIdentityStandardsExplainers
  - https://github.com/ms-id-standards/MSIdentityStandardsExplainers/blob/main/PasskeyEndpointsWellKnownUrl/explainer.md

このエンドポイント提供は「Passkey 対応」というタスクに含めるべきであり、GPM だけでなく Passkeys.directory への登録にも用いると良いだろう。


## Password の削除

本来の「Passkey 移行完了」は、ユーザが Passkey を登録している状態ではない。

「サービスがパスワードを持っていない」状態だ。

「Passkey の方が安全」だから移行するのではない。「パスワード+TOTP はもうすでに脆弱」だから移行が必要なのだ。

したがって、Passkey への移行を無事に済ませているユーザからは、どこかのタイミングでパスワードを削除することで、「パスワードでもログインできる状態」を無くすのが理想だ。残っていれば、そこはフィッシング詐欺や Infostealer の餌食になる。追加で Passkey を登録するだけでは、本来は片手落ちなのだ。

しかし、まだ多くのサービスがそこまでは行っていないだろう。少なくとも、1Password で通知されたほとんどのサービスで移行済みの筆者も、パスワードを削除したサービスはまだ見ていない。認証手段から、パスワードを削除できるサービスも、まだ見ていないように思う。

ここはまだ、業界全体としてどう進めるかが見えていない部分であり、現実的にどこまでできるのか、筆者としてもまだわかっていない部分だ。

ここも Apple が先導してくれるのではないかと、密かに期待している。


## Outro

とにかく、サービスがログイン画面や管理画面に Passkey の動線を入れて、あとはユーザの選択なので自己責任にお任せです、では正直「サポートした」の半分にも達していないと筆者は感じる。

Auto Upgrade などを見ると「やり方が強引だ」「Apple はこれだから〜」などのアレルギーを感じる人もいるだろう。

しかし、Apple が率先してこれを始めたのも、それに合わせて iCloud Keychain から独立した Passwords というアプリまで出したのも、「移行をユーザに任せるなんて呑気なことは言ってられない」ことを、高い解像度で認識しているからだと筆者は感じる。そもそも Passkey という概念自体を業界に持ち込んだのも、他でもなく Apple だったのだ。

サービスが、Passkey への移行をユーザの自主性に任せて、「あとはユーザの選択なので」で終わらせて良い時期がいつまで続くかは、筆者にもわからない。それでも、「Passkey のサポート」がどこまでを意味すべきかは、ぜひ考えておきたい。


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