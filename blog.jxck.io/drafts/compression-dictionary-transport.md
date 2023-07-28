# Compression Dictionary Transport (Shared Brotli)

## Intro

Chrome で Compression Dictionary Transport の Experiment が行われている。

- Intent to Experiment: Compression dictionary transport with Shared Brotli
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NgH-BeYO72E

この提案の仕様および本サイトへの適用について解説する。


## brotli の Dictionary

圧縮方式は、基本的に「同じ値が出てきたら、それらをまとめて小さく表現する」という方式が中心となる。

```
# 繰り返しを数値で表現する場合
from: aaaabbbbb
to:   a4b5
```

この方式は、対象としたデータの中で、如何に効率よく「同じ値」を見つけるかが肝となる。例えば以下の例は、探索範囲をどこまでとるかによって、圧縮結果が変わることがわかる。

```
from: ababcdababcd
to:   ab2cdab2cd

from: ababcdababcd
to:   ababcd2
```

圧縮ツールでクオリティのようなものが指定できる場合、ざっくりいえばこの「同じ値」をどこまでの範囲で探すかを指定している場合が多い。丁寧に探せば圧縮率は向上するが時間がかかり、時間を重視すると圧縮率が下がる。

ところが、これは中身がどんな情報かを気にしない、汎用的なデータに対する手法だ。中身がどんなタイプのデータがわかっている場合は、その情報を辞書として用意しておくことで「データ列がよく出てくる」ということを、圧縮アルゴリズムにヒントとして提供することができる。

例えば、中身が HTML だとわかっていた場合 `<!doctype html>` が辞書にあれば、その一致で効率よく圧縮箇所を見つけられるというものだ。

ちなみに、 brotli は最初から「Web 上でやりとりする値」にフォーカスしているため、実際に Web 上でやり取りされている情報を大量に集め、そこから辞書を生成し、仕様の中に Static Dictionary として直書きしている。

以下の長い Hex がそれに当たる。

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
<input type="hidden" language="JavaScript"  document.getElementsBg="0" cellspacing="0" ype="text/css" media="type='text/javascript'with the exception of ype="text/css" rel="st height="1" width="1" ='+encodeURIComponent(<link rel="alternate" 
body, tr, input, textmeta name="robots" conmethod="post" action=">
```

Web 系コンテンツに対して、汎用圧縮アルゴリズムよりも brotli の方が有利なのは、この辞書の存在が大きい。


## Web における辞書共有

もし自分がデプロイしているサービスにおいて、そこでどんなコンテンツが使われているのかを元に独自の辞書を生成し、 brotli にヒントを与えることができれば、より圧縮率が高くなるだろうことは容易に想像できる。

前述の辞書は仕様にベタ書きされた必須のものなので、 brotli 実装なら等しく持っているが、独自の辞書を作る場合、問題はその辞書をどうやって送信元/送信先で共有するかになる。

実は過去にも「サーバとクライアントで辞書を共有し圧縮率を上げる」というこの目的のために作られた SDCH (Shared Dictionary Compression for HTTP) という仕様が存在し、 Chrome にも実装されていた。

しかし、この仕様は提案時期が 2008 年頃とかなり古く、仕様も複雑だった。当時はまだ CORS なども普及する前であるため、安全性の問題もあり、全くと言ってよいほど普及せず、 2016 年には Chrome からも削除された。

- Shared_Dictionary_Compression_over_HTTP.pdf
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2008JulSep/att-0441/Shared_Dictionary_Compression_over_HTTP.pdf

過去の失敗を踏まえて仕様をシンプルに絞り、 CORS を前提とする昨今のセキュリティマナーに則った形で、この辞書共有を再定義し、より高度に圧縮することを目的として始まったのが "Shared brotli" だ。

あとから「brotli 以外の圧縮(例えば zstd)でも使える方法なはずだ」ということで、名前をより汎用的な "Compression Dictionary Transport (CDT)" にリネームして現在の提案に至っている。


## Compression Dictionary Transport

CDT は、任意のコンテンツから辞書を作り、それをサーバ/クライアント間で共有する 2 つの方式が提案されている。

- Shared Dictionary
  - 事前にサーバが用意した辞書をクライアントが取得する
- Delta Compression
  - クライアントがすでに取得したコンテンツを、次の取得の辞書にする


### Shared Dictionary

Shared Dictionary は、その名の通り共有辞書を事前生成しておく方法だ。

例えば、テンプレートエンジンに値を埋め込んで作るタイプのページでは、埋め込む値のバリエーションは数あっても、テンプレートエンジン部分は共通している。

そこで、テンプレートエンジンを元に辞書を作成し、事前にブラウザに取得させれば、そのテンプレートを使ったページは圧縮率を上げられるといったものだ。

Shared Dictionary の場合は、辞書の元にしたいサンプルを指定し、そこから辞書を生成する。

```sh
$ ./dictionary_generator ./shared.dict ./*.template.html
```

この `shared.dict` をサーバにデプロイし、 HTML に `<link>` で指定する。

```html
<link rel="dictionary" href="/shared.dict">
```

この HTML を表示した際に、ブラウザは辞書の存在に気づき、それをダウンロードすることで、以降のコンテンツの圧縮に利用できる。つまり Prefetch 方式であるため、例えばメインページのための辞書をログインページで落としておくといった、投機的な提供を行う必要がある。

`/shared.dict` のレスポンスヘッダには、辞書が対象とするパスを以下のように指定する。

```http
Use-As-Dictionary: match="/path/to/target/*"
```

クライアントが `Use-As-Dictionary` に指定されたパスに遷移した際は、 Brotli での CDT に対応していること(`sbr`)、そこで適用可能な辞書を持っていることを以下のようにリクエストヘッダに付与する。

```http
Accept-Encoding: sbr
Sec-Available-Dictionary: <SHA-256 of Dictionary>
```

サーバは、クライアントが指定してきた辞書を使用し、コンテンツを圧縮して返すことができる。

辞書を用いた圧縮を行った場合は、レスポンスは以下のようになる。辞書によって同一コンテンツのエンコーディング結果が変わるため、 Cache のキーに辞書のハッシュを追加するように、 `Sec-Available-Dictionary` を `Vary` に追加する。

```http
Content-Encoding: sbr
Vary: Accept-Encoding, Sec-Available-Dictionary
```

辞書を事前に生成する方式であるため、静的サイトジェネレータなどと相性の良い方式と言えるだろう。


## Delta Compression

ちょっとだけ違うリソースを連続して取得するような場面では、前回取得したものを辞書に圧縮を行えば、圧縮率を上げられる。そこで、既に取得したリソースを辞書とし、次に取得するリソースを差分圧縮するのが、Delta Compression だ。

例えばページごとにビルドされた JS は、フレームワーク部分など共通箇所が多いだろう。そこで、全てのページで JS のレスポンスに以下のヘッダを付与する。

```http
Use-As-Dictionary: match="/js/*"
```

この設定で、まず `a.js` を取得したブラウザは、次に `b.js` を取得する際に以下のようにリクエストを行う。

```http
Accept-Encoding: sbr
Sec-Available-Dictionary: <SHA-256 of a.js>
```

提示されたハッシュから、クライアントが `a.js` を辞書として持っていることを知ったサーバは、次に返す `b.js` を `a.js` で圧縮して返すことで、差分圧縮が可能になる。 Diff だけ送っているようなイメージだ。

辞書は特別なフォーマットではなく、どんなコンテンツでも利用することができることがわかるだろう。ほとんど同じでちょっとだけ異なる画像などであっても、同様に辞書として差分圧縮ができる。

以降の `b.js` にも `Use-As-Dictionary` を付与することで、それを更に `c.js` を圧縮する辞書として使うことができる。

Delta Compression の場合は、基本的には送られてきた hash を元に辞書を特定し、それを用いて動的に圧縮することになるだろう。数が少なければ、全ての (辞書, コンテンツ) の組から事前に生成することも可能かもしれないが、一般的には非現実的だろう。

つまり、動的な圧縮にかかるコストが、圧縮率向上によって得られるメリットを上回ると、単にオーバーヘッドになる点には注意が必要だ。


## その他の仕様

- 辞書は別オリジンからも取得できるが、サイドチャネル対策もあって、もちろん CORS 必須。
- Use-As-Dictionary は SFV になっており、`match` 以外にも `expires` と `algorithm` がある。
  - `expires` は Cache-Control と独立させるためにあるようだが、ライフタイム管理がどうなるのか今ひとつよくわからない。デフォルト 1 年は長いと思うので設定した方が良さそう。
  - `algorithm` は仕様も実装も現状 `sha-256` のみなため、将来拡張されない限り特に不要そう。
- `Sec-Available-Dictionary` は 1 つしか送らないことでシンプルさを保っている。
  - そのおかげで `Vary` に指定できる。
  - 代わりに、被った Path 以下で持ってる辞書を全部アドバタイズさせてサーバで選ぶみたいなことはできない。
  - Delta の場合は、辞書とコンテンツの差分が多い場合、動的圧縮のオーバーヘッドが勝る可能性にも注意。
- Fingerprinting 対策のため Cookie 同様に Partitioning される
  - つまり Public CDN 的な使い方で辞書をサイト間共有することはできない
  - 今は Cache 自体も共有できない(条件あり)のであまり影響はないだろう。


## 本サイトへの適用

### 構成

本サイトは、静的なブログだけであり、テンプレートエンジンに HTML 化した Markdown を流し込んで、事前に生成した静的ファイルを h2o で配信している。

静的ファイルは、ビルド時に brotli で事前圧縮しているので、 Delta Compression を行うとしても brotli のプロセスを動的に立ち上げるオーバーヘッドはペイしないだろう。

そこで、本サイトでは、記事ページ(`/entries/*`)のテンプレートから生成した Shared Dictionary を事前生成し、それを記事一覧ページ(`/index.html`)で配布する構成をとることにした。

おそらく、静的サイトでの典型的な利用例と思われる。


## Install

Shared brotli に用いる dictionary を生成するためのツールは、 brotli のリポジトリに入っている。

- brotli/research/dictionary_generator.cc at master · google/brotli
  - https://github.com/google/brotli/blob/master/research/dictionary_generator.cc

bazel を使ってこれをビルドする。

```sh
$ git clone https://github.com/google/brotli.git
$ cd brotli
$ bazel build brotli
$ cd research
$ bazel build dictionary_generator
$ ./dictionary_generator -h
Usage: dictionary_generator [OPTION]... DICTIONARY [SAMPLE]...
Options:
  --dm       use 'deorummolae' engine
  --distill  rewrite samples; unique text parts are removed
  --dsh      use 'durchschlag' engine (default)
  --purify   rewrite samples; unique text parts are zeroed out
  --sieve    use 'sieve' engine
  -b#, --block_len=#
             set block length for 'durchschlag'; default: 1024
  -s#, --slice_len=#
             set slice length for 'distill', 'durchschlag', 'purify'
             and 'sieve'; default: 16
  -t#, --target_dict_len=#
             set target dictionary length (limit); default: 16K
  -u#, --min_slice_pop=#
             set minimum slice population (for rewrites); default: 2
  -c#, --chunk_len=#
             if positive, samples are cut into chunks of this length;
             default: 0; cannot mix with 'rewrite samples'
  -o#, --overlap_len=#
             set chunk overlap length; default 0
# is a decimal number with optional k/K/m/M suffix.
WARNING: 'distill' and 'purify' will overwrite original samples!
         Completely unique samples might become empty files.

Unrecognized option '-h'
```

これを用いてソースとなるファイルから辞書を生成する。

```sh
$ dictionary_generator ./shared.dict ./template/*.ejs
```

基本的に静的ファイルは Cache Busting しておきたいので、 `Sec-Available-Dictionary` に利用される SHA256 の値でファイルをリネームしておく。

```sh
$ sha256sum ./shared.dict
91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2
$ mv shared.dict 91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict
```

この辞書をデプロイする。なお、この辞書のための MIME は定義されておらず、辞書に用いたコンテンツに応じて任意のものを使ってよいとされている。

つまり、 HTML をソースにしたら辞書も `text/html` となるということだが、今回は EJS をソースにしており HTML そのものではないので、一応 `text/plain` としておく。(HTML, JS, CSS などを混ぜて辞書を作ったら、どういう値にするのがよいのだろうか?)

この辞書を index.html の HTML でアドバタイズする。

```html
<link rel="dictionary" href="/91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict">
```

次に、先程ビルドした brotli リポジトリのバイナリを使って、テンプレートを使って生成した各 HTML を、辞書を使って圧縮する。

```sh
$ brotli \
  -f \
  --dictionary=91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict \
  --suffix=.sbr \
  /path/to/entry.html
```

最後に、サーバが `Accept-Encoding: sbr` に対して、指定されたハッシュと同じ辞書で圧縮した `.sbr` ファイルを返すようにデプロイすれば完了だ。


## H2O のパッチ

本サイトは h2o でサーブしているが、 h2o はまだ `.sbr` に対応していないのでパッチを当ててビルドした。

`send-compression` を有効にしたときに、拡張子付きのファイルを探してくれる部分をいじったが、拡張子が 2 文字前提の実装になっていたので、とりいそぎ手を抜いて `.sbr` を `.sb` にしてデプロイしている。

また、 `.sb` を返す際に `Sec-Available-Dictionary` のハッシュを検証したり、 `Vary` を付与するためには、 conf で mruby を呼ぶか、同じくパッチを当てるしか無い。ここも手を抜いて、辞書の `expire` を短くしておくにとどめた。


## 検証

Chrome Canary 117.0.5912.0 で以下のフラグを有効にし、挙動を検証した。

- #enable-compression-dictionary-transport
- #enable-compression-dictionary-transport-backend

この状態で本ブログのインデックスページにアクセスすると、以下のようにメインコンテンツの後に辞書が取得されていることがわかる。

TODO: 図

次に、記事に遷移すると、コンテントネゴシエーションの結果 sbr が返されていることがわかる。

TODO: 図

[前回の記事](/entries/2023-06-18/cookie-store-api.html) の圧縮結果を比較すると、以下のようになっている。

Caption: 圧縮率の比較
| format | byte  | ratio |
|-------:|------:|------:|
|   html | 27278 |  100% |
|     br |  5453 |   20% |
|    sbr |  4559 |   17% |

この結果では 3 point 圧縮率が向上している。全ファイルを同様に計算したが、平均で 4 point の向上だった。また、 1 つだけ、結果が -1 point (br の方が sbr より 1byte 少ない)という結果もあった。

今回使った辞書のサイズは 7245 byte で、これを通常の br 圧縮して 1557 byte だったが、事前にバックグラウンドで取得することを考えると、辞書はもう少し大きくても問題はないだろう。

今回はテンプレートをただくっつけただけの辞書だったため、本文の内容の圧縮には寄与してない。 brotli のデフォルト辞書がそもそも HTML を考慮していることを考えると、むしろそこに出てこない日本語部分で、頻出単語を並べるといった方法で辞書を作った方が、圧縮率は向上したかもしれない。

いずれにせよ、辞書の作り方が非常に重要になることがよくわかる。

そして、このサイトではほとんど使ってない JS/CSS の圧縮は今回対象外だったが、 SPA ではそうしたアセットの圧縮こそ本仕様の本領が発揮される部分だと思われる。

そのあたりは今後の課題としたい。


## Outro

Shared Compression Dictionary の検証のため、本サイトの HTML を事前辞書で圧縮し、検証を行った。

今後この仕様が進めば、ちょっと違うが全部取得し直さないといけない Webpack に代表されるバンドル結果の転送なども、より効率的にできる可能性がある。

フロントエンドエコシステムや、 CDN などを巻き込んで策定が進めば、将来的にはよりシームレスに採用していけるかもしれない。

TODO: cloudflare のブログと mozilla positive


## DEMO

本サイトそのものがデモになっている。


## Resources

- Spec
  - Compression Dictionary Transport
    - https://www.ietf.org/archive/id/draft-meenan-httpbis-compression-dictionary-04.html
- Explainer
  - WICG/compression-dictionary-transport
    - https://github.com/WICG/compression-dictionary-transport
- Requirements Doc
  - Compression dictionary transport with Shared Brotli
    - https://docs.google.com/document/d/1IcRHLv-e9boECgPA5J4t8NDv9FPHDGgn0C12kfBgANg/edit
- Mozilla Standard Position
  - Request for Mozilla Position on Compression dictionary transport · Issue #771 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/771
- Webkit Position
  - Compression Dictionary Transport · Issue #160 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/160
- TAG Design Review
  - Tag review for Compression Dictionary Transport · Issue #877 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/877
- Intents
  - Intent to Experiment: Compression dictionary transport with Shared Brotli
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/NgH-BeYO72E
- Chrome Platform Status
  - Intent to Experiment: Compression dictionary transport with Shared Brotli
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/NgH-BeYO72E
- WPT (Web Platform Test)
- DEMO
  - horo-t/compression-dictionary-transport-shop-demo
    - https://github.com/horo-t/compression-dictionary-transport-shop-demo
  - horo-t/compression-dictionary-transport-threejs-demo
    - https://github.com/horo-t/compression-dictionary-transport-threejs-demo
- Blog
- Presentation
- Issues
- Other