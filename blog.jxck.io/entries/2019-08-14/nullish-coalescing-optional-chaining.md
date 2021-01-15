# [tc39][javascript] Nullish Coalescing と Optional Chaining


## Intro

JS における null/undefined の扱い改善するための 2 つの機能が提案されている。

- [Nullish Coalescing Operator (stage 3)](https://github.com/tc39/proposal-nullish-coalescing)
- [Optional Chaining Operator (stage 3)](https://github.com/TC39/proposal-optional-chaining)

いずれも Stage 3 に進み、実装も始まっているので、現時点での解説を行う。


## Nullish Coalescing

対象が null/undefined だった場合にデフォルト値を返したいといった場合を考える。


```js
function main(option) {
  option.param = option.param || 'default'
}

main({param : 'hello'})
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

そこで提案されたのが `??` という Null Coalescing Operator だ。(日本語だと Null 結合演算子になるのだろうか?)

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

パラメータの初期化などで、 null/undefined 以外の falsy な値を尊重しつつデフォルトを決めるといったケースに使うことができる。


```js
function main(option) {
  option.message  = option.message ?? 'default message'
  option.timeout  = option.timeout ?? 100
  option.flag     = option.flag    ?? true
  option.logging  = {debug: true}

  cosnole.log(option)
}

main({
 message: '',
 timeout: 0,
 flag:    false,
})
```


## Optional Chaining

null に対するプロパティアクセスはエラーとなるため、それを防ぐためには一度チェックを行う必要がある。


```js
if (a !== null) {
  a.b()
}
```

アクセスできない場合 `undefined` を返すように三項演算子で書くとこうなる。


```js
const result = (a !== null) ? a.b() : undefined
```

このショートハンドとしてアクセサの直前に `?` を書くことができるようなるのがこの提案だ。


```js
a?.b   // a == null ? undefined : a.b
a?.b() // a == null ? undefined : a.b()
a?.[x] // a == null ? undefined : a[x]
```

プロパティ以外にも、単体の関数を呼ぶ場合も利用可能だ。


```js
a?.() // a == null ? undefined : a()
```


## Short Circuiting

以下のように Chain しても、途中で `undefined` に対する呼び出しになってエラーになったりはしない。


```js
a = null
a?.b?.c() // a? で undefined になるが、後続の .b? がエラーになるわけではない
```

これは `?.` の左側(left-hand side)が null/undefined と評価された時点で全体の評価が決定し、 `?.` の右側(right-hand side) は評価されていないからだ。

したがって、以下のように副作用のある処理も実行されない。


```js
a = null
a?.b[x++] // ?. より右は実行されず x は増えない
```

この挙動を Short Circuting と言う。

もし Short Circuit を止めて、評価を実行したい場合は、対象を括弧でくくればその範囲のみに限定することもできる。


```js
(a?.b).c // a が null でも .c は実行される
```


## nullable と optional

こんなコードを考えてみる。


```html
<body>
  <code class='highlight language-js'>
    console.log('hello')
  </code>
</body>
<script>
const lang = document.querySelector('code') // <code>
                     .classList             // [highlight, language-js]
                     .item(1)               // language-js
                     .split('-')[1]         // [language, js][1]
                     .toUpperCase()         // JS

console.log(lang) // JS
</script>
```

このコードをそのままブラウザで走らせれば、 JS が期待している DOM が確実にあるため問題なく動くだろう。

しかし、型を厳密に考えると `querySelector()` や `item()` は nullable であり、配列の範囲外の添字アクセスは `undefined` を返す。

したがって、チェインのどこかが null/undefined になれば破綻するため、そこをケアするには各段階で確認する必要がある。

色々書き方はあるが、雑に書くとこういうことだ。


```html
<body>
  <code class='highlight language-js'>
    console.log('hello')
  </code>
</body>
<script>
const $code = document.querySelector('code') // <code>
if ($code) {
  const secondClass = $code.classList.item(1) // language-js
  if (secondClass) {
    const lowerLanguage = secondClass.split('-')[1] // js
    if (lowerLanguage) {
      const lang = lowerLanguage.toUpperCase() // JS
      console.log(lang)
    }
  }
}
</script>
```

なお、本来は全ての `if` に対し、前提が崩れていた際の `else` が必要であるが、ここでは省略している。

大抵の DOM 操作はこの `else` 部分はもとより、 `if` 部分すら書かず、暗黙の前提を置いている場合も多い。

TypeScript を使うと、この `if` を通して `null` を剥がさないとエラーになるため、これを書く場合も増えてきた。

しかし `else` は、書いたところでできることが少なく、共通のエラーを表示する程度な場合も多いだろう。

Optional Chaining を使うと以下のようになる。


```html
<body>
  <code class='highlight language-js'>
    console.log('hello')
  </code>
</body>
<script>
const lang = document.querySelector('code')? // node が無ければ null
                     .classList.item(1)?     // 2 つめの class が無ければ null
                     .split('-')[1]?         // 2 つめの 分割結果が無ければ undefined
                     .toUpperCase()

if (lang === undefined) {
  cosnole.error('something wrong')
} else {
  console.log(lang)
}
</script>
```

最後の `lang` は全ての前提が揃った場合に `"JS"` が入り、どこかが破綻すると `undefined` になる。

ここでの `undefined` の処理は、前述の `if` 版で省略されている `else` の処理にあたる。

つまり、 Optional Chaining は、こうした `null` を考慮すべき処理の連続を、全て if-else で分岐しつつケアする代わりに、一連の処理をつなげ結果を期待した値 or `undefined` に丸め込んで結果を検証するといった書き方を可能とする。

もしこのケースで、存在しない場合の lang をデフォルトで `"TEXT"` にしたい場合は、前述の Nullish Coalescing と組み合わせると以下のように書ける。


```js
const lang = document.querySelector('code')? // node が無ければ null
                     .classList.item(1)?     // 2 つめの class が無ければ null
                     .split('-')[1]?         // 2 つめの 分割結果が無ければ undefined
                     .toUpperCase()          // どこかで失敗していれば undefined
                     ?? 'TEXT'               // undefined だった場合のデフォルト値

console.log(lang) // "JS" or "TEXT"
```

どこまでを一連の Optional でくくるか、途中の処理の結果の型は何か、といった設計に注意すればかなり便利に使えるだろう。

他の言語で、何かしら似たような、そしておそらくもっと高機能な機能と比べれば至らない部分も多だろうが、無いことろ比べればだいぶマシになりそうだ。


## 実装

どちらもトランスパイルしやすい仕様なので、各ツールでは以前から実装されており、探せば色々出てくるだろう。

ブラウザについては以下だ。


### Nullish Coalescing

Safari TP89 に入っているが、有効にするには Runtime Flag が必要だった。

- [Release Notes for Safari Technology Preview 89](https://webkit.org/blog/9497/release-notes-for-safari-technology-preview-89/)

Mac の場合 JSC のフラグは以下のように付与する。


```sh-session
$ __XPC_JSC_useNullishCoalescing=true open -a 'Safari Technology Preview'
```


### Optional Chaining

Intents は出ているが現時点の Chrome Canary では動かなかった。

- [Intent to Implement: JavaScript Optional Chaining](https://groups.google.com/a/chromium.org/d/msg/blink-dev/M8-Qp_LydJc/bOl5uQ8RAAAJ)

Safari もパッチはあるが、 TP にも入っていない。


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/optional/>
