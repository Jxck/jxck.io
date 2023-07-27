# Compression Dictionary Transport (Shared Brotli)


## brotli の Dictionary

圧縮方式は、基本的に「同じ値が出てきたら、それらをまとめて小さく表現する」という方式が中心となる。

```
# 繰り返しを数値で表現する場合
from: aaaabbbbb
to:   a4b5
```

この方式は、対象としたデータの中で、如何に効率よく「同じ値」を見つけるかが肝となる。例えば以下の例は、探索範囲をとこまでとるかによって、圧縮結果が変わることがわかる。

```
from: ababcdababcd
to:   ab2cdab2cd

from: ababcdababcd
to:   ababcd2
```

圧縮ツールでクオリティのようなものが指定できる場合、ざっくりいえばこの「同じ値」をどこまでの範囲で探すかを指定している場合が多い。丁寧に探せば圧縮率はあがるが時間がかかり、時間を重視すると圧縮率が下がる。

ところが、これは中身がどんな情報化を気にしない汎用的なデータに対する手法だが、中身がどんなタイプのデータがわかっている場合はその情報を辞書として用意しておくことで、「こういう単語(データ列)がよく出てくる」ということを圧縮アルゴリズムに教えることができる。

たとえば、中身が HTML だとわかっていた場合 `<!doctype html>` が辞書にあれば、その一致で効率よく圧縮箇所を見つけられるというものだ。

ちなみに、 brotli は最初から「Web 上でやりとりする値」にフォーカスしているため、実際に Web 上でやり取りされている情報を沢山あつめてきて、そこから辞書を生成し、仕様の中に Static Dictionary として直書きされている。

以下の長い Hex がそれに当たる。

- RFC 7932 - Brotli Compressed Data Format
  - https://datatracker.ietf.org/doc/html/rfc7932#appendix-A

実際にバイナリを覗いてみると、テキストとして認識可能な箇所が多々ある。

最初の部分は、頻出英単語だろう。

```
timedownlifeleftbackcodedatashowonlysitecityopenjustlikefreeworktextyearoverbodyloveformbookplaylivelinehelphomesidemorewordlongthemviewfindpagedaysfullheadtermeachareafromtruemarkableuponhighdatelandnewsevennextcasebothpostusedmadehandherewhatnameLinkblogsizebaseheldmakemainuser') 
```

途中はなんとなく JS 感がある。(改行も含めて圧縮できるよう、辞書内に改行がそのまま入ってる)

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

Web 系コンテンツに対して、汎用圧縮アルゴリズムよりも brotli の方が有利なのは、ほぼこの辞書の存在と言っても過言ではないだろう。

## Compression Dictionary Transport

もし自分がデプロイしているサービスにおいて、そこでどんなコンテンツが使われているのかを元に独自の辞書を生成し、 brotli に食わせることができれば、より圧縮率が高くなるだろうことは容易に想像できる。

前述の辞書は仕様にベタ書きされた必須のものなので、 brotli 実装なら等しく持っているが、独自の辞書を作る場合、問題はその辞書をどうやって送信元/送信先で共有するかになる。

そこで、この独自辞書共有の方法を定義し、より高度に圧縮することを目的として始まったのが "Shared brotli" だ。

しかし、あとから「brotli 以外の圧縮(例えば zstd)でも使える方法なはずだ」ということで、名前をより汎用的な "Compression Dictionary Transport (CDT)" にリネームして現在の提案に至っている。

CDT は、任意のコンテンツから辞書を作り、それをサーバ/クライアント間で共有する 2 つの方式が提案されている。

- Shared Dictionary
  - 事前にサーバが用意した辞書をクライアントが取得する
- Delta Compression
  - クライアントがすでに取得したコンテンツを、次の取得の辞書にする

以降は、各実装法を試していく。

まずは、 Shared Brotli のツールを用意する。

## Install

shared brotli に用いる dictionary を生成するためのツールは、 brotli のリポジトリに入っている。

- brotli/research/dictionary_generator.cc at master · google/brotli
  - https://github.com/google/brotli/blob/master/research/dictionary_generator.cc

bazel を使ってこれをビルドする。

```sh
$ git clone https://github.com/google/brotli.git
$ cd brotli
$ bazel build brotli
$ cd research
$ bazel build dictionary_generator
```


## Shared Dictionary

Shared Dictionary は、その名の通り共有辞書を事前生成しておく方法だ。

例えば、テンプレートエンジンに値を埋め込んで作るタイプのページでは、埋め込む値のバリエーションは数あっても、テンプレートエンジン部分は共通している。

そこで、テンプレートエンジンを元に辞書を作成し、事前にブラウザに取得させれば、そのテンプレートを使ったページは全て圧縮率を上げられるというものだ。

Shared Dictionary の場合は、辞書の元にしたいコンテンツを指定し、そこから辞書を生成する。

```sh
$ ./dictionary_generator ./shared.dict ./*.template.html
```

この `shared.dict` をサーバにデプロイし、 HTML に `<link>` で指定する。

```html
<link rel="dictionary" href="/shared.dict">
```

`/shared.dict` のレスポンスヘッダで、辞書が対象とするパスを以下のように指定する。

```http
Use-As-Dictionary: match="/path/to/target/*"
```

この HTML を表示した際に、ブラウザは辞書の存在に気づき、それをダウンロードすることで、以降のコンテンツの圧縮に利用できる。つまり Prefetch 方式だであるため、例えばメインページのための辞書をログインページで落としておくといった、提供タイミングの工夫が必要になる。

クライアントが `Use-As-Dictionary` に指定されたパスに遷移した際は、 Brotli での CDT に対応していること(`sbr`)、そこで適用可能な辞書があることを以下のようにリクエストヘッダに付与する。

```http
Accept-Encoding: sbr
Sec-Available-Dictionary: <SHA-256 of Dictionary>
```

サーバは、クライアントが指定してきた辞書を使用し、コンテンツを圧縮して返すことができる。

辞書を用いた圧縮を行った場合は、以下のようになる。辞書のハッシュで Vary することで、 Cache のキーを分けている。


```http
Content-Encoding: sbr
Vary: Accept-Encoding, Sec-Available-Dictionary
```

- horo-t/compression-dictionary-transport-shop-demo
  - https://github.com/horo-t/compression-dictionary-transport-shop-demo

- 複数辞書を送る？
- 辞書を辞書で圧縮して頻繁に取得する


## Delta Compression

Delta Compression は、既に取得したリソースを辞書とし、次に取得するリソースを差分圧縮するというものだ。

ちょっとだけ違うリソースを連続して取得するような場面では、前回取得したものを辞書に圧縮を行えば、圧縮率を上げられるというものだ。

例えばページごとにビルドされた JS は、フレームワーク部分など共通する場所が多いだろう。そこで、全てのページで JS のレスポンスに以下のヘッダを付与する。

```http
Use-As-Dictionary: match="/js/*"
```

次にページを遷移すると、ブラウザは先程同様に以下を返す。

```http
Accept-Encoding: sbr
Sec-Available-Dictionary: <SHA-256 of Dictionary>
```

提示された辞書を元に、次の JS を圧縮して返すことで、差分圧縮が可能なる。次の JS も `Use-As-Dictionary` を付与していれば、それを更に次の辞書として使うことができるのだ。

## その他の仕様

- 辞書は別オリジンからも取得できるが、サイドチャネル対策もあってもちろん CORS 必須。
- Use-As-Dictionary は SFV になっており、`match` 以外にも `expires` と `algorithm` がある。
  - `expires` は Cache-Control と独立させるためにあるようだが、ライフタイム管理がどうなるのか今ひとつよくわからない。デフォルト 1 年は長いと思うので設定した方が良さそう。
  - `algorithm` は仕様も実装も現状 `sha-256` のみなため、将来拡張されない限り特に不要そう。
- `Sec-Availabe-Dictionary` は 1 つしか送らないことでシンプルさを保っている。
  - そのおかげで `Vary` に指定できる。
  - 代わりに、被った Path 以下で持ってる辞書を全部アドバタイズさせてサーバで選ぶみたいなことはできない。
- Fingerprinting 対策のため Cookie 同様に Partitioning される
  - つまり Public CDN 的な使い方で辞書をサイト間共有することはできない(まあ今は Cache 自体ができないが)


## 本サイトへの適用


### 構成

本サイトは、静的なブログだけであり、テンプレートエンジンに HTML 化した Markdown を流し込んで、事前に生成している。

記事は基本的に Web 技術に一貫しており、使っている単語や言い回しも近いところがある。

そうした特性上、以下のような二種類の辞書を提供する構成が妥当だろう。

- 記事一覧で、記事ページのテンプレートから生成した Shared Dictionary を配布
- 記事ページはそのまま辞書として、記事を遷移した際に Delta Compression として利用

おそらく、典型的な利用例と思われる。

### 効果測定の観点

本サイトは既に全て事前に br 圧縮をかけてデプロイしている。そのため、適用は非常に分が悪い。

本来なら、動的にレスポンスを生成する際に、同一プロセス内で圧縮を行うなどで、そのオーバーヘッドをしても転送量が減らせるメリットはあるかもしれない。

しかし、静的に事前生成した HTML を返しているだけの本サイトでは、辞書を使って圧縮率を上げられたとしても、それを動的に行うために起動する brotli のプロセスがオーバーヘッドになることは明白だ。

そこで、通常の brotli 圧縮済みファイルの生成に加え、 Dictionary を用いた圧縮も事前に行っておくことにした。





- horo-t/compression-dictionary-transport-threejs-demo
  - https://github.com/horo-t/compression-dictionary-transport-threejs-demo