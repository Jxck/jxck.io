# [tc39][javascript] Optional Chaining と Nullish Coalescing

## Intro

JS における null/undefined の扱い改善するための 2 つの機能が提案されている。

- [Optional Chaining Operator](https://github.com/TC39/proposal-optional-chaining)
- [Nullish Coalescing Operator](https://github.com/tc39/proposal-nullish-coalescing)

仕様のステージも進み、実装も試せる段階まできているため、ここで一度解説をする。


## Optional Chaining

null に対するプロパティアクセスはエラーとなるため、それを防ぐためには一度チェックする必要がある。


```js
if (a !== null) {
  a.b()
}
```

アクセスできない場合 undefined を返すように三項演算子で書くとこうなる。


```js
const result = (a !== null) ? a.b() : undefined
```

このショートハンドとしてオブジェクトの直後に `?` を書くことができるようなるのがこの提案だ。


```js
a?.b   // a == null ? undefined : a.b
a?.b() // a == null ? undefined : a.b()
a?.[x] // a == null ? undefined : a[x]
```

プロパティ以外にも、単体の関数を呼ぶ場合も利用可能だ。


```js
a?.()  // a == null ? undefined : a()
```


## Short Circuiting

以下のように Chain しても、途中で undefined に対する呼び出しになってエラーになったりはしない。

```js
a = null
a?.b?.c()
```

これは `?.` の左側(left-hand side)が null/undefined と評価された時点で全体の評価が決定し、 `?.` の右側(right-hand side) は評価されていないからだ。

したがって、以下のように副作用のある処理も実行されない。

```js
a = null
a?.b[x++] // x は増えない
```

この挙動を Short Circuting と言う。





## 型と nullable と optional

こんなコードを考えてみる。


```html
<body>
  <main>
  </main>
</body>
<script>
const $main = document.querySelector('main')
$main.innerHTML = 'hello'
</script>
```

これは大抵の場合動くだろう。

しかし、型を厳密に考えると `querySelector()` は本来 nullable なので以下のように確認が必要だ。


```html
<body>
  <main>
  </main>
</body>
<script>
const $main = document.querySelector('main')
if ($main !== null) {
  $main.innerHTML = 'hello'
}
</script>
```

Optional Chaining を使うと以下のようになる。


```html
<body>
  <main>
  </main>
</body>
<script>
const $main = document.querySelector('main')
$main?.innerHTML = 'hello'
</script>
```

ここで `innerHTML` の結果を見ていないのは、元のコードで `else` を書いてないからだ。


<!--
多くの DOM 操作はこの if に対する else を全て想定して書かれている訳では無いのが実際だろう。

これは else に入った場合に、回復する処理が実装できないなら、共通してエラーを上げるくらいしかできることが無いからだ。

Optional Chaining は、こうした null を考慮すべき処理の連続を、全て if-else で分岐しつつケアするよりも、一連の処理をつなげ結果を期待した値 or undefined に丸め込んで結果を検証するといった書き方を可能とする。

```js
const result = document.querySelector('main')?
                       .querySelector('ul')?
                       .appendChild($li)

if (result === undefined) {
  alert('unexpected dom tree !!')
}
```

途中で undefined を返す処理(return の無い function etc)が無いことが前提とはなる。
-->



## Nullish Coalescing

対象が null/undefined だった場合にデフォルト値を返したいといった場合を考える。


```js
var param = param || 'default'
```

しかし、この場合は null/undefined 以外にも param が `0`, `false`, `''` など falsy な値の場合も上書きされてしまう。


```js
var param;

param = 100
param = param || 'default' // 100

param = null
param = param || 'default' // 'default'

param = undefined
param = param || 'default' // 'default'

param = 0
param = param || 'default' // 'default'

param = false
param = param || 'default' // 'default'

param = ''
param = param || 'default' // 'default'
```

つまり、本来は null/undefined の厳密な判定を行わなくてはいけないわけだが、プロパティごとにそれを行うのは面倒だ。

そこで提案されたのが `??` という Null Coalescing Operator だ。(日本語だと Null 結合演算子とかだろうか)

これを使うと、 null/undefined であった場合のみ上書きができる。(名前に反して null だけではない点に注意)


```js
var param;

param = 100
param = param ?? 'default' // 100

param = null
param = param ?? 'default' // 'default'

param = undefined
param = param ?? 'default' // 'default'

param = 0
param = param ?? 'default' // 0

param = false
param = param ?? 'default' // false

param = ''
param = param ?? 'default' // ''
```


## 組み合わせ

存在の検証と初期化は組み合わせやすいため、こんな書き方が可能になる。

```js
this.timeout = args?.config?.timeout ?? 1000;
```


