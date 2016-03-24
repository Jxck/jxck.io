# [h2o][http2] h2o で https/2 のデプロイと設定

## Intro

土台がだいたいできたので、このサイトを h2o にデプロイした話。


## h2o

以前は nginx を使っていたけど、年末に旧ブログの方に書いた Cache-Aware Server Push を試したかったから。

[HTTP/2 Push を Service Worker + Cache Aware Server Push で効率化したい話](http://jxck.hatenablog.com/entry/service-worker-casper)

これは現在 httpbis にドラフトとして上がっており、議論が進んでいる。

[Cache Digests for HTTP/2](https://tools.ietf.org/html/draft-kazuho-h2-cache-digest-00)


まだ Cookie での実装は残っているので、このサイトで対応して行きたい。


## 証明書

実は ** *.jxck.io ** に対するワイルドカード証明書を買っている。
したがって、 Let's Encrypt は使ってない。
これは Podcast のドメインのほうでやっていこうと思ってる。


## ドメイン

今までは [jxck.io](https://www.jxck.io) だけで使っていたけど、これを複数ドメインにわけて運用する。
ワイルドカードがあり、同一 IP でデプロイされていると、 http2 でコネクションを束ねられる。


## SSL LAB

TLS の設定を SSL LABS で調べて A+ を取るのがトレンドみたいになっている。このサイトの結果は A になっている。

[SSL Report: jxck.io](https://www.ssllabs.com/ssltest/analyze.html?d=jxck.io&latest)

これは、せっかくなので **TLS1.2** 以下を切ったり、 **暗号スイート** を強めに制限しているため、古い Android への対応できてないからである。

積極的に切って行くスタイル。


## 静的ファイルへのマッピング

h2o の設定でちょっとハマったのがパスとファイルの紐付けができないところ。

たとえば、 `favicon.ico` だとか `robots.txt` は、特定の URL に対して特定のファイルを割り当てる。
これがこう書けると嬉しい。


```
paths:
  "/favicon.ico":
     file.dir: /some/path/to/favicon.ico
  "/":
     file.dir: /path/to/doc-root
```


しかし、実際は paths へはディレクトリしか紐づけられない。
やるなら mruby.handler を使うしかない。
(399 は、 fallthroug の独自ルールになってるらしい)

```
"/":
  mruby.handler: |
    Proc.new do |env|
      if env["PATH_INFO"] == "/favicon.ico"
        [200, {"content-type" => "image/x-icon"}, File::open("/path/to/favicon.ico")]
      else
        [399, {}, []]
      end
    end
  file.dir: /path/to/dir
```

しかしこれを毎回書くのはちょっと面倒。
kazuho さんとは、ファイルを割り当てられるようにするか、もはや h2o.conf を自動生成するか、 ruby で書けるようにしたらいいか、みたいな話をした。


## HSTS

http -> https へのリダイレクトは入れているが、 HSTS ヘッダはまだ吐いてない。
これ吐いてしまうと、ブラウザに忘れさせない限り http では繋がらなくなり、デバッグがちょっと面倒になる場合がある。

一通り開発が落ち着いたら吐く。


## Outro

細かい設定が固まったらまた書く。
