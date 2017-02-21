# data channel

## createDataChannel()

最初に createDataChannel() を呼ぶ。

firefox では createDataChannel か addStream してないと
createOffer() できない

```js
offerer.createDataChannel('channel')
```


## onnegotiationneeded

offerer で negotiation が必要になると、 `onnegotiationneeded` が発火する。
このタイミングで createOffer() を行う。


```js
offerer.onnegotiationneeded = () => {
  offerer.createOffer().then(...)
}
```


## createOffer()

`createOffer()` すると RTCSessionDescription が resolve される。

まず自身(local)に適応する。

```js
offerer.setLocalDescription(rtcSessionDescription).then(...)
```

これを `JSON.strinfigy()` などして、 answerer に送る。

`type: offer` が入ってるので、 WebSocket などで送る際はこの type で識別できる。


## setRemoteDescription()

answerer が、 offerer から送られてきた RTCSessionDescription を適用する。
remote のものなので `setLocalDescription()`

```js
answerer.setRemoteDescription(rtcSessionDescription).then(...)
```


## createAnswer()

次に answerer で `createAnswer()` する。
同じように自身に適用する。

```js
answerer.createAnswer().then((rtcSessionDescription) => {
  answerer.setLocalDescription(rtcSessionDescription).then(...)
})
```

これを `JSON.strinfigy()` などして、 offere に送る。

`type: answer` が入ってるので、 WebSocket などで送る際はこの type で識別できる。

offerer も受け取ったら `setRemoteDescription()` する。


## onicecandidate

createOffer/Answer している間に icecandidate が発生する。

これを相手に送るが、これは SDP と違い type が無いので、送る場合は `type: offerer_candidate` などのキーを入れてから `JSON.stringify()` した方が良い。

また、最後 null が発生するのでそれは無視。

```js
offerer.on('icecandidate', (candidate) => {
  if (candidate === null) return
  ws.send(JSON.stringify({type: 'answer_candidate', candidate: candidate}))
})
```


## addIceCandidate()

相手の ice candidate を受け取ったら適用する。

```js
offerer.addIceCandidate(candidate)
```


## ondatachannel

answerer 側では、 `oniceconnectionstatechange` が起こった後に `ondatachannel` が発火し、 datachannel のインスタンスが生成される。

```js
answerer.ondatachannel = (e) => {
  log(e.channel)
}
```


## onopen

offer/answer 両側で channel が `onopen` を発火したら送受信ができるようになる。


```js
channle.onopen = () => {
  channel.onmessage = (e) => {
    console.log(e)
  }

  channel.onclose = (e) => {
    console.log(e);
  }

  channel.onerror = (e) => {
    console.error(e);
  }

  channel.send('test');
}
```
