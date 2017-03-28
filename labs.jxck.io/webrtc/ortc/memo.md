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

RTCSctpTransport そんなものなかった


## flow

### RTCIceTransport

 - getSelectedCandidatePair() は実装されてない。呼ぶとエラー。
 - iceGatherer プロパティは null
 - stop() あり
 - onicestatechange => 発火した
 - oncandidatepairchange 発火しない

 - addRemoteCandidate の場合は complete を示すために最後は `{complete: true}` を add する
   - 代わりに上がってくる `{}` でも良い。
   - set の場合はいらない？


```js
rtcIceTransport = new RTCIceTransport()
```

いくつかイベントがある。
あとで使う。


# RTCIceGatherOptions

 - gatherPolicy と iceServers を両方必須で登録しないと InvalidAccessError になる。


### RTCIceGatherer

- onlocalcandidate event の complete が実装されてない
 - candidate.foundation があるはずなので undefined 判定できそう
- state property は undefined
- close() は実装されてない。呼ぶとエラー。

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


# other

- 先に video に突っ込んでから addTrack してもだめ。
- ssrc は自分のなかで被らなければ良い。(MS は audio: 1001, video: 3003 固定)
- Receiver.track を MediaStream に addTrack するのは DTLS の state が connected になってから、かつ receive() 呼んだ後が一番正しい模様。

```js
dtlsTr.addEventListener('dtlsstatechange', function(e) {
  if(dtlsTr.state === 'connected') {
    var remoteStream = new MediaStream();
    remoteStream.addTrack(videoRecver.track);
    document.getElementById('remote_video').srcObject = remoteStream;
  }
});
```
