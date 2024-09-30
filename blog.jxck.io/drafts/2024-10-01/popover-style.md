# Popover Style 編

いよいよ popover 属性いくぞ!


## Popover 属性

ついに `<toast>` -> `<popup>` -> `popup` -> `popover` として、要素から属性になり名前も決まった。

といっても、実装は popup とそんなにかわらないので、 popup でやっていた Origin Trials を継続したりしながら、徐々に実装を進めていくフェーズに入る。 2022/12 くらいの話。

- Intent to extend Origin Trial: Popover API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kZXexHhH7EA/m/UmQYwGW3DAAJ

その間にもう一つの議論がおこる。それが Animation だ


## Display and content-visibility animations

dialog や popover された要素は、基本的には現れたり消えるするので、それをアニメーションするには、 display や content-visibility の属性をアニメーションできないといけない。

まずは消す方を以下のように transition でやってみよう。 opacity をだんだん薄くして、最後に display: none する感じ。

```css
div {
  opacity: 1;
  display: block;
}
/* transition で実装 */
.fade-out {
  opacity: 0;
  display: none;
  transition: opacity 2s, display 2s;
}
/* animation で実装 */
.fade-out  {
  animation: fade-out 0.5s forwards;
}

@keyframes fade-out {
  100% {
    opacity: 0;
    display: none;
  }
}
```

この `.face-out` class を追加したらゆっくり消える、、つもりだったけど実際には、追加した瞬間に消えちゃうんだよね。どうしてかというと、 display はもともと not animatable だったからだ。

実は CSS の Animation では、属性に対して 4 つの Animation Type ってのが決まってるんだけど

- not animatable
- discrete
- by computed value
- repeatable list

not animatable は「アニメーションすると複雑すぎるから transition や keyframe に出てきても無視」っていうものなんだ。

だから、ふわっと消したい場合は代わりに visibility を使ったり、 height を 0 にして潰したり、 left: -1000px とかやって画面外に飛ばしたりして誤魔化すか、 animation が終わったら JS で消すとかしてたんだよね。

ところが、 dialog とか popover は、その表示非表示を display の変更で行うって言うものだったから、そのせいでアニメーションが面倒なことになるんだよね。そこで、 display も animatable にしようという話が始まったのだ。

- Intent to Ship: Display and content-visibility animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UV9POKsNZA8/m/WCj2GZGXAAAJ
- [css-display] Why is display listed as not animatable instead of animation type: discrete? · Issue #6429 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/6429#issuecomment-1318933547
- rendering/entry-exit-animations.md at master · chrishtr/rendering
  - https://github.com/chrishtr/rendering/blob/master/entry-exit-animations.md

これによって、CSS Display Module Level 4 から display の Animation Type は not animatable ではなく discrete に近いんだけどちょっと特別扱いされる値になったんだ。

- rendering/entry-exit-animations.md at master · chrishtr/rendering
  - https://github.com/chrishtr/rendering/blob/master/entry-exit-animations.md

たとえば opacity の Animation Type は by computed value type で、 0 から 1 の間をスライダーを動かすように連続した値で変化させるんだけど、そうじゃない、たとえば true/false, enable/disable みたいな 2 つや 3 つの間が繋がってない値をもつプロパティは discrete (離散値)っていうカテゴリになるんだ。

discrete な値を transition する場合は、 transition の真ん中(50%)で値が切り替わるみたいな動きになる。

ところがこれだと、さっきのふわっと消すやつは、 opacity が 0.5 まで減っていったところで、 display が none になって要素がぱつっと消えてしまうことになる。

TODO: 図

でも、それって求められてることじゃないよね。欲しいのは、 opacity が 0 になってから display: none になること。

これが、今回 display に入った変更。つまりこうなる。

TODO: 図

この変更を利用するためには、 keyframe の方は書き直さないで良いんだけど、 transition の方だけ対象プロパティに `allow-discrete` をつけることになるよ。

```css
div {
  opacity: 1;
  display: block;
}

/* transition で実装 */
.fade-out {
  opacity: 0;
  display: none;
  transition: opacity 2s, display 2s allow-discrete;
}

/* animation で実装 */
.fade-out  {
  animation: fade-out 0.5s forwards;
}

@keyframes fade-out {
  100% {
    opacity: 0;
    display: none;
  }
}
```

同じことは content-visibility にも実装されてる。

逆に、 fade-in させる時はどうするかというと、ちょっと考えることが増えるんだ。

単純に、 display: none -> block, opacity: 0 -> 1 に遷移させればよさそうだけど、、、

```css
div {
  opacity: 0;
  display: none;
}

/* transition で実装 */
.fade-in {
  opacity: 1;
  display: block;
  transition: opacity 2s, display 2s allow-discrete;
}

/* animation で実装 */
.fade-out  {
  animation: fade-out 0.5s forwards;
}
```

これだと思ったように動かない。これは、 display が変わった瞬間に要素が opacity を持つため、それが「0 である」という初期値が計算される前に、 opacity が 1 になってしまうんだ。

なので、 display が切り替わる時は、 animation をする値の初期値がなんなのかを要素に教えてあげて、その上で変化をさせる必要がある。なので、以前はこれを「一旦 display: block に変えたら、 requestAnimationFrame で opacity:0 が計算されるのを待ってから 1 に遷移させる」とか「getBoundingClientRect() みたいな、値の計算を確定させる処理を一旦呼んでから遷移させる」みたいなことが必要だった。そんなテクニックが探したらたくさん出てくるよ。

ところが `<display>` や popover も、その出現は display が変わっているから、同じ問題が起こってしまうんだ。せっかく declarative に定義したのに、そのアニメーションに JS が必須となると、ちょっと不便だよね。


## `@starting-style`

ということで、初期値を定義するための機能が提案されたんだ。

- [selectors-4] Add syntax to establish before-change style for css-transitions on new elements. · Issue #8174 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/8174

最初は名前が違ったけど、これは紆余曲折を経て `@starting-style` っていうプロパティで書くことになった。こんな感じに書くよ。

```css
div {
  display: none;
  opacity: 0;
}

/* transition で実装 */
.fade-in {
  opacity: 1;
  display: block;
  transition: opacity 2s, display 2s allow-discrete;
  @starting-style {
    /* display が切り替わった時点での初期値を指定 */
    opacity: 0;
  }
}

/* animation で実装 */
.fade-in {
  animation: fade-in 0.5s forwards;
  display: block;
  @starting-style {
    /* display が切り替わった時点での初期値を指定 */
    opacity: 0;
  }
}
@keyframes fade-in {
  100% {
    opacity: 1;
    display: block;
  }
}
```

これで、要素のスタイルが計算される前の値を明示的に示すことができるようになった。


## Prefer Reduced Motion

dialog / popover とは直接関係ないけど、 prefer-reduced-motion が指定されていたら、アニメーションは無効にしよう。

```css
@media(prefers-reduced-motion: no-preference) {
  .fade-in, .fade-out {
    transition: none;
  }
}
```


## まとめ

よし、この辺までくると dialog や popover を実装する上でのスタイルが揃ったね。

最後はいよいよ実践編だ!