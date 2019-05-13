# [ping][ecosystem][web] Web における技術の解釈とエコシステムによる合意形成プロセスについて


## Intro

「ユーザが意図する挙動」とは何か。技術的に可能であるが「やらない方が良いこと」は、誰がどう決めるのか。

Web には仕様、実装、デプロイ、そしてユーザの利用とフィードバックによって、そうした合意がゆるやかに形成されていく仕組みがあると筆者は考えている。

しかし、これは明文化されているわけでもなく、その全体像を把握するのは一般には難しいだろう。

今回は、ちょうど何度目かの議論が再発している ping 属性を例に、この合意形成の概観について解説を試みる。


## リンクの ping 属性

`<a>` には ping という属性があり、以下のように URL を指定する。


```html
<a href=https:example.com ping=/path/to/report>example.com</a>
```

[HTML Standard - ping Attribute](https://html.spec.whatwg.org/#ping)

このリンクは、クリックすると https://example.com に遷移するが、ブラウザは遷移すると同時に `/path/to/report` に対して、おおよそ以下のようなリクエストを投げる。


```http
POST /path/to/report HTTP/1.1
Content-Type: text/ping
Ping-From: http://labs.jxck.io/ping/
Ping-To: http://labs.jxck.io/ping/

PING
```

[HTML Standard - 4.6.5.1 Hyperlink auditing](https://html.spec.whatwg.org/#hyperlink-auditing)

このリクエストには `Ping-From` / `Ping-To` ヘッダが含まれ、それぞれの値は遷移元/遷移先の URL となる。

したがって ping リクエストを収集することにより、ユーザが「*どのページからどのページに遷移したか*」を取得することができるのだ。

従来も HTTP の Referer ヘッダを見れば「そのユーザがどこから遷移して来たか」を取ることができた。

ping 属性はこれに加え「どこに遷移して行ったか」を標準仕様だけで取ることを可能にし、より精度の高いユーザの行動解析を可能にするものだ。

身近な ping の導入事例としては、 Google の検索結果がある。 ping を実装したブラウザでリンクを踏むともれなく ping が飛んでいることだろう。


## Ping と Privacy

もし、この仕様を知らなかった人であれば、以下のような感想を最初に持つかもしれない。

- 「リンクをクリックしただけで遷移先が取得されるのは気持ち悪い」
- 「プライバシーの侵害ではないのか」
- 「トラッキングのための機能が標準仕様に入っているのは問題だ」

その感想自体を否定するつもりはない。

結果として「*気持ち悪い機能だから標準から削除された方が良い*」と言いたくなる気持ちもわかる。

しかし、本当にそれが気持ち悪さの根本にある問題を解決しているのかというと、そうとは言い切れないし、かなり長い間議論されているが実際には消えていないという現状がある。

ましてや、標準仕様でありながら「ユーザの意図しない挙動」であると捉えられ、新たな悲劇が起こるといったことも、笑い話ではないご時世だ。

そこで、この仕様について交わされてきた議論の経緯を踏まえることで、 Web はこのユーザの持つ「気持ち悪さ」にどうアプローチし、ユーザをどう守るのか、なぜ今この仕様が消えていないのかについて解説する。


## Hyperlink Auditing

Web はハイパーリンクで繋がるモデルを採用し、それによって多くのページ/サイトが連携を成してきた。

ユースケースによっては「ユーザがどこから来た」や「どこに出て行ったか」を知りたいというニーズは普遍的にある。

それぞれの取得は、技術的には複数の方法がすでにあり、使用されている。

- 流入(どこからきたか)
  - Referer
  - Tracking Cookie
  - URL パラメータ
- 流出(どこにいくか)
  - JS でフックし送る
  - リダイレクトを挟む
  - ping 属性

ここでの問題は流出先の収集方法だ。


## 流出先の収集


### JS

最も想像しやすい手法は、 JS を用いた実装だろう。

`onclick`, `onunload`, などをフックし、遷移の前に必要な情報を載せたリクエストをサーバに飛ばす方法だ。

XHR で飛ばすこともできるが、非同期だと送り終わる前にページが遷移してしまうなどの理由により、あえて同期の XHR でリクエストを投げ、終わるまで処理を止めてるという場合もある。


```js
window.addEventListener('unload', (e) => {
  const xhr = new XMLHttpRequest()
  xhr.open('post', 'https://beacon.example/', false) // sync xhr
  xhr.send(data) // 必要な情報を収集する
})
```

最近は Off The Main Thread の流れもあり、同期の XHR は徐々に無くしていく方向になっているため、標準化されている Beacon API や Keep Alive Fetch などを利用するのが理想的だ。


```js
window.addEventListener('unload', (e) => {
  fetch('https://beacon.example/', {
    keepalive: true,
    method: 'post',
    body: data // 必要な情報を収集する
  })
})
```

JS で行えば、収集する情報もタイミングも、柔軟に設定できることは容易に想像できるだろう。


### リダイレクト

もう一つ、広く採用されている方法にリダイレクトがある。

例えば SNS や Chat などで URL を共有すると、以下のように URL が表示されるが、 href は別の URL に差し替えられている、という場合がある。


```html
<a href=https://redirect.example?to=https://hello.example.com/world.html>https://hello.example.com/world.html</a>
```

この場合、実際の遷移先のパラメータを入れておくことで、リダイレクト先で流出先を収集し、その後すぐリダイレクトをかけるというものだ。

Referer をとるか、 from をクエリに追加すれば、 `Ping-From`, `Ping-To` 同等の情報が得られる。


## 画面遷移の UX

実装方法は色々あるが、いずれにせよ「流出先を知りたい」と思うサービスは、なんらかの方法でそれを実現しており、ユーザは日常的に収集されていると思って良いだろう。

その結果、画面遷移の前のリダイレクトやブロッキングスクリプトの実行などにより、単なるリンクのクリックの裏では追加の処理が発生し、パフォーマンスを損ねているものもある。

収集されている情報も、遷移先だけとは限らない。そこに識別子など追加の情報を含めることも実装次第で可能だ。

標準がないために実装方法はサービスに依存し、実際に何が起こっているのかを正確に把握するのは、非常に難しい。


## 標準化された手法

ping 属性が標準化され、ブラウザに実装され、サービスが独自に実装する代わりにそれを利用すると、大きく 3 つのことが期待される。


### 挙動の改善

もし、サービスが標準の ping 属性を用いていれば、追加の JS を実行することも、同期 XHR でレンダリングをブロックすることもない。

Beacon や Keep-Alive Fetch を投げるための JS を追加で取得する必要も、複数のリダイレクトを繰り返され、真っ白な画面を待つ必要もない。

ユーザは、リンクをクリックしたら画面が遷移する、という普通のことをオーバーヘッドほとんどなしで行うことができる。

API が使われれば使われるほど、ブラウザの最適化も進み、パフォーマンス、セキュリティ、 a11y などの非機能要件が改善するサイクルも期待できる。

つまり、 UX を損ねることなく同等の要件が達成できる。


### Privacy の担保

標準化された API であるということは、送られる情報も仕様に定義されているため、把握することができる。

今の仕様では、 Referer は付与さず、 Ping-To に遷移先 URL 、 Ping-From に遷移元が載るのが基本だ。

(ただし、 ping を送る URL が Origin をまたぐ場合や HTTPS でない場合は Ping-From は削除される)

現在の仕様では ping に情報を追加する API は無いため、ブラウザが独自拡張をしない限り「何が送られるのか」を把握することができる。


### Opt-Outable/User-Visible

前述の 2 つにも増して最も強調したいのは、ブラウザの設定により「ユーザがコントロールできる余地が生まれる」ことだ。

まず、 ping の仕様には以下が記述されている。

> User agents should allow the user to adjust this behavior, for example in conjunction with a setting that disables the sending of HTTP `Referer` (sic) headers. Based on the user's preferences, UAs may either ignore the ping attribute altogether, or selectively ignore URLs in the list (e.g. ignoring any third-party URLs); this is explicitly accounted for in the steps above.
> --- <cite>[HTML Standard](https://html.spec.whatwg.org/multipage/links.html#hyperlink-auditing)</cite>

つまり、この機能はブラウザの設定による無効化や、送られる情報の制限といった、ユーザコントロールの余地を盛り込むことが可能なのだ。

JS による収集は、究極的には JS を無効にしなければ Opt-Out できない。

リダイレクトも同様、仮に無効にすると Web の通常利用もままならなくなるだろう。

各サービスが独自の実装の代わりに標準機能を利用すると、その機能をどう提供するか、どこまでをユーザがコントロール可能にするか、などといった裁量が、サービスからブラウザとユーザに移る。

また、こうも書かれている。

> When the ping attribute is present, user agents should clearly indicate to the user that following the hyperlink will also cause secondary requests to be sent in the background, possibly including listing the actual target URLs.
> --- <cite>[HTML Standard](https://html.spec.whatwg.org/multipage/links.html#hyperlink-auditing)</cite>

各サービスが情報収集を行なっている場合、規約などに書かれているかもしれないが、実際に何がいつ送られたかまではユーザは知らされない。

あくまで JS が裏で走っているか、リダイレクトを繰り返しているだけであり、タイミングも画面遷移が伴っていることもあって、ここを indicate しているサービスを筆者は見たことがない。

しかし、ブラウザに実装された機能を使うならば、ブラウザはなんらかの方法で UI 上に通知することも不可能ではない。

実際にそれを行っているブラウザはまだないが、 ping 属性がなければ、ユーザはいつまでも選択肢を得ることすらできなかったのだ。


## 標準と実装と合意形成

「意図しない動作」かどうかは個人の主観だというのが筆者の意見だ。

遷移先の収集を「意図しない動作」だと思うも、別に気にしないのも、サービス改善のために積極的に提供したいと思うのも自由だ。

しかし、現状はサービスに対して自身の選択を反映させることができないという現状がある。あってもサービスを使わないといった極端なものだ。

ping を標準化し、 User-Agent が実装し、サービスが独自の実装を捨ててそちらに移行することは、標準を通じてユーザが「自身の閲覧環境は自身が選択する」というもっとも根本的な権利を取り戻すことに繋がる。

仮に ping が一般に認知され「サービスは ping を使い、ユーザは設定でその挙動をコントロールできる」という合意が形成されたとしよう。

するとユーザは、そのコントロールの有無によって、使用するブラウザを選択したり、拡張などによるカスタマイズを行うことができる。

ping 属性を無視し独自実装を続けるサービスは、ユーザから非難されたり、専門家が啓蒙するいったフェーズに移る。

ここまできてはじめて、従来の実装は *情報の収集を望まないユーザ* が *自身の設定した選択が正しく反映されない* という「意図しない動作」であると判断されるにたる、合意形成ができたといえるのではないだろうか。


## 合意とエコシステム

ping に限った話ではなく、 Cookie, Referer, Permission, Pop-Up Blocker, ITP, Private Mode なども、個々に性質や結果は違えど、同じような経緯を辿り今に至っていると言っていいだろう。

今問題になっているマイニングも、こういうプロセスを経ることで、より健全な形で運用することも、本来はできたはずである。

例えば、無尽蔵にリソースを消費されるのが問題ならば、ユーザがマイナーとネゴシエーションし、その制限を付与するといった選択肢が考えられる。

それが Permission API や QuotaManagement API の延長に標準化され、ブラウザはその CPU 利用などを UI 上で表示したり、一切を無効にする設定を加えることも不可能では無いだろう。

サービスは、ユーザの明示的な許可を得てそれを行い、 ViewPort を埋め込み広告で汚すことなくマネタイズ手段を確保するという選択肢を得られたかもしれないし、ユーザはマイニングを拒否することも、広告の代わりにマイニングを選択することもできたはずだ。

そこまで合意が形成されれば、そのエコシステムを完全に無視して、無尽蔵なマイニングを行うスクリプトを走らせたサービスを「意図しない挙動だ」と言って非難することに、違和感は無いだろう。

しかし、日本では早い段階でこのプロセスにその仕組みを理解しないコンテキストからの権力が介入し、勝手に「意図しない挙動を」定義してしまった。

これは、「広告が表示されるくらいならマイニングされる方が良い」というユーザの選択肢や、「広告以外の方法でマネタイズができるかもしれない」というコンテンツの可能性を奪うだけでなく、あまつさえ「その合意形成のプロセスに積極的に参加する」ことすらを罪としてしまった。

罪の根拠としてプロセスの参加者が誰も納得しない別の合意が提示されたようだが、本来それが妥当かどうかを検証するプロセスが毀損されているのだから、それ自体が矛盾しているとしか筆者には見えない。

もちろん、合意の形成はゆるやかに行われるものだ、その間にユーザが危険にされされる可能性もあるだろう。

ちょうど先月、 Firefox の safe browsing の [black list](https://github.com/mozilla-services/shavar-prod-lists/blob/7eaadac98bc9dcc95ce917eff7bbb21cb71484ec/disconnect-blacklist.json) が更新され、マイニングの URL が追加された。

これは、ようやくプロセス自体が周り始める兆しだったと見ることもできただろう。

他のブラウザの動き、マイニングサービスからのフィードバック、サービスの検証、ユーザの反応、標準化への提案。

その結果、完全悪になることもあるかもしれない、より建設的ななにかにたどり着くかもしれない。

今となっては、少なくとも日本ではこのプロセスに参加することはもうできないだろう。

どうあるべきかを議論することすらできなくなる現状は、大変な機会損失では無いだろうか。


## ping の実装の現状

話を戻すと、 ping はまだこうした合意形成の途中と言える。

いまだに Privacy を懸念する声があがることもあり、[情報を追加するための API](https://github.com/w3c/html/issues/369) を求める声もある。

実装についても、現時点ではまだ各ブラウザで差がある。

- Chrome: 実装済みデフォルトで有効
- Safari: 実装済みデフォルトで有効
- Firefox: 実装はあるがフラグで無効化
- Edge: Chromium ベースの実装を継承
- IE: 未実装

[Can I use - ping](https://caniuse.com/#feat=ping)

ユーザコントロールについては、 Chrome は無効にすることが可能になっている。

しかし、いわゆるメニュー画面ではなく、 chrome://flags であるため、開発者向けの色合いが強い。

Safari は、最近この件について態度を表明した。

メニューからは無効にできないが、トラッキングから Opt-Out する手段として Content-Blocker を提供するというものだ。

あまりに簡単に Opt-Out できると結局サービスが ping を使わなくなるため、デフォルトで 1st Party での収集を許可し ITP 同様 3rd Party の収集を厳しくする方針だ。

これは理想と現実のバランスを非常によくとった提案の一つだと筆者には思える。

[Link Click Analytics and Privacy - WebKit](https://webkit.org/blog/8821/link-click-analytics-and-privacy/)

Firefox は有効にするには `browser.send_pings` が必要だ。

[Intent to implement and ship: ping, rel, referrerPolicy, relList, hreflang, type and text properties on SVG elements](https://groups.google.com/forum/#!msg/mozilla.dev.platform/LXzY4gwaZFU/fVJIr55OAwAJ)

各ブラウザの態度は、仕様の議論からも透けて見える。

- [Add text for the ping attribute - Issue #369 - w3c/html](https://github.com/w3c/html/issues/369)
- [Privacy concern with ping attribute - Issue #1456 - w3c/html](https://github.com/w3c/html/issues/1456)
- [Privacy concern with ping attribute - Issue #3718 - whatwg/html](https://github.com/whatwg/html/issues/3718)

この先どのような合意が形成されるかは未知だが、 Safari がブログで態度を表明したことは、この流れに少なからず影響するだろう。

次の Edge も Chromium が実装済みの ping を継承しているため、その UI をどうするかという議論には参加することになるだろう。

平成で決着がつかなかったが、令和元年は何かしら進展のある年になりそうなので、主にブラウザの UI 周りの動きを注視していくつもりだ。

そしてなによりも、「Web のエコシステムによる合意形成プロセス」がこれ以上毀損されないことを願いたい。
