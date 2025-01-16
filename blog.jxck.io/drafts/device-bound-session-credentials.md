# [dbsc][cookie][security] Cookie Theft 対策と Device Bound Session Credentials

## Intro

Chrome チームより提案された Device Bound Session Credentials の実装が進み、Flag 付きで試すことができる。

この提案の背景と、解決する問題、現時点での挙動について解説する。


## 背景

2FA や Passkey の普及により、認証部分はかなりセキュアになってきた。インシデントによりパスワードが漏洩しても、それだけでなりすましを成立するのも困難になっている。

そこで攻撃者の注目をあつめているのが、Cookie の窃取(Cookie Theft)だ。

認証が如何に堅牢になっても、有効な Session Cookie を盗むことができれば、その値を `Cookie` Field に付与してリクエストするだけで、なりすましを成立されることができる。

いわゆる Session Cookie は、Proof of Authentication として実装されていることがほとんどであり、その有効期限内はユーザの持つ権限と同等の操作が可能になる。そして Bearer Token であるため誰が送ってもその効果を発揮してしまうためだ。

いかに Session Cookie を守るのかは、今後の Web セキュリティの 1 つの重要なトピックと言える。


## Cookie Theft によるインシデント

HTTPS が前提となり通信が暗号化されているため、Cookie を盗むのは難しいと考えるかもしれない。

しかし、Cookie Theft の攻撃ベクタは、通信の Person in The Middle ではなく、マルウェアやフィッシングにトレンドを移している。

ちょうど世間を騒がせた DMM のビットコイン流出事件も、この手法による Session Cookie の窃取が突破口になっているようだ。

- 北朝鮮を背景とするサイバー攻撃グループ TraderTraitor による暗号資産関連事業者を標的としたサイバー攻撃について - 令和６年 12 月 24 日 警察庁
  - https://www.npa.go.jp/bureau/cyber/pdf/020241224_pa.pdf

> ...同サイバー攻撃グループは、Ginco のウォレット管理システムへのアクセス権を保有する従業員に、GitHub 上に保管された採用前試験を装った悪意ある Python スクリプトへの URL を送付しました。被害者は、この Python コードを自身の GitHub ページにコピーし、その後、侵害されました。
> ...侵害を受けた従業員になりすますためにセッションクッキーの情報を悪用し、Ginco の暗号化されていない通信システムへのアクセスに成功しました。

つまり、GitHub 上の Python スクリプトを実行させ、有効な Session Cookie を窃取。それを用いたなりすましで、ビットコインの漏洩を成立したとしている。


### マルウェア対策

Cookie はあくまでブラウザがローカルに保存している値であるため、ユーザの権限でインストールされたマルウェアは、保存されたファイルにアクセスできてしまうのだ。

なお、昔のブラウザは、それこそ平文テキストで保存されていたりもしたが、さすがに今はそこまで簡易ではない。

例えば Chrome は様々なデータをローカルの SQLite に保存することが多いが、Cookie に関しては Mac の Keychain, Linux の Kwallet など、アプリからしかアクセスできない安全な領域に保存している。

ところが Windows は、DPAPI というログインユーザ権限で実行されたアプリからはアクセスできてしまう領域にあるため、マルウェアによる窃取の危険性があった。

そこで、App-Bound Encryption という機能で、これを保護するよう変更が入った。

- Improving the security of Chrome cookies on Windows
  - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html

DMM の攻撃発覚が 2024/3 で、このエントリが 2024/7 公開なので、事件が契機だったのか?と勘ぐってしまったが、作業のタイムラインを見ると 2021 年頃から継続的に作業をしてるので、たまたま重なっただけのようにも見える。

- add application bound encryption primitives for chrome [40227925] - Chromium
  - https://issues.chromium.org/issues/40227925

事件の詳細は公開されている以上にわからないが、もし仮に Ginco の社員が使っていたのが Windows Chrome であり、この変更が間に合っていたら 482 億の流出が防げていた可能性があるのなら、この変更の大きさがよくわかる。


### フィッシング対策

マルウェアよりも簡単なのは、ユーザの方を騙す手口だ。(DMM の攻撃も、ソーシャル経由ではあるが)

フィッシングサイトでログイン画面を偽装し、ID/Password を窃取する方法は知られていたが、二段階認証等があれば Password だけを盗まれても攻撃のリスクは減らせる。しかし、入力された ID/Password を裏で Proxy して本サイトに転記、同様に TOTP Token などもユーザに求めてそれを転記すれば、フィッシングサイトの裏にいる攻撃者が、ログイン済みの Cookie 発行を受けることができる場合がある。

ユーザは本サイトにリダイレクトしておけば、「なんかログインできなかった」ともう一度正規のログインを行うだけなので、一般ユーザだと攻撃されたことすら気づけないかもしれない。

ドメイン名を見て偽のサイトであることに気づくのが、ユーザができる第一の策だ。長いサブドメインを使って、部分的に本物に見せかける攻撃を防ぐために、モバイルブラウザが eTLD+1 のみの短縮表示を始めたのも、こうした理由が大きい。

それでも、人間の注意は限界があるので、各ベンダーはパスワードマネージャを推奨し、機械的に偽ドメインに気付けるようにユーザへの啓蒙を進めている。パスワードマネージャの普及が求められるのは、簡単な文字列が再利用されるのを防ぐだけではない。Passkey 普及のゴールも、どちらかというとパスワードマネージャの普及にあると筆者は考えている。


### Cookie Theft 対策

Cookie が Bearer Token である以上、送られてきた値が Valid でも、それが窃取されたものかどうかは確信が持てない。

そこで、Session に紐づけてメタ情報を保存しておき、ユーザの行動に発生する変化を監視する方法が知られている。

具体的には以下のような情報を用いる。

- `IP`
- `User-Agent`
- `Accept`
- `Accept-Language`
- `Sec-Fetch-*`

これらの値をリクエストから収集し、Cookie を発行した時点と値が変わっていれば、それは窃取した他のユーザから使われている可能性が高い。

もちろん、移動すれば IP は変わるし、アップデートすれば UA は変わる。つまり、偽陽性があるため確実な検出はできないが、再認証や CAPTCHA を挟むことで安全側に倒し、リスクを低減する方式は広く実装されている。

(Private Relay を有効にしていると、Google サーチで CAPTCHA が頻出するなど、不便もあるため閾値は難しいが。)

この手法について具体的な施策は、あまり公開されることがなかった。しかし、去年 Slack が、タイムスタンプなどの要素も追加した、より強固な対策の実施内容を共有しているため参考になる。

- Catching Compromised Cookies - Engineering at Slack
  - https://slack.engineering/catching-compromised-cookies/


## Cookie をどう守るか

「盗まれないようにする」のと同じように、「盗まれても大丈夫にする」という対策も考えられている。

根本的には、「送信してきたのが正当な所有者である」ことを証明できればよく、ここでは公開鍵暗号方式が応用できる。OAuth では、DPoP や MTLS のような仕組みで Proof of Possession(PoP) を実現し、Sender Constrained な Token にする対策がなされており、発送はそれと同じだ。

このような方式を取る場合、問題になるのは鍵(Private Key)の管理だ。クライアントに鍵を保持するなら、それが盗まれる可能性を考える必要があり、そこが安全性の下限になる。

ちなみに、JS で鍵を生成し IndexedDB に入れる実装としては、以下がある。

- session-lock - Home
  - https://session-lock.keyri.com/

Web の場合、そもそも通信自体が TLS で鍵交換してるのだから、そこに紐づけて Token を管理できないかという発想で、Token Binding という仕様が議論された時期もある。

- RFC 8473 - Token Binding over HTTP
  - https://datatracker.ietf.org/doc/html/rfc8473

これを用いれば Cookie や OAuth の Token などに対して、ブラウザが管理している鍵(から Export された専用の鍵)を用いて、PoP を提供できると期待されていた。

しかし、TLS との連携をデプロイするのは必ずしも容易とはいえなかった。例えば、一般的な構成では TLS の終端はアプリケーションサーバとは別のマシンで行われることが多い(最近だと CDN など)。

また、そもそもネットワーク的な意味でのレイヤを跨いでいるため、アプリケーション(フレームワーク)の既存の設計にも馴染まない部分が多い。

なにより、TLS のライフサイクル(ハンドシェイク)と、アプリが管理するセッションのライフサイクル(ログイン~ログアウト)などが乖離しているため、例えばログアウトしたから Binding を切りたいといった要求に対して、微妙な歪みが生じたのだ。


### Demonstrating Proof-of-Possession in the Browser Application (BPoP)

Microsoft は DPoP に似た BPoP というプロトコルを提案していた。といっても、Explainer を書いただけで終わっている。

- MSEdgeExplainers/BindingContext/explainer.md at main · MicrosoftEdge/MSEdgeExplainers
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/BindingContext/explainer.md

これは、ほぼこのあと解説する DBSC と同じようなものであり、すでに MS は DBSC の方に協力する方向になっているようなので、この仕様の解説は省く。

- DBSC (Device Bound Session Credentials) · Issue #106 · WICG/proposals
  - https://github.com/WICG/proposals/issues/106#issuecomment-1624111068
- Device Bound Session Credentials · Issue #912 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/912#issuecomment-2420716960


### TPM による管理

通常、TLS の鍵、特に CA の秘密鍵などは、漏洩を防ぐために厳重に管理する必要がある。そこで、鍵の生成は一般に行われる OpenSSL の `genrsa` のようなカジュアルな方法ではなく、専用ハードウェアモジュールの中で行われる。

このようなモジュールは HSM (Hardware Security Module) と呼ばれ、内部で生成された秘密鍵は、そもそも取り出すことができない。もし壊して取り出そうとすると、鍵そのものが失われる(耐タンパ性)。署名等の計算などが必要な場合は、モジュールに対してリクエストすると、鍵を用いた計算結果が中で行われ、計算結果だけが返ってくるといった仕組みだ。これなら、鍵の窃取に対して堅牢になる。しかし、こうしたモジュールは非常に高価で、扱うのも専門業者くらいだった。

ところが、近年ではデバイスにおける TPM (Trusted Platform Module) の実装が広がっている。これは、基盤に埋め込まれ隔離されたハードウェアで、秘密鍵を管理できる、安価な HSM のようなものだ。

現状は、全てのデバイスが TPM を持ってるとは限らないが、Win11 からは TPM を持つことが必須になり、Chrome の調査では Win ユーザの 60% 程度は TPM が利用できる状態にあると報告され、徐々に普及が進んでいると言える。

もし TPM を持たないデバイスの場合は、ソフトウェアでエミュレートすることでフォールバックが可能だ。そちらは TPM ほど安全ではないにせよ、全体のセキュリティの底上げにはなる。

もちろん、TPM に対して署名を依頼することは他のユーザ(特に、より権限の高いユーザ)でも可能であり、攻撃を完全には防げないらしい。しかし、そのような悪意のあるアプリの動きは、マルウェアとして検知するのがある程度容易であるため、総合的には対策が可能とされている。

少なくとも、この仕組みを Cookie に持ち込めれば、従来よりはかなり安全になる。


## Device Bound Session Credentials

つまり、Cookie の PoP を TPM に保存した鍵で提供するという方式が、Device Bound Session Credentials (DBSC) の提案の中核だ。

- WICG/dbsc
  - https://github.com/WICG/dbsc
- Chromium Blog: Fighting cookie theft using device bound sessions
  - https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html

しかし、完全に Cookie とは別の仕組みを仕様にしても、デプロイ負荷が高いと広がらないため、Cookie との互換も持たせるような設計にしてある。

ここからは、実際に Chrome のフラグを有効にし、その挙動を確認しながら基本的な仕様を見ていく。なお、現状は Windows でしか動かなかったため、以下は Win11 / Chrome 131 で検証している。

- chrome://flags/#enable-standard-device-bound-session-credentials


### Sec-Session-Registration

ここでいうセッションの開始は、ログインフローの最後に Authorized Session が開始する時点などを想定している。

つまり、ログイン認証のレスポンスで `Sec-Session-Registration` を返すことで、クライアントに鍵ペアの生成をリクエストできる。

```http
HTTP/1.1 302 Found
Location: /
Sec-Session-Registration: (RS256 ES256);challenge="challenge_value";path="session"
```

構造は SFV になっており、最初は暗号方式のリストから始まり、後で用いるチャレンジと、エンドポイントのパスが含まれている。


### Sec-Session-Response

レスポンスを受け取ったクライアントは、TPM で生成した鍵を JWT でシリアライズし、`Sec-Session-Response` に付与して、先程の指定したエンドポイントにリクエストする。body はない。

ブラウザが内部的に送るリクエストのため、Dev Tools の Network タブに今は出ない。早く内部デバッガ (chrome://dbsc-internals)が欲しい。

```http
POST /session HTTP/1.1
Host: example.com
Sec-Session-Response: eyJ...
```

JWT は以下のようなものだ。

```js
// Header
{
  "typ": "JWT",
  "alg": "RS256"
}
// Payload
{
  "aud": "https://example.com/session",
  "jti": "challenge_value",
  "iat": "1736267817",
  "key": {
    "e": "AQAB",
    "kty": "RSA",
    "n": "oPJngC..."
  },
  "authorization": ""
}
// Signature
"gkkfn2VDUQzJHv7..."
```

この鍵をサーバ側で保存する。

---

TODO: ここから下はまだ実装が終わってないため、挙動が確認できてない。

現状は、仕様ベースで解説し、挙動が確認出来次第更新する。


### Session Registration instructions JSON

このリクエストに対し、サーバは以下のような JSON を body で送る。

```json
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 65535
Set-Cookie: __Host-session-id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=604800

{
  "session_identifier": "b434736b1daa31f7",
  "refresh_url": "/refresh",
  "scope": {
    "origin": "example.com",
  },
  "credentials": [{
    "type": "cookie",
    "name": "__Host-session-id",
    "attributes": "Path=/; Secure; HttpOnly; Max-Age=604800"
  }]
}
```

ここで `Set-Cookie` する Cookie は、従来の Cookie と同じだ。

つまり、従来の Cookie のデプロイと互換性があり、セッション管理自体を新しいヘッダなどに移行する必要はない。


### Refresh Request

この Cookie の期限が切れたあと、Cookie を必要とするリクエストを実施する際に、ブラウザは DBSC の Refresh をサーバに対して実施することになる。

つまり、`Max-Age` が経過した後に `/` にアクセスする場合は、そのアクセスを一旦保留して、裏側で先程指定された `refresh_url` である `/refresh` に以下のようなリクエストを行う。

```http
POST /refresh HTTP/1.1
Host: example.com
Sec-Session-Id: b434736b1daa31f7
```

これが、「割り当てられた Session の Credential の Refresh」を要求している。

サーバはこれに対して、検証用の Challenge を返す。

```http
HTTP/1.1 401
Sec-Session-Challenge: "challenge_value";id="b434736b1daa31f7"
```

クライアントは、秘密鍵を用いてこれに応答する。

```
POST /refresh HTTP/1.1
Sec-Session-Response: JWT proof
```

検証に成功すれば、再度 `Set-Cookie` することで Cookie を更新することができる。

レスポンスとして、設定時と全く同じ JSON を返すことで更新が可能だ。

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 65535
Set-Cookie: __Host-session-id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=604800

{
  "session_identifier": "b434736b1daa31f7",
  "refresh_url": "/refresh",
  "scope": {
    "origin": "example.com",
  },
  "credentials": [{
    "type": "cookie",
    "name": "__Host-session-id",
    "attributes": "Path=/; Secure; HttpOnly; Max-Age=604800"
  }]
}
```

これを受け取ったクライアントは、保留していたリクエストをすべて送信することになる。


## Session の終了

もし (DBSC における) Session を終了する場合は、リフレッシュのレスポンスで以下のように返す。

```http
{
  "session_identifier": "b434736b1daa31f7",
  "continue": false
 }
```

もしくは `Clear-Site-Data: storage` を用いることも可能だ。

これにより、ブラウザは Session のために内部に保持したリソースを削除する。

以降は、削除した Session に対する `Sec-Session-Response` をクライアントが送ってくることも、`Sec-Session-Challenge` に応答することもなくなる。


## JS API

Explainer では JS API の可能性についても触れられている。

しかし、現状はあくまで構想だけであり、Chrome も初期の実装では JS API はスコープから外しているため、実装されたら検証する。


## Device Bound Session Credentials for Enterprise

この仕組みを拡張し、Enterprise 領域で発生する様々な要求をカバーできる可能性にも言及されている。

- Device Bound Session Credentials for Enterprise - explainer
  - https://github.com/drubery/dbsc/blob/main/DBSCE/Overview.md

DBSC では、既にマルウェアに汚染されていた場合、Credential の生成部分が改ざんされる可能性があるとし、主に鍵の生成部分についてカスタマイズできる余地を入れるというのが、本旨になっているようだ。

MS はこれまで、BindingContext という独自の仕様を提案していたが、今後は作業のフォーカスを DBSC(E) に移していくとしている。

- MSEdgeExplainers/BindingContext/explainer.md at main · MicrosoftEdge/MSEdgeExplainers
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/BindingContext/explainer.md

もちろん、DBSC が前提としてあるため、そちらがある程度進んでからになるだろう。

よってここでは、紹介のみに留める。


## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/


## Resources

- Spec
- Explainer
  - WICG/dbsc
    - https://github.com/WICG/dbsc
- Requirements Doc
- Mozilla Standard Position
  - Device Bound Session Credentials · Issue #912 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/912
- Webkit Position
  - Device Bound Session Credentials · Issue #281 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/281
    - デバイスバックアップからのリストア時の UX の低下を懸念している
    - TPM を必須にしないことで緩和できるが、それ以外で流出を防ぐあらゆることをすべき
- TAG Design Review
- Intents
  - Intent to Prototype: Device Bound Session Credentials (DBSC)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/xvZJPpXNS8Y/m/Z1gU6U-UAAAJ
- Chrome Platform Status
  - Device Bound Session Credentials - Chrome Platform Status
    - https://chromestatus.com/feature/5140168270413824
- WPT (Web Platform Test)
- DEMO
- Blog
  - Chromium Blog: Fighting cookie theft using device bound sessions
    - https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html
- Presentation
- Issues
  - DBSC (Device Bound Session Credentials) · Issue #106 · WICG/proposals
    - https://github.com/WICG/proposals/issues/106
  - Create DBSC in network service [41495201] - Chromium
    - https://issues.chromium.org/issues/41495201
- Other
  - MSEdgeExplainers/BindingContext/explainer.md at main · MicrosoftEdge/MSEdgeExplainers
    - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/BindingContext/explainer.md
  - DBSC public drive - Google ドライブ
    - https://drive.google.com/drive/folders/1xL5GnXS6XtBlf96UROkW4gAbvsInB-Fd
  - DBSC prototype
    - https://dbsc-prototype-server.glitch.me/
    - https://glitch.com/edit/#!/dbsc-prototype-server

```
```