# [itp] storage access api

## Intro

TODO

## Intelligent Tracking Prevention

ITP によって、 3rd Party Cookie を用いたトラッキングがブロックされる一方、 Single Sign On や Payment を始めとしたユースケースにも、影響が出た。

これに対して、明示的に Cookie にアクセスする方法を提供するための Storage Access API が提供される。


## storage access api




it needs to provide a way for embedded cross-site content to authenticate users who are already logged in to their first-party services.
すでにログインしている first party サービスの認証を、埋め込みクロスサイトコンテンツで行えるようにする方法が必要。

プライバシーを守ったままこれを実現するのが Storage Access API



Let's say that socialexample.org is embedded on multiple websites to facilitate commenting or "liking" content with the user's socialexample ID. ITP will detect that such multi-page embeds gives socialexample.org the ability to track the user cross-site and therefore deny embedded content from socialexample.org access to its first-party cookies, providing only partitioned cookies. This breaks the user's ability to comment and like content unless they have interacted with socialexample.org as first-party site in the last 24 hours. (Please see the original ITP blog post for the exact rules around partitioned cookies.)



socialexample.org がサイトに埋め込む "like" ボタンを公開していたとする。
ITP では、 socialexample.org がサイトを跨いだトラッキングができると判断し、 socialexample.org が first party cookie にアクセスすることを防ぎ、分離された cookie だけを許可する。
すると socialexample.org にログインせずに like ボタンが使えるのは 24h と制限される。
同じことは、3rd party の payment や video の埋め込みでも言える。

これはトレードオフではあるが、プライバシーを守りながらユーザが明示的にそれを許可できる仕組みを提供したい。


The Solution: Storage Access API


そこで、ユーザが interacts (なんらかの操作)を行なっている場合は、 3rd Party に対して 1st party cookie にアクセスすることを許すのが、 Storage Access API.



これは、 cross origin iframe sandbox に対して `allow-storage-access-by-user-activation` を有効にすると  `document.hasStorageAccess()` and `document.requestStorageAccess()` が使える。

TODO:

Storage access in this context means that the iframe has access to its first-party cookies, i.e. the same cookies it would have access to as a first-party site. Note that storage access does not relax the same-origin policy in any way. Specifically, this is not about third-party iframes getting access to the embedding website's cookies and storage, or vice versa.

このコンテキストでのストレージへのアクセスは、 iframe がファーストパーティのクッキー、つまりファーストパーティのサイトとしてアクセスできるクッキーと同じクッキーにアクセスできることを意味します。ストレージへのアクセスは、どのような方法でも同じ起点ポリシーを緩和しないことに注意してください。具体的には、埋め込みサイトの Cookie とストレージにアクセスする第三者 iframe や、その逆のことではありません。


WebKit's implementation of the API only covers cookies for now. It does not affect the partitioning of other storage forms such as IndexedDB or LocalStorage.

今は Cookie だけで、 IndexedDB や LocalStorage は範囲外。


Check For Storage Access

A call to document.hasStorageAccess() returns a promise that resolves with a boolean indicating whether the document already has access to its first-party cookies or not. Should the iframe be same-origin as the top frame, the promise returns true.


`document.hasStorageAccess()` を呼ぶと、

ドキュメントがファーストパーティの Cookie に既にアクセスしているかどうかを示すブール値で解決される約束が返されます。 iframe がトップフレームと同じ起点である場合、約束は真を返します。


```
var promise = document.hasStorageAccess();
promise.then(
  function (hasAccess) {
    // Boolean hasAccess says whether the document has access or not.
  },
  function (reason) {
    // Promise was rejected for some reason.
  }
);
```

Request Storage Access

A call to document.requestStorageAccess() upon a user gesture such as a tap or click returns a promise that is resolved if storage access was granted and is rejected if access was denied. If storage access was granted, a call to document.hasStorageAccess() will return true. The reason why iframes need to call this API explicitly is to offer developers control over when the document's cookies change.


```
<script>
function makeRequestWithUserGesture() {
  var promise = document.requestStorageAccess();
  promise.then(
    function () {
      // Storage access was granted.
    },
    function () {
      // Storage access was denied.
    }
  );
}
</script>
<button onclick="makeRequestWithUserGesture()">Play video</button>
```

The iframe needs to adhere to a set of rules to be able to get storage access granted. The basic rules are:

iframe はいくつかのルールを遵守する必要がある。


- The iframe's cookies need to be currently partitioned by ITP. If they're not, the iframe either already has cookie access or cannot be granted access because its cookies have been purged.
- iframe のクッキーは ITP によってすでに分割されている必要がある。そうでない場合、 iframe は既にクッキーにアクセスしているか、クッキーが削除されてアクセスが許可されていません。

- The iframe needs to be a direct child of the top frame.
- iframe は、トップフレームの直接の子である必要があります。

- The iframe needs to be processing a user gesture at the time of the API call.
- iframe は、 API コール時にユーザーのジェスチャーを処理する必要があります。

Below are the detailed rules for the promise returned by a call to document.requestStorageAccess(). When we say eTLD+1 we mean effective top-level domain + 1. An eTLD is .com or .co.uk so an example of an eTLD+1 would be social.co.uk but not sub.social.co.uk (eTLD+2) or co.uk (just eTLD).

以下は、 `document.requestStorageAccess()` の呼び出しによって返される Promise の詳細な規則です。 eTLD + 1 とは、有効なトップレベルドメイン+ 1 を意味します。 .eTLD が .com または.co.uk であれば、 eTLD + 1 の例は social.co.uk で、 sub.social.co.uk (eTLD + 2)や co.uk(eTLD のみ)ではない。

If the sub frame is sandboxed but doesn't have the tokens "allow-storage-access-by-user-activation" and "allow-same-origin", reject.

sub frame がサンドボックス化されていても、`allow-storage-access-by-user-activation` and `allow-same-origin`, reject。

If the sub frame's parent is not the top frame, reject.

sub frame の親が top frame でない場合は、reject します。

If the browser is not processing a user gesture, reject.

ブラウザがユーザのジェスチャを処理していない場合は、拒否します。

If the sub frames eTLD+1 is equal to the top frame's eTLD+1, resolve. As an example, login.socialexample.co.uk has the same eTLD+1 as www.socialexample.co.uk.

subframe eTLD+1 がトップフレームの eTLD+1 と等しい場合、 resolve します。例として、 login.socialexample.co.uk は www.socialexample.co.uk と同じ eTLD + 1 を持っています。

If the sub frame's origin's cookies are currently blocked, reject. This means that ITP has either purged the origin's website data or will do so in the near future. Thus there is no storage to get access to.

サブフレーム origin のクッキーがすでにブロックされている場合は、 reject します。これは ITP が origin のウェブサイトデータをパージしたか、近いうちにそうすることを意味します。したがって、アクセスを得るためのストレージはありません。

If all the above has passed, resolve.

上記のすべてが合格した場合は、解決してください。

Access Removal

Storage access is granted for the life of the document as long as the document's frame is attached to the DOM. This means:

ドキュメントのフレームが DOM に添付されている限り、ドキュメントの存続期間中はストレージへのアクセス権が与えられます。これの意味は:

Access is removed when the sub frame navigates.

サブフレームがナビゲートすると、アクセスは削除されます。

Access is removed when the sub frame is detached from the DOM.

サブフレームが DOM から切り離されると、アクセスは削除されます。

Access is removed when the top frame navigates.

トップフレームがナビゲートすると、アクセスは削除されます。

Access is removed when the webpage goes away, such as a tab close.

タブが閉じるなど、ウェブページがなくなるとアクセスは削除されます。

Sandboxed Iframes

If the embedding website has sandboxed the iframe, it cannot be granted storage access by default. The embedding website needs to add the sandbox token "allow-storage-access-by-user-activation" to allow successful storage access requests. The iframe sandbox also needs the tokens "allow-scripts" and "allow-same-origin" since otherwise it can't call the API and doesn't execute in an origin that can have cookies.

埋め込み Web サイトが iframe をサンドボックス化している場合、デフォルトではストレージへのアクセスを許可することはできません。埋め込み Web サイトでは、ストレージアクセス要求を成功させるために、サンドボックストークン「allow-storage-by-user-activation」を追加する必要があります。 iframe サンドボックスでは、トークン "allow-scripts"と "allow-same-origin"も必要です。それ以外の場合は、 API を呼び出すことができず、 Cookie を持つことができるオリジンでは実行されません。


```
<iframe sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin"></iframe>
```

A Note On Potential Abuse

We have decided not to prompt the user when an iframe calls the Storage Access API to make the user experience as smooth as possible. ITP's rules are an effective gatekeeper for who can be granted access, and for the time being we rely on them.

iframe が Storage Access API を呼び出したときに、ユーザーにできるだけスムーズな操作をさせるために、プロンプトを表示しないことにしました。 ITP のルールは、誰がアクセス権を付与できるのかを示す効果的なゲートキーパーであり、当面はそれらに依存しています。

However, we will monitor the adoption of the API and make changes if we find widespread abuse where the user is clearly not trying to take some authenticated action in the calling iframe. Such API behavior changes may be prompts, abuse detection resulting in a rejected promise, rate limiting of API calls per origin, and more.

しかし、私たちは、 API の採用を監視し、ユーザーが iframe の呼び出しで何らかの認証されたアクションを取ろうとしていない場合、広範な虐待が見つかった場合に変更を加えます。このような API の動作の変更は、プロンプト、拒否の検出、約束の拒否、原点ごとの API 呼び出しのレート制限などになります。

Availability

Storage Access API is available in Safari 11.1 on iOS 11.3 beta and macOS High Sierra 10.13.4 beta, as well as in Safari Technology Preview 47+. If you're interested in cross-browser compatibility, please follow the whatwg/html issue for Storage Access API.
