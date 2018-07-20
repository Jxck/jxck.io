# [dom] 一気にきた Element.toggleAttribute について

## Intro

非常にシンプルかつミッシングピースだった Element.toggleAttribute という仕様が提案された。

この仕様は、最近になって各ブラウザが一斉に実装を進め、リリースに向けたアナウンスが出始めている。

この仕様について解説する。


## Element.toggleAttribute

用途は名前から想像するままだ。

例えば button の disabled を例にとるとこうなる。

有効にする場合、値は empty string が設定され、無効にすると属性自体が消える。

属性名を指定して toggleAttribute を呼べば、 ture/false を切り替えられる。


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

- https://labs.jxck.io/toggleAttribute/index.html


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

- https://groups.google.com/forum/#!msg/mozilla.dev.platform/wwU0TW80u1g/X_V3091yCAAJ
- https://bugzilla.mozilla.org/show_bug.cgi?id=1469592

Chrome は intent to implement が出ており canary には入ってる。

- https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mAWBTaANvmE/OgaCRH04BAAJ
- https://bugs.chromium.org/p/chromium/issues/detail?id=854960

safari は TP61 に入った

- https://webkit.org/blog/8365/release-notes-for-safari-technology-preview-61/
- https://trac.webkit.org/changeset/233475/webkit/

Edge もやっていると思われるが、トラックできるソースは見つからなかった。


## Outro

シンプルでよく使う一方、標準ではなくライブラリなどにはよく実装される機能だろう。

今回は単純な機能なためか、かなりの速さで策定と実装が進み、先月くらいから立て続けにアナウンスが出てきたので、スピード感があった。
