# [avif][image][performance] 画像最適化戦略 AVIF 編

## Intro

本サイトの PNG/JPEG で提供している画像については、よりサイズが小さくなりやすい AVIF 形式を提供し、対応ブラウザに配信するようにした。

フォーマットを出し分けるため、画像の指定は `<picture>` 要素を用いて対応した。

画像最適化シリーズ第 6 回目のエントリである。

1. [画像最適化戦略 PNG/JPEG 編](https://blog.jxck.io/entries/2016-03-24/optimize-image.html)
2. [画像最適化戦略 Picture 編](https://blog.jxck.io/entries/2016-03-25/picture.html)
3. [画像最適化戦略 WebP 編](https://blog.jxck.io/entries/2016-03-26/webp.html)
4. [画像最適化戦略 SVG/Font 編](https://blog.jxck.io/entries/2016-03-27/svg-font-base-ui.html)
5. [画像最適化戦略 Lazy Loading 編](https://blog.jxck.io/entries/2019-05-20/lazyloading.html)
6. [> 画像最適化戦略 AVIF 編](TODO)


## AVIF

AVIF は、ロイヤリティフリーなコーデックを目指して AOMedia が開発した AV1 を、画像に転用したものだ。AV1 Image File Format の略とされ、AV1 の I フレームを静止画として表示するイメージだ。

Chrome 85, Firefox 93 あたりから対応が始まり、いまはデフォルトで有効になっている。

Edge はなぜか AVIF を取得しないようだが、理由はわかってない。

Safari は、AOM には参加しているようだが WebP の対応も割と最近なので、気長に待ちたい。


## AVIF への変換

本サイトでは、基本的に PNG/JPEG/GIF がソースとして存在し、それを WebP に変換している。これと同様に AVIF への事前変換を行う。

変換ツールはいくつかあるが、Go が Node あたりが使いやすそうだった。

- Kagami/go-avif
  - https://github.com/Kagami/go-avif
- lovell/avif-cli
  - https://github.com/lovell/avif-cli

node の方が GIF にも対応してそうだったので、こちらを採用した。

```shell-session
$ npx avif -h

Convert images to AVIF

Options:
    --input              Input file name(s), supports globs/wildcards
           [string] [default: "*.{jpg,jpeg,tif,tiff,webp,png,gif,svg}"]
    --output             Output directory, default is same directory as
                         input                   [string] [default: ""]
    --quality            Quality vs file size, 1 (lowest/smallest) to
                         100 (highest/largest)   [number] [default: 50]
    --speed              CPU effort vs file size, 0 (slowest/smallest)
                         to 8 (fastest/largest)   [number] [default: 5]
    --lossless           Use lossless compression
                                             [boolean] [default: false]
    --chromaSubsampling  Set to '4:2:0' to use chroma subsampling
                                            [string] [default: "4:4:4"]
    --overwrite          Allow existing output files to be overwritten
                                             [boolean] [default: false]
    --verbose            Write progress to stdout
                                             [boolean] [default: false]
-h, --help               Show help                            [boolean]
    --version            Show version number                  [boolean]
```


### GIF

しかし、実際にアニメーション GIF を変換してみるとアニメーションが動かなかった。

いくつか調べると `libavif` の Wiki に書かれていたので、これを用いて ffmpeg と avifenc を組み合わせて生成することができた。

```shell-session
$ ffmpeg -i $*.gif -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 15 $*.avif
```

- AVIF Sequences
  - https://github.com/AOMediaCodec/libavif/wiki/Sequences


### Picture

すでに WebP の対応を `<picture>` で行なっているため、そこに AVIF の srcset を追加した。

```html
<picture>
  <source type=image/avif srcset=jxck.avif?220107_021153>
  <source type=image/webp srcset=jxck.webp?211030_222336>
  <img loading=lazy decoding=async src=jxck.png?211006_145713 alt="jxck" title="jxck logo" width=256 height=256>
</picture>
```


### DEMO

動作する DEMO を作成した。

- WebP DEMO | labs.jxck.io
  - https://labs.jxck.io/avif/

この中で、いくつかパラメータを変えながら PNG/WebP とも比較を行なった。

- lossy
- lossless
- animation
- color animation

実際、ブログ本体で使われている画像では、そこまでクオリティが高いものを求めているわけではない。

そして、ブログ全体の WebP は、cwebp コマンドで言う `-q 40` を使っており、これが avif コマンドの quality と同じ尺度で考えてよいのかを比較したが、大差はなかったため同じく `40` を採用することにした。

かわりに、本サイトの画像は全て事前エンコードであり、変換に時間がかかっても問題はないため、`--speed 0` で限界まで圧縮率を高めることにした。


### Size

パラメータを決定したのでこれを用いて雑に全画像を AVIF 化し、ついでに WebP も最新のエンコーダでエンコードし直した。

そして、サイト内全ての WebP と AVIF のサイズを合計すると以下のようになった。

- WebP: 13936088byte = 13.3MB
- AVIF: 5467910byte = 5.21MB

正直ここまでの差が出ると、おそらく WebP と AVIF の Quality 指定のスケールは同じではない可能性が考えられるが、サイトを見た感じで特に画像に問題を感じてないためこの設定でデプロイすることにした。


## Outro

雑に変換しただけでも画質を損ねることなく、かなりファイルを圧縮できそうなことがわかった。

特に時間をかけてエンコードすればかなりの圧縮率になるため、事前に圧縮可能な場合はより効果を発揮しそうだ。

あとは、APNG をどうするかはおいおい考えていきたい。


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/avif/


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Ship: AV1 Still Image File Format (AVIF)
    - https://groups.google.com/g/mozilla.dev.platform/c/eWIa9XXxHsc/m/Wzs20e0kAAAJ
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
  - Using AVIF to compress images on your site
    - https://web.dev/compress-images-avif/
  - Lots to see in Firefox 93! - Mozilla Hacks - the Web developer blog
    - https://hacks.mozilla.org/2021/10/lots-to-see-in-firefox-93/
- Presentation
- Issues
  - 207750 - AVIF decoding support
    - https://bugs.webkit.org/show_bug.cgi?id=207750
- Other
  - https://caniuse.com/avif