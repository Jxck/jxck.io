# webrtc

## 準備

- WebSocket などのシグナリングは別途用意済みという前提
- getUserMedia での Stream の取得も別で行われている前提



## RTCPeerConnection


```javascript
[Constructor(optional RTCConfiguration configuration)]
interface RTCPeerConnection : EventTarget {
    static Promise<RTCCertificate>            generateCertificate(AlgorithmIdentifier keygenAlgorithm);

    Promise<RTCSessionDescriptionInit>        createOffer(optional RTCOfferOptions options);
    Promise<RTCSessionDescriptionInit>        createAnswer(optional RTCAnswerOptions options);
    Promise<void>                             setLocalDescription(RTCSessionDescriptionInit description);
    readonly attribute RTCSessionDescription? localDescription;
    readonly attribute RTCSessionDescription? currentLocalDescription;
    readonly attribute RTCSessionDescription? pendingLocalDescription;
    Promise<void>                             setRemoteDescription(RTCSessionDescriptionInit description);
    readonly attribute RTCSessionDescription? remoteDescription;
    readonly attribute RTCSessionDescription? currentRemoteDescription;
    readonly attribute RTCSessionDescription? pendingRemoteDescription;
    Promise<void>                             addIceCandidate((RTCIceCandidateInit or RTCIceCandidate) candidate);
    readonly attribute RTCSignalingState      signalingState;
    readonly attribute RTCIceGatheringState   iceGatheringState;
    readonly attribute RTCIceConnectionState  iceConnectionState;
    readonly attribute RTCPeerConnectionState connectionState;
    readonly attribute boolean?               canTrickleIceCandidates;
    readonly attribute RTCSctpTransport?      sctp;
    static sequence<RTCIceServer>             getDefaultIceServers();
    RTCConfiguration                          getConfiguration();
    void                                      setConfiguration(RTCConfiguration configuration);
    void                                      close();
    sequence<RTCRtpSender>                    getSenders();
    sequence<RTCRtpReceiver>                  getReceivers();
    sequence<RTCRtpTransceiver>               getTransceivers();
    RTCRtpSender                              addTrack(MediaStreamTrack track, MediaStream... streams);
    void                                      removeTrack(RTCRtpSender sender);
    RTCRtpTransceiver                         addTransceiver((MediaStreamTrack or DOMString) trackOrKind, optional RTCRtpTransceiverInit init);
    RTCDataChannel                            createDataChannel(USVString label, optional RTCDataChannelInit dataChannelDict);
    Promise<RTCStatsReport>                   getStats(optional MediaStreamTrack? selector = null);

                       attribute EventHandler onnegotiationneeded;
                       attribute EventHandler onicecandidate;
                       attribute EventHandler onicecandidateerror;
                       attribute EventHandler onsignalingstatechange;
                       attribute EventHandler oniceconnectionstatechange;
                       attribute EventHandler onicegatheringstatechange;
                       attribute EventHandler onconnectionstatechange;
                       attribute EventHandler ontrack;
                       attribute EventHandler ondatachannel;
};


partial interface RTCPeerConnection {
    void               setIdentityProvider(DOMString provider, optional RTCIdentityProviderOptions options);
    Promise<DOMString> getIdentityAssertion();
    readonly attribute Promise<RTCIdentityAssertion> peerIdentity;
    readonly attribute DOMString?                    idpLoginUrl;
    readonly attribute DOMString?                    idpErrorInfo;
};


partial interface RTCPeerConnection {
    Promise<void> createOffer(RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback, optional RTCOfferOptions options);
    Promise<void> setLocalDescription(RTCSessionDescriptionInit description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback);
    Promise<void> createAnswer(RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback);
    Promise<void> setRemoteDescription(RTCSessionDescriptionInit description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback);
    Promise<void> addIceCandidate((RTCIceCandidateInit or RTCIceCandidate) candidate, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback);
};
```


## addTrack

まず RTCConfiguration を元に new する。
ここに対して addTrack することで、
onnegotiationneeded が発火するので、
そこで言われた通りにシグナリングを行う。

```javascript
const rtcPeerConnection = new RTCPeerConnection(rtcConfiguration)

rtcPeerConnection.onnegotiationneeded = () => {
  // negotiation
}

stream.getTracks().forEach((track) => {
  rtcPeerConnection.addTrack(track, stream)
})
```

addTrack が無い場合は addStream する


```javascript
rtcPeerConnection.addStream(stream)
```

## offer/answer

createOffer で作った SDP を setLocalDescription し、 Peer に送る
受信した相手は、 setRemoteDescription する。


```javascript
// Alice
const offer = await rtcPeerConnection.createOffer()
await rtcPeerConnection.setLocalDescription(offer)

//// Alice -> Bob

// Bob
await rtcPeerConnection.setRemoteDescription(offer)
const answer = await rtcPeerConnection.createAnswer()
await rtcPeerConnection.setLocalDescription(answer)

//// Bob -> Alice

// Alice
await rtcPeerConnection.setRemoteDescription(answer)
```


## ice

offer/answer の交換の横で
ice candidate が生成される。
これを相手に送り、送られてくるものは適用する。
(最後に null な candidate が発生する場合があるが、送る必要はない)


```javascript
// Alice
rtcPeerConnection.onicecandidate = (e) => {
  /// Alice -> Bob
}

// Bob
await rtcPeerConnection.addIceCandidate(candidate)
```


## ontrack

ice の交換が完了し、相手からの track が届くと ontrack が発火する。

```
rtcPeerConnection.ontrack = (e) => {
  document.querySelector('video.remote').srcObject = e.streams[0]
}
```


## compat

- chrome は addTrack がなく addStream しかない
- だいたい onaddtrack がなく onaddstream しかない
- Edge は FormData.prototype.get() がない
- Edge は new RTCPeerConnection() の引数を省略できない
