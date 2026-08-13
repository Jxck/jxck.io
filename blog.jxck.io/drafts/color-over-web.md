# [css][color] CSS Color Module v4 ベースの色設計

## Intro

Web における「色」を扱う API は、気づいたらかなり色々増えている。

デザインシステムのなかでデザイントークンとして、色を一元管理するといった構成は増えているが、その先の定義が RGB Hex なことはまだ多いだろう。

今の Web の API を用いると、どういった色の設計や管理が可能なのか、現状を棚卸しする。


## Named Color

CSS のキーワードとして登録されている 148 色を指す。

```css
background-color: red;
```

仕様に書かれている通り、これらは初期のブラウザが動作環境としていた X11 の実装する色名を、そのままブラウザに移植したところから始まる。

> For historical reasons, this is also referred to as the X11 color set.

ちなみに、この 148 色が "Web Safe Color" だと誤解されることがある。

Web Safe Color は、モニターが 256 色しか再現できなかった時代に、その範囲を超えないように指定する色とされる。

要するに RGB をそれぞれ 16 進数にしたとき、`00`, `33`, `66`, `99`, `CC`, `FF` の 6 つを組み合わせた 6^3 = 216 色を指す。

例えば Named Color の `skyblue` は `#87CEEB` と半端な値が含まれるため、最も近い Web Safe Color は `#99CCFF` になる。

現在 Named Color を、プロダクションの色設計で用いる積極的な理由はない。

- CSS Color Module Level 4 - 6.1. Named Colors
  - https://drafts.csswg.org/css-color-4/#named-colors


## RGB

色の指定として最初に思いつき、もっとも使われているのが RGB だろう。三原色である Red / Green / Blue の割合を指定する手法だ。

指定方法は、それぞれを 16 進数にして並べた方法が一般的だ。Alpha を加えて 8 桁にすることもできる。

```css
background-color: #aabbcc;   /* rgb */
background-color: #aabbccdd; /* rgba */
```

`rgb()` を用いると、それぞれを 10 進数や、割合(%)で表現することができる。

```css
background-color: rgb(30 40 50 / 60%);
background-color: rgb(10% 20% 70% / 60%);
```

DOM API には、色情報を取得する際に内部的に `[30, 40, 50]` のように RGB 形式を用いるため、そこと連携する際は `rgb()` が便利となる。

昔は `rgb(30, 40, 50)` のようにカンマ区切りだったが、今は区切らない。

また Alpha を指定するために `rgba()` も定義されたが、`rgb()` が拡張されて Alpha が取れるようになったため、`rgba()` は `rgb()` のエイリアスとなっている。

- CSS Color Module Level 4 - 5.1. The RGB functions: rgb() and rgba()
  - https://drafts.csswg.org/css-color-4/#rgb-functions


## HSL


## HWB


## LAB

RGB は、ディスプレイが光の三原色のバランスで色を表現する、もっとも原始的な方法だった。

一方 Lab は、「人間の知覚特性に合わせた変化」をさせやすい性質をもっている(Perceptual Uniformity:知覚特性均等性)。

例えば、色の見た目を数値化し、感覚的な違いを共有するような場面で広く使われ、CIE (国際照明委員会)によって策定された色空間であり、CIELAB とも呼ばれる。

Lightness, a, b の 3 次元で指定され、a が赤~緑 b が青~黄の間の値を指定する。

```css
background-color: lab(50% 40 20 / 10%);
```

例えば L を 10 から 20 にしたときも、50 から 60 にしたときも、「同じくらい明るくなった」と感じやすいため、グラデーションやシェードの設計がしやすい。

しかし、a と b の調整は難しく、「彩度だけ変えたい」といった場合の計算が複雑になる。

したがって、LAB も新規で積極的に入れる理由はないだろう。

- CSS Color Module Level 4 - 9.3. Specifying Lab and LCH: the lab() and lch() functional notations
  - https://drafts.csswg.org/css-color-4/#specifying-lab-lch


## LCH

人間の視覚は「明度(Lightness)」「彩度(Chroma)」「色相(Hue)」という 3 つの要素で、色を認識している。

これをそのまま落とし込んだのが LCH だ。

```css
background-color: lch(60% 50 250 / 80%);
```

色相(H)だけを変えていけば、同じ明るさ・鮮やかさのカラーパレットを作ることができる。

明度だけを変えて Hover 時の色を出したり、彩度だけ変えて Disable 時の色を出したりと、状態に応じたバリエーションも作りやすい。

ただし、青の色相においては、明度や彩度だけを変えても明らかに赤みを帯びて紫っぽくなり、色相が変わって見える現象が知られている。

```css
background-color: lch(35% 70 270); /* #004fb0 青 */
background-color: lch(70% 70 270); /* #8b99ff 薄紫になってしまう */
```

これは実は LAB でも起こっており、LCH は LAB を直交座標から極座標に変換しただけ(つまり表し方をかえただけ)なので、LAB の問題を引き継いだ形になる。

したがって、LCH も新規で積極的に入れる理由はないだろう。

- CSS Color Module Level 4
  - https://drafts.csswg.org/css-color-4/#specifying-lab-lch


## OKLAB/OKLCH

LAB/LCH の持っていた「青が紫にシフトする」問題を数学的に解決したのが OKLAB/OKLCH だ。

- A perceptual color space for image processing
  - https://bottosson.github.io/posts/oklab/

ブログによると、OK とは良いという意味そのままの OK のようだ。

> It is called the Oklab color space, because it is an OK Lab color space.

これにより、色相・明度・彩度の独立性が高く、ある要素の調整が他の要素に影響しづらい色空間を手に入れたことになる。

つまり、LCH かつ OK な OKLCH を使って、カラーパレットやグラデーション、状態ごとのバリエーションなどを定義するのが、現代の Web における色の設計手法の理想と言って良い。

例えば、L,C を固定し H を変えていけば、明るさ/鮮やかさが揃ったカラーパレットが作れる。

```css
:root {
  /* 明度(L) と 彩度(C) の共通設定 */
  --brand-l: 0.60;
  --brand-c: 0.10;

  /* Hue を変えることで、トーンが揃ったカラーパレットが定義できる */
  --brand-blue:   oklch(var(--brand-l) var(--brand-c) 250); /* 青 */
  --brand-green:  oklch(var(--brand-l) var(--brand-c) 140); /* 緑 */
  --brand-purple: oklch(var(--brand-l) var(--brand-c) 300); /* 紫 */
  --brand-red:    oklch(var(--brand-l) var(--brand-c) 20);  /* 赤 */
}
```

HSL では「黄色だけ眩しすぎる」「青だけ暗すぎる」という問題が起きるが、oklch であれば視覚特性的に揃ったパレットを作ることができる。

- CSS Color Module Level 4
  - https://drafts.csswg.org/css-color-4/#specifying-oklab-oklch


## Relative Color Syntax

Relative Color Syntax は、すでに定義された色を元に、別の色を作ることができる。

たとえば、既存の色の Alpha だけを変えたいといった場合に、以下のように書くことができる。

```css
background-color: rgb(from var(--primary) r g b / 20%);
```

これを `oklch()` と組み合わせれば、さらにバリエーションが作りやすい。

例えば、Hover 時に少し暗い色にしたい場合は、L を `calc()` で落とせば良い。

```css
background-color: oklch(from var(--primary) calc(l - 0.1) c h);
```

また、`calc(1 - l)` にすると L を反転することができるため、ダークモード用の色を算出するといった使い方もできる。

```css
background-color: oklch(from var(--primary) calc(1 - l) c h);
```

カラーパレットも、適当に H を決めるのではなく、ある基準の色を決め、そこから色角度を加算(Hue Shifting)することで、調和の取れたカラーパレットを出すこともできる。

よく使われるのは、色相環を分割する角度の採用だ。つまり 2 分割する 180 度を追加した補色。3 分割する 120, 240 度を追加したトライアド。30,60 度などを追加した類似色などを、必要に応じて増やしていく設計だ。

```css
:root {
  /* 統一感のあるバリエーション */
  --primary-shift-120: oklch(from var(--primary) l c calc(h + 120));
  --primary-shift-240: oklch(from var(--primary) l c calc(h + 240));

  /* 同系色の追加 */
  --primary-shift-30: oklch(from var(--primary) l c calc(h + 30));
  --primary-shift-60: oklch(from var(--primary) l c calc(h + 60));

  /* 補色 */
  --primary-shift-180: oklch(from var(--primary) l c calc(h + 180));
}
```

ここまで来ると、`--primary` 一色だけを決めたら、あとは全て自動で算出することができる。

テーマ変更を可能にする UI などでは、`--primary` のバリエーションさえ提供すれば、大きく破綻のない UI を提供できる、といった設計も可能だろう。

もちろん、このシステマチックな方式だけでは満たせない表現は多々あり、連動した他のパラメータの細かな調整ノウハウはある。

それでも、現代の Web の色設計の基本は OKLCH をベースとしたこの設計が中心と考えて良さそうだ。

## Color Mix


## Wide Gamut (広色域)

近年のディスプレイは表現能力がかなり向上しており、それとともに表現できる色の範囲が増えた。

従来のディスプレイで表現できた色の領域を sRGB (Standard RGB)と言うのに対して、これらを Wide Gamut と総称する。

Web では、Color Module v4 で、Wide Gamut 系のプロファイルを CSS で指定できるようになっている。

- srgb: 従来の RGB 領域
- display-p3: Apple が策定したプロファイル。赤や緑方向に拡張し、iPhone / Mac などで表現できる。
- a98-rgb: Adobe が策定した Adobe RGB というプロファイル。緑~青緑方向に拡張し、CMYK への変換向き。
- prophoto-rgb: Kodak が策定したプロファイル。自然界にあるほとんどの色をカバーできるが、人間には知覚できない領域を含む。
- rec2020: 4K/8K テレビ放送などに対応するプロファイル。一般的なディスプレイでは再現できない領域を、将来のために確保している。

したがって、Web 開発では意識するとしても `display-p3` だ。ただし、Display P3 にしかない色は、基本的に彩度の強い色なので、それを使わない範囲であれば意識する必要はない。

Wide Gamut を指定する場合は、`color()` を使い、指定はその色域の中での割合を RGBA で指定する。

例えば、以下のようにすると sRGB よりも外にある Display P3 領域において、もっとも明るい緑を出すことができる。

発色できない環境では、表現できる上限に丸め込まれ(gamut mapping)てフォールバックする。

```css
background-color: color(display-p3 0% 100% 0%);
```

`rgb()` を用いると、`0~255` という段階で表現されていたため、`display-p3` などを表現することが出来なかった。

しかし、`oklch()` は C(彩度)の指定が段階や割合ではないため、理論上は上限がない。

そのため、以下のようにこの明るい緑を、Wide Gamut を意識せずに再現できる。

```css
background-color: oklch(0.86 0.3 142);
```

したがって、やはり `oklch` を使って実装をしておけば、仮に何らかの UI でネオンカラーのような彩度の強い色が必要になっても、シームレスに取り入れることができる。

もし丸め込みによる色の差し替えが許容できない場合は、Media Query を用いて分岐もできる。

```css
:root {
  --accent: oklch(0.86 0.2 142);
}

@media (color-gamut: display-p3) {
  :root {
    --accent: oklch(0.86 0.3 142);
  }
}
```


## その他