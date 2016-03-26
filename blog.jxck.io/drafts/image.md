# [image][performance] 画像最適化戦略 PNG/JEPG 編

## Intro

本サイトで使用している PNG/JPEG 画像に対し、メタデータ削除、減色、リサイズなど基本的な最適化処理の適用戦略と、その方法および結果について。

画像最適化シリーズ第 1 回目のエントリである。

- 1: 本エントリ
- 2 TODO
- 3 TODO
- 4 TODO


## サイズ戦略

画像において最も無駄なのは、サイズの大きい画像を小さく表示している場合である。

これはネットワークでの転送上も、ブラウザのレンダリング上もオーバーヘッドになる。

逆に小さい画像を拡大して描画すると、細部がぼやける場合がある。

従って、リサイズして表示するサイズぴったりに加工できればデータ量も最適となる。

また、見た目上の劣化が生じなければ、減色や余計なメタ情報の削除なども最適化として考えられる。

(Retina など High DPI 端末に向けた対応は、別エントリで記載する)


## メタ情報削除

画像には位置情報やカラープロファイルなどのメタ情報が内包されている場合がある。
これらの情報が不要であれば消してしまうことで、データを削減できる。

そのためのツールはいくつかあるが、有名どころでは以下がある。

- [ImageOptim](https://imageoptim.com)


## 減色

一点の色の情報を 24bit で表しているものを、例えば 8bit に変換することで、データ量を減らすことができる。
もちろん、表現できる色の数も減るため、人間が見た目で気になら無い範囲で行うことになる。

- [TinyPNG](https://tinypng.com/) (JPEG も対応している)
- [ImageAlpha](https://pngmini.com/)
- [JPEGMini](http://www.jpegmini.com/) (有料)
- [pngquant](http://pngquant.org/) (CLI)


## ベースライン/プログレッシブ

JPEG は、大きい画像を送信する際に、ベースとなるデータを先に送り、差分となるデータをあとから追加して画像を完成させることができる。方式は二つある。

- ベースライン: 画像を上から順番に表示していく
- プログレッシブ: 解像度の低い画像から表示され、徐々に鮮明になっていく

なお、 PNG ではベースライン相当の形式をインタレースと呼ぶ。

どちらを使うかは、二つの観点がある。

- どちらのサイズが小さいか
- UX としてどちらが良いか


### 方式によるサイズ

まず、前者のサイズについて、少し古いが Steve 先生の調査がある。

http://yuiblog.com/blog/2008/12/05/imageopt-4/

あらゆる画像を二つの形式で保存した場合、サイズがそれぞれどうなるかを検証している。
結果だけ引用する。

> when your JPEG image is under 10K, it's better to be saved as baseline JPEG (estimated 75% chance it will be smaller)
  for files over 10K the progressive JPEG will give you a better compression (in 94% of the cases)

素材のサイズが 10K を超えるかどうかで結果が変わるそうだ。そして必ずではないので、実際に両方で保存してみて試すしかないとのこと。


### UX

細い回線で大きめの画像を表示した際、表示方式でユーザがどう感じるか、という点がある。

まず、個人的には同じサイトでも、サイズによってロードの仕方が変わるのはあまり好ましくないと感じる。

そして、このサイトでは JPEG 以外にも PNG/WebP/SVG を使う。

全ての挙動をなるべく近づけるには、サイズに限らずベースラインに統一するのが良さそうと判断した。

(あと、プログレッシブはなんか古臭いというか、ダサく感じるのは自分だけだろうか)


## gulp-image

画像フォーマットや、最適化対象によって、様々なツールがあるが、それらを一つにまとめた `gulp-image` というツールがあるため、これを採用することにした。

リサイズは別途行い、その結果に対して以下のような gulp タスクを作成した。

```js
'use strict';

let gulp = require('gulp');
let image = require('gulp-image');

const imageOption = {
  pngquant:       true,
  optipng:        true,
  zopflipng:      false, // 別途実施
  advpng:         true,
  jpegRecompress: true,
  jpegoptim:      true,
  mozjpeg:        true,
  gifsicle:       true,
  svgo:           true,
}

gulp.task('image', () => {
  gulp.src('blog.jxck.io/entries/**/*.+(png|jpeg|svg|webp)')
    .pipe(image(imageOption))
    .pipe(gulp.dest('blog.jxck.io/entries/'));
});

gulp.task('default', ['image']);
```

## 結果

gulp-image の実行結果は以下である。

```
✔ 2016-02-17/before.png -> before=57.88 KB after=22.07 KB reduced=35.82 KB(61.9%)
✔ 2016-02-17/after.png -> before=67.92 KB after=25.22 KB reduced=42.7 KB(62.9%)
✔ 2016-02-11/net-internals-prerender.png -> before=65.7 KB after=26.05 KB reduced=39.65 KB(60.4%)
✔ 2016-02-17/zopfli.png -> before=77.52 KB after=49.29 KB reduced=28.23 KB(36.4%)
✔ 2016-03-04/before.png -> before=253.06 KB after=100.73 KB reduced=152.33 KB(60.2%)
✔ 2016-03-04/after.png -> before=253.31 KB after=99.47 KB reduced=153.84 KB(60.7%)
```

全体でみると、 775.39KB => 452.57KB (42%) の削減になった。
