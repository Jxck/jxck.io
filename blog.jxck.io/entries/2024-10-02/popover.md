# [dialog][popover] Dialog と Popover #5

## Intro

**このあたりから、まだ議論中の話が多いため、今後変わる可能性が高い点に注意。**

`popup` が紆余曲折を経て `popover` 属性になり、2023/3 に Safari が TP166 で実装した。そのまま Safari 17 に入ることを 2023/6 の WWDC で発表したあたりから、`popover` の実装は各ブラウザで一気に話が進む。

- Release Notes for Safari Technology Preview 166
  - https://webkit.org/blog/13964/release-notes-for-safari-technology-preview-166/
- News from WWDC23: WebKit Features in Safari 17 beta
  - https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/

そして、2024/4 ごろに発表された Baseline 2024 に `popover` がエントリーしたことで、2024 年は全ブラウザで互換性を高めていくことに合意し、作業を進めていくことになる。俗に言う「元年」というやつと言えるだろう。

- Popover API lands in Baseline
  - https://web.dev/blog/popover-api

今回は、この `popover` の議論と、仕様が完成していくまでをまとめる。


## Popover 属性の完成

`popover` は属性になり、任意の要素を Popover できるようになった。

しかし、現実世界では、すでに `popover` という属性を独自に使っているサイトもいくつかあったので、ブラウザに実装したところ壊れるサイトも報告された。

- popover attribute may not be web compatible · Issue #9042 · whatwg/html
  - https://github.com/whatwg/html/issues/9042

具体的には Angular UI が `popover` 属性を独自に使っていたのだが、標準の `popover` は開くまでは `display: none` がデフォルトであるため、ブラウザが対応した瞬間、当該要素が消えてしまうという問題だ。

- Some sites are reporting compat issues with popover [40270593] - Chromium
  - https://issues.chromium.org/issues/40270593

他にも、Chrome の Stable リリースに伴い、同じように壊れるサイトがいくつか報告される。

ここで筆者は、「もしかしたらまた名前が変わるかもしれない」と思ったりもしたが、今回は壊れたサイトが少なかったため、サイト側を直して close する方が選ばれた。本来の互換性の考え方からは強引と言えるが「独自の属性は `data-` をつけるのがルールであり、それを守っていないサイトまでカバーできない」という理由で切り捨てる形になった。確かにそれを擁護すると、たとえどんな名前に変えても、どこかしらのサイトは壊れることになるため、落とし所だったのかもしれない。

そうした作業を経て、ブラウザの実装も着々と進み、今では全ブラウザが一応 Ship している状態になり、Baseline の Newly Available に登録された。

- Baseline Newly Available
  - https://web.dev/series/baseline-newly-available


## Dialog と Popover の違い

まずは、前半で解説した `<dialog>` 要素と `popover` 属性の違いについて、整理しておく。

どちらも、Top Layer に「ポコッ」と浮かび上がる UI を作ることができる点では類似しているが、それぞれの用途はかなり異なる。

もっとも注目すべき点は *Role* だ。


### role=dialog

ARIA には Dialog という Role が以前から定義されており、もし(概念上の) Dialog を自前で実装するのであれば `<div role="dialog">` のように指定することで「これは Dialog だ」ということを明示し、UA に伝える必要があった。

```html
<div role="dialog">
  <form>
    <label>Are you sure you want to continue?</label>
    <button type="submit">OK</button>
  </form>
</div>
```

動きとしては、ここまで散々解説してきたような、`inert`, `::backdrop`, フォーカス管理, Top Layer などをネイティブで対応した `showModal` などの利点はもちろんあるが、セマンティクスの面で言えば、「`<dialog>` は `role=dialog` に対応するネイティブの要素」という点も重要だ。


## popover

一方、`popover` は属性であり、それゆえに任意の要素を Popover することができる。

```html
<div popover>Hello Popover</div>
```

`popover` 属性それ自体は、Role に関するセマンティクスを提供せず、付与した要素が持っている Role なりが、そのまま使用される。それを Top Layer に表示し、Light Dismiss できて、JS だけでなく `popovertarget` で操作でき、Anchor Positioning で配置できる。

`popover` する要素のセマンティクスは別途考えないといけないわけだが、逆を言えば、どんなセマンティクスを付与された要素も、それを `popover` できるというメリットがある。今後「ポコっと浮かび上がる `<selectmenu>` のような要素の標準化」を考える時が来ても、「ポコっと浮かび上がる」の部分は丸っと Popover に移譲できるため、Open UI が考えている様々な提案仕様にも、応用して仕様を整理できることが期待される。

「動きを与えるだけ」といえばそれまでだが、それでも Declarative に「この要素は Popover できる」ことを宣言でき、その API が標準化されることで、ブラウザは「今なにかが Popover した」といった事実を知ることができる。

これは、単に `<div>` を `z-index: 9999` などとしていた従来の実装と比べれば、格段に高い精度で UA に伝わり、ユーザにとっても UX の向上になると期待できるのだ。


## Light Dismiss

`<dialog>` と `popover` のもう 1 つ重要な違いは、Light Dismiss の存在だ。

特に Modal Dialog は、基本的にユーザをブロックすることに重きを置いているが、反対に `popover` は極力ユーザの邪魔にならないような挙動を求められる。そのため、`<dialog>` 同様に ESC などはもちろん、「戻る」ボタンや、Backdrop のクリック、他の Popover が開いた時など、よりカジュアルに閉じるような実装が可能になっている。

ここで使われているのが、#3 で解説した Close Watcher であり、必ずしも Modal だけがターゲットではない点が、"Modal Close Watcher" ではなく "Close Watcher" になった理由の 1 つでもある。


## `<dialog>` を `popover` する

`<dialog>` は `role="dialog"` であることが重要だという話をした。

そこに対して、`show()`/`showModal()` で Modal として出すかどうかという使い分けをするのだが、実際には「 `role=dialog` を Popover で出したい」というユースケースもある。

この場合は「`<dialog>` を `popover` する」という合わせ技も使える。

```html
<dialog popover>
  <!-- ... -->
  <p>Ask me anything if you need help</p>
  <input type="text">
  <button id="ask">ask</button>
  <!-- ... -->
  <button id="close">x</button>
</dialog>
```

これにより、特に Light Dismiss の恩恵で、カジュアルに閉じる `<dialog>` が出せるため、non-Modal Dialog で応用できる。

一方で、Modal Dialog を Light Dismiss したいがために、`popover` で実装し、`::backdrop` を暗くすることで Modal っぽく実装するというのは、あまり良い実装ではないとされている。

```html
<button popovertarget="foo">Click me</button>
<dialog popover id="foo">I'm a dialog!</dialog>
<style>
dialog[popover]::backdrop {
  background-color: black;
}
</style>
```

ちなみに、`showModal` したものも Light Dismiss したいというユースケースを `<dialog>` 側でサポートすべきかという議論はまだ進行中だ。

- Add light dismiss functionality to `<dialog>` · Issue #9373 · whatwg/html
  - https://github.com/whatwg/html/issues/9373

逆に、Close Watcher を無効にし、一切 Light Dismiss 的な挙動をしない `<dialog>` の提案についても議論はある。

- Support disabling CloseWatcher integration in `<dialog>` · Issue #10592 · whatwg/html
  - https://github.com/whatwg/html/issues/10592

このあたりは、議論がある程度まとまったら追記したいと思う。


## Popover Target

JS には `popover` を開閉する API が用意されている。

- `showPopover()`
- `hidePopover()`
- `togglePopover()`

そして、これは HTML だけで宣言的に記述できるようにもなっていた。

- `popovertarget`
- `popovertargetaction`
  - `show`
  - `hide`
  - `toggle`

```html
<button popovertarget="foo" popovertargetaction="show">
  Show a popover
</button>
<article popover="auto" id="foo">
  This is a popover article!
  <button popovertarget="foo" popovertargetaction="hide">Close</button>
</article>
```

基本的に Popover は明示的に閉じられるようにするのがプラクティスなので、`x` アイコンを button として `popover` の右上に表示し、それを `action=hide` にするのがプラクティスだろう。


## Invoker

この `popovertarget` と同じように、開く閉じるの宣言的な実装を `<dialog>` でも実現したいという要望が出た。最初はやはり `dialogmodaltarget` だ。

- `dialogmodaltarget` attribute · Issue #834 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/834

しかし、このように追加していくとキリがないため、よりジェネリックな方向に進めるために提案されたのが Invoker だ。

- Intent to Prototype: Invokers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tDanwUCp2cg

最初は属性名も Invoker だったが、今は `command` という属性名になっている。

- [invokers] bikeshed the attribute names. · Issue #998 · openui/open-ui
  - https://github.com/openui/open-ui/issues/998

ややこしいが、仕様(概念)名は Invoker で、属性名が Command という解釈だ。

```html
<button commandfor="foo" command="show">
  Show dialog
</button>
<dialog id="foo">
  This is a dialog
  <button commandfor="foo" command="hide">Close</button>
</dialog>
```

この仕様は `popover` にも逆輸入され、現在は `popover` も `command` で開けるようにしていく方針になっている。(つまり、いずれ `popovertarget` は消えるかもしれないので、これから実装する場合は最新の議論に注意したい)

```html
<button commandfor="foo" command="show">
  Show Popover
</button>
<div id="foo" popover>
  This is a Popover
  <button commandfor="foo" command="hide">Close</button>
</div>
```


## Anchor Positioning

Anchoring は `popover` と同時に策定されていた、今後かなり重要になる仕様の 1 つだ。

まず、先ほどの例を考えてみる。

```html
<button commandfor="foo" command="show">
  Show Popover
</button>
<div id="foo" popover>
  This is a Popover
  <button commandfor="foo" command="hide">Close</button>
</div>
```

このとき、Popover した `<div>` を `<button>` の右下に表示したいとしよう。

通常の DOM であれば、`<button>` を基準にし、`<div>` を相対的に配置すれば良いが、今 `<div popover>` は Top Layer に、`<button>` はその backdrop に表示されているため、2 つを相対的に配置することができないのだ。

`<div popover>` が表示されている Top Layer には、他の DOM が何もない状態なので、何らかの方法で `<div popover>` の座標などを渡されない限りは、「画面の真ん中」や「四隅」といった、絶対値指定できる場所くらいしか、配置のしようがない。

![Top Layer の真ん中に表示された Popover](top-layer.drawio.svg#524x154)

そこで、Anchor という概念を導入し、「開いた `<button>` を Anchor として、開かれ側はその Anchor の右上に表示する」といった指定ができるようにした。これが Anchor Positioning だ。

![button を anchor としその右下に Popover を表示](top-layer-anchor.drawio.svg#524x154)


### Anchor Attributes

当初、Anchor は HTML 属性で指定する提案がされていた。

```html
<button id="button" commandfor="foo" command="show">
  Show Popover
</button>
<div id="foo" anchor="button" popover>
  This is a Popover
  <button commandfor="foo" command="hide">Close</button>
</div>
<style>
[popover] {
  top: anchor(bottom);
  left: anchor(right);
}
</style>
```

この場合、`<div popover>` の Anchor を `<button>` としている。

`top: anchor(bottom)` は、自分の上端が Anchor の下端になるという指定だ。`left: anchor(right)` は自身の左端を Anchor の右端にしているため、結果、`<button>` に対して右下に表示されるというものだ。

![button を anchor として右下に popover を表示する](anchor.drawio.svg#241x141)

そして、何よりもこの Anchor 属性が独立していることで、Popover ではない要素でも Anchor 関係を指定し、配置することが可能なのだ。これは、従来の Flex, Grid などに並んで、新しい CSS の設計に影響する、重要な要素であると筆者は考えている。


## Position Area Grid

Anchor に対して相対配置する場合は、Anchor となる要素の周囲のどこかに配置することになるため、先ほどの「左上」や「右下」などの指定は頻出することになる。

このケースに対して、`anchor()` を用いて指定する代わりに「Anchor の周囲のどこに配置するか」を指定できるように導入されたのが Position Area Grid だ。

![Anchor を中心に 9 個に分割したグリッド](position-area-grid.drawio.svg#300x300)

`position-anchor` を指定した要素に `position-area` で、表示したい位置を指定する。(もともとは `inset-area` という名前だったが、指定する側からすれば Position なのでこの名前に変更された。)

先ほどの「右下」を `position-anchor` を使い、ロジカルプロパティで指定するなら、以下のようになる。

```css
[popover] {
  position-anchor: --anchor;
  position-area: inline-end block-end;
}
```


## Anchor Position の fallback

先の例で、`<div popover>` を表示するための余白が `<button>` の右下に無かった場合、Popover がはみ出して表示されることになる。

![anchor で右下に表示した popover がはみ出す](anchor-over.drawio.svg#411x331)

これを避けるために、フォールバックという仕組みを導入し、「はみ出る場合は、別のスタイルに切り替える」という指定をするための `position-try-options` が提案された。

これは後に `position-try-fallbacks` と名前を変え、例えば `flip-inline` を指定すれば Inline 方向(つまり左右)を逆にするようフォールバックできる。

```css
[popover] {
  top: anchor(end);
  left: anchor(right);
  position-try-fallbacks: flip-inline;
}
```

![左でははみ出す popover を anchor の右にフォールバック表示](./anchor-fallback.drawio.svg#411x331)

Block 方向(つまり上下)であれば `flip-block` でフォールバックできる。

より細かくスタイルを指定したい場合は、フォールバックの先を `@position-try` に複数指定し、それを並べて順に試行させることができる。複数適用できる場合の優先順位は `position-try-order` に指定可能だ。

```css
[popover] {
  ...
  position-try-fallbacks: --first, --second, flip-inline, flip-block;
  position-try-order: most-height;
}
@position-try --first {
  top: anchor(end);
  right: anchor(self-start);
}
@position-try --end {
  /* .... */
}
```

これで、どんな要素に Invoke されても、Top Layer 上に表示されつつ、さらに画面内にしっかりと収まるような `popover` が表示できるのだ。

特に縦長になりがちな Menu 系の UI を、適切に表示する上で重宝する。


### CSS Anchor Name

このように、要素の配置に革新をもたらすであろう Anchor だが、HTML 属性であるにも関わらず、明らかにスタイルマターなユースケースであるために、「セマンティクスは何か」という議論がされることになった。

そこで、HTML の Anchor 属性は一旦保留し、同様の機能を CSS 側で定義したのが、`anchor-name` と `position-anchor` だ。

指定は以下のように、HTML で定義していた関係を CSS Variable で定義した名前を用いて紐づける仕様になっている。

```html
<style>
button {
  anchor-name: --anchor;
}
[popover] {
  position-anchor: --anchor;
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
}
</style>
<button>button</button>
<div id="message" popover>
  popover
</div>
```

まず `<button>` 側で `anchor-name` に CSS Variable で名前をつけ、`popover` 側は `position-anchor` でその名前を指定し、`anchor()` で相対位置を指定する。

ここから、さらに余白を広げたいといった場合は、`translate` などで位置を調整することになるだろう。


## Invoker Relationship

スタイルマターであるとはいえ、Anchor を指定するのに CSS でいちいち名前をつけて紐づけるというのは、Invoker と Popover の関連が HTML だけで完結できず、同時に CSS でも関連づけないと不整合が起こる点で不便だ。

特に動的に関連付けを変更したいような場合には、`<div style="position-anchor: --anchor">` などと HTML 側でいじる必要が出るため、あまり使いやすい API ではない。

議論を進めた結果、「少なくとも Invoker と Popover の間には、暗黙的な Anchor の関係を見出しても良いだろう」ということになり、先のように `<button commandfor>` で開いた `<div popover>` との間には、暗黙的に Anchor の関係がある、ということになったのだ。これを Invoker Relationship と呼ぶ。

つまり、以下の例は HTML の `anchor` 属性も、CSS の `anchor-name` もないが、`anchor()` を使った配置ができていることに注目したい。

```html
<style>
[popover] {
  top: anchor(bottom);
  left: anchor(center);
}
</style>
<button id="button" commandfor="foo" command="show">
  Show Popover
</button>
<div id="foo" popover>
  This is a Popover
  <button commandfor="foo" command="hide">Close</button>
</div>
```


## HTML Anchor Attributes の今後

Invoker Relationship が暗黙的に作られる場合は、Anchor 名を明示する必要がなくなった。それでもなお、動的に `<popover>` を作り、JS で開くような場合は不便がある。

例えば、GitHub のリンクをマウスオーバーした場合、Issue なら概要、User ならプロフィールが Popover されるだろう。プロフィールの場合は、アイコンが Anchor になる。

![GitHub のアカウントをマウスオーバーすると開くプロフィールのポップオーバー](github-profile-popover.png#844x662)

このような Popover は、画面中のすべてのアカウントごとに `<div popover>` を作っておくのではなく、1 つ用意してその内容を書き換えながら再利用する実装が多い。

つまり、Popover (プロフィール)側は変わらないが、Anchor (アイコン)側が動的に変わっていくわけだが、HTML の `command` で開いているわけではなく `onmouseover` などをフックして JS で開くため、暗黙的な Invoker Relationship も生成されない。

この実装として、`<div popover>` 側に `position-anchor: --user-icon` を指定しておいたとすると。

```html
<style>
[popover] {
  position-anchor: --user-icon;
  position: absolute;
  bottom: anchor(top);
  left: anchor(right);
}
</style>
```

JS で `mouseover` された要素を、動的に `anchor-name: --user-icon` に変えていく必要がある。以下のようなイメージだ。

```js
document.querySelectorAll("img.icon").forEach((img) => {
  img.addEventListener("mouseover", (e) => {
    e.target.style.anchorName = "--user-icon"
    // 終わったら消す
  })
})
```

対象のイベントで、動的に `anchor-name` を変更し、終わったら `anchor-name` を消す必要がある。消し忘れると、他とかぶって意図しない場所に表示される可能性もある。名前を変えても良いが、その場合は Popover 側の管理も必要になる。

もし HTML で Anchor 要素が使えるのであれば、`<a>` が持つ ID を指定して、`<div popover>` 側を変えればよくなる。

```html
<style>
[popover] {
  position-anchor: --anchor;
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
}
</style>
<script>
document.querySelectorAll("img.icon").forEach((img) => {
  img.addEventListener("mouseover", (e) => {
    $popover.anchor = e.target.id
  })
})
</script>
```

すでにある HTML に、Popover を後から追加する上でも、この方が実装は容易であり、管理しやすいため、筆者としてはこの機能が戻ってくることを心待ちにしている。

次回は Popover や Dialog につきものの、アニメーション関連の仕様について触れる。


## DEMO

動作するデモを以下に用意した。執筆時点では Chrome Canary 131 を元に確認している。

- Popover Labs | labs.jxck.io
  - https://labs.jxck.io/popover/


## Links

- Popover API (Explainer) | Open UI
  - https://open-ui.org/components/popover.research.explainer/
- Popover=hint (Explainer) | Open UI
  - https://open-ui.org/components/popover-hint.research.explainer/
- Invoker Commands (Explainer) | Open UI
  - https://open-ui.org/components/invokers.explainer/
- Dialogs and popovers seem similar. How are they different? | hidde.blog
  - https://hidde.blog/dialog-modal-popover-differences/
- Semantics and the popover attribute: which role to use when? | hidde.blog
  - https://hidde.blog/popover-semantics/
- Positioning anchored popovers | hidde.blog
  - https://hidde.blog/positioning-anchored-popovers/
- On popover accessibility: what the browser does and doesn't do | hidde.blog
  - https://hidde.blog/popover-accessibility/