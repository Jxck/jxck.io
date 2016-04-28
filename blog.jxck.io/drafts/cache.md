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


