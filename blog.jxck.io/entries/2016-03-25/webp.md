# [webp][image][performance] 画像最適化戦略 WebP 編

## Intro

本サイトの PNG/JPEG で提供している画像については、よりサイズが小さくなりやすい WebP で、同様のものを提供し、対応ブラウザに配布するようにした。フォーマットを出し分けるため `<picture>` 要素にて対応した。

画像最適化シリーズ第 2 回目のエントリである。

- 1: [画像最適化戦略 PNG/JEPG 編](/entries/2016-03-24/optimize-image.html)
- 2: [> 画像最適化戦略 WebP 編](/entries/2016-03-25/webp.html)
- 3: [画像最適化戦略 編](/entries/2016-03-26/picture.html)
- 4: [画像最適化戦略 SVG/Font 編](/entries/2016-03-27/svg-font-base-ui.html)

## WebP

従来の Web において、画像は用途毎に PNG/JPEG/GIF などを使い分けていた。
一般的には以下のような使い分けが行われている。


- PNG : 主に UI アイコンなど色変化の少ない画像
- JEPG: 主に写真など色変化が多い画像
- GIF : 主に GIF アニメメーション


WebP は Google が開発した画像フォーマットであり、これら三つの用途全てに適した上で、さらに小さいサイズに圧縮できる場合が多い。

また、 WebP は動画フォーマットである WebM の 1 フレームに相当するため、 WebP アニメーションは簡易 WebM と言っても良い。
GIF アニメよりも、色数が多く綺麗なアニメーションを小さいサイズで作ることができるため、技術ブログで言えばスクリーンデモのキャプチャなどに適しているだろう。

現状まだ対応するブラウザは限られているが、対応しているのであれば WebP で配布するのが望ましい場合が多い。


## WebP 変換

本サイトの画像は、 Mac で取得したスクリーンショットか cacoo で作成した図、その他フリー素材が中心である。
cacoo で作成した画像は SVG で書き出すため、主にスクリーンショットかフリー素材 が WebP 変換の対象となる。

WebP への変換ツールは、 Google が公式に提供しているバイナリか、 Linux/Mac ならパッケージで提供されているものを使うことができる。

[Downloading and Installing WebP](https://developers.google.com/speed/webp/download)


```sh
$ brew install webp    # mac
$ apt-get install webp # linux
```

他にも、 gulp などのプラグインや、 GUI ツールなどもある。


## cwebp

PNG からの変換は cwebp コマンドで行う。

```sh
$ cwebp
Usage:

   cwebp [options] -q quality input.png -o output.webp

   where quality is between 0 (poor) to 100 (very good).
   Typical value is around 80.

   Try -longhelp for an exhaustive list of advanced options.
```

基本的には `-q` の調整になるが、これは画像ごとに結果をみながらやるしかない。

まずは、デフォルトの 80 で比較していく。


- [jxck.png ](/assets/img/jxck.png) : 4061 byte
- [jxck.webp](/assets/img/jxck.webp): 1810 byte


## `<picture>` での WebP の指定

ブラウザにおける [WebP の対応はまだまだ限定的](http://caniuse.com/#feat=webp) であるため、非対応ブラウザには PNG/JPEG/GIF などを送る必要がある。

この方法として、 JS による補完や、 User-Agent を用いたサーバサイドでの分岐などが紹介される場合がある。
しかし、別途 JS を利用する場合はイニシャルレンダリングへの影響を免れず、 User-Agent での分岐は保守性の問題から避けるべきパターンの一つといえる。

現時点では、 HTML の `<picture>` を用いることで、ブラウザ自体にそれを判断させることができるため、本サイトではこの方法を採用することとした。

画像を以下のように指定することで、対応ブラウザが自ら WebP をリクエストするようになり、 WebP や `<picture>` に対応していない場合は `<img>` に指定した画像にフォールバックする。


```html
<picture>
  <source type=image/webp srcset=hero-image.webp>
  <img src=hero-image.png alt="hero image">
</picture>
```

この場合、 WebP に対応しているが `<picture>` に対応していないブラウザが気になるところだが、現状 [picture](http://caniuse.com/#search=picture) に対応し [webp](http://caniuse.com/#search=webp) に対応していないブラウザは無い。

従って `<picture>` に対応していない(= WebP も非対応)ブラウザに向けたフォールバックとして、 `<img>` には PNG を指定する。


この指定は、現在 WebP に対応していないブラウザが将来対応した場合に、サイトに何も手を加える必要がない。

将来、新しい画像フォーマットが出た場合は `<source>` を加えることで、ブラウザに選択肢を増やせば良いため、 UA のメンテナンスと比べても、好ましい方法と言える。
