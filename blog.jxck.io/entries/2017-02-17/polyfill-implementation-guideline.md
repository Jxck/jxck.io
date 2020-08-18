# [polyfill][w3c] Polyfill のあり方と Web の進化と協調するためのガイドライン

## Intro

W3C の TAG から、主にブラウザ API の Polyfill に関するドキュメントが公開された。

[Polyfills and the evolution of the Web](https://w3ctag.github.io/polyfills/)

Polyfill は便利な一方で、時として標準化の妨げになってしまう場合があるため、それを避けるために、 Polyfill 実装者、利用者、仕様策定者などが、どう振る舞うべきかという趣旨である。

今回はこの内容を元に、 Web の進化と協調する Polyfill のあり方について、主に「実装者」がどうすべきかに着目し記す。


## Web における Breaking Change

Breaking Change は、簡単に言えば *後方互換を失うことで既存のものが壊れる可能性がある変更* のことを表す。

そして、 Web における Breaking Change (*Break the Web*)、具体的には Web の標準技術について、何か追加/変更を行なったことによって既存のコンテンツが壊れることは、基本的に許されない。

また Web 上には、更新されないまま残るコンテンツも多くあるため、壊れたコンテンツ側が変更に追従すれば良いという前提を取るのが難しい。

実際にはブラウザやコンテンツの実装、セキュリティ的な理由、なんらかの問題により deprecate される API もあり、壊れるコンテンツはある。

しかし、少なくとも仕様策定が原因で発生することは無いように作業は進められる。

プラットフォームとしての Web にはバージョンが無いため、作った時に動いたものは、何か標準仕様に変更があっても動き続けることが求められるのだ。


## Polyfill

Polyfill は W3C/WHATWG や ECMA などの策定によって、次々と登場する新しい API を先取りするために、既にある API を用いて、実装の無い新しい API を「擬似的に実装する」手法をさす。

しかし、良かれと思って作られた Polyfill も、仕様が確立していないものを、あまりに先行して実装してしまうと、標準化を妨げる厄介な問題をもたらす場合がある。

もし Polyfill を作るのであれば、まず最初にその仕様が標準化プロセスにおいて、どのようなステータスなのかを確認することが重要だ。


## 仕様策定の速度

Break The Web を避けるために、 Web に新しい API を追加する作業は慎重に行われ、時間がかかることもよくある。

TAG のドキュメントでは、大まかな流れが以下のように紹介されている。

1. Idea discussion
2. Incubation
3. First native implementation (as a trial / behind flag)
4. Specification
5. Multiple interoperable implementations
6. Universal support

多くの場合、 5  と 6 の間は、実装が他よりも遅れるブラウザがあるために時間がかかる。

その間にも、新しい機能を用いたコンテツが全てのブラウザで動くように導入するのが、 Polyfill の代表的なユースケースだ。

ただし、ここでは 4 が終わっているため、 Polyfill が実装する仕様は 6 の段階で各ブラウザが提供するものと同等であり、 6 の段階に至ったら「Polyfill 自体の読み込みをやめる」だけで、他のコードは一切変更せずにネイティブの API を呼び出して動くというのが理想的な流れだ。


## Speculative Polyfill

問題を起こしやすいのは、 1 から 4 の段階、つまり仕様がきっちりと固まってない段階で、早まった API を実装した Polyfill を提供してしまうパターンだ。

これは俗に Ponyfill/Prolyfill/Nottifill などと呼ばれて[分類](https://github.com/jonathantneal/document-promises/issues/4#issuecomment-256235909) されることもあるが、いずれも問題をはらむ可能性があるということから TAG のドキュメントではこれらを総じて *Speculative Polyfill* としている。文意としては "先走った Polyfill" といったところか。

策定中の API は、クラス/メソッド名などが確定しておらず、議論や試験実装を経てそれらを変更する可能性がある。

しかし、 "先走った Polyfill" の実装が、仕様が固まる前に広まってしまい、固まる前のクラス/メッソド名が多くのコンテンツで使われてしまうと、仕様側でそれを変更するのが難しくなってしまう場合がある。

実際にこれが問題になった事例もいくつかある。


### Mootools の Array.prototype.contains

現在 `Array.prototype.includes()` として定義/実装されているものは、最初 `contains()` という名前で提案されており、実際に実装まで行われたブラウザがあった。


```js
[1, 2, 3].contains(2) // true
```

しかし、この仕様を実装したブラウザで jsfiddle が壊れてことから、そこで使われていた MooTools が問題を起こしていたことが判明した。

MooTools は早い段階から `contains()` を実装していたのだが、その実装は行儀の良いものではなかった。

具体的には、その時点で Array が実装しているメソッドをセーフリストとして定義し、当時そのリストに無かった `contains()` の Polyfill を追加した独自の Array を提供していた。


```js
('Array', Array, [
  'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
  'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight'
])
```

[Core.js#L269](https://github.com/mootools/mootools-core/blob/09b99e5886ca466480d4ae9acbb769e284f4acf1/Source/Core/Core.js#L269)

しかし、 `contains()` の実装を追加する前に `Array.prototype.contains` の存在をチェックし、存在したらスルーしていたため、そこにネイティブの実装が加わった時点で、最終的な独自の Array には、ネイティブ実装の `contains()` も Polyfill の `contains()` もない Array が提供されたというバグである。


### Shadow DOM

TAG のドキュメントでは、 ShadowDOM の `createShadowRoot()` についても言及されている。

ShadowDOM の仕様は、これまでの DOM に新しい概念を持ち込むため仕様の策定が難しく、かなりの時間を要した。

API 自体も途中で更新され、更新後を v1 としてそれまでが v0 として扱われることとなった。

その API の一つであり、非常に重要な `createShadowRoot()` は、 v1 に上がる際に open/close を値として持つ `mode` という概念を持つこととなった。

この `mode` については、どちらをデフォルトとするのかという議論があったようだが、結果として `createShadowRoot({mode})` のように、引数を必須とすることで、省略時のデフォルトを定義しない方向で策定されることとなった。

しかし、 `createShadowRoot()` は主に Google が先行して Chrome に実装しており、それがかなり広く普及してしまったため、途中から引数を必須にすることは実質不可能だった。ただし、 `mode` の概念を外すことはできないため、 `createShadowRoot()` は従来のままとし、代わりに「引数を必須とする別の名前のメソッド」を定義することでこの問題を回避することとなった。

これが v1 で引数必須として定義されている `attachShadow({mode})` である。


```js
// v0
document.createElement('div').createShadowRoot();

// v1 (引数必須)
document.createElement('div').attachShadow({ mode: 'open' });
```

ブラウザ自体の実装は、外部ライブラリとしての Polyfill とはまた違い、開発者からのフィードバックを集める以上、実装しないわけにもいかない。しかし、一度リリースし普及すれば、取り消すことは難しい。

このジレンマの解決としてベンダプレフィックスがあったが、これは次に紹介するように必ずしもうまくはいかなかった。


## fantasy override

Polyfill が、ネイティブの実装と別の名前で提供されているなら、これらの問題を避けることができる。

しかし、多くのコンテンツは、まだ仕様策定/実装が途中の機能を、将来使われるか、一部のブラウザだけが提供している仮の("fantasy")実装に寄せて使ってしまうため、依然問題となる。

例えば、以下のような記述はよく見られる。


```js
requestAnimationFrame = requestAnimationFrame || webkitRequestAnimationFrame || polyfillRequestAnimationFrame;
```

もしこのコードを書いた時、最初の二つがなかった時は `polyfillRequestAnimationFrame` が使われるため、その挙動に依存した実装がされるだろう。

その後、 `window.webkitRequestAnimationFrame` がネイティブ実装されるとそちらが使われるが、それが `polyfillRequestAnimationFrame` の挙動と変わっていると、コンテンツが壊れてしまうことになる。また、ベンダプレフィックス付きの実装はあくまでも試験的な実装であるはずが、プレフィックスが取れた実装が提供された際に、そこで挙動が変わるとまたコンテンツが壊れる可能性が出る。

つまり、このコードは最終的な `requestAnimationFrame` が取り得る選択肢を、非常に狭めてしまう結果となるのだ。

本来ベンダプレフィックスは、先行実装であることを示すつもりで付けられていたが、こうした使われ方が広まった結果、本来の意図を果たすことができなかった。

特に WebKit が先行し、他のブラウザはプレフィックス付き実装すらしていなかった機能については、 webkit プレフィックスをつけて実装され、そのまま放置されているものも少なくない。

そういったコンテンツを動作させられるよう、  [Firefox](https://groups.google.com/forum/?_escaped_fragment_=topic/mozilla.dev.platform/969k-Iryiyo) や [Edge](https://msdn.microsoft.com/ja-jp/library/mt270097(v=vs.85).aspx) が一部の webkit プレフィックスをサポートするという本末転倒な事態となっている。

なお、 Extensible Web 以降、低レベルで実装の難易度が高く、問題が起こったときの影響が大きいものについては、ベンダプレフィックスの代わりに Origin Trial が採用さている。これについては以下を参照のこと。

[Web 標準化のフィードバックサイクルを円滑にする Origin Trials について](https://blog.jxck.io/entries/2016-09-29/vender-prefix-to-origin-trials.html)


## Polyfill を実装するタイミング

では、いつどの時点での仕様を元に Polyfill を実装するのが良いかというと、これは一概には言えない。

仕様策定を追っている人であれば、仕様の成熟度合いやブラウザの実装状況などを踏まえた上で適切な時点を判断できるだろうが、そうでない場合は、その仕様の策定者や ML に提案を投げるのが一番安全だ。

もしそこからレスポンスが無いようであれば、おそらく実装すべきタイミングにそもそも至っていない。

参考になる指標として、ドキュメントでは以下が挙げられている。

- 既に実装しているブラウザが複数あるか?
- インタフェース仕様の変更が起こりそうな問題を解決済みで、コンセンサスが取れた仕様があるか
- [Test Suite](https://github.com/w3c/web-platform-tests) が存在するか
- メジャーなブラウザベンダから "Intent To Implement" がアナウンスされているか


## 実装者向けガイドライン

一番重要なのは名前だ。特に global スコープやネイティブオブジェクトの prototype に、策定段階の名前を使った実装を行うことは非常にリスクが高い。

ドキュメントでは、例えば仕様で `Foo` と定義されているものは、 `FooPolyfill` や `FutureFoo` などに変えて実装することが推奨されている。

また `$`, `root`, `web` といった一般的で短い名前を利用することも、非推奨とされている。

そして、もしブラウザが実装を持っていたら、その実装に移譲するようにコードを書くべきである。またブラウザの実装が全てを提供してないない場合は、不足分のみを補うようにする。

例えば `URL` を提供するが、その内部で `URL#searchParams` が `URLSearchParams` を提供していなかった場合は、 `URL` 全体を Polyfill で置き換えるのでは無く、使える部分は `URL` を使い、 `URL#searchParams` だけ `URLSearchParams` を追加するように実装するのが望ましい。

他細かい点では以下があげられる。

- module 機構を使い、 global スコープやネイティブオブジェクトのプロトタイプを直接汚染しない
- ユーザが最新の実装に追従しやすいよう、 npm や CDN([cdnjs.com](https://cdnjs.com), [polyfill.io](https://polyfill.io)) などで提供する
- Web Platform Test があったらパスすること
- Polyfill の実装経験は貴重なので、気づいた点を仕様策定にフィードバックする
- ネイティブ実装に移譲した場合はコンソールなどに Polyfill が不要であったことを知らせる


## 利用者が気をつけるべきこと

Polyfill を使う側にも注意すべき点はある。

まず何よりも、 Polyfill の役割をきちんと理解し、そのコードが極力最新である状態を保つことが重要だ。

また、その時点での標準化の状況を踏まえて、例えば API の変更やブラウザ実装の問題などを含めて最善な状態がどうであるかを見極めた上での利用が望ましい。

仕様策定に対して、あまりにも早すぎる段階での Polyfill 実装については、コンテンツへの大々的な導入に際して仕様策定の ML などに問い合わせるといった慎重さがあるとなお良いだろう。


## Outro

Polyfill の先行実装によって標準化へのフィードバックを行うことは非常に重要だが、実装方法によっては標準化を妨げることになりかねない。

最近では、名前空間/実装合戦のような雰囲気を感じることもあるが、もしその Polyfill が普及すればその実装が及ぼす影響は決して無視できない。

polyfill を実装、利用する際は、こうした点を踏まえた上で慎重に行い Web の進歩が少しでも円滑になればと思う。
