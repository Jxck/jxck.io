# [web+db][book] 技術書籍をシンタックスハイライトする話

## Intro

「連載するけど、代わりにコードはハイライトさせてほしい」

それが Web+DB Press 編集長に俺が出した条件だった。


## 技術書籍のシンタックスハイライト

エンジニアは普段から、エディタ上でも、リポジトリ上でも、ブログ上でも、何かしらハイライトされたコードを見ている。

そんなエンジニアに向けて書かれた技術書籍でありながら、書籍のコードがハイライトされているのはみたことがない。

「**技術書籍がシンタックスハイライトされてないのは、出版社の怠慢だ**」

と、割と本気で思っていた。そして、今でも思っている。

特にページを跨ぐような長いサンプルコードを、単色で印刷されても、正直読む気になれない。

白黒だからしょうがないと思われているかもしれないが、白黒だとしても、文字の太さ、濃淡、フォントの微妙な使いわけなどで、かなり見やすくすることができる。

今はやっていないが、このブログでも、印刷用のレイアウトで白黒ハイライトを実装していた時期がある。これを実証するためだった。

もっと言えば、カラーで印刷された技術書籍や電子書籍でも、コードは単色だったりする。

技術的に不可能なわけではない、 InDesign 上で特定の行だけ強調するといったことは、編集者によって行われている。

編集者が全てちまちま色をつけるのは無理でも、シンタックスハイライトのライブラリなどを連携して、自動的に InDesign 上に反映すればできるはずだ。

口だけではなく手を動かして実証する良い機会だと思い、ハイライトされている俺のブログの白黒印刷を見せながら、目黒の居酒屋で俺は編集長を説得した。


## Web+DB の編集ツール

なぜ、一介の著者が編集にまで口を出せるのか? と思うかもしれない。

実は、 Web+DB の中で特に編集長が使ってた執筆用のツール群は、歴代の著者達が(執筆をサボる口実に)作ってきたものだったりする。

元々編集長は、原稿中に本誌では絶対出てこない `□` とか `☆` みたいな全角記号でマークアップし、それを InDesign のタグに変換するみたいなフローを取っていた。

その独自記法で原稿を書くのが気にくわなかった(という体で執筆をサボりたかった)当時の著者達は、 Markdown をパースして独自記法で吐き出すライブラリを作っていた。

それは、歴代の著者によってメンテが継がれ、機能やテストが足されたり、プレビュー用の UI が Heroku にデプロイされたりしていた。

その変換ライブラリに手を入れ、コードブロックを抜き出し、ハイライターに噛ませて、良い感じに InDesign 用に変更できれば、いけるだろうという算段があった。


## md2indesign

ところが、実際に変換ライブラリを直すとなると、いろいろな問題があった。

もう具体的にどんな問題があったのかは全く思い出せない。覚えてるのは、 2019 年にもなって Perl なんか読みたくもなく書きたくもないと思ったことくらいだ。

そもそも、Markdown -> 独自記法 -> InDesign だったが、どう考えても Markdown -> InDesign で良い。

Markdown のパーサも、 Syntax Highlight のライブラリも、なるべく広く使われてメンテされているものがいい。

そんなこんなで、気づいたら md2indesign を、このブログのビルドコードをベースに書き始めていた。


## InDesign 記法

もうほとんど覚えてないが、 InDesign の記法は、タグ付け記法でありながら、我々が慣れ親しんだ HTML や XML のようなタグ付けマークアップとちょっと違う。

確かにタグはついてるんだが、基本行頭にしかない。というか、行頭じゃないといけないので、インデントはタグの前じゃなく後に行う。そして、タグは閉じない。

途中でスタイルを変えたい場合に、 Inline タグのようなものがある。こちらは閉じる。ただ、それはスイッチでしかなく、閉じたら閉じる前のスタイルに戻るわけではない。

とかだった気がする。手元に残ってたサンプル片を見ると、そんな感じだったように思う。

```
<UNICODE-MAC>
<ParaStyle:h1>This is Title
<ParaStyle:p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
<ParaStyle:p>inline styles are  <CharStyle:em>italic<CharStyle:> also <CharStyle:em>italic<CharStyle:> are supported.
<ParaStyle:h4>go
<ParaStyle:code-go:code/sample.go><CharStyle:CodeKeyword>package<CharStyle:> <CharStyle:CodeName>main<CharStyle:>
<ParaStyle:code-go:code/sample.go>
<ParaStyle:code-go:code/sample.go><CharStyle:CodeKeyword>import<CharStyle:> <CharStyle:CodeLiteralString>"fmt"<CharStyle:>
<ParaStyle:code-go:code/sample.go>
<ParaStyle:code-go:code/sample.go><CharStyle:CodeKeyword>func<CharStyle:> <CharStyle:CodeName>main<CharStyle:><CharStyle:CodePunctuation>()<CharStyle:> <CharStyle:CodePunctuation>{<CharStyle:>
<ParaStyle:code-go:code/sample.go>	<CharStyle:CodeComment>// this is sample code<CharStyle:>
<ParaStyle:code-go:code/sample.go>	<CharStyle:CodeName>fmt<CharStyle:><CharStyle:CodeOperator>.<CharStyle:><CharStyle:CodeName>Println<CharStyle:><CharStyle:CodePunctuation>(<CharStyle:><CharStyle:CodeLiteralString>"Hello World"<CharStyle:><CharStyle:CodePunctuation>)<CharStyle:>
<ParaStyle:code-go:code/sample.go><CharStyle:CodePunctuation>}<CharStyle:>
```

Markdown 系のライブラリで HTML に変換して、そのタグの名前を置換すればできそう、という想定は早々に崩れた。

InDesign は持ってなかったし使ったこともないので、編集長からもらった仕様書と、サンプルアウトプットを見ながら、 Markdown パーサが吐く AST を元にこれを吐くエンコーダをまるっと書いた。


## Web+DB のハイライト

実際に誌面上でハイライトした結果がこれだ。物理本でも、もちろんこのように刷られている。

![シンタックスハイライトされた誌面](./syntax-highlighted-wdpress.jpeg#3504x1826)

このとき書いた原稿は、コードブロックが多いタイプの記事ではなかったので、メリットがわかりにくいかもしれない。気づいた人も少なかっただろう。

デザインの詰めも実装も甘すぎて、 HTTP はほぼハイライトされてない。モードを変えればフルカラーハイライトもできたはずだが、 Web+DB は紙と電子で同じ PDF なので結局使ってない。

それでもこの時確かに、雑誌の中で俺の原稿だけだったが、待望の「技術書籍をハイライトする」は、誰にも気づかれることもなく、 Web+DB Press 上で実現していた。


## 名物編集長

今は知らないが、ちょっと前まで Git + Markdown な執筆自体ができない会社も多くあった。そんな中 Web+DB は、こういう筆者のわがままをかなり聞いてくれる稀有な雑誌だった。

編集長は Git をいち早く覚え(著者人に仕込まれ?)、Markdown をデフォルトにし、普段開発どっぷりな著者たちが持ってくるツールやワークフローに色々付き合ってくれた。

俺が、その前に Go の入門特集を頼まれた時は、「ペアプロならぬ、ペア執筆を試してみたい!」ということで、俺の家に編集長を呼び出して「編集長に Go を教える」というペア執筆を経て書いたものだった。

Web+DB でも他の編集者だったらそこまではなかったか、単に編集長がいい人だっただけな気がしてきた。いじられキャラで、人たらしで、めちゃくちゃいい人で優秀な編集長だった。


## まだ、情熱はある

この後、フルタイムで働きつつ md2indesign と原稿執筆の並行を行うには可処分時間がどう考えても足りず、それっきりになってしまった。

ただ、個人としては「*技術書籍をハイライトする*」をまだ諦めたわけではない。

様々な著者が書くあらゆるコードを、すべからくパースして雑誌全体をハイライトするのは、俺一人でできる範囲を超えていた。俺が関わる本以外も全てハイライトされるには、どこかがアプライアンスを出してくれないと無理だろう。

それでも、「自分が書いた原稿とコード」だけに絞れば個人でも可能だ。

今書いている書籍をいつか本にする機会があったら、その時にハイライトを入れられるように、 Markdown のパーサは全部自前で書き直し、こういう用途に応用できるようなプラグインシステムも入れてる。出てくるコードも、 Web 開発でよく使うものくらいに絞れば、それ以外の言語にしか出てこないトークンは無視できる。

もうすでにそういう製品があったり、知らないだけで全コードがハイライトされた書籍を出してる出版社はあるのかもしれないが、そういう本を少なくとも自分は見てない。

そして、少なくとも自分の関われる範囲では、紙は白黒ハイライト、電子はフルカラーハイライト、そんな書籍を作る準備をあれからずっと続けている。


## Outro

今 Web+DB に執筆するなら、もう少し上手くハイライトできたかもしれない。次があったら、 ChatGPT 駆動執筆しようとか、言ってたかもなぁ。

しかし、もうその機会も無くなってしまった。残念だ。というかもう編集長じゃないのか。お疲れ様でした。

単に育ててもらったとか、お世話になった以上の、何かを勝手に感じている。

Web+DB Press が休刊と聞いて、ふと色々思い出した。廃刊ではなく休刊なら、また読める日が来るのを楽しみにしてます。
