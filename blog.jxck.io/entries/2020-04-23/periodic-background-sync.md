# [periodic background sync][service worker] Periodic Background Sync 及び Web を Install するということ


## Intro

メールクライアントや RSS リーダーのようなユースケースを PWA で実装する場合、バックグラウンドで定期的にタスクを実行したいケースがある。

このユースケースに特化した API として提案されているのが、 Periodic Background Sync(PBS) だ。

しかし、この API を取り巻く議論は「Web にアプリのような API を持ち込む上での難しさ」を物語っている。

この API が Web において正当化できるかどうかは、 Project Fugu に代表される Application Capabilities を Web に持ち込む場合の試金石になりそうだ。

現時点での、仕様、実装、議論について解説する。


## Periodic Background Sync

Web で定期的なタスクを実行する場合、タブが開いていれば `setInterval()` などで行うなどが可能だ。

しかし、メールクライアントの受信ボックス更新のように、バックグラウンドで定期的にタスクを実行したい場合がある。

従来からある Service Worker の Background Sync は、 Offline 中に失敗したタスクを Online 復帰時に再実行するというユースケースに寄せて設計しているため、この用途では使いにくかった。

そこで、定期的に実行することに特化した API として提案されているのが Periodic Background Sync(PBS) だ。


### API

現在提案されている API は非常にシンプルだ。

まず ServiceWorkerRegistration 経由で task を登録する。


```js
const registration = await navigator.serviceWorker.ready
await registration.periodicSync.register('update-feed', {
  minInterval: 12 * 60 * 60 * 1000 // 12h
})
```

すると、 Service Worker 上で定期的にイベントが発火する。


```js
self.addEventListener('periodicsync', (e) => {
  console.log('periodicsync', e)
  e.waitUntil(async function() {
    const mails = await fetch(MailBox)
    return cache.addAll(mails)
  }())
})
```

このイベントをフックして、タスクを実行すれば良い。

コードは単純だ、ただしこの API がそのまま制限なく使えてしまうと、セキュリティ上の問題が生まれる。


## Security/Privacy Consideration

まず、定期的に SW を起動できるため、そこで Crypt Mining などのリソース消費が可能になる。

また、  PBS で Server に対して Fetch を行えば、 Server は Client の IP を定期的に知ることができる。

一度 SW が登録されたら、ユーザがアプリを開いてないところでも、ユーザが認識できない形でトラッキングが可能ということになってしまう。

![定期的に IP を取得することで、国をまたいだ移動などをトラッキング可能](./ip-tracking.png#2032x1084 "IP Tracking by Periodic Background Sync")

また、 PBS 内での fetch 先を特定の攻撃対象に設定すれば、発生タイミングをある程度指定して DDOS を行う、 Bot Net の構築に応用可能であることも指摘されている。

- [Periodic Background Sync has serious security risks, which are not described or adequately mitigated - Issue #169 - WICG/BackgroundSync](https://github.com/WICG/BackgroundSync/issues/169)

これらは、 Periodic ではない従来の Background Sync でも同様であるため、現在 Mozilla は従来の PBS に加え、従来の Background Sync も Considered Harmful と表明した。

![Mozilla は PBS/BS 双方に Harmful という Position を表明している](mozilla-standard-position-for-sync.png#2416x974 "Mozilla Standard Position for Periodic Background Sync & Background Sync")

- [Mozilla Specification Positions](https://mozilla.github.io/standards-positions/#periodic-background-sync)

ユーザを危険に晒す機能はそのままでは標準化できないため、策定を進めるにはなんらかの安全措置を講じる必要がある。

今回の場合は、ユーザの許可なく PBS が登録され、任意の状態(タイミング)でイベントが発火し、任意のタスクが実行できる場合に発生する問題のため、これらを防ぐための制限が必要だ。

現状仕様には [Privacy Consideration](https://wicg.github.io/BackgroundSync/spec/#privacy-considerations) が追加され、この問題に対する実装上の対応を求めている。

では、 PBS を実装している Chrome は、これらの問題にどう対応しているのだろうか。


## Chrome での実装

まるで PBS という機能自体が悪いかのように読めたかもしれないが、同様のことは Native App では実現可能だ。

問題は、その機能自体というよりは、それをユーザに対して安全に有効にするためのクライテリアにある。

そこで、現状 Chrome は PBS の利用について以下の制限を課している。

- Android Chrome のみ
- Install (Add to Home Screen) されている
- Site Engagement が十分ある
- Known Network に接続している
- その他

順番に見ていく。


### Install (A2HS)

現状では、サイトに訪れて Service Worker が登録されただけでは使えない。

正確には API は触れても、 Permission が付与されてないためだ。

この PBS を使うための Permission は、 Permission Prompt や Site Settings ではなく Install (Add to Home Screen) によって付与される。

本来 Web は、インストールのような操作なく、 URL にアクセスするだけでページが読み込まれ、スクリプトが実行される。

ここで強力な機能(Powerful Features)がユーザの同意なく実行されると、意図しない問題が発生する可能性がある。

そのため、ここまでの機能は、その API の重要性に応じて User Gesture, Feature Policy, Permission Prompt などを使い分けてきた。

一方、 Native App は、強力な OS 機能の利用を、ユーザによる明示的なインストールという操作(とそこで発生する認証や追加許諾)によって許可してきた。

この考え方に合わせれば、 「Web もユーザが明示的に Install すれば、 Native と同等の機能を許可できるのではないか」という発想に至る。

すでに MS は PWA を Store に並べるといったこともしており、 Install が OS ネイティブの Prompt を経由するのであれば、ある一定の説得力は有るだろう。

また Add to Home Screen するには Chrome の場合 [install criteria](https://web.dev/install-criteria/) をクリアする必要があり、すでに一定のしきい値を設けている。

Android Chrome はこの方針を採用し始め、 PBS もこの方針に則っている。


### Site Engagement

Install すれば何でもできるか、というとそうはならないため、 Install だけでは PBS は発生しない。

全てのサイトが、無制限に PBS を発火するのは、 Tracking だけでなくバッテリーやネットワークリソース(俗にいうギガ)の消費の問題も出る。

PBS を導入したサイトが多くなり、それらの登録したタスクを律儀に全部実行していては、リソースの消費は無視できないだろう。

そこで Chrome は、頻繁に使うサイトの PBS の頻度は高く、使ってないサイトでは発火させない、という Intervention を導入している。

Native App の場合も、同様のことが OS レベルで行われ、 iPhone であればそもそもアプリ自体が UnInstall されたりするのに近い。

Chrome は、サイトの使用頻度を収集し Site Engagemnet という指標を Chrome 内部に作成している。

Site Engagement は以下の URL で確認できる。

- <chrome://site-engagement/>

![Chrome の site-engagement ページで、サイトの利用頻度を表示できる](site-engagement.png#2414x1108 "Site Engagement Page")

この値が高ければ PBS は minInterval に近い値で発火し、そうでなければほとんど発火しない。

開発時は、自分でこの値を調整して発火されることもできる。


### Known Network

Chrome はさらに、 PBS が発火する条件に、家や職場など普段使っている Network への接続を条件としている。

つまり、移動した先で新しく接続された Network では発火しないため、前述のようなトラッキングベクタにはなりにくい。

普段使っているネットワークで、 Site Engagement が高いということは、フォアグラウンドでのアクセスも多いことが予想される。

そうであれば、 PBS だろうとフォアグラウンドだろうと、サーバに伝わる情報はほぼ同じであるため、エントロピーを下げられる。


### その他

現在の実装に強く依存しているが、他にも minInterval が最低 12h に制限されたり、 Task のために SW を起動する時間を制限したりといった実装も入っているようだ。


## Install した Web は Native App と何が違うのか?

筆者にとって、 PBS を取り巻く議論における最も興味深い点は「Install する」という権限モデルだ。

確かに、 URL にアクセスするだけで Script が実行される Web において、 PBS のような機能を正当化するのは難しい。

しかし、 Native App では、 PBS のような機能は明示的な許諾なく実現されており、それを正当化する根拠は「ユーザが明示的に Install したこと」に大きく依存している。

Web は、こうした Native App だけが持つ機能を取り込むために、それを正当化する Permission の付与を長らく思考錯誤していた。

特に Push における Permission Prompt のように、それを Web 上で独自に再現する方針には限界があった。

そこで Native App 同等の機能を Web に持ち込む上で求められる権限モデルを、 Web 上で再現するのではなく Native に寄せるという結果が Web の Install と言えるだろう。

今はまだ Web を Install するという行為が、ユーザにとって一般的なことではないため、それだけで正当化できる問題とは言えない。

しかし、もし今後ブラウザ UI の改善や、 Platform Store からの導線、 OS との統合などが進むのであれば、ユーザにとっては Web とアプリで提供されているサービスを使い分けるのとかわらない体験になるかもしれない。

筆者が 2018 年の builderscon や 2019 年の JSConf で話した内容は、この Security Model がどう更新されていくかにフォーカスした内容といっても良いが、その一端が垣間見えてきたと感じている。


<iframe width="560" height="315" src="https://www.youtube.com/embed/_LzSBr99kkw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


TODO: JSConf の動画(会長の公開待ち)

おそらく「Web を Install する」という世界の是非は、まだまだ足りてない議論が多い。 Security/Privacy の問題、実装上の問題、 Store Vender/Platformer の立場の問題、開発者の好き嫌いのような感情の問題など、多くの議論がこれからなされていくだろう。

その結果は PBS のみならず、別途議論されている Web USB や WebPackaging など、従来の Web の枠を広げようとする議論にも影響していくと考えられる。

もはや Web の生態系をがらっと変えるかもしれないこの動きが、今後どうなっていくのか、注視していきたいと思う。


### DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/service-worker/periodic-background-sync/>

前述のように動作させるのは少し難しい。


## Resources

- Spec
  - <https://wicg.github.io/BackgroundSync/spec/PeriodicBackgroundSync-index.html>
- Explainer
  - <https://github.com/WICG/BackgroundSync/blob/master/explainers/periodicsync-explainer.md>
- Requirements Doc
  - <https://docs.google.com/document/d/1FI4x3G6vzEWDplghSx-pH13aAwuGHiUGtXliEkZf0Vc/edit#heading=h.puhs715welcu>
- Mozilla Standard Position
  - <https://github.com/mozilla/standards-positions/issues/214>
- TAG Design Review
  - <https://github.com/w3ctag/design-reviews/issues/367>
- Intents
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KSJViFp3hMc/e-Yzd3_-AwAJ>
- Chrome Platform Status
  - <https://www.chromestatus.com/feature/5689383275462656>
- Blog
  - <https://web.dev/periodic-background-sync>
- Presentation
  - <https://speakerdeck.com/jxck/periodic-background-sync>
- Issues
  - Periodic Background Sync has serious security risks, which are not described or adequately mitigated - Issue #169 - WICG/BackgroundSync
    - <https://github.com/WICG/BackgroundSync/issues/169>
- Other
  - Site Engagement - The Chromium Projects
    - <https://www.chromium.org/developers/design-documents/site-engagement>
