# [dialog][popover] Dialog と Popover #10

## Intro

今回考えたいのは、 GitHub の Issue や User アイコンをマウスでホバーすると、 Issue の詳細や User Profile が表示されるアレだ。

![リンクを hover すると Tooltip でリンク先の詳細がカード表示される](./tooltip-popover.drawio.svg#300x300)

挙動としては想像通り、対象要素に Anchoring した `<div popover>` を表示し、中に好きなようにコンテンツを入れれば良い。ただし UI のセマンティクスに関しては、複数の議論が行われており、方針もいくつか考えられる。

今回は、それらの現状を整理つつ、考えうる選択肢をいくつか提示する。その中で要件に合わせて何を選ぶかは実装者に委ねたい。

## Tooltip Component

### Native Tooltip

まず、この UI の名前だが、 UI ライブラリを見ても、このようなコンポーネントは様々な名前で提供されている。

そもそも Popover という名前で提供している場合もあれば、 Tooltip / Toggletip / Popup といった名前がつくこともある。

しかし、 HTML において Tooltip というと、 `title` 属性を付与した際に、マウスオーバーでブラウザが出す、この UI がそう呼ばれる。

![画像の title 属性の文字列をブラウザが小さいポップアップで表示している](native-tooltip.png)

紛らわしいので、ここではこれを Native Tooltip と呼ぶことにする。

Native Tooltip は、古くからブラウザに実装されているが、ブラウザによってはキーボードのフォーカスだけでは出せない、テキストを選択できない、スタイルが指定できないなど、いくつかの問題が度々指摘されている。

スタイルについては、 CSS を当てられるようにする提案自体はある。

- Consider providing a way for authors to style the title attribute's tooltip · Issue #730 · openui/open-ui
  - https://github.com/openui/open-ui/issues/730
- [css-ui] Standardize tooltip styling and expose as `::tooltip` · Issue #8930 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/8930

しかし、まだ議論がまとまっておらず、どうなるかわからない。

また、依然としてフォーカス移動だけで内容を知りたい場合や、選択してコピーしたい場合のために、 `title` 属性に頼らず独自のコンポーネントを実装する機会はあるだろう。


### Tooltip/Toggletip

Native Tooltip は `title` 属性を出しているだけなので、内容はテキスト(presentation contents)のみだ。ここにコントローラー(interactive content)、つまりリンクやボタンなどが入ってくると話は少し変わる。

OpenUI をはじめとしたいくつかの場所では、「テキストのみ」を表示するコンポーネントは **Tooltip**、対して「コントローラ」を含むものを **Toggletip** と呼び分けている。便利なので、本文でもそれを採用することにする。

どちらも、 対象要素に Anchoring した `<div popover>` で実装することが可能だろう。

```html
<a href=/users/jxck>Jxck</a>
<div popover>
  Hello Tooltip
</div>
```

今回はクリック時ではなくホバー時に開く実装だが、その場合でも `popovertarget` で両者の Invoker Relationship を定義することは可能だ。

```html
<a popovertarget=tooltip href=/users/jxck>Jxck</a>
<div id=tooltip popover>
  Hello Tooltip
</div>
```

ここまでは、通常の Popover の使い方と同じだ。また、この時点で JS/CSS の実装自体はこれまで通りの方法で可能だろう。

問題は、どのような/にセマンティクスを提供するかだ。

## APG

APG にも Tooltip についてのパターンがある。

- Tooltip Pattern | APG | WAI | W3C
  - https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

この中では `role=tooltip` および `aria-describedby` の付与が推奨されている。

しかし、最初に書かれている通り、このパターンはまだ議論が終わっておらず、完成しているとは言えない。 Issue は 2016 年に立ったもので、今でもまだ結論が出ていない。

- Develop example of tooltip design pattern · Issue #127 · w3c/aria-practices
  - https://github.com/w3c/aria-practices/issues/127
- Draft tooltip design pattern · Issue #128 · w3c/aria-practices
  - https://github.com/w3c/aria-practices/issues/128

時を経て去年、この議論は ARIA 側にも持ち込まれた。

- Definitive tooltip design pattern · Issue #2002 · w3c/aria
  - https://github.com/w3c/aria/issues/2002

したがって、ここに書かれているものにそのまま準拠すれば良いかというと、それは非常に微妙だ。

そこで、何が議論になっているのかを見ていこう。


### role=tooltip

この UI を Tooltip と呼ぶ場合、 `role=tooltip` があるため、そのまま使うのが自然に思える。

```html
<div role=tooltip popover>
  Hello Tooltip
</div>
```

`role=tooltip` については以下に仕様がある。

- Accessible Rich Internet Applications (WAI-ARIA) 1.3
  - https://w3c.github.io/aria/#tooltip

`role=state` などと違い、 `aria-live` や `aria-atomic` についてデフォルトがないため、特に UA にとって何か特別な挙動がないことも知られている。

したがって、ユーザに情報の緊急性を知らせる意味でも、 `aria-live=polite` や `<output>` を併用する方法が考えられる。

```html
<div role=tooltip popover>
  <output>Hello Tooltip</output>
</div>
```

また、従来はこうした DOM を表出させる場合は `aria-haspopup` が Invoker 相当側に付与されることが多いが、 Popover を用いる場合、 UA は Popover が開いていることを知ることができるため、不要とされている。 

- Popover invoker example shouldn't have `aria-haspopup` · Issue #9153 · whatwg/html
  - https://github.com/whatwg/html/issues/9153

このあたりまでは、まあ概ね共通して考えられるだろう。

しかし、ここから先にいくにあたって話が少し割れてくる。


### role=tooltip の曖昧さと微妙さ

そもそも、 UA に対して特段の挙動を求めない上に、用途が狭い `role=tooltip` 自体が、曖昧かつ端的に言えば微妙なのではという議論が、 Popover などの策定が進んでいく 2019 年ごろ出た。

- Clarify the use of role=tooltip · Issue #979 · w3c/aria
  - https://github.com/w3c/aria/issues/979

議論は長引いており、 TPAC 2023 では 2 枠のディスカッションが用意されたが、それでも明確な結論には至ってない。

- ARIA WG F2F (TPAC) – 11 September 2023
  - https://www.w3.org/2023/09/11-aria-minutes
- (MEETING TITLE) – 15 September 2023
  - https://www.w3.org/2023/09/15-aria-minutes.html

また、現状の APG の不完全さを、そのまま採用することで問題となっている実装もある。

- Tooltip should not use role and aria-describedby · Issue #3242 · ariakit/ariakit
  - https://github.com/ariakit/ariakit/issues/3242#issuecomment-1867610708
- Color picker: CopyButton is unlabeled and has buggy description and tooltip · Issue #57157 · WordPress/gutenberg
  - https://github.com/WordPress/gutenberg/issues/57157#issuecomment-1865981198

`role=tooltip` の曖昧さが、 APG の Tooltip 実装の推奨をはっきりさせられない要因にもなっている。



- Tooltip role should allow referencing by aria-labelledby · Issue #987 · w3c/aria
  - https://github.com/w3c/aria/issues/987
- Tooltip pattern should allow for aria-labelledby · Issue #1034 · w3c/aria-practices
  - https://github.com/w3c/aria-practices/issues/1034

## Tooltip の実装

という前提を踏まえた上で、現状の考えうる実装について見ていこう。

### Text or Interactive Content

まず、内容が Native Tooltip のようにテキストだけのケースは、既出の通りこれがベースとなり得そうだ。

```html
<div role=tooltip popover>
  <output>Hello Tooltip</output>
</div>
```






しかし、 GitHub の UI では、内部にリンクを含んだインタラクティブコンテントが入っている。つまり、これは先の語彙でいう Tooltip ではなく Toggletip なのだ。

```html
<div popover>
  <a href="/users/jxck">Jxck</a>
</div>
```

さて、この場合 `role=tooltip` を用いていいのだろうか？

実は、もともとの `role=tooltip` が追加された当初は、コントローラを含められる目的だった

> Back when we added role=tooltip, the assumption was that role=tooltip could allow interactive content.
> --- https://github.com/w3c/aria/issues/979#issuecomment-1131900402

しかし、今の Tooltip の文脈はそうはなってない。

実際、 GitHub の実装は `role=region` を用いており、 Slack は `role=presentation` 用いているなど、かなりブレもある。

## role=dialog

一方、このようにインタラクティブな要素を含む Toggletip の場合は、 `role=dialog` を用いるべきという話もある。 APG もこの点に触れている。(何度も言うが APG の Tooltip は確定ではない点に留意)

> Tooltip widgets do not receive focus. A hover that contains focusable elements can be made using a non-modal dialog.
> --- https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

コントローラがあるということは、フォーカスについて考慮する必要がある。現状の `role=tooltip` はその点について不十分として、 non-modal dialog としての実装が推奨されるのだ。そして、 non-modal dialog な Toggletip のパターンは APG では(ややこしいことに) Tooltip Dialog というパターンでまとめるという Issue が立ってはいるが、立てっぱなしで話が進んでない状況だ。

- Draft tooltip dialog design pattern · Issue #85 · w3c/aria-practices
  - https://github.com/w3c/aria-practices/issues/85

なお、 Confluence は `role=dialog` で実装している。


## non-Modal Toggletip

`<dialog>` は散々解説したように、特に Modal のケースはユーザに対して操作を要求する性質が強い。しかし、 Modal で出さなければ `role=dialog` の実装要素という側面を享受できる。

また、このケースは Light Dismiss が求められることを考えると、 `<dialog popover>` での実装が考えられる。

```html
<dialog popover>
  <a href="/users/jxck">Jxck</a>
</dialog>
```






これを `showPopover()` すれば、目的は達成できそうだ。

Modal Dialog の場合はフォーカスを移すが、今回の場合は popover なので `autofocus` はむしろいらないだろう。


基本的に、画面上同時に 1 つしか存在せず、マウスを外せばすぐ消える。全ての要素に対して、あらかじめ `[poposver]` を作っておいて、表示/非表示を切り替えるのは現実的ではないため、 1 つの Popover 使い回し、内容と位置を変えながら表示していく実装方法が考えられる。

表示位置は、どの場所にあるリンクをホバーしても、そのリンクに紐づいて表示されるように、 Anchor Positioning を活用することになる。

今回は、 `<a>` をホバーした際に、リンク先のタイトルを取得して表示するような UI を考えてみる。



## role=tooltip の議論
 
- Clarify the use of role=tooltip · Issue #979 · w3c/aria
  - https://github.com/w3c/aria/issues/979
- Tooltip should not use role and aria-describedby · Issue #3242 · ariakit/ariakit
  - https://github.com/ariakit/ariakit/issues/3242


- Semantics and the popover attribute: which role to use when? | hidde.blog
  - https://hidde.blog/popover-semantics/




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






# TODO

- APG Tooltips
  - https://zoebijl.github.io/apg-tooltip/