# [hsts][security] HTTP Strict Transport Security (HSTS) 対応

## Intro

本サイトにて HTTP Strict Transport Security (HSTS) を有効化した。

`*.jxck.io` 全体への適用および、ブラウザへの Preload 登録も検討したが、本ドメインの特性上それは見送った。

導入に必要な設定や、注意点についてまとめる。


## HSTS

本サイト ([blog.jxck.io](https://blog.jxck.io)) では、フル HTTPS 化が完了しており、 HTTP へのリクエストは全て HTTPS へリダイレクトしている。

特に本サイトのタイトル自体が `blog.jxck.io` であり、ドメイン名と同じになっている特性上、これが Twitter 上で `http://blog.jxck.io` へのリンクと解釈される場合が多い。

そのため、 HTTP へのアクセスも少なくはない。

このように、 HTTPS に対応しているサービスでも、 HTTPS リクエストへのアクセスを強制できない以上、 HTTP へのアクセスをリダイレクトすることになる。

しかし、 MITM の脅威への対策が可能な HTTPS でも、最初のリクエストが HTTP であると、そこに付け入る隙ができてしまう。

そのため、 「`blog.jxck.io` にアクセスするときは、必ず HTTPS を用いる」ことをブラウザに覚えさせ、強制的に HTTPS でアクセスさせる仕組みが、 HSTS である。


- [RFC 6797 - HTTP Strict Transport Security (HSTS)](https://tools.ietf.org/html/rfc6797)


## Strict-Transport-Security ヘッダ

以下のような HTTP ヘッダを追加することで、 HSTS を有効にすることができる。


```
Strict-Transport-Security: max-age=7776000
```

このヘッダを受け取ったブラウザは 7776000秒(90日) のあいだは、そのドメインに `http://~` で始まるリクエストを送信する際に、自動的にこれを `https://~` に置き換える。

これによって、例えば既にどこかのページに張られたリンクが `http://~` であったとしても、リダイレクトではなく最初から HTTPS を強制することができる。


## preload

ただし、 HSTS はレスポンスヘッダで指定された値を、ブラウザが保存して以降に有効になる仕組みのため、少なくとも一番最初にドメインにアクセスする際は http -> https のリダイレクトを避けられない。

この性質は HPKP 同様 TOFU (Trust of First Use) と呼ばれる。

そこで、ブラウザにあらかじめ HSTS 対象ドメインのリストを含んでおくことで、まだアクセスしたことがないドメインへのアクセスについても、 HTTS アクセスを強制する仕組みがある。

これが HSTS Preload である。

Chrome の場合は、以下からドメインを申請すると、審査が実施され、条件を満たすものは Chrome のソースコード中にある preload hsts のリストに追加される。

[HSTS Preload Submission](https://hstspreload.appspot.com/)


## 本サイトへの適用

本来はトップドメインである include subdomain を付与した指定をすることで `*.jxck.io` つまりサブドメイン含めた全体に対して、設定を有効にするのが望ましい。

しかし、本ドメインには [labs.jxck.io](https://labs.jxck.io) という実験用のサブドメインがある。

ここでは、平文 HTTP との比較や、 Mixed Contents の挙動のテストなど、様々な実験を行うために、 HTTP もリダイレクトせずサーブしている。

ここを HSTS に含んでしてしまうと、実験ができなくなってしまうため、除外する必要がある。

結果として、本ドメインでは **include subdomain の指定はせず**、ドメインごとに個別に指定することとした。

また、 Chrome の Preload 登録の条件には、 include subdomain の適用が含まれている。

従って、前述の通り `labs.jxck.io` だけを外すことができないため、止むを得ず **preload 登録は見送る** こととした。
