# [fetch][service worker][origin trials] Foreign Fetch による API の Offline 対応

## Intro

Service Worker に Foreign Fetch という機能が提案されている。

この機能があると、他のオリジンから登録された Service Worker が、その Origin に対する fetch をフックできるようになる。

一体どういう仕組みなのか、これによって何が可能になるのかについて、デモを交えて記す。

なお、この機能は現在 Origin Trial 対応であるため、検証には Token の取得が必要となる。

Origin Trials について、以下を参照のこと。

[Web 標準化のフィードバックサイクルを円滑にする Origin Trials について](https://blog.jxck.io/entries/2016-09-29/vender-prefix-to-origin-trials.html)


## Third Party サービスの Offline 対応

この仕組みの解説には、やはり筆頭のユースケースとして上がっている Offline Analytics を例とするのが一番わかりやすいだろう。

Google Analytics を利用しており、 `analytics.js` という公式提供のスクリプトが提供されている。

このスクリプトは、ページのナビゲート時に [https://www.google-analytics.com/](https://www.google-analytics.com/) のオリジンに対して、必要な情報をリクエストとして投げている。

当然、このリクエストはオフライン時には届かないわけだが、 GA を埋め込んでいるサイトがオフライン対応していると、オフライン時にも GA が収集すべきデータは生まれていることになる。

できれば GA も、 GA 自信が提供する Service Worker を登録し、 GA を利用しているサイトに埋め込んで、 GA へのリクエストを fetch してオフライン対応したい。

これを実現するのが Foreign Fetch である。


## Foreign Fetch

通常の Service Worker との違いは以下のように整理できる。

- 



## Link rel=service worker

Service Worker のインストールは、 Service Worker を読み込むページ無いで実行される JavaScript が必要である。

しかし、 HTML を持たない、例えば JSON API といったものや、 JS だけで提供されるアナリティクスのようなサービスについては、 Service Worker を登録することができない。

例えば、本サイトが登録している Google Analytics は、ページのロード時などに Analytics のオリジンに対してリクエストを発行するが、ブラウザがオフラインだった場合、リクエストを発行することができず、サービスをうけることができない。

オフライン時のリクエストを **本サイトの Service Worker** で残すには、オリジンが違うため Opaque となる上に、そもそも Analytics のオフライン対応はできれば Analytics に行って欲しい。

そこで、




コンテンツの開発自体は、 localhost で行うが、この場合はブラウザのフラグを設定することで、自分だけ有効にして開発すればいいだろう。
実際に Foreign Fetch を使って作成したコンテンツを以下に設置した。

完成したコンテンツをドメインに配置するが、ここで Origin Trials Token を入れたものと入れなかったもの二つを用意してみた。


- [Token 有り]()
- [Token 無し]()

Token が無い方では、動かないことがわかる。
ただし、利用者本人のブラウザでフラグが有効にされている場合は、 Token の有無に関係なく動作することに留意したい。


### Tools





























What's this about?

Without foreign fetch Service Workers can only intercept fetches for resources when the fetch originates on a page that is controlled by the service worker.





If resources from cross origin services are used,
a service worker can opaquely cache these resources for offline functionality,
but full offline functionality (in particular things where multiple offline apps share some common third party service,
and changes in one should be visible in the other) is not possible.

クロスオリジンへのリクエストは、 opaque にキャッシュなどできるが、
複数アプリが共通の third party を使ってて変更が共有されるべきでも、それはできない。


With foreign fetch a service worker can opt in to intercepting requests from anywhere to resources within its scope.

The API

To start intercepting requests,
you'll need to register for the scopes you want to intercept in your service worker,
as well as the origins from which you want to intercept requests:

```js
self.addEventListener('install', function(e) {
  e.registerForeignFetch({
    scopes: ['/myscope/shared_resources'],
    origins: ['https://www.example.com/']
  });
});
```

The main restriction here is that the foreign fetch scopes have to be within the scope of the service worker.




Instead of specifying an explicit list of origins from which to intercept requests you can also use ["*"] to indicate you want to intercept requests from all origins.









After registering your foreign fetch scopes,
and after the service worker finished installation and activation,
your service worker will not only receive fetch events for pages it controls (via the onfetch event),
but also for requests made to URLs that match your foreign fetch scopes from pages you don't control,
via the new onforeignfetch event.

Handling these fetch events is pretty similar to how you'd handle regular fetch events,
but there are a few differences.
To pass a response to the respondWith method in the ForeignFetchEvent interface,
you need to wrap the response in a dictionary.
This is needed because sometimes you'll need to pass extra data to respondWith (more on that below):

self.addEventListener('foreignfetch',
function(e) {
  // Do whatever local work is necessary to handle the fetch,
  // or just pass it through to the network:
  e.respondWith(fetch(e.request).then(response => ({response: response}));
});
Of course just respondinging with a fetch for the same request just adds extra unneeded overhead.
Generally you only want to register for foreign fetch events if the service worker can actually do something smart with the request.
For example implement smarter caching than just the network cache and other regular service workers can offer.
Or even more than just smarter caching,
having full featured offline capable APIs.

What about CORS?

Ideally having a dummy onforeignfetch handler like above which just passes the received request through fetch and responds with that would be effectively a noop.
That however isn't the case.
The foreign fetch service worker runs with all the credentials and ambient authority it posesses.
This means that the code in the foreign fetch handler has to be extra careful to make sure it only exposes data/resources cross origin when it really meant to do that.

To help with making it easier to write secure service workers,
by default all responses passed to respondWith in a foreign fetch handler will be treated as opaque responses when handed back to whoever was requesting the resource.
This will result in errors for the requesting party if it tried to do a CORS request.
To enable a foreign fetch service worker to expose resources in a CORS like manner anyway,
you can explicitly expose the request data and some subset of its headers by passing the origin making the request to respondWith:

self.addEventListener('foreignfetch',
function(e) {
  e.respondWith(fetch(e.request).then(response =>
    ({response: response,
origin: e.origin,
headers: ['...']})));
});
If no explicit headers are specified no headers will be exposed.

