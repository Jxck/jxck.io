# [cookie][3pca] 3PCA 24 日目: Retargeting

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 24 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日はリターゲティングをカバーする Protected Audience API について解説する。


## Retargeting

他のサイトで見た商品が、別のサイトで表示されるのがリターゲティングだったが、このユースケースをカバーするために提案されたのが Turtledove とくくられたいくつかの API だ。

その 1 つが Fledge で、今は名前が変わって Protected Audience API となっている。

- turtledove/FLEDGE.md at main · WICG/turtledove
  - https://github.com/WICG/turtledove/blob/main/FLEDGE.md

リターゲティングは、おおまかに以下のような流れで行われる。

- ユーザが見た広告主の商品をトラックしておく
- 媒体主が「ここを広告枠として売りたい」とアドネットワーク上でオークションにかける
- 広告枠を買いたいと言う広告主が、オークションに勝てばその商品広告が表示される

これをそのまま再現するため、非常に複雑な作りになっている。


### Protected Audience API

まず、ユーザが商品を見ると、その商品を見たという情報を保存する必要がある。

これを "Interest Group" といい、 JS に後に必要になる広告クリエイティブなどの情報を渡して、ブラウザに保存する形で行われる。

```js
await navigator.joinAdInterestGroup(interestGroup)
```

ユーザが商品を探している間に、この Interest Group が登録されていくわけだ。

次に、媒体側で広告枠を売る場合は、オークションを走らせる。

```js
await navigator.runAdAuction(auctionConfig)
```

このオークションに勝った広告が、晴れて画面に表示されるという仕組みだ。

ここで重要なのは、どんな Interest Group に Join しているのか、どの広告がオークションに勝ったのか、などの情報を漏洩しないことだ。

余計な情報が外に漏れれば、それが新たなトラッキングベクターになりえる。


### Worklet

現状オークションは、アドネットワークのサーバ上で行い、その結果が広告枠に送られている。

しかし、アドネットワークでオークションを走らせるには、あらゆる情報がアドネットワークに渡る必要があるため、「どんな Interest に Join しているか」などを知らせる必要が出てしまう。

そこで、この API は Auction 用の Worklet を用い、ブラウザ上で入札を行うのだ。


### Fenced Frame

入札の結果、表示すべきクリエイティブが決まり、それを `<iframe>` に表示するのが通常の広告だ。

しかし、 `<iframe>` に表示すると、 Top Level Window (つまり媒体主) は `<iframe>` とやりとりすることで、「どんな広告が表示されたか」などの情報を知ることができてしまう。

そこで、広告は `<iframe>` ではなく `<fencedframe>` と呼ばれる、特殊なフレームに表示する。

`<fencedframe>` は `<iframe>` でできるあらゆることが禁止された特殊な HTML だ。

- postMessage
- attribute access
- window.top/parent
- width/height
- lifecycle events
- etc, etc

通常使える JS API が使えないどころか、 Window 側が共通してアクセスできるサイズまで制限されているのは、全てそこを使って境界を跨いだ情報共有ができないようにするためだ。

そして、 `<iframe>` ではなく `<fencedframe>` の利用を強制するために、 `runAdAuction` の結果は URL ではなく URN を返す。これで `<fencedframe>` を使わなければ表示ができなくしているのだ。

```html
<fencedframe src="urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a" mode="opaque-ads"></fencedframe>
```

`<fencedframe>` は、 `<iframe>` の Sandboxed などと異なり、新しい HTML として定義されているのは、もはや目的が `<iframe>` のような汎用埋め込みとは異なるからだ。


### Trusted Execution Environment (TEE)

デバイス上でオークションを走らせるのはいいとしても、そこで提供できる入札に必要な情報が、 `joinAdInterestGroup()` でしか渡せないと、入札はかなり難しくなる。

例えば、広告主が予算を在庫として設定し、それが尽きるまでは表示したいといった、リアルタイムな情報が提供できなくなるのだ。

そこで、サーバ側でリアルタイムにその情報を提供できるようにするのだが、ここで使われるのが TEE だ。

TEE はざっくり言うと、事前に定義した処理が、確実に動いており、誰もそれを誤魔化したり、情報を抜いたりできない環境だ。

広告主は、許されたハンドラの実装などはできるが、それ以外は中で何が起こっているのかを盗み見ることができないため、プライバシーが保たれる。

現状 TEE は AWS しかサポートされてないため、これを行うには AWS 環境が必要になる。将来的には GCP や自前環境もサポートされるらしいが、どうなるのか今のところわからない。


## なぜリタゲの API があるのか

そもそも「トラッキング」が問題で 3rd Party Cookie をなくすのに、その代表格だったリタゲのための API がなぜあるのかは、 Privacy Sandbox ができた背景のところで説明した通りだ。

無くなるユースケースはとりあえずカバーしないと、 Chrome は 3rd Party Cookie を Deprecate できない。

そこで、リタゲをプライバシーに配慮して行うという、無理難題を形にしたのがこの API だ。非常に複雑かつ、新たな仕組みが色々と入ってるのもそのためだ。

正直複雑すぎて、どのくらいこの API が普及するのか、どの程度使いこなせるのかはよくわからない。

また、普及してブラウザ上のオークションが頻繁に走るようになった時に、 UX 的にどうなるのかなども現時点ではよくわからない。

そして、この API もまだ決まってない部分がいくつかあり、今後どうなっていくのかも、わからない部分が多い。


## Standard Position

Mozilla も Safari も、 Position は出して無いようだ。

が、目的がリターゲティングである以上、問い合わせるまでもないだろうとは思う。