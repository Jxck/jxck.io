# [rhythmic sizing][vertical rhythm][css] CSS Rhythmic Sizing で Vertical Rhythm

## Intro

タイポグラフィに関連したデザイン手法の 1 つに Vertical Rhythm がある。

そして、現在 CSS でそれを簡単に実現するための CSS Rhythmic Sizing という仕様が提案されている。

Chrome にフラグ付きで実装されたこの仕様を用いて、本サイトへの適用を行ったので、解説する。

[CSS Rhythmic Sizing](https://drafts.csswg.org/css-rhythm/examples/snap-height.html)


## CSS Rhythmic Sizing

筆者はタイポグラフィやデザインには疎く、 Vertical Rhythm についてもよく知らなかった。

しかし、 Chrome でこの仕様を実装している [Koji Ishii](https://plus.google.com/u/0/111919080701466394452) さんに API を紹介してもらい、色々学ぶ機会があった。

本仕様はまだブラウザ間でも合意が取りきれていない部分があるらしく、ユースケースやフィードバックを集めている段階とのことだったので、

トライアルとして、本サイトへの適用を行うことにした。

実装にあたっては、全面的に Koji さんに協力して頂いた。


## Readability of Rhythm

Vertical Rhythm の効果については、以下のように教えて頂いた。

> Readability の研究からすると、 Vertical Rhythm があたっていると、読むスピードが上がり、読後に質問すると内容を覚えていたり理解していたりする率が上がる、とされています。

つまり、本サイトのような、専門的な内容を扱うテキストを中心としたコンテンツでは、効果を期待できそうだ。

また、本サイトの特徴上、アクセスするユーザは Chrome が多く、 `#enable-experimental-web-platform-features` を有効にしている可能性も期待しやすい。

特に入れることによるデメリットもなさそうなので、本サイトには `@support` で CSS を切り替えつつ、試験的に適用することにした。


## DEMO

機能を試すデモを以下に用意した。

[Rhysmic Sizing DEMO](https://labs.jxck.io/rhythmic-sizing/basic.html)

CSS の機能は Origin Trials ではないため、 [chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features) を有効にする必要がある。

作成時は Chrome Canary 63 で挙動を確認している。

これを元に解説する。

(参考までに [CSS Working Group](https://drafts.csswg.org/css-rhythm/examples/snap-height.html) のデモも紹介しておく)


## Vertical Rhythm

例えば以下のようなページがあったとする。

![Vertical Rhythm を適用しないシングルカラムでは、各行の高さ/余白のリズムが安定しない](single-no-rhythm.png#500x600 "single column with no vertical rhythm")

ここでは、わかりやすくするため、 `font-size` を `16px` とし、 `<p>` のマージンは前後とも `24px` としている。


```css
body {
  --base: 16px; /* base font size */
  --grid: 24px; /* base grid size */
  font-size: var(--base);
}

p {
  /* align padding with height-step */
  margin-top: var(--grid);
  margin-bottom: var(--grid);
}
```

そこに引いたグリッドの線を見ればわかるように、 `<h1>` ~ `<h4>` の余白はバラバラになっている。

ここで、個々の `line-height` を計算し適切に設定する代わりに、 CSS Rhythmic Sizing では以下のようなプロパティが設定できる。


```css
.rhythm {
  line-height-step: var(--grid);
}
```

この設定を親要素に指定すると、子要素のインライン要素は、 `line-height` を自動で `24px` の倍数に揃えることができる。

すると、 `<h1>` ~ `<h4>` の高さは、フォントが `line-height-step` の値(つまり `24px`) に収まる場合は `24px` に、収まらなければ 40, 80... px に自動でアラインされる。

`<p>` のマージンは同じく(相殺含め) `24px` に揃っているので、表示は以下のようにグリッドに揃う。

![Vertical Rhythm を適用したシングルカラムでは、各行の高さ/余白が揃いリズムが安定する](single-with-rhythm.png#500x600 "single column with vertical rhythm")

途中にある `<img>` もインライン要素なので、同じくリズムに載っていることがわかるだろう。


## Multi Column Layout

確かにリズムが揃っていることはわかるが、それによる効果は本サイトのような Single Column よりも Multi Column なコンテンツの方が実感しやすい。

そこで、 CSS の Multi Column Layout で 2 column にするオプションを追加した。


```css
.colmun {
  column-count: 2;
  column-gap: calc(var(--grid) * 2);
  padding: var(--grid);
}
```

結果は以下である。

![Vertical Rhythm を適用したマルチカラムレイアウトでは、隣同士での高さも揃いリズムが安定する](multi-with-rhythm.png#1680x700 "multi column with vertical rhythm")


## Block Step

ここまではインライン要素に対する設定であるが、仕様にはブロック要素へ設定するプロパティも定義されている。

- `block-step-size`
- `block-step-insert`
- `block-step-align`
- `block-step-round`

しかし、まだ実装したブラウザは確認していない。

そこで、現状ブロック要素を Rhythm に載せるには、 `inline-block` を指定して無理やり `line-height-step` を適用するしかないようだ。


## 本サイトへの適用

本サイトは、デモと違い 1 column かつ日本語のコンテンツであり、 Grid の基準になる値もデモほど揃っていない。

こうしたコンテンツでの考慮点も教えて頂いた。

> 特に１カラムにおいては、厳密にすべてをリズムに載せる必要はなく、また特に日本語では良くないとされています。リズムは、次の行がリズムに乗っていることで次の行の行頭を探しやすくする、という目的ですので、大きなブロックや表はリズムに乗る必要がありません。

> 原則、行幅が広い時には、行がラップするときに視線が右端から左端まで移動する距離が長くなるので、行間は広めに取ります。でもあまり広げると、かっこわるいし、スペースも無駄なので、 Vertical Rhythm で視線移動を補完してあげる、ということなんです。

そこで、以下のような方針で適用する。

まず `line-height: 15` とし、これを基準に `<article>` 全体に Rhythm を当てる。


```css
article {
  line-height: 1.5;
  --grid: 1.5em;
  line-height-step: var(--grid);
}
```

`<h1>` ~ `<h5>` 中はモバイルでの折り返しを考慮して 1.2 とし、中身は Rhythm から外すが、ブロック全体は Rhythm に載せる。

しかし、余白が空きすぎるので `margin-bottom` のみ消す。


```css
article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  display: inline-block;
  width: 100%;
  line-height-step: 0;
  line-height: 1.2;
  margin-bottom: 0;
}
```

`<p>` はリズムに載せるため、 margin/padding を `line-height-step` に揃える。


```css
article p {
  margin-top: var(--grid);
  margin-bottom: var(--grid);
}
```

`<pre>` と `<table>` は中身/全体ともに Rhythm に載せないよう、 `line-height-step: 0` にする。


```css
article pre,
article table {
  line-height-step: 0;
  line-height: normal;
}
```

結果は本ページを、フラグを有効にした Chrome Canary と、そうでない Chrome Stable などを横に並べて見比べるなどすれば確認できる。


## 雑感

Vertical Rhythm については、既に CSS で実現する方法が色々あるようだ。

しかし、このプロパティが有効であれば、面倒な計算などを行わずに、手軽に実現できることはわかった。

Readability という話になると効果の測定が難しいところだが、 CSS を過度に複雑にせず目的を達成できる点では Rhythmic Sizing の導入は検討しやすい。

また、低コストでリズムという指標を設計に取り入れられることは、設計にも良い影響があるのでは無いかと考える。

仕様のステータスとしてはまだまだだが、今後の展開にも期待したい。
