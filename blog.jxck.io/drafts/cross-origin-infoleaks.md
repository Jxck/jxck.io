# CROSS Origin Isolation と Securer Context

## Intro

Origin は Web におけるセキュリティモデルの一つとして、コンテンツ間の Communication に関する境界を定義し、リソースを保護してきた。

しかし、 Spectre の発覚以降、  Communication に関する制限だけではなく Isolation によるメモリレベルでのアクセス制御が必要となった。

そこで現在作業されているのが、 CORB, CORP, COEP, COOP といった仕様群であり、これは Web におけるセキュリティモデルの更新作業と見ることができる。

概要と現状について解説する。


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
<!doctype html>
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

そこで、ブラウザベンダはとにかくすぐできる方法として、攻撃者が推測に必要とする「高解像度で時間を測れる API」である `performance.now()` と「工夫次第で同じく高解像度で時間が測れる」 `SharedArrayBuffer` を無効にすることにした。

これは、互換性を壊しているわけだが、ユーザの安全を守るためにはしかたない。とはいえそのままにしておくこともできない。

そこで、 Web ができる根本的な解決として理想的には「違う Origin のデータを同じメモリ内に読み込まない」ようにするという対応を始めた。

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

これは 6 年前から Spectre が裏で共有されていたという意味ではなく、そもそもずっと作業があった。

特に V8 などにバグがあった場合に、そこから Renderer Process が掌握されても、その影響範囲を限定できるように実施されていたらしい。

作業中だったこれが Spectre 対策でも有効なことがわかったので、スピードアップしてマージしたという流れらしい。

これにより Spectre の発生をかなり抑えることができる。

同じことは Firefox なども取り組んでいるが、そもそも先発のブラウザは、シングルプロセスな作りから始まったものが多いため、対応が簡単とは限らない。

Site Isolation をブラウザそのものがネイティブに対応し、全てのリソースを分離するのは難しい場合もある。

そこで、リソースごとに Opt-In で Site Isolation に対応するためのいくつかの仕様が提案されている。


## CORB

`<iframe>` 以外にも、 Cross Origin なリソースを同じプロセスに展開する方法が知られている。

例えば、ユーザが Cookie を持っているときにのみ取得できる JSON や HTML があったとする。

これらを `<script>` や `<img>` で読み込めば、メモリ上に展開できる。

```html
<!doctype html>
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

ブラウザが自動的にブロックを行うため、特にヘッダなどを付けるわけではない。

実際の条件はもう少し複雑で `X-C-T-O: no-sniff` がない場合は、 Sniffing を行わなければ壊れるサイトがある(html として img を配信してる etc)ため、色々と場合分けが必要なようだ。

- [Cross-Origin Read Blocking (CORB)](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md)
- [Cross-Origin Read Blocking for Web Developers - The Chromium Projects](https://www.chromium.org/Home/chromium-security/corb-for-developers)

また、これにより Prefix を付けてパースを抑制し XSSI を防ぐ場面も、 CORB のスコープに入っている。

- [AngularJS: API: $http](https://docs.angularjs.org/api/ng/service/$http#json-vulnerability-protection)

動作する DEMO は以下に用意した。

- [Cross-Origin-Read-Blocking DEMO](https://labs.jxck.io/site-isolation/cross-origin-read-blocking/index.html)




## corssorigin attribute

`<script>` や `<img>` からのリクエストが no-cors なことにより、 Origin はチェックできない。

しかし、リクエストもとの Origin を確認できれば、より明示的に攻撃が防げる場合もある。

そこで、オリジンが同じでも crossorigin 属性を付与することにより、 CORS を強制する方法も有る。

サーバはリクエストの Origin をチェックして、明示的に A-C-A-O を指定することで、意図しないリクエストを防げる。









しかし、 Site Isolation を実装してない、実装が難しいブラウザもある。

また、 CBOR で対象にならないリソースもある。これらについても対策を考える必要が有る。



## CORP

そのヘッダが付いたリソースが、どの Origin から読まれて良いかを決める。

これにより、ヘッダが付いていれば攻撃サイトが、メモリに展開するために読むことができなる。

これは CORB 同等のことを、サイトオーナーが Opt-In で指定するようなイメージだ。

```html
<!doctype html>
<!-- 攻撃者が用意した罠サイト -->
<title>attacker site</title>

<!-- ユーザを滞在されるためのダミーコンテンツ -->
<h1>dummy contents</h1>

<!--
  ユーザの Cookie が送られるため JSON が読み込まれる
  JSON を展開しただけでなにもおきないが、メモリには展開されている
-->
<script src=https://admin.example.com/secret.json></script>
```

- [Fetch Standard](https://fetch.spec.whatwg.org/#cross-origin-resource-policy-header)


same-origin/same-site にし、付されている場合は別のサイトから読むことはできない。

これが指定されているとレスポンスを見た時点で、レンダラプロセスのメモリに展開しないことができる。

どんなレスポンスにも使えるため、 CORB で守られないものも守ることができる。



## COEP

現状は `require-corp` という値だけが定義されている。

そのトップフレーム(e.g. HTML)のレスポンスに指定すると、そのサブリソース全てが CORP を指定したものでないといけなくなる。

CORP を強制するということは、全てのサブリソースがそのトップフレームで読み込まれることを許可している状態であることを意味する。

これにより、全てが意図したリソースの読み込みで構成されていることが保証できる。

- [Cross-Origin Embedder Policy](https://wicg.github.io/cross-origin-embedder-policy/)



## COOP

`window.open()` や `_blaknk` では、 opener を経由して開いた元のページに、開いたページがアクセスできる。

このため、 2 つのページは同じプロセスに展開されてしまう。

noopener は、開く側が opener の削除を指定するが、 COOP は両方に指定でき、両方の値が一致しなければ opener が削除される。

- [Cross-Origin-Opener-Policy Explainer](https://docs.google.com/document/d/1Ey3MXcLzwR1T7aarkpBXEwP7jKdd2NvQdgYvF8_8scI/edit)

```
Cross-Origin-Opener-Policy: same-origin
```

この場合、両者(開く側、開かれる側)がこの同じヘッダを指定し、両者が Same Origin だった場合のみ Opener が作られる。

そうでない場合は Opener を作る必要がないため、プロセスが分離できるのだ。



## CORS + COEP + COOP

これら全てが指定された場合を考える。

ある HTML を読んだとき、そのサブリソースは全て CORS が指定されており、さらに他の Origin との opener もないため、完全に独立したプロセスグループが展開できるのだ。

そこには、他のプロセスが混ざらないため、 Side Channel を防ぐことができる。

Chrome のように、ブラウザ全体で Site Isolation が実装されてないブラウザでも、これらヘッダについてだけ明示的にプロセスを分ける実装ができれば、 Spectre の対策になる。

Spectre が緩和できたことは、それによって無効化されていた SharedArrayBuffer の再度有効化を可能になる。


## crossOriginIsolated

Chrome では COEP/COOP が有効になったサイトにのみ、 SharedArrayBuffer を有効にする予定を発表している。

- [Planning isolation requirements (COOP/COEP) for SharedArrayBuffer](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/_0MEXs6TJhg)


SharedArrayBuffer が利用可能かは、 Cross Origin Isolation が有効になっている場合に以下のように feature detection できる。

```js
if (self.crossOriginIsolated) {
  // Cross Origin Isolation が有効な場合 true を返す
}
```

- [Feature detection of SharedArrayBuffer objects and shared memory - Anne's Blog](https://annevankesteren.nl/2020/01/shared-memory-feature-detection)



## Securer Context

- isolation: CORP + COOP + COEP
- injection: CSP Strict + Trusted Types



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
  - Making your website "cross-origin isolated" using COOP and COEP
    - <https://web.dev/coop-coep/>


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


- Chrome Platform Status
  - Origin isolation - Chrome Platform Status
    - <https://www.chromestatus.com/feature/5683766104162304>
- Issue
  - Origin isolation - Issue #464 - w3ctag/design-reviews
   - <https://github.com/w3ctag/design-reviews/issues/464>


## Origin Policy

- Origin Policy - Issue #160 - mozilla/standards-positions
  - <https://github.com/mozilla/standards-positions/issues/160>


## Securer Context

- Securer Contexts - Issue #471 - w3ctag/design-reviews
  - <https://github.com/w3ctag/design-reviews/issues/471>


## Blog

- Hack Patch!: 投機的なWebの修復
  - <https://shhnjk.blogspot.com/2020/03/repairing-speculative-web.html>






## DEMO

動作する DEMO を以下に用意した。

- [Site Isolation](https://labs.jxck.io/site-isolation/)
  - [Cross-Origin-Read-Blocking DEMO](  https://labs.jxck.io/site-isolation/cross-origin-read-blocking/index.html)
  - [Cross-Origin-Resource-Policy DEMO](https://labs.jxck.io/site-isolation/cross-origin-resource-policy/index.html)
  - [Cross-Origin-Embedder-Policy DEMO](https://labs.jxck.io/site-isolation/cross-origin-embedder-policy/index.html)
  - [Cross-Origin-Opener-Policy DEMO](  https://labs.jxck.io/site-isolation/cross-origin-opener-policy/index.html)


















## Origin Isolation

Site Isolation は Same Site の範囲なので、サブドメインの脆弱性が上のドメインにもアクセスできてしまう。

Opt-In で Origin Isolation を Origin Policy で指定する。

Origin Policy は、 CSP などの設定を Origin 全体に適用する。



