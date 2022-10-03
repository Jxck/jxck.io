# XMLHttpRequest とはなんだったのか

## Intro

Fetch API の実装が広まり、 IE もリタイアを迎えたことで、今後忘れ去られていくことになるだろう XMLHttpRequest について。

どのように始まり、どのように広まり、どのように使われなくなっていくのか。その間に残した多大な功績を残す。


## XMLHttpRequest の始まり

この名前は非常に長いため、通常 XHR と略される。

この API は、現在の Web API のように W3C/WHATWG による標準化を経て策定された API ではない。 Microsoft によるいわゆる独自実装の API として始まり、後追いで標準化される。

したがって、 Web API の中でもかなり異質な命名である XHR が、 `XmlHttpRequest` でも `XMLHTTPRequest` でもなく `XMLHttpRequest` である理由も、 Microsoft の命名規則に「2, 3 文字の略語は大文字、 4 文字以上はキャメルケース」というものがあったからだと、当時の中の人が発言している。

> The coding standards we used at Microsoft at the time said to capitalize 2- or 3-letter acronyms,
> but 4-letter and larger acronyms should be camel-cased.
> I thought this was the craziest thing I'd ever heard.
> --- https://twitter.com/cwilso/status/1316380176171692032

そもそも、この API が最初に実装されたのは 1998 年頃だそうだ。 1998 年といえば、 IE は 4 で Windows は 95 だ。今のように WiFi もなく有線接続が当たり前で、 Google 検索も普及しておらず Yahoo の巨大リンク集みたいなところからサイトを探していた時代だ。

W3C はすでにあったが、今のように新しい API が次々に標準化される世界観になるのはざっくりと HTML5 以降で、このころはブラウザが差別化のために独自の機能を盛り込み生き残りをかけて戦う、ブラウザ戦争の真っ只中だ。

最初に XHR を実装した Alex Hopmann のブログに、当時の様子が細かく記されている。アーカイブ落ちしてしまっているのが勿体無い。

- Story of XMLHTTP | AlexHopmann.com
  - https://web.archive.org/web/20070314021601/http://www.alexhopmann.com/story-of-xmlhttp/

この内容を抜粋し補足しつつ、流れを追っていく。


## DHTML

信じられないかもしれないが、昔の Web サイトは HTML と CSS だけで作るのが基本であり、ろくに「動き」はなかった。

あっても、文字を左から右にアニメーションさせる `<marquee>` や、点滅される `<blink>` 、あとは  gif アニメくらいのもので、ゲームなどは Flash プラグインを入れてやるのが基本だ。

次第に JavaScript が普及し、様々な動きが付けられるようになる。個人のホームページではオブジェクトを動かしたり、クリックしたら大きさや色が変わったり、マウスカーソルの後ろにキャラクターのアイコンがついて来たりといったものが多かった。一方、プロの作るサイトでは、フォームのバリデーションや Tab UI など、適切に導入して UX を向上したサイトも多くあった。

JS を用いた DOM 操作は、今でこそ普通のことだが、当時はそれまでの Static HTML と比して *Dynamic HTML(DHTML)* と特筆して呼ばれるような新しい技術だった。この DHTML によって、 JS から触れる DOM API の重要性が高まり、そうやって作られたサイトがどのブラウザでも同じく動くように、細部まで標準化が重ねられていく。

今と決定的に違うのは、「表示された DOM をいじる」ことしかできないことだ。あくまでも、静的サイトの味付けのために行われていた。


## XHR

DHTML で画面が多少リッチになっても、新しいデータを取得するには画面更新を避けられなかった。

全てのサイトは単なる紙芝居(今で言う MPA)で、チャットやメールは更新しないと返事が見られないため "*F5 連打*" という言葉を産み、それを JS から自動で行うオプションが提供された。地図は画面の 8 方向に矢印リンクがあり、それをクリックするとその方向に少し移動した新しい画面に更新される作りだった。(拡大縮小ももちろんリンク)

![画面の 8 方向に矢印リンクがありそこをクリックすると新しい画面に遷移する Ajax 以前の地図サイト](good-old-map.png#744x647)

まだ光回線なんか普及しておらず、ダイアルアップをガーピー言わせて接続していた時代だ。 TTFB が 5 秒で TTI は 15 秒はあっただろう時代に、インタラクティブなサイトには限界があった。

Alex Hopmann の記事によれば、 MS も当時 Outlook の Web 版の実装に頭を悩ませていたことがわかる。もちろん、最初は件名をクリックしたら画面遷移する実装で、送信も Form をそのまま Submit するものだったのだろう。これをなんとかするために作られたのが XHR だった。

1998 年は、データ交換として XML が非常に盛り上がっていた時代だ。 XHR は、実際は XML を必須としない API であるにも関わらず MSXML というライブラリに同梱されて Ship された。それが最も簡単にリリースする口実だったようだ。

> ... to ship the thing as part of the MSXML library. Which is the real explanation of where the name XMLHTTP comes from-
> ... that was the easiest excuse for shipping it so I needed to cram XML into the name
> (plus- XML was the hot technology at the time and it seemed like some good marketing for the component).
> --- https://web.archive.org/web/20070314021601/http://www.alexhopmann.com/story-of-xmlhttp/

その政治的理由がなければ `HttpRequest` だったかと考えると、モノには歴史と理由があることがよくわかる。


## Ajax

こうして XHR は IE に実装され Outlook で使われたという。 MS の人たちは「他で使われることはないだろう」と思っていたようだが、実際にはこの機能に目をつけた多くのサイトが、 XHR を使い Web サイトに革命を起こしていくことになる。

そうして世界中の Web が便利になっていくその流れに対し、「Web は XHR と DHTML で大きく変わる」という発想自体に名前をつけたのが "*Ajax*" だ。 2005 年に公開されたこのたった 1 つのブログが、 XHR が起こしている Web の変化に名前をつけた。(これもアーカイブ落ちしてしまっている)

- Ajax: A New Approach to Web Applications | Adaptive Path
  - https://web.archive.org/web/20180618181337/http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/

"Ajax" が "AJAX" ではないのは、最初からなんかの略語であることを目指してないからだろう。 "Asynchronous JavaScript + XML" は全部後付けで、 Ajax はアメリカで一般的に使われている洗剤の名前だ。当時が XML 全盛だったことを思い出して欲しい、そこで一世を風靡していたプロトコルこそ SOAP (石鹸)だった。

(昔優秀な後輩が US 帰りに買ってきてくれたお土産の Ajax。ラベルが大文字なのはラベルだからだろう。フロントエンドエンジニアへのお土産に困ったらスーパーで買える。)

![Ajax という名前の洗剤のボトル](ajax.jpeg#500x666)


実際、すでに JSON も存在したため、 XML ではなく JSON が使われることは普通にあった。ただ、今と違ってブラウザに JSON オブジェクトはなく、本当に最初は `eval()` していたが、それはまずいので JSON2.js というパーサライブラリをみんなが入れていた。

(日本人は名前の持つ意味を重要視するために、「Ajax は XML じゃないといけない」などと言い出す人もいた。日本人が思っている以上に英語圏では名前で遊んでることは、知っておいた方がいい)

Ajax も JSON も、すでに存在し実装として使われていたものに名前をつけただけだ。よってこれらは、「策定」や「実装」ではなく単なる「命名」というか「言語化」だ。筆者は実装の中から見出したので「発見」という表現を気に入っている。

Ajax は発見されてから普及したのではなく、すでに大手のサイトでもかなり目立つところで使われていた。当時代表例として挙げられていたのは Google 検索の Suggest だ。検索フォームに入力している途中から、推測して単語をリストしてくれるという今では当たり前のこの機能は、多くの人が「どうやってやってるんだ?」と血眼でソースを読み、真似した機能だった。そこで XHR を知った人も多いだろう。JS はオープンソースじゃなくてもソースがオープンだった良さだ。

もっとわかりやすいところでは、画面遷移せずにグリグリ動かせる Google Map がある。当時こうしたサイトを実装するのは Flash や ActiveX が基本だった(実際 XHR のフォールバックは ActiveX だった)、それがプラグイン無しで動くことに気づいた他の Web 開発者は、雷に打たれていただろう。画面を下にドラッグしたら南側をグレーで塗りつぶし、四角く切った画像を非同期で取ってきてタイル状に並べるなんて発想は、当時の Web 開発にはなかった。

Ajax を用いて作られたアプリは、画面を更新しなくても情報が表示される。この流れがコミュニケーションツールの主戦場をブラウザに移し SNS の隆盛につながった。

XHR で叩く API のアーキテクチャとして REST が、 API 共有するために CORS が、共有の権限付与のために OAuth が、それぞれミッシングピースを補うように整備されマッシュアップにより様々なサービスが作られた。 "Web サイト" は "Web アプリ" になり、できることが増える一方出来ないことが浮き彫りになり、そのギャップを埋めるために HTML5 時代に突入していく。

Web2.0 に括られたこの一連の変化は、 1 レイヤ上の社会基盤としての Web においては、コミュニケーションの変化として捉えられているが、技術基盤に目を向ければ XHR の登場を無視できない。それがなければ今 JSON に色をつけて生計を立てている多くのエンジニアの仕事は、存在すらしなかったかもしれない。

Alex のブログにもあるように、技術的にはすでに数年前からあり、一部では使われていたものでも、そこに名前をつけ、言語化し、輪郭を示し、多少の夢を振りかけてマーケティングを成功させれば、世界に大きな影響を与えるというわかりやすい実例だと思う。まさしく Web3 が追いかけている背中なのかもしれない。


## Fetch の策定

ブラウザがネットワークを経由してリソースを取得することは、仕様上 "fetching resources" というコンセプトで記されている。もともとは Hixi によって HTML5 のスペック中に書かれていた。

- 2.6 Fetching resources | HTML5
  - https://www.w3.org/TR/2009/WD-html5-20090212/infrastructure.html#fetching-resources

ここにあるのは、非常にざっくりとした枠組みだ。 Link Click や Form Submit 以外でも、 XHR, `<img>`, `<script>`, `background-image`, `@font-face` etc etc etc と、様々なところでリソースは取得されるが、それらが実際にどう挙動すべきかは Well-Defined とは言えない状況であり、実装差もあった。

リダイレクトはフォローするか? Basic 認証があったらどうするか? ステータスコードが 700 だったら? 指定されたのが `data:` や `about:` だったら? Referer ヘッダに載せる値は? など、一見簡単そうに見えて実はかなり複雑なのだ。

(ということが、 Ann のブログに書かれていたのだが、このブログはもう消えてしまった。これに至っては WebArchive にもない。 Google 検索のキャッシュがあるので一応リンクを貼っておこう。それがいつまで見られるかはわからないが。)

- Fetching URLs - Anne's Blog
  - https://annevankesteren.nl/2013/05/fetching-urls
  - http://webcache.googleusercontent.com/search?q=cache:fhWIF6caEOgJ:https://annevankesteren.nl/2013/05/fetching-urls&hl=ja&gl=jp&strip=1&vwsrc=0

特に Ajax によるマッシュアップの隆盛が、 Origin を跨いだ連携を必要としながら、現実解が JSONP しかない状態は問題があったため、明示的に Origin を跨ぐ CORS が策定さていくことになるが、その仕様をそのまま HTML5 の仕様に追加していくのは実際かなり複雑だった。その後には、接続先を制限する CSP のマージも考えないといけない。

そこで Ann は、「*ブラウザがリソースを取得するとはどういうことか*」を整理し、仕様として切り出した。それが Fetch のスペックだ。

- Fetch Standard
  - https://fetch.spec.whatwg.org/

この仕様は、 XHR の改善版である `fetch()` を目的とした仕様に見えるが、出自から考えると `fetch()` 自体はおまけのようなものだ。重要なのは仕様の前半に、前述のような細かい挙動をアルゴリズムとして整理し、レビューし、テストを書き、メジャーブラウザがそれを参照することで「どのブラウザでも同じように Fetching が行われる」ことを目指して作られている。し、そこに最大の価値がある。

これにより HTML にある「リソースの取得を伴う API」は全て Fetch を参照すれば良くなった。新しく作られる API も、リソースの取得は Fetch を参照すれば良い。継ぎ足しで作られた仕様が、大きくリファクタリングされたのだ。

Fetch の仕様が生まれたことは、他にも多くの副産物を産んでいる。取得するリソースを示すのは常に URL だが、 IETF の URL 仕様はあくまで BNF でフォーマットを指定するのみで、パースの仕方は実装に依存する。しかし、ブラウザはそれをパースした結果が「どのブラウザでも同じ」でないとセキュリティ上の問題などに発展する。

そこで URL や Encoding や Stream などの仕様が、 Fetch と並行して作られた。

- URL Standard
  - https://url.spec.whatwg.org/
- Encoding Standard
  - https://encoding.spec.whatwg.org/
- Streams Standard
  - https://streams.spec.whatwg.org/

このとき同時に XHR も WHATWG 側で独立した仕様として切り出され、内部では Fetch を参照する形で整理された。つまり、 `fetch()` は XHR の上位互換だ、 `fetch()` にできて XHR にできないことはない。(嘘だ、 XHR は sync でリクエストできる。 `fetch()` は "できな" いのではなく "許さない" のだ。)

- XMLHttpRequest Standard
  - https://xhr.spec.whatwg.org/

こうした低レベル API の整理は、 Extensible Web という標語で語られたこともあったが、実際には Fetch のリファクタリングの副産物だったと思う。しかし、これら仕様が整理した Well-Defined な挙動を、 JS からも扱える範囲で提供した API があるのは望ましい。そこで、それぞれの仕様が単体の API (`fetch()`, `URLSearchParams`, `FormData`, `URL`, `ReadableStream`, `TextDecoder` etc) を提供したことは良い結果をもたらしたため、新しい API をある程度低レベルに分解する方針自体は、これ以降重視されるようになっていると感じる。


## fetch() はなぜ関数か

XHR は `new XMLHttpRequest()` したインスタンスのメソッドを叩いたが、 `fetch()` はなぜ関数になったのか。

```js
const xhr = new XMLHttpRequest()
xhr.addEventListener("load", () => {
  console.log(this.responseText)
})
xhr.open("GET", "/")
xhr.send()
```

同じくインスタンスだったら、たとえば Abort するにも `AbortSignal` なんて不要で `.abort()` を呼び出すだけで良いし、 Stream などなくても `onprogress` イベントをリスナで取れば途中経過も取得できる。

```js
// abort
xhr.abort()

// progress
xhr.addEventListener("progress", (e) => {
  console.log(e)
})
```

確かに旧来の多くの Web API はそのように設計されており、多少の不恰好さ(まあ急いで実装するとそんなものだ)はあるが XHR もそのマナーに従っている。しかし、そのデザイン自体にも問題がある。

たとえば、既に取得の終わった XHR のインスタンスを再度 `.open()` したり `.send()` したら何が起こるべきだろうか? 実は取得が終わってなかったらメソッドの呼び出しにはどう反応すべきだろうか?

「こう実装すれば良いだけじゃないか」と想像するのは簡単だ。問題は、「全てのブラウザが全く同じように挙動する」ことを保証する部分だ。きちんと仕様を定義し、実装もそれを遵守する必要がある。それは想像ほど簡単なことではない。

また、 JS では当たり前に使われているイベントリスナによるイベントハンドリングは、終わったら剥がさないとメモリリークする可能性がある。イベントリスナの掃除は面倒だ。イベント名を指定するだけで消えるなどの API ならまだ良いが、ブラウザではどこから取得した JS でも同じスコープで実行されるため、他人の貼ったイベントリスナを消せてしまうと問題がある。そこで、削除対象のコールバックの参照を指定させることで、追加した人にしか消せない設計になっている。理屈はわかるが丁寧にそのクリーンアップを実装するのは面倒だ。

`fetch()` は、 Request を受け取り Response を返す単なる関数だ。だから良かったのだ。

結果を非同期にするためには、既に策定されていた Promise を使えば成功か失敗で表現できる。 Resolve/Reject されるのは一度だけであり、 `then`/`catch` に渡されたコールバックも一回しか呼ばれないし、状態が確定すればその Promise は終わりだ。この設計は、前述のような問題を起こしにくい。

```js
fetch("/")
  .then((res) => {
    console.log(res)
  })
```

さらに `await` でうまく構文糖衣されたことも、見た目上のインパクトがでかい。

```js
const res = await fetch("/")
console.log(res)
```

チャンクの取得は、 Response から取り出す Stream で表現できる。

Stream もまた "*Promise の List*" として捉えることができるため、同様のメリットがある。これが EventEmitter ベースで設計された Node.js の Stream との最大の違いだ。

```js
const res = await fetch("/")
const reader = res.body.getReader()
while (true) {
  const result = await reader.read()
  if (result.done) break
  console.log(result.value)
}
```

(本当は for await of でもっとスッキリ書きたいところだが、ブラウザはまだ実装してない。)

では、どうやって走り始めた `fetch()` をキャンセルするのか。 Response は Resolve されてからしか手に入らない。かといってインスタンスも作りたくない。そこで新しく導入されたプリミティブが AbortSignal だ。その流れを踏まえてみると、この冗長に見えるコードも必然的にこうなったことがわかるだろう。

```js
const controller = new AbortController()
const signal = controller.signal
setTimeout(() => {
  controller.abort()
}, 1000)
const res = await fetch(req, { signal })
```

最近の新しい DOM API も、 `onopen` などの単発イベントの代わりに Promise を返し、 `ondata` のような連続するイベントの代わりに Stream を使うものもみるようになった。(Service Worker, WebTransport etc)

DOM に限らず、インスタンスを持たずに純粋な関数に保つという思想は、その後のフロントエンドではかなり浸透しているだろう。 React が Hooks に移行したのも同じような理由だ。返す値を Promise で包むだけで非同期の世界に持ち込めるのも、それを AbortSignal や Stream で制御するのも、今のフロントエンドのパラダイムに少なからず影響を与えていると思う。


## Node の Fetch

Node.js に `fetch()` が入ることになってから、「これで Polyfill が要らなくなり、バンドルが小さくなる」みたいに思った人もいれば、「ブラウザだから必要だった制約を含む `fetch()` が、 `A-C-A-O` も `Sec-*` もつけ放題な Node で守られるわけがない。だいたい Origin はどうするんだ」といった多少的を得てそうな反応、「なら XHR も入れて欲しい」といったものまで、様々な議論を呼んだ。では、なぜそんなことになったのか。

Node は「次の 10 年をどうするか」を考えるフェーズになり、 Next-10 というミーティングで課題を洗い出し議論している。2022 年 1 月の Mini Summit では "Modern HTTP" と題し「HTTP/1, 2, 3 を誰がどうやってメンテしていくか」という議題が上がった。

- next-10/summit-jan-2022.md at main - nodejs/next-10
  - https://github.com/nodejs/next-10/blob/main/meetings/summit-jan-2022.md#modern-http

Node の HTTP Module は、 http_parser の部分をガッツリと C で書いており、メンテの問題は以前からあった。さらに H2, H3 を合わせてメンテしていくには、あまりにメンテナが不足していた。

そこで llhttp に注目が集まる。これは、 node の http_parser を llparse に移植したもの。 llparse は JS で書いて LLVM IR を出力できるため、 JS/TS でコードベースがメンテ可能になるのだ。 C でメンテするよりも楽になるだけではなく、速くなったという話もある。

この llhttp を使ったクライアントライブラリが unidici で、イタリア語で 11 という意味だ。 HTTP/1.1 のライブラリであることを意味している。

Next-10 で議論されたのは、ものすごく雑にまとめると「unidici を入れてしまえばいいのではないか?」という話だ。それだけ出来が良かったということだろう。

すると当然 unidichi の API を Node から全部出すのか? という話になる。しかし、触れるところを増やすのは後に響く問題になりやすいし、直接 socket を触りたい時もあるが、大抵はリクエストを投げてレスポンスを受け取れればいいだろう。結果「程よく抽象化され、かつ適切に制御ができる必要十分な API」が必要となる。そこで白羽の矢が立ったのが `fetch()` だったのだ。

`fetch()` を入れたかったというよりも、入れようとしたら `fetch()` くらいしかなかった。 Polyfill がどう、バンドルサイズがどうという話とは、レイヤの違うところで行われていた議論の結果だったといえる。が、実際に作業を始めると案の上スレッドは長く伸びた。

- lib: add fetch by targos · Pull Request #41749 · nodejs/node
  - https://github.com/nodejs/node/pull/41749

「え? fetch() 入れるの? CORS は? Cookie は? FormData や URLSearchParams は?? WPT (Web Platform Tests) は通すの?」などの、およそ想像通りの反応をみると、そこにあったインピーダンスミスマッチは「Fetch を入れる」と「`fetch()` を入れる」の違いととれる。 Web に詳しい人は前者だと思い、 Node メンテナが求めていたのは後者だけだった。 Node では名前を変えるという案もあったが、変えたところで誰も得はしなかっただろう。


## Winter CG

同じような問題は Deno や CDN の Edge Computing でも起こる。 "ちょうどいい" Client や Server の API は、存在自体に価値があるのだ。

Fetch や Service Worker の API は、 ECMA で定義された Promise や `await` などのプリミティブと、 WHATWG で定義された Stream や URL とをうまく組み合わせて作られている。うまく組み合わせるというか、足りないものを補いながら発展していることの帰結だろう。

もちろん、それが「ブラウザで使われる」ことを前提に策定されていることで、他のプラットフォームで使おうと考えると問題が出ることはある。 ECMA は中立であるが、WHATWG はそのための組織なので当たり前といえばそれまでだ。

「もし、もう少しブラウザ以外のことも考慮すれば、より広いプラットフォームで使えるだろう」というのが、 fetch on Node や Service Worker on Edge Worker などから得られる絶妙に苦い教訓で、そこをなんとかしようというのが、 Winter CG の目的だというのが筆者の理解だ。

位置付けは W3C の Community Group であり、実際に仕様を書くというよりは、 WHATWG/W3C が行っていることに対して、ブラウザ以外の視点からフィードバックを送るというスタンスとされている。この Group の成果によって、今後 Web API / JS が Cross Platform なスコープに広がるのは良いことに思える。一方で、ブラウザ間での合意も難しい標準化に、前提が違うブラウザ以外のプレイヤー参入が増えることで、議論の収集がつかずフットワークが重くなったりしないことは祈りたい。


## 移行期

`fetch()` のような新しい API が出てくると「XHR はもう古い、これからは `fetch()` だ」と早々と言い出す人は一定いたわけだが、初期の `fetch()` はまだ AbortSignal も ReadableStream も無かったため、キャンセルもプログレスも取れず、勇み足な移行をした人も多かったかもしれない。

どちらにせよ、 IE のために Polyfill を入れる必要があり、 `fetch()` の Polyfill を XHR で実装するという自己矛盾感半端ないライブラリを踏み台に、徐々に移行が始まっていった。

Promise ベースでありながら Polyfill でもあり、痒いところにも手が届く Axios がちょうど良い落とし所になり、今でも多くのコードベースに SWR あたりと一緒に入っているだろう。

そうこうしているうちに Stream が入り、遅れて紆余曲折あった AbortSignal も実装がそろい `fetch()` は完成形に近づき、それらは Node にも入りつつある。IE がリタイアしそのサポートを切ることができるのであれば Polyfill する必要はなく `fetch()` はそのまま使える。

XHR をあえて使う理由も、しょうがなく使う理由も、無くなる一方だろう。


## Outro

今となっては嫌われる「ブラウザ独自機能」として始まった XHR だが、もしあのタイミングでこれがなかったら、我々はいまだに Web1.0 の世界観に留まっていたかもしれない。

XHR が存在しない世界線で標準化のマナーに則り「ブラウザから JS で HTTP を叩く `fetch()` という API を作ろう」と言い出して、議論が進んで標準化を迎えていたかというと、その姿は想像しがたい気もする。標準化プロセスを伴って策定を進めることは大事だが、それが浸透した現在にたまに現れる「枠を外れた提案」に対して「気持ちはわかるけど気持ちしかわからないなぁ」などという杓子定規でしか見られてないんじゃ無いかと、思わず自戒する。

DHTML 以上に発展してなかった世界線では、その後我々が直面した HTML5 も、 PWA も、 SPA もないだろう、 JS API を中心とした今の Web のエコシステムは発展していただろうか? フロントの JS も大して書いてない開発者に、 Node が今ほど受け入れられていただろうか? Frontend Engineer という職種が生まれることも無かったかもしれない。

独自実装という忌み嫌われがちな出自ながら、その後世界を変えるほど大活躍し、今では標準化され一定の互換性を保っているにもかかわらず、これから徐々に使われる機会が減っていくというドラマのような栄枯盛衰を辿る XHR という API が存在したことを、急に残しておきたくなった。
