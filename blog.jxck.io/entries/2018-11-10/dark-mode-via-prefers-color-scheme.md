# [media query][dark mode][css] prefers-color-scheme を用いた Dark Mode 対応と User Preference Media Features


## Intro

macOS Mojava は OS レベルで Dark Mode に対応した。

しかし、 Web コンテンツは依然として白背景黒文字ベースのデザインが多く、結果ブラウザの中だけ眩しいという問題がある。

[Safari TP69](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68/) では、これにメディアクエリで対応するための `prefers-color-scheme` が実装された。

これを用いた DarkMode 対応と、本ブログの DarkMode 対応、および策定中の User Preference Media Features について解説する。


## Update

- 画像の対応について追記した
- Code Block の対応について追記した
- 2019/1 に Chrome の Intents が出された。
  - [Intent to Implement: Media Queries: prefers-color-scheme feature](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Muw0N43ntSw/WZZZI7w7DQAJ)
  - [Intent to Implement and Ship: CSS prefers-reduced-motion media query](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/NZ3c9d4ivA8/BIHFbOj6DAAJ)


## Dark Mode

多くのディスプレイコンテンツは、背景を白、文字を黒にしたデザイン(Light Mode)が多い。

しかし、暗い場所での閲覧時に目への負荷を下げる目的で、背景を黒、文字を白に反転したデザインが用意され、ユーザが好みで切り替えられるようにしたアプリケーションも増えた。

macOS Mojava らは、 OS レベルで Dark Mode を有効にできるようオプションが追加され、これによって多くのアプリケーションのデザインが切り替わるようになった。

筆者は黒背景のターミナル上に居る時間が長いため、ブラウザと切り替えた時の光の強さの変化がずっと気になっていたが、 OS 全体を Dark Mode にした結果より一層ブラウザが眩しく感じるようになった。

Safari は、 Mojava の Mode が Light/Dark どちらに設定されているかを取得する仕組みを検証しており、これを用いると OS の設定に合わせたデザインを提供できる。


## prefers-color-scheme

Safari TP 69 では、 `prefers-color-scheme` を用いて Media Query でテーマごとに分岐した CSS を記述できるようになった。


```css
@media (prefers-color-scheme: light) {
  body {
    background-color: white;
    color: black;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

多くの場合、現状のコンテンツが Ligth Mode と見なされるだろう。

その場合、差分のみを Dark Mode 用に書き、色を反転するデザインをあてれば良い。

しかし、今後 Dark 以外のテーマの出現や汎用性、メンテナンス性を考えると、カラーセットを Variables でまとめておき、切り替えるのが良いだろう。


```css
@media (prefers-color-scheme: light) {
  :root {
    --theme-base: white;
    --theme-font: black;
    --theme-accent: red;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --theme-base: black;
    --theme-font: white;
    --theme-accent: pink;
  }
}

body {
  background-color: var(--theme-base);
  color: var(--theme-font);
}

strong {
  color: var(--theme-accent);
}
```


## 画像

CSS で色を付けているものは解決するが、問題は `<img>` タグの画像だった。

ページをダークモードにしても、画像が元のままだと浮いてしまうという問題があった。

画像には大きく二つの種類がある。

- スクショなどの写真画像(png, jpg, webp)
- ツールで書いた図(svg)

SVG は最悪作り直すことも可能だが、コストがかかるため難しい。

そこで、これらは CSS Filter で対応することにした。


### ラスタ画像(png, jpg, webp)

Dark Mode 時の画像がどうあるべきかを考えると難しい。

背景と文字については反転しているわけだが、画像の反転での `invert()` はネガのようになりより見にくくなってしまう。

そもそも Mode があるのは、なんらかの理由で「見やすさ」を切り替える目的があると考える。

Light Mode に対し Dark Mode があるのは、 Light Mode が「明るすぎる」「眩しい」という理由が挙げられるだろう。

すると、 Dark Mode 時の画像は、 Light Mode に対して暗くなっているべきだと考えられる。

そこで `grayscale()` を適用し、暗くする方法を取ることにした。

この `grayscale()` は引数を取り、 100% が完全な白黒になる。

注釈や赤線を引いたスクショもあるため、それらの色が認識でき、かつ明るさを抑えて先の dark mode の CSS デザインと混じる値を探す。

結果、以下に落ち着いた。


```css
article img {
  filter: grayscale(50%);
}
```


### ベクタ画像(svg)

ベクタは、基本白背景に対して黒の線や文字で作り、一部色を入れている。

これは、 `invert()` で反転させることで黒背景にすることが可能なので、黒背景にした dark mode とも合う。

しかし、そのままではやはり色が強くなりがちなので、ラスタと同じように `grayscale()` を適用することにした。

結果、以下に落ち着いた。


```css
article img[src*=svg] {
  filter: invert(100%) grayscale(50%);
}
```


### 画像についての備考

本サイトが、そもそもモノクロデザインであるため、画像もモノクロにしてしまっても、なんとなくそれっぽく見える。


```css
article img[src*=svg] {
  filter: invert(100%) grayscale(100%);
}

article img {
  filter: grayscale(100%);
}
```

しかし、それは本サイトがたまたまそうだっただけで、テーマカラーのあるサイトではそうはならないだろう。

そこで、ここまでの極端な設定は一旦避けて、前述のようにした。

画像については、今後も色々値を変えつつ試していきたい。


## Code Block

本サイトでは、コードスニペットにシンタックスハイライトを入れている。

ハイライト用のテーマを dark 用に用意するのも良いが、大変そうだったのでここも CSS filter を使うことにした。

ハイライト用に作ったカラーテーマは、そのまま `invert()` してもそれなりに違和感がなかったため、これを適用した。


```css
p > code,
pre > code {
  filter: invert(100%);
}
```


## User Preference Media Features

この `prefers-color-scheme` は MediaQueries Lv5 の User Preference Media Features という仕様に含まれ、まだ策定途中である。(current work は Lv4)

主に、ユーザ自身が望ましい閲覧設定を、コンテンツ側が取得して、デザインのヒントに利用するためのものである。

執筆時点では、 User Preference Media Features は以下の 4 が定義されている。

- prefers-reduced-motion(reduce):       アニメーションなどの動きを減らす
- prefers-reduced-transparency(reduce): 透過表現を減らす
- prefers-contrast(high, low):          コントラストの高低を要求する
- prefers-color-scheme(light, dark):    カラーテーマを指定する

[Media Queries Level 5](https://drafts.csswg.org/mediaqueries-5/#mf-user-preferences)

今回はこの color-scheme にのみフォーカスしたが、この仕様を見ればユーザが様々な閲覧環境を設定できるようになる可能性が想定でき、対応のバリエーションも増えるだろう。

もし今回 DarkMode に対応するために CSS に手を入れたり、新規に CSS を書く機会があるのであれば、将来こうした設定への対応をする可能性を考慮し、設計できるとより良いのではないだろうか。


## 本サイトへの適用

本サイトも色関連を variables でまとめ、 dark mode のみ切り替えるように CSS を適用した。

動作は Safari TP69 で確認している。

![dark mode support demo](./dark-mode.gif#1346x783)

今後、新しくプロパティが実装された際には対応していく予定であり、それを見据えた CSS のリファクタリングをし、備えておきたいと考えている。
