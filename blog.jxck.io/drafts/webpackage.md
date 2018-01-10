# WebPackage


## Local Sharing

Wifi やキャリア回線が弱い国ではローカルシェアリングの需要がある。

Android でいう　APK　ファイルのような形で、ローカル共有したい。


## Unsigned snapshots

ページをローカルに保存したい。
MHTML や Web Archive のようなブラウザごとのサポートはあるが、その画面だけだったりする。
これを標準化したい。


## Signed applications

コンテンツに対してオリジンから署名できれば、そのオリジンのリソースにアクセスできる。
これができれば、 PWA を p2p でアクセスできる。



Local sharing tends to be popular where connectivity to the web is expensive: each byte costs money.
This means the client may be stuck with an outdated version of a package for a significant amount of time,
including that package's vulnerabilities.
It may be feasible to periodically check for OCSP notification that a package's certificate has been revoked.
We also need to design a cheap notification that the package is critically vulnerable and needs to be disabled until it can be updated.


## Physical Web

Beacons and other physical web devices often want to 'broadcast' various content locally.

Beacon などの Physical Web Device は、コンテンツを broadcast したい場合がある。
いままでは URL を broadcast していたが、コンテンツそのものを broadcast できるとネット接続がなくても bluetooth だけで済むのでいい。
Origin で署名されていれば、そのまま Origin からインストールされた PWA としても動作できる。


## Content Distributors and Web caches.

Content distributors can provide the service of hosting web content that should be delivered at scale.

コンテンツディストリビューターは、大規模に配信されるべきウェブコンテンツをホスティングするサービスを提供することができる。



This includes both hosting subresources (JS libraries, images) as well as entire content (Google AMP) on a network of servers,
often provided as a service by 3rd party.

これには、サブリソース（JSライブラリ、画像）とコンテンツ全体（Google AMP）、サードパーティによるサービスとして提供されることが多い。

Unfortunately,
the origin-based security model of the Web limits the ways 3rd-party caches/servers can be used.

Origin ベースのセキュリティモデルでは、
残念ながら、Webのオリジンベースのセキュリティモデルは、サードパーティのキャッシュ/サーバーの使用方法を制限しています。

For example in the case of hosting JS subresources,
the original document must explicitly trust the distributor's origin to serve the trusted script.

たとえば、JSサブリソースをホスティングする場合、元のドキュメントは、信頼できるスクリプトを提供するためにディストリビューターの Origin を明示的に信頼する必要があります。


The user agent must use protocol-based means to verify the subresource is coming from the trusted distributor.

ユーザエージェントは、信頼できるディストリビュータからサブリソースが来ていることを確認するためにプロトコルベースの手段を使用しなければなりません。


Another example is a content distributor that caches the whole content.

別の例は、コンテンツ全体をキャッシュするコンテンツ配布者である。

Because the origin of the distributor is different from the origin of the site,
ディストリビューターの origin がサイトの origin と異なるため、ブラウザーは通常

the browser normally can't afford the origin treatment of the site to the loaded content.

、ロードされたコンテンツに対するサイトの起源処理を行うことができません。



Look at how an article from USA Today is represented:

USA Todayの記事がどのように表現されているかを見てください：




Note the address bar indicating google.com. Also, since the content of USA Today is hosted in an iframe, it can't use all the functionality typically afforded to a top-level document:

google.comを示すアドレスバーに注意してください。また、USA Todayのコンテンツはiframeでホストされているため、通常トップレベルのドキュメントに提供されるすべての機能を使用することはできません。

- Can't request permissions
- Can't be added to homescreen
Packages served to content distributors can staple an OCSP response and have a short expiration time, avoiding the problems with outdated packages under "Local Sharing".


- 権限を要求できません
- ホーム画面に追加することはできません
コンテンツディストリビュータに提供されるパッケージは、OCSP応答をステープルすることができ、有効期限が短く、「ローカル共有」のもとで古いパッケージの問題を回避できます。





