# .mjs とは何か、またはモジュールベース JS の今後


## Intro

長いこと議論になっていた es modules の Node における扱いに一応の決着が付き、 `.mjs` という拡張子が採択された。

この拡張子の意味と、今後ブラウザと合わせて i8c な JS を実装していく上での作法について解説する。


## ES Modules

徐々に揃いつつある Modules の仕様は TC39 で行われており、その仕様については主に `import` や `export` といった、構文が対象となる。

そもそも ES modules が CommonJS とは違う構文を策定したのには理由がある。


```js
// commonjs
const foo = require("./foo")
module.exports = { message: "hello world" }

// ex modules
import foo from "./foo"
export default { message: "hello world" }
```

common js は、 ES Modules 以前の JS の範囲で実装されていたため、 require 関数や modules オブジェクトへの操作を特別扱いすることで実現していた。

しかし、この方式では例えば以下のように書くことも、 JS の範囲である以上正しくなってしまう。

```js
// commonjs

let version
if (Math.random() < 0.5) {
  version = 1
} else {
  version = 2
}
const foo = require(`./foo.v${version}`);
```

これでは、実行してからでないと、 foo.v1/v2 どちらで依存解決すべきかわからない。
したがって browserify などは、こうした書き方はしないという前提でビルドを行なっていた。

ES Module は、関数やオブジェクトではなく、新しく「構文(syntax)」を用意することによって、この問題を解決している。

```js
// ex modules
import foo from "./foo"
export default { message: "hello world" }
```

構文を定義することで、パースを行なった時点で曖昧な書かれ方をしている部分をエラーとして弾くことができる。

また、パースが通るということは、正しく依存関係を把握できているということになり、実行する前に依存解決を行うことができることも意味する。

この実行しないでも良いという構文の利点は、静的解析ツールなどとも相性が良く、 CommonJS を置き換える非常に良い仕様となった。


## 実行環境における Modules の扱い

TC39 の責任範囲は、 JS ファイル内に書かれる構文が中心であり、そのファイルが実際にどう扱われるかは、実行環境の責務となる。

特に実行環境がどう扱うかについて、もっとも重要なのが、 **そもそもそのファイルが Script か Module か** の判別である。


### Modules on Browser

ブラウザにおける Module の扱いは、 HTML の範囲での仕様策定を伴う。

具体的には、 `<script>` タグの `type` 属性を用いて Script であるか Module であるかを判別することが可能だ。


```html
<script type=module src=module.js></script>
<script type=text/javascript src=analytics.js></script>
```

また、ここに加えて `nomodule` 属性を用いて「ブラウザが modules を実装しているかどうか」の判別も可能となっている。

詳しくは以下の記事で解説している。

[ES Modules への橋渡しとしての nomodule 属性](https://blog.jxck.io/entries/2017-06-21/nomodule-attribute.html)

このように、ブラウザは読み込む前にそのファイルを Script/Module どちらとしてパースするかを判断することができる。

パースが正しく終われば、あとはそのまま実行するだけなので、問題なく使うことができる。


## Modules on Node.js

Node.js においては、パース時にそのファイルが ESM/CJS どちらなかのかを判別する方法を長く議論していた。

いくつかの案があったが、代別すると 2 種類ある。

- パースする前にわかる
  - package.json に module であることを書く
  - 拡張子を `.mjs` にする
- パースしてわかる
  - ファイルの先頭に `"use module;"` と書く
  - まず ESM としてパースしてだめなら CJS としてやり直す


ブラウザと違い、ここでどれを採用するかの議論が紛糾し、長らく結論が出ずにいた。

その議論は [WRT PR #3 - ES module detection #13](https://github.com/nodejs/node-eps/issues/13) などを参照。


## .mjs for ESM

結論として Node では `.mjs` という拡張子を採用することとなった。

[3.2. Determining if source is an ES Module](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#32-determining-if-source-is-an-es-module)

これは確かに Node のためではあるが、先述の通りブラウザは拡張子に頼った判別をしていないため、今後は i8c な ESM を書く場合は `.mjs` を使うことになるだろう。

今後、あらゆるツールやライブラリは、 `.mjs` という拡張子を無視することはできないだろう。





