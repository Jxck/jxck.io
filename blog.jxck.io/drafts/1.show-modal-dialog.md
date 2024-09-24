# Dialog/Popover (1)

## showModalDialog

Modal や Dialog と言われる UI の歴史は Web においても古く、 IE では 4 くらいのころに独自実装された `window.showModalDialog()` が最初にあった。

しかし、この API は M35 (2014年)以降 deprecate されている。

- Intent to Remove: window.showModalDialog()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xh9fPX0ijqk/m/8oPryGUsGPMJ
- Intent to Remove showModalDialog
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xp1qU_SeLEk/m/cJQRy7oOKXYJ

deprecate された理由は、以下に書かれている。

- Disabling showModalDialog
  - https://blog.chromium.org/2014/07/disabling-showmodaldialog.html
- Dev.Opera --- Removing showModalDialog from the Web platform
  - https://dev.opera.com/blog/showmodaldialog/

特に Opera の頃の Mathias が書いたブログが非常にわかりやすい。

この API は、現在の Window 上に Modal として指定した HTML がレンダリングされる。そして、この API は「同期」だったため、 Modal が開いている間「Window 側の JS の実行が完全に止まる」という、今となっては考えられないような仕様だったのだ。

```js
// ここで JS が止まる
var returned = window.showModalDialog('./modal.html', 'someValue')

// modal が閉じると値を返してここから再開
console.log(returned)
```

このとき、 `showModalDialog()` に渡した引数 `someValue` は、 Modal 側で `window.dialogArguments` で取得でき、 Modal を閉じる際には `window.returnValue` に設定した値が Window 側に戻り値として返り、そこから JS が再開するのだ。

確かに、 Modal は「同意の取得」などでよく使うため、ユーザの操作をブロックしつつ、値をやり取りできる API である必要があったのだろう。

また、 `window.dialogArguments` を触れると言うことは、Modal 上でも JS は動いていることを意味する。つまり、 Window で止まってるイベントループとは別に、 Modal 上でもイベントループがもう一つ走ることになる。そして、その上で `window.open` したり form を `submit` したり、追加で `showModalDialog` することも可能だ。

また、今と違って IE4 の頃はタブブラウザですらなく、 1 Process 1 Window な時代だった(つまり、URL を別で開くと、Window がもう一個立ち上がる)。これが、 1 Tab 1 Process なマルチタブブラウザになった場合、「ブロックする」といっても「何をどこまで止めるのか」を定義し直すのも難しかった。

かなり初期の API で、ろくに議論されないまま独自実装として始まったこの API を、互換性のために他のブラウザもしかたなく実装し、 HTML にも渋々現状を仕様として起こした、そんな API だ。この API のヒドさについて Hixie はこう説明してる。

> This API single-handedly makes completely unrelated parts of the platform significantly more complicated to implement, which leads to more bugs, which makes everything worse for everyone.
> And to top it all off, it's not even a particuarly good UI. We have much better solutions in the works, too, like <dialog>.
>
> この API のせいで、プラットフォームのまったく関係のない部分の実装が著しく複雑になり、バグが増え、すべての人にとってすべてが悪くなる。
> その上、特に良いUIでもない。私たちは、 `<dialog>` のような、より良い解決策も準備している。
>
> --- https://groups.google.com/a/chromium.org/g/blink-dev/c/xh9fPX0ijqk/m/8oPryGUsGPMJ

これを実装すると、今度出てくる新しい API (Promise や Mutation Observer etc) の実装をさらに複雑にし、複雑性が脆弱につながってしまう懸念もあった。

そして、そこまで人気な API でもないため利用者も多くはなく、 UI も UX もそこまで良くなかった。端的に言えば、技術的負債だったわけだ。

ブラウザ実装者からの不満も爆発し、この API を長いこと抱えているより、より良い API を定義してユーザの移行を促しつつ、 `showModalDialog` は deprecate していく。

その合意のもと進めていく先が、 `<dialog>` だったのだ。