# [dom][html] Element.toggleAttribute

## Intro

非常にシンプルかつミッシングピースだった Element.toggleAttribute という仕様が提案された。

最近になって各ブラウザが一斉に実装を進め、リリースに向けたアナウンスが出始めている。

この仕様について解説する。


## Boolean Attributes

Boolean Attribute とは、属性の存在によって真偽となる属性である。

- <https://html.spec.whatwg.org/#boolean-attribute>

例えば button の disabled を例にとるとこうなる。

button を disabled にする場合は、仕様上は以下の 3 つの書き方がある。


```html
<!-- 属性のみを書く -->
<button id=target disabled>toggle target</button>

<!-- 値をempty string にする -->
<button id=target disabled="">toggle target</button>

<!-- 属性名と同じにする -->
<button id=target disabled=disabled>toggle target</button>
```

値に `true`, `false` などを設定することで有効無効が切り替わるわけではなく、仕様上は許可されていない点に注意したい。

disabled 属性自体は JS から真偽値で操作できる。


```js
target.disabled = true
target.disabled = false
```

しかし、他の boolean attribute も含め、属性自体を汎用的に操作する場合は以下のようになる。


```js
target.setAttribute("disabled", "");
target.removeAttribute("disabled");

target.setAttribute("disabled", false); // 無効になるわけではない
```

無効にする場合は、属性自体を消す(omit)という点は、直感に反するところもあるかもしれない。

これをもう少し直感的にするために、引数を boolean にできる API があっても良いのではとして提案されたのが始まりだ。


## Element.toggleAttribute

結果的には以下のような API に落ち着いた。

属性名を指定して toggleAttribute を呼べば、 ture/false を切り替えられる。

(値は empty string が採用された)


```js
// target = <button id=target>toggle target</button>

target.toggleAttribute("disabled") // => <button id="target" disabled="">toggle target</button>
console.log(target.disabled) // true

target.toggleAttribute("disabled") // => <button id="target">toggle target</button>
console.log(target.disabled) // false

target.toggleAttribute("disabled") // => <button id="target" disabled="">toggle target</button>
console.log(target.disabled) // true
```

第二引数を指定すると、現在の値に関わらず、第二引数の値に変更する。


```js
// 今が true であれ false であれ true にする
target.toggleAttribute("disabled", true)
console.log(target.disabled) // true

// 今が true であれ false であれ false にする
target.toggleAttribute("disabled", false)
console.log(target.disabled) // false
```


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/toggleAttribute/index.html>


## Proposal

この機能の提案は 2017/5/23 に以下の issue で行われた。

[Consider boolean interface for properties - Issue #461 - whatwg/dom](https://github.com/whatwg/dom/issues/461)

Boolean 専用の setAttribute が欲しいというところから始まり、議論の末に名前などが代わり 5 月のうちにはおよそ今の形におちついた。

その後 Anne が `needs implementer interest` というラベルをつけて、そこから一年間は反応がなかった。

先月(2018/6)に入って、 Firefox, Chrome, Edge あたりが positive な反応を示し、同時に DOM の仕様への PR が作られる。

[Add toggleAttribute to Element. by jonathanKingston - Pull Request #656 - whatwg/dom](https://github.com/whatwg/dom/pull/656)

そこから一気に実装が始まった。


## Implementation

Firefox は 61 をターゲットに intents を出している

- <https://groups.google.com/forum/#!msg/mozilla.dev.platform/wwU0TW80u1g/X_V3091yCAAJ>
- <https://bugzilla.mozilla.org/show_bug.cgi?id=1469592>

Chrome は intent to implement が出ており canary には入ってる。

- <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mAWBTaANvmE/OgaCRH04BAAJ>
- <https://bugs.chromium.org/p/chromium/issues/detail?id=854960>

safari は TP61 に入った

- <https://webkit.org/blog/8365/release-notes-for-safari-technology-preview-61/>
- <https://trac.webkit.org/changeset/233475/webkit/>

Edge もやっていると思われるが、トラックできるソースは見つからなかった。


## Outro

jQuery を始めとするライブラリなどにはよく実装されていたが、標準の範囲においてミッシングピースではあった。

今回は単純な機能なためか、かなりの速さで策定と実装が進み、先月くらいから立て続けにアナウンスが出てきたので、スピード感があったため印象に残っている。
