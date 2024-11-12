# [dialog][popover] Dialog と Popover #11

## Intro

今回考えたいのは、GitHub の Issue や User アイコンをマウスでホバーすると、Issue の詳細や User Profile が表示されるアレだ。

![リンクを hover すると Tooltip でリンク先の詳細がカード表示される](./tooltip-popover.drawio.svg#300x300)

挙動としては想像通り、対象要素に Anchoring した `<div popover>` を表示し、中に好きなようにコンテンツを入れれば良い。ただし UI のセマンティクスに関しては、複数の議論が行われており、方針もいくつか考えられる。

今回は、それらの現状を整理しつつ、考えうる選択肢をいくつか提示する。その中で要件に合わせて何を選ぶかは実装者に委ねたい。


## Tooltip Component

### Native Tooltip

まず、この UI の名前だが、UI ライブラリを見ても、このようなコンポーネントは様々な名前で提供されている。

そもそも Popover という名前で提供している場合もあれば、Tooltip / Toggletip / Popup といった名前がつくこともある。

しかし、HTML において Tooltip というと、`title` 属性を付与した際に、マウスオーバーでブラウザが出す、この UI がそう呼ばれる。

![画像の title 属性の文字列をブラウザが小さいポップアップで表示している](native-tooltip.png#180x156)

紛らわしいので、ここではこれを Native Tooltip と呼ぶことにする。

Native Tooltip は、古くからブラウザに実装されているが、ブラウザによってはキーボードのフォーカスだけでは出せない、テキストを選択できない、スタイルが指定できないなど、いくつかの問題が度々指摘されている。

スタイルについては、CSS を当てられるようにする提案自体はある。

- Consider providing a way for authors to style the title attribute's tooltip · Issue #730 · openui/open-ui
  - https://github.com/openui/open-ui/issues/730
- [css-ui] Standardize tooltip styling and expose as `::tooltip` · Issue #8930 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/8930

しかし、まだ議論がまとまっておらず、どうなるかわからない。

また、依然としてフォーカス移動だけで内容を知りたい場合や、選択してコピーしたい場合のために、`title` 属性に頼らず独自のコンポーネントを実装する機会はあるだろう。


### Tooltip/Toggletip

Native Tooltip は `title` 属性を出しているだけなので、内容はテキスト(presentation contents)のみだ。ここにコントローラ(interactive content)、つまりリンクやボタンなどが入ってくると話は少し変わる。

OpenUI をはじめとしたいくつかの場所では、「テキストのみ」を表示するコンポーネントは **Tooltip**、対して「コントローラ」を含むものを **Toggletip** と呼び分けている。便利なので、本文でもそれを採用することにする。

どちらも、対象要素に Anchoring した `<div popover>` で実装することが可能だろう。

```html
<a href=/users/jxck>Jxck</a>
<div popover>
  Jxck: Web developer in Japan
</div>
```

今回はクリック時ではなくホバー時に開く実装だが、その場合でも `popovertarget` で両者の Invoker Relationship を定義することは可能だ。

```html
<a popovertarget=tooltip href=/users/jxck>Jxck</a>
<div id=tooltip popover>
  Jxck: Web developer in Japan
</div>
```

ここまでは、通常の Popover の使い方と同じだ。また、この時点で JS/CSS の実装自体はこれまで通りの方法で可能だろう。

問題は、どのような/にセマンティクスを提供するかだ。


## APG

APG にも Tooltip についてのパターンがある。

- Tooltip Pattern | APG | WAI | W3C
  - https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

この中では `role=tooltip` および `aria-describedby` の付与が推奨されている。

また、従来はこうした DOM を表出させる場合は `aria-haspopup` が Invoker 相当側に付与されることが多いが、Popover を用いる場合、UA は Popover が開いていることを知ることができるため、不要とされている。

- Popover invoker example shouldn't have `aria-haspopup` · Issue #9153 · whatwg/html
  - https://github.com/whatwg/html/issues/9153

以上を踏まえ、現在の推奨に則って実装するとこうなる。

```html
<a popovertarget=tooltip aria-describedby=tooltip href=/users/jxck>Jxck</a>
<div role=tooltip id=tooltip popover>
  Jxck: Web developer in Japan
</div>
```

しかし、最初に書かれている通り、このパターンはまだ議論が終わっておらず、完成しているとは言えない。Issue は 2016 年に立ったもので、今でもまだ結論が出ていない。

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

`role=tooltip` については以下に仕様がある。

- Accessible Rich Internet Applications (WAI-ARIA) 1.3
  - https://w3c.github.io/aria/#tooltip

`role=state` などと違い、 `aria-live` や `aria-atomic` についてデフォルトがないため、特に UA にとって何か特別な挙動がないことも知られている。

このように、用途が狭い `role=tooltip` 自体が、曖昧かつ端的に言えば微妙なのではという議論が、 Popover などの策定が進んでいく 2019 年ごろに出た。

- Clarify the use of role=tooltip · Issue #979 · w3c/aria
  - https://github.com/w3c/aria/issues/979

議論は長引いており、 TPAC 2023 では 2 枠のディスカッションが用意されたが、それでも明確な結論には至ってない。

- ARIA WG F2F (TPAC) - 11 September 2023
  - https://www.w3.org/2023/09/11-aria-minutes
- (MEETING TITLE) - 15 September 2023
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


## Toggletip

また、内容が Native Tooltip のようにテキストだけでなく、インタラクティブなコンテンツを含む場合はさらに話が変わる。

例えば、GitHub の UI では、内部にリンクを含む。つまり、これは先の語彙でいう Tooltip ではなく Toggletip なのだ。

```html
<a popovertarget=tooltip aria-describedby=tooltip href=/users/jxck>Jxck</a>
<div role=tooltip id=tooltip popover>
  <a href=/users/jxck>Jxck</a>: Web developer in Japan
</div>
```

さて、この場合 `role=tooltip` を用いていいのだろうか?

実は、もともとの `role=tooltip` が追加された当初は、コントローラを含められる目的だった

> Back when we added role=tooltip, the assumption was that role=tooltip could allow interactive content.
> --- https://github.com/w3c/aria/issues/979#issuecomment-1131900402

しかし、今の Tooltip の文脈はそうはなっていない。

実際、GitHub の実装は `role=region` を用いており、Slack は `role=presentation` を用いているなど、かなりブレもある。


## role=dialog

一方、このようにインタラクティブな要素を含む Toggletip の場合は、`role=dialog` を用いるべきという話もある。APG もこの点に触れている。(何度も言うが、APG の Tooltip は確定ではない点に留意)

> Tooltip widgets do not receive focus. A hover that contains focusable elements can be made using a non-modal dialog.
> --- https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

コントローラがあるということは、フォーカスについて考慮する必要がある。現状の `role=tooltip` はその点について不十分として、non-Modal Dialog としての実装が推奨されるのだ。そして、non-Modal Dialog な Toggletip のパターンは APG では(ややこしいことに)Tooltip Dialog というパターンでまとめるという Issue が立ってはいるが、立てっぱなしで話が進んでいない状況だ。

- Draft tooltip dialog design pattern · Issue #85 · w3c/aria-practices
  - https://github.com/w3c/aria-practices/issues/85
- Semantics and the popover attribute: which role to use when? | hidde.blog
  - https://hidde.blog/popover-semantics/

なお、Confluence は `role=dialog` で実装している。


## non-Modal Toggletip

`<dialog>` は散々解説したように、特に Modal のケースはユーザに対して操作を要求する性質が強い。しかし、Modal で出さなければ `role=dialog` の実装要素という側面を享受できる。

また、このケースは Light Dismiss が求められることを考えると、`<dialog popover>` での実装が考えられる。

```html
<a popovertarget=tooltip aria-describedby=tooltip href=/users/jxck>Jxck</a>
<dialog role=tooltip id=tooltip popover>
  <a href=/users/jxck>Jxck</a>: Web developer in Japan
</dialog>
```

これを `showPopover()` すれば、目的は達成できそうだ。

Modal Dialog の場合はフォーカスを移すが、今回の場合は popover なので `autofocus` はいらないだろう。

基本的に、画面上同時に 1 つしか存在せず、マウスを外せばすぐ消える。すべての `<a>` 要素に対して、あらかじめすべての `<dialog popover>` を作っておくのは現実的ではないため、1 つの `<dialog popover>` を使い回し、Anchor を変えながら再利用することになるだろう。


## Light Dismiss Dialog

今回は Light Dismiss non-Modal Dialog を実現するために `<dialog popover>` を用いたが、ちょうどこれを書いている中で、 `<dialog>` 自体に Light Dismiss 機能を付与する提案の Intents が 2Chromium から出された。

- Intent to Prototype: Dialog light dismiss
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eDXEmWB7Xo8

これを用いると、また実装の方法は変わるかもしれない。


## 議論途上の仕様と推奨

今回は Tooltip/Toggletip に関する実装の方針を、もう少し具体的に示すつもりで始めたが、特にセマンティクスの付与の仕方については、さまざまな議論があり、結論が出ていないのが現状だ。

もし仮に APG に該当の推奨があれば大いに参考にできるのだが、長いこと議論が止まっており、現在公開されているものも、合意の結果の推奨とは言えないものだ。

そして、 APG にパターンを記載するために必要な `role=tooltip` などの議論は、 ARIA/HTMLWG/CSSWG/OpenUI と多岐にわたっているため、追うのもなかなか難しい。

今回、この記事を書くにあたって、議論がどのように依存しているのかを把握する必要があり、グラフにまとめたものが以下だ。

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/zvYhQly2JFR6A7fhDyTJCj/Tooltip-Discussion-Dependencies?node-id=0-1&embed-host=share" allowfullscreen></iframe>

議論は続いているというよりは停滞しており、みんなすでに飽きて `<select>` などの次の議論が盛り上がっているように思える。

Popover / Dialog 自体も、まだまだ固まっていない仕様や提案が残っているため、それらがある程度まとまってから、よりはっきりとした実装手法を示すために、この記事の更新版を出すことにする。よって、今回の DEMO コードは公開しないでおく。