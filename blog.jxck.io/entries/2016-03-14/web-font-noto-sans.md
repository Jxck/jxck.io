# [noto sans][web font][performance] Noto Sans の Web Font 対応とサブセットによる最適化

## Intro

このサイトのフォントに Web Font を適用することにした。

フォントには Google と Adobe が協同で開発した Noto Sans CJK JP を採用した。

また、このサイトでは使用しないだろう文字を削除したサブセットを作ることで、フォントサイズを最適化した。


## フォントサイズの最適化

Noto font は、そもそも豆腐(フォントがなかった場合に代替表示される四角)が出ないように(No-豆腐)することをコンセプトにしているため、フォントの網羅率は非常に高い。

そのため Web Font として利用する場合は、全体だとサイズが大きすぎるため、言語毎に提供されるフォントセットの中から、必要なフォントのみを適用することになる。

本サイトでは、ASCII 、記号、日本語のフォントを用いる。

しかし、特に網羅された漢字の中には、日常では使わない文字が多々ある。

加えて、このサイトはあくまで *技術ブログ* なので、さらに使用する文字は限定される。

そこで、提供されているフォントセットの中から、不要な文字を取り除いたサブセットを作成することで、フォントサイズを最適化が可能である。

Noto Sans は [OFL ライセンス](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) であるため、非常に自由度が高く、こうした変更が可能である。


## Noto Sans Fonts

まず配布ページから、Noto Sans CJK JP をダウンロードしてくる。

[Noto Sans CJK JP](https://www.google.com/get/noto/#sans-jpan)

ここに収録されている文字については、[google fonts](https://www.google.com/fonts/earlyaccess#Noto+Sans+JP) の方に書かれていた。

> Note: Noto Sans JP has been subsetted to 6,992 characters and contains most of the characters defined by JIS X 0208 and some additional characters from Shift_JIS.  The set includes 6,390 Kanji as well as 602 non Kanji characters such as Hiragana, Katakana (including half-width variants), ASCII and full-width and punctuations.
> --- https://www.google.com/fonts/earlyaccess#Noto+Sans+JP

このサブセットが含む JIS X 0208 とは、いわゆる JIS 漢字コード のことであり、7000 字近い漢字がきっちり収録されている。

そして font-weight (太さ) が 100~900 まで 7 段階提供されており、それぞれサイズは以下となっている。(やはり太いとデカい)

- 100 NotoSansJP-Thin.otf      (4.0M)
- 300 NotoSansJP-Light.otf     (4.2M)
- 350 NotoSansJP-DemiLight.otf (4.3M)
- 400 NotoSansJP-Regular.otf   (4.3M)
- 500 NotoSansJP-Medium.otf    (4.3M)
- 700 NotoSansJP-Bold.otf      (4.4M)
- 900 NotoSansJP-Black.otf     (4.6M)

ここまでがデフォルトの状態である。ここから削って行く。


## Font Weight

本サイトでは、Markdown から生成していることもあり、「通常の文字」と「*太文字*」しか基本的に使わない。

(CSS を別途当てて、調整するといったことをしていない)

したがって、Regular と Bold のみ使用する。

この時点で 8.7MB ある。

- 400 NotoSansJP-Regular.otf (4.3M)
- 700 NotoSansJP-Bold.otf    (4.4M)

ここからさらに絞っていく。


## JIS X 0208 第一水準

収録されている、JIS X 0208 は以下のようになっている。

> JIS (日本工業規格)で定められた漢字の規格で、JIS X 0208 に含まれる。日常で使用頻度の高い漢字を集め、コンピューターで利用するためにコード化したもの。JIS 第 1 水準は 2965 字で、常用漢字 1945 字とその他の人名用漢字が含まれており、通常の文書であれば JIS 第 1 水準の文字だけで記述できるとされている。JIS 第 2 水準は 3390 字で、DTP で使用するフォントの多くは、JIS 第 1 水準と JIS 第 2 水準を網羅している。JIS 第 3 水準および JIS 第 4 水準は、業種によって必要になる特殊な記号などを集めたもので、JIS X 0208 を拡張する別の規格である。
> --- [http://yougo.ascii.jp/caltar/JIS 漢字水準](http://yougo.ascii.jp/caltar/JIS漢字水準)

しかし、このブログは *技術ブログ* であり、使われる漢字は非常に限定的だ。

そこで、必要な漢字のみを収録したサブセットを作成する。


## 基本ラテン文字 (0000-0070)

いわゆる ASCII 文字。

(ちなみに、`pre > code` 内のサンプルコードは別のフォントを使うので、コード用という訳ではない)

[Unicode 基本ラテン文字 - Basic Latin -](http://homepage2.nifty.com/k_maeda/code/uni/uni000.html)

制御文字などを除いて、以下の範囲を全て収録。

```text:BasicLatin.txt
```


## CJK 記号と句読点(3000-303F)

句読点やカッコなど。基本的に `[](){}` など半角のカッコを使うが、全角のカッコも必要になる。

[Unicode CJK 記号と句読点 - CJK Symbols and Punctuation -](http://homepage2.nifty.com/k_maeda/code/uni/uni090.html)

以下が候補

```text:SymbolsAndPunctuationFull.txt
```

この中から、使わないものを除き、以下のみを収録。

```text:SymbolsAndPunctuation.txt
```


## ひらがな(3040-3090)

[Unicode ひらがな - Hiragana -](http://homepage2.nifty.com/k_maeda/code/uni/uni091.html)

以下が候補

```text:HiraganaFull.txt
```

以下を収録

```text:Hiragana.txt
```


## カタカナ(30A0-30F0)

[Unicode カタカナ - Katakana -](http://homepage2.nifty.com/k_maeda/code/uni/uni092.html)

以下が候補

```text:KatakanaFull.txt
```

以下を収録

```text:Katakana.txt
```


## 半角形と全角形(FF00-FFE0)

全角の英数や半角カタカナなど。しかし、このブログで *これらは使わない*。

[Unicode 半角形と全角形 - Halfwidth and Fullwidth Forms -](http://homepage2.nifty.com/k_maeda/code/uni/uni120.html)

以下が候補

```text:Halfwidth-and-Fullwidth-Forms.txt
```

収録はしない。


## 漢字

さていよいよ漢字である。単純に Unicode の範囲で指定するわけにはいかない。

過去に書いた記事から、使用する漢字を抽出しようかとも思ったが、ブログを続けていけば新しい漢字が出る可能性は非常に高い。

そのたびにフォントセットを作り直すこともできるが、フォントには長時間のキャッシュを効かせたいため、なるべく一発でこのブログに適したサブセットを作りたいと考える。


### 第一水準漢字

他のサイトでは「第一水準漢字」に絞るという方法も紹介されている。

以下に一覧がある。

[JIS X 0208 第一水準 2965 文字](http://kanji.jitenon.jp/cat/jisdai1.html)

このサブセットを適用しているサイトが多いということは、経験上第二水準にはブログなどの Web サイト使う漢字が少ないということなのだろう。

これでもだいぶ減っているが、ざっと見ても使わなそうな漢字はかなり多い。

先に引用した定義では、第一水準はざっくり「常用漢字 + 人名用漢字」となっている。

このサイトでは、人名の引用は基本的に Twitter ID などになるだろう。というか書くのは自分なのでそう縛ればいい。

そこで、常用漢字のみに絞ってみた。


### 常用漢字

常用漢字は文化庁が告示している。2010 年に改定があった。

> 一般の社会生活において現代の国語を書き表すための漢字使用の目安を、次の表のように定める。
> --- [常用漢字表(平成 22 年内閣告示第 2 号)](http://kokugo.bunka.go.jp/kokugo_nihongo/joho/kijun/naikaku/kanji/)

以下に一覧がある。

[常用漢字 2136 文字](http://kanji.jitenon.jp/cat/joyo.html)


### 常用漢字と第一水準漢字の差分

気になって、二つのセットの diff を取ってみたら、「 *JIS 第一水準にはないが、常用漢字にある漢字* 」があることがわかった。

「JIS 第一水準でだいたい OK」と言われている候補に無い文字が、常用漢字一覧にはある。

つまり、常用漢字一覧のなかでも、使われ無い可能性が高い漢字が含まれるということだ。

以下の 30 文字である。

```text:diff-jyouyou-jis.txt
```

ざっと見て、以下 6 文字はいらないだろうと判断した。

```text:jouyou-ignore.txt
```


### 不要な文字

他にも、常用漢字一覧には、まだまだ「 *技術ブログではおおよそ出てこなさそうな漢字* 」がいくつか見られる。

もちろん使う場面はあるかもしれないが、書くのは自分なので把握しておけば良い。

どうしても必要ならフォントセットに追加すれば良いが、その頻度もそう高くはないだろう。

よって、いらない漢字を 1 つ 1 つ丁寧に手動で取り除いた。

先の 6 文字に 17 文字加えて、以下 23 文字が削除対象である。

```text:Kanji-ignore.txt
```

これらを反映した結果が以下である。


### 更新(2016/08/28)

しばらく運用して、省かれていた以下の文字が記事中に必要になったため、文字セットに追加した。

(後述する結果にも反映していある)

```text:Kanji-update.txt
```


## 結果

ここまでの結果を合わせる。

Caption: 文字範囲と文字数
| 範囲             | 文字数 |
|:-----------------|-------:|
| 基本ラテン文字   |     94 |
| CJK 記号と句読点 |     11 |
| ひらがな         |     81 |
| カタカナ         |     83 |
| 半角形と全角形   |      0 |
| 常用漢字         |   2136 |
| 記号             |      1 |
| 不要文字         |   - 23 |
| 追加更新         |     13 |
| 合計             |   2396 |

全て合わせたのが以下である。


## フォント生成

ここまでに選択した文字のみで Web Font を作成する。


### サブセット化

まず、以下のツールを用い、この対象文字だけを抜き出したサブセットを作成する。

[サブセットフォントメーカー](https://opentype.jp/subsetfontmk.htm)

- NotoSansCJKjp-Jxck-Bold.otf    (473.2K)
- NotoSansCJKjp-Jxck-Regular.otf (471.2K)


### Woff 変換

この OTF ファイルを、以下のツールを用い、Woff 形式に変換する。

[WOFF コンバータ](https://opentype.jp/woffconv.htm)

メタデータは一切付与しない。

また IE はどうでもいいので、IE に対応させるための EOT ファイルも作成しない。

- NotoSansCJKjp-Jxck-Bold.woff    (379.7K)
- NotoSansCJKjp-Jxck-Regular.woff (375.8K)


## 効果

簡単にサイズの比較を行ってみる。

比較は Woff で行い、フォントは Regular を使う。


### 漢字

まず対象とする漢字による、サイズの変化はこうなる。

Caption: 漢字範囲ごとのサイズ
| 範囲       | サイズ |
|:-----------|-------:|
| JIS X 0208 | 505.0K |
| 常用漢字   | 356.1K |
| 削除後     | 351.6K |


### 結果

もしここまでに見てきた各項目にあげた候補を、一切削除せず、漢字を JIS X 0208 とした場合はこうなる。

Caption: JIS X 0208 と削除後のサイズの比較
|        | サイズ |
|:-------|-------:|
| before | 547.5K |
| after  | 378.4K |


## フォントの設定

### font-face の指定

まず woff ファイルを配布し、それを読み込ませる。

ただし、Android Marshmallow では Noto Sans がビルドインになったため、Regular のみが全フォント入っている。

他にも、このブログを見に来る人は、自分でローカルインストールしている人がいるだろう。

そうした場合、`local()` を用いてシステムフォントを優先すれば、ダウンロードが不要になる。

現在 NotoSans は "NotoSansCJKjp-Bold.otf" という名前で配布されている。

Android は ["NotoSansJP-Regular.otf" という名前で入っているらしい](https://toach.click/how-to-noto-sans-japanese/#Android_MarshmallowNoto_Sans_Japanese) ため、それも含めて以下のように設定する。

```css
@font-face {
  font-family: "NotoSansCJKjp-Jxck";
  font-style: normal;
  font-weight: 400;
  src: local("NotoSansCJKjp-Bold.otf"),
       local("NotoSansJP-Bold.otf"),
       url("https://path-to-font/NotoSansCJKjp-Jxck-Regular.woff") format("woff");
}

@font-face {
  font-family: "NotoSansCJKjp-Jxck";
  font-style: normal;
  font-weight: 700;
  src: local("NotoSansCJKjp-Bold.otf"),
       local("NotoSansJP-Bold.otf"),
       url("https://path-to-font/NotoSansCJKjp-Jxck-Bold.woff") format("woff");
}
```


### font-family の指定

使用したフォントを CSS に設定する。

Google はガイドラインを公開している。

[Guidelines for Using Noto](https://www.google.com/get/noto/help/guidelines/)

システムにある場合は正式名称で、こちらで提供したフォントがダウンロードされた場合は、それが使われるようにする。

基本的には、サイト全体に適用するため `body` へ指定し、`pre > code` 内は別にしたいため、そこだけ上書きしている。

```css
body {
  font-family: "Noto Sans", "Noto Sans CJK JP", "NotoSansCJKjp-Jxck", sans-serif;
}
```


## キャッシュ設定

フォントは、基本的には変更が非常に少ないファイルであるため、積極的にキャッシュをしていきたい。

ただし、今回のような作り方の場合には、フォントの追加によるファイルの更新が皆無ではないため、URL にバージョンを忘れずに入れる。(font-face の指定参照)

```css
url("/path-to-font/NotoSansCJKjp-Jxck.Bold.woff?ver=201603014") format("woff");
```

ここでは max-age を一年とし、フォントを作り直した場合はバージョンを変える

```http
Cache-Control: max-age=31536000
```


## Preload

[Preload を用いたリソースプリローディングの最適化](https://blog.jxck.io/entries/2016-03-04/preload.html) で解説した `<link rel=preload>` でフォントを適用した。

ただし、影響が大きい Regular のみにした。

```html
<link rel=preload as=font type=font/woff href="https://path-to-font/NotoSansCJKjp-Jxck-Regular.woff?ver=201603014" crossorigin>
```

また、AMP 対応ページでは `rel=preload` は許可されてないため指定するとエラーになったため、AMP の方には指定していない。


## Outro

Web Font もだいぶ一般的になってきたため、今後の Web 作成では、Web Font の存在は前提となっていくだろうと感じている。

このサイトではパフォーマンスに関わる最適化手法を色々と試しているが、Web Font も無しに表示の速さを語っても片手落ちだろうと思い、いわゆる鉄下駄として入れてみた。

こうした使いやすく優れたフォントが無料で提供されているのは、非常にありがたい。

その他 WebFont に関連する検証は [web font](https://blog.jxck.io/tags/web%20font.html) タグにまとまっている。