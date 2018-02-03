# [async dom][virtual dom] Async DOM (Virtual DOM を置き換える 4 つの提案)について

## Intro

React をはじめとする Virtual DOM の概念を参考に、現在の DOM API に足りてないものを検討し、導入すると言う提案が検討されている。

現状 API の提案は 4 種類あり、それらを元に作業をするための ML も解説された。

まだ、具体的な成果が出て来ているわけではないが、これらの提案を元に、今日の DOM には何が足りていないのか、を考察する。



## DOM API のミッシングポイント

そもそもなぜ Virtual DOM が使われているのかを振り返る。

SPA 的な構成では、ステートとしてデータを保持し、ライフサイクルの中でステートが更新され、そのステートを DOM に反映する。

非常に簡単な例としては以下のようなモデルだ

```javascript
let i = 0
setInterval(() => {
  updateDOM(i)
  i++
}, 100)

function updateDOM(i) {
  document.querySelector('#num').textContent = i
}
```

この場合 `updateDOM()` の中はたった 1 つの `<div>`(出力) であり、反映する値(入力)も 1 つしかない。
ここでは、一切の工夫をせず愚直に書いているが、そこまで問題にはならないだろう。

ところが、入力/出力ともに規模が大きいと、そうもいかなくなる。

例えば、 DOM query の最適化や、使いまわせる結果のキャッシュを意識する必要もあれば、 Fragment の生成なども行う必要がある。

入力にしても、多くの値が変更されている場合と、複数あるプロパティのたった一つが変更されているのでは、作業量が違う。

こうしたことを、場合分けして細かく管理するのが、いわゆる DOM 職人とよばれるスキルセットとなる。

しかし、それは決してスケールしない、局所最適化はアプリ全体の更新に対して脆い。




基本的な DOM の操作は、

簡単に言えば、 DOM の更新コストを局所化


DOM の更新はメインスレッドで行われ、ここで時間がかかると応答性の問題が出る。

特に大きな変更を適用し、それが Grid/Flexbox/Table などでレイアウトされるとなると、なおさら時間がかかる。

DOM の更新は同期であり、その間に別の Script を走らせることができない。

Worker は基本的に DOM にはさわれないので、更新を Worker に投げることもできない。



## DOM 職人

DOM の更新を局所化するためには、 Model の変更に関連する要素を細かく見定め、ミクロな更新に分解する必要がある。

いわゆる、 DOM 職人的な仕事が必要になる。

しかし、そうした更新は難しい上に変更に弱くなりがちである。つまりスケールしない。


## Virtual DOM

モデルを更新すると、変更結果の DOM と、現時点の DOM の差分を計算し、大きな更新を依頼しながらも、実際には局所更新が行えるようにする。

そうした中間処理を行うのが Virtual DOM だった。

しかし、差分の算出やそれを元にした局所更新は、実装が難しいものだった。


## 4 つのアプローチ

こうした問題に対して、個別に様々な提案が上がっていた。
現状、主だったところでは 4 つのアプローチがある。

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



