So um, first render is faster, but there's a massive regression when it comes to rendering content.

The fastest way would be to serve the entire page from the cache, but that involves caching all of Wikipedia.
全部キャッシュから出すのが一番早いけど、大きすぎて無理。

Instead, I served a page that contained the CSS, JavaScript and header, getting a fast initial render, then let the page's JavaScript set about fetching the article content.
And that's where I lost all the performance - client-side rendering.

変わりに、初期レンダのために CSS/JS/Header を持つページを返す、そして、 JS で本文を fetch する。
これがパフォーマンスを失う点、クライアントレンダリング。


HTML renders as it downloads, whether it's served straight from a server or via a service worker.
ダウンロードしたら HTML をレンダリング、 sw を素通りしてサーバから


But I'm fetching the content from the page using JavaScript, then writing it to innerHTML, bypassing the streaming parser.
でも JS で fetch してるので、 streaming parser を介さず innerHTML に流す


Because of this, the content has to be fully downloaded before it can be displayed, and that's where the two second regression comes from.
The more content you're downloading, the more the lack of streaming hurts performance, and unfortunately for me, Wikipedia articles are pretty big (the Google article is 100k).

これにより、コンテンツが全部ダウンロードされないと表示できない、これが 2s の遅延の原因
コンテンツをよりダウンロードすれば、ストリームによる遅延が増える、 wikipedia はそれに十分大きい。


This is why you'll see me whining about JavaScript-driven web-apps and frameworks - they tend to throw away streaming as step zero, and performance suffers as a result.

これが JS のフレームワークで辛い理由、最初のステップでストリームを捨てている。


I tried to claw some performance back using prefetching and pseudo-streaming.
prefetching と pseudo-stream で改善


The pseudo-streaming is particularly hacky.
pseudo-streaming はちょっと hacky


The page fetches the article content and reads it as a stream.
page は article を fetch し stream として読む


Once it receives 9k of content, it's written to innerHTML, then it's written to innerHTML again once the rest of the content arrives.
This is horrible as it creates some elements twice, but hey, it's worth it:

9k 読むごとに innerHTML に入れる
いくつかのエレメントを二回作るが、悪く無い
