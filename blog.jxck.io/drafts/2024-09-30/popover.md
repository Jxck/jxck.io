# Popover

さて、いよいよ Popover の属性そのものについてみていくよ。


## popover 属性

popup が紆余曲折を経て popover 属性になることで、popup が要素だったところから、紆余曲折を経て属性になり、そして popover 属性にったところまで話したけど、これは 2023/3 に Safari が TP166 で実装して、 Safari 17 に入ることを 2023/6 の WWDC で発表したあたりから一気に話が進むんだ。

そして、 2024/4 ごろに発表された Baseline 2024 に popover がエントリしたことで、今年は全ブラウザがこの仕様を実装し、互換性を高めていくことに合意したんだ。

つまり、今から取り組み始めたら、やっているうちにブラウザには入って使えるようになるくらいってこと。

さて、じゃあこいつで何ができるのかみていこう。


## Popover 属性の完成

popover になり、属性として HTML に書くことで、任意の要素を Popover できるようになった。

しかし、現実世界では、すでに popover という属性を独自に使っているサイトもいくつかあったので、ブラウザに実装してみると壊れるサイトも報告されたんだ。

- popover attribute may not be web compatible · Issue #9042 · whatwg/html
  - https://github.com/whatwg/html/issues/9042

具体的には Angular UI が popover 属性を独自に使ってたんだけど、これが標準になって popover は開くまでは display: none がデフォルトでつくから、その要素が消えちゃうっていう問題。

- Some sites are reporting compat issues with popover [40270593] - Chromium
  - https://issues.chromium.org/issues/40270593

他にも、 Chrome が Stable にしたあたりから、同じように壊れるサイトがちらほら報告されるんだよね。

ここで、「もしかしたらまた名前変わるかもな」って感じもあったけど、今回は壊れたサイトが少なかったので、サイトを直して close する方が選ばれたんだ。これはちょっと本来の互換性の考え方からは強引ではあるけど、「独自の属性は data- をつけるのがルールで、それを守ってないサイトまでカバーできない」って感じで押し切った。まあ、確かにそれを擁護すると、どんな名前にしてもどこかしらのサイトは壊れることになるからねぇ。

そんなこんなで、ブラウザの実装も着々と進み、今では全ブラウザが一応 ship している状態になっている。

TODO: Chrome, Edge は 114. Firefox 125, Safari 17 でサポート済み

そして、 Baseline 2024 では、 Newly Available に登録されたよ。

- Popover API lands in Baseline  |  Blog  |  web.dev
  - https://web.dev/blog/popover-api

主に Safari のサポート範囲さえ合っていれば、すぐに使っていける状態にはあるってことだね。


## Dialog と Popover の違い

ここは、結構それぞれの要素を理解していないと分かりにくいところかもしれない。

どっちも、要素を Top Layer に並べる「ポコっ」て出てくる UI を作ることができるんだけど、それぞれは用途がかなり違うんだ。

もっとも注目すべき点は **Role** だ。


### role=dialog

Aria には dialog role っていうのが以前から定義されていて、もし dialog を作るのであれば `<div role=dialog>` のように指定することで「これは dialog だよ」ってことを明示する必要があったんだ。

Dialog っていうのはつまり「ユーザに対して何かを問いかけている」ような状態なので、許可ボタンを表示して許諾を求めたり、チェックボックスを出して確認したり、 form を出して値を入力させたり。

そういうのはそもそも全部 `role=dialog` をつけるのが、これまでのプラクティスだったんだ。

雑に言うとこういうこと。

```html
<div role=dialog>
  <form>
    <label>このまま続けていいですか?</label>
    <button type=submit>OK</button>
  </form>
</div>
```


### `<dialog>`

HTML の dialog 要素は、もちろん `role=dialog` なので、基本的にこれまで `<div role=dialog>` していたものは、おおよそ `<dialog>` を用いて書き直すことができるんだ。少なくともセマンティクス的には等価になる。

その上で、 `<dialog>` には普通に開く `show()`だけじゃなく、 `showModal()` があることで「Dialog 要素を Modal として開く」ことが可能になるというおまけ付きなんだ。これは要素を TopLayer に表示し、背景を `inert`にし、 Focus を管理し、、っていう自分でやると面倒で不完全になりやすい実装をネイティブでやってくれるから、実装する上で便利っていう利点はある。

でも一番大事なのは「`<dialog>` は `role=dialog` をネイティブで実装している」っていう、セマンティクス上の変化なんだ。


## popover

では、 popover は何かというと、これは任意の要素を popover にすることになる。

```html
<div popover>Hello Popover</div>
```

popover 属性それ自体は、何もセマンティクスを提供しないんだ。正確に言うと、 Role のようなものを付与しないから、元の要素が持っている Role なりが、そのまま使用される。それを TopLayer に表示し、 Light Dismiss できて、 JS だけでなく popovertarget でも開いたり閉じたりできる。みたいな。

これは、 popover する要素のセマンティクスは別途対応しないといけない、逆を言えば、どんなセマンティクスを付与された要素も、それを popover できるというメリットがあるんだ。

極端な例なら、例えば `<nav>` を popover すれば、それは `role=navigation` をそのまま popover したことになる。みたいな。

```html
<nav popover>...</nav>
```

「動きを与えるだけ」っていえばそれまでだけど、それでも declarative に「この要素は popover できる」ってことと、その API が標準化されることで、ブラウザは「あ、今なんか Popover したな」みたいなことを知ることができるので、例えば支援技術を経由してユーザにそれを伝えることもできる。

これは、単に div の z-index を 9999 とかにして実装していた popup 系の component と比べれば格段に質の良い実装ができるってこと。


## light-dismiss

popover のもう一つ重要な違いは、 light dismiss の存在だ。

Dialog は基本的にユーザが明示的に操作しない限り閉じない。 Modal は ESC で閉じれたりはするけど、これも一応ユーザが閉じるための「明示的な操作」を行なったと捉えている。

一方、 popover はもっとカジュアルに閉じることができるんだ。これは ESC とか Back ボタンで閉じる Close Watcher に加えて、「popover 外をクリックしたら閉じる」というのも加えられている。

これにより、ユーザは明示的な閉じるボタンじゃなくても、手軽に Popover を閉じることができるんだ。


## dialog を popover する

dialog は role=dialog であることが重要だという話をしたよね。

それを踏まえて

- `show()` は基本 dialog が出てくるだけ
- `showModal()` は、 TopLayer に表示され、backdrop が inert になる

showModal() は、「全てを止めての対話」なんだけど、 `show()` するだけの `<dialog>` はそこまでではない。そして、そこまでではない `<dialog>` って結構あるんだよね。

ところが、やっぱり TopLayer には表示したいし、 Light Dismiss で閉じたい。みたいな場合に、

「dialog を popover する」という合わせ技がちょうどよくなる場合があるんだ。

つまり、こんな感じ。

```html
<dialog popover>
  <!-- ... -->
  <p>なにかお困りだったらなんでも質問してください</p>
  <input type=text></input>
  <button>ask</button>
  <!-- ... -->
  <button id=close>x</button>
</dialog>
```

`role=dialog` な要素を、 Modal ではないが popover として表示するということができる。

Modal じゃない dialog のほとんどは、この構成がちょうどいいことが多いので覚えておこう。

ただ、重要なのは、 popover するってことは backdrop は inert でもなんでもないので、フォーカスは外に出ていくこともできる。なので、 light dismiss したいがために showModal みたいな `<dialog>` を popover するのはいいことじゃないよ。

```html
<button popovertarget=foo>Click me</button>
<dialog popover id=foo>I'm a dialog!</dialog>
<style>
dialog[popover]::backdrop {
  background-color: black;
}
</style>
```

これは `::backdrop` を薄くして、 dialog を modal っぽくしているが popover で実装しているっていうあまり良くない例だね。

ちなみに、 `showModal` したものも light-dismiss したいっていうユースケースを `<dialog>` 側でサポートできないかは、以下で議論中だよ。

- Add light dismiss functionality to `<dialog>` · Issue #9373 · whatwg/html
  - https://github.com/whatwg/html/issues/9373


## Popover without JS

popover を開いたり閉じたりは

- `showPopover()`
- `hidePopover()`
- `togglePopover()`

とメソッドが用意されているけど、これは HTML だけで宣言的に記述できるようになってるよ。

- `popovertarget` で id を紐づけて
- `popovertargetaction` で挙動を指定するよ

```html
<button popovertarget="foo" popovertargetaction="show">
  Show a popover
</button>
<article popover="auto" id="foo">
  This is a popover article!
  <button popovertarget="foo" popovertargetaction="hide">Close</button>
</article>
```

基本的には、明示的に閉じれるようにするのがプラクティスなので、 ❌ みたいなアイコンを button として popover の右上とかに入れて、それが action=hide になってるのが頻出になるだろうね。

ちなみに、この popovertarget(action) と同じように、明示的な開く閉じるを `<dialog>` でも指定できるようにしたいって話があって、まあ `<dialog popover>` するとできるけど、そうじゃない `show()`/ `showModal()` してもできるように新しい仕組みが提案されているよ。

ついこの間までこれは invoker と呼ばれてたんだけど、今は command って呼ばれるように名前がかわったばかりなので、そのうち決まったらまた解説するよ。

- [invokers] bikeshed the attribute names. · Issue #998 · openui/open-ui
  - https://github.com/openui/open-ui/issues/998

とりあえず今の提案だとこうなるかな。

```html
<button commandfor="foo" command="show">
  Show dialog
</button>
<dialog id="foo">
  This is a dialog
  <button commandfor="foo" command="hide">Close</button>
</dialog>
```

さっきとほぼ同じだね。で、多分これが popovertarget(action) も上書きするから、どっちも同じように書けるようになりそう。


## Anchor Positioning

これが popover を使う上でゲームチェンジングな機能なんだよね。

まず、 popover が表示されるのは Top Layer なので、そこは他に要素がなくだだっぴろい window の領域にポツンと DOM があるような状態になる。

で、そこで場所を指定すると、基本的には position: fixed で座標指定するような、四隅やど真ん中みたいなわかりやすい表示しか指定できないんだよね。

TODO: 図

popover で出す頻出 UI として、 tooltip とか menu 系の UI は、起動したボタンどかと近い方が嬉しい。でも、その DOM は Top Layer にはないので、相対位置を指定することができない。

そこで、 Anchor という概念を入れて、「この Popover は button が Anchor で、そこの相対位置で表示する」っていう指定ができるようにしたんだ。これが Anchor Positioning 。これを使うとこうできる。

TODO: 図(間違ってる?)

指定の仕方はこんな感じ。

```html
<style>
button {
  anchor-name: --anchor;
}
[popover] {
  position-anchor: --anchor;
  top: anchor(bottom);
  left: anchor(center);
}
</style>
<button>button</button>
<div id="message" popover>
  popover
</div>
```

まず button 側では CSS variable のような指定で anchor-name をつけ、 popover 側は position-anchor でその名前を指定する。

`anchor()` っていう関数を使うと、相対位置を指定できるから、これをさらにちょっと離したいとかだったら、 translate とかでさらに位置をずらすのが基本。


## Anchor Position の fallback

最初から同じ DOM 上でスタイルしてる場合と違って、 popover を toplayer に anchor positioning で出すと、例えば tooltip を右下に出そうとしたのに、右側に意外とスペースがなかった時、そのままはみ出しちゃったりすることになるんだよね。

TODO: 図

これをさけるために、フォールバックという仕組みがあって、「これがはみ出るなら、別のスタイルに切り替えて」っていう指定ができるんだ。

一番簡単なのは、 inline (つまり左右)方向を入れ替える flip-inline をかませば

```css
[popover] {
  position-anchor: --anchor;
  top: anchor(end);
  left: anchor(self-end);
  position-try-options: flip-inline, flip-block;
}
```

TODO: 図

同様に縦方向を入れ替える flip-block を指定することで、下に余白がなくても出せるようになるよ。それでも足らなければ flip-block も適用されて、左上に出ることになる。

もっと細かくスタイルを指定したい場合は、こんな感じでフォールバックの先を指定し、それを並べて順順に試させることができるよ。複数適用できたらどれを使いたいかは、 position-try-order で指定できる。

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

これで、どんな場所に表示されても Top Layer 上で他の上に表示されつつ、さらに画面内にしっかりと収まるような popover が定義できるよ。

さて、次回はいよいよ、 popover のリアルな実例を見ていこう。