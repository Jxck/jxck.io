# [hpke][crypto] HPKE とは何か

## Intro

HPKE (Hybrid Public Key Encryption) が RFC 9180 として公開された。

- RFC 9180: Hybrid Public Key Encryption
  - https://www.rfc-editor.org/rfc/rfc9180.html

HPKE は、公開鍵暗号方式と共通鍵暗号方式を組み合わせて(ハイブリッド)任意の平文を暗号化するための、汎用的な枠組みとして標準化されている。

この仕様は、多くのユースケースが想定されており、RFC になる前から ECH (Encrypted Client Hello), MLS (Message Layer Security), OHTTP (Oblivious HTTP) など、さまざまな仕様から採用を検討されている。

本サイトで書く予定の他の記事でも HPKE は頻出する予定であり、今後より多くの場面でこの仕様を見ることになると思われるため、一度この仕様の概観について解説する。

(筆者は暗号の専門家ではないため、解釈や語彙使用の間違いがあるかもしれない。)


## PKE これまで

ハイブリッド暗号は、要するに公開鍵暗号で鍵を交換し、その鍵で共通鍵暗号を行う方式全般を指す。その発想自体は古くからあり、まさしく TLS や PGP が行っていることがそれにあたる。

これをより汎用化し、例えば TCP 通信に限らない場面でも、同方式でデータの暗号化による交換を実現したいユースケースは多くあり、[NaCl(Networking and Cryptography library)](https://nacl.cr.yp.to/box.html) や [tink](https://github.com/google/tink) などの実装は存在したが、いずれも標準ではなく相互運用性の問題があった。

また、ANSI, IEEE, ISO などによる標準化の動きもあったが、最新の暗号化技術への追従や、危殆化や脆弱性といった既知の問題の存在が指摘されていた。

そこで、汎用性があり、かつ最新の暗号化の知見を反映し、将来にわたって拡張(e.g. 耐量子暗号)していくことが可能な、次世代の標準仕様として HPKE は策定されることとなった。

なお、この仕様を策定したのは IETF ではなく、IRTF (Internet Research Task Force) という姉妹団体の CFRG (Crypto Forum Research Group) であり、筆者の理解では IETF での仕様策定について暗号化の専門的なアドバイスなどを行う、要するに Crypto のガチ中のガチ勢のグループによって行われている。

2019 年 7 月の draft-00 から 3 年の歳月を費やし作られたこの標準は、多くの研究者による分析や、多くの実装者による相互互換テストを経て標準化され、今後 IETF で策定される、ハイブリッド暗号を必要とするあらゆる標準において、参照されていくことだろう。

要するに、今後のインターネットを支える重要なパーツとなる可能性があるのだ。


## Hybrid Crypto System の概要

HPKE の概要は、情報処理技術者試験で最初に学ぶような、非常に基本的な公開鍵暗号方式そのものだ。

- 両者が秘密鍵と公開鍵のペアを作成する
- 公開鍵暗号方式で共通鍵を交換する
- 以降は共通鍵暗号方式でやりとりする

流れとしてはこの通りだが、実際にはこの各フェーズでどのようなアルゴリズムを用いるかが時代と共に変わったり、ユースケースによって異なる方式を用いたい場合がある。

HPKE はそうしたユースケースを柔軟にカバーできるように、大きく 3 つの構成要素に分解されている。

- KEM
- KDF
- AEAD

各要素を見ていく。


## KEM (Key Encapsulation Mechanism)

KEM は、両者が鍵ペアを生成し、送信者が生成した固定長乱数を受信者の公開鍵でカプセル化して受信者に渡す、まさしく公開鍵暗号方式を用いる部分だ。

HPKE の仕様では、以下の曲線を用いた Diffie-Hellman が採用されており、RSA などは用いない。DHKEM と言っているが、実質 TLS でいう ECDHE 相当だ。ただし Ephemeral つまり PFS による前方秘匿性が担保されているのは、送信側のみで受信側にはない(TLS でいう Server の鍵の漏洩は対応できるが、逆がないのと同じイメージ)。

- DHKEM(P-256, HKDF-SHA256)
- DHKEM(P-384, HKDF-SHA384)
- DHKEM(P-521, HKDF-SHA512)
- DHKEM(X25519, HKDF-SHA256)
- DHKEM(X448, HKDF-SHA512)

基本的には、送信者が固定長乱数を受信者の公開鍵で暗号化し、受信者が秘密鍵で復号する流れだ。その固定長乱数を元に秘密鍵を生成した暗号化コンテキストを共有し、そのコンテキストを用いてメッセージの交換を行う。

(以降の擬似コードは、RFC のものではなく説明用にわかりやすくしたものである)

```js
// 送信側
// 受信者の公開鍵で暗号化
{ shared_secret, enc } = Encap(receiver_public_key)
// 暗号化コンテキストを生成
ctx = KeySchedule(shared_secret)

// 受信側
// 自分の秘密鍵で復号
shared_secret = Decap(enc, receiver_secret_key)
// 暗号化コンテキストを生成
ctx = KeySchedule(shared_secret)
```

しかし、この公開鍵のやりとりに TLS のような証明書は含まれない。代わりに、受信者が送信者を認証する方法が必要になるため、KEM には 4 つのモードが用意されている。

- mode_base
- mode_psk
- mode_auth
- mode_auth_psk


### Base

通常の公開鍵暗号方式のみ行い、送信者の認証は行わない。

```js
// sender
{ shared_secret, enc } = Encap(receiver_public_key)
ctx = KeySchedule(shared_secret)

// receiver
shared_secret = Decap(enc, receiver_secret_key)
ctx = KeySchedule(shared_secret)
```

ここで保証できるのは、「受信者は送信時に利用した公開鍵と対になる秘密鍵を保有している」という点だ。

受信者から見て、送信者が誰であるかを確証することはできない。つまり、別の攻撃者が同様に受信者の公開鍵で暗号化したものにメッセージを置き換えても、受信者は自分の秘密鍵で復号するだけなので、その事実を検証することができない。

別の経路によって確証できる場合は問題ないが、受信者が送信者を認証したい場合は別のモードを使うことができる。


### Auth

Base モードでは、送信者は「受信者の公開鍵」でカプセル化したが、Auth モードではそこに「送信者の秘密鍵」を追加する。

受信者は、自身の秘密鍵と送信者の公開鍵を用いて復号するため、そこから正しいコンテキストが生成できなければ、メッセージの復号に失敗することになる。これにより、受信者は送信者が「意図した鍵のペアを持った相手かどうか」を確証することができるため、認証として機能する。

```js
// sender
{ shared_secret, enc } = Encap(receiver_public_key, sender_secret_key)
ctx = KeySchedule(shared_secret)

// receiver
shared_secret = Decap(enc, receiver_secret_key, sender_public_key)
ctx = KeySchedule(shared_secret)
```

これを用いれば、仮に中間者によってメッセージが置き換えられたとしても、受信者が想定した送信者の公開鍵で復号しようとするとエラーになるため、改ざんに気づくことができる。もちろん、そのためには受信者は送信者の公開鍵を別の手段で取得しておく必要がある。


### PSK

事前に鍵を共有することが可能な場合は、それを PSK (Pre Shared Key) として利用する PSK モードを利用することができる。

PSK Mode では、shared_secret の交換のあと、コンテキストの生成時に PSK を引数に追加する。

```js
// sender
{ shared_secret, enc } = Encap(receiver_public_key)
ctx = KeySchedule(shared_secret, psk)

// receiver
shared_secret = Decap(enc, receiver_secret_key)
ctx = KeySchedule(shared_secret, psk)
```

もし、両者が同じ PSK を持っていない場合は同じコンテキストが生成できないため、相手からのメッセージの復号に失敗することになる。これにより、受信者は送信者が「意図した PSK を持っているかどうか」を確証することができるため、認証として機能する。


### Auth PSK

Auth と PSK を両方行うモード。


## KDF (Key Derivation Function)

KEM で交換した shared_secret を元に、Extract/Expand によって実際の共有鍵を生成する。

- HKDF-SHA256
- HKDF-SHA384
- HKDF-SHA512

基本は TLS 1.3 と同じだ (SHA512 は TLS 1.3 の Mandatory ではないが)。


### AEAD

生成した共通鍵を用いて共通鍵暗号を行う。HPKE では認証付暗号である AES の GCM か ChaCha-Poly を用いる。

DES や CBC などは最初から入っておらず、こちらも TLS 1.3 と同じだ。

- AES-128-GCM
- AES-256-GCM
- ChaCha20Poly1305


## Export

別の用途で共有鍵を用いたい場合のために、HPKE で交換を終えた共有鍵を元に、必要な長さの鍵を別途生成する機能が Secret Export だ。

WebRTC が DTLS の鍵交換を利用し、以降の SRTP 暗号化のために DTLS から Export した鍵を用いるように、すでに HPKE を使っていたり、鍵の交換を自分で考えたくないケースで、この Export を利用することが想定されている。


## TLS との違い

構成要素からみれば、HPKE をトランスポートプロトコルに仕立てたものが TLS というイメージになるだろうか。(実際そういう記述があるわけではないが、先に HPKE が出ていたら TLS 1.3 の仕様から参照され、記述が一部移譲できたのではとも思う)

一応わかりやすい特徴を比較しておく。


### 通信プロトコルではない

行っていることが TLS などと同じであるにも関わらず、HPKE が策定された理由は、HPKE が汎用的であると言う点だ。

例えば TLS1.2 の場合は、そこで行われる公開鍵暗号方式は、TCP 上でのハンドシェイクに強く依存しており、暗号化されるのも通信上のパケットだ。これは、例えば手元にある JSON のある 1 つのプロパティだけ暗号化し、特定の相手だけがそれを読めるようにしたいといったユースケースに、TLS を応用するには適さないことを意味する。

HPKE は鍵の交換と暗号化の枠組みのみを標準化してはいるが、トランスポートプロトコルではないため、前述のようなユースケースもカバーできる。

逆を言えば HPKE を内部に用いる別のプロトコルの場合は、HPKE に必要なパラメータを交換する何らかの方法を考える必要がある。必ずしもオンデマンドのハンドシェイクではなく、自分が開発するシステムで採用しクライアントもサーバも自分で管理するような場合は、固定のパラメータに決め打ちし PSK を配布しておくといったこともできるだろう。


### 双方向ではない

HPKE のスコープは、「Alice が Bob に情報を暗号化して渡すこと」であり、逆は含まれていない。

共有したコンテキストを逆方向に利用し、Bob から Alice に暗号化した情報を渡すこともできそうだが(TLS はまさしくそれを行っている)、HPKE ではこれが明確に禁止されている。

> The sender's context MUST NOT be used for decryption. Similarly, the recipient's context MUST NOT be used for encryption.
> --- https://www.rfc-editor.org/rfc/rfc9180.html#section-5.2-13

もし Bi-Directional な利用をしたい場合は、Secret Export の仕組みを用い、ユースケースに応じた Keying Material を生成して用いることが言及されている。

> Applications that require bidirectional encryption can derive necessary keying material with the secret export interface (Section 5.3).
> --- https://www.rfc-editor.org/rfc/rfc9180.html#section-9.8


### PKI は用いない

TLS の場合は、ハンドシェイク中に CA の署名を受けたサーバ証明書(場合によってクライアント証明書)を提供し、署名を確認することでなりすましを防いでいる。

HPKE は、あくまでパラメータの交換を仕様の外にしているため PKI は用いず、交換方法はデプロイや別のプロトコルでカバーすることになる。そのため、仕様には Certificate とその署名などについては含まれていない。

ここで、公開鍵提供者がなりすますことを防ぐためには、前述の Auth/PSK モードを用いる(Sender がドメインを持ち、公開鍵の提供時に証明書を検証することもできるかもしれないが、それ自体は HPKE のデプロイ側の都合となる)。

> The DHKEM variants defined in this document are vulnerable to key-compromise impersonation attacks [BJM97]
> --- https://www.rfc-editor.org/rfc/rfc9180.html#section-9.1.1-1


## Use Case

すでに、HPKE を用いることを想定して策定が進んでいるプロトコルがいくつかある。ここでは、代表的なものを紹介する。


### ECH (Encrypted Client Hello)

TLS 1.3 によって TLS Handshake の大部分が暗号化されるようになったが、Client Hello だけはまだ暗号化の対象外であり、ここに SNI が含まれることにより、接続先の情報が盗聴されたり、SNI をもとにブロックなどができる可能性がある。

そこで、サーバの公開鍵を DNS の HTTPS Record で提供することで、TLS Handshake 前に鍵を取得し Client Hello から暗号化を可能にする。ドラフトでは、この ECH の暗号化に HPKE を用いることが想定されている。

- TLS Encrypted Client Hello
  - https://www.ietf.org/archive/id/draft-ietf-tls-esni-14.html


### MLS (Messaging Layer Security)

チャットのようなサービスは、TLS を用いてサーバとの通信を暗号化していても、サーバはそのメッセージの中身を見ることができてしまう。ここでメッセージに求められている E2E (End-To-End) 暗号化は、Client-Server の暗号化ではなく Client-Client の暗号化だ。

MLS は、自分がメッセージをやりとりする相手にのみメッセージの復号を許し、Server にはメッセージを見せないと言った目的で策定されている。このドラフトで、メッセージの暗号化に HPKE を用いることが想定されている。

- The Messaging Layer Security (MLS) Protocol
  - https://www.ietf.org/archive/id/draft-ietf-mls-protocol-16.html


### OHTTP (Oblivious HTTP)

OHTTP は、通信を Proxy で転送することで、Client の IP が Server に伝わることを防ぐ目的で標準化されている仕様であり、Apple がアナウンスした Private Relay 相当のものであるため、詳細は以下を参照してほしい。

- Private Relay と IP Blindness による Fingerprint 対策 | blog.jxck.io
  - https://blog.jxck.io/entries/2021-09-22/private-relay-for-ip-blindness.html

ここで、Client と Proxy がメッセージを追加で暗号化するために HPKE を用いることが想定されている。

- Oblivious HTTP
  - https://www.ietf.org/archive/id/draft-thomson-http-oblivious-02.html


## Test Data

近年の RFC では、Appendix にテストデータが記載されており、実装者が受け入れテストとして使うことができる。HPKE も全ページの半分くらいがテストケースに割かれており、これが相互互換性の向上に大きく寄与するだろう。実装する側としては、別実装と Interop しなくてもバグがわかるので、ありがたい限りだ。


## Outro

次世代の汎用 Public Key Encryption の標準である HPKE について解説した。

正直、ハイブリッド暗号の利用なんて仕様も実装もいくらでもあると思い込んでいたため、策定が開始された時は「なぜ今更標準化するのだろう」と思い、何かニッチなケースのための仕様かと思ってスルーしていた。

しかし、既に、これを採用するプロトコルが出始めているように、この汎用的な仕様は暗号化の重要性が増した現在では高いポテンシャルをもっているため、今後さまざまな場面で HPKE を見る機会が増えるだろうと予想される。

多くの代表的なケースは、HPKE に立脚して標準化されるプロトコルによってカバーされるだろうが、もしかしたらサービス開発の場面においても暗号化を必要とするユースケースで HPKE を採用する機会もあるのかもしれない。

今後も HPKE がどのように使われていくのかを注視しつつ、このブログでも紹介していきたい。


## Resources

- Spec
  - RFC 9180: Hybrid Public Key Encryption
    - https://www.rfc-editor.org/rfc/rfc9180.html
  - TLS Encrypted Client Hello
    - https://www.ietf.org/archive/id/draft-ietf-tls-esni-14.html
  - The Messaging Layer Security (MLS) Protocol
    - https://www.ietf.org/archive/id/draft-ietf-mls-protocol-16.html
  - Oblivious HTTP
    - https://www.ietf.org/archive/id/draft-thomson-http-oblivious-02.html
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
  - HPKE: Standardizing public-key encryption (finally!)
    - https://blog.cloudflare.com/hybrid-public-key-encryption/
  - Cloudflare and the IETF
    - https://blog.cloudflare.com/cloudflare-and-the-ietf/
  - Hybrid Public Key Encryption: My Involvement in Development and Analysis of a Cryptographic Standard - Benjamin Lipp
    - https://www.benjaminlipp.de/p/hpke-cryptographic-standard/
  - TL;DR - Hybrid Public Key Encryption
    - https://www.franziskuskiefer.de/p/tldr-hybrid-public-key-encryption/
- Presentation
- Issues
- Other