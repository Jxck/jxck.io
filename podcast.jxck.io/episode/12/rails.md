# #12 Rails

<audio preload=none controls src=http://files.mozaic.fm/mozaic-ep12.mp3"></audio>


## Theme

第 12 回目のテーマは Ruby on Rails です。

今回は Ruby と Rail のコミッターである [@a_matsuda](https://twitter.com/a_matsuda/) さんをお迎えして、 Rails が引っ張ってきた Web 開発と、 Web の進化が Ruby に与えた影響などを振り返りながら、 Rails に「今何が起こっているのか」、「これからどうなっていくのか」を議論しました。

プロジェクトオーナーである DHH が最初の Rails をリリースしてから 10 年たった今、この 10 年を見てきた [@a_matsuda](https://twitter.com/a_matsuda/) さんとともに、 10 年前と比べて様変わりしたフロントエンド開発との兼ね合いや、 Microservices に対する感触などについて議論しました。

エピソードの感想などは、 [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) までお願いします。

(なお、 Android での不具合のフィードバックを頂いたため、今回から配信形式を m4a ではなく mp3 に変えました。アートワークはありません。)


## Guest

- [@a_matsuda](https://twitter.com/a_matsuda)


## Show Note

- [Ruby on Rails](http://t.umblr.com/redirect?z=http%3A%2F%2Frubyonrails.org%2F&t=NGI3ZjQ4ZjQ2Y2UxNWFmNjU5OTE2YzUwNzM0NGIxZDY4YjYxZGM3YixMdFdhcWRlTA%3D%3D)
- [Rails の歴史](http://t.umblr.com/redirect?z=http%3A%2F%2Fja.wikipedia.org%2Fwiki%2FRuby_on_Rails&t=ODhjOWVmZWQxMGZiZTk4NDY5NTY0Njg3YTU3NjJhZmE3MWM4NGVjNSxMdFdhcWRlTA%3D%3D) (Wikipedia 引用)
  - 2004/7 最初のバージョン公開
  - 2005/12/13 ver 1.0 リリース
  - 2007/12/7  ver 2.0 リリース
  - 2010/8/29  ver 3.0 リリース
  - 2013/6/27  ver 4.0 リリース
- 今年中盤くらいにあった投稿
  - [Rails が時代に合わなくなってきた](http://t.umblr.com/redirect?z=http%3A%2F%2Fqiita.com%2Fkaiinui%2Fitems%2F2781219340d427543d08&t=ZGFjM2I5MWM0MTg0MWRjYzlkMjk0Yzk2MmM5MDUyMTVkYTFjMmFjNyxMdFdhcWRlTA%3D%3D)
  - [「Rails が時代に合わなくなってきた」のフォロー](http://t.umblr.com/redirect?z=http%3A%2F%2Fwazanova.jp%2Fitems%2F1361&t=MmZjNTBmZTI3OThiOGZjMGJiZjRjYjE0ZmFlYWM2YzU1YjI0YTA5NyxMdFdhcWRlTA%3D%3D)
- [DHH(David Heinemeier Hansson)](https://twitter.com/dhh) Rails の作者
- [Jeremy Kemper](https://twitter.com/bitsweat) Rails Comitter
- [Koichi Sasada](https://twitter.com/koichisasada) Ruby Comitter
- [Coffee Script](http://t.umblr.com/redirect?z=http%3A%2F%2Fcoffeescript.org%2F&t=NTdmNDE5M2QyNTA1YTA2YzhjYzJiOTNhZDgzMTVlZmZmNjM5ODRlOCxMdFdhcWRlTA%3D%3D)
- [Sprockets](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Frails%2Fsprockets-rails&t=Y2U0OWE3OGRkY2NkMjQyYmU2NjYxZDg0MDVhM2FiNGNmYTEyMDhiNyxMdFdhcWRlTA%3D%3D) Asset Pipeline のためのプリプロセッサライブラリ
- [Merb](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.merbivore.com%2F&t=ZmY2NDRkODdkZDczNzkzZmE2YThiYzY4ZGU2NzkzNDMyYmUwMTMxNyxMdFdhcWRlTA%3D%3D) Rails と統合したフレームワーク
- [Yehuda Katz](https://twitter.com/wycats) Merb チームの開発者
- [Will Paginate](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fmislav%2Fwill_paginate&t=NGUwZTYyMmQ4NmY3YzkzMjcxNzBlNzEwYmY5ZDllYWFhYmU5ZDI2MixMdFdhcWRlTA%3D%3D) ページネーションプラグイン
- [kaminari](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Famatsuda%2Fkaminari&t=ODA0OGY5MGEzZjZhYWQzN2E3NmU2YTE5YTFkNGM2MGY2MDczY2QwZixMdFdhcWRlTA%3D%3D) a_matsuda さん作のページネーションプラグイン
- [Arel](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Frails%2Farel&t=ZTgxMDU3ZDY1N2E5MzE5MmEzMTljMGI1ZGE2YjE4MWNiNmEyZjQ3MSxMdFdhcWRlTA%3D%3D)
- [turbolinks](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Frails%2Fturbolinks&t=ZmIwMTc3ZjU1MmNhZDkzMWIzNTE3YzFhNmVlYWU2MzQyZmY4OWU5OCxMdFdhcWRlTA%3D%3D) Rails の Pjax 実装
- [Rails4.2.0rc1](http://t.umblr.com/redirect?z=http%3A%2F%2Fweblog.rubyonrails.org%2F2014%2F11%2F28%2FRails-4-2-0-rc1-has-been-released%2F&t=NjFmOTgzNmM4MTZkYjMwNWM3NDhhMjU3M2QzMTJmMjQxYTNjOTM0MCxMdFdhcWRlTA%3D%3D) 録音二日後に公開されました
- [Ember.js](http://t.umblr.com/redirect?z=http%3A%2F%2Femberjs.com%2F&t=MTdlNGZkZDFiMTE0OGRlNmFlNzQ3NGMxOTVlMzBiYjQ5OTM5ZTY5ZSxMdFdhcWRlTA%3D%3D)
- [jbuilder](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Frails%2Fjbuilder&t=NGI4ZWQxNDk0YmI2YTAxMmJiZjM4MTAwNDE1YjRlN2E2YWU3NmFiOCxMdFdhcWRlTA%3D%3D)
- [backbone.js](http://t.umblr.com/redirect?z=http%3A%2F%2Fbackbonejs.org&t=Yjg3NTExZmM4OWU5ZDZmNGY5YTVmNjM4NWIzZTk1NzVkODU1MjdhNSxMdFdhcWRlTA%3D%3D)
- [microservices](http://t.umblr.com/redirect?z=http%3A%2F%2Fmartinfowler.com%2Farticles%2Fmicroservices.html&t=MDBiYzRkZTBiM2ExMGE1ZTY2NGIwYzNlZGIyNGE2YzIxYzA3NzNkYyxMdFdhcWRlTA%3D%3D)
- [Active Resource](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Frails%2Factiveresource&t=MjJjOWYxNWE3YTBjMzY5MjMwYjczZTRmM2U2ZWViYWU4NjkyNmIwZSxMdFdhcWRlTA%3D%3D)


## Related Entry

- [mozaic.fm#12 Rails の話で思ったこと](http://t.umblr.com/redirect?z=http%3A%2F%2Fjacoyutorius.com%2F%3Fp%3D1019&t=NmZhMzRlZDYzNDEzYWNkYzY1YWE0ZjY2MTE2M2RkOTI0YjkzZWI3ZixMdFdhcWRlTA%3D%3D)
