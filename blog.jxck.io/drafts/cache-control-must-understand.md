# [cache][http][ietf] Cache-Control: must-understand ディレクティブ


## Intro

IETF が策定する HTTP の仕様が更新されようとしている。

ここには、 [Cache](https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-14.html) の仕様も含まれており、そのなかで `must-understand` という `Cache-Control` のディレクティブが追加されている。

このディレクティブが追加された経緯と仕様について解説する。


## Cache と Status Code

RFC7234 では、新しいステータスコードを策定する際に、キャッシュに関して以下のように書かれている。

> The definition of a new status code ought to specify whether or not it is cacheable.
> Note that all status codes can be cached if the response they occur in has explicit freshness information;
> however, status codes that are defined as being cacheable are allowed to be cached
> without explicit freshness information.
> Likewise, the definition of a status code can place constraints upon cache behavior...
> --- https://httpwg.org/specs/rfc7231.html#rfc.section.8.2.2

つまり、その新しいステータスコードは、 `max-age` などを伴えばその指定通りキャッシュが可能であり、さらにそうした明示的なコントロールがない場合に Heuristic Cache 可能かどうかなどを定義できるのだ。

一方、キャッシュを保存する要件として以下があった。

> A cache MUST NOT store a response to any request, unless:
> The request method is understood by the cache and defined as being cacheable, and
> the response status code is understood by the cache, and...
> --- https://httpwg.org/specs/rfc7234.html#response.cacheability

問題は、 3 行目にある「キャッシュを行う実装は、ステータスコードを理解する必要がある」という条件だ。

新しいステータスコードが標準化された場合に、そのステータスコードが未実装な場合はキャッシュできないように読めてしまう。

実装者は、サポートしているステータスコードをリストとして埋め込み、突き合わせてキャッシュの制御を行うことになるだろう。

この点は、先程の要件と矛盾が有り、例えば `max-age` を伴う新しいステータスコードのレスポンスを受信した実装が、そのステータスコードを実装してない場合に、どうすべきかということになる。

実装に対する制限は後者なので、安全側に倒すと「キャッシュしない」方を選ぶことになり、すると実装が普及するまではキャッシュが効かないことになる。

すると、セマンティクスよりもキャッシュ効率を求める開発者により、意味的に適した新しいステータスコードを利用する代わりに、既存のステータスコードが使われてしまう可能性があるのだ。


## must-understand

例としてここでは `999 New Status` という架空のステータスコードが新しく仕様化され、そのステータスコードにはデフォルトでキャッシュに関する要件が定義されていたとする。


```http
HTTP/1.1 999 New Status
Content-Type: text/html
Content-Length: 256
Cache-Control: max-age=3600
```

このステータスコード `999` がまだ新しく、実装が広まってないうちは、受信した実装は「`999` を知らない」という理由だけで `Cache-Control` も無視してキャッシュを保存しない可能性がある。

この問題を解決するために Cache の改定版 ID では、該当部分が更新され `must-understand` というディレクティブが追加されている。

このディレクティブは、以下のように必ず `no-store` とともに付与される。


```http
HTTP/1.1 999 New Status
Content-Type: text/html
Content-Length: 256
Cache-Control: max-age=3600, must-understand, no-store
```

`must-understand` は、その status code の要件として定義されたキャッシュに関する挙動をサポートしない限りは、そのレスポンスをキャッシュしてはならないという意味になる。

上の例では、実装が `999` に定義された要件を実装してない、平たく言うと `999` をサポートしてない場合は、このレスポンスがキャッシュできないが、 `999` をサポートしているのであれば後ろの `no-store` を無視してキャッシュすることができる。

もし `999` に特に何か特別な要件がなければ `max-age` に準じた挙動になるだろうし、何か `max-age` を上書きするような条件があればそれに従うことになるだろう。

通常、キャッシュの実装はサポートしてないディレクティブを無視するため、 `must-understand` に対応してない場合は、後ろの `no-store` が適応され、これは `max-age` よりも優先されるためにこのレスポンスはキャッシュされない。

結果、 `must-understand` が `no-store` とともに付与された場合のレスポンスは、ステータスコードを理解してない実装によって意図しない保存をされることがなくなることが期待される。


### 改訂仕様

`must-understand` の追加によって、改訂ドラフトで前述の仕様は以下のようになった。

> 3. Storing Responses in Caches
> A cache MUST NOT store a response to a request unless:
> - the request method is understood by the cache;
> - the response status code is final (see Section 15 of [Semantics]);
> - if the response status code is 206 or 304, or the "must-understand" cache directive (see Section 5.2.2.2) is present: the cache understands the response status code;

ステータスコードに `final` という概念が入ったのはまた別の話として解説したいが、問題は 3 つ目の条件だ。

`must-understand` に加えて `206` と `304` が明示的に例外扱いされているのは、この 2 つは `must-understand` 以前からキャッシュに関して要件を持つステータスコードであり、明示的な扱いが必要だからだ。

もし最初から `must-understand` があれば、ここに `206` / `304` の例外は不要だっただろう。


### ユースケース

こうした新しい機能が出ると、すぐにでもつけるべきかどうかという話になりがちだが、現状は不要だろう。

このディレクティブは、どちらかというと前述のような仕様の解釈のブレによって、将来、特にキャッシュ周りに特定の条件を伴うような新しいステータスコードを追加する場合に、その普及が順調に進むように投機的に仕様化されたという性質が強い。

近年でも `103 Early Hints`, `425 Too Early`, `451 Unavailable For Legal Reasons` など、それほど多い頻度ではないが、ステータスコードが追加されることはあり、そこで互換性を壊さずに「実装がそうした新しい仕様を実装しているのか」を担保した上で使用できる仕組みなのだ。

もちろん、十分に実装が普及したステータスコードに `must-understand` を併用する必要はなく、それはむしろ `must-understand` を理解しない実装によって `no-store` と扱われるだけなので、デメリットの方が強いだろう。

かといって、特に今 `must-understand` が無いと普及が難しいステータスコードが議論されているという話も聞かないため、主に httbis によるキャッシュ仕様の更新に合わせて、 mnot が空いた穴を埋めたという認識でいる。


## Outro

執筆に際して httpbis の仕様を見ていたところ、新しいディレクティブが追加されたことを知ったため、備忘録として書いた。

まだ RFC にもなっておらず、実装も無く、すぐ使うようなユースケースも無いが、いずれ新しいステータスコードが仕様化されると見る機会もあるかもしれない。


## DEMO

動作するデモを以下に用意した。

- <http://labs.jxck.io/cache-control/must-understand.html>

(特に使うステータスコードが無いため 200 にしてある)


## Resources

- Spec
  - <https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-14.html#name-must-understand>
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - <https://github.com/httpwg/http-core/issues/120>
- Other
