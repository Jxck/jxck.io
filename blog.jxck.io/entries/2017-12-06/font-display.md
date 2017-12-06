# [font-display][web font][performance][css] Font Display プロパティを用いた FOIT/FOUT 最適化

## Intro

Web Font 読み込み中の HTML 表示については、ブラウザデフォルトの挙動に依存していた。

フォントファイルサイズが大きい場合は、 FOIT/FOUT の問題が顕著になり、 JS を用いた回避策が利用されることも多かった。

これを解決するため CSS に `font-display` プロパティが作成され、実装が進んでいる。

各プロパティの違いと挙動、そして本サイトの適用について解説する。


## Loading Web Font

Web Font は、特に日本語のように文字数が多い場合、ファイルが大きくなる。

ダウンロードしている間に、読み込み済みの HTML をどう表示するかについてはいくつかの方法があり、それによってユーザの体験は変わる。

これまで、フォント読み込み中の挙動は、ブラウザのデフォルト挙動に依存していた。

これを制御するために定義されたのが、 CSS の `font-display` プロパティである。


## ブラウザデフォルト挙動

まず、ブラウザ内部での Web Font の扱いを確認する。

基本的に、ブラウザは 3 つのチェックポイントを持つ。

[3.2. The Font Display Timeline \| CSS Fonts Module Level 4](https://drafts.csswg.org/css-fonts-4/#font-display-timeline)

- block period
- swap period
- font failure period

まず、ブラウザはフォントのダウンロードを開始したら **block period** の間はテキストを表示しない。

(正確には、 _invisible-fallback font face_ という、見えない文字でレンダリングする)

**swap period** に入ったら、代替フォントで表示を行う。

しかし、フォントのダウンロードは継続し、完了したら代替フォントと置き換える。

**failure period** に入っても、ダウンロードが終わらなければ、フォントの取得は中断し代替フォントのままになる。

![block period の間は fallback font を表示、 swap period の間は fetch が終わると font を置き換え、 failure period に入ると fetch を中断](font-display.svg#1000x225 "font rendering flow with block/swap/failure period in browser")


## FOIT/FOUT

ブラウザのこうした挙動は、 UX を著しく損ねる場合がある。

特に、ネットワークが遅い場合、フォントファイルサイズが大きい場合は、フォントの取得に時間がかかる。

すると、以下のような現象が発生する。


FOIT (Flash of Invisible Text)
: ナビゲーション直後、テキストが表示されない現象

FOUT (Flash of Unstyled Text)
: 表示されているテキストのフォントが突然入れ替わる現象


こうした現象を防ぐためには、 JavaScript でフォントの読み込み/表示を制御するのライブラリが使われることが多い。

- [https\://github.com/typekit/webfontloader](https://github.com/typekit/webfontloader)
- [https\://github.com/bramstein/fontfaceobserver](https://github.com/bramstein/fontfaceobserver)

こうした挙動を、 CSS から明示的に指定できるように策定されたのが、 `font-display` プロパティである。


## font-display

`font-display` は以下の 5 つの値をとる。

- auto
- block
- fallback
- swap
- optional


### auto

未指定の場合と同じ、 User-Agent のデフォルトの挙動となる。


### block

block period を `3s` (推奨)、 swap period を `infinite` にする。

主に、代替のフォントでの表示を避けたい場合に利用されるが、 block period が `inifinit` になるわけではない点に注意。

例えば、 [FontAwesome](http://fontawesome.io/) のようにフォントファイルを UI Icon に利用しており、代替フォントでの表示が望ましくない場面で利用できる。


### fallback

block period を `100ms` (推奨)、 swap period を `3s` (推奨) にする。

最初にテキストが表示されない状態(FOIT)を極力避けるため、早めにフォールバックフォントを表示しながらも、フォントの取得を試みる。

しかし、あまりにも回線状況が悪い場合は取得を諦めるため、意図した Web Font にならない場合がある。

内容が重要で、フォールバックフォントでの表示も許容できる場合に利用できる。

Web Font 読み込み系のライブラリは、この機能によって代替できる場合が多い。


### swap

block period を `0`、 swap period を `infinite` にする。

FOIT が実質無くなる代わりに、大きなフォントファイルでも最後まで取得を試みることができる。

例えばロゴなどで、最終的には指定のフォントで表示される必要あるなどの場合に利用できる。


### optional

block period を `100ms` 以下(推奨)、 swap period を `0s` にする。

FOIT を極力避けつつも、 swap period が無いため block period を過ぎると FOUT も起こらない。

しかし、ファイルの取得を完全に断念するかは UA が決め、非常に低い priority で取得を継続する場合がある。

`optional` は、最初に訪れたユーザには素早くレンダリングすることを優先し、次回以降のアクセスで付加価値として Web Font での表示を提供するという方針に使うことができる。

次回以降のアクセスでフォントがキャッシュされていれば、初回含め FOIT/FOUT 共に解決するため、スタイルよりも内容に重きを置く場合は検討できる。


## 本サイトへの適用

本サイトは、パフォーマンスを意識しつつも、標準的な Web サイトの作りに合わせるため、鉄下駄として Web Font を導入している。

[Noto Sans の Web Font 対応とサブセットによる最適化](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html#まとめ)

フォントのサイズはギリギリまで削っているが、それでも回線次第では FOIT/FOUT などの可能性は否定できない。

しかし、やはり重要視したいのは内容であり、フォントによるスタイル自体の重要度は低く考えている。

また、一旦取得されたフォントファイルには、 `immutable` キャッシュを指定しており、二回以降のアクセスでは Cache Hit が期待できる。

[Cache-Control の Immutable 拡張によるリロード時のキャッシュ最適化](https://blog.jxck.io/entries/2016-07-12/cache-control-immutable.html)

今日ではブラウザのキャッシュは領域の取り合いであり、キャッシュが継続して利用可能であることは期待できないが、それでもページ遷移などでは Web Font を FOIT 無しで適用できる可能性もある。

個人的には、「別のページに遷移すると書体が変わる」という状況が、どういう UX になるかには興味があるため、実験の意味も含めて `font-display: optional` をページ全体に適用することとした。


## DEMO

大きいフォントファイルを、 4 つのプロパティで表示するデモを以下に用意した。

必要に応じて Network Throttling をかけた上でナビゲーションすることで効果が体験できる。

DEMO: [https\://labs.jxck.io/webfont/font-display.html](https://labs.jxck.io/webfont/font-display.html)


## Link

- [https\://drafts.csswg.org/css-fonts-4/#font-display-desc](https://drafts.csswg.org/css-fonts-4/#font-display-desc)
- [https\://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#customize_the_text_rendering_delay](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#customize_the_text_rendering_delay)
- [https\://font-display.glitch.me/](https://font-display.glitch.me/)

