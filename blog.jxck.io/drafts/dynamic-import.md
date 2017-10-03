# ES Modules Dynamic Import で HTML Imports

## Intro

ES Modules の Dynamic Import が Chrome Canary, Safari 11 で Ship されている。

これを使って HTML Imports が実現できるかを検証した。


## Dynamic Import

ES Modules では、既に紹介したように `import` 構文による Static Import がある。

一方、関数を呼び出すようなイメージで、動的なインポートを行うのが Dynamic Import である。


```js
```


## Lazy Import

static import は、パース時に依存がわかるためそこで依存が解決される。

しかし、 dynamic import を用いると、この読み込みを必要になってから行うことができる。

例えば、ユーザがフォームを Submit した場合のみ必要な validation 用のライブラリがあったとする。

これは、 Submit しないユーザには不要であると考えれば、このように書くことができる

```js
// submit しなかった場合はライブラリを読み込まない
form.addEventListener('submit', async (e) => {
  {default: validation} = await import('./validation.mjs');
  // snip
});
```

あまりにも依存解決に時間がかかり、初期表示に影響するような場面では、こうした設計が有効な場合がある。


## Dynamic Polyfill

使いたい API のブラウザ実装が揃っておらず、実装差分を埋める必要がある場合。

API が存在する場合はそれを使い、無い場合は Polyfill モジュールを動的に読み込むということができる。


```js
// fetch がある場合は import されない
fetch = fetch ? fetch: await import('./fetch-polyfill-modules.mjs')

const res = await fetch('/')
```

これまでは、全てのブラウザ向けに必要な可能性のある Polyfill を全て bundle したファイルを配る場合が多かった。
この方法が実現すれば、実装が揃っているブラウザでは Polyfill の分だけサイズを減らすことができる。


## HTML Imports

Mozilla が実装を見送ると発表していた HTML Imports だが




















# HTML Imports and ES Modules

Once the [`<script type="module">`](https://github.com/whatwg/html/pull/443) support ships in the browsers, the native [ES](https://tc39.github.io/ecma262/) Modules support will come to the Web Platform. Now seems like a good time to consider what this means for [HTML Imports](http://w3c.github.io/webcomponents/spec/imports/). Here are a couple of thoughts and rough ideas.

いったん<script type="module">ブラウザでサポート船、ネイティブESモジュールのサポートは、Webプラットフォームに来ます。今は、HTMLのインポートが何を意味するかを考える良い機会に思えます。ここには2つの考えと大まかなアイデアがあります。



## Use Cases

*Package a component.* Web components comprise HTML, script, styles, images and other resources. They can be developed independently and composed in the DOM with custom elements and shadow DOM. For this reason it makes sense to keep the markup, styles, etc. of a component together. Web components should be convenient to pull in. Web components may depend on other components. Because they may also depend on script libraries the method of loading should be harmonized with ES modules. ES modules alone are not sufficient ES modules are not a good vehicle for markup and styles which can be parsed, etc. while streaming from the network.

Components should be efficient to load, however efficient loading is not unique to components. So we consider the idea of keeping a component's related resources together a different problem to Web Packaging, HTTP/2, etc.

## Requirements

* Efficient to load and instantiate. It should be possible to asynchronously process HTML and preload dependent resources. It is OK to assume HTTP/2.
* Mixed resources: HTML, CSS, script inline. Also resources out-of-line.
* HTML markup in the module does not appear in the main document; CSS does not apply in the main document. This is analogous to template. Script should run and have access to the DOM of the module, though, because that's the way to set up web components.
* Integrated with ES module loading: ES modules can depend on HTML modules and vice versa.
* Run script. Script can get access to the components' HTML and CSS.
* Run custom elements. For example, a declarative syntax could be built out of custom elements so you'd want those elements to "run".

## Naive Integration

As currently designed, HTML Imports appear to *Just Work* with ES Modules.

今のデザインなら HMTL imports は ES Modules として動く

In this world, we treat them as two distinct things.
しかし、今は別として扱う。

One is a dependency-aware markup inclusion feature,

一つは依存によらないマークアップの包含機能

the other is a fully-featured language primitive.

ほかは、言語のプリミティブ全機能を使う

Because they are different, they work happily together, complementing each other's strengths (provided we teach each to recognize the other's dependency graph).

２つは違うので、２つはうまく動く。

お互いの強みを補完し合って楽しく一緒に働きます（それぞれが相手の依存グラフを認識するように教えれば）。




For example, you can have both `<link rel=import>` and `<script type=module>` in your main document:

`<link rel=import>` と `<script type=module>` が両方あったとして


```html
<link rel="import" href="foo.html">
...
<script type="module" url="bar.js">
```

and you can use *ES Modules* in the *HTML Imports*:

ES Modules / HTML Imports 両方使える


**in index.html:**
```html
<link rel="import" href="foo.html">
```

**in foo.html:**
```html
<script type="module">
// enjoy all benefits of ES Modules here.
import qux from "bar.js";
...
```

Using *HTML Imports* from *ES Modules* is something that is left to the userland libraries/frameworks to figure out.

ESモジュールからのHTMLインポートを使用することは、ユーザーランドのライブラリ/フレームワークに任せておくことです。

However, the main problem that I see with this approach is that it keeps the two at arm's length from each other.


しかし、私がこのアプローチで見られる主な問題は、2 つの距離を保つことです

Any cool toys and improvements that *ES Modules* bring to the table would have to be separately invented for *HTML Imports*. Bugs in either system will need to be fixed separately. We probably don't want that.

。ESモジュールがテーブルに持っていくクールなおもちゃや改良は、HTML Importのために個別に発明される必要があります。いずれのシステムのバグも個別に修正する必要があります。私たちはおそらくそれを望んでいません。




## HTML Modules

What if we could reimagine HTML Imports on top of ES Modules? Given that the ES spec was designed to accommodate all kinds of scenarios, it looks like it might be fairly straightforward to just rebuild HTML Imports functionality using the ES Modules plumbing.


ESモジュールの上でHTMLのインポートを再構築できたらどうなりますか？ES仕様はすべての種類のシナリオに対応するように設計されているため、ESモジュールを使用してHTMLインポート機能を再構築するだけで簡単です。



The key bit is introducing a concrete [Module Record](https://tc39.github.io/ecma262/#sec-abstract-module-records) subclass, that represents an HTML Import.

鍵は、HTMLインポートを表す抽象 Module Record サブクラスを導入することです。

 This will be a peer to the [Source Text Module Record](https://tc39.github.io/ecma262/#sec-source-text-module-records), which is the only concrete *Module Record* subclass defined in the ES spec.

これは Source Text Module Record のピアになります。これは、ES仕様で定義された唯一の具体的なモジュールレコードサブクラスです。



Let's call this subclass the **HTML Module Record**.

このサブクラスをHTMLモジュールレコードと呼ぶことにしましょう。


There are two ways the *HTML Module Record* could be generated:

HTMLモジュールレコードを生成するには、次の2つの方法があります。


1. From the `<link rel="import" href="[url]">` statement (hey, maybe it's even just a `<script type="module" src="[url]">`!), and
2. From the  ES `import` statement.


The HTML spec will handle generation of both, leaning heavily on the `<script type="module">` [plumbing](https://github.com/whatwg/html/pull/443).

HTML仕様は、両方の生成を処理し、<script type="module"> 配管に大きく傾いています。


It will need to be modified to spit out an *HTML Module Record* for the corresponding `HTMLLinkElement`, following the same "defer-like" semantics as `<script type="module">`. These semantics will need to be adjusted to treat the host HTML document as a module itself: create an *HTML Module Record* for it and list each of these newly created records as `[[RequestedModules]]`.

対応するHTMLモジュールレコードを吐き出すように変更する必要があります。これはHTMLLinkElement、「遅延のような」セマンティクスと同じ<script type="module">です。これらのセマンティクスは、ホストHTMLドキュメントをモジュール自体として扱うために調整する必要があります。HTMLモジュールレコードを作成し、これらの新しく作成されたレコードをそれぞれリストとして表示し[[RequestedModules]]ます。



The *HostResolveImportedModule* method will need to be modified to treat the URLs, ending with `.html` specially (or use content type?). These will also result in creating an *HTML Module Record*.

HostResolveImportedModuleの方法はで終わる、URLを処理するために変更する必要があります.html特別に（またはコンテンツタイプを使うのか？）。これらの結果、HTMLモジュールレコードが作成されます。





The record itself will be created by the *ParseHTMLModule* spec operation, which will invoke the HTML parser and construct the HTML Document for the HTML Module, queueing custom element callbacks accordingly. There's a really hairy question of whether this method would be a clean-slate thing, where all legacy scripts (non-modules) have defer-like semantics and how that interacts with the notion of treating the main document as an HTML Module itself. Or maybe even legacy scripts are prohibited entirely? I will conveniently wave my hands here.

レコード自体は、ParseHTMLModule specオペレーションによって作成されます。これは、HTMLパーサを呼び出して、HTMLモジュールのHTMLドキュメントを構築し、カスタム要素コールバックをそれに応じてキューに入れます。このメソッドが、すべてのレガシースクリプト（非モジュール）が遅延型セマンティクスを持ち、メイン文書をHTMLモジュールとして扱うという考え方とどのように相互作用するのか、というこの方法がクリーンスレートのものであるかどうかという、本当に毛深い疑問があります。あるいは、レガシースクリプトも完全に禁止されていますか？私は便利にここに手を振るだろう。



The *ParseHTMLModule* operation will also populate *HTML Modules Record* field `[[RequestedModules]]`, which is a list of *ModuleSpecifier*s, one for each `<link rel="import" href="[ModuleSpecifier]">` and `<script type="module" src="[ModuleSpecifier]">`.

また、ParseHTMLModule操作では、ModuleSpecifierのリストであるHTML Modules Recordフィールドに[[RequestedModules]]、それぞれと。<link rel="import" href="[ModuleSpecifier]"><script type="module" src="[ModuleSpecifier]">




Sketching it out further, the *HTML Module Record*'s concrete implementations of the *Module Record* methods could look as follows:

それをさらにスケッチすると、HTMLモジュールレコードのモジュールレコードメソッドの具体的な実装は、次のようになります。




* *GetExportedNames* would only return `default`.

GetExportedNamesは返されdefaultます。



* *ResolveExport* will return the HTML Module's document as the `default` export.

ResolveExportは、HTMLモジュールの文書をdefaultエクスポートとして返します。



* *ModuleDeclarationInstantiation* will invoke `ModuleDeclarationInstantiation` on  every member in [[RequestedModules]].

ModuleDeclarationInstantiationはModuleDeclarationInstantiation[[RequestedModules]]内のすべてのメンバーで呼び出されます。




* Per ES spec, `ModuleEvaluation` will invoke the `ModuleEvaluation` on the *RequestedModules*, as well as do something good about those custom element callbacks and legacy scripts that were accumulated when running the *ParseHTMLModule* method.

Per ES仕様でModuleEvaluationはModuleEvaluation、RequestedModulesを呼び出すだけでなく、ParseHTMLModuleメソッドの実行時に蓄積されたカスタム要素のコールバックやレガシースクリプトについても何か良いことをします。







## Rousing Call to Action?

Despite the extreme sketchiness of this, er... sketch, I hope it makes sense (at least to readers familiar with the [ES spec](https://tc39.github.io/ecma262/)) that this approach effectively replaces **all** of the HTML Imports machinery with straight-up ES Modules plumbing and leaves only a handful of HTML-specific bits, integrated harmoniously the way ES Modules gods intended. If we're total overachievers, these bits could potentially be the same bits that power `<script type="module">` in the main document, but that's not strictly a requirement.

The devil is, as usual, in the details. I alluded to this in the few questions, sprinkled through the sketch, but there are definitely more problems to solve.

For example, HTML Imports today use incremental dependency evaluation that enables better parallelization of imports in realistic network conditions. Switching to the ES Modules would mean giving up on that. Granted, ES modules should do this [anyway](https://github.com/whatwg/loader/issues/85).

Similarly, HTML Modules would need to figure out whether to even care about the "legacy scripts". That would mean a breaking change as compared to the current implementation.

However, I am optimistic. Getting everyone together into the same boat means that we are lining up to solve a much more overlapping set of problems and challenges, and I can't help but hope that this means we will get a better product in the hands of developers, sooner.

このアプローチが、すべてのHTML Imports機械をまっすぐに伸びているESモジュールの配管と葉だけに置き換えることは意味があると思います（少なくともES仕様に精通している読者には）いくつかのHTML固有のビットは、ESモジュールの神の意図と調和しています。もし私たちが超過しているとすれば、これらのビットはメイン文書のパワーと同じビットである可能性がありますが、これは厳密な要件ではありません。<script type="module">

悪魔は、いつものように詳細にあります。私はスケッチを振りかざしたいくつかの質問でこれを暗示しましたが、解決すべき問題は間違いありません。

たとえば、今日のHTMLインポートでは、現実的なネットワーク条件でのインポートのより良い並列化を可能にするインクリメンタルな依存性評価が使用されています。ESモジュールに切り替えることは、それをあきらめることです。確かに、ESモジュールはこれをとにかく行うべきです。

同様に、HTMLモジュールは、「レガシースクリプト」を気にするかどうかを判断する必要があります。これは現在の実装と比較して大きな変化を意味します。

しかし、私は楽観的です。みんなを同じボートにまとめるということは、もっと重複している問題や課題を解決するために並んでいることを意味します。私たちがより早くより良い製品を開発者に提供できることを願っています。
