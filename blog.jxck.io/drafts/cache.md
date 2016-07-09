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

max-age + url 変更
でも、そのリンクを含む HTML はキャッシュできない


no-cache は cache するなという意味では無い
キャッシュを使う前に revalidate しろという意味。

must-revalidate は必ず revalidate しろという意味では無い
max-age より小さければ使いまわせるという意味。

変更するコンテンツに max-age つけると
ある時点で JS, CSS をキャッシュし、 css がキャッシュから落ちたとして
次のページで更新された両方にアクセスして JS だけキャッシュヒットしたら
CSS が新しくなり不整合、みたいなレースコンディションがある。

ページを refresh するとサーバは max-age を無視して revalidate する。


sw からの addAll などはブラウザキャッシュにヒットする

new Request('/styles.css', { cache: 'no-cache' })

とか、乱数をつけるとかでバイパスする。


Here I'd cache the root page using pattern 2 (server revalidation), and the rest of the resources using pattern 1 (immutable content).
Each service worker update will trigger a request for the root page, but the rest of the resources will only be downloaded if their URL has changed.
This is great because it saves bandwidth and improves performance whether you're updating from the previous version, or 10 versions ago.

This is a huge advantage over native, where the whole binary is downloaded even for a minor change, or involves complex binary diffing.
Here we can update a large web app with relatively little download.

Service workers work best as an enhancement rather than a workaround, so instead of fighting the cache, work with it!

Used carefully, max-age & mutable content can be beneficial

max-age on mutable content is often the wrong choice, but not always.
For instance this page has a max-age of three minutes.
Race conditions aren't an issue here because this page doesn't have any dependencies that follow the same caching pattern (my CSS, JS & image URLs follow pattern 1 - immutable content), and nothing dependent on this page follows the same pattern.

This pattern means, if I'm lucky enough to write a popular article, my CDN (Cloudflare) can take the heat off my server, as long as I can live with it taking up to three minutes for article updates to be seen by users, which I am.

This pattern shouldn't be used lightly.
If I added a new section to one article and linked to it in another article, I've created a dependency that could race.
The user could click the link and be taken to a copy of the article without the referenced section.
If I wanted to avoid this, I'd update the first article, flush Cloudflare's cached copy using their UI, wait three minutes, then add the link to it in the other article.
Yeah… you have to be pretty careful with this pattern.

Used correctly, caching is a massive performance enhancement and bandwidth saver.
Favour immutable content for any URL that can easily change, otherwise play it safe with server revalidation.
Only mix max-age and mutable content if you're feeling brave, and you're sure your content has no dependancies or dependents that could get out of sync.


