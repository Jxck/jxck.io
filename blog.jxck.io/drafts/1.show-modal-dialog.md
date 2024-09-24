# [dialog][popover] Dialog と Popover #1

## Intro

HTML の `<dialog>` 要素と、 `popover` 属性、および関連する様々な仕様が標準化され、実装が進められている。

Open UI を中心に進められているこれらの改善は、多くのサイトで共通したユースケースがありながら、長らくミッシングピースとなっていた重要な機能だ。

もし今自前で同等のユースケースを実装しているのであれば、適切な仕様を用いた実装に刷新することで、従来はほぼ不可能だった UX を提供できるようになる。

今回から、数回の連載形式で、これらの仕様がどのように標準化され、我々開発者はこれをどのように使っていくべきなのかについて、解説する。


## showModalDialog

Modal や Dialog と言われる UI の歴史は Web においても古く、ブラウザでは IE4 くらいのころに独自実装された `window.showModalDialog()` が最初にあった。

後に仕様を起こして標準化し、互換のために他のブラウザも実装をしていた時期があるが、例えば Chrome は M35 (2014 年)で deprecate している。

- Intent to Remove: window.showModalDialog()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xh9fPX0ijqk/m/8oPryGUsGPMJ
- Intent to Remove showModalDialog
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xp1qU_SeLEk/m/cJQRy7oOKXYJ

deprecate された理由は、以下に書かれている。

- Disabling showModalDialog
  - https://blog.chromium.org/2014/07/disabling-showmodaldialog.html
- Dev.Opera --- Removing showModalDialog from the Web platform
  - https://dev.opera.com/blog/showmodaldialog/
  - https://web.archive.org/web/20240610131102/https://dev.opera.com/blog/showmodaldialog/

特に Opera の頃の Mathias が書いたブログが非常にわかりやすい。

この API は、現在の Window 上に Modal として指定した HTML がレンダリングされる仕様なのだが、「同期」な API だったため、 Modal が開いている間「Window 側の JS の実行が完全に止まる」という、今となっては考えられないような仕様になっていたのだ。

このとき、 `showModalDialog()` に渡した引数 `passedValue` は、 Modal 側で `window.dialogArguments` で取得でき、 Modal を閉じる際には `window.returnValue` に設定した値が Window 側に戻り値として返り、そこから JS が再開する。

```js
// Modal を開く側

// ここで JS が止まる
var returned = window.showModalDialog('./modal.html', 'passedValue')

// modal が閉じると値を返してここから再開
console.log(returned) // "returnedValue"
```

```js
// Modal 側

// Window から値を受け取る
var passed = window.dialogArguments // "passedValue"

// Window に値を返す
window.returnValue = "returnedValue"
```


## 同期 API という技術的負債

確かに、 Modal は「同意の取得」などでよく使うため、ユーザの操作をブロックしつつ、値をやり取りできる API である必要があった。

また、 `window.dialogArguments` を触れると言うことは、Modal 上でも JS は動いていることを意味する。つまり、 Window で止まってるイベントループとは別に、 Modal 上でもイベントループがもう一つ走ることになる。そして、その上で `window.open` したり form を `submit` したり、追加で `showModalDialog()` することも可能だ。

今と違って IE4 の頃はタブブラウザですらなく、 1 Process 1 Window な時代だった(つまり、URL を別で開くと、Window がもう 1 つ立ち上がる)。これが、 1 Tab 1 Process なマルチタブブラウザになった場合、「ブロックする」といっても「何をどこまで止めるのか」を定義し直すのも難しかった。

かなり初期の API で、ろくに議論されないまま独自実装として始まったこの API を、互換性のために他のブラウザもしかたなく実装し、 HTML にも渋々現状を仕様として起こした、そんな API だ。この API のヒドさについて Hixie はこう説明してる。

> This API single-handedly makes completely unrelated parts of the platform significantly more complicated to implement, which leads to more bugs, which makes everything worse for everyone.
> And to top it all off, it's not even a particuarly good UI. We have much better solutions in the works, too, like dialog.
>
> この API のせいで、プラットフォームのまったく関係のない部分の実装が著しく複雑になり、バグが増え、すべての人にとってすべてが悪くなる。
> その上、特に良い UI でもない。私たちは、 `<dialog>` のような、より良い解決策も準備している。
>
> --- https://groups.google.com/a/chromium.org/g/blink-dev/c/xh9fPX0ijqk/m/8oPryGUsGPMJ

これを実装すると、今度出てくる新しい API (Promise や Mutation Observer etc) の実装をさらに複雑にし、複雑さが脆弱性につながってしまう懸念もあった。

そして、そこまで人気な API でもないため利用者も多くはなく、 UI も UX も別段良くなかった。端的に言えば、技術的負債だったわけだ。

ブラウザ実装者からの不満も爆発し、この API を長いこと抱えているより、より良い API を定義してユーザの移行を促しつつ、 `showModalDialog` は deprecate していく。

その合意のもと進めていく先が、 `<dialog>` だったのだ。