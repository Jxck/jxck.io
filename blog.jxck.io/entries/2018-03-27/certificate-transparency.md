# [expect-ct][hpkp][ct][security] Certificate Transparency の仕組みと HPKP から Expect-CT への移行


## Update

- 2018/3/30: Let's Encrypt が SCT 埋め込みに対応したため、 [本サイトでの適用](#本サイトでの適用) を更新した。


## Intro

本サイトは HPKP (public-key-pins-report-only) に対応していた。

しかし、 HPKP はその運用性の問題などもあり、 Chrome はすでに deprecate するアナウンスを出している。

代替の仕様として、 Certificate Transparency (CT) のエコシステムと、それを利用する Expect-CT の策定/実装が進んでいる。

CT エコシステムの概要、 Log の登録/検証、 HPKP から Expect-CT への移行などについて解説する。


## 「CA は信用できるのか?」問題

HTTPS 化が前提として定着した昨今、トラストアンカーとしての CA の責務は増している。

我々が依存する PKI は、 「CA は信用できる」という前提のもとに成り立っており、 CA はその信用を担保するために堅牢なシステムを構築することを求められる。

しかし、最近 CA が *証明書を誤発行する* などといった、この安全の前提を崩すような事態が複数発生している。

(ここでは、ドメインオーナーの知らないところでそのドメインの証明書が発行されることを、理由/方法によらず誤発行と言うことにする。)


## CA インシデントの影響

例として、悪意のある Eve が `google.com` の証明書を、 `google.com` の管理者に知られずに、正規の CA に発行させることができたとする。

(Eve は外部からの攻撃したかもしれないし、内部犯の可能性もある)

Eve は MITM を成立させたら、 `https://google.com` のレスポンスを改ざんし、取得した証明書で暗号化することができる。

ブラウザはそのレスポンスが信頼された `google.com` からのものであると表示し、 URL バーも緑になってしまう。

Eve の持つ秘密鍵は Google のそれとは違うが、証明書には「本物」と同等の効力があることが原因だ。


```text
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

Google は、 CA を信じ自分の知らないところで `google.com` の証明書が勝手に発行されていないことを祈るしか無い。


## HPKP

Google が CA から発行を受けた証明書と、 Eve が CA に誤発行させた証明書は、同等ではあるが byte 単位では別のものである。

つまり、 Hash を取得すれば 2 つの値は変わるはずだ。

そこで、 Google は自身が所有する証明書の Hash 値をレスポンスヘッダに付与し、ブラウザに確認させる方法を考えた。

MITM によってすり替えられたレスポンスに使用された証明書は、 Google が付与した Hash と合わない。

これにより、ブラウザは証明書が意図したものと違うことに気づくことができる。


```text
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

これが *HPKP (HTTP Public Key Pinning)* の基本的な考え方であった。

本サイトも、実験的にこれを適用していた。

[Public Key Pinning for HTTP(HPKP) 対応と report-uri.io でのレポート収集](https://blog.jxck.io/entries/2016-04-09/public-key-pinning.html)

しかし、このヘッダは証明書の失効/更新時に、 Hash が不整合を起こすのを防ぐため、先にバックアップ Hash を付与しておくなど、運用負荷が高かった。

(本サイトでも、しばらく前からヘッダ自体を付与していない)

そこで HPKP の代替として、並行して議論されていた *CertificateTransparency(CT)* という仕組みを応用し、より運用負荷が低い形で同等のことを実現する方法が提案された。

それが Expect-CT ヘッダである。

Chrome は既に、 HPKP を Deprecate し Expect-CT への移行を促している

- [Intent To Deprecate And Remove: Public Key Pinning](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/he9tr7p3rZ8/eNMwKPmUBAAJ)
- [Certificate Transparency in Chrome - Change to Enforcement Date](https://groups.google.com/a/chromium.org/forum/#!msg/ct-policy/sz_3W_xKBNY/6jq2ghJXBAAJ)

まず、前提としての CT のエコシステムについて解説する。


## Certificate Transparency

[CT: Certificate Transparency](https://www.certificate-transparency.org/) には、いくつかのロールがある。

ここでは、一番イメージしやすい例で以下のように整理し、図示する。

- CA: 証明書を発行し Log を登録する
- Log: 証明書を Merkle Hash Tree で保存しパブリックに公開する
- Monitor: Log を監視する
- Auditor: Log を検証する

ここではわかりやすく Monitor が Google で Auditor はブラウザだとしておく。


```text
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

Google は Monitor として CT Log Server を監視することで、 `google.com` が登録されたことを知ることができる。

先の例で、 Google が恐れていたのは「自分たちが知らないところで `google.com` の証明書が発行されること」だ。

自分たちが把握している発行が Log に登録されるのはもちろん問題ないし、把握していない Log が登録されれば、攻撃などで CA が誤発行を起こしたことがすぐにわかる。

攻撃は、発生していることがわかれば、対応ができる。これは、わからなかったころと比べるとかなりの進歩だ。

つまり、 Monitor である Google の視点で言えば「*CA を監視する技術*」と言えなくもない。

発行された Log が必ず登録されていることや、その Log が改ざんされていないことは、どう保証するのかは後述する。


## SCT(Signed Certificate Timestamp)

証明書を Log Server に登録すると、 SCT という Timestamp が発行される。

この値を元に、 CT Log Server に問い合わせれば、証明書が登録されているかを確認することができる。

SCT は以下の 3 つのどこかに付与し、ブラウザに通知することができる。


### 証明書

証明書自体に SCT を埋め込む方式。

CA は一旦証明書(プレ証明書)を生成し、 SCT を取得し、それを埋め込んだ新たな証明書を生成し、それを発行することになる。

このため、 CA 内部の運用への影響が多少あるが、もし対応されれば、コンテンツプロバイダからすると運用が一番楽だろう。

Let's Encrypt は、対応を予定している。

[Upcoming Features - Let's Encrypt](https://letsencrypt.org/upcoming-features/)


### OCSP

OCSP の情報に SCT を含む方式。これも CA 側の対応が必要。

Let's Encrypt は、証明書の方で対応する予定なので、こちらのプライオリティは低くなった。

[Include SCT receipts in OCSP responses #592](https://github.com/letsencrypt/boulder/issues/592#issuecomment-262036049)


### TLS Extension

TLS ハンドシェイクで、 ServerHello の `signed_certificate_timestamp` 拡張に埋め込む方式。

自分で CT Log に登録し、取得した SCT を埋め込めばよいので、唯一 CA が対応していなくても、コンテンツプロバイダだけで対応ができる方法。

対応しているサーバはまだ少ない。


## ユースケース

Google が管理する `google.com` の EV 証明書と Chrome を例に、ケースごとに何が発生するのかを整理する。


### 証明書が誤発行され、 Log が登録されている

Google は、 `google.com` の EV 証明書が、自分たちの知らないところで勝手に発行されていないかを監視している。

したがって、 Eve が誤発行に成功しても、 Log サーバに Log が登録されれば、誤発行を発見し対策が行える。


```text
    +--------------+                     +--------------+
    |              |     Submit Log      |              |
    |              |-------------------->|              |
    |      CA      |                     |     Log      |
    |              |                     |              |
    |              |                     |              |
    +--------------+                     +--------------+
        |                                      ^
        | 誤発行                               |
        |                                      |
        V                                      |
       Eve               Monitoring            |
             +---------------------------------+
             |       自分の知らない登録があることを
             |       監視により発見。対応できる。
             |
             |
    +--------+-----+
    |              |
    |   Monitor    |
    |   (Google)   |
    |              |
    +--------------+
```


### 証明書が誤発行され、 Log が登録されたが、後から Log を改ざんした

CT Log は Merkle Tree Hashes を用いているため、 Log を改ざんすると不整合が発生する。

Monitor/Auditor は Log の整合性を監視/検証しているので、計算が合わないことで改ざんに気づくことができる。


```text
    +--------------+                     +--------------+   改ざん
    |              |                     |              | <------- Eve
    |              |                     |              |
    |      CA      |                     |     Log      |
    |              |                     |              |
    |              |                     |              |
    +--------------+                     +--------------+
                                                 ^
                                                 | 整合性を検証することで
                                                 | 改ざんに気づくことができる
                                                 |
                         Monitoring              |
             +-----------------------------------+
             |                                   |
             |                                   | Audit
             |                                   |
             |                                   |
    +--------+-----+                     +--------+-----+
    |              |                     |              |
    |   Monitor    |                     |   Auditor    |
    |   (Google)   |                     |   (browser)  |
    |              |                     |              |
    +--------------+                     +--------------+
```


### 証明書が誤発行されたが、 Log を登録せず、証明書には別の SCT を埋め込んだ

CT Log は、証明書そのものの値を Hash のシードとして含んでいる。

従って、ブラウザ(Auditor) が証明書に含まれた SCT の正当性を Log Server に問い合わせる際に、おかしいことに気づくことができる。


```text
    +--------------+                     +--------------+
    |              |                     |              |
    |              |                     |              |
    |      CA      |                     |     Log      |
    |              |                     |              |
    |              |                     |              |
    +--------------+                     +--------------+
               |                                  ^
               |                                  |
               |                                  |
               |                                  | 受け取ったSCT を
               |                                  | Log Server に
               | 誤発行                           | 問い合わせると
               +-------------+                    | 整合しないことに気づく
                             |                    |
                             |                    |
                             |                    |
    +--------------+         |           +--------+-----+
    |              |         v           |              |
    |   Monitor    |        Eve          |   Auditor    |
    |   (Google)   +----||- MITM -||---->|   (browser)  |
    |              |                     |              |
    +--------------+                     +--------------+
```


### CA からの誤発行ではなく偽造された証明書が Log に登録され、その SCT を埋め込んだ

CA の署名がない証明書は、 CT 関係なくブラウザで弾かれるため、 SCT をみるまでもない。

仮に、そうした証明書が CT Log に登録されていたとしても、単なる Hash の 1 つとして使われるだけだ。

Monitor の関心あるドメインであれば、誤発行と同じように対応され、関心がなければ無視される。

他の証明書の Audit にも特に影響はない。


### 証明書が誤発行されたが、 Log を登録せず、証明書には SCT を埋め込まない

SCT が証明書になければ、ブラウザはその証明書が誤発行されたものかどうかを確認することができない。

単に SCT に対応してない証明書である、と扱うことになってしまう。

そこで *Chrome は EV については SCT を必須* とし、 SCT がなければその時点で Invalid とみなすという方向にした。


```text
    +--------------+                     +--------------+
    |              |                     |              |
    |              |                     |              |
    |      CA      |                     |     Log      |
    |              |                     |              |
    |              |                     |              |
    +--------------+                     +--------------+
               |
               |
               |
               |
               |
               | 誤発行
               +-------------+
                             |
                             |           SCT が無い EV は
                             |           そもそも認めない
    +--------------+         |           +--------------+
    |              |         v           |              |
    |   Monitor    |        Eve          |   Auditor    |
    |   (Google)   +----||- MITM -||---->|   (browser)  |
    |              |            (no SCT) |              |
    +--------------+                     +--------------+
```

自社の発行する EV が Chrome では使えないという状況を防ぐために、 CA は EV を発行する際に必ず CT Log を登録せざるをえなくなる。

こうして CA に CT 対応を実質的に強制することで、証明書の誤発行を監視するエコシステムの形成が、 Google 先導で進められている。

EV 以外の証明書については、後述する HTTP の Expect-CT ヘッダで、コンテンツベンダがオプトインすることができる。


## CT の活用

DV 証明書などを使っている場合も、自分でこのエコシステムにオプトインすることもできる。


### SCT を自分で取得する

CT Log Server への登録は、誰でもできる。

つまり、 CA が登録をしていなくても、自分で証明書を登録すれば、 SCT を取得することができる。

また、処理は冪等であるため、既に登録されている場合は同じ値が返る。

可用性のためにも、 Log は複数のサーバに登録することが望ましいとされている。

現在運用されている Log Server の一覧は以下にある。

[Known Logs - Certificate Transparency](https://www.certificate-transparency.org/known-logs)


### SCT を自分で埋め込む

CA に頼らず SCT を自分で提供する場合は、 TLS Handshake の `signed_certificate_timestamp` 拡張を用いる。

しかし、現在これに対応してるサーバは少なく、本サイトで使用している h2o は [執筆時では未対応](https://github.com/h2o/h2o/issues/448) である。

(ハンドシェイクレベルなため mruby のハンドラでも手が出せない)

他のサーバの実装状況については、以下にまとまっている。

[Resources for site owners - Certificate Transparency](https://www.certificate-transparency.org/resources-for-site-owners)


### CT を自分で監視する

CT Log を監視することで、自身の保有するドメインの証明書が、知らないところで発行されていないかを監視することができる。

しかし、 CT Log Server は複数あり、登録される証明書も非常に多いので、個人が Monitor になる負荷は低くは無い。

本サイトでは Facebook が提供している CT monitoring のサービスを利用している。

[証明書の透明性のモニタリング - 開発者向け Facebook](https://developers.facebook.com/tools/ct/)

ここに、監視したいドメインを登録すると、 CT Log 登録時に通知が来るので、手軽に監視ができる。

CT Log はパブリックなため、認証などはなく、任意のドメインの登録を監視できる。

ここから、 CT Log を通して公開されてない製品/サービスの推測などが懸念されており、別途議論が進んでいる点も把握しておきたい。


### Expect-CT Header による強制

誤発行に成功した証明書に置き換えられた場合、 Chrome での EV のように SCT のチェックが必須でない場合は、正しい証明書として通っていまう。


```text
+------------+                       +-----------+
|            |  DV+SCT        DV     |           | ブラウザが SCT のチェックを
|   Google   |--------->| |---------x|  Browser  | しなければ、普通の証明書
|            |          | |          |           |
+------------+          | |          +-----------+
                   +-----------+
                   | Eve(MITM) |
                   +-----------+
```

そこで、「*このコンテンツは CT に対応した証明書で提供される*」ということを明示する方法が提案された。

これが `Expect-CT` ヘッダだ。


```text
                 Expect-CT: enforce
+------------+                       +-----------+
|            |  DV+SCT        DV     |           | Expect-CT 対応ブラウザは
|   Google   |--------->| |---------x|  Browser  | SCT を必ずチェックする
|            |          | |          |           |
+------------+          | |          +-----------+
                   +-----------+
                   | Eve(MITM) |
                   +-----------+
```

[Expect-CT Extension for HTTP](https://tools.ietf.org/html/draft-ietf-httpbis-expect-ct)

Expect-CT のディレクティブは、基本的に CSP と同じような設計になっている。


```http
Expect-CT: max-age=86400, enforce, report-uri="https://foo.example/report"
```

- `enforce`:  SCT のチェックをブラウザに強制させる
- `report-uri`: CSP レポートの送信先
- `max-age`: 有効期限

なお *Expect-CT 自体が SCT の値を含むわけではない* 点に注意したい。

これにより、証明書が変わってもヘッダの値は変わらないため、 HPKP と比べて運用負荷が大きく下がる。

また、他の CSP のように `Expect-CT-Report-Only` は定義されておらず、 `enforce` を付けずに `report-uri` のみとすれば、レポートだけが飛ぶ。


```http
Expect-CT: max-age=86400, report-uri="https://foo.example/report"
```


## CT Log の仕組み

ここからは、実際の CT Log の仕組みである Merkle Tree や、それを踏まえた CT Log Server へのリクエストについて解説する。


### Merkle Tree

CT Log は、 Merkle Tree という構造で保存されている。

これは、ビットコインのトランザクションの記録などにも使われており、やっていることも非常に似ている。

仕組みはシンプルで、証明書の Hash を Leaf とし、 Leaf/Node ペアの Hash を親とする二分技を構築する。

CT では Hash に SHA256 を使用する。


```text
              Sign
      Root  -------->  STH
     /   \
    /     \
   i       j
  / \     / \
 a   b   c   d
 |   |   |   |
d0  d1  d2  d3

a = sha256(0x00 || d0)
i = sha256(0x01 || a || b)
```

Log Server は、この Root となる Hash に署名をする。これを Signed Tree Head(STH) と呼ぶ。

Leaf の値が 1 つでも変わると、計算結果が STH と合わなくなる。また、 STH そのものは署名によって守られている。

結果、一度 STH に署名をすれば、木全体について改ざんの検知が可能となる。

この構造を踏まえて、基本的な処理を見ていく。


## Log の追加

CT Log Server には多くのの登録依頼が届き、定期的に既存の Tree に追加登録を行う。

このため CT 登録にはラグがあり、その最大値は Maximum Merge Delay (MMD)として提示されている。

この場合、追加分の証明書(d4, d5)だけで Tree を作り、その Root(k) と既存の Root(m) の Hash を取り、署名して新たな STH とすれば良い。


```text
                       Sign
           New Root  -------->  STH
         /          \
        /            \
      [m]            [k]
     /   \          /   \
    /     \        /     \
   i       j      e       f
  / \     / \     |       |
 a   b   c   d   d4      d5
 |   |   |   |
d0  d1  d2  d3
```


## 一貫性の証明

木が構築された後に、どこか 1 つでも値を改ざんすれば、再計算すると STH と値が合わなくなる。

一方、それを検証する側は、証明書全部を取得して全部再計算することもできるが、毎回それを行う必要はない。

Log が少ないうちに STH まで検証しておけば、あとはその STH と、追加された分の証明書だけを計算して、新しい STH と比較することで、 Log が改ざんされていないことを検証できる。

先の図に d6, d7 を追加した結果が以下のようになっていたとする。


```text
                      Sign
              Root  --------->  STH
         /           \
        /             \
      [m]              n
     /   \           /   \
    /     \         /     \
   i       j      [k]      l
  / \     / \     / \     / \
 a   b   c   d   e   f   g   h
 |   |   |   |   |   |   |   |
d0  d1  d2  d3  d4  d5  d6  d7
```

この Tree の一貫性を証明するためには、以下を検証すれば良い。

- k, m を用いて、この 1 つ前までの Tree が改ざんされていないこと
- その Tree に対して g, h を加えた木の Root が新しい STH と一致すること

つまり、計算に必要なのは m, k g, h だけで済む。

第三者がこれを検証し続ければ、 Tree のどこかが意図的に書き換えられていないことが保証できる。

こうして、 CT Log は Merkle Hashe Tree を用いて *追記* しか出来ないことが暗号的に保証されている。


### Log の存在検証 (Merkle Audit Proofs)

ある証明書が、 Log に含まれていることを検証する。

証明書は Leaf なので、この Hash と他の証明書の Hash を組み合わせて計算を進めた結果が Root Hash と一致するかどうかを検証すれば良い。

しかし、全ての証明書データを並べて計算するには、サイズが大きすぎる。

そこで、 Leaf から Root を辿る間に必要な、最小の Node の Hash のみを取得することで計算を枝刈りできる。

以下の場合、 d3 の存在を調べるのに必要なのは c, i, n のみである。


```text
                      Sign
              Root  --------->  STH
         /           \
        /             \
       m              [n]
     /   \           /   \
    /     \         /     \
  [i]      j       k       l
  / \     / \     / \     / \
 a   b  [c]  d   e   f   g   h
 |   |   |   |   |   |   |   |
d0  d1  d2 [d3] d4  d5  d6  d7
```

これにより、実際の Hash の計算は、全証明書が 1000 万個あったとしても、 24 個あれば足りることになる。(`10M < 2^24`)

もし、結果が Root と違えば、その証明書は *Log の中に無い* ことがわかる。

これは、主にブラウザが証明書の提供を受けた時に、それが Log に存在するかを確認し、なければ否認するという用途に利用できる。


## CT Log Server へのリクエスト

では、実際に CT Log への HTTP リクエストを通して、ここまでの挙動を確認する。

[RFC 6962 - Certificate Transparency](https://tools.ietf.org/html/rfc6962)

なお、以下のコード例は、実際に本サイトで使用している証明書を用いたリクエストを書いているが、読者はこれをそのまま実行しても問題ない。


### 証明書の登録(add-chain)

証明書チェインを登録し、 SCT の値を取得する。

今回は、 CT Log Server として <https://ct.googleapis.com/pilot> を対象とする。

本サイトの証明書は Let's Encrypt で発行しており、 fullchain.pem の証明書チェインは 2 つから成り立っている。


```bash
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

これを登録するリクエストは以下のようになる。


```bash
$ curl -H 'Content-Type:application/json' \
       -d '{
         "chain": [
           "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"
         ] }' \
     https://ct.googleapis.com/pilot/ct/v1/add-chain | jq .
```

すると SCT(timestamp) を含む JSON が返る。


```json
{
  "sct_version": 0,
  "id": "pLkJkLQYWBSHuxOizGdwCjw1mAT5G9+443fNDsgN3BA=",
  "timestamp": 1520466748750,
  "extensions": "",
  "signature": "BAMASDBGAiEAwQMZSobyRhrwBToeThpDc13WFsv+6SVeW4biQqtgd/ACIQCa3Gx9TCY47YYfGnqOnNKugJhIjHGAYJX1Py5dBJTbCA=="
}
```

なお、この処理は冪等なので、複数回登録しても同じ結果が返る。


### 証明書の存在確認

次にこの証明書が登録されていることを確認してみる。

まず、現時点での tree_size を取得する。


```bash
$ curl 'https://ct.googleapis.com/pilot/ct/v1/get-sth' | jq .
{
  "tree_size": 237390491,
  "timestamp": 1521715637642,
  "sha256_root_hash": "WisB+1AbBn/gjrVa+YY6UEguquQ3EmMTiC2jyvJE5+U=",
  "tree_head_signature": "BAMARjBEAiBlYg2NpfsX/dDs2iP8RKGhr0t7YwaUjFPyiFpxbhdZ/wIgMDCaTD9D3l1BqTOlHNz8b73mcy4z1Z3MW9TA7wIH3nE="
}
```

SCT から計算した Hash と、 tree_size をパラメータにし、リクエストを投げると結果が返る。

Hash はバイナリ演算が必要なため、書き捨てのスクリプトで行ったものを参考までに貼っておく。

[ct.rb](./ct.rb)


```bash
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

この `leaf_index` は、証明書が Leaf のどこにあるかを示し、 `audit_path` は Leaf から Root までに通る Node Hash だ。

Hash が合っていなければ、エラーが返る。つまり、 CT Log を信用するならこのレスポンスをもって、証明書は存在すると言えるだろう。

自身で検証を行う場合は、自分の証明書に対して `audit_path` の順に Root まで計算し、 STH と一致することを確認すれば良い。


## 日本語訳について

Chrome では、 Certificate Transparency の情報を日本語で表示すると「*証明書の透明性*」と訳しており、意味的にもそれが適しているだろう。

しかし、 CT を「証明書透かし」や「透かし入り証明書」と訳す文書もあるようだ。

恐らく Transparency を「透かし」と安直に訳したのでは無いかと筆者は想像している。

百歩譲って、 SCT を「透かし」と捉えることもできなくはないかもしれないが、 SCT は証明書に埋め込むだけでなく、ハンドシェイクや OCSP で渡しても良い。

また、 CT の仕組み自体は SCT を発行するだけでなく、誤発行を検知することも含め、広く「CA がやっていることの透明性を高めよう(監視しよう)」というスコープだ。

以上より、もし訳すのであれば「証明書透かし」や「透かし入り証明書」ではなく「*証明書の透明性*」とするのが妥当だと考える。

(また、普通「電子透かし」は Digital Wartermarking で、 Transparency とは言わないかと思う)


## 本サイトでの適用

Let's Encrypt の SCT 埋め込みがサポートされた。

[Signed Certificate Timestamps embedded in certificates - API Announcements - Let's Encrypt Community Support](https://community.letsencrypt.org/t/signed-certificate-timestamps-embedded-in-certificates/57187/2)

本サイトでは証明書を再発行し SCT が埋め込まれた証明書を取得した。

![Chrome DevTools の Security タブで本サイトの証明書に埋め込まれた SCT を確認する](sct-in-chrome-devtools.png#938x498 "certificate transparency sct check in chrome devtools security tab")

また、 `jxck.io` および `blog.jxck.io` に Expect-CT ヘッダを Enforce 無し(Report-Only 相当) で適用した。


```http
Expect-Ct: max-age=31536000, report-uri https://report-uri.example.com
```

HPKP をデプロイした時も、レポートなど来ないだろうと思っていたが、ある特定のサービスからレポートが頻繁に来ていた。

Expect-CT も、実際にどういうレポートが発生するのか未知であるため、知見を貯めていきたい。
