# [fido-u2f][web authentication api] Web Authentication API で FIDO U2F(YubiKey) 認証

## Intro

Web Authentication(WebAuthN) API の策定と実装が進んでいる。

これを用いると、 FIDO(Fast IDentity Online) U2F(Universal Second Factor) 認証が可能になる。

今回は YubiKey 認証の実装を通じて、ブラウザ API の呼び出しと、サーバ側で必要な処理について解説する。

<https://w3c.github.io/webauthn/>


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/webauthentication/fido-u2f/>

YubiKey での動作のみ確認している。

コードは以下にあり、今回の解説もここから抜粋している。

(あくまで API の流れを解説するためのものであるため、飛ばした処理もあり、本番利用に耐えうるものではない。)

- <https://github.com/Jxck/jxck.io/tree/master/labs.jxck.io/webauthentication/fido-u2f>

YubiKey Login の動作イメージは以下。


<iframe src="https://www.youtube.com/embed/XL94v1t2aWk" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



## WebAuthentication API

WebAuthentication API は、 Credential Management API の拡張になっている。

- [Credential Management Level 1](https://w3c.github.io/webappsec-credential-management/)
- [Web Authentication: An API for accessing Public Key Credentials - Level 1](https://w3c.github.io/webauthn/)

JS API としては、 Credential Management API をそのまま使う。

しかし、ユーザが入力する PasswordCredential ではなく、 FIDO U2F で生成する PublicKeyCredential を使う。

従って、基本的には YubiKey に限らず、 FIDO U2F 対応の Authenticator であれば同じコードで動かすことができる。

この時ブラウザから Authenticator を起動する API と、その結果をサーバで処理する方法がこの仕様に定義されている。

サーバ/ブラウザ間でやり取りするバイナリは、なんらかの方法でシリアライズして送る。

今回は、 Base64URL と JSON を用いるが、この範囲であれば別のフォーマットでも良さそうに思う。

また、 Authenticator が生成する情報は一部 [CBOR](https://tools.ietf.org/html/rfc7049) が利用されているが、その解説は省略する。

実際に仕様に基づき、コードの流れを解説する。サーバも JS に揃えるため Node で実装している。


## 公開鍵暗号方式

先に、ざっくりとした流れを解説する。

ユーザはまず Registration フェーズとして、 YubiKey を用いて公開/秘密鍵のペアを生成しサービスに登録する。

ログインは Authentication フェーズとして、サービスが生成した乱数(challenge)を秘密鍵で署名してサービスに送り返す。

この署名をサービス側に保存した公開鍵で検証できれば、サービスはユーザを認証することができる。

以降 Registration/Authentication フェーズ 2 つに分けて解説する。


## Registration


### 1. サービスに対して challenge (乱数)の発行を要求する

クライアントはサーバに username を送り、登録に必要な以下のような情報を要求する。

(ここではそのまま `navigatore.credentials.create()` に渡せる形でサーバから返している)


```js
// https://w3c.github.io/webauthn/#dictionary-makecredentialoptions
const clientCredentialOption = {
  rp: {
    id:   "labs.jxck.io",
    name: "labs.jxck.io",
  },
  user: {
    id: crypto.randomBytes(32) // 一意な値、 username を元に生成しても良い
    name: username,
    displayName: username,
  },
  challenge: crypto.randomBytes(32)
  pubKeyCredParams: [
    {type: "public-key", alg: -7 /*ES256*/}
  ],
  attestation: "direct",
}
```

重要なのは challenge で、この乱数に対してブラウザが認証をし、それをあとで検証する。

従って、これはセッションなどに保存しておく必要がある。


```js
req.session.challenge = challenge
req.session.username  = username // CAUTION!! this is only a sample
```


### 2. この challenge を元に `navigator.credentials.create()` を呼ぶ

ブラウザは、取得した値を元に `create()` を呼びクレデンシャルを生成する。

YubiKey を刺している場合は、ここでタッチを求められ、タッチすると Resolve される。


```js
// create() PublicKeyCredential
const credential = await navigator.credentials.create({publicKey: option})

const {id, rawID, response, type} = credential // type = "public-key"
const {attestationObject, clientDataJSON} = response
```

type は `"public-key"` になっており、生成した鍵ペアの公開鍵が入っていることがわかる。

response の中がそうした値になっており、 attestationObject は CBOR でエンコードされている。

中身はサーバで解読するため、そちらで解説する。

基本的にはこれをそのままシリアライズしサーバに送れば良い。


### 3. サービスは中身を確認し、ユーザに紐付けて保存する。

送られてきた clientDataJSON を JSON パースする。

以下を確認する

- clientData.type が "webauthn.create" である
- clientData.challenge(base64) が最初に送った(session に保存した) challenge である
- clientData.origin がサービスの ORIGIN と一致する
- clientData.tokenBinding が正しいこと(今回は使ってない)

次に attestationObject を CBOR パースする。

ここには以下のようなデータが入っている。


```js
{
  fmt,      // attestation statement format
  authData, // authenticator data
  attStmt,  // attestation statement
} = attestationObject
```

ここまで確認したら、 clientDataJSON (バイナリ) を元に SHA-256 を取得しておく。


```js
const clientDataHash = crypto.createHash("sha256").update(clientDataJSON).digest()
```

これはあとで署名の検証に使用する。


#### fmt

fmt の値によって、署名をどのように検証するかの処理は変わってくる。今回は `"fido-u2f"` で解説する。

次に authData はバイナリで以下のような構造になっている。

![Authenticator data layout](https://w3c.github.io/webauthn/images/fido-signature-formats-figure1.svg#1000x217)

- rpidHash (32byte)
- flags    (1byte)
  - UserPresent
  - Reserved
  - UserVerified
  - Reserved
  - Reserved
  - Reserved
  - AttestedCredentialData,
  - ExtensionDataIncluded,
- sigCount (4byte)
- attestedCredentialData (var)
- extensions (var)

まず rpidHash は、サーバが提示した RPID の SHA-256 であることを確認する。

flags は 1byte を 1bit づつフラグとして使っている。

UserPresent/UserVerified は、ユーザが Authenticator にインタラクションをした、つまり YubiKey をタッチしたため、どちらも 1 であることを確認。

sigCount は署名をした回数で、認証時に利用するため、保存しておく。


#### authData

flag の AttestedCredentialData が 1 なので、 sigCount より後ろを AttestedCredentialData としてパースする。

- aaguid (16byte)
- credentialIdLength (2byte)
- credentialId (credentialIdLength byte)
- credentialPublicKey (var)

credentialPublicKey は、さらに COSE という形式でエンコードされている。

これは JOSE の CBOR 版といった位置づけである。

CBOR でパースすると以下のように数字がキーのオブジェクトが得られる。


```js
{
  1: kty=2,  // EC2 key type
  3: alg=-7, // ES256 signature algorithm
 -1: crv=1,  // P-256 curve
 -2: x,      // x-coordinate as byte string 32 bytes in length
 -3: y,      // y-coordinate as byte string 32 bytes in length
}
```

これにより、 YubiKey から受け取った PublicKey が、 EC2 で P-256 を使い認証は ES256 (ECDSA with SHA-256) であることがわかる。

ExtensionDataIncluded は今回 0 なので拡張は無し。


### attStmt

今回の fmt では attStmt は以下の構造になる。

[8.6. FIDO U2F Attestation Statement Format](https://w3c.github.io/webauthn/#fido-u2f-attestation)


```js
u2fStmtFormat = {
                  x5c: [ attestnCert: bytes ],
                  sig: bytes
                }
```

x5c には Attestation Certificate が仕様上、丁度 1 つだけ入っている。


```js
attCert = x5c[0]
```

sig は Attestation Signature の値だ。

ここまでの情報を元に、実際に署名を検証していく。


### Verification Procedure

先程 COSE から取得した x と y を連結し、先頭に 0x04 を加えると PublicKey になる。

<https://w3c.github.io/webauthn/#fido-u2f-attestation>


```js
PublicKeyU2F = 0x04 || x || y
```

これと、 rpidHash, clientDataHash, credentialId を連結し、先頭に 0x00 を加えると、署名対象のデータが得られる。


```js
verificationData = 0x00 || rpIdHash || clientDataHash || credentialId || publicKeyU2F
```

これを x5c から取り出した attCert で署名した結果が sig と同じになるかを確認すれば良い。

x5c は ANSI X9.62 Public Key Format というバイナリ形式で、 Node では PEM でないと扱いにくい。

これは base64 でシリアライズし 64 文字で改行し、ヘッダとフッタをつければ一応 PEM になる。


```js
const certificatePublicKeyPEM = [
  "-----BEGIN CERTIFICATE-----",
  ...(attCert.toString("base64").match(/.{1,64}/g)),
  "-----END CERTIFICATE-----",
].join("\n")
```

これを用いて検証する。


```js
const verified = crypto.createVerify("sha256").update(verificationData).verify(certificatePublicKeyPEM, sig)
```

これが成功したら、証明書のチェインをルートまで確認する。(TODO)

ここまで成功すれば、ユーザが送ってきたデータが

- サーバが送った情報を元に
- FIDO-U2F でユーザの操作を伴い鍵ペアを正しく生成し
- その公開鍵が改ざんされずに送られてきた
  - challenge が送ったものと同じ
  - origin が正しい
  - clientDataHash と attestation に対する authenticator の署名を確認する

といったことが確認できる。

確認できたら、公開鍵の情報をユーザに紐付けて保存することで、パスワードの代わりに認証に使用する。

同じユーザが複数の認証デバイスを登録することも想定するなら、以下のようになる。


```js
storage["username"] = {
  id,
  authenticators: [
    {credentialID, credentialPublicKey, signCount}
  ]
}
```

なお、もし同じ credentialID が既に登録されていたら、基本的に拒否するが、上書きを選ぶこともできる。


## Authentication


### 1. サービスに対して challenge (乱数)の発行を要求する

registration 同様、サーバに username を送り、認証に必要な以下の情報を要求する。

(ここではそのまま `navigatore.credentials.get()` に渡せる形でサーバから返している)


```js
{
  challenge: crypto.randomBytes(32),
  allowCredentials: [
    { type: "public-key", id: "xxxxxx" }
  ],
}
```

allowCredentials は、サーバに保存した、ログイン対象のユーザに紐付いた credential id だけを取り出し type をつけたもの。

challenge は登録時と同じくランダムな値。これもセッションなどに保存しておき、実際の認証で使う。


```js
req.session.challenge = challenge
req.session.username  = username // CAUTION!! this is only a sample
```


### 2. この challenge を元に `navigator.credentials.get()` を呼ぶ

ブラウザは、取得した値を元に `get()` を呼びクレデンシャルを生成する。

YubiKey を刺している場合は、ここでタッチを求められ、タッチすると Resolve される。


```js
// get() PublicKeyCredential
const credential = await navigator.credentials.get({publicKey: option})

const { id, rawId, response } = credential // id は rawId の base64url
const { type, authenticatorData, signature, userHandle, clientDataJSON } // type = "public-key"
```

なお、 credential.rawId は credential.id の base64url なので、 id の方だけそのまま送れば良い。


### 3. サービスは中身を確認し、ユーザを認証する

まず credential.id で保存された credential がユーザに紐付いて存在するかを確認する。

userHandle は今回使わないので無視する。

次に clientDataJSON を JSON としてパースし、以下を確認する。

- clientData.type が `webauthn.get` である
- clientData.challenge(base64) が最初に送った(session に保存した) challenge である
- clientData.origin がサービスの ORIGIN と一致する
- clientData.tokenBinding が正しい(今回は使ってない)

次に authenticatorData をパースする。フォーマットは registration で行ったのと同じ。

- rpidHash (32byte)
- flags    (1byte)
  - UserPresent
  - Reserved
  - UserVerified
  - Reserved
  - Reserved
  - Reserved
  - AttestedCredentialData,
  - ExtensionDataIncluded,
- sigCount (4byte)
- attestedCredentialData (var)
- extensions (var)

rpidHash が、 Registration 時にサーバの提示した RPID の SHA-256 と同じことを確認する。

flag も同じだが、今回は AttestedCredentialData も無いため、 UserPresent 以外 0 となる。

次に ClientDataJSON の SHA-256 ハッシュを取得する。


```js
const hash = crypto.createHash("sha256").update(clientDataJSON).digest()
```

これを、 authenticatorData と連結したものを署名したものが signature と一致するかを確認すれば良い。

ここで使う PublicKey は、 Registration でユーザに紐付けて保存した PublicKey だが、これを PEM にする場合は少しいじる必要が有る。

結論から言うと、以下のようなメタデータを付与する必要があり、それ以外は先の方法と同じく base64 を 64bit ごとに折り返せば良い。

(ここが一番ハマった)


```js
// https://github.com/fido-alliance/webauthn-demo/blob/master/utils.js
// https://stackoverflow.com/questions/45131935/export-an-elliptic-curve-key-from-ios-to-work-with-openssl
//
// If needed, we encode rawpublic key to ASN structure, adding metadata:
// SEQUENCE {
//   SEQUENCE {
//      OBJECTIDENTIFIER 1.2.840.10045.2.1 (ecPublicKey)
//      OBJECTIDENTIFIER 1.2.840.10045.3.1.7 (P-256)
//   }
//   BITSTRING <raw public key>
// }
// Luckily, to do that, we just need to prefix it with constant 26 bytes (metadata is constant).
const publickKeyPEM = Buffer.concat([
  Buffer.from("3059301306072a8648ce3d020106082a8648ce3d030107034200", "hex"),
  Buffer.from(publicKey),
]).toString("base64").match(/.{1,64}/g)
```

この鍵で署名を確認する。


```js
const verified = crypto
                    .createVerify("sha256")
                    .update(Buffer.concat([authenticatorData, hash]))
                    .verify(publickKeyPEM, signature)
```

最後に、ここで取得した signCount が、保存しているものよりも大きいことを確認する。

ここまで成功すれば、認証が完了したとみなすことができる。


## Outro

WebAuthentication API により、 FIDO U2F を用いた認証が Web 標準でも可能になった。

色々と細かい処理はあれど、基本の流れは鍵ペアの生成と交換、その検証からなる流れということがわかる。

実際にサービスに導入する際には、ライブラリやサービスに頼るべきだと思うが、今回のようにラフな実装で仕様を眺めると、理解の助けになるだろう。
