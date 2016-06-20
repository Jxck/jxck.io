# [release note][jxck][mozaic.fm] ep21 mozaic.fm v2 release note

## Info

audio: https://files.mozaic.fm/mozaic-ep21.mp3

- published_at: 2016-06-20


## Theme

mozaic.fm の v2 をリリースしました。 breaking change があるので、そのアナウンスとテストを兼ねています。

一番大きいのは、 feed の URL の変更です。新しい URL はこちらです。

[http://feed.mozaic.fm](http://feed.mozaic.fm)


## Change Log

少し時間がかかってしまいましたが、全体的に作り直しました。
以下が v2 の変更点です。

- feed の URL が [http://feed.mozaic.fm](http://feed.mozaic.fm) に変わります。
  - feedburner をやめたかったので自分で生成するようにしました。
  - 現時点での全エピソードを feed に載せるようにしました。
  - 古い URL は feedburner のドメインなので、リダイレクトはできません。
  - 古い URL の feed は、このエピソード以降更新されません。
  - itunes の場合は自動で更新されると思います。
  - うまくいかない場合は登録のやり直しをお願いします。

- サイトを作り直しました。
  - tumblr をやめたかったので、自分で作りました。
  - 基本 https ですが、 feed などは非対応アプリがあるので http も配っています。
  - 一応 PWA 的にしたかったのですが、一気には作り込めなかったので、細かい機能をちょっとづつ足していきます。
  - ep12 以前の音声ファイルは m4a でしたが、全て mp3 に統一しました。
  - エピソードの URL が全部変わりますが、しばらくはリダイレクトします。


技術的詳細はいかにまとめました。

- [mozaic.fm の v2 のリリースと Podcast の実装と移行](https://blog.jxck.io/entries/2016-06-20/mozaicfm-v2.html)

不具合などがあった場合は、 [@jxck_](https://twitter.com/jxck_) までおしらせください。
mozaic.fm を引き続きよろしくお願いいたします。


## Show Note

- [new site](https://mozaic.fm)
- [new feed url](http://feed.mozaic.fm)
- [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash)
- [mozaic.fm の v2 のリリースと Podcast の実装と移行](https://blog.jxck.io/entries/2016-06-20/mozaicfm-v2.html)
