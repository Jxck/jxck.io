# HTML の省略によるサイズ最適化

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

### 閉じタグ

HTML には閉じタグの省略がゆるされるものがいくつかあり、仕様では以下に定義がある。

[https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission)

例えば、 `</li>` は以下の条件なら省略が可能だ。

- その次にすぐ次の `<li>` がくる
- それ以上親 (`<ul>`, `<ol>`) に子要素が無い

> An li element's end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.


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


