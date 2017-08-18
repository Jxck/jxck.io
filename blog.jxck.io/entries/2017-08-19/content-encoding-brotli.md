# [brotli][zopfli][http][performance] Brotli を用いた静的コンテンツ配信最適化と Accept-Encoding: br について

## Intro

High Sierra に乗る Safari 10.13 で Brotli 対応がされるということで、メジャーブラウザの Brotli 対応が概ね揃うことになる。

そこで、本サイトも Brotli による静的コンテンツ配信に対応した。


## brotli

brotli は Google が開発した新しい圧縮形式である。

[Brotli Compressed Data Format](https://www.ietf.org/rfc/rfc7932.txt)

LZ77 とハフマン符号化を合わせたものであり、元々は WOFF2 の仕様の一部として作られたものが、汎用化されたものである。

過去に公開されている [zopfli](https://github.com/google/zopfli) と比べても、さらに圧縮率が [20-26%](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html) 向上しており、解答速度は zlib 相当とされている。

この効果に寄与する特徴的な要因として、仕様に含まれる辞書が挙げられる。


## Static Dictionary

圧縮アルゴリズムは、簡単に言えば頻出する一致部分を短い情報で置き換える方式が中心となる。

ここで、頻出する一致部分を、対象とするコンテンツの中から探す場合は、探索する長さや範囲の広さなどによって結果が変わる。

もちろん、広い範囲を丁寧に探索すれば、効率よく圧縮が可能だとしても、それでは時間がかかってしまう。

そこで、コンテンツの種類に応じて、あらかじめ頻出する単語パターンを辞書として用意する方式が使用される場合がある。

Brotli は、以下の要領で構築した 122MB にもなる辞書を仕様に含み、これによって特に Web コンテンツにおいて高い圧縮率を実現している。

> Unlike other algorithms compared here, brotli includes a static dictionary. It contains 13'504 words or syllables of English, Spanish, Chinese, Hindi, Russian and Arabic, as well as common phrases used in machine readable languages, particularly HTML and JavaScript. The total size of the static dictionary is 122'784 bytes. The static dictionary is extended by a mechanism of transforms that slightly change the words in the dictionary. A total of 1'633'984 sequences, although not all of them unique, can be constructed by using the 121 transforms. To reduce the amount of bias the static dictionary gives to the results, we used a multilingual web corpus of 93 different languages where only 122 of the 1285 documents (9.5 %) are in languages supported by our static dictionary.

[Comparison of Brotli, Deflate, Zopfli, LZMA, LZHAM and Bzip2 Compression Algorithms](http://www.gstatic.com/b/brotlidocs/brotli-2015-09-22.pdf)

なお、仕様には HexString で辞書の全体が記載されているが、これを Ascii に変換したものを以下に置いた。

これを見ると、引用したように HTML や JS などのコンテンツが強く圧縮されるだろうことが、想像できる。

[brotli dictionary ascii](brotli-dict.txt)


## Accept-Encoding: br

Google が提案した圧縮形式としては、本サイトも既に対応している Zopfli もある。

[zopfli で静的コンテンツの gzip 配信と Content/Transfer-Encoding について](https://blog.jxck.io/entries/2016-02-17/content-encoding-zopfli.html)

Zopfli が gzip 互換であり既存のブラウザでもそのまま利用できたのに対し、 Brotli は全く新しいフォーマットとなっている。

つまりブラウザが Brotli に対応していない限り、 Brotli 形式のファイルを配信することができない。

ブラウザが対応している形式については、ブラウザが Accept-Encoding ヘッダにそれを記載し、サーバとネゴシエーションする方法が取られる。

これまで、多くのブラウザは以下のような値を返していた。


```
Accept-Encoding: gzip, deflate
```

ここに、 `br` があれば Brotli に対応しているため、 Brotli で圧縮したファイルをレスポンスできる。


```
Accept-Encoding: gzip, deflate, br
```

現状、 Chrome などは HTTPS でしか Brotli を許可せず、またコンテンツによっては Brotli を許可しないフォーマットなどもあるかもしれない。

しかし、それら例外を除けば、単純にテキストベースで **大半のリクエストのサイズが 4 byte 増える** ことを意味する。

この変更は、 Web 全体のトラフィックで考えるとかなり大きいと言えるだろう。

プロトコルレベルでは、 HPACK のように 1byte でもペイロードを減らそうとしている現状、この変化は無視できない。

ところが、追加したところで、対応しないトラフィックの方が多いうちは、オーバーヘッドの方が多くなる。

そのため、ちょっとしたフォーマットが提案されたからといって、ブラウザのリクエストのデフォルト値が簡単に変わるわけではない。

Accept ヘッダへの `image/webp` の追加などもそうだが、相応の効果と普及を考えての変更と見ることができるだろう。

そして、前述の Safari の実装が済むと、主要ブラウザのサポートは完了する。

brotli の圧縮効果が 4byte 以上あるならば、このヘッダを見過ごす手はない。


## Brotli 対応

本サイトは h2o でサーブしており、 h2o はオンザフライの Brotli 圧縮に対応している。

[Configure > Compress Directives > compress](https://h2o.examp1e.net/configure/compress_directives.html#compress)

しかし、本サイトは zopfli も含めビルドプロセスで圧縮をしているので、ここで Brotli 圧縮をあらかじめ行う構成をとる。

圧縮済みの `.br` を用意すれば、以下の設定で Accept-Encoding ベースのコンテントネゴシエーションを経て Brotli を配信できる。

[Configure > File Directives > file.send-compressed](https://h2o.examp1e.net/configure/file_directives.html#file.send-compressed)


## Brotli 圧縮

Brotli の実装は Google が公開している。

[google/brotli](https://github.com/google/brotli)

これを README の通りビルドし、実際にいくつかのコンテンツで圧縮結果を比較した。

予備実験とし、 `--quality` を変えて試したところ、基本的には高いほど効果があり、速度はほとんど変わらなかった。

そこで、以下は全て最高値である `--quality 10` を採用している。

zopfli は、以前の検証で出した `--i30` を採用している。


### HTML

当サイトの平均的なサンプルとして、[一つ前の記事](https://blog.jxck.io/entries/2017-08-15/universal-mjs-ecosystem.html) の HTML を採用した。

| file type | size  | ratio |
|:----------|------:|------:|
| .html     | 22260 |  100% |
| .html.gz  |  6347 |   29% |
| .html.br  |  5658 |   25% |


zopfli と比べて、 4 point 圧縮率が向上している。


### JS

[highlight.min.js](https://www.jxck.io/assets/js/highlight.min.js)

| file type | size  | ratio |
|:----------|------:|------:|
| .js       | 42536 |  100% |
| .js.gz    | 16289 |   38% |
| .js.br    | 15775 |   37% |


zopfli と比べて、 1 point 圧縮率が向上している。

サイズとしては 1K 程度減っているので、かなり圧縮が効いている。


### CSS

[mozaic.css](https://www.jxck.io/assets/css/mozaic.css)

| file type | size  | ratio |
|:----------|------:|------:|
| .css      | 1454  |  100% |
| .css.gz   |  503  |   35% |
| .css.br   |  402  |   28% |


あまり大きなサイズの CSS を使っていなかったので微妙ではある。

zopfli と比べて、 7 point 圧縮率が向上している。


### Web Font

[本サイト用にビルド](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html) したフォントファイルを採用する。

[NotoSansCJKjp-Jxck-Regular.woff](https://www.jxck.io/assets/font/NotoSansCJKjp-Jxck-Regular.woff)

| file type | size   | ratio |
|:----------|-------:|------:|
| .otf      | 486132 |  100% |
| .otf.gz   | 382322 |   79% |
| .otf.br   | 344003 |   71% |


[NotoSansCJKjp-Jxck-Regular.otf](https://www.jxck.io/assets/font/NotoSansCJKjp-Jxck-Regular.otf)

| file type | size   | ratio |
|:----------|-------:|------:|
| .woff     | 387528 |  100% |
| .woff.gz  | 387527 |   99% |
| .woff.br  | 387533 |  101% |


OTF は圧縮効果が高いが、 WoFF は逆効果となっている。

これは WoFF がそもそも圧縮を仕様に含んでいるからと考えられる。


### PNG

[mozaic.png](https://www.jxck.io/assets/img/mozaic.png)

| file type | size  | ratio |
|:----------|------:|------:|
| .png      | 37509 |  100% |
| .png.gz   |  3108 |    8% |
| .png.br   |  3103 |    8% |


圧縮効果は高いが、 zopfli と brotli では有意な差はなかった。


### WebP

[mozaic.webp](https://www.jxck.io/assets/img/mozaic.webp)

| file type | size  | ratio |
|:----------|------:|------:|
| .webp     |  9474 |  100% |
| .webp.gz  |  2609 |   28% |
| .webp.br  |  2544 |   27% |


WebP も圧縮済みのフォーマットであるため、圧縮が逆効果となる場合が多いが、このファイルでは効果が出ている。

しかし、 jpeg をベースにした別の webp では圧縮が逆効果になっているものもあったので、このあたりはファイルごとに見ていく必要がある。


### SVG

[mozaic.svg](https://www.jxck.io/assets/img/mozaic.svg)

| file type | size  | ratio |
|:----------|------:|------:|
| .svg      |  2871 |  100% |
| .svg.gz   |   300 |   10% |
| .svg.br   |   269 |    9% |


テキストであるためかなり圧縮率は高いが、 zopfli との差は小さい。


## 速度比較

同じパラメータで、本サイト全体の圧縮タスクの実行時間を比較した。

圧縮対象は、 html/js/css/png/txt/md など 890 ファイルである。

- zopfli: 190.33s user 2.77s system 98% cpu 3:15.28  total
- brotli:  22.44s user 1.42s system 99% cpu   24.014 total

測定ミスではなく、圧倒的に brotli の方が速い。

単発で試しているうちから圧倒的に速いことは認識しており、サンプルを増やしたため歴然とした差となった。


## まとめ

本サイトのコンテンツに対しては、 brotli の圧縮効果は概ね zopfli より高く、これは辞書との相性が大きく効いていると考えられる。

また、ブラウザは brotli への対応が進み、コンテントネゴシエーションによる配信が可能となりつつある。

本サイトは、コンテンツを全面的に brotli で事前圧縮し、対応ブラウザに配信するよう対応した。
