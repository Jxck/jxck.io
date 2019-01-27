# [media query][dark mode][css] prefers-color-scheme を用いた Dark Mode 対応と User Preference Media Features

## Intro

macOS Mojava は OS レベルで Dark Mode に対応した。

しかし、 Web コンテンツは依然として白背景黒文字ベースのデザインが多く、結果ブラウザの中だけ眩しいという問題がある。

[Safari TP69](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68/) では、これにメディアクエリで対応するための `prefers-color-scheme` が実装された。

これを用いた DarkMode 対応と、本ブログの DarkMode 対応、および策定中の User Preference Media Features について解説する。


## Update

2019/1 に Chrome の Intents が出された。

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
  background-color: white;
  color: black;
}

@media (prefers-color-scheme: dark) {
  background-color: black;
  color: white;
}
```

多くの場合、現状のコンテンツが Ligth Mode と見なされるだろう。

その場合、差分のみを Dark Mode 用に書き、色を反転するデザインをあてれば良い。

しかし、今後 Dark 以外のテーマの出現や汎用性、メンテナンス性を考えると、カラーセットを Variables でまとめておき、切り替えるのが良いだろう。


```css
@media (prefers-color-scheme: light) {
  --theme-base: white;
  --theme-font: black;
  --theme-accent: red;
}

@media (prefers-color-scheme: dark) {
  --theme-base: white;
  --theme-font: black;
  --theme-accent: red;
}

body {
  background-color: var(--them-base);
  font: var(--them-font);
  strong: var(--them-accent);
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


## 本サイトでの適用

本サイトも色関連を variables でまとめ、 dark mode のみ切り替えるように CSS を適用した。

動作は Safari TP69 で確認している。

![dark mode support demo](./dark-mode.gif#1346x783)

今後、新しくプロパティが実装された際には対応していく予定であり、それを見据えた CSS のリファクタリングをし、備えておきたいと考えている。
