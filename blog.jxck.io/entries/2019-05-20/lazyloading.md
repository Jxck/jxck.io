# [lazyload][image][performance] 画像最適化戦略 Lazy Loading 編

## Intro

長らく議論されてきた `<img>` や `<iframe>` における Lazyload について、仕様と実装が動きを見せている。

ここでは、特に画像 `<img>` に注目し、 Lazyloading の議論の変遷を踏まえた上で現状を解説する。

画像最適化シリーズ第 5 回目のエントリである。

1. [画像最適化戦略 PNG/JPEG 編](https://blog.jxck.io/entries/2016-03-24/optimize-image.html)
1. [画像最適化戦略 Picture 編](https://blog.jxck.io/entries/2016-03-25/picture.html)
1. [画像最適化戦略 WebP 編](https://blog.jxck.io/entries/2016-03-26/webp.html)
1. [画像最適化戦略 SVG/Font 編](https://blog.jxck.io/entries/2016-03-27/svg-font-base-ui.html)
1. [> 画像最適化戦略 Lazy Loading 編](https://blog.jxck.io/entries/2019-05-20/lazyloading.html)


## Lazyloading

画像や iframe の埋め込みは、読み込むサイズも大きく、処理が同期であるため、レンダリングのボトルネックになりやすく、それらが多いページでは初期表示の遅延の原因となることが多くあった。

特に縦に長いページでは、最初にユーザが見えている領域 (Above the Fold) では表示されている必要があるが、スクロールしないと見えない領域 (Below the Fold) では、スクロールするまで読み込みを遅延することで、初期表示の高速化につなげる手法が求められていた。

このように、必要になるまで読み込まない方法は *Lazy Loading* と呼ばれ、従来は onscroll や IntersectionObserver で監視する JS で実装されることが多かった。

この機能を、 HTML の仕様に取り込み、 `<img>` や `<iframe>` タグに属性を記述するだけで、ブラウザが遅延読み込みを実現してくれるのが LazyLoading の提案である。

アイデア自体は古くからあったが、紆余曲折を経て最近実装が進みつつある。

- [Intent to Ship: Lazily load below-the-fold images and iframes](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/jxiJvQc-gVg)


## spec history

もともと、 IE は `lazyload` 属性を早い段階で実装しており、値は Integer `0`/`1` を指定し `1` の場合は *他よりも優先度を下げる* という仕様だった。


```html
<img src="example.jpg" lazyload="1">
```

- [lazyload attribute \| lazyload property (Internet Explorer)](http://web.archive.org/web/20160313082908/https://msdn.microsoft.com/library/dn369270(v=vs.85).aspx)

これを標準仕様に起こす作業が行われ、 Resource Priorities という形でまとめられた。

- [Resource Priorities](http://web.archive.org/web/20170808155035/https://w3c.github.io/web-performance/specs/ResourcePriorities/Overview.html)

この時点では、 lazyload 以外に postpone も定義されており、以下のような使い分けだった。

lazyload
: ネットワーク専有の優先度を下げる(ネットワークが空けばロードはされる)

postpone
: 表示が必要になるまでダウンロードしない

なお、この時点では Boolean Attribute になっていたため、値を書くだけで有効になる。

(この使い分けで言うと、今の loading=lazy の挙動は postpone に近く、 lazyload は別途提案されている importance 属性による priority hints の方が近そうだ)


```html
<img src="example.jpg" lazyload>
<img src="example.jpg" postpone>
```

Chrome がこの仕様の着手として Intent to Implement をアナウンスしたのは 2013 年だったため、かなり昔から話はあったということがわかるだろう。そしてこの時点でも、「まだ実装できるほど仕様が安定していない」というコメントが付いている。

まだ、 postpone 属性を消すかどうかという時期だったようだ。

- [Intent to Implement: lazyload attribute](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7ZBt9rQqjtM/3VdCW0c3bL0J)

このころ、気の早いライブラリは、 Boolean の `lazyload` 属性を実装していたため、この仕様を何かしらで見たことがある人も多いかと思うが、結論から言うと最新の仕様は変更されたため注意が必要だ。


## loading=lazy

[色々あり](https://github.com/whatwg/html/pull/3752#issuecomment-472181420) 、 lazyload 属性は [loading 属性](https://github.com/whatwg/html/pull/3752#issuecomment-478200976) に変わり、今の最新の仕様は以下にある。

- [Blink LazyLoad Design Doc (public)](https://docs.google.com/document/d/1e8ZbVyUwgIkQMvJma3kKUDg8UUkLRRdANStqKuOIvHg/edit#)
- [scott-little/lazyload](https://github.com/scott-little/lazyload)

現時点では以下の値が定義されている。

lazy
: 遅延ロード可能であることを示す

eager
: 遅延ロード可能ではないことを示す

auto
: デフォルト、ブラウザに判断を委ねる

省略時は auto とみなされる。

この仕様について注意したいのは、ブラウザの裁量が大きいことだ。

例えば lazy 属性はあくまでも遅延ロードを許容する/可能であることをブラウザに伝えるものであり、仕様上はブラウザに挙動を矯正するものではない。

極端に言えば、ネットワークや表示の状況などをふまえてそれらの指定を上書きする余地も残っている。

またデフォルトが auto であることも重要だ。

基本的には全ての画像はペイロードが大きいため、必要になったタイミングで取得されるのが望ましいと考えれば、 `<img>` はデフォルトで lazy であるのが理想だ。

ブラウザもそのような実装に向けて実験を繰り返していたが、壊れる既存コンテンツの存在もあり一筋縄ではいかない状況があるようだ。

もしここでデフォルトを eager にしてしまうと、実装の改善によって挙動を変える余地が無くなってしまう。

将来的にブラウザ側に知見が蓄積されれば、既存のコンテンツであっても、その構成などを解析し、壊れるものは eager 可能なものは lazy に読むといった取り分けができる可能性も有る。

そこで、そのようなブラウザの裁量を残すためにデフォルト時の挙動を仕様で規定しきらず、実装に任せる判断にしていると解釈ができる。


## DEMO

動作するデモを以下に用意した。

- <http://labs.jxck.io/lazyload/>

今回は、画像の Lazyload の挙動を、 Chrome 75 + Flag の実装を用いて確認してみる。

デモとして、画像を 10 個並べたページを用意し  `loading=lazy` の有無による挙動を比較する。


### eagerload

`loading=eager` の場合は、全ての画像が取得され、そこで onload が発火する。

![Eager Load で複数画像を読み込んだ場合の挙動を Dev Tools の Network タブで見たところ](eagerload.png#1366x768 'eager loading images')


### lazyload

`loading=lazy` の場合は、全ての画像に対して Range Request で先頭 2.0KB のみを取得するリクエストを投げる。

レスポンスは 206 で画像のヘッダ分取得され、そこには大抵サイズの情報が入っているため、`<img>` タグのサイズが決定できる。

次に Above the fold だけ画像全体を取得している。

実際に Window に表示されている画像は 1 つだが、ここでは最初の 6 つが取得されている。(このロジックはブラウザの実装依存)

この 6 つの画像が取得された段階で `window.onload` が発火しているため、発火までの時間も早くなっている。

![Lazy Load で複数画像を読み込んだ場合の挙動を Above the Fold に注目して Dev Tools の Network タブで見たところ](lazyload-above.png#1366x768 'lazyloading images focusing above the fold')

あとは、スクロールに従って残りの `<img>` が Viewport に近づくと、その画像の全体を再度取得する。

![Lazy Load で複数画像を読み込んだ場合の挙動をスクロール後の Below the Fold に注目して Dev Tools の Network タブで見たところ](lazyload-below.png#1366x768 'lazyloading images focusing below the fold')

同じ検証の動画を以下に付記しておく。


<iframe src="https://www.youtube.com/embed/4rN1dzeXR4A" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



### 現時点での挙動

まだ Canary での検証であり、実装および最適化は今後進んでいくだろうと期待できるため、 *現時点の挙動に深く依存するのは推奨しない* 。

Blink での実装については一部が以下に書かれている。

[Blink LazyImages (public)](https://docs.google.com/document/d/1jF1eSOhqTEt0L1WBCccGwH9chxLd9d1Ez0zo11obj14/)

これらを踏まえた上で、現時点の挙動について記録しておく。


### Range + Full request RTT

まず、全てのリクエストが Range + Full で 2 回発生しているため、特に最初は従来よりも RTT が増えることになる。

これは Above / Blow 関係なく発生しているため、もし全ての画像が Above the Fold に収まっていた場合は、 Lazy をつけると無駄に RTT が増えるだけであるとを意味する。

仮に、最初の Range で取得した 2.0KB のレスポンスに合成するために 2.0KB 以降から If-Range などで Conditional GET し、結合するという実装も考えられなくはないが、そうはなっていないようだ。

[RFC 7233 - Hypertext Transfer Protocol (HTTP/1.1): Range Requests 4.3 Combining Ranges](https://tools.ietf.org/html/rfc7233#section-4.3)


### Lazy for small img

画像によらず最初に 2.0KB のリクエストを投げるため、画像全体が 2.0KB 以下の場合を検証した。

Above the Fold の画像は、最初の Range Request で全体が取得済みにもかかわらず、直後に 2 回目の取得をしている。

Below the Fold の画像は、キャッシュがヒットしている、というよりは最初に取得された画像がすでに表示されているように見える。

ここは、実装次第では Above the Fold も最初のリクエストで充足できそうに思える。


### Above the Fold

ブラウザは内部で View Port の情報を持っているため、正確に Above the Fold を割り出し、必要な img のみを読むことは不可能ではないだろう。

そこに加えて、スクロールした場合を考えて、直近の画像を読んでおくというのは妥当な選択と考えられる。

しかし、 Below the Fold のために取得するリクエストが、筆者が思った以上には多く有る。

本サイトで検証したところ、かなり長いページを除き、画像がある多くのページは、遅延されず最初に読み込まれてしまっている。

この数(Above the Fold の判定ロジック)も、実装に依存し、各ブラウザが実験を重ねて決めていくことになるだろう。


### 2.0KB Request

最初のリクエストが 2.0KB である理由については以下に書かれている。

[Design Doc: Image Replacement in Blink (public)](https://docs.google.com/document/d/1691W7yFDI1FJv69N2MEtaSzpnqO2EqkgGD3T0O-pQ08/)

2.0KB 分、画像のヘッダを取得することにより、画像のサイズ情報が取得できるため、 `<img>` のサイズが決まるということだ。

ただし、 2.0KB は、決して小さくない。

これをどこまで小さくできるは事前にはわからず、小さくしすぎて欲しい情報が入っていなければ、無駄足になる。

サイズを知りたいだけなら `<img>` に width/height もしくは intrinsicsize を指定すれば問題なさそうだが、明示してもヘッダの取得は走るようだ。

逆に width/height などから `<img>` のサイズが確定できれば、将来この Range リクエストは不要にできる可能性があると考えている。

しかし、それでは HTML に手を入れられないコンテンツで lazyload をしたいと場合に、 2.0KB リクエストは防げないことになる。

素人考えだと、 HTTP HEAD リクエストを発行させる属性を `<img>` に追加し、 `Image-Size: 200x300` などのヘッダを返すといったこともできなく無い気がするがどうなのだろうか。

この辺は、もう少し勉強してから、必要があれば issue などで議論したい。


### 考察

以上のように、 *現時点での Chrome の Lazyload 実装* は、まだ荒削りであり、ページの Height が短い、 2.0KB 以下の画像が多く含まれている、といったページなどではオーバーヘッドが大きそうだ。

しかし、この実装はあくまで現時点でのものであり、もちろん *改善は進むため* この挙動に深く依存する実装はすべきではないが、注意すべき課題も見えてくる。

今後他のブラウザも実装を進めるとした場合、確認ポイントとしては、上述の観点が役に立ちそうであるため、それを踏まえて注視したいと考える。

- Above the Fold 判定
- Range の結合
- Range 取得のサイズ
- Range Request を無くす方法


## Feature Policy

HTML に手を入れずに HTTP Header で挙動を指定できるように、 Feature Policy も提案されている。

- [loading-image-default-eager](https://github.com/w3c/webappsec-feature-policy/blob/master/policies/loading-image-default-eager.md)
- [loading-frame-default-eager](https://github.com/w3c/webappsec-feature-policy/blob/master/policies/loading-frame-default-eager.md)
- [Feature Policy: lazyload - Issue #193](https://github.com/w3c/webappsec-feature-policy/issues/193)

一括で挙動を変えると、 Analytics で動的に埋め込む `<img>` でリクエストが二回発生し、測定がずれるといった問題も想像される。

Blink では、こうしたケースを [ヒューリスティックに解析し回避する](https://docs.google.com/document/d/1jF1eSOhqTEt0L1WBCccGwH9chxLd9d1Ez0zo11obj14/edit#heading=h.cx8y0v73akfi) といったことも書かれているが、結果は実装に依存するだろう。


## Priority Hints

`loading=lazy` が取得の遅延であることに対して、優先度を下げるための Priority Hints が別途提案されている。

- [Priority Hints](https://wicg.github.io/priority-hints/)

これは、 HTTP2 の Stream Priority の分配などに対してヒントを与える提案である。

実際に遅延を行うと onload の発火タイミングが変わるといった挙動の大きな変化が発生するが、 Priority Hints であれば、実装にもよるが、そうした変化が少ないことが期待される。

既存のコンテンツの性質や相性によっては、こちらの方が導入しやすい可能性もあり、合わせて検討できるだろう。

この仕様についての詳細は、別のエントリに記す。


## Loading 属性の導入

究極的には、画像の最適な取得方法の選択はブラウザに託し、こちらで必要以上に挙動を矯正しないほうが良い場合が多いだろうと筆者は考えている。

今は lazy が最適なように感じられるが、将来より良い手法が何かしら確立し、仕様に盛り込まれた場合、明示的に lazy にしてしまっているものの挙動を、ブラウザは変えられないだろう。

したがって、現時点での実装をベースに検討した結果、 1 つ 1 つの画像に lazy/eager を付けて回るといった改修は、筆者はあまり推奨しない。

現時点では、 Below the Fold の読み込みが明白なボトルネックになっている場合や、その解決のために JS による Lazyload を導入しているといった場合に、それを置き換えるのは妥当だ。しかし、それ以外は余計な指定をせず、ブラウザの実装に委ねることで、将来的な最適化の恩恵を素直に受けられるだろう。

特に、現在の実装が素の `<img>` で特に問題になってない場合、急いで全てに lazy を付けて回るべきかと言うと、筆者はそうは考えていない。(Lighthouse はそうしろと言うかもしれないが)

loading 属性が仕様に入ったことは、ブラウザが従来の挙動に最適化を加える宣言をしたと捉え、早急な最適化を焦って行うより基本はブラウザに任せるほうが、長い目で見ればうまく行くのでは無いだろうか。


## 本サイトへの適用

本サイト自体が検証するために存在するサイトなので、ここでは積極的に属性を付与していく。

そもそも本サイトは、以前から既に、記事中(`<article>`)の全ての `<img>` と `<iframe>` に旧 `lazyload` 属性を付与して挙動の検証を行ってきた。

そこで、今回の更新を受けて、全ての `lazyload` 属性を `loading=lazy` に置換を実施した。

また、 `<article>` 外で必ず Above the Fold に入る `<header>` に並んでいる画像については `lazyload` を付与していなかったが、今回の更新を受け全てに `loading=eager` を明示的に付与した。

HTML を AMP 用に変換して運用しているが、ここは lazyload 時代から不要なものとされているため、無視してくれれば良いものをわざわざ削っている。

- [lazyload for `<amp-iframe>`](ampproject/amphtml https://github.com/ampproject/amphtml/issues/19443)

この状態で、今後も挙動を検証していくこととする。
