# [reporting observer][report-to][reporting] ブラウザで何が起こっているのかを知る Reporting API と ReportingObserver


## Intro

Web サービスにおいては通常、 Web サーバから取得できるアクセスログやエラーログを取得し解析する基盤を保有するだろう。

しかし、 Web サーバから取得できる情報だけでは、ブラウザで何が起こったのかを知るのは限界がある。

今回は、ブラウザ内で起こったことを知るための Reporting API と、その Report の収集について解説する。


## Notice

本記事の大半は 1 年以上前に書いたものだが、そのころは仕様も実装もまだまだ落ち着きが無かった。

- 仕様
  - report-uri から report-to への移行期
  - JFV の採用への不安
- 実装
  - ディレクティブの実装がバラバラ
  - ReportingObserver では取れるが default group に自動では飛ばない(未実装)
  - ReportingObserver で取った report が JSON Serialize できない(バグ)

そこで時期焦燥かと思い寝かしたが、進捗を見てるとあと数年は寝かすことになりそうだった(特に JFV->SH)。

そんななか、最後のバグについて報告した issue が、 1 年がかりくらいでやっと修正された。

- [917945 - Reports from ReportingObserver aren't JSON Serializable](https://bugs.chromium.org/p/chromium/issues/detail?id=917945)

先日 Chrome80 でやっと挙動を確認したため、これを期にこの記事を公開することにした。

多くの問題がまだ解決しているとは言えず、実装もまだまだであるため、 Reporting 全般の途中経過だと思ってほしい。


## Reporting API

いくつかの話が関わるので、一度全体像をまとめる。

Reporting API は、簡単に言えば「ブラウザの中で起こったこと」を情報として取得する API だ。

- [Reporting API](https://w3c.github.io/reporting/)

この仕様には Report の取得方法と言った全体の枠組みが定義されており、実際に取得できる情報は、目的ごとに別の仕様ができる(後述)。

Report の取得方法は大きく 2 つある。

- Report-To Header で指定したエンドポイントに、ブラウザが JSON で送る
- JS で ReportingObserver から取得しハンドリングする

いずれも、基本的には JSON にシリアライズしてサーバに送ることになるだろう。

つまり、サービス側はその JSON を収集するエンドポイントを保有することになる。

JSON を集めるだけなので、エンドポイントの実装はそこまで難しくない。

問題はその解析だが、そこにはまだ課題が多いように筆者は感じている。


## Reporting API の経緯

筆者の観測では発端は CSP からだ。

CSP で定義したポリシーに違反があった場合、その原因をブロックすると同時に、違反があったことを知りたいという要望があった。でなければその問題に対して認識/対応ができないからだ。

そこで、 CSP ヘッダに指定するためのディレクティブとして、 Report を送信する先を指定する `report-uri` が定義された。


```http:./1.http
```

CSP は JS の実行をブロックする場合があるので、その Report は JS で収集するより、ブラウザが直接送信する方が理にかなっている。

その後、他にも Report 送信を伴う API が提案された。

すると、個々のヘッダに report-uri を書くより、 Reporting エンドポイントをまとめて記述できる Report-To ヘッダを定義し、各 Policy がそれを参照する形に整理するという方向になった。

([Feature-Policy の report-to 対応は議論中](https://github.com/WICG/feature-policy/issues/142))


```http:./2.http
```

一方、他にも取得したい情報は増え、 Policy Header + Report-To よりも、 JS でハンドリングするほうが望ましいケースも現れ、  JS API も Export することになった。

互換性の面でも、セマンティクスの面でも、 Report は Error ではないため、 Error を throw するようなモデルは使えない。代わりに Interface は昨今の流れに則り Observer で提供され、 opt-in で取得する設計が採用された。

Report は JSON シリアライズ可能な形式で提供されるため、 Beacon API や Keep-Alive Fetch で送ることになるだろう。


```js:./3.js
```

こうして、 Report-To ヘッダ、および Reporting Observer は Reporting API という仕様にまとめられ、 Report を送る他の API から参照される形に整理され、今に至る。

report-to や report-uri, Reporting Observer など複数の仕様があるのはこのような理由による。


## Reporting API by HTTP Header

Report-To ヘッダは、 Reporting エンドポイントの情報を一括して定義する HTTP Header だ。


### Report-To header


```http:./4.http
```

このヘッダの値は、 JSON 形式([JFV](https://tools.ietf.org/html/draft-reschke-http-jfv))が採用されている。

1 つのグループは以下のメンバーを持つ

- group(optional): グループの識別子で、他のヘッダの report-to ディレクティブで指定される。デフォルトは "default"
- include_subdomains(optional): サブドメインまで伝搬させる。
- max_age(required): グループの有効期間。 0 にするとブラウザからグループが消える。
- endpoints(required): エンドポイントの配列
  - url(required): エンドポイントの URL
  - priority(optional): 数値が小さいほうが優先され、落ちていた場合は次点にフェイルオーバーする
  - weight(optional): 重みに応じて負荷分散をする

また、グループを複数指定するとき、配列のように記述しつつも前後の `[` と `]` は [省略](https://w3c.github.io/reporting/#header) する点に注意したい。

上記の例は、 endpoint を 1 つ持つ `default` グループと、 CSP 用に 2 つのエンドポイントを持ち、負荷分散とフェイルオーバーを構成した `cap-endpoint` の 2 つがある。

- [Intent to implement: report-to header as part of Reporting API](https://groups.google.com/forum/#!msg/mozilla.dev.platform/7dykNEdqvzA/DWcGTm4tDwAJ)


### jfv から structured header へ

jfv は、ヘッダの値に統一された構造化を持ち込もうと、 JSON をベースとして始まったドラフトだ。

しかし、 JSON よりも独自に構造を定義した方が良いのではという流れで、対案として SH (Structured Header) が提案された。

- [JFV](https://tools.ietf.org/html/draft-reschke-http-jfv)
- [SH](https://tools.ietf.org/html/draft-ietf-httpbis-header-structure)

なお、 IETF 的には [JFV よりも SH が良さそう](https://lists.w3.org/Archives/Public/ietf-http-wg/2016OctDec/0505.html) という雰囲気に結構前になっている。

そこで、 Reporting も SH に移行するという方向になっている。

- [Switch reporting to Structured Headers - Issue #177 - w3c/reporting](https://github.com/w3c/reporting/issues/177)

[Mozilla](https://github.com/w3c/reporting/issues/158) も、他で使うかわからない JFV よりも SH が良いという話をしているので、おそらくそうなるだろう。

よって、ここまでに書いたことも、将来また変わると思ったほうが良い。

場合によっては、また Report-To 以外のヘッダが出たりする可能性もあるので、そういう面倒を避けたいなら、導入はもう少し待っても良いかもしれない。


### report-to directive

現在の仕様で Report-To を参照できる仕様は以下があるが、今後も増えていくだろう。

- Content-Security-Policy
- Feature-Policy (仕様策定中)
- Network Error Logging
- Deprecation Report
- Intervention Report
- Crash Report

CSP や Feature-Policy は、明示的に Report-To を指定する。

一方、 Deprecation/Intervention/Crash などは、 API を持たずにブラウザが自動で生成するため、 Report-To に default group があれば自動で送信される。

(仕様上はそうだが、実装されているブラウザはまだない)

したがって、 Report-To だけを設定しておくということも考えられる。


```http:./5.http
```

### Reporting Request

ブラウザ自身が送信する Report リクエストの概観は以下のようなものになる。

- [4.5. Attempt to deliver reports to endpoint](https://w3c.github.io/reporting/#try-delivery)


```http:./6.http
```

受信するエンドポイントは以下を想定する必要がある。

- HTTP メソッドは POST
- Content-Type は application/reports+json
- Body は JSON (配列始まり)
- Cookie は付与される
- Preflight 有り CORS

特に Preflight には色々と議論があったが、最初はブラウザが生成し外から介入できない限定的なリクエストであるため、 Fetch の仕様に例外を設けていた。

しかし、やはりバイパスするようなことはせず CORS を遵守すべきということになり、 Preflight を送ることになった。

- [Are report uploads supposed to send CORS preflights? - Issue #41](https://github.com/w3c/reporting/issues/41)

執筆時の Chrome や Fetch の Spec からは、 Preflight は無いように見えるが、 *これから Reporting Endpoint を作る場合は Preflight を前提にすべき* と言える。


## Reporting Observer

ReportingObserver は JS で report を取得する API だ。

- <https://w3c.github.io/reporting/#observers>

サンプルを再掲する。


```js:./3.js
```

(この JSON.stringify ができなかったために、修正前は自分で Serialize するロジックを [ワークアラウンド](https://github.com/Jxck/jxck.io/commit/4a0cdc168a73e40fcb88a1fe74f6ae62b40750fa) として入れて収集していた)

JS で取得するため、 JS が動いていることが前提だ。

つまり、 CSP や Crash ではなく deprecation/intervention など軽微な Report を取得する。

仕様どおり "default" group に自動で送られるため、 UI でフィードバックを表示でもしない限り JS で取得する必要はあまりなさそうに思う。

本サイトでは、自動で "default" group に送られるようになるまでの間、 JS で収集する。


## Report

すでにいくつかの Report が提案/実装されている。

現時点で把握しているものを紹介する。


### Deprecation Report

ブラウザで deprecate された API を呼び出している場合に発生する 。

特に古い API の deprecate/remove は段階ごとにアナウンスされるが、それが自身のサービス内でどの程度の影響があるかなどを正確にするのは難しい。

この report を収集すれば、サービス内のどのソースファイルの何行目でそれが使われているかまでわかるため、非常に有益な情報となる。

なお、本サイトでは Chrome の拡張である [HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin/related) から `chrome.loadTimes()` を呼んでいるという Report が最も多く送られてきている。


```js:./7.js
```


### Intervention Report

Intervention とは、ブラウザが特定の挙動を変更するような介入を行うことである。

- <https://github.com/WICG/interventions>

例えば、 ontouch イベントにハンドラが割り当てられている場合、スクロールするたびにハンドラが実行されてしまい、画面のレスポンスが悪くなる。

そこで、 ontouch イベントのハンドラは、ブラウザが勝手に PassiveEventListener として扱うといった挙動を Intervention という。

開発者は、この事実を Report として知ることで、ハンドラを PassiveEventListener にするといった実装の見直しを検討することができる。

今後こうした Intervention も増えていきそうな流れがある。

- [Intent to Ship: Intervention Reports](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sQrAZpTA8WI/EWC7W6GOCwAJ)


### Network Error Logging

その名の通り Network Error が発生したことを取得できる。

主に HTTPS のエラーを収集することを目的としている。

- [Intent to Ship: Reporting and Network Error Logging](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nNji_u7BRxo/Zh8Y9hRlBAAJ)


### Crash Reports

なんらかの理由で画面がクラッシュした時に送られる Report である。

おそらく Tab レベルのクラッシュまでだろうと思うが、まだ Report を見たことがないため、細かい挙動はまだわからない。

- [Intent to Ship: Crash Reports (via Reporting API)](https://groups.google.com/a/chromium.org/forum/#!searchin/blink-dev/crash$20reports%7Csort:date/blink-dev/ryK8SHcBzZw/uwkgibBvBQAJ)


### CSP Violation

以前から report-uri/report-to で対応していた CSP の violation も、 ReportingObserver で取得できるようにする Intents が出ているが特に進んではいないし、 Report-To で集めれば良い。

- [Intent to Implement and Ship: CSP violation reports observable by ReportingObserver](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/dBc_epXL-r4/XhhajwQVBQAJ)


### Feature Policy Violation

Feature Policy も violation が発生した場合にその事実が知りたいが、仕様には含まれていなかった。

[提案](https://github.com/w3c/webappsec-feature-policy/issues/142)したところ、  Reporting への[対応](https://github.com/WICG/feature-policy/blob/master/reporting.md)が入ることになり、 Chrome は Intents が出ている。

- [Intent to Implement: Feature Policy Violation Reporting](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5-3woY4Y1Qg/xHDTmUFAEAAJ)


### SXG

SXG の証明書検証などが発生した場合に distributor に知らせるための Report 。 Network Error Logging を継承している。

- [Intent to Ship: Signed Exchange Reporting for distributors](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bHo6cy9qKuw/6xqZt_1LAAAJ)


## Report の収集と解析

サービス提供者からすれば、 Report を収集し解析する目的は、自身のサービスの状態の把握になるだろう。

しかし、実際に集められているのは「ブラウザで起こったこと」であり、そこにはユーザの閲覧環境ごとに様々なことが起こっていることがわかる。

- 拡張やプラグインに起因した Report
- bookmarklet やユーザスクリプトに起因した Report
- ブラウザの挙動に起因した Report
- 単体ではなぜ起こったのか全く読み取れない Report

例えば、本サイトでは [CSP Report を 4 年ほど収集](https://blog.jxck.io/entries/2016-03-30/content-security-policy.html) しているが、ほぼ純粋な静的サイトであるにも関わらず、日々かなりの CSP Report が日々送られてくる。

また、 ReportingObserver から収集する JS と google analytics 以外にほぼ JS を使ってないのにも関わらず、大量の DeprecationReport が送られており、ほとんどは Chrome 拡張に起因したものである。

そんな本サイトですらこの状況なので、今日一般的な、複雑な JS を駆使し、多くのインタラクションを可能とし、攻撃者が興味を持つようなサービスであれば、より多くの Report が様々な理由で送られてくることが容易に想像できる。

つまり、 Reporting Endpoint に求められるのは、単なる JSON の収取だけでなく、その結果から本当に重要な内容を見落とさずに取り出し、本質的な問題を特定する解析基盤となる。

元が機会可読で、ある程度クレンジングの終わったデータセットであることから、単なるパターンマッチで解析することも不可能ではないが、ブラウザの更新に応じて日々 Report は変化して行くため、メンテナンスは難しい。

そこで、迷惑メール除去と同種のフィルタリング技術からのアプローチで、機械学習にかけていく方向になっていくだろう。

今後、手元に集まったデータセットを元に教師データを作りながら、教師あり学習でうまく行かないか試行錯誤してみたいと考えている。

同時に、 Web のエコシステムでもそうしたサービスやライブラリが提供され、知見が共有されて行くことに期待したい。

特にモニタリングサービスなどを提供している各位は、ぜひフィルタリングも含めた Reporting 収集解析基盤の提供を検討いただければと思う。


### まとめ

- Report を収集することでブラウザ上で起こっていることが細かくわかる
  - サービスの改善に役立てることもできる
  - 今後 Report に対応するものは増えていくだろう
- まずは収集基盤の整備
  - JSON を POST で受けるだけなので作るのは難しくない
  - CORS の場合は Preflight 対応を入れる
  - 収集よりも解析が重要
- 仕様面
  - まだまだ安定とは言えない
  - 機能ごとに指定の仕方が違うなど面倒な部分も多い
  - 今後整備されていくため、それを待つのも手
  - 全部入れず CSP など効果のあるところから入れるのも手
- 実装面
  - あいかわらず Chrome が手動
  - JS だけ/ヘッダだけ、など機能ごとの対応もまばら
  - シリアライズできないバグが 1 年放置されるくらいのプライオリティ感
- エコシステム
  - モニタリングサービス系がそろそろ Reporting のサポートを始めてほしい
  - 機械学習方向からの解析方法が普及してほしい

またしばらくして進捗があったら、更新を書きたい。
