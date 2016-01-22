# Let's Encrypt を支える ACME プロトコル

## Intro

先日 [#http2study](http://http2study.connpass.com/event/21161/) で mozilla の Richard Barnes が [Let's Encrypt](https://letsencrypt.org/) について話してくれました。


[![letsencrypt-overview](http://f.st-hatena.com/images/fotolife/J/Jxck/20151108/20151108135731.png?1446958884)](https://bifurcation.github.io/letsencrypt-overview/)



資料: [Let's Encrypt Overview](https://bifurcation.github.io/letsencrypt-overview/#/)

この[資料の翻訳](https://github.com/Jxck/letsencrypt-overview/blob/translation/index-ja.html) はしたのですが、いらなくなってしまったので供養もかねてこのプロジェクトのモチベーションと、 Web でおこっている HTTPS 推進のたどる道について、資料を補足しつつ紹介します。

結論から言うと Let's Encrypt はもちろん **ACME プロトコル** についても是非知っておくと良いと思います。


## HTTPS の問題

すでにこのブログでも紹介しているように、 Web における HTTPS の重要性は増し、それの普及を後押しする活動が各所で進められています。

[HTTPS 化する Web をどう考えるか](http://jxck.hatenablog.com/entry/web-over-https)

よく言われる盗聴防止を始め、暗号化を行うことで防げる問題は多くあります。ブラウザの API には HTTPS で無いと使えないものも出てき始めています。
それらを担保するために、 HTTPS 化が有効なわけですが、現時点での進捗は以下だそうです。

- [Pageload の 40%](https://telemetry.mozilla.org/new-pipeline/dist.html#!cumulative=0&end_date=2015-10-29&keys=__none__!__none__!__none__&max_channel_version=release%252F42&measure=HTTP_PAGELOAD_IS_SSL&min_channel_version=null&product=Firefox&sanitize=1&sort_keys=submissions&start_date=2015-10-29&table=0&trim=1&use_submission_date=0)
- [HTTP Transaction の 65%](https://telemetry.mozilla.org/new-pipeline/dist.html#!cumulative=0&end_date=2015-10-29&keys=__none__!__none__!__none__&max_channel_version=release%252F42&measure=HTTP_TRANSACTION_IS_SSL&min_channel_version=null&product=Firefox&sanitize=1&sort_keys=submissions&start_date=2015-10-29&table=0&trim=1&use_submission_date=0)

究極には **全てのトラフィックが HTTPS** になる状況が望ましいとすると、進捗はまだまだと言えます。


## HTTPS 普及上の問題

実際には多くの問題がありますが、一番分かりやすいのは「**証明書**」の問題でしょう。

- 証明書は有料
- 発行機関ごとに申請方法が違う
- 発行プロセスが基本手動
- 追加でサーバの設定
- etc


料金の問題は、特に個人のホビー用途での側面が強いでしょう。
しかし、ビジネスの場面でも、申請フローが自動化できない(しにくい)ことによって、今日のデプロイプロセスに混ぜにくいという問題があります。

つまり、 **無料** かつ **自動** で発行できると、かなり状況は改善できる可能性があるというのが、 Let's Encrypt のモチベーションになります。


## Let's Encrypt の発行する証明書

CA が発行する証明書にはいくつかの種類があります。

<dl>
  <dt>DV(Domain Validation)
  <dd>ドメインの所有を確認して発行
  <dt>OV(Organization Validation)
  <dd>組織の実在の確認をして発行
  <dt>EV(Extended Validation)
  <dd>より厳密な実在確認をして発行
</dl>


OV, EV は申請が複雑ですが、 DV は「申請者がそのドメインを持っているかどうか」を確認するだけなので、信頼性は劣りますが発行が短期間で済みます。

Let's Encrypt が発行できるのは、この DV 証明書だけです。


また、単体の証明書は例えば `mail.example.com` と `www.example.com` は別のものが必用ですが、 `*.example.com` 全体を一つでカバーできるワイルドカード証明書というものがあります。
しかし、 Let's Encrypt はワイルドカード証明書は発行できません。無料であるため、サブドメイン毎にガンガン発行することになるようです。


## Let's Encrypt のクロスルート証明書

Let's Encrypt は CA であるため、クライアントから信頼されていなければなりません。
これは通常、 Let's Encrypt 自体の CA 証明書が OS やブラウザなどにビルトインされている必用があります。(無い場合は、 HTTPS が成立しない)

現在 Let's Encrypt 自体の CA 証明書はまだ OS などには入っていません。
しかし、 IdenTrust という多くの環境で信用されている別の CA と[チェーンを結ぶようになりました](https://letsencrypt.org/2015/10/19/lets-encrypt-is-trusted.html)。
これにより Let's Encrypt の証明書は「クロスルート証明書」となり、 IdenTrust を信用する環境で信用されるようになりました。

要するに、大抵の環境で Let's Encrypt の証明書はすぐに使えるようになるわけです。

不安な場合は、対象とするクライアントで以下の URL を開けば、きちんど動作するか確認できます。

https://helloworld.letsencrypt.org/


## DV 証明書発行の自動化

DV 証明書に発行に必用なのは以下の確認です。

> example.com の証明書が欲しいと要求してきた人が
> 本当に example.com の所有者かの確認

この方法はいくつか考えられますが、基本的には「そのドメインを持っている人にしかできない操作をさせて、それを確認する」という発想になります。

Let's Encrypt が求めるのは以下のような操作です。

- `example.com` のサーバで TLS を有効にする
- DNS で `_acme-challenge.example.com` に対して Let's Encrypt が指定した値を返す TXT レコードを設定する
- HTTP で `http://example.com/.well-known/acme-challenge/` に対して Let's Encrypt が指定したテキストを返す設定をする

ドメイン所有者はこれを行い、 Let's Encrypt が設定の正しさを外から確認することで、ドメインの所有者を確認し、証明書を発行します。
Let's Encrypt への依頼は API 経由でできるため、そこで受け取ったトークンを用いて、これらのプロセスさえ自動化できれば、完全自動で証明書が発行できるわけです。


## ACME プロトコル

実は、前述のような証明書発行のプロトコルは標準化されています。


それが [ACME プロトコル](https://github.com/letsencrypt/acme-spec) です。


仕様はまだ策定中ではありますが、 Let's Encrypt はこの ACME を(仕様策定にフィードバックしながら)実装しています。

ACME プロトコルは前述したクライアント(発行依頼側)だけではなく、サーバ(発行側)についてもカバーしています。
このプロトコル自体が、今後の HTTPS の普及に重要なものだと考えています。



## ACME 対応サーバ

Let's Encrypt は、証明書の発行を自動化する Python 製の CLI ツールを公開しています。

https://github.com/letsencrypt/letsencrypt

これはつまり、 ACME クライアントツールということになります。
これを用いて CLI ベースで証明書の発行を行うことができます。

しかし、 ACME および Let's Encrypt の目指す自動化はもう少し先にあります。

例えば発行した証明書は、最終的には Nginx や Apache などの設定ファイルに記述して有効化する必用があります。
そこで、「Nginx や Apache などのサーバ自体が ACME プロトコルを話し、勝手に証明書を取得して、勝手に設定する」というところまやると、証明書の知識が少ない初心者にも、 HTTPS を有効化する敷居を下げることができるというモチベーションです。

すでに Nginx と Apache の Plugin があるようです。

- https://github.com/letsencrypt/letsencrypt/tree/master/letsencrypt-nginx
- https://github.com/letsencrypt/letsencrypt/tree/master/letsencrypt-apache


個人的には、設定ファイルが勝手に書き変わることには多少懐疑的ですが、プロトコル自体があるなら、サーバが直接話さないにしてもデプロイプロセスに取り込むことはできると思います。

今後 ACME 対応のエコシステムが揃えば、より選択肢が増え、知見が溜まって行くと思います。


## ACME 対応 CA

ACME は Let's Encrypt だけのものではありません、 Let's Encrypt 以外の CA も ACME に対応することで、自動化の恩恵を受けることができます。

言い換えれば Let's Encrypt 自体も ACME 対応サービスの一つです。そしてこれも OSS ベースで公開されています。

https://github.com/letsencrypt/boulder/

今後より重要度が増して行く HTTPS において、こうした標準的な発行手段が(例え DV のみでも)普及することは、デプロイのオーバーヘッドを減らして行く意味でも価値があるのではないでしょうか？


## まとめ

- ACME という、証明書発行プロトコルが現在策定中
- Let's Encrypt は ACME のサービス実装の一つ
- ACME を話せるクライアントがあれば、自動化が可能



Let's Encrypt は **無料** だという部分がフィーチャーされてて、それはもちろん凄いんだけど、裏ではこんな動きもありますよという話でした。


ちなみにこのステッカーが、そのうち沢山貰える予定なので、欲しい人は声かけてください。

[f:id:Jxck:20151107161258j:plain]
