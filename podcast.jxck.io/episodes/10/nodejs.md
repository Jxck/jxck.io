# [node.js][koichik][yosuke_furukawa][mozaic.fm] ep10 Node.js

<audio preload="none" src="https://files.mozaic.fm/mozaic-ep10.m4a" controls></audio>

<ul class=info>
  <li>published_at: <time datetime=2014-10-07>2014-10-07</time>
  <li>guest: <a href=https://twitter.com/koichik>@koichik</a>
  <li>guest: <a href=https://twitter.com/yosuke_furukawa>@yosuke_furukawa</a>
</ul>


## Theme

第 10 回のテーマは Node.js です。

今回は唯一の日本人 Node.js コミッタである [@koichik](https://twitter.com/koichik/) さんと、日本 Node.js ユーザグループの現代表である [@yosuke_furukawa](https://twitter.com/yosuke_furukawa) さんをお迎えし、 Node.js をテーマに 「Node.js ができた理由」から、「node@1.0」の展望「nodeconf.eu での最新事情」や「Node.js コミュニティの今後」などを二時間半たっぷり議論しました。

また、危なげな運用で続けてきた mozaic.fm も、一つ目の目標だった 10 回を達成することができました。これも、購読/出演、してくださった皆様のおかげです。これからもしばらくは続けたいと思いますので、よろしくお願いします。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

- 0:00 ~ : intro
  - [nodeconf.eu 渡航記](http://t.umblr.com/redirect?z=http%3A%2F%2Fyosuke-furukawa.hatenablog.com%2Fentry%2F2014%2F09%2F09%2F174601&t=Mzk1NmI3OTU5NTZkYWU5ZWFkMzI2Y2NjMTk2NDJjNDc1MzRhMDg2NSxYdVJHVGd5bQ%3D%3D)
- 2:45 ~ : Node を始めたきっかけ by yosuke_furukawa
  - [node.js](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org&t=MjZjZTRhNDVhNDBjYjVmNWEwMzk2MDkzNzY0MDg3MDFjOTQ1YWRlNixYdVJHVGd5bQ%3D%3D)
  - [Guille のライブコーディング](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.nicovideo.jp%2Fwatch%2F1320664679&t=ZjA5M2ZlN2VjNWQ3YWM3OTM3MTg3OWNlZjgzNGY3YzRiNGQyNDU5OCxYdVJHVGd5bQ%3D%3D)
  - [async listener](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org%2Fdocs%2Fv0.11.14%2Fapi%2Fall.html%23all_async_listeners&t=MjY0M2YyYTFiNzI3YmRmZWMyMjE2YWNjYmVlYTgwYzgxNWJhYTRhZCxYdVJHVGd5bQ%3D%3D)
  - [assert の移植](http://t.umblr.com/redirect?z=http%3A%2F%2Fgithub.com%2Fjxck%2Fassert&t=Y2VhODQ0NTA1ODA0NWI2NTRkYTBlZjdkN2Y2ZGQxOTA1NzIwZGEwOCxYdVJHVGd5bQ%3D%3D)
  - [event emitter](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org%2Fapi%2Fevents.html&t=MWI5NTk2M2U1ZjNlYmVmM2Y5NTYyZDdlNzIzMTJlMTM2YmI2MDA2OSxYdVJHVGd5bQ%3D%3D)
- 13:50 ~ : isomorphic
  - [EventEmitter2](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fasyncly%2FEventEmitter2&t=OGJhODA4MzAwYmU3YzJmZjNmOWI4NzI3YzQ2OTVjMTUwMmY4YjE1MixYdVJHVGd5bQ%3D%3D)
- 18:20 ~ : StrongLoop
  - [StrongLoop](http://t.umblr.com/redirect?z=http%3A%2F%2Fstrongloop.com%2F&t=YTA2MTc5MTdkNzg2ZThmNDkzNTFiZmFmZDliZjQ0MjZmZTUyMWY1OSxYdVJHVGd5bQ%3D%3D)
  - [Loop Back](http://t.umblr.com/redirect?z=http%3A%2F%2Fstrongloop.com%2Fnode-js%2Floopback%2F&t=MWVlNWY3NDQ3YjYxYWMwZGVlZjUxODNmMmE1MGI5OTUyNGMzMDYxNyxYdVJHVGd5bQ%3D%3D)
  - [StrongLoop の PV](http://t.umblr.com/redirect?z=http%3A%2F%2Fstrongloop.com%2Fnode-js%2Fvideos%2F&t=NzRkZDBiMGJkMWY0MDQ4NGU5MTQ5Nzk1YTM4OTE5YTE4NWRhMjkzNixYdVJHVGd5bQ%3D%3D)
- 23:00 ~ : Node を始めたきっかけ by koichik
  - [GWT](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.gwtproject.org%2F&t=Y2RmZWM4NjM3ZTRiMjdhNzY2OTQ0N2RjZjU2Yjk5N2JkNzNmMjRiZCxYdVJHVGd5bQ%3D%3D)
- 28:20 ~ : Node.js はなぜシングルスレッドのイベント駆動を選んだのか
  - [C10K 問題](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.hyuki.com%2Fyukiwiki%2Fwiki.cgi%3FTheC10kProblem&t=Mjg4ODgzNzFmYmY2MzdlZTA1N2VkNmE0YzMzZDcwMjdiMWQzNDEwNSxYdVJHVGd5bQ%3D%3D)
  - [Gopher(golang じゃない方)](http://t.umblr.com/redirect?z=http%3A%2F%2Fja.wikipedia.org%2Fwiki%2FGopher&t=NjVkZjM1MjZkMzUyMjk4YmYyODNiNzcyNTc2YTdjYzQ1ZDA2NzBkYyxYdVJHVGd5bQ%3D%3D)
- 36:16 ~ : そもそも非同期とは?
  - [v8](http://t.umblr.com/redirect?z=https%3A%2F%2Fcode.google.com%2Fp%2Fv8%2F&t=NWE1ZmZlZTZlNTEzZjk4NzVmM2FiOWYyMzVkOGZjMGIyOTc5YjQ1MixYdVJHVGd5bQ%3D%3D)
  - [イベントループを止めてはいけない](http://t.umblr.com/redirect?z=http%3A%2F%2Fjxck.hatenablog.com%2Fentry%2Ffor-with-eventloop&t=YzU4MTMyZDRkNjM1MTIyMDczMGVmMmYzNjgzYjk4MTA3OTQwOWM2NSxYdVJHVGd5bQ%3D%3D)
- 43:10 ~ : 本当に Callback Hell はあるのか?
  - [async.js](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fcaolan%2Fasync&t=OGIzMmY4NDQ2MjE1NzY2YTllMjExYzI4YmU5MTFlMDY3N2Q0NjMxOCxYdVJHVGd5bQ%3D%3D)
  - [Flowless (koichik の flow control)](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fkoichik%2Fnode-flowless&t=MzBmNmMwOWRkNjQ3NjJhZDQ2Mjc0ZGI2OTI4NGU5YTUwZGZhZjI1ZSxYdVJHVGd5bQ%3D%3D)
- 50:18 ~ : Stream を制すものは Node を制す
  - [stream](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org%2Fapi%2Fstream.html&t=YTllMzM2MzM1NzQ1OTU5NzBmZjM2OTg4ZGUwZGNkNWUzZWM0YmU2MyxYdVJHVGd5bQ%3D%3D)
  - [stream を制すものは node を制す](http://t.umblr.com/redirect?z=http%3A%2F%2Fjxck.hatenablog.com%2Fentry%2F20111204%2F1322966453&t=YTcxNDBmMDY4ZTk3OTEwZjBiYWIyYWFhMWE5ODJlY2U3ZTZhOTBlMyxYdVJHVGd5bQ%3D%3D)
  - [stream handbook](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fsubstack%2Fstream-handbook&t=MzE4ZDlmODM5MDQ0NmM1NjJhOGFhYWQ4NjI2OTIzYWQ1MWUxNzY4YSxYdVJHVGd5bQ%3D%3D)
  - [dominic tarr / event-stream](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fdominictarr%2Fevent-stream&t=MWQ5YzA1ZjgwYjM5NTZmZTZmZGM5NjZiNGVhYTNkM2RkZmUxOTU4ZSxYdVJHVGd5bQ%3D%3D)
  - [dominic tarr / through](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fdominictarr%2Fthrough&t=Y2RmNDg4N2EzMjRhYjYxMjExYmJmZDY0NGU5MjY2Y2U0Mzg0NzllOSxYdVJHVGd5bQ%3D%3D)
- 01:00:00 ~ : Node の弱点とは?
  - [LET IT CRASH!?](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fkoichik%2Fnode8-let-it-crash&t=NTQwMjI0Y2U4ODY3YTFhNjRmMDY5ZWMzNWNlMDkxMGJmMjEyOGE4ZCxYdVJHVGd5bQ%3D%3D)
  - [domain](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org%2Fapi%2Fdomain.html&t=MjkxNjVhN2NhODExNjViNjdhZDk1ZDI4YTAzNmNlNWJkODk4YmVhMCxYdVJHVGd5bQ%3D%3D)
  - [izc / cluster_master](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fisaacs%2Fcluster-master&t=ZDE0M2IwNDg4MjFhOWMwZDk4ZWQ1ZjdmMzlkZDU4NzUzMDNmNjFkMCxYdVJHVGd5bQ%3D%3D)
  - [util.inherit()](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodejs.org%2Fapi%2Futil.html%23util_util_inherits_constructor_superconstructor&t=YjAwNTViYzMzZDNiYTliMWU4NTI5NzM3ZjU5YjY0MTJjMjA0NDY5YSxYdVJHVGd5bQ%3D%3D)
- 01:10:35 ~ : libuv はなぜ生まれたのか
  - [libev](http://t.umblr.com/redirect?z=http%3A%2F%2Fsoftware.schmorp.de%2Fpkg%2Flibev.html&t=Mjc1ZmJkNjI1NTFhNTFkNmFmYjQ3YzRkNDE1NWNjODE0ZDA0ZmM4YixYdVJHVGd5bQ%3D%3D)
  - [select](http://t.umblr.com/redirect?z=http%3A%2F%2Fman7.org%2Flinux%2Fman-pages%2Fman2%2Fselect.2.html&t=MzAwYmQ3OWRjMzZiNTEyYzE0YjNiNDE0NzhlM2UzZDhlNDlhNzNjYixYdVJHVGd5bQ%3D%3D)
  - [epoll](http://t.umblr.com/redirect?z=http%3A%2F%2Fman7.org%2Flinux%2Fman-pages%2Fman7%2Fepoll.7.html&t=ZmUyMWJlMGU3NzVhN2I3NjliMjNkNzAyYTQwYzI1YmYzM2JkYWFkNyxYdVJHVGd5bQ%3D%3D)
  - [kqueue](http://t.umblr.com/redirect?z=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FKqueue&t=MjQ1NDQwYTAxNzBlODhlMmE3YTEyMzdjNjNiMmI5ZDY3YWU3MTNkZSxYdVJHVGd5bQ%3D%3D)
  - [libeio](http://t.umblr.com/redirect?z=http%3A%2F%2Fsoftware.schmorp.de%2Fpkg%2Flibeio.html&t=YzYyNDNmMjZlMzk5NmYzNTQwMmNhZDY3MDQzN2VkZGRkNzM5YzgzMixYdVJHVGd5bQ%3D%3D)
  - [IOCP](http://t.umblr.com/redirect?z=http%3A%2F%2Fmsdn.microsoft.com%2Fen-us%2Flibrary%2Faa365198%28VS.85%29.aspx&t=ZmY2NTYxZDA2M2I5ZWM5MmQ2ZTZmMzg0ZjFjNTY5MjNhNGQxMmM2MyxYdVJHVGd5bQ%3D%3D)
- 01:23:14 ~ : microservices
  - [graft](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2FGraftJS%2Fgraft&t=ZWVhZDc2ZDBhYjA2YzJjYzQ0NDJkZWY1NjQ5OWJjOGJmMGZmYTM5MSxYdVJHVGd5bQ%3D%3D)
  - [jschan](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2FGraftJS%2Fjschan&t=ZTM5NmU0OGYxOGEyYzM3ZTM3MzhlMjVhMWIzNmFkZWZkMjk0NjM0YSxYdVJHVGd5bQ%3D%3D)
  - [位置透過性 椎名林檎](http://jxck.tumblr.com/post/11435831106/hook-io)
- 01:34:30 ~ : Node は何に向いていたのか?
  - [render](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.renderjs.org%2F&t=MjI4Yjk0NGYzYzc0ZDEwMDczMjlmNzg5NTAyYTMwMTE3YjMyMTU5MCxYdVJHVGd5bQ%3D%3D)
  - [Rendr 入門: サーバサイドで(も)動かす、 Backbone.js](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fmshk%2Frendr&t=YjA2MTAyZDRmNjRkOWQwOGU1NTQ1MmQ2OWYxZjYyZmE3MDkwY2RhZCxYdVJHVGd5bQ%3D%3D)
- 01:42:00 ~ : 今のトレンド LevelDB + WebRTC + Microservices
  - [MEAN](http://t.umblr.com/redirect?z=http%3A%2F%2Fmeanjs.org%2F&t=YWZmMWFkY2JlYjAwOGNiYWY3OTJkZDcxZjYzZWE0MjFhOTUxMmI3YSxYdVJHVGd5bQ%3D%3D)
  - [LevelDB](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fgoogle%2Fleveldb&t=NjkwYTNjNWUzNmUzMmU5MWQwMjMxOWI4MWMxMzZhOTVjY2FkOTYzMCxYdVJHVGd5bQ%3D%3D)
  - [Bittrent](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.bittorrent.com%2F&t=MzFkZWQ2NjM1NzFlZGZiYzU3MmQyY2Y3ZGU1YWY3MTYzYWUwYWI5NyxYdVJHVGd5bQ%3D%3D)
  - [JXTA](http://t.umblr.com/redirect?z=https%3A%2F%2Fjxta.kenai.com%2F&t=OWY3ODJkOWI2NmY1MWQwZGRiNGE5ZGJjZjkyNjY0NzM5OGFlMmNjZixYdVJHVGd5bQ%3D%3D)
- 1:51:00 ~ : Node.js の未来
  - [ES6 modules](http://t.umblr.com/redirect?z=http%3A%2F%2Fwiki.ecmascript.org%2Fdoku.php%3Fid%3Dharmony%3Amodules&t=NmNjNzY2ZDFhNTI4ODFlNTgyOTVmNmEwMzI2NTRhMWEyOWExODVkYSxYdVJHVGd5bQ%3D%3D)
  - <a>ES6 promise</a>
  - [Walmart 事件](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.joyent.com%2Fblog%2Fwalmart-node-js-memory-leak&t=YWYwZjQxOWJjNTg1NmFmMzZmYjMwNTE2Y2I5NzQ3YzU5MzgxMGIzMSxYdVJHVGd5bQ%3D%3D)
  - [boxer](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.getboxer.com%2F&t=NjFjY2NlOTFhZTA4MjA2NTg3N2Y1MTQ3ZTVhZTdmNjk2YmNlMjljNCxYdVJHVGd5bQ%3D%3D)
- 2:06:20 ~ : 海外での TypeScript 事情?
  - [traceur compiler](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fgoogle%2Ftraceur-compiler&t=YjE5MzBiNDcwMzA5OGRmNWY5NDQ0ZjEzYzE0NGI2NGJjNzkyYjhhZSxYdVJHVGd5bQ%3D%3D)
  - [closure compiler](http://t.umblr.com/redirect?z=https%3A%2F%2Fdevelopers.google.com%2Fclosure%2Fcompiler%2F%3Fhl%3Dja&t=MWMyN2Y0ZGE1YjJmOTQ3MDVlZDg5MDJmOTE4NzBkZDk3ZDFjMWM2NyxYdVJHVGd5bQ%3D%3D)
- 2:09:00 ~ : 日本の Node コミュニティの今後
  - [meso さんの引退宣言](http://t.umblr.com/redirect?z=https%3A%2F%2Fdocs.google.com%2Fpresentation%2Fd%2F1IYwvHLAT0sFLAOmBGQ7dUyD7NKajwfkOgh8SAYvJa2c%2Fedit%23slide%3Did.p&t=MDVkOTRhODQ4NTJkZWE1ZDVjODFiM2RiY2UzN2Q4MDA4MjkyNGM2MSxYdVJHVGd5bQ%3D%3D)
  - [東京 Node 学園祭 2014](http://t.umblr.com/redirect?z=http%3A%2F%2Fnodefest.jp%2F2014%2F&t=YWE2NjZiNjAzMGQ3M2QzMDQ1NWQ3MDkxMDgwMTRiYWQ3ZDJhOWJmNSxYdVJHVGd5bQ%3D%3D)
  - [hapi](http://t.umblr.com/redirect?z=http%3A%2F%2Fhapijs.com%2F&t=OTA3OGMwNzZlN2EzNGYyNTcxZDdhOGM0ODFkOGM1OTVjYjQxOWE2YixYdVJHVGd5bQ%3D%3D)
- 2:20:10 ~ : Node.js の今後(本題)
  - [flatiron](http://t.umblr.com/redirect?z=http%3A%2F%2Fflatironjs.org%2F&t=M2VhNDhjZTA5MDcwNDFhZTA5NDQ4NzcwMzQ2NmVhMmJkNzZjM2U5MixYdVJHVGd5bQ%3D%3D)
  - [おそらく isomorphic の出典になった記事](http://t.umblr.com/redirect?z=http%3A%2F%2Fblog.nodejitsu.com%2Fscaling-isomorphic-javascript-code%2F&t=ZTgzYTY4MDRhMzZkOGFjNmQzMzg5ZTA5ZjUzYTc5YWNjNDVkZDQ2MSxYdVJHVGd5bQ%3D%3D)
