# [html][performance] HTML の省略によるサイズ最適化

## Intro

本サイト [blog.jxck.io](https://blog.jxck.io) 以下については、 Markdown から静的ファイルを生成するスタイルで作成している。

この変換時に以前から思っていた **HTML の最適化** を実施することにした。

しかし、 md->html 変換時にそれができるツールが見当たらないため、 Markdown の AST から HTML を構築する過程で、省略を施すスクリプトを自作した。

ただし、ソースはあくまで観賞用なので、インデントやコメントは残している。

チューニングではなく単なる実験としてサイト全体にこれを適用し、その結果を記す。


## 静的コンテンツの最適化

パフォーマンス改善の常套手段として、コンテンツの最適化がある。
ただ、ここ最適化と言っているものには大きく二つある。

- gzip などのアルゴリズムにより経路上で圧縮する
- bmp を png, jpeg, webp などのフォーマットに変換し圧縮する
- js や css から不要なスペースや改行を消すことで、コンテンツサイズを減らす


いずれも王道であり、ツールなどが充実しているため、特に導入は難しくないと思う。

ここで最後の最適化の一環として、 HTML を最適化したことはあるだろうか？

あるとしても、それはスペース削除だけではないだろうか？


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

HTML には閉じタグの省略が許されているものがいくつかあり、仕様では以下に定義がある。

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

単純に閉じタグ 5byte x 3 = 15byte 分のサイズが減っていることになる。


### attibute value の quote

もうひとつ、要素を囲む引用符(`'`, `"`) も省略可能な場合があり、仕様では以下に定義がある。

[https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html](https://html.spec.whatwg.org/multipage/introduction.html#a-quick-introduction-to-html)

> The attribute value can remain unquoted if it doesn't contain space characters or any of " ' ` = < or >. Otherwise, it has to be quoted using either single or double quotes.

つまり、スペースや ``" ' ` = < >`` が無ければ引用符はいらない。


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

あくまで書いているのは HTML であり、 Markdown からの変換過程で最適化しているので、昨今のフロントのビルドタスクを見れば特段特別なことでもない。


### 影響

生成した結果は [HTML Validator](https://validator.w3.org/nu/) で確認しているが問題は無い。

HTML として問題が無いのであれば、 HTML に対応したツールでは扱えることになる。使えない場合、少し厳しく言うとそのツールは HTML を正しく扱えてない、つまりバグということになる。
まあ、そもそも HTML というのは、 XML と全く違い「緩い」部分が多いため、パースするのは非常に難しいので、完全に扱いきれないツールがあっても多少は仕方がない。

特に片手間な正規表現で HTML を処理している場合(スクレイピング、エディタのシンタックスハイライト etc)は、影響が皆無ともいえないが、現状自分の環境で、特に困った場面はいまのところない。

それも、強気に言えば「そのライブラリetc が正しく HTML を扱えてないだけだ」と言うこともできなくはない。
結局 HTML をパースしたければ、正しくパースできるライブラリを使うしかないという話になる。


### 効果

今回は正直やってみたかったからやっただけで、パフォーマンス的な効果というより、「それによってパースが遅くなったり、他に影響が出たりするのか？」が知りたかったというモチベーションがある。

なので、その視点からいくつかの測定を実施する。


まず、省略時のサイズであるが、この記事自体を `<html>`, `<head>`, `<body>` 、閉じたタグ、引用符を全て付けた場合と比べると 259 byte の削減になっていた。

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

また、何回かやると 有 が 100ms を超える場合や 無 が 70ms を切るような場合もあった。

この程度の速度差であれば体感は難しいので、もはや誤差といえる。
しかし、これは逆に、 *省略がパースを著しく遅くする、といった影響はない* と言えるだろう。

これなら、ペイロードが小さくなることによる、ネットワーク効率としてのメリットを重視するリスクはなさそうだ。

(もちろんサイズが大きくなれば変わるかもしれないが、このエントリはこのサイトの平均的なものなので問題ない)

同様の検証が他にもあったので貼っておく。結論はほぼ同じだった。

[「HTMLのタグは一部省略可能」表示速度はどちらが早いのか調べてみた](http://leko.jp/archives/321)


### 方法

普通の Web アプリでも、 haml のように抽象度が高いフォーマットであれば、生成時に同様のオプションがあっても良さそうだが、 haml ではずっと [TODO](https://github.com/haml/haml/blob/master/TODO#L19) のままのようだ。

Google の PageSpeed でも、こうした最適化は [サポートされていた](https://developers.google.com/speed/pagespeed/service/OptimizeHtml)。

ただ、一般にあまり普及した方法とはいえない気がする。


## 結論

HTML も省略可能な部分が有り、省略しても Valid な HTML にすることが可能である。
また、このエントリにおいては、省略によるパースへの影響は認められなかった。

HTML を手書きするのではなく、テンプレートなどから生成する場合、もし省略できるのなら、「片手間にスクレイピングしようとしている人にとって面倒」というあたり以外には、特にデメリットは無いように思う。

今回削除した以外にも、インデントや改行も最適化の対象ではあるが、本サイトのソースはあくまで観賞用であるためそのままにしている。
