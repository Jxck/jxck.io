# [dialog][popover] Dialog と Popover #9

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃ってないものがある点に注意**


## Toast

次は、 Popover の源流にもなった、画面端にメッセージを表示するいわゆる Toast UI について考えてみる。想定するのは以下のようなものだ。

![画面の右下に表示されるToast UI](./toast.drawio.svg#400x400)

メッセージの性質によって、色やアイコンのスタイルを変えられ、同時に複数積み上げて表示できるといった仕様が一般的だ。


### HTML

基本は `<div popover>` となる。また、複数のメッセージがあった場合に、他のが表示されても消えないよう、 `manual` を指定する。

```html
<div popover="manual">
</div>
```

もし内容のレイアウトで Flex や Grid を使いたい場合、 `<div popover>` 自体の `display` を変えると扱いが少し面倒になるため、もう 1 つ Wrapper の `<div>` を用意しておくと良いだろう。

```html
<div id="toast" popover="manual">
  <div style="display:flex">
  </div>
</div>
```

`manual` である以上、明示的な処理がないと Close されなくなるため、`popovertarget` に ID を指定し `popovertargetaction=hide` で閉じる UI を提供する。アイコンなどを用いた方が良いが、簡易化のために `x` で代用する。

```html
<div id="toast" popover="manual">
  <div>
    <button popovertarget="toast" popovertargetaction="hide" aria-label="close">x</button>
  </div>
</div>
```

メッセージは共通ではなく、状況に応じて変更されるだろう。そこで、メッセージを表示する場所を用意する。まずはこれを `<p>` としてみよう。

```html
<template>
  <div id="toast" popover="manual">
    <p></p>
    <div style="display:flex">
      <button popovertarget="toast" popovertargetaction="hide" aria-label="close">x</button>
    </div>
  </div>
</template>
```

これを HTML のテンプレートとして保持し、内容(message, icon, style etc)を変更しながら、使い回してさまざまなメッセージを表示することになるだろう。

注意点として `popover` は `dialog` と異なり対象の Role には影響を与えないため、これは単にテキストとボタンを持った `<div>` が Top Layer に表示されただけの状態になる。この情報がなんであるか、ユーザにとってどのような重要度を持つ情報なのかについては、別途補完していく必要がある。この点に対しては、従来の「`popover` を使わずに実装されていた Toast コンポーネント」も参考にできる。

通知の用途を考えると、 `role=status` か `role=alert` を用いるのが一般的だろう。多くの「*ユーザに通知があったことを伝えるが、作業を中断するほどでない*」ケースでは、`aria-live=polite` たる `role=status` を用いる。また、もし他の `role` に切り替える予定がないのであれば、同じく `aria-live=polite` である `<ouput>` を用いる方法も考えられる。

```html
<template>
  <div id="toast" role="polite" popover="manual">
  </div>
</template>
```

逆に「*ユーザにとって重要な通知*」であれば、 `role=alert` を用いる。`aria-live=assertive` であり、 UA を通じてユーザには直ちに内容が伝わる。逆を言えば、これは多用すべきではないため、最小限に止めるべきだろう。

```html
<template>
  <div id="toast" role="alert" popover="manual">
  </div>
</template>
```

今回は、一度表示した Popover の中身を動的に変えるケースは考えない。

また、即座に通知はするが、フォーカスを奪い、操作をすることは求めない。フォーカスを奪ってユーザの明示的な操作を求める場合は、内容の重要度に応じて `role=dialog` / `role=alertdialog` を使うことになるが、この場合は `<dialog>` の利用も視野に入ってくるため、今回はスコープ外とする。


### CSS

配置を右下にする場合は、 `<dialog>` で行ったのと同じように `position: absolute` を指定する。

```css
[popover] {
  position: absolute;
  top: auto;
  right: 10px;
  bottom: 10px;
  left: auto;
}
```

積み上げて複数表示する場合は、この `bottom` を追加していくことになるだろう。

次にアニメーションを考える。

もともと Toast という名前であるように、下から飛び出すような実装が多いだろう。この場合は、 `opacity` をトランジションするより、 `height` をトランジションすることで、下からニョキっと伸びるような表現ができる。

```css
/* enable transitions */
[popover] {
  transition:
    display var(--duration) allow-discrete,
    overlay var(--duration) allow-discrete,
    height var(--duration);
}

:popover-open {
  height: auto;
}

@starting-style {
  :popover-open {
    height: 0;
  }
}
```

注意点として、 `transition` で `height` を指定しても、最終的な `height` が `auto` であると、従来はトランジションできなかった。

これは、 `auto`, `min-content`, `max-content` のようなキーワードで指定され、内部のコンテンツを基準に値が決まる `intrinsic-size` については、トランジションに指定できないという制限があったからだ。

そこで `auto` の代わりに具体的な値を指定するといった必要があったが、それではカバーできないケースがあるため、 `intrinsic-size` へのアニメーションが可能になるように策定されたのが `interpolate-size` だ。値に `allow-keywords` を指定することで、キーワード指定のサイズを用いたトランジションが可能になる。

```css
:root {
  interpolate-size: allow-keywords;
}
```

さらに `calc-size()` を用いると、 `intrinsic-size` を基準とした `calc()` も可能になる。

```css
:popover-open {
  /* auto の計算結果が size 変数に入り、第二引数で計算した結果が反映される */
  height: calc-size(auto, size + 1rem);
}
```

今回は `auto` にすればよいだろう。非表示に関しては特にアニメーションせず、パッと消えれば良いとすれば、以下のようになる。

```css
:root {
  interpolate-size: allow-keywords;
}

/* enable transitions */
[popover] {
  transition:
    display var(--duration) allow-discrete,
    overlay var(--duration) allow-discrete,
    height var(--duration);
}

:popover-open {
  height: auto;
  /* height: calc-size(auto, size); */
}

@starting-style {
  :popover-open {
    height: 0;
  }
}
```


### JS

以上の `<template>` を、メッセージの発生ごとに動的にクローンし、 `showPopover()` するコードを書いていくだけだ。

```js
const clone = template.content.cloneNode(true)
// id, role, message などを埋め込む
document.body.appendChild(clone)
// 表示
document.querySelector('[popover]').showPopover()
```

各 Popover を表示するたびに、付与する ID や `bottom` の値などを変更しながら積み上げていくことになるだろう。


## DEMO

動作するデモをいかに用意した。

- Popover Toast DEMO
  - https://labs.jxck.io/popover/toast.html