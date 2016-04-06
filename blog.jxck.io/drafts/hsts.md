# [hsts][security] HTTP Strict Transport Security (HSTS) 対応

## Intro

本サイトにて HTTP Strict Transport Security (HSTS) を有効化した。

`*.jxck.io` 全体への適用および、ブラウザへの Preload 登録も検討したが、本ドメインの特性上それは見送った。

導入に必要な設定や、注意点についてまとめる。


## HSTS

本サイトでは、フル HTTPS 化が完了しており、 HTTP へのリクエストは全て HTTPS へリダイレクトしている。

特に本サイトのタイトル自体が `blog.jxck.io` とドメイン名と同じになっている特性上、これが Twitter 上で `http://blog.jxck.io` へのリンクと解釈される場合が多い。

そのため、 HTTP へのリンクも少なくはない。

しかし、 MITM の脅威への対策が可能な HTTPS でも、最初のリクエストが HTTP であると、そこに付け入る隙ができてしまう。

そのため、 「`blog.jxck.io` にアクセスするときは、必ず HTTPS を用いる」ことをブラウザに教えるのが HSTS である。


- [RFC 6797 - HTTP Strict Transport Security (HSTS)](https://tools.ietf.org/html/rfc6797)


## 対応

実際には、以下のような HTTP ヘッダを追加することで有効化できる。


```
TODO
```


## include subdomain

本来はトップドメインである include subdomain を付与した指定をすることで `*.jxck.io` つまりサブドメイン含めた全体に対して、設定を有効にするのが望ましい。

しかし、本ドメインには [labs.jxck.io](https://labs.jxck.io) という実験用のサブドメインがある。

ここでは、平文 HTTP との比較や、 Mixed Contents の挙動のテストなど、様々な実験を行うために、 HTTP もリダイレクトせずサーブしている。

ここを HSTS に含んでしてしまうと、実験ができなくなってしまうため、除外する必要がある。

結果として、本ドメインでは include subdomain の指定はせず、ドメインごとに個別に指定することとした。


## preload

HSTS は、レスポンスヘッダにて指定するため、最初の一回はどうしても http -> https のリダイレクトを避けられない。

ここを防ぐには、まだアクセスしたことがないドメインへのアクセスについても、 HTTS アクセスを強制する必要がある。

そこで、ブラウザにあらかじめ HSTS 対象ドメインのリストを含んでおくことで、これを実現するのが Preload である。

Chrome の場合は、以下からドメインを申請すると、審査が実施され、条件を満たすものは Chrome のソースコード中にある preload hsts のリストに追加される。

TODO: link

しかし、 Preload 登録の条件に include subdomain が含まれている。

従って、前述の通り `labs.jxck.io` だけを外すことができないため、止むを得ず preload 登録は見送ることとした。
