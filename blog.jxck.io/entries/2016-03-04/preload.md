# [preload][performance] Preload を用いたリソースプリローディングの最適化

## Intro

Preload を指定する `<link rel=preload>` の仕様が公開されており、現在 Chrome Canary に実装されている。

この仕様のモチベーションについて、 Chrome 開発者の Yoav Weiss 氏のブログも公開された。

今回は、この仕様の特徴と用途を解説し、本サイトへの適用について検討する。


- [W3C Preload Spec](https://w3c.github.io/preload/)
- [Intent to Ship: `<link rel=preload>`](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_nu6HlbNQfo/XzaLNb1bBgAJ)
- [Preload: What Is It Good For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)


## Preload

Preload はリソースのローディングを最適化することを目的に策定された仕様である。

link 属性ファミリーで、最適化に用いられる値としては、以前書いた [Resouce Hints 系](https://blog.jxck.io/entries/2016-02-11/resource-hints.html) と近いが、仕様としては別になっている。

また、既に HTTP2 においてこの仕様の一部が使われており、最適化の意味合いとしてはかかわり合う部分もある。


現在 Chrome Canary にのみ実装されており、 4 月には Chrome Stable にも入る予定である。他のブラウザの実装も進みつつある模様。


## Preload の特徴

Resource Hints の例えば Prefetch との違いは、 Prefetch がナビゲーションの前に動作するのに対して、 Prelaod はナビゲーションが行われた後に動作することが上げられる。

Prefetch は、画面を遷移する前に、次の遷移先で必要となるリソースについて、投機的な取得を指示していた。
一方 Preload は現在表示しようとしているページに遷移した後、そのページ内でのリソース取得を最適化する。(Chrome が独自に実装している Subresouce というのもあった、それに近い)


また、 Preload は以下のような特徴を持ち、今までできなかったことができるようになる。

- 属性の指定によっていくつかのコントロールが可能である。
- Content-Security-Policy を満たしているかを確認できる。
- リソースに適した Accept ヘッダ(`image/webp` etc)を付与できる。
- Prealod はそれ自体が `onload` を発火する。
- `window.onload` をブロックしない


## クリティカルリソースの先行取得

ナビゲーション終了後、レスポンスを取得したブラウザは、 HTML のパースを開始し、必要なサブリソースの取得( **Preload** )を開始する。

しかし、必要なリソースが全て HTML に `<img>` や `<script>`, `<link>` などで書かれているとは限らず、取得した CSS や JS に記述されている場合がある。

さらに CSS で指定されていて、 Preloader がそれを見つけていたとしても、実際にそのセレクタが使われるまでは、本当にそのイメージが必要かを判定することはできない。

例えば、 Above the Fold に表示される Hero Image が CSS の `div.hero { background-image: url("hero-image.png") }` で指定されていた場合は、実際の取得は HTML で `<div class=hero></div>` が出現してからになる。

もっと酷い例として、後から取得された Web Font でテキストが全て置き換わった場合、これをなるべく早く(かつ高い優先度で)取得したいと思うのが自然だろう。

重要なリソースがサブリソースに隠されている場合、どうしても取得までにラグが発生してしまい、画像を反映するには再レイアウトが発生し UX を損ねる場合がある。

`<link rel=preload>` を記述すれば、こうした「 **後から取得されるが、レイアウト上重要なリソース** 」を Preload 段階で取得するようにブラウザに指示することができる。


```html
<link rel=preload as=image href=hero-image.png>
```

Web Font の場合はこうなる。

```html
<link rel=preload  as=font type=font/woff2 href=font.woff2 crossorigin>
```

(Chrome は現状フォントの取得は暗黙的に CORS になるらしいため、 Same Origin からの取得でも `crossorigin` が必要らしい)

`as` に指定可能な値は [fetch spec に一覧がある](https://fetch.spec.whatwg.org/#concept-request-destination)、省略すると XHR や fetch と同じ挙動になる。

`type` を指定すると、ブラウザがそのファイルタイプをサポートしている場合だけ取得するようにできる。


## 遅延実行

Preload を使うことで、「**取得しておきたいけど実行はしたくない**」というスクリプトの取得ができる。

後から `<script>` を差し込むことで、 JS の「取得と実行」を遅延させることはこれまでもできたが、「取得」だけを先に行うことはできなかった。
また、取得を XHR で行い保存しておいたものをあとで `eval` することもできるが、 Preload を使うことで実行を `<script>` で行え、ブラウザの Preloader に取得させるため、再利用が効く。

まず「取得」を Preload で行う、これは HTML に書いておいても良いし、それ自体も遅延したければ好きなタイミングで以下のようにノードを作れば良い。


```html
<link rel=preload as=script href=script.js>

```

```js
var preload = document.createElement('link');
link.rel = 'preload';
link.as = 'script';
link.href = 'script.js';
document.head.appendChild(link);
```

そして、「実行」は任意のタイミングで `<script>` を生成し行う。


```js
var script = document.createElement('script');
script.src = 'script.js';
document.body.appendChild(script);
```


## 非同期ローダ

`<link rel=preload>` は自身で `onload` を発火する。
これを利用すると、 HTML と少しの JS で **非同期ローダ** を実現することができる。


例えば CSS の場合はこうなる。

```html
<link rel=preload as=style href=style.css onload="this.rel='stylesheet'">
```


同じことは JS でも応用できる。

`<script async>` があるが、これは `window.onload` をブロックするので、そこで使い分ける。

analytics のような場合。とにかく早く取得して、ユーザを取りこぼさず、かつ UX は一切損ないたく無い、特に onload を遅らせたくはない場合などに使える。


```html
<link rel=preload as=script href=analytics.js
      onload="var script = document.createElement('script');
              script.src = this.href;
              document.body.appendChild(script);">
```


## Media Query

Preload はリンクであるため、仕様上 media 属性を持つ。(chrome ではまだ未サポート)
つまり Media Query を用いた条件付きローディングができる。

例えば `<picture>` で Image を読み分けている場合、その条件と同じものを `<link rel=preload>` に指定することで、一致した条件のみの画像を Prelaod できる。

```html
<link rel=preload as=image href=large.png media="(max-width: 600px)">
<link rel=preload as=image href=middle.png media="(max-width: 400px)">
<link rel=preload as=image href=small.png media="(max-width: 300px)">
```


## Header での指定

Preload は、同じセマンティクスを HTTP Header にも適用できる。

つまりここまでマークアップで示してきた例は、(onload hack など除き)基本的に全て HTTP Response Header で行うことができる。

```
Link: <script.js>;rel="preload";as="script"

Link: <font.woff2>;rel="preload";as="font";crossorigin
```

HTTP Header にすることによって、マークアップと最適化を分離することができる。

既存コンテツをいじらずに最適化を追加したい場合や、コンテンツをスキャンして自動的に最適化を設定するような、外部の [最適化エンジン](https://www.akamai.com/us/en/resources/front-end-optimization-feo.jsp) などに委ねる場合などに有用である。


## Feature Detection

Preload をヒントとして使っていれば、サポートされてい無いブラウザにおいては従来通りのタイミングで取得が走るだけになる。
しかし、 `onload` ハックなどを用いたより積極的な活用を行う上では、ブラウザのサポートの有無を知りたい場合もある。

そこで、サポートされる `rel` の値を DOM から取れるような提案がなされている。


```js
document.createElement("link").relList.supports("preload"));
```

これを使えば、 Preload が無効な場合に問題があるサイトでは、フォールバックすることも可能になる。


## HTTP2

HTTP2 において、 HTTP Link preload ヘッダは Push するリソースを指定する目的で使用している。

しかし、実際の動作として、サーバが行う HTTP2 の Push と、ブラウザが行う Preload は補完関係にある。

HTTP2 の Push ではリクエストより先にリソースを送ることができ、ブラウザはそれをキャッシュとして保存する。
レスポンスの HTML を取得した後、サブリソースを発見して Fetch するタイミングで、そのキャッシュがヒットするという仕組みである。


一方で、 Push はブラウザが発呼する Fetch とは方向が逆であるため、ある程度の制限が出る。

- Preload は任意のタイミングで発行し、完了を `onload` で知ることができる。
- Preload は fetch であるため、コンテントネゴシエーションが実施できる。
- Client-Hints や Accept Header を使った最適化もできる。
- Push と違い Preload は 3rb party にも使える。

Push が既にブラウザにキャッシュされているリソースを考慮できないという問題は、別途 [提案](https://tools.ietf.org/html/draft-kazuho-h2-cache-digest) があるが、基本的に Push はクライアントの状況を踏まえることが難しい。

もともと HTTP を基本とする Web がプルベースを前提としているため、 Fetch でリクエストを投げる際にクライアントの情報を載せ、サーバがそれをレスポンスに反映するモデルの方が、細かい調整がしやすいのは自明である。

したがって、クライアントが置かれた状況を限定的に捉え、より積極的にリソースをキャッシュさせる用途で Push を。
クライアントの状態を踏まえて、コンテントネゴシエーションを重視する場合に Preload を。

という感じに、組み合わせて使うのが最も理想だと言えるだろう。

なお、 HTTP2 の Push はさせずブラウザに Fetch で Preload させたい場合は、 `nopush` を付けることで Opt-Out することができる。


```
Link: </app/style.css>; rel=preload; as=style; nopush
```


## 本サイトへの適用

### 対象リソース

本サイトでは、以下のリソースが Preload の対象として、効果が有りそうであると判断した。

- Google アナリティクスをベージの最下部に記述している。
- Higlight に使用する JS も、ベージの最下部に記述している。

これらは共通して「使うことが分かっているが、それぞれの理由によって HTML の途中や下部に記述している」という特徴であるため、取得のみを Preload によって先に行うことは効果が期待できそうである。


### 指定方法

本サイトは H2O でサーブしているが、まだ nopush には対応していない。
そのため HTTP Header で Link rel=preload を指定すれば、必ず HTTP2 Push が発生する。

まず、本サイトはまだ HTTP2 Push を持ちいた最適化は、キャッシュを有効に使えなくなるという理由から行っておらず、 [Cache Digest](https://tools.ietf.org/html/draft-kazuho-h2-cache-digest) を Service Worker で管理する方式を採用する予定なので、そこまでは Link Header を付けるのは避けたい。

そこで、ページで共通するサブリソースについて、 HTML のトップレベルへの `<link>` タグで指定することにした。

```
<link rel=preload as=script src=/assets/js/highlight.min.js>
<link rel=preload as=script src=//www.jxck.io/assets/js/ga.js>
```


### 検証

本サイトの平均的な記事を対象として、 `<link>` の付与前後を Chrome Canary 51.0.2665.0 で検証した。

数回実行し、傾向を確認。平均的な結果のスクリーンショットを取得した。

before

[![before](before.png#1366x768 "result of before adding preload")](before.png)

after

[![after](after.png#1366x768 "result of after adding preload")](after.png)


このページでは、むしろ遅くなっている。これは、元のコンテンツで特にリソースの読み込みなどに関するオーバーヘッドが少ないためであると考えられる。したがって、処理が入ることによる内部処理のオーバーヘッドが結果に影響していると推測する。

同様に、いくつかのページで同様に試したが、もとが速すぎるので、もはや誤差のような結果にしかならなかった。

現状 Chrome Canary しか対応していないこと、このブログは作ってまだ間もないので、コンテンツも少ないことをふまえ、今回は導入を見送った。

今後コンテンツが増え、ボトルネックが発生した際に再度検証する。

効果が体感できるコンテンツが作成できた場合は、デモとして [labs.jxck.io](https://labs.jxck.io) に掲載する。
