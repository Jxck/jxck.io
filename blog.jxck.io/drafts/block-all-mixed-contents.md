# [csp][mixed contents] mixed contents に

## Intro

HTTPS 移行の問題点の一つに、 mixed contents への対応がある。
upgrade-insecure-request による

CSP のディレクティブに block-all-mixed-contents


## mixed contents

HTTPS で配信されたコンテンツが、サブリソースとして HTTP のコンテンツを含む場合、これを mixed contents という。

HTTPS 化されたコンテンツは MITM に対する耐性があるが、そこに含まれるサブリソースが HTTP で配信されると MITM への耐性がないため、そこを起点に HTTPS コンテンツへの攻撃が成立してしまう可能性がある。

このため mixed contents は、完全に安全とは言えず、ブラウザ上は通常の HTTPS コンテンツとは異なる扱いになる。

mixed contents は、 HTTPS コンテンツに含まれる HTTP コンテンツが MITM により改ざんされた場合の影響によって、二つに分類される。


## Mixed Active(Script) Contents

以下のタグ、及びスクリプト等は、 Mixed Active Contents と呼ばれる。

```html
<script src>
<link href>
<iframe src>
<object data>
XHR
CSS 内の URL (@font-face, background-image etc)
```

Mixed Active Contents は、 HTTP で配信され MITM の攻撃によって改ざんされた場合、それを読み込む元コンテンツ自体を書き換えることができてしまう。
このため、こうしたコンテンツの読み込みはブラウザによりブロックされ、取得されずにエラーとなる。

特に iframe を埋め込むタイプの広告の場合、 HTTP で配信される広告を HTTPS のページに埋め込むと、広告が表示されないことになる。

アドプロバイダの HTTPS 対応は進んでいるとはいえ、広告が表示されないことは実益に影響する場合が多いため、これが原因で HTTPS 化ができないサービスも少なからずある。


## Mixed Passive(Display) Contents

以下のタグは、基本的にコンテンツを表示する目的で使われる。

```html
<img>
<audio>
<video>
<object>
```

もし、 `<img>` で読まれるコンテンツが HTTP であり、 MITM によって改ざんされた場合、別の画像を表示することで元コンテンツを汚染することが可能だ。
しかし、そこを経由して元コンテツの他の DOM に変更を及ぼすことはできない。

そのため、これらコンテンツの読み込み自体は行われるが、ブラウザの URL バーは異常を検知したような表示になる。

特に EV 証明書で、 URL バーに組織名を表示しているような場合は、たとえコンテンツが表示されていたとしても、無視できない問題となってくる。


## Upgrade Insecure Request

CSP の Upgrade Insecure Request を付与した場合、ブラウザは HTTPS コンテンツに埋め込まれた `http://` スキームのリンクを、 `https://` に読み替えて発行する。

これにより、コンテンツサーバが HTTPS に対応していたとしても、読み込む側がリクエストする URL のスキームを書き換えられない場合に、ヘッダだけで対応を終えることができる。

コンテンツが膨大すぎて URL の書き換えが困難なサイトや、 CGM でありユーザが作ったコンテンツを勝手に書き換えることができない場合は、有効な手段の一つとなるかもしれない。

しかし、実質的には解決していないため、理想は全てのコンテンツを修正したいところだ。


## Block All Mixed Contents

もし Mixed Passive Contents であっても、 MITM により改ざんされることが多大な影響を及ぼす場合もあるだろう。

この場合は、 CSP の Block-All-Mixed-Contents を有効にすることで、 Passive も Active 同様にブラウザがブロックすることができる。

ユーザにとってはコンテンツが壊れることになるが、 MITM が発生している可能性があるとすれば、妥当な挙動といえるかもしれない。

また、 CSP の reporting に対応しているため、 block が発生した場合にそのことを指定した URI にレポートすることができる。


## CSP を用いた mixed contents の検出

mixed contents により広告が表示されなくなる問題などについては、実際にどの程度そうした自体が発生するのかがわからないという点が、対応の難しさを助長している。

実際にどこで mixed contents が発生しているのかを知ることができれば、コンテンツの修正を進めることができ、 HTTPS 化を進める上でも役に立つだろう。

この場合 Block-All-Mixed-Contents-Report-Only を用いて、レポートだけを収集することで、ある程度
