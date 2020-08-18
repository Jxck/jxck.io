# [quictransport][webtransport][quic] QuicTransport によるアプリケーションレイヤでの QUIC 活用

## Intro

WebTransport の Quic 実装である QuicTransport の開発が Chrome で行われている。

Chrome で Origin Trials が開始されたので仕様と実装を解説する。


## QuicTransport

WebTransport については [以前解説した](https://blog.jxck.io/entries/2019-08-18/webtransport-and-webcodecs.html) が、位置づけとしてはこうだ。

- WebTransport
  - QuicTransport
  - Http3Transport

今回入ったのは、 WebTransport の通信レイヤとして QUIC を用いた QuicTransport という位置づけになる。

IETF で WebTransport over QUIC としてバインディングの仕様が策定され、 WICG でブラウザ API が策定されている。

- draft-vvv-webtransport-quic-00 - WebTransport over QUIC
  - <https://tools.ietf.org/html/draft-vvv-webtransport-quic-01>
- WebTransport
  - <https://wicg.github.io/web-transport/>


## Server

サーバの実装はまだ少ないが Chrome のリポジトリと、 WPT(WebPlatformTest) にサンプルの実装が入っている。

- [net/tools/quic/quic_transport_simple_server_bin.cc - chromium/src](https://chromium.googlesource.com/chromium/src/+/master/net/tools/quic/quic_transport_simple_server_bin.cc)
- [wpt/quic_transport_server.py](https://github.com/web-platform-tests/wpt/blob/master/tools/quic/quic_transport_server.py)


### Connection 確立

QUIC のプロトコル実装がある場合は、少ない追加コードで QuicTransport で使えるようになっている。具体的には以下だ。

- ALPN が `wq-vvv-01`
  - QuicTransport を意図してないサーバとの接続を防ぐ
- Client Indication で Origin + Path を通知
  - サーバが許可した Origin + Path であることを検証

この 2 つをサーバが許可すれば接続が確立できる。

wpt の実装は、これを Python の aioquic で行っているため参考になるだろう。


### URI Scheme

また、プロトコルには新しくスキーマが定義されている。

仕様にも注意書きがあるが、仮の定義として現状は `quic-transport` になっており、将来変わる可能性が有る。

ここに指定された Origin + Path が前述の Client Indication で通知されることになる。

```
quic-transport://example.com:3000/echo
```

これが JS API で以下のように使われる。

```js
const transport = new QuicTransport(`quic-transport://example.com:3000/echo`)
```

WebSocket と比較すると SubProtocol が無い。

一方でドラフトでは何故か `/.well-known` が使えることが明記してあり、もしかしたら(SubProtocol のような)メタ情報や変数が有る場合、ここを何かに使うのかとも思ったが、深読みかもしれない。


### Transport

基本的には QUIC が持つ機能が API から利用できるようにマッピングされている。

具体的には Datagram, Stream independence, Partial Reliability, 0-RTT(optional), Uni/Bi-Directional etc だ。

操作も read/write/close がそのまま後述する API に反映されている。

QUIC をそのまま使うという非常にすっきりとした仕様になっていることがわかる。


## Client

単純な datagram 送受信のサンプルは以下のようになる。

この場合送受信は un-reliable であり、送達は保証されない。

WebSocket に似た使用感ではあるが、細かいところが違う。


```js
const url = `quic-transport://example.com:3000/echo`
const transport = new QuicTransport(url)

await transport.ready

const writer = transport.sendDatagrams().getWriter()
const reader = transport.receiveDatagrams().getReader()

const data = new Uint8Array([1,2,3,4,5])
writer.write(data)

const {done, value} = await reader.read()
console.log(done, value)

await transport.close()
```


### Uint8Array

まだ interface API には明示されてないようだが、仕様のアルゴリズムをみると、基本は Uint8Array を Chunk とする Read/Write Stream を内部で生成するようだ。

つまり、転送単位が Uint8Array であり、実装もそうなっている。

これは WebSocket のように文字列を渡しても送れないことを意味し、その場合は TextEncoder/Decoder を使うことになるだろう。

`JSON.stringify()` で送っていたようなオブジェクトも、 CBOR などを用いたバイナリシリアライズが検討されるかもしれない。

(`new TextEncoder().encode(JSON.stringify())` とかでもいいのかもしれない。)


### EventTarget

サーバとの接続/切断を `ready`, `closed` という Promise を返すプロパティで表現している。

これは、 Service Worker の `navigator.serviceWorker.ready` でも採用されている手法だ。

従来であれば、内部の State は `state` に持ち、その変更を `onstatechange` で表すために EventTarget を継承するのが基本だった。

しかし、 `state` へのプロパティアクセスは同期処理であるため、 Promise で表現するほうが実装上のメリットがあるという議論がされている。

- [WebTransport.ready - Issue #92 - WICG/web-transport](https://github.com/WICG/web-transport/issues/92)

メッセージについては、明示的な `read()` もしくはそれを行う Stream の Pipe でを行うため、 `onmessage` イベントもいらない。

内部の状態は以下なので、これが増えたらどうするかという懸念もあるが、 WebSocket も同じ状態遷移で特に増えたことはないため、問題ないということだろう。

```
connecting -> connected
connecting -> failed
connected -> closed
connected -> failed
```

この議論の結果によっては、 EventTarget にならなくなり、 developer experience としては今までと少し違う雰囲気の使用感になりそうだ。


もし、最近やっと Safari に入り Node でも入りそうな EventTarget を使ったほうが慣れているのであれば、以下のような感じで自分で Wrap することもできるだろう。


```js
class Transport extends EventTarget {
  constructor(url) {
    super()
    this.transport = new QuicTransport(url)
    this.writer = this.transport.sendDatagrams().getWriter()
    this.reader = this.transport.receiveDatagrams().getReader()
    this.transport.ready.then(async (e) => {
      this.dispatchEvent(new CustomEvent('open'))

      while(true) {
        const {done, value} = await this.reader.read()
        if (done) break
        this.dispatchEvent(new CustomEvent('data', {detail: value}))
      }
    })

    this.transport.closed.then(async (e) => {
      this.dispatchEvent(new CustomEvent('close'))
    })
  }

  send(data) {
    this.writer.write(data)
  }

  close() {
    this.transport.close()
  }
}
```

### Stream

WebTransport の API は最初から Stream が考慮された実装になっている。

API interface 的に言うと、現状の定義は以下のようになっている。

```js
interface QuicTransport {}
QuicTransport includes UnidirectionalStreamsTransport;
QuicTransport includes BidirectionalStreamsTransport;
QuicTransport includes DatagramTransport;
QuicTransport includes WebTransport;
```

Http3Transport も同じように 4 つ includes している。

そもそも WebTransport interface が 3 つ includes すれば良さそうだが、これは将来別の Transport パターンが実装されることがあった場合の拡張性だろうか。


UnidirectionalStreamTransport は以下のような定義だ。

```js
interface mixin UnidirectionalStreamsTransport {
  Promise<SendStream> createSendStream(optional SendStreamParameters parameters = {});
  ReadableStream receiveStreams();
};
```

クライアントからサーバに対する 1 方向の場合は `createSendStream` を、逆は `receiveStreams()` によって、必要な Stream が得られる。


一方 BidirectionalStreamTransport の定義はこうだ。

```js
interface mixin BidirectionalStreamsTransport {
  Promise<BidirectionalStream> createBidirectionalStream();
  ReadableStream receiveBidirectionalStreams();
};
```

Bidirectional Stream をクライアントから確立する場合は `createBidirectionalStream()` を、サーバから確立する場合は `receiveBidirectionaStreams()` を用いる。


(Uni/Bi)Directional x (Client/Server)Initiated が全てサポートされて Stream が得られるので、エコシステム的に言えば、 Sink/Source を定義して Stream を用意しておけば、 QUIC のメリットを活かしつつアプリケーションを組むことができる。


例として Bi-dir で `<textarea>` の入力を送り echo back で表示するサンプルを以下に作成した。
肝になる部分は以下のようになる。


```js
const transport = new QuicTransport(url)
await transport.ready
const {readable, writable} = await transport.createBidirectionalStream()

// Pipe
domRead.pipeThrough(new TextEncoderStream()).pipeTo(writable)
  .then((e) => console.log(e))
  .catch((e) => console.error(e))

readable.pipeThrough(new TextDecoderStream()).pipeTo(domWrite)
  .then((e) => console.log(e))
  .catch((e) => console.error(e))
```

- [Stream Pipe DEMO](http://labs.jxck.io/webtransport/quictransport/stream_pipe.html)



## Use Case

さて、これを何に使うかという点に付いて考える。

### Media Stream

まず、このブログでも以前紹介したように、 WebRTC を比較対象に上がるのであれば、メディアの転送がどうなのかという問題になる。

現状 QuicTransport の転送単位は Uint8Array を基本としているため、 getUserMedia の結果からバイナリを取得するなどができれば、ビデオ会議なども可能になるポテンシャルはあるだろう。

しかし、現状 getUserMedia した MediaStream API は、前述した WHATWG Stream を指すのではなく、たんなるメディアの抽象化という意味で、 Pipe しても流れるわけではない。

Canvas 経由で ImageBitmap を取る、 WASM でエンコードする、別の Peer とつないだ PeerConnection から InsertableStream で抜くなどの方法は無くはないが、正攻法でいうと WebCodecs を待つことになる。

WebCodecs は現在 Intent to Implement なので、 Experiment が始まったら改めて検証する。

- [Intent to Implement WebCodecs](https://groups.google.com/a/chromium.org/g/blink-dev/c/3oVuczJ5Ty4/m/b8VLNNvyEAAJ)


### Unreliable Stream

QUIC が作られた背景まで遡れば、 TCP での Head of Line Blocking への対策や、 Unreliable な通信を選択肢として持つという点が UDP によるメリットとしてあった。

DatagramTransport を使えば out of order / unreliable な read/write が可能なので、現時点では個々が QuicTransport を使用するモチベーションの一つとして考えられるだろう。

(逆にそうでない場合は、「WebSocket でいいのでは?」 となってしまう可能性がある)

例えば、ゲームのリアルタイムなコントロールは、ゲームの性質にもよるが、全ての入力が TCP レベルでの回復を伴いながら、順序を保って確実に送られる必要は必ずしもないかもしれない。

また、 getUserMedia 以外の何らかのデバイスから、大量に入力し binary serialize したオブジェクトを送るケースも考えられるだろう。


## Outro

- WebTransport の実装の 1 つとして、 QuicTransport の Origin Trials が始まった。
- Promise や Stream を用いた API で、モダンな API Interface となっている。
- QUIC の持つ、 unreliable, uni/bi-directional などの性質を上手く API に反映させている
- QUIC の特徴をアプリレイヤで活かしたいユースケースでの活用が考えられる
- WebCodecs と組み合わせたとき、 WebRTC のようなユースケースへの応用も期待できる

WebCodecs の Experiment が始まったら、追加で検証したい。


## DEMO

動作する DEMO は以下に用意した。

- [WebTransport Stream DEMO](http://labs.jxck.io/webtransport)


## Resources

- Spec
  - WICG: WebTransport
    - <https://wicg.github.io/web-transport/#quic-transport>
  - IETF: QUIC: A UDP-Based Multiplexed and Secure Transport
    - <https://quicwg.org/base-drafts/draft-ietf-quic-transport.html>
- Explainer
  - web-transport/explainer.md at master - WICG/web-transport
    - <https://github.com/WICG/web-transport/blob/master/explainer.md>
- Requirements Doc
  - QuicTransport Design Doc
    - <https://docs.google.com/document/d/1UgviRBnZkMUq4OKcsAJvIQFX6UCXeCbOtX_wMgwD_es/edit>
- Mozilla Standard Position
  - not yet
- TAG Design Review
  - WebTransport - Issue #389 - w3ctag/design-reviews
    - <https://github.com/w3ctag/design-reviews/issues/389>
- Intents
  - Intent to Experiment: QuicTransport
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mHV_ZALf07Q/d7J9W0a1CQAJ>
- Chrome Platform Status
- Blog
- Presentation
- Issues
- Other
