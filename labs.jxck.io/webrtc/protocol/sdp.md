# SDP

## Intro

SDP は汎用的なフォーマットで複数のキーがあるが、 WebRTC で使う主なものだけ抑える。

## format


```
v=0                                                                       # バージョン、基本 0
o=- 6689077237774771695 2 IN IP4 127.0.0.1                                # 後述
s=-                                                                       # セッション名
t=0 0                                                                     # 後述
a=group:BUNDLE audio video                                                # 後述
a=msid-semantic: WMS 1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK

m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0 a=ice-ufrag:czZI
a=ice-pwd:b3hod01i1AZLhfFKqAPVmKeB
a=ice-options:trickle
a=fingerprint:sha-256 3A:46:CD:38:CF:B6:B0:A7:3D:A9:71:46:A8:B5:FC:BA:74:D0:15:A4:A8:2D:FA:AD:EC:C2:0A:8E:F0:76:61:68
a=setup:actpass
a=mid:audio
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=sendrecv
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
a=ssrc:1087956479 cname:dTFsN4wQXA1OE9M9
a=ssrc:1087956479 msid:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK 525a63f7-415f-485e-ab8a-d3ac3cbeef56
a=ssrc:1087956479 mslabel:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK
a=ssrc:1087956479 label:525a63f7-415f-485e-ab8a-d3ac3cbeef56

m=video 9 UDP/TLS/RTP/SAVPF 96 98 100 102 127 97 99 101 125
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:czZI
a=ice-pwd:b3hod01i1AZLhfFKqAPVmKeB
a=ice-options:trickle
a=fingerprint:sha-256 3A:46:CD:38:CF:B6:B0:A7:3D:A9:71:46:A8:B5:FC:BA:74:D0:15:A4:A8:2D:FA:AD:EC:C2:0A:8E:F0:76:61:68
a=setup:actpass
a=mid:video
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:4 urn:3gpp:video-orientation
a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
a=sendrecv
a=rtcp-mux
a=rtcp-rsize
a=rtpmap:96 VP8/90000
a=rtcp-fb:96 ccm fir
a=rtcp-fb:96 nack
a=rtcp-fb:96 nack pli
a=rtcp-fb:96 goog-remb
a=rtcp-fb:96 transport-cc
a=rtpmap:98 VP9/90000
a=rtcp-fb:98 ccm fir
a=rtcp-fb:98 nack
a=rtcp-fb:98 nack pli
a=rtcp-fb:98 goog-remb
a=rtcp-fb:98 transport-cc
a=rtpmap:100 H264/90000
a=rtcp-fb:100 ccm fir
a=rtcp-fb:100 nack
a=rtcp-fb:100 nack pli
a=rtcp-fb:100 goog-remb
a=rtcp-fb:100 transport-cc
a=fmtp:100 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
a=rtpmap:102 red/90000
a=rtpmap:127 ulpfec/90000
a=rtpmap:97 rtx/90000
a=fmtp:97 apt=96
a=rtpmap:99 rtx/90000
a=fmtp:99 apt=98
a=rtpmap:101 rtx/90000
a=fmtp:101 apt=100
a=rtpmap:125 rtx/90000
a=fmtp:125 apt=102
a=ssrc-group:FID 16005811 4271635085
a=ssrc:16005811 cname:dTFsN4wQXA1OE9M9
a=ssrc:16005811 msid:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK 121be745-e3b9-4a84-bbab-204b638e4c94
a=ssrc:16005811 mslabel:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK
a=ssrc:16005811 label:121be745-e3b9-4a84-bbab-204b638e4c94
a=ssrc:4271635085 cname:dTFsN4wQXA1OE9M9
a=ssrc:4271635085 msid:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK 121be745-e3b9-4a84-bbab-204b638e4c94
a=ssrc:4271635085 mslabel:1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK
a=ssrc:4271635085 label:121be745-e3b9-4a84-bbab-204b638e4c94
```

## Origin

```
o=- 6689077237774771695 2 IN IP4 127.0.0.1
```

内訳は以下

- username:        - (重要でない場合 `-`)
- session_id:      6689077237774771695 (セッションの一意な識別子, NTP 形式タイムスタンプが使われる)
- session_version: 2 (ツールによって用途が違う)
- nettype:         IN (Internet の略、今の所他にない)
- addrtype:        IP4 (IPv4 or v6)
- unicast_address: 127.0.0.1


## Timing

```
t=0 0
```

セッションの開始/終了時間を示す。


## Attributes

`a=` は頻出する。

`:` の有無で、 Value のみか Key:Value の形で表す。

```
a=sendrecv
a=group:BUNDLE audio video
```

`m=` よりも手前の `a=` はセッションレベルのものであり、 `m=` 以降に出るものは、そのメディアレベルの値になる。

各属性の意味は後述。


## Media Descriptions

https://tools.ietf.org/html/rfc4566#section-5.14

```
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
a=rtcp:9 IN IP4 0.0.0.0 a=ice-ufrag:czZI
```

内訳は以下

- media: audio (webrtc では video か audio)
- port:  9 (このポートにメディアが送信される)
- proto: UDP/TLS/RTP/SAVPF (プロトコル)
- fmt:   111 103 104 9 0 8 106 105 13 110 112 113 126 (RTP/SAVP の場合、ペイロードタイプ番号が指定され、以降の `a=rtpmap:`, `a=fmtp:` にマップされる。

Payload Type (PT) は IANA にリストがあり、 0-95 までは登録されており、 96-127 は dynamic になっている。
PCMU や PCMA などあるが、動画系はあまり登録されてないので 100 以降が多い。

https://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-1

この値が RTP の PayloadType ヘッダになる。

dynamic な場合は、 SDP の rtpmap でフォーマットと PT の番号が紐付けられる。

fmt で、例えば最初の `111` は以下に紐づく。

```
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
```


ここでは rtcp:9 が 0.0.0.0 になっており、 Discard Port になっている。つまり無視。


### プロファイル

https://tools.ietf.org/html/rfc3551

- udp: UDP 上の任意のプロトコル
- RTP/AVP(Audio-Visual Profile): Audio/Video Conf with Minimal Control の Profile
- RTP/SAVP(Secure AVP): over SRTP
- AVPF: AVP Feedback
- SAVPF: SAVP Feedback



## SDP 属性

### SSRC(syncronization source)

ランダムにふられる 32bit 同期ソース識別子。
RTP セッション内の参加者の識別、もっといえばストリームの識別に使われる。
かぶらないように質の高い乱数と、衝突検知を実装すべき。
IP や Port が変わっても引き継げるが、セッションが終わると消えるので、その場合別途 CNAME を振る。

これが RTP の SSRC ヘッダになる。

(ミキサがあって複数の SSRC を合成する場合、結果には新しい SSRC を振り、そこの CSRC に素材となった SSRC のリストを入れる)


### rtpmap


```
a=rtpmap:111 opus/48000/2
a=rtpmap:96 VP8/90000
```

`m=` の 111 や 96 にひも付き、 opus/48kHz と VP8/90kHz であることを示す。
最後の 2 はオプションパラメータで、音声の場合はチャネルの数を表す。 2 なのでステレオ。


### fmtp

format specific parameter なのでフォーマットごとに定義。

### send/recv/only/inactive

そのままの意味

- recvonly
- sendrecv
- sendonly
- inactive


## rtcp-fb

RFC5124 に定義。


## rtcp-mux

RFC5761 に定義。

rtp と rtcp を単一ポートで多重化


## mid

```
a=mid:audio
a=mid:video
```

https://tools.ietf.org/html/rfc5888

これが BUNDLE に使われる MediaStream ID

これを使うには extmap の urn:ietf:params:rtp-hdrext:sdes:mid が各 m= に必要

RTP ヘッダの ExtBody にその値が入る。


## group:BUNDLE audio video

```
a=group:BUNDLE audio video
```

mid:audio と mid:video を多重化

rtcp-mux と合わせると、一つのポートに rtp/rtcp x video/audio 全部が多重化される。


https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation に定義


## msid-semantic

SDP の media description と WebRTC の MediaStream / MediaStreamTrack を紐付けるためのメカニズム。


- stream.id: MEDIASTREAMID
  - audiotrack.id: AUDIOTRACKID
  - videotrack.id: VIDEOTRACKID

PeerConnection 中の WMS (webrtc media stream) の ID

該当の SSRC が、同じ MediaStream に属する Track であることを示す。

https://tools.ietf.org/html/draft-ietf-mmusic-msid に定義

(https://webrtchacks.com/wp-content/themes/parament/custom-pages/sdp/6.html)


```
a=msid-semantic: WMS MEDIASTREAMID
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
  a=msid:MEDIASTREAMID AUDIOTRACKID
  a=ssrc:3544618296 cname:CANONICALNAME
  a=ssrc:3544618296 msid:MEDIASTREAMID AUDIOTRACKID
  a=ssrc:3544618296 mslabel:MEDIASTREAMID
  a=ssrc:3544618296 label:AUDIOTRACKID
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123
  a=msid:MEDIASTREAMID VIDEOTRACKID
  a=ssrc:3966812810 cname:CANONICALNAME
  a=ssrc:3966812810 msid:MEDIASTREAMID VIDEOTRACKID
  a=ssrc:3966812810 mslabel:MEDIASTREAMID
  a=ssrc:3966812810 label:VIDEOTRACKID
  a=ssrc:3207461368 cname:CANONICALNAME
  a=ssrc:3207461368 msid:MEDIASTREAMID VIDEOTRACKID
  a=ssrc:3207461368 mslabel:MEDIASTREAMID
  a=ssrc:3207461368 label:VIDEOTRACKID
```



CNAME はたぶん SDES(Source Description: 補足情報) に入るやつ。
SSRC は再起動や衝突検知時に変わるが、それを超えた恒久的な識別子。

拡張の定義はここ https://tools.ietf.org/html/rfc5576#section-6.1
CNAME を決める上での追加仕様は https://tools.ietf.org/html/rfc7022



## Plan B/Unified Plan

複数のトラックを送る場合

- PlanB: m= に複数 a=ssrc がある
- Unified: m= が複数

Unified Plan では

- msid
- mslabel
- label

この 3 つはいらない。



## ICE

https://tools.ietf.org/html/rfc8445#section-7.2.2

ice-ufrag の値が双方で連結され、 STUN の USERNAME に使われる。

```
// L
a=ice-ufrag:LFRAG
a=ice-pwd:LPASS

// R
a=ice-ufrag:RFRAG
a=ice-pwd:RPASS
```

この場合

L -> R の STUN Binding は

- username: RFRAG:LFRAG
- password: RPASS


R -> L の STUN Binding は

- username: LFRAG:RFRAG
- password: LPASS


ufrag は最低 3byte の乱数
pass  は最低 16byte の乱数


## Fingerprint

DTLS-SRTP のコネクションを確立する際に使われる証明書のハッシュ値。

```
a=fingerprint:sha-256 3A:46:CD:38:CF:B6:B0:A7:3D:A9:71:46:A8:B5:FC:BA:74:D0:15:A4:A8:2D:FA:AD:EC:C2:0A:8E:F0:76:61:68
```

このシグナリングの後に実施される DTLS-SRTP のハンドシェイクで送られる Certificate の検証に使われる。

相手から受け取った証明書も、シグナリングで受け取った Fingerprint と比較し、なりすましが行われていないか検証する。

RFC5763 に記載。


## Setup

- https://tools.ietf.org/html/rfc5763#section-5
- https://tools.ietf.org/html/rfc4145

DTLS のネゴシエーションを開始すべきエンドポイントを決める。

```
a=setup:actpass
```

値は以下の 4 つがある。

- active: 接続要求(ClientHello)を出す
- passive: 接続を受け入れる
- actpass: active/passive どちらにもなる
- holdconn: 一時的にコネクションの確率を望まない


offerer は actpass (MUST) にし ClientHello を待つ
answerer は active/apssive どちらかを選ぶ
- passive の場合: Answer 送ってから ClientHello を待つ
- active の場合: Answer と CH をパラで送る、こっちが RECOMMENDED


## plan B

https://tools.ietf.org/html/draft-uberti-rtcweb-plan-00

例えば、複数のマイクからの音声を送る場合、 "m=" line をマイクごとに記述にする。

しかし、各 "m=" line 対して別トランスポートを割り当てたいとは限らない。

多重化する場合は、トランスポートは 1 つで良い。

そこで、トランスポートに対して "m=" line は 1 つにし、それを "envelope" とする。

その中に、マイクごとの定義を、 "a=ssrc" で記述する。

```
m=audio 49170 RTP/AVP 101
a=ssrc:1 msid:left-mic
a=ssrc:2 msid:center-mic
a=ssrc:3 msid:right-mic
```


## Plan A - Unified Plan

https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00

Plan A は、 "m=" line をメディアごとに書くというシンプルな方法。

もし多重化したい場合は、対象の "m=" line に対して BUNDLE を指定する。

この方式が WebRTC の標準として合意され、現在は Unified Plan として策定が進んでいる。

```
...
a=group:BUNDLE m1 m2 m3
...
m=audio 56600 RTP/SAVPF 0 109
a=msid:left-mic
a=mid:m1
...
m=video 56601 RTP/SAVPF 99 120
a=msid:center-mic
a=mid:m2
...
m=video 56602 RTP/SAVPF 99 120
a=msid:right-mic
a=mid:m3
...
```


chrome は B から unified plan に移行中

```javascript
new RTCPeerConnection({SdpSemantics: "unified-plan"})
```



## rtcp-rsize

https://tools.ietf.org/html/rfc5506

rtcp-fb のフィードバックメッセージを Reduced-Size で送れる。
media-level only で指定可能。

a=candidate とは一緒に使えない?

https://docs.microsoft.com/en-us/openspecs/office_protocols/ms-sdpext/6cbe6c6c-3ff4-4f45-9fae-f91d1581af8f


## rtcp-fb

https://tools.ietf.org/html/rfc4585#section-4.2

RTCP に入れる fb
これも candidate とは使えないらしい?

https://docs.microsoft.com/en-us/openspecs/office_protocols/ms-sdpext/f60da330-a9f2-4e46-8fd7-49890c847a81


## ssrc-audio-level

ミキサへオーディオレベルを通知する。






Chrome Offer

```
v=0
  o=- 6260232336951563794 2 IN IP4 127.0.0.1
  s=-
  t=0 0
  a=group:BUNDLE 0 1
  a=msid-semantic: WMS xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
  c=IN IP4 0.0.0.0
  a=rtcp:9 IN IP4 0.0.0.0
  a=ice-ufrag:/LV/
  a=ice-pwd:gD9yGwDqpeholVd+1ltdfZV5
  a=ice-options:trickle
  a=fingerprint:sha-256 A8:4E:78:DD:6E:35:CA:7B:42:14:98:74:CD:D5:39:92:31:36:E4:11:C3:00:1A:66:6B:6D:E7:E8:9B:DF:55:E5
  a=setup:actpass
  a=mid:0
  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
  a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
  a=sendrecv
  a=msid:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R 8f158261-fbfe-46e3-9308-bff41c6ab5bc
  a=rtcp-mux
  a=rtpmap:111 opus/48000/2
  a=rtcp-fb:111 transport-cc
  a=fmtp:111 minptime=10;useinbandfec=1
  a=rtpmap:103 ISAC/16000
  a=rtpmap:104 ISAC/32000
  a=rtpmap:9 G722/8000
  a=rtpmap:0 PCMU/8000
  a=rtpmap:8 PCMA/8000
  a=rtpmap:106 CN/32000
  a=rtpmap:105 CN/16000
  a=rtpmap:13 CN/8000
  a=rtpmap:110 telephone-event/48000
  a=rtpmap:112 telephone-event/32000
  a=rtpmap:113 telephone-event/16000
  a=rtpmap:126 telephone-event/8000
  a=ssrc:2237583698 cname:cY6knVqUdUbAHGND
  a=ssrc:2237583698 msid:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R 8f158261-fbfe-46e3-9308-bff41c6ab5bc
  a=ssrc:2237583698 mslabel:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R
  a=ssrc:2237583698 label:8f158261-fbfe-46e3-9308-bff41c6ab5bc
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123
  c=IN IP4 0.0.0.0
  a=rtcp:9 IN IP4 0.0.0.0
  a=ice-ufrag:/LV/
  a=ice-pwd:gD9yGwDqpeholVd+1ltdfZV5
  a=ice-options:trickle
  a=fingerprint:sha-256 A8:4E:78:DD:6E:35:CA:7B:42:14:98:74:CD:D5:39:92:31:36:E4:11:C3:00:1A:66:6B:6D:E7:E8:9B:DF:55:E5
  a=setup:actpass
  a=mid:1
  a=extmap:14 urn:ietf:params:rtp-hdrext:toffset
  a=extmap:13 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
  a=extmap:12 urn:3gpp:video-orientation
  a=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
  a=extmap:11 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
  a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type
  a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing
  a=extmap:8 http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07
  a=extmap:9 http://www.webrtc.org/experiments/rtp-hdrext/color-space
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
  a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
  a=sendrecv
  a=msid:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R 619da95c-8508-4346-ab33-1449ad8eacd1
  a=rtcp-mux
  a=rtcp-rsize
  a=rtpmap:96 VP8/90000
  a=rtcp-fb:96 goog-remb
  a=rtcp-fb:96 transport-cc
  a=rtcp-fb:96 ccm fir
  a=rtcp-fb:96 nack
  a=rtcp-fb:96 nack pli
  a=rtpmap:97 rtx/90000
  a=fmtp:97 apt=96
  a=rtpmap:98 VP9/90000
  a=rtcp-fb:98 goog-remb
  a=rtcp-fb:98 transport-cc
  a=rtcp-fb:98 ccm fir
  a=rtcp-fb:98 nack
  a=rtcp-fb:98 nack pli
  a=fmtp:98 profile-id=0
  a=rtpmap:99 rtx/90000
  a=fmtp:99 apt=98
  a=rtpmap:100 VP9/90000
  a=rtcp-fb:100 goog-remb
  a=rtcp-fb:100 transport-cc
  a=rtcp-fb:100 ccm fir
  a=rtcp-fb:100 nack
  a=rtcp-fb:100 nack pli
  a=fmtp:100 profile-id=2
  a=rtpmap:101 rtx/90000
  a=fmtp:101 apt=100
  a=rtpmap:102 H264/90000
  a=rtcp-fb:102 goog-remb
  a=rtcp-fb:102 transport-cc
  a=rtcp-fb:102 ccm fir
  a=rtcp-fb:102 nack
  a=rtcp-fb:102 nack pli
  a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f
  a=rtpmap:122 rtx/90000
  a=fmtp:122 apt=102
  a=rtpmap:127 H264/90000
  a=rtcp-fb:127 goog-remb
  a=rtcp-fb:127 transport-cc
  a=rtcp-fb:127 ccm fir
  a=rtcp-fb:127 nack
  a=rtcp-fb:127 nack pli
  a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f
  a=rtpmap:121 rtx/90000
  a=fmtp:121 apt=127
  a=rtpmap:125 H264/90000
  a=rtcp-fb:125 goog-remb
  a=rtcp-fb:125 transport-cc
  a=rtcp-fb:125 ccm fir
  a=rtcp-fb:125 nack
  a=rtcp-fb:125 nack pli
  a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
  a=rtpmap:107 rtx/90000
  a=fmtp:107 apt=125
  a=rtpmap:108 H264/90000
  a=rtcp-fb:108 goog-remb
  a=rtcp-fb:108 transport-cc
  a=rtcp-fb:108 ccm fir
  a=rtcp-fb:108 nack
  a=rtcp-fb:108 nack pli
  a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f
  a=rtpmap:109 rtx/90000
  a=fmtp:109 apt=108
  a=rtpmap:124 red/90000
  a=rtpmap:120 rtx/90000
  a=fmtp:120 apt=124
  a=rtpmap:123 ulpfec/90000
  a=ssrc-group:FID 4259030779 2258171460
  a=ssrc:4259030779 cname:cY6knVqUdUbAHGND
  a=ssrc:4259030779 msid:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R 619da95c-8508-4346-ab33-1449ad8eacd1
  a=ssrc:4259030779 mslabel:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R
  a=ssrc:4259030779 label:619da95c-8508-4346-ab33-1449ad8eacd1
  a=ssrc:2258171460 cname:cY6knVqUdUbAHGND
  a=ssrc:2258171460 msid:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R 619da95c-8508-4346-ab33-1449ad8eacd1
  a=ssrc:2258171460 mslabel:xh9SvPOATf33EzGLLQG5FHu5XDJnnqJuTR2R
  a=ssrc:2258171460 label:619da95c-8508-4346-ab33-1449ad8eacd1
```

Firefox Answer

```
v=0
o=mozilla...THIS_IS_SDPARTA-67.0.1 8591050576710649603 0 IN IP4 0.0.0.0
s=-
t=0 0
a=sendrecv
a=fingerprint:sha-256 93:89:CB:41:D6:D5:95:16:F6:6D:B9:28:A4:89:6A:41:66:0A:00:D1:18:C2:BD:8E:74:E3:B4:5C:E2:59:76:12
a=group:BUNDLE 0 1
a=ice-options:trickle
a=msid-semantic:WMS *
m=audio 9 UDP/TLS/RTP/SAVPF 111 126
  c=IN IP4 0.0.0.0
  a=sendrecv
  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=fmtp:111 maxplaybackrate=48000;stereo=1;useinbandfec=1
  a=fmtp:126 0-15
  a=ice-pwd:2bb1e5c9373c236519f1b3058e83c798
  a=ice-ufrag:2ca433e6
  a=mid:0
  a=msid:{3228bc5b-8c61-4aca-95e5-3f7cfe298dcf} {7cde209f-3ab1-4797-bae1-ca9b041d94b1}
  a=rtcp-mux
  a=rtpmap:111 opus/48000/2
  a=rtpmap:126 telephone-event/8000
  a=setup:active
  a=ssrc:3472359492 cname:{879910c3-5bc9-440b-ab51-0719bda8ea2e}
m=video 9 UDP/TLS/RTP/SAVPF 96
  c=IN IP4 0.0.0.0
  a=sendrecv
  a=extmap:14 urn:ietf:params:rtp-hdrext:toffset
  a=extmap:13 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=fmtp:96 max-fs=12288;max-fr=60
  a=ice-pwd:2bb1e5c9373c236519f1b3058e83c798
  a=ice-ufrag:2ca433e6
  a=mid:1
  a=msid:{3228bc5b-8c61-4aca-95e5-3f7cfe298dcf} {bb441de0-9216-454b-a79e-46fba50e8368}
  a=rtcp-fb:96 nack
  a=rtcp-fb:96 nack pli
  a=rtcp-fb:96 ccm fir
  a=rtcp-fb:96 goog-remb
  a=rtcp-mux
  a=rtpmap:96 VP8/90000
  a=setup:active
  a=ssrc:1997753098 cname:{879910c3-5bc9-440b-ab51-0719bda8ea2e}
```



Firefox Offer

```
offer v=0
o=mozilla...THIS_IS_SDPARTA-67.0.1 1193231009729144630 0 IN IP4 0.0.0.0
  s=-
  t=0 0
  a=fingerprint:sha-256 8F:71:FE:26:4B:7E:38:B4:54:3C:86:00:85:81:CC:EC:F1:27:F0:C6:1A:B1:7A:81:B0:97:28:5B:24:99:C2:4B
  a=group:BUNDLE 0 1
  a=ice-options:trickle
> a=msid-semantic:WMS *
m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
  c=IN IP4 0.0.0.0
  a=sendrecv
  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1
  a=fmtp:101 0-15
  a=ice-pwd:7681247a56a61a52a9218fcefaab5806
  a=ice-ufrag:0b452e2c
> a=mid:0
  a=msid:{50f2ac7f-2feb-42f4-b50d-4068860714bd} {0111ba4d-8fcc-4090-a326-6592ad0b845b}
  a=rtcp-mux
  a=rtpmap:109 opus/48000/2
  a=rtpmap:9 G722/8000/1
  a=rtpmap:0 PCMU/8000
  a=rtpmap:8 PCMA/8000
  a=rtpmap:101 telephone-event/8000/1
  a=setup:actpass
  a=ssrc:760432701 cname:{b3890c36-e4e3-41e6-b53b-a2e39befb17d}
m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
  c=IN IP4 0.0.0.0
  a=sendrecv
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
  a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
  a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
  a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1
  a=fmtp:120 max-fs=12288;max-fr=60
  a=fmtp:121 max-fs=12288;max-fr=60
  a=ice-pwd:7681247a56a61a52a9218fcefaab5806
  a=ice-ufrag:0b452e2c
> a=mid:1
  a=msid:{50f2ac7f-2feb-42f4-b50d-4068860714bd} {dd7d72ce-1523-42de-81c9-84f9a083a3cc}
  a=rtcp-fb:120 nack
  a=rtcp-fb:120 nack pli
  a=rtcp-fb:120 ccm fir
  a=rtcp-fb:120 goog-remb
  a=rtcp-fb:121 nack
  a=rtcp-fb:121 nack pli
  a=rtcp-fb:121 ccm fir
  a=rtcp-fb:121 goog-remb
  a=rtcp-fb:126 nack
  a=rtcp-fb:126 nack pli
  a=rtcp-fb:126 ccm fir
  a=rtcp-fb:126 goog-remb
  a=rtcp-fb:97 nack
  a=rtcp-fb:97 nack pli
  a=rtcp-fb:97 ccm fir
  a=rtcp-fb:97 goog-remb
  a=rtcp-mux
  a=rtpmap:120 VP8/90000
  a=rtpmap:121 VP9/90000
  a=rtpmap:126 H264/90000
  a=rtpmap:97 H264/90000
  a=setup:actpass
  a=ssrc:965687821 cname:{b3890c36-e4e3-41e6-b53b-a2e39befb17d}
```



Chrome Answer

```
v=0
o=- 6048506604369717355 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
a=msid-semantic: WMS nsdYHPJiUS13bftMo3yoB3UuEIfzH3ct4nqO
m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
  c=IN IP4 0.0.0.0
  a=rtcp:9 IN IP4 0.0.0.0
  a=ice-ufrag:zkA9
  a=ice-pwd:eIP43GF+li/YrhuNf74xEFPq
  a=ice-options:trickle
  a=fingerprint:sha-256 C1:7A:0E:4D:E8:2E:00:98:C0:F5:B7:A6:3F:B6:D4:E9:DA:86:29:7F:70:60:25:F6:64:47:D4:03:77:8C:64:47
  a=setup:active
  a=mid:0
  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=sendrecv
  a=msid:nsdYHPJiUS13bftMo3yoB3UuEIfzH3ct4nqO 4de3d534-3e19-402e-9696-d383fb82d6ee
  a=rtcp-mux
  a=rtpmap:109 opus/48000/2
  a=fmtp:109 minptime=10;useinbandfec=1
  a=rtpmap:9 G722/8000
  a=rtpmap:0 PCMU/8000
  a=rtpmap:8 PCMA/8000
  a=rtpmap:101 telephone-event/8000
  a=ssrc:78701041 cname:HKO+L0fcEgQ/H3DC
m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
  c=IN IP4 0.0.0.0
  a=rtcp:9 IN IP4 0.0.0.0
  a=ice-ufrag:zkA9
  a=ice-pwd:eIP43GF+li/YrhuNf74xEFPq
  a=ice-options:trickle
  a=fingerprint:sha-256 C1:7A:0E:4D:E8:2E:00:98:C0:F5:B7:A6:3F:B6:D4:E9:DA:86:29:7F:70:60:25:F6:64:47:D4:03:77:8C:64:47
  a=setup:active
  a=mid:1
  a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
  a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=sendrecv
  a=msid:nsdYHPJiUS13bftMo3yoB3UuEIfzH3ct4nqO 73df0bdc-0fdd-4eea-ac6f-b5a291e2146b
  a=rtcp-mux
  a=rtpmap:120 VP8/90000
  a=rtcp-fb:120 goog-remb
  a=rtcp-fb:120 ccm fir
  a=rtcp-fb:120 nack
  a=rtcp-fb:120 nack pli
  a=rtpmap:121 VP9/90000
  a=rtcp-fb:121 goog-remb
  a=rtcp-fb:121 ccm fir
  a=rtcp-fb:121 nack
  a=rtcp-fb:121 nack pli
  a=fmtp:121 profile-id=0
  a=rtpmap:126 H264/90000
  a=rtcp-fb:126 goog-remb
  a=rtcp-fb:126 ccm fir
  a=rtcp-fb:126 nack
  a=rtcp-fb:126 nack pli
  a=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
  a=rtpmap:97 H264/90000
  a=rtcp-fb:97 goog-remb
  a=rtcp-fb:97 ccm fir
  a=rtcp-fb:97 nack
  a=rtcp-fb:97 nack pli
  a=fmtp:97 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f
  a=ssrc:3496817300 cname:HKO+L0fcEgQ/H3DC
```
