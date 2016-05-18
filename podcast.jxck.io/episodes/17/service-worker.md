# [service worker][kinu][nhiroki_][mozaic.fm] ep17 Service Worker

## Info

audio: https://files.mozaic.fm/mozaic-ep17.mp3

- published_at: 2015-04-22
- guest: [@kinu](https://twitter.com/kinu)
- guest: [@nhiroki_](https://twitter.com/nhiroki_)


## Theme

第 17 回のテーマは Service Worker です。

今回は [@kinu](https://twitter.com/kinu) さんと [@nhiroki_](https://twitter.com/nhiroki_) さんをお迎えして、 今実装や仕様策定が進んでいる Service Worker について、なぜこうした仕様が出てきたのか、これを用いて何ができるのか、これがどう Web を変えるのか。

実装や仕様の裏話や、これが普及してからの懸念点なども含めて、じっくり議論しました。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。

また、 Service Worker へのフィードバックは [bug tracker](http://t.umblr.com/redirect?z=https%3A%2F%2Fcrbug.com%2Fnew&t=YWNmMmZiNmZkMzU2YjM3ZmFjZjllYjA2YWVhYmIxM2RhMmRlZGIzYyxBOEh1Q2lxdQ%3D%3D) (基本は英語ですが、日本語でも良いそうです)、もしくは [#serviceworker](https://twitter.com/search?q=%23serviceworker&src=hash) です。


## Show Note

### 関連仕様

- [ServiceWorker](http://t.umblr.com/redirect?z=https%3A%2F%2Fslightlyoff.github.io%2FServiceWorker%2Fspec%2Fservice_worker%2Findex.html&t=ODU3MmZlNGYzNjZlNWU5YzE2MjI2OGVkNDczYTM4NGI0MGM5MmJlOSxBOEh1Q2lxdQ%3D%3D)
- [AppCache](http://t.umblr.com/redirect?z=https%3A%2F%2Fdevelopers.whatwg.org%2Foffline.html%23offline&t=NDFmZTE1NTgzMzBkODc2ZGUyNGQzNDY4ZWIyYjUzODM0YTU2OTY0OCxBOEh1Q2lxdQ%3D%3D)
- [Push API](http://t.umblr.com/redirect?z=http%3A%2F%2Fw3c.github.io%2Fpush-api%2F&t=NjU4YmZjYWQ3NmNhNGIwNTY1ZjM2OTU1ZDEzNDFhYmY3N2VjOGNhYixBOEh1Q2lxdQ%3D%3D)
- [Notifications API](http://t.umblr.com/redirect?z=https%3A%2F%2Fnotifications.spec.whatwg.org%2F&t=OWE3MzkxY2FjNGVjNDQ5ZjJjYjhkYzAxOWQ4MDQzY2M2NzVmNTk5YyxBOEh1Q2lxdQ%3D%3D)
- [Fetch](http://t.umblr.com/redirect?z=https%3A%2F%2Ffetch.spec.whatwg.org%2F&t=MDFhM2VlNTc4MGU0MDViNmE1OWYzMWQ3OWI4N2UyMjc5ZDU1Y2QxYyxBOEh1Q2lxdQ%3D%3D)
- [Permissions API](http://t.umblr.com/redirect?z=https%3A%2F%2Fw3c.github.io%2Fpermissions%2F&t=YTI5YWVlZmQxZDA4OGYwYjk1ZTA1MGNhZGU3ZGEyMWU2NTY0YTU5NCxBOEh1Q2lxdQ%3D%3D)


### Service Worker の始まり(0:00)

- [ServiceWorker](http://t.umblr.com/redirect?z=https%3A%2F%2Fslightlyoff.github.io%2FServiceWorker%2Fspec%2Fservice_worker%2Findex.html&t=ODU3MmZlNGYzNjZlNWU5YzE2MjI2OGVkNDczYTM4NGI0MGM5MmJlOSxBOEh1Q2lxdQ%3D%3D)


### Application Cache はなぜダメだったのか (4:30~)

- [AppCache](http://t.umblr.com/redirect?z=https%3A%2F%2Fdevelopers.whatwg.org%2Foffline.html%23offline&t=NDFmZTE1NTgzMzBkODc2ZGUyNGQzNDY4ZWIyYjUzODM0YTU2OTY0OCxBOEh1Q2lxdQ%3D%3D)
- [AppCache のダメなところ](http://t.umblr.com/redirect?z=http%3A%2F%2Falistapart.com%2Farticle%2Fapplication-cache-is-a-douchebag&t=ZGJhODIzZGE5ODI2ZTUzOGMyMjdmNTdmMjE1NTVhNzJmNzA0ZDZlNyxBOEh1Q2lxdQ%3D%3D)
- [AppCache cache poisoning](http://t.umblr.com/redirect?z=http%3A%2F%2Fblog.andlabs.org%2F2010%2F06%2Fchrome-and-safari-users-open-to-stealth.html&t=NDFhZmJlMDJmOTk0YTY5NDJmYjA0ZWRkMzkwYjAyNzVmOGViMzYwYixBOEh1Q2lxdQ%3D%3D)
- [Service Worker の改善スタートのきっかけ](http://t.umblr.com/redirect?z=https%3A%2F%2Flists.w3.org%2FArchives%2FPublic%2Fpublic-webapps%2F2013JanMar%2F0977.html&t=OTUxYTA3NjIwMDRlMjFhMmRmZmZiMWFjMGM2NTE3Y2ZiZjcyODgyMyxBOEh1Q2lxdQ%3D%3D)
- [W3C Fixing AppCache コミュニティ](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.w3.org%2Fcommunity%2Ffixing-appcache%2F&t=YWMxZDJjYWVhOTAwOTlkNTg0YmRhNjdkYmVmYjVjNTdhMjU3YWFmMCxBOEh1Q2lxdQ%3D%3D)
- [参考になった仕様 Chrome Event Pages](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.chrome.com%2Fextensions%2Fevent_pages&t=MTRmMjEyMDM0ODYyOWZjZWU2ZGI5MTFlNjZjNjk0ZDQ3ZTA5Mzg1ZCxBOEh1Q2lxdQ%3D%3D)
- [幻の仕様 DataCache](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.w3.org%2FTR%2FDataCache%2F&t=OTU5ZmY3ZTY5YWM5ZTI1ZDEyYmQ3OWNkM2ZhNTdkNDVmZjQyNzI4YSxBOEh1Q2lxdQ%3D%3D)
- [[issue] The new API should be able to explain AppCache](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FServiceWorker%2Fissues%2F2&t=ZDA1MjNkNTJmZmE0YTllOWQ1YzQ1Mjc4MTdjZDA0ZDY1ZWY3OWNhMCxBOEh1Q2lxdQ%3D%3D)


### Service Worker はそれをどう解決したか (12:20~)

- [The new API should be able to explain AppCache](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FServiceWorker%2Fissues%2F2&t=ZDA1MjNkNTJmZmE0YTllOWQ1YzQ1Mjc4MTdjZDA0ZDY1ZWY3OWNhMCxBOEh1Q2lxdQ%3D%3D)
- [Why Fetch but not XHR, from SW point of view](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FServiceWorker%2Fissues%2F5&t=ZmMyOTBjZjQ3MjBlYjMyOTk1Mjk0ZjgwZTk3OTMyZGVhNGFiMzYzYixBOEh1Q2lxdQ%3D%3D)


### 新しく出た API の詳解 (18:30~)

- [WebWorker/SharedWorker との違い](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.w3.org%2FTR%2Fworkers%2F&t=MDU3NWU4ODlmYTA1ZmUzNTUxYWNiZWUyYzY3ZDAxNDdkMjE0ZDE1OCxBOEh1Q2lxdQ%3D%3D)
- [Fetch](http://t.umblr.com/redirect?z=https%3A%2F%2Ffetch.spec.whatwg.org&t=YjcyNTE1MzhlMmNjNmY4ODIxNGQyZjFkZTM3ZmYxOGRkODkxZmRjOSxBOEh1Q2lxdQ%3D%3D) と XHR の違い
- [[issue] Why Fetch but not XHR, from SW point of view](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FServiceWorker%2Fissues%2F5&t=ZmMyOTBjZjQ3MjBlYjMyOTk1Mjk0ZjgwZTk3OTMyZGVhNGFiMzYzYixBOEh1Q2lxdQ%3D%3D)
- [Push API](http://t.umblr.com/redirect?z=http%3A%2F%2Fw3c.github.io%2Fpush-api%2F&t=NjU4YmZjYWQ3NmNhNGIwNTY1ZjM2OTU1ZDEzNDFhYmY3N2VjOGNhYixBOEh1Q2lxdQ%3D%3D) と他の Push との違い
- [Service Worker ハッカソン](http://t.umblr.com/redirect?z=http%3A%2F%2Fgoogledevjp.blogspot.jp%2F2015%2F03%2Fservice-worker.html&t=OGZiMTA3MDRlODllZGEzYzhiNmQ4NGNjMTJjYzg5YWEwODcyZDA0OSxBOEh1Q2lxdQ%3D%3D)


### Push への危惧と Permission API (40:15~)

- [Push を使った Chat のデモ](http://t.umblr.com/redirect?z=https%3A%2F%2Fjohnme-gcm.appspot.com%2Fchat%2F&t=ZjljYThlOTI0NmY1Zjg2OWQ5YTMwNTAwOTNhZTc3OGFhODY3YjdmMyxBOEh1Q2lxdQ%3D%3D)
- [Push, Permissions API and UX](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE%2Fedit%3Fpli%3D1%23heading%3Dh.21qsculrt3ow&t=YWFjMDBmMWIxMTcwYWZmMGNkNTFiZjQ4NzUxMmFlZWRkNzIzOTM0NixBOEh1Q2lxdQ%3D%3D)
- [Permission の整理について](http://t.umblr.com/redirect?z=https%3A%2F%2Fgroups.google.com%2Fd%2Ftopic%2Fmozilla.dev.platform%2FrnSFZq14Xi4%2Fdiscussion&t=MDczOTczZTYxNmI2OWI4ZjA3Nzc3MmM5ZWIyNDM2MDhiOTk4ZWFiNSxBOEh1Q2lxdQ%3D%3D)
- [Permissions API](http://t.umblr.com/redirect?z=https%3A%2F%2Fw3c.github.io%2Fpermissions%2F&t=YTI5YWVlZmQxZDA4OGYwYjk1ZTA1MGNhZGU3ZGEyMWU2NTY0YTU5NCxBOEh1Q2lxdQ%3D%3D)


### BackGround Sync とは何か (49:30~)

- [BackGround Sync](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FBackgroundSync%2Fblob%2Fmaster%2Fexplainer.md&t=MmU0M2E1MGE1NGE4MzcxMWMxODAwYjAwZGIxYmFhODhmZWRhNzUwMixBOEh1Q2lxdQ%3D%3D)


### 今後予定している API (54:00~)

- [GeoFenching](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FGeofencing&t=MWJkZmM0NWY3NTFkMjNlNmU5NDRlMTM5YWZkNzNmMTIwYzA5YWVhYyxBOEh1Q2lxdQ%3D%3D)
- [Navigator.connect](http://t.umblr.com/redirect?z=http%3A%2F%2Fmkruisselbrink.github.io%2Fnavigator-connect%2F&t=Y2VlOTk1YzQ1MGYwYjAzMTFlM2JlOGY4ZWU3MDQ1M2ZmNTBiMzVkMCxBOEh1Q2lxdQ%3D%3D) ([#15](http://mozaic.fm/post/108491263993/15-extensible-web) で @myakura さんが言及)


### CacheAPI と Browser Cache の違い (57:30~)

- [Cache](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.w3.org%2FTR%2Fservice-workers%2F%23cache-storage&t=ZTIxMjNhNTQ1NjNiODE1MWRhMDY3NDk3NzUxMDQyNjg5YTc5MTBjNyxBOEh1Q2lxdQ%3D%3D) と ブラウザキャッシュの違い


### Devtools と ServiceWorker (1:00:00~)

- [Developer Tools 改善中](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.google.com%2Fpresentation%2Fd%2F1DKu4RZigLvM5XUq3ovsgffQBIHrro5-pii4qEJuyvrQ%2Fedit%23slide%3Did.p&t=NGQyZDA0MGIyYTU3NmFjNjc3Y2M5ZWE3YzdhZTRhNGFlZGFhMjNjOCxBOEh1Q2lxdQ%3D%3D)
- Twitter [#serviceworker](https://twitter.com/search?q=%23serviceworker&src=hash) タグ
- [元は NavigationController という名前だった](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fslightlyoff%2FServiceWorker%2Fcommit%2Fc49c878cdcbaf7a81e9e8cf3cca9970787017a19&t=ZDdkZDVjZjFiZGUzNjcxMzJmMjI2M2Y1NjQwMTMzYTE5YzdkNjZlNCxBOEh1Q2lxdQ%3D%3D)
- [bug tracker (英語ですが最悪日本語でも可)](http://t.umblr.com/redirect?z=https%3A%2F%2Fcrbug.com%2Fnew&t=YWNmMmZiNmZkMzU2YjM3ZmFjZjllYjA2YWVhYmIxM2RhMmRlZGIzYyxBOEh1Q2lxdQ%3D%3D)


### これからどうなっていくか? (1:07:20~)

- [Service worker が拓く mobile web の新しいかたち](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fkinukox%2Fservice-worker-mobile-web&t=OTRhOTgyNzM3NzQ2OWY0MmYxYjA5MjhhN2FlZjliN2UyYjA5YjRmOCxBOEh1Q2lxdQ%3D%3D)
- [ServiceWorker のスコープとページコントロールについて](http://t.umblr.com/redirect?z=http%3A%2F%2Fqiita.com%2Fnhiroki%2Fitems%2Feb16b802101153352bba&t=MzNjOTg3ZTFiOWE5MzkxMjBjNzY5YTE1MWE1YjEyNjk2NzdlYzFlYSxBOEh1Q2lxdQ%3D%3D)
- [Service Worker の claim() について](http://t.umblr.com/redirect?z=http%3A%2F%2Fblog.nhiroki.jp%2F2015%2F04%2F18%2Fservice-worker-claim%2F&t=ZDJmODcwYzcwMjQxNjU3MGE4ZWY4MWVjOGI0ZTY3Yzk0Nzg4N2I4YSxBOEh1Q2lxdQ%3D%3D)
