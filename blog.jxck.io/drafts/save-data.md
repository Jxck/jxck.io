Delivering Fast and Light Applications with Save-Data

Hundreds of millions of users are relying on proxy browsers and various transcoding services to access the web on a daily basis.
For some, these services are critical because they significantly lower the associated costs of browsing the web.
For others, they enable a much faster browsing experience in situations where network connectivity is slow.
In short, they significantly improve the user experience, hence their continuing growth in use and popularity.

proxy browser や transcoding service はブラウジングコストを下げるために広く利用されている。
特に低速なネットワーク環境では、非常に効果があり、 UX が飛躍的に向上する。


However, the popularity of the proxy browsers and transcoding services is also an indicator that we-the site owners and web developers-are ignoring the high user demand for fast and light applications and pages.
Let's fix that.

でも、そうした proxy browser や transcoding service が使われているということは、開発者はそもそもの高速で軽量なアプリ・サイトの開発を十分に行えていないことも意味する。
これを直したい。


The new Save-Data client hint request header available in Chrome, Opera, and Yandex browsers enables developers to deliver fast and light applications to users who have opted-in to 'data savings' mode in their browser.
By identifying this request header, the application can customize and deliver an optimized user experience to cost- and performance-constrained users.

クライアントヒントである Save-Data Request Header は、 Chrome, Opera, Yandex browser で使用でき、オプトインしているユーザに **Data Saving Mode**  を提供します。
このヘッダにより、開発者はユーザに最適化された、高速・軽量なアプリケーションを提供できます。


The Need for Lightweight Apps and Pages

## Weblight stats


Google の実験の結果、高速・軽量なページをモバイルに提供した場合、 80% バイトサイズを軽減し、 4 倍の速度で表示され、 UX が向上した結果そのサイトでは 50% トラフィックが増えた。

    "Google shows faster, lighter pages to people searching on slow mobile connections in selected countries… Our experiments show that optimized pages load four times faster than the original page and use 80% fewer bytes.
Because these pages load so much faster, we also saw a 50% increase in traffic to these pages."


2G 接続は減少しつつありますが、 2015 年まだ支配的な技術でした。

The number of 2G connections is finally on the decline.
However, 2G was still the dominant network technology by number of connections in 2015.
The penetration and availability of 3G and 4G networks is growing rapidly, but the associated ownership costs and network constraints are still a significant factor for hundreds of millions of users:

3G, 4G も急速に増えていますが、その所有コストは多くのユーザにとって重要な要因です。

    Accessing a faster network requires reasonably modern ("smartphone") hardware and a data plan to back it.
The total cost of ownership for such a device can be staggering for many users-e.g., a 500MB data plan can cost 17 hours worth of minimum wage work in India.
Not surprisingly many users opt for prepaid plans, often topping up their quota daily, and carefully monitor and control their device access to the network.
Every megabyte counts.

高速なネットワークにはスマホのようなモダンなデバイスも必要になり、それなりのデータプランを契約しなくてはなりませんが、例えば 500MB のプランはインドの最低賃金の 17時間分の労働に値します。
多くのユーザはプリペイドを選び、データの利用料を慎重に監視しながら使っています。

    Those that can afford the latest flagship 4G-enabled phone and data plan can still find themselves constrained by the network: the device may be connected to a fast network but sipping data through a straw, due to capacity issues, signal quality, roaming policies, and so on.
For example, many providers cap connection throughput to 300 kbps when the user is roaming, or when the allotted data plan cap has been exceeded, regardless of the network technology in use.

4G 対応端末を持つ余裕があっても、ネットワークによる制約があります。
高速ネットワークに接続しつつも、帯域問題や、信号品質、ローミングポリシーなどの問題で、早いとは限りません。
例えば、プロバイダの多くはローミング時や割り当て容量を超過した場合、帯域を 300kbps 以下に制限しています。これは技術的な問題とは関係ありません。


The point being, the need for lightweight and optimized experiences may be more pronounced in some markets (typically, in areas with higher ratio of 2G/3G users and higher data costs), but it is also a universal need because even 4G subscribers can often find themselves with poor and expensive connectivity.

ポイントは、高速で最適化されたサイトは、 2G/3G が支配的なマーケットはもちろん、貧弱で高価なコネクションで 4G を使っている層にも、ニーズがあるのです。

    Note: as a corollary to the above, the need for lightweight experiences is not a problem that will "go away" in any foreseeable future.

## Limits of Proxy Browsers and Transcoding Services

Many popular browsers, both desktop and mobile, allow the user to enable a "data saving" mode, which gives permission to the browser to apply some set of optimizations to reduce the amount of data required to render the page.
For example, when enabled, some browsers may request lower resolution images, defer loading of some resources, or route requests through a proxy service that can apply other content-specific optimizations-e.g.
recompress images, compress text resources, and so on.

いくつかのモダンブラウザは、デスクトップ・モバイルにかかわらず、 **Data Saving Mode** に対応しており、表示に必要なデータの最適化をブラウザに許可できます。

例えば、ブラウザは低解像度画像を要求、リソースを遅延ロード、(再圧縮などコンテツごとの最適化を行う)プロキシサービスの経由などを行います。


The savings from such optimizations vary, but as one data point, the Chrome Data Saver feature can reduce the size of pages by 50%.
Other popular proxy browsers such as Opera browsers and Yandex.Browser offer similar functionality.
However, while these proxy browsers are popular with users, they have their own set of limitations:

データによって異なりますが、 Chrome Data Server は 50% 近くサイズを削減できます。
Opera Browser や Yandex.Browser も同様な機能を持っています。


しかし、いくつかの制限もあります。

    Proxy browsers achieve most of their savings by recompressing images into more efficient formats and with lower quality, and applying text compression where it was omitted.
In other words, they can only optimize what you give them; they can't build and deliver an alternate and better "lightweight" experience.

- プロキシはあくまで取得できたリソースの再圧縮などしかできないため、より高速な代替の何かを勝手に作って提供はできない

    Most proxy browsers restrict themselves to resources delivered over HTTP.
Secure connections (HTTPS) are routed directly from the client to the destination, bypassing the proxies.

- 多くの Proxy は HTTP に制限しており、 HTTPS の場合はバイパスする。

On the other hand, transcoding services, such as the "web light" experience offered by Google search, often take a more drastic approach and may reformat the site to make it accessible to users on very slow networks.
This yields a different set of disadvantages and limitations:

一報で、 Google search の提供する "web light" などは、よりドラスティックにサイトを改変し、低速帯域ユーザに最適化します。
しかしこれは、別の欠点と制限を持ちます。

    Our applications may look very different because we can't control how the information is presented to the user, and may omit or ignore important site functionality.

- 情報がどうユーザに表示されているかはわからないため、見た目が変わってしまったり、重要な情報・機能が欠落してしまう可能性がある。

    The optimized experience is available to a subset of users-e.g.  those navigating to our site after a search.  Repeat visits may result in inconsistent experience, and so on.

- 最適化はユーザによって変わるので、訪れるたびに違う結果になる可能性がある。


In short, counting on third-party services is both suboptimal and unreliable.
We-the site owners and web developers-need to take the responsibility and control over the user experience for data- and cost-constrained users-e.g.
respond with an alternative "lighter" application template, reduce the number of image bytes (fewer images, higher compression ratios, smaller display size, and so on), switch to on-demand loading of expensive content, and so on.

要するに、サードパーティーに依存することは、最善とはいえず、信頼もできない。
開発者は、より軽量な代替を用意し、制約のあるユーザの UX にも責任を持つべきである。
例えば、画像を減らす(数やサイズを減らしたり、圧縮率を高くする)や、オンデマンドでリソースを読むなどができる。


## Detecting the Save-Data User Preference

How do you know when to deliver the "light" experience to your users? Your application should check for the new Save-Data client hint request header:


    The "Save-Data" client hint request header indicates the client's preference for reduced data usage, due to high transfer costs, slow connection speeds, or other reasons._

Save-Data リクエストヘッダを読むことで、ユーザがネットワーク的な理由などにより "light" アプリケーションを求めていることを知ることができる。


Whenever the user enables a "data savings" mode in their browser, the browser will append the new Save-Data request header to all outgoing requests (both HTTP and HTTPS).
Today, the browser will only advertise one "on" token in the header (i.e.  Save-Data: on), but it may be extended in the future to indicate other user preferences.

ユーザが "data savings" を有効にした場合、ブラウザはすべてのリクエスト(HTTP, HTTPS 両方) に `Save-Data: on` ヘッダを付与します。
現時点では、値は "on" だけですが、将来拡張されるかもしれません。




In turn, if your application is using a service worker, it can inspect the request headers and apply relevant logic to optimize the experience.
Alternatively, the server can look for the advertised preferences in the Save-Data request header and return an alternate response-e.g.
different markup, smaller images and video, and so on.

もし Service Worker を使っているなら、そこでロジックに合わせてヘッダを更新し、サーバでうまく最適化することもできます。

    Tip: Are you using PageSpeed for Apache or Nginx to optimize your pages? If so, see this discussion to learn how to enable Save-Data savings for your users.

PageSpeed でどうするかは議論中。

## Browser Support

    Chrome 49+ will advertise Save-Data whenever the user enables the "Data Saver" option on mobile, or the "Data Saver" extension on desktop browsers.

    Opera 35+ will advertise Save-Data whenever the user enables "Opera Turbo" mode on desktop, or the "Data savings" option on Android browsers.

    Yandex 16.2+ will advertise Save-Data whenever Turbo mode is enabled on desktop, or mobile browsers.

## Implementation Tips and Best Practices

    Lightweight applications are not lesser applications.

Light とは貧弱という意味ではない。

They don't omit important functionality or data that is critical to help the user find and achieve what they're looking for;
they're just more cognizant of the involved costs and the user experience.
Do not restrict or remove critical functionality and where possible give the user a choice to toggle between experiences.

重要な機能やデータを削除するのはよくない。
制限するのではなく、選択肢を与える。


For example:
        A photo gallery application may deliver lower resolution previews when Save-Data is advertised, but it should still allow the user to view high-resolution previews if desired.
        A search application may return fewer results, reduce the amount of "heavy" media results, and rely on reducing the number of dependencies required to render the page.
        A news-oriented site may surface fewer stories and provide smaller media previews to enable faster and lighter browsing.
        And so on…


- 画像は小さくするが、元画像も見える。
- etc



    Enable server logic to check for the Save-Data request header and consider providing an alternate (lighter) response-e.g.
reduce number of required resources and dependencies to display the page, apply higher image compression, etc..

同じこと

    If you're serving an alternate response based on the Save-Data header, don't forget to add it to the Vary list-e.g.
Vary: Save-Data, to indicate to upstream caches that they should cache and serve this version only if the Save-Data request header is present.
For more details, consult the best practices for interaction with caches.

Save-Data に基づいて代替レスポンスを返す場合、 `Vary` ヘッダをつけるのを忘れない。
`Vary: Save-Data` をつけることで、アップストリームに、 Save-Data ヘッダがある場合にのみキャッシュ可能だということを知らせる。
詳しくはこちら、 [interaction-with-caches](https://httpwg.github.io/http-extensions/client-hints.html#interaction-with-caches)

    If you're using a service worker, your application can detect when the data savings option is enabled by checking for the presence of the Save-Data request header.
If enabled, consider if you can rewrite the request to fetch fewer bytes, or use an already fetched response.

Service-Worker でもうまいことできる。


    Consider augmenting Save-Data with other signals such as information about the users' connection type and technology (see NetInfo API).
For example, you might want to serve the lightweight experience to any users on a 2G connection.
Conversely, just because the user is on a "fast" 4G connection does not mean they're not interested in saving data-e.g.
roaming.

Save-Data だけではなく NetInfo API などで、情報を補うことも検討してください。
例えば、 2G を使う全ユーザに lightweight なデータを配るかもしれません。
反対に、ユーザが高速な 4G だとしても、それは軽量なデータが必要ないという意味ではありません、ローミングなど別の要因で、同様に必要としているかもしれません。






Authors
Profile photo of Ilya Grigorik
Ilya Grigorik

Ilya is a Developer Advocate and Web Perf Guru
