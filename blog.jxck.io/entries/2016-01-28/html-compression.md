# [html] HTML の省略によるサイズ最適化

## Intro

とりあえず [blog.jxck.io](https://blog.jxck.io) 以下については、基本的には静的ファイルを生成するスタイルで作ろうと思っている。

手元に書いた Markdown を HTML に変換するスタイルで、これを行うツールは星の数ほどあるが、この変換時に前から思っていた HTML の最適化をやってみようと思った。

結局そういうことができるツールはなさそうなので、 Markdown のパーサだけ借りてきて、 AST から構築する過程で省略を施した。

単なる実験としてその結果を書いておく。


## 静的コンテンツの最適化

パフォーマンス改善の常套手段として、コンテンツの最適化がある。
ただ、ここ最適化と言っているものには大きく二つある。

- gzip や png ではなく jpeg を使うなどのアルゴリズムにより経路上で圧縮する
- js や css から不要なスペースや改行を消すことで、コンテンツサイズを減らす


どちらも今となってはツールなどが充実していて、特に導入は難しく無いと思う。

ここで後者の最適化の一環として、 HTML を最適化したことはあるだろうか？
あるとしても、それはスペース削除だけじゃ無いだろうか？


## HTML の省略記法

### タグそのもの

`<html>`、 `<head>`、 `<body>` は、タグ自体を書かなくても良い場合があり、仕様では以下に定義がある。

[https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission)

> An html element's end tag may be omitted if the html element is not immediately followed by a comment.

すぐ次がコメントでないなら、 `<html>` は省略しても良い。 `<head>` や `<body>` も同様だ。

```html
<!-- before -->
<!DOCTYPE html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <p>Welcome to this example.</p>
  </body>
</html>

<!-- after -->
<!DOCTYPE html>
  <title>Hello</title>
  <p>Welcome to this example.</p>
</html>
```

これは、 `<html ng-app>` みたいに、タグの要素によって何かを指定する必要があると消せないため、消せない・消しにくいことは多い。


### 閉じタグ

HTML には閉じタグの省略がゆるされるものがいくつかあり、仕様では以下に定義がある。

[https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission)

例えば、 `</li>` は以下の条件なら省略が可能だ。

> An li element's end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.

- その次にすぐ次の `<li>` がくる
- それ以上親 (`<ul>`, `<ol>`) に子要素が無い


つまりこう書くことができる。


```html
<!-- before -->
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>

<!-- after -->
<ul>
  <li>one
  <li>two
  <li>three
</ul>
```

単純に閉じタグ 5byte x 3 = 15byte 分の容量が減っていることになる。


### attibute value の quote

もうひとつ、要素を囲む引用符(`'`, `"`) も省略が可能な場合があり、仕様では以下に定義がある。

[https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html](https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html)

> The attribute value can remain unquoted if it doesn't contain space characters or any of " ' ` = < or >. Otherwise, it has to be quoted using either single or double quotes.

つまり、スペースや ``" ' ` = < or >`` が無ければ引用符はいらない。


```html
<!-- before -->
<input name="address" maxlength="200">

<!-- after -->
<input name=address maxlength=200>
```


要素一つにつき 2 byte の省略になる。


## その最適化は現実的か？


### 好き嫌い

まず、こうした省略によって、例えば XML として崩れてるみたいなことを言う人もいる。

気持ちはわかるが、そもそもこの程度を省略しなかったところで XML などではない。

あくまで書いているのは HTML だし、 Markdown からの変換過程で最適化しているので、昨今のフロントのビルドタスクを見れば特段特別なことでもない。


### 影響

生成した結果は [HTML Validator](https://validator.w3.org/nu/) で確認しているが問題は無い。

HTML として問題が無いのであれば、 HTML に対応したツールでは使えることになる。使えない場合、少し厳しく言うとそのツールは HTML を正しく扱えてない、つまりバグということになる。
まあ、そもそも HTML というのは、 XML と全く違い「緩い」部分が多いため、パースするのは非常に難しいので、しかたない。

特に片手間な正規表現で HTML を処理している場面、(スクレイピング、エディタのシンタックスハイライト etc) の場合には、影響が皆無ともいえない。自分の環境では特に困った場面はいまのところない。

それも強気になれば正しく HTML を扱えてないだけと言うこともできなくはないので、結局、 HTML をパースしたければ、正しくパースできるライブラリを使うしかないという話になる。


### 効果

今回はやってみたかったからやっただけで、劇的な効果を期待はしていないが一応測ってみる。

まず、 `<html>`, `<head>`, `<body>` そして、閉じたタグを付け、引用符をつけるた場合と比べると 259 byte の削減になっていた。

```sh
jxck$ wc html-compression.html
     131     408    9158 html-compression.html
jxck$ wc html-no-compression.html
     141     417    9417 html-no-compression.html
```

また Chrome の devtools で二つのファイルをレンダリングし、 Timeline から *Parse HTML* の時間を確認した。
10回平均した結果がこうだ。

- 省略有: 約80ms
- 省略無: 約90ms

もはや誤差のような差だし、何回かやると 有 が 100ms を超える場合や 無 が 70ms を切るような場合もあった。

ただ、 *著しくパースに影響が出ることはない* と言うのは分かった。

これなら、ペイロードが小さくなるということは、ネットワーク効率としてメリットにふることにリスクはなさそうだ。

(もちろんサイズが大きくなれば変わるかもしれないが、このエントリはこのサイトの平均的なものなので問題ない)

また、同様の検証が他にもあったので貼っておく。結論はほぼ同じだった。

[「HTMLのタグは一部省略可能」表示速度はどちらが早いのか調べてみた](http://leko.jp/archives/321)


### 方法

普通の Web アプリでも、 HAML のように抽象度が高いフォーマットであれば、生成時に同様のオプションがあっても良さそうだが、 HAML ではずっと [TODO](https://github.com/haml/haml/blob/master/TODO#L19) のままのようだ。

Google の PageSpeed でも、こうした最適化は [サポートされていた](https://developers.google.com/speed/pagespeed/service/OptimizeHtml)。

ただ、一般にあまり普及した方法とはいえない気もする。


## 結論

HTML も省略が可能な部分が有り、省略しても Valid な HTML にすることが可能である。
また、このエントリにおいては、省略によるパースへの影響は認められなかった。

HTML パーサを使わずに、片手間な正規表現でクローラを書いてる人などへの影響
- Web アプリでは HTML を省略するテンプレートエンジンなどは一般的ではない
HTML を手書きするのではなく、テンプレートなどから生成する場合、もし省略できるのなら、「片手間にスクレイピングしようとしている人にとって面倒」というくらい以外には、特にデメリットは無いように思う。

このサイトは、自分がソースを見た時に見やすいように、インデントと改行は消していないが、とりあえずこのまま行こうと思う。
