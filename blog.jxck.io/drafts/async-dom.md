# Async DOM

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

これに対する 4 つのアプローチ

- Display Locking
- asyncAppend
- DOM ChangeList
- WokerNod


## Display Locking


Display に対して Element を Lock するという概念を取り入れる。

- (a) 対象要素とその子要素に関するピクセル出力を固定し変更できなくする
- (b) 子要素を不活性にし、ブラウザのイベントを受け付けなくする

これを可能にするための新しい API

### Lock.requestUpdate()

`Lock.requestUpdate()` は、更新処理を登録する。 これは必ず呼び出されるが、もし commit が走っている場合は、 commit と unlock が終わったら実行される。 lock が終了していれば、 `requestAnimationFrame()` のように挙動する。


`Lock.requestCommit()`: 更新の完了を依頼する。このロックに関わる全ての `requestUpdate()` のコールバックが終了したら実行され、終わったら resolve する Promise を返す。


`Lock.isCommitting()`: bool を返す

`Lock.onUnlock`: unlocked されたら発火するイベント。

`Element.requestLock()`: Element の表示をロックする。 `lock` を引数にコールバックを実行し、表示が可能になったら resolve する promise を返す。


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


