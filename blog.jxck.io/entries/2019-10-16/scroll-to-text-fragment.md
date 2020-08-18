# [scroll][fragment][url] Scroll To Text Fragment と :~:text

## Intro

ページ内の特定の位置へのスクロールは、 URL フラグメントと HTML の ID 属性を用いて行われていた。

しかし、 ID を持たない要素へのスクロールというユースケースをカバーするために、フラグメントの拡張仕様が提案されている。

Chrome がフラグ付きで実装しているため、この仕様の特徴について解説する。


## id 属性とフラグメント

従来の仕様では、 HTML 内にある ID 属性を URL フラグメントに付与することで、その要素まで自動でスクロールするという仕様になっていた。

- <https://html.spec.whatwg.org/multipage/browsing-the-web.html#try-to-scroll-to-the-fragment>
- <https://html.spec.whatwg.org/multipage/browsing-the-web.html#the-indicated-part-of-the-document>

しかし、実際には ID が振られていないサイトや、スクロールしたい場所に ID が無い場面は多い。

そうしたコンテンツでも、ブラウザの表示内検索を行ったときのようなスクロールを実現したいという要望が、主に検索エンジンなどからあったようだ。


## Alternatives

ここに至るまではいくつかの提案があった。

- [TextQuoteSelector](https://www.w3.org/TR/annotation-model/#text-quote-selector)
- [bryanmcquade/scroll-to-css-selector](https://github.com/bryanmcquade/scroll-to-css-selector)
- etc

Chrome は最初 `#targetText` と CSS セレクタを用いた仕様で intents を出していた。

しかし、セレクタの書き方によって CSRF Token 等の情報が推測可能である、といった脆弱性が指摘され、その結果今回の仕様に至った。


## デリミタ

URL には、フラグメントくらいしか拡張できるポイントが無いため、ここにクエリ相当のものを入れることになる。

最初は `##` と二重にする方式がシンプルでわかりやすいとされたが、仕様上有効ではないため既存のパーサを壊す可能性が有り、また実際に壊れるかどうかを測定するのが難しいとして却下された。

これを踏まえ、 URL の仕様の範囲で 1, 2 文字では無く 3 文字の組み合わせで候補が出され、 Google の過去 5 年の URL 履歴でヒットしないものがリストアップされた。

- `~&~`
- `:~:`
- `~@~`

Chrome 78 では 3 つとも実装されたようだが、今は `:~:` のみになったようだ。


## text=

`textTarget=` などの案も有ったが、現状は以下のような構文になっている。


```text
:~:text=[prefix-,]textStart[,textEnd][,-suffix]
```

これをフラグメントに付与することで、遷移時にスクロールする。

フォールバックとして既存のフラグメントと両方使うこともできる。


```url
https://example.com#sometext:~:text=sometext
```


## :target

ID で遷移した場合は `:targe` 疑似要素からスタイルが設定できる。

`text=` で遷移した場合も同じことが検討されていたが、現実装では疑似要素は付かないようだ。


## DEMO

動作するデモを以下に用意した。

実際にいくつかの例を示すために、遷移先のデモはフラグメントを操作できるようにしてある。

各指定は、基本は単語単位で行う。

<https://labs.jxck.io/scroll-to-text-fragment/#:~:text=ipsum>

![textStart を英語指定](1.textStart.en.png#3359x2051 'textStart with en')

<https://labs.jxck.io/scroll-to-text-fragment/#:~:text=ipsum,aliqua>

![textStart, textEnd を英語指定](2.textStart-textEnd.en.png#3357x2053 'textStart & textEnd with en')

<https://labs.jxck.io/scroll-to-text-fragment/#:~:text=しかし,ない>

![textStart, textEnd を日本語指定](3.textStart-textEnd.ja.png#3359x2051 'textStart & textEnd with ja')

<https://labs.jxck.io/scroll-to-text-fragment/#:~:text=しない。-,しかし,ない>

![prefix, textStart, textEnd を日本語指定](4.prefix-textStart-textEnd.ja.png#3359x2054 'prefix & textStart & textEnd with ja')

<https://labs.jxck.io/scroll-to-text-fragment/#:~:text=ない。-,しかし,ない,-のに>

![prefix, textStart, textEnd, suffix を日本語指定](5.prefix-textStart-textEnd-suffix.jp.png#3359x2054 'prefix & textStart & textEnd & suffix with ja')


## 考察

実際に、引用などをする際にこれが有ると便利な場面も思い当たる一方、こうした、俗に言う「直リンク」を望まない Author に対しては、望ましく無い面もありそうだ。

筆者は最初の提案時から、互換性やセキュリティなどの側面からも、仕様化もデプロイも難しいのではないかと考えていたが、思った以上に作業が進んでいる現状がある。

互換性、セキュリティについては、仕様の中で議論されてはいるが、フラグメントの使われ方が外から測定しにくいという側面があるため、デプロイしないとわからない問題もありそうに思う。

今は location.href や location.hash からはこの値が取得できないため、悪用は難しそうだが、今後も仕様を補完する API も増えていくかも知れない。

これまでの URL の使われ方、ひいては Web の使われ方に少なからず影響するだろうと考えられるので、どのようにデプロイし、どの用に広まり、どの用に使われていくか、注目したい。
