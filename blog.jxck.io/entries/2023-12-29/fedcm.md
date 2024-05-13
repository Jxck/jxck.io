# [cookie][3pca] 3PCA 27 日目: FedCM

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 27 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は、散々壊れるユースケースとして解説してきた「認証連携」をカバーする FedCM について解説する。


## Federated Credential Management

### 認証連携

あるサイト(RP)の認証を別のサイト(IDP)の認証で行いたい場合、両者の連携は 3rd Party Cookie で行われてきた。

例えば、 RP に IDP を `<iframe>` で埋め込み、 IDP に対するログイン済みの Cookie があれば、その情報を JS で RP に渡して認証済みにするといった構成だ。

これは、 `<iframe>` の中が Partition されているため、 SAA などを使わない限りアクセスできなくなった。 SAA が入る前の ITP 対策としてよく行われていたのは、一旦 IDP のページに遷移し、そこでジェスチャを発生させ、認証結果をクエリに付けて RP にリダイレクトバックする方法だった。詳細は過去の記事で解説している。

これは SSO などでも使われており、 3rd Party Cookie を用いたユースケースとしてはかなりポジティブなものとして捉えられている。


### FedCM API

このユースケースと、関連する認証周りをそのままブラウザ API に落とし込んだ提案として WebID があった。今は名前が変わって FedCM になっている。

- fedidcg/FedCM: A privacy preserving identity exchange Web API
  - https://github.com/fedidcg/FedCM

簡単に言えばブラウザに対して IDP に対するログインの処理を委譲できる。もしログイン済みでなければ IDP のログイン画面を表示し、そこからログインができる。(画像は Google のドキュメントから引用)

![fedcm-login-popup](fedcm-login-popup.png#650x419)

ブラウザが IDP に送信するリクエストには Cookie が付与されるため、セッションの有無で認証を連携することができるのだ。もしログイン済みなら、そのアカウントをブラウザの UI で表示し、選択することができる。ブラウザのネイティブ UI だが、多少のカスタマイズも可能だ。

![FedCM Account Chooser](fedcm-account-chooser.png#974x488)

これを RP 側で呼び出すには、基本的には JS を多少呼び出せば対応できるため、 RP 側のコストはそこまで高くはないだろう。 API は Credential Management API の拡張として定義されている。

```js
const credential = await navigator.credentials.get({
  identity: {
    providers: [
      {
        configURL: "https://idp.example/config",
        clientId: "https://rp.example",
        nonce
      }
    ]
  },
  mediation: "optional"
})
const { token } = credential
console.log({ token })
```

この API を呼び出すと、ブラウザは裏で IDP にリクエストを送信し、必要な情報を収集する。そのため、IDP 側は FedCM のための `/.well-known` エンドポイントなどを追加する必要がある。

既存の実装の上に FedCM とのダンスのための口を追加するような対応が必要になるだろう。

まだ `chrome://fedcm-internals` が無いため、ブラウザが裏側で行なっている処理が見えにくく、エラーでハマるとデバッグが面倒だ。


### iframe からの呼び出し

FedCM は `<iframe>` の中からも呼び出すことができる。

```html
<iframe src="https://embedded.example" allow="identity-credentials-get"></iframe>
```

これは、例えば YouTube を埋め込んでいるがログイン済みにならず、課金しているのに広告が出てしまうといったケースをカバーできる可能性がある。

つまり、認証を繋ぐだけであれば、 SAA や CHIPS に頼らずともユースケースを実現できる可能性がありそうだ。

ただ、これがどこまでどういった制限をもっているのかは、正直まだ筆者にもあまりわかっておらず、実際に使っているケースもまだ見てないため、今後検証したい。


## Standard Position

認証連携というユースケースがポジティブに捉えられているため、各ブラウザのポジションも悪くない。

まず Mozilla は Positive だ。

- Mozilla: Positive
  - https://mozilla.github.io/standards-positions/#fedcm

コメントは珍しく長いので引用は割愛する。

次に Webkit だが、まだポジションは決まっていない。 FedCM に関する複数のポジションリクエストはあるが、態度を保留している。

- Webkit: N/A
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+fedcm

ただ、 Standard Position が webkit-dev で問い合わせられていた頃は、 Positive な返事があった。

- [webkit-dev] Request for position on FedCM (was WebID)
  - https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html

> We are generally supportive and interested in working together to make this coexist well with passkeys.

Apple も "Sign In with Apple" を持っているため、ユースケース自体は認めているのだろう。