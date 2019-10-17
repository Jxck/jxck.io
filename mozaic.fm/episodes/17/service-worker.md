# [service worker][kinu][nhiroki_][mozaic.fm] ep17 Service Worker

## Info

audio: https://files.mozaic.fm/mozaic-ep17.mp3

published_at
: 2015-04-22

guest
: [@kinu](https://twitter.com/kinu)

guest
: [@nhiroki_](https://twitter.com/nhiroki_)


## Theme

第 17 回のテーマは Service Worker です。

今回は [@kinu](https://twitter.com/kinu) さんと [@nhiroki_](https://twitter.com/nhiroki_) さんをお迎えして、 今実装や仕様策定が進んでいる Service Worker について、なぜこうした仕様が出てきたのか、これを用いて何ができるのか、これがどう Web を変えるのか。

実装や仕様の裏話や、これが普及してからの懸念点なども含めて、じっくり議論しました。

また、 Service Worker へのフィードバックは [bug tracker](https://crbug.com/new) (基本は英語ですが、日本語でも良いそうです)、もしくは [#serviceworker](https://twitter.com/search?q=%23serviceworker&src=hash) です。


## Show Note


### 関連仕様

- [ServiceWorker](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html)
- [AppCache](https://developers.whatwg.org/offline.html%23offline)
- [Push API](http://w3c.github.io/push-api/)
- [Notifications API](https://notifications.spec.whatwg.org/)
- [Fetch](https://fetch.spec.whatwg.org/)
- [Permissions API](https://w3c.github.io/permissions/)


### Service Worker の始まり(0:00)

- [ServiceWorker](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html)


### Application Cache はなぜダメだったのか (4:30~)

- [AppCache](https://developers.whatwg.org/offline.html%23offline)
- [AppCache のダメなところ](http://alistapart.com/article/application-cache-is-a-douchebag)
- [AppCache cache poisoning](http://blog.andlabs.org/2010/06/chrome-and-safari-users-open-to-stealth.html)
- [Service Worker の改善スタートのきっかけ](https://lists.w3.org/Archives/Public/public-webapps/2013JanMar/0977.html)
- [W3C Fixing AppCache コミュニティ](https://www.w3.org/community/fixing-appcache/)
- [参考になった仕様 Chrome Event Pages](https://developer.chrome.com/extensions/event_pages)
- [幻の仕様 DataCache](http://www.w3.org/TR/DataCache/)
- [[issue] The new API should be able to explain AppCache](https://github.com/slightlyoff/ServiceWorker/issues/2)


### Service Worker はそれをどう解決したか (12:20~)

- [The new API should be able to explain AppCache](https://github.com/slightlyoff/ServiceWorker/issues/2)
- [Why Fetch but not XHR, from SW point of view](https://github.com/slightlyoff/ServiceWorker/issues/5)


### 新しく出た API の詳解 (18:30~)

- [WebWorker/SharedWorker との違い](http://www.w3.org/TR/workers/)
- [Fetch](https://fetch.spec.whatwg.org) と XHR の違い
- [[issue] Why Fetch but not XHR, from SW point of view](https://github.com/slightlyoff/ServiceWorker/issues/5)
- [Push API](http://w3c.github.io/push-api/) と他の Push との違い
- [Service Worker ハッカソン](http://googledevjp.blogspot.jp/2015/03/service-worker.html)


### Push への危惧と Permission API (40:15~)

- [Push を使った Chat のデモ](https://johnme-gcm.appspot.com/chat/)
- [Push, Permissions API and UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit%3Fpli%3D1%23heading%3Dh.21qsculrt3ow)
- [Permission の整理について](https://groups.google.com/d/topic/mozilla.dev.platform/rnSFZq14Xi4/discussion)
- [Permissions API](https://w3c.github.io/permissions/)


### BackGround Sync とは何か (49:30~)

- [BackGround Sync](https://github.com/slightlyoff/BackgroundSync/blob/master/explainer.md)


### 今後予定している API (54:00~)

- [GeoFenching](https://github.com/slightlyoff/Geofencing)
- [Navigator.connect](http://mkruisselbrink.github.io/navigator-connect/) ([#15](http://mozaic.fm/post/108491263993/15-extensible-web) で @myakura さんが言及)


### CacheAPI と Browser Cache の違い (57:30~)

- [Cache](http://www.w3.org/TR/service-workers/%23cache-storage) と ブラウザキャッシュの違い


### Devtools と ServiceWorker (1:00:00~)

- [Developer Tools 改善中](https://docs.google.com/presentation/d/1DKu4RZigLvM5XUq3ovsgffQBIHrro5-pii4qEJuyvrQ/edit%23slide%3Did.p)
- Twitter [#serviceworker](https://twitter.com/search?q=%23serviceworker&src=hash) タグ
- [元は NavigationController という名前だった](https://github.com/slightlyoff/ServiceWorker/commit/c49c878cdcbaf7a81e9e8cf3cca9970787017a19)
- [bug tracker (英語ですが最悪日本語でも可)](https://crbug.com/new)


### これからどうなっていくか? (1:07:20~)

- [Service worker が拓く mobile web の新しいかたち](http://www.slideshare.net/kinukox/service-worker-mobile-web)
- [ServiceWorker のスコープとページコントロールについて](http://qiita.com/nhiroki/items/eb16b802101153352bba)
- [Service Worker の claim() について](http://blog.nhiroki.jp/2015/04/18/service-worker-claim/)
