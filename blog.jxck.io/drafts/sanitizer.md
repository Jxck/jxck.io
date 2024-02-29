# Sanitizer API

## Intro

Sanitizer API は、一旦 Chrome で Ship されたが、それを取り消して新しい API で再実装することになった。

一度 Ship したものが、重大なセキュリティ問題などもなく取り消されるのは、互換性を重んじる Web においては稀有なことだ。

この背景にどのような議論があったのかをまとめ、新しい API の設計意図を読み解く。


## Sanitizer API

簡単に Sanitizer API をおさらいしておく。

ユーザ入力などを HTML として DOM に展開するのは、 XSS の危険が伴う。例えば以下のようなものだ。

```js
$div.innerHTML = `<em>hello world</em><img src="" onerror=alert(0)>`
```

しかし、 `.textContent` に限定したり、 HTML Special Chars を全て escape する処理では、ユーザの入力が持っていたスタイルなどを全て捨てる必要があり、満たせないユースケースもある。

理想的には、入力コードから「HTML として解釈した場合害のある部分のみを削除」した上で展開できれば、攻撃ベクターのみ防いで安全な展開が可能になるだろう。

DOMPurify は、まさしくこれを行うライブラリだった。

```js
const sanitized = DOMPurify.sanitize(`<em>hello world</em><img src="" onerror=alert(0)>`)
$div.innerHTML = sanitized // `<em>hello world</em><img src="">`
```

Sanitizer API はこれを標準化するのが目的だ。

ブラウザの内部には battle tested な HTML パーサがあるため、これをそのまま API として提供できるのは明白なメリットだ。

しかし、メリットはそれだけではない。

DOMPurify の実装は、内部で DOMParser を呼び、パースした結果を改変して安全にしたものを、シリアライズして返している。

得られる結果は文字列だ、それを `innerHTML` に代入すると、再度内部でパースされて DOM に展開されることになる。

つまり、二回パースしているのだ。

1. Sanitize 時のパース
2. innerHTML 時のパース

これは単にオーバーヘッドがあるだけではない。実は「一回目のパースで危険になり、二回目のパースで XSS が発動する」という攻撃手法が発見されているのだ。

したがって、セキュリティの側面からも「パースは一回」にした方が良いと言える。

それを踏まえて Sanitizer API は、 Sanitize し、そのまま DOM に展開する以下のような API が定義された。

```js
$div.setHTML(`<em>hello world</em><img src="" onerror=alert(0)>`)
```

この方向で、少なくとも Mozilla は Positive であったため、標準化とプロトタイプが進められ、 Chrome では 2022/06 に MVP が Ship された。

- Intent to Ship: Sanitizer API MVP
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KOpwkS-bgl0



## Deprecate Sanitizer API MVP

Deprecate されたのは 2023/08/07 のことだ。

- Intent to Deprecate: Remove "Sanitizer API MVP"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PNTt4oFXt8c

M105 で Ship されていたのは MVP 仕様であり、この仕様側で変更があったため、 Deprecate して実装し直すという意図が説明されている。

理由は以下のようなものだ。

- MVP の後、重要なフィードバックを受け取り、設計の変更が議論された
- 新しい API を、古いものと互換性を維持して修正するのは難しい
- 別の API で出してもいいが、他のベンダは古い API を実装することはないだろう
- Usage が 0.000000492 % であるため、これ以上増える前に削除した方が良いと判断

スレッドで Alex Russell が非難しているように、このような方針の取り方は本来認められるべきではない。

数値が少なく見えても、使っているサイトがあることには変わらず、そのサイトは壊れることになるだろう。

また、同じ理由で他のベンダとの議論の結果、 Chrome だけが再度 API を変更するために Deprecate を行うようなことになっては、ユーザが振り回されてしまう。

結果この変更は、早急に OT を開始してユーザへの移行パスを用意することや、別のベンダ(ここでは Firefox)がしっかりと実装-トライアルを経るまでは、Chrome 側では Ship しないなどの条件で、 Deprecate していく流れになったようだ。


## Sanitizer と Declarative Shadow DOM

気になるのは、この設計変更の理由だ。

Intents の中では Firefox の開発者から「Declarative Shadow DOM の関連があり、 DSD 側の作業が遅れたためでもある」といった説明をしている。

DSD と Sanitizer にどのような関連があるのかを調べる。
