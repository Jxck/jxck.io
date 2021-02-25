# [font metrics][web font] Web Font のメトリクス上書きによる CLS の改善


## Intro

WebFont を読み込む際に、取得完了までのラグを、システムが持つフォールバックフォントで代替する場合がある。

このとき、フォールバックフォントと読み込んだ Web フォントで、高さに関する情報が異なる場合、 Layout Shift が発生してしまう。

これを防ぐ方法として、 CSS からフォントメトリクスの上書きを行う仕様の提案が行われているため、本サイトへの適用を目指し検証を行った。

なお、この仕様は Layout Shift ではなく、単純にテキストレイアウトスタイル用途での利用も考えられるが、そこはスコープ外としている。


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

本サイトは Noto Sans を Webfont として提供している。この Webfont ファイルが読み込まれる前にフォールバックとして表示されるローカルフォントを Osaka だとした場合、重ね合わせると以下のように差異が出る。

![Osaka と Noso Sans をデフォルトで表示した場合、高さに差がでてしまう](before.png#1610x1134 'before')

ここで、 Webfont 側に以下のようなスタイルを当てると、ある程度レイアウトの差分を減らすことができるとわかった。


```css
:root {
  --line-height: 23px;
  --letter-spacing: 0.2px;
  --word-spacing: 0px;
}

@font-face {
  font-family: "webfont";
  src: url("https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.woff") format("woff");
  ascent-override: 100%;
  descent-override: 30%;
  line-gap-override: 100%;
  advance-override: 0;
}
```

![font-metrics や line-height などの調整によって、表示のズレを多少解消できる](after.png#1586x1094 'after')

英数字についてはあるていどすり合わせができたが、日本語についてはなかなかぴったり合わせることはできなかった。

font-metrics と line-height によって高さは合わせることができても、字詰めの部分で差が出てしまい、テキストが長くなればその蓄積で行数がずれる。

font-feature-settings での字詰めなどの併用も試したが、そちらも細かい数値が指定できるわけではないので、あまり効果はなかった。

文章主体のページで高さを合わせるとなると調整はかなり難しそうだ。


## プラットフォームごとのフォールバックフォントへのすり合わせ

前述の方法は、先にフォールバックフォントとして Osaka が表示されることを前提とし、 Noto Sans 側のスタイルをすり合わせた。

しかし、プラットフォームごとにフォールバックフォントは違うため、この方法では環境ごとに Noto Sans 側のスタイルを出し分ける必要が出てしまう。

恐らく、実運用を考えるのであれば、プラットフォームごとのフォールバックフォント側のスタイルを上書きしておくことになると思われる。

例えば、以下のように WebFont である Noto Sans を優先しつつ、フォールバックとして 2 つのフォントを定義する場合を考える。


```css
font-family: "Noto Sans Webfont", "Osaka", "Meiryo";
```

読み込む Noto Sans の設定は固定できるので、それに合わせてフォールバックフォントの 2 つを上書きする。


```css
:root {
  --line-height: xxpx;
  --letter-spacing: xxpx;
  --word-spacing: x.xpx;
}

@font-face {
  font-family: "Osaka";
  src: local("Osaka");
  ascent-override: xx%;
  descent-override: xx%;
  line-gap-override: xx%;
  advance-override: xx;
}

@font-face {
  font-family: "Meiryo";
  src: local("Osaka");
  ascent-override: xx%;
  descent-override: xx%;
  line-gap-override: xx%;
  advance-override: xx;
}
```

`line-height` などの値は共通に固定し、 font-metrics で微調整する感じになるだろうか。


## 本サイトへの適用

本サイトでの適用を考え実際にいくつかのフォントに合わせて Noto Sans のデフォルトとのすり合わせを行ってみた。

結果としてはまったく思うような結果を出すことはできなかった。

まず、フォールバックフォントとして表示されうるフォントを洗い出す必要があり、それぞれに対して Noto Sans とすり合わせる値を出す必要があるが、その値の正解が簡単にはわからない。

- 短い文で妥当そうな結果を得ても、ページ全体になるとズレの累積が大きくなりすぎる
- 日本語と英文が混ざると全く思うような結果にならない
- あるページでなんとなく一致させられても、別のページではそうではない。
- ページのズームなどを行うと簡単に壊れる

複数ページどころか、単一ページですら効果的な設定が割り出せず、サイト全体での適用も現実的とはいえなかった。

本来の目的である Layout Shift の削減効果も確認するまで至れなかったため、本サイトでは採用を見送ることにした。


## 追加懸念

作業中に感じた別の懸念も記しておく。 Webfont の読み込みに失敗しフォールバックのままになった場合だ。

今回は WebFont とすり合わせるために、フォールバックフォントが本来持っている設定を無視して設定を上書きしている。無事 Web Font が読み込まれれば良いが、もし何らかの問題で Web Font の読み込みに失敗した場合は、その上書きした設定のまま読者はコンテンツを読むことになる。

すると、「上書きした状態がフォールバックフォントにとって読みやすい設定なのか?」という疑問が生まれる。

筆者は専門ではないが、こにこだわりを持つ場合は、単にフォールバックフォントを Noto に近づけるのではなく、両者の間を取った値を設計し、 Noto とフォールバックフォント両方をそれに近づけるように上書きするのが望ましいと考えられる。

フォールバックフォントをどこまで想定するかにもよるが、ページ間でのずれを合わせることすらできなかったにもかかわらず、さらにバリエーションが必要になるのかもしれない。


## Outro

今回は、読み込んだフォントの差による Layout Shift を防ぐという観点で Font Metrics Override を調査した。

筆者は Typography についての知識、経験が少ないため、仕様でうたわれているような理想的な運用まで持っていくことができなかった。

英数字のみや、短文やロゴだけといった限定した対象であれば可能性はありそうだが、本サイトのような構成では現実的な落とし所を見つけることができなかった。

もしこれを適切に運用し、 Web Font 読み込み完了時に Layout Shift が減らせる設定を、妥当な環境のフォールバックフォントに対して設計できるようなノウハウがあればぜひ知りたい。


## DEMO

動作するデモを以下に用意した。

(Osaka が入っている環境でないと別のフォントになるため、想定した動作にならない)

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
  - How to avoid layout shifts caused by web fonts - Simon Hearne
    - https://simonhearne.com/2021/layout-shifts-webfonts#reduce-layout-shift-with-f-mods
  - Overriding Font Metrics with CSS - The Publishing Project
    - https://publishing-project.rivendellweb.net/overriding-font-metrics-with-css/
  - Web Performance Calendar > A font-display setting for slow connections
    - https://calendar.perfplanet.com/2020/a-font-display-setting-for-slow-connections/#font_matching
- Presentation
- Issues
- Other
