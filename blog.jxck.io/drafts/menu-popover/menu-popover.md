# [dialog][popover] Dialog と Popover #10

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃っていないものがある点に注意**


## Tooltip

今回は、 Menu の実装を考えてみる。 GitHub でいうとこの部分だ。

![GitHub のリポジトリ作成などのメニューが表示される Popover](./github-menu.png#574x536)

元となるボタンによって表示され、このボタンからの相対位置で調整されるため Anchor Positioning を活用することになる。非常に良くある実装パターンだ。

HTML の仕様にも、類似の実装が Example として掲載されている。
- 6.12 The popover attribute
  - https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute


APG としては、 Menu Button パターンにあたるだろう。

- Menu Button Pattern | APG | WAI | W3C
  - https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/


GitHub のこの実装はまだ Popover ではないため、現状を参考にどのように Popover で実装できるかを考えてみる。


### HTML

よくあるメニューとして、以下のような HTML をベースに考える。

開くためのボタンが Invoker となり、 Popover としてメニューのアイテムが開く実装が考えられるだろう。


```html
<button popovertarget=menu>Actions</button>
<ul id=menu popover>
  <li><button>Edit</button></li>
  <li><button>Hide</button></li>
  <li><button>Delete</button></li>
</ul>
```

ここでも Popover はセマンティクスに影響を与えないため、単に `<ul>` が開いただけになる。この場合、外側は `role=menu` とし、各アクションが `role=menuitem` とすることで、開いているものがメニューであると言うことを宣言できるだろう。

```html
<button popovertarget=menu>Actions</button>
<ul id=menu role=menu popover>
  <li><button role=menuitem>Edit</button></li>
  <li><button role=menuitem>Hide</button></li>
  <li><button role=menuitem>Delete</button></li>
</ul>
```

最初のコントローラには明示的に `autofocus` を付与する。

```html
<button popovertarget=menu>Actions</button>
<ul id=menu role=menu popover>
  <li><button role=menuitem autofocus>Edit</button></li>
  <li><button role=menuitem>Hide</button></li>
  <li><button role=menuitem>Delete</button></li>
</ul>
```

APG などにも書かれているように、従来このような実装を行う際は、 `<button popovertarget>` をクリックしたことで `<ul role=menu>` が開いたと言う事実を UA に伝えるために、 `aria-haspopup=menu` を付与し、メニューが開いている間は `aria-expanded=true` にするといった実装が行われていた。

しかし、 Popover が Invoker Relationship を持っている場合、 `<button popovertarget>` が `<ul role=menu>` を開いたことを UA は認識しているため、このような実装は Popover API を用いる限りは不要となる。

- Popover invoker example shouldn't have `aria-haspopup` · Issue #9153 · whatwg/html
  - https://github.com/whatwg/html/issues/9153


これが基本の構造となる。


### CSS

今回はとりあえずパッと表示されて、終わったら消えればよいということで、アニメーションは割愛する。

問題は表示位置だ。

基本的には、開く側のボタンに対して相対的に表示するため、ボタンをアンカーとして指定する。

```css
button[popovertarget] {
  anchor-name: --menu;
}

ul[popover] {
  position-anchor: --menu;
}
```




これではピッタリとくっつきすぎるため、 `translate` で少し余白を設定するする。

```css
[popover] {
  top: anchor(end);
  left: anchor(start);
  translate: 2% 4%;
}
```

このとき、表示のための領域が足らなければ上、左とフォールバックするように指定する。

```css


```

TODO: aria

### JS

以上の `<div popover>` を、リンクごとに動的に内容を取得して表示することになる。

Anchor の対応関係の表現は、現状 CSS でしか行えない。

```css
a {
  anchor-name: --anchor;
}

[popover] {
  position-anchor: --anchor;
}
```

これを 1 つの `[popover]` と複数の `<a>` の間で行う必要があるため、基本的には `<a>` 側に一意の値を割り振り、それを各々の `anchor-name` として採用する。そして表示したい `<a>` に合わせて `[popover]` の `position-anchor` を変えるという方針を採用する。

今回の場合は、 `<a>` には ID が付与されている前提とする。

```html
<ul>
  <li><a id=one>one</a>
  <li><a id=two>two</a>
  <li><a id=three>three</a>
</ul>
```

最初に id に `--` をつけたものを、全ての `<a>` の `anchor-name` にしてしまう。

```js
document.querySelectorAll('a').forEach(($a) => {
  $a.style.anchorName = `--${$a.id}` // --one など
})
```

次に、 `<a>` が `mouseover` されたら、 `[popover]` の `position-anchor` を、 `<a>` の ID を元に紐づけてから、 `showPopover()` すれば、 `<a>` を Anchor として表示することができる。

```js
document.querySelectorAll('a').forEach(($a) => {
  $a.style.anchorName = `--${$a.id}` // --one など
  $a.on('mouseover', async (e) => {
    $popover.style.positionAnchor = `--${e.target.id}`
    // fetch & dom update
    $popover.showPopover()
  })
})
```

ここで、 `showPopover()` の前に、必要な情報を取得して DOM に反映すれば良い。

そして `[popover]` の mouseleave で消す。このイベントリスナーは `mouseover` ごとに追加されてメモリーリークするので `{ once: true }` が必須だ。

```js
$$('a').forEach(($a) => {
  $a.style.anchorName = `--${$a.id}`
  $a.on('mouseover', async (e) => {
    $popover.style.positionAnchor = `--${e.target.id}`
    $popover.showPopover()
    $popover.on('mouseleave', (e) => {
      $popover.hidePopover()
    }, { once: true })
  })
})
```

この場合、 Popover 内に一回もマウスが入らなければ消えないが、 Light Dismiss なので、他の場所のクリックや、他の Popover のオープンなどで簡単に消えるため、残り続けることは少ないだろう。ちゃんとやるのであれば、同時に `<a>` からの `mouseleave` も合わせて見るなどの実装が必要だ。