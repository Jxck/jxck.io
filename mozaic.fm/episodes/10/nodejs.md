# [node.js][koichik][yosuke_furukawa][mozaic.fm] ep10 Node.js

## Info

audio: https://files.mozaic.fm/mozaic-ep10.mp3

- published_at: 2014-10-07
- guest: [@koichik](https://twitter.com/koichik)
- guest: [@yosuke_furukawa](https://twitter.com/yosuke_furukawa)


## Theme

第 10 回のテーマは Node.js です。

今回は唯一の日本人 Node.js コミッタである [@koichik](https://twitter.com/koichik/) さんと、日本 Node.js ユーザグループの現代表である [@yosuke_furukawa](https://twitter.com/yosuke_furukawa) さんをお迎えし、 Node.js をテーマに 「Node.js ができた理由」から、「node@1.0」の展望「nodeconf.eu での最新事情」や「Node.js コミュニティの今後」などを二時間半たっぷり議論しました。

また、危なげな運用で続けてきた mozaic.fm も、一つ目の目標だった 10 回を達成することができました。これも、購読/出演、してくださった皆様のおかげです。これからもしばらくは続けたいと思いますので、よろしくお願いします。


## Show Note

- 0:00 ~ : intro
  - [nodeconf.eu 渡航記](http://yosuke-furukawa.hatenablog.com/entry/2014/09/09/174601)
- 2:45 ~ : Node を始めたきっかけ by yosuke_furukawa
  - [node.js](http://nodejs.org)
  - [Guille のライブコーディング](http://www.nicovideo.jp/watch/1320664679)
  - [async listener](http://nodejs.org/docs/v0.11.14/api/all.html%23all_async_listeners)
  - [assert の移植](http://github.com/jxck/assert)
  - [event emitter](http://nodejs.org/api/events.html)
- 13:50 ~ : isomorphic
  - [EventEmitter2](https://github.com/asyncly/EventEmitter2)
- 18:20 ~ : StrongLoop
  - [StrongLoop](http://strongloop.com/)
  - [Loop Back](http://strongloop.com/node-js/loopback/)
  - [StrongLoop の PV](http://strongloop.com/node-js/videos/)
- 23:00 ~ : Node を始めたきっかけ by koichik
  - [GWT](http://www.gwtproject.org/)
- 28:20 ~ : Node.js はなぜシングルスレッドのイベント駆動を選んだのか
  - [C10K 問題](http://www.hyuki.com/yukiwiki/wiki.cgi%3FTheC10kProblem)
  - [Gopher(golang じゃない方)](http://ja.wikipedia.org/wiki/Gopher)
- 36:16 ~ : そもそも非同期とは?
  - [v8](https://code.google.com/p/v8/)
  - [イベントループを止めてはいけない](http://jxck.hatenablog.com/entry/for-with-eventloop)
- 43:10 ~ : 本当に Callback Hell はあるのか?
  - [async.js](https://github.com/caolan/async)
  - [Flowless (koichik の flow control)](https://github.com/koichik/node-flowless)
- 50:18 ~ : Stream を制すものは Node を制す
  - [stream](http://nodejs.org/api/stream.html)
  - [stream を制すものは node を制す](http://jxck.hatenablog.com/entry/20111204/1322966453)
  - [stream handbook](https://github.com/substack/stream-handbook)
  - [dominic tarr / event-stream](https://github.com/dominictarr/event-stream)
  - [dominic tarr / through](https://github.com/dominictarr/through)
- 01:00:00 ~ : Node の弱点とは?
  - [LET IT CRASH!?](http://www.slideshare.net/koichik/node8-let-it-crash)
  - [domain](http://nodejs.org/api/domain.html)
  - [izc / cluster_master](https://github.com/isaacs/cluster-master)
  - [util.inherit()](http://nodejs.org/api/util.html%23util_util_inherits_constructor_superconstructor)
- 01:10:35 ~ : libuv はなぜ生まれたのか
  - [libev](http://software.schmorp.de/pkg/libev.html)
  - [select](http://man7.org/linux/man-pages/man2/select.2.html)
  - [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html)
  - [kqueue](http://en.wikipedia.org/wiki/Kqueue)
  - [libeio](http://software.schmorp.de/pkg/libeio.html)
  - [IOCP](http://msdn.microsoft.com/en-us/library/aa365198%28VS.85%29.aspx)
- 01:23:14 ~ : microservices
  - [graft](https://github.com/GraftJS/graft)
  - [jschan](https://github.com/GraftJS/jschan)
  - [位置透過性 椎名林檎](http://jxck.tumblr.com/post/11435831106/hook-io)
- 01:34:30 ~ : Node は何に向いていたのか?
  - [render](http://www.renderjs.org/)
  - [Rendr 入門: サーバサイドで(も)動かす、 Backbone.js](http://www.slideshare.net/mshk/rendr)
- 01:42:00 ~ : 今のトレンド LevelDB + WebRTC + Microservices
  - [MEAN](http://meanjs.org/)
  - [LevelDB](https://github.com/google/leveldb)
  - [Bittrent](http://www.bittorrent.com/)
  - [JXTA](https://jxta.kenai.com/)
- 1:51:00 ~ : Node.js の未来
  - [ES6 modules](http://wiki.ecmascript.org/doku.php%3Fid%3Dharmony:modules)
  - ES6 promise
  - [Walmart 事件](http://www.joyent.com/blog/walmart-node-js-memory-leak)
  - [boxer](http://www.getboxer.com/)
- 2:06:20 ~ : 海外での TypeScript 事情?
  - [traceur compiler](https://github.com/google/traceur-compiler)
  - [closure compiler](https://developers.google.com/closure/compiler/%3Fhl%3Dja)
- 2:09:00 ~ : 日本の Node コミュニティの今後
  - [meso さんの引退宣言](https://docs.google.com/presentation/d/1IYwvHLAT0sFLAOmBGQ7dUyD7NKajwfkOgh8SAYvJa2c/edit%23slide%3Did.p)
  - [東京 Node 学園祭 2014](http://nodefest.jp/2014/)
  - [hapi](http://hapijs.com/)
- 2:20:10 ~ : Node.js の今後(本題)
  - [flatiron](http://flatironjs.org/)
  - [おそらく isomorphic の出典になった記事](http://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
