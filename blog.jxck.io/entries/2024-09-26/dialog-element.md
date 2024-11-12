# [dialog][popover] Dialog と Popover #2

## Intro

`showModalDialog()` は今から考えれば、確かにひどい API だった。

しかし、何か Modal を開き、ユーザにインタラクションをさせ、閉じたらそこで入力された値や選択された結果を取得し、処理を進めたいユースケース自体は、規約への同意取得や、 Cookie バナー、ログインなど多々ある。

そういった場面では、ライブラリなどを用いて実装する必要があったが、 Modal を実装するのは実際にはそんなに簡単ではなかった。


## Modal, Dialog, Modal Dialog

最初に、用語を少し整理しておこう。

- Modal
- Dialog
- Modal Dialog
- non-Modal Dialog

*Dialog* とは、そもそも「対話」という意味であり、UI の文脈では入力や選択を求める「対話的な UI」のことを指す。

既に実装されている `alert()`, `confirm()`, `prompt()` なども広く言えば Dialog にあたり、同意を求めたり、設定を確認させたり、更新があるから再読み込みさせたりといった用途で使う。

その中で *Modal* とは一般的には「特定のタスクを行うためのモード」といったニュアンスがあるが、この文脈では「それを処理しない限り先に進めない/他の操作ができない」ようなブロックを伴う UI のことを指す。つまり、Dialog には「Modal で出す」か「non-Modal で出すか」という 2 種類があるということだ。(modeless という表現をする場合もあるが、Open UI では non-Modal という表現が使われている。)

Modal Dialog は Web 以外にも多くのプラットフォームで提供され、コモンケースとして以下のように実装されることが多い。

- Dialog 以外を非活性にし操作(focus, click, scroll)できなくする
- 非活性部分が薄暗くなる
- Dialog を閉じたら、結果の値が呼び出し側に返り、元の処理を再開する

逆に non-Modal な Dialog は、開くだけで他を非活性にしない。

以降単に Modal と言った場合、「Modal で開いた Dialog」つまり「Modal Dialog」のことを指すことにする。


## Modal 実装の難しさ

Modal の実装を自前で行うとすれば、見た目としては以下のような要件を満たすことになるだろう。

- 他を差し置いて一番手前(上)に表示される
- そこを処理しない限り次に進めない(他の処理ができない)
- 表示している後ろ(裏)は薄暗くなる
- etc

![Modal が開き、閉じないと先に進めない](1.modal.drawio.svg#500x256)

この UI を実装する CSS を考えると、「画面いっぱいに、広げた `<div>` を被せ、Opacity でフィルターをかけて、 Modal 用に `z-index` を最大にした `<div>` をセンタリングし、、」などと想像できるかもしれない。

しかし、「頑張ればできそう」なだけで、実際には「使いにくい Modal」が世の中に大量に生み出されてしまった。

例えばよくあるのは、フォーカス管理の欠如だ。

1. Modal を開いているのに、フォーカスは Modal 外のままで、キーボードで操作したいユーザが Modal に Tab で辿り着けない
2. Modal を開いていて、フォーカスも Modal に乗っているのに、Tab を押すと Modal から落ちて外に移動してしまう
3. Modal を閉じた際に、以前いた場所とは別の場所にフォーカスが移り迷子になる
4. Modal 上で Tab 移動し、Modal の一番下まで行ったら、次は Modal の上に戻って欲しいが、そのまま外に出て行ってしまう

こうした制御はフォーカストラップと呼ばれ、実装が難しい代表例だ。

他にも、Modal にできて欲しいことができない実装も多い。

1. z-index 戦争に負けて Modal の上に別の何かが表示されている
2. Modal を開いている時も、Modal 外をクリックしたりスクロールしたり操作できてしまう
3. Modal 外をクリックしたら Modal を閉じて欲しいのに、閉じてくれない
4. Esc を押したら閉じて欲しいのに、閉じてくれない
5. Modal 以外を暗くするのに失敗して、Modal も暗くなっている。もしくは変なところだけ暗い/明るい。
6. 最初の Modal を残したまま、同じレベルの 2 個目の Modal を開けてしまう。
7. Modal が開いていること、Modal 上に移動したこと、Modal を閉じたことなどが、支援機能に伝わらないので、何が起こったか伝わらないユーザがいる。
8. Modal が開いて、後ろが非活性なのに、そのことが支援技術に伝わらずに、操作できない箇所に引っかかって操作が進められないユーザがいる。
9. etc etc etc etc etc etc

実世界には、こうした細かい挙動を実装できていない、「ただ真ん中に表示されただけの DOM」でしかない Modal モドキも少なくない。

実装パターンは APG にもまとめられているが、これを自前でやるのも簡単ではない。

- Dialog (Modal) Pattern | APG | WAI | W3C
  - https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

様々な UI ライブラリが Modal Dialog 相当の機能を、APG を元に提供しているが、それでもやはり理想的な実装は難しい。

というか、残念なことに、どんなに JS や CSS を捏ね回してツギハギしても、ネイティブの支援を得た実装と比較すると、劣化版しか作れないのが実際だ。

だからこそ、この要件を標準化し、ブラウザがネイティブの実装を提供しようということになった。


## 標準 Dialog

`showModalDialog()` が問題になったのは 2014 年ごろで、実に 10 年前の話だったが、実はこの頃すでに `<dialog>` の仕様自体はあった。

とはいえ、Chrome が少し実装し、Opera も先に実装を進め、flag の裏に持っていた。Safari / Firefox は長らく実装していなかった。

HTML5.2 で W3C の方の仕様では消されそうになったこともあるくらい、影の薄い仕様だった。

- CfC: HTML 5.2 to Candidate Recommendation
  - https://github.com/w3c/html/issues/969

ところが、2016 年ごろ Firefox で再度議論が進み、再度標準化を進めようという話になった。

- Re: Proposal to retain dialog in HTML5.2
  - https://lists.w3.org/Archives/Public/public-html/2017Sep/0005.html

Firefox は内部でも `<dialog>` を使いたいユースケースがあったという話もあり、実装が進んで 2020 年に Ship されている。

- Intent to implement: HTML5 `<dialog>` element
  - https://groups.google.com/g/mozilla.dev.platform/c/vTPGW1aJq24/m/JnEnoH3BEAAJ
- Intent to Ship: HTML5 `<dialog>` element (Nightly Only)
  - https://groups.google.com/g/mozilla.dev.platform/c/gqi4MDQDwX8

Firefox が Ship を進めるのと同時期くらいに、これを現在のように「ぜひ使うべき機能」まで大きく進めたきっかけが Interop だった。

MDN が Developer Survey という大規模調査で、開発者が何に困っているのかを調査し、その結果をブラウザベンダに共有して互換性問題を改善しようということで始まったのが Compat 2021 だが、それが 2022 年に Interop と名前を変えた時に、Focus Area として `<dialog>` が採用されたのだ。

- dialog & ::backdrop · Issue #12 · web-platform-tests/interop
  - https://github.com/web-platform-tests/interop/issues/12

それを受け、Safari が実装することになる。Igalia の協力もあったらしい。

- Introducing the Dialog Element | WebKit
  - https://webkit.org/blog/12209/introducing-the-dialog-element/

こうして、無事全てのブラウザで使えるようになった。

合わせて、ブラウザ間で微妙に異なる挙動のすり合わせや、足りないプリミティブの整理と仕様化も行われた。


## 関連仕様

### 初期フォーカス管理

ブラウザごとの主張が異なった代表が「フォーカスの初期位置」だった。

最初に `<dialog>` を開いた時、 `<dialog>` 自体にフォーカスするのか、中のフォーカスできる最初の要素にフォーカスするのかといった部分の議論だ。

- Implement dialog initial focus proposal by josepharhar · Pull Request #8199 · whatwg/html
  - https://github.com/whatwg/html/pull/8199

最終的には、「*フォーカスすべき要素を開発者が選び、明示的に `autofocus` を指定すべき*」が推奨になっているため、`<dialog>` を実装する場合は、必ず何かしらのコントローラに `autofocus` の付与を検討すべきということになる。


### Top Layer

要素の重なり合いは、`z-index` で制御するのが従来の CSS の常識だった。

他の要素よりも手前に表示したい場合は、`z-index` の値を大きくするのだが、Modal Dialog のような UI は、今何が表示されているかにかかわらず、問答無用で最前面に来てくれないと困ることになる。

そこで、すべてのレイヤーの最上位に位置し、ブラウザが管理する、"*Top Layer*" という概念を作り、Modal Dialog はそこに表示することになった。

Top Layer はあくまでブラウザが内部的に生成しているため、どんなに `z-index` が大きい要素があっても、Top Layer より前に来ることはない。

また、ここに表示できるものは Modal Dialog や Fullscreen といった、特別な UI のみに限られる。

これで Modal Dialog を表示する場所が標準化できた。


### inert

`inert` は、指定した DOM を「非活性」にするための属性だ。要するに、Modal Dialog を開いた時の「後ろ側」の世界を操作不能にするために定義された。

これが無い頃は、キーボードやマウス操作を無効にするためにイベントをフックして prevent したり、Focus Trap のために Tab が Modal を出て行かないように、一番下まで来たら次は Modal 内の一番上に飛ばし、後ろは `tabindex=-1` する、といったことをして、なんとか Modal の外の世界を塗りつぶしていた。

しかし、そのように実装しきるのは流石に無理があるので、標準仕様として `inert` を定義することで、ブラウザが全て無効にしてくれるようになったのだ。

```html
<div inert>
  <p>not selectable</p>
  <button>not clickable</button>
</div>
```

`<dialog>` は暗黙的に `inert` を使っているため、明示的に指定する必要はない。むしろ、自分で特定要素「以外」を `inert` にするのは割と面倒で、例えば `body` につければ Dialog 含めて非活性になる。つまり、Dialog 以外全てに `inert` をつける必要があるのだが、`<dialog>` はこれを内部で行なっている(仕様上は document を "blocked by the modal dialog" にすると書いてある)。

また、`inert` は `<dialog>` と一緒に使わないといけないわけではなく、単独で使うこともできる。たとえば「読み込み中の何かを、読み込むまで非活性にする」、「カルーセルのまだ表示されていない部分を非活性にする」といったことも想定されている。

ただし、これまで `disabled` で無効にしていたコントロール系は、これまで通り `disabled` を使うべきだという点に注意したい。

- inert attribute - Chrome Platform Status
  - https://chromestatus.com/feature/5703266176335872


### `::backdrop`

Modal Dialog を開いた時に、後ろ側を `inert` にすることができるようになったが、 `inert` はあくまで非活性なだけで、特にスタイルが当たるわけではない。しかし、非活性だった場合、大抵は色を薄暗くすることで「操作不能である」ことを示すだろう。

この場合、 `inert` であることを利用し、以下のようにスタイルを当てることもできる。

```css
[inert] {
  background-color: rgba(200, 200, 200, 0.50);
}
```

しかし、 Top Layer に要素を表示している時は、「Top Layer 以外」を暗くしたい。これを実現するために定義されたのが `::backdrop` だ。

```css
::backdrop {
  background-color: rgba(200, 200, 200, 0.50);
}
```

`<dialog>` を用いる場合は、 `inert` ではなく `::backdrop` にスタイルを当てるのが良いだろう。

- CSS Pseudo Element ::backdrop inheriting from Originating Element - Chrome Platform Status
  - https://chromestatus.com/feature/4875749691752448


### :modal

`::backdrop` が「Top Layer 以外」だったのと対照的に、`:modal` は「Top Layer だけ」にスタイルを当てるための仕様だ。

`:modal` は `showModal` した `<dialog>` はもちろん、さっき言ったように、同じく Top Layer に載せることができる Fullscreen API もやはり `:modal` でスタイルができる。(`:fullscreen` もある)。

```css
:modal {
  /* xxx */
}
```

もちろん `show()` した Modal ではない `<dialog>` は対象外だ。

- CSS :modal Pseudo Class - Chrome Platform Status
  - https://chromestatus.com/feature/5192833009975296


### Close Watcher

プラットフォームが提供する Modal は、 ESC や範囲外のクリックによって閉じることができる。端末固有の操作などと紐づけるといった役割も果たしている。

このように、プラットフォームが提供する「Modal を閉じるための操作」を、キーボードイベントのフックなどで実装しようとすると、例えば「戻る」を変にいじって history を壊したり、ネイティブの他の機能に影響したりする可能性がある。

そこで定義されたのが、 Dialog に対する必要な操作の発生を監視できるよう提案された Modal Close Watcher で、これを Modal 以外(popover)にも適用できるよう拡張し、 Close Watcher として定義された。

```js
const watcher = new CloseWatcher();

watcher.addEventListener("cancel", () => {
  console.log("cancel")
});
watcher.addEventListener("close", () => {
  console.log("close")
});
```

Modal Dialog が ESC などで閉じられるのは、内部的に Close Watcher によって実現されているからだ。

- Close requests for CloseWatcher, `<dialog>`, and `popover=""` - Chrome Platform Status
  - https://chromestatus.com/feature/4722261258928128

ただし、Close Watcher は「`<dialog>` の範囲外をクリックしたら閉じる」という部分はフックしていないため、別途実装が必要だ。それについては次回解説する。


## `<dialog>`

さて、以上の仕様を組み合わせて実現したのが `<dialog>` 要素だ。

`role=dialog` の要素であり、以下のような、これまでエンジニアが無理やり実装してきた Modal への要件を、一挙に解決してくれているのだ。

- ネイティブで Modal / non-Modal な Dialog を開くことができる
- Modal を開くと自動で背景が inert になる
- フォーカスの管理や、活性管理などが自動で行われる
- `:modal` / `::backdrop` をスタイルできる
- Close Watcher が実装されている
- `aria-modal=true` であり、支援技術に伝わる

つまり、支援技術に対しても「Modal Dialog が開いた」ということが伝わる。

もしそれが ARIA で言う Alert (警告)の意味を持っているなら、 `role=alertdialog` で上書きする必要はあるが、そうでない場合は単に `<dialog>` を使って実装しているだけで、十分なセマンティクスが提供できるのだ。


## open/close ? show/hide ? show/close ?

仕様にも書かれているが、一般的に

- open / close
- show / hide

という対称性を持たせた操作に命名するのが一般的なのだが、 `<dialog>` については

- show / close

という操作体系になっており、メソッド名もそうなっている。

この理由は少し面白くて、仕様ではこう書かれている。

> We use show/close as the verbs for dialog elements, as opposed to verb pairs that are more commonly thought of as antonyms such as show/hide or open/close, due to the following constraints:
>
> dialog の動詞として、show/hide や open/close のような反対語として一般的に考えられている動詞ペアとは対照的に、以下の制約から show/close を使用する:
>
> Hiding a dialog is different from closing one. Closing a dialog gives it a return value, fires an event, unblocks the page for other dialogs, and so on. Whereas hiding a dialog is a purely visual property, and is something you can already do with the hidden attribute or by removing the open attribute. (See also the note above about removing the open attribute, and how hiding the dialog in that way is generally not desired.)
>
> dialog を hide することと close することは異なる。 dialog を close することは、その dialog に戻り値を与えたり、イベントを発生させたり、他の dialog のためにページのブロックを解除したりする。一方、 dialog の hide は純粋に視覚的な特性であり、hidden 属性や open 属性の削除で既にできることだ(open 属性の削除と、その方法による dialog の非表示が一般的に望まれていないことについては、上の注釈も参照)。
>
> Showing a dialog is different from opening one. Opening a dialog consists of creating and showing that dialog (similar to how window.open() both creates and shows a new window). Whereas showing the dialog is the process of taking a dialog element that is already in the DOM, and making it interactive and visible to the user.
>
> dialog を show することは、dialog を open することとは異なる。dialog を open することは、dialog を create & show することだ(window.open() が新しいウィンドウを作成し表示するのと同様)。一方、dialog を show することは、すでに DOM にある dialog 要素を、インタラクティブにユーザに見えるようにすることだ。
>
> If we were to have a dialog.open() method despite the above, it would conflict with the dialog.open property.
>
> にもかかわらず dialog.open() メソッドを用意すると、dialog.open プロパティと衝突してしまう。
>
> Furthermore, a survey of many other UI frameworks contemporary to the original design of the dialog element made it clear that the show/close verb pair was reasonably common.
>
> さらに、dialog 要素のオリジナルの設計と同時代の他の多くの UI フレームワークを調査した結果、show/close 動詞のペアが合理的に一般的であることが明らかになった。
>
> In summary, it turns out that the implications of certain verbs, and how they are used in technology contexts, mean that paired actions such as showing and closing a dialog are not always expressible as antonyms.
>
> まとめると、ある種の動詞の意味合いや技術的な文脈での使われ方によって、 dialog の show と close のような対になる動作は、必ずしも反対語として表現できるとは限らないということがわかるのだ。
>
> --- https://html.spec.whatwg.org/multipage/interactive-elements.html#note-dialog-method-names

したがって、もし自前の実装を標準の `<dialog>` に移行するのであれば、この辺の語彙のすり合わせもやった方がいいだろう。


## Demo

動作する DEMO を以下に作成した。

- Dialog Labs | labs.jxck.io
  - https://labs.jxck.io/dialog/


## Links

- Non-interactive Elements with the inert attribute | WebKit
  - https://webkit.org/blog/12578/non-interactive-elements-with-the-inert-attribute/


## Outro

以上のように、これまで JS/CSS を駆使して実装されていた Dialog の、あらゆる既知の問題を踏まえて、`<dialog>` の標準仕様が作られ、Interop により全てのブラウザが実装し、ほぼ動く状態にあるのだ。

現状、Modal/Dialog 相当を自前やライブラリを用いて実装しているのであれば、基本的には全て `<dialog>` に置き換えるべきだと言って良い。

次回はもう少し実際のコードで、`<dialog>` の使い方および、Modal/non-Modal の使い分けを解説していく。