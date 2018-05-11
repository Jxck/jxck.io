# [async local storage][layered api][extensible web][whatwg] Layered APIs と High Level API の標準化指針


## Intro

[Extensible Web Manifest](https://extensiblewebmanifesto.org/) 以降、標準化作業は Low Level API にフォーカスし、一定の成果が出ている。

そこで、これらをベースとし、よりアプリレイヤの需要を満たすための High Level API をどう標準化するか、という点について指針が提案された。

基本は、 Low Level API を元に Polyfill を作り、そこからのフィードバックにより策定を進めるという方針だ。

合わせて ES Modules の Import を用いて、 pollyfill とネイティブ実装をスムーズに切り替える拡張が提案されている。

本記事では Layered APIs (LAPIs) と呼ばれる、この一連の枠組みについて解説する。

また、同等の話を [東京 Node 学園 #tng30](https://nodejs.connpass.com/event/83639/) で行った資料は以下である。

[Web over Layered APIs](https://speakerdeck.com/jxck/web-over-layered-apis)


## Standarize Low Level API

Extensible Web Manifest 以降、標準化の場面では Low Level な Primitive の策定に注力してきた。

[Extensible Web Manifesto](https://extensiblewebmanifesto.org/ja)

これにより、多様化する開発者のニーズを標準化のタイムラインから解放し、開発者自身がある程度の裁量を持って機能を実装できることを目的とした。

Low Level API の整備は、関連する他の API との整合性にも良い影響を与え、結果として一定の成果を出したと言って良いだろう。

例として、ブラウザが内部で行っていることを表に出すという点で、以下のような API が整備された。

- [Encoding Standard](https://encoding.spec.whatwg.org/)
- [URL Standard](https://url.spec.whatwg.org/)
- [Streams Standard](https://streams.spec.whatwg.org/)
- [Fetch Standard](https://fetch.spec.whatwg.org/)
- etc

また、 CustomElement など、ユーザが任意の拡張を行うことができる仕様も、こうした動きを加速させている。

しかし、実際にアプリケーションを開発する上では、その Low Level API の上に被せたライブラリや、それを束ねるフレームワークのコードが増える一方だった。

ブラウザが読み込むコードの総量は増え、ネットワークコストやブラウザでの実行コストも無視できないものとなる。

ブラウザがネイティブに実装していれば、そうしたコストの大部分は削減されるため、当然のように High Level API も標準化要求は増える。

こうした High Level API の要求を、 Low Level API にこそ注力すべきだと無視し続けることもできない。

Low Level API の整備が軌道に乗った今こそ、 High Level API に対して標準化の側面からどういう態度を取るか、を考える時期でもある。


## Standarize High Level API

High Level API を標準化するといっても、闇雲に採用し実装するわけにもいかない。

新しい実装によるバグ、セキュリティホール、オーバーヘッド、技術的負債の発生を、いかに防ぐかを考える必要がある。

また、策定しても実装されるまでの間は、 Polyfill を利用するだろう。これが安全に行われなければ、 Ever Green な Web を作るのは難しい。

global namespace に追加される何かは、それがなんであれメンテし続けるか、絶大な努力と慎重なプロセスと膨大な時間を用いて deprecate していくことになる。いずれも望ましいことではない。

そこで、 Polyfill によるユーザランドの実装を積極的に許容し、標準化プロセスからブラウザへの実装と相互にフィードバックさせ、緩やかにネイティブ実装へと移行していくパスを用意する。

これを目指すのが Layered API の基本的なモチベーションと言って良いだろう。

- [Layered Web APIs Design Doc](https://docs.google.com/document/d/1VbU4z7xtU_kzuLAcj38KKL5qoOr2UYNUJW8vZB2AcWc)
- [drufball/layered-apis: A new standards effort for collaborating on high-level features](https://github.com/drufball/layered-apis)
- [Layered APIs: an overview and update](https://docs.google.com/presentation/d/1_5EVAiuragdEqop8V9b1hJkOW38y4EsXYgNBKdpSHmA)


## Layered APIs

Layered API(LAPIs) は、簡単に言えば High Level API を定義する上で、それは必ず現在定義されている Low Level API の上に成り立つように定義するということだ。

別に難しいことではないが、これによりいくつかのメリットがある。

- ブラウザが既に実装している Low Level API を使って Polyfill が可能
- 既にレビューを通った Low Leve API だけに依存するため、新たなプライバシー/セキュリティリスクを産みにくい

逆にもし Polyfill が不可能であれば、新たな Low Level API の可能性(Use Case)がそこに存在するとし、そちらを先に定義することになるだろう。

ここでは例として Async Local Storage (Local Storage の非同期版) を例に解説していく。


## Layered APIs fallback syntax

これまで Polyfill へのフォールバックは、様々な方法で行われてきた。

例えば以下のような例を考える。


```js
if (window.AsyncLocalStorage=== undefined) {
  // polyfill for async local storage
}

window.AsyncLocalStorage // native or polyfill
```

この例では、あらかじめ polyfill のコードを読み込んでおき、 Global における関数の有無を用いてどちらの実装を使うかを切り分けている。

この場合、もしブラウザが API を実装していても、使われない Polyfill のコードは依然として読み込まれることになる。

また、新しい API を global に追加していくことは、影響もメンテナンスコストも大きい。

そこで、 ES Module の API を用いて、以下のように読み込む構文拡張が提案されている。


```js
import { storage } from "std:async-local-storage";
```

現行の仕様では `from` の後ろには module への URL が書かれるが、ここに `std:` で始まるラベルを書くと、ブラウザの実装する標準 API を読み込むことができる。

これは Opt-In で読み込むことになるため、 Global を汚染せずに新しい API を Ship できるというメリットがある。

また以下のように書くと、もしブラウザが実装していなかった場合に、後半に書いた polyfill へフォールバックすることができる。


```js
import { storage } from "std:async-local-storage|https://cdn.example.com/async-local-storage.js";
```

これにより、もしブラウザに実装があれば、 polyfill のコードは読み込む必要がなくなり、ネットワークコストが削減される。

また、最初からこの形で書いておけば、ブラウザの実装の差を低いコストで埋め、そのまま放置されてもネイティブのコードで置き換わるため、移行コストを低く抑えることができる。

同じことは、 HTML Element の実装においても利用が想定されている。


```html
<script type=module src="std:infinite-list|https://some.cdn.com/infinite-list.js"></script>
<infinite-list></infinite-list>
```

いずれも、まだ提案段階の仕様である。

- [Layered web APIs fallback syntax](https://docs.google.com/document/d/1jRQjQP8DmV7RL75u_67ps3SB1sjfa1bFZmbCMfJCvrM)
- [Layered APIs Proto-spec](https://github.com/drufball/layered-apis/blob/master/spec.md)


## proposals

Layered API での仕様策定の候補として、以下の 3 つがある。

- [domenic/async-local-storage](https://github.com/domenic/async-local-storage)
  - promise base の非同期 local storage
- [domenic/infinite-list-study-group](https://github.com/domenic/infinite-list-study-group)
  - ページネーションなどで使われる無限読み込みリスト
- [GoogleChromeLabs/tasklets](https://github.com/GoogleChromeLabs/tasklets)
  - task を別 worker で実装するための API

内容を見ても、まだ始まったばかりであることがよくわかるだろう。


## premature-polyfill

まだまだ始まったばかりの提案ではあるが、 Polyfill の効果的な使い方に注力するこの仕様は、現状の Polyfill の問題をそのまま引きずる。

Polyfill のあり方については、過去に TAG によってプラクティスがまとめられており、本ブログでも解説している。

- [Polyfills and the evolution of the Web](https://w3ctag.github.io/polyfills/)
- [Polyfill のあり方と Web の進化と協調するためのガイドライン \| blog.jxck.io](https://blog.jxck.io/entries/2017-02-17/polyfill-implementation-guideline.html)

例えば、以下の場合 polyfill とブラウザの実装で API が異なる場合は、ブラウザアップデートでアプリが壊れることになる。


```js
import { storage } from "std:async-local-storage|https://cdn.example.com/async-local-storage.js";
```

もし十分に API が議論される前に「先走った Polyfill」が作られるとその問題は必ず起こる。

また、経験上 `std:xxx` のタグは取り合いになるだろう。同じタグを記述するサイトでも、全然別の API を元に作られている状態も容易に想像できる。

現時点でおこなわれている polyfilling でも同じことは起こっているため、何も変わってないと言えば変わってないし、 Module を使うことでマシにはなっている。

一方、そうした Polyfill の存在が、標準側で API を変更する際に足を引っ張ることは目に見えているわけだが、この問題へのアドレスは一切ない。

なにより、 Layered API は Polyfill が先に作られることをこそ是としているため、こうした問題に対する何らかの事前策が無くて良いのかとも思う。

- [Risks of premature polyfilling #12](https://github.com/drufball/layered-apis/issues/12)

Layered API はすでに TAG の design review がリクエストされているため、もしかしたら同じ話がでるかもしれない。

- [Layered APIs Issue #276 w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/276)

一方、 Chrome では、すでに Layered API の import 周りの実装について Intents が出されている。

- [Intent to implement: Layered API infrastructure](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/MFbJuzA5tH4/t6Q-LZHpAgAJ)

この辺をふまえ、標準化の作業がどのように進んでいくのか、そして [過去に提案](https://discourse.wicg.io/t/asynclocalstorage/1554/13) しつつも誰も相手にしてくれなかった [AsyncLocalStorage](https://domenic.github.io/async-local-storage/) が今後どうなるか、注視していきたい。
