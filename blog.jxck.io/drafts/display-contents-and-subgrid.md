# display: contents と subgrid

## Intro

Flex や Grid を用いたレイアウトは、そのアルゴリズムを子孫要素まで伝搬させることができなかった。

その場合 `display: contents` を用いて、途中に入る子要素を無視してレイアウトを子孫に伝搬することができる。

これでおおよその目的は達成できるが、一方で Grid Layout Lv2 では `display: subgrid` の策定が検討されている。

各方法の違いについて解説する。


## flex/grid の制限

flexbox や grid の対象になる要素は、直接の子要素のみとなっている。

例えば、以下のような構造であれば Child 1~4 は全て対象だ。

```html
<div class="container space-around">
  <div class=child>Child 1</div>
  <div class=child>Child 2</div>
  <div class=child>Child 3</div>
  <div class=child>Child 4</div>
</div>
```


しかし、以下のような構造では、 Child 2/3 は対象とはならない。


```html
<div class="container space-around">
  <div class=child>Child 1</div>
  <div class=child-container>
    <div class=child>Child 2</div>
    <div class=child>Child 3</div>
  </div>
  <div class=child>Child 4</div>
</div>
```

## display: contents

同等のスタイルにするためには、 `.child-container` 以下をさらに flex/grid にする必要がある。

Child1~4 を全てを同じレイアウトにしたいが、セマンティクスの問題で `div.child-container` が HTML 上は必要であるという点が重要だ。

もしここで、 `div.child-container` は、「セマンティクスのために必要なのであり、レイアウトに影響する Box を生成することを意図していない」と捉えることができる。

CSS の `display: contents` は、こうした要素に対して 「Box を生成しない」要素とするためのプロパティである。

「レイアウト(見た目)のため」ではなく、あくまでも「コンテンツ(セマンティクス)のため」という趣旨を明示するためのプロパティと見ることができる。


## display: subgrid


