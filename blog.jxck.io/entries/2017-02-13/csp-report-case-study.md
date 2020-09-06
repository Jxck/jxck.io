# [csp][security] CSP Report 収集と実レポートの考察


## Intro

このブログで CSP レポートの収集を開始してもうすぐ 1 年になる。

現状、対象ドメイン内で `<input>` は一切提供しておらず、大半が静的に生成されたページであるが、この条件でも、かなり多くのレポートが集まった。

今回は、収集した実際のレポートを例に、攻撃ではないと思われるレポートとしてどういったものが送られて来たかを中心に、その内容やレポーティングサーバ、 CSP の運用に関する現時点の考察についてまとめる。


## 収集目的

CSP の基本は、意図しないリソースの読み込みや、 Inline Script の実行を防ぐことにある。

例えば、エスケープ漏れにより XSS が発生し、悪意のある Inline Script が埋め込まれた場合でも、 Inline Script を禁止するポリシーを適用したページでは、その実行はブラウザによって Violation(違反)と判断されブロックされる。

これによって、対策漏れにより発生してした XSS の発動を水際で防ぐことが可能となる。

しかし、本質的な CSP の責務は「*ポリシーに照らし合わせた違反のブロック*」であり、その「*ポリシーの違反が攻撃とは限らない*」という点には注意が必要だ。

例えば、 Web を閲覧するユーザの中には、以下に挙げるような方法で、 DOM を変更し自分にあった閲覧環境を実現している場合がある。

- ブックマークレット
- ブラウザ拡張
- ローカルプロキシ
- スクリーンリーダ
- etc

実装によっては、これらがサーバ側で定義された CSP ポリシーに違反する場合もあるだろう。しかし、だからといってこれらをブロックしてしまっては、ユーザに不便を強いる可能性がある。

しかし、実際どういったポリシーがどういったユーザに不便を強いる可能性があるのかは、 CSP をデプロイしてみないとわからない。

そこで、比較的に技術リテラシーの高いユーザが閲覧していると予想される本サイトに対して、去年の 3 月から CSP を適用しレポートの収集を実施することにした。

[Content Security Policy(CSP) 対応と report-uri.io でのレポート収集 \| blog.jxck.io](https://blog.jxck.io/entries/2016-03-30/content-security-policy.html)

なにより重要なのは、 *このサイトはほとんど全てが静的に生成されており、かつ `<input>` フォームが無い* という点である。

この条件で XSS に準ずる攻撃を成立されるのは難しいだろう。できたとしても、それをするメリットはかなり低いし、実際に攻撃は観測していない。

つまり、このサイトで収集した CSP 違反のレポートは、ほとんどが設定ミスかユーザの閲覧環境に起因するものであるだろうと推測できるため、ここから、リアルワールドにおいて本質的に攻撃では無いポリシー違反がどの程度発生するのかを知る上で参考になると考える。

今回はそのレポート収取の結果と、運用に当たって気づいたノウハウについて紹介する。


## 基本構成

まず、設定および構成について述べておく。

本サイトは `*.jxck.io` ドメインを使い、複数のサブドメインを運用している。

`labs.jxck.io` だけは(CSP に違反するデモを含む)、脆弱性デモを含む様々なデモを置いているため、対象外として扱う。

CSP は全て Report-Only で HTTP ヘッダから適応しており、 CSP レポートを収集している。

現状は以下である。(まだ改善点はある)


```http
content-security-policy-report-only:
  default-src 'self'
              https://jxck.io
              https://*.jxck.io
              https://www.google-analytics.com;
  child-src   https://blog.jxck.io
              https://www.youtube.com;
  connect-src wss://ws.jxck.io;
  report-uri https://jxck.report-uri.io/r/default/csp/reportOnly
```

ポリシーは `default-src 'self'` の設定を基本として、レポートを集めながら try & error で更新した。

レポート送信のエンドポイントは `report-uri.io` を使っていたが、後述するように今は自前で立てたサーバに移行している。


## 全体像

以下が CSP をデプロイしてから、今月までのレポート発生のグラフである。

![report-uri.io で生成した過去 12 ヵ月の CSP レポートのグラフ](graph-of-csp-report-12month.png#2642x786 "graph of csp report 12 month")

まず最初の期間は、コンテンツ自体の更新も多く、ポリシーを修正する期間だったためレポートが多い。

その後も、コンテンツの更新(AMP の対応、 YouTube 埋め込みの対応 etc) を行うたびに設定の更新が必要になるため、ところどころ山がある。

しかし、全体として、定常的にレポートが上がっており、コンテンツが安定ている今でも、レポートがなくなることは基本的には無いことが分かる。


## Report Case Study

次に個々のレポートを細かく見た結果、よく発生していたものについて紹介する。


### DOM Change by User

Bookmarklet などから DOM を変更することで、ページそのものをカスタマイズしたりするユーザや、 Devtools からこのサイト上で色々試したりするユーザもいるだろう。

一例として、以下のレポートは、 CSP の指定範囲外オリジンから jQuery を埋め込んだことによるレポートと思われる。


```json
{
  "csp-report": {
    "document-uri":        "https://blog.jxck.io/entries/...",
    "referrer":            "https://blog.jxck.io/",
    "violated-directive":  "script-src",
    "effective-directive": "script-src",
    "original-policy":     "default-src 'self' https://jxck.io...",
    "disposition":         "report",
    "blocked-uri":         "https://code.jquery.com/jquery-3.0.0.min.js",
    "line-number":         1,
    "column-number":       108,
    "status-code":         0
  }
}
```

こうしたレポートは非常に多い。


### Extension

以下のレポートは、ブラウザ拡張がブロックされたであろうと想像される。

画像について何か改変をしているようだが、詳細はわからない。


```js
{
  "csp-report": {
    "document-uri":        "https://blog.jxck.io/entries/...",
    "violated-directive":  "default-src 'self' https://jxck.io ...",
    "effective-directive": "img-src",
    "original-policy":     "default-src 'self' https://jxck.io ...",
    "blocked-uri":         "ms-browser-extension",
    "status-code":         0
  }
}
```

こうした拡張を通じた DOM の改変が起こる可能性として、以下のような場面があるだろう。

- Reader View Mode
- Screen Reader
- Outline Viewer

Safari の Reder View と、 Firefox の Screen Reader 拡張である JAWS については、特に問題がなさそうなことを確認してる。

しかし、これらも実装次第ではあると思うので、もっと幅広い検証が必要かもしれない。


### Browser Inline Style

本サイトでは記事の原稿を Markdown でも閲覧できる。また RSS feed は XML で提供し、 humand.txt や robot.txt は Text で提供している。

こうした `.md`, `.txt`, `.xml`, `.json` などのページをブラウザで表示すると、ブラウザによってはそれを内部的に HTML に整形して表示する。

このとき、 HTML の中にある Inline Style がポリシー違反と判定されるため、レポートが上がる。

![Chrome でテキストを表示すると、整形のために埋め込まれた HTML が CSP 違反を起こす](chrome-inline-style-violation.png#1667x656 "inline style violation for RSS feed in chrome")


```js
{
  "csp-report": {
  "document-uri":        "https://jxck.io/humans.txt",
  "referrer":            "",
  "violated-directive":  "style-src",
  "effective-directive": "style-src",
  "original-policy":     "default-src 'self' https://*.jxck.io...",
  "disposition":         "report",
  "blocked-uri":         "inline",
  "line-number":         1,
  "status-code":         0
  }
}
```

これはもちろん悪意のあるポリシー違反でないため、本サイトではこの種のコンテントタイプのページへは CSP を適用しないこととした。


### Firefox view:source

本サイトは技術者向けの内容が多いため、このサイト内の HTML ソースをブラウザで表示する閲覧者も多い。

Firefox ではソースを表示すると、オリジンが `view-source://~` となるため、このページが CSP 違反となりレポートが上がる。

Chrome でも同じくオリジンが変わるが、ここでレポートはあがらない実装になっているようだ。

![Firefox の view-source:// でソースを表示すると、整形のために埋め込まれた HTML が CSP 違反を起こす](firefox-view-source-violation.png#1674x824 "view-source:// violates csp policy in firefox")

これは対応せず無視することとした。


### about:blank_

なんらかの操作によって、コンテキストが `about://blank` になりオリジンの違反としてレポートがちょくちょく来る。


```js
{
  "csp-report": {
    "document-uri":        "about://blank",
    "violated-directive":  "default-src 'self' https://jxck.io...",
    "effective-directive": "img-src",
    "original-policy":     "default-src 'self' https://jxck.io...",
    "blocked-uri":         "data",
    "status-code":         0
  }
}
```

おそらく `<a>` のリンク先をいじる何かなどで発生しているのではないかと考えてはいるが、これも無害として無視している。


## Reporting Server

CSP のレポート収集サービスとして、 [report-uri.io](https://report-uri.io) がよく紹介され、本サイトでもこれを用いてレポートを収集していた。

無料で使うことができる点で導入の敷居が低いのは良かったが、現在は以下のような理由でもう使っていない。

- レポートをエクスポートできない
- 半年以前のレポートが検索できない(内部的に消されている?)
- HTTP のヘッダを見ることができないので細かな解析ができない
- エンドポイントのレスポンスが悪く、一つのページが複数のレポートをあげると詰まって 5xx が返りレポートを取りこぼす
- レポート検索/閲覧の UI が非常に見辛い

Reporting Server は、小さい JSON ファイルが POST で受け取れる単純な API であれば良いため、自分で自作することとした。

それなりのサービスであれば、ログなどを解析/可視化する基盤(graphite, kibana, ES, BigQ, mackerel etc) があると思うので、エンドポイントを自分で立ててそこに流し込むのが良いだろう。

また、もし自分でエンドポイントを実装する際には、以下の点に注意して実装するのが良いと思われる。

- report-uri は非推奨なので、 [report-to](http://wicg.github.io/reporting/) を前提として設計
- レポートには UA やタイムスタンプはないので、必ず HTTP ヘッダ(全体)を一緒に保存する
- 意図しないリクエストを `content-type: csp-report` で間引きたくなるが、[準拠してないクライアント](https://www.tollmanz.com/content-security-policy-report-samples/) もあるようなので注意が必要

report-uri から report-to への変更で、 CSP 以外も含めたレポート送信が Reporting API に統合される。

ここではヘッダ指定のしかたから、 Cookie の扱いなど色々変わりそうなので、本サイトで実装を終えたら追って解説しようと思う。


## 考察

レポートの中には、聞いたことがあるサービスの URL などが入っている場合もあるので、サービス連携によって発生したものもあるようだ。

その他にも多種のレポートが上がって来るが、大抵のものはレポートだけでは実際に何が原因で発生したのかを知るのは難しい。

もちろん、 Report-Only を外してそれらをブロックしていたら、ユーザがどのような体験をしていたかも、ほとんどわからない。

想像通り、 `<input>` が無い本サイトでもこれだけのレポートが来ていることから、 `<input>` によりユーザの入力を受けつけるサービスでは、より多くの違反が観測されるだろう。

そして、攻撃では無いポリシー違反を許容するためには、ポリシーを逐一更新して縛りを緩くしていく以外に方法はなく、一方で緩くすればするほどポリシーに穴ができ、実際の攻撃が発生した際に役に立たなくなる可能性がある。

CSP によるブロックは、かなり堅牢な防御となる一方、多くのユーザに影響を与えるもろ刃の剣でもある。

それでも、 [github](https://github.com) や [twitter](https://twitter.com) は既に Report-Only 無しで CSP を運用しているため、ユーザのフィードバックを反映しながら、ポリシーの精度を向上し徐々に適用していけば、 Report-Only なしの運用も決して無理ではないだろう。

一方、レポートが収集できること、それを解析してサービス上で何が起こっているかが分かるだけでも、何もわからなかった従来と比べれば大きな進歩であると感じている。

そこで、 Report-Only を外すことを目的にポリシーを緩めるのではなく、厳しい CSP を Report-Only で運用する方針も決して無くはないだろう。

そもそも CSP は、それのみで攻撃を防ぐのでは無く、従来通りのセキュリティ対策を行った結果、意図せぬ漏れを埋めるために追加で行う対策である。

レポートから攻撃の脆弱性を早期に発見して、速やかに実装の改善に反映できるのであれば、それでも十分に価値があると筆者は考える。

report-uri.io を使っていたために、過去のレポートの解析などがかなり制限されてしまったのが心残りだが、自前のサーバに移行したことでより詳細に解析することができるようになったため、今後もレポートの観察を続け、何かあったらアップデートしたい。


## 参考

この辺の話を発表した資料

- [CSP による防御とリアルワールドレポート収集](https://speakerdeck.com/jxck/csp-and-real-world-reporting)
- [CSP a Powerful Security Steroid (上の拡充版)](https://speakerdeck.com/jxck/csp-a-powerful-security-steroid)
