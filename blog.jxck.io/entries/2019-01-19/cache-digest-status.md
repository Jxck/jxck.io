# [cache digest][server push][http2] Cache Digest と HTTP2 Server Push の現状

## Intro

httpbis のチェアである mnot から、 Cache Digest についての現状確認が ML に投稿された。

もしこのまま反応がなければ、 Cache Digest は終わり、対ブラウザキャッシュの Server Push は現実的ではなくなる。


## Update

- mozilla standard position に RFP を上げたところ「実装はしないが仕様については *non-harmful*」となりそうだ。
  - [PFP: Cache Digest Issue #131 mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/131)


## HTTP2 Push

HTTP2 の仕様策定時に盛り込まれた新機能として、 Server Push があった。

これは、例えば RPC 的な用途で双方向性のある通信を可能にした。

Web においては、リクエストが来る前にレスポンスを返しキャッシュに入れ込むことで、 RTT を減らすという効果が期待されていた。

ところが、コンテントネゴシエーションをせずに、一方的にキャッシュを送り込むこの仕組みは、ブラウザが既にキャッシュをしている場合にはむしろ無駄な通信になる。

そこで、なんとかして「ブラウザがなるべくキャッシュしてなさそうなものを Push する」ために [@kazuho](https://twitter.com/kazuho) さんが考案したのが、 Cache Digest である。


## Cache Digest

Cache Digest は以下のドラフトであり、現状 -05 である。

[draft-ietf-httpbis-cache-digest-05 - Cache Digests for HTTP/2](https://tools.ietf.org/html/draft-ietf-httpbis-cache-digest-05)

究極には、ブラウザが保存しているコンテンツのリストを送ってくれば、正確に Push が可能だが、その方法は問題しかない。

現代の Web でそれをやるとサイズが大きすぎるし、 Fingerprint などの問題も懸念される。

そこで、 Filtercuckoo Filter という Bloom Filter に似た確率的データ構造を用いるのがこの提案だ。

「このコンテンツは絶対にキャッシュされてない」ことはわかるので、その場合は Push を行う。

「このコンテンツはキャッシュされているかもしれないが、されてないかもしれない」こともわかるので、その場合は Push しない。

これにより、もし後者で実際にはキャッシュがなかった場合は、ブラウザが普段通り Fetch すればよいため、「無駄な Push は無くせる」という効果が期待された。

現実的には、「*これが無かったら対ブラウザの HTTP2 Push は正直使い物にならない*」というくらい重要なミッシングピースだったと筆者は考えており、使える日を心待ちにしていた。


## Cache Digest Status

Cache Digest は、どちらかというと実装待ちのフェーズだった。

直近の IETF 103 の minutes でも、「実装さえあれば WGLC にできる、無いんだけど」というログのみが残っている。

[HTTP Working Group Minutes - IETF103 Bangkok](https://github.com/httpwg/wg-materials/blob/gh-pages/ietf103/minutes.md#cache-digests-for-http2)

あるブラウザの開発者から「実装が難しすぎる」という話をちょっと聞いたことがあったが、やはり内部のキャッシュを総ざらいしてハッシュを付与するという実装は、負荷が高かったのかもしれない。

実際、主なブラウザにおいて積極的な実装のシグナルは確認できておらず、仕様は中に浮いた状態だっという印象だ。

そして、先日 httpwg の mnot から、以下の投稿が ML にあった。

[Cache Digests status from Mark Nottingham](https://lists.w3.org/Archives/Public/ietf-http-wg/2019JanMar/0033.html)

要約するとこうだ。

- 標準化するに足るほど実装が普及してるとはいえない
- このままではプロセスに従って仕様を "dead" とみなす必要がある
- もし見落としてる実装や動きがあれば教えて欲しい

そして、数日経過した今でも、他の議論が盛り上がるのに流されるように、この ML の返答は誰からも無い。恐らくそれが答えなのだろう。


## Alternative

ブラウザにおける Server Push では、同じく kazuho さんが提案し RFC になっている Early Hints がある。

[HTTP の新しいステータスコード 103 Early Hints \| blog.jxck.io](https://blog.jxck.io/entries/2016-12-16/103-early-hints.html)

簡単に言えば、 Main Resource の Status Code が決定する前に、確定している Sub Resource を Status Code 103 として送るための仕組みだ。

これは、 Push を CDN に移譲したりといった一部のユースケースを満たすが、依然として Client が何を Cache しているかはわからない。

もう一つ、ちょうど先月提案されたのが Prefer-Push という仕組みだ。

- [Prefer-Push, a HTTP extension](https://lists.w3.org/Archives/Public/ietf-http-wg/2018OctDec/0144.html)
- [evert/push-please: A proposal for a HTTP-client suggested push by link-relation](https://github.com/evert/push-please/)

これは、 Client 自身が Push してほしいリソースをヘッダで送るというものだ。

もし、サブリソースのリストがわかってればそれも可能だが、例えば前のページで次のページのそれがわかっている状況は prefetch などで代用できそうにも思う。

当然そういった指摘が ML でなされているようで、あまり追ってないが盛り上がっている感じではなさそうに見える。

もともとの Push は最初の Request に対する Response の前に送る仕様になっているが、これを Request が来る前に送ってしまうという仕様も flano_yuki によって提案されている。

[The PRELOAD Frame Extension](https://tools.ietf.org/html/draft-goto-httpbis-preload-frame-02)

モチベーションとしてローディングの最適化があるようだが、これもブラウザが実装するかどうかというと難しそうだ。


## Push on Chrome

現状 Chrome では HTTP2 セッションのうち 0.04% が Push を行っているらしい。

[Chrome's view on Push IETF 102, httpbis Brad Lassey](https://datatracker.ietf.org/meeting/102/materials/slides-102-httpbis-chromes-view-on-push-01)

現実的な用途が見出されず、利用も広まらないのであれば、このままブラウザがメンテを続ける必要も無くなるかもしれない。

ただ、 Service Worker における Server Push や WebSocket など、内部での別の通信が Push を含めた HTTP2 Stack を使うことは十分にありえると思うので、すぐに Push ごとなくすということはなさそうに思う。


## Back to Client Initiate

クライアントが取得する必要の有るものを、サーバが送るというのが本来の Request/Response の世界だ。

これをキャッシュのレイヤに落として、クライアントが持っているキャッシュを伝えることでサーバが不足を補うというユースケースが Server Push にはあった。

しかし、やはりサーバは選択肢を出して、クライアントが自分の保持するキャッシュと照らしあわせて取得することになる。

そこを最適化するのは「選択肢をなるべく早めに提示する」ための Prefetch, Preload, Prerender であり、そこを超えたければ自分で Service Worker を使ってやるということになりそうだ。


## まとめ

Cache Digest が実装されず、仕様が文字通り瀕死の状態だ。

このまま実装が進まなければ、対ブラウザの Push は、かなり狭い範囲でしか使えない。実質使い物にならないだろうと筆者は考える。

他のプロトコルなどのためのスタックとしての用途は残るかもしれないが、 h2 が最初にユースケースで上げていた話では使いにくくなる。

Client Initiate な negotiation を経ずに Server が何かするということ自体がやはり限界で、対ブラウザの Push は夢のまま終わりそうだ。


## Special Thanks

この記事を書くにあたり [@kazuho](https://twitter.com/kazuho) さんにアドバイスをいただきました。ありがとうございます。
