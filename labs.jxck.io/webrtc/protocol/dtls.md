# DTLS1.2

## TLS over UDP

tls を udp 上で行う。

- loss
- reorder

について解決しないと、データが正しく転送できない。


## Loss Insensitive Messaging

- stream cipher を禁止
- 明示的 sequence number を導入


```
Client                                   Server
------                                   ------
ClientHello           ------>

                        X<-- HelloVerifyRequest
                                         (lost)

[Timer Expires]

ClientHello           ------>
(retransmit)
```

Client は ClientHello を送ったら HelloVerifyRequest を待つ。

もし、 HelloVerifyRequest がロストしたら、

Client からすれば、送った ClientHello か受信するはずだった HelloVerifyRequest がロストしたことがわかる。

Client は ClientHello を再送する。

Server は ClientHello を二回受信したことで、送った HelloVerifyRequest がロストしたことがわかる。

双方がタイマーを持っているが、 HelloVerifyRequest にはタイマーと再送が適用されない。

もし HelloVerifyRequest にもタイマーを適用すると、サーバに状態を持たなくてはならない。

そこで、 HVR は、フラグメントしないくらい小さくすむように設計されている。

Seq があるため、受信したらすぐに期待したパケットかがわかるし、違えば Queue に入れて後回しにする。

ハンドシェイクパケットのサイズは 2^24-1 になる可能性があるが、 UDP では 1500byte 以下にフラグメントしたい。

そこでハンドシェイクはレコードをフラグメントに分離できる。

offset と length を元にメッセージを復元できる。

リプレイについては、 IPsec と同様に、古すぎるものと既に処理したものは無視する。

ルーティングエラーで発生することもあるので、この機能はオプショナル。

Seq は epoch ごとに管理される。

初期値は常に 0 から始まる。

epoch は CCS が送られるごとに増えるため、複数のハンドシェイクが同時に発生しても見分けられる。

そのため、 TCP の maximum segment lifetime の間は、 ecoch を使いまわしてはいけない。

でも、 rehandshake はあまりない。

ハンドシェイクが完了するまでは、実装が古い epoch からのパケットを受け入れる。

reorderying の可能性があるため、 epoch 2 の後に epoch 1 のパケットが来るかもしれない。

この場合例外もあるが、基本的には無視するべき(SHOULD)。

逆に、新しくネゴシエーションされたコンテキストで保護されたレコードは、ハンドシェイクが終わる前に受信できます。

例えば、 Finished のあと、 CCS の前に Application Data を送信した場合、

実装は、そのパケットを buffer するか捨てる。

SCTP のように信頼性が有る場合は、 buffer してハンドシェイクが終わってから使う。

TLS の送信に関する制約は引き続き適用されるので、最終的には順番は守られる必要が有る。

送る場合も、ハンドシェイクが終わってから。


## message seq

handshake は msgseq = 0 から始まる。

再送される場合は、 msgseq は同じものを送る。

ただし、レコードの sequence number は増える。


```
Client                             Server
------                             ------
ClientHello (seq=0)  ------>
                        X<-- HelloVerifyRequest (seq=0)
                                        (lost)
[Timer Expires]
ClientHello (seq=0)  ------>
(retransmit)
                     <------ HelloVerifyRequest (seq=0)
ClientHello (seq=1)  ------>
(with cookie)
                     <------        ServerHello (seq=1)
                     <------        Certificate (seq=2)
                     <------    ServerHelloDone (seq=3)
[Rest of handshake]
```

DTLS 実装は(概念的に) `next-receive-seq-counter` を持つことになる。

初期値はゼロで、受信したメッセージの msgseq が同じならパケットを処理する。

小さければ、メッセージは無視される。

大きければ、 Queue に積むか、無視する。(領域、帯域のトレードオフ)


## buffering

As noted in Section 4.1.1, each DTLS message MUST fit within a single transport layer datagram. However, handshake messages are potentially bigger than the maximum record size. Therefore, DTLS provides a mechanism for fragmenting a handshake message over a number of records, each of which can be transmitted separately, thus avoiding IP fragmentation.

大きい DTLS メッセージは、 IP gragment しないサイズで fragment に分割する。

Maximum Handshake Fragment 以下の N 個に分割して良い。

fragmentoffset/framgnetlength で overlap しないように分割する。

ハンドシェイクのフラグメントを受信したら、完成するまでバッファリングする。

overlap にも対応する必要がある(MUST)

これで、送信側がハンドシェイクの再送時にフラグメントを小さくすることができるようになる。

Note that as with TLS, multiple handshake messages may be placed in the same DTLS record, provided that there is room and that they are part of the same flight. Thus, there are two acceptable ways to pack two DTLS messages into the same datagram: in the same record or in separate records.

複数メッセージをい一度に送ることもできる。

- 同じレコードに入れる
- 違うレコードに入れる


## タイムアウトと再送信

基本シーケンス


```
Client                                          Server
------                                          ------
ClientHello             -------->                           Flight 1
                        <-------    HelloVerifyRequest      Flight 2
ClientHello             -------->                           Flight 3
                                           ServerHello    \
                                          Certificate*     \
                                    ServerKeyExchange*      Flight 4
                                   CertificateRequest*     /
                        <--------      ServerHelloDone    /
Certificate*                                              \
ClientKeyExchange                                          \
CertificateVerify*                                          Flight 5
[ChangeCipherSpec]                                         /
Finished                -------->                         /
                                    [ChangeCipherSpec]    \ Flight 6
                        <--------             Finished    /

            Figure 1. Message Flights for Full Handshake
```


```
Client                                           Server
------                                           ------
ClientHello             -------->                          Flight 1
                                           ServerHello    \
                                    [ChangeCipherSpec]     Flight 2
                         <--------             Finished    /
[ChangeCipherSpec]                                         \Flight 3
Finished                 -------->                         /

Figure 2. Message Flights for Session-Resuming Handshake (No Cookie Exchange)
```

ステートマシン


```
              +-----------+
              | PREPARING |
        +---->| (client)  |<---------------------+
        |     |           |                      |
        |     +-----------+                      |
        |           |                            |
        |           | Buffer next flight         |
        |           |                            |
        |           v                            |
        |     +-----------+                      |
        |     | SENDING   |                      |
        |     |           |<------------------+  |
        |     |           |                   |  | Send
        |     +-----------+                   |  | HelloRequest
Receive |           |                         |  |
   next |           | Send flight             |  | or
 flight |  +--------+                         |  |
        |  |        | Set retransmit timer    |  | Receive
        |  |        v                         |  | HelloRequest
        |  |  +-----------+                   |  | Send
        |  |  | WAITING   |                   |  | ClientHello
        +--)--| (server)  |-------------------+  |
        |  |  |           |   Timer expires   |  |
        |  |  +-----------+                   |  |
        |  |         |                        |  |
        |  |         |                        |  |
        |  |         +------------------------+  |
        |  |                Read retransmit      |
Receive |  |                                     |
   last |  |                                     |
 flight |  |                                     |
        |  |                                     |
        v  v                                     |
    +-----------+                                |
    |           |                                |
    | FINISHED  |--------------------------------+
    |           |
    +-----------+
         |   ^
         |   |
         +---+
  Read retransmit
  Retransmit last flight


Figure 3. DTLS Timeout and Retransmission State Machine
```

In the PREPARING state, the implementation does whatever computations are necessary to prepare the next flight of messages. It then buffers them up for transmission (emptying the buffer first) and enters the SENDING state.

PREPARING: 次に送るメッセージを計算し、バッファを空にしてから積む。 SENDING へ。

SENDING: バッファの中身を送る。これで終わりなら FINISHED へ。まだ受信するなら、タイマをかけて WAITING に。

WAITING:

- タイムアウトしたら、 SENDING に戻り再送し、タイマを戻して WAITING に。
- 再送を受信したら、自分のが届かなかったので SENDING に戻りこちらも再送して、タイマを戻して WAITING に。
- 次のメッセージを受信したら、それが最後なら FINISHED へ。送るものがあるなら PREPARING へ。部分的な受信では、状態遷移もタイマのリセットも行わない。

ClientHello を送るため、 Client は PREPARING から始まる。

Server は WAITING から始まるが、バッファは空でタイマは無い。

Server が再ハンドシェイクを希望する場合、 FINISHED から PREPARING に移り、 HelloRequest を送信する。

Client が HelloRequest を受信したら、 FINISHED から PREPARING に移り、 ClientHello を送る。




In addition, for at least twice the default MSL defined for [TCP],
when in the FINISHED state, the node that transmits the last flight
(the server in an ordinary handshake or the client in a resumed handshake)
MUST respond to a retransmit of the peer's last flight with a retransmit of the last flight.

TODO: また、少なくとも TCP default MSL の2倍は、 FINISHED 状態では最後のメッセージを送り(server では通常のハンドシェイク、 client では再送のハンドシェイク)、最後のメッセージの再送信を受信したら、最後のメッセージの再送信で応答する。


これで、ラストフライトがロストした場合にデッドロックすることを防げる。

これが必要な理由。
もし、 server Finished を送ったがロストした場合、 server はハンドシェイクが終わったと思っている。
Client は Finished を待っているが、タイムアウトして Client Finished を再送する。
Server は、ハンドシェイクの完了した Finished message を送り直すことになる。
同じことは、 Server Side の Resume Handshake でも発生する。
