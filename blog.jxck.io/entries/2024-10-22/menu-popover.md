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
  <li role=menuitem><button>Edit</button></li>
  <li role=menuitem><button>Hide</button></li>
  <li role=menuitem><button>Delete</button></li>
</ul>
```

最初のコントローラには明示的に `autofocus` を付与し、各操作実行後には Popover を閉じるために `popovertargetaction=close` も担わせることができる。

```html
<button popovertarget=menu>Actions</button>
<ul id=menu role=menu popover>
  <li><button role=menuitempopovertarget=menu popovertargetaction=close autofocus>Edit</button></li>
  <li><button role=menuitempopovertarget=menu popovertargetaction=close>Hide</button></li>
  <li><button role=menuitempopovertarget=menu popovertargetaction=close>Delete</button></li>
</ul>
```

APG などにも書かれているように、従来このような実装を行う際は、 `<button popovertarget>` をクリックしたことで `<ul role=menu>` が開いたと言う事実を UA に伝えるために、 `aria-haspopup=menu` を付与し、メニューが開いている間は `aria-expanded=true` にするといった実装が行われていた。

しかし、 Popover が Invoker Relationship を持っている場合、 `<button popovertarget>` が `<ul role=menu>` を開いたことを UA は認識しているため、このような実装は Popover API を用いる限りは不要となる。これも Popover がネイティブの API になったことのメリットの 1 つだ。

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

あとは、 `[popovertarget]` に合わせて位置を指定し、必要に応じて `translate` で調整することで実装ができるだろう。

```css
[popover] {
  top: anchor(end);
  left: anchor(center);
  translate: 2% 4%;
}
```

`position-area` を用いて指定する場合は、以下のようにも指定可能だ。

```css
[popover] {
  position-area: bottom span-right;
}
```

あとは、通常通り必要なスタイルを当ててやれば良い。


### JS

Popover の開閉という点に関しては、特に JS 無しに挙動が実現できているため、特に必要は無い。

あとは、普通にメニューの機能そのものを実装すれば良いだろう。


## Nesting

メニューの項目が、さらにサブメニューを開く実装もある。

この場合、ネストした項目をさらに Popover として開くことで実装できる。

```html
<ul>
  <li>
    <button popovertarget=menu>Actions</button>
    <ul id=menu role=menu popover>
      <li role=menuitem><button popovertarget=menu popovertargetaction=close autofocus>Save</button></li>
      <li role=menuitem>
        <button popovertarget=submenu popovertargetaction=show>Edit</button>
        <ul id=submenu role=menu popover>
          <li role=menuitem><button popovertarget=menu popovertargetaction=close autofocus>Cut</button></li>
          <li role=menuitem><button popovertarget=menu popovertargetaction=close>Copy</button></li>
          <li role=menuitem><button popovertarget=menu popovertargetaction=close>Paste</button></li>
        </ul>
      </li>
      <li role=menuitem><button popovertarget=menu popovertargetaction=close>Close</button></li>
    </ul>
  </li>
</ul>
```

CSS も、 Anchor をサブメニューに対して付与していけば良い。

```css
button[popovertarget=menu] {
  anchor-name: --menu;
}
ul#menu {
  position-anchor: --menu;
  position-area: bottom span-right;
}

[popovertarget=submenu] {
  anchor-name: --submenu;
}
ul#submenu {
  position-anchor: --submenu;
  position-area: right span-bottom;
}
```

また、これが横に広がることで画面に収まらない可能性を考慮して、 fallback を指定する。

```css
ul#submenu {
  position-anchor: --submenu;
  position-area: right span-bottom;
  translate: 14px;
  position-try-fallbacks: --bottom;
}

@position-try --bottom {
  position-area: bottom span-right;
}
```

これによって右に余白がなければ、下に表示をフォールバックすることが可能だ。


## DEMO

動作するデモを以下に用意した。

- Menu Popover DEMO
  - https://labs.jxck.io/popover/menu.html