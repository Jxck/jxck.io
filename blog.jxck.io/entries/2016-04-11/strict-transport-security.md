# [hsts][security] HTTP Strict Transport Security (HSTS) 対応

## Intro

本サイトにて HTTP Strict Transport Security (HSTS) を有効化した。

`*.jxck.io` 全体への適用および、ブラウザへの Preload 登録も検討したが、本サイトの特性上それは見送った。

導入に必要な設定や、注意点についてまとめる。


## HSTS

本サイト ([blog.jxck.io](https://blog.jxck.io)) では、フル HTTPS 化が完了しており、 HTTP へのリクエストは全て HTTPS へリダイレクトしている。

特に本サイトのタイトル自体が `blog.jxck.io` であり、ドメイン名と同じになっているため、これが Twitter などで `http://blog.jxck.io` へのリンクと解釈される場合が多く、そこからの HTTP へのアクセスも少なくはない。

しかし、 MITM の脅威への対策が可能な HTTPS でも、最初のリクエストが HTTP であると、そこに付け入る隙ができてしまう。

そこで、 「`blog.jxck.io` にアクセスするときは、必ず HTTPS を用いる」ことをブラウザに覚えさせ、 `http://blog.jxck.io` のリンクを踏んでも、ブラウザが自動的に `https://blog.jxck.io` に置き換えてアクセスさせる仕組みが、 HSTS である。


- [RFC 6797 - HTTP Strict Transport Security (HSTS)](https://tools.ietf.org/html/rfc6797)


## Strict-Transport-Security ヘッダ

以下のような HTTP ヘッダを追加することで、 HSTS を有効にすることができる。


```
Strict-Transport-Security: max-age=7776000
```

このヘッダは、 HTTP ではなく HTTPS のレスポンスに付与する。

このヘッダを受け取ったブラウザは 7776000秒(90日) のあいだは、そのドメインに `http://~` で始まるリクエストを送信する際に、自動的にこれを `https://~` に置き換える。

これによって、例えば既にどこかのページに張られたリンクが `http://~` であったとしても、リダイレクトではなく最初から HTTPS を強制することができる。


## preload

ただし、 HSTS はレスポンスヘッダで指定された値を、ブラウザが保存して以降に有効になる仕組みのため、少なくとも一番最初にアクセスするドメインでは、際は http -> https のリダイレクトを避けられない。

この性質は [HPKP](https://blog.jxck.io/entries/2016-04-09/public-key-pinning.html) 同様 **TOFU** (Trust of First Use) と呼ばれる。

そこで、ブラウザに HSTS 対象ドメインのリストをあらかじめ含んでおくことで、ユーザがまだアクセスしたことがないドメインについても、初回アクセス時から HTTS アクセスを強制する仕組みが HSTS Preload である。

Chrome の場合は、以下からドメインを申請すると、審査が実施され、条件を満たすものは Chrome のソースコード中にある preload hsts のリストに追加される。

[HSTS Preload Submission](https://hstspreload.appspot.com/)


## 本サイトへの適用

本来はトップドメインに `includeSubDomains` を付与した指定をすることで `*.jxck.io` つまりサブドメイン含めた全体に対して、設定を有効にするのが望ましい。

しかし、本ドメインには [labs.jxck.io](https://labs.jxck.io) という実験用のサブドメインがある。

ここでは、平文 HTTP との比較や、 Mixed Contents の挙動のテストなど、様々な実験を行うために、 HTTP もリダイレクトせずサーブしている。

ここを HSTS に含んでしてしまうと、実験ができなくなってしまうため、除外する必要がある。

結果として、本ドメインでは **`includeSubDomains` の指定はせず**、ドメインごとに個別に指定することとした。

また、 Chrome の Preload 登録の条件には、 `includeSubDomains` の適用が含まれている。

従って同様の理由から、止むを得ず **preload 登録は見送る** こととした。

結果、現時点では [jxck.io](https://jxck.io) 及び [blog.jxck.io](https://blog.jxck.io) に対して、以下のヘッダを付与した。

```
Strict-Transport-Security: max-age=31536000
```
