# Device Bound Session Credentials による Cookie Theft 対策

## Intro

Chrome チームより提案された Device Bound Session Credentials の実装が進み、 Flag 付きで試すことができる。

この提案の背景と、解決する問題、現時点での挙動について解説する。

## 背景

2FA や Passkey の普及により、認証部分はかなりセキュアになってきた。インシデントによりパスワードが漏洩しても、それだけでなりすましを成立するのも困難になっている。

そこで攻撃者の注目をあつめているのが、 Cookie の窃取(Cookie Theft)だ。

認証がいかに強固になっても、有効な Session Cookie を盗むことができれば、その値を `Cookie` Field に付与してリクエストするだけ、なりすましを成立されることができる。

いわゆる Session Cookie は Proof of Authentication であるため、その有効期限内はユーザの持つ権限と同等の操作が可能になるが、 Bearer Token であるため誰が送ってもその効果を発揮してしまうためだ。

いかに Cookie を守るのかは、今後の Web セキュリティの 1 つの重要なトピックと言える。

## Cookie をどう盗むか

HTTPS が前提となり、通信が暗号化されているのだから、 Cookie を盗むのは難しいと考えるかもしれない。

しかし、 Cookie Theft の攻撃ベクタは通信ではなく、マルウェアやフィッシングによるものとされている。

### マルウェア対策

Cookie はあくまでブラウザがローカルに保存している値であるため、ユーザの権限でインストールされたマルウェアは、保存されたファイルにアクセスできてしまうのだ。

なお、昔のブラウザは、それこそ平文でファイルに保存されていたりもしたが、さすがに今はそこまで脆弱ではない。

例えば Chrome は様々なデータをローカルの SQLite に保存することが多いが、Cookie に関しては Mac の Keychain, Linux の Kwallet
 など、アプリからしかアクセスできない安全な領域に保存している。

ところが Windows は、 DPAPI というログインユーザ権限で実行されたアプリからはアクセスできてしまう領域にあるため、これを App-Bound Encryption という機能で保護する変更が進んでいる。

- Improving the security of Chrome cookies on Windows
  - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html


### フィッシング対策

マルウェアよりも簡単なのは、ユーザの方を騙す手口だ。

フィッシングサイトでログイン画面を偽装し、 ID/Password を窃取する方法は知られていたが、二段階認証等があれば Password だけを盗まれても攻撃のリスクは減らせる。しかし、入力された ID/Password を裏で Proxy して本サイトに転記し、同様に TOTP Token などもユーザに求めてそれを転記すれば、フィッシングサイトの裏にいる攻撃者が、ログイン済みの Cookie 発行を受けることができる場合がある。

ユーザは本サイトにリダイレクトしておけば、「なんかログインできなかった」ともう一度正規のログインを行うだけなので、一般ユーザだと攻撃されたことすら気づけないかもしれない。

偽のサイトであることをドメインで気づくのが第一の策であるため、各ベンダーはパスワードマネージャを推奨し、機械的に偽ドメインに気付けるようにユーザへの啓蒙を進めている。パスワードマネージャの普及が求められるのは、忘れるから簡単な文字列が使われることだけではないからだ。

## Cookie Theft 対策

Cookie が Bearer Token である以上、送られてきた値が Valid でも、それが窃取されたものかどうかは確信が持てない。

そこで、 Session に紐づけてメタ情報を保存しておき、ユーザの行動に発生する変化を監視する方法が知られている。

ベクタとしては以下のようなものだ

- IP
- User-Agent
- Accept
- Accept-Language
- Sec-Fetch-*

これらの値をリクエストから取得し、 Cookie を発行した時と値が変わっていれば、それは窃取され他のユーザから使われている可能性が高い。

偽陽性があるため確実ではないが、安全側に倒し再認証や CAPTCHA を挟むことで、リスクを低減する方式は広く実装されている。

(Private Relay を有効にしていると、Google で CAPTCHA が頻出するなど、不便もあるため閾値は難しいが)

Slack は、タイムスタンプなどの要素も追加することで、より強固な対策を実施している。

- Catching Compromised Cookies - Engineering at Slack
  - https://slack.engineering/catching-compromised-cookies/


## Cookie をどう守るか

「盗まれないようにする」のと同じように、「盗まれても大丈夫にする」という対策も考えられている。

根本的には、「送信してきたのが正当な所有者である」ことを証明できればよく、ここでは公開鍵暗号の方式が応用できる。OAuth では、 DPoP や MTLS のような仕組みで Proof of Possession(PoP) を実現し、 Sender Constrained な Token にする対策がなされている。

このような方式を取る場合、問題になるのは鍵の管理だ。クライアントに鍵を保持するなら、それが盗まれる可能性を考える必要があり、そこが安全性の下限になる。

ちなみに、 JS で鍵を生成し IndexedDB に入れる実装としては、以下がある。

- session-lock - Home
  - https://session-lock.keyri.com/


Web の場合、そもそも通信自体が TLS で鍵交換してるのだから、そこに紐づけて Token を管理できないかという発想で、 Token Binding という仕様が議論された時期もある。

- RFC 8473 - Token Binding over HTTP
  - https://datatracker.ietf.org/doc/html/rfc8473

これを用いれば Cookie や OAuth の Token などに対して、ブラウザが管理している鍵(から Export された専用の鍵)を用いて、 PoP を提供できると期待されていた。

しかし、TLS との連携をデプロイするのは必ずしも容易とはいえなかった。例えば、一般的な構成では TLS の終端はアプリケーションサーバとは別のマシンで行われることが多い。また、そもそもネットワーク的な意味でのレイヤを跨いでいるため、アプリケーション(フレームワーク)の既存の設計にも、馴染まない部分が多い。なにより、 TLS のライフサイクル(ハンドシェイク)と、アプリが管理するセッションのライフサイクル(ログイン~ログアウト)などが乖離しているため、例えばログアウトしたから Binding を切りたいといった要求に対して、微妙な歪みが生じたのだ。

## TPM による管理

通常、 TLS の鍵、特に CA の秘密鍵などは、漏洩を防ぐために厳重に管理する必要がある。そこで、鍵の生成は一般に行われる OpenSSL の genrsa のような方法ではなく、そもそも専用ハードウェアモジュールの中で行われる。

このようなモジュールは HSM (Hardware Security Module) と呼ばれ、内部で生成された秘密鍵は、そもそも取り出すことができない。もし壊して取り出そうとすると、鍵そのものが失われる(耐タンパ性)。そして、例えば署名等の計算はモジュールに対してリクエストすると、中から計算結果が返ってくるといった仕組みだ。これなら、鍵の窃取に対して堅牢になる。

しかし、こうしたモジュールは非常に高価で、扱うのも専門業者くらいだった。

ところが、近年ではデバイスにおける TPM (Trusted Platform Module) の実装が広がっている。これは、基盤に埋め込まれ隔離されたハードウェアで、秘密鍵を管理できる、安価な HSM のようなものだ。

現状は、全てのデバイスが TPM を持ってるとは限らないが、 Win11 からは TPM を持つことが必須になり、 Chrome の調査では Win ユーザの 60% 程度は TPM が利用できる状態にあると報告され、徐々に普及が進んでいる。

もし TPM を持たないデバイスの場合は、ソフトウェアでエミュレートすることでフォールバックが可能だ。そちらは TPM ほど安全ではないにせよ、全体のセキュリティの底上げにはなる。

また、 TPM に対して署名を依頼することは他のユーザも可能であり、攻撃を完全には防げないらしい。しかし、そのような悪意のあるアプリの動きは、マルウェアとして検知するのがある程度容易であるため、総合的には対策が可能とされている。

少なくとも、この仕組みを Cookie に持ち込めれば、従来よりはかなり安全になる。

## Device Bound Session Credentials

つまり、 Cookie の PoP を TPM に保存した鍵ペアで提供するという方式が、 Device Bound Session Credentials (DBSC) の提案の中核だ。

しかし、完全に Cookie とは別の仕組みを仕様にしても、デプロイ負荷が高いと広がらないため、 Cookie との互換も持たせるような設計にしてある。

ここからは、実際に Chrome のフラグを有効にし、その挙動を確認しながら基本的な仕様を見ていく。

### Sec-Session-Registration

ここでいうセッションの開始は、ログインフローの最後に Authorized Session が開始する時点などを想定している。

認証リクエストのレスポンスで `Sec-Session-Registration` を返すことで、クライアントに鍵ペアの生成をリクエストできる。

```http
HTTP/1.1 200 OK
Sec-Session-Registration: (RS256 ES256);challenge="challenge_value";path="StartSession"
```

構造は SFV になっており、最初は暗号方式のリストから始まり、後で用いるチャレンジと、用いるパスが含まれている。

### Sec-Session-Response

TPM で鍵を生成したクライアントは、 JWT でそれらの情報をシリアライズし、 `Sec-Session-Response` に付与して、指定されたパスにリクエストを行う。

```
POST /securesession/startsession HTTP/1.1
Host: auth.example.com
Accept: application/json
Cookie: whatever_cookies_apply_to_this_request=value;
Sec-Session-Response: JWT Proof
```

JWT の形式は以下だ。

```json
// Header
{
  "alg": "Signature Algorithm",
  "typ": "JWT",
}
// Payload
{
  "aud": "URL of this request",
  "jti": "challenge_value",
  "iat": "timestamp",
  "key": {
    "kty": "key type",
    "<kty-specific parameters>": "<value>",
  },
  "authorization": "<authorization_value>", // optional, only if set in registration header
}
```






# DBSC(E)

この仕組みを拡張し、 Enterprise 領域で発生する様々な要求をカバーできる可能性にも言及されている。



# Cookie Theft によるインシデント

- DMMビットコイン流出事件 Gincoの責任とセキュリティの穴 - coki
  - https://coki.jp/article/column/43243/

> Gincoの管理システムへのアクセス権限を持つインド人従業員が、この偽の入社試験を受け、Pythonコードをダウンロードして実行したことでPCが感染。
> セッションクッキーを盗まれ、DMMのビットコインが盗まれたというのが事の経緯のようだ。


実際に、マルウェアによって Session Cookie が盗まれた事例。