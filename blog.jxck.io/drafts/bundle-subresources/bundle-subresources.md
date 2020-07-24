# [webbundle][webpackaging][performance] WebBundle によるサブリソース取得の最適化

## Intro

WebBundle を用いてサブリソースのみを Bundle する Subresource Bundle の策定と実装が進んでいる。

これを用いると、リソース取得に必要な RTT を減らし、単一のファイルで取得が可能になる。

仕様と実装を解説する。


## Subresource Bundling

WebBundle の初期の仕様は、 HTML を頂点としたページ全体をまとめる方向で始まった。

- [WebBundle によるコンテンツの結合と WebPackaging \| blog.jxck.io](https://blog.jxck.io/entries/2019-11-12/webbundle.html)

これをサブリソース(JS, CSS, Img etc)に対して利用できるようにする仕様だ。

HTML 自体は普通に配信し、複数サブリソースの取得を 1 fetch にまとめることができる。


## gen-bundle

実際に gen-bundle を用いてサブリソースのみを Bundle する。

サブリソースを以下のように subresource ディレクトリにまとめたとする。

```sh
$ ls subresource
  a.js
  b.js
  c.css
  d.css
  e.png
  favicon.ico
```

なお、 `a.js` は `b.js` を import し、 `c.css` は `d.css` を import している。

gen-bundle には `-dir` を指定するとディレクトリ以下をまるっと bundle してくれる。

CLI の仕様上 `-primaryURL` として、 HTML を頂点とする Web Bundle では HTML の URL を指定するが、 Subresouce の場合は特定の Primary が存在しない。

Chorme の実装もこれを無視しているようなので、適当に指定している。

`-headerOverride` でヘッダを追加することもできる。

フォーマットの仕様上は個々のリソースごとに別々にヘッダを追加可能だが、この CLI は全てのリソースに追加される。

```sh
$ gen-bundle \
    -version b1 \
    -baseURL    https://labs.jxck.io/webpackaging/subresource-webbundle/ \
    -primaryURL https://labs.jxck.io/webpackaging/subresource-webbundle/a.js \
    -dir subresource/ \
    -headerOverride "Cache-Control: max-age=60" \
    -o bundle.wbn
```

dump-bundle すると以下のようになる。


```sh
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

## link rel bundle

この Bundle を読み込む HTML は以下のようになる。

普通にサブリソースを読む HTML に加え、 `<link>` で web bundle の読み込みを指定する。

resouces 属性に bundle 側で解決する URL を許可リストとして absolute URL で明示する必要がある。

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


## 挙動

Chrome Canary を flag 付きで起動する。

```
$ open -a /Applications/Google\ Chrome\ Canary.app --args --enable-features=SubresourceWebBundles
```
HTML にアクセスすると、以下の様にサブリソースが bundle から解決されていることがわかる。

![Bundle Subresource のデモを Chrome Devtools で表示](./subresource-bundling.png 'bundle-subresources demo')

実際に実行されている fetch が HTML と Bundle だけになっていることがわかる。

もし、ブラウザが Subresouce Bundling に対応していなければ、 webbundle の link 部が無視され個別にリクエストが走ることになる。

ここでは wbn は no-store としているが、展開されたサブリソースは wbn 内で設定された Cache-Control が効いているため、個別にキャッシュが行われている。

また、ここでは一切署名を用いてないため、リソースの URL を別のものにすることも可能だ。

```sh
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

つまり、 3rd Party のサブリソースを読み込む際に、その配信元が webbundle に対応していなくとも、 1st Party 側が Bundle を生成して配信することが可能ということだ。


## 考察

### 背景

もともと何を期待してたのかという背景を振り返る。

特に JS では、長い議論と実装の努力により ES Modules がおおよそ使える所まで来た。

しかし npm にあるような依存の深いモジュールを単純に import で取得しては、発生する fetch が多すぎてオーバーヘッドが無視できない。

これは H2 や Prefetch を使うといった構成でもカバーしきれず、それを詳細に調査した Chrome のチームからは「100 を超えるなら webpack でバンドルした方が良い」というレポートが出てしまった。

すでに webpack の導入し、 bundle.js を生成して当たり前になっており、 ES Module の import はブラウザがランタイムで依存解決するためではなく、 webpack がビルドに使うための placeholder として使われていた。

そして、多くの依存を bundle.js にまとめ、その中の 1byte でも変わったらバンドルし直して取得させる運用が通常となっているが、本来必要なモジュールだけを取得し直すことで無駄を減らすのがランタイムにおけるモジュール分割のメリットだったが、モジュール分割のモチベーションも開発側での取り回しと node.js に閉じてしまっている。

そのため、開発の現場では大した違和感はなかったかもしれないが、ブラウザから見れば恩恵はほとんど得られておらず、筆者としては「せっかく手に入れた Native の ES Module が結局全然使えてない」と言う点に煮えきらなさを感じていた。


## Web Component Bundle
### "バンドル" のネイティブ化

Bundle Subresouce は、「Module を分割したい、が、 fetch は一回にしたい」という 2 つの要求を繋ぐ仕様として期待することができる。それだけでもかなり大きい。

加えて、 JS だけではなくあらゆる Subresouce を対象に bundle できるということは、 Web の開発を Component 単位で扱うようになり始めた今日のワークフローにもマッチするようになるだろう。

例えば、HTML, CSS, JS, Img などをまとめて、 WebComponent の単位で bundle を生成するといったことも可能だ。

別途策定が進んでいる Synthetic Modules (JSON, CSS, HTML などを ES Module のように扱う)が実装されれば、この流れはより進むだろうと考えられる。

その際、毎回 webbundle に max-age を指定し、内部のリソースを no-store にすれば、 webbundle の更新が component 全体の更新に匹敵し、 webbundle のバージョンだけ気にすれば、内部のリソースのバージョニングを気にする必要がなくなる。

TODO: DEMO

逆に、個々のリソースのヘッダが個別に設定でき、ブラウザ上は別々に取得したものとして扱えるということは、 webpack のような単一 bundle.js への concat と違い、より細やかなキャッシュ戦略を取ることもできる。 1byte の変更に数百 KB の fetch を伴う必要もなくなる。

特にミドルウェアが対応して、自動的に bundle の生成と HTML への指定を行うようになれば、実質 Transport-Encoding のように透過的に扱うこともできるだろう。


### resouces

bundle で fetch の数が解決して、 ES Module を積極利用するとなると、自動生成するとしても link タグの resouces が少し肥大しすぎるあたりも気になる。

ぱっと思い浮かぶのは import map だが、そちらも最近どうなってるかよくわからない。

今はナイーブに全部書く実装になっているとは言え、あくまで Explainer ベースであり、仕様もかっちり固まっているわけではなく、さらに Explainer でも別の案について書かれているため、 Experiment を進める中でもう少し良い代替案がでることを期待したい。



### 動的な bundling

しかし、そうした理想を完全に叶えるためには、まだ足りてない部分もある。

一番の問題は、細やかなキャッシュを設計しても、ブラウザが何をキャッシュしているのかをサーバが知る術が無いことだ。

先の例で、別で取得したキャッシュがおおよそあり、 `e.png` だけが無い場合は、 `e.png` だけを送りたいが、それがわからないと全てを含んだ bundle を送ることになってしまう。それはやはり無駄だ。

この問題は Server Push と同じで、そのときは Cache-Digest によってキャッシュ内容のヒントを送るという提案がなされた。

ところが、実装上の難易度などの問題から作業が止まり、結局実現しなかった。

- [Cache Digest と HTTP2 Server Push の現状 \| blog.jxck.io](https://blog.jxck.io/entries/2019-01-19/cache-digest-status.html)

WebBundle の Explainer には、この問題に対する考慮が一応書いてあるため、ここの議論が進めばより理想に近づくと個人的には期待したい。

- <https://github.com/WICG/webpackage/blob/master/explainers/subresource-loading.md#approximate-membership-query-datastructure>

現状の実装ではそこまではスコープに無いと思われるので、今後この議論が進むかどうかに注目しつつ、フィードバックしていきたい。


### Nested Bundling

おそらく WebBundle に Webbundle を含むことになっていくのではないかと想像する。

```sh
- bundle.wbn
  - react.wbn
  - react-dom.wbn
  - redux.wbn
```

こうしたケースがどう扱われるのか、現在の Explainer だけだと正直よくわからない。

備忘録として書いておいて、もう少し話が進んだら検証していきたい。


## DEMO

動作する DEMO を以下に用意した

- <https://labs.jxck.io/webpackaging/subresource-webbundle/basic.html>


## Outro

まだまだ実装が始まったばかりで、 Explainer と Design Doc だけで仮実装されたような状態であるため、仕様が固まっているわけではないだろう。

その中でも、コアの部分についてはある程度動いていることが確認できた。

resouces の指定や、 bundle のネスト、そしてなにより Cache-Digest の問題が気になるところなので、今後仕様策定の方が進んでより改善されていくことを期待しつつ、検証を続けていきたい。


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
