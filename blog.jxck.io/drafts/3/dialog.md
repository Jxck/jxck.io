# [dialog][popover] Dialog と Popover #3

## Intro

前回までは `<dialog>` が標準化されるまでの経緯と、 API の概要や関連仕様を解説した。

今回は `<dialog>` の API としての使い方について、具体的に解説していく。


## `open` 属性

`<dialog>` は、デフォルトでは不可視な要素となっている。これを表示するには `open` 属性を用いる。

```html
<dialog open>
  <div>
    <h1>Hello Dialog</h1>
  </div>
</dialog>
```

![dialog を open 属性で開く](1.open.drawio.svg)

閉じる UI は、 JS を書かなくても HTML だけで実装可能だ。

```html
<dialog open>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button type="submit">Confirm</button>
    </form>
  </div>
</dialog>
```

このように `<form method=dialog>` を `<dialog>` の中に書くと、その submit は Dialog を submit したことになるので、 Dialog を閉じることになる。これにより、ユーザに何かを確認させ、インタラクションを求めるユースケースを実装できる。

インタラクションの結果を取得する場合は JS が必要だ。その場合も `<dialog>` を JS から動的に作るよりは、先に `<dialog>` を open 属性なしに HTML 上に配置しておき、その `show()/close()` を JS で呼ぶのが基本になる。

閉じるだけではなく、開く方も JS 無しでできるが、それについては話がかなり広がるので別の回で解説する。


## aria-label / aria-labelledby

WAI-ARIA では `role=modal` に対して、 `aria-label` / `aria-labelledby` を使ってアクセシブルな名前を割り当てることが推奨されている。

- Accessible Rich Internet Applications (WAI-ARIA) 1.3
  - https://w3c.github.io/aria/#dialog

Dialog の `<h1>` がラベルに相当する情報を持っている場合は、以下のような実装が考えられる。

```html
<dialog aria-labelledby="dialog_name">
  <div>
    <h1 id="dialog_name">Hello Dialog</h1>
    <form method="dialog">
      <button type="submit">Confirm</button>
    </form>
  </div>
</dialog>
```


## show()/showModal()

次に、 JS を用いた実装について見ていく。

```html
<dialog aria-labelledby="dialog_name">
  <div>
   <h1 id="dialog_name">Hello Dialog</h1>
   <form method="dialog">
      <button type="submit">Confirm</button>
    </form>
  </div>
</dialog>
<button id=show>dialog.show()</button>
<button id=showModal>dialog.showModal()</button>
<script>
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)
  EventTarget.prototype.on = EventTarget.prototype.addEventListener
  $('#show').on('click', (e) => {
    $('dialog').show()
  })
  $('#showModal').on('click', (e) => {
    $('dialog').showModal()
  })
</script>
```

まず `show()` を呼ぶと、先ほどで言う `<dialog open>` した状態になり Dialog が開く。

![show() で dialog を開く画像](2.show.png)

これは単に non-Modal な Dialog が open してるだけなので、後にあるテキストの選択や、ボタンクリックといった操作は引き続き可能だ。また、この時別の `<dialog>` を `show()` しても同時に表示できる。これは、全く排他的な操作がされてないことを意味する。

Accessibility Tree を確認すると Role が `dialog` になっていることが確認できるだろう。

![Accessibility Tree 上は role: dialog, modal: false になっている](3.a11y-tree.png)

これを、 `showModal()` で開くとこうなる。

![showModal() で Modal Dialog を開く](4.showModal.png)

背景が薄くグレーになるのは、 `::backdrop` のデフォルト CSS があたってるからだ。

![chrome の backdrop デフォルトスタイル](5.default-style.png)

non-Modal と異なり Modal は同時に一つしか開けない。

Accessibility Tree もこうなる。

![Accessibility Tree 上は role: dialog, modal: true になっている](6.a11y-tree.png)


## フォーカスの確認

次は、それぞれのフォーカスの挙動を確認する。

開いてたボタンにフォーカスを移し、キーボードで開くと違いがわかる。

共通してるのは以下だ。

- フォーカスした `<button>` を Enter で開いたら、フォーカスが `<dialog>` 内の `<button>` に移る。
- `<dialog>` の `<button>` で閉じたら、開いた時の `<button>` にフォーカスが戻る。

これにより、 `<dialog>` を開いてもフォーカスが移らないとか、閉じたらフォーカスが迷子になるといった事態を避けられる。

相違点は

- non-Modal: Modal の外にもフォーカスが移動できる
- Modal: Modal の外にはフォーカスが出ない。(ブラウザ UI 側には出られる)

これにより、 Modal を開いた状態で、 DOM 上の余計なところにフォーカスが行き、想定してない操作を行えてしまうといったことはなくなる。

しかし、ブラウザ UI 側には出ていくことができる(できないと、行き詰まる可能性がある)ため、その点は慣れが必要かもしれない。

なお、今回は `<dialog>` に `<button>` が一個しかないため、ここに自動でフォーカスが移るが、特に Modal dialog はデフォルトでどこにフォーカスを移すのかは非常に重要で、前回解説したように仕様でどうするかも結構揉めた。

そして、仕様ではデフォルトの挙動を整理しつつも、前提として「どこにフォーカスすべきかを `autofocus` で指定するのが推奨」となった。

結果 `showModal()` は `autofocus` を尊重するので、基本は `autofocus` を指定する方が良いだろう。

```html
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button autofocus type="submit">Confirm</button>
    </form>
  </div>
</dialog>
```

## スクロールとフォーカス

Dialog のユースケースの 1 つとして、「規約への同意」を求める UI がある。

規約は基本的に長文になるため、そのまま `<dialog>` にレンダリングすると、 `<dialog>` 自体がスクロール可能になってしまう。

```html
<dialog style="height: 80vh;">
  <div>
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
  </div>
  <form method="dialog">
    <button type="submit" value="agree">Agree</button>
    <button type="submit" value="disagree">Disagree</button>
  </form>
</dialog>
```

しかし、 `<dialog>` 自体がスクロール可能になることは、下部にあるコントローラーまでの到達を困難にするなど、様々な不便があるため、仕様では「`<dialog>` 自体を Scrollable にするのは避けるべき」と明示されている。

代わりに、規約を別ページにしリンクを貼る、 PDF でダウンロードさせるなども考えられるが、最も簡単なのは規約のみを Scrollable なコンテナに入れる方法だ。以下の場合は、最初の `<div>` が Scrollable になっている。

```html
<dialog style="height: 80vh;">
  <div style="overflow: auto; height: 60vh;" autofocus>
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </div>
  <form method="dialog">
    <button type="submit" value="agree">Agree</button>
    <button type="submit" value="disagree">Disagree</button>
  </form>
</dialog>
```

注意点として、もしこのスクロールする `<div>` の手前に別のコントローラーがあった場合を考えよう。

```html
<dialog style="height: 80vh;">
  <!-- snip -->
  <button autofocus>Controller 1</button>

  <div style="overflow: auto; height: 60vh;">
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </div>

  <button>Controller 2</button>
  <!-- snip -->
</dialog>
```

この場合、従来は "Controller 1" で Tab 移動すると "Controller 2" にフォーカスが移り、キーボードだけで規約を読むことができなっかったため、明示的に `tabindex=0` を付与する必要があった。

しかし、このような場面での不便を解消するために、「スクロール可能な要素は、デフォルトでフォーカス可能にする」という仕様が標準化され、実装が進められていた。

- Keyboard focusable scrollers  |  Blog  |  Chrome for Developers
  - https://developer.chrome.com/blog/keyboard-focusable-scrollers

既に Chrome と Firefox は実装済みだが、 Safari は実装上の困難さとパフォーマンスを理由にネガティブな態度を表明している。

- 190870 – Make scrollable element focusable
  - https://bugs.webkit.org/show_bug.cgi?id=190870

したがって、しばらくは `tabindex=0` を明示的に付与した実装をすべきだろう。


```html
<dialog style="height: 80vh;">
  <!-- snip -->
  <button autofocus>Controller 1</button>

  <div style="overflow: auto; height: 60vh;" tabindex="0">
    <p>めっちゃ</p>
    <p>長い</p>
    <p>規約</p>
  </div>

  <button>Controller 2</button>
  <!-- snip -->
</dialog>
```

より詳細なガイダンスは、以下が参考になるだろう。

- dialog initial focus, a proposal · whatwg/html Wiki
  - https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal


## Close と returnValue

Dialog を閉じる場合、先のように `<form>` を使わず JS で `close()` を呼んで閉じることもできる。なお「`open` 属性を消す」では、 Modal は「消える(hidden)」が「閉じる(close)」の意味にはならない(`close` イベントも発火しない)ので、 JS の場合必ず `close()` を使って閉じるべきだ。

Dialog を閉じるとき、ユーザは何かしらのインタラクションを行った結果(同意結果や選択結果)は、 `dialog.close()` に渡した文字列がそのまま取得できる。

```js
$dialog.close("accept")
$dialog.returnValue // "accept"
```

`<form>` を使った場合に submit された結果もここから取得できる。


## backdrop をクリックしたら閉じる

Dialog の要件としてよくある「背景(backdrop)をクリックしたら閉じる(キャンセル)」というユースケースの実装を考える。

まず前提として、 Modal の場合は「backdrop 含め、どこをクリックしても `<dialog>` がクリックされたことになる」という性質がある。

```js
dialog.on('click', (e) => {
  // 画面のどこクリックしても発火
  console.log(e.target) // dialog
})
```

TODO: Modal は画面のどこをクリックしても `<dialog>` で発火する

そこで、 `<dialog>` を `padding: 0` にし、直下の `<div>` が `<dialog>` の内側いっぱいに表示されている状態にしよう。(わかりやすく `<div>` は色をつけてる)

```html
<style>
  dialog {
    padding: 0;
    div {
      padding: 1rem;
      background-color: red;
    }
  }
</style>
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button autofocus type="submit" value="confirm">Confirm</button>
      <button type="cancel" value="cancel">Cancel</button>
    </form>
  </div>
</dialog>
```

この状態で `showModal()` したあとは、 Dialog の領域をクリックしても `<dialog>` の前に `<div>` がクリックされたことになる。

TODO: dialog 領域のクリックが div で発生する

これを利用すると、 backdrop 領域をクリックしたら `target`/`currentTarget` が `<dialog>` だが、 Dialog の中をクリックした場合は `target` が `<div>` になるため、これで分岐が可能になる。

```js
$('dialog').on('click', (e) => {
  // dialog 背景含めて全体がフック対象
  const {target, currentTarget} = e
  console.log({target, currentTarget})
  if (e.target === e.currentTarget) {
      // 両方 dialog 自身なのは backdrop のみになる
    $('dialog').close()
  }
})
```


## cancel/close イベント

例えば、先ほどの `<form method=dialog>` を submit した時の値が欲しいなら、 `button[value]` を使って以下のように取れる。ちなみに `cancel()` はないから、 cancel も `button[type=cancel]` で行えるよ。

```html
<dialog>
  <div>
    <h1>Hello Dialog</h1>
    <form method="dialog">
      <button autofocus type="submit" value="confirm">Confirm</button>
      <button type="cancel" value="cancel">cancel</button>
    </form>
  </div>
</dialog>
<script>
  // ...
  $('dialog').on('close', (e) => {
    console.log(e.target.returnValue) // close
  })
  $('dialog').on('cancel', (e) => {
    console.log(e.target.returnValue) // cancel
  })
</script>
```

これ以外、例えば何かを `<input>` させたり、 `<select>` させる場合、その結果は JS で集めて `close()` に渡すことになる。



## キーボード操作

`<button>` を置く以外に、キーボード操作の対応もネイティブで行われている。これは、そういう Cancel や Close を意味する操作を自動でフックする CloseWatcher が使われているんだね。

non-Modal は他が操作できるからキーボードには反応しないが、他を止める Modal な Dialog は CloseWatcher が効いてるので、 ESC で閉じたりができる。 Android の場合はこれを背面タップで閉じる(持ってないため未検証)といったように、デバイス固有の UI とも紐づける役割を果たしている。

`showModal()` の方で ESC 押すと、 `cancel` -> `close` の順でイベントが発火する。


## dialog の使い所

さて、一通り確認したところで使い方を確認していこう。

例えば、規約を表示してそこへの同意を取得するなどだ。閉じる際にその結果を `returnValue` で取得して処理を分岐することになるだろう。

使い分けは以下のようになる。

- ユーザをブロックして、処理が終わらない限り先には進めない => Modal Dialog
- ユーザをブロックはしない、しかし、どこかで処理は求めたい => non-Modal Dialog

例えば、ログインしないと先に進めないなら、 Modal Dialog にログインフォームが入るかもしれない。

でも Cookie への同意を画面の下に出すんだったら、 non-Modal で出す。みたいな。

このように、インタラクションを求めるのが `<dialog>` だ。 `<dialog>` が `role=dialog` の要素だということが非常に重要。これは「ユーザに対して何かインタラクションを求めている」そして、「そのインタラクションが終わったら閉じる」のが基本。

もし、単なる「変更が保存されました」とか「わからなかったら下のヘルプへ」みたいなものは、 Dialog でやることじゃないんだ。 Top Layer に表示できるからって、浮かび上がる UI なんにでも Dialog を使うのは適切ではない。

そして、逆に「ユーザにインタラクションを求める Modal Dialog UI」を `<dialog>` を使わずに実装するのも、今後は良くないことになるね。フォーカス管理も、 `inert` も、CloseWatcher も、標準になってなければ完璧に実装するのが難しい機能で、これがきちんと実装できなければ、特にアクセシビリティの文脈では問題になる。

特に支援技術を使ってる人を考えると

- そもそも Dialog が開いてることに気づけない
- Dialog が開いて、他の操作ができなくなったが、何が起こったのかわからない
- 操作できないはずのところにフォーカスが飛んで想定外の操作をしてしまう
- ESC が奪われて、意図していた操作ができなくなる
- 開いて閉じたらフォーカスが迷子になる

これらは `<dialog>` を適切に使えば、支援技術には `role=dialog` なものが開いたことが伝わる。操作もプラットフォームがきちんとサポートしてくれる。

そういう意味で、本当に重要な要素の一つなんだね。

でもでも、なんか `<dialog>` って用途限られてるよね。

もっとカジュアルに「ポコッ」とか「ヒョコッ」って出るメッセージとかを、 Top Layer 表示したりできると嬉しいよね。 CloseWatcher も inert も backdrop も使いたい、でも dialog ではない。

そんな時に、、、いよいよ本題に入っていくよ!