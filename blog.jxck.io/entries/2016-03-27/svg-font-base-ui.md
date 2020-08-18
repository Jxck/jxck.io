# [svg][image][performance] 画像最適化戦略 SVG/Font 編

## Intro

本サイトで使用している UI アイコン系の画像を、ギリギリまで最適化した手書き SVG に置き換えた(ただしソースは *観賞用* なので、インデントは残す)。

また、装飾に画像ではなく CSS の contents を利用することで、ローカルフォントデータを利用し、画像転送を減らす工夫にも言及する。

画像最適化シリーズ第 4 回目のエントリである。

1. [画像最適化戦略 PNG/JPEG 編](https://blog.jxck.io/entries/2016-03-24/optimize-image.html)
1. [画像最適化戦略 Picture 編](https://blog.jxck.io/entries/2016-03-25/picture.html)
1. [画像最適化戦略 WebP 編](https://blog.jxck.io/entries/2016-03-26/webp.html)
1. [> 画像最適化戦略 SVG/Font 編](https://blog.jxck.io/entries/2016-03-27/svg-font-base-ui.html)
1. [画像最適化戦略 Lazy Loading 編](https://blog.jxck.io/entries/2019-05-20/lazyloading.html)


## ベクタ画像とラスタ画像

ここまでの画像最適化では、 PNG/JPEG/WebP など *ラスタ形式* の画像について記述した。

しかし、 UI アイコンなどについては、 SVG や Font といった *ベクタ形式* を用いる方が、良い場合がある。

ラスタ画像はピクセルの色情報を持ち、それを並べて表示するのに対し、ベクタ形式はパスの情報を持ち、それを描画する。

写真などはラスタ形式を利用するが、自作の画像やアイコンなどについてはベクタ形式にすることで、サイズを小さくできる場合が多い。

またパス情報を元に描画するため、どんなに拡大してもラスタ形式のように画像が荒れることはない。

以下は元サイズの 2 倍に拡大した PNG 画像(*左*)と、同じ大きさで表示した SVG 画像(*右*)を比較したスクリーンショットである。 PNG は文字の周囲が荒れているのが分かるだろう。

![2 倍に拡大した PNG と同じ大きさの SVG の比較](png-svg.png#1038x212 "png-svg")

このため、 [画像最適化戦略 Picture 編](https://blog.jxck.io/entries/2016-03-25/picture.html) で実施したようなデバイス解像度による複数画像の出し分けなども不要になる。

本サイトでは、このメリットを活かし、 UI コンポーネントは基本的にベクタフォーマットである SVG および Font を用いて構築することとした。

なお、現時点でほとんどのブラウザが  [SVG に対応](https://caniuse.com/#search=svg) している。


## SVG

本サイトのヘッダ部分に表示されているアイコンなどは、基本的に全て SVG を表示している。

また、自分で作る説明用の図なども、基本的には SVG で作るようにしている。

SVG を生成するツールは、イラストレーターなどがよく使われるようである。

しかし、筆者はイラレを持っておらず、また長いことスライドやブログの画像は全て cacoo で作成してきた。

cacoo は、作成した図を SVG 書き出すことが可能であるため、まずはこれを用いて自分のロゴを SVG で出した。

ソースは以下である。


```svg
<?xml version="1.0" encoding="utf-8"?>
<svg contentScriptType="text/ecmascript"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     zoomAndPan="magnify"
     contentStyleType="text/css"
     viewBox="-15.0 -15.0 286.0 286.0"
     xmlns:cacoo="http://cacoo.com/"
     preserveAspectRatio="xMidYMin meet"
     xmlns="http://www.w3.org/2000/svg"
     version="1.1">
  <g>
    <g transform="translate(0.0 0.0)">
      <g transform="translate(0.0 0.0)">
        <path fill="#000000" fill-opacity="1.0" d="M256.0 256.0 L0.0 256.0 L0.0 0.0 L256.0 0.0 L256.0 256.0z" stroke="none"/>
        <g transform="translate(1.0 1.0)">
          <defs>
            <clipPath id="id0">
              <path d="M0 0 L254.0 0 L254.0 254.0 L0 254.0z"/>
            </clipPath>
          </defs>
          <text font-size="90" clip-path="url(#id0)" text-decoration="none" fill="#ffffff" font-family="Helvetica" font-style="normal" font-weight="bold"/>
        </g>
      </g>
      <g transform="translate(39.0 155.0)">
        <defs>
          <clipPath id="id1">
            <path d="M0 0 L210.0 0 L210.0 95.0 L0 95.0z"/>
          </clipPath>
        </defs>
        <text font-size="90" clip-path="url(#id1)" text-decoration="none" fill="#ffffff" font-family="Helvetica" font-style="normal" font-weight="bold">
          <tspan x="5.0" xml:space="preserve" y="78.75" textLength="200.0">Jack</tspan>
        </text>
      </g>
    </g>
  </g>
</svg>
```

同じものを 256x256 の PNG と比べてみる。

PNG の方は拡大すると、特にフォント部分がぼやけているのが分かるだろう。

SVG は拡大しても問題はない。

なお、 PNG と cacoo で書き出した時点での SVG のサイズの比較は以下の通りである。

PNG
: 3860byte

SVG
: 1430byte


## SVGGo による最適化

SVG は XML であるため、メタ情報を付与することができる。

cacoo で吐いたままの SVG には、不要なメタ情報などが含まれている。

表示上不要なメタ情報は、 PNG/JPEG etc 同様に削除することでサイズ上のメリットが得られる。

これを行うツールに SVGGo があるため、これをかけてみた結果が以下である。


```svg
<svg contentScriptType="text/ecmascript"
     viewBox="-15.0 -15.0 286.0 286.0"
     preserveAspectRatio="xMidYMin meet"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M256 256H0V0h256v256z"/>
  <defs transform="translate(1 1)">
    <clipPath id="a">
      <path d="M0 0h254v254H0z"/>
    </clipPath>
  </defs>
  <g transform="translate(39 155)">
    <defs>
      <clipPath id="b">
        <path d="M0 0h210v95H0z"/>
      </clipPath>
    </defs>
    <text font-size="90" clip-path="url(#b)" fill="#fff" font-family="Helvetica" font-weight="bold">
      <tspan x="5" y="78.75" textLength="200">Jack</tspan>
    </text>
  </g>
</svg>
```

before
: 3860byte

after
:  638byte


## 手書き

SVG には、基本的に図形の描画に必要なパス情報が書かれるが、ツールによっては無駄に思えるパスの書き方が行われている場合がある。

同じ表示が実現できるのであれば、無駄なパスの書き方は極力避けたい。

cacoo の吐く SVG を読んでみると、この部分が気に食わなかったため、しかたなくエディタで手書きすることにした。

簡単な画像であれば、自分でゼロから手書きすることで、不要なメタ情報や無駄パスがない SVG を作ることができる。


```svg
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="#000000" />
  <text fill="#ffffff" font-size="90" font-weight="bold" font-family="Helvetica">
    <tspan x="44" y="233">Jack</tspan>
  </text>
</svg>
```

SVG が Valid であることは以下で確認している。

[Markup Validation Service](https://validator.w3.org/dev/tests/)

手書きと SVGGo で最適化した cacoo の SVG を比較した結果が以下である。

svggo
: 638byte

vim
: 291byte

cacoo が吐いた SVG と比べれば 20% なので、以降基本的に UI アイコンの SVG は最初から手で書くことにした。

また、 PNG と比べると実に 93% サイズを削減している。


## SVG ギャラリー

こうして手書きした SVG は以下にソースとともに掲載している。

ソースは観賞用であるため、インデントや改行などは削ってない。

それ以外で、削れそうな部分があれば今後も削っていく予定である。

DEMO: <https://labs.jxck.io/svg/>

SVG の弱点として、 HTML に埋め込んだ SVG でないと CSS で色を指定できないという問題がある。

本サイトの SVG は、外部リソースとして `<img>` で読んでいるため、色は SVG 自体に書いて作成している。

なお、 404 ページや 500 ページを作る際にデザインを考えていたところ、この SVG にリンク貼って返せばそれで良いのでは?と思い、今は単にステータスコードを書いた SVG を返すようにしている。

正しくステータスコードと Contnet-Type が設定してあれば問題ない筈なので、こだわりたい人はここで Animation SVG とかやればいいんじゃないだろうか。

サーバの出したステータスコードに応じて SVG を動的に生成し、返すようにする予定である。


## Font

フォントもベクタデータである。単色しか塗れないという制限もあるが、 UI アイコンをフォントデータとして生成し、それを指定するなどの方法がある。

代表例が [Font-Awesome](https://fortawesome.github.io/Font-Awesome/) だが、本サイトでは導入していない。

一方、単に CSS の `content:` 要素に文字を指定するだけでも、 Font を使用することができる。

このサイトは見た目が Markdown ライクになるように CSS を作っている。

装飾に使用している `#` や `-` などの文字は、 `before`/`after` 擬似要素への `content:` に文字を指定することで、フォントデータを使って装飾している。

例えば見出し `<h1>~<h4>` と `pre` は以下のように指定している。


```css
h1::before,
h2::before,
h3::before,
h4::before {
  content: "# ";
}

pre::before {
  content: "```" attr(class) "\A";

}

pre::after {

  position: relative;

  top: -1em;


  content:"\A```";
}
```

Font は、外部 SVG と違い、単色ではあるが CSS での色指定も可能である。

また、 WebFont を利用しない場合は、マシンローカルのベクタデータを流用していることになるため、画像転送のオーバーヘッドも無くなる。

最近は絵文字を装飾に使用することも視野に入るかもしれないが、絵文字は端末ごとに表示がかなり異なり、かつ特に使いたいものも無かったため、本サイトでは未使用である。
