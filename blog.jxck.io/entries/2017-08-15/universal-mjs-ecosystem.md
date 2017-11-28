# [es modules][tc39][javascript] .mjs とは何か、またはモジュールベース JS とエコシステムの今後


## Intro

長いこと議論になっていた ES Modules の Node における扱いに一応の決着が付き、 `.mjs` という拡張子が採択された。

この拡張子の意味と、今後ブラウザと合わせて Universal JS を実装していく上での作法が見えてきたことになる。

合わせてエコシステムが対応していくことで、長年の夢だった JS のモジュール化を進めていくことができるだろう。


## ES Modules

徐々に揃いつつある ES Modules(ESM) の仕様は TC39 で行われており、その仕様については主に以下のような部分になる。

- `import` や `export` と行った構文
- module 内はデフォルト strict mode
- module でスコープを閉じる
- module 内の `this` は `undefined`
- etc

逆に以下は TC39 での策定範囲外となる

- どう Module を読み込むか
- どう依存を解決するか
- etc

これは、読み込みに関わる部分は実行環境に大きく依存し、それは JS 自体が定義する問題ではないからである。

実際にブラウザと Node.js で見ても、その扱いは大きく変わってくる。


## ESM / CJS

そもそも ES modules(ESM) が CommonJS(CJS) とは違う構文を策定したのには理由がある。


```js
// commonjs
const foo = require("./foo")
module.exports = { message: "hello world" }

// ex modules
import foo from "./foo"
export default { message: "hello world" }
```

CJS は ESM 以前の JS の範囲で実装されていたため、 `require` 関数や `modules` オブジェクトへの操作を特別扱いすることで実現していた。

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

これでは、実行してからでないと、 `foo.v1`, `foo.v2` どちらで依存解決すべきかわからない。

したがって browserify などは、こうした書き方はしないという前提でビルドを行なっていた。

ESM は、関数やオブジェクトではなく、新しく「構文(syntax)」を用意することによって、この問題を解決している。


```js
// ex modules
import foo from "./foo"
export default { message: "hello world" }
```

構文を定義することで、パースを行なった時点で曖昧な書かれ方をしている部分を Syntax Error として弾くことができる。

また、パースが通るということは、正しく依存関係を把握できているということになり、実行する前に依存解決が可能であることも意味する。

この実行しないでも良いという構文の利点は、静的解析ツールなどとも相性が良く、 CJS を置き換える非常に良い仕様となった。


## 実行環境における ESM の扱い

TC39 の責任範囲は、 JS ファイル内に書かれる構文が中心であり、そのファイルが実際にどう扱われるかは、実行環境の責務となる。

特に実行環境がどう扱うかについて、もっとも重要なのが、 **そもそもそのファイルが CJS か ESM か** の判別である。

判別が正しく行えなければ、先述のデフォルト strict mode や、トップレベルの `this` を `undefined` と扱うと行った処理ができなくなるからである。

(ここでの CJS は、 `require()` や `module` を使っているかというよりも、単に ESM ではないという意味が強い)


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

パースが正しく終われば、依存を解決のために追加の Fetch を以下のように行う。

![ブラウザによる ESM の依存解決と Parse/Fetch の順番](https://html.spec.whatwg.org/images/asyncdefer.svg#1000x245 "async-defer-module <script> parsing/fetching timeline")

あとはそのまま実行するだけなので、問題なく使うことができる。


## Modules on Node.js

Node.js においては、パース時にそのファイルが ESM/CJS どちらなかのかを判別する方法を長く議論していた。

いくつかの案があったが、代別すると 2 種類ある。

- パースする前にわかる
  - package.json に module であることを書く
  - `.mjs` や `.m.js` などの拡張子にする
- パースしてわかる
  - ファイルの先頭に `"use module;"` と書く
  - 必ず `import` や `export default` を書く
  - まず ESM としてパースしてだめなら CJS としてやり直す

ブラウザと違い、ここでどれを採用するかの議論が紛糾し、長らく結論が出ずにいた。

その議論は [WRT PR #3 - ES module detection #13](https://github.com/nodejs/node-eps/issues/13) などを参照。


## .mjs for ESM

結論として Node では `.mjs` という拡張子を採用することとなった。

[3.2. Determining if source is an ES Module](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#32-determining-if-source-is-an-es-module)

これにより、 `.js` を維持したまま先に進むことができ、二回パースといったオーバーヘッドもなく、 TC39 の仕様外の独自拡張を Node が勝手に持ち込むことも防ぐことができる。

また、先述の通りブラウザは拡張子に頼った判別をしていないため、正しくマークアップをしていれば `.mjs` をブラウザ用に提供することも可能だ。

議論の中でもあったデメリットとして、これまでの多くのツール、ライブラリ、ミドルウェアなどの対応は懸念される。


### ツール

暗黙的に `.js` というファイルを JS ファイルと判断しているツールに取っては `.mjs` は単に未知のファイルとなってしまう。

特に `*.js` といった正規表現には `.mjs` は引っかからないため、注意が必要となる。

しかし、あえて `.jsm` ではなく `.mjs` が採択されたのは、こうした従来のツールが誤って CJS として ESM を扱わないようにしているという部分もある。

今後は、明示的に `.mjs` を新しい拡張子として認識するように対応を進める必要がある。

シンタックスハイライトなどは、拡張子を認識しても `import` や `export` といった構文の対応や依存解決の表示と行った周辺の挙動も合わせて対応が必要になる。


### ライブラリ

CJS で書かれた多くのライブラリは、 `.js` として作られているだろう。

しかし、これらを単に `.mjs` にリネームしたとしても `export` , `import` といった構文で修正しなければ使えない。

したがって、従来の CJS ライブラリの多くは、 ESM への移行が必要となる。

とはいえ、すぐに移行できないものや、メンテされてないものも多い。

使う側も、移行が落ち着くまではこれまでの Browserify や WebPack などを用いたビルドによる Bundle 作業が必要となるだろう。


### ミドルウェア

Web サーバなどにおいては、ファイルを配信する際に拡張子をベースに Content-Type や、配信方法の最適化などを判断しているだろう。

ここで `.mjs` という拡張子を知らないサーバは、 `octet-stream` などで配信するのが一般的である。

ESM のための MIME タイプについても、 `text/javascript+module` などといった新しいものの追加が検討されたが、現在は以下のようになっている。

[3.2.1 MIME of .mjs files](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#321-mime-of-mjs-files)

要するに、「これまでの JS と同じ MIME タイプを使う」ということになっている。

[JavaScript MIME type](https://html.spec.whatwg.org/multipage/scripting.html#javascript-mime-type)

おおよそ、よくある以下などになっていれば問題ない。

- text/javascript
- application/javascript

したがって、 Web サーバにおいては `.mjs` を従来の JS と同じように扱えるように対応すれば良いことになる。


## Universal JS の今後

仕様策定側も、最終的にはモジュールベースの ESM が基本となっている正解を想定している。

特にブラウザが、複数の JS を同一スコープで連結するといった挙動も、黎明期の JS ではまだしも、十分発展した現在の JS においえては不要となりつつある。

よって、今後開発される JS は基本的に ESM を基本としていくべきである。

この時、前述の通りブラウザは拡張子ではなく `<script type=module>` で判断しているため、 `.mjs` である必要はない。

しかし、そのモジュールが Universal JS であるならば、 `.mjs` にしておけば、少なくともブラウザと Node どちらでもモジュールとして解釈可能だ。

また、今後 Node 以外で ESM に対応した実行環境が出た場合、サーバから Fetch しても `Content-Type` では判断できない以上、この拡張子を手がかりにする実装になることが予想される。

結果、 `.mjs` で書いておくことは、前方互換性にも寄与する可能性がある。

また、これまで CJS をバンドルしていたビルドプロセスが不要になることで、 `.mjs` をそのままサーブするデプロイが進むだろう。

この場合、キャッシュなどの設定はこれまでの `bundle.js` ファイル一つの設定とは別の最適化が行われていくだろう。

こうした最適化のためにも、 `.js` と明示的に分離するための `.mjs` を使っていく方がメリットが享受しやすくなると思われる。


## まとめ

これからの JS は、 ESM を `.mjs` に書くことになり、それを前提としたエコシステムが構築されていくことが望ましいだろう。
