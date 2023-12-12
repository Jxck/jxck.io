# [cookie][3pca] 3PCA 14 日目: Partitioning

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 14 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は Safari, Firefox で導入され、その後 Chrome によって標準化されつつある、 Partitioning という概念を解説する。


## Partitioning

3rd Party Cookie を塞ぐ上で、「消す」以外にもう 1 つ「分割する」という手法がある。

たとえば、 ads.example の広告を a.example と b.example が `<iframe>` で埋め込む時、 ads.example の 3rd Party Cookie により、埋め込んだ両サイトで同じ Cookie が送られることでトラッキングできるという仕組みだった。

これを、 Top Level Site ごとに分けてしまおうというのが、 Partitioning の発想だ。

つまり、これまでは Cookie を保存したドメインの単一主キーで Cookie が保存されていたとする。

Caption: 単一主キーの Cookie Storage
| Domain      | Cookie   |
|:-----------:|:--------:|
| ads.example | deadbeef |

これを「どのページで」「どの `<iframe>` が」保存した Cookie かという複合主キー(Double Keying)にして、別にしてしまおうという発想だ。

Caption: 複合主キーの Cookie Storage
| Top Level Domain | Nested Domain | Cookie   |
|:----------------:|:-------------:|:--------:|
| a.example        | ads.example   | deadbeef |
| b.example        | ads.example   | facefeed |

これにより、Ads の 3rd Party Cookie は保存されるし、送信もされるが、埋め込んでいるサイトが異なると値が別になるため、トラッキングを防ぐことができるのだ。


## 様々な Partitioning

プライバシーを考慮すると、Partitioning した方がいいのはは Cookie だけではない。

例えば、LocalStorage や IndexedDB などのストレージも同様に、 `<iframe>` 間で共有されるとトラッキングに使用される可能性がある。

また HTTP の Cache もそうだ。 Cache がヒットするということは、一度訪れたことがあるという事実を 1bit の情報で示すため、この微小な情報を集積することでトラッキング制度を高めることもできてしまう。

したがって、基本的にはあらゆる Storage (情報を保存できる場所)は Partitioning されるべきであり、最近ではブラウザのさまざまな場面で Partitioning に関する議論が進んでいる。

HTTP Cache の Partitioning は *Network State Partitioning* や *Cache Partitioning* などと呼ばれ、だいたいのブラウザが似たような実装を進めてる。

Cookie 含めた LocalStorage や IndexedDB その他もろもろは、 *Storage Partitioning* と呼ばれ、この辺はブラウザによって微妙に異なる実装になっている。


## Cookie Partitioning

様々な場所で Partitioning が行われているが、特に Cookie の Partitioning は他よりも難しい。

例えば、SSO の IDP でログインし RP のサイトに遷移した場合、 key が変わるため認証が切れてしまい、再度ログインする必要がでてしまう。 Cache が分かれていても壊れるわけではないが、SSO の仕組みによっては IDP から RP に戻った時に Cookie が切れ、再度 IDP に飛ばされるといったループに入り、最悪ログインできない状態が続く可能性もある。

Safari は ITP の初期バージョンで、トラッカーと判定されたサイトの Cookie を Partitioning する方式を採用していた。しかし、壊れてしまうサイトが多かったため、諦めて元にた経緯がある。

一方、Firefox は ETP(Enhanced Tracking Protection)で Cookie の Partitioning を行い、壊れそうなサイトをヒューリスティクス判定で除外するなどの対策を行っている。しかし、これもやはり除外が難しく、壊れるサイトが出ているようだ。


## Storage Access API

Safari は Partition を諦める代わりに、そこまでに試作していた Storage Access API (SAA) を提供することで、「許可があれば 3rd Party Cookie にアクセスできる」という手段を提供することにした。

SAA は以下のようなシンプルな JS の API だ。

```js
async function storage_access() {
  const hasAccess = await document.hasStorageAccess()
  // Boolean hasAccess says whether the document has access or not.
  console.log({ hasAccess })
  if (hasAccess) return true
  try {
    const result = await document.requestStorageAccess()
    console.log("granted", result)
    return true
  } catch (err) {
    console.error("denied", err)
    return false
  }
}
```

例えば認証連携の場合は、 `<iframe>` に埋め込まれた IDP がこれを呼ぶことで、 IDP のログイン済み Cookie にアクセスでき、 SSO を継続できるといった使い方をする。

この時 `document.requestStorageAccess()` で何が起こるのかは実装次第だが、大きくは 2 つある。

1 つ目は、 Safari が ITP の最初でやっていたように「ユーザインタラクション」があるかを調べる方法だ。

トラッキングを目的として、隠し `<iframe>` などに埋め込まれたリソースには、一般的にユーザは何も操作をしない。しかし、もしそれが埋め込まれたログインページ、動画、SNS ボタンなどであれば、ユーザはクリックやスクロールなど、なんらかの操作をするだろう。

こうした操作を「ユーザジェスチャ」と呼び、ジェスチャがある状態は「ユーザインタラクションがある」とみなされる。この場合は、対象はトラッカーではなく正規のユースケースとして Cookie を必要としているため、ブラウザはアクセスを許可できるわけだ。

2 つ目は、もっと単純に「この `<iframe>` は Cookie へのアクセスを求めている」という許可の Prompt を出すというものだ。Push Notification と同じような、ブラウザが出すポップアップだ。そもそも通知の意味が一般ユーザに伝わるか怪しいく、多くのユーザは反射的に Deny してしまうかもしれないため、扱いが難しいと思われる。

よって、ブラウザはこの辺りを組み合わせながら、あまり簡単に取得できすぎず、しかし適切にユーザの意図を反映し、負荷がある程度低いところを常に探っている。今の実装は、まだ過渡期の可能性を踏まえておいた方が良いだろう。

こうして、Safari は最終的に Partition をやめ、 3rd Party Cookie をデフォルトでブロックしつつ、SAA でユーザが許可していたらアクセス可能、という方向に ITP の舵を切り直した。

今では他のブラウザも実装しており、Firefox はこの時 Resolve されれば、Cookie だけでなく全 Storage API への許可が同時に手に入るといった細かい違いがある。


## CHIPS

SAA は、パーティションをやめて、3rd Party Cookie へのアクセスを求めるために、場合によっては Prompt を出すことにした。

しかし、許可を求めて Deny されるより、 Partitioning でいいから許可を得ずに使いたいという場面もある。

例えば、サイトの右下に 3rd Party のサポートチャットを埋め込んでいるような場合を考えよう。もし 3rd Party Cookie がブロックされると、毎回新規の会話になってしまう。しかし、過去の会話の履歴はなんとか残したい。この場合は、同じサポートチャットを埋め込んでいる別のサービス間で、同じ履歴を共有したいわけではない。

この場合は、 SSA で 3rd Party Cookie を使うよりも、 Top Level ごとに異なる Partitioned Cookie で良いのだ。

確かに、「デフォルトで全ての 3rd Party Cookie を Partitioning する」は失敗したが、「デフォルトで 3rd Party をブロックするが、 Opt-In で Partitioning された Cookie へのアクセスを許可する」っていう方式が、 SSA の代替としてあっても良いだろうということになった。

ここで、それぞれが独自かつ暗黙的にやっていたことを、明示的かつオプトインな API として標準化するために Chrome が提案したのが CHIPS (Cookie Having Independent Partitioned State) だ。

- privacycg/CHIPS: A proposal for a cookie attribute to partition cross-site cookies by top-level site
  - https://github.com/privacycg/CHIPS

CHIPS は Cookie に `Partitioned` 属性を付与することで使用できる。

```http
Set-Cookie: session_id=deadbeef; SameSite=None; Partitioned;
```

`SameSite=None` がついているから、そもそもこれは 3rd Party Cookie だということがわかる。つまり、これは今後デフォルトでブロックされる。

ここに合わせて `Partitioned` を付与すると、 Partition された 3rd Party Cookie にアクセスできるように制限を弱めることができるのだ。

暗黙的に分割して壊れるよりも、明示的にオプトインする方が、開発者としては対応がしやすく、移行パスも明確になる。この仕様は Firefox も Safari も概ね同意しており、おそらくどちらも最終的には暗黙的な Partitioning をやめ、デフォルトブロック + CHIPS or SAA になると思われる。

しかし、こうした変更は特に埋め込みのウィジェットを提供しているようなサービスには影響が大きい。例えば、オンラインホワイトボードを提供する Miro は、 Miro の Cookie を 3rd Party でも送ることで、 `<iframe>` 内にユーザのボードを表示することができた。しかし 3rd Party Cookie Deprecation によって影響を受け、どうするかという内容がまとまっている。

- The end of third-party cookies and its impact on Miro apps and integrations | by Darren | Miro Engineering | Nov, 2023 | Medium
  - https://medium.com/miro-engineering/the-end-of-third-party-cookies-and-its-impact-on-miro-apps-and-integrations-ee73358cda1e

CHIPS では埋め込みごとに Miro にログインする必要があり、 SAA では Prompt が出るという難しさがあるが、現状その方法しかないため、実装を修正し将来のアップデートに合わせて改善していくという内容が書かれている。

まさしく埋め込みユースケースを持つサービスには、参考になるだろう。