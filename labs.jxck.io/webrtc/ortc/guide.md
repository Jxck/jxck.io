# RTCIceGatherer

RTCIceGatherer は local ICE candidate を集め RTCIceTransport に送る。複数の Transport を fork できるように複数の RTCIceTransport に紐付けられる。

```js
let gatherOptions = {
  gatherPolicy: 'relay',
  iceservers: [
    { urls: 'stun:stun.example.net' },
    { urls: 'turn:turn.example.org', username: 'user', credential: 'pass' }
  ]
};

let rtpIceGatherer = new RTCIceGatherer(gatherOptions);

rtpIceGatherer.onlocalcandidate = (event) => {
  if (event.complete) {
    // 最後の candidate の場合 complete = true になる
  }

  console.log(event.candidate);
  // これをシグナリングで交換
  // こんなの
  // {
  //   foundation: "abcd1234",
  //   priority: 1694498815,
  //   ip: "192.0.2.33",
  //   protocol: "udp", // "tcp", "udp"
  //   port: 10000,
  //   type: "host" // "host", "srflx", "prflx", "relay" (2.5.4)
  //   tcpType: "active", // "active", "passive", "so" (2.5.3)
  //   relatedAddress: "";
  //   relatedPort: 999;
  // }
};
```


## RTCIceTcpCandidateType

```
enum RTCIceTcpCandidateType {
    "active",
    "passive",
    "so"
};
```

- active: outboud は試みるが、incomming は受け付けない
- passive: outboud は試みないが、incomming は受け付ける
- so: 両方やってコネクションを開く


## RTCIceCandidateType

```
enum RTCIceCandidateType {
    "host",
    "srflx",
    "prflx",
    "relay"
};
```

- srflx: server reflexive candidate.
- prflx: peer reflexive candidate.


# RTCIceTransport

ICE の情報を送信するために、 Transport に紐付けるたものオブジェクト。
Parameter と Candidate を食わせる。
(MS のデモでは食わせていない?)

```js
// RTCIceGatherer に紐付いた Transport を作る
let rtcIceTransport = new RTCIceTransport(rtpIceGatherer);

let rtcIceParametersLocal = rtpIceGatherer.getLocalParameters();
// ===> 送る

let rtcIceParameterRemote = // <=== 受ける
// { usernameFragment: 'xxx', password: 'yyy' }

// Transport を start する。 role (controlling/controlled) を指定
rtcIceTransport.start(rtcIceGatherer, rtcIceParametersRemote, 'controlling');

// Candidate を交換
let candidateRemote = // <=== 受け取る
rtcIceTransport.addRemoteCandidate(candidateRemote.candidate);
```


# RTCDtlsTransport

IceTrasnport (RTP) を暗号化する DTLS のオブジェクト。
RTCDtlsTransport は RTCIceTransport を使い、 peer への経路を選択する。

```js
let rtcDtlsTransport = new RTCDtlsTransport(rtcIceTransport);

let rtcDtlsParametersLocal = rtcDtlsTransport.getLocalParameters();
// ===> 送る

let rtcDtlsParametersRemote = // <=== 受ける

rtcDtlsTransport.start(rtcDtlsParametersRemote);
```


# MediaStreamTrack

別仕様: https://w3c.github.io/mediacapture-main/getusermedia.html

MediaStream から Track を取得する。

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }
}).then((stream) => {
  let audioTracks = stream.getAudioTracks();
  let audioTrack = audioTracks[0];

  let videoTracks = stream.getVideoTracks();
  let videoTrack = videoTracks[0];

  return Promise.resolve({
    stream,
    audioTrack,
    videoTrack,
  });
});
```

ちなみに MediaStreamTrack を Stream に戻して再生する場合

```js
// stream にまとめる
let stream = new MediaStream();
stream.addTrack(videoTrack);
stream.addTrack(audioTrack);

// video タグに流す
let video = document.querySelector('video');
video.srcObject = stream;
```


# RTCRtpSender/RTCRtpReceiver

Example 9

MediaStreamTrack を Sender/Receiver にひもづける。
Sender は入力 track を DTLS で送信する。
Receiver はメディアをデコードして track を生成する。
video/audio など track ごとに以下をやる。

capabilities を交換すると stream が流れ始めるはず。
この capabilities は static method なので、一回やればよいはず。
なのに MS はこれを何度もやっている。値は変わらないと思うんだが。。

```js
let rtcRtpSender = new RTCRtpSender(mediaStreamTrack , rtcDtlsTransport);
let rtcRtpReceiver = new RTCRtpReceiver(rtcDtlsTransport);

// これは一回でいいはず。
let rtcRtpCapabilitiesRecv = RTCRtpReceiver.getCapabilities("video");
let rtcRtpCapabilitiesSend = RTCRtpSender.getCapabilities("video");

// 交換
// rtcRtpCapabilitiesRecv
// rtcRtpCapabilitiesSend

let rtcRtpParametersSend = cap2param(rtcRtpCapabilitiesSend, rtcRtpCapabilitiesRecv);
let rtcRtpParametersRecv = cap2param(rtcRtpCapabilitiesRecv, rtcRtpCapabilitiesSend);

rtcRtpSender.send(rtcRtpParametersSend);
rtcRtpReceiver.receive(rtcRtpParametersRecv);

rtcRtpSender.onssrcconflict = (event) => {
  console.log(event.ssrc);
}

rtcRtpSender.stop();
rtcRtpReceiver.stop();
```

# cap2param

仕様にはまだコードでは書かれない。

```js
RTCRtpParameters function cap2param(RTCRtpCapabilities sendCaps, RTCRtpCapabilities remoteRecvCaps) {
  // Function returning the sender RTCRtpParameters, based on the local sender and remote receiver capabilities.
  // The goal is to enable a single stream audio and video call with minimum fuss.
  //
  // Steps to be followed:
  // 1. Determine the RTP features that the receiver and sender have in common.
  // 2. Determine the codecs that the sender and receiver have in common.
  // 3. Within each common codec, determine the common formats, header extensions and rtcpFeedback mechanisms.
  // 4. Determine the payloadType to be used, based on the receiver preferredPayloadType.
  // 5. Set RTCRtcpParameters such as mux to their default values.
  // 6. Return RTCRtpParameters enablig the jointly supported features and codecs.
}
```

こんな感じか。

```js
// Function returning the sender RTCRtpParameters, based on the local sender and remote receiver capabilities.
// The goal is to enable a single stream audio and video call with minimum fuss.
//
// Steps to be followed:
// 1. Determine the RTP features that the receiver and sender have in common.
// 2. Determine the codecs that the sender and receiver have in common.
// 3. Within each common codec, determine the common formats, header extensions and rtcpFeedback mechanisms.
// 4. Determine the payloadType to be used, based on the receiver preferredPayloadType.
// 5. Set RTCRtcpParameters such as mux to their default values.
// 6. Return RTCRtpParameters enablig the jointly supported features and codecs.
function Caps2Params(sendCaps, recvCaps) {
  if (!sendCaps || !recvCaps) return;

  // 1. Determine the RTP features that the receiver and sender have in common.
  let muxId = '';
  let encodings = [];

  // 2. Determine the codecs that the sender and receiver have in common.
  let codecs = filterCodecParams(sendCaps.codecs, recvCaps.codecs);

  // 3. Within each common codec, determine the common formats, header extensions and rtcpFeedback mechanisms.
  let headerExtensions = filterHeaderExtensions(sendCaps.headerExtensions, recvCaps.headerExtensions);

  // 5. Set RTCRtcpParameters such as mux to their default values.
  let rtcp = { ssrc: 0, cname: '', reducedSize: false, mux: true };

  // 6. Return RTCRtpParameters enablig the jointly supported features and codecs.
  return { muxId, headerExtensions, encodings, rtcp, codecs };
}

function filterHeaderExtensions(sendHeaderEx, recvHeaderEx) {
  return sendHeaderEx.filter((elem) => {
    return recvHeaderEx.includes(elem);
  });
}

function filterCodecParams(sendCodecs, recvCodecs) {
  let codecPrms = [];

  for (let i = 0; i < sendCodecs.length; i++) {
    let send = sendCodecs[i];
    for (let j = 0; j < recvCodecs.length; j++) {
      let recv = recvCodecs[j];

      // 2. Determine the codecs that the sender and receiver have in common.
      let equality = send.name === recv.name
        && send.kind === recv.kind
        && send.preferredPayloadType === recv.preferredPayloadType
        && send.numChannels === recv.numChannels;

      if (equality) {

        // 3. Within each common codec, determine the common formats, header extensions and rtcpFeedback mechanisms.
        let rtcpFeedback = recv.rtcpFeedback;

        // 4. Determine the payloadType to be used, based on the receiver preferredPayloadType.
        let payloadType = recv.preferredPayloadType;

        let name = recv.name;
        let clockRate = recv.clockRate;
        let maxptime = recv.maxptime;
        let numChannels = recv.numChannels;
        let parameters = recv.parameters;

        codecPrms.push({ name, payloadType, clockRate, maxptime, numChannels, rtcpFeedback, parameters });

        break;
      }
    }
  }

  return codecPrms;
}
```

# RTCIceTransportController

Example 11

RTCIceTransportController は freezing/unfreezing と帯域推定を管理する。

```js
let controller = new RTCIceTransportController();
controller.addTransport(audioIceTransport);
controller.addTransport(videoIceTransport);

let rtcIceTransports = controller.getTransports();
```


# RTCRtpListener

RTCRtpListener は RTP stream が、どの RTCRtpReceiver へも送信できなかったことを onunhandledrtp イベントで検出する。

Example 12 はまだない

```js
let listener = new RTCRtpListener(transport);

listener.onunhandledrtp = (event) => {
  console.log(event.muxId, event.payloadType, event.ssrc);
}
```


# RTCRtpEncodingParameters


```js
dictionary RTCRtpEncodingParameters {
  // sender/receiver が active かどうか
  // off にしておくと何も送らないが
  // true に戻せばすぐ送れるので
  // 再度 add するより速い
  boolean             active = true;

  // エンコーディングごとのコーデックを指定
  // デフォルトはブラウザが設定する
  payloadtype         codecPayloadType;

  // 依存するレイヤの id
  // この仕様では RTCRtpEncodingParameters の中の値だけだが
  // MST が実装されれば、そこではマッチせず global 検索が走る
  sequence<DOMString> dependencyEncodingIds;

  DOMString           encodingId;

  RTCRtpFecParameters fec;
  RTCRtpRtxParameters rtx;


  // base レイヤからの相対値で帯域で使えるリソース
  // SVC でデフォルト 1.0
  double              priority = 1.0;


  unsigned long long  maxBitrate;
  double              minQuality = 0;
  double              framerateBias = 0.5;
  double              resolutionScale;
  double              framerateScale;

  // layering/encoding の SSRC
  // ssrc がなければ RTCRtpEncodingParameters が RTCRtpReceiver.receive()
  // に渡される。

  // The SSRC for this layering/encoding.
  // If ssrc is unset in a RTCRtpEncodingParameters object
  // passed to the RTCRtpReceiver.receive method,
  // the next unhandled SSRC will match,
  // and an RTCRtpUnhandledEvent will not be fired.
  // If ssrc is unset in a RTCRtpEncodingParameters object
  // passed to the RTCRtpSender.send method,
  // the browser will choose, and the chosen value is not reflected in
  // RTCRtpEncodingParameters.ssrc.
  // If the browser chooses the ssrc,
  // it may change it due to a collision without firing an RTCSsrcConflictEvent.
  // If ssrc is set in a RTCRtpEncodingParameters object
  // passed to the RTCRtpSender.send method and an SSRC conflict is detected,
  // then an RTCSsrcConflictEvent is fired (see Section 6.4).
  unsigned long       ssrc;
};
```

# RTCDtmfSender

興味無し


# RTCDataChannel/RTCSctpTransport

DataChannel は SCTP から。

```js
let rtcSctpTransport = new RTCSctpTransport(rtcDtlsTransport);

let rtcDataChannelParameters = {
  label             : '',
  ordered           : true,
  maxPacketLifetime : 100,
  maxRetransmits    : 100,
  protocol          : '',
  negotiated        : false,
  id                : 1,
};

let channel = new RTCDataChannel(rtcSctpTransport, rtcDataChannelParameters);
channel.onopen = () => {
  console.log('open');
};

channel.onmessage = (message) => {
  console.log(message.data);
};

channel.onerror = (err) => {
  console.error(err);
};

channel.onclose = () => {
  console.log('close');
};
```


# getStats()

stats の ID のリストってあるのだろうか？

```js
let rtcRtpSender = new RTCRtpSender(track);

rtcRtpSender.getStats().then((rtcStats) => {
  console.log(rtcStats.timestamp, rtcStats.id, rtcStats.type);
});
```

## RTCP サポート

```js
// Example of forking when RTP and RTCP are not multiplexed,
// so that both RTP and RTCP IceGatherer and IceTransport objects
// are needed.
// Assume that we have a way to signaling by signaller.

// Create ICE gather options
let rtcIceGatherOptions = new RTCIceGatherOptions({
  gatherPolicy: "relay",
  iceservers: [
    { urls: "stun:stun.example.net" },
    { urls: "turn:turn.example.org", username: "myName", credential: "myPassword" }
  ],
});

// Create ICE gatherer
let rtcIceGatherer = new RTCIceGatherer(rtcIceGatherOptions);
let rtcpIceGatherer = rtpIceGatherer.createAssociatedGatherer();

// Get Local Parameters
let rtcpIceParametersLocal = rtcpIceGatherer.getLocalParameters();
let userNameFragment = rtcIceParametersLocal.userNameFragment;

// Handle local candidate
rtcIceGatherer.onlocalcandidate = (event) => {
  // Handle RTCIceCandidateComplete
  if (event.complete) {
    console.log("all candidates are gathered");
  }

  // Sending gathered candidate to remote via signaling.
  // with component and user name fragment
  signaler.send("candidate", {
    candidate: event.candidate,
    component: "RTP",
    userNameFragment: userNameFragment,
  });
};

// Handle local candidate
rtcpIceGatherer.onlocalcandidate = (event) => {
  // Handle RTCIceCandidateComplete
  if (event.complete) {
    console.log("all candidates are gathered");
  }

  // Sending gathered candidate to remote via signaling.
  // with component and user name fragment
  signaller.send("candidate", {
    component: "RTCP",
    candidate: event.candidate,
    userNameFragment: userNameFragment,
  });
};

// Initialize the ICE transport arrays
let transports = {
  RTP: [],
  RTCP: [],
};

// Receive remote parameter from singaling
signaler.onparameters = (params) => {
  // May get multiple params

  // Create the ICE RTP and RTCP transports
  let rtcIceTransport = new RTCIceTransport(rtcIceGatherer);
  let rtcpIceTransport = rtcIceTransport.createAssociatedTransport();

  // Start the RTP and RTCP ICE transports so that outgoing ICE connectivity checks can begin.
  rtcIceTransport.start(rtcIceGatherer, params.rtpIceParameters, "controlling");
  rtcpIceTransport.start(rtcpIceGatherer, params.rtcpIceParameters, "controlling");

  // Push transport to transport arrays
  transports.RTP.push(rtcIceTransport);
  transports.RTCP.push(rtcpIceTransport);
});

// Receive remote candidate from signalling
signaller.oncandidate = (remote) => {
  // Locate the ICE transport that the signaled candidate
  // relates to by matching the userNameFragment.
  transports[remote.component].forEach((transport) => {
    if (transport.getRemoteParameters().userNameFragment === remote.userNameFragment) {
      transport.addRemoteCandidate(remote.candidate);
    }
  });
};

// Sending parameter to remote via signaling
signaler.send("parameters", {
  rtpIceParameters: iceRtpGatherer.getLocalParameters(),
  rtcpIceParameters: iceRtcpGatherer.getLocalParameters(),
});
```


## よくわからない

ex11.js

### bundle

同じ RTP 上に audio/video を多重化する。 WebRTC 1.0 はそうだった。
これは RTCRtpReceiver/Sender を同じ RTCDtlsTransport から複数作ればいい。

### mux

RTP と RTCP を多重化する。


### 実現方法

- bundle したい
 - bundle するなら mux もするので ICE と DTLS は一つでいい
 - controller も必要ない
 - audio/video 両方の sender/receiver の transport を全部同じにする

- bundle しないけど mux したい
 - audio/vide の rtcIceTransport を controller に追加
 - RTCP がいらない?

- bundle も mux もしない
 - audio/video RTP/RTCP 全部揃える
 - controller に transport を追加
