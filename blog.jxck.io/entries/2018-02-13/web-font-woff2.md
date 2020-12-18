# [woff2][web font][performance] WebFont の WOFF2 対応によるサイズ最適化


## Intro

Safari 10.0 から WOFF2 がサポートされており、これをもって IE 以外のメジャーブラウザではサポートが揃いつつある。

本サイトは WOFF 形式での Web Font を提供しているが、 WOFF2 形式では WOFF よりも 12% 程度圧縮率が高いため、本サイトでも WOFF2 に移行することとした。

フォーマット変更による効果について解説する。


## WOFF File Format 2.0

本サイトでは、 Noto Sans CJK から必要なフォントのみを抽出したサブセットを、 WOFF 形式で読み込む構成を取っている。

[Noto Sans の Web Font 対応とサブセットによる最適化 \| blog.jxck.io](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html)

その後、必要な文字が増えフォントファイルを更新することにしたが、当時対応していなかった Safari が WOFF2 対応を始めていることもあり、これを機に更新することとした。

[What's New in Safari 10.0](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html)

WOFF2 の仕様は以下に有る。

<https://w3c.github.io/woff/woff2>

WOFF2 は WOFF よりも圧縮率が高いとされている。

これは、 WOFF2 が圧縮アルゴリズムとして Brotli を採用していることが大きい。

そもそも、 Brotli はもともと WOFF2 の圧縮率を上げるために仕様に含まれていたアルゴリズムを、汎用圧縮形式として取り出したものである。

本サイトは既に brotli を採用している。

[Brotli を用いた静的コンテンツ配信最適化と Accept-Encoding: br について \| blog.jxck.io](https://blog.jxck.io/entries/2017-08-19/content-encoding-brotli.html)


## 圧縮効果

全てのエントリで利用している文字を再調査したところ、以下を収録する必要があることがわかった。

([Unicode を解説する記事](https://blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html) や [突然の死](https://blog.jxck.io/entries/2017-10-31/houdini-paint-api.html) を書いたことによる影響が大きい)


```
© 乖 忖 揉 汲 牢 矩 舵 蒙 謳 辿 鯖 黎 ＜ ＞ ＿ ￣ 𠮟 𠮷 𩸽
```

なお、本当は Emoji についての言及もしたため、 [Noto Color Emoji](https://www.google.com/get/noto/help/emoji/) からの追加も考えたが、非常に少ないため、運用負荷を下げるため Emoji はシステムフォントに任せることとした。

結果、今回作成するフォントセットは以下の 全エントリの利用文字 - (Emojio x 5 + ZWJ) = 2416 文字である

[All.txt](All.txt)

ここから、 [以前解説した方法](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html) でサブセット化し、 WOFF と WOFF2 を生成してサイズを比較する。


## サイズ比較

同じサブセットから、 WOFF/WOFF2 を生成し、それぞれサイズを確認する。

| size   | format | file                                    |
|-------:|:------:|:----------------------------------------|
| 498.8K | otf    | NotoSansCJKjp-Jxck-Regular-201802.otf   |
| 391.6K | woff   | NotoSansCJKjp-Jxck-Regular-201802.woff  |
| 345.7K | woff2  | NotoSansCJKjp-Jxck-Regular-201802.woff2 |


woff と woff2 を比べると 12% ほど圧縮されている。

bold についても同様の結果が得られた。


## 圧縮

本サイトでは、基本的に静的コンテンツを [zopfli](https://blog.jxck.io/entries/2016-02-17/content-encoding-zopfli.html) と [brotli](https://blog.jxck.io/entries/2017-08-19/content-encoding-brotli.html) で圧縮してレスポンスしている。

WOFF2 は既に brotli を用いた圧縮をしているため、もし経路上の圧縮が必要でないのであれば、圧縮プロセスから外す必要が出るため、確認する。

| size   | format | file                                       |
|-------:|:------:|:-------------------------------------------|
| 345.7K | -      | NotoSansCJKjp-Jxck-Regular-201802.woff2    |
| 345.7K | brotli | NotoSansCJKjp-Jxck-Regular-201802.woff2.br |
| 345.8K | zopfli | NotoSansCJKjp-Jxck-Regular-201802.woff2.gz |


予想通り、追加の圧縮は無意味、もしくは逆効果であるため、 WOFF2 は圧縮プロセスから外すこととする。


## 対応

WOFF2 は、 IE や一部ブラウザではサポートされていないが、システムフォントにフォールバックするだけなので、表示フォントに対してセンシティブではない本サイトでは問題とは捉えない。

そこで本サイトでは、ストレージを節約するためにも WOFF のサポートを止め、 WOFF2 のみを提供することとした。


## Related

その他 WebFont に関連する検証は [web font](https://blog.jxck.io/tags/web%20font.html) タグにまとまっている。
