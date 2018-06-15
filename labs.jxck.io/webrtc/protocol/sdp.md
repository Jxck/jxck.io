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


```
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
```

内訳は以下

- media:  audio (webrtc では video か audio)
- port:   9 (このポートにメディアが送信される、 9 は Discard Protocol で破棄されるポート)
- proto:  UDP/TLS/RTP/SAVPF (プロトコル)
- fmt:    111 103 104 9 0 8 106 105 13 110 112 113 126 (RTP/SAVP の場合、ペイロードタイプ番号が指定され、以降の `a=rtpmap:`, `a=fmtp:` にマップされる。


fmt で、例えば最初の `111` は以下に紐づく。

```
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
```


## SDP 属性

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

これが BUNDLE に使われる ID


## group:BUNDLE audio video

```
a=group:BUNDLE audio video
```

mid:audio と mid:video を多重化

rtcp-mux と合わせると、一つのポートに rtp/rtcp x video/audio 全部が多重化される。


https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation に定義


## msid-semantic

```
a=msid-semantic: WMS 1vmCULJy1eti8vXBcbg12mvz6GSOreOKHoDK
```

WMS (webrtc media stream) の ID

https://tools.ietf.org/html/draft-ietf-mmusic-msid に定義

(https://webrtchacks.com/wp-content/themes/parament/custom-pages/sdp/6.html)




## ICE




TODO

```
a=ice-ufrag:czZI
a=ice-pwd:b3hod01i1AZLhfFKqAPVmKeB
a=ice-options:trickle
```




## Fingerprint

DTLS-SRTP のコネクションを確立する際に使われる証明書のハッシュ値。

```
a=fingerprint:sha-256 3A:46:CD:38:CF:B6:B0:A7:3D:A9:71:46:A8:B5:FC:BA:74:D0:15:A4:A8:2D:FA:AD:EC:C2:0A:8E:F0:76:61:68
```

このシグナリングの後に実施される DTLS-SRTP のハンドシェイクで送られる Certificate の検証に使われる。

相手から受け取った証明書も、シグナリングで受け取った Fingerprint と比較し、なりすましが行われていないか検証する。

RFC5763 に記載。


## Setup

DTLS のネゴシエーションを開始すべきエンドポイントを決める。

```
a=setup:actpass
```

値は以下の 4 つがある。

- active: 接続要求を出す

- passive: 接続を受け入れる

- actpass: active/passive どちらにもなる

- holdconn: 一時的にコネクションの確率を望まない


RFC4145 に記載。


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
new RTCPeerConnection({SdpFormat: "unified-plan"})
```

