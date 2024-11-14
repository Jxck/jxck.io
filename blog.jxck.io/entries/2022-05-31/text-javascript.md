# [ietf][http][javascript] JavaScript のメディアタイプと RFC 9239

## Intro

長いこと作業が行われていた JavaScript の MIME タイプについての作業が完了し、RFC 9239 として公開された。

これにより、推奨される MIME タイプが `text/javascript` に統一されることになった。

かつて推奨されていた `application/javascript` ではなくなった経緯などを踏まえ、解説する。


## JavaScript MIME Types

HTTP で Response する際に指定する `Content-Type` は、その内容がなんであるかを Client に Indicate し、適切な処理を促すために使用される。

例えば HTML が `text/html` であったりするように、JS も内容はテキストなので `text/javascript` が自然に思える。

しかし、例えば MS が実装していた JS 互換の JScript は `text/jscript` となり、JS がまだ Netscape で LiveScript と呼ばれていた時代は `text/livescript` になる。

また、かつて Netscape は JS の実装にも他の言語のように Version を振っていた時代があり(これは ECMAScript のバージョンとは異なる)、そこでは `text/javascript1.0` などとなる。

そんなこんなで、歴史的に様々な指定があったが、現在それらは ECMAScript として互換を吸収(全てではないが)し、単一の JS エンジンで実行されることとなった、要するに歴史的に JS の `Content-Type` には亜種がたくさんあるのだ。

- `text/ecmascript`
- `text/javascript`
- `text/javascript1.0`
- `text/javascript1.1`
- `text/javascript1.2`
- `text/javascript1.3`
- `text/javascript1.4`
- `text/javascript1.5`
- `text/jscript`
- `text/livescript`
- `text/x-ecmascript`
- `text/x-javascript`

ただし、JS は単なるテキストファイルではなく、実行されるプログラムであることから、`text/javascript` ではなく `application/javascript` が適切とも言える(swf が `application/x-shockwave-flash` だったように)。

そして、そこにも同じように亜種がある。

- `application/ecmascript`
- `application/javascript`
- `application/x-ecmascript`
- `application/x-javascript`

WHATWG では、MIME Sniffing の仕様にこのリストがある。

- https://mimesniff.spec.whatwg.org/#javascript-mime-type


## RFC 4329  Scripting Media Types

このような乱立を踏まえ、2006 年に ECMAScript / JavaScript の MIME Type に対する Informational な RFC が公開された。

この RFC では、「様々な MIME Type が適当に使われているが、その中できちんと推奨を決めて IANA に登録しよう」という趣旨のものだ。

- RFC 4329 - Scripting Media Types
  - https://datatracker.ietf.org/doc/html/rfc4329#section-7.2

この中では

> Use of the "text" top-level type for this kind of content is known to be problematic

とされており、以下の 2 つが *"obsolete"* とされた。

- `text/javascript`
- `text/ecmascript`

代わりに、以下の利用が推奨(SHOULD)とされている。

- `application/javascript`
- `application/ecmascript`

これは、「Media Type はこう使う」という部分のルールを定めた RFC 4288 (のちに更新され RFC 6838 になる)にあるルールに則ったものだ。

- RFC 4288: Media Type Specifications and Registration Procedures
  - https://www.rfc-editor.org/rfc/rfc4288.html


## HTML Standard

しかし、だからといってブラウザがこの 2 つしかサポートしないというわけにはいかない。もし、そうしてしまえば、過去に動いていたスクリプトが突然動かなくなってしまうため、結局実装を絞ることはできない。また、一方で IE9 以前は `application/javascript` をサポートしていなかったため、デプロイ側でも `text/javascript` の利用が一般的となっていた。

そうした現実を反映する意味でも、HTML の仕様では以下のように書かれていた。

> Similarly, the MIME type used to refer to JavaScript in this specification is `text/javascript`,
> since that is the most commonly used type,
> despite it being an officially obsoleted type according to RFC 4329.
> --- https://github.com/whatwg/html/pull/7938

> Servers should use `text/javascript` for JavaScript resources.
> Servers should not use other JavaScript MIME types for JavaScript resources,
> and must not use non-JavaScript MIME types.
> --- https://github.com/whatwg/html/pull/7938

つまり、IETF と WHATWG で言ってることが違うという状況だ。IETF はインターネット全般でのプロトコルを対象とし、WHATWG はブラウザ特有の話なので、両者に細かな違いが起こるのは「見ているところが違う」という点ではしかたがない。ただ、JS のユースケースを考えると、なんとかしたいところではある。


## RFC 9239: Updates to ECMAScript Media Types

こうした状況に対して、数年前から RFC 4329 の更新作業が始まり、先日 RFC 9239 が公開された。

- RFC 9239: Updates to ECMAScript Media Types
  - https://www.rfc-editor.org/rfc/rfc9239.html

この中では、JS の MIME Type のみにフォーカスして、現状が整理されている。まとめるとこうだ。

- RFC 4329 は `text/javascript` を obsolete して `application/javascript` を使うように促した
- でも結局そうはならなかった
- そことの互換を守るために `text/javascript` を common usage として認める
- 他全部は `text/javascript` のエイリアスとして obsolete する

これにともなって HTML 側の仕様も以下のように更新された。

> Servers should use text/javascript for JavaScript resources, in accordance with Updates to ECMAScript Media Types.
> Servers should not use other JavaScript MIME types for JavaScript resources, and must not use non-JavaScript MIME types. [RFC9239]
> --- https://html.spec.whatwg.org/multipage/scripting.html#scriptingLanguages

結論として、JS の MIME Type は `text/javascript` ということになったのだ。

また、よく勘違いされるが WHATWG では「ブラウザは JS を必ず実装しないといけない」とも「ブラウザは JS 以外を実装してはいけない」とも言ってない。そして、もし別の言語を実装する場合は、この失敗を繰り返さないように `application/*` をきちんと付与するべきという点も RFC で言及されている。


## Encoding Charset

RFC 6838 では同時に、`text/*` では `charset` パラメータの併用を推奨しており、それに従うと `text/javascript; charset=utf8` のようになる。

しかし、RFC 9239 では `charset` もオプションとなっている。

ここをちゃんと解説すると長くなるが、要するに UTF-8 を使えということだ。


## ES Modules

ES Modules の登場により、JS は ES Module の有無によって 2 つに分かれてしまった。どちらで解釈するべきかは、JS をパースする前に知っておく必要がある。

そこで、ES Module を標準化する際に `text/es-modules` といった MIME Type による情報の付与を行うかどうかという議論になる。しかし、TC39 では「それは Media Type の Scope ではない」ということになった。(個人的には、これをやり始めると、実質 JS にバージョンがあるのと同じような状況になり、新しい文法が互換を壊しても MIME を変えれば良い、という前例を作ることになるために避けられたのだろうと思っている)。

つまり、`text/javascript` は ES Module であろうとも変わらないことが明示された。

この情報を提供するために、Node や Deno は `.mjs` をはじめとした拡張子や package.json などをサポートし、ブラウザの場合は `<script type=modules>` によってそれを知らせることになった。


## Outro

JS の MIME Type は (ES Modules であろうとなかろうと) `text/javascript` になり、UTF-8 でエンコードすべき、となった。


## DEMO

- 本サイトが h2o デフォルトで `application/javascript` であったため `text/javascript` に修正。
- h2o に Issue/PR 済み [#3027](https://github.com/h2o/h2o/issues/3027)


## Resources

- Spec
  - RFC 9239: Updates to ECMAScript Media Types
    - https://www.rfc-editor.org/rfc/rfc9239
  - RFC 4329: Scripting Media Types
    - https://www.rfc-editor.org/rfc/rfc4329
  - RFC 6838: Media Type Specifications and Registration Procedures
    - https://www.rfc-editor.org/rfc/rfc6838.html
  - RFC 4288: Media Type Specifications and Registration Procedures
    - https://www.rfc-editor.org/rfc/rfc4288
  - HTML Standard | 4.12.1.2 Scripting languages
    - https://html.spec.whatwg.org/multipage/scripting.html#scriptingLanguages
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - Issue #3027 - h2o/h2o
    - https://github.com/h2o/h2o/issues/3027
- Other