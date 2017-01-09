# [csp][mixed contents] mixed contents の理解と可視化の方法

## Intro

HTTPS 移行の問題点の一つに、 mixed contents への対応がある。

逆に mixed contents の発生を恐れ、 HTTPS に移行できないサービスもあるだろう。

問題は mixed contents が「どこで発生しているかわかりにくい」という場合もあるため、そこで利用できる可能性のある `Upgrade-Insecure-Request` および、 CSP の `Block-All-Mixed-Contents` を解説する。


## mixed contents

HTTPS で配信されたコンテンツが、サブリソースとして HTTP のコンテンツを含む場合、これを **mixed contents** という。

HTTPS 化されたコンテンツは MITM に対する耐性があるが、そこに含まれるサブリソースが HTTP で配信されると、 MITM への耐性がないため、そこを起点に HTTPS コンテンツへの改ざんが成立してしまう可能性がある。

このため HTTPS で配信されていても、 mixed contents がある場合は完全に安全とは言えず、ブラウザは通常ユーザに安全ではないことを警告する。

近年の HTTPS 化の流れで、これまで HTTP で作られていたコンテンツを HTTPS に移行する際に、 mixed contents の問題が顕在化するのはよくある話だ。

これは `http://` で書かれたサブリソースの URL を、全て `https://` に書き換えれば問題は解決する。従って全てのコンテンツを管理下におき、修正が可能であれば特に問題はない。

しかし、以下のような場面では、それが難しい場合がある。

- 膨大なコンテンツにリンクがハードコードされており、簡単には書き換えられない
- Blog や Wiki といった、ユーザが作成するコンテンツ(GCM) 内にハードコードされたリンクで、サービス側が勝手に書き換えられない
- iframe を用いた埋め込み広告など、自身の管理下にないリソースを読み込む
- サービスが複雑で、どこで mixed contents が発生しているか把握しきれず、対応が進まない

これらの問題について、どういった対応手段があるかを解説していく。


## mixed contents の挙動

[Mixed Content](https://w3c.github.io/webappsec-mixed-content/)

まず、 mixed contents 発生時のブラウザの挙動について再度確認する。

mixed contents は URL バーが変化し、ユーザに注意を促す。
また、コンテンツが MITM により改ざんされた場合の影響によって、二つに分類されており、それによって挙動が変わる。

以下にデモを用意した。

[DEMO: mixed contents](https://labs.jxck.io/mixed/mixed.html)


### URL バーの変化

具体的には、多くのブラウザが URL バーの表示を変更し、ユーザに注意を促すようになる。

![url bar with mixed contents](./insecure-url-bar.png#800x160 'url bar changes green to gray even if valid tls certificate when mixed contents')

mixed contents が無ければ本来は以下のようになる。

![url bar without mixed contents](./secure-url-bar.png#800x160 'url bar became green when no mixed contents')

証明書の設定が正しくとも、それが EV であろうとも、 URL バーが緑にならないことは、信頼が揺らいでいることを意味する。


### Mixed Active(Script) Contents

以下のタグ、及びスクリプト等は、  **Mixed Active Contents** と呼ばれる。

```html
<script src>
<link href>
<iframe src>
<object data>
XHR
CSS 内の URL (@font-face, background-image etc)
```

これら Mixed Active Contents は、 HTTP で配信され MITM の攻撃によって改ざんされた場合、それを読み込む元コンテンツ自体を、 DOM へのアクセスなどを通じて書き換えることができてしまう。

このため、 Mixed Active Contents の読み込みはブラウザによりブロックされ、取得されずにエラーとなる。

特に iframe を埋め込むタイプの広告の場合、 HTTP で配信される広告を HTTPS のページに埋め込むと、広告が表示されないことになる。

アドプロバイダの HTTPS 対応は進んでいるとはいえ、広告が表示されないことは実益に影響する場合が多いため、これが原因で HTTPS 化ができないサービスも少なからずある。

[DEMO: Mixed Active Contents](https://labs.jxck.io/mixed/mixed.html#active)


### Mixed Passive(Display) Contents

以下のタグは、基本的にコンテンツを表示する目的で使われる。

```html
<img>
<audio>
<video>
<object>
```

もし、 `<img>` で読まれるコンテンツが HTTP であり、 MITM によって改ざんされた場合、別の画像を表示することで元コンテンツを改ざんすることが可能だ。
しかし、そこを経由して元コンテツの他の DOM に変更を及ぼすことはできない。

そのため、これらコンテンツの読み込み自体は行われるが、ブラウザの URL バーは異常を検知したような表示になる。

特に EV 証明書で、 URL バーに組織名を表示しているような場合は、たとえコンテンツが表示されていたとしても、無視できない問題となってくる。

[DEMO: Mixed Passive Contents](https://labs.jxck.io/mixed/mixed.html#passive)


## CSP による Mixed Contents 対策

Mixed Contents に対して、対策となりえる CSP のディレクティブを解説する。


### Upgrade-Insecure-Request

[Upgrade Insecure Requests](https://w3c.github.io/webappsec-upgrade-insecure-requests/)

CSP の `Upgrade-Insecure-Request` を付与した場合、ブラウザは HTTPS コンテンツに埋め込まれた `http://` スキームのリンクを、 `https://` に読み替えて発行する。

コンテンツからは HTTP のリクエストが発生しないため、どんなコンテンツであっても URL バーは安全であるという表示になる。

コンテンツが膨大すぎて URL の書き換えが困難なサイトや、 CGM でありユーザが作ったコンテンツを勝手に書き換えることができない場合に、ヘッダだけで対応を終えることができる。

サーバ側が同じコンテンツを https で配布していなければ 404 になる代わりに、絶対に mixed contents にならないのがこのヘッダの特徴である。

しかし、対応していないブラウザでは問題が解決しないため、そのサーバが `Upgrade-Insecure-Request` に対応しているかを知りたい場合がある。

仕様では、 feature-detection のために、対応するブラウザはリクエストに `Upgrade-Insecure-Request: 1` というヘッダをつけることになっているため、これを用いて分岐することは可能だ。

[3.2. Feature Detecting Clients Capable of Upgrading](https://w3c.github.io/webappsec-upgrade-insecure-requests/#feature-detect])


[DEMO: Upgrade-Insecure-Request](https://labs.jxck.io/mixed/mixed.html?upgrade-insecure-request)

理想はコンテンツ内の全てのリンクを修正したいところだ。

### Block-All-Mixed-Contents

[4. Strict Mixed Content Checking](https://w3c.github.io/webappsec-mixed-content/#strict-checking)

たとえ Mixed Passive Contents であったとしても、 MITM により改ざんされることが多大な影響を及ぼす場合もあるだろう。

この場合は、 CSP の `Block-All-Mixed-Contents` を有効にすることで、 Passive でも Active 同様にブロックし、改ざんされたコンテンツが表示されることを防ぐことができる。

ユーザにとってコンテンツが壊れる(画像などが表示されない)ことより、 MITM によって改ざんされるリスクを重く見る場合の対応となる。

また、 CSP の reporting に対応しているため、 block が発生した場合にそのことを指定した URI にレポートすることができる。

[DEMO: Block-All-Mixed-Contents](https://labs.jxck.io/mixed/mixed.html?block-all-mixed-content)


### mixed contents の発生状況を収集する

mixed contents は、発生したこと自体を把握しにくかったという点が、対応の難しさを助長している場合がある。

把握できていない場所で mixed contents が発生するまま HTTPS に移行すると、広告が表示されないなどの問題が起こってしまう。

特にコンテンツが多いサービスでは、実際にどこで mixed contents が発生しているのかを知ることができれば、コンテンツの修正を進めることができ、 HTTPS 化を進める上でも役に立つだろう。


まず、 `Upgrade-Insecure-Request` は、 URL を書き換えることでサーバにリクエストを発行するため、もしサーバが対応していなければサーバ側に 404 のログを残すことができる。
これにより、コンテンツサーバの中で HTTPS 化が済んでいない URL を発見することに役立つだろう。

次に、 `Block-All-Mixed-Contents` は、 mixed contents が発生した場合にそれが Active/Passive どちらであれレポートを生成する。
しかし、いきなり全てがブロックされては困るので、 `Block-All-Mixed-Contents-Report-Only` を用いることで、挙動を変えないままレポートだけを収集し可視化することができるだろう。

こうしたヘッダの挙動を利用し、 Staging 環境で自動化した実ブラウザからアクセスしたり、限定的なユーザにサービスを提供することで、サービス内の mixed contents の状況を可視化する一助となるだろう。


## iframe の中の mixed contents

`Block-All-Mixed-Contents` の report によって http で埋め込まれた iframe は検出することができるようになったが、これで全ての mixed contents が見つけられるわけではない。

一番厄介なのは iframe で読み込まれたドキュメントが含むサブリソースによる mixed contents である。

広告は入れ子の iframe で作られているものが多い。

![典型的な nested iframe](iframe.png 'ディスプレイ広告の基礎とセキュリティ(P7) by Kenta Suzuki')

[ディスプレイ広告の基礎とセキュリティ(P7) by Kenta Suzuki](https://speakerdeck.com/suzuken/deisupureiguang-gao-falseji-chu-tosekiyuritei)


iframe 自体を https で読み込んでいても、ネストした iframe 内に http で読み込まれるサブリソースがあると、大元のドキュメントは mixed contents 扱いになる。

[DEMO: mixed iframe](https://labs.jxck.io/mixed/iframe.html)


もし大元のコンテンツに `Upgrade-Insecure-Request` をつければ、 iframe 内のサブリソースも全て https に読み替えられるため、サーバが対応していればそれで済む。


[DEMO: upgrade insecure request iframe](https://labs.jxck.io/mixed/iframe.html?upgrade-insecure-request)


また、 `Block-All-Mixed-Contents` をつければ、 iframe 内のサブリソースはブロックされるため、 mixed contents を回避することはできる。
しかし、 **ネストした iframe 内の mixed contents をブロックしても report は発生しない**。

もし iframe の内側の mixed contents まで report ができてしまうと、その内容を把握できる可能性などセキュリティ上問題があるからだ。

[DEMO: block all mixed contents iframe](https://labs.jxck.io/mixed/iframe.html?block-all-mixed-content)


つまり広告配信プラットフォームが提供する広告用の iframe 自体が https に対応していても、そこの入稿される広告コンテンツ本体のどこかに一つでも https 非対応なものがあれば、 mixed contents は避けられない。

したがって、広告配信プラットフォームが `Upgrade-Insecure-Request` や `Block-All-Mixed-Contents` などに対応し、広告の入稿時点で mixed contents の発生を抑止するといった対応以外には、コンテンツ側での対応には限界がある。


## まとめ

mixed contents は HTTPS 化する上での悩みのタネになることが多い。

問題は、ハードコードされた URL の書き換えの可否と、 mixed contents の発生状況の把握が難しいという部分にあると考えられる。

CSP のいくつかは、こうした問題への対応や、状況を把握することによるリスクの分析を可能にする。

今から作るなら最初から HTTPS にすれば良いが、既存の価値ある資産を正しく HTTPS 化していくうえで、参考になることを期待する。
