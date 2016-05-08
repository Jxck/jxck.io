# [virtual dom][react][flex][mizchi][mozaic.fm] ep13 Virtual DOM

<audio preload="none" src="https://files.mozaic.fm/mozaic-ep13.mp3" controls></audio>

<ul class=info>
  <li>published_at: <time datetime=2014-12-27>2014-12-27</time>
  <li>guest: <a href=https://twitter.com/mizchi>@mizchi</a>
</ul>


## Theme

第 13 回目のテーマは Virtual DOM です。

今回は [@mizchi](https://twitter.com/mizchi/) さんをお迎えして、 Virtual DOM というアイデアの本質、それが可能にした Flux というアーキテクチャ、そして各種の実装と今後の期待について、「今何が起こっているのか」、「これからどうなっていくのか」を議論しました。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

### Virtual DOM

- [Virtual DOM Advent Calendar](http://t.umblr.com/redirect?z=http%3A%2F%2Fqiita.com%2Fadvent-calendar%2F2014%2Fvirtual-dom&t=MjdjMzRjYTdkNTIyY2E2YmU0MzFkOGQ0YjgwMTAzMzMwZTg4OGY3NCxKc2dSYkdjVw%3D%3D)
- [なぜ仮想 DOM という概念が俺達の魂を震えさせるのか](http://t.umblr.com/redirect?z=http%3A%2F%2Fqiita.com%2Fmizchi%2Fitems%2F4d25bc26def1719d52e6&t=Y2E1ZGM0YzBjMzUzNDJhMjYxNDE3ZDRkZTFkM2I0ZDFiOTBhZDUzOSxKc2dSYkdjVw%3D%3D)
- [あなたが React を使うべき理由](http://t.umblr.com/redirect?z=http%3A%2F%2Fmizchi.hatenablog.com%2Fentry%2F2014%2F09%2F02%2F201728&t=NzYwMzdkZDcxZmE2ZjY1MWQ5OGEwMDcxMTI2ZTcwYzY1M2U4YjhjYSxKc2dSYkdjVw%3D%3D)
- [om](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fswannodette%2Fom&t=NzM5Yjc5NDRmZjkzODJjZTIwNWQzZjkwYTA3OTg1NzhkMzFhMjBhOSxKc2dSYkdjVw%3D%3D)
- [ClosureScript](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fclojure%2Fclojurescript&t=MzkwYWYyMmNkYzhkNDdhNTUxZTc1Y2YzZTJmYzQxZTMwMzVjMjBmYixKc2dSYkdjVw%3D%3D)
- [React](http://t.umblr.com/redirect?z=http%3A%2F%2Ffacebook.github.io%2Freact%2F&t=MGMzYmI4MTY5YWZiZmE1ODU3NzhkZjMwNThmYjAwMzdmYzlhNTgwZCxKc2dSYkdjVw%3D%3D)
- [JSX](http://t.umblr.com/redirect?z=http%3A%2F%2Ffacebook.github.io%2Fjsx%2F&t=MjVmY2NjNTM2YjBiMGUwOTVlNDlhM2E5M2E4NWEyZTU1MjY1ODM3NSxKc2dSYkdjVw%3D%3D)
- [リアルな DOM はなぜ遅いのか](http://t.umblr.com/redirect?z=http%3A%2F%2Fsteps.dodgson.org%2Fb%2F2014%2F12%2F11%2Fwhy-is-real-dom-slow%2F&t=MWE1OTM5YjkwODc1YjMyYjUwN2EyYzU4ODc0ZjE5NjAzYzM5ZTA1NSxKc2dSYkdjVw%3D%3D)
- [react-jade](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fjadejs%2Freact-jade&t=ZTNlODk0Y2UzYjQwNWIwYTgwMTQzNDJkNjBjMjNhM2Y3YWQ4YzdiOSxKc2dSYkdjVw%3D%3D)
- [deku](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fsegmentio%2Fdeku&t=YjRkNGY3ZDcyOTYxNGE3M2Y0ZTU5ZGQ1ODhiYzhlMDgxNTA5NjBjNSxKc2dSYkdjVw%3D%3D)
- [virtual-dom](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2FMatt-Esch%2Fvirtual-dom&t=ZjJiOWQ0MTk2NWFjZDBlZTYyN2IyMDVhMGJkZjg3MjU0NTExYTM1ZixKc2dSYkdjVw%3D%3D)
- [ractive.js](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.ractivejs.org%2F&t=N2QwYzJjMjJjYzJmZDUxNjQ2NDk1YjYyMzY2ZThmMDYzZDQxNzJlMyxKc2dSYkdjVw%3D%3D)
- [React's diff algorith](http://t.umblr.com/redirect?z=http%3A%2F%2Fcalendar.perfplanet.com%2F2013%2Fdiff%2F&t=MzA2ZWM0ODJjNWM0NWJhNjQ2MzYwMjgwMGE5ZmY3NTcxMDUyNTlmMCxKc2dSYkdjVw%3D%3D)


### Flux

- [Flux](http://t.umblr.com/redirect?z=http%3A%2F%2Ffacebook.github.io%2Fflux%2F&t=NzIyNjIwMmIzNDE0ODNkYTJhZDFlYjcwY2NjZjM4OWQ1YWNkNzRkMCxKc2dSYkdjVw%3D%3D)
- [Flux アーキテクチャ覚え書き](http://t.umblr.com/redirect?z=http%3A%2F%2Fsaneyukis.hatenablog.com%2Fentry%2F2014%2F09%2F26%2F174750&t=YWQ4YmE2Nzc1NmVjODY5YmIxYTgxY2QwNDBiMjkwZjYyMzIyMjExMSxKc2dSYkdjVw%3D%3D)
- [Flux とはなんだったのか + misc at 2014](http://t.umblr.com/redirect?z=http%3A%2F%2Fsaneyukis.hatenablog.com%2Fentry%2F2014%2F12%2F24%2F014421&t=NTEwZTVjYjdjZmEzZGEyM2MyNTIyM2E1ZGQ2OGRhYTQyZDNiZTNkYSxKc2dSYkdjVw%3D%3D)(収録後公開)
- [MVC 周りの整理エントリ](http://t.umblr.com/redirect?z=http%3A%2F%2Fblog.nodejitsu.com%2Fscaling-isomorphic-javascript-code%2F&t=MzA3ZGU2MzkyYmY2ODNiYTA4YzcwODFmMWMzNjQxMzA0YjdjNmFjZSxKc2dSYkdjVw%3D%3D)
- [Reflux](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fspoike%2Frefluxjs&t=NDBhNTljNjI1MzI0MmIxOWY0Njc4NjljOTM3ZThiMWY5OTczZjhlOSxKc2dSYkdjVw%3D%3D)
- [Delorean](http://t.umblr.com/redirect?z=http%3A%2F%2Fdeloreanjs.com%2F&t=OTNhNmZjNzIzY2E0YzZiMTY0ZTllMjNmZDZkOTY3MGRjNmE2NDY2NixKc2dSYkdjVw%3D%3D)
- [Fluxxor](http://t.umblr.com/redirect?z=http%3A%2F%2Ffluxxor.com%2F&t=YjEyZWZjMjQyYzhjZDFkOWIxOGIxODdkNGQyYTA2YTExNzJlNTQzZCxKc2dSYkdjVw%3D%3D)
