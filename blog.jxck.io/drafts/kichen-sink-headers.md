# [security][http] よくわからなかったら「互換性」とか「歴史的経緯」って言っておけば良いと思っている全ての開発者へ


Kichen Sink Heaers の弊害と Web プラットフォームにおける「デフォルト」の安全性

## Intro

例えば以下のようなヘッダを見ることがある。

```http
Cache-Control: no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate
```

このような、様々なディレクティブをひたすら詰め込んでおくスタイルは、 Kichen Sink Headers と呼ばれる。

Kichen Sink は、 Cache-Control に限らず様々な場面で行われている。

なぜ、台所には無造作に皿が積み上げられてしまうのだろうか?


## Kichen Sink

前述の Cache-Control の例は、仕様上最も制限の強いディレクティブが採用され、それ以外は無視されることになる。

つまり、仕様上は以下と同等の効果しかない。

```http
Cache-Control: no-store
```

それ以外のディレクティブは全て無駄だ。つまり 56 byte のバラストを送っていることになる。


## Helmet

Helmet は、ありとあらゆるセキュリティ系のヘッダを自動で付与するミドルウェアだ。

```http
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';
    base-uri 'self';
    font-src 'self' https: data:;
    form-action 'self';
    frame-ancestors 'self';
    img-src 'self' data:;
    object-src 'none';
    script-src 'self';
    script-src-attr 'none';
    style-src 'self' https: 'unsafe-inline';
    upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-00hq6RNueFa8QiEjhep5cJRHWAI"
Date: Thu, 09 May 2024 17:37:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
