# [search] Scroll to Text Fragment を用いたサイト内検索の実装


## Intro

Scroll to Text Fragment のユースケースとして、本サイトにサイト内検索を実装した。


## Scroll to Text Fragment

Scroll to Text Fragment(以下 S2TF) は Chrome 80 で Ship され、 Finch で展開されている。

まだ降りてきてない場合は、 Flag による有効化が必要だ。

詳細は以前このブログでも書いている。

- [Scroll To Text Fragment と :~:text \| blog.jxck.io](https://blog.jxck.io/entries/2019-10-16/scroll-to-text-fragment.html<F29>)

この機能の使い道の一つとして、検索結果の Deep Link への適用があると考え、 PoC として実装した。


## 検索結果への適用

このサイトを `CSP` というキーワードで検索した場合を考える。

検索対象は、記事の本文とすると、例えば以下の一文がヒットする。

> Feature Policy のモチベーションおよび適用方法について、類似する CSP や iframe sandbox と合わせて解説する。

これをヒットしたキーワードの前後で分割し、 Prefix / Suffix として指定すれば以下のような fragment ができる。

(`#:~:text=Prefix-,Keyword,-Suffix` の順)


```
#:~:text=Feature Policy のモチベーションおよび適用方法について、類似する-,CSP,-や
```

これをキーワードのヒット箇所ごとに生成すれば、サイト内のヒット箇所ごとへの deep link を生成することができる。


## 本サイトへの適用

もともと、単なる DEMO として始まったスクリプトを、そのままサイトに設置しただけなので、大した実装にはなってないところがある。

特に、本サイトのテキストは大した量ではないこと、ヘッダや出力の挙動を細かく制御したいことから、全文検索エンジンなどは使わず愚直な自前実装を行った。

挙動は以下のようになる。検索結果から遷移すると、該当箇所まで自動でスクロールするのがわかるだろう。


<iframe width="560" height="315" src="https://www.youtube.com/embed/4YHJEmrUnl8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


サイト右上のアイコンから遷移するページから利用でき、キーワードとして CSP を検索した場合は以下のような URL になる。

- <https://blog.jxck.io/searches?q=csp>


## Scroll しないケース

`text=` 以降の生成の仕方によって、遷移先でうまく Scroll しない箇所がいくつかある。

例えば以下のようなケースがあるようだ。

- `CSP` が `OCSP` という単語に部分的にヒットした場合
- `CSP-` や `# CSP` のように、フラグメントで意味を持つ記号が続いてる場合
- etc

こうしたケースは、ブラウザ、仕様、実装、どの部分でどう対応すべきなのかは把握し切れてないため、追って調査し改善したい。


## Portal での表示

本来は、この検索結果を横に並べた Portal に表示し、そこで Preview する UI を考えていた。

イメージとしては以下だ。


<iframe width="560" height="315" src="https://www.youtube.com/embed/oCH9wcrb0sU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


しかし、現状 Chrome の Portal や iframe 内は、 ID に対する Scroll はされるが、 Text Fragment に対する Scroll はしないようだ。

(上のデモは HTML 中の ID へのスクロールを行っている)

Portal/iframe と S2TF を組み合わせると、サイト内に任意の文字があるかを Side Channel で取得できる可能性が指摘されたため、今は実装されてないのだろう。

そこで、今回は機能としては入れず、今後何かアップデートがあったら実装し検証するつもりでいる。


## セキュリティ的観点

余談だが、本サイトで初めて `<form>` を設置したため、それなりにセキュリティ的な対策を行う必要が出た。

今回は、独立した検索ページを用意し、 Portal との連携をやめたため JS を無くすことができたことから、検索ページからは 3rd Party 含め一切の JS を無くすことにした。

結果、出力のエスケープを注意すれば典型的な攻撃はかなり防げると考える。

エスケープは、「正規表現」「HTML」「URL Fragment」とそれぞれのコンテキストに応じて実施する必要があるが、そこさえ間違えなければ問題はなさそうだ。

そして、多重防御として他のページとは別運用にし、 CSP などのヘッダをガチガチに固め、 Report-Only も外している。

最近では Frame Work に任せるような部分をあえて自分で実装してみると、いろいろ試せる上に適度な緊張感があって良い。


## 考察

こう使うとそれなりに利便性を感じるかと思う。

一方で、やはり任意のサイトでこうした Deep Link が生成できてしまうことには、一定の懸念もある。

今回のように、コンテンツ提供側が Deep Link を提供したいために S2TF を使用するなら、 Feature-Policy で Opt-In すれば良いだろう。

しかし、仕様の策定はどちらかというと、更新されず HTML に ID もふられてないサイトでも、閲覧者側が利用したいというモチベーションの方が強そうだ。

その場合、 Opt-In では使われないだけなので、デフォルトということになる。その場合は少なくとも Opt-Out する手段があった方が良いようにも思う。

今後、今回の検証の結果を踏まえ、フィードバックに繋げていきたい。
