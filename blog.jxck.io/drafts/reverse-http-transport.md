# Reverse HTTP Transport が描く新しい Web サービスデプロイ構成

## Intro

IETF の httpbis で、 Reverse HTTP Transport という仕様が提案されている。

- Reverse HTTP Transport
  - https://www.ietf.org/archive/id/draft-bt-httpbis-reverse-http-01.html

この仕様は、 Origin サーバの前に何かしら Intermediaries (Loadbalancer, Reverse Proxy, CDN etc)があるのが一般的な現代の Web サービス構成において、非常に革新的なアイデアを取り入れたプロトコルと言える。

まだ v01 という初期段階ではあるが、発想が非常に面白かったので、読書メモを残す。


## 登場人物

ベースとして HTTP の話にはなるが、登場人物が多いため Client/Server という「相対的な役割」で話をすると、紛らわしくなる。

そこで、まず現代の一般的な用途を表すために、 Browser と Origin という構成から話をスタートしよう。

この場合、 Browser がリクエストをし、コンテンツを返すのが Origin だ。

```
Browser ----> Origin
```

しかし、実際にはその間にさまざまな Intermedialies (Middle Box とも呼ぶ) が挟まり、 HTTP を中継している。

```
Browser ---> Intermedialies ---> Origin
```

Intermedialies で代表的なのは、以下のようなものだ。

- Reverse Proxy
- Loadbalancer
- WAF
- CDN
- etc

実際、このあたりの名前の使い分けはかなり曖昧になってきている。

どの名前であっても、やることは Origin の手前に立って、以下の役割のどれかをやったりやらなかったりすることが多いだろう。

- Origin をインターネットから隠匿
- 後続の Origin クラスタへの負荷分散
- DDoS をはじめとする攻撃の検出と排除
- コンテンツのキャッシュをし、 Origin への負荷軽減
- A/B Testing や Blue-Green Deploy のサポート
- Client IP の隠蔽(OHTTP)
- etc etc etc

実装でイメージすると、何ができてできないかは実装次第というのもよくわかるだろう。

- Nginx, Squid, HAProxy, ATS, BigIP
- AWS ELB/ALB, GCP CLB, Azure TM
- Cloudflare, Fastly, Akamai
- etc etc etc

今回は、何をしているかはあまり関係なく、とにかく何かが立っていて、それを経由して Origin に接続するという構成がわかっていればいい。

そして、この Intermedialies を、サービス開発者が Origin と一緒に管理していると、少し旨みがわかりにくくなる。

そこであえて今回は、何をやっているかは別として、外部の CDN ベンダが入っていると仮定して話を進める。

Cloudflare や Fastly が入ってるようなイメージで考えると良いだろう。

```
Browser ---------> CDN --> Origin
```


## Reverse HTTP

通常 HTTP で通信する場合は、 CDN が Browser からのリクエストを Origin に転送することになる。

```
Browser ---[http]---> CDN -[http]-> Origin
```

Reverse HTTP は、 Origin が CDN に対して接続を行うのだ。

正確にはこうなる。

1. Origin が CDN に対して HTTP/2 or HTTP/3 のハンドシェイクを行う
2. CDN はその接続を使って、 Browser からの HTTP を Origin に転送する

シーケンスでみるとこんな感じだ。

```
+---------+                  +---------+                +----------+
|         |                  |         |                |          |
| browser |                  |   CDN   |                |  Origin  |
|         |                  |         |                |          |
+----+----+                  +----+----+                +-----+----+
     |                            |                           |     
     |                            |       TLS Handshake       |     
     |                            | <-------------------------+     
     |                            +-------------------------> |     
     |                            |                           |     
     |      TLS Handshake         |                           |     
     +--------------------------> |                           |     
     | <--------------------------+                           |     
     |                            |                           |     
     |                            |                           |     
     |         HTTP Req           |                           |     
     +--------------------------> |                           |     
     |                            |         HTTP Req          |     
     |                            +-------------------------->|     
     |                            |                           |     
     |                            |         HTTP Res          |     
     |                            | <-------------------------+     
     |         HTTP Res           |                           |     
     | <--------------------------+                           |     
     |                            |                           |     
     |                            |                           |     
     |                            |                           |     
```

Origin デプロイした瞬間に CDN に事前にコネクションを確立しておく。そして CDN はそのコネクションを逆に使って HTTP を転送するのだ。

その接続を逆に使い、かつそこに複数のリクエスト/レスポンスを多重化するため、 HTTP/2, 3 が前提となり HTTP/1.1 は使えない。

この方式に、いったいどういうメリットがあるだろうか?


## Reverse HTTP のメリット

### Origin の隠蔽

本来 CDN には、転送先である Origin の IP を教えておく必要がある。 CDN が別事業者の場合は、 Origin を固定 IP にし、それを CDN に登録するといった運用になるだろう。

クラウド的な構成なら、例えば AWS で EC2 に立てた Origin は専用のネットワーク内に閉じ込め、 ELB だけが EC2 にアクセスするよくある構成になるが、この場合は Origin が固定 IP でインターネットに出ている必要がある。

つまり、ネットワークが別れない構成では、この固定 IP が漏れると直接 DDoS は可能となるのだ。

しかし、 Reverse HTTP では、 CDN はあくまで確立したコネクションに転送していくだけなので、「Origin が CDN のエンドポイントを知っている」だけでよいのだ。おそらく固定 IP である必要もないだろう。そして、ネットワーク的にも、あくまで Origin が CDN に接続できさえすれば良いので、 Origin の隠蔽は従来よりも柔軟に行うことができそうだ。


### Origin 構成の自由度

もし Origin が複数に分散していた場合、 CDN が負荷分散するためには、個々の Origin の IP をすべて CDN に教える必要があった。

しかし、 Reverse HTTP なら、 Origin は起動したたびに CDN に繋ぎにいくだけで良いので、 CDN は常に「貼られている接続」に対して負荷分散を行えば良い。

負荷が増えれば Origin を増やし、減ったら Origin を減らすだけで、 CDN 側にクラスタの現状を知らせる必要すらなくなる。


## 運用の変化

便利そうな方式ではあるが、従来の運用との大きな変更もある。


### クライアント証明書

CDN が接続してきた Origin を信用するために、 Origin にはクライアント証明書の提供が求められる。

つまり、これまで「サーバにはサーバ証明書を置く」のが一般的だったが、この構成では「サーバにクライアント証明書を置く」という運用になる。

このクライアント証明書を誰がどう発行するのか、どのようにデプロイするのかは、正直なところまだよくわかってないが、おそらく Reverse HTTP に対応した CDN が Origin に対して発行することになるだろう。

ここの管理の変更は、従来の運用に対するインパクトが大きそうに思う。また、このクライアント証明書に何が書かれるのかよくわかってない。


### IP アドレス

固定 IP である必要は無くなったが、逆に IP の Leak を防ぐために「Origin の IP は定期的に変更する」ことが SHOULD として求められている。

これは、 CDN と Origin がネットワーク的に別れている構成だと面倒な気がする。

やはり、従来のクラウドでのやり方のように、 Origin が Private Network に並んでて CDN がその境界にいる構成の方が組みやすい気がするが、その場合は (EC2 - ELB/ALB みたいに) Reverse する旨みがあまりない気がするが、どうなんだろうか。


### 逆方向のトラフィック

最も気になるのは「このパケットは通るのか?」という点だ。

HTTP のレイヤはすべて暗号化されるので、 Origin から CDN への TLS Handshake が通るかが肝になるだろう。

通常 Origin 側から外に ClientHello が飛ぶことや、ましてそこにクライアント証明書が出ていくことなどは、あまり想定されてないように思う。

とはいえ、 CDN-Origin のネットワークはサービス提供側の管理下になることが多いだろうため、心配する範囲は狭いのかもしれない。


## Client Selected Inermediaries

ここまでの話は、サービスプロバイダが Origin の前に立てる Intermediaries を例に話した。

しかし、この仕様のスコープには、 Browser 側に立つ Intermediaries も含まれている。例えば以下だ。

- 企業のネットワークに立ってる社内 Proxy
- Private Realy のような OHTTP Proxy
- 自分で立てるなんらかの用途の串

こうした Intermediaries に対しても Reverse HTTP を適用しても良いとされている。

今回の仕様で一番驚きだったのは、以下の部分だ。

> If a "Via" header arrives with an unrecognized host, the origin MAY attempt a Reverse HTTP connection for use by future requests from this intermediary.
> --- https://www.ietf.org/archive/id/draft-bt-httpbis-reverse-http-01.html#section-3.2

つまり、リクエストの `Via` ヘッダによって Proxy などが発覚した場合、その Proxy に対して Origin 側から Reverse HTTP を試して良いらしい。

野良の Proxy がクライアント証明書を受け付けるとも思えないため、よく使われる Proxy つまり現代では Private Relay で接続してきた iPhone がいたら、 Origin は Private Relay に Reverse HTTP を確立しておけるということだろうか。

Private Relay だけでもトラフィックは少し複雑になっているが、その上でさらに Reverse HTTP をすると、もはやこれまでの HTTP とはだいぶ違ったシーケンスになる。


## Outro

まだ初期段階の短いドラフトだし、読んでも具体例が想像しにくいところは多々あった。しかし、発想としては非常に面白いと思う。同時に、手なづけるのは難しそうに思った。

特に、クライアント証明書周りがどういう運用になるのかで使い勝手が決まってくるような気がするので、最初は CDN (Cloudflare, Fastly 系)からの提供で使うことになるのだろうかと思う。

逆に AWS や GCP 上でがっつり構築して、ネットワーク内にインスタンスがあって、その出口に LB がある構成で、それでも Reverse するメリットがあるのかなどはよくわからない。

とにかく、早く動いてるところを見たいプロトコルだ。