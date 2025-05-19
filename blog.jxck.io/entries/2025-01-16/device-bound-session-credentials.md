# [dbsc][cookie][security] Cookie Theft 対策と Device Bound Session Credentials

## Intro

Chrome チームより提案された Device Bound Session Credentials の実装が進み、Flag 付きで試すことができる。

この提案の背景と、解決する問題、現時点での挙動について解説する。


## Update

- 2025/05/15: OT が始まったため、内容を大幅に更新


## 背景

2FA や Passkey の普及により、認証部分はかなりセキュアになってきた。インシデントによりパスワードが漏洩しても、それだけでなりすましを成立させるのも困難になっている。

そこで攻撃者の注目を集めているのが、Cookie の窃取(Cookie Theft)だ。

認証がいかに堅牢になっても、有効な Session Cookie を盗むことができれば、その値を `Cookie` フィールドに付与してリクエストするだけで、なりすましを成立させることができる。

いわゆる Session Cookie は、Proof of Authentication として実装されていることがほとんどであり、その有効期限内はユーザの持つ権限と同等の操作が可能になる。そして Bearer Token であるため、誰が送ってもその効果を発揮してしまうのだ。

いかに Session Cookie を守るのかは、今後の Web セキュリティの 1 つの重要なトピックと言える。


## Cookie Theft によるインシデント

HTTPS が前提となり通信が暗号化されているため、Cookie を盗むのは難しいと考えるかもしれない。

しかし、Cookie Theft の攻撃ベクタは、通信の Person in the Middle ではなく、マルウェアやフィッシングにトレンドを移している。

ちょうど世間を騒がせた DMM のビットコイン流出事件も、この手法による Session Cookie の窃取が突破口になっているようだ。

- 北朝鮮を背景とするサイバー攻撃グループ TraderTraitor による暗号資産関連事業者を標的としたサイバー攻撃について - 令和 6 年 12 月 24 日 警察庁
  - https://www.npa.go.jp/bureau/cyber/pdf/020241224_pa.pdf

> ...同サイバー攻撃グループは、Ginco のウォレット管理システムへのアクセス権を保有する従業員に、GitHub 上に保管された採用前試験を装った悪意ある Python スクリプトへの URL を送付しました。被害者は、この Python コードを自身の GitHub ページにコピーし、その後、侵害されました。
> ...侵害を受けた従業員になりすますためにセッションクッキーの情報を悪用し、Ginco の暗号化されていない通信システムへのアクセスに成功しました。

つまり、GitHub 上の Python スクリプトを実行させ、有効な Session Cookie を窃取。それを用いたなりすましで、ビットコインの漏洩を成立させたとしている。


### マルウェア対策

Cookie はあくまでブラウザがローカルに保存している値であるため、ユーザの権限でインストールされたマルウェアは、保存されたファイルにアクセスできてしまうのだ。

なお、昔のブラウザは、それこそ平文テキストで保存されていたりもしたが、さすがに今はそこまで簡易ではない。

例えば Chrome は様々なデータをローカルの SQLite に保存することが多いが、Cookie に関しては Mac の Keychain, Linux の Kwallet など、アプリからしかアクセスできない安全な領域に保存している。

ところが Windows は、DPAPI というログインユーザ権限で実行されたアプリからはアクセスできてしまう領域にあるため、マルウェアによる窃取の危険性があった。

そこで、Windows でも App-Bound Encryption という機能で、これを保護するよう変更が入った。

- Improving the security of Chrome cookies on Windows
  - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html

DMM の攻撃発覚が 2024/3 で、このエントリが 2024/7 公開なので、事件が契機だったのか?と勘ぐってしまったが、作業のタイムラインを見ると 2021 年頃から継続的に作業をしているので、たまたま重なっただけのようにも見える。

- add application bound encryption primitives for chrome [40227925] - Chromium
  - https://issues.chromium.org/issues/40227925

事件の詳細は公開されている以上にわからないが、もし仮に Ginco の社員が使っていたのが Windows Chrome であり、この変更が間に合っていたら 482 億の流出が防げていた可能性があるのなら、このパッチのもたらす影響の大きさがよくわかる。


### フィッシング対策

マルウェアよりも簡単なのは、ユーザの方を騙す手口だ。(DMM の攻撃も、ソーシャル経由ではあるが)

フィッシングサイトでログイン画面を偽装し、ID/Password を窃取する方法は知られていたが、二段階認証等があれば Password だけを盗まれても攻撃のリスクは減らせる。しかし、入力された ID/Password を裏で Proxy して本サイトに転記、同様に TOTP Token などもユーザに求めてそれを転記すれば、フィッシングサイトの裏にいる攻撃者が、ログイン済みの Cookie を受けとれる可能性もある。

ユーザは本サイトにリダイレクトしておけば、「なんかログインできなかった」ともう一度正規のログインを行うだけなので、攻撃されたことすら気づけないかもしれない。

ドメイン名を見て偽のサイトであることに気づくのが、ユーザができる第一の策だ。長いサブドメインを使って、部分的に本物に見せかける攻撃を防ぐために、モバイルブラウザが eTLD+1 のみの短縮表示を始めたのも、こうした理由が大きい。

それでも、人間の注意には限界があるので、各ベンダはパスワードマネージャを推奨し、機械的に偽ドメインに気付けるようにユーザへの啓蒙を進めている。パスワードマネージャの普及が求められるのは、簡単な文字列が再利用されるのを防ぐだけではない。Passkey 普及のゴールも、どちらかというとパスワードマネージャの普及にあると筆者は考えている。


### Cookie Theft 対策

Cookie が Bearer Token である以上、サーバが受け取った Cookie が有効なものであっても、それが窃取されたものかどうか、確信を持つことはできない。

そこで、Session に紐づけてメタ情報を保存しておき、ユーザの行動に発生する変化を監視する方法が知られている。

具体的には以下のような情報を用いる。

- `IP`
- `User-Agent`
- `Accept`
- `Accept-Language`
- `Sec-Fetch-*`

これらの値をリクエストから収集し、Cookie を発行した時点と値が変わっていれば、それは窃取した他のユーザから使われている可能性が高い。

もちろん、移動すれば IP は変わるし、アップデートすれば User-Agent は変わる。つまり、偽陽性があるため確実な検出はできないが、再認証や CAPTCHA を挟むことで安全側に倒し、リスクを低減する方式だ。

(Private Relay を有効にしていると、Google サーチで CAPTCHA が頻出するなど、不便もあるため閾値は難しいが。)

この手法について具体的な施策は、あまり公開されることがなかった。しかし、去年 Slack が、タイムスタンプなどの要素も追加した、より強固な対策の実施内容を共有しているため参考になる。

- Catching Compromised Cookies - Engineering at Slack
  - https://slack.engineering/catching-compromised-cookies/


## Cookie をどう守るか

「盗まれないようにする」のと同じように、「盗まれても大丈夫にする」という対策も考えられている。

根本的には、「送信してきたのが正当な所有者である」ことを証明できればよく、ここでは公開鍵暗号方式が応用できる。OAuth では、DPoP や MTLS のような仕組みで Proof of Possession (PoP) を実現し、Sender Constrained な Token にする方式があるが、発想はそれと同じだ。

このような方式を取る場合、問題になるのは鍵 (Private Key) の管理だ。クライアントに鍵を保持するなら、それが盗まれる可能性を考える必要があり、そこが安全性の下限になる。

ちなみに、JS で鍵を生成し IndexedDB に入れる実装としては、以下がある。もちろん、JS で取得可能な場所に鍵が保存されていることになる。

- session-lock - Home
  - https://session-lock.keyri.com/

Web の場合、そもそも通信自体が TLS で鍵交換しているのだから、そこに紐づけて Token を管理できないかという発想で、Token Binding という仕様が議論された時期もある。

- RFC 8473 - Token Binding over HTTP
  - https://datatracker.ietf.org/doc/html/rfc8473

これを用いれば Cookie や OAuth の Token などに対して、ブラウザが管理している鍵 (から Export された専用の鍵) を用いて、PoP を提供できると期待されていた。

しかし、TLS との連携をデプロイするのは必ずしも容易とはいえなかった。例えば、一般的な構成では TLS の終端はアプリケーションサーバとは別のマシンで行われることが多い (最近だと CDN など)。

また、そもそもネットワーク的な意味でのレイヤを跨いでいるため、アプリケーション (フレームワーク) の既存の設計にも馴染まない部分が多い。

なにより、TLS のライフサイクル (ハンドシェイク) と、アプリが管理するセッションのライフサイクル (ログイン~ログアウト) などが乖離しているため、例えばログアウトしたから Binding を切りたいといった要求に対して、微妙な歪みが生じたのだ。


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

通常、TLS の鍵、特に CA や GAFA レベルのサービスで用いる秘密鍵は、漏洩時の影響が大きすぎるため「プルトニウムと同等のセキュリティレベルで扱う」と冗談めいて言われるくらい、厳重に管理される必要がある。そこで、鍵の生成は一般に行われる OpenSSL の `genrsa` のようなカジュアルな方法ではなく、専用ハードウェアモジュールの中で行われる。

このようなモジュールは HSM (Hardware Security Module) と呼ばれ、内部で生成された秘密鍵は、そもそも取り出すことができない。もし壊して取り出そうとすると、鍵そのものが失われる(耐タンパ性)。署名等の計算が必要な場合は、モジュールに対してリクエストすると、鍵を用いた計算結果が中で行われ、計算結果だけが返ってくるといった仕組みだ。これなら、鍵の窃取に対して堅牢になる。しかし、こうしたモジュールは非常に高価で、扱うのも専門業者くらいだった。

ところが、近年ではデバイスにおける TPM (Trusted Platform Module) の実装が広がっている。これは、基盤に埋め込まれ隔離されたハードウェアで、秘密鍵を生成/管理できる、安価な HSM のようなものと言える。

現状は、全てのデバイスが TPM を持っているとは限らないが、Win11 からは TPM を持つことが必須になり、Chrome の調査では Win ユーザの 60% 程度は TPM が利用できる状態にあると報告され、徐々に普及が進んでいると言える。

もし TPM を持たないデバイスの場合は、ソフトウェアでエミュレートすることでフォールバックが可能だ。そちらは TPM ほど安全ではないにせよ、全体のセキュリティの底上げにはなる。

もちろん、TPM に対して署名を依頼することは他のユーザ(特に、より権限の高いユーザ)でも可能であり、攻撃を完全には防げない。しかし、そのような悪意のあるアプリの動きは、マルウェアとして検知するのがある程度容易であるため、総合的には対策が可能とされている。

少なくとも、この仕組みを Cookie に持ち込めれば、従来よりはかなり安全になるだろう。


## Device Bound Session Credentials

以上を踏まえ、Cookie の PoP を TPM に保存した鍵で提供するという方式が、Device Bound Session Credentials (DBSC) の提案の中核だ。

- WICG/dbsc
  - https://github.com/WICG/dbsc
- Chromium Blog: Fighting cookie theft using device bound sessions
  - https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html

一度鍵の交換を Client-Server 間で行えば、それを用いて確実な Session 維持が可能になる。

しかし、毎回公開鍵による認証を行うと負荷が高くなり、パフォーマンスに影響が出る。

そこで、セッションの維持自体は従来通り Cookie を用いて行う。しかし、Cookie を短命にしておき、それが切れる前に公開鍵による認証を行うことで、Cookie を再発行するのだ。

![DBSC の Flow](flow.png#500x416)

これにより、Cookie を発行する相手が確実に Session を開始した相手であることが革新できるし、Cookie を短命にすることで窃取された時のリスクも減らすことができる。

なにより、完全に Cookie とは別の仕組みにすると、デプロイ負荷が高いと広がらないため、Cookie そのものは従来通り用いることで互換性を保っているのだ。

デプロイに必要なのは、DBSC を行うためのエンドポイントのみになるため、サービス全体に大きな変更はなくて済む。


### Trial

執筆時点では OT が開始され、Chrome には複数のフラグが入っている。しかし、適切に動かすには、以下の Wiki にたどり着かないと無理だった。同じようにこの機能を検証する場合は、必ず一読することを勧める。

- Testing early versions of DBSC · w3c/webappsec-dbsc Wiki
  - https://github.com/w3c/webappsec-dbsc/wiki/Testing-early-versions-of-DBSC

以前は TPM を持っている Win11 でしか動かなかったが、現在は Software Emulation を有効にするフラグがあるため Mac でも動作可能だ。

- chrome://flags/#enable-bound-session-credentials-software-keys-for-manual-testing
  - Enabled
- chrome://flags/#enable-standard-device-bound-session-credentials
  - Enabled Without Origin Trials
- chrome://flags/#enable-standard-device-bound-sesssion-refresh-quota
  - Disabled

検証には Chrome Dev 138 を用いている。

公開されているプロトタイプとしては、以下が参考になる。

- DBSC prototype
  - https://dbsc-prototype-server.glitch.me/

なお、ブラウザが内部的に送るリクエストのため、Dev Tools の Network タブでのデバッグはできない。Wiki では chrome://net-export か chrome://histogram でデバッグ可能とあったが、サーバでログを出すほうが楽だったため試してない。早く内部デバッガ (chrome://dbsc-internals)が欲しいところだ。

また、移行のヘッダ名は今後変わることが議論されているため、注意したい。

- Appropriate Prefix for Server initiated header field (`Secure-` ?)
  - https://github.com/w3c/webappsec-dbsc/issues/186


### Sec-Session-Registration

ここでいう Session の開始は、ログインフローの最後に Authorized Session が開始する時点などを想定している。

つまり、ログイン認証のレスポンスで `Sec-Session-Registration` を返すことで、クライアントに鍵ペアの生成をリクエストできる。

```http
HTTP/1.1 302 Found
Location: /
Sec-Session-Registration: (ES256);challenge="challenge_value";path="session"
```

構造は SFV になっており、最初は暗号方式のリスト(トライアルでは ES256 のみ)から始まり、後で用いるチャレンジ値と、エンドポイントのパスが含まれている。


### Sec-Session-Response

レスポンスを受け取ったクライアントは、TPM で鍵ペアを生成する。公開鍵を JWT でシリアライズし、`Sec-Session-Response` に付与して、先程 `path` で指定したエンドポイント("/session")にリクエストする。body はない。

```http
POST /session HTTP/1.1
Host: example.com
Sec-Session-Response: eyJ...
```

実際に送られてきた JWT は以下のようなものだ。

```js
// Header
{
  "typ": "dbsc+jwt",
  "alg": "ES256"
}
// Payload
{
  "aud": "https://example.com/session",
  "jti": "challenge_value",
  "iat": "1736267817",
  "key": { // JWK
      "crv": "P-256",
      "kty": "EC",
      "x": "u2gM9t-LViGiATUQEGEDyAxU_KY4LHmUm0RatmyQW2c",
      "y":"OMPRp_BQV0YoHTuzuuuzDThjOAqhZW5c8gIwOcCpXnk"
  },
  "authorization": "" // optional
}
// Signature
"gkkfn2VDUQzJHv7..."
```

この JWT の署名を検証し、送信した `challenge` と `jti` の値が同じになることを確認する。

これにより、意図した Session 確立のために生成された鍵であることがわかるため、この鍵をセッションに紐づけて保存する。


### Session Registration Instructions JSON

このリクエストに対し、サーバは以下のような JSON を body で送る。

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: __Secure-session_id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=604800;

{
  "session_identifier": "1",
  "refresh_url": "https://labs.jxck.io/device-bound-session-credentials/refresh",
  "scope": {
    "origin": "https://labs.jxck.io",
    "include_site": true,
    "defer_requests": true,
    "scope_specification": []
  },
  "credentials": [
    {
      "type": "cookie",
      "name": "__Secure-session_id",
      "value": "deadbeef",
      "attributes": "Path=/; Secure; HttpOnly; Max-Age=604800"
    }
  ]
}
```

まず、セッション維持のための `Set-Cookie` をしているが、これは従来の Cookie 付与をそのまま利用できる。ただし、ここで `Max-Age` を短く設定することで、Cookie が盗まれた際のリスクを減らすことができる。どこまで短くするかは、後ほど考察する。

そして、設定した Cookie を Session に紐づける情報が body に入る。`session_identifier` を key として Session を識別し、`credentials` に Cookie の情報を入れる。

`refresh_url` は、Session が切れた際に Cookie を更新するためのエンドポイントを指定する。

`attributes` には、設定した属性をそのまま指定する。仕様上 `HttpOnly`, `Max-Age`, `Expires` は無視されるようだが、全く同じように指定しておかないと無限にリクエストを繰り返す実装のため、ここでもかなりハマった。

ところが、このトライアルでの最大のハマりどころは、この Cookie 名に `__Host-` を付与するとうまく動かないという点だ。ちなみに `__Secure-` は動く。実装者本人も気づいてないバグのようだが、トライアルが終わるころには治ってることだろう。

今回は、このエンドポイントの実装が最も時間を溶かした。


### Refresh Request

この Cookie の期限が切れたあと、Cookie を必要とするリクエストを送信する際に、ブラウザは先ほど `refresh_url` に指定されたエンドポイントに対して、Session の更新を実施することになる。

つまり、`Max-Age` が経過した後にアクセスする場合は、そのアクセスを一旦保留して、裏側で先程指定した `/refresh` に以下のようなリクエストを行う。

```http
POST /refresh HTTP/1.1
Sec-Session-Id: 1
```

これが、「割り当てられた Session の Credential の Refresh」を要求している。

サーバはこれに対して、検証用の Challenge を返す。

```http
HTTP/1.1 401 Unauthorized
Sec-Session-Challenge: "challenge_value";id="1"
```

クライアントは、秘密鍵を用いてこれに応答する。つまり、`/refresh` は 2 回アクセスされる。

```http
POST /refresh HTTP/1.1
Sec-Session-Id: 1
Sec-Session-Response: JWT proof
```

JWT を検証し、Challenge の一致と、鍵の一致が確認できたら、再度 `Set-Cookie` することで Cookie を更新することができる。

```http
HTTP/1.1 200 OK
Set-Cookie: __Secure-session_id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=604800;
```

この時、登録時と同じように JSON を返すことで、Cookie の名前や設定などを変えることも可能だ。

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
Set-Cookie: __Secure-session_id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=604800;

{
  "session_identifier": "1",
  "refresh_url": "https://labs.jxck.io/device-bound-session-credentials/refresh",
  "scope": {
    "origin": "https://labs.jxck.io",
    "include_site": true,
    "defer_requests": true,
    "scope_specification": []
  },
  "credentials": [{
    "type": "cookie",
    "name": "__Secure-session_id",
    "value": "deadbeef",
    "attributes": "Path=/; Secure; HttpOnly; Max-Age=604800"
  }]
}
```

更新に成功したクライアントは、保留していたリクエストをすべて送信することになる。

なお、`Sec-Session-Challenge` はクライアントが Refresh を要求してこなくても送信できる。つまり Cookie の期限が切れる前に Credential を新しくしておくことで、リクエストの保留を避けることが可能になるのだ。


### Session の終了

もし (DBSC における) Session を終了する場合は、リフレッシュのレスポンスで以下のように返す。

```json
{
  "session_identifier": "1",
  "continue": false
}
```

もしくは `Clear-Site-Data: "storage"` を用いることも可能だ。

これにより、ブラウザは Session のために内部に保持したリソースを削除する。

以降は、削除した Session に対する `Sec-Session-Response` をクライアントが送ってくることも、`Sec-Session-Challenge` に応答することもなくなる。


## 設計の考察

基本的には、既存の Session 管理に対して追加で導入するのが望ましいだろう。

この API の設計は、`Sec-Session-Registration` と `Set-Cookie` は別であっても良いという点だ。

つまり、DBSC の API は別途新設し、従来のログインによる Session 確立には、`Sec-Session-Registration` を付与するだけで良い。サポートしてるブラウザのみが、バックグラウンドで鍵交換を行い、Cookie で確率中のセッションに保存する形だ。

最も注意すべき点は Cookie の `Max-Age` だ。

ログインの頻度が上がるとユーザの離脱につながることを恐れ、多くのサービスはセッション Cookie の期限を長く取ることが多い。しかし、Cookie の有効期限が長いことは、今回対象としている Cookie の窃取が発生した時に、攻撃リスクを高めることに繋がる。

しかし、短くしすぎると、リクエストをペンディングして 2RT のリフレッシュが発生するため、場合によっては「非常にレスポンスが遅い」という体験に高頻度で遭遇することになるだろう。

できれば、Cookie の期限が一定以上短くなったら、バックグラウンドでリフレッシュをかけることで、期限を延長しておくのが望ましい。これが、仕様の推奨している典型的なユースケースだ。

ところが、この仕様であれば Cookie の `Max-Age` を必ずしも短くする必要はないと筆者は考えている。

Cookie の `Max-Age` 自体は長くしておくが、同時にセッションのライフタイムを別途短く設定し、その閾値を下回ったらリフレッシュをサーバから提案し、Cookie の値を変えつつ Registration し直してしまえば良い。

Cookie 窃取が起ころうと、その値をサーバが認識していなければ攻撃は発生しないため、十分ランダムな値を用いてサーバが管理し、リフレッシュでサーバ/クライアントともに別の値に上書きしてしまえば、その Cookie は実質無効な値になるからだ。

現状はまだトライアルであるため、詳細な設計を詰めるのは難しいところもあるが、仕様が固まるまでの過程である程度のプラクティスを考察しておきたい。


## Other

### JS API

Explainer では JS API の可能性についても触れられている。

しかし、現状はあくまで構想だけであり、Chrome も初期の実装では JS API はスコープから外しているため、実装されたら検証する。


### Device Bound Session Credentials for Enterprise

この仕組みを拡張し、Enterprise 領域で発生する様々な要求をカバーできる可能性にも言及されている。

- Device Bound Session Credentials for Enterprise - explainer
  - https://github.com/drubery/dbsc/blob/main/DBSCE/Overview.md

DBSC では、既にマルウェアに汚染されていた場合、Credential の生成部分が改竄される可能性があるとし、主に鍵の生成部分についてカスタマイズできる余地を入れるというのが、本旨になっているようだ。

MS はこれまで、BindingContext という独自の仕様を提案していたが、今後は作業のフォーカスを DBSC(E) に移していくとしている。

- MSEdgeExplainers/BindingContext/explainer.md at main · MicrosoftEdge/MSEdgeExplainers
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/BindingContext/explainer.md

もちろん、DBSC が前提としてあるため、そちらがある程度進んでからになるだろう。

よってここでは、紹介のみに留める。


## Outro

Cookie Theft 対策の新しい提案である Device Bound Session Credentials について解説した。


## DEMO

動作するデモを以下に用意した。しかし、サーバ側で完結する挙動であるため、アクセスしてもよくわからないところが大きい。

- https://labs.jxck.io/device-bound-session-credentials/index.html

ソースコードは以下なので、こちらを参考にしてほしい。

- https://github.com/Jxck/jxck.io/blob/main/labs.jxck.io/device-bound-session-credentials/session.cgi

もしくは、公式のデモも参考になるだろう。

- DBSC prototype
  - https://dbsc-prototype-server.glitch.me/


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
  - Device Bound Session Credentials
    - https://w3c.github.io/webappsec-dbsc/
  - Origin trial: Device Bound Session Credentials in Chrome
    - https://developer.chrome.com/blog/dbsc-origin-trial
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