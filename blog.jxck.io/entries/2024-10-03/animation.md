# [dialog][popover] Dialog と Popover #6

## Intro

ついに `<toast>` -> `<popup>` -> `popup` -> `popover` として、要素から属性になり名前も決まった。

とはいえ実装は `popup` とそんなに変わらないので、 `popup` でやっていた Origin Trials を継続しながら、徐々に実装を進めていくフェーズが 2022/12 くらいの話だ。

- Intent to extend Origin Trial: Popover API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kZXexHhH7EA/m/UmQYwGW3DAAJ

しかし、 `popover` を実用するには足りていない議論があった、それが Animation だ。


## Display and content-visibility animations

`<dialog>` や `popover` された要素は、基本的には現れたり消えたりするので、それをアニメーションするには、 `display` / `content-visibility` の属性をアニメーションする必要がある。

まずは消す方を以下のように `transition` でやってみよう。 `opacity` を徐々に薄くし、最後に `display: none` する実装は以下のようになる。

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
/*アニメーションで実装 */
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

この `.fade-out` class を追加したら、要素がゆっくり消える想定だが、実際には追加した瞬間に消えてしまう。これは `display` がもともと not animatable だったからだ。

CSS のアニメーションでは、属性に対して 4 つの Animation Type が決まっている。

- not animatable
- discrete
- by computed value
- repeatable list

not animatable は「アニメーションすると複雑すぎるため `transition` や `keyframe` に指定されても無視する」というものだ。

つまり、要素をふわっと消したい場合は、代わりに `visibility` を用いる、 `height: 0` にして潰す、 `left: -1000px` などで画面外に飛ばす、アニメーションが終わったら JS で消す、といった実装が必要だった。

ところが、 `<dialog>` や `popover` は、その表示非表示を `display` の変更で行っているため、アニメーションが複雑になる。そこで、 `display` も animatable にしようという議論が始まったのだ。

- Intent to Ship: Display and content-visibility animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UV9POKsNZA8/m/WCj2GZGXAAAJ
- [css-display] Why is display listed as not animatable instead of animation type: discrete? · Issue #6429 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/6429#issuecomment-1318933547
- rendering/entry-exit-animations.md at master · chrishtr/rendering
  - https://github.com/chrishtr/rendering/blob/master/entry-exit-animations.md

これによって、CSS Display Module Level 4 から `display` の Animation Type は not animatable ではなく discrete に近いが、少し特別扱いされる値となった。

- rendering/entry-exit-animations.md at master · chrishtr/rendering
  - https://github.com/chrishtr/rendering/blob/master/entry-exit-animations.md

例えば `opacity` の Animation Type は by computed value で、 0 から 1 の間をスライダーを動かすように連続した変化をさせる。一方、 true/false, enable/disable といった値は discrete (離散値) というカテゴリになる。

discrete な値を `transition` する場合は、真ん中(50%)で値が切り替わる挙動になるため、 `opacity` が 0.5 まで減ったところで、 `display: none` になって要素がぱっと消えてしまうことになる。

![display が途中で変わり要素が消える](./transition-display.drawio.svg#442x182)

しかし、実際に欲しいのは `opacity: 0` になった後に、 `display: none` / `content-visibility: hidden` に変化し消える挙動だ。

![display が最後に変更する](./transition-display-finally.drawio.svg#442x182)

この変更を利用するためには、 `keyframe` をそのままに、`transition` の対象プロパティに `allow-discrete` をつける。

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

fade-in させる時は少し考えることが増える。

単純に、 `display: none` を `block` にしてから, `opacity: 0` を `1` に遷移させればよさそうだ。

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

ところが、これでは `display` が変わった瞬間に要素が `opacity` を持つため、それが「0 である」という初期値が計算される前に、 `opacity` が 1 になってしまうため、想定した挙動にならない。

ここでは、 `display` が切り替わる時は、アニメーションする値の初期値を要素に反映し、その上で変化をさせる必要がある。以前はこれを「一旦 `display: block` に変えたら、 `requestAnimationFrame()` で `opacity: 0` が計算されるのを待ってから、 `opacity: 1` に遷移させる」や「`getBoundingClientRect()` で値の計算を確定させる処理を一旦呼んでから遷移させる」といった実装が必要だった。

ところが `<dialog>` や `popover` も、出現時に `display` が変わっているため、同じ問題が起こってしまう。せっかく Declarative に定義したのに、そのアニメーションに JS が必須となるのは不便だ。


## `@starting-style`

この問題を解決するため、「初期値を定義するための仕様」が提案された。

- [selectors-4] Add syntax to establish before-change style for css-transitions on new elements. · Issue #8174 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/8174

名前は紆余曲折を経て `@starting-style` というプロパティで書くことになった。

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

これで、要素のスタイルが計算される前の値を、明示的に示すことができるようになった。


## Prefer Reduced Motion

`<dialog>` / `popover` とは直接関係ないが、 `prefer-reduced-motion` が指定されていたら、アニメーションは無効にしたい。

```css
@media(prefers-reduced-motion: no-preference) {
  .fade-in, .fade-out {
    transition: none;
  }
}
```


## Outro

これで、 Dialog / Popover をアニメーションさせるためのプリミティブが揃った。

以降はより実践的な実装方法について解説していく。


## DEMO

動作する DEMO を以下に用意した。

- Dialog Animation DEMO | labs.jxck.io
  - https://labs.jxck.io/dialog/animation.html