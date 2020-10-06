---
title: "Site Isolation と Origin Isolation"
emoji: "📝"
type: "tech"
topics: ["coop", "coep", "corp", "origin", "web"]
published: false
---

# Site Isolation と Origin Isolation

ここまで、 Origin が Web における重要なセキュリティモデルであること、それを安全にまたぐための CORS などについて解説してきた。これは CORS のルールに則らなければ、 Origin を迂回したコミュニケーションはできないことを意味しており、それが迂回できてしまうのは脆弱性とみなされるのだが、まさしくそれが見つかってしまったのが 2018 年の年始に報告された **Spectre** だ。

この脆弱性は根が深く、部分的なバグ修正というよりは、ブラウザのプロセスアーキテクチャ自体に変更が必要なレベルで影響範囲が大きい。それでもなお、既存の Web との互換性を壊すこと無く、 Origin というセキュリティモデルを死守することでユーザの安全性を守る必要がある。

この節では、 Spectre をきっかけに導入された Site Isolation の概念と、 CORS/COEP/COOP といった仕様について解説する。


## Spectre は何が問題だったのか

まず Spectre だが、これは CPU が備える投機的実行という機能が原因で起こる脆弱性だ。しかし CPU の話からすると長くなるので、 Web Facing な部分だけを筆者の理解でかいつまんで説明する。

簡単に言えば、本来アクセスできないはずの「**別プロセスにあるメモリ**」を、 CPU の投機的実行という特性を利用してキャッシュに載せ、それを推測することでアクセスできるという脆弱性だ。

根本的な対策は OS や CPU の対応が必須となり、「別プロセスにあるメモリ」にはアクセスできないように対策が行われている。 それでも、「**同じプロセスにあるメモリ**」で、本来は読めないようになっていあずのものは、工夫次第では読めてしまう可能性が残っている。

そして、その攻撃が一番再現しやすいのが、 URL にアクセスするだけで様々なコードが実行できる Web だったというわけだ。


## Spectre と Web

典型例として、あるブラウザの設計が `<iframe>` に読み込まれた別 Origin のリソースを、  Top Level Window と同じプロセスに展開する作りになっていたとしよう。

![Top Level Window が iframe を同じプロセス内に展開する](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-4BDC2.png 'top level window embeds iframe')

Cross Origin Iframe の中身は、本来 Top Level Window JS から直接触ることができない。しかし、 CPU の投機的実行という特性を利用すると、 `<iframe>` のメモリの中身をキャッシュに載せることができる。そこで、 Top Level Window 側の JS からアクセスを試みて、取得が早ければキャッシュに有り、遅ければキャッシュには無い、この時間を正確に計測して繰り返せば、徐々にキャッシュに載っている情報を推測できるのだ。

これを利用して、ユーザを攻撃ページに誘導し、そのユーザの Cookie が無いと取得できないデータを `<iframe>` に読み、時間をかければ中身を推測できるという攻撃だ。


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

![spectre sidechannel attack](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-2AC15.png)

本来アクセスできない情報を外から推測することを **サイドチャネル攻撃** と呼び、その中でも特に時間という要素を利用する攻撃を **タイミング攻撃** と呼ぶ。今回の場合はそのどちらでもある。これが Spectre による攻撃の概要だ。

これを本質的に解決するには、ブラウザの作りを根本的に直すしか無いが、それは時間がかかる。しかし、 Web は URL にアクセスするだけで、全てのユーザがこの攻撃に晒される危険性があるため、なんとかしないといけない。

そこで、ブラウザベンダは対処療法として、攻撃者が推測に必要とする「高解像度で時間を測れる API」である `performance.now()` の精度を下げ、「工夫次第で同じく高解像度で時間が測れる」 `SharedArrayBuffer` を無効にすることにした。 Web においてこのような「互換性を壊す変更」は本来許されないことだが、「ユーザの安全」は互換性よりも重要であるためしかたく実施されている。とはいえそのままにしておくことはできない。

そこで、根本的な解決として理想的には「**違う Origin のデータを同じメモリ内に読み込まない**」状態にするための対応を始めた。

それが Site Isolation だ。


## Site Isolation

Site Isolation は、メモリの分離のためにプロセスアーキテクチャをいじる必要があり、ブラウザにとっては大工事だ。ブラウザによってやり方が違うため、ここでは Chrome の場合について解説していく。

Chrome はそもそもマルチプロセスなアーキテクチャになっており、具体的には 1 tab が 1 process (renderer process) で分離されていた。プロセスが違えばメモリ空間が違うため、別のタブの内容を読み出す Spectre のようなサイドチャネルアタックはできない。しかし、 `<iframe>` を同じタブの中に展開する場合、読み込んでる Origin が違っても同じ Process 内で展開されるため、サイドチャネル攻撃が可能だった。

そこで、 `<iframe>` などもきちんとプロセスを分離するというのが Chrome における Site Isolation となる。これにより Spectre の発生をかなり抑えることができる。

:::message
Chrome は Site Isolation マージするまでに 6 年近くかかったらしい。

- [Google Online Security Blog: Mitigating Spectre with Site Isolation in Chrome](https://security.googleblog.com/2018/07/mitigating-spectre-with-site-isolation.html)

これは 6 年前から Spectre が裏で共有されていたという意味ではない。もともと V8 などにバグがあった場合に、そこから Renderer Process が掌握されても、その影響範囲を限定できるように以前から作業が行われていた。
それが Spectre 対策でも有効なことがわかったので、スピードアップしてマージしたという流れらしい。
:::


# Spectre 攻撃をブロックする仕様

Chrome 以外のブラウザも Site Isolation に取り組んでいるが、そもそも先発のブラウザはシングルプロセスな作りから始まったものが多いため、アーキテクチャの変更が簡単とは限らない。つまり全てのブラウザが Site Isolation をネイティブに対応し、全てのリソースを分離するのは現実的に難しい。

また、既に存在する Web の仕様の中には、 Site Isolation と相性の悪いものが存在するが、安易にそれらを無効にすると互換性の問題が起こってしまう。

そこで、開発者がリソースごとに Opt-In で Site Isolation に対応するためのいくつかの仕様が提案されている。

- CORB: [Cross Origin Read Blocking](https://fetch.spec.whatwg.org/#corb)
- CORP: [Cross Origin Resource Policy](https://fetch.spec.whatwg.org/#cross-origin-resource-policy-header)
- COEP: [Cross Origin Embedder Policy](https://html.spec.whatwg.org/multipage/origin.html#coep)
- COOP: [Cross Origin Opener Policy](https://html.spec.whatwg.org/multipage/origin.html#cross-origin-opener-policies)


## CORB (Cross Origin Read Blocking)

`<iframe>` 以外にも、 Cross Origin なリソースを同じプロセスに展開する方法が知られている。

例えば、ユーザが Cookie を持っているときにのみ取得できる JSON や HTML があったとする。 攻撃者はそのファイルの中身を盗みたいが、 CORS に対応してなければそれらを取得することはできない。代わりに、これらを `<script>` や `<img>` で読み込めば、メモリ上に展開することは可能だ。


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

このように読み込んでも JSON や HTML 自体にはアクセスできないが、目的はブラウザに取得させ、メモリ上に展開させることなので問題はない。一度メモリに展開できれば、前述のように Spectre で読み出せる可能性がある。

こうした読み込みは、基本的には攻撃にしか使われないため、これらをブロックすることはサイドチャネル攻撃の抑止に繋がる。 CORB はこうしたコードで意図しないリソースがメモリに展開されることを防ぐ仕組みだ。

具体的には以下のような request destination について

- "image" (`<img>`, `<image>`,  `background-image`, favicon.ico etc)
- "script" (`<script>`, `importScripts()`, `navigator.serviceWorker.register()`, `audioWorklet.addModule()`) etc.
- "audio", "video", "track"
- "font"
- "style"
- "report"

そこから発生したリクエストに対するレスポンスの Content-Type が以下だった場合

- HTML (text/html)
- XML (text/xml, application/xml, etc)
- JSON (text/json, application/json, etc)

ブラウザはそのレスポンスを破棄するという仕様だ。

![CORB によるサイドチャネルの防止](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-7BA6E.png 'CORB')

ブラウザが自動的に行う Intervention であるため、開発者が特に何かをする必要はない。[^1] 逆にこれによってサイトが壊れた場合は、適切な `Content-Type` が付与されてないことが原因であるため、そこを修正する必要があるだろう。

[^1]: 実際の条件はもう少し複雑で `X-Content-Type-Option: no-sniff` がない場合は、 Sniffing を行わなければ壊れるサイトがある(plain/text として JS を配信してる etc)ため、色々と場合分けが必要なようだ。


## CORP (Cross Origin Resource Policy)

CORB は既存のサイトを壊さない範囲で、 Intervention としてサイトが実施しているため、対象外が多く有る。 例えば `<script>` から JS へのリクエストであれば成功してしまう。


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

そこで、 CORB と同等のことを Opt-In で行うのが CORP だ。

以下のように CORP のヘッダをリソースに付与すると、そのリソースがどの Origin から読まれて良いかを決めることができる。


```http
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Cross-Origin-Resource-Policy: cross-origin
```

先の例では、 secret.js に `same-origin` や `same-site` を指定すれば、ブラウザは攻撃者のサイトの Origin と比較して破棄するため、サイドチャネル攻撃を防ぐことができる。どんなレスポンスにも付与できるため、 CORB で守られないものも守ることができるのだ。

![CORP によるサイドチャネルの防止](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-5A437.png 'CORP')

このヘッダが付与されてない場合は暗黙的に `cross-origin` になっている状態と言え、これまで通りどのページからも読み込める。付与しなければ `cross-origin` になるなら、あえて `cross-origin` を指定する必要は無さそうに見えるが、次の COEP を踏まえると、 Public CDN のように「どの Origin からも読み込んでよい」リソースには、明示的に `cross-origin` を指定することが望ましいと言える。

:::message
CORP は、「そのリソースを読み込んでも良い Origin を指定する」仕様だったが、そもそも CORS もその目的だったのでは? と思うかもしれない。
実は CORS に対応することでも同様の効果があるのだが、それは読み込み側が `<scritp crossorigin>` とし cors リクエストで secret.js を読み込んだ場合のみだ。サービス側が CORS に対応しても攻撃者は `crossorigin` 属性を付けず `no-cors` としてリクエストすれば成功してしまうため、 Origin 属性が無ければレスポンスを返さないなどといった対応が別途必要となる。
従って CORP ヘッダを一つ付けるだけの方がデプロイは楽だろう。
:::


# Spectre 攻撃をさせない仕様

Spectre が発覚してから、ブラウザベンダは攻撃に使える「**高精度タイマー**」になりえる仕様である Shared Array Buffer を無効にし、 `Performance.now()` の解像度を下げたことを最初に紹介した。

これらの変更は、ユーザの安全を守るために互換性を壊して実施しているため、なんとかして「ユーザの安全を維持したまま」これらの機能を元に戻す必要がある。そこで、先に紹介した CORP と合わせて提案されたのが COEP と COOP だ。


## COEP (Cross Origin Embedder Policy)

CORB は限定的で CORP は Opt-In であるため、 CORB で守れず CORP が適用されてないリソースは、依然として Spectre の攻撃が成立する可能性があり、高精度タイマーを元に戻すことができない。

逆を言えば、そのページに有る全てのリソースが CORP で守られていれば、高精度タイマーを有効にすることができるだろう。そこで提案されたのが COEP だ。 COEP は、ページ内の全サブリソースに対して CORP を強制する仕様だ。

![COEP が無い場合、 secret.js は読み込めたが高精度 Timer が無いためサイドチャネルできない。 COEP が有る場合、高精度 Timer はあるが CORP の無い secret.js が読み込めない](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-78877.png)

現状は `require-corp` という値だけが定義されている。


```http
Cross-Origin-Embedder-Policy: require-corp
```

これをトップフレームの HTML レスポンスに指定すると、そのサブリソース全てが CORP を指定したものでないといけなくなる。つまり、 `<script>` に読む JS や、 `<img>` に読む画像、 `<iframe>` に埋め込む別のページも、全て CORP を明示している必要があるということだ。[^2]

[^2]: ここでも CORP が必要なのは no-cors なリクエストであり、 CORS に対応してもよい。

全てのサブリソースの CORP の値が、読み込みページと正しく整合してないとブロックされるため、 CORP を強制するということは **全てのサブリソースがそのトップフレームで読み込まれることを許可している** 状態であることを意味し、同じプロセスで展開されても問題無いことが保証できる。

その状態であれば、高精度タイマーとなる仕様を有効にしても問題ない、といいたいところだが、もう一つ未解決の問題がある。それが `window.opener` だ。


## COOP (Cross Origin Opener Policy)

CORP + COEP があれば、ほぼ完璧に「意図したリソースだけが読み込まれたプロセス」が構築できそうだが、これだけでは不足する点がある、それが Opener の存在だ。

`window.open()` や `_blank` では、開いた側(opener)の Window に、 開かれた側(openee)から `window.opener` を経由してアクセスできる。 opener 経由でできることは、両者が同じ Origin かどうかなどによって変わってくるが、いずれにせよ 2 つのページは同じプロセスに展開されてしまう。


```html
<title>開く側 (opener) の HTML</title>

<a target=_blank href=openee.html>別のページを開く</a>
```


```html
<title>開かれた側 (openee) の HTML</title>

<script>
  console.log(window.opener) // 開く側 (opener) の HTML
<script>
```

COOP は Opener / Openee 両方に指定し、その両方の値が整合しなければ `window.opener` が削除されるという仕様だ。現時点では以下の値が定義されている。


```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin-allow-popups
Cross-Origin-Opener-Policy: unsafe-none
```

基本的には Same-Origin であれば Opener を許可し、それ以外は許可しないことで安全性を確保する。また `window.open` で生成されるポップアップは別途許可が必要な仕様だ。

![COOP が一致しない組み合わせでは Opener は生成されない](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-92A5F.png 'coop')

Opener を防ぐ方法としては、 Opener 側が `<a rel=noopener>` を指定することで Openee の `window.opener` を削除するという仕様もある。しかしこれでは、全てのリンクを修正する必要があること、それでも `window.open` を防げないことなどの問題が有る。 COOP を使えば、そのドキュメントがどう開かれても、 Opener の生成をコントロールできるのだ。


## CORP + COEP + COOP = Site Isolation

これらをまとめ、あるページが COEP と COOP を指定すれば、そのページに含まれる全てのサブリソースは CORP を必須とし、 Opener も COOP が一致するページとしか生成されない。結果、 **そのページと同じプロセスに展開されるのは明示的に許可されたもののみ** であることが保証できる。これを **Site Isolation** された状態と言う。

![COEP + COOP で Isolation された状態](https://cacoo.com/diagrams/L0Jn5wPiobCrsSDy-68A14.png 'site-isolation by coop & coep')

Chrome のように、ブラウザ全体で Site Isolation が実装されてないブラウザでも、これらヘッダについてだけ明示的にプロセスを分ける実装ができれば、 Spectre の対策になる。 Spectre が緩和できたことは、それによって無効化されていた高精度タイマーになりえる仕様、つまり Shared Array Buffer を有効化し、 `Performanece.now()` の解像度を戻すことができるのだ。[^3]

[^3]: 実際、 Chrome では COEP/COOP が有効になったサイトにのみ、 [SharedArrayBuffer を有効にする予定](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/_0MEXs6TJhg) を発表している。

こうした理想的に分離された(Site Isolated)環境が手に入ったことは、今後より強力な API をブラウザに展開していく上での礎にもなる。例えば `performance.measureMemory()` や JS Self-Profiling API などもそうした候補になり、 Isolated されている環境でのみ利用できるようにしていく計画がされている。逆に新しい環境であることを利用し、 `document.domain` の変更を禁止するといった互換性のためにできなかった変更を持ち込むことも検討されている。つまり、こうしたヘッダを付与しコントロールしていくことはもはや Spectre 対策だけの話ではなく、今後 Web が進化する上で重要な仕様となっていく可能性があるのだ。


# 関連仕様

:::message alert
TODO: 仕様がもう少し固まったら書き直す
:::


## crossOriginIsolated

Isolated な環境でしか利用できない API が存在するということは、分岐のために Isolated であるかどうかを知りたい場面がでてくる。

そこで、 CORP + COEP + COOP が適切に設定されているかどうかを取得するフラグとして提案されているのが `self.corssOriginIsolated` だ。


```js
if (self.crossOriginIsolated) {
  // Cross Origin Isolation が有効な場合 true を返す
}
```

- [Feature detection of SharedArrayBuffer objects and shared memory - Anne's Blog](https://annevankesteren.nl/2020/01/shared-memory-feature-detection)


## Origin Isolation

Origin Isolation は、基本的には Site Isolation が Same Site なのに対して Same Origin に限定した仕様だ。

これにより、サブドメイン側に影響があってもそれが伝搬しないで済むことになるだろう。

ただし、単にそうするだけではなく、 Same Origin Isolation を実装する上で重要になる JS の Agent Cluster という仕様を更新することにモチベーションがあるようだ。

ここを更新できると、 Origin Isolation を実装する上で UA が取る戦略が多様になる。

また、 COOP + COEP の方向は良いにせよ、依存リソース全てが対応する必要があり対応負荷が高いこと、そして結果的に同じような結果になっても Origin Isolation をしたいという明示的なシグナルにはなってないことなどが指摘されている。

内部の実装へのケアが強いイメージがある提案で、完全には理解できてないが、策定が進んだら単体で解説したい。

- <https://github.com/WICG/origin-isolation/blob/master/README.md>


## Securer Context

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

:::message alert
この節は [筆者ブログ](https://blog.jxck.io/entries/2020-05-22/site-isolation.html) に掲載されたものをベースに、大幅に加筆修正したものです。
:::
