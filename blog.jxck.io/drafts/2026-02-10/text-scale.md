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

旧来のピクセルパーフェクト文化からの移行の過程で、`px` などの絶対値指定から、`%` や `em` な.ど相対値を用いる設計も増えてきた。

フォントサイズを相対値指定してあれば、OS の設定が変わった際に追随できると期待した実装もあるだろう。

しかし、実際にそれが意図の通り反映されているかは、「拡大への追随とはどういう状態を意図しているか」と「OS における拡大が何に影響するか」によって、かなりの差があることが知られている。


## OS ごとの拡大

この差は PC より、View Port の小さいモバイルで顕著だ。

基本的に、ベースとなる font-size は 16px が一般だが、この基本サイズに OS に指定した拡大率が反映され、rem/em を指定したサイズ全てに伝搬するのが理想だろう。

モバイルの Firefox はそうなっているが、Android Chrome と iOS Safari では、そういう挙動にはならない。

Safari の場合、システムの設定はシステムフォントには影響するが、Web コンテンツには影響しない。代わりに、ページごとに文字の拡大設定があるが、それはグローバルには適用されない。

TODO: chrome は?

これは、OS の設定を Web ページ全体に反映すると、レイアウトが崩れるページが多く存在するからだとされている。

通常、文字のサイズが拡大されても、margin や border-width を同じように拡大すべきとは限らない。フォントを倍にしたいとしても、余白や線の太さまで倍になる必要は無いことが多いのだ。

しかし、100% (つまり 1rem = 16px) の時に合わせて、相対値を出すためだけに `em` や `rem` を使っていると、margin や border まで同じように拡大され、レイアウトが崩れ文字が見切れたり、重なってしまうといったことが起こる。

拡大したらどうなるかを確認せずにデプロイされたサイトの多くは、読めたものではないレイアウトになるだけなのだ。

そうしたコンテンツが最低限閲覧できる状態を維持するために、歴史的にモバイルブラウザの多くは、デフォルトのフォントサイズを上書きすることができずにいた。

テキストだけではなく、ページ全体を拡大する「フルページズーム」のような挙動に倒している場合もある。全部拡大してしまえば、`em` や `px` が混じっていても、それらをそのまま大きくするので、「壊れる」可能性を減らせるからだ。

はみ出す分はスクロールが出るだけで、ちゃんと相対値を使い分けている作者の意図は反映されない。

また、ブラウザでは拡大されるが、ユーザのコントロールが難しい Web View は、対象外だったりもする。

もちろん、それがアクセシビリティ上問題になることはずっと前から分かっていた。

そこで、Safari は独自の Variable を用意し、開発者にオプトインで使うように啓蒙してきた。選択肢を用意してオプトインにすることで、きちんと対応できているサイトだけが、OS の設定に連動して拡大されることを意図している。

```css
body {
  font: -apple-system-body;
}
h1 {
  font-size: 1.2rem;
}
```

この機能は Safari 独自だが、ブラウザ間で互換を保つことを目的に、同等の手法が標準化するための議論が継続して続けられてきた。


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


## pem (廃止)

Preferred Text Scale を一度だけ使い、全体をコントロールするのであればあまり問題にはならないが、部分的に置き換えていくような場合は、このスニペットを複数箇所で書く必要が出るだろう。

そこで、構文糖衣として提案された新しい単位が `pem` だ。

```css
h1 {
  font-size: 1.2pem;
}
```

しかし、すでに `em` / `rem` が普及している中で、既存の CSS に `pem` を導入していくのは現実的ではない。

結果、この提案は標準化までは至らなかった。


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


### 非線形オプション

提案では、非線形スケールのオプションの提案もある。例えば全体を 200% に拡大する場合、16px が 32px になるのは良いとしても、すでに 64px の見出しを 128px に同じく拡大する必要があるとは言い切れない。大きすぎて View Port を占有してしまっては、逆に視認しづらいページになる可能性もあるからだ。

拡大率をサイズに応じて下げていく関数を適用するか、拡大の上限に閾値を用意するといったオプションも、必要になってくるかもしれない。

ブラウザのデフォルトは、しばらくは `legacy` のままになるだろう。理想的には、デフォルトを `scale` にし、対応準備ができていないサイトだけ `legacy` で Opt-Out する運用が理想とはなるが、なかなか時間がかかると予想される。

したがって、標準化と実装が揃ったら、ページの状況に応じて明示的にこの値を付けていき、`legacy` なページを把握しつつ、`scale` に対応させていく移行作業を行っていくこととなる。


## 理想的な設計手法

「相対値にしておけばレスポンシブになる」という単純な考えを改め、「何が何に追従すべきか」を見極めて設計する必要がある。

例えば、文字が 2 倍になった時、border まで 2 倍に太くなり、margin も 2 倍の幅になる必要があるかというと、必ずしもそうではないだろう。

この場合、`1px` の線を `calc(1rem / 16)` などとするより、素直に `1px` とする方が良い場合もある。

余白も、文字に追従する `rem` / `em` より `vh` や `vw` などを用いる方が余計な崩れを避けられる可能性がある。

仮に、拡大率をそのまま反映すると大きくなりすぎる場合は、`clamp()` で調整するといった微調整も必要かもしれない。

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

また、きちんと設計ができていれば、デバイスによるヒューリスティックな拡大なども必要ないはずなので、その場合は、`text-size-adjust` を無効にすることも考えられる。

```css
:root {
  text-size-adjust: none;
}
```


## Outro

まだ全てのブラウザのポジションが揃ったわけではないが、議論を見ていると、モバイルにおける拡大問題自体については一定の合意があるように思える。

筆者の親などは、iPhone の文字をかなり大きくして使っているため、この問題自体はある程度身近ではあった。

ある程度メジャーなサイトは一定の対応が取られているものも多いが、そうではないサイトも世の中にはかなりある。

本サイトも、そこまで拡大を意識した検証をしてきていなかったため、これを機に CSS を見直し、推奨の方法で設計し直した。

今後も、非線形スケールなどの仕様が採用され、実装が進むようであれば、合わせて検証していきたい。


## DEMO

本サイトに `<meta name="text-scale" content="scale">` を指定しつつ、互換のために `preferred-text-scale` を指定した CSS 設計に見直し、iPhone Safari / Android Chrome での動作を確認した。

拡大時に、余白などが必要以上に増えることが無いように指定を見直し、200% の拡大までを対象に挙動を確認している。

画像やコードブロックを除けば、基本的にはただのテキストサイトであるため、あまり独自性を出すよりは、ブラウザの Reader Mode での閲覧相当になるように調整した。

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
- Webkit Position
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