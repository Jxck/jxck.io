# [devtools][debug][tips] mouseover 中に表示される DOM のデバッグ


## Intro

先日、後輩が「*mouseover 中にしか表示されない DOM のデバッグ*」に手こずっていたのを見て、たまには小ネタもということで、いくつかのテクニックを紹介する。

実際には、発生しているイベントを制御するというテクニックなので、応用すると色々使えるだろう。


## mouseover tooltip

対象として、 GitHub のユーザアイコンのクリックを見てみよう。

以下のようにアイコンに mouseover しているときだけ、ユーザのプロフィールが出現する UI だ。

この UI を表示した状態で Devtools で DOM を見たい場合、 Devtools 側にマウスを移動すると UI が消えてしまい、 inspect できない。

![マウスオーバーで出る UI が devtools でうまく inspect できない様のスクリーンレコード](0.debug-mouseover.mp4#2880x1800 'debug mouseover')

JS のどの処理で変更されているかわかっていれば、そこに break point を打って止めればよいのだが、近年の bundle/minify されたコードを source map なしにデバッグすると、面倒な上にムダに時間がかかる場合もある。

そして、一見この用途に使えそうな Force State 機能は、`:hover` に適用された CSS を強制的に有効にするといった用途だが、 `onmouseover` で実行されている JS には使えない。

この UI を、どうやって表示したまま Devtools に移るか、といったやり方はいくつかあるので、筆者がよく使う方法を紹介する。


## 1. mouseleave/mouseout を消す

mouseover で DOM を表示する実装は、大抵 mouseleave/mouseout などでその DOM を消している。

この対になるイベントハンドラが判明しているなら、それを消してしまえば DOM を消す側の処理がなくなり DOM が残る。

これが一番簡単なやり方で、大抵はこれで足りる。同じ発想は focus や mouseenter など他のハンドラでも応用できる。

GitHub の場合は、アイコンの mouseleave と、表示されたプロフィールの mouseleave を消すと、落ち着いて DOM を inspect できるようになる。

![mouseleave を消すことで UI が消えないようにし inspect する様のスクリーンレコード](1.remove-mouseleave.mp4#2880x1800 'remove mouseleave')


## 2. Break On

Devtools の機能で、対象の DOM に以下の変更があった場合に、その部分の JS で break する機能がある。

- subtree modification
- attribute modification
- node removal

よって、 UI を表示した結果、属性やノードに起こる変化がわかっていれば、これを使うこともできる。

ただし、属性が変わったあとに UI が表示されるような実装だと、そこまでステップ実行する必要があったり、 UI が表示されるのが直接の子要素ではない場合などは 1 の方が楽だ。

GitHub の場合は、ページ下部に非表示の DOM が先にあり、この属性を変えているタイプの実装なので、そこが判明していれば、以下のように inspect できる。

![attribute modification に break point を設定し UI が消えないようにし inspect する様のスクリーンレコード](2.break-on-state.mp4#2880x1800 'remove mouseleave')


## 3. F8

Devtools の source tab を開いた状態で F8 を押すと、そこで Script Exec を止めることができる。つまり強制的に debugger を差し込むようなイメージだ。

mouseover で対象の UI を表示させてから F8 を押して、そのあとの JS を止めてしまうことで、 Devtools に移ることができ、そこから step 実行を始めることもできる。

GitHub の場合は、プロフィールを表示してから F8 を押してからマウスを動かせば、 mouseleave の JS 発火時に break できる。

![UI が消える前に F8 でスクリプト実行を停止し inspect する様のスクリーンレコード](3.break-F8.mp4#2880x1800 'remove mouseleave')

同じことを、 console に `setTimeout(() => {debugger}, 1000)` を貼り付けて 1 秒以内に UI を出して、 debugger で JS を止めるというやり方で紹介していることもあるようだが、やっていることは同じだ。

他にも、 F8 押すと止まるというのは、知っていると使える場面があるかもしれない。


## Outro

知っていれば一瞬だが、知らないと無駄に時間を食うタイプのものでもあるので紹介した。

Devtools は知らぬ間にどんどん新しい機能が入ってくるので、そのうちもっと良い方法が生まれるかもしれない。


## DEMO

特になし。


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
