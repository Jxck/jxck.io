# [expect-ct][hpkp][ct][security] CT の仕組みと HPKP から Expect-CT への移行

## Intro

本サイトは HPKP (public-key-pins-report-only) に対応していた。

しかし、 HPKP はその運用性の問題などもあり、 Chrome はすでに deprecate するアナウンスを出している。

代替の仕様として、 Certificate Transparency (CT) のエコシステムと、それを利用する Expect-CT の策定/実装が進んでいる。

CT エコシステムの概要、 Log の登録/検証、 HPKP から Expect-CT への移行などについて解説する。


## 「CA は信用できるのか?」問題

HTTPS 化が前提として定着した昨今、トラストアンカーとしての CA の責務は増している。

我々が依存する PKI は、 「CA は信用できる」という前提のもとに成り立っており、CA はその信用を担保するために堅牢なシステムを構築することを求められる。

しかし、最近 CA が **証明書を誤発行する** などといった、この安全の前提を崩すような事態が複数発生している。

コンテンツベンダがいかに努力して HTTPS への以降を進めても、その努力を泡と化す可能性があるのだ。

(ここでは、ドメインオーナーの知らないところでそのドメインの証明書が発行されることを、理由/方法によらず誤発行と言うことにする。)


## CA インシデントの影響

例として、悪意のある Eve が `google.com` の証明書を、 `google.com` の管理者に知られずに、正規の CA に発行させることができたとする。

(Eve は外部からの攻撃したかもしれないし、内部犯の可能性もある)

Eve は Alice へ MITM を成立させたら、 Alice への `https://google.com` のレスポンスを、取得した証明書ですり替えることができる。

Alice のブラウザはそのレスポンスが信頼された `google.com` からのものであると表示し、 URL バーも緑になってしまう。

Eve の持つ秘密鍵は Google のそれとは違うが、証明書には「本物」と同等の効力があることが原因だ。



```
+------------+                       +-----------+
|            |  valid        valid   |           |
|   Google   |--------->| |--------->|  Browser  |
|            |          | |          |           |
+------------+          | |          +-----------+
                   +-----------+
                   | Eve(MITM) |
                   +-----------+
```


これまでは、こうしたこと防ぐには、 CA 自身が努力するしかなかった。

Google は CA を信じ、自分の知らないところで `google.com` の証明書が勝手に発行されていないことを祈るしか無い。



## HPKP

Google が CA から発行を受けた証明書と、攻撃者が CA に誤発行させた証明書は、同等ではあるが byte 単位では別のものである。

つまり、ハッシュを取得すれば 2 つの値は変わるはずだ。

そこで、 Google は自身が所有する証明書のハッシュ値をレスポンスヘッダに付与し、ブラウザに確認させる方法を考えた。

MITM によってすり替えられたレスポンスに使用された証明書は、 Google が付与したハッシュと合わない。

これにより、ブラウザは証明書が意図したものと違うことに気づくことができる。




```
                      HPKP:xxx
+------------+                       +-----------+
|            |  hash:xxx    hash:yyy |           |
|   Google   |--------->| |---------x|  Browser  |
|            |          | |          |           |
+------------+          | |          +-----------+
                   +-----------+
                   | Eve(MITM) |
                   +-----------+
```


これが HPKP (HTTP Public Key Pinning) の基本的な考え方であった。

本サイトも、実験的にこれを適用していた。

[Public Key Pinning for HTTP(HPKP) 対応と report-uri.io でのレポート収集](https://blog.jxck.io/entries/2016-04-09/public-key-pinning.html)


しかし、このヘッダは証明書の失効/更新時に、ハッシュが不整合を起こすのを防ぐため、先にバックアップハッシュを付与しておくなど、運用負荷が高かった。

そこで、並行して提案されていた **CertificateTransparency(CT)** という仕組みを応用し、より運用負荷が低い形で同等のことを実現する方法が提案された。

それが Expect-CT ヘッダである。

Chrome は既に、 HPKP を Deprecate し Expect-CT への移行を促している

[Intent To Deprecate And Remove: Public Key Pinning](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/he9tr7p3rZ8/eNMwKPmUBAAJ)


## Certificate Transparency

[CT: Certificate Transparency](https://www.certificate-transparency.org/) には、いくつかのロールがある。


- CA: 証明書を発行しログを登録する
- Log: ログを保存しパブリックに公開する
- Monitor: ログを監視する
- Auditor: ログを検証する


ここではわかりやすく Monitor が Google で Auditor はブラウザだとしておく。

```
    +--------------+                     +--------------+
    |              |     Submit Log      |              |
    |              |-------------------->|              |
    |      CA      |        SCT          |     Log      |
    |              +<--------------------|              |
    |              |                     |              |
    +--------------+                     +--------------+
          ^                                    ^  ^
          |                                    |  |
          |                                    |  |
          |                                    |  |
 Cert     |              Monitoring            |  |
 Request  |  +---------------------------------+  | Audit
          |  |                                    |
          |  |                                    |
          |  |                                    |
          |  |                                    |
    +-----+--+-----+                     +--------+-----+
    |              |                     |              |
    |   Monitor    |    Serve Content    |   Auditor    |
    |   (Google)   +-------------------->|   (browser)  |
    |              |                     |              |
    +--------------+                     +--------------+
```


まず、 CA は発行した証明書を CT Log Server に登録する。

全ての CT Log Server は、パブリックな URL で公開され、 HTTPS でアクセスし登録や監視が行える。

Google は Monitor として CT Log Server を監視することで、 `google.com` が登録されたかを知ることができる。

先の例で、 Google が恐れていたのは「自分たちが知らないところで `google.com` の証明書が発行されること」だ。

自分たちが把握している発行が Log に登録されるのはもちろん問題ないし、把握していない Log が登録されれば、攻撃などで CA が誤発行を起こしたことがすぐにわかる。

攻撃は、発生していることがわかれば、対応ができる。これは、わからなかったころと比べるとかなりの進歩だ。

つまり、Monitor である Google の視点で言えば「**CA を監視する技術**」と言えなくもない。

では、発行されたログが必ず登録されていることや、そのログが改ざんされていないことは、どう保証するのか。


## SCT(Signed Certificate Timestamp)

SCT は、証明書を Logger に登録した際に発行される Timestamp だ。

この値を元に、 CT Log Server に問い合わせれば、証明書が登録されているかを確認することができる。

SCT は以下の 3 つのどこかに付与し、ブラウザに通知することができる。

- 証明書
- OCSP
- TLS Extension


証明書自体への埋め込みと OCSP は CA 側の対応が必要だ。 Let's Encrypt ではいずれも WIP となっている。

- <https://letsencrypt.org/upcoming-features/>


運用として一番楽なのは証明書での対応だろう。

この場合、 CA は一旦証明書(プレ証明書)を生成し、 SCT を取得し、それを埋め込んだ新たな証明書を生成し、それを発行する必要が出る。

CA が対応していなくても、発行された証明書を自分で CT Log に登録することは可能だ。

サーバの TLS レイヤに手を入れられるなら、 ServerHello の signed_certificate_timestamp 拡張に埋め込むことでも適用できる。

この場合は、後述する Expect-CT との併用が必要となる。

しかし、現在これに対応してるサーバは少なく、本サイトで使用している h2o もまだこれに対応していない。
(ハンドシェイクレベルなため mruby のハンドラでも手が出せない)

- <https://github.com/h2o/h2o/issues/448>
- <https://github.com/grahamedgecombe/nginx-ct>


## CT Log の強制

CA がきちんと CT Log を登録していることが前提となるため、もし CA が CT Log を登録していなければ監視は意味がない。

ブラウザは、 SCT を取得することができれば、それを元にログを検証し、その証明書がきちんとログに登録されているかを確認することができる。

どうやって CA に CT Log を登録させるか。

Chrome は、 **EV 証明書については SCT を含むことを必須** としている。

SCT が無い場合は、例えそれが、従来の検証方法で有効な EV 証明書であっても、 Chrome はそれを認めなくなる。

すると、自社の発行する EV が Chrome では使えないという状況を防ぐために、 CA は EV を発行する際に必ず CT Log を登録せざるをえなくなる。

こうして証明書の誤発行を監視するエコシステムの形成が、 Google 先導で進められている。


## ユースケース

ここでは先ほどと同様、 Google が管理する `google.com` の EV 証明書と Chrome を例に、ケースごとに何が発生するのかを整理する。


### 証明書が誤発行され、 Log が登録されている

Google は、 `google.com` の EV 証明書が、自分たちの知らないところで勝手に発行されていないかを監視している。

したがって、監視している Log サーバに Log が登録されれば、誤発行をすぐに発見し、対策が行える。


### 証明書が誤発行され、 Log が登録されていない

Log が登録されていないため、 SCT は取得されず、証明書には SCT が埋め込まれていない。

Chrome は SCT の無い EV 証明書を認めないため、その証明書がおかしいものであることに気づくことができる。

ただし、 SCT に対応していないブラウザでは、その証明書は有効となる。


### 証明書が誤発行され、 Log が登録されたが、後からログを改ざんした

CT Log は Merkle Tree Hashes を用いているため、ログを改ざんすると不整合が発生する。

外部からログを監視/検証しているロール(Auditor)が、それに気づくことができる。


### 証明書が誤発行されたが、ログを登録せず、証明書には別の SCT を埋め込んだ

CT Log は証明書そのものの値をハッシュのシードとして含んでいる。

従って、ブラウザ(Auditor) が SCT の正当性を Log Server に問い合わせる際に、おかしいことに気づくことができる。


## Expect-CT Header

Chrome は EV について SCT を必須とするが、それ以外の証明書(OV, DV)や、 SCT を必須としないブラウザでは、 CT は機能しない。

もし CT Log を登録せずに誤発行させた証明書は、 SCT を添えなければ使えてしまう。

そこで、「**このコンテンツは CT に対応した証明書で提供される**」ということを明示する方法が提案された。

これが `Expect-CT` ヘッダだ。

これにより、ブラウザの証明書ポリシーとは別に、コンテンツ提供者が CT を強制させることができる。

CT エコシステムにおける、 Audit のみを使うケースだ。


### directives

Expect-CT のディレクティブはシンプルだ。基本的には CSP と同じような設計になっている。

- `enforce`:  SCT のチェックをブラウザに強制させる
- `report-uri`: CSP レポートの送信先
- `max-age`: 有効期限


重要な点は、 **Expect-CT 自体が SCT の値を含むわけではない** ということだ。

前述した 3 箇所のどこかに SCT があり、それが検証されるべきであるということを示している。

- 証明書に埋め込む
- TLS ハンドシェイクに埋め込む
- OCSP に埋め込む


これにより、証明書が変わってもヘッダの値は変わらないため、 HPKP と比べて運用負荷が大きく下がる。

また、他の CSP のように `Expect-CT-Report-Only` は定義されておらず、 `enforce` を付けずに `report-uri` のみとすれば、レポートだけが飛ぶ。


## CT の監視

自身の保有するドメインに関して、自分の知らないところで証明書が発行されていないかを知りたければ、 CT Log を監視すれば良い。

CT エコシステムにおける Monitoring にあたるロールだ。

しかし、 CT Log Server は複数あり、登録される証明書も非常に多いので、自身が Monitor になる負荷は低くは無い。

本サイトでは Facebook が提供している CT monitoring のサービスを提供している。

- <https://developers.facebook.com/tools/ct/>

ここに、監視したいドメインを登録すると、 CT Log 登録時に通知が来るので、手軽に監視ができる。

こうした監視ができるのは、 CT Log がオープンだからだ、逆を言えばどんなドメインが登録されたのかは全て知ることができる。

ここから、 CT Log を通して公開されてない製品/サービスの推測などが懸念されており、別途議論が進んでいる点も把握しておきたい。



## CT Log の仕組み

ここからは、実際の CT Log の仕組みである Merkle Tree や、それを踏まえた CT Log Server へのリクエストについて解説する。

### Merkle Tree

CT Log は、 Merkle Tree という構造で保存されている。

これは、ビットコインのトランザクションの記録などにも使われており、やっていることも非常に似ている。

仕組みはシンプルで、証明書の Hash を Leaf とし、 Leaf/Node ペアの Hash を親とする二分技を構築する。

CT では Hash に SHA256 を使用する。

![Figure 1](https://www.certificate-transparency.org/log-proofs-work/ct_hash_1.png)

Log Server は、この Root となる Hash に署名をする。これを Signed Tree Head(STH) と呼ぶ。

Leaf の値が 1 つでも変わると、計算結果が STH と合わなくなる。また、 STH そのものは署名によって守られている。

結果、一度 STH に署名をすれば、木全体について改ざんの検知が可能となる。

この構造を踏まえて、基本的な処理を見ていく。


## ログの追加

CT Log Server には多くのの登録依頼が届き、定期的に既存の Tree に追加登録を行う。

このため CT 登録にはラグがあり、その最大値は Maximum Merge Delay (MMD)として提示されている。

この場合、追加分の証明書だけで Tree を作り、その Root と既存の Root のハッシュを取り、署名して新たな STH とすれば良い。

![Figure 2](https://www.certificate-transparency.org/log-proofs-work/ct_hash_2.png)


![Figure 3](https://www.certificate-transparency.org/log-proofs-work/ct_hash_3.png)
![Figure 5](https://www.certificate-transparency.org/log-proofs-work/ct_hash_5.png)


## 一貫性の証明

Tree が、どこかの時点で改ざんされていないかを検証しなければ、 Tree 自体が信用できない。


追加前の Figure 2 の状態と、追加後の Figure 3 の状態が一貫していることは、以下のステップで検証できる。

- Figure 2 が Figure 3 のサブセットであることを検証
- Figure 3 が Figure 2 + 新しい証明書であることを検証





Tree への追加は、既存の Tree の STH と、追加する証明書だけがわかっていれば計算できる。



つまり、第三者がこれを検証し続ければ、 Tree のどこかが意図的に書き換えられていないことが保証できる。










### 登録

証明書は CT Log Server に登録することができる。

これは CA が行うことが想定されるが、 HTTP で Post すれば誰でも行うことができる。

CT Log は Merkle Tree で構築されており、

Hashes を用いて構築されており **追記** しか出来ないことが暗号的に保証されている。

CA や CT Log の admin ですら、削除、更新、挿入などは行えず、ログが改ざんされていないことを前提とできるのである。

また、 CT Log を登録すると、ログサーバからは SCT (Signed Certificate Timestamp) という値が発行される。




この SCT 値が重要だが、用途については後述する。





### ログの存在検証 (Merkle Audit Proofs)

ある証明書が、ログに含まれていることを検証する。

証明書はリーフなので、このハッシュと他の証明書のハッシュを組み合わせて計算を進めた結果が Root Hash と一致するかどうかを検証すれば良い。

しかし、全ての証明書データを並べて計算するには、サイズが大きすぎる。

そこで、リーフからルートを辿る間に必要な、最小のノードのハッシュのみを取得することで計算を枝刈りできる。

これにより、実際のハッシュの計算は、全証明書が 1000 万個あったとしても、 24 個あれば足りることになる。(`10M < 2^24`)

もし、結果がルートと違えば、その証明書は **ログの中に無い** ことがわかる。

これは、クライアントが証明書の提供を受けた時に、それがログに存在するかを確認し、なければ否認するという用途に利用できる。










## 日本語訳について

Chrome では、 Certificate Transparency の情報を日本語で表示すると「**証明書の透明性**」と訳しており、意味的にもそれが適しているだろう。

しかし、 CT を「証明書透かし」や「透かし入り証明書」と訳す文書もあるようだ。

恐らく Transparency を「透かし」と安直に訳したのでは無いかと筆者は想像している。

百歩譲って、 SCT を「透かし」と捉えることもできなくはないかもしれないが、 SCT は証明書に埋め込むだけでなく、ハンドシェイクや OCSP で渡しても良い。

また、 CT の仕組み自体は SCT を発行するだけでなく、誤発行を検知することも含め、広く「CA がやっていることの透明性を高めよう(監視しよう)」というスコープだ。

以上より、もし訳すのであれば「証明書透かし」や「透かし入り証明書」ではなく「**証明書の透明性**」とするのが妥当だと考える。

(また、普通「電子透かし」は Digital Wartermarking で、 Transparency とは言わないかと思う)



## SCT of Let's Encrypt

そもそも




Let's Encrypt は、証明書発行の際に CT Logger への登録は行っているようだ。
しかし、この値はどこにも出てこない。


そのあたいは




## 本サイトでの適用

本サイトの証明書は Let's Encrypt で発行しているが、発行した DV 証明書にも、 OCSP にも SCT が埋め込まれていない。

つまり、取得した SCT を TLS ハンドシェイク(Server Hello の SCT Extension)に埋め込むようサーバに設定する必要がある。

本サイトで使用している h2o は、まだ Expect-CT に対応していないため、プラグインが提供されている Nginx を用いた検証を行った。


### SCT の取得

https://tools.ietf.org/html/draft-ietf-httpbis-expect-ct-02

TODO: https://blog.appsecco.com/certificate-transparency-part-2-the-bright-side-c0b99ebf31a8
TODO: https://transparencyreport.google.com/https/certificates/gZWyBsDsQ9gck3QB3vZDCN9atVbQneiNSU20zXdLdDA%3D


本サイトの証明書は Let's Encrypt で発行している。

fullchain.pem の証明書チェインは 2 つから成り立っている。

```
$ cat /etc/letsencrypt/live/jxck.io/fullchain.pem
-----BEGIN CERTIFICATE-----
MIIFvTCCBKWgAwIBAgISA6/EsoaosazyV8VTiLTZMzBzMA0GCSqGSIb3DQEBCwUA
MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xODAzMDYwNjA5MDZaFw0x
ODA2MDQwNjA5MDZaMBIxEDAOBgNVBAMTB2p4Y2suaW8wggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQC7UnbgMfyQOVAqOp9oNjcoHZ2p0H0sUkFERYzZ2VXX
JRkg7QzFrZTAP7jdxw/HEhkMJTMNlX59cvEyxiEbgNqTLYQjwSP1Ibgtkjzq2EPl
m2SsFkq6vwbuydZA31HQa2vEYqZzo9RUG69T4URUotmtZBTWqW5w8m9l9xwCuInz
OxS8990rVW27FiWtSF+4HI/mBTzHAX/w1dJRaT9ESrWJnmKYcYCBayCswEfp9b6u
OgNWASZBd67lKE2AfE0FDdgKclElttBbvK8Kl2TNpCzwRwwzt54Bt9AFt8MZr4p4
SKUjuj5GkcFrlnvyESbXJuyZwnnUCNkbxxYP0LfsgfmnAgMBAAGjggLTMIICzzAO
BgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwG
A1UdEwEB/wQCMAAwHQYDVR0OBBYEFMnlleIsgD60xDmW8Pz/yWKKPjk4MB8GA1Ud
IwQYMBaAFKhKamMEfd265tE5t6ZFZe/zqOyhMG8GCCsGAQUFBwEBBGMwYTAuBggr
BgEFBQcwAYYiaHR0cDovL29jc3AuaW50LXgzLmxldHNlbmNyeXB0Lm9yZzAvBggr
BgEFBQcwAoYjaHR0cDovL2NlcnQuaW50LXgzLmxldHNlbmNyeXB0Lm9yZy8wgd0G
A1UdEQSB1TCB0oINYWRtaW4uanhjay5pb4ILYXBpLmp4Y2suaW+CDGJsb2cuanhj
ay5pb4INZmlsZXMuanhjay5pb4IHanhjay5pb4IMbGFiMi5qeGNrLmlvggxsYWJz
Lmp4Y2suaW+CDGxvZ28uanhjay5pb4INcmFpbHMuanhjay5pb4IScmVwb3J0LXVy
aS5qeGNrLmlvggtzZnUuanhjay5pb4INc2xpZGUuanhjay5pb4IMc3BlYy5qeGNr
Lmlvggp3cy5qeGNrLmlvggt3d3cuanhjay5pbzCB/gYDVR0gBIH2MIHzMAgGBmeB
DAECATCB5gYLKwYBBAGC3xMBAQEwgdYwJgYIKwYBBQUHAgEWGmh0dHA6Ly9jcHMu
bGV0c2VuY3J5cHQub3JnMIGrBggrBgEFBQcCAjCBngyBm1RoaXMgQ2VydGlmaWNh
dGUgbWF5IG9ubHkgYmUgcmVsaWVkIHVwb24gYnkgUmVseWluZyBQYXJ0aWVzIGFu
ZCBvbmx5IGluIGFjY29yZGFuY2Ugd2l0aCB0aGUgQ2VydGlmaWNhdGUgUG9saWN5
IGZvdW5kIGF0IGh0dHBzOi8vbGV0c2VuY3J5cHQub3JnL3JlcG9zaXRvcnkvMA0G
CSqGSIb3DQEBCwUAA4IBAQA6Tnb6wxUgQE7mnf8N+5PgIzC5ebxjGps/I2ppEqnv
uAECdrkWySdqPDG8e7lyuyxzzav6FTFUb3y8EwDrdT+UDquewpv6TxoP1NcnuMRh
pjV41Y/otxRW53+Fz+g+Ub4XTnrJmK98aq8vzyMpvkWhHPMfs2xRsIkNH6L/T0h+
8AL7MpKLiuqiy9SA4COVjNLX5Z2ZyK/xPaNhfJ1jv7vs/fvIGNLtJ7sCwVa54r8O
ycNVd1nj9zVFmtJ554S3fRBNFI5vZNJJw4npN1/q1bQ1B7oo8U1pLunDxqhvNHO2
47WDRVBeCvJLuZGZJc4g35W97iUTVVbwPLVfK4o82MOD
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIEkjCCA3qgAwIBAgIQCgFBQgAAAVOFc2oLheynCDANBgkqhkiG9w0BAQsFADA/
MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT
DkRTVCBSb290IENBIFgzMB4XDTE2MDMxNzE2NDA0NloXDTIxMDMxNzE2NDA0Nlow
SjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxIzAhBgNVBAMT
GkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgzMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEAnNMM8FrlLke3cl03g7NoYzDq1zUmGSXhvb418XCSL7e4S0EF
q6meNQhY7LEqxGiHC6PjdeTm86dicbp5gWAf15Gan/PQeGdxyGkOlZHP/uaZ6WA8
SMx+yk13EiSdRxta67nsHjcAHJyse6cF6s5K671B5TaYucv9bTyWaN8jKkKQDIZ0
Z8h/pZq4UmEUEz9l6YKHy9v6Dlb2honzhT+Xhq+w3Brvaw2VFn3EK6BlspkENnWA
a6xK8xuQSXgvopZPKiAlKQTGdMDQMc2PMTiVFrqoM7hD8bEfwzB/onkxEz0tNvjj
/PIzark5McWvxI0NHWQWM6r6hCm21AvA2H3DkwIDAQABo4IBfTCCAXkwEgYDVR0T
AQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwfwYIKwYBBQUHAQEEczBxMDIG
CCsGAQUFBzABhiZodHRwOi8vaXNyZy50cnVzdGlkLm9jc3AuaWRlbnRydXN0LmNv
bTA7BggrBgEFBQcwAoYvaHR0cDovL2FwcHMuaWRlbnRydXN0LmNvbS9yb290cy9k
c3Ryb290Y2F4My5wN2MwHwYDVR0jBBgwFoAUxKexpHsscfrb4UuQdf/EFWCFiRAw
VAYDVR0gBE0wSzAIBgZngQwBAgEwPwYLKwYBBAGC3xMBAQEwMDAuBggrBgEFBQcC
ARYiaHR0cDovL2Nwcy5yb290LXgxLmxldHNlbmNyeXB0Lm9yZzA8BgNVHR8ENTAz
MDGgL6AthitodHRwOi8vY3JsLmlkZW50cnVzdC5jb20vRFNUUk9PVENBWDNDUkwu
Y3JsMB0GA1UdDgQWBBSoSmpjBH3duubRObemRWXv86jsoTANBgkqhkiG9w0BAQsF
AAOCAQEA3TPXEfNjWDjdGBX7CVW+dla5cEilaUcne8IkCJLxWh9KEik3JHRRHGJo
uM2VcGfl96S8TihRzZvoroed6ti6WqEBmtzw3Wodatg+VyOeph4EYpr/1wXKtx8/
wApIvJSwtmVi4MFU5aMqrSDE6ea73Mj2tcMyo5jMd6jmeWUHK8so/joWUoHOUgwu
X4Po1QYz+3dszkDqMp4fklxBwXRsW10KXzPMTZ+sOPAveyxindmjkW8lGy+QsRlG
PfZ+G6Z6h7mjem0Y+iWlkYcV4PIWL1iwBi8saCbGS5jN2p8M+X+Q7UNKEkROb3N6
KOqkqm57TH2H3eDJAkSnh6/DNFu0Qg==
-----END CERTIFICATE-----
```

これを登録するには以下のようにリクエストする。


ここでは、 <https://ct.googleapis.com/pilot> を対象とする。

```
$ curl -H 'Content-Type:application/json' \
       -d '{
         "chain": [
           "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"
         ] }' \
     https://ct.googleapis.com/pilot/ct/v1/add-chain | jq .
```

すると SCT の値が返る

```
{
  "sct_version": 0,
  "id": "pLkJkLQYWBSHuxOizGdwCjw1mAT5G9+443fNDsgN3BA=",
  "timestamp": 1520466748750,
  "extensions": "",
  "signature": "BAMASDBGAiEAwQMZSobyRhrwBToeThpDc13WFsv+6SVeW4biQqtgd/ACIQCa3Gx9TCY47YYfGnqOnNKugJhIjHGAYJX1Py5dBJTbCA=="
}
```

この timestamp が SCT の値となる。
なお、この処理は冪等なので、複数回登録しても同じ結果しか返らない。


次にこの証明書が登録されていることを確認してみる。

まず、現時点での tree_size を取得する。

```
$ curl 'https://ct.googleapis.com/pilot/ct/v1/get-sth' | jq .
{
  "tree_size": 237390491,
  "timestamp": 1521715637642,
  "sha256_root_hash": "WisB+1AbBn/gjrVa+YY6UEguquQ3EmMTiC2jyvJE5+U=",
  "tree_head_signature": "BAMARjBEAiBlYg2NpfsX/dDs2iP8RKGhr0t7YwaUjFPyiFpxbhdZ/wIgMDCaTD9D3l1BqTOlHNz8b73mcy4z1Z3MW9TA7wIH3nE="
}
```

SCT から計算したハッシュと、 tree_size をパラメータにし、リクエストを投げると結果が返る。


```
$ curl 'https://ct.googleapis.com/pilot/ct/v1/get-proof-by-hash?hash=odRjuexWzJ36zh8XavhDEZaUhoAv9yxRF4zEyKZiVVg%3D&tree_size=237363285' | jq .
{
  "leaf_index": 229437452,
  "audit_path": [
    "2xUbY5agJFehVi5L7KtIV+mRwd1+rYieiCIBBp6UXDQ=",
    "91GXiqhEmxUIPg8hPwbWibXPaekBEnhW+7cVxK1FpQM=",
    "4pabyq3YU5f62aoefELfNApIZNVokB6yessopuHbPYI=",
    "ZD8fsedLUhczZr6WKtI/vji/2iKaG6RQGnytNB/PJY8=",
    "2jkd2xQhHXS72n9zGOCrHYE+Ht2yIURU+HOj7SWtufU=",
    "OBeUVB7Hv8O+rwgNJFhdaIGLpKRrE6EbIhzD+zsp06g=",
    "mBoWTCjVoXRAn9K2zyLTT6Sf/dsCVfsge8of0CgQe/I=",
    "MIlP+tI7xF0G+NaQZwKmVQdhS/aY+lnSOdP/gp2i0PM=",
    "D/MSqG8qqkUzx31JPAbZUM8g5xKX7TfMplagvd42nUg=",
    "iknuTLvhj/2cm8zgvlE3/1RRq5oMIOm1PEIJJ4eL8ls=",
    "W4yMvWpCnmAL6gu7pl/0qZ0hqzOXootez7bpzFVnOFY=",
    "ei3UbQISzkCICkvtHSVcKRKfNHNuWxJyXsfXboktalA=",
    "qJnyxJ5MlX0FYhuqiZwUyTYzXTbOuFRwYDJYtZEAwjo=",
    "TYTjVzT8G2m3d7lvmKzoa8eofKI+ups08PQlGapxL6Y=",
    "qVeePLvKGvPrup2FHDPHhDgftgl+OMgBo2FwNgOTdwo=",
    "akCVDSoK9hL7IMS7M1XO524maXzYG38ptyjEzoEnPKA=",
    "LBe/RmYMD3omnA6W1KZCXVJ33zPte8sHZEiSnPZoFJg=",
    "2cxo2JHOCy+j9yUbyYdUHPU5xYuujjsBPqqblRFTTbE=",
    "QiQ2yYX156czbaDGp4QFkpa+Mz0KTx42yYwPATNtgRA=",
    "AQr9voHxUpOItbvcX9HHaScD4wN3Rl9KbCj2IwWT4G0=",
    "plPKVwkkF4PbmEuQhpXSzeim0C4ynNRltOk4rfzEGrY=",
    "GukxoDW1k7sojrdzQgOogXEmgYrT3HU/+NVYXJZ2ylM=",
    "zxZzji4AXCgTDoHZyowFDvy7sicOdWULhhefdFzLKOk=",
    "2q93unLYp50M4yIiGJPHqGSws4/uoEfpkofKqBLAy/k=",
    "DeXVzqk2ord24jn9JP+QBQBETHZpEP2RaPJuMD7R5LU=",
    "L14MCk6onUpZ/nqcQtsYy2vSoAVYk1F+DQ7YqJpxgwc=",
    "IHKYNe+u73+T/7cKMZX4YW7nfLKBWL5l8L7uJUOoIwM=",
    "8E8n1s9obojfAiyCIsRRnaoYi5geOjT8Pi2Dka2Wg+I="
  ]
}
```

この leaf_index は、証明書が leaf のどこにあるかを示し、 audit_path は leaf から root までに通る Node Hash だ。

ハッシュが合っていれば、このレスポンスが返る。

CT Log を鵜呑みにしない場合は、レスポンスの結果から Root までハッシュを計算し、最終的に Root と同じになるかを検証する。
