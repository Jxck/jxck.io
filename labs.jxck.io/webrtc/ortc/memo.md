http://draft.ortc.org/

# 未実装

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
