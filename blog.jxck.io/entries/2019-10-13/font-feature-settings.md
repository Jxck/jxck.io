# [font-feature-settings][noto sans][web font] Noto Sans Hinted と font-feature-settings: 'palt'

## Intro

Noto Sans のサブセット生成を見なおし、 Noto Sans Hinted から pyftsubset で生成し、ついでに font-feature-settings を有効にした。

作業と検証の記録を兼ねて、実施結果を記す。


## fonttools

これまで、フォントのサブセットの生成には以下の二つのツールを使用していた。

- [サブセットフォントメーカー](https://opentype.jp/subsetfontmk.htm)
- [WOFF コンバータ](https://opentype.jp/woffconv.htm)

しかし、 macOS を Catalina にあげたところ、これらが起動できなくなり、フォントが生成できなくなった。

これまで GUI で行なっていたが、せっかくなので自動化するために、大体コマンドを探し、プロセスを組んだ。

いくつかツールがあるが、今回は fonttools に同梱された pyftsubset を採用することとした。

- [fonttools/fonttools](https://github.com/fonttools/fonttools)


## pyftsubset

これまでは、使用しそうなフォントをリストアップし、そのリストを元にフォントを生成していた。

しかし、更新への追従も面倒になったので、やはり記事で利用している文字を全てリストアップするスクリプトを書くことにした。

ところが、単純に全ての文字を取ると、一度しか使用しない文字が増えてしまう。理由は以下のようなエントリがあるからだ。

- [Noto Sans の Web Font 対応とサブセットによる最適化 \| blog\.jxck\.io](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html)
- [JavaScript における文字コードと「文字数」の数え方 \| blog\.jxck\.io](https://blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html)

通常、記事中に結合文字、絵文字、サロゲートペアなどは基本的に使わないが、それ自体を解説するこの二つのエントリは含まれてしまう。

フォントに含まれない文字は、スタイルが変わってしまい、違和感があるため、これまでは含んでいた。

しかし、そういった文字はほぼサンプルコードとしてコードブロック(`<code>`)に含まれており、かつそこには MONO font しか当たってない。

そこで、コードブロックに含まれてない特殊な文字を全てコードブロックに含むように記事を修正し、 HTML から `<code>` を全て除いた文字群をサブセットの対象とした。

変換は以下のようにした。


```sh
$ pyftsubset NotoSansCJKjp-Regular.otf --text-file=../All.txt --layout-features='*' --flavor=woff2 --output-file=NotoSansCJKjp-Regular-Jxck-20191011.woff2
```


## layout features

ところが、生成したフォントが従来の倍近いサイズになっていた。

- 353.1K: 従来
- 606.6K: 更新後

コマンドヘルプを見ながら適当につけた以下のオプションが問題である。


```sh
--layout-features='*'
```

この layout features は、 Open Type のフォントが含む、ヒント情報を含めるという指定だ。

Open Type がいくつかの情報を持っていることは薄々知っていたが、以下の理由から特に考えずにきた。

- 従来使用していたツールは、この情報を全て削除していた。
- 昔の Noto Sans はこの情報を含まなかった気がする

> フォントが、ヒント(OpenType フォントの場合)、カーニング情報、ビットマップデータ、 OpenType 機能を持っている場合、それらは削除されます。
> --- <cite>[サブセットフォントメーカー](https://opentype.jp/subsetfontmk.htm)</cite>

今は、 NotoSansCJKjp-hinted.zip を元にすれば、ヒント情報を含むサブセットが作れるため、 CSS の font-feature-settings が指定できる。

全て削れば従来通りだが、せっかくなので指定を検証することにした。


## font-feature-settings

まず、以下を調査する。

- Noto Sans CJK jp が含むヒント情報
- CSS で指定可能なプロパティ

ところが、前者についてはリポジトリを見てもそれらしい情報にたどり着くことができなかった。

後者は、 [font-feature-settings の CSS の仕様](https://drafts.csswg.org/css-fonts-3/#ref-OPENTYPE-FEATURES)から、 MS にある Registered Features という一覧がリンクされていた。

- [Registered features \- Typography \| Microsoft Docs](https://docs.microsoft.com/ja-jp/typography/opentype/spec/featurelist)

140 近い機能があるようだが、このうちのどれが使えるのかがわからなかったため、以下の DEMO ページを用意し Chrome で試した。

- [Font Feature Settings DEMO](http://labs.jxck.io/webfont/font-feature-settings.html)

恐らく検証するための妥当な文字や、ブラウザの実装などといった変数もあるだろうが、そのへんを網羅するのは難しいため、あきらかに見た目が変わるプロパティが以下であるところまで検証した。

- aalt: Access
- dlig: Discretionary Ligatures
- fwid: Full Widths
- halt: Alternate Half Widths
- hwid: Half Widths
- palt: Proportional Alternate Widths
- pwid: Proportional Widths
- vert: Vertical Writing
- vrt2: Vertical Alternates and Rotation

この中で、本サイトでの対応を検討すべきは `halt`, `palt` だろうと判断した。


## 字詰(palt)

`halt`, `palt` はいずれも字詰に関するプロパティだ。

以下のような違いがある。

- halt: 約物類(句読点など)を半角幅にする
- palt: 字体を置き換えずプロポーショナル幅にする

DEMO でみた halt は割と良さそうに見えたが、ブログ全体に適用したところあまり良くなかったため不採用とした。

palt とは別に、字体を置き換える pwid があるが、そちらは Chrome か Noto Sans CJK JP が対応してないようだ。

そこで結果として `palt` のみを指定してフォントをビルドすることにした。


```sh
$ pyftsubset NotoSansCJKjp-Regular.otf --text-file=../All.txt --layout-features='palt' --flavor=woff2 --output-file=NotoSansCJKjp-Regular-Jxck-20191011.woff2
```

結果は以下である。

- 353.1K: 従来
- 606.6K: layout-feature='*'
- 293.9K: layout-feature='palt'

サブセット生成のロジックを変えたため、不要な文字も減り、トータルでは layout-feature を入れる前よりも小さくなっている。

またこのフォントを利用し、 CSS に以下を追加した。


```css
body {
  font-feature-settings: "palt"
}
```

before/after は以下のようになる。

![font-feature-settings で palt を切り替えた時の字詰めの変化](font-feature-settings-palt.gif#1665x968 "font-feature-settings:'palt'")


## まとめ

以下のことを行なった。

- subset 対象の文字を記事から取得
- pyftsubset で自動化
- layout-feature を検証し palt を採用
- css に font-feature-settings を追加

正直フォントについては素人であり、色々と雰囲気でやっているところもあるが、新しい機能を採用するという点ではよい改修ができた。

今後もおもしろい font-feature-settings があれば採用し、 Noto Sans が対応していなければ、対応しているフォントへの変更も視野に入れて、検証していきたい。


## Related

その他 WebFont に関連する検証は [web font](https://blog.jxck.io/tags/web%20font.html) タグにまとまっている。
