http://draft.ortc.org/

## 未実装

```js
rtcIceGatherer.onstatechange
rtcIceGatherer.state

```

RTCIceCandidateComplete が実装されてない、
onlocalcandidate は最後 `{}` を上げて終わる。
statechange も上がらないので、 Object.keys とかで
最後だったことを見るしかない。



仕様には無い

```js
rtcIceTransport.onicestatechange
```


## flow

### RTCIceTransport

```js
rtcIceTransport = new RTCIceTransport()
```

いくつかイベントがある。
あとで使う。


### RTCIceGatherer#localcandidate

```js
rtcIceGatherer = new RTCIceGatherer(iceOptions)
```

作成するだけで localcandidate イベントが上がる。
ここで発生する candidate を相手に送る。

```js
// 送信
rtcIceGatherer.onlocalcandidate = (e) => {
  if (e.complete) {
    // 最後の candidate
  }

  const candidate = e.candidate
  // candidate を送る
}


// 受信
rtcIceTransport.addRemoteCandidate(candidate)
```

`complete` は今は未実装で、代わりに最後の candidate が `{}` になる。


### RTCIceGatherer#localparameter

localcandidate と並行して localParameter も送る

```js
rtcIceGatherer.getLocalParameters()
```

### RTCDtlsTransport

```js
rtcDtlsTransport = new RTCDtlsTransport(rtcIceTransport)
```

```js
rtcDtlsTransport.getLocalParameters()
```

これを送る。


### start()

params を使って `start()` する。


```js
rtcIceTransport.start(rtcIceGatherer, rtcIceParametersRemote, rtcIceRole)
rtcDtlsTransport.start(rtcDtlsParametersRemote)
```

params を並行して送ることはできるが、 start() は
localcandidate の交換が終わってないといけない。

順番に送るか、 localcandidate の終わりと params の受信を両方待つ Promsie.all を作るなど。


### connected

DTLSTransport で state が 'connected' になったら、経路が確率している。

```js
rtcDtlsTransport.ondtlsstatechange = (e) => {
  if (e.state === 'connected') {
  }
}
```

ここで、 getUserMedia で stream を追加していく。


### sender/receiver の flow

```
1. sender を作る
2. sender_capability を送る
                                3. receiver を作る
                                4. receiver.track を mediastream に追加する
                                5. receiver_capability を送る
                                6. receive() する
7. send() する
```

これを両側で行う。

mediastream で track が揃ったら、 `video.srcObject` に追加


### capability のマージ

send()/recv() は 両方の capability をマージして使う。
両方にある共通部分を取り出す感じ。
