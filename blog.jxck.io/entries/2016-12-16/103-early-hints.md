# [early hints][preload][push][http2][http] HTTP の新しいステータスコード 103 Early Hints

## Intro

これは、 [http2 Advent Calendar 2016](http://qiita.com/advent-calendar/2016/http2) の 16 日目の記事である。

HTTP に新しいステータスコード `103 Early Hints` が追加されようとしている。

HTTP/1.1 および HTTP2 双方と関わり、リソース配信の最適化に利用することができる。

いったい何のために必要なのか、どういうメリットが考えられるかを解説する。


## HTTP2 Push の復習

まず HTTP2 の Push について復習する。

H2 Push は、簡単に言えば PUSH_PROMISE フレームを用いて、レスポンスよりも先に依存するリソースを返すための仕様である。

例えば `/users` のレスポンスは `script.js` と `style.css` をサブリソースとして含んでいるとする。

HTTP2 では SQL を発行して `Users` の一覧を取得している間に、先行して `script.js` と `style.js` を Push しておくことができる。

Push されたリソースはブラウザのキャッシュに入り、 `/users` のレスポンスが終わり HTML がパースされたのち、二つのリソースへの追加リクエストが発行された際に、キャッシュがヒットしてリソースが揃う。

これにより二つのポイントが最適化されていることになる。

- DB アクセスの時間を有効に使える
- 2 つのサブリソースへのリクエストが実質なくなり各 0.5 RTT 分づつ浮く

これが H2 Push の基本となる。


## Reverse Proxy

通常、サービスを提供する場合は、ロジックを持つ Origin Server の手前には Reverse Proxy などが立っている場合が多いだろう。

もし Origin が H2 を話し、 Reverse Proxy も H2 のままフォワードすれば、 H2 Push をそのままクライアントに届けることができる。

しかし、構成によっては Reverse Proxy が H2 を H1.1 に解いてフォワードする場合がある。

この場合、 H2 のフレームを使うことができないため、そのままでは Push を行うことができない。

そこで、 HTTP の Link ヘッダなどを用いて、 Reverse Proxy にサブリソースの存在を伝え、それを H2 の Push に翻訳してもらってクライアントに Push というワークアラウントがある。

さて、この場合は先ほどあげた二つのポイントと照らし合わせても、前者の DB アクセスの時間の有効利用を再現することはできない。

理由は H1.1 時代のプロトコルフォーマットにある。


## ステータスコードとヘッダ

テキストベースプロトコルである HTTP/1.1 のレスポンスはこうなっている。


```
200 OK
Content-Length: 100
Content-Type: text/html
Link: </style.css>; rel=preload
Link: </script.js>; rel=preload

{response body}
```

このバイト列を順にソケットに書いていく限り、 Push のために送りたい Link ヘッダは、ステータスコードが決まってからでないと書き込むことができない。

そしてこのステータスコードが 200 なのか 404 なのか 500 なのかは、 DB を叩いて見ないとわからないのだ。 DB を引いている間に Link ヘッダだけを送るということは、従来の H1.1 の範囲では実現できない。

この制限のため、 H1.1 に翻訳する形で H2 を使う場合、 Push のポテンシャルを引き出すことができなかったのだ。


## 103 Early Hints

この問題に対応するために提案されたのが h2o の開発者である [@kazuho](https://twitter.com/kazuho) さんが提案した、ステータスコード 103 だ。

[An HTTP Status Code for Indicating Hints](https://tools.ietf.org/html/draft-kazuho-early-hints-status-code)

103 は、ヘッダだけを送る目的で使われ、実際のレスポンスは後から来るというセマンティクスになっている。

先の例の場合、 DB を引いてる最中に Link だけを 103 で送り、残りは後から送る。


```
103 Early Hints
Link: </style.css>; rel=preload
Link: </script.js>; rel=preload


200 OK
Content-Length: 100
Content-Type: text/html

{response body}
```

Origin Server はリクエストを受信したのち、ステータスコードが決まる前に、サブリソースの存在を 103 でレスポンスする。

Reverse Proxy はこの 103 消費し、 H2 Push に読み替えてクライアントに Push する。

Origin Server は User を DB から引いて、レスポンスコードが決まってから body とともにレスポンスを返す。

これにより、 H2 Push の二つのメリットが、両方享受できるようになるわけである。


## 静的アセット Push の移譲

もし Reverse Proxy が H2 を解かず、 Origin が直接 Push を行えるとしても、 Early Hints は役に立つ。

通常、静的アセットファイルの送信は、 Origin ではなく Reverse Proxy がコンテンツサーバとなり、そこから配信されることが多いだろう。

そこで Origin がサブリソースを Push したい場合、直接そのアセットを body に含めた Push Promise を送るのではなく、 H2 のフレームで Early Hints にパスだけを指定して送信する。

それを Reverse Proxy が消費し、 H2 Push に読み替えて指定されたパスの静的アセットをクライアントに Push する用途が考えられる。

これにより、従来の構成と同様に、 Origin が静的アセットファイルそのものを保持する必要がなくなるわけである。


## H2 Push 以外の用途

HTTP の Link の用途は H2 Push だけではなく、 Resource Hints と呼ばれる仕様によって、次に利用するリソースの情報を提供する仕様がある。

こうした情報は、投機的にクライアントに与えられ消費されるわけだが、これもステータスコードの決定を待つ必要が無い場合が多い。

そこで、 Reverse Proxy の存在を前提とせずとも、直接クライアントに対して 103 を送り、消費させる構成も考えられるだろう。

H2 の Push が可能なのは、そのサーバが扱えるコンテンツ = 1st Party リソースに限るが、 Resouce Hints にはこの制限が無い。そこで、別オリジンの CDN などを利用し、 3rd Party の静的アセットを配信する場合も、そのサブリソースの存在をいち早く伝える上で、 Early Hints は有用である。

ただし、 103 に対応していないクライアントに送った場合、意図しない挙動があり得るため、時期尚早といえる。しばらくは、実装が担保できる Reverse Proxy を前提としてデプロイすることになるだろう。


## まとめ

マクロに捉えると、 103 Early Hints は、レスポンス無いの **既知のメタ情報** と **未知のコンテンツ** を分離し、非同期に送達できる仕組みであると見ることができる。

H1.1 のセマンティクス上にありながら、そのペイロードフォーマットの制限を外すことにより、既存の資産を有効活用しながらも、 H1.1/H2 双方の新機能の恩恵を受ける上で、非常に重要な概念と言えるのではないだろうか。


## Special Thanks

この記事を書くにあたり [@kazuho](https://twitter.com/kazuho) さんにアドバイスをいただきました。ありがとうございます。
