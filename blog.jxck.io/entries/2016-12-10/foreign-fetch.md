# [fetch][service worker][origin trials] Foreign Fetch による Micro Service Workers

## Intro

Service Worker に Foreign Fetch という機能が提案されている。
この機能があるとクロスオリジンへの fetch をフックできる Service Worker を、その対象オリジンから提供できるようになる。
一体どういう仕組みなのか、これによって何が可能になるのかについて、デモを交えて記す。


## 1st Party と 3rd Party

例えばこのブログであれば、筆者本人が Service Worker を登録することで、 Push などの機能を提供することができる。

ここではこれを、 1st Party の Service Worker とする。

またこのブログは、 3rd Party のサービスとして Google Analytics や Youtub などを利用している。

もしサイト全体をオフライン対応するとなれば、 1st Party のコンテンツのみだけではなく、 3rd Party のコンテンツや API についても、オフライン対応が必要となるだろう。

方法の一つとして、 1st Party の Service Worker の中で、全ての 3rd Party サービスもオフライン対応することは可能だ。

onfetch でフックした Request に Response を紐付けてキャッシュを行う従来からの方法で素直なオフライン対応を実現することは可能だ。

ところが、別オリジンから配布される JS/CSS のライブラリや、 Font/Image などのコンテンツ、地図やカレンダーなど、依存する 3rd Party サービスが増えてくれば、対応すべき対象は増えていくことになる。


## 1st Party Service Worker の限界

そして、 1st Party と 3rd Party のサービスは基本的には Cross Origin の関係になるだろう。

この場合 3rd Party コンテンツへの fetch を 1st Party Service Worker でフックした場合、そのレスポンスは Opaque となり中身を見ることができない。 Cache API への単純な保存は可能だが、より細かい制御を必要とする場合、オリジンが異なることは大きな制限となる。

もし 3rd Party のサービスが CORS に対応しているなら、 Same Origin の Response と同じく中身を見ることができるため、この問題はない。

しかし、 1 つのページの controller になれる Service Worker は 1 つだけであるため、 1 つの Service Worker の中で依存する全ての 1st, 3rd Party へのリクエストを処理する必要がある。

自分の管理下にある 1st Party でさえ、適切に Service Worker を作成し適用するのは簡単とは言い難い現状で、それぞれ特製の違う 3rd Party のサービスを、全て適切にオフライン対応し、それら全ての 1 つの Service Worker にマージして、適切にアップデートしながら提供することは、かなり難しいことだろうと筆者は感じている。


## 3rd Party Service Worker

3rd Party のサービスの特性は、そのサービスの提供者が一番よく把握している。

つまり、 3rd Party のサービスをオフライン対応するのであれば、その Service Worker のロジックは同じく 3rd Party のプロバイダがサービスと合わせて提供する方が合理的だと言えるだろう。

しかし、前述の通り一つのページに対しては、同時に一つの Service Worker しか controller になれない。

そこで、ページに対しては 1st Party Service Worker を登録し、それとは別に 3rd Party Service Worker を 3rd Party サービスに対して登録可能にするというのが、 foreign-fetch である。


## foreign-fetch の仕組み

さて、言葉での解説では想像しにくいと思うので、実際のデモを交えて解説をしていく。

以下は `https://labs.jxck.io` をオリジンとする 1 つだけボタンを持つページに遷移する。これが 1st Party にあたる。

ページ内のボタンは `https://api.jxck.io` という別オリジンの API を叩き、乱数を取得して表示するだけの簡単なものだ。
これは 3rd Party にあたり、 CORS に対応している。

[https://labs.jxck.io/service-worker/foreign-fetch/index.html](https://labs.jxck.io/service-worker/foreign-fetch/index.html)


ページに読み込まれる `index.html` と `worker.js` は 1st Party Service Worker でキャッシュされており、オフライン対応されている。

``js:worker.js
const CACHE = "foreign-fetch";
self.addEventListener('install', (e) => {
  console.info('install', e);

  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        '.',
        './index.html',
        './worker.js'
      ])
    })
  );
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);

  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  console.info('fetch', e.request);

  e.respondWith(
    caches.open(CACHE).then((cache) => {
      return cache.match(e.request).then((cached) => {
        console.log('cached', cached);
        return cached || fetch(e.request);
      }).catch(console.error.bind(console))
    })
  );
});
```

しかし、この 1st Party Service Worker は、 3rd Party API についてはキャッシュをしていない。乱数を返す API で、特定の一つをキャッシュしても意味がないからだ。

キャッシュがないリクエストは実際に fetch を発行しているため、本来なら乱数の取得で失敗するはずだが、このページはオフラインでも乱数を取得し表示することができる。

これは、 1st Party とは別に 3rd Party の Service Worker が登録されているためである。


## 3rd Party Service Worker の登録

乱数の API は `https://api.jxck.io/random/number` への GET である。

実はこの API のレスポンスには、以下のようなヘッダが登録されている。

```
Link: </random/worker.js>; rel="serviceworker"
Origin-Trial: Ai32KiE0NsOIRPR/NxvUwEpcM4hYyo6RPRvkG8liNEIX...
```

この Link タグは、前回の記事で紹介した HTTP Header ベースの Service Worker 登録であり、以下のような Service Worker が登録されている。


```js
self.addEventListener('install', (e) => {
  console.log('install');
  e.registerForeignFetch({
    scopes: ['/random/number'], // or self.registration.scope to handle everything
    origins: ['*'] // or ['https://client1.com'] to limit the remote origins
  });
});

self.addEventListener('activate', (e) => {
  console.log('activate');
});

self.addEventListener('foreignfetch', (e) => {
  console.log('foreignfetch');
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        console.log('online response');
        return {
          response,
          origin: e.origin // Make this a CORS response
        };
      })
      .catch(() => {
        console.log('offline response');
        return {
          response: new Response(Math.floor(Math.random()*100)),
          origin: e.origin // Make this a CORS response
        };
      })
  );
});
```

この `foreignfetch` イベントが今回の要である。
`install` イベントで指定した origin (ここでは全オリジン) から、 scope の範囲にあるリクエストをハンドルできる。

先ほどの 1st Party Service Worker がキャッシュしていなかった乱数のリクエストを、実際に fetch した時、二段目としてこの 3rd Party Service Worker に渡ってくる。 Origin と Scope が対象範囲であるこのリクエストは `foreginfetch` イベントを発火する。

実際に fetch を発行し、失敗した Service Worker は、フォールバックとして乱数を JS で生成しそれを返す。

これにより、 1st Party の Service Worker は fetch が成功したかのように挙動するのである。


## foreign-fetch によるサービス間連携

実はこの 3rd Party Service Worker は、ページに紐づいている訳ではなく、イメージとしては API に紐づいている。

例えば、今回は `labs.jxck.io` から fetch していたが、別のオリジン・ページから同じ API を fetch しても、 Origin/Scope が範囲内であれば、同じ 3rd Party Service Worker が起動して、処理を行う。

つまり、 3rd Party Service Worker は異なる 1st Party Service Worker 間で共有されるのだ。

これはかつて同じオリジンのキャッシュが別ページ間で使い回される CDN の利点のように、別のページで既に登録されている 3rd Party Service Worker はそのまま使いまわせることを意味し、例えば font のような大きいアセットファイルのキャッシュなども、ページ間で使いまわすことができるということを意味する。

使い回せるのはキャッシュだけではない。

例えばコメント投稿の API を通じて、あるページで投稿されたコメントデータを、瞬時に別のページで表示できるようなる。
サービス連携のような使い方が可能になるのだ。


## foreign-fetch による Micro Serivce Workers

1st Party Service Worker で全ての処理を行う必要があったモデルには、かなり無理があった。

3rd Party がもつロジックを全て適切に 1st Party 内に実装するのは難しいし、そもそも 1st Party が必ずそれを行うことを前提とするのは非現実的だ。

Service Worker を含めて 3rd Party が提供でき、それが 1st Party から見れば透過的に動作するのは非常に自然かつ妥当であると言える。

それだけでなく、 3rd Party Service Worker が 1st Party とは別に同時に起動できるのは、これまでの Service Worker がページに対して必ず一つだけしか起動できなかった制限を大きく解消する。

Service Worker をレイヤリングすることで、ロジックを分割し、凝集度を高めることができる。
責務の分離を促すことは、 Service Worker の鬼門であるアップデートの負荷を下げることに繋がる。

また、この 3rd Party API を使うことで、サービス間の連携が行えることは、さらに可能性を広げるだろう。

Micro Services に分割されたそれぞれの API は、対応する Service Worker をそれぞれ提供することで、オフライン対応のみならず、 1st Party に委ねていた幅広いユースケースへの対応を、取り戻すことができるだろう。



## Analytics の場合

まずは、ユースケースとして上がっている Offline Analytics を例にとり解説する。
(なお、あくまでユースケースであり、現状 **Google Analytics はオフライン対応はしていない** 点に注意)

例えば Google Analytics は、 [https://www.google-analytics.com/](https://www.google-analytics.com/) からスクリプト(`analytics.js`)を提供し、これを対象サイトに埋め込むことでサービスが提供される。本サイト [https://blog.jxck.io](https://blog.jxck.io) もこのスクリプトを埋め込んでいる。

このスクリプトは、サイトでナビゲートが発生した時に [https://google-analytics.com/collect](https://google-analytics.com/collect) に対し、必要な情報を投げている。つまり投げる先は本サイトとは別オリジンである。

当然、このリクエストはオフライン時には届かないわけだが、アナリティクスを埋め込んでいるサイトが Service Worker を用いたオフライン対応をしていると、オフライン時にもアナリティクスが収集すべきデータは生まれていることになる。

では、アナリティクスへのリクエストについてもオフライン対応するにはどうすれば良いだろうか。


## コンテンツオーナーによるオフライン対応

サイト自体が Service Worker に対応しているという前提なので、その Service Worker (1st Party Service Worker) で、アナリティクスへのリクエストをフックして、オフライン時にはローカルに保存し、オンライン時に送信するようにすれば、 アナリティクスもオフライン対応したと言えるだろう。

しかしこの場合、オフライン対応の実装は、本サイトを管理する筆者が行う必要がある。アナリティクスが Service Worker で読み込むためのライブラリを提供するという手もあるが、いずれにせよサービス提供側ではなく、サービス利用側が全て実装する必要があるのだ。

そして、筆者が登録している [https://blog.jxck.io](https://blog.jxck.io) の Service Worker の中で、 Same Origin へのリクエストである [https://blog.jxck.io](https://blog.jxck.io) への fetch は onfetch で中身(header/body)を見ることができるが、 analytics.js が投げる [https://www.google-analytics.com](https://www.google-analytics.com) へのリクエストは Cross Origin であるため、 Opaque Object になり、中身を見ることができない。つまり、できることが非常に限られてしまう。

そこで提案されているのが foreign-fetch である。


## Foreign Fetch


foreign-fetch が実現すれば、 Service Worker の実装を書くのはコンテンツオーナーではなく、サードパーティーであるアナリティクス側になり、そのスクリプトも [https://google-analytics.com](https://google-analytics.com) から提供することができる。

例えば、もしアナリティクスが Offline 対応を実装したとし、その Service Worker 実装を analytics-sw.js というスクリプトで提供したとしよう。

ブラウザが本サイトのページに埋め込まれた analytics.js を取得しに行った際、アナリティクスはそのレスポンスヘッダを用いて analytics-sw.js が提供されていることをクライアントに伝える。
するとブラウザは analytics-sw.js を取得し、その Service Worker をブラウザに登録する。

この Service Worker は、 [https://blog.jxck.io](https://blog.jxck.io) ではなく、あくまで [https://google-analytics.com](https://google-analytics.com) のオリジンから登録されているため、  analytics.js の投げる `/collect` へのリクエストは Same Origin となり、 onfetch で取得した際に、その中身(header/body)を覗くことができる。

また、この Service Worker は、そのブラウザで読まれる他の Origin から google-analytics.com へ発生する fetch もフックすることができる。これはサービス単位で Service Worker が共有されることを意味し、ロジックの再利用はもとより、例えば、画像や WebFont を提供するオリジンが foreign-fetch で登録した Service Worker でキャッシュしたファイルを、他のページでも共有するといったことも可能になる。

Service Worker  の中身は Third Paty 側が実装するため、オフライン対応を一緒に提供することが可能になり、サービス利用側の実装に依存することはない。
Same Origin として登録できるため、柔軟なロジックを実装することができる。

利用する側としては、勝手に登録されて勝手に動くため、その存在や実装を意識する必要はほぼない。


### Link rel=service worker

Google Analytics がオフライン対応するとすれば、 `analytics.js` のレスポンスヘッダに以下のように `Link` ヘッダを付与する。ここでは仮に `analytics-sw.js` とする。


```
Link: </analytics-sw.js>; rel="serviceworker"
```

このレスポンスを見たブラウザは、スクリプトを取得し、 Service Worker の register を行う。通常の SW と違って register のために window で動く JS を必要としないため、 JSON API やWeb Font などでも SW を登録することができる。

`analytics-sw.js`では、以下のように書くことで foreign fetch として登録できる。


```js
self.addEventListener('install', event => {
  event.registerForeignFetch({
    scopes: [self.registration.scope],
    origins: ['*']
  });
});
```

scopes:
foreign fetch の対象とするパスになる。 Link タグでも scope が指定できるため、その場合はここには scope で指定したパスと同じかサブセットである必要がある。

origins
["blog.jxck.io"] のようにホワイトリストを渡すと、 "blog.jxck.io" からのリクエストのみをフックするようになる。 ["*"] とすれば全てのオリジンからのリクエストをフックする。


## onfetch

Third Party へのリクエスト/レスポンスは、  First Party の SW では Origin をまたぐため Opaque でしか扱えなかったが、 foreign fetch では Same Origin であるため好きに触ることができる。

基本は通常の onfetch と同じ処理になるが、返す部分に少し違いがある。

TODO


## Origin Trials

なお、この機能は現在 Origin Trial 対応であるため、検証時は Token の取得が必要となる。

Origin Trials について、以下を参照のこと。

[Web 標準化のフィードバックサイクルを円滑にする Origin Trials について](https://blog.jxck.io/entries/2016-09-29/vender-prefix-to-origin-trials.html)

コンテンツの開発自体は、 localhost で行うが、この場合はブラウザの Experimental Feature のフラグを設定することで、自分だけ有効にして開発すればいいだろう。

ここで Token を付与して利用すれば、フラグを有効にしていないブラウザでもこの機能を有効にできる。

今回の場合は `analytics.js` と `analytics-sw.js` 両方のレスポンスに `Origin-Trial` ヘッダが必要である。


## DEMO

実際に Foreign Fetch を使って作成したコンテンツを以下に設置した。

完成したコンテンツをドメインに配置するが、ここで Origin Trials Token を入れたものと入れなかったもの二つを用意してみた。


- [Token 有り]()
- [Token 無し]()

Token が無い方では、動かないことがわかる。
ただし、利用者本人のブラウザでフラグが有効にされている場合は、 Token の有無に関係なく動作することに留意したい。



## まとめ

Foreign-Fetch を用いると、以下が可能になる。

Third Party が提供するサービスに応じた Service Worker を提供できる
Service Worker の実装を First Party でなく Third Party が行える
Link ヘッダを用いて、 HTTP Response から Service Worker を登録できる
Third Party との Same Origin で fetch をフックできる
サービスにアクセスする複数のページでキャッシュの共有などができる

これにより、今後、ライブラリ、 JSON API、 Web Font、画像などを提供するサービスが、合わせてオフライン対応やキャッシュの共有を Foreign Fetch で提供するという可能性が出て来る。

個人的には、複数の Service Worker が登録された場合のブラウザの負荷や、別のオリジンから HTTP ヘッダだけで登録できることによるセキュリティ的な懸念。そして Foreign Fetch に限らず Service Worker 自体の正しい運用など、まだ見えてない部分もあるが、今後の Web でのサービス提供の形を変えていく可能性もあるため、注視していきたい。


scopes takes an array of one or more strings, each of which represents a scope for requests that will trigger a foreignfetch event. But wait, you may be thinking, I've already defined a scope during service worker registration!That's true, and that overall scope is still relevant-each scope that you specify here must be either equal to or a sub-scope of the service worker's overall scope. The additional scoping restrictions here allow you to deploy an all-purpose service worker that can handle both first-party fetch events (for requests made from your own site) and third-party foreignfetch events (for requests made from other domains), and make it clear that only a subset of your larger scope should trigger foreignfetch. In practice, if you're deploying a service worker dedicated to handling only third-party, foreignfetch events, you're just going to want to use a single, explicit scope that's equal to your service worker's overall scope. That's what the example above will do, using the value self.registration.scope.


Without foreign fetch Service Workers can only intercept fetches for resources when the fetch originates on a page that is controlled by the service worker. If resources from cross origin services are used, a service worker can opaquely cache these resources for offline functionality, but full offline functionality (in particular things where multiple offline apps share some common third party service, and changes in one should be visible in the other) is not possible. With foreign fetch a service worker can opt in to intercepting requests from anywhere to resources within its scope.
foreign fetch なしでは、 service worker のコントロールしているページからの fetch しかフックできなかった。
もし cross origin だと、 opaque に cache することしかできない。
複数の offline app が一つの third party のサービスをを共有するとか、あるページの変更が別のページに伝わるとかができない。
foreign fetch があると、スコープ無いならどこへのリクエストもフックできる。


To start intercepting requests, you'll need to register for the scopes you want to intercept in your service worker, as well as the origins from which you want to intercept requests:
まず、フックしたい scope と origin を sw に指定する。


The main restriction here is that the foreign fetch scopes have to be within the scope of the service worker.
主な制限は foreign fetch の scope は service worker のスコープ無いじゃないといけない。
Instead of specifying an explicit list of origins from which to intercept requests you can also use ["*"] to indicate you want to intercept requests from all origins.
全オリジンにしたいなら [*] でもいい
After registering your foreign fetch scopes, and after the service worker finished installation and activation, your service worker will not only receive fetch events for pages it controls (via the onfetch event), but also for requests made to URLs that match your foreign fetch scopes from pages you don't control, via the new onforeignfetchevent.
foreign fetch scope を登録し、 sw がインストールされ、 activation されると
その sw は、自身が control している scope を onfetch でフックするのに追加して、
foregin fetch に指定した scope へのリクエストを onforeignfetch として取得できる。


Handling these fetch events is pretty similar to how you'd handle regular fetch events, but there are a few differences. To pass a response to the respondWith method in the ForeignFetchEvent interface, you need to wrap the response in a dictionary. This is needed because sometimes you'll need to pass extra data to respondWith (more on that below):
ハンドラ処理自体は onfetch と基本は同じだが、 respondWith に渡す response は、追加データを添えてオブジェクトに包む必要がある。


Of course just respondinging with a fetch for the same request just adds extra unneeded overhead. Generally you only want to register for foreign fetch events if the service worker can actually do something smart with the request. For example implement smarter caching than just the network cache and other regular service workers can offer. Or even more than just smarter caching, having full featured offline capable APIs.


Ideally having a dummy onforeignfetch handler like above which just passes the received request through fetchand responds with that would be effectively a noop. That however isn't the case. The foreign fetch service worker runs with all the credentials and ambient authority it posesses. This means that the code in the foreign fetch handler has to be extra careful to make sure it only exposes data/resources cross origin when it really meant to do that.
credential などにも全部触れるので注意。




To help with making it easier to write secure service workers, by default all responses passed to respondWith in a foreign fetch handler will be treated as opaque responses when handed back to whoever was requesting the resource. This will result in errors for the requesting party if it tried to do a CORS request. To enable a foreign fetch service worker to expose resources in a CORS like manner anyway, you can explicitly expose the request data and some subset of its headers by passing the origin making the request to respondWith:


secure な sw を書くためには、 default で respondWith に渡した response は opaque としてリクエスト元に届く。つまり CORS リクエストをするとエラーになるということになる。
foreign fetch service worker が CORS 的なマナーで情報を出すようにするには、リクエスト元のオリジンについて明示的に見えるようにするヘッダを定義する必要がある。


## API の Offline 化

ここでは三つめの方法に注目したい。

HTTP 経由で Service Worker が登録できるということは、  JS や HTML をペイロードに持たないレスポンスについても Service Worker を登録することが可能になるということだ。

例えば Font, Image, JS, CSS ライブラリなどのアセットファイルを提供する CDN においても、それらアセットファイルに紐づけて Service Worker を登録し、オフラインでもアセットを提供することが可能になる。

静的なファイルに限らず、例えば JSON API や GraphQL API そのものを Offline 対応することも同様に可能である。すでに取得したリソースを IndexedDB などに保存しておけば、 GET をフォールバックすることができる。 i8c (isomorpic) な実装でサーバとロジックを共有しておけば、 POST/PUT/PATCH/DELETE などの結果は次回の接続回復時に同期するという処理を、 API のレベルで提供することも不可能ではないだろう。


## Service Worker の責務分離

もちろん、アセットや API が Offline 対応していても、そのクライアントとなるページ自体が Offline 対応していなければ、利用することはできない。
すると、ページ自体の Offline 化のための Service Worker 内で API やアセットのオフライン対応も担保すればいいのでは? という考え方が可能で、現状オフライン対応をうたうサービスはそうした作りも多いかもしれない。

しかし、ページ自体のオフライン化処理と、アセットや API のオフライン化の処理を SW レベルで分けることは責務の分離に繋がる。
例えば `/assets/image` と `/assets/javascript` と `/users.json` の処理が一つの SW 内で分岐しているよりは、それぞれのドメインに詳しい担当が、エンドポイントの実装と合わせて SW の実装も提供できる方が、クライアントが全てを実装しきることを期待するよりは現実的ではないだろうか？

つまり、 microservices 的な文脈でいえば、サービスの単位が API エンドポイントに加えて、オフライン対応を含めることができ、一歩先に進むイメージと言えるかもしれない。


## そして foreign fetch へ

TODO:
アセットや API の Serivce Worker をページそのものの Service Worker と分離することはできたが、それでもオリジンは同じでないと Service Worker が登録できない。
つまり、 font も json も first party であればこの手法が適用できるが third party に対しては適用できないのである。
では、別ドメインから JSON を返す Twitter API や、別ドメインの JS を読み込む形で提供する Google Analytics のオフライン化はだれが担保するのだろうか？自分でやるのだろうか？
Twitter や Google がやってくれると嬉しい。
それを実現するのが次の記事で詳解する Foreign Fetch である。
