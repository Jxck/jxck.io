# [coop][coep][corp][corb][isolation][spectre][security] Site Isolation 及び Web のセキュリティモデルの更新


## Intro

Origin は Web におけるセキュリティモデルの一つとして、コンテンツ間の Communication に関する境界を定義し、リソースを保護してきた。

しかし、 Spectre の発覚以降、  Communication に関する制限だけではなく Isolation によるメモリレベルでのアクセス制御が必要となった。

そこで現在作業されているのが、 CORB, CORP, COEP, COOP といった仕様群であり、これは Web におけるセキュリティモデルの更新作業と見ることができる。

概要と現状について解説する。


## DEMO & Resouces

量が多いため、動作する DEMO と関連リソースは、ページ下部にまとめてある。


## CORS による Cross Origin Communication の制限

CORS は、平たく言えば、リソース提供元(サーバ)が、クライアントのリクエストに対し、その Origin に基づいてアクセスの許可を判断する、アクセス制御の仕組みである。

この CORS が定義されたことにより、それまで SOP のみに限定されていたリソースの共有が、 JSONP といったハックを使わずに、明示的な Opt-In によって Cross Origin で可能になった。

CORS が明示的であるとは、裏を返せば暗黙的に別 Origin のリソースを、提供者の許可なく読み出すことはできないことを意味し、それによって Web は成り立っていた。

この前提が崩れたのが Spectre の登場だ。


## Spectre は何が問題だったのか

Spectre の説明を CPU の脆弱性の話からするのは長くなるので、 Web Facing な部分だけを筆者の理解でかいつまむ。

簡単に言えば、本来アクセスできないはずの「別プロセスにあるメモリ」を、 CPU の投機的実行という特性を利用してキャッシュに載せ、それを推測することでアクセスできるという脆弱性だ。

それ自体は OS や CPU の対応が必須となり、「別プロセスのメモリ」にはアクセスできないように、一部(全部かどうかはよくわからない)は対策がされた。

それでも、「同じプロセスにあるメモリ」で本来は読めないようになっているものは、工夫次第では読めてしまう可能性が残っている。

そして、その攻撃が一番再現しやすいのが、 URL にアクセスするだけで様々なコードが実行できる Web だったというわけだ。


## Spectre と Web

典型例として、あるブラウザの設計が `<iframe>` に読み込まれた別 Origin のリソースを、 window と同じメモリ内に展開する作りになっていたとしよう。

Cross Origin Iframe の中身は、 JS から直接触ることができない。しかし、ある CPU の投機的実行という特性を利用すると、キャッシュに載せることができる。

アクセスを試みて、早ければキャッシュにあり、遅ければキャッシュにない、この時間を正確に計測して繰り返せば、徐々にキャッシュに載っている情報を推測できる。

これを利用して、ユーザを攻撃ページに誘導し、そのユーザの Cookie が無いと取得できないデータを `<iframe>` に読み、時間をかければ中身を推測できるという攻撃だ。

本来アクセスできない情報を外から推測することをサイドチャネル攻撃と呼び、その中でも特に時間という要素を利用する攻撃をタイミング攻撃と呼ぶ。今回の場合はそのどちらでもある。


```html
<!-- 攻撃者が用意した罠サイト -->
<title>attacker site</title>

<!-- ユーザを滞在されるためのダミーコンテンツ -->
<h1>dummy contents</h1>

<!--
  ユーザの Cookie が送られるため、ユーザのメールボックスが読み込まれる
  JS で直接アクセスはできないが、内容は同じメモリに展開される
  この iframe を隠しておき、時間をかけて中身を推測する
-->
<iframe src=https://mail.example.com></iframe>
```

これが Spectre による攻撃のざっくりした部分だ。

これを本質的に解決するには、ブラウザの作りを根本的に直すしか無いが、それは時間がかかる。

しかし、 Web は URL にアクセスするだけで、全てのユーザがこの攻撃に晒される危険性があるため、なんとかしないといけない。

そこで、ブラウザベンダは対処療法として、攻撃者が推測に必要とする「高解像度で時間を測れる API」である `performance.now()` の精度を下げ、「工夫次第で同じく高解像度で時間が測れる」 `SharedArrayBuffer` を無効にすることにした。

これは、互換性を壊しているわけだが、ユーザの安全を守るためにはしかたない。とはいえそのままにしておくこともできない。

そこで、根本的な解決として理想的には「違う Origin のデータを同じメモリ内に読み込まない」状態にするための対応を始めた。

これが Site Isolation などと呼ばれているものだ。


## Site Isolation

Site Isolation は、メモリの分離のためにプロセスアーキテクチャをいじる必要があり、ブラウザにとっては大工事だ。

ブラウザによってやり方が違うが、 Chrome の場合についてみておく。

Chrome はそもそもマルチプロセスなアーキテクチャになっており、具体的には 1 tab が 1 process (renderer process) で分離されていた。

プロセスが違えばメモリ空間が違うため、別のタブの内容を読み出すことは Spectre のようなサイドチャネルアタックはできない。

しかし、 `<iframe>` を同じタブの中に展開する場合、読み込んでる Origin が違っても同じ Process 内で展開されるため、サイドチャネル攻撃が可能だった。

そこで、 `<iframe>` などもきちんとプロセスを分離するというのが Chrome における Site Isolation となる。

Chrome はこれをマージするまでに 6 年近くかかったらしい。

- [Google Online Security Blog: Mitigating Spectre with Site Isolation in Chrome](https://security.googleblog.com/2018/07/mitigating-spectre-with-site-isolation.html)

これは 6 年前から Spectre が裏で共有されていたという意味ではなく、別の理由で必要な作業として行われていた。

特に V8 などにバグがあった場合に、そこから Renderer Process が掌握されても、その影響範囲を限定できるように実施されていた。それが Spectre 対策でも有効なことがわかったので、スピードアップしてマージしたという流れらしい。

これにより Spectre の発生をかなり抑えることができる。

同じことは Firefox なども取り組んでいるが、そもそも先発のブラウザは、シングルプロセスな作りから始まったものが多いため、対応が簡単とは限らないため、 Site Isolation をブラウザそのものがネイティブに対応し、全てのリソースを分離するのは難しい場合もある。

そこで、リソースごとに Opt-In で Site Isolation に対応するためのいくつかの仕様が提案されている。


## CORB

`<iframe>` 以外にも、 Cross Origin なリソースを同じプロセスに展開する方法が知られている。

例えば、ユーザが Cookie を持っているときにのみ取得できる JSON や HTML があったとする。

これらを `<script>` や `<img>` で読み込めば、メモリ上に展開できる。


```html
<!-- 攻撃者が用意した罠サイト -->
<title>attacker site</title>

<!-- ユーザを滞在されるためのダミーコンテンツ -->
<h1>dummy contents</h1>

<!--
  ユーザの Cookie が送られるため JSON が読み込まれる
  JSON を展開しただけでなにもおきないが、メモリには展開されている
-->
<script src=https://admin.example.com/secret.json></script>

<!--
  ユーザの Cookie が送られるため HTML が読み込まれる
  HTML を img で読み込んでるのでパースは失敗しエラーになるが
  メモリには展開されている。
-->
<img src=https://admin.example.com/secret.html></img>
```

一度メモリに展開できれば、前述のように Spectre で読み出せる可能性がある。

こうした読み込みは、基本的には攻撃にしか使われないため、これらをブロックすることはサイドチャネル攻撃の抑止に繋がる。

CORB はこうしたコードで意図しないリソースがメモリに展開されることを防ぐ仕組みだ。

具体的には以下のような request destination について

- "image" (`<img>`, `<image>`,  `background-image`, favicon.ico etc)
- "script" (`<script>`, `importScripts()`, `navigator.serviceWorker.register()`, `audioWorklet.addModule()`) etc.
- "audio", "video", "track"
- "font"
- "style"
- "report"

そこから発生したリクエストに対するレスポンスの Content-Type が

- HTML (text/html)
- XML (text/xml, application/xml, etc)
- JSON (text/json, application/json, etc)

だった場合に、そのレスポンスの header/body を空にするという仕様だ。

ブラウザが勝手に行う intervention であるため、特にヘッダなどを付けるわけではない。

実際の条件はもう少し複雑で `X-C-T-O: no-sniff` がない場合は、 Sniffing を行わなければ壊れるサイトがある(html として img を配信してる etc)ため、色々と場合分けが必要なようだ。

- [Cross-Origin Read Blocking (CORB)](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md)
- [Cross-Origin Read Blocking for Web Developers - The Chromium Projects](https://www.chromium.org/Home/chromium-security/corb-for-developers)

また、これにより Prefix を付けてパースを抑制し XSSI を防ぐ場面も、 CORB のスコープに入っている。

- [AngularJS: API: $http](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)

基本的に CORB が発生するのは、攻撃のような場面しか無く、これによって既存のサイトが壊れることはほぼ無いはずだ。


## CORP

CORB は既存のサイトを壊さない範囲で、 Intervention としてサイトが実施しているため、対象外が多く有る。

例えば、 `<script>` から JS へのリクエストであれば成功してしまう。

そこで、 CORB と同等のことを Opt-In で行うのが Cross-Origin-Resource-Policy(CORP) だ。

そのヘッダが付いたリソースが、どの Origin から読まれて良いかを決める。


```html
<!-- 攻撃者が用意した罠サイト -->
<title>attacker site</title>

<!-- ユーザを滞在されるためのダミーコンテンツ -->
<h1>dummy contents</h1>

<!--
  ユーザの Cookie が送られるため JS が読み込まれる
  これは CORB では防げない。
-->
<script src=https://admin.example.com/secret.js></script>
```

この secret.js に対して以下のいずれかのヘッダをつける。


```http
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Cross-Origin-Resource-Policy: cross-origin
```

same-origin や same-site を指定すれば、ブラウザは secret.js のレスポンスヘッダを見た時点で、メモリへ展開してよいかどうかをブラウザが判断できる。

どんなレスポンスにも使えるため、 CORB で守られないものも守ることができる。

省略されているものは暗黙的に cross-origin になっている状態と言え、これまで通りどのページからも読み込める。

しかし、今後後述する COEP のことを考えると、 CDN のようにどの Origin からも読み込めるリソースにも、明示的に cross-origin を指定することが望ましくなる。


## COEP

現状は `require-corp` という値だけが定義されている。


```http
Cross-Origin-Embedder-Policy: require-corp
```

これをトップフレームの HTML レスポンスに指定すると、そのサブリソース全てが CORP を指定したものでないといけなくなる。つまり、 `<script>` に読む JS や、 `<img>` に読む画像、 `<iframe>` に埋め込む別のページも、全て CORP を明示している必要があるということだ。

全てのサブリソースの CORP の値が、読み込みページと正しく整合してないとブロックされるため、 CORP を強制するということは、全てのサブリソースがそのトップフレームで読み込まれることを許可している状態であることを意味する。

これにより、全てのリソースが意図した読み込みで構成されている状態になるため、同じプロセスで展開されても問題無いことが保証できる。

ただし、 CORS に明示的に対応している場合はこの限りではない。

例えば `<script>` や `<img>` の場合は以下のように明示的に CORS mode でリクエストさせることができる。


```html
<!-- cross origin script を CORS で取得する -->
<script crossorigin src=https://example.com/script.js>
```

この場合、リクエストには Origin ヘッダが載り、サーバはそれを見て明示的に Access-Control-Allow-Origin を返すことになる。

つまり、すでに明示的に読み込める Origin を制限しているため、 CORP をつけていなくても COEP の要件を満たす。

Public CDN のようなサーバは、これまで CORP が暗黙的に `cross-origin` だったことに依存し、特に何もせず Cross Origin でコンテンツを配信してきた。

しかし、 COEP のデプロイが広まると、今のままではコンテンツを読み込めな書くなるため、 Public であっても `CORP: cross-origin` か `ACAO: *` に対応する必要がでてくる。ブラウザサポートが増えれば前者のほうが導入は容易だろう。

逆に言うと、 `CORP: cross-origin` を明示的に指定することが、そのリソースは public であることを表明するヘッダとして使われていくことになるだろう。


## COOP

CORP + COEP があれば、ほぼ完璧に「意図したリソースだけが読み込まれたプロセス」が構築できそうだが、これだけでは missing point がある、それが Opener の存在だ。

`window.open()` や `_blank` では、開いた側(opener)の Window に、 開かれたページ(openee)から `window.opener` を経由してアクセスできる。このため、 2 つのページは同じプロセスに展開されてしまう。

noopener は、 Opener が `window.opener` の削除を指定するが、 Openee はそれを拒否できない(そういう提案があった気もするが)。

COOP は Opener / Openee 両方に指定し、その両方の値が整合しなければ `window.opener` が削除されるという仕様だ。

- [Cross-Origin-Opener-Policy Explainer](https://docs.google.com/document/d/1Ey3MXcLzwR1T7aarkpBXEwP7jKdd2NvQdgYvF8_8scI/edit)


```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin-allow-popups
Cross-Origin-Opener-Policy: unsafe-none
```

対応は以下のようになる。

| Opener / Openee | Same origin - unsafe-none | Same origin - allow-popups | Same origin - Same origin | Cross origin - unsafe-none | Cross origin - allow-popups | Cross origin - same-origin |
|:----------------------------------:|:-:|:-:|:-:|:-:|:-:|:-:|
| Top level           - unsafe-none  | Y | N | N | Y | N | N |
| Top level           - allow-popups | Y | Y | N | Y | N | N |
| Top level           - same-origin  | N | N | Y | N | N | N |
| Same origin iframe  - unsafe-none  | Y | N | N | Y | N | N |
| Same origin iframe  - allow-popups | Y | Y | N | Y | N | N |
| Same origin iframe  - same-origin  | N | N | Y | N | N | N |
| Cross origin iframe - unsafe-none  | Y | N | N | Y | N | N |
| Cross origin iframe - allow-popups | Y | N | N | Y | N | N |
| Cross origin iframe - same-origin  | N | N | N | N | N | N |


[Impact of the popup CrossOriginOpenerPolicy](https://docs.google.com/document/d/1eQEdjHDaJHJ5SFyRKjcqohS7x8XSpF8xmajXimAKcHc/edit#heading=h.fqpz10jiwbh9)

これにより missing point だった Opener の生成を制限することができる。


## CORP + COEP + COOP

これら全てが指定された場合を考える。

ある HTML を読んだとき、そのサブリソースは全て CORP が指定されており、さらに他の Origin との opener もないため、完全に独立したプロセスグループが展開できるのだ。

Chrome のように、ブラウザ全体で Site Isolation が実装されてないブラウザでも、これらヘッダについてだけ明示的にプロセスを分ける実装ができれば、 Spectre の対策になる。

Spectre が緩和できたことは、それによって無効化されていた SharedArrayBuffer の再度有効化を可能にする。

Chrome では COEP/COOP が有効になったサイトにのみ、 SharedArrayBuffer を有効にする予定を発表している。

- [Planning isolation requirements (COOP/COEP) for SharedArrayBuffer](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/_0MEXs6TJhg)

そして、こうした理想的に分離された(Site Isolated)環境が手に入ったことは、今後より強力な API をブラウザに展開していく上での礎となる。

例えば `performance.measureMemory()` や JS Self-Profiling API などもそうした候補になり、 Isolated されている環境でのみ利用できるようにしていく計画も有る。

逆に新しい環境であることを利用し、 `document.domain` の変更を禁止するといった互換性のためにできなかった変更を持ち込むことも検討されている。

これは、もはやこうしたヘッダを付与しコントロールしていくことは、 Spectre 対策だけの話ではなくなっていく可能性があることを意味する。


## 関連仕様


### crossOriginIsolated

Isolated な環境でしか利用できない API が存在するということは、分岐のために Isolated であるかどうかを知りたい場面がでてくる。

そこで、 CORP + COEP + COOP が適切に設定されているかどうかを取得するフラグとして提案されているのが `self.corssOriginIsolated` だ。


```js
if (self.crossOriginIsolated) {
  // Cross Origin Isolation が有効な場合 true を返す
}
```

- [Feature detection of SharedArrayBuffer objects and shared memory - Anne's Blog](https://annevankesteren.nl/2020/01/shared-memory-feature-detection)


### Origin Isolation

Origin Isolation は、基本的には Site Isolation が Same Site なのに対して Same Origin に限定した仕様だ。

これにより、サブドメイン側に影響があってもそれが伝搬しないで済むことになるだろう。

ただし、単にそうするだけではなく、 Same Origin Isolation を実装する上で重要になる JS の Agent Cluster という仕様を更新することにモチベーションがあるようだ。

ここを更新できると、 Origin Isolation を実装する上で UA が取る戦略が多様になる。

また、 COOP + COEP の方向は良いにせよ、依存リソース全てが対応する必要があり対応負荷が高いこと、そして結果的に同じような結果になっても Origin Isolation をしたいという明示的なシグナルにはなってないことなどが指摘されている。

内部の実装へのケアが強いイメージがある提案で、完全には理解できてないが、策定が進んだら単体で解説したい。

- <https://github.com/WICG/origin-isolation/blob/master/README.md>


### Securer Context

これまで https で提供された環境を Secure Context としてきた。

しかし、単にトランスポートが暗号化されているだけで Secure とすることができない現状があり、むしろ単に https にすることは前提となりつつある。

そこで、暗号化に追加してより安全な環境が提供できる状況をパラメタライズする仕様だ。具体的には 3 つ有り、それぞれ有効にできるものが変わる。

- \[SecureContext=Transport\]: https
  - SW や getUserMedia など今定義されているもの
- \[SecureContext=Isolation\]: CORP + COOP + COEP
  - `performance.now`, `performance.measureMemory`, SharedArrayBuffer etc
- \[SecureContext=Injection\]: CSP Strict + Trusted Types
  - WebUSB, clipboard etc

こうしたコンセプトを用意し、今後新しい Powerful Feature API が提供される際の指針にするという内容のようだ。

 - <https://github.com/mikewest/securer-contexts/>


## Outro

CORP / COOP / COEP あたりは、最初の提案から名前が何度か変わったりしてややこしかったが、最近やっと落ち着いてきて実装が進みつつ有るため、今回解説するに至った。

より詳細な流れについては、以下が参考になるだろう。

- [ep63 Cross Origin Info Leaks \| mozaic.fm](https://mozaic.fm/episodes/63/cross-origin-info-leaks.html)

これらのヘッダは、後から対応する負荷がある程度ある一方、今後の Powerful Feature の有効化の条件になる可能性が有るため、仮にこのまま進めば避けては通れないヘッダになる可能性が有る。

しかし、広告を初めとする 3rd Party Resource を多用している場合は、依存先の対応が必要なため、しばらくは対応が難しいかも知れない。

そうした理由で [広告](https://blog.jxck.io/entries/2020-01-31/ads-for-blog.html) を入れている本サイトでは使用しなかったが、広告を外している [mozaic.fm](https://mozaic.fm) の方は、 [v3](https://blog.jxck.io/entries/2020-05-06/mozaic-v3-release.html) で実装しデプロイ済みだ。

今回は解説してないが、それぞれ Reporting API で Report が取れるため、デプロイしていく上で Reporting Endpoint の確保は必須となるだろう。(report はまだ観測してない)

Origin-Isolation などの関連仕様の動向も気になるため、引き続き仕様の動向を追いつつ、 feedback につなげていきたい。


## Resources


### CORB

- Spec
  - Fetch Standard
    - <https://fetch.spec.whatwg.org/#corb>
- Explainer
  - Cross-Origin Read Blocking for Web Developers - The Chromium Projects
    - <https://www.chromium.org/Home/chromium-security/corb-for-developers>
- Requirements Doc
  - Cross-Origin Read Blocking (CORB)
    - <https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md>
- Mozilla Standard Position
  - Fetch: CORB - Issue #81 - mozilla/standards-positions
    - <https://github.com/mozilla/standards-positions/issues/81>
- TAG Design Review
- Intents
  - Intent to Implement and Ship: Cross-Origin Read Blocking (CORB)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hnAWBzq1qys/DhyRSDKKBQAJ>
- Chrome Platform Status
  - Cross-Origin Read Blocking (CORB) - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5629709824032768>
- Blog
- Presentation
- Issues
  - Cross-Origin Read Blocking (CORB) - Issue #681 - whatwg/fetch
    - <https://github.com/whatwg/fetch/issues/681>
- Other
  - CORB demo
    - <https://anforowicz.github.io/xsdb-demo/index.html>


## CORP

- Spec
  - Fetch Standard
    - <https://fetch.spec.whatwg.org/#cross-origin-resource-policy-header>
- Explainer
- Requirements Doc
- Mozilla Standard Position
- TAG Design Review
- Intents
  - Intent to Implement and Ship: Cross-Origin Resource Policy
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TBNHorRPhZk/4_gfRjfzDgAJ>
- Chrome Platform Status
  - Cross-Origin Resource Policy - Chrome Platform Status
    - <https://www.chromestatus.com/feature/4647328103268352>
- Blog
  - Consider deploying cross-origin resource policy!
    - <https://resourcepolicy.fyi/>
- Presentation
- Issues
  - Cross-Origin-Resource-Policy (was: From-Origin) - Issue #687 - whatwg/fetch
    - <https://github.com/whatwg/fetch/issues/687>
- Other


## COEP

- Spec
  - Cross-Origin Embedder Policy
    - <https://wicg.github.io/cross-origin-embedder-policy/>
- Explainer
  - COOP and COEP explained
    - <https://docs.google.com/document/d/1zDlfvfTJ_9e8Jdc8ehuV4zMEu9ySMCiTGMS9y0GU92k/edit>
- Requirements Doc
- Mozilla Standard Position
- TAG Design Review
- Intents
  - Intent to Ship: Cross-Origin-Embedder-Policy (COEP)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/XBKAGb2_7uA/TDg_AkQbAAAJ>
- Chrome Platform Status
  - Cross-Origin-Embedder-Policy - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5642721685405696>
- Blog
  - Making your website "cross-origin isolated" using COOP and COEP
    - <https://web.dev/coop-coep/>
- Presentation
- Issues
  - Making postMessage() work for SharedArrayBuffer (Cross-Origin-Embedder-Policy) - Issue #4175 - whatwg/html
    - <https://github.com/whatwg/html/issues/4175>
- Other


## COOP

- Spec
  - coop.md
    - <https://gist.github.com/annevk/6f2dd8c79c77123f39797f6bdac43f3e>
- Explainer
  - Cross-Origin-Opener-Policy Explainer
    - <https://docs.google.com/document/d/1Ey3MXcLzwR1T7aarkpBXEwP7jKdd2NvQdgYvF8_8scI/edit>
  - Cross-Origin-Opener-Policy explainer
    - <https://docs.google.com/document/d/1eQEdjHDaJHJ5SFyRKjcqohS7x8XSpF8xmajXimAKcHc/edit#>
  - COOP and COEP explained
    - <https://docs.google.com/document/d/1zDlfvfTJ_9e8Jdc8ehuV4zMEu9ySMCiTGMS9y0GU92k/edit>
- Requirements Doc
- Mozilla Standard Position
- TAG Design Review
- Intents
  - Intent to Ship Cross-Origin-Opener-Policy
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cJ5dXIcQCsc/eGgi0gkcAAAJ>
- Chrome Platform Status
  - Cross-Origin-Opener-Policy - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5432089535053824>
- Blog
- Presentation
- Issues
- Other


## crossOriginIsolated

- Chrome Platform Status
  - crossOriginIsolated - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5953286387531776>
- Blog
  - self.crossOriginIsolated
    - <https://annevankesteren.nl/2020/01/shared-memory-feature-detection>


## Site Isolation

- Explainer
  - Site Isolation - The Chromium Projects
    - <https://www.chromium.org/Home/chromium-security/site-isolation>
  - Mitigating Side-Channel Attacks - The Chromium Projects
    - <https://www.chromium.org/Home/chromium-security/ssca>
- Requirements Doc
  - Site Isolation Design Document - The Chromium Projects
    - <https://www.chromium.org/developers/design-documents/site-isolation>
- Blog
  - Google Online Security Blog: Mitigating Spectre with Site Isolation in Chrome
    - <https://security.googleblog.com/2018/07/mitigating-spectre-with-site-isolation.html>
  - Site Isolation for web developers
    - <https://developers.google.com/web/updates/2018/07/site-isolation>


## Origin Isolation

- Explainer
  - origin-isolation/README.md at master · WICG/origin-isolation
    - <https://github.com/WICG/origin-isolation/blob/master/README.md>
- Chrome Platform Status
  - Origin isolation - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5683766104162304>
- Tag Review
  - Origin isolation · Issue #464 · w3ctag/design-reviews
    - <https://github.com/w3ctag/design-reviews/issues/464>
- Intents
  - Intent to Experiment: Origin isolation
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/G0h3PFPeclA>
- Issue
  - Origin isolation - Issue #464 - w3ctag/design-reviews
    - <https://github.com/w3ctag/design-reviews/issues/464>


## Securer Context

- mikewest/securer-contexts: Secure Contexts, but with _more_ secureness!
  - <https://github.com/mikewest/securer-contexts/>
- Securer Contexts - Issue #471 - w3ctag/design-reviews
  - <https://github.com/w3ctag/design-reviews/issues/471>


## Blog

- Hack Patch!: 投機的な Web の修復
  - <https://shhnjk.blogspot.com/2020/03/repairing-speculative-web.html>


## DEMO

動作するデモを以下に用意した。

- [Site Isolation](https://labs.jxck.io/site-isolation/)
  - [Cross-Origin-Read-Blocking DEMO](  https://labs.jxck.io/site-isolation/cross-origin-read-blocking/index.html)
  - [Cross-Origin-Resource-Policy DEMO](https://labs.jxck.io/site-isolation/cross-origin-resource-policy/index.html)
  - [Cross-Origin-Embedder-Policy DEMO](https://labs.jxck.io/site-isolation/cross-origin-embedder-policy/index.html)
  - [Cross-Origin-Opener-Policy DEMO](  https://labs.jxck.io/site-isolation/cross-origin-opener-policy/index.html)
  - [crossOriginIsolated DEMO](         https://labs.jxck.io/site-isolation/crossOriginIsolated/index.html)
  - [Origin-Isolation DEMO](            https://labs.jxck.io/site-isolation/origin-isolation/index.html)


## Special Thanks

- [@shhnjk](https://twitter.com/shhnjk)
