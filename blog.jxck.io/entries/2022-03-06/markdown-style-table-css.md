# [markdown][css] Markdown の Table 記法を CSS で実現する

## Intro

本ブログは Markdown で原稿を書き、それを HTML に変換して表示している。このとき、 CSS を用いて Markdown のシンタックスに似せた Style を適用している。例えば以下のように `h2::before` に `content: '##'` を指定するといった具合だ。

しかし、これまで `<table>` だけはうまく Markdown 記法を再現する CSS が書けないでいた。

そこで、周りの CSS 強者に実現できないか聞いてみたところ、[@shqld](https://twitter.com/shqld), [@araya](https://twitter.com/arayaryoma), [@yoshiko](https://twitter.com/yoshiko_pg) 達の協力を得て、かなりの完成度にすることができた。実現方法を記録する。


## Before

実現したいのは以下のような記法だ。

```md
| file type | size | ratio |
|:----------|-----:|------:|
| .webp     | 9474 |  100% |
| .webp.gz  | 2609 |   28% |
| .webp.br  | 2544 |   27% |
```

特に `<thead>`, `<tbody>` の間に入るセパレータ (`|:---|---:|---:|`) の部分の長さを内容に合わせるためには `<td>` 内の文字数を CSS 内で取得する必要がある。これは JS 無しには難しそうだった。 JS は使いたくないし、もし使うしかないなら Houdini の Pain API などで実装したい。しかし、 Paint PAI も当時は Text Rendering がサポートされてなかったため、それも諦めていた。

などと考えている間に飽きて、適当に border を dash にしただけのお粗末な実装で誤魔化していた。

![border を dash にしただけの実装](table-before.png#622x330)


## Call for Implementation

[Markdown のパーサを書きなおした](https://blog.jxck.io/entries/2021-11-30/blog-v2-release.html) 際にこの作業を思い出し、誰か実現できる人がいたりしないか CSS に強そうなエンジニア何人かに聞いてみたところ、いくつかアドバイスをもらえたり、 PoC を返してもらえた。 URL のあるものだけ貼っておく。

- araya: https://codepen.io/arayaryoma/pen/XWzgVwx
- yoshiko: http://jsfiddle.net/j4fm9scg/

これらを参考にさせてもらうことで、かなりの完成度まで実現することができた。


## 実装方針

### HTML

まず、自作のパーサでは以下のような HTML が生成される。 Align は HTML の `align` 要素が [Deprecate](https://developer.mozilla.org/ja/docs/Web/API/HTMLTableElement/align) だったため、 `class` で実装している。

```html
<table>
  <thead>
    <tr>
      <th class=align-left>file type</th>
      <th class=align-right>size</th>
      <th class=align-right>ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class=align-left>.webp</td>
      <td class=align-right>9474</td>
      <td class=align-right>100%</td>
    </tr>
    <tr>
      <td class=align-left>.webp.gz</td>
      <td class=align-right>2609</td>
      <td class=align-right>28%</td>
    </tr>
    <tr>
      <td class=align-left>.webp.br</td>
      <td class=align-right>2544</td>
      <td class=align-right>27%</td>
    </tr>
  </tbody>
</table>
```


### CSS

`|` は `<th>`, `<td>` の `::before` / `::after` の `content` でだいたい想像通りの実装を行う。

問題は `<thead>` / `<tbody>` の間の線だ。ここの実装は以下のように行っている。

- th の `::after` に `-----------` を長めに用意し、 overflow hidden で切る
- align が left なら `:--------` にする
- align が right なら direction を RTL にし `----------:` にする
- top と translateY で縦位置調整

これで見た目が以下のようになる。

![Markdown Like の実装](table-after.png#578x238)

スタイル自体はこれで完成だ。


## Generated Content Model

デザインとしてのスタイル指定で、 `content` に装飾用の文字を大量に指定した。本来はスタイルとして認識され、特に Crawler や Assistive Technology には無視されることが望ましい。

しかし、 [CSS Generated Content Module Level 3](https://www.w3.org/TR/css-content-3/#accessibility) の仕様では、以下のように定義されている。

> Generated content should be searchable, selectable, and available to assistive technologies.
> The 'content' property applies to speech and generated content must be rendered for speech output. [CSS3-SPEECH]

直後に ISSUE があるため、ここにはまだ議論と作業があるが、現状 CSS の Pseudo-elements に指定された `content` も Generated Content であるため、大量の `-` などがコンテンツとして認識される状況は望ましいものではない。

実際に Mac の Voice Over で検証したところ、確かに `:----` の部分が「ハイフン N 個」のように、スタイル部分をコンテンツとして認識している。


### Alternative Text

そこで、[1.2. Alternative Text for Accessibility](https://drafts.csswg.org/css-content-3/#alt) に定義されているように Alternative Text を以下の用に指定した。

```css
th::before,
td::before {
  content: "|" / ""; /* 読み上げ等に対しては空文字として認識させる */
  float: left;
}
```

これで Chrome などのブラウザでは、 Voice Over での読み上げにスタイル部分が無視されるようになった。


### Fallback

しかし、 Safari や Firefox は `content` の Alternative Text に対応してないため、このままでは `content` そのものが無視される。

通常、フォールバックとして Alternative Text 無しのものを先に指定することで見た目上は回避できる。

```css
th::before,
td::before {
  content: "|"; /* Safari 用のフォールバック */
  content: "|" / ""; /* 読み上げ等に対しては空文字として認識させる */
  float: left;
}
```

しかし、これでは Safari/Firefox を Voice Over で読み上げるような場合に、 `content` 部分が認識される。もし先頭に 1 文字つく程度ならまだ許容できるかもしれないが、今回は文字が多いため、煩わしさは他の記法とも異なるだろう。

せっかく表としてマークアップしているのに、スタイルのために読みにくい状況になるのは不本意なため、 Fallback の指定は辞め Alternative Text 未対応のブラウザには Table の Markdown Style を適用するのをやめることにした。


### Support query

Markdown Style を Table に提供しない場合は、 `|` や `-` がなくなって罫線の無い Table になることを避けるため、以前自分が実装した border での実装をベースに提供することにした。

そして、 `@supports` を用いて、以下のように Alternative Text に対応している場合のみ、 Markdown Style CSS を適用している。

```css
/** default implementation */

@supports (content: "a" / "b") {
  /** Markdown Style **/
}
```


## figure / figcaption

`<table>` 自体が横に長い場合があるため、 `overflow` を指定する必要がある。しかし、 `overflow` を指定するためだけの親要素として `<div>` を追加するのがなんとなく気に食わなかったため、以前から TODO だった表のキャプションを導入することにした。

`<table>` の場合は `<caption>` を使うのが一般的ではあるが、より汎用的な仕様である `<figure>` と `<figcaption>` を用いることも仕様上可能だ(ただし両方の併用は不可)。そこで、 `<table>` 全体を `<figure>` で囲み、そこに `overflow` を指定しつつ、 `<figcaption>` を入れれば、全てが一度に解決するためこの方法を取ることにした。


### Caption 記法

パーサとジェネレータは自作しているため、 `<figure>` で囲むのは簡単だが、問題は `<figcaption>` の内容を Markdown 上どう表現するかだ。

Markdown は Caption の記法を標準で持たないため、様々な実装が独自の拡張として実装している。 `[caption]` のように括弧で囲うタイプのものが多いが、 `[]` に独自の意味を持つ実装は割と多いため、未対応の場合は単なる `<p>` として扱われるよう、 `Caption: caption` という記法で Table の直前に置くことにした。

```md
Caption: Webp を gz/br 圧縮した結果
| file type | size | ratio |
|:----------|-----:|------:|
| .webp     | 9474 |  100% |
| .webp.gz  | 2609 |   28% |
| .webp.br  | 2544 |   27% |
```

せっかくなので、論文のようにキャプションの前に "表 1:" のようなプレフィックスを CSS Counter を用いて付与し、以下のように表示するようにした。

![figcaption を付与した table](figcaption.png#598x310)


## After

以上を踏まえて実装した表が以下だ。 Chrome などでは Markdown Style で表示され、 Safari / Firefox などでは従来の border style で表示される。

Caption: Webp を gz/br 圧縮した結果
| file type | size | ratio |
|:----------|-----:|------:|
| .webp     | 9474 |  100% |
| .webp.gz  | 2609 |   28% |
| .webp.br  | 2544 |   27% |


## TODO

今回は `text-overflow` を `clip` にしているため、長さによっては横線の `-` が途中で切れる場合がある。

対策として `text-overflow` に `"-"` や `":"` などを指定できると終端を綺麗に処理できそうだが、 Firefox しかサポートしておらず、 Firefox は上述の Alternative Text に対応してないため実現できなかった。

`text-overflow` と Alternative Text の compat が上がったら再検証したい。


## DEMO

単体で動作するデモを以下に用意した。

- https://labs.jxck.io/table


## 謝辞

実装の助言をくれた 、[@shqld](https://twitter.com/shqld), [@araya](https://twitter.com/arayaryoma), [@yoshiko](https://twitter.com/yoshiko_pg) に感謝する。


## Reference

- Spec
  - CSS Generated Content Module Level 3
    - https://drafts.csswg.org/css-content/#content-property
  - CSS Conditional Rules Module Level 3
    - https://drafts.csswg.org/css-conditional-3/#at-supports
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
  - content - CSS | MDN
    - https://developer.mozilla.org/ja/docs/Web/CSS/content
  - @supports - CSS | MDN
    - https://developer.mozilla.org/ja/docs/Web/CSS/@supports