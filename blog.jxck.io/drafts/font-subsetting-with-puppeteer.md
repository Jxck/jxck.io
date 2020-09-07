# [pupeteer][web font] Puppeteer で静的サイトの Font Subsetting


## Intro

Web Font のサブセット化を Font Weight に応じて作り分けるとともに、それを Puppeteer を用いて生成するように変更した。


## Web Font の静的サブセット

本サイトで提供している Web Font は当初、文字を事前に選定して生成したものを使っていた。

- [Noto Sans の Web Font 対応とサブセットによる最適化](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html)

当時はコンテンツがなかったが、コンテンツも増えた後は、コンテンツの原稿である markdown ファイルから使用している文字を抽出して生成するように変更していた。

これでおおよそ必要最小限のサイズにすることができていた。


## Regular と Bold の最適化

本サイトでは Font Weight として Regular(400) と Bold(700) を提供しているが、これまでは抽出した文字種を Bold/Regular 両方でビルドしていた。

しかし、 Regular でしか使われてない文字が Bold にも入っており、 Bold 側のサイズをより削減できるという既知の問題があった。

本サイトの HTML は markdown をパースし、独自のビルダで変換しているため、こうした処理は markdown の AST を元に生成する方針を取っていたが、 HTML への変換結果をみないと bold か regular かを判別できないため、実装が単純に面倒で後回しにしていた。


## Puppeteer による実装

本サイトが全て静的に HTML 生成していることを利用し、 Puppeteer でローカルスクレイピングを行うことで、そこから必要な文字種類を取得することにした。

単純に document 全体を対象要素のみに絞って、 textContent を取得しているだけだ。

- [subset.mjs](https://github.com/Jxck/jxck.io/blob/master/www.jxck.io/assets/font/subset.mjs)

これにより、これまで同じサイズだった Bold は必要最低限に減らすことができた。

Regular は、 Bold にあって Regular には無い文字が減らせた一方、これまで取りこぼしていた文字を収録しきったためトータルでは多くなっている。

| Type   | Regular | Bold    |
|:-------|--------:|--------:|
| before |  343.0K |  354.0K |
| after  |  343.6K |  164.0K |
| diff   |   +0.4K | -179.5K |



## 確認

生成し直したフォントを適用した結果、本当に漏れがないかの確認は、目視では無理なので devtools を用いて Computed Style を見ることになる。

これも手動でやるのは面倒なので、同様に Puppeteer で自動化して以下のように確認している。

- [rendered-font.mjs](https://github.com/Jxck/jxck.io/blob/master/www.jxck.io/assets/font/rendered-font.mjs)


## Outro

Font Weight に応じてフォントセットのリストを作り分けたところ 180KB 近くアセットサイズを削減することができた。

また Puppeteer による HTML レベルでの正確なリストの取得や、確認の自動化を可能とした。

これ以上 WebFont のサイズを減らすのは難しいと思うが、今後もさらなる最適化の手法があれば検証していきたい。
