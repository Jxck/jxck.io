# Dialog/Popover (2)

`showModalDialog` はひどい API だった。

しかし、何か Modal を開き、ユーザにインタラクションをさせ、閉じたらそこで入力された値や選択された結果を取得し、処理を進めたいユースケース自体はある。

規約への同意取得や、 Cookie バナー、ログインなどだ。

そういった場面では、ライブラリなどを用いて実装するが、 Modal を実装するのは、実際にはそんな簡単ではない。

## Modal, Dialog, Modal Dialog

そもそも、この 3 つの違いを少し整理しておこう。

- Modal
- Dialog
- Modal Dialog

Dialog とは、そもそも「対話」という意味であり、 UI の文脈では入力や選択を求める「対話的な UI」のことを指す。

`alert()`, `confirm()`, `prompt()` なども広く言えばこれにあたり、同意を求めたり、設定を確認させたり、更新があるから再読み込みさせたりといった用途で使う。

その中で Modal とは、「それを処理しない限り先に進めない」ような UI のことを指す。つまり、 Dialog には 「Modal で出す」か「non-Modal で出すか」という 2 種類があるということだ。

Modal Dialog は、だいたい以下のような感じでユーザをブロックする。

- Dialog 以外を非活性にし、他が操作(focus, click, scroll)できなくなる
- 非活性部分が薄暗くなる
- 閉じたら、結果の値が呼び出し側に返り、元の処理を再開する

逆に non-Modal な Dialog は、開くだけで他を非活性にしない。

以降 Modal とは、「Modal で開いた Dialog」つまり「Modal Dialog」のことを指すことにする。

## Modal 実装の難しさ

Modal ってのはだいたいこんなイメージだよね

- 他を差し置いて一番手前に表示される
- そこを処理しない限り次に進めない
- 表示している裏は薄暗くなる
- etc

TODO: 図

この UI を実装する CSS を考えると、「div をセンタリグし、 z-index を最大値にし、画面いっぱいに広げた div を被せ、そこにフィルターかけて」などと想像できるかもしれない。

しかし、それにより多くの使いにくいモーダルが世の中に生み出されてしまった。

例えば、よくある失敗実装はフォーカスの管理が難しい。

1.  Modal を開いてるのに、フォーカスは下のままで、キーボードでそうしたいユーザが Modal に Tab で辿り着けない
2.  Modal を開いてて、フォーカスも Modal に乗ってるのに、Tab を押すと Modal から落ちて下に移動してしまう
3.  Modal を開いてフォーカスを Modal に載せたはいいが、Modal を閉じても、以前いた場所にフォーカスが戻らない
4.  Modal 上で Tab を押して、Modal の一番下に行ったら、Modal の上に戻って欲しいけど、どっか行ってしまう

他にも、モダールにできて欲しいことができない

1.  フォーカスを移動したり、 Modal 外をクリックしたりスクロールしたり、 Modal じゃない部分が操作できてしまう
2.  Modal 外を操作しようとしたら Modal を閉じて欲しいのに、閉じてくれない
3.  Esc 押したら閉じて欲しいのに、閉じてくれない
4.  Modal 以外を暗くするのに失敗して、 Modal も暗くなっちゃってる。もしくは変なところだけ暗い/明るい
5.  二個目の Modal を開けてしまう。しかも前の Modal も残る
6.  Modal が開いてること、 Modal 上に移動したこと、 Modal を閉じたことなどが、支援機能に伝わらないので、何が起こったかわからないユーザがいる
7.  Modal が開いて、後ろが非活性なのに、そのことが支援技術に伝わらずに、操作できない箇所に引っかかって操作が進められないユーザがいる
8.  etc etc etc

実装パターンは APG にもまとめられてるが、これを自前でやるのも簡単ではない。

- Dialog (Modal) Pattern | APG | WAI | W3C ​
  - https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

色々な UI ライブラリが Modal Dialog 相当の機能を提供していたが、やはり理想的な実装は難しい。

しかし、みなこのような UI を必要としており、これをネイティブで標準化しようということになる。

## 標準 Dialog

`showModalDialog` が問題になったのは 2014 年ごろで、実に 10 年前の話だった。

実は、この頃すでに `<dialog>` の仕様自体はあった。

とはいえ Chrome が少し実装していたくらいで、 Opera も先に実装を進め flag の裏に持っていた。 Safari / Firefox は長らく実装していなかった。

HTML5.2 で W3C の方の仕様では消されそうになったこともあるくらい、影の薄い仕様だった。

- CfC: HTML 5.2 to Candidate Recommendation
  - https://github.com/w3c/html/issues/969

ところが、 2016 年ごろ Firefox で再度議論が進み、再度標準化を進めようという話になった。

- Re: Proposal to retain dialog in HTML5.2
  - https://lists.w3.org/Archives/Public/public-html/2017Sep/0005.html

Firefox は内部でも `<dialog>` を使いたいユースケースがあったという話もあり、実装が進んで 2020 年に Ship されている。

- Intent to implement: HTML5 `<dialog>` element
  - https://groups.google.com/g/mozilla.dev.platform/c/vTPGW1aJq24/m/JnEnoH3BEAAJ
- Intent to Ship : HTML5 `<dialog>` element (Nightly Only)
  - https://groups.google.com/g/mozilla.dev.platform/c/gqi4MDQDwX8

Firefox が Ship を進めるのと同時期くらいに、これを現在のように「ぜひ使うべき機能」まで大きく進めたきっかけが Interop だった。

MDN が Developer Survey という大規模調査で、開発者が何に困っているのかを調査し、その結果をブラウザベンダに共有して互換性問題を改善しようということで始まったのが Compat 2021 だが、それが 2022 年に Interop と名前を変えた時に、 focus are として Dialog が採用された。

- dialog & ::backdrop · Issue #12 · web-platform-tests/interop
  - https://github.com/web-platform-tests/interop/issues/12

それを受け、 Safari が実装することになる。 igalia の協力もあったらしい。

- Introducing the Dialog Element | WebKit
  - https://webkit.org/blog/12209/introducing-the-dialog-element/

こうして、無事全てのブラウザで使えるようになった。

実装が出た後も、それぞれのブラウザで微妙に異なる挙動もあったりし、その代表がフォーカス管理だったりはした。

特に、最初は `<dialog>` 自体に focus するのか、中の focus できる要素に focus するのかで、ブラウザごとの主張が違ったりしたが、一応仕様上ではならしつつ

- Implement dialog initial focus proposal by josepharhar · Pull Request #8199 · whatwg/html
  - https://github.com/whatwg/html/pull/8199

ただ、そうした主張の違いも踏まえて、最終的には focus させたい要素を明示的に autofocus 指定しよう、におちついたので、やっぱりちゃんとフォーカスは指定するべきだ。

Dialog を仕様化するにあたって、関連する様々な仕様も整理された。


## Top Layer

要素の重なり合いは、 `z-index` で制御するのが従来のスタイ方法だった。

`z-index` の値を大きくすることで、他の要素よりも手前に表示するように制御してきたが、 Modal Dialog のような UI は、今何が表示されているかにかかわらず、問答無用で最前面に来てくれないと困るわけだ。

そこで、全てのレイヤーの最上位に位置し、ブラウザが管理する、 "Top Layer" という概念を作り、 Modal Dialog はそこに表示することになった。

Top Layer はあくまでブラウザが内部的に生成しているため、 Window 上にどんなに `z-index` が大きい要素があっても、 Top Layer より前に来ることはない。

また、ここに表示できるものは Modal Dialog や Fullscreen といった、特別な UI のみに限られる。

これで Modal Dialog を表示する場所ができた。

## inert

`<dialog>` の標準化の過程で生み出されたのが、 `inert` という属性がある。

`inert` は、指定した DOM を「非活性」にするための属性だ。要するに Modal Dialog を開いた時の「後ろ側」の世界を、正しく非活性にするために定義された。

これがないころは、キーボードやマウス操作を無効にするためにイベントをフックして prevent したり、 Focus Trap のために tab が Modal を出て行かないように一番下まで来たら、次は Modal 内の一番上に飛ばして他は `tabindex=-1` したりみたいなことをして、なんとか Modal の外の正解を塗りつぶしてた。

でも、それは流石に無理があるので、標準仕様として `inert` を定義したことで、ブラウザが全部無効にしてくれるようになった。

`inert` は `dialog` と一緒に使わないといけないわけではなく、単独で使うこともできる。

たとえば「読み込み中の何かを、読み込むまで非活性にする」といったこともできるが、注意点はこれまで `disabled` で無効にしてたコントロール系はこれまで通り `disabled` を使うべきだ。

## `::backdrop`

Modal Dialog を開いた時に、後ろ側を `inert` にすることができるようになったが、 `inert` はあくまで非活性なだけで、特にスタイルが当たるわけではない。しあkし、非活性だった場合大抵は色を薄暗くすることで「操作不能である」ことを示すだろう。

この場合 `inert` 部分にスタイルを当てることもできる。

```css
[inert] {
  background-color: rgba(200,200,200,0.50);
}
```

しかし、 Top Layer に要素を表示している時は、「Top Layer 以外」を暗くしたい。これを実現するために定義されたのが `::backdrop` だ。

```css
::backdrop{
  background-color: rgba(200,200,200,0.50);
}
```

## ::modal

`::backdrop` が「Top Layer 以外」だったのと対照的に、 `::modal` は 「Top Layer だけ」にスタイルを当てるための擬似クラスになっている。

`::modal` は `showModal` した `<dialog>`はもちろん、さっき言ったように、同じく Top Layer に載せることができる Fullscreen API もやはり `::modal` でスタイルができる。(`:fullscreen` もある)。


```css
::modal {
  /* xxx */
}
```

一方、 `show()` した Modal ではない `<dialog>` は対象外だ。

## Close Watcher

Modal はキーボード操作で閉じたりできるのが基本で、例えば Android の場合は背面タップで閉じられるのが実装マナーとなっている。

そのような「modal を閉じるための操作」を、キーボードイベントをフックして実装しようとすると、例えば「戻る」を変にいじって history を壊したりする可能性がある。

そこで定義されたのが、、必要な操作の発生を監視できる Close Watcher という API だ。

例えば Modal Dialog は ESC で閉じることができるが、これは内部的に Close Watcher によって実現されている。つまり、基本的に直接使う機会は少ないだろう。

もし、ネイティブの `<dialog>` 以外の要素に対して、自前でそのような挙動を実現したいなら、 Close Watcher を自前で使うことになるだろう。

## <dialog>

さて、以上の仕様を組み合わせて実現したのが dialog 要素だ。

この要素は

- ネイティブで Modal / non-Modal な Dialog を開くことができる

- Modal を開くと自動で背景が inert になる

- Focust の管理や、活性管理などが自動で行われる

- :modal / :backdrop をスタイルできる

- Close Watcher で OS に合わせたキーボード操作(ESC で閉じる)なども自動で対応される

などといった、これまでエンジニアが無理やり実装してきた Modal への要件を、一挙に解決してくれているのだ。

そのうえで role=dialog であるものを開くことができるわけなので、支援技術に対しても「dialog が開いたぞ」ってことが伝わるわけ。　そして、 showModal で開かれていれば aria-modal=true 扱いにもなる。

もしそれが alert (警告)の意味をもっているなら、 role=alertdialog で上書きする必要はあるけど、そうでない場合は単に <dialog> を使って実装しているだけで、十分なセマンティクスが提供できるのはやっぱりでかいよね。

## open/close ? show/hide ? show/close ?

仕様にも書かれてるんだけど、一般的に

open <=> close

show <=> hide

なんだけど、 Dialog については

show <=> close

っていう操作になるんだよね。メソッドもそうなってる。

この理由はちょっと面白くて、仕様ではこうかかれている。

> We use show/close as the verbs for dialog elements, as opposed to verb pairs that are more commonly thought of as antonyms such as show/hide or open/close, due to the following constraints:
>
> dialog の動詞として、show/hide や open/close のような反対語として一般的に考えられている動詞ペアとは対照的に、以下の制約から show/close を使用します：
>
> Hiding a dialog is different from closing one. Closing a dialog gives it a return value, fires an event, unblocks the page for other dialogs, and so on. Whereas hiding a dialog is a purely visual property, and is something you can already do with the hidden attribute or by removing the open attribute. (See also the note above about removing the open attribute, and how hiding the dialog in that way is generally not desired.)
>
> dialog を hide すことと close することは異なります。 dialog を close することは、その dialog に戻り値を与えたり、イベントを発生させたり、他の dialog のためにページのブロックを解除したりします。一方、 dialog の hide は純粋に視覚的な特性であり、hidden 属性や open 属性の削除で既にできることです(open 属性の削除と、その方法による dialog の非表示が一般的に望まれていないことについては、上の注釈も参照してください)。
>
> Showing a dialog is different from opening one. Opening a dialog consists of creating and showing that dialog (similar to how window.open() both creates and shows a new window). Whereas showing the dialog is the process of taking a dialog element that is already in the DOM, and making it interactive and visible to the user.
>
> dialog を show することは、dialog を open することとは異なります。dialog を open することは、dialog を create & show することです（window.open() が新しいウィンドウを作成し表示するのと同様です）。一方、dialog を show することは、すでに DOM にある <dialog> 要素を、インタラクティブに、ユーザーに見えるようにすることです。
>
> If we were to have a dialog.open() method despite the above, it would conflict with the dialog.open property.
>
> にもかかわらず dialog.open() メソッドを用意すると、dialog.open プロパティと衝突してしまいます。
>
> Furthermore, a survey of many other UI frameworks contemporary to the original design of the dialog element made it clear that the show/close verb pair was reasonably common.
>
> さらに、dialog 要素のオリジナルの設計と同時代の他の多くのUIフレームワークを調査した結果、show/close 動詞のペアが合理的に一般的であることが明らかになりました。
>
> In summary, it turns out that the implications of certain verbs, and how they are used in technology contexts, mean that paired actions such as showing and closing a dialog are not always expressible as antonyms.
>
> まとめると、ある種の動詞の意味合いや技術的な文脈での使われ方によって、 dialog の show と close のような対になる動作は、必ずしも反対語として表現できるとは限らないということがわかります。
>
> [HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/interactive-elements.html#note-dialog-method-names "https://html.spec.whatwg.org/multipage/interactive-elements.html#note-dialog-method-names")

なので、もし自分がもっている実装を標準 <dialog> に移行するのであれば、この辺の語彙のすり合わせもやった方がいいかもね。

次回はもう少し実際のコードで、 Modal の使い方を確認していこう。
