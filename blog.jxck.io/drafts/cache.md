# Web Cache 解体新書


## Cache をするのはブラウザだけじゃ無い

Client - [Proxy Server * n] - Origin Server


- Origin Server: リソースの生成元
- Proxy Server: 中継する透過的なサーバ、キャッシュを保持することがある
- Client: ブラウザなど、キャッシュを保持することがある。

本エントリでは、クライアントは暗黙的にブラウザを指すものとする。

またサーバというとややこしいのでプロキシおよびオリジンと区別して呼び分ける。

Proxy は色々な種類があるが、明示的には意識されない透過的なものを前提とする。複数ある可能性があるが、とりあえず一つを前提とする。

きちんと実装されていれば、そこは透過的に処理されるはずである。



## リロードとナビゲートは違う

必ずリンクをたどって検証しよう。


## 「キャッシュが使われる」のはどういう時か

キャッシュしたリソースは再利用するのが目的だが、ここには二つのパターンがある。

### fresh でありそのまま Hit する

保存されたキャッシュが、そのままレスポンスとして再利用されるケースだ。

ブラウザキャッシュの場合は、ネットワークへのアクセスが一切無いため、事実上最速のレスポンスタイムと言える。

プロキシのキャッシュの場合は、プロキシよりも外にリクエストが出ないため、プロキシとの論理/物理位置が近ければ、オリジンに行くよりも速くなる。


### fresh/stale であり revalidate して Hit する

保存されたキャッシュが、そのまま再利用しても良いかを、サーバに問い合わせる。
サーバに問い合わせた結果、再利用しても良いと言われればそれを使い回す。

このれはネットワークへのアクセスがあるが、もし再利用できる場合はレスポンスが空になり、
再利用できない場合はレスポンスとして新しいリソースが提供される。





## revalidate / Conditional GET とは何か

キャッシュの有効性をオリジンに問い合わせること。

例えば、 awesome.png をリクエストされたオリジンは、レスポンスに以下のヘッダを付与することができる。
(どちらかだけでも構わない)

```
GET /awesome.png HTTP/1.1
...
```


```
HTTP/1.1 200 OK
ETag: xxxx
Last-Modified:
Content-Length: 10000
...
```

ETag は、このリソースの中身を一意に識別できるバージョン番号のようなものであればなんでも良い、通常は(ここでは awesome.png の)ハッシュ値が使われる。
Last_Modified は、この画像を最後に変更した日付だ。


このレスポンスがキャッシュされた状態で awesome.png を再びリクエストする場合、以下のようなリクエストを投げることができる。
(どちらかだけでも構わない)


```
GET /awesome.png HTTP/1.1
If-Non-Match: xxx
If-Modified-Since:
...
```

このように `If-*` という条件を表すヘッダがついたリクエストを、 **条件付きリクエスト(Conditional GET)** という。

このリクエストを受けて、オリジンは `If-*` ヘッダの値を用いて、オリジンが持っている最新のリソースのものと比較する。
もし、 `If-Non-Match` とハッシュ値が同じか、 `If-Modified-Since` 以降更新されていなければ、クライアントが持っているキャッシュはそのまま再利用できる。
再利用できる有効なキャッシュを **fresh** である、という。

キャッシュが fresh である場合 `304 Not Modified` を返すことができる。

```
HTTP/1.1 304 Not Modified
...
```

キャッシュが古い場合は **stale** といい、その場合は `200 OK` で最新の awesome.png を返してやればいい。


```
HTTP/1.1 200 OK
...
```

こうしてオリジンに対して、現在保持している **キャッシュの有効性を、条件付き GET で問い合わせる** ことを **revalidate** という。

revalidate は、もしキャッシュが stale だった場合は同じレスポンスで最新のリソースが取得でき、
fresh だった場合にレスポンスが空になるため、リソースが大きいほど転送効率が上がる。

ただし必ず RTT (round trip time)が発生することには注意が必要だ。


## fresh/stale とは何か

レスポンスがキャッシュとして使える期限が設定されている場合

期限内のもの: fresh
期限切れのもの: stale


## Cache にまつわるヘッダ群


### no-cache

cache するなという意味では無い
キャッシュを使う前に必ず revalidate しろという意味。
つまり、ローカルキャッシュがそのままヒットすることはない。


### must-revalidate

必ず revalidate しろという意味では無い
もし fresh であれば、 max-age より小さければ使いまわせるという意味。


### no-store

キャッシュするなという意味。



## ケース別キャッシュの挙動確認









=====================================================================

https://jakearchibald.com/2016/caching-best-practices/


キャッシュを使いこなせば、パフォーマンス、帯域節約、サーバコストなどでメリットがある。
でもみんな上手く使えてない。


基本的には二つのパターンに落とせる。

## Pattern 1: Immutable content + long max-age

```
Cache-Control: max-age=31536000
```

- The content at this URL never changes, therefore…
- The browser/CDN can cache this resource for a year without a problem
- Cached content younger than max-age seconds can be used without consulting the server
Page:


- URL が不変
- browser/CDN がこのリソースを一年キャッシュできる
- max-age よりも短いキャッシュはサーバに問い合わせず使われる

中身を変える場合は、 URL を変える。

ハッシュ、時間、バージョンなど

```
<script src="/script-f93bca2c.js"></script>
<link rel="stylesheet" href="/styles-a837cb1e.css">
<img src="/cats-0e9a2ef4.jpg" alt="…">
```

しかし、これは記事などには適用しにくい。
コンテンツの URL は変えられないけど、変更はすぐ反映されて欲しい。


## Pattern 2: Mutable content, always server-revalidated

```
cache-contorl: no-cache
```

- コンテンツが変更される場合がある
- サーバに問い合わせずキャッシュを使ってはいけない

- no-cache: cache するなという意味では無い キャッシュを使う前に revalidate しろという意味。
- no-store: はキャッシュするなという意味
- must-revalidate は必ず revalidate しろという意味では無い max-age より小さければ使いまわせるという意味。


この場合 ETag や Last-Modified をつけ、 I-N-M, I-M-S で問い合わせる。
HTTP 304 が返る。

ネットワークアクセスが必ず発生する。


## max-age on mutable content is often the wrong choice

10分は使っていいけど、それ以降は必ず問いあわせろ。

```
Cache-Control: must-revalidate, max-age=600
```

変更するコンテンツに max-age つけると
ある時点で JS, CSS をキャッシュし、 css がキャッシュから落ちたとして
次のページで更新された両方にアクセスして JS だけキャッシュヒットしたら
CSS が新しくなり不整合、みたいなレースコンディションがある。

ページを refresh するとサーバは max-age を無視して revalidate する。


This pattern can appear to work in testing, but break stuff in the real world, and it's really difficult to track down.
このパターンはテスト段階では良くても、リアルワールドではうまく動かない。トラックが難しい。


In the example above, the server actually had updated HTML, CSS & JS, but the page ended up with the old HTML & JS from the cache, and the updated CSS from the server.
The version mismatch broke things.
この場合は、サーバで HTML, CSS, JS が更新されたにもかかわらず、 HTML, JS だけキャッシュヒットして、 CSS だけサーバから最新のものを取得した場合に壊れる。


Often, when we make significant changes to HTML, we're likely to also change the CSS to reflect the new structure, and update the JS to cater for changes to the style and content.
These resources are interdependent, but the caching headers can't express that.
Users may end up with the new version of one/two of the resources, but the old version of the other(s).

多くの場合、依存しているものは同時に更新したいが、キャッシュヘッダはそれを更新できない。




max-age is relative to the response time, so if all the above resources are requested as part of the same navigation they'll be set to expire at roughly the same time, but there's still the small possibility of a race there.

max-age はレスポンスタイムに直結する、もし全てのリソースが同じナビゲーションでリクエストされると、おおよそ同じタイミングで expire されるが、それでも多少はレースコンディションに陥る可能性がある。


If you have some pages that don't include the JS, or include different CSS, your expiry dates can get out of sync.
And worse, the browser drops things from the cache all the time, and it doesn't know that the HTML, CSS, & JS are interdependent, so it'll happily drop one but not the others.
Multiply all this together and it becomes not-unlikely that you can end up with mismatched versions of these resources.

JS を含まない、もしくは違う CSS を含むページをもっていて、 expire がすぎた場合。
最悪にも、ブラウザがキャッシュから削除して、 HTML, CSS, JS の互換が崩れる場合、 TODO



For the user, this can result in broken layout and/or functionality.
From subtle glitches, to entirely unusable content.

ユーザにとっては画面の崩れや動かないサイトになる。


Thankfully, there's an escape hatch for the user

これには回避策がある。





## A refresh sometimes fixes it

If the page is loaded as part of a refresh, browsers will always revalidate with the server, ignoring max-age.
So if the user is experiencing something broken because of max-age, hitting refresh should fix everything.
Of course, forcing the user to do this reduces trust, as it gives the perception that your site is temperamental.

ページがリフレッシュでロードされるとき、ブラウザは max-age を無視して revalidate する。
なので、 max-age のせいで何か壊れた場合、ユーザは refresh で全てをもとどおりにできる。
もちろん、そんなことさせてたらユーザの信頼は失う。


## A service worker can extend the life of these bugs

Say you have the following service worker:

この sw があったとする

```js
const version = '2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll([
        '/styles.css',
        '/script.js'
      ]))
  );
});

self.addEventListener('activate', event => {
  // …delete old caches…
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```


This service worker

- Caches the script and styles up front
- Serves from the cache if there's a match, otherwise goes to the network

If we change our CSS/JS we bump the version to make the service worker byte-different, which triggers an update.
However, since addAll fetches through the HTTP cache (like almost all fetches do), we could run into the max-age race condition and cache incompatible versions of the CSS & JS.


script と style をキャッシュする。ひっとすれば返すし、なければネットワークへ。
css/js を更新してバージョンをあげたら、 sw が byte-different で update が走る。
しかし、 addAll が HTTP cache をヒットするので、やっぱり max-age レースコンディションになる。



Once they're cached, that's it, we'll be serving incompatible CSS & JS until we next update the service worker - and that's assuming we don't run into another race condition in the next update.

一度キャッシュされると、それまで。次の sw のアップデートがあるまで不整合のまま。(ただし別のレースコンディションにならない場合のみ)


You could bypass the cache in the service worker:

sw からキャッシュをバイパスする方法がある。


```
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll([
        new Request('/styles.css', { cache: 'no-cache' }),
        new Request('/script.js', { cache: 'no-cache' })
      ]))
  );
});
```

Unfortunately the cache options aren't yet supported in Chrome/Opera and only recently landed in Firefox Nightly, but you can sort-of do it yourself:

残念なことに firefox だけなので、ワークアラウンドとして適当なクエリをつける。


```
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => Promise.all(
        [
          '/styles.css',
          '/script.js'
        ].map(url => {
          // cache-bust using a random query string
          return fetch(`${url}?${Math.random()}`).then(response => {
            // fail on 404, 500 etc
            if (!response.ok) throw Error('Not ok');
            return cache.put(url, response);
          })
        })
      ))
  );
});
```


In the above I'm cache-busting with a random number, but you could go one step further and use a build-step to add a hash of the content (similar to what sw-precache does).

ここでは乱数をつけているが、ビルドステップでハッシュをつけることもできる。(sw-precache がやってるように)

This is kinda reimplementing pattern 1 in JavaScript, but only for the benefit of service worker users rather than all browsers & your CDN.

これはパターン 1 を JS でやってるのと同じ、しかし sw へのメリットだけで browser や CDN にはない。



## The service worker & the HTTP cache play well together, don't make them fight!

As you can see, you can hack around poor caching in your service worker, but you're way better off fixing the root of the problem.
Getting your caching right makes things easier in service worker land, but also benefits browsers that don't support service worker (Safari, IE/Edge), and lets you get the most out of your CDN.


見てきたように、 SW からキャッシュを迂回する稚拙な方法があった、しかし根本解決すべき。

sw でキャッシュを正しく、簡単にする、しかし全ての sw はサポートしてない、そして CDN はおおよそいらなくなる。


Here I'd cache the root page using pattern 2 (server revalidation), and the rest of the resources using pattern 1 (immutable content).
Each service worker update will trigger a request for the root page, but the rest of the resources will only be downloaded if their URL has changed.
This is great because it saves bandwidth and improves performance whether you're updating from the previous version, or 10 versions ago.


root をパターン2(server revalidation) を使ってキャッシュし、
残りのリソース(immutable content)を パターン1 を使う。
それぞれの service worker は root へのリクエストで update が発生する
しかし残りのリソースは、 URL が変更された時だけダウンロードされる。
これによって帯域を保護でき、パフォーマンスを向上する、
一つ前の、もしくは 10 個前のバージョンからアップデートする、



This is a huge advantage over native, where the whole binary is downloaded even for a minor change, or involves complex binary diffing.
Here we can update a large web app with relatively little download.

マイナーチェンジでも全てのバイナリをダウンロードする、
もしくは複雑な差分取得を行うネイティブに対して大きなアドバンテージである。
大きな Web アプリのアップデートでも、必要な最小限のダウンロードで済む。


Service workers work best as an enhancement rather than a workaround, so instead of fighting the cache, work with it!

Service Worker はワークアラウンドというよりは、拡張として最適である、
だからキャッシュと戦うのではなく、それを活用すべき。


## Used carefully, max-age & mutable content can be beneficial

慎重に max-age と mutable content を使うことはメリットがある。

max-age on mutable content is often the wrong choice, but not always.
For instance this page has a max-age of three minutes.
Race conditions aren't an issue here because this page doesn't have any dependencies that follow the same caching pattern (my CSS, JS & image URLs follow pattern 1 - immutable content), and nothing dependent on this page follows the same pattern.


mutable content の max-age は多くの場合間違った選択だが、常に間違いとは限らない。
例えば、ページが max-age として 3min だったとする。
この場合、ページが同じキャッシュパターンの依存を持っていないため、レースコンディションはない(CSS, JS, Image の URL はパターン 1 の immutable content をつかっている)
なので、この同じパターンを使うものは何もこのページに依存していない。


This pattern means, if I'm lucky enough to write a popular article, my CDN (Cloudflare) can take the heat off my server, as long as I can live with it taking up to three minutes for article updates to be seen by users, which I am.

このパターンが意味するところは、もしアクセスが多い記事を書いた時、 CDN(Cloudflare) がトラフィックを受けてくれる
TODO


This pattern shouldn't be used lightly.
If I added a new section to one article and linked to it in another article, I've created a dependency that could race.

このパターンは簡単に使われるべきではない
もし新しいセクションを記事に追加し、他の記事からリンクした時、レースになる依存を作ることになる。


The user could click the link and be taken to a copy of the article without the referenced section.

ユーザがリンクをクリックし、参照されたセクションのない記事のコピーを取るかもしれない。


If I wanted to avoid this, I'd update the first article, flush Cloudflare's cached copy using their UI, wait three minutes, then add the link to it in the other article.
Yeah… you have to be pretty careful with this pattern.

これを避けるために、最初の記事を更新し、 Cloudflare のキャッシュコピーを UI からフラッシュし、 3min 待ち、その後にリンクを他の記事に追加しないといけない。
つまり、非常に慎重に行わないといけない。


Used correctly, caching is a massive performance enhancement and bandwidth saver.
Favour immutable content for any URL that can easily change, otherwise play it safe with server revalidation.

更新頻度の高い URL を immutable content にすることは、サーバリバリデーションするより。
正しく使った場合、キャッシュはパフォーマンスの改善とサーバの帯域節約に強く貢献する。

Only mix max-age and mutable content if you're feeling brave, and you're sure your content has no dependancies or dependents that could get out of sync.

勇気がある場合のみ max-age と mutable content をミックスすればいい
そして、コンテンツが同期のとれない依存をしたりされたりしないと確信できる場合のみ
