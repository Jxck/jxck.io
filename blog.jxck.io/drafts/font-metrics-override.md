# [font metrics][web font] Web Font のメトリクス上書きによる CLS の改善


## Intro

WebFont を読み込む際に、取得完了までのラグをシステムが持つフォールバックフォントで代替する場合がある。

このとき、フォールバックフォントと読み込んだフォントで、高さに関する情報が異なる場合、 Layout Shift が発生してしまう。

これを防ぐ方法として、 CSS からフォントメトリクスの上書きを行う仕様の提案が行われているため、本サイトへの適用を目指し検証を行った。

なお Layout Shift ではなく、単純にテキストレイアウトのスタイル用途も考えられるが、そこはスコープ外としている。


## Font metrics override

ascent-override
: baseline より上の ascent metric 情報を上書きする

descent-override
: baseline より下の descent metric 情報を上書きする

line-gap-override
: line gap (行間)を上書きする

advance-override
: 文字間の余白を上書きし、行幅の調整やオーバーフローを防ぐ。

これらの値を `@font-face` で指定する。


```css
@font-face {
  font-family: "helvetica-override";
  src: local("Helvetica");
  ascent-override: 105%;
  descent-override: 0%;
  line-gap-override: normal;
  advance-override: 0;
}
```

実際に行単位、文章単位で調整する際は、 `line-height`, `word-spacing`, `letter-spacing` なども合わせて設定することになるだろう。


## フォールバックフォントとのすり合わせ

本サイトは Noto Sans を Webfont として提供している。この Webfont ファイルが読み込まれる前にフォールバックとして表示されるローカルフォントを Hiragino Sans だとした場合、重ね合わせると以下のように差異が出る。

TODO: before の図

ここで、 Webfont 側に以下のようなスタイルを当てると、ある程度レイアウトの差分を減らすことができるとわかった。


```css
:root {
  --line-height: 24px;
  --letter-spacing: 0px;
  --word-spacing: 4.3px;
}

@font-face {
  font-family: "webfont";
  src: url("/NotoSansJP-Regular.woff2") format("woff2");
  ascent-override: 95%;
  descent-override: 0%;
  line-gap-override: 0%;
  advance-override: 0;
}
```

TODO: after


## プラットフォームごとのフォールバックフォントへのすり合わせ

前述の方法は、先にフォールバックフォントとして Hiragino Sans が表示されることを前提とし、 Noto Sans 側のスタイルをすり合わせた。

しかし、プラットフォームごとにフォールバックフォントは違うため、この方法では環境ごとに Noto Sans 側のスタイルを出し分ける必要が出てしまう。

恐らく、実運用を考えるのであれば、プラットフォームごとのフォールバックフォント側のスタイルを上書きしておくことになると思われる。

例えば、以下のように WebFont である Noto Sans を優先しつつ、フォールバックとして 2 つのフォントを定義する場合を考える。


```css
font-family: "Noto Sans Webfont", "Hiragino Sans", "Meiryo";
```

読み込む Noto Sans の設定は固定できるので、それに合わせてフォールバックフォントの 2 つを上書きする。


```css
:root {
  --line-height: xxpx;
  --letter-spacing: xxpx;
  --word-spacing: x.xpx;
}

@font-face {
  font-family: "Hiragino Sans";
  src: local("Hiragino Sans");
  ascent-override: xx%;
  descent-override: xx%;
  line-gap-override: xx%;
  advance-override: xx;
}

@font-face {
  font-family: "Meiryo";
  src: local("Hiragino Sans");
  ascent-override: xx%;
  descent-override: xx%;
  line-gap-override: xx%;
  advance-override: xx;
}
```

`line-height` などの値は共通に固定し、 font-metrics で微調整する感じになるだろうか。


## 本サイトへの適用

本サイトでの適用を考え実際にいくつかのフォントに合わせて Noto Sans のデフォルトとのすり合わせを行ってみた。

しかし、これが非常に難しい。

まず、フォールバックフォントとして表示されうるフォントを洗い出す必要があり、それぞれに対して Noto Sans とすり合わせる値を出す必要があるが、その値の正解が簡単にはわからない。

- 短い文で妥当そうな結果を得ても、ページ全体になるとズレの累積が大きくなりすぎる
- 日本語と英文が混ざると全く思うような結果にならない
- あるページでなんとなく一致させられても、文の量によってズレが生じる
- ページのズームなどを行うと簡単に壊れる

恐らく、 font が本来持つ値などを元にうまく計算すると適当な値が出せるのかもしれないが、本来の目的である Layout Shift を減らすために、全ページで高さを揃えることすらままならなかった。

他にも課題がある。

- Noto とすり合わせができても、 Webfont の読み込みに失敗しフォールバックのままになったときに読みにくい

Noto とすり合わせるために、フォールバックフォントが本来持っている設定を無視して設定しているが、その設定結果がフォールバックフォントにとって読みやすい設定とは思えない場合がある。

無事 Web Font が読み込まれれば良いが、もし何らかの問題で Web Font の読み込みに失敗した場合は、その設定のまま読者はコンテンツを読むことになる。

ここで失われる UX を考えると、単にフォールバックフォントを Noto に近づけるのではなく、両者の間を取った値を割り出し、 Noto とフォールバックフォント両方をそれに近づけるように上書きするのが望ましいと考えられる。

すると、 Noto と、フォールバックフォントとして想定する全フォントに対して、間をとった値を設計し、それを想定した全てのフォントに適用し、その結果 Layout Shift が防がれる状態にする必要がある。

これは、フォールバックフォントをどこまで想定するかにもよるが、先の例での 2 つのフォントだけでも難しかったため、本サイトでは採用を見送ることにした。


## Outro

今回は、読み込んだフォントの差による Layout Shift を防ぐという観点で Font Metrics Override を調査した。

筆者は Typography についての知識、経験が少ないため、仕様でうたわれているような理想的な運用まで持っていくことができなかった。

もしこれを適切に運用し、 Web Font 読み込み完了時に Layout Shift が減らせる設定を、妥当な環境のフォールバックフォントに対して設計できるようなノウハウがあればぜひ知りたい。


## DEMO

動作するデモを以下に用意した。

(Hiragino Sans が入っている環境でないと別のフォントになるため、想定した動作にならない)

- <https://labs.jxck.io/webfont/font-metrics-override.html>


## Resources

- Spec
  - CSS Fonts Module Level 4
    - https://drafts.csswg.org/css-fonts-4/#font-metrics-override-desc
- Explainer
  - New @font-face descriptors for overriding font metrics
    - https://docs.google.com/document/d/1PW-5ML5hOZw7GczOargelPo6_8Zkuk2DXtgfOtJ59Eo
  - Explainer: Font Metrics Override Descriptors
    - https://gist.github.com/xiaochengh/da1fa52648d6184fd8022d7134c168c1
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Ship: @font-face descriptors to override font metrics
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ApR03h3CGfo/m/K_Fw3bAPBwAJ
- Chrome Platform Status
  - @font-face descriptors to override font metrics
    - https://www.chromestatus.com/feature/5651198621253632
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
