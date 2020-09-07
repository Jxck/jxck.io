# [webcodecs][webtransport][webrtc] WebCodecs と WebTransport でビデオチャット


## Intro

ブラウザの持つ Video/Audio コーデック実装へアクセスする API として WebCodecs の仕様策定と実装が進んでいる。

これにより、映像や音声の変換などといったユースケースへの応用も可能だ。

本来なら WebCodecs 単体の API について解説するところだが、筆者がこの API を待っていた理由であるところの「WebRTC の代替」としての WebCodecs/WebTransport の応用に注目し、背景も踏まえて解説する。


## WebRTC

WebRTC は UDP 上に DTLS で交換した鍵を用いて、 RTP を SRTP で流し、そのシグナリングに SDP を、ホールパンチに ICE(STUN/TURN) を用いることで、 P2P ビデオチャットといったユースケースを可能にした API だ。

しかし、最初から「P2P ビデオチャット」というユースケースに寄せていることもあり、従来使われていたプロトコルスタックを応用して実現しており、 P2P ならではの問題を解決するために、全体は割と複雑な構成になっていた。(真面目にフルで実装すると 3 桁近い RFC が絡んでくる)

ところが、実際 WebRTC を用いたサービスを提供する際には、 P2P でクライアント同士を会話させるなどということはあまりなく、サービス側で持ったサーバ(SFU/MCU)で、ルーティングや QoS の調整といった様々なサービスを提供することになることが多い。

また、ブラウザ API の抽象度も高く、内部で行われる動作の機微をコントロールするには、新しい API が必要になり、クロスブラウザの切り分けが難しい場合もある。

特にコーデック周りの制御も容易ではなく、実際の映像バイナリを一切触ることなく、その中身を制御するための命令を行うといった雰囲気の実装になる。

これは、チュートリアルにあるような典型的ビデオチャットを提供するだけならうまく動くが、少し特別な実装を入れたり、その UDP トランスポートを使って別のメディア(ゲームなど)を流そうとすると、途端に扱いにくい部分が目立ってくる。

もし P2P ではなく、 Server/Client 型のデプロイを前提とし、コーデックもブラウザが持っている実装を直接触るような API があり、データは生のバイナリでやり取りできれば、その方が柔軟性が高く多くのユースケースへ応用できる。そうした発想から生まれたのが WebTransport と WebCodecs だ。

そのあたりのモチベーションは以前にも書いている。

- [WebTransport と WebCodecs そして Web はどこまで "ゲーム化" するか](https://blog.jxck.io/entries/2019-08-18/webtransport-and-webcodecs.html)


## WebTransport

QUIC/HTTP3 の実装が進んでから、このトランスポートを WebSocket のように直接触れる API があり、任意のバイナリを送れるようにしようという発想から始まったのが WebTransport だ。

仕様上は Http3Transport と QuicTranport の両方が検討されているが、現状 Chrome は QuicTransport のみ実装を進めている。

- [QuicTransport によるアプリケーションレイヤでの QUIC 活用](https://blog.jxck.io/entries/2020-06-09/quic-transport.html)

単純に Uint8Array を自由に送ることができるため、バイナリが手元にあれば送るだけだ。

ビデオチャットの場合、問題はカメラの出力をどうバイナリで取得するかだった。


## WebCodecs

WebRTC の場合は、取得した MediaStream を RTCPeerConnection に addStream/addTrack すると、そのメディアに合わせてシグナリングを行い、自動でエンコード/デコードし、そのバイナリを自動的に送受信してくれるという、抽象度の高い設計になっていた。


```js
// 接続されたカメラを抽象化した MediaStream を取得
const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})

// WebRTC の通信を抽象化した RTCPeerConnection を取得
const connection = new RTCPeerConnection(config)

// 両者を繋ぐ
stream.getTracks().forEach((track) => {
  connection.addTrack(track, stream)
})
```

この流れを見てもわかるように、従来の `getUserMedia()` で取得した MediaStream は、そこから直接カメラの映像をバイナリで取得できるような作りにはなってない。

`<video>` や RTCPeerConnection などの対応した API に繋ぐことで、あとは中で *やってくれる/やってしまう* 、ため、外からそこに手を加えることができないのだ。

もし手を加えたい場合は、一旦 Canvas に描画する、 Insertable Stream で横取りするなどのワークアラウンドが必要だった。

カメラから取得したデータを、ブラウザが内部で持っている VP8 や H.264 などのコーデック実装でエンコード/デコードを行い、その結果をバイナリで取得できれば様々なユースケースに応用できる。

これが WebCodecs のモチベーションだ。


### API

今回は、まずカメラから取得したビデオストリームに注目して解説する。音声や画面キャプチャもほぼ同じように可能だ。

![WebCodecs と WebTransport を用いたビデオ会議の概要図](webcodecs-webtransport-chat.svg#500x190 "overview of webcodecs & webtransport video chat")

ビデオの場合は VideoStreamTrack を取得するところから始まる。


```js
const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
const [videoTrack] = mediaStream.getVideoTracks()
```

ここには、カメラからの生のストリームがあるようなイメージだ。そのままでは大きいため、多くの場合は圧縮を行う。その方式が VP8 や H.264 のようなコーデックになる。

VideoTrack をエンコードするには VideoEncoder を用いる。

初期化時に output コールバックを指定し、初期化後に `configure()` でエンコードの仕様を設定する。

後から動的にエンコードパラメータを変えられるようにするために、このような API になっていると思われる。

(将来 Simulcast などに対応する場合はここが拡張されるだろう)


```js
// Encoder
const videoEncoder = new VideoEncoder({
  output: function(chunk) {
    console.log(chunk)
  },
  error: function() {
    console.error(arguments)
  }
})
await videoEncoder.configure({
  codec:     'vp8'
  width:     640
  height:    480
  framerate: 30
})
```

VideoTrackReader を用いて  MediaStream からビデオのデータを取り出す。

ここでの単位はフレームで、この VideoFrame を VideoEncoder の `encode()` に渡すとエンコードされる。


```js
const videoReader = new VideoTrackReader(videoTrack)
videoReader.start((videoFrame) => {
  videoEncoder.encode(videoFrame)
})
```

結果は VideoEncoder の初期化時に指定した output コールバックに渡り、これが vp8 でエンコードした結果の ArrayBuffer だ。

デコードもほぼ同じ、まずは初期化し `configure()` を呼ぶ。

`encode()` に vp8 の chunk を渡せばデコードしたフレームが取り出せる。

`createImageBitmap()` でビットマップに変換すれば Canvas に描画できる。


```js
const ctx = $canvas.getContext('2d')

// Decoder
const videoDecoder = new VideoDecoder({
  output: async function(frame) {
    const imageBitmap = await frame.createImageBitmap()
    // canvas に描画
    ctx.drawImage(imageBitmap, 0, 0)
  },
  error: function() {
    console.error(arguments)
  }
})
videoDecoder.configure({ codec: 'vp8' })


// encoder で作った vp8 の chunk
videoDecoder.decode(chunk)
```

ちなみに VideoTrackWriter は無いため、戻した結果を `<video>` に流すことはできない(と思われる)。

音声も基本的に WebAudio を用いるため、音声も映像も自分で表示し、コントローラも自分で作ることになるだろう。

(現状の WebRTC でもそうしていることは多いので、あまり変わらない)


## ビデオチャット

エンコードしたバイナリを送り、受け取ってデコードすれば、ビデオ会議が可能になる。

そこで WebCodecs + WebTransport を用いたビデオチャットを簡単に作ってみた。

多人数にすると少し面倒なため、自分の映像をサーバがエコーして自分で表示する作りにしてある。

![WebCodecs と WebTransport で作成したビデオチャットのデモ動作風景](webcodecs-webtransport-chat-demo.gif#1082x1038 "webcodecs webtransport demo")

デモは最後に貼るため、以下は特に WebRTC と比較しての部分について解説する。


### シリアライズ

エンコードした Chunk は以下のような形をしている。


```js
interface EncodedVideoChunk {
  constructor(EncodedVideoChunkInit init);
  readonly attribute EncodedVideoChunkType type;
  readonly attribute unsigned long long timestamp;  // microseconds
  readonly attribute unsigned long long? duration;  // microseconds
  readonly attribute ArrayBuffer data;
};
```

したがって、 `{type, timestamp, duration, data}` のようなオブジェクトをシリアライズして送り、復元する必要がある。

転送は基本的に Uint8Array 単位で行うため、今回は CBOR を採用した。しかし後述のサイズの問題があるため、少し工夫している。


### 転送制御

QUIC はパケットサイズに上限があるため、 QuicTransport でも大きいバイナリが送れず、分割される。

 - IPv6 = 1280(v6 MTU) - 40 (v6 header) - 8 (udp header) = 1232byte
 - IPv4 = 1280(v4 MTU) - 20 (v4 header) - 8 (udp header) = 1252byt

なので v4 だと PMTUD でサイズを確認しない限り 1252 以上は送れない

- <https://tools.ietf.org/html/draft-ietf-quic-transport-29#section-14>

すると、キーフレームは確実にフラグメントするため、全て揃うまでバッファしないと CBOR でデコードできない。

今回は、暫定的に CBOR エンコードしたバイナリの先頭に Length をつけるようにした。

Bidirectional Stream で送れば自動で分割してくれるため、最初に Length を読んでから、長さ分のパケットが揃うまでバッファに貯めている。

このあたりを上手く転送制御する上では、やはり RTP のような既存の仕組みが欲しくなる。

CBOR はストリーミングっぽい仕組みがあった気がするため、もっとうまく書けたかもしれない。


### メディア制御

デフォルトでは最初に key frame を送ったら残りは delta のみがエンコードされる。

もしどこかで絵が壊れた場合は、明示的に `encode({keyFrame: true})` するとキーフレームが取得できる。

つまり、キーフレームを得るタイミングも自分で制御でき、逆を言えば今まで RTCP などでいい感じにやってくれていたことも自分でやらないといけない。

また、絵が壊れたところで Canvas がエラーを出してくれるわけではなく、帯域が狭くなったことやロスが増えたことも誰も教えてくれないため、フィードバック制御やリカバリを自分で考える必要がある。

今回はとりあえず 10 回に一回 KeyFrame を送るようにしてみた。


### 表示制御

これまでは `<video>` に表示するのが基本だったが、 `<video>` は表示をイジるのに多少の面倒臭さがあった。

一方 `<canvas>` は周知の通り、表示に関する操作の方法が多く知られており、フィルタ適用、物体/顔検出、合成、傾き etc 手法やライブラリも潤沢にある。

そうした目的からあえて `<video>` ではなく `<canvas>` を選ぶサービスがもあったくらいなので、このメリットはデカイだろう。

並行している SIMD+WASM は、そうした画像処理に必要な計算を高速化することが可能なため、今回は触れなかったが、今後はそちらも試しておきたい。


### WebCodecs と WebTransport の繋ぎ

WebCodecs の出力バイナリは、従来の WebRTC でいえば RTC 内の body 部分のみにあたる。

WebTransport の転送は、 WebRTC でいうと DTLS-SRTP の部分のみだ。

WebRTC よりも軽いスタックでビデオ会議が実現可能になったが、逆を言えば前述のようなメディアの転送制御に関わる部分は別途自分で用意する必要がある。

「自分で用意する必要がある」は、ちょっと遊んでみたい素人にとっては負荷かもしれないが、 WebRTC で困っていたサービス提供者にとっては「自分で提供することができる」と取れる場合もある。

バイナリさえあればソースがカメラである必要も、出力先が Canvas である必要もないため、その間には無限のユースケースがある。

ユースケースに応じて適切な中間ロジックを選定でき、なければ自分で JS や WASM で書くこともできるという点は、自由度をかなり上げている。

単純なビデオ会議を実現する程度なら、軽量なフレームワークをサクッと作ることは可能だし、おそらくそうしたものは多く出てくるだろう。どうしても足りない部分はまた別途標準かもあるかもしれない。

それを除けば、 WebCodecs / WebTransport の 2 つさえ実装されたブラウザでは、残りを自分たちの要件に合わせて実装していけるのは、開発者としてもサービスに個性を出しやすく、実装に多様性が生まれると期待している。


## Outro

WebCodecs と WebTrasnport を用いて WebRTC のようなビデオ会議が、よりシンプルなスタックで可能になった。

バイナリをエンコードし、それを送る、その間に必要なロジックは、標準ではなく要件に合わせて開発者が用意するという世界観は、 Extensible Web Manifest 以来進められてきた API の低レイヤ化の流れを組んでいるといえる。

そうして、ユースケースに特化し膨らんだ WebRTC の解体は、ブラウザが内側にもつスタックを、 ArrayBuffer を取り回すという低レベル API として開発者に提供したことによって、可能性を広げたと考えられる。

本ブログでは、ビデオ会議の側面から API を比較するため、全体の一部しか触れてないが、並行して進められている SIMD+WASM は ArrayBuffer の加工に最適なため、今後はそちらも含めて色々と試しつつ、フィードバックにつなげていきたい。


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/webcodecs/>


## Resources

- Spec
  - <https://wicg.github.io/web-codecs/>
- Explainer
  - <https://github.com/WICG/web-codecs/blob/master/explainer.md>
- Requirements Doc
  - <https://docs.google.com/document/d/1fw3_aMB0-q9hOMuz_lxE8kEd-Z7vjA0wtklpx77m4yw>
- Mozilla Standard Position
  - <https://mozilla.github.io/standards-positions/#web-codecs>
- Webkit Position
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-May/031191.html>
- TAG Design Review
  - <https://github.com/w3ctag/design-reviews/issues/433>
- Intents
  - Intent to Experiment: WebCodecs
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7OdxQf5HnlQ>
  - Intent to Implement WebCodecs
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/3oVuczJ5Ty4/discussion>
  - Intent to Prototype: ImageDecoder API extension for WebCodecs
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/w1F8UGwTjZo/m/CoU8WTOxAAAJ>
- Chrome Platform Status
  - <https://www.chromestatus.com/feature/5669293909868544>
- DEMO
- Blog
  - [QuicTransport によるアプリケーションレイヤでの QUIC 活用 \| blog.jxck.io](https://blog.jxck.io/entries/2020-06-09/quic-transport.html)
  - [WebTransport と WebCodecs そして Web はどこまで "ゲーム化" するか \| blog.jxck.io](https://blog.jxck.io/entries/2019-08-18/webtransport-and-webcodecs.html)
- Presentation
- Issues
  - <https://bugs.chromium.org/p/chromium/issues/detail?id=897297>
- Other
