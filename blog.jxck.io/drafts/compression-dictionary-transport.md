# [cdt][zstd][brotli][compression] Compression Dictionary Transport によるコンテンツ圧縮の最適化

## Intro

Compression Dictionary Transport は、圧縮に用いる辞書を転送するプロコトルであり、 RFC 7932 として標準になり、実装も複数 Ship された。圧縮も brotli だけでなく zstd へと広がっている。

本サイトの対応を行ったので、方式の概要とデプロイ方法について解説する。


## 圧縮

圧縮は、基本的に「同じ値が出てきたら、前の値への参照に置き換える」という方式が中心となる。

例えば以下のような HTML を考えよう。

```html
<link rel="author" href="https://jxck.io">
<link rel="canonical" href="https://blog.jxck.io">
```

参照する位置とその長さを `[n:m]` と表すと以下のように置き換えられる。

```html
<link rel="author" href="https://jxck.io">
[0:11]canonical[18:16]blog.[34:9]
```

文字列表現では少ししか短くなってないが、参照をバイナリで表現すればかなり小さくなる。これが LZ77 などの基本的な考え方だ。

この方式は、対象としたデータの中で、いかに効率よく「同じ値」を見つけるかが肝となる。圧縮ツールでは、この「同じ値」をどこまでの範囲で探すかを指定している場合が多い。丁寧に探せば圧縮率は向上するがメモリ消費と実行時間が増え、速度を重視すると圧縮率が下がる。

ところが、対象データだけで探索を行う場合、最初の方に出てくるデータは圧縮が難しいことがわかる。そこより前に、コピーできるデータがないからだ。

同じ理由で、小さいファイルの圧縮率は相対的に下がる。そこが、アルゴリズムだけを用いた圧縮の限界になる。


## 辞書

例えば、圧縮対象が HTML の場合 `<!doctype html>` で始まる可能性が非常に高い。そして、その文字列は通常 1 回しか出てこない。特に構造化されたデータは、ヘッダには頻出するパターンが多くなる。

そこで、あらかじめ `<!doctype html>` というデータを参照用に用意しておき、それを HTML の手前にくっつけてから圧縮を始めると、こうしたパターンも圧縮できることになる。

つまり、頻出するパターンがあらかじめ分かっているなら、それをまとめておくとより効率よく圧縮できる。 LZ77 では、このパターン集を辞書(Dictionary)と呼ぶ。汎用アルゴリズムを超えた圧縮を実現するには、いかに「精度の良い辞書」を用意するかが、性能を大きく左右することになる。


## Brotli の静的辞書

brotli は最初から「Web 上でやりとりするデータ」にフォーカスしている。そこで、実際に Web 上でやり取りされている情報を大量に集め、そこから頻出パターンを抜き出した辞書を生成し *仕様の中に直書き* している。

RFC にある、長い Hex がそれに当たる。

- RFC 7932 - Brotli Compressed Data Format
  - https://datatracker.ietf.org/doc/html/rfc7932#appendix-A

実際にバイナリを覗いてみると、テキストとして認識可能な箇所が多々ある。

最初の部分は、頻出英単語だろう。

```
timedownlifeleftbackcodedatashowonlysitecityopenjustlikefreeworktextyearoverbodyloveformbookplaylivelinehelphomesidemorewordlongthemviewfindpagedaysfullheadtermeachareafromtruemarkableuponhighdatelandnewsevennextcasebothpostusedmadehandherewhatnameLinkblogsizebaseheldmakemainuser')
```

途中はなんとなく JS 感がある(改行も含めて圧縮できるよう、辞書内に改行がそのまま入っている)。

```
exit:35Zvarsbeat'});diet999;anne}}</[i].LangkmĀ²wiretoysaddssealalex;
	}echonine.org005)tonyjewssandlegsroof000) 200winegeardogsbootgarycutstyletemption.xmlcockgang$('.50pxPh.Dmiscalanloandeskmileryanunixdisc);}
dustclip).

70px-200DVDs7]><tapedemoi++)wageeurophiloptsholeFAQsasin-26TlabspetsURL bulkcook;}
HEAD[0])abbrjuan(198leshtwin</i>sonyguysfuckpipe|-
!002)ndow[1];[];
Log salt
		bangtrimbath){
00px
});ko:ģfeesad>
s:// [];tollplug(){
{
 .js'200pdualboat.JPG);
}quot);

');
```

後半の方は明らかに頻出 HTML だ

```
<html <meta charset="utf-8">:url" content="http://.css" rel="stylesheet"style type="text/css">type="text/css" href="w3.org/1999/xhtml" xmltype="text/javascript" method="get" action="link rel="stylesheet"  = document.getElementtype="image/x-icon" />cellpadding="0" cellsp.css" type="text/css" </a></li><li><a href="" width="1" height="1""><a href="http://www.style="display:none;">alternate" type="appli-//W3C//DTD XHTML 1.0 ellspacing="0" cellpad type="hidden" value="/a>&nbsp;<span role="s
```

これが Brotli の仕様そのものに含まれている。つまり、辞書を別途転送する必要はなく、サーバとクライアント両方が Brotli に対応しているだけで、この辞書を使った圧縮/伸長が可能になるのだ。

Web の静的ファイルを brotli 圧縮すると、 gzip よりかなり小さく圧縮できるのは、この辞書によるところも大きい。


## 自作の辞書

Brotli が RFC になったのは 2016 年だ。すでに 10 年経ち、その間にも Web には様々な変化がある。その変化を辞書に反映するには RFC を更新する必要がある。また、あくまで世界中のトラフィックを集計して作った辞書であるため、自分が配布するコンテンツに特化したチューニングなどはできない。

理想的には、自分の配布しているコンテンツの特性を踏まえた自作の辞書を作り、それを用いてコンテンツをより小さく圧縮できるのが理想的だ。

例えば、テンプレートエンジンにコンテンツを流し込んでいるサイトでは、テンプレートはどの記事にも現れる共通部分ととらえることができる。

従って、例えば Handlebars を使っているなら、そのテンプレートを連結したものは、 HTML を圧縮する際の辞書として使えるだろう。雑に言うとこうだ。

```console
# 辞書生成
$ cat ./src/template/*.hbs > template.dict
# 辞書を用いて圧縮
$ brotli --dictionary=template.dict index.html -o index.html.br
```

他にも、 JS をビルドした bundle.v1.js があった場合、それは更新した bundle.v2.js の辞書になる。なぜなら、多くの場合ファイル全体に対して、更新部分自体は数 % しかないからだ。

究極的には、 v1 を辞書に圧縮した v2 は、 v1 と v2 の diff だけを送っているようなイメージに近づく。

これが最も効くのは WebFont だろう。

Noto Sans JP の woff2 を配布したいが、全部は重い。かといって、そのページに必要な文字だけを送ったら、次のページでは足らない。全ページで必要な文字を事前に把握するのも難しい。

そこで、全てのページで「そのページに必要な文字だけ」の woff2 を用意し、ページごとに送る。が、その woff2 は、既に送っている woff2 を辞書として圧縮することで、「足らない文字だけを送る」に近い転送量に下げることができる。

以上を踏まえて辞書を作れば、圧縮率を上げることができる。

問題は、サーバが作ったその辞書を、クライアントにどう共有するかという問題だ。


## Web における辞書共有

実は過去にも「サーバとクライアントで辞書を共有し圧縮率を上げる」という、この目的のために作られた SDCH (js.dictionary Compression for HTTP) という仕様が存在し、Chrome にも実装されていた。

しかし、この仕様は提案時期が 2008 年頃とかなり古く、仕様も複雑だった。当時はまだ CORS なども普及する前であるため、安全性の問題もあり、全くと言ってよいほど普及せず、2016 年には Chrome からも削除された。

- js.dictionary_Compression_over_HTTP.pdf
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2008JulSep/att-0441/js.dictionary_Compression_over_HTTP.pdf

一方、後発の Brotli がブラウザに実装され、 `Content-Encoding: br` として静的辞書を使った圧縮転送を実現した。この Brotli には、仕様に定義された静的辞書以外に、独自に作った辞書を使うこともできるため、その辞書を共有するためのプロトコルを作る取り組みが始まった。

過去の失敗を踏まえて仕様をシンプルに絞り、CORS を前提とする昨今のセキュリティマナーに則った形で、この辞書共有を再定義し、より高度に圧縮することを目的として始まったのが "Shared Brotli" だ。後から「zstd など他の圧縮方式でも使える」ということで、名前をより汎用的な "Compression Dictionary Transport (CDT)" にリネームし、標準化作業が進められた。


## RFC 9842: Compression Dictionary Transport

2025年9月に RFC 9842 として発行された。

- RFC 9842: Compression Dictionary Transport
  - https://www.rfc-editor.org/rfc/rfc9842

CDT は、任意のコンテンツから辞書を作り、それをサーバ/クライアント間で共有する 2 つの方式が提案されている。

- Delta Compression
  - クライアントが取得したコンテンツを、次の取得の辞書にする
- Separate dictionary
  - 事前にサーバが用意した辞書をクライアントが別途取得する

どちらも、共有した辞書を Brotli / Zstd で使うことができるものだ。


## Delta Compression

ちょっとだけ違うリソースを連続して取得するような場面では、前回取得したものを辞書に圧縮を行えば、圧縮率を上げられる。そこで、既に取得したリソースを辞書とし、次に取得するリソースを差分圧縮するのが、Delta Compression だ。

例えば HTML の場合、同じサイトのページは `<main>` 意外の部分に共通点が多くなる。そこで、前のページの HTML を辞書として、次のページの HTML を圧縮すれば、自然と圧縮率は上がるだろう。

まず `index.html` を返す際に、「他の HTML の辞書に使える」ということを指定するには、 `Use-As-Dictionary` を用いる。

```http
Use-As-Dictionary: match="/*", match-dest=("document"), id="entries"
```

クライアントは、そこから `about.html` に遷移する際に、以下のようなヘッダをリクエストに付与する。

```http
Accept-Encoding: dcb, dcz
Available-Dictionary: :<base64-SHA256 of index.html>:
Dictionary-Id: "entries"
```

提示されたハッシュから、クライアントが `index.html` を辞書として持っていることを知ったサーバは、次に返す `about.html` を `index.html` を辞書として圧縮して返すことができる。Brotli で圧縮する場合は Delta Compression Brotli (`dcb`)、 Zstd なら Delta Compression Zstd (`dcz`) としてレスポンスする。

```http
Content-Encoding: dcb
Vary: Accept-Encoding, Available-Dictionary, Dictionary-Id
Use-As-Dictionary: match="/*", match-dest=("document"), id="entries"
```

このレスポンスは、圧縮に使う辞書によって結果が変わってしまうため、 `Vary` に依存するヘッダを入れるのを忘れてはならない。また、これを `Use-As-Dictionary` すれば、他のコンテンツの圧縮にも使うことができる。

この場合サーバは、受け取った `Available-Dictionary` のハッシュ値から、対応する辞書(ここでは HTML)を引き、それを使って次のレスポンスを圧縮することになる。

動的に HTML を生成し、レスポンスしたら捨ててしまうタイプの実装では相性が悪いため、 CDN などに HTML をキャッシュしているような構成の方が相性がいい。

また、オンザフライで圧縮するため、圧縮率よりは圧縮速度を重視した実装をすることになる。速度を重視する場合は、 Brotli よりは Zstd の方が歩がありそうだ。

しかし、このような配信に対応したサーバは



Delta Compression の場合は、基本的には送られてきた hash を元に辞書を特定し、それを用いて動的に圧縮することになる。数が少なければ、全ての(辞書, コンテンツ)の組から事前に生成することも可能かもしれないが、一般的には非現実的だろう。

つまり、動的な圧縮にかかるコストが、圧縮率とトレードオフになっており、圧縮率があまり変わらなければ、単にオーバーヘッドになる点には注意が必要だ。

### Separate dictionary

Separate dictionary は、その名の通り共有辞書を事前生成しておく方法だ。

例えば、配信する全 JS から辞書を作る。

```sh
$ ./dictionary_generator ./js.dict ./assets/js/*.js
```

この `js.dict` をサーバにデプロイし、HTML に `<link>` で指定する。

```html
<link rel="compression-dictionary" href="js.dict">
```

もしくは HTTP Field での指定も可能だ。

```http
Link: <js.dict>; rel="compression-dictionary"
```

この HTML を表示した際に、ブラウザは辞書の存在に気づき、それをダウンロードすることで、以降のコンテンツの圧縮に利用できる。つまり Prefetch 方式であるため、例えばメインページのための辞書をログインページで落としておくといった、投機的な提供を行う必要がある。

`js.dict` のレスポンスヘッダには、辞書が対象とするパスを以下のように指定する。

```http
Use-As-Dictionary: match="/assets/js/*"
```

クライアントが `Use-As-Dictionary` に指定されたパスにリクエストする際は、 `Accept-Encoding` に対応している方式をアドバタイズする。現状は以下の 2 つが定義されている。

- dcb: Delta Compression Brotli
- dcz: Delta Compression Zstd

そして、すでにクライアントが保持している辞書のハッシュ値が `Available-Dictionary` に付与される。

```http
Accept-Encoding: dcb, dcz
Available-Dictionary: :<base64-SHA256>:
```

サーバは、クライアントが指定してきた方式と辞書を使用し、コンテンツを圧縮して返すことができる。

辞書を用いた圧縮を行った場合は、レスポンスは以下のようになる。辞書によって同一コンテンツのエンコーディング結果が変わるため、Cache のキーに辞書のハッシュを追加するように、`Available-Dictionary` を `Vary` に追加する。

```http
Content-Encoding: dcb
Vary: Accept-Encoding, Available-Dictionary
```

辞書を事前に生成する方式であるため、静的サイトジェネレータなどと相性の良い方式と言えるだろう。

## Dictionary-ID

`Available-Dictionary` ベースのネゴシエーションは、辞書のハッシュをベースとしている。

毎回ハッシュを取得するより、そのハッシュに対応する辞書名を管理していれば、それを変わりに使うことができる。

特にビルドした静的ファイルをバージョン管理しているような場合は、そのバージョンが辞書の ID にも転用できるだろう。

```http
Use-As-Dictionary: match="/assets/js/bundle.v32.js, id="dict-v32"
```

この状態で、リクエストすべきファイルが `bundle.v33.js` に上がっても、ほとんどの内容は `v32` と同じで、差分圧縮が可能だろう。この場合、クライアントは以下のように `v32` を利用できることをアドバタイズする。

```http
Accept-Encoding: gzip, br, zstd, dcb, dcz
Available-Dictionary: :<base64-SHA256 of bundle.v32.js>:
Dictionary-ID: "dict-v32"
```

## Request Destination

辞書として使えるレスポンスは、基本的に同じ Content Type のレスポンスであることが多い。

しかし、構成によっては `match` に指定する同じパスの中に、複数の Content Type が混ざることもあるだろう。

この場合、「辞書として利用できる Content Type」を指定するのが `match-dest` だ。値としては、 Fetch の仕様にある [request destination](https://fetch.spec.whatwg.org/#requestdestination) を用いる。

例えば、ヘルプサイトのあるページの中で HTML のみを圧縮対象にしたいといった指定は、以下のようにできる。

```http
Use-As-Dictionary: match="/help/*", match-dest=("document")
```

## その他の仕様

- 辞書は別オリジンからも取得できるが、サイドチャネル対策のため CORS 必須。
- `Available-Dictionary` は 1 つしか送らないことでシンプルさを保っている。
  - そのおかげで `Vary` に指定できる。
  - 代わりに、被った Path 以下で持ってる辞書を全部アドバタイズさせてサーバで選ぶみたいなことはできない。
  - Delta の場合は、辞書とコンテンツの差分が多い場合、動的圧縮のオーバーヘッドが勝る可能性にも注意。
- Fingerprinting 対策のため Cookie 同様に Partitioning される
  - つまり Public CDN 的な使い方で辞書をサイト間共有することはできない
  - 今は Cache 自体も共有できない(条件あり)のであまり影響はないだろう。

## 本サイトへの適用

### 構成

本サイトは、テンプレートエンジンに Markdown を流し込んだ静的な HTML がメインだ。他の静的アセットと共に、 h2o で配信している。

生成済みのファイルについては、事前に十分に時間をかけて、圧縮しておくことができる。この場合、辞書が既に内包されている Brotli を用いるのが妥当だろう。ファイル末尾を `.br` にしておけば、 h2o がそちらを選んでくれる。

ところが、記事は同一のテンプレートを用いているため、テンプレート部分を辞書として用いると、どの記事も静的な br よりかなり高い圧縮率で圧縮できるだろう。イメージとしては、テンプレートをクライアントに配布し、記事部分だけを送るような構成だ。これも静的に可能だ。

加えて、ある記事が既に取得されていたら、それを辞書に次の記事を動的に圧縮すれば、さらに高い圧縮率が期待できる。イメージとしては、前の記事と次の記事の差分だけを送っている構成だ。ただしこれは、どの記事を辞書とするかを把握し、動的に圧縮する必要があるため、現状の h2o ではできない。

そこで、本サイトでは、記事ページ(`/entries/*`)のテンプレートから生成した entries.dictionary を事前生成し、全ての記事を事前に圧縮しておき、辞書を記事一覧ページ(`/index.html`)および記事ページで配布する構成をとることにした。

おそらく、静的サイトでの典型的な利用例と思われる。

## 辞書の作成

サンプルとなるファイルから辞書を作成する。

今回は、 HTML の転送に辞書圧縮を使うことを考え、 `blog.jxck.io/entries/**/*.html` を全てサンプルとし、辞書を生成する。

## zstd dictionary

辞書を用いた圧縮は brotli, zstd どちらでも可能だが、今回は zstd の方を用いることにする。

- facebook/zstd: Zstandard - Fast real-time compression algorithm
  - https://github.com/facebook/zstd

Homebrew で入れることができる。

```console
$ brew install zstd
```

これを用いてソースとなるファイルから辞書を生成する。

```console
$ zstd --train ./template/*.ejs -o entries.dict
```

基本的に静的ファイルは Cache Busting しておきたいので、`Available-Dictionary` に利用される SHA256 の値でファイルをリネームしておく。

```sh
$ sha256sum ./entries.dict
91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2
$ mv entries.dict 91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict
```

この辞書をデプロイする。なお、この辞書のための MIME は定義されておらず、辞書に用いたコンテンツに応じて任意のものを使ってよいとされている。

つまり、HTML をソースにしたら辞書も `text/html` となるということだが、今回は EJS をソースにしており HTML そのものではないので、一応 `text/plain` としておく。(HTML, JS, CSS などを混ぜて辞書を作ったら、どういう値にするのがよいのだろうか?)

この辞書を index.html の HTML でアドバタイズする。

```html
<link rel="compression-dictionary" href="/91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict">
```

次に、先程ビルドした brotli リポジトリのバイナリを使って、テンプレートを使って生成した各 HTML を、辞書を使って圧縮する。

```console
$ zstd -D entries.dict /path/to/entry.html
```

最後に、サーバが `Accept-Encoding: dcz` に対して、指定されたハッシュと同じ辞書で圧縮した `.dcz` ファイルを返すようにデプロイすれば完了だ。

## H2O のパッチ

本サイトは h2o でサーブしているが、h2o はまだ `.dcb` に対応していないのでパッチを当ててビルドした。

`send-compression` を有効にしたときに、拡張子付きのファイルを探してくれる部分をいじり、`.dcb` を返すようにしている。

また、`.dcb` を返す際に `Available-Dictionary` のハッシュを検証したり、`Vary` を付与するためには、conf で mruby を呼ぶか、同じくパッチを当てるしか無い。そのオーバーヘッドは検証に影響するため、ここも省略して辞書の `expires` を短くしておくにとどめた。

## 検証

Chrome Canary 117.0.5912.0 で以下のフラグを有効にし、挙動を検証した。

- #enable-compression-dictionary-transport
- #enable-compression-dictionary-transport-backend

この状態で本ブログのインデックスページにアクセスすると、以下のようにメインコンテンツの後に辞書が取得されていることがわかる。

![dictionary が取得されている devtools timeline のスクショ](./dictionary.png#3584x2108)

次に、記事に遷移すると、コンテントネゴシエーションの結果 dcb が返されていることがわかる。

![Content-Encoding dcb が取得されている devtools timeline のスクショ](./compression.png#3584x2106)

[前回の記事](/entries/2023-06-18/cookie-store-api.html) の圧縮結果を比較すると、以下のようになっている。

Caption: 圧縮率の比較
| format | byte | ratio |
|-------:|------:|------:|
| html | 27278 | 100% |
| br | 5453 | 20% |
| dcb | 4559 | 17% |

この結果では 3 point 圧縮率が向上している。全ファイルを同様に計算したが、平均で 4 point の向上だった。また、1 つだけ、結果が -1 point (br の方が dcb より 1byte 少ない)という結果もあった。

今回使った辞書のサイズは 7245 byte で、これを通常の br 圧縮して 1557 byte だったが、事前にバックグラウンドで取得することを考えると、辞書はもう少し大きくても問題はないだろう。

今回はテンプレートをただくっつけただけの辞書だったため、本文の内容の圧縮には寄与してない。brotli のデフォルト辞書がそもそも HTML を考慮していることを考えると、むしろそこに出てこない日本語部分で、頻出単語を並べるといった方法で辞書を作った方が、圧縮率は向上したかもしれない。

いずれにせよ、辞書の作り方が非常に重要になることがよくわかる。

そして、このサイトではほとんど使ってない JS/CSS の圧縮は今回対象外だったが、SPA ではそうしたアセットの圧縮こそ本仕様の本領が発揮される部分だと思われる。

そのあたりは今後の課題としたい。

## Outro

Shared Compression Dictionary の検証のため、本サイトの HTML を事前辞書で圧縮し、検証を行った。

今後この仕様が進めば、ほぼ同じだがちょっと違うため毎回取得し直さないといけないため、キャッシュも 304 もしにくい Webpack に代表されるバンドル結果の転送なども、差分だけならかなり小さくなり、より効率的にできる可能性がある。

Chrome 130 で正式 Ship され、Firefox 147 でも実装済みとなった。RFC 9842 として標準化も完了し、brotli (`dcb`) に加えて zstd (`dcz`) もサポートされている。

---



## 辞書の共有




実は、 WebBundle というコンセプトが議論されていたとき、この「差分更新」の仕組みが提案されていた。何度も送るのは無駄だから、差分だけ送りたいというのは真っ当な考えだ。

しかし、差分だけを正確に送るには、「クライアントは今何を持っているのか」を知らせる必要がある。その API はトラッキングに使えてしまうなど、プライバシーの問題があった。

もし代わりに、「圧縮の辞書」だけをやり取りできれば、詳細なクライアントの状態を露出せず、圧縮によって転送効率を差分更新に近づけることができるという狙いもあった。

あとは、辞書をどう相手に届けるか。これが Web におけるミッシングポイントだったため、そこを解決する提案へと方向転換していく。




本ブログでは 2023年7月に、まだ策定段階の Compression Dictionary Transport について解説した。

- Compression Dictionary Transport (Shared Brotli) によるコンテンツ圧縮の最適化 | blog.jxck.io
  - https://blog.jxck.io/entries/2023-07-29/compression-dictionary-transport.html

本ブログは、その更新版に当たる。


## DEMO

本サイトそのものがデモになっている。

## Resources

- Spec
  - RFC 9842 - Compression Dictionary Transport
    - https://datatracker.ietf.org/doc/rfc9842/
- Explainer
  - WICG/compression-dictionary-transport
    - https://github.com/WICG/compression-dictionary-transport
- Requirements Doc
  - Compression dictionary transport with Shared Brotli
    - https://docs.google.com/document/d/1IcRHLv-e9boECgPA5J4t8NDv9FPHDGgn0C12kfBgANg/edit
- Mozilla Standard Position
  - Request for Mozilla Position on Compression dictionary transport · Issue #771 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/771
- WebKit Position
  - Compression Dictionary Transport · Issue #160 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/160
- TAG Design Review
  - Tag review for Compression Dictionary Transport · Issue #877 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/877
- Intents
  - Intent to Experiment: Compression dictionary transport with Shared Brotli
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/NgH-BeYO72E
  - Intent to Ship: Compression dictionary transport with Shared Brotli and Shared Zstandard
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/MuaRf28nExk
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
  - horo-t/compression-dictionary-transport-shop-demo
    - https://github.com/horo-t/compression-dictionary-transport-shop-demo
  - horo-t/compression-dictionary-transport-threejs-demo
    - https://github.com/horo-t/compression-dictionary-transport-threejs-demo
- Blog
  - All the way up to 11: Serve Brotli from origin and Introducing Compression Rules
    - https://blog.cloudflare.com/this-is-brotli-from-origin/#the-future-of-web-compression
- Presentation
- Issues
- Other
