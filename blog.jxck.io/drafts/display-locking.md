# [display locking][async][dom] Display Locking によるレンダリングの最適化と Async DOM

## Intro

React や lit-html などにより、 DOM 操作の抽象化に加えて最適化が提供されることが一般的となった。

見方を変えれば、本来ブラウザがやるような最適化を、ライブラリが肩代わりしていると捉えることもできる。

これは、現在の標準 API には、規模が大きく処理が複雑なアプリケーションを開発する際に、足りてないものがあると考えることが可能だ。

課題の 1 つとして「DOM 操作が同期処理である」という点に着目し、 Async DOM という文脈でいくつかの提案が行われた。

今回は、その提案の 1 つであり Chrome で実装が進んでいる Display Locking について現状を解説する。


## 現状の DOM 操作の課題


例えば以下のような処理を考える。

```html
body.appencCild($div)
```

この処理が JS の途中で出現すれば、その瞬間 Window にある DOM Tree はロックを取得し、 `$div` の追加処理が行われ、 DOM Tree が atomic に更新される。

DOM Tree の更新が終わったら、レンダリング処理(style -> layout -> paint -> composit)が発生し、すぐさま画面上に新たな要素が表示される。

このモデルは非常にわかりやすい一方で、大規模なアプリケーションを開発する際には、様々な課題を産むことになる。

まず、レンダリングはメインループで行われ、しかも同期処理だ。

もしこの appendChild した `$div` がものすごく大きかった場合は、そこでメインループをブロックし、 JS の実行もユーザのインタラクションもブロックされる。

結果応答が悪くなり、 User Experience が阻害されてしまう。

メインループをブロックする処理はご法度であることが常識でありながら、 DOM API は基本的に同期しかない。

また、ブロックを発生するような同期処理は Worker に落とすのが常套手段だが、 DOM は Worker から触ることができない。

結果、この `$div` に隠れている更新処理を、なるべく細かいタスクに分割し、 requestIdleCallback などで他に配慮しながら行うなどの工夫が、開発者によってなされることになる。

しかし、規模の大きい SPA では、 State の DOM への展開ごとにそれを自前でやるのは現実的ではない。

そこで、この更新のコストをコントロールすることが、近年のフロントエンド開発の関心の 1 つとなっている。


### ライブラリによる最適化

React や lit-element は、この State の DOM への展開をライブラリで抽象化し、更新コストのコントロールを提供している。

実装はそれぞれ違うが、簡単にいえば既に展開されている DOM から、更新結果の DOM までの間を、最小限の操作で変化できる方法を割り出すという点では共通しているだろう。

React は Virtual DOM による差分更新、 lit-element は Tagged Template Literal で割り出した Strict/Dynamic Part の識別によりこれを行なっている。

少し違うアプローチとして Worker DOM は、 DOM の処理を Woker で実行しているように見せているが、実際には当然 Window にコマンドを発行し DOM API を呼ぶ。

どんなに最適化をしても、最終的にはブラウザの持つ DOM API を呼び出す必要があるため、そこがボトルネックになるのは避けられない。

そこには、標準 API によりブラウザが担保し、ベンダが実装によって最適化する余地があるだろう。

当然同じことを考える人は多く、おおよそ 4 つの異なるアプローチによる仕様があり、それらは Async DOM という文脈でまとめられていた。


### Async DOM の提案

同時期に出てきたというよりは、常に誰かが何かしら提案していた DOM API の改善提案が、 3~4 年くらい前から AsyncDOM としてまとめられた。

- [proposals](https://github.com/chrishtr/async-dom/blob/master/current-proposals.md)

これを議論するための Mailing List ができたため、できてから 2 年くらいずっと気にかけていたのだが、全くと言っていいほど盛り上がらなかった。

- [async-dom - Google グループ](https://groups.google.com/a/chromium.org/forum/#!forum/async-dom)


基本は、現状の DOM の持つ問題を大きく 2 つと考え、そのどちらかないし両方にアプローチしていると見るとだいたいわかる。

- DOM の操作が同期に行われる(非同期にできない)
- DOM の操作がメインループ上でしかできない(Worker に落とせない)

それを踏まえて簡単にそれぞれを解説する。

- asyncAppend
    - https://github.com/WICG/async-append
    - 非同期版 Append を生やす
    - 単体 Append だけではなく、DOM 処理の Batch 化もする
- WokerNode
    - https://github.com/drufball/worker-node/
    - Worker と行き来できる DOM 更新命令をまとめたオブジェクトの提案
    - そのオブジェクトの適用には asyncAppend を使う
- DOM ChangeList
    - https://github.com/whatwg/dom/issues/270
    - DOM の更新命令をまとめるオブジェクトを提案
    - それを適用すると一気に処理が走る、VirtualDOM に似てる
    - エンジンが最適化できるため
- Display Locking
    - 今回の本題なので後述


結論から言えば Display Locking 以外だれも作業してないからというのが実際のところだ。


## Display Locking

Async DOM の実装の中で、もっとも作業が進み、 Chrome で実装され始めたのがこの仕様だ。

- [Proposal: Display Locking - APIs - WICG](https://discourse.wicg.io/t/proposal-display-locking/2905)
- [WICG/display-locking: A repository for the Display Locking spec](https://github.com/WICG/display-locking)
- [Intent to Implement: Display Locking - Google グループ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2Yo590-USNo/7Da9scWwBwAJ)
- [882663 - Implement display locking (meta bug) - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=882663)
- [Display Locking - Issue #306 - w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/306)
- [Display Locking API - Issue #135 - mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/135)


この仕様の状況としては、まず Intetns で [positive feedback from ReactJS and Polymer](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2Yo590-USNo/7Da9scWwBwAJ) と書かれているため、なんらかのやり取りはあったようだ。

しかし、 Mozilla は [Standard Pisition](https://github.com/mozilla/standards-positions/issues/135) でこれを *harmful 寄り* としており、同じスレッドで Apple も [hat we do not support this proposal](https://github.com/mozilla/standards-positions/issues/135#issuecomment-476952851) と言っている。

ただし、どちらも現状の仕様の持つ課題に対する態度であり、前述したような現状の DOM API については共通の問題意識を持っており、 Display Locking の作業が全て無駄だという割り切りというわけでもない。

仕様が改善途中ということで Tag の Design Review はペンディングされている。

対外的にも Google I/O などで、多少話が出ることがある程度だ。

基本的にはそういう状況だという前提で、現状の実装をベースに、何ができ、何を解決するのかを解説し、今後 Async DOM の議論が進んだ時のベースとして記録に残す。


### API

Display Locking が実装されると、 Element に displayLock というプロパティが生える。

ここには 4 つのメソッドがあり、それぞれ以下の役割がある。

acquire()
: ロックの取得

update()
: getComputedStyle, offsetTop で必要な計算(forced update)などを計算する

commit()
: ロックの解除(レンダリング開始)

updateAndCommit()
: update + commit


それぞれが Promise を返す非同期な処理となっている。


### Example

簡単な例として、すでに DOM 上にある `<ul>` に、複数の `<li>` を追加する処理を考える。

```js
const $ul = document.querySelector("$ul")
for (const i = 0; i < 100; i ++) {
  const $li = document.createElement("li")
  $li.textContent = "deadbeef"
  $ul.appendChild($li)
}
```

この `appendChild` が毎回レンダリングを発生している。

そこで、 `<ul>` のロックを取得し、全ての `<li>` が追加されてから一気にレンダリングする場合以下のように書ける。


```js
const $ul = document.querySelector("$ul")

// Lock
await $ul.displayLock.acquire({ timeout: Infinity })

for (let i = 0; i < 100; i ++) {
  const $li = document.createElement("li")
  $li.textContent = "deadbeef"
  $ul.appendChild($li)
}

// Unlock
await container.displayLock.updateAndCommit()
```

Lock 中に行われる `appendChild` は、メモリ上で DOM の処理を行うだけになり、 commit() でレンダリングが一度に走る。




### acquire()

`acquire()` はロックを取得する。オプションに 3 つの値をとる。

timeout
: タイムアウトすると commit されるため、 commit 漏れを防ぐことができる。
: 完全に JS でコントロールしたい場合は、 Infinity を渡す。

sizes
: commit 後のサイズを指定することで、その領域を確保しておくことができる。
: 先にサイズがわかっている場合に指定する。

activatable
: 後述


### CSS Containment



### activatable

この API が標準で提供されるメリットの 1 つが `activatable` だろう。

(レンダリングだけであれば、 display: block して終わったら外すなどでもできなくはなさそうだ)

activatable は、メモリ上にあるがレンダリングされてない DOM に対して、 UI からアクセスできるようにするオプションだ。

説明よりも見た方が早いので以下にデモを示す。


TODO: gif

このデモでは、ランダムな文字列を `<li>` に入れ、ロックをとった `<ul>` に追加し commit してない状態で止めている。

ここで、 CTL+F で「ページ内検索」を行い、ランダムな文字列にヒットするように検索をすると、レンダリングが走り遷移していることがわかるだろう。

ブラウザは、まだメモリ上にありレンダリングされてない要素を、検索やフォーカス移動などの対象に含み、必要に応じて commit することができるのだ。

これを利用すると、 Infinit Scroll で、少しづつ裏で DOM に挿しつつレンダリングは遅延させていても、検索にはヒットするといった実装が可能になる。

もともと、単体のドラフトであったものが、この仕様にマージされた結果になっている。

- [Intent to Implement: Searchable Invisible DOM \- Google グループ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Icw_sU6PqVA/8hwXw0jTDwAJ)







### acquire()

`acquire()` は引数に以下の 3 つをとる。

timeout
: この時間をすぎると自動で commit されるため、コミット忘れや例外で commit にたどり着けない場面を防げる。
: 完全に自分でタイミングを管理したい場合は、 Infinity にすれば自動ではされなくなる。

activatable
: 









これは locked という値を持っており、これを確認することで lock されているかどうかを









### DEMO

動作する DEMO を以下に用意した。

- TODO























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












### 実際の適用

React や lite-html が提供しているのは DOM の更新だけではないため、 Display Locking があればそうしたライブライが不要になるというものではない。

そもそも Display Locking をそのまま使うには、レイヤの低い API だと筆者は考える。

しかし、こうしたライブラリの下回りが Display Locking をうまく取り入れることで、 Developer Experience を保ちながら、実装を改善することはできるだろう。


開発者から見れば、前者の JSX による抽象化で State の DOM への展開が抽象化されており、 State の更新に集中できる点が非常にでかいが、そこを乱暴に行えるのも、裏で同期である DOM の処理を最小限に留め、メインスレッドの占有を防いでいる恩恵と言える。

