# [text][a11y] text-scale によるユーザ指定倍率での文字拡大

## Intro

小さい文字が見づらい場合、ユーザは OS の文字サイズを大きくすることで、視認性を調整することができる。

こうした機能は大抵の OS が備えており、システムフォントのサイズなどに反映される。

しかし、その指定がそのまま Web コンテンツにも反映されるかというと、必ずしもそうではない。

この問題を解決するために、いくつかの標準が提案され、策定と実装が進んでいる。


## サイズの相対値指定

「ユーザは文字を拡大することがある」というのは、おそらく多くの開発者が認識しているだろう。

WCAG を引き合いに出すなら、以下のセクションで「200% までの拡大に対応すべき」といった基準(AA)がある。

> text can be resized without assistive technology
> up to 200 percent without loss of content or functionality.
> Success Criterion 1.4.4 Resize Text (Level AA)
>
> --- https://www.w3.org/TR/WCAG22/#resize-text

レスポンシブデザインの普及もあり、`px` などの絶対値指定から、`%` や `em` など相対値を用いる設計も一般化してきた。

フォントサイズを相対値指定してあれば、OS の設定が変わった際に追従できると期待した CSS 実装もあるだろう。しかし、実際にそれが意図の通り反映されているかというと、かなり乖離がある状態だ。


## OS ごとの拡大

View Port の小さいモバイル OS では、「拡大」をするための方法がいくつか提供されている。テキストや画像だけを拡大するものから、画面全体を拡大するもの、OS だけでなくブラウザごとに設定できるものなど、選択肢と組み合わせは多い。

ブラウザにおける `font-size` のベースは 16px がデフォルトであるため、この基本サイズに対してユーザが OS に指定した拡大率が反映され、`rem` / `em` を指定したサイズすべてに伝搬するのが理想だろう。

今回検証するのは、iPhone 16e iOS 26.2 および Pixel 8a Android 16 の、以下の設定を対象とする。

![iPhone と Android で文字サイズを最大まで拡大設定](setting.png#400x400)

それぞれ最大まで拡大した状態で同一のコンテンツを開いても、iOS Safari / Android Chrome は拡大されず、Android Firefox だけ拡大されていることがわかる。

![default を拡大設定で表示すると Firefox のみ拡大される](default.png#500x375)

Safari などが OS の設定を Web ページ全体に反映しないのは、レイアウトが崩れるページが多く存在するからだとされている。

この場合 Firefox では、文字のサイズと同時に `rem` で指定した `margin` や `border` も同じように拡大されている。しかし、この場合余白や罫線まで太くする理由はあまりないだろう。表示領域が無駄に消費され、レイアウトに無駄が出ている。これがさらにひどくなると、レイアウトが崩れ文字が見切れたり、重なってしまうといったことが起こる。

拡大したらどうなるかをきっちり確認せずにデプロイされたサイトの多くは、拡大しても読みやすいどころか、読めたものではないレイアウトになるだけなのだ。

そうしたコンテンツが最低限閲覧できる状態を維持するために、歴史的にモバイルブラウザの多くは、デフォルトのフォントサイズを上書きすることができずにいた。代わりに、テキストだけではなくページ全体を拡大する「フルページズーム」のような機能を提供したり、選択した文字だけを拡大する拡大鏡のような機能を提供することで、ユーザをサポートしてきた。(ユーザのコントロールが難しい Web View は対象外だったりもする)

もちろん、それがアクセシビリティ上問題になることは、ずっと前から知られており、議論も行われてきた。

今回の議論では、BBC などのメディア系サービスからのフィードバックなどが中心となっている。


## Apple Dynamic Type

Apple は iOS で最適なシステムフォントを選択できる Dynamic Type という仕組みを用意している。

- Using the System Font in Web Content | WebKit
  - https://webkit.org/blog/3709/using-the-system-font-in-web-content/

独自の Variable を `font` 指定することで、Font Family だけでなく Size も含めて設定される。このとき OS の拡大率も反映されるのだ。

```css
:root {
  font: -apple-system-body;
}
```

![Dynamic Type を指定することで、拡大率を反映できる](dynamic-type.png#400x400)

選択肢を用意してオプトインにすることで、きちんと対応できているサイトだけが、OS の設定に連動して拡大されることを意図している。

この機能は Safari 独自だが、ブラウザ間で互換を保つことを目的に、同等の手法を `system` として標準化するための議論が継続して行われてきた。

```css
:root {
  font-size: system;
}
```

これは Apple からの初期提案に選択肢として含まれたが、議論は別の方向で進んだ。


## Preferred Text Scale

- csswg-drafts/css-env-1/explainers/env-preferred-text-scale.md at main · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/blob/main/css-env-1/explainers/env-preferred-text-scale.md

OS などで指定した拡大率を取得し、それをページ全体の基本サイズに反映できれば、そこに連動して `rem` や `em` で指定されたすべてのサイズに反映することができる。

そのために提案されたのが `preferred-text-scale` プロパティだ。

`env()` を用いて取得すると、OS にユーザが指定している拡大率が取得できるため、それを `:root` の `font-size` などに指定すれば、基本サイズに掛け合わせて拡大率を反映させることができる。

この状態でページ全体が `em` / `rem` を元に設計されていれば、ページ全体に反映することができる。

```css
:root {
  /* 1 はフォールバック */
  font-size: calc(100% * env(preferred-text-scale, 1));
}
h1 {
  font-size: 1.2rem;
}
```

現状では Android Chrome のみ対応している。

![preferred-text-scale での拡大](preferred-text-scale.png#400x400)


## pem (廃止)

Preferred Text Scale を一度だけ使い、全体をコントロールするのであればあまり問題にはならないが、部分的に置き換えていくような場合は、このスニペットを複数箇所で書く必要が出るだろう。

そこで、構文糖衣として提案された新しい単位が `pem` だ。

- [css-env][css-values] UAs inconsistent in how OS font settings affect the default font-size `medium` · Issue #10674 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/10674

```css
h1 {
  font-size: 1.2pem;
}
```

しかし、すでに `em` / `rem` が普及している中で、既存の CSS に `pem` を導入していくのは現実的ではない。

結果、この提案は標準化までは至らなかった。

- [css-env-1] remove pem/bsem unit by davidsgrogan
  - https://github.com/w3c/csswg-drafts/pull/13281


## text-scale

ページ全体として、そもそも「ユーザの設定をそのままページに反映しても壊れない」という設計ができているのであれば、CSS に手を入れずとも OS の設定を最小フォントサイズに反映するフラグを用意するだけで良い場合もあるだろう。

そこで提案されたのが `text-scale` プロパティだ。

```html
<meta name="text-scale" content="scale">
```

このプロパティは、`content` に複数の値を持つ。


### content=scale

OS のサイズ指定がそのまま Web ページに反映される指定だ。

つまり、以下のような指定が暗黙的にされている状態だ。

```css
:root {
  font-size: calc(100% * env(preferred-text-scale, 1));
}
```

この指定は、「このサイトは OS の拡大設定をそのまま反映しても壊れないページである」という宣言とみなすことができる。


### content=legacy

OS のサイズ指定を無視し、1rem は 16px のままにする指定だ。

ユーザが拡大を求めても基本サイズが変わらず、従来の挙動を維持することになる。

つまり、この指定は「このサイトは OS の拡大設定を反映する用意ができていない」という宣言とみなし、互換動作をキープするためのスイッチと見ることができる。


## 非線形スケール

Absolute Size は、`font-size` に対して指定できる以下のキーワードだ。

```
[ xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large ]
```

ここでは `medium` が 16px として、相対的に定義されている。

しかし、ユーザが `medium` の読みやすさを基準に 200% に拡大した場合、`xxx-large` が指定された見出しなどが大きくなりすぎるといった問題がある。大きすぎて View Port を占有してしまうと、逆に視認しづらいページになる可能性もあるからだ。

そこで、テキストの拡大に係数を適用する非線形スケールが提案されている。

- [css-fonts-5] Should absolute font size keywords scale at different rates depending on user's preferred text scale?
  - https://github.com/w3c/csswg-drafts/issues/12475

これはまさしく、Apple が Dynamic Type で採用しているものだ。

この変更では仕様上「OS/UA が非線形スケールを適用しても良い」という余地を導入するもので、`text-scale` を採用した場合に非線形のスケールが可能になるというものだ。

実際にこれがどう反映されるか、または線形/非線形を切り替える新しい `text-scale` のプロパティができるかなどは、まだわからない。


## 設計草案

ブラウザのデフォルトは、しばらくは `legacy` のままになるだろう。理想的には、どこかでデフォルトを `scale` にし、対応準備ができていないサイトだけ `legacy` で Opt-Out する運用が理想とはなるが、なかなか時間がかかると予想される。

したがって、標準化と実装が揃ったら、ページの状況に応じて明示的にこの値を付けていき、`legacy` なページを把握しつつ、`scale` に対応させていく移行作業を行っていくこととなるだろう。

そのうえでモバイルでの拡大を確認し、壊れるものは「とりあえず相対になっているだけ」ではないかを確認する。

例えば、文字が 2 倍になった時、border まで 2 倍に太くなり、margin も 2 倍の幅になる必要があるかというと、必ずしもそうではないだろう。

この場合、`1px` の線を `calc()` で `rem` から算出するより、素直に `1px` とする方が良い場合もある。

余白も、文字に追従する `rem` / `em` より `vh` や `vw` などを用いる方が意図を反映できるだろう。

また、非線形スケールが対応されるまでは、拡大率をそのまま反映すると大きくなりすぎる場合、個別に `clamp()` で調整するといった暫定対応も必要かもしれない。

```css
h1 {
  /* 32px < Scale < 64px */
  font-size: clamp(
    32px,
    calc(32px * env(preferred-text-scale, 1)),
    64px
  );
}
```

`border-width` を 1px としている場合、1.5 倍まではそのままでよいが 2 倍までくると少し太いほうが良い、といった対応も考えられる。

その場合は、拡大率を Style Query で取るといった方法も考えられるだろう。

```css
:root {
  --text-scale: env(preferred-text-scale, 1);
}

section {
  border: solid 1px black;
  @container style(--text-scale >= 1.5) {
    & {
      border: solid 2px black;
    }
  }
}
```

![text-scale に合わせて調整](scale.png#400x400)


## Outro

まだ全てのブラウザのポジションが揃ったわけではないが、議論を見ていると、モバイルにおける拡大問題自体については一定の合意があるように思える。

筆者の親などは、iPhone の文字をかなり大きくして使っているため、この問題自体はある程度身近ではあった。

ある程度メジャーなサイトは一定の対応が取られているものも多いが、そうではないサイトも世の中にはかなりある。

また、本サイトに `<meta name="text-scale" content="scale">` を指定し、拡大表示でもある程度の閲覧に耐えるよう微調整を行った。

拡大時に、余白などが必要以上に増えることがないように指定を見直し、200% の拡大までを対象に Android Chrome Dev で挙動を確認している。

もともと、相対値設定していたため、`rem` / `vw` などで Grid や余白の設計をしていたため、そこまで大きな改修にはならなかった。

ただ、Android で文字サイズを大きくしつつ、Chrome 側でも拡大を指定している場合は、全体的によくわからない崩れ方をしてしまう。こうした部分を考えると、移行期は拡大指定ユーザにとって煩わしい状況もあるかもしれない。

標準化が進み、コンテンツが改善するとともに、UA や OS 側との連携も早く解決することを願いたい。


## DEMO

- Text Scale DEMO
  - https://labs.jxck.io/text-scale/


## Resources

- Spec
  - CSS Fonts Module Level 5
    - https://drafts.csswg.org/css-fonts-5/#text-scale-meta
  - CSS Environment Variables Module Level 1
    - https://drafts.csswg.org/css-env-1/#text-zoom
- Explainer
  - Explainer: env(preferred-text-scale)
    - https://davidsgrogan.github.io/env-explainer.html
  - Explainer: meta tag for text scaling behavior
    - https://github.com/w3c/csswg-drafts/blob/main/css-env-1/explainers/meta-text-scale.md
- Requirements Doc
- Mozilla Standard Position
  - Text-Scale `<meta>` element · Issue #1326 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1326
- WebKit Position
  - Text-Scale `<meta>` element · Issue #587 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/587
- TAG Design Review
  - `env(preferred-text-scale)`
    - https://github.com/w3ctag/design-reviews/issues/1101
  - Other Spec Review: `<meta name="text-scale" content="scale" />`
    - https://github.com/w3ctag/design-reviews/issues/1172
- Intents
  - Intent to Ship: meta name="text-scale"
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/0yp2ygJK5HE/
  - Intent to Prototype: meta name="text-scale"
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/2F5g2dqy9_Q/
  - Intent to Ship: CSS env variable for OS-level font scale
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/bZuQAcwcEig/
  - Intent to Prototype: CSS env variable for OS-level font scale
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/OmEsGUUenqY
- Chrome Platform Status
  - CSS env variable for OS-level font scale
    - https://chromestatus.com/feature/5328467685801984
  - meta name="text-scale"
    - https://chromestatus.com/feature/5112244702674944
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - [css-env][css-values] UAs inconsistent in how OS font settings affect the default font-size `medium` · Issue #10674 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/10674
  - [css-env][css-fonts-5] New `<meta text-scale>` tag to make UA initial font size respond to OS text scale setting · Issue #12380 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/12380
- Other
- Spec
  - CSS Environment Variables Module Level 1
    - https://drafts.csswg.org/css-env-1/#text-zoom
  - CSS Fonts Module Level 5
    - https://drafts.csswg.org/css-fonts-5/#text-scale-meta