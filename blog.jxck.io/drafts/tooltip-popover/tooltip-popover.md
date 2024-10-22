# [dialog][popover] Dialog と Popover #10

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃っていないものがある点に注意**


## Tooltip

今回は、 Tooltip の実装を考えてみる。身近な例では、 GitHub の Issue や User アイコンをマウスでホバーすると、 Issue の詳細や User Profile が表示されるアレだ。

![リンクを hover すると Tooltip でリンク先の詳細がカード表示される](./tooltip-popover.drawio.svg#300x300)

基本的に、画面上同時に 1 つしか存在せず、マウスを外せばすぐ消える。全ての要素に対して、あらかじめ `[poposver]` を作っておいて、表示/非表示を切り替えるのは現実的ではないため、 1 つの Popover 使い回し、内容と位置を変えながら表示していく実装方法が考えられる。

表示位置は、どの場所にあるリンクをホバーしても、そのリンクに紐づいて表示されるように、 Anchor Positioning を活用することになる。

今回は、 `<a>` をホバーした際に、リンク先のタイトルを取得して表示するような UI を考えてみる。


### HTML

基本は `<div popover>` となる。同時に 1 つしか表示されないため、 `popover=auto` を指定するが、デフォルトなので明示的に書く必要はない。

```html
<div popover>
</div>
```

この要素のロールの選択には、いくつかの設計方針がある。

`role=tooltip` というそのままの名前のものもあるが、このロールは特にデフォルトで規定(`aria-live` や `aria-atomic` の値など)されているものが無い。そのため、たとえば `title` 属性を付与した時にブラウザが出す、デフォルトの Tooltip のように、補助的なプレーンテキストが表示されるといったものであれば使われるが、インタラクティブコンテンツなどを含む場合は、別のロールが使われることが多い。

たとえば、 GitHub で Icon や Issue を hover した時に出る Tooltip は `role=region` を用いており、 Slack の場合は `role=presentation` を用いている。

```html
<div role=tooltip popover>
</div>
```

しかし、 `role=tooltip` は前回 Toast に使用した `role=status` や `role=alert` と異なり、`aria-live` や `aria-atomic` はデフォルトでは指定されない点には注意が必要だ。

今回は、あくまで補助的な情報を表示している点から `aria-live=polite`、かつ同じ DOM を使い回している点から `aria-atomic=true` で全変更を通知する実装が考えられるだろう。

```html
<div role=tooltip aria-live=polite aria-atomic=true popover>
</div>
```





マウスオーバー時に表示し、マウスが外れれば消えるため、明示的な非表示 UI は不要だろう。必要なのはメッセージの表示領域だ。

```html
<div popover>
  <h2>ホバーしたリンク先のタイトル</h2>
</div>
```
これが基本の構造となり、これを


### CSS

表示に関して、特にアニメーションは不要だろう。大事なのは表示する位置だ。

基本的には、ホバーしたリンクに対して右下に表示するため、リンクをアンカーとして指定する。

```css
[popover] {
  top: anchor(end);
  left: anchor(start);
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