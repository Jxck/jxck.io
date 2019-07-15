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



## Plan A/Plan B/Unified Plan

複数のトラックを送る場合

- PlanA: m= が複数ある (chrome)
- PlanB: m= に複数 a=ssrc がある (firefox)

この 2 パターンでもめたが PlanA が採用され
これを Unified Plan と呼ぶことになった。

Unified Plan では

- msid
- mslabel
- label

この 3 つはいらない。

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





## sdp negotiate

### firefox_offer

```
v=0
o=mozilla...THIS_IS_SDPARTA-67.0.3 5227184806774508817 0 IN IP4 0.0.0.0
s=-
t=0 0

a=fingerprint:sha-256 38:6B:45:19:7D:50:AA:4F:76:04:C6:6F:2F:B7:25:CD:7F:24:3F:7B:42:FB:C0:86:CB:98:1B:F2:D5:62:A7:84
# DTLS 証明書のハッシュ

a=group:BUNDLE 0 1
# mid=0,1 を BUNDLE する

a=ice-options:trickle

a=msid-semantic:WMS *


m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
# ここからが Audio のセクション
# rtpmap が 109 9 0 8 101 の 5 つある

  c=IN IP4 0.0.0.0
  # アドレスは ICE で

  a=sendrecv
  # 送受信する

  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  # 2 は受信のみ
  # 3 は mid を使うために必須

  a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1
  a=fmtp:101 0-15

  a=ice-pwd:1d8c0d6a99b24772193fc7c2d46de043
  a=ice-ufrag:117a6c49
  # ICE のパラメータ

  a=mid:0
  # BUNDLE に使う MID (これが Unified Plan)

  a=msid:{6af9c7f2-13cd-8e4c-af4f-da446f789c4a} {64b35540-0ada-014f-ae7e-1a3a9c9cf558}
  # StreamID に TrackID を紐づけている

  a=rtcp-mux
  # RTCP も多重化

  a=rtpmap:109 opus/48000/2
  a=rtpmap:9 G722/8000/1
  a=rtpmap:0 PCMU/8000
  a=rtpmap:8 PCMA/8000
  a=rtpmap:101 telephone-event/8000/1
  # この 5 つのフォーマットが使える

  a=setup:actpass
  # DTLS を送受信どっちもできる

  a=ssrc:4241493831 cname:{51dd8d28-d60b-da47-b2a2-d594635ebaa4}
  # 同期ソース, RTP の SSRC ヘッダになる
  # cname は再起動しても使える恒久的識別子
  # Video と同じ


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

  a=ice-pwd:1d8c0d6a99b24772193fc7c2d46de043
  a=ice-ufrag:117a6c49

  a=mid:1

  a=msid:{6af9c7f2-13cd-8e4c-af4f-da446f789c4a} {615e0272-7270-664e-948a-6a32021406b9}

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

  a=ssrc:1193369630 cname:{51dd8d28-d60b-da47-b2a2-d594635ebaa4}
  # Video と同じ
```

### firefox_answer

```
v=0
o=mozilla...THIS_IS_SDPARTA-67.0.4 4407705891883778955 0 IN IP4 0.0.0.0
s=-
t=0 0
a=sendrecv
a=fingerprint:sha-256 BC:2C:E2:86:EE:DE:69:87:7C:14:E7:7F:C3:86:4F:4C:15:E3:5E:31:9E:72:55:CA:62:FD:55:CF:4E:A0:F1:AF

a=group:BUNDLE 0 1
# 受け取った mid をそのまま採用

a=ice-options:trickle

a=msid-semantic:WMS *

m=audio 9 UDP/TLS/RTP/SAVPF 109 101
  c=IN IP4 0.0.0.0
  a=sendrecv

  a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  # 1,3 だけを選らんだ

  a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1
  a=fmtp:101 0-15

  a=ice-pwd:7c752f89039d1255c6eb449cad14dc5b
  a=ice-ufrag:839d99d0

  a=mid:0

  a=msid:{a0662c8c-0a70-4960-91fb-081ef75b0218} {7962b37e-0f50-4058-aaa6-c5236d855bd8}
  # StreamID に TrackID を紐づけている
  # StreamID は Video と同じ

  a=rtcp-mux

  a=rtpmap:109 opus/48000/2
  a=rtpmap:101 telephone-event/8000
  # この 2 つを選らんだ

  a=setup:active
  # こちらから DTLS CH を送る

  a=ssrc:3917335807 cname:{a52ff388-7c67-4073-bf3f-4a3fbc07a137}
  # CNAME は Video と同じ


m=video 9 UDP/TLS/RTP/SAVPF 120
  c=IN IP4 0.0.0.0
  a=sendrecv

  a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
  a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
  a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
  # 全部選んだ

  a=fmtp:120 max-fs=12288;max-fr=60

  a=ice-pwd:7c752f89039d1255c6eb449cad14dc5b
  a=ice-ufrag:839d99d0

  a=mid:1

  a=msid:{a0662c8c-0a70-4960-91fb-081ef75b0218} {9985df8b-43fe-4aea-a47e-b9709e72a79a}
  # StreamID に TrackID を紐づけている
  # StreamID は Audio と同じ

  a=rtcp-fb:120 nack
  a=rtcp-fb:120 nack pli
  a=rtcp-fb:120 ccm fir
  a=rtcp-fb:120 goog-remb

  a=rtcp-mux

  a=rtpmap:120 VP8/90000
  # VP8 のみを選択

  a=setup:active

  a=ssrc:3231089204 cname:{a52ff388-7c67-4073-bf3f-4a3fbc07a137}\r\n
  # CNAME は Audio と同じ
```

offer -> answer













### chrome_offer

```
v=0
o=- 597819530402819714 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
a=msid-semantic: WMS bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:pJ9m
a=ice-pwd:DDzdqMK0iIHeK9SLUbzFelA3
a=ice-options:trickle
a=fingerprint:sha-256 29:52:EF:9D:8C:6C:5C:AA:8A:23:13:A3:A0:3E:3A:1C:35:A8:C5:08:EE:32:0B:51:23:02:2E:B8:DE:04:12:15
a=setup:actpass
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
a=sendrecv
a=msid:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9 3216dcca-308d-41d3-9fe3-4e0681f3411b
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
a=ssrc:3222863001 cname:0nOOvgY3CwhL4w33
a=ssrc:3222863001 msid:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9 3216dcca-308d-41d3-9fe3-4e0681f3411b
a=ssrc:3222863001 mslabel:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9
a=ssrc:3222863001 label:3216dcca-308d-41d3-9fe3-4e0681f3411b
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123 119 114 115 116
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:pJ9m
a=ice-pwd:DDzdqMK0iIHeK9SLUbzFelA3
a=ice-options:trickle
a=fingerprint:sha-256 29:52:EF:9D:8C:6C:5C:AA:8A:23:13:A3:A0:3E:3A:1C:35:A8:C5:08:EE:32:0B:51:23:02:2E:B8:DE:04:12:15
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
a=msid:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9 b150b7d2-8155-4628-b44b-0c5e059a5d98
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
a=rtpmap:124 H264/90000
a=rtcp-fb:124 goog-remb
a=rtcp-fb:124 transport-cc
a=rtcp-fb:124 ccm fir
a=rtcp-fb:124 nack
a=rtcp-fb:124 nack pli
a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032
a=rtpmap:120 rtx/90000
a=fmtp:120 apt=124
a=rtpmap:123 H264/90000
a=rtcp-fb:123 goog-remb
a=rtcp-fb:123 transport-cc
a=rtcp-fb:123 ccm fir
a=rtcp-fb:123 nack
a=rtcp-fb:123 nack pli
a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032
a=rtpmap:119 rtx/90000
a=fmtp:119 apt=123
a=rtpmap:114 red/90000
a=rtpmap:115 rtx/90000
a=fmtp:115 apt=114
a=rtpmap:116 ulpfec/90000
a=ssrc-group:FID 313528013 1396847232
a=ssrc:313528013 cname:0nOOvgY3CwhL4w33
a=ssrc:313528013 msid:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9 b150b7d2-8155-4628-b44b-0c5e059a5d98
a=ssrc:313528013 mslabel:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9
a=ssrc:313528013 label:b150b7d2-8155-4628-b44b-0c5e059a5d98
a=ssrc:1396847232 cname:0nOOvgY3CwhL4w33
a=ssrc:1396847232 msid:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9 b150b7d2-8155-4628-b44b-0c5e059a5d98
a=ssrc:1396847232 mslabel:bt2sG8MChh0YyHSJ0w0jwnq3TTRdDydydfF9
a=ssrc:1396847232 label:b150b7d2-8155-4628-b44b-0c5e059a5d98\r\n
```

### chrome_answer

```
v=0
o=- 7061948247602469337 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
a=msid-semantic: WMS uJ1bqmULpYoGH4JQW651DYlHvFMfrKCTt4YM
m=audio 55865 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 10.61.29.219
a=rtcp:9 IN IP4 0.0.0.0
a=candidate:911660918 1 udp 2122260223 10.61.29.219 55865 typ host generation 0 network-id 1
a=ice-ufrag:xyNi
a=ice-pwd:TebgB0M2ALX9eT9R/hF7+0JZ
a=ice-options:trickle
a=fingerprint:sha-256 FB:6A:A3:B8:C8:C5:7B:84:B8:AE:E3:15:7A:71:F9:6D:BF:0C:E4:69:A2:3D:BC:A4:65:28:4C:5E:44:76:F2:F9
a=setup:active
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
a=sendrecv
a=msid:uJ1bqmULpYoGH4JQW651DYlHvFMfrKCTt4YM af930b50-37b0-470e-ab68-00240e502e22
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
a=ssrc:2377111815 cname:LqrZLZYMzCWMS+dS
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 114 115 116
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:xyNi
a=ice-pwd:TebgB0M2ALX9eT9R/hF7+0JZ
a=ice-options:trickle
a=fingerprint:sha-256 FB:6A:A3:B8:C8:C5:7B:84:B8:AE:E3:15:7A:71:F9:6D:BF:0C:E4:69:A2:3D:BC:A4:65:28:4C:5E:44:76:F2:F9
a=setup:active
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
a=msid:uJ1bqmULpYoGH4JQW651DYlHvFMfrKCTt4YM f38a6893-4a70-49f6-a284-1c99c1e196bc
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
a=rtpmap:114 red/90000
a=rtpmap:115 rtx/90000
a=fmtp:115 apt=114
a=rtpmap:116 ulpfec/90000
a=ssrc-group:FID 2050862381 1070836815
a=ssrc:2050862381 cname:LqrZLZYMzCWMS+dS
a=ssrc:1070836815 cname:LqrZLZYMzCWMS+dS\r\n
```
