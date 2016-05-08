# [node.js][koichik][yosuke_furukawa][mozaic.fm] ep10 Node.js sideshow

<audio preload="none" src="https://files.mozaic.fm/mozaic-ep10.sideshow.m4a" controls></audio>

<ul class=info>
  <li>published_at: <time datetime=2014-10-23>2014-10-23</time>
  <li>guest: <a href=https://twitter.com/koichik>@koichik</a>
  <li>guest: <a href=https://twitter.com/yosuke_furukawa>@yosuke_furukawa</a>
</ul>


## Theme

第 10 回目 node.js の SideShow です。

[@koichik](https://twitter.com/koichik) さんの「ところでみんな Promise 好き?」から始まった、 Promise / Generator / Rxjs などの話題と、 Java の Future や Haskell の Monad との関係などの解説です。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

- 0:00 ~ : そもそもみんな Promise 好き?
  - [ES6 Promise](http://t.umblr.com/redirect?z=http%3A%2F%2Fpeople.mozilla.org%2F%7Ejorendorff%2Fes6-draft.html%23sec-promise-objects&t=YThiMjU4NTJjM2JlYTM2NTg0YzUxNjg0NzVmNmE2ZmMwYjgwM2VlYiwzM1NyMFYwWQ%3D%3D)
  - [WindJS](http://t.umblr.com/redirect?z=http%3A%2F%2Ftry.buildwinjs.com%2F&t=OGFmNDU0MGFlNzIwNWQ5YjJhNzAwZWY5OWE5NGEyOTBkNmE3ZTU1NCwzM1NyMFYwWQ%3D%3D)
  - [カール・ヒューイット](http://t.umblr.com/redirect?z=http%3A%2F%2Fja.wikipedia.org%2Fwiki%2F%25E3%2582%25AB%25E3%2583%25BC%25E3%2583%25AB%25E3%2583%25BB%25E3%2583%2592%25E3%2583%25A5%25E3%2583%25BC%25E3%2582%25A4%25E3%2583%2583%25E3%2583%2588&t=MWNlYzlkNzg1NTI3MzllOGZlZmRjMDkyZTZjYzA4NjA3Zjk1NTRjNiwzM1NyMFYwWQ%3D%3D)
- 1:40 ~ : そもそもの Promise とは?
  - [Java の Future](http://t.umblr.com/redirect?z=http%3A%2F%2Fdocs.oracle.com%2Fjavase%2F7%2Fdocs%2Fapi%2Fjava%2Futil%2Fconcurrent%2FFuture.html&t=NWIzMzk3YWU5ZGZiN2VlY2JjOGUwMGQzY2IyZjRiMjRmMzFjYTQ3NSwzM1NyMFYwWQ%3D%3D)
  - [Haskell の Thunk](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.haskell.org%2Fhaskellwiki%2FThunk&t=ZjU2NDAxYTMwYzA2ZDEyZmQwMTEzZTBlOTI5YzMwZjI1OTY0ZTk3OSwzM1NyMFYwWQ%3D%3D)
- 7:30 ~ : 本当に Promise は必要なのか?
  - [Scala の Option](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.scala-lang.org%2Fapi%2Fcurrent%2Fscala%2FOption.html&t=NTk3NmNmNTdlZDdjZTcxMzUzNjgxZjkwZDFjMzg5M2JiYWM0ZjIyZSwzM1NyMFYwWQ%3D%3D)
  - [jQuery の Deffered](http://t.umblr.com/redirect?z=http%3A%2F%2Fapi.jquery.com%2Fcategory%2Fdeferred-object%2F&t=Y2ZjMmVjMjA2NzY4NzMyMTZmODdiYmY3NzYzMTA2ZGU5ODBmOTNkYywzM1NyMFYwWQ%3D%3D)
  - [DOM の Promise](http://t.umblr.com/redirect?z=https%3A%2F%2Fdom.spec.whatwg.org%2F%23promises&t=ZTk2ZjRiNWQzYThiZmMxODNjYjQyZTgwOTRkYjBiZWI4ZTBmYWZmOCwzM1NyMFYwWQ%3D%3D)
- 15:22 ~ : JS の Promise と Haskell の I/O モナド
  - [Haskell の I/O monad](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.haskell.org%2Fhaskellwiki%2FIO_inside%23Dark_side_of_IO_monad&t=NjQ5NGNjOTY5NTI0NzI0MGI1NzM3OWU0YWMyZTAzNTIyOWE0NDAwMywzM1NyMFYwWQ%3D%3D)
  - [Haskell の do 記法](http://t.umblr.com/redirect?z=http%3A%2F%2Fen.wikibooks.org%2Fwiki%2FHaskell%2FSyntactic_sugar%23Do_and_proc_notation&t=MTIzODQwNWQ4NGZmZDg4MDJkNjFkZWE5ZWNiMGYyZmU3ZjYzY2JlMCwzM1NyMFYwWQ%3D%3D)
- 18:45 ~ : genrator ってどうなの?
  - [function*](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffunction%2A&t=NDg1YmQ1Y2U1OTAxOTdjM2NkOWVmMDkwNTEzZmE4MGU0NzAzOGQyNCwzM1NyMFYwWQ%3D%3D)
- 20:50 ~ : generator と Go の groutine/channel
  - [Go の Channel](http://t.umblr.com/redirect?z=http%3A%2F%2Fgolang.org%2Fref%2Fspec%23Channel_types&t=NGQ5NWM2ODVmMjRmYjNhNTA5MDQ2YTVlNmM3YjkxMGYzYjkwZGFhZiwzM1NyMFYwWQ%3D%3D)
  - [Generator のスクリーンキャスト](http://t.umblr.com/redirect?z=http%3A%2F%2Fjxck.hatenablog.com%2Fentry%2F2014-01-12%2Fgenerator-screencaset&t=ZWZkNGYxYTU5OTFlY2M3ZWM1Y2NkYmVlYWI5OTI4N2NhZWVhOTdiZiwzM1NyMFYwWQ%3D%3D)
  - [koa](http://t.umblr.com/redirect?z=http%3A%2F%2Fkoajs.com%2F%2522%2522&t=MDYxNzRhZmYyNDIyOTE1NDg0NzBjMjgxMDc4ZmE2ZmMzZDViNjBhMywzM1NyMFYwWQ%3D%3D)
  - [co](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Ftj%2Fco&t=NzdmZjgwMjllMjFlMzRkMGJkY2M3MTgyMThmMzgzNzJjNjY2YjRjMywzM1NyMFYwWQ%3D%3D)
- 29:45 ~ : generator と Lua の coroutine
  - [Lua の coroutine](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.lua.org%2Fmanual%2F5.2%2Fmanual.html%232.6&t=NThmOWY5OTk2NzY5YWIzYTg3NGVlNTJhNjJhODFiMDMyYzhhZTZkMywzM1NyMFYwWQ%3D%3D)
- 33:10 ~ : generator と goroutine の決定的な違い
  - [ニクラウス・ヴィルト](http://t.umblr.com/redirect?z=http%3A%2F%2Fja.wikipedia.org%2Fwiki%2F%25E3%2583%258B%25E3%2582%25AF%25E3%2583%25A9%25E3%2582%25A6%25E3%2582%25B9%25E3%2583%25BB%25E3%2583%25B4%25E3%2582%25A3%25E3%2583%25AB%25E3%2583%2588&t=MTAxOWM3ZTgzYjk1NWZjODgwMzQ0NjAxZjI4OGJiNjg5Yzg0ZTc2MCwzM1NyMFYwWQ%3D%3D)
- 40:43 ~ : Async/Await
  - [C# async/await](http://t.umblr.com/redirect?z=http%3A%2F%2Fmsdn.microsoft.com%2Fja-jp%2Flibrary%2Fhh191443.aspx&t=MTg3ZjVjOWFlNDllMjgxMTk2YjFjNjgwZTUzMmZkZTMzMGE5ZmE4NCwzM1NyMFYwWQ%3D%3D)
  - [koa への issue](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fkoajs%2Fkoa%2Fissues%2F339&t=MDk1M2U5M2Q4YjcxMjAxNWI2Njk1NzBjNjZmNWQ2YjE2OWZjMzkzNSwzM1NyMFYwWQ%3D%3D)
- 43:00 ~ : Reactive Programming と RxJS
  - [RxJS](http://t.umblr.com/redirect?z=http%3A%2F%2Freactive-extensions.github.io%2FRxJS%2F&t=ZDVlNjg4Njk1ZTc1ZWZhNWZlYzk4NWU5Yjg0Zjg3OTIyNTJiYTBiNywzM1NyMFYwWQ%3D%3D)
  - [Functional Reactive Programming](http://t.umblr.com/redirect?z=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFunctional_reactive_programming&t=ODEyMGFmNTQzMTgxMmI2Y2I2MDgwZGIzMzk2MTFiMTM0NGJlNzM4ZiwzM1NyMFYwWQ%3D%3D)
  - [meteor](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.meteor.com%2F&t=MjU5ZTQ0ZDgxZGVhZTMzMTM3NmYzOGRkZTFhNDQ5Y2Q1YzRkM2EzNywzM1NyMFYwWQ%3D%3D)
  - [cloudup](http://t.umblr.com/redirect?z=https%3A%2F%2Fcloudup.com%2F&t=Zjc2NmQyNDkxOTAzZWVmNWZiODQ5MzEyMGU3MWJmOGI0NmQ4Njk5MSwzM1NyMFYwWQ%3D%3D)
  - [node-amqp](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.npmjs.org%2Fpackage%2Famqp&t=Y2MwZmU2OThkMTMyNzZiY2Q5ODZjOWUyYTZkMWNkMTM3YWRkNzU0YywzM1NyMFYwWQ%3D%3D)
