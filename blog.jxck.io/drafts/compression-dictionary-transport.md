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

Shared Dictionary の場合は、辞書の元にしたい




- horo-t/compression-dictionary-transport-shop-demo
  - https://github.com/horo-t/compression-dictionary-transport-shop-demo



## Delta Compression

Delta Compression は、既に取得したリソースを辞書とし、次に取得するリソースを差分圧縮するというものだ。

ほとんど同じだが、ちょっとだけ違うリソースを連続して取得するような場面では、前回取得したものを辞書に圧縮を行えば、圧縮率を上げられるというものだ。







- horo-t/compression-dictionary-transport-threejs-demo
  - https://github.com/horo-t/compression-dictionary-transport-threejs-demo