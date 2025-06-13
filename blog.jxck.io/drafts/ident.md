# [ident][css] CSS の ident() による動的な custom-ident の生成

## Intro

CSS で Custom Ident 値を動的に生成する `ident()` が提案されている。

策定中の仕様をベースに解説する。


## Anchor Name の動的生成

Popover の Anchoring は、`anchor-name` と `position-anchor` の組で対応付けられる。

```html
<a id=anchor>this is anchor</a>

<div popover>this is popover</div>

<style>
#anchor {
  anchor-name: --anchor;
}

[popover] {
  position-anchor: --anchor;
}
</style>
```

一方、以下のように複数の Anchor に対して、紐づけを変えながら単一の Popover DOM を再利用する場合も、全ての対象に `anchor-name` を振り、Popover の `position-anchor` を動的に変える必要がある。

```html
<ul>
  <li><a id="aaaa">anchor aaaa</a></li>
  <li><a id="bbbb">anchor bbbb</a></li>
  <li><a id="cccc">anchor cccc</a></li>
</ul>

<div popover>this is popover</div>

<style>
#aaaa { anchor-name: --aaaa; }
#bbbb { anchor-name: --bbbb; }
#cccc { anchor-name: --cccc; }

[popover] {
  position-anchor: none;
}
</style>
<script>
  const $popover = $("[popover]");
  $$("a").forEach(($a) => {
    $a.on("click", () => {
      $popover.style.positionAnchor = $a.style.anchorName;
    })
  })
</script>
```

このように `anchor-name` を全て書きあげるのは無駄が多いため、JS から動的に設定することになるだろう。

また `position-anchor` 部分を動的に紐づけるために、HTML の Anchor Attribute を定義し、Anchor の ID を指定する方針が当初はあった。

```html
<div popover anchor="aaaa">this is popover</div>
```

しかし、これは Anchor の紐づけがスタイル上の役割しか持たない場合、文書のセマンティクスではなく Presentational な側面が HTML に過度に染み出していることになるため、議論も実装も停滞していた。


### ident()

ここで `ident()` を用いると、以下のように `id` をベースとした `anchor-name` を動的に指定できる。

```css
a {
  anchor-name: ident("--" attr(id));
}
```

ハイフンを連結していることからもわかるように、CSS 中での文字列連結の仕様も包含している。

id が `<a>` ではなく `<li>` で振られている場合は、Custom Property 経由で以下のようにも定義できる。

```html
<ul>
  <li id="aaaa"><a>anchor aaaa</a></li>
  <li id="bbbb"><a>anchor bbbb</a></li>
  <li id="cccc"><a>anchor cccc</a></li>
</ul>

<style>
  li[id] {
    --id: attr[id];
    a {
      anchor-name: ident("--" var(--id));
    }
  }
</style>
```

また、`id` を個別に持ってない場合も、別途提案されている `sibling-index()` で以下のように定義できるようにも議論されている。

```css
a {
  anchor-name: ident("--" sibling-index());
}
```

これは、従来プリプロセッサで行っていたようなユースケースのカバーに繋がる。


## Usecases

`ident()` は、動的に文字列を生成しているだけではない。

生成した結果は `<custom-ident>` / `<dashed-ident>` 型の値であり、最近はこうした値を指定する API が増えているため、必然的に応用範囲はかなり広くなる。

その一個一個を実装する作業が Chromium で進んでいるため、その Issue を見るに、現在作業が進んでいる対象は以下のようだ。

- [css-values] Implement ident() [384930424]
  - https://issues.chromium.org/issues/384930424/resources
  - `anchor-name`
  - `timeline-name`
  - `container-name`
  - `@position-try`
  - `@property`

これにより、`position-anchor` のために HTML Anchor Attribute を定義するといった必要がなくなるため、今後策定される仕様でも採用されていくだろう。

なお、単に文字列の結合だけを行い、String を返したいケースのために `concat()` / `string()` も議論されている。

- [css-values] String concatentation · Issue #542 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/542


## Feature Detection

まだ議論も実装も初期段階だが、このままの構文でいくのであれば以下のように detection できる。

```js
CSS.supports("--id: ident(var(--name))")
```

```css
@supports (--id: ident(var(--name))) {
  --id: ident(var(--name));
}
```


## Outro

View Transition や Anchor Positioning のように、かなり動きに特化した API も増えてきた。それらをコントロールするために、JS で動的に文字列を生成し、指定していく方法もあるが、それが CSS でカバーできることには一定の需要があるだろう。

実際、例え動的な動きがあろうとも、スタイルに関しては CSS に閉じている方が望ましく、あっても最小限の JS でカバーできる方が、コードベースも最適化もしやすい。そういう点で `ident()` はかなり使われていくだろう。

一方で、動的に生成される値が多くなると、懸念されるのはデバッグだ。うっかり `id` が振られてない要素が対象に含まれたが、壊れた値の原因がどこなのかがわかりにくいといったことが起こり得る。

もちろん、Devtools でのサポートが手厚くなっていくのも込で進んでいくが、逆を言えば動かさなければわからない部分が増えることを意味する。

別途策定が進んでいる `@if()` や `@function()` とも相性が良い `ident()` は、`var()` / `calc()` や `sibling-index()` / `sibling-count()` などと合わせて、便利ユーティリティ(作った時点では)を大量に生み出すだろうことが、容易に想像できる。

CSS を Step 実行したり、CSS のためのテストを書く、といった未来も近いのかもしれない。


## DEMO

仕様をベースに作成したデモを以下に用意した。

ただし執筆時点では動作するブラウザが存在しないため(Chrome Canary M139 含め)、動作は確認していない。

- https://labs.jxck.io/css/ident.html


## Resources

- Spec
  - CSS Values and Units Module Level 5
    - https://drafts.csswg.org/css-values-5/#ident
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Prototype: The ident() function
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/pAqsAGZIIjw
- Chrome Platform Status
  - The ident() function - Chrome Platform Status
    - https://chromestatus.com/feature/6230159413477376
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - [css-values] A way to dynamically construct custom-ident and dashed-ident values · Issue #9141 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/9141
  - [css-values] String concatentation · Issue #542 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/542
  - [ident] Implement ident() function fundamentals (6551725) · Gerrit Code Review
    - https://chromium-review.googlesource.com/c/chromium/src/+/6551725
- Other