# [selects][sql][linux] SQL でファイル検索するコマンド selects を書いた話

## Intro

[UNIX コマンドを SQL で抽出できるツール qq を作った。](http://mattn.kaoriya.net/software/lang/go/20160805190022.htm) というエントリを読んで、そういえば似たようなものを作ってたなと思い出した。

自分の [dotfiles](https://github.com/jxck/dotfiles) の中にある、便利コマンド集の中にある [selects](https://github.com/Jxck/dotfiles/blob/master/bin/selects) についてである。

このコマンドは SQL という検索を記述的に表現する共通言語をファイル検索に応用し、 Ruby の動的言語として表現力を使って実装したものといえる。

その実装方法と実行例などについて記す。


## selects

結論からいうとこういうコマンドだ。


```
$ selects mtime, size, basename from './entries/**/*' where extname '==' '.md' and size '>' 1000 order by mtime

2016-07-06 22:45:44 +0900	18437	web-font-noto-sans.md
2016-07-07 23:54:19 +0900	11236	amp-html.md
2016-07-07 23:54:19 +0900	10906	loading-css-over-http2.md
2016-07-07 23:54:19 +0900	14171	preload.md
2016-07-07 23:54:19 +0900	10279	svg-font-base-ui.md
2016-07-07 23:54:19 +0900	14168	public-key-pinning.md
2016-07-07 23:54:19 +0900	12291	service-worker-tutorial.md
2016-07-07 23:54:19 +0900	17377	stale-while-revalidate.md
2016-08-02 13:46:38 +0900	12564	intersection-observer.md
```

同じことをいわゆるシェル芸で行うことはできるが、こう書いた方が後で読んだ時、他人が読んだ時に、意図を含めてわかりやすく無いだろうか?

そう思って確か三ヶ月くらい前から暇を見て書いてるが、まあ遊びのようなものなので、まだ dotfiles の便利コマンドディレクトリに入っている。

依存ライブラリは無く、 1 ファイルで完結しているので、パスの通った所に置いてもらえればすぐ使える。

<https://github.com/Jxck/dotfiles/blob/master/bin/selects>


## Example

まず例をいくつか示す。


### ディレクトリ以下をごっそり


```
$ selects '*' from './entries/**/*'
2016-08-05 22:42:14 +0900	4096	2016-01-27
2016-08-05 22:40:44 +0900	12499	new-blog-start.amp.html
2016-08-05 22:41:32 +0900	3756	new-blog-start.amp.html.gz
2016-08-05 22:40:44 +0900	6813	new-blog-start.html
2016-08-05 22:41:30 +0900	2117	new-blog-start.html.gz
2016-08-05 22:40:20 +0900	1102	new-blog-start.md
2016-08-05 22:41:30 +0900	671	new-blog-start.md.gz
....
```


### .html だけ


```
$ selects basename from './entries/**/*' where extname == '.html'
new-blog-start.amp.html
new-blog-start.html
html-compression.amp.html
html-compression.html
amp-html.amp.html
amp-html.html
h2o-http2-deploy.amp.html
...
```


### like 的な


```
$ selects basename from './entries/**/*' where basename '=~' 'mozaic'
mozaicfm-v2.amp.html
mozaicfm-v2.amp.html.gz
mozaicfm-v2.html
mozaicfm-v2.html.gz
mozaicfm-v2.md
mozaicfm-v2.md.gz
```


### 属性で絞る


```
$ selects atime, basename from './entries/**/*' where atime '>' 2016-08-01 and directory? == true
2016-08-05 22:42:14 +0900       2016-01-27
2016-08-05 22:42:14 +0900       2016-01-28
2016-08-05 22:42:14 +0900       2016-02-01
2016-08-05 22:42:14 +0900       2016-02-08
2016-08-05 22:42:14 +0900       2016-02-09
2016-08-05 22:42:14 +0900       2016-02-11
```


### /dev 以下で pipe か socket か symlink だけを ctime, atime の順で


```
$ selects socket?, pipe?, symlink? basename from '/dev/*' where pipe? == true or socket? == true or symlink? == true order by atime, ctime
false   true    true    initctl
false   false   true    dvd
false   false   true    cdrom
false   false   true    rtc
true    false   true    log
false   false   true    stderr
false   false   true    stdout
false   false   true    stdin
false   false   true    fd
false   false   true    core
```


## からくり

なんとなく気づいた方がいるかもしれないが、これは全部 Ruby に変換している。

つまりこんな感じだ。


```ruby
Dir.glob('from 句にあたる */** 的なの')
   .select('where 句にあたる filter の proc')
   .sort('order by 句にあたる sort の proc')
   .map('抽出したファイルから select 句にあたる属性を取り出す')
```

各 Proc は引数として受け取ったトークンを元に Ruby のメソッドチェインを組み立てている。

例えば


```
where size > 1000
```

は


```ruby
File.size(file) > 100
```

になれば良い。

これを文字として得ている `'size'`, `'>'`, `'100'` を使って動的に組み立てると以下になる。


```ruby
File
  .method('size')
  .call(file)
  .method('>')
  .call(100)
```

この仕組みを踏まえた上でもう一度クエリを見てみて欲しい。

もはや Ruby のメソッドチェインにしか見えないのではないだろうか?


```
$ selects atime, basename from './entries/**/*' where atime '>' 2016-08-01 and directory? == true
```

`select`, `where`, `order by` に使える属性なども、 ruby の File クラスのドキュメントを見てくれれば良い。

<https://docs.ruby-lang.org/ja/2.3.0/class/File.html>

裏に Ruby が透けて見えるため、 Ruby を知ってると「こうすれば動きそう」がそのまま動く。

これが Ruby にした理由だ。


## メリット

遊びで作り始めた割には結構手応えを感じたりもしている。

実際に複雑なファイルの検索を `find` や `grep` を駆使したワンライナーで書くと非常に読みにくい。まして、ファイルの属性やファイルパス中の文字で複雑な検索やソートするのは、書けても二度と読めない可能性がある。

特に、自分はシェル芸力が低いので、そういった場合は最初からスクリプトを書くだろう。ところがそのスクリプトも、結局は `glob` して `map` して `reduce` するよくあるものなので、それを DSL っぽくしたのがこのコマンドの正体だ。

このコマンドは SQL という検索を記述的に表現する共通言語をファイル検索に応用し、 Ruby という表現力が高い動的言語のメリットを活かして実装した DSL と言える。

だから Ruby を知ってて SQL が書ける人には、 *Ruby で書いた SQL っぽいメソッドチェインに見える* というメリットがある(と思う)。


## 細かいところ

- `selects` にしたのは既に `select` が linux にあるから。
- 結果の頭にヘッダ(列名)を出してないのは、パイプしやすくするため。
- パイプ後の `cut` コマンドと相性が良いように、列はタブ区切りにしている。
- `'*'`, `'<'`,  `'>'` は Shell で意味を持つのでクオートが必要。
- Ruby の `File` と `File::Stat` のメソッドを呼べるようにしている。
- SQL よりも Ruby に寄ってるので曖昧検索は `like` ではなく `where` で `basename =~ '.*foo.*'` などする。
- SQL の仕様は尊重しつつも、準拠よりあくまで裏の Ruby が透けて見える範囲で実装したい。
- まだ `group by` などは対応してないが、そのくらいはやっても良いかなと思っている。
- 動的に組み立てて実行しているため、上手くやれば任意の Ruby が実行できるかもしれない。是非探して遊んでみて欲しい。
