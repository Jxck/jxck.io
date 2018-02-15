# [async dom][virtual dom] Async DOM (Virtual DOM を置き換える 4 つの提案)について

## Intro

React をはじめとする Virtual DOM の概念を参考に、現在の DOM API に足りてないものを検討し、導入すると言う提案が検討されている。

現状 API の提案は 4 種類あり、それらを元に作業をするための ML が開設された。

まだ、具体的な成果が出て来ているわけではないが、これらの提案を元に、今日の DOM には何が足りていないのか、を考察する。

(Virtual DOM からの知見は活きるが、 React の実装そのものを標準にするという議論ではないという点は先に強調しておく)


## DOM 更新の局所最適化

そもそもなぜ Virtual DOM が使われているのかを振り返る。

SPA 的な構成では、ステートとしてデータを保持し、ライフサイクルの中でステートが更新され、そのステートを DOM に反映する。

非常に簡単な例としては以下のようなモデルだ

```javascript
let state = 0 // counter
setInterval(() => {
  updateDOM(state)
  state++
}, 100)

function updateDOM(state) {
  document.querySelector('#num').textContent = state
}
```

この場合 `updateDOM()` の中はたった 1 つの `<div>`(出力) であり、反映する値(入力)も 1 つしかない。
ここでは、一切の工夫をせず愚直に書いているが、そこまで問題にはならないだろう。

ところが、入力/出力ともに規模が大きいと、そうもいかなくなる。

例えば、 querySelector の最適化や、使いまわせる結果のキャッシュ、 Fragment の生成なども行う必要がある。

入力にしても、多くの値が変更されている場合と、複数あるプロパティのたった一つが変更されているのでは、作業量が違う。

こうしたことを、場合分けして細かく管理するのが、いわゆる DOM 職人とよばれるスキルセットとなる。

しかし、ここまでの局所最適化はアプリ全体の更新に対して脆く、スケールしない。


## after Virtual DOM

Virtual DOM が白眉だった点は、この DOM の更新箇所を差分から割り出し、局所最適化する一連を開発者から隠した点にある。

開発者は、状態の管理に集中でき、 DOM への反映は JSX で命令化することで React に丸投げすることができた。

逆に言えば React は、 HTML の構築を行う際に、そこに様々なマーカをセットし、新たなステートを適用する際は、マーカを元に本当に必要な箇所だけを割り出す。

これにより、大きなオブジェクトのたった 1 つのプロパティを更新しただけでも、 DOM 全体が更新されてしまうといったことがおこらない。

この仕組みを知れば、まるでブラウザがやるようなことをやっている、と思うかも知れない。

しかし、ブラウザの API は、こうした方向性では定義されていない。

プロパティを代入すれば素直に同期で更新されるし、 AppendChild すれば素直に同期で子要素が追加される。

その各操作によって Layout や Paint といった処理が発生するため、回数が多ければ無視できない。

メインスレッドで同期処理が起こるということは、他の処理への影響もある、応答性の問題が出る。

特に大きな変更を適用し、それが Grid/Flexbox/Table などでレイアウトされるとなると、なおさら時間がかかる。



## Async DOM

では、どんな API があれば良いか、これを考えるのが Async DOM の発想につながる。

まず浮かぶのが、 DOM の更新を非同期にするというアイデアだ。

ちなみに、 Virtual DOM そのものを最適化するために、例えば差分計算の API を足すだとか、 JSX を標準にするという発想ではない。

DOM の更新は同期であり、その間に別の Script を走らせることができない。

Worker は基本的に DOM にはさわれないので、更新を Worker に投げることもできない。

こうした点を解決するための API セットのアプローチが、現在 4 つ出ている。



## 4 つのアプローチ

こうした問題に対して、個別に様々な提案が上がっていた。
現状、主だったところでは 4 つのアプローチがある。

- [proposals](https://github.com/chrishtr/async-dom/blob/master/current-proposals.md)
  - Display Locking
  - asyncAppend
  - DOM ChangeList
  - WokerNod

これらをベースに、 AsyncDOM はどうあるべきかを考え、標準化を考えていこうという動きが最近始まった。

[Async DOM working session summary & outcomes](https://docs.google.com/document/d/17LQtUzxNj31ElYCk_Ozgn4kJqQktrK8m6I8e1i7948I/edit)

まだアクティブな活動は無いが、一応 ML もできた。今後に期待しつつ、現状のプロポーサルを見ていく。


## Display Locking

[async-dom/display-locking.md](https://github.com/chrishtr/async-dom/blob/master/display-locking.md)


Display に対して Element を Lock するという概念を取り入れる。

- (a) 対象要素とその子要素に関するピクセル出力を固定し変更できなくする
- (b) 子要素を不活性にし、ブラウザのイベントを受け付けなくする

つまり、まとまった更新、例えば表の多くのセルを更新するといった場合に、セル単位で変更->反映が起こらないようにロックするという方針だ。

表の更新前にロックを取り、全て更新したらアンロックすれば、ペイントは一回で済む。

これを可能にするための新しい API が以下のように提案されている。



### Lock.requestUpdate()

- `Lock.requestUpdate()`
  - 更新処理を登録する。 これは必ず呼び出されるが、もし commit が走っている場合は、 commit と unlock が終わったら実行される。 lock が終了していれば、 `requestAnimationFrame()` のように挙動する。

- `Lock.requestCommit()`
  - 更新の完了を依頼する。このロックに関わる全ての `requestUpdate()` のコールバックが終了したら実行され、終わったら resolve する Promise を返す。

- `Lock.isCommitting()`
  - bool を返す

- `Lock.onUnlock`
  - unlocked されたら発火するイベント。

- `Element.requestLock()`
  - Element の表示をロックする。 `lock` を引数にコールバックを実行し、表示が可能になったら resolve する promise を返す。


Example:

```javascript
function readyToUnlock() {
  // Last chance to avoid displaying the new widget state if abort is needed.
  // Options are to re-lock the element, detach its DOM element, or otherwise
  // mutate it in some way.
}

function updateWidgetContents(lock) {
  if (moreWorkToDo()) {
    doSomeWork();
    lock.requestDisplay(updateWidgetContents());
  }
  lock.commit().then(readyToUnlock);
}

widgetRoot.requestLock(updateWidgetContents).then(readyToUnlock);
```


- Blink の内部実装に非常に近い概念で、他のブラウザでも似ているので実装しやすい。また、通常の Script から見える状態は一貫しているので、複雑さは最小限に抑えられる。
- 既存の React や Polymer は、 `requestLock()` と `requestCommit()` をラップすれば、すぐに置き換えられる。
- Worker に処理を投げ、結果を lock されたサブツリーにチャンクで適用することができる
- 都合が悪ければ abort してしまえば UI は壊れない




## Async Append






## DOMChangeList

Worker 内で変更し、それをメインスレッドに転送して、一発で反映できるようにする。

このため、 Element と Node への変更処理をサポートしつつ、転送可能な DOM Tree の SuperSet を作る。

さらに、メインスレッド上の他の処理を邪魔せずに反映できるようにする API を作る。













1. To make it clearer and less error prone to apply a sequence of DOM operations at once, that can support the full gamut of mutations to Elements and Nodes.

1. 一度に DOM 操作のシーケンスを適用することがより明確になり、エラーの発生が少なくなるために、 Elements および Nodes への完全な変更をサポートすることができます。


2. For efficiency, to provide an API for constructing a sequence of DOM operations that can be:

2. 効率化のために、一連の DOM 操作を構築するための API を提供するには、


  1. constructed in a worker and transferred to the UI thread
  2. constructed with a minimum of allocations
  3. applied in one shot without interleaved user code

  1. worker で構築され、 UI スレッドに転送される
  2. 最小の allocate で構築される
  3. ユーザコードを邪魔せず一発で適用できる

To support, in one API,
これを 1 つの API で実現するため、

the superset of trees that can be produced using the HTML parser and using the DOM API
HTML パーサーと DOM API を使用して生成できる、 DOM tree のスーパーセットをサポートする。

(the HTML parser supports more tag names, while the DOM API supports more trees, such as custom elements nested inside a table).
(HTML パーサーはより多くのタグ名をサポートし、 DOM API はテーブル内にネストされたカスタム要素などのより多くのツリーをサポートします) 。

This is an initial, minimal version of this API, which could be expanded over time with more capabilities.
これはこの API の初期の最小限のバージョンです。時間が経つにつれてより多くの機能が拡張される可能性があります。

It should always maintain its goals of predictable, allocation-lite performance, focusing on giving user-space abstractions the capabilities they need for maximum performance.
最大限のパフォーマンスを得るために必要な機能をユーザー空間の抽象化に与えることに焦点を当て、予測可能な割り当て Lite パフォーマンスの目標を常に維持する必要があります。



## NodeToken

A NodeToken is an opaque value that represents a Node. It can be efficiently transferred from one worker to another.

A NodeToken は a を表す不透明な値です Node 。ある従業員から別の従業員に効率的に移行することができます。

It serves two purposes:
それは 2 つの目的を果たす:

- To represent a Node that already exists in another worker, and can serve as the starting point of a series of mutations expressed in a DOMChangeList.
- To represent an intermediate Node that was produced as part of the process of building a DOMChangeList.

- すでに worker に存在する Node を表現する、そして DOM change list 内で表現される一連の変更の起点として使われる。
- Node の中間表現をし、それは domchangelist を構築するプロセスの一部を提供する



## Applying a Change

The intent of this API is to have these performance characteristics:

- Creating a change list (DOMTreeConstruction or DOMChangeList) significantly reduces GC-managed allocations compared to the current DOM APIs.
- 変更リスト(DOMTreeConstruction または DOMChangeList)を作成すると、現在の DOM API と比較して GC 管理の割り当てが大幅に削減されます。

- Applying a change list should not create intermediate JavaScript wrappers for the DOM objects it creates, which should reduce costs.
- 変更リストを適用すると、作成する DOM オブジェクトの中間的な JavaScript ラッパーが作成されるべきではありません。コストが削減されるはずです。

- It is possible to run the JavaScript code necessary to construct a change list in a worker, and apply it on the UI thread with minimal additional work or allocations in JavaScript.
- ワーカーで変更リストを作成するために必要な JavaScript コードを実行し、 JavaScript で最小限の追加作業や割り当てで UI スレッドに適用できます。

- The API creates a single immutable blob of instructions to pass to the engine, which is intended to avoid JavaScript side effects while the application proceeds. (as Boris Zbarsky said in his comment about proposals in this space, "that would simplify both specification and implementation (in the sense of not having to spell out a specific processing algorithm, allowing parallelized implementation, etc).")
- API は、命令をエンジンに渡すための 1 つの immutable blob を作成します。これは、アプリケーションの進行中に JavaScript の副作用を回避することを目的としています。(Boris Zbarsky 氏がこの分野の提案についてコメントしているように、「仕様と実装の両方を簡素化する(特定の処理アルゴリズムを説明する必要がなく、並列化を実現できるという意味で)」)

- It is reasonable to assume that the builder APIs could be exposed to WebAssembly.
- ビルダー API が WebAssembly に公開される可能性があると想定することは合理的です。

If there is some reason that a concrete implementation of this design might not be able to accomplish these goals, it's almost certainly something we should discuss.
この設計の具体的な実装がこれらの目標を達成できないかもしれない何らかの理由がある場合、それはほぼ確実に議論すべきものです。








## Is this actually faster?

1. Don't you still have to create all of the DOM nodes anyway? If so, why is it cheaper?
1. Isn't DOM pretty fast in modern browsers already?

1. とにかくすべての DOM ノードを作成する必要はありませんか?もしそうなら、それはなぜ安いのですか?
1. 現代のブラウザでは DOM はかなり早いですか?


The intent of this API is to create a low-level interface that is as close as possible to the underlying implementations. It attempts to avoid introducing new costs while reducing a number of paper-cuts that exist in today's usage.

この API の目的は、基盤となる実装にできるだけ近い低レベルのインタフェースを作成することです。新しいコストの導入を避けようとしていますが、今日の用途では数多くのペーパーカットを削減しています。



This API creates DOM nodes in the engine, but it does not need to create JavaScript wrappers. Experiments with deep cloneNode show that skipping those wrappers provides a performance benefit, but cloneNode() can't satisfy as many use-cases as this API.
この API はエンジンに DOM ノードを作成しますが、 JavaScript ラッパーを作成する必要はありません。深い用いた実験で cloneNode 、これらのラッパーをスキップすると、パフォーマンス上の利点を提供していますが、ショー cloneNode()この API として多くのユースケースを満たすことができません。



It allows the construction of the set of mutations to occur separately from the application (or even in a worker), keeping the sensitive work that limits 60fps to a minimum.

これにより、一連の変異をアプリケーションとは別に(または作業者で)発生させることができ、 60fps を最小限に制限する敏感な作業を維持します。


Since applying changes is asynchronous, the full change list can be applied in batches that avoid blocking interaction (especially scroll). If the browser reaches its budget, it can interleave some work to keep the UI interactive and pick up the mutation process afterward. In short, the API should allow browsers to experiment with more scheduling strategies.

変更を適用することは非同期であるため、完全な変更リストは、相互作用(特にスクロール)をブロックしないようにバッチで適用できます。ブラウザが予算に達すると、 UI をインタラクティブに保ち、後で突然変異プロセスを拾うために、いくつかの作業をインターリーブすることができます。要するに、 API はブラウザがより多くのスケジューリング戦略を試すことを可能にすべきです。


It encourages good staging practices, eliminating some of the major causes of layout thrash (see the next section).
レイアウトのスラッシュの主な原因のいくつかを取り除き、適切なステージング手法を奨励します(次のセクションを参照)。

Isn't the real issue that people are interleaving DOM manipulation and layout?
人々が DOM の操作やレイアウトをインタリーブするのが本当の問題ではありませんか?

That is certainly a major issue, and this API puts developers on the path to success by encouraging them to stage DOM manipulation work separately from APIs that can trigger painting or layout.
これは確かに大きな問題であり、この API は、開発者が絵やレイアウトをトリガできる API とは別に DOM 操作を行うように促すことで、開発者を成功へ導きます。


Because the API guarantees that no user script can interleave during the application of changes, there is no way to "mess up" and trigger an immediate flush of any deferred work.
API は、変更の適用中にユーザースクリプトがインターリーブできないことを保証するため、遅延した作業を即座に排除してトリガーする方法はありません。

Unresolved Questions
The current state of this API allows failures to occur during the processing of a change list, and does not require engines to roll back earlier changes (rolling back changes like "remove an iframe" may not be trivial to implement). Would engines prefer to roll back changes?
この API の現在の状態では、変更リストの処理中にエラーが発生する可能性があり、エンジンで以前の変更をロールバックする必要はありません(「iframe を削除する」などのロールバックの変更は実装するのが簡単ではない場合があります)。エンジンは変更をロールバックすることを好むでしょうか?

Should we support APIs like ClassList and the style property through this API? It may be difficult to represent these kinds of changes with the operations already proposed (since this API does not allow direct imperative access to the DOM), and a few additional APIs probably wouldn't do damage to the constraints.
この API を通じて ClassList 、好きな API や style プロパティをサポートする必要がありますか?(この API は DOM への直接的なアクセスを許さないので)既に提案されている操作でこれらの種類の変更を表現するのは難しいかもしれませんし、いくつかの追加の API がおそらく制約にダメージを与えません。

Are there other optimizations that could be performed by engines? For example, Luke Wagner suggested that a parameterized version of this API could work like "prepared statements" in SQL, allowing engines to do up-front work to optimize the access and mutation patterns for application. What can we do to make this API more hospitable to hypothetical optimizations like those?
エンジンで実行できる他の最適化はありますか?たとえば、 Luke Wagner は、この API のパラメータ化されたバージョンは、 SQL の "prepared statements"のように機能し、エンジンがアプリケーションのアクセスパターンや変異パターンを最適化するための最前線作業を行うことを可能にすると説明しました。この API を仮想化のような仮想的な最適化にもっと面倒にするために、私たちは何ができますか?
