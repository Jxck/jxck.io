# [fetch][promise] Fetch の中断と Promise のキャンセル方法の標準化

## Intro

XHR から `fetch()` に積極的に移行しづらかった最大のミッシングピースとして、中断できないという問題があった。

これは、 `fetch()` が選んだ Promise ベースのインタフェースにおいて、キャンセルをどうするかという議論と絡み、長く決着が付かずにいた問題である。

最近、やっと話が前進したので、ここまでの経過を解説する。


## Fetch のミッシングピース

`fetch()` は、ブラウザが発行するリクエストと、取得するレスポンスを扱う低レベルなインタフェースとして策定が始まった。

DOM の API が Promise ベースに移行しつつある流れを汲み、 `fetch()` もまた Promise を返す関数一発スタイルになった。

クラスからインスタンスを生成しメソッドを呼ぶ XHR スタイルでは、インスタンスを再利用した場合の挙動などを含め、オブジェクトのライフサイクルを考慮する必要もあった。

これを Request オブジェクトを渡し Response オブジェクトが返る (resolve) 関数とすることで、実際の挙動との整合したまま全体をシンプルに定義することができた。

しかし、このインタフェースによって、 XHR ではできて `fetch()` ではできないことが大きく 2 つあった。


- `fetch()` を中断する
- `fetch()` の Progress (経過) を取得する


したがって、初期の `fetch()` は、プログレスバーとキャンセルボタンを持つUI といった、典型的な実装が不可能だった。

ところが、この問題の一部は後の stream 導入により解決している。


## Stream 対応

resolve される response から得られる body が stream に対応したため、 [2 つのことが可能](https://blog.jxck.io/entries/2016-07-21/fetch-progress-cancel.html)となった。


- chunk が取得できるようになり、実質 progess の取得が可能になった
- stream を中断することが可能になった


後者の stream の中断は、 `fetch()` の中断の一種として使うこともできる。

しかし、あくまで stream は `fetch()` が resolve された後、つまりサーバからレスポンスが届き始めてからである。

サーバが詰まっていて、リクエストに対するレスポンスが全く来てないような状況では、そもそも Promise  が resolve されないので、やはり中断ができない。


## abort のインタフェースは誰が持つべきか

この中断問題は、 `fetch()` だけの問題かというとそうではないだろう。

DOM の標準 API 以外に、自分で Promise による抽象化をしたい場合も同じ要求は想定できる。

例えば、 `Promise.race()` は最初に resolve した Promise の結果を返して終わるが、他の promise が止まるわけではなく裏で動き続ける。

もし 4 つのタスクを race に渡して、最初に終わった結果を取りたいと思ったら、残りの 3 つは中断で良いかもしれない。

つまり Promise 自体に停止の概念を持たせようという発想が自然であり、それが Cancelable Promise だった。


## Cancelable Promise

Promise にキャンセルさせる仕組みを持たせれば、 `fetch()` も同時にキャンセルできるし、今後 Promise を返す全ての API が中断を考慮できる。

これが、 TC39 で提案されていた Cancelable Promise である。

[tc39/proposal-cancelable-promises](https://github.com/tc39/proposal-cancelable-promises/)

提案先が TC39 なのは、対象が JS の Promise そのものだからである。

要約すると以下のようなものだった。

- CancelToken (.NET の知見) という API 経由で Promise をキャンセルする。
- キャンセルはエラーとは違うため、 resolve/reject 以外に 3 つめの状態を追加する。

しかし、結論から言うと議論の途中で頓挫してしまった。

なんで頓挫したかの詳細は、仕様策定の中心だった domenic の悲痛な一言に集約されている。

[Why was this proposal withdrawn? #70](https://github.com/tc39/proposal-cancelable-promises/issues/70#issuecomment-267414933)


## aborting fetch

Promise がキャンセルできないからといって、 `fetch()` の中断を諦めるわけにはいかない。

XHR であたりまえにできていたことが、できないままでは困る。

そこで Cancelable Promise 待ちだった `fetch()` の abort は、 `fetch()` 側で再度議論することとなった。

[Aborting a fetch: The Next Generation #447](https://github.com/whatwg/fetch/issues/447)

再出発から半年くらいの [議論](https://github.com/whatwg/fetch/pull/523) を重ね、やっと [まとまりつつ](https://github.com/w3c/web-platform-tests/pull/6484#issuecomment-315775251) ある。


## Aborting ongoing activities

`fetch()` での議論の結果、 DOM 自体にいくつかの機能と、中断処理の方法を追加し、それを `fetch()` で利用する形に落ち着いた。

結果的に DOM の中に、実行中の処理を中断する一般的な方法が定義された形になる。

[Aborting ongoing activities](https://dom.spec.whatwg.org/#aborting-ongoing-activities)


実際に、同じ問題を持っていた WebUSB API などの周辺仕様の反応も良好なようだ。

つまり、この方法が今後の Web における一般的な方法として使われていき、 Promise を繋いで非同期処理を行う上での頻出パターンの一つとなる可能性がある。

そうなったときのためにも、 **現状の提案を把握し異論があれば発言をする大事なタイミング** だと思われるため、この API を解説する。

作業中の仕様であるため変更される可能性はあり、まだ実装したブラウザも確認してない。


## AbortController

### 汎例

まず一般的な方法として、 Promise に包んだロングタスクを中断する方法を解説する。

ここでは EventTarget で実装されたタスクを、中断に対応した Promise にする例である。

```js:long-task.js
```


## ferch

`fetch()` の場合は、以下のようになる。

```js:aborting-fetch.js
```


## Promise.race()

Promise.race() で、勝った 1 つ以外を止める処理もできるようになる。

```js:race-fetch.js
```


## 懸念点

Promise も DOM から始まって TC39 に移された経緯があるが、今回の件は TC39 から戻されて DOM 側で解決した。

中断が TC39 に戻らない場合、 Promise は JS の仕様だが、中断は JS の仕様ではないという形になる。

例えば Node への導入などが話し合われる際、こういう点がボトルネックにならないか少し気にかかるところだ。
