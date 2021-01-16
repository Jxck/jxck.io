# [webbundle][webpackaging][performance] Webbundle によるサブリソース取得の最適化


## Intro

WebBundle を用いてサブリソースのみを Bundle する、 Subresource Bundle の策定と実装が進んでいる。

これを用いると、複数サブリソースの取得を一回の fetch で行うことができ、 RTT を減らしつつも個別に取得したかのようにキャッシュを制御できる。

現時点での仕様と実装を解説する。

- [Intent to Prototype: Subresource loading with Web Bundles](https://groups.google.com/a/chromium.org/g/blink-dev/c/wYn13HabRN0/m/L4y4iY1-AgAJ)


## Subresource Bundling

WebBundle の初期の仕様は、 HTML を頂点としたページ全体をまとめる方向で始まった。

- [WebBundle によるコンテンツの結合と WebPackaging \| blog.jxck.io](https://blog.jxck.io/entries/2019-11-12/webbundle.html)

これをサブリソース(JS, CSS, Img etc)に対して利用できるようにする仕様だ。

HTML 自体は普通に配信し、複数サブリソースの取得を 1 fetch にまとめることができる。


### gen-bundle

実際に [gen-bundle](https://github.com/WICG/webpackage/tree/master/go/bundle/cmd/gen-bundle) を用いてサブリソースのみを Bundle する。

サブリソースを以下のように subresource ディレクトリにまとめたとする。


```sh-session
$ ls subresource
  a.js
  b.js
  c.css
  d.css
  e.png
  favicon.ico
```

なお、 `a.js` は `b.js` を import し、 `c.css` は `d.css` を import している。

gen-bundle は `-dir` を指定するとディレクトリ以下をまるっと bundle してくれる。

CLI の仕様上 `-primaryURL` (HTML を頂点とする Bundle での HTML の URL)が必須だが、 Subresource の場合は特定の Primary が存在しない。 Chorme の実装もこれを無視しているようなので、適当に指定している。

`-headerOverride` でヘッダを追加することもできる。フォーマットの仕様上は個々のリソースごとに別々にヘッダを追加可能だが、この CLI は全てのリソースに追加される。


```sh-session
$ gen-bundle \
    -version b1 \
    -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/ \
    -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/a.js \
    -dir subresource/ \
    -headerOverride "Cache-Control: max-age=60" \
    -o bundle.wbn
```

dump-bundle すると以下のようになる。


```sh-session
$ dump-bundle -i bundle.wbn

Version: b1
Primary URL: https://labs.jxck.io/webpackaging/subresource-webbundle/a.js

> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/a.js
< :status: 200
< Content-Type: [application/javascript]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< Last-Modified: [Sat, 13 Jun 2020 10:56:18 GMT]
< Content-Length: [54]
< [len(Body)]: 54
import {data} from './b.js'
console.log('a.js', data)


> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/b.js
< :status: 200
< Content-Length: [43]
< Content-Type: [application/javascript]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< Last-Modified: [Sat, 13 Jun 2020 10:56:18 GMT]
< [len(Body)]: 43
export const data = 10
console.log('b.js')


> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/c.css
< :status: 200
< Content-Type: [text/css; charset=utf-8]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< Last-Modified: [Fri, 24 Jul 2020 08:35:13 GMT]
< Content-Length: [17]
< [len(Body)]: 17
@import 'd.css';


> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/d.css
< :status: 200
< Last-Modified: [Fri, 24 Jul 2020 08:34:57 GMT]
< Content-Length: [57]
< Content-Type: [text/css; charset=utf-8]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< [len(Body)]: 57
h1 {
  color: red;
}

img {
  border: solid 1px black;
}


> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/e.png
< :status: 200
< Content-Type: [image/png]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< Last-Modified: [Sat, 06 Jun 2020 10:56:17 GMT]
< Content-Length: [1993]
< [len(Body)]: 1993
[non-text body]

> :url: https://labs.jxck.io/webpackaging/subresource-webbundle/favicon.ico
< :status: 200
< Content-Type: [image/vnd.microsoft.icon]
< Accept-Ranges: [bytes]
< Cache-Control: [max-age=60]
< Last-Modified: [Sat, 06 Jun 2020 10:56:17 GMT]
< Content-Length: [5686]
< [len(Body)]: 5686
[non-text body]
```


### link rel bundle

この Bundle を読み込む HTML は以下のようになる。

普通にサブリソースを読む HTML に加え、 `<link>` で web bundle の読み込みを指定する。

この resources 属性に、 bundle 側で解決する URL を absolute URL で明示する必要がある。


```html
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>Subresource Web Bundle DEMO</title>

<link href=favicon.ico rel="shortcut icon" type=image/x-icon>

<link rel=webbundle
      href=bundle.wbn
      resources="
                 https://labs.jxck.io/webpackaging/subresource-webbundle/a.js
                 https://labs.jxck.io/webpackaging/subresource-webbundle/b.js
                 https://labs.jxck.io/webpackaging/subresource-webbundle/c.css
                 https://labs.jxck.io/webpackaging/subresource-webbundle/d.css
                 https://labs.jxck.io/webpackaging/subresource-webbundle/e.png
                 https://labs.jxck.io/webpackaging/subresource-webbundle/favicon.ico
                 "/>

<h1>Subresource Web Bundle DEMO</h1>

<script  src=a.js  type=module></script>
<link   href=c.css rel=stylesheet>
<img     src=e.png width=100>
```


### 挙動

Chrome Canary を flag 付きで起動する。


```sh-session
$ open -a /Applications/Google\ Chrome\ Canary.app --args --enable-features=SubresourceWebBundles
```

HTML にアクセスすると、以下の様にサブリソースが bundle から解決されていることがわかる。

- DEMO: <https://labs.jxck.io/webpackaging/subresource-webbundle/bundle.html>

![Bundle Subresource のデモを Chrome Devtools で表示](bundle-subresources.png#898x372 'bundle-subresources demo')

実際に実行されている fetch が HTML と Bundle だけになっていることがわかる。

もし、ブラウザが Subresource Bundling に対応していなければ、 `<link rel=webbundle>` が無視され個別にリクエストが走ることになる。

ここでは wbn は no-store としているが、展開されたサブリソースは wbn 内で設定された Cache-Control が効いているため、個別にキャッシュが行われている。

また、ここでは一切署名を用いてないため、リソースの URL を別のものにすることも可能だ。


```sh-session
$ gen-bundle \
    -version b1 \
    -baseURL    https://example.com/webpackaging/subresource-webbundle/ \
    -primaryURL https://example.com/webpackaging/subresource-webbundle/a.js \
    -dir subresource/ \
    -headerOverride "Cache-Control: max-age=60" \
    -o bundle-3p.wbn
```

html はこうなる。


```html
<link rel=webbundle
      href=bundle-3p.wbn
      resources="
                 https://example.com/webpackaging/subresource-webbundle/a.js
                 https://example.com/webpackaging/subresource-webbundle/b.js
                 https://example.com/webpackaging/subresource-webbundle/c.css
                 https://example.com/webpackaging/subresource-webbundle/d.css
                 https://example.com/webpackaging/subresource-webbundle/e.png
                 https://example.com/webpackaging/subresource-webbundle/favicon.ico
                 "/>
<script  src=https://example.com/webpackaging/subresource-webbundle/a.js  type=module></script>
<link   href=https://example.com/webpackaging/subresource-webbundle/c.css rel=stylesheet>
<img     src=https://example.com/webpackaging/subresource-webbundle/e.png width=100>
```

つまり、 3rd Party のサブリソースを読み込む際に、その配信元が webbundle に対応していなくとも、 1st Party 側が Bundle を生成して配信することが可能ということになる。それで良いのかは仕様がきちんと出てから議論されるのではないだろうか。


### Web Component Bundle

JS だけではなくあらゆる Subresource を対象に bundle できるということは、 Web の開発を Component 単位で扱うようになり始めた今日のワークフローにもマッチするようになるだろう。

HTML, CSS, JS, Img などをまとめて、いわゆる WebComponent の単位で bundle を生成するといったことも可能だ。

以下の DEMO は、 `<profile-card>` を Custom Element として実装し、そこに必要なリソースを bundle している。


```sh-session
$ ls profile-card
  jxck.png
  profile-card.js
  style.css
  template.html
```

- DEMO: <https://labs.jxck.io/webpackaging/subresource-webbundle/webcomponents.html>

今は、 JS 以外は `import` できないため、 CSS は `@import` で、 HTML は `fetch()` で解決しているが、 別途策定が進んでいる [Synthetic Modules](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/SyntheticModules/designDoc.md) (JSON, CSS, HTML などを ES Module のように扱う)が実装されれば、全て `import` で扱える可能性がある。

これら関連仕様が進むと、 Synthetic Module ベースで構成された WebComponent の使い勝手がよくなり、 Bundle で fetch の数も気にせずに積極的に使えるようになるかもしれない。


### Nested Bundling

前述の WebComponents を複数組み合わせたり、大きめなフレームワークを組み合わせて使うケースは既に多くある。

これらを一つの WebBundle にするよりも、おそらく WebBundle に Webbundle を含むことになっていくだろう。

イメージとしては以下のような構成だ。


```
- bundle.wbn
  - react.wbn
  - react-dom.wbn
  - redux.wbn
```

実際このような Nested Bundle も生成可能で、 Chrome もそれを最後まで展開するところが確認できた。

- DEMO: <https://labs.jxck.io/webpackaging/subresource-webbundle/nested-bundle/>


## 考察


### bundle のネイティブ化への期待の背景

もともと何を期待してたのかという背景を振り返る。

特に JS では、長い議論と実装の努力により ES Modules がおおよそ使える所まで来た。

しかし npm にあるような依存の深いモジュールを単純に import で取得しては、発生する fetch が多すぎてオーバーヘッドが無視できない。

これは H2 や Prefetch を使うといった構成でもカバーしきれず、それを詳細に調査した Chrome のチームからは「100 を超えるなら webpack でバンドルした方が良い」というレポートが出てしまった。

- [Loading Performance with (Many) Modules: Summary as of Oct 7, 2017](https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit)

この課題は すでに広く普及した webpack などのビルドツールにより解決されていたので、開発の現場ではあまり体感することはなかったかもしれない。

結果、 ES Module の import はブラウザがランタイムで依存解決するためではなく、ビルドツールが変換に使うための placeholder として使われて、多くの依存を bundle.js にまとめ、その中の 1byte でも変わったらバンドルし直して再取得させる運用が通常となっている。

筆者としては「せっかく ES Module が手に入ったのにブラウザから見れば恩恵はほとんど得られていない」と言う点に煮えきらなさを感じていた。

Bundle Subresource は、「ブラウザ上でも Module を分割して扱いながらも fetch は減らしたい」という 2 つの要求を繋ぐ仕様として期待することができる。

WebPackaging の構想が出たときから期待していた仕様であり、 SXG よりもより多くの現場に影響を与える仕様になりえるのではないだろうか。


### 動的な bundling

そうした理想を完全に叶えるためには、まだ足りてない部分もある。

一番の問題は、モジュールごとにキャッシュを設計しても、ブラウザが何をキャッシュしているのかをサーバが知る術が無いことだ。

先の例で、別で取得したキャッシュがおおよそあり、 `e.png` だけが無い場合は、 `e.png` だけを送りたいが、それがわからないと全てを含んだ bundle を送ることになってしまう。それはやはり無駄だ。

この問題は Server Push と同じで、そのときは Cache-Digest によってキャッシュ内容のヒントを送るという提案がなされた。

ところが、実装上の難易度などの問題から作業が止まり、結局実現しなかった。

- [Cache Digest と HTTP2 Server Push の現状 \| blog.jxck.io](https://blog.jxck.io/entries/2019-01-19/cache-digest-status.html)

WebBundle の Explainer には、この問題に対する考慮が一応書いてあるため、ここの議論が進めばより理想に近づくと個人的には期待したい。

- <https://github.com/WICG/webpackage/blob/master/explainers/subresource-loading.md#approximate-membership-query-datastructure>

現状の実装ではそこまではスコープに無いと思われるので、今後この議論が進むかどうかに注目しつつ、フィードバックしていきたい。


### resouces

bundle で fetch の数が解決して、 ES Module を積極利用するとなると、自動生成するとしても link タグの resouces が少し肥大しすぎるあたりも気になる。

ぱっと思い浮かぶのは import map だが、そちらも最近どうなってるかよくわからない。

今はナイーブに全部書く実装になっているとは言え、あくまで Explainer ベースであり、仕様もかっちり固まっているわけではなく、さらに Explainer でも別の案について書かれているため、 Experiment を進める中でもう少し良い代替案がでることを期待したい。


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/webpackaging/subresource-webbundle/>


## Outro

まだまだ実装が始まったばかりで、 Explainer と Design Doc から仮実装されたような状態であるため、仕様が固まっているとはいえないだろう。

その中でも、コアの部分についてはある程度動いており、いくつかのユースケースは実現できることが確認できた。

なにより Cache-Digest の問題が気になるところなので、今後仕様策定が進んで改善されていくことを期待しつつ、検証を続けていきたい。


## Resources

- Spec
- Explainer
  - <https://github.com/WICG/webpackage/blob/master/explainers/subresource-loading.md>
  - <https://docs.google.com/document/d/11t4Ix2bvF1_ZCV9HKfafGfWu82zbOD7aUhZ_FyDAgmA/edit#>
- Requirements Doc
  - <https://docs.google.com/document/d/1imEt4TZkuzRVidmkaOaTym9JzPRMK8KSXiPp83797cw/edit#>
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Prototype: Subresource loading with Web Bundles
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/wYn13HabRN0/m/L4y4iY1-AgAJ>
- Chrome Platform Status
  - <https://www.chromestatus.com/feature/5710618575241216>
- DEMO
  - <https://docs.google.com/document/d/18fFrURT6xD1GnqJwCx2K3Z81Te9Iv-r2ZsCkOvDH_04/>
- Blog
- Presentation
- Issues
- Other
