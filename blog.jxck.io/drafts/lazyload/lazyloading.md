# 画像最適化戦略 Lazy Loading 編

## Intro

長らく議論されてきた `<img>` や `<iframe>` における Lazyload について、仕様と実装が動きを見せている。

ここでは、特に画像に注目し、 Lazyloading の議論の変遷を踏まえた上で現状を解説する。

+ [画像最適化戦略 PNG/JPEG 編](https://blog.jxck.io/entries/2016-03-24/optimize-image.html)
+ [画像最適化戦略 Picture 編](https://blog.jxck.io/entries/2016-03-25/picture.html)
+ [画像最適化戦略 WebP 編](https://blog.jxck.io/entries/2016-03-26/webp.html)
+ [画像最適化戦略 SVG/Font 編](https://blog.jxck.io/entries/2016-03-27/svg-font-base-ui.html)
+ [> 画像最適化戦略 Lazy Loading 編](https://blog.jxck.io/entries/2019-04-26/lazyloading.html)


# Lazy Load

Intent to Implement: Feature Policy 'lazyload' - Google グループ

https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/yCGhf7EA1Zs

feature-policy/lazyload.md at master · WICG/feature-policy

https://github.com/WICG/feature-policy/blob/master/policies/lazyload.md

HTML Standard

https://whatpr.org/html/3752/urls-and-fetching.html#lazy-loading-attributes

https://bugs.chromium.org/p/chromium/issues/detail?id=869492&desc=2

https://www.chromestatus.com/features/5641405942726656

https://github.com/WICG/feature-policy/issues/193

amp-iframe には lazyload があると invalid

https://github.com/ampproject/amphtml/issues/19443

単に変換している場合は削らないとエラー

Intent to Ship: Lazily load below-the-fold images and iframes - Google グループ 

https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/jxiJvQc-gVg

画像や iframe の埋め込みは、読み込むサイズも大きく、処理が同期であるため、レンダリングのボトルネックになりやすく、それらが多いページでは初期表示の遅延の原因となることが多くあった。


## Lazyloading



特に縦に長いページでは、最初にユーザが見えている領域 Above the Fold では表示されている必要があるが、スクロールしないと見えない領域 Below the Fold では、スクロールするまで読み込みの遅延を行うことで、最初に取得するサブリソースを減らし、初期表示の高速化につなげる手法が求められていた。

このように、必要になるまで読み込まない方法は "Lazy Loading" と呼ばれ、従来は JS による scroll の検知や、 IntersectionObserver で実装されることが多かった。

この機能を、 HTML の仕様に取り込み、 `<img>` や `<iframe>` タグに属性を記述するだけで、ブラウザが遅延読み込みを実現してくれるのが LazyLoading の提案である。

アイデア自体は古くからあったが、紆余曲折を経て最近実装が進みつつある。


## spec history

もともと、 IE は `lazyload` 属性を早い段階で実装しており、値は Integer `0`/`1` を指定し `1` の場合は「他よりも優先度を下げる」という仕様だった。


```html
<img src="example.jpg" lazyload="1" />
```

lazyload attribute | lazyload property (Internet Explorer)

http://web.archive.org/web/20160313082908/https://msdn.microsoft.com/library/dn369270(v=vs.85).aspx

これを標準仕様に起こす作業が行われ、 Resource Priorities という形でまとめられた。

Resource Priorities

http://web.archive.org/web/20170808155035/https://w3c.github.io/web-performance/specs/ResourcePriorities/Overview.html

この時点では、 lazyload 以外に postpone も定義されており、以下のような使い分けだった。

- lazyload: ネットワーク専有の優先度を下げる(ネットワークが空けばロードはされる)
- postpone: 表示が必要になるまでダウンロードしない

なお、この時点では Boolean Attribute になっていたため、値を書くだけで有効になる。


```html
<img src="example.jpg" lazyload>
<img src="example.jpg" postpone>
```

Chrome がこの仕様の着手として Intent to Implement をアナウンスしたのは 2013 年だったため、かなり昔から話はあったということがわかるだろう。そしてこの時点でも、「まだ実装できるほど仕様が安定していない」というコメントが付いている。

まだ、 postpone 属性を消すかどうかという時期だったようだ。

- Intent to Implement: lazyload attribute
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7ZBt9rQqjtM/3VdCW0c3bL0J>

このころ、気の早いライブラリは、 Boolean の `lazyload` 属性を実装していたため、この仕様を何かしらで見たことがある人も多いかと思うが、結論から言うと最新の仕様は変更されたため注意が必要だ。


## loading=lazy

色々あり、今の最新の仕様は以下にある。

- [Blink LazyLoad Design Doc (public)](https://docs.google.com/document/d/1e8ZbVyUwgIkQMvJma3kKUDg8UUkLRRdANStqKuOIvHg/edit#)
- [scott-little/lazyload](https://github.com/scott-little/lazyload)


新しく loading 属性が追加され、現時点では以下の値が定義されている。

- lazy: 遅延ロード可能であることを示す
- eager: 遅延ロード可能ではないことを示す
- auto: デフォルト、ブラウザに判断を委ねる


省略時は auto とみなされ、 lazy を途中で eager に変えたらロードを開始する。

この仕様について注意したいのは、ブラウザの裁量が大きいことだ。

例えば lazy 属性はあくまでも遅延ロードを許容する/可能であることをブラウザに伝えるものであり、仕様上はブラウザに挙動を矯正するものではない。

極端に言えば、ネットワークや表示の状況などをふまえてそれらの指定を上書きする余地も残っている。

またデフォルトが auto であることも重要だ。

基本的には全ての画像は必要になったタイミングで取得されるのが望ましいと考えれば、 `<img>` はデフォルトで lazyload であるのが理想だ。

ブラウザもそのような実装に向けて実験を繰り返していたが、壊れる既存コンテンツの存在もあり一筋縄ではいかない状況だ。

もしここでデフォルトを eager にしてしまうと、実装の改善によって挙動を変える余地が無くなってしまう。

将来的にブラウザ側に知見が蓄積されれば、既存のコンテンツであっても、その構成などを解析し、壊れるものは eager 可能なものは lazy に読むといった取り分けができる可能性も有る。

そこで、そのようなブラウザの裁量を残すためにデフォルト時の挙動を仕様で規定しきらず、実装に任せる判断にしていると解釈ができる。


## Chrome 75 + Flag

今回は、画像の Lazyload の挙動を、 Chrome 75 + Flag の実装を用いて確認してみる。

デモとして、画像を 10 個並べたページを用意し  `loading=lazy` の有無による挙動を比較する。

デモは以下に用意した。

- <http://labs.jxck.io/lazyload/>


### eagerload

`loading=eager` の場合は、全ての画像が取得され、そこで onload が発火する。

![Eager Load で複数画像を読み込んだ場合の挙動を Dev Tools の Network タブで見たところ](eagerload.png 'eager loading images')


### lazyload

`loading=lazy` の場合は、全ての画像に対して Range Request で先頭 2.0KB のみを取得するリクエストを投げる。

レスポンスは 206 で画像のヘッダ部分取得され、そこには大抵サイズの情報が入っているため、`<img>` タグのサイズが決定できる。

次に Above the fold だけ画像全体を取得している。

実際に Window に表示されている画像は 1 つだが、ここでは最初の 6 つが取得されている。(このロジックはブラウザの実装依存)

この 6 つの画像が取得された段階で window.onload が発火しているため、発火までの時間も早くなっている。

![Lazy Load で複数画像を読み込んだ場合の挙動を Above the Fold に注目して Dev Tools の Network タブで見たところ](lazyload-above.png 'lazyloading images focusing above the fold')

あとは、スクロールに従って残りの `<img>` が Viewport に近づくと、その画像の全体を再度取得する。

![Lazy Load で複数画像を読み込んだ場合の挙動をスクロール後の Below the Fold に注目して Dev Tools の Network タブで見たところ](lazyload-below.png 'lazyloading images focusing below the fold')

同じ検証の動画を以下に付記しておく。


<video src=lazyload.mov controls></video>



### 現時点での挙動

まだ Canary での検証であり、実装および最適化は今後進んでいくだろうと期待できるため、現時点の挙動に深く依存するのは推奨しない。

というのを踏まえた上で、現時点の挙動について記録しておく。

まず、全てのリクエストが Range + Full で 2 回発生しているため、特に最初は従来よりも RTT が増えることになる。

サイズを知りたいだけなら `<img>` に width/height を指定すれば問題なさそうだが、明示してもヘッダの取得は走るようだ。

逆に width/height が明示されていれば、将来この Range リクエストは不要にできる可能性は考えられる。

また、合わせて画像が 2.0KB 以下の場合を検証したところ、最初の Range Request で全体が取得済みにもかかわらず、やはり 2 回取得している。

206 ではなく 200 をキャッシュしたいなどの理由でこのような実装になってしまうのだろう。

206 は微妙にキャッシュと相性が悪く、 Service Worker でも扱いに困る部分がでるため、ここは少し注意したいところだ。

また、 Above the Fold のためのリクエストが意外と多くあった。

ブラウザは内部で View Port の情報を持っているため、まさしく表示されている 1 つだけを取ることも可能だろうが、余裕を見てそうしていないと推測できる。

この数(Above the Fold の判定ロジック)も、実装に依存し、各ブラウザが実験を重ねて決めていくことになるだろう。

いずれにせよ、今後の実装によって改善が期待できるが、ヘッダ取得の必要性と、小さい画像の Lazyload については、本質的に考慮が必要と考えられる。

少なくとも、今後の実装がどうなったとしても、なんでも Lazyload すればよいかと言うと、そうとは限らないということは言えそうだ。


## Loading 属性の導入

現時点の Lazyload の実装は、 Above the Fold に入ることが明白な画像や、 2.0KB 以下に収まる画像では、無駄になる可能性もある。

しかし、この実装はあくまで現時点でのものであり、改善は進むだろう。

したがって、こうした将来の改善も見据えた上で、どのように導入するかを検討するのが良さそうだ。

究極的には、画像の最も最適な取得方法はブラウザに託し、こちらで必要以上に挙動を矯正しないほうが良い場合が多いだろうと筆者は考えている。

今は lazy が最適なように感じられるが、将来より良い手法が何かしら確立し、仕様に盛り込まれた場合、明示的に lazy にしてしまっているものは、ブラウザは挙動を変えられないだろう。

したがって、現時点での実装をベースに検討した結果、 1 つ 1 つの画像に lazy/eager を付けて回るといった改修は、筆者はあまり推奨しない。

現時点では、 Below the Fold の読み込みが明白なボトルネックになっている場合や、その解決のために JS などで Lazyload を実現しているといった場合に Opt-In で適用し、それ以外は余計な指定をせず、ブラウザの実装に委ねることで、将来的な実装改善の恩恵を素直に受けるというものだ。

特に、現在の実装が素の `<img>` で特に問題になってない場合、急いで全てに lazy を付けて回るべきかと言うと、筆者はそうは考えていない。(Lighthouse はそうしろと言うかもしれないが)

loading 属性が仕様に入ったことは、ブラウザが従来の挙動に最適化を加える宣言をしたと捉え、早急な最適化を焦って行うより基本はブラウザに任せるほうが、長い目で見ればうまく行くのでは無いだろうか。


## 本サイトでの適用

本サイト自体が検証するために存在するサイトなので、ここでは積極的に属性を付与していく。

そもそも本サイトは、以前から既に、記事中(`<article>`)の全ての `<img>` と `<iframe>` に `lazyload` 属性を付与して挙動の検証を行ってきた。

そこで、今回の更新を受けて、全ての `lazyload` 属性を `loading=lazy` に置換を実施した。

また、記事外で必ず Above the Fold に入る `<header>` に並んでいる画像については `lazyload` を付与していなかったが、今回の更新を受け全てに `loading=eager` を明示的に付与した。

この状態で、今後も挙動を検証していくこととする。
