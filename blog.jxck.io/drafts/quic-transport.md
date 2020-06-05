# [QuicTransport][WebTransport][UDP] QuicTransport で datagram 通信

## Intro

WebTransport の Quic 実装である QuicTransport の開発が Chrome で行われている。

試せるところまで来たので実際に動かしながら解説する。


## QuicTransport

WebTransport については [以前解説した](https://blog.jxck.io/entries/2019-08-18/webtransport-and-webcodecs.html) が、位置づけとしてはこうだ。

- WebTransport
  - QuicTransport
  - Http3Transport


使用感は WebSocket を Promise や Stream ベースでモダンにし、データが UDP で送られているといったイメージだ。


## Server

サーバの実装はまだ少ないが Chrome のリポジトリと、 WPT(WebPlatformTest) にサンプルの実装が入っている。

- [net/tools/quic/quic_transport_simple_server_bin.cc - chromium/src](https://chromium.googlesource.com/chromium/src/+/master/net/tools/quic/quic_transport_simple_server_bin.cc)
- [wpt/quic_transport_server.py](https://github.com/web-platform-tests/wpt/blob/master/tools/quic/quic_transport_server.py)


QUIC のプロトコル実装がある場合は、少ない追加コードで QuicTransport で使えるようになっている。具体的には以下だ。

- ALPB が `wq-vvv-01`
- Client Indication で Origin + Path を通知


Quic のプロトコル実装がある場合は、 ALPN を少しいじるくらいで基本的には実装できそうだ、その場合は wpt の実装が参考になるだろう。






## Client

単純な datagram 送受信のサンプルは以下のようになる。

送受信は un-reliable であり、送達は保証されない。

WebSocket に似た使用感ではあるが、細かいところが違う。


```js
const url = `quic-transport://labs.jxck.io:3000/echo`
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


### EventTarget

サーバとの接続、切断を `ready`, `closed` という Promise を返すプロパティで表現している(ServiceWorker と類似)。

これはまだ議論中だが、この実装だと、同期処理になる state プロパティを無くし、その変更を表す onstatechange が不要になるため EventTarget を継承する必要がなくなる。

- [WebTransport.ready - Issue #92 - WICG/web-transport](https://github.com/WICG/web-transport/issues/92)


内部の状態が少なければこれで良いのかもしれない。EventTarget ベースのコードの方が慣れている場合は以下のように Wrap することもできるだろう。

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
        const detail = await this.reader.read()
        this.dispatchEvent(new CustomEvent('data', {detail}))
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





## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- TAG Design Review
- Intents
- Chrome Platform Status
- Blog
- Presentation
- Issues
- Other

