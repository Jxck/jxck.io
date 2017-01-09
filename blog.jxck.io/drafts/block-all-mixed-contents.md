# [csp][mixed contents] mixed contents の理解と可視化の方法

## Intro

HTTPS 移行の問題点の一つに、 mixed contents への対応がある。

逆に mixed contents の発生を恐れ、 HTTPS に移行できないサービスもあるだろう。

問題は mixed contents が「どこで発生しているかわかりにくい」という場合もあるため、そこで利用できる可能性のある Upgrade-Insecure-Request および、 CSP の Block-All-Mixed-Contents を解説する。


## mixed contents

HTTPS で配信されたコンテンツが、サブリソースとして HTTP のコンテンツを含む場合、これを **mixed contents** という。

HTTPS 化されたコンテンツは MITM に対する耐性があるが、そこに含まれるサブリソースが HTTP で配信されると、 MITM への耐性がないため、そこを起点に HTTPS コンテンツへの改ざんが成立してしまう可能性がある。

このため HTTPS で配信されていても、 mixed contents がある場合は完全に安全とは言えず、ブラウザは通常ユーザに安全ではないことを警告する。

具体的には、多くのブラウザが URL バーの表示を変更し、ユーザに注意を促すようになる。


TODO: image

[DEMO: mixed contents](https://labs.jxck.io/mixed/mixed.html)


また、コンテンツの挙動も変更される。
mixed contents 自体が HTTPS コンテンツに含まれる HTTP コンテンツが MITM により改ざんされた場合の影響によって、二つに分類されており、それによって挙動が変わる。


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

これら Mixed Active Contents は、 HTTP で配信され MITM の攻撃によって改ざんされた場合、それを読み込む元コンテンツ自体を書き換えることができてしまう。
このため、こうしたコンテンツの読み込みはブラウザによりブロックされ、取得されずにエラーとなる。

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

### Upgrade-Insecure-Request

CSP の Upgrade-Insecure-Request を付与した場合、ブラウザは HTTPS コンテンツに埋め込まれた `http://` スキームのリンクを、 `https://` に読み替えて発行する。

コンテンツからは HTTP のリクエストが発生しないため、どんなコンテンツであっても URL バーは安全であるという表示になる。

もちろん、サーバ側が同じコンテンツを https で配布していなければ 404 になる代わりに、絶対に mixed contents にならないのがこのヘッダの特徴である。

これにより、コンテンツサーバが HTTPS に対応していたとしても、読み込む側がリクエストする URL のスキームを書き換えられない場合に、ヘッダだけで対応を終えることができる。

コンテンツが膨大すぎて URL の書き換えが困難なサイトや、 CGM でありユーザが作ったコンテンツを勝手に書き換えることができない場合は、有効な手段の一つとなるかもしれない。

しかし、対応していないブラウザでは問題が解決しないため、理想はコンテンツ内の全てのリンクを修正したいところだ。

[DEMO: Upgrade-Insecure-Request](https://labs.jxck.io/mixed/mixed.html?upgrade-insecure-request)


### Block-All-Mixed-Contents

たとえ Mixed Passive Contents であったとしても、 MITM により改ざんされることが多大な影響を及ぼす場合もあるだろう。

この場合は、 CSP の Block-All-Mixed-Contents を有効にすることで、 Passive でも Active 同様にブラウザにブロックさせることができる。

これにより、ユーザが改ざんされたコンテンツを表示することを防ぐことが可能となる。

ユーザにとってはコンテンツが壊れる(画像などが表示されない)ことになるが、 MITM が発生している可能性があるとすれば、妥当な挙動といえるかもしれない。

また、 CSP の reporting に対応しているため、 block が発生した場合にそのことを指定した URI にレポートすることができる。

[DEMO: Block-All-Mixed-Contents](https://labs.jxck.io/mixed/mixed.html?block-all-mixed-content)


### mixed contents の発生状況を収集する

mixed contents により広告が表示されなくなる問題などについては、実際にどの程度そうした自体が発生するのかがわからないという点が、対応の難しさを助長している場合がある。

把握できていない場所で mixed contents が発生するまま HTTPS に移行すると、広告が表示されないなどの問題が起こってしまう。

特にコンテンツが多いサービスでは、実際にどこで mixed contents が発生しているのかを知ることができれば、コンテンツの修正を進めることができ、 HTTPS 化を進める上でも役に立つだろう。


まず、 Upgrade-Insecure-Request は、 URL を書き換えることでサーバにリクエストを発行するため、もしサーバが対応していなければサーバ側に 404 のログを残すことができる。
これにより、コンテンツサーバの中で HTTPS 化が済んでいない URL を発見することに役立つだろう。

次に、 Block-All-Mixed-Contents は、 mixed contents が発生した場合にそれが Active/Passive どちらであれレポートを生成する。
しかし、いきなり全てがブロックされては困るので、 Block-All-Mixed-Contents-Report-Only を用いて、レポートだけを収集することで、挙動を変えないままレポートだけを収集し可視化することができるだろう。

こうしたヘッダの挙動を利用し、 Staging 環境で自動化した実ブラウザからアクセスしたり、限定的なユーザにサービスを提供することで、サービス内の mixed contents の状況を可視化する一助となるだろう。


## iframe の中の mixed contents

Block-All-Mixed-Contents の report によって http で埋め込まれた iframe は検出することができるようになったが、これで全ての mixed contents が見つけられるわけではない。

一番厄介なのは iframe で読み込まれたドキュメントが含むサブリソースによる mixed contents である。

広告は入れ子の iframe で作られているものが多い。


[ディスプレイ広告の基礎とセキュリティ(P7) by Kenta Suzuki ](https://speakerdeck.com/suzuken/deisupureiguang-gao-falseji-chu-tosekiyuritei)


iframe 自体を https で読み込んでいても、ネスとした iframe で http で読み込まれるサブリソースがあると、大元のドキュメントは mixed contents 扱いになる。

[DEMO: mixed iframe](https://labs.jxck.io/mixed/iframe.html)


もし大元のコンテンツに upgrade-insecure-request をつければ、 iframe 内のサブリソースも全て https に読み替えられるため、サーバが対応して入ればそれで済む。


[DEMO: upgrade insecure request iframe](https://labs.jxck.io/mixed/iframe.html?upgrade-insecure-request)


また、 Block-All-Mixed-Contents をつければ、 iframe 内のサブリソースはブロックされるため、 mixed contents を回避することはできる。
しかし、 **ネストした iframe 内の mixed contents をブロックしても report は発生しない**。

もし iframe の内側の mixed contents まで report ができてしまうと、その内容を把握できる可能性などセキュリティ上問題があるからだ。

[DEMO: block all mixed contents iframe](https://labs.jxck.io/mixed/iframe.html?block-all-mixed-content)


つまり広告配信プラットフォームが提供する広告用の iframe 自体が https に対応していても、そこの入稿される広告コンテンツ本体のどこかに一つでも https 非対応なものがあれば、 mixed contents は避けられない。

したがって、広告配信プラットフォームが Upgrade-Insecure-Request や Block-All-Mixed-Contents などに対応し、広告の入稿時点で mixed contents の発生を抑止するといった対応以外には、コンテンツ側での対応には限界がある。


## まとめ

広告に限らず、 mixed contents は HTTPS 化する上での悩みのタネになることが多い。

問題の一つは、自身のコンテンツにおいて、 mixed contents の発生状況の把握が難しいという部分にあると考えられる。

把握ができれば、対応の検討や、リスクの分析が可能になる。

これらブラウザの持つ機能は、そうした場面で有効な手段となるのではないだろうか。
