# Preload

https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/


preload でローディングの制御がより細かくできるようになる

JS で行うよりもより効率の良いローディングを実現できる。

A few weeks ago, I shipped preload support in Chrome Canary, and barring unexpected bugs it will hit Chrome stable in mid-April.

1 月に Chrome Canary に preload を入れた。


Well, <link rel="preload"> is a declarative fetch directive.

ブラウザがこのあと必要とするリソースを知っているため、それをフェッチするタイミングをブラウザに伝える

<link rel="prefetch"> や、 chrome だけなら <link rel="subresource"> もある

これまでじゃできなかった明確な違いがある


<link rel="prefetch"> は、次の遷移で必要なリソースを教える


つまり、このフェッチの優先度はかなり低く設定される。(今のページで必要なものの方が重要)
今のページの最適化ではない。


<link rel="subresource"> was originally planned to tackle the current navigation, but it failed to do that in some spectacular ways.
は、今のページを最適化するためだったが、うまくいかなかった。



Since the web developer had no way to define what the priority of the resource should be, the browser (just Chrome and Chromium-based browsers, really) downloaded it with fairly low priority, which meant that in most cases, the resource request came out at about the same time that it would if subresource wasn't there at all.

ブラウザは、リソースのプライオリティを知る方法が無いため、 Chromium ベースのブラザは、これを低いプライオリティで落とす。
ほとんどの場合、サブリソースが全くない.....TODO


Preload is destined for current navigation, just like subresource, but it includes one small yet significant difference.

Preload は今のページで使う、サブリソースと似てる。しかし一つ大きな違いが有る。


It has an as attribute, which enables the browser to do a number of things that subresource and prefetch did not enable:

色々なことを設定できるアトリビュートを持つ。



The browser can set the right resource priority, so that it would be loaded accordingly, and will not delay more important resources, nor tag along behind less important resources.

ブラウザは正しいプライオリティを設定でき、それに従ってロードされ、重要なリソースが遅延しない。


The browser can make sure that the request is subject to the right Content-Security-Policy directives, and doesn't go out to the server if it shouldn't.

ブラウザは、リクエストが正しい Content-Security-Policy を満たしており、そうでない場合別サーバにアクセスしないことを確認できる。


The browser can send the appropriate Accept headers based on the resource type.
(e.g. advertise support for "image/webp" when fetching images)

ブラウザがリソースに適した Accept ヘッダをつけてリクエストが投げられる。(image/webp etc)


The browser knows the resource type
so it can later determine if the resource could be reused for future requests
that need the same resource.

ブラウザはリソースタイプを知ってるので、同じリソースが将来必要な場合、そこで使える。


Preload is also different since it has a functional onload event (which, at least in Chrome, wasn't working for the other two rel values).

Prealod はそれ自体が onload を発火する。(chome では prefetch/subresource は動かない)


On top of that, preload does not block the window's onload event, unless the resource is also requested by a resource that blocks that event.
Combining all these characteristics together enables a bunch of new capabilities that were not possible until now.

しかし、 window.onload はブロックしない、 TODO 






## LOADING OF LATE-DISCOVERED RESOURCES LINK

The basic way you could use preload is to load late-discovered resources early.

preload の基本的な使い方は、あとで見つかるリソースを先にロードする。


While most markup-based resources are discovered fairly early by the browser's preloader, not all resources are markup-based.

大抵のマークアップされたリソースは、ブラウザの Preloader により早期に見つかる、全てがマークアップベースではない。


Some of the resources are hidden in CSS and in JavaScript, and the browser cannot know that it is going to need them until it is already fairly late.

CSS や JS からリンクされたリソースは、必要とわかる頃にはだいぶ時間が経っている。



So in many cases, these resources end up delaying the first render, the rendering of text, or loading of critical parts of the page.

多くのケースでは、これらは最初の、テキストやクリティカルなパーツのレンダリングを遅らせることになる。



Now you have the means to tell the browser, "Hey, browser! Here's a resource you're going to need later on, so start loading it now."

だから、ブラウザにあとから必要になるリソースを先に読むように伝える意味がある。


<link rel="preload" href="late_discovered_thing.js" as="script">

as でタイプを指定する

 - "script",
 - "style",
 - "image",
 - "media",
 - "document".

全リストは [fetch](https://fetch.spec.whatwg.org/#concept-request-destination) 参照


Omitting the as attribute, or having an invalid value is equivalent to an XHR request, where the browser doesn't know what it is fetching, and fetches it with a fairly low priority.

as がなかったり、無効な値なら、普通の XHR と同じになり、低い優先度になる。



## EARLY LOADING OF FONTS LINK

One popular incarnation of the "late-discovered critical resources" pattern is web fonts.

「あとから見つかるクリティカルなリソース」の代表例は Web Font


On the one hand, in most cases they are critical for rendering text on the page (unless you're using the shiny font-display CSS values).

まず、text ページのレンダリングではクリティカル


On the other hand, they are buried deep in CSS, and even if the browser's preloader parsed CSS, it cannot be sure they'd be needed until it also knows that the selectors that require them actually apply to some of the DOM's nodes.


他方で、CSS の奥深くに隠されており、 preloader が CSS をパースしても、そのリソースが本当に必要かどうかは、セレクタが使われ DOM に反映されるまでわからない。


While in theory, browsers could figure that out, none of them do, and if they would it could result in spurious downloads if the font rules get overridden further down the line, once more CSS rules come in.


In short, it's complicated.

つまり複雑

But, you could get away from all that complexity by including preload directives for fonts you know are going to be needed.

なので、必要なフォントをこうやって指定しておけば簡単。


```
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```


One point worth going over: You have to add a crossorigin attribute when fetching fonts, as they are fetched using anonymous mode CORS.
Yes, even if your fonts are on the same origin as the page.  Sorry.

`crossorigin` が必要。


Also, the type attribute is there to make sure that this resource will only get preloaded on browsers that support that file type.
Right now, only Chrome supports preload, and it does support WOFF2 as well, but more browsers may support preload in the future, and we cannot assume they'd also support WOFF2.
The same is true for any resource type you're preloading and which browser support isn't ubiquitous.

type があることで、それをブラウザが対応していることを保証できる。
対応してなければ preload が走らない？



## DYNAMIC LOADING WITHOUT EXECUTION LINK

Another interesting scenario that suddenly becomes possible is one where you want to download a resource because you know you'd need it, but you don't yet want to execute it.
For example, think of a scenario where you want to execute a script at a particular point in the page's life,
without having control over the script (so without the ability to add a runNow() function to it).

他のシナリオとして、取得はしたいけど実行はしたくないリソースの取得ができる。


Today, you are very limited in the ways you can do that.

今はこれをやる方法がない。

If you only inject the script at the point you want it to run, the browser will have to then download the script before it can be executed, which can take a while.
You could download the script using XHR beforehand, but the browser will refuse to reuse it,
since the resource wasn't downloaded with the same type as the one that is now trying to use the resource.

`<script>` を差し込む方法では、ダウンロードからはじまる。
XHR で先に落とすこともできるが、ダウンロードしたときとタイプが違うので、ブラウザに再利用されない。


Before preload, not much.  (In some cases you can eval() the contents of the script, but that's not always feasible nor without side effects.) But with preload you can!

まず preload で取得だけ行う。

```js
var preload = document.createElement("link");
link.href = "myscript.js";
link.rel = "preload";
link.as = "script";
document.head.appendChild(link);
```

You can run that earlier on in the page load process, way before the point you want the script to execute
script を書くよりも前にこれを書いておくことで先にロードできる

(but once you're fairly confident that the script loading will not interfere with other, more critical resources that need loading).
TODO




Then when you want it to run, you simply inject a script tag and you're good.


それを script で差し込んで実行する。

```js
var script = document.createElement("script");
script.src = "myscript.js";
document.body.appendChild(script);
```

## MARKUP-BASED ASYNC LOADER LINK


マークアップベースの非同期ローダとして onload を使うこともできる。


```
<link rel="preload" as="style" href="async_style.css" onload="this.rel='stylesheet'">
```

これで非同期に読み終わってから style にできる。

同じことは JS でも応用できる。

`<script async>` があるが、これは `window.onload` をブロックするので、そこで使い分ける。

analytics のような場合。

とにかく早く取得して、アナリティクスでユーザを取りこぼしたく無い。
でも、 UX は一切損ないたく無い、特に onload を送らせたくはない。
(onload だけが指標じゃないが、ローディングアイコンが一刻も早く消えるのはメリットがある)


こうできる。

```
<link rel=preload as=script href=async_script.js
      onload="var script = document.createElement('script');
              script.src = this.href;
              document.body.appendChild(script);">
```

(It's probably not a great idea to include long JS functions as onload attributes, so you may want to define that part as an inline function.)

(あまり長い JS を onload 属性に書くのは良いことではないため、インライン関数にするかもしれない。)


## RESPONSIVE LOADING LINK

preload はリンクであるため、仕様上 media 属性を持つ。(chrome ではまだ未サポート)
これを使うと、条件付きローディングができる。

What is that good for? Let's say your site's initial viewport has a large interactive map for the desktop/wide-viewport version of the site, but only displays a static map for the mobile/narrow-viewport version.

例えば、 desktop では大きな viewport で動的な地図を読むが、 mobile など小さい viewport では静的な地図を読むような場合に使える。


できれば片方だけを読み込みたいが、それをするには JS で動的に読むしか無かった。

But by doing that, you're making those resources invisible to the preloader, and they may be loaded later than necessary, which can impact your users' visual experience, and negatively impact your SpeedIndex score.

しかし、それをしてしまうと、 preloader では読めなくなり、ロードが送れるため、 SpeedIndex などに影響し UX を損なう。


Preload を使えば、 media query で分岐し、ブラウザは早い段階でその存在を知り、 preload することができる。

```
<link rel="preload" as="image" href="map.png" media="(max-width: 600px)">

<link rel="preload" as="script" href="map.js" media="(min-width: 601px)">
```


## Headers

もう一つ、 preload は http header としても表現できる。

つまりここまでマークアップで行って来たことは、全て HTTP Response Header で行うことができる。
(もちろん onload を使ったハックは除く)

```
Link: <thing_to_load.js>;rel="preload";as="script"

Link: <thing_to_load.woff2>;rel="preload";as="font";crossorigin
```

これでマークアップと最適化を分離することができる。


The prominent example is an external optimization engine that scans the content and optimizes it (full disclosure: I work on one).

特に、外部の最適化エンジンなどが、コンテンツをスキャンして、これを行うことができる。

https://www.akamai.com/us/en/resources/front-end-optimization-feo.jsp


## Feature Detection

preload がサポートされてなかった場合、こうした最適化は壊れる。

なので、 DOM からサポートされる rel の値を取れるように提案している。


```
var DOMTokenListSupports = function(tokenList, token) {
  if (!tokenList || !tokenList.supports) {
    return;
  }
  try {
    return tokenList.supports(token);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("The DOMTokenList doesn't have a supported tokens list");
    } else {
      console.error("That shouldn't have happened");
    }
  }
};

var linkSupportsPreload = DOMTokenListSupports(document.createElement("link").relList, "preload");
if (!linkSupportsPreload) {
  // Dynamically load the things that relied on preload.
}
```

これを使えば、 preload が無効な場合に問題があるサイトでは、フォールバックすることも可能になる。


## Doesn't HTTP/2 Push Cover Those Same Use Cases? Link

HTTP2 の Push とは被る部分も有るが、同じではない。補完関係にある。

HTTP/2 Push has the advantage of being able to push resources that the browser hasn't sent the request for yet.

HTTP2 の Push はリクエストより先にリソースを送ることができる。

That means that Push can send down resources before the HTML even started to be sent to the browser.

これは、 HTML がブラウザに届くよりも先になる。


It can also be used to send resources down on an open HTTP/2 connection without requiring a response on which HTTP Link headers can be attached.

TODO

On the other hand, preload can be used to resolve use cases that HTTP/2 cannot.

一方で、 Preload は HTTP2 ではできなかったケースをカバーする。

As we've seen, with preload the application is aware of the resource loading taking place, and can be notified once the resource was fully loaded.


見て来たように、 TODO


That's not something HTTP/2 Push was designed to do.

Push でもできないこと。


Furthermore, HTTP/2 Push cannot be used for third-party resources, while preload can be used for them just as efficiently as it would be used on first-party resources.

そのうえ、 Push は 3rb party には使えない。

Also, HTTP/2 Push cannot take the browser's cache and non-global cookie state into account.

HTTP2 Push はキャッシュも見えない


While the cache state might be resolved with the new cache digest specification, for non-global cookies there's nothing that can be done, so Push cannot be used for resources that rely on such cookies.


TODO


For such resources, preload is your friend.

そうなときは Prelaod

Another point in preload's favor is that it can perform content negotiation, while HTTP/2 Push cannot.


preload はコンテントネゴシエーションもできる。


That means that if you want to use Client-Hints to figure out the right image to send to the browser, or Accept: headers in order to figure out the best format, HTTP/2 Push cannot help you.

Client-Hints や Accept Header を使った最適化もできる。


## So...

まだ新しい機能だし Canary で試しながら、バグが有ったら教えてね。
