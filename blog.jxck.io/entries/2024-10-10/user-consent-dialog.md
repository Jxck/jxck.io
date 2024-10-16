# [dialog][popover] Dialog と Popover #7

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃っていないものがある点に注意**


## 規約への同意

まずは、「規約への同意」の UI について考えてみる。想定するのは以下のようなものだ。

![規約が表示され、同意ボタンのある UI](./user-consent-dialog.drawio.svg#600x600)

見ての通り、この規約に同意しないと先に進むことができない、ブロックを伴う UI であるため Modal Dialog として実装するのが妥当だろう。

どのようなきっかけで表示されるかはわからないため、 JS から `showModal()` する前提で実装を考えていく。


### HTML

まず、基本的な HTML 要素を並べてみよう。(`<dialog>` と関係ない部分は簡略化)

要件はいろいろあるだろうが、最低限以下の 2 つを必須とする。

- 規約そのもの
- 同意のためのボタン

```html
<dialog>
  <section>
    <h1>利用規約への同意</h1>
    <article>
      <h2>規約</h2>
      <p>長い長い</p>
      <p>利用規約</p>
      <p>スクロールあり</p>
    </article>
    <p>同意する</p>
    <button>確認</button>
  </section>
</dialog>
```

全体が `<dialog>` であることで `role=dialog` な要素自体は定義できている。`role=dialog` には `aria-description` による説明があることが求められているため、ここでは `<h1>` をそのまま適用できるだろう。

```html
<dialog aria-labelledby="dialog-label">
  <section>
    <h1 id="dialog-label">利用規約への同意</h1>
  </section>
</dialog>
```

利用規約本文は通常非常に長いため、このままでは `<dialog>` 全体が縦長になり、スクロールすることになる。

しかし、 `<dialog>` そのものがスクロールするのは推奨されてないため、ここでは `<section>` の高さを固定し、規約部分のみをスクロールさせるようなスタイルを定義する。

そして、 `<dialog>` が開いた際に、デフォルトでフォーカスするべき要素は、 `autofocus` で明示的な指定が推奨されている。最初に出てくるコントローラは `<input checkbox>` だが、「利用規約を確認してから同意」という前提であれば、規約自体の `<section>` にフォーカスが当たるのが良さそうだ。

```html
<article autofocus>
</section>
```

もし、これより手前に `autofocus` すべきコントローラがある場合は、 `<section>` には `autofocus` をつけないだろう。しかし、ただの `<section>` はフォーカスができないため、キーボードでの操作などが不便になる。この実装を修正し、スクロールする要素をフォーカス可能にする流れがあるが、全ブラウザは対応してないため、現状は `tabindex=0` を指定しておくのが良いだろう。

```html
<article autofocus tabindex="0">
</article>
```

同意の結果は JS で取ればいいと言えばそれで終わりなので、あえてそのまま `<form>` から同意結果を POST する作りにしてみよう。

```html
<form method="post" action="/term">
  <label for="agree">
    <input id="agree" type="checkbox" name="agree" required>
    <span>同意する</span>
  </label>
  <button type="submit">確認</button>
</form>
```

見ての通り普通のフォームで、同意すればその結果をそのままサーバに POST する。画面遷移をするため、 Dialog を閉じる方は考えなくて良い。

しかし、このフォームでは同意以外の道がないため、キャンセルボタンを用意しよう。

```html
<form method="post" action="term.html">
  <button type="submit">確認</button>
  <button formmethod="dialog" value="cancel">キャンセル</button>
</form>
```

キャンセルボタンの方は、 `form[method]` を `dialog` に上書きしているため、 `<dialog>` が Close して終わる。 `returnValue` には `button[value]` の `"cancel"` という文字列が渡る。(こちらも Form は submit するので `input[type=checkbox]` に `required` をつけるとキャンセルできなくなるため、バリデーションは別途行う必要がある。)

まとめると HTML は以下だ。

```html
<dialog aria-labelledby="dialog-label">
  <section>
    <h1 id="dialog-label">利用規約への同意</h1>
    <article autofocus tabindex="0">
      <p>長い長い</p>
      <p>利用規約</p>
      <p>スクロールあり</p>
    </section>
    <form method="post" action="/term">
      <label for="agree">
        <input id="agree" type="checkbox" name="agree">
        <span>同意する</span>
      </label>
      <button type="submit">確認</button>
      <button formmethod="dialog" type="submit" value="cancel">キャンセル</button>
    </form>
  </section>
</dialog>
```

`<dialog>` は普通に閉じて、 JS でリクエストする場合は、シンプルに `form[method=dialog]` にして、 JS で分岐で良いだろう。

ここではあくまで同意取得だが、よりクリティカルな同意、例えば「このまま遷移すると保存されてない内容は消えます」といったアラートの性質を持たせたい場合は、デフォルトの `role=dialog` を `role=alertdialog` に上書きするといった応用ができる。


### CSS

次に CSS を考える。(`<dialog>` と関係ない部分は省略)

まず `<dialog>` 内で注意が必要なのは、前述のとおり規約の高さを指定し、スクロールさせることだ。

```css
dialog {
  section {
    article {
      height: 10em;
      overflow: scroll;
    }
  }
}
```

`::backdrop` は Modal Dialog が開いていることによって「背面は操作ができない(inert)」ということを伝える目的がある。基本的には RGBa でアルファをかけた色にすることで、背面を見せながらも暗くする指定が、ブラウザデフォルトに入っている。これに任せても良いが、色の変化がわかりにくい場合、暗さのためのアルファを調整したり、 `backdrop-filter` をかけるといった方法もあるだろう。

```css
::background {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
}
```

単なる `<div>` が真ん中に表示された感を減らすために、 `<dialog>` 側に `box-shadow` を表示すると、よりモーダル感が強まるかもしれない。

```css
dialog {
  border: solid 1px #ccc;
  border-radius: 2%;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.5);
}
```

位置に関しては、このユースケースでは画面の真ん中に表示が基本だろう。その場合、 Top Layer の真ん中に表示されるのがデフォルトであるため、そのままで良さそうだ。

表示に関しては、デフォルトでは「パッ」と開いて「パッ」と閉じるだけだ。ここにアニメーションを加えてフェードさせる場合は、いくつか注意が必要だ。

まず、表示された状態のスタイルで、アニメーションしたい要素を以下のように `[open]` のスタイルとして分離する。

```css
/* show */
[open] {
  opacity: 1;
}
[open]::backdrop {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  opacity: 1;
}
```

この表示状態に向かってアニメーションするように、 `transition` を以下のように定義する。注意点は、離散値である `display` と `overlay` に `allow-discrete` を指定する点だ。

```css
:root {
  --duration: 2s;
}

/* transition style */
dialog {
  opacity: 0;
  transition: 
    display var(--duration) allow-discrete, 
    overlay var(--duration) allow-discrete, 
    opacity var(--duration);
}
::backdrop {
  opacity: 0;
  background-color: transparent;
  backdrop-filter: none;
  transition: 
    display var(--duration) allow-discrete, 
    overlay var(--duration) allow-discrete, 
    background-color var(--duration),
    backdrop-filter var(--duration),
    opacity var(--duration);
}
```

ただし、これでは「非表示」の方はアニメーションはできても、「表示」の方はアニメーションが効かない。理由は、 `display` が `none` から `block` に変化して DOM が表示されるまで、他のプロパティ値が計算されないためアニメーションできないからだ。(「非表示」にする際は、すでに DOM が表示され計算されたプロパティがあるため可能)

そこで、 `display: none` の状態で DOM が無くとも初期値がわかるように、 `@starting-style` に初期値を明示しておく。

```css
@starting-style {
  [open] {
    opacity: 0;
  }
  [open]::backdrop {
    background-color: transparent;
    backdrop-filter: none;
    opacity: 0;
  }
}
```

これで、表示/非表示両方のアニメーションが可能になる。


### JS

最後は JS だ。

この `<dialog>` は Modal であるため、必要なタイミングで `showModal()` する必要がある。 `showModal()` さえ呼べば、従来自前の実装が必要だった面倒なことはほとんど実装してくれるため、気にすべきは閉じる部分くらいだろう。

今回は、同意の取得時にそのまま form を submit しているため、特に JS でやることはなくなっている。そこであえて、同意を全て JS 側で処理する方法で考えておく。

```html
<form method="dialog">
  <label for="agree">
    <input id="agree" type="checkbox" name="agree">
    <span>同意する</span>
  </label>
  <button type="submit" name="submit" value="ok">確認</button>
  <button type="submit" name="submit" value="cancel">キャンセル</button>
</form>
```

この場合、どちらのボタンで submit されたかを確認する必要がある。これは普通の Form と同じく `submitter` での分岐になる。

```js
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  const { name, value } = e.submitter

  if (value === "ok") {
    // 確認
  }
  if (value === "cancel") {
    // キャンセル
  }
})
```

確認ボタンによって `<form>` が submit された場合、そのまま `<dialog>` は閉じる。

```js
document.querySelector("form").addEventListener("submit", (e) => {
  document.querySelector("dialog").close()
})
```

ここで、値として渡したいものがある場合は、 `close()` に値をシリアライズして渡す。

```js
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDafault()
  const returnValue = JSON.stringify({
    agree: true
  })
  document.querySelector("dialog").close(returnValue)
})
```

`close()` で渡した結果は `onclose` で取得できる。

```js
document.querySelector("dialog").addEventListener("close", (e) => {
  console.log(e.target.returnValue) // { agree: true }
})
```

あとは、バリデーションや API コールを必要に応じて実装すれば良いだろう。


## DEMO

動作する DEMO を以下に用意した。

- Term Dialog DEMO | labs.jxck.io
  - https://labs.jxck.io/dialog/term.html