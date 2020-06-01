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

Quic のプロトコル実装がある場合は、 ALPN を少しいじるくらいで基本的には実装できそうだ、その場合は wpt の実装が参考になるだろう。



## Client

単純な datagram 送受信のサンプルは以下のようになる。

送受信は un-reliable であり、送達は保証されない。

WebSocket に似た使用感ではあるが、 EventTarget ベースではなく Promise で flag を待つような API になっていることがわかる。


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


イベントベースがよければ EventTarget で繋ぐこともできるだろう。

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
  }

  send(data) {
    this.writer.write(data)
  }

  close() {
    this.transport.close()
  }
}
```




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

