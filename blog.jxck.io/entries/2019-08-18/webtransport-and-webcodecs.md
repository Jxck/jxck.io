# [webtransport][webcodecs] WebTransport と WebCodecs そして Web はどこまで "ゲーム化" するか

## Intro

Transport として HTTP over TCP を基本としていた Web のあり方は大きく代わり、転送するメディアも HTML だけに止まらなくなってきた。

その対角線上にあるユースケースとして、 UDP でバイナリデータを双方向にやり取りする「ゲーム」があるだろう。

WebScoket/MSE/WebRTC/WASM など、 Web で Game を行うためのパーツは徐々に揃いつつあり、過去に比べればだいぶ状況は改善してきていると言える。

しかし、できることが増えればこそ、それぞれのパーツの不足する部分が浮き彫りになる。

WebTransport と WebCodecs は、主にそんな Web Game の需要から「本当に必要としているもの」を再考した結果をまとめた提案と言えるだろう。

これが、単に Web Game 開発の需要を満たすだけで終わるものか、ゲーム以外の Web の開発にどこまで影響を及ぼすか。

現状の仕様の提案とそのモチベーションを元に、考察していく。


## WebTransport


### Motivation

Web の基本的な通信が、画面の遷移とサブリソースの取得だけだった時代と比べれば、今は様々な API が用意されている。

- fetch (http)
- SSE
- WebSocket
- MSE (MPEG-DASH/HLS)
- WebRTC (ice/dtls/srtp)
- UDP Socket API (draft)

これらは、おおよそ「何かしらのユースケース」が想定され、その要件を満たすうような形で標準化されてきた。もちろんそのスコープにゲーム開発のようなケースも、度々あげられていた。

しかし、本当にゲームを作るために最適なパーツとしてこれらが使えるのかというと、必ずしもそうではないというのが、ゲームを作る側からの意見だ。


### Requirements

例えば WebSocket/MSE/WebRTC を例に、それぞれをゲームを作るという視点から見てみる。

- WebSocket
  - Pros
    - Client-Server 型
    - バイナリも送れる
    - シンプルな API
    - CORS が考慮されている
  - Cons
    - TCP で Head-of-Line-Blocking(HoLB) がある
    - UDP を選べない
    - API が古い
- MSE
  - Pros
    - HTTP で LiveStreaming する方法がやっと標準化された(HLS/DASH)
  - Cons
    - それに特化していて他には使いにくい
    - 制御できる箇所が少ない
- WebRTC
  - Pros
    - UDP でかつ DTLS によりセキュア
    - P2P を考慮した Hole Punch などの対応
    - DataChannel で任意のデータも送れる
  - Cons
    - Client-Server で使いにくい
    - 事前処理(セレモニー/ダンス)が長い
    - 前提としているユースケースと外れると複雑なだけで使いにくい
- UDP Socket API
  - Pros
    - 生 UDP が送れる
    - CORS などは考慮されている
  - Cons
    - 暗号化が仕様に含まれてない
    - 輻輳制御も含まれてない
    - まだ標準化途中でどうなるかも怪しい

要するに本当に欲しいのはこういう通信手段だ

- Architecture
  - Client-Server でデプロイ
  - UDP + Binary
  - Low Latency 輻輳制御
  - HoLB がない
  - Reliable / Unreliable が選択できる
  - TCP も選択できると良さそう
- Security
  - 暗号化必須
  - CORS などにも配慮
- API
  - WebSocket 並みに簡単な API
  - かつモダンな API
  - Back Pressure も対応

それができるように提案されたのが WebTransport だと思って良さそうだ。

そして、今はこれを実現するベースとして使えるパーツが揃いつつある。


### Protocol

まずプロトコルとしては、 UDP 上にまた一からスタックを積む必要はなく、仕様策定や実装が進んでいるものが使える。

すでに WebRTC は DTLS - SRTP/SCTP で実現しており、ブラウザはそれを積んでいるが、 WebRTC も TLS1.3 - QUIC の取り込みを議論しており、 HTTP/3 も進んでいるため、最初から QUIC/HTTP3 で進めるのが妥当だろう。

もし将来より良いプロトコルが登場すれば、それを取り込める余地も残したい。

そこで、ドラフトとして WebTransport のベースとなる仕様に加え、その over QUIC と over HTTP3 の 2 つが提案されている。

- Protocol
  - The WebTransport Protocol Framework
    - <https://tools.ietf.org/html/draft-vvv-webtransport-overview-00>
  - WebTransport over HTTP/3
    - <https://tools.ietf.org/html/draft-vvv-webtransport-http3-00>
  - WebTransport over QUIC
    - <https://tools.ietf.org/html/draft-vvv-webtransport-quic-00>

Overview では以下のような共通機能について定義されている。

- Datagrams
- Uni/Bi-directional Streams
- Bandwidth Prediction

加えて以下の 4 つがオプションとして用意されており、 2 つのプロトコルのサポートは以下のようになる。

|                     | QUIC | HTTP3 |
|---------------------|:----:|:-----:|
| Stream independence |   o  |   o   |
| Partial reliability |   o  |   o   |
| Pooling support     |   x  |   o   |
| Connection mobility |   o  |   o   |



### Alternatives

結局 WebSocket が TCP に縛られていなければ良いのではという点に注目すると、 WebSocket over HTTP/3 が実現できれば HoLB などの問題は解決しそうだ。

しかし、仮にそこに複数のストリームを束ねようとしても、 WS の特徴上ストリームごとに 1RTT のハンドシェイクが必要となる。また、サーバから Stream を開始することができない(本当にそれが必要なのかは疑問だが)という問題があげられている。

また、 WebRTC の文脈で進んでいる RTCQuicTransport が、非常にというかあるケースではほぼ同じことを提供することになる点が指摘される。(策定者も同じ)

これもやはり、 WebRTC が P2P 前提の仕様でスタートした点と Client-Server ユースケースとの乖離をベースに説明されており、すでに RTCQuicTransport の下のレイヤに WebTransport の仕様が参照される形で更新されている。


### API

前述のように抽象化された複数のプロトコルが、同一の API から WebSocket のような手軽さで利用できるように設計されている。

というか、そう設計したいという意思が伺える。

仕様の IDL や Example は、まだまだ初期段階なため、そこまで仕上がってはいない。(そういう時期でもない)

したがって、これをもとにサンプルコードを起こして紹介するのもまだ早いと判断し、ここでは具体的なコードは載せない。

(もう少し作業が落ち着いたら、型矛盾の修正やサンプルの改善など、邪魔にならない程度に送っておきたい)

ただ、以下のような気持ちは汲み取る。

- Promise/Stream をきちんと導入しモダンに仕上げる
- Stream による backpressure も対応する
- Uni/Bi-Directional / Datagram はそのまま対応
- Transport Interface で具体的なプロトコルを抽象化


### WebSocketStream

最近 WebTransport の横で WebSocketStream という WebSocket の API 改善作業が始まった。

- Intent to Implement: WebSocketStream
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/X7rWpAkMCyg/j6K7mEEwAgAJ>
  - <https://github.com/ricea/websocketstream-explainer/blob/master/README.md>

WebSocket の API は、 Promise や Stream が定義される前に策定されたため、それらに対応していない。

特に、 Stream に対応すれば、 WebTransport の問題意識の一つである、 backpressure にも対応可能であるため、よりモダンな API に再設計出来れば、単にコードの見た目以上のメリットも出てくる。

これを行うために、 WebSocket を Stream 対応する仕様策定と実装が WebSocketStream であり、現在 Chrome チームにより進められている。

プロトコルに手を入れる訳ではないため、 WebSocketStream が WebTransport のユースケースをカバーできる訳ではないが、 API 的には非常に近いため、先行して進む WebSocketStream の作業は WebTransport や今後出てくる API にも少なからず影響するだろう。

せっかく新しく作るので、これらがうまく連携し、 ES が培った機能をうまく取り込んで洗練された API 設計に落ち着いて欲しい。


## WebCodecs


### Motivation

メディアを扱うためのコンテナ/コーデックは数多くあり、一部はブラウザに実装されている。

しかし、それらをコントロールできる API は、ある程度ユースケースに紐づいており、自由度が必ずしも高くはない。

- HTMLMediaElement
  - `<video>`, `<audio>` による再生
  - 基本は src に URL を指定する前提
  - srcObject, createObjectURL などで拡張も
- MediaStream API
  - `getUserMedia()`, `getDisplayMedia()` etc
  - 主にデバイスからの取得と MediaElement へのつなぎ
- WebAudio
  - decodeAudioData etc
- WebRTC
  - vp8/9, h.264/265, opus など対応は多い
  - あくまで通信(RTP)に特化している
  - それ以外の用途に柔軟性がない
- MSE
  - 映像/音声のストリーミング配信に特化している
  - それ以外の用途に柔軟性がない

用途に合わない場合はバイナリまで落とし、 WASM でエンコードしたライブラリを導入するといった必要がある。

SIMD や Worker Thread など、 WASM 自体の改善も進みつつあるが、せっかくブラウザがコーデック/コンテナの実装を積んでいるにも関わらず、追加で大きなライブラリをダウンロードするのは非効率だ。

仮に導入しても、ブラウザ自体がネイティブで行うパフォーマンス最適化の恩恵などが受けられないのは、非常に勿体無い。


### Requirements

基本的にはブラウザの持つコーデック/コンテナの実装に対する API が提供されることを目的とする。

これにより、ライブラリを不要とし、パフォーマンスやバッテリー効率の面で恩恵を得る。


#### Goals

- streaming 処理できる
- clock のズレを制御できる
- UA や OS の持つハードウェアエンコーダなどを効率よく利用できる
- encode/decode を off the main thread できる
- 他の API とうまく繋がる(WHATWGStream, WASM, WebTransport etc)
- 回復処理
- 様々なユースケースをカバーする(hard/soft/non real-time)
- Encode/Decode の API が対象である


#### Non-Goals

- コンテナを直接触る API
- Raw Video を触る API
- JS/WASM でコーデックそのものを実装する


### API

基本はブラウザが内部で持っているコーデック/コンテナの実装に対する API を提供する。

各要素ごとに WHATWG Stream ベースの API とし、終端が MediaStreamTrack となることで、他の API(WebTransport, WebRTC, Audio/Video Element etc) と接続する。

音声は AudioPackets 、映像は VideoFrames を最小単位とし、 Encoder/Decoder が TransferStream として提供される。

MediaStreamTrack との繋ぎは、 TrackReader/Writer が提供され、 Stream を流していけば他と繋がるという設計だ。

例えば、映像の送受信は Camera -> Encode -> Transport -> Decode -> VideoElement となるため、以下のようになる。


```js
/**
 * カメラから取得して送信する
 */

const stream      = await navigator.mediaDevices.getUserMedia({video:true})
const videoTracks = await stream.getVideoTrack()

// MediaStreamTrack を DecodedVideoFrame の ReadableStream に変換
const videoTrackReader = new VideoTrackReader(videoTracks[0]);
// DecodedVideoFrame を EncodedVideoFrame にする TransferStream
const videoEncoder = new VideoEncoder({
  codec:         "vp8",
  bitsPerSecond: 1000000
});

// Pipe で変換し Transport で送信
videoTrackReader.readable
                .pipeThrough(videoEncoder)
                .pipeTo(transport.writable);
```


```js
/**
 * 受信して Video タグに出す
 */

// EncodedVideoFrame を DecodedVideoFrame にする TransferStream
const videoDecoder = new VideoDecoder({codec: "vp8"});
// DecodedVideoFrame の WritableStream を MediaStreamTrack に変換
const videoTrackWriter = new VideoTrackWriter();
transport.readable
         .pipeThrough(videoDecoder)
         .pipeTo(videoTrackWriter.writable);

const mediaStream = new MediaStream([videoTrackWriter.track]);
videoElem.srcObject = mediaStream;
```

最終的に MediaStreamTrack と繋がることで、 WebTransport 以外の用途にも応用できるため、 WebRTC や MSE などの既存の API を用いたアプリで手が届かなかったところの改善や、 Web Music や Web VJ といった Codec 要件のシビアなメディアアート系にも応用が効くだろう。

コーデックやコンテナの対応が Feature Detection できれば、実装がない場合だけ WASM にフォールバックするといった作りにすれば、ある程度の範囲をカバーしつつ WebCodecs の実装がある場合だけパフォーマンスメリットが得られる状況を作れそうだ。

また、サンプルには Video の Simulcast Encoding (レイヤのパラメータ指定)が含まれているため、現状微妙な API になっている WebRTC の Simulcast 周りの改善なども期待できそうだ。


## 考察


### WebRTC の次のフェーズとしての WebTransport

そしてちょうど先日、 2011 年から WebRTC に関する作業を続けてきた Working Group である [RTCWEB が Close するアナウンス](https://mailarchive.ietf.org/arch/msg/rtcweb/4cj95edGFtfjZkUjozTybOJiMcA) が舞い込んだ。

仕様を提案している 3 人は、いずれもこの RTCWEB で WebRTC や ORTC の仕様策定に関わってきた人達だ。

WebRTC の作業が終わったわけでは無いが、おそらく彼らは今後 WebTransport の方に注力していくことになるのだろう。

なかでも中心である Peter Thatcher は Googler で、彼の Explainer には Game を Cloud Gaming と書いている部分も多い。

「Stadia を WebRTC/QUIC ベースでやるのが大変だったんだろうな」が、 6 月にあった [Web Games Workshop](https://www.w3.org/2018/12/games-workshop/report.html#webtransport) での [Peter のトーク](https://vimeo.com/350908362) を見た筆者の最初の感想だった。

確かに WebRTC は Web に UDP の API を初めてもたらしたが、その前提が P2P でのビデオチャットに寄りすぎており、ブラウザ持つコーデックで音声/映像が送れることを重視している。

DTLS - SRTP というツギハギな仕組みも、もう少しスッキリすればなと個人的にも思う。

DataChannel で任意のバイナリをやりとりできるとしても、前提として Client-Server で提供したいという要求がある以上、インピーダンスミスマッチが産まれるのは想像に難くない。

WebRTC の Peer をサーバに実装し Global IP を降れば、 Client-Server のようにデプロイすることも可能だが、やりたいことに対してやるべきことが複雑すぎる結果となる。

かといって、直接 RawSocket を触りたいという TCP/UDP Socket API を入れたとしても、その上に必要なスタックは自前で実装することになる。せっかくアクティブにメンテされる枯れた実装がブラウザ内部あるのに、必要なプロトコルとコーデックを WASM でビルドすればいいと言われても、片手落ちだろう。

そうした全ての、ある程度ユースケースが前提とされ始まった各仕様を一旦フラットにし、ここまでの経験(これは振り返って失敗と見えるかもしれないが、振り返る前は成功だった)を踏まえて再スタートするという点で、野心的だと言える。


### Web はどこまでゲーム化するか

筆者としては、この仕様が「Cloud Gaming というユースケースに最適化された N+1 個目の用途特化仕様ができるだけ」なのかどうか、という点に一番興味がある。

「この仕様が Cloud Game 以外の開発で使われるか?」を考える観点はまず 3 つ思いつく。

1. 前述のような既存仕様(WebRTC, MSE, etc)との関連
2. WASI の求める汎用 Socket / Codec API との関連
3. Game ではない一般 Web 開発への影響

1 つ目は、完全に独立した仕様ではなく、既存 API に対する Low Level API として参照できるかという点だ。これはすでに意識されているし、 TAG Review などで指摘されていくだろうと考えると特に問題はないだろう。

ここがうまくいけば、少なくとも現状その上位 API を使っている場面では、恩恵が受けられるだろう。

2 つ目は、 WASI が Networking を含めたシステム API の策定を始めている点との関わりだ。

WASI はブラウザ以外のプラットフォームを視野に入れているが、 API としてはどちらもネットワークを低めのレイヤで叩くため、ある程度ケースでは同じように使えることもあるだろう。

例えば、新規に WASI ベースでネットワーククライアントを作るとして、それが WebTransport 向けにビルドできれば、用途が広がると考えることは想像に難くない。

そこをカバーすれば、単に「ゲーム開発のため」という枠を超えた汎用 Socket API 的な立ち位置になりえそうだが、今の所 WebTransport の文脈で WASI の話はあまり見当たらない。

WASI もまだ始まったばかりで、かつより低いレイヤを視野に入れているため、双方ニアミス感があるが、そのへんをお互いどう考えている(いく)のかは、少し気になっている。

3 つ目は、要するに汎用性だ。

WebTransport の反省にもあるように WebRTC や MSE は映像を配信すること自体が目的でないと導入することは無いだろう。

同様に、 WebTransport/WebCodecs が「ゲームを作るときにしか使わない」ものになるという、同じ轍を踏むかどうかという点は、そのエコシステムの成長に大きく影響すると考える。

逆にそちらのエコシステムが成長すれば、それが Web 開発の側へ影響することもありえるだろう。

例えば、既に Web はドキュメントの枠を超えてアプリ化した先で、 SPA でクライアントが状態を持つことが一般的になった。

データもドキュメントの転送(REST 的な世界観)を捨てて POST/200 で土管化した fetch の上に GraphQL を流している。

見方によっては、すでに Web はアプリ開発の文脈よりも、ゲーム開発に近いことを行い始めており、汎用的な(というか余計なルールが無く自由がきく)表示と転送があれば便利だと思っている開発者も少なからずいるように思う。

もし、ここのニーズとマッチし、デプロイも API も敷居が低ければ、例えば Store の更新をリアルタイムでサーバに送り同期したり、複雑な描画は DOM で行わず、サーバでレンダリングしたバイナリを送って部分的に Canvas に表示するといった、よりゲームのような開発手法を加速する可能性もあるのかもしれない。


## まとめ

仕様はなにかしらユースケースをモチベーションとして提案される。

ときに仕様はそのユースケースに縛られ続けるが、そのユースケースを超えて周りを巻き込みながら思わぬ方向に成長していくものがまれにある。

そうなるかどうかは、仕様策定者の意図だけで決まるものではない。色々な要素が絡んだ結果、有り体に言うなら偶然で、よく言えば時代のニーズというやつなのだろう。

WebTransport や WebCodecs が、 Stadia を展開するために必要な穴を埋める何かで終わるか、今の Web 開発の前提を変えるナニカになるか、注目したい。


## links


### WebTransport

- Protocol
  - The WebTransport Protocol Framework
    - <https://tools.ietf.org/html/draft-vvv-webtransport-overview-00>
  - WebTransport over HTTP/3
    - <https://tools.ietf.org/html/draft-vvv-webtransport-http3-00>
  - WebTransport over QUIC
    - <https://tools.ietf.org/html/draft-vvv-webtransport-quic-00>
- API
  - WebTransport
    - <https://wicg.github.io/web-transport/>
- WICG
  - Thread
    - <https://discourse.wicg.io/t/webtransport-proposal/3508>
  - Repo
    - <https://github.com/WICG/web-transport>
  - Explainer
    - <https://github.com/wicg/web-transport/blob/master/explainer.md>
  - - Meeting Material
  - QUIC Interim
    - <https://github.com/quicwg/wg-materials/blob/master/interim-19-05/webtransport-20190522.pdf>
  - IETF 105
    - <https://datatracker.ietf.org/meeting/105/materials/slides-105-dispatch-webtransport-00>
  - W3C Web Games Workshop
    - <https://www.w3.org/2018/12/games-workshop/report.html#webtransport>
    - <https://docs.google.com/presentation/d/13hX5p8opMD8SrmCHwcdqn_mNkHjQBjI32jvq_gIDubM/edit>
    - Minutes から
       - Sony/BBC などが強い賛同を示している
- Mailing List
  - webtransport
    - <https://mailarchive.ietf.org/arch/browse/webtransport/>

- Intent to Implement: WebSocketStream
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/X7rWpAkMCyg/j6K7mEEwAgAJ>
  - <https://github.com/ricea/websocketstream-explainer/blob/master/README.md>


### WebCodecs

- Explainer
  - <https://github.com/pthatcherg/web-codecs/blob/master/explainer.md>
- WICG Tread
  - <https://discourse.wicg.io/t/webcodecs-proposal/3662>
