# [dialog][popover] Dialog と Popover #9

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃ってないものがある点に注意**


## Toast

次は、 Popover の源流にもなった、画面端にメッセージを表示するいわゆる Toast UI について考えてみる。想定するのは以下のようなものだ。

![画面の右下に表示される　Toast UI](./toast.drawio.svg#400x400)

色やアイコンを変えることで、メッセージの性質を変えたりといった用途が一般的であり、同時に複数表示が可能だとする。


### HTML

基本は `<div popover>` となる。また、複数のメッセージがあった場合に、他のが表示されても消えないよう、 `manual` を指定する。

```html
<div popover="manual">
</div>
```

これにより、明示的な処理がないと Close されなくなるため、`popovertarget` に ID を指定し `popovertargetaction=hide` で閉じる UI を提供しよう。

```html
<div id="toast" popover>
  <button popovertarget="toast" popovertargetaction="hide">x</button>
</div>
```

もし内容のレイアウトで Flex や Grid を使いたい場合、 `<div popover>` 自体の `display` を変えると扱いが少し面倒になるため、もう 1 つ Wrapper の `<div>` を用意しておくと良いだろう。

```html
<div id="toast" popover>
  <div style="display:flex">
    <button popovertarget="toast" popovertargetaction="hide">x</button>
  </div>
</div>
```

この用途の Popover は、以上をテンプレートとして保持しておき、内容(message, icon, style etc)を変更しながら、使い回してさまざまなメッセージを表示することになるだろう。

スタイルは動的に Class (`.info`, `.warn`, `.error` etc)を付与し、メッセージを表示する場所として `<output>` を用意する。

```html
<template>
  <div id="toast" popover="manual">
    <output></output>
    <div style="display:flex">
      <button popovertarget="toast" popovertargetaction="hide">x</button>
    </div>
  </div>
</template>
```

これが基本の構造となる。


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

ここで注意点は、 `transition` で `height` を指定しても、最終的な `height` が `auto` であると、従来はトランジションできなかった。

これは、 `auto`, `min-content`, `max-content` のようなキーワードで指定され、内部のコンテンツを基準に値が決まる `intrinsic-size` については、トランジションに指定できないという制限があったからだ。

そこで、 `auto` の代わりに具体的な値を指定するといった必要があったが、それではカバーできない場合があるため、 `intrinsic-size` へのアニメーションが可能になるように策定されたのが `interpolate-size` だ。値に `allow-keywords` を指定することで、キーワード指定のサイズを用いたトランジションが可能になる。

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

あとは、メッセージの内容に合わせて class などを切り替えて適切なスタイルを当てる。

TODO: aria

### JS

以上の `<template>` を、メッセージの発生ごとに動的にクローンし、 `showPopover()` で表示することになる。


