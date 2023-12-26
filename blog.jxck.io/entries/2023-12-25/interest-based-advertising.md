# [cookie][3pca] 3PCA 23 日目: Interest Based Advertising

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 23 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今回からは、 Privacy Sandbox の API を、ジャンルごとに分けて概要を解説していく。

個々の API は非常に複雑であり、また今後も細かい点が変わっていくだろう。

どうせガッツリ使うのであれば、仕様を読む必要があるため、ここでは「何がしたいのか」「何ができるのか」に絞って解説する。


## Interest Based Advertising

### FLoC

広告表示時に「このユーザは何に興味があるのか」というインタレストを知ることは、表示する広告を選ぶ上で重要な情報だ(Interest Based Advertising)。

従来は、細かくユーザをトラッキングし「どんなサイトを閲覧するのか」「どんな行動を取るのか」「どんな時間に活動するのか」などの情報を細かく集め、ユーザのパーソナリティを分析し、インタレストを推測してきた。

このユースケースをカバーするために、最初に提案されたのが FLoC (Federated Learning of Cohorts) だった。

- FLoC  |  Privacy Sandbox  |  Google for Developers
  - https://developers.google.com/privacy-sandbox/archive/floc

これは、基本的に「ブラウザの閲覧履歴」をソースとして、ハッシュ値を生成するようなイメージだ。このハッシュ値 SimHash と呼ばれ「閲覧履歴が似ている人は同じ値になる」という特徴がある。似たインタレストのユーザを「コホート(群)」に分類し、そこに値を付与するアルゴリズムをブラウザが持つのだ。

Cohort の値はわかるが、別にそこから「この人はどういうサイトを見ている人か」がわかるわけではない(K-anonimity)。

もし First Party で大量の顧客情報を持っていれば、「同じコホート値の人々の属性情報」を持ち、そこから共通部分を割り出すと言った分析も可能かもしれない。

しかし、それがない一般的な用途としては、例えば「このコホート値の人にこの広告を表示したら効果があった、であればこっちの人にも同じものを表示してみよう」程度の使い方しかできないだろう。 3rd Party Cookie と比べると、非常に精度の低い情報、むしろ役に立てられるかも正直よくわからない。

その点では、必ずしも平等と言えるかは微妙だというのが、筆者の印象だった。

結果としてこの API は提案段階で大炎上するのだが、それはこの不平等さ云々以前に「Google が閲覧履歴を吸い取ろうとしている」という心象的な原因によって起こった。

直近でアクセスした URL のドメイン(eTLD+1)部分しか使わず、その値から URL リストを逆算することもできず、 Google の管理している「センシティブな情報」の URL は除外し、一週間程度で再生成されるが、それでも「気持ち悪い」という心象は拭えなかったようだ。

「我々は最初からこの API をオプトアウトします」といった表明をするサービスが出て、批判するニュースが飛び交った。

そして、 mozilla からは「この値が Fingerprint ベクターになる」というレポートが出たのもあり、結局この API は取り下げられることになった。


### Topics

FLoC の改善版として登場したのが Topics だ。

Topics は、ハッシュの代わりに事前に定義された 350 個の分類(Taxonomy) が返る API になった。分類は以下に定義されている(今後拡張する可能性もあるらしい)。

- topics/taxonomy_v1.md at main · patcg-individual-drafts/topics
  - https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md

毎週履歴を集計し、この値を計算して、その中から 3 つを返す API だ。

あらゆる履歴が対象となるわけではなく、一週間でリセットされ、返る値にはノイズを混ぜ、さらに値を人間が見てわかるようにし、かつエントロピーを下げて Fingerpriting ベクタにならないように調整した結果であることが強調されている。

- patcg-individual-drafts/topics: The Topics API
  - https://github.com/patcg-individual-drafts/topics

API は Privacy Sandbox の中で一番単純なものだ。

```js
await document.browsingTopics()
// ["/Sports/American Football"]
```

このように具体的な値が返ってくれば、どんな広告を出せばいいかは保有する First Party Data に依存しないというフェアネスはある。

ただし、思った以上にさまざまな条件が課せられているため、実際にどのくらい広告に使われるのか/使えるのかは、正直筆者にはよくわからない。


## Standard Position

Mozilla と Apple のポジションを引用しておく。


### Mozilla

- Mozilla: Negative
  - https://mozilla.github.io/standards-positions/#topics

> Mozilla is unable to see a way to make the Topics API work from a privacy standpoint.
> Though the information the API provides is small,
> our belief is that this is more likely to reduce the usefulness of the information for advertisers
> than it provides meaningful protection for privacy.
> Unfortunately, it is hard to identify concrete ways in which this might be improved.


### Safari

- Safari: Oppose
  - https://github.com/WebKit/standards-positions/issues/111

> Our analysis of the proposal assumes full per-top-level-site partitioning
> and no high entropy device fingerprinting such as IP address available cross-site.
> It's important that any pre-existing privacy deficiencies on the web
> not be used as excuses for privacy deficiencies in new specs and proposals.