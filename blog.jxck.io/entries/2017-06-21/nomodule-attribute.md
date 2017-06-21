# [nomodule][es modules] ES Modules への橋渡しとしての nomodule 属性

## Intro

ブラウザにおける新機能の利用においては、非対応ブラウザの考慮も必要となる。

ES Modules の利用においても、いかに非対応ブラウザでフォールバックの手段を提供するかが課題となっていた。

今回は、 Modules の対応/非対応を切り分けるための仕様である `nomodule` 属性を解説する。


## script type module

classic script (module ではない JS) は、 `<script>` で指定すると、取得解析しそのまま実行される。

type は省略されることが多いが、その場合 `text/javascript` と解釈されている。


```html
<script type=text/javascript src=bundle.js></script>
```

一方、 module script (module として実装された JS) は、 `import/export` の処理や依存の解決など、これまでと異なる扱いが必要となる。

そこで、ブラウザにおいては同じ `<script>` で指定するが、新規に導入された `type=module` を指定し、 module script であることを明示することとなった。


```html
<script type=module src=module.js></script>
```

しかし、 ES Modules に対応していないブラウザは `type=module` を知らないため、 `<script>` そのものを無視する。

結果、これだけでは何も実行されない。

かといって、両方書くと両方実行されてしまうためなんらかの切り分けの方法が必要だった。


```html
<!-- module 対応ブラウザでは両方動く -->
<script type=text/javascript src=bundle.js></script>
<script type=module src=module.js></script>
```


## nomodule

もしブラウザが ES Modules に対応していれば module script を、そうでなければ classic script を取得実行する。

これを実現するために提案されたのが、 `nomodule` 属性だ。

[nomodule attribute](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule)

例えば以下を考える。

- module script である `module.js` をベースとして提供する。
- ES Moduels 非対応ブラウザに対して WebPack などで bundle した classic script である `bundle.js` を提供する。
- どちらでも実行したい classic script の `analytics.js` を提供する。

この場合、以下のように指定できる。


```html
<script type=module src=module.js></script>
<script nomodule type=text/javascript src=bundle.js></script>
<script type=text/javascript src=analytics.js></script>
```

挙動は ES Modules 対応/非対応によって以下のようになる。


## ES Modules を実装していない場合

`type=module` と `nomodule` は知らないため無視され、以下と同等に解釈される。


```html
<script type=text/javascript src=bundle.js></script>
<script type=text/javascript src=analytics.js></script>
```


## ES Modules を実装している場合

ES Modules を実装する場合は `nomodule` の解釈が必須とされている。

したがって ES Modules に対応したとされた場合は `nomodule` が理解されているとみなす。

この場合、 `type=module` と `nomodule` を解釈し、 module script を実行する代わりに `nomodule` が指定された classic script を無視する。

結果、以下と同等に解釈される。


```html
<script type=module src=module.js></script>
<script type=text/javascript src=analytics.js></script>
```


## 運用

現時点では ES Modules で実装したコードを WebPack などでビルドした classic script を提供する運用が多いと思われる。

ここで `nomodule` の実装が行き渡れば、 ES Modules 対応ブラウザに対して、 module script のまま提供でき、本来の ES Modules のメリットを先行して享受することが可能となるだろう。

しばらくは並行運用となるだろうが、現時点で WebPack などのビルドラインを持っているなら、導入の敷居は低そうにも思える。

後方互換への手段が固まることは、安心して先に進む準備が整うことを意味するため、 ES Modules へ移行する上での橋渡しとして活用できるだろう。
