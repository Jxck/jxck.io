# [security] Sanitizer API


## Intro

TODO: Sanitizer API について


## ユーザ入力のエスケープ

ユーザの入力した文字列を DOM に展開するような場面では、文字列は適切にエスケープしてから DOM に展開する必要があるのは言うまでもない。

特に注意すべき点は `.innerHTML` を経由した DOM への展開で、これでのエスケープ漏れは XSS の凡例だ。


```js
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`
$div.innerHTML = user_input
```

ここで `.textContent` を用いて展開すれば、上記の例は `alert(0)` は実行されない。

しかし、ユーザが付与したであろう `<em>` もそのまま文字として展開されるため、入力に対する文章の修飾などを意識して扱う必要がある場合は、この方法は使えない。

HTML として意味を持つ文字、いわゆる HTML Special Chars (`<`, `>`, `&`, `'`, `"`) を HTML Entity に置換する方法も、同様の問題がある。

では、どうしたら安全に展開できるだろうか?


## ユーザ入力のサニタイズ

文脈によってズレもあるように思うが、ここでの「エスケープ」と「サニタイズ」の違いは以下を想定している。

エスケープ
: HTML 文字列を HTML Entity に置換する

サニタイズ
: HTML 文字列中の有害な部分を削除する

例えば先では、 `<img onerror>` による XSS が発生していたが、これは `onerror` ハンドラや、 `<img>` 自体が消えていれば、 `<em>` を残しつつも XSS を引き起こすことなく DOM 上に展開可能だろう。


```js
// ユーザ入力のまま
$div.innerHTML = `<em>hello world</em><img src="" onerror=alert(0)>`
// ユーザ入力を無害化
$div.innerHTML = `<em>hello world</em><img src="">`
```

このサニタイズを正確に行うには、結局のところ HTML をパースするしかない。

その上で、有害とみなされる種類のタグや属性を省き、無害なものは残すという処理が必要だ。

この処理を提供するライブラリとしては DOMPurify が有名だ。


```js
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`
const sanitized = DOMPurify.sanitize(user_input)
$div.innerHTML = sanitized
// `<em>hello world</em><img src="">`
```


## Sanitizer API

Sanitizer API は、このような処理をブラウザの標準 API として提供することを目的として提案されている仕様だ。

- HTML Sanitizer API
  - <https://wicg.github.io/sanitizer-api/>

ブラウザに標準として実装するモチベーションについては、 Explainer の中で説明されている。

- WICG/sanitizer-api
  - <https://github.com/WICG/sanitizer-api/>

まず DOMPurify は、十分信用に足る開発者 (cure53) によって開発され、多くのセキュリティエンジニアによってメンテナンスされているため、これでも多くのケースはカバーできるだろうし、導入しないよりは十分に安全だ。

しかし、「まだ未知の問題が存在する可能性がある」という点に対して懸念は払拭できないのも事実であり、新たな攻撃ベクターが発覚した際に、対応版がリリースされても、それが各サービスのプロダクションに即座に反映される可能性は低い。

結局のところ、 HTML に関して最もメンテされたパーサを持ち、セキュリティ的な問題が迅速に反映され、ロールアウトされ、アップデートされる実装は、 *ブラウザしかない* という一点だけでも、ブラウザが標準で提供する価値が認められる。

現状でも DOMParser などを用いてブラウザのパーサを用いてパースし、 Block List で要素などを消すことは可能だが、これを目的特化型の API として簡単に利用できるよう提供するのが、この仕様の目的のようだ。


## Interface

単に DOMPurify と同じような API が DOM に生えるだけであれば、話は終わるかもしれないが、実際にはここにも Web のセキュリティにおける知見が凝縮されている。

実際に現状定義されている仕様の API は、 DOMPurify のものとは違い、以下のようになっている。


```js
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`
const sanitizer = new Sanitizer()
$div.setHTML(user_input, sanitizer)
```

注目すべき点は DOM に生えた `setHTML()` だ。文字列と Sanitizer のオブジェクトはこの引数になっている。


## 二重パース問題

なぜこのような API になっているのかは、以下に解説されている。

TOOD: purification/explainer-strings.md at strings-explainer · otherdaniel/purification

https://github.com/otherdaniel/purification/blob/strings-explainer/explainer-strings.md

もともとは、 DOMPurify と同じように文字列を入力し、サニタイズされた文字列を出力する API はあったようだ。


```js
$div.innerHTML = Sanitizer.sanitizeToString(user_input)
```

しかし、このとき内部では入力をパースし、それを無害化して文字列にシリアライズして戻し、さらに `innerHTML` で再度パースして DOM に展開している。つまり二回パースしていることになる。

これは単に無駄な処理ではあるのだが、無駄以上の問題もある。二重パースは、一回目のパースと二回目のパースの結果が完全に同じとは限らないという問題により、 XSS をバイパスする穴が生まれることがわかっている。


## Mutation XSS via namespace confusion

二重パースを応用した攻撃は [CVE-2020-26870](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26870) として報告されており、以下のサイトでその詳細なメカニズムが解説されている。

- [Mutation XSS via namespace confusion - DOMPurify < 2.0.17 bypass - research.securitum.com](https://research.securitum.com/mutation-xss-via-mathml-mutation-dompurify-2-0-17-bypass/)

ここでは 「form のネスト」と「Foreign Content」の二つの仕様が応用されている。


### form のネスト

HTML の仕様では `<form>` は直接の子要素に `<form>` を持つことができないと[明示](https://html.spec.whatwg.org/#the-form-element)されている。

従って、以下のような HTML はパースすると二個目の `<form>` が消える。


```html
<!-- src -->
<form>A<form>B

<!-- parsed -->
<form>A
```

しかし、仕様には以下のような「[壊れたマークアップ](https://html.spec.whatwg.org/multipage/parsing.html#serialising-html-fragments:the-script-element-4:~:text=DOM.-,For%20example%2C%20consider%20the%20following%20markup%3A,%3Cform)」をパースするにあたって、ネストされた `<form>` が生成可能なことも明示されている。


```html
<!-- src -->
<form><div></form><form><input>

<!-- parsed -->
<form>
  <div>
    <form>
      <input>
    </form>
  </div>
</form>
```

バグの発見者は、この互換性のために残っているであろう不可解な仕様を知って以来、ずっと「何か攻撃に応用できるのでは?」と考えていたらしい。これだからセキュリティエンジニアには敵わない。


## Foreign Content

HTML のパーサは、三つの名前空間をサポートし、 DOM を構成する。

- HTML Name Space
- SVG Name Space
- MathML Name Space

要するに HTML をパースしてても、 SVG のタグが始まれば、そこからは SVG のコンテキストでパースを開始し、 SVG が閉じたら HTML に戻るといったイメージだ。

例えば以下の例は 2 つの `<style>` を持つ。 HTML としてパースされた `<style>` は子要素を持たないため、 `<a>ABC` は要素ではなく単なるテキストとして保持されるが、 SVG としてパースされた `<style>` は子要素を持つことができる。


```html
<!-- src -->
<style><a>ABC</style><svg><style><a>ABC

<!-- parsed -->
<style><!-- html namespace -->
  "<a>ABC" <!-- text -->
</style>
<svg><!-- svg namespace -->
  <style>
    <a>
      "ABC" <!-- text -->
    </a>
  </style>
</svg>
```

しかし、 SVG や MathML であっても、子要素を HTML としてパースする要素もある。例えば以下の場合、 `<math>` は `<style>` を MathML としてパースするが、 `<mtext>` は MathML のコンテキスでありながら `<style>` を HTML としてパースする。


```html
<!-- src -->
<math><style></style>
<mtext><style></style>

<!-- parsed -->
<math>
  <style><!-- as MathML --></style>
  <mtext>
    <style><!-- as HTML --></style>
  </mtext>
</math>
```

(一個目の `<style>` が HTML ではなく子要素を持てるので `<mtext>` もパースされている)

このような Name Space を切り替える要素を Integration Point と呼ぶ。

しかし、仕様の例外として MathML Integration Point の子要素が全て HTML になるわけではなく、例外が二つある。それが `<mglyph>` と `<malignmark>` だ。この二つは `<mtext>` の直後の場合 HTML ではなく MathML としてパースされる。


```html
<!-- src -->
<math>
  <mtext>
    <mglyph></mglyph>
    <a><mglyph>

<!-- parsed -->
<math>
  <mtext>
    <mglyph></mglyph> <!-- as MathML -->
    <a><!-- as HTML -->
      <mglyph><!-- HTML -->
    </a>
  </mtext>
</math>
```

(一個目の `<mglyph>` は MathML 、二個目は HTML としてパースされている。)


## DOMPurify Bypass

上記の二つを組み合わせて以下のような HTML を考える。


```html
<form>
<math><mtext>
</form><form>
<mglyph>
<style></math><img src onerror=alert(1)>
```

壊れたネストの `<form>` と、 `<mglyph>` がある。パースした結果は以下だ。


```html
<form><!-- as HTML -->
  <math><!-- as MathML -->
    <mtext><!-- as HTML -->
      <form>
        <mglyph><!-- as HTML -->
          <style><!-- as HTML -->
            "</math><img src onerror=alert(1)>" <!-- text -->
          </style>
        </mglyph>
      </form>
    </mtext>
  </math>
</form>
```

この HTML において、 XSS ベクタを模した `alert(1)` はあくまでも HTML としてパースされた `<style>` 下のテキストだ。したがって、 DOMPurify のロジックでは、この XSS ベクタを省くことはできず、このままの HTML を返す。

しかし、これを `innerHTML` で DOM に展開すると、今度は整形された HTML をパースすることによって、壊れてないネストした `<form>` が見つかり、それがブラウザによって省かれる。すると、以下のように展開される。


```html
<form><!-- as HTML -->
  <math><!-- as MathML -->
    <mtext><!-- as HTML -->
      <mglyph><!-- as MathML -->
        <style><!-- as MathML -->
        </style>
      </mglyph>
    </mtext>
  </math>
  <img src onerror=alert(1)>
</form>
```

`<form>` が消えたことで、 `<mglyph>` が `<mtext>` の直下に現れ、ここでは MathML のままコンテキストが切り替わらなくなる。すると、 `<style>` も MathML としてパースされ、その子要素はテキストではなく要素としてパースされる。

すると `<math>` が閉じるので、 XSS ベクタであった `<img>` が `<form>` の子要素になり HTML としてパースされ、 `alert(0)` が発火するのだ。

これ以降も、このような仕組みを応用した DOMPurify のバイパスが見つかっている。


## Sanitize API Interface

この DOMPurify の経験からわかることは以下だ。

- 2 回パースする API は危険をはらむ
- パースにはコンテキストがある

もしブラウザが API を持つ場合は、わざわざ文字列を返すのではなく、処理した結果を Document Fragment などで返せば、 `appendChild()` といった既存の API で DOM に展開することでパースを一回に抑えることが可能だ。

また、例えばパース結果をどこかの子要素として展開するなら、それは *その親要素のコンテキストでパースした結果* を求めていることになる。

以上を総合して提案された API が以下だ。


### setHTML

まず、 Sanitizer は引数として渡し、 DOM の方に「パース」と「展開」のための API として `setHTML` を追加している。

ここに展開したい文字列を渡せば、この場合 `<div>` をコンテキストとしてパースし、そのまま DOM Tree に追加することができる。

パースも一回だし、コンテキストも明示されているので、前述のような問題がおこらない。


```js
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`
const sanitizer = new Sanitizer()
$div.setHTML(user_input, sanitizer)
```

ここまでの流れがわかっていれば、 DOMPurify と全く API が違うことも、これが理にかなっていることもわかるだろう。


### sanitizeFor

直接 DOM に展開するのではなく、 DocumentFragment として取得したい場合は、別途明示的にコンテキストを指定する必要がある。

そこで、対象の文字列とコンテキストを指定する API となっているのが `sanitizeFor()` だ。


```js
const user_input = `<em>hello world</em><img src="" onerror=alert(0)>`
const sanitizer = new Sanitizer()
sanitizer.sanitizeFor("div", user_input) // DocumentFragment <div>
```

この場合は、取得した DocumentFragment から `.innerHTML` を取得すると、文字列でパース結果を取ることができるため、 DOMPurify の API に近いことも可能といえば可能だ。

しかし、その結果を再度別のノードに `.innerHTML` で展開すると、前述のような問題に戻るため、基本は DocumentFragment で保持し取り回すのが良いだろう。


### sanitize

Sanitizer API は、「文字列のパース」と「有害なものの削除」の二つを担うが、すでにパース済みの DocumentFragment があれば「有害なものの削除」の方だけを実施することも可能だ。


```js
$div.replaceChildren(s.sanitize($userDiv));
```

ユーザが展開する信用できない DocumentFragment を、サニタイズして DOM に展開し直すという場面となると、どういったユースケースがあるのかは筆者にはピンと来てないが、このように使うこともできる。


## Sanitizer Config

Sanitizer は、デフォルトで危険なものを全て削除するように設計されているが、オプションで追加の制限を課すことも可能だ。

- allowElements
- blockElements
- dropElements
- allowAttributes
- dropAttributes
- allowCustomElements
- allowComments


### Elements

要素は以下のように設定する。 `blockElement` と `dropElement` の違いは、子要素ごと消すかどうかの違いだ。


```js
const str = `hello <b><i>world</i></b>`

new Sanitizer().sanitizeFor("div", str)
// <div>hello <b><i>world</i></b></div>

new Sanitizer({allowElements: [ "b" ]}).sanitizeFor("div", str)
// <div>hello <b>world</b></div>

new Sanitizer({blockElements: [ "b" ]}).sanitizeFor("div", str)
// <div>hello <i>world</i></div>

new Sanitizer({allowElements: []}).sanitizeFor("div", str)
// <div>hello world</div>
```


### Attributes

属性の場合は単なるリストではなく AttributeMatchList を利用し、要素ごとに属性の設定を行う。ここでは `*` を用いることもできる。


```js
const str = `<span id=foo class=bar style="color: red">hello</span>`

new Sanitizer().sanitizeFor("div", str)
// <div><span id="foo" class="bar" style="color: red">hello</span></div>

new Sanitizer({allowAttributes: {"style": ["span"]}}).sanitizeFor("div", str)
// <div><span style="color: red">hello</span></div>

new Sanitizer({allowAttributes: {"style": ["p"]}}).sanitizeFor("div", str)
// <div><span>hello</span></div>

new Sanitizer({allowAttributes: {"style": ["*"]}}).sanitizeFor("div", str)
// <div><span style="color: red">hello</span></div>

new Sanitizer({dropAttributes: {"id": ["span"]}}).sanitizeFor("div", str)
// <div><span class="bar" style="color: red">hello</span></div>

new Sanitizer({allowAttributes: {}}).sanitizeFor("div", str)
// <div>hello</div>
```


## Outro

TODO:


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/sanitizer>


## Resources

- Spec
  - HTML Sanitizer API
    - <https://wicg.github.io/sanitizer-api/>
- Explainer
  - WICG/sanitizer-api/explainer.md
    - <https://github.com/WICG/sanitizer-api/blob/main/explainer.md>
- Requirements Doc
- Mozilla Standard Position
  - Mozilla Specification Positions
    - <https://mozilla.github.io/standards-positions/#sanitizer-api>
- Webkit Position
  - \[webkit-dev\] Request for Position on Sanitizer API
    - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031738.html>
- TAG Design Review
  - Early design review: Sanitizer API
    - <https://github.com/w3ctag/design-reviews/issues/619>
- Intents
  - Ready for Trial: Sanitizer API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/OrWQnXVQJ0A>
  - Intent to Prototype: Sanitizer API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MJxVZs1H5SY>
- Chrome Platform Status
  - Sanitizer API
    - <https://chromestatus.com/feature/5786893650231296>
- WPT (Web Platform Test)
- DEMO
  - HTML Sanitizer API Playground
    - <https://sanitizer-api.dev>
- Blog
- Presentation
- Issues
- Other
