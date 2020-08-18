# [display locking][async][dom] Display Locking によるレンダリングの最適化と Async DOM

## Intro

React や lit-html などにより、 DOM 操作の抽象化に加えて最適化が提供されることが一般的となった。

見方を変えれば、本来ブラウザがやるような最適化を、ライブラリが肩代わりしていると捉えることもできる。

これは、現在の標準 API には、規模が大きく処理が複雑なアプリケーションを開発する際に、足りてないものがあると考えることが可能だ。

課題の 1 つとして「DOM 操作が同期処理である」という点に着目し、 Async DOM という文脈でいくつかの提案が行われた。

今回は、その提案の 1 つであり Chrome で実装が進んでいる Display Locking について現状を解説する。


## 現状の DOM 操作の課題

まず、以下のような処理を考える。


```html
body.appencCild($div)
```

この処理が JS の途中で出現すれば、その瞬間 Window にある DOM Tree はロックを取得し、 `$div` の追加処理が行われ、 DOM Tree が atomic に更新される。

DOM Tree の更新が終わったら、レンダリング処理(style -> layout -> paint -> composit)が発生し、すぐさま画面上に新たな要素が表示される。

このモデルは非常にわかりやすい一方で、大規模なアプリケーションを開発する際には、様々な課題を産むことになる。

まず、レンダリングはメインループで行われ、しかも同期処理だ。

もしこの appendChild した `$div` がものすごく大きかった場合は、そこでメインループをブロックし、 JS の実行もユーザのインタラクションもブロックされる。

結果、応答性能が悪くなり、 User Experience が阻害されてしまう。

メインループをブロックする処理はご法度であることが常識でありながら、 DOM API は基本的に同期しかない。

また、ブロックを発生するような同期処理は Worker に落とすのが常套手段だが、 DOM は Worker から触ることができない。

現状は、この `$div` に隠れている更新処理を、なるべく細かいタスクに分割し、 requestIdleCallback などで他に配慮しながら行うなどの工夫が、開発者によってなされることになる。

しかし、規模の大きい SPA では、 State の DOM への展開ごとにそれを自前でやるのは現実的ではない。

そこで、この更新のコストをコントロールすることが、近年のフロントエンド開発の関心の 1 つとなっている。


### ライブラリによる最適化

React や lit-html は、この State の DOM への展開をライブラリで抽象化し、更新コストのコントロールを提供している。

実装はそれぞれ違うが、簡単にいえば既に展開されている DOM から、更新結果の DOM までの間を、最小限の操作で変化できる方法を割り出すという点では共通しているだろう。

React は Virtual DOM による差分更新、 lit-html は Tagged Template Literal で割り出した Strict/Dynamic Part の識別によりこれを行なっている。

少し違うアプローチとして Worker DOM は、 DOM の処理を Woker で実行しているように見せているが、実際には当然 Window にコマンドを発行し DOM API を呼ぶ。

どんなに最適化をしても、最終的にはブラウザの持つ DOM API を呼び出す必要があるため、そこがボトルネックになるのは避けられない。

そこには、標準 API によりブラウザが担保し、ベンダが実装によって最適化する余地があるだろう。

当然同じことを考える人は多く、おおよそ 4 つの異なるアプローチによる提案がなされ、それらは Async DOM という文脈でまとめられていた。


### Async DOM の提案

同時期に出てきたというよりは、常に誰かが何かしら提案していた DOM API の改善提案が、 3~4 年くらい前から AsyncDOM としてまとめられた。

- [async-dom/current-proposals.md at master - chrishtr/async-dom](https://github.com/chrishtr/async-dom/blob/master/current-proposals.md)

これを議論するための Mailing List ができたため、できてから 2 年くらいずっと気にかけていたのだが、特に大きな動きはなかった。

- [async-dom - Google グループ](https://groups.google.com/a/chromium.org/forum/#!forum/async-dom)

基本は、現状の DOM の持つ問題を大きく 2 つと考え、そのどちらかないし両方にアプローチしていると見るとだいたいわかる。

- DOM の操作が同期に行われる(非同期にできない)
- DOM の操作がメインループ上でしかできない(Worker に落とせない)

それを踏まえて簡単にそれぞれを解説する。

- [asyncAppend](https://github.com/WICG/async-append)
    - 非同期版 Append を生やす
    - 単体 Append だけではなく、 DOM 処理の Batch 化もする
- [WokerNode](https://github.com/drufball/worker-node/)
    - Worker と行き来できる DOM 更新命令をまとめたオブジェクトの提案
    - そのオブジェクトの適用には asyncAppend を使う
- [DOM ChangeList](https://github.com/whatwg/dom/issues/270)
    - DOM の更新命令をまとめるオブジェクトを提案
    - それを適用すると一気に処理が走る、 VirtualDOM に似てる
    - エンジンが最適化できるため
- [Display Locking](https://github.com/WICG/display-locking)
    - 今回の本題なので後述

Display Locking 以外は、特に作業がされていない。


## Display Locking

Async DOM の実装の中で、もっとも作業が進み、 Chrome で実装され始めたのがこの仕様だ。

- Proposal:                  [Proposal: Display Locking - APIs - WICG](https://discourse.wicg.io/t/proposal-display-locking/2905)
- Draft:                     [WICG/display-locking: A repository for the Display Locking spec](https://github.com/WICG/display-locking)
- Intents:                   [Intent to Implement: Display Locking - Google グループ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2Yo590-USNo/7Da9scWwBwAJ)
- Chromium Bug:              [882663 - Implement display locking (meta bug) - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=882663)
- TAG Review:                [Display Locking - Issue #306 - w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/306)
- Mozilla Standard Position: [Display Locking API - Issue #135 - mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/135)

この仕様の状況としては、まず Intetns で [positive feedback from ReactJS and Polymer](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2Yo590-USNo/7Da9scWwBwAJ) と書かれているため、なんらかのやり取りはあったようだ。

しかし、 Mozilla は [Standard Pisition](https://github.com/mozilla/standards-positions/issues/135) でこれを *harmful 寄り* としており、同じスレッドで Apple も [we do not support this proposal](https://github.com/mozilla/standards-positions/issues/135#issuecomment-476952851) と言っている。

ただし、どちらも現状の仕様の持つ課題に対する態度であり、前述したような現状の DOM API については共通の問題意識を持っており、 Display Locking の作業が全て無駄だという割り切りというわけでもない。

仕様が改善途中ということで Tag の Design Review はペンディングされている。

対外的にも Google I/O などで、多少話が出ることがある程度だ。

基本的にはそういう状況だという前提で、現状の実装をベースに、何ができ、何を解決するのかを解説し、今後 Async DOM の議論が進んだ時のベースとして記録に残す。


### API

Display Locking が実装されると、 Element に displayLock というプロパティが生える。

ここには 4 つのメソッドがあり、それぞれ以下の役割がある。

`acquire()`
: ロックの取得

`update()`
: getComputedStyle, offsetTop で必要な計算(forced update)などを計算する

`commit()`
: ロックの解除(レンダリング開始)

`updateAndCommit()`
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

わかりやすいように、 `appendChild` に `setTimeout` を仕込んだ例は以下のように挙動する。

![lock を取らず普通に appendChild する例](display-no-locking.gif#825x968 'display with no locking')

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

こちらも、わかりやすいように `setTimeout` を仕込んだ例は以下のように挙動する。

![ul の lock を取り追加が終わってから commit する例](display-locking.gif#825x968 'display with locking')

Lock 中に行われる `appendChild` は、メモリ上で DOM の処理を行うだけになり、 `commit()` でレンダリングが一度に走っていることがわかるだろう。


### acquire option

`acquire()` はオプション値をとる。

timeout
: タイムアウトすると commit されるため、 commit 漏れを防ぐことができる。

sizes
: commit 後のサイズを指定することで、その領域を確保しておくことができる。

activatable
: 後述


### CSS Containment

Commit された場合のレンダリング処理を最適化するために、 Display Lock を取得する対象は `contain: style layout` が指定されている必要がある。

CSS Containment は、例えば style と layout の計算が、対象要素内に閉じていることを明示し、ブラウザの最適化にヒントを与えるものだ。

Display Lock は、その性質を利用して、事前にブラウザに style と layout が contain された要素が commit 時にレンダリングされることを示すことにした。

これは逆に Containment が指定できる設計に事前になっている箇所にしか Display Lock が使えないことを意味するため、 Lock を取得する対象など、設計に影響してくるだろう。


### activatable

この API が標準で提供されるメリットの 1 つが `activatable` だろう。

activatable は、メモリ上にあるがレンダリングされてない DOM に対して、 UI からアクセスできるようにするオプションだ。

説明よりも見た方が早いので以下にデモを示す。

![commit してない要素が画面内検索で一致した際にレンダリングされる例](display-locking-activatable.gif#825x968 'find in page commits activatable element')

このデモでは、ランダムな文字列を `<li>` に入れ、ロックをとった `<ul>` に追加し commit してない状態で止めている。

ここで、 CTL+F で「ページ内検索」を行い、ランダムな文字列にヒットするように検索をすると、レンダリングが走り遷移していることがわかるだろう。

ブラウザは、まだメモリ上にありレンダリングされてない要素を、検索やフォーカス移動などの対象に含み、必要に応じて commit することができるのだ。

これを利用すると、 Infinit Scroll で、少しづつ裏で DOM に挿しつつレンダリングは遅延させていても、検索にはヒットするといった実装が可能になる。

そのものずばりなユースケースとして、 Layered API の文脈で議論されている Virtual Scroll のニーズとも一致している。

- [WICG/virtual-scroller](https://github.com/WICG/virtual-scroller)

この Virtual Scroller のページ検索のために、もともと別ドラフトであった Searchabel Invisible DOM という提案があった。

- [Intent to Implement: Searchable Invisible DOM \- Google グループ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Icw_sU6PqVA/8hwXw0jTDwAJ)

これは現在 Display Locking の仕様に統合されたと記されている。


### 効果と Junk の回避

より効果がわかりやすい DEMO として、 [explainer](https://github.com/WICG/display-locking/blob/master/explainer.md) で紹介されている動画を引用する。

(MIME が指定されていないため、 `<video>` で埋め込むことができず、リンクしている)

ソースが公開されていないが、この DEMO では、アニメーションで円形のタイマーを回しており、通常は緑で表示される。

その背景に、複雑なレイアウトの DOM が表示されており、その表示/非表示を toggle ボタンで切り替えている模様だ。

まず display locking を利用しない場合は、背景を表示する際にかかるレンダリングコストが大きく、 Junk が発生してタイマー部が赤くなっていることがわかる。

[display locking を指定せず Junk が発生している例](https://drive.google.com/file/d/1Qip6D4Allotua8S6xSXzOhNolnvYPYjt/view)

これを、背景表示に Display Locking を適用した DEMO が以下だ。

レンダリングを一括して行なっているため、タイマー部の赤い部分が削減され Junk が最小に抑えられているように見える。

[display locking を指定し Junk を抑えた例](https://drive.google.com/file/d/1r1aBi4P1_DMCZNXlpzW5jAibCEdT38YB/view)

背景のレイアウトがどの程度複雑なのかは想像でしかないが、この規模のレンダリングコストがかかるということはそれなりに大きいのだろう。

SPA などでは、 DOM 変更の範囲が大きいページ遷移などが考えられそうだ。


### 考察

前述の通り、 Display Locking は、この仕様のまま標準化されると決まっているわけではないが、今後の Async DOM を考える上でのたたき台になるだろう。

AsyncDOM の他の提案が、 Append の非同期化や Worker への以降などを基本としていたことに比べると、この仕様はレンダリングのライフサイクル自体に手を入れた点が大きく異なる。

結果として、 Activatable による UI のインタラクションを受け入れることができる一方、レンダリングエンジンへの影響も大きいため、実装上の懸念は少なくない。

しかし、リアルワールドでは様々なライブラリが DOM 操作の最適化を提供している以上、 Chrome の Intents にある通り React/Polymer といったチームからのフィードバックも無視されることはなさそうにも思える。

今後、この仕様自体のブラッシュアップ、もしくはこれをベースとした対案の標準化も含め、何かしら作業がすすむことはありそうだ。

仮に Display Locking がそのまま改善を含めて進んだとしても、レイヤの低い API であるため、そのまま開発者が触ることは少ないだろう。

React や lit-html が提供しているのは DOM の更新だけではないため、 Display Locking があればそうしたライブライが不要になるというものではない。

特に SPA では State を DOM に展開する部分のコードが、いかに抽象化されているかも Developer Experience として重要だ。

しかし、その先の DOM への展開への最適化は、現状の DOM API の限界を越えることができないため、こうしたライブラリの下回りが Display Locking をうまく取り入れることで、 Developer Experience を保ちながら、実装を改善することはできるだろう。

ただし、恩恵を受けるために CSS Containment などが絡むと考慮点も増えるため、単純にライブラリが更新されるだけで改善するかというと、そうもいかないかもしれない。

それを考えると、実装そのものが隠蔽された Virtual Scroller のような Component を呼び出すだけといった抽象度の高い利用の方が、導入障壁は低いかもしれない。

いずれにせよ、今後の Mozilla や Apple の反応、それに対応した Display Locking のチームの改善や、対案の登場などを中心に、動向を注視したい。


### DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/display-locking/>
