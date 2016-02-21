# [zopfli][http][performance] zopfli で静的コンテンツの gzip 配信と Content/Transfer-Encoding について

## Intro

HTTP では `Accept-Encoding` と `Content-Encoding` でのネゴシエーションにより、 gz などで圧縮したコンテンツを転送することができる。本サイトでは zopfli を用いて gzip 形式の配信に対応した。


## Accept-Encoding

クライアントが `Accept-Encoding: gzip` を指定して来た場合、サーバは `Content-Encoding: gzip` を付与し、 URI に指定されたコンテンツを gzip 圧縮して送信することができる。

特にテキストベースの HTML, CSS, JavaScript などは、この圧縮の効果が高く、ペイロードが小さくなるためパフォーマンスの向上が期待できる。

逆に、 PNG, JPEG など圧縮形式の画像などについては、オーバーヘッドが発生しサイズが増える可能性もあるため、対象フォーマットの選択には注意が必要である。


## Transfer-Encoding

HTTP には、似た仕組みとして `TE: gzip` と `Transfer-Encoding: gzip` による、経路圧縮がある。

これは、前述の `Accept-Encoding` が End-To-End で圧縮したコンテンツを転送するのと違い、 Hop-by-Hop で経路上での圧縮を実施する点で、意味的に差異がある。

例えば HTML で言えば、前者は「コンテンツ自体が gzip された html である」のに対し、後者は「コンテンツはあくまで html だが、経路上では圧縮されている」ということになる。

本サイトは、あくまで HTML を配信したいので、転送量削減のために圧縮を施すのであれば、 `TE: gzip` と `Transfer-Encoding: gzip` を使うのが妥当と言えるだろう。

しかし `TE` はブラウザ実装の問題のためか、歴史的にもあまり使われておらず、送信してくるブラウザもほとんどない。(Opera は送信すると言われているが未確認)。

そのため、 HTTP/1.1 対応のサーバでも `Transfer-Encoding: gzip` に対応したものは少なく、 h2o も対応していない。(`Transfer-Encoding: chunked` は対応している)

また、このヘッダは **コネクションに対する設定** であるが、 HTTP2 ではこうしたコネクションに対する設定は、代わりに **SETTINGS Frame** を利用することになったため、こうしたヘッダは設定不可とされている。

[8.1.2.2.  Connection-Specific Header Fields](https://tools.ietf.org/html/rfc7540#section-8.1.2.2)

まとめると、以下の理由により、この方法は却下した。

- TE を送るブラウザは少ない
- h2o も対応していない
- そもそも http2 では使えない


## h2o の設定

本サイトをデプロイしている h2o は、 `Content-Encoding: gzip` による転送を 2 つの方法でサポートしている。

### gzip ディレクティブ

以下を設定すると、 h2o はコンテンツを on the fly (リクエストが来てから)圧縮し送信してくれる。

```
gzip: ON
```

[Configure > Gzip Directives > "gzip"](https://h2o.examp1e.net/configure/gzip_directives.html#gzip)

これにより、あらかじめ圧縮していないコンテンツや、バックエンドのアプリケーションが動的に生成したコンテンツを圧縮転送することができる。
圧縮時間分のオーバーヘッドは考えられるが、一般的に gzip の処理時間は小さく、転送量の削減によるネットワーク的メリットの方が高いため、この方法が採用されることが多い。


### send-gzip ディレクティブ

あらかじめコンテンツを gzip 圧縮した状態で `ファイル名.gz` で配置し、以下を設定すると、 h2o は自動的に圧縮済みファイルを転送してくれる。

```
file.send-gzip: ON
```

[Configure > File Directives > "file.send-gzip"](https://h2o.examp1e.net/configure/file_directives.html#file.send-gzip)


事前に圧縮するため、レスポンスへのオーバーヘッドは無くなる。
しかし、バックエンドが動的に生成するレスポンスには適用できないため、事前に準備可能な静的ファイルへの適用に限定される。


## zopfli

zopfli は Google が開発した圧縮アルゴリズム、およびその実装である。

[https://github.com/google/zopfli](https://github.com/google/zopfli)


**圧縮結果が gzip 互換**であるため、方式そのものは実質 gzip である。

### 圧縮率の優先

gzip 圧縮は、ファイル内の一致部分を検出し圧縮するため、この一致部分の探索を入念に行えばより小さく圧縮できることが知られている。しかし、時間とのトレードオフであるため、一般的にはある程度の探索で止めている。

zopfli は、この探索を入念に行うことで、時間をかける代わりに、より小さく圧縮するという方針をとる。


## 時間と圧縮率の検証

本サイトのメインコンテンツはビルドした html である。これを、事前になるべく小さく圧縮しておきたいわけだが、あまり時間がかかるのも困る。

zopfli は、探索を繰り返す回数を調節できるため、この回数の増減による、圧縮率と実行時間を検証した。


### ベンチマーク

以下のように、前回の記事に対して zopfli コマンドを実行し、 time コマンドで実行時間を計測した。

```sh
$ time zopfli --i10 -c loading-css-over-http2.html
```

`--i` が探索回数であり、これを増やせばより小さく圧縮できるが、時間がかかる。
デフォルトは `i = 15` であるため、 `10..100` まで増やしながら実行した。

最初の段は、元のファイルサイズ、二段目は `gzip` コマンドの結果である。


```
orig   -      17497
gzip   0.002   5348
  10   0.18    5164
  20   0.22    5159
  30   0.24    5159
  40   0.29    5159
  50   0.39    5159
  60   0.42    5159
  70   0.46    5156
  80   0.50    5156
  90   0.55    5156
 100   0.58    5156
```

この結果だと `-i20` 以上は誤差のようである。
ただ、開発用の Mac では少し違う結果が出たりもしたため、結果 `i=30` くらいに落ち着いた。

また、 [WebP](//www.jxck.io/assets/img/jxck.webp) と [PNG](//www.jxck.io/assets/img/jxck.png) の画像ファイルでも検証したところ、以下のようになった。

```
jxck.png     3860
jxck.png.gz  3399
jxck.webp    1810
jxck.webp.gz 1873
```

WebP はそもそも圧縮率が高いためか、オーバーヘッドが出ている。

画像は、画像サイズ自体の最適化などの問題があるが、とりあえずは WebP 形式のみ除外することにした。除外対象は、定期的にサイズを確認し修正して行く。


## zopfli + send-gzip

以上により、本サイトでは全静的コンテンツをデプロイプロセスで zopfli による圧縮を実施し、それを h2o の `send-gzip` ディレクティブで配信することにした。

検証の結果、このサイトでは以下の設定を採用した。

- `i=30`
- `send-gzip: ON`
- webp は対象外


動作は、 HTTP ヘッダで確認できる。


![Content-Encoding Support Before/After](zopfli.png#652x461 "Content-Encoding ヘッダの確認")


また、一部は h2o の mruby-handler で動的な生成をしているが、 `gzip` ディレクティブの効果は未検証なので設定していない。

本サイトで `.html`, `.css`, `.js` で終わるような URL は、 `.gz` を後ろに付けると zopfli 圧縮版が取得できるので、興味があれば試してみて欲しい。

[この HTML の zopfli 圧縮版](https://blog.jxck.io/entries/2016-02-17/content-encoding-zopfli.html.gz)


## brotli

また Google は [brotli](https://github.com/google/brotli) という圧縮フォーマットも持っている。
こちらは、 gzip などとの互換は無いため、クライアントも対応しないと使うことはできない。
新しいフォーマットとして、 [IETF へのドラフトの提出](https://tools.ietf.org/html/draft-alakuijala-brotli-08) もなされている。

現在は [Chrome が HTTPS のみでサポート](https://plus.google.com/u/0/+IlyaGrigorik/posts/X9ogn4fLtHL) していおり、 Canary で `chrome://flags#brotli` を有効にすると、 `Accept-Encoding: br` が追加されるので、サーバはこれを見て brotli で圧縮したファイルを返すことができる。

ほとんどのブラウザが対応している gzip と違い、まだ対応ブラウザも少なく、 H2O も対応していないため `Accept-Encoding` での判断を自分でハンドラに書く必要がある。

H2O には既にbrotli への対応を求める issue が上がっているので、対応したらそこでまた検証しようと思う。

[Feature request: file.send-brotli #660](https://github.com/h2o/h2o/issues/660)
