# [svg][image][performance] 画像最適化戦略 SVG/Font 編

## Intro

本サイトで使用している UI アイコン系の画像を、ギリギリまで最適化した手書き SVG に置き換えた。
また、装飾に画像ではなく CSS の contents を利用することで、ローカルフォントデータを利用することで、転送を無くす工夫にも言及する。


## ベクタ画像とラスタ画像

ここまでの画像最適化では、 PNG/JPEG/WebP など **ラスタ形式** の画像について記述した。
しかし、 UI Icon などについては、 SVG や Font といった **ベクタ形式** を用いることで、より軽量に装飾を施すことも可能になる。

また、 [TODO] で実施したように、ラスタ形式の画像はデバイスによって表示における最適なサイズを出し分けることが望ましいが、ベクタ形式の画像は拡大縮小が自在なため、対応する全てのデバイスでフレキシブルに表示が可能であるという特徴がある。

本サイトでは、このメリットを活かし、 UI コンポーネントは基本的に SVG および Font を用いて構築することとした。


## SVG

本サイトのヘッダ部分に表示されているアイコンなどは基本的に全て SVG を表示している。

SVG を生成するツールはいくつかあり、イラストレーターなどがよく使われるようである。
しかい、筆者はイラレを持っておらず、また長いことスライドやブログの画像は全て cacoo で作成してきた。
cacoo は、作成した図を SVG 書き出すことが可能であるため、まずはこれを用いて自分のロゴを SVG で出した。

画像は 256x256 であるため、 SVG を同じサイズで表示したのが以下である。拡大すると、特にフォント部分がぼやけるのが分かるだろう。


### PNG

![jxck.png#256x256](/assets/img/jxck.png)



### SVG

![jxck.svg#256x256](/assets/img/jxck.svg)


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

なお、 PNG と cacoo で書き出した時点での SVG のサイズの比較は以下の通りである。

- PNG: 3860byte
- SVG: 1430byte


## SVGGo による最適化

SVG は XML であるため、メタ情報を付与することができる。
cacoo で吐いたままの SVG には、不要なメタ情報などが含まれている。

表示上不要なメタ情報は、 PNG/JPEG etc 同様削除することでサイズ上のメリットが得られる。

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

- before: 3860byte
- after :  638byte


## 手書き

SVG には、基本的に図形の描画に必要なパス情報が書かれるが、ツールによっては無駄に思えるパスの書き方が行われている場合が有る。

同じ表示が実現できるのであれば、無駄なパスの書き方は極力避けたい。

cacoo の吐く SVG を読んでみると、この部分が気に食わなかったため、しかたなくエディタで手書きすることにした。

簡単な画像であれば、自分で位置から手書きすることで、不要なメタ情報も無駄パスもなく SVG を作ることができる。


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

- svggo: 638byte
- vim: 291byte

cacoo が吐いた SVG と比べれば 20% なので、以降基本的に UI Icon の SVG は最初から手で書くことにした。
また、 PNG と比べると実に 93% サイズを削減している。


## SVG ギャラリー

こうして手書きした SVG は以下にソースとともに掲載している。
インデント以外に、削れそうな部分があれば今後も削って行く予定である。

[labs.jxck.io/svg](labs.jxck.io/svg)


埋め込み SVG ではないので、色は変えられない。


なお、 404 ページとか 500 ページとかを作る際に、デザインを考えてたところ、この SVG にリンク貼って返せばそれで良いんじゃないかと思って、今は単にステータスコードを書いた SVG を返すようにしている。

正しくステータスコードと Contnet-Type が設定してあれば問題ない筈なので、こだわりたい人はここで Animation SVG とかやればいいんじゃないだろうか。


## Font

フォントもベクタデータである。単色しか塗れないという制限もあるが、フォントの記号をアイコンとして使うこともある。

代表例が [Font-Awesome](https://fortawesome.github.io/Font-Awesome/) だが、本サイトでは使っていない。

しかし、単に CSS の `content:` 要素に文字を指定すれば Font を使用することができる。

このサイトは見た目が Markdown ライクになるように CSS を作っているが、装飾に使用される `#` や `-` などの文字は、 `before`/`after` 擬似要素への `content:` に文字を指定することで、フォントデータを使って装飾している。

Font は、外部 SVG と違い、単色ではあるが CSS での色指定も可能である。
また、 WebFont を利用しない場合は、マシンローカルのベクタデータを流用していることになるため、画像転送のオーバーヘッドも無くなる。

最近は絵文字を装飾に使用することも視野に入るかもしれないが、絵文字は端末ごとに表示がかなりことなる可能性があり、かつ特に使いたいものも無かったため、本サイトでは未適用である。
