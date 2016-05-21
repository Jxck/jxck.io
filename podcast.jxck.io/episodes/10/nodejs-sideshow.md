# [node.js][koichik][yosuke_furukawa][mozaic.fm] ep10 Node.js sideshow

## Info

audio: https://files.mozaic.fm/mozaic-ep10.sideshow.mp3

- published_at: 2014-10-23
- guest: [@koichik](https://twitter.com/koichik)
- guest: [@yosuke_furukawa](https://twitter.com/yosuke_furukawa)


## Theme

第 10 回 Node.js の SideShow です。

[@koichik](https://twitter.com/koichik) さんの「ところでみんな Promise 好き?」から始まった、 Promise / Generator / Rxjs などの話題と、 Java の Future や Haskell の Monad との関係などの解説です。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

- 0:00 ~ : そもそもみんな Promise 好き?
  - [ES6 Promise](http://people.mozilla.org/%7Ejorendorff/es6-draft.html%23sec-promise-objects)
  - [WindJS](http://try.buildwinjs.com/)
  - [カール・ヒューイット](http://ja.wikipedia.org/wiki/%25E3%2582%25AB%25E3%2583%25BC%25E3%2583%25AB%25E3%2583%25BB%25E3%2583%2592%25E3%2583%25A5%25E3%2583%25BC%25E3%2582%25A4%25E3%2583%2583%25E3%2583%2588)
- 1:40 ~ : そもそもの Promise とは?
  - [Java の Future](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html)
  - [Haskell の Thunk](http://www.haskell.org/haskellwiki/Thunk)
- 7:30 ~ : 本当に Promise は必要なのか?
  - [Scala の Option](http://www.scala-lang.org/api/current/scala/Option.html)
  - [jQuery の Deffered](http://api.jquery.com/category/deferred-object/)
  - [DOM の Promise](https://dom.spec.whatwg.org/%23promises)
- 15:22 ~ : JS の Promise と Haskell の I/O モナド
  - [Haskell の I/O monad](http://www.haskell.org/haskellwiki/IO_inside%23Dark_side_of_IO_monad)
  - [Haskell の do 記法](http://en.wikibooks.org/wiki/Haskell/Syntactic_sugar%23Do_and_proc_notation)
- 18:45 ~ : genrator ってどうなの?
  - [function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A)
- 20:50 ~ : generator と Go の groutine/channel
  - [Go の Channel](http://golang.org/ref/spec%23Channel_types)
  - [Generator のスクリーンキャスト](http://jxck.hatenablog.com/entry/2014-01-12/generator-screencaset)
  - [koa](http://koajs.com/%2522%2522)
  - [co](https://github.com/tj/co)
- 29:45 ~ : generator と Lua の coroutine
  - [Lua の coroutine](http://www.lua.org/manual/5.2/manual.html%232.6)
- 33:10 ~ : generator と goroutine の決定的な違い
  - [ニクラウス・ヴィルト](http://ja.wikipedia.org/wiki/%25E3%2583%258B%25E3%2582%25AF%25E3%2583%25A9%25E3%2582%25A6%25E3%2582%25B9%25E3%2583%25BB%25E3%2583%25B4%25E3%2582%25A3%25E3%2583%25AB%25E3%2583%2588)
- 40:43 ~ : Async/Await
  - [C# async/await](http://msdn.microsoft.com/ja-jp/library/hh191443.aspx)
  - [koa への issue](https://github.com/koajs/koa/issues/339)
- 43:00 ~ : Reactive Programming と RxJS
  - [RxJS](http://reactive-extensions.github.io/RxJS/)
  - [Functional Reactive Programming](http://en.wikipedia.org/wiki/Functional_reactive_programming)
  - [meteor](https://www.meteor.com/)
  - [cloudup](https://cloudup.com/)
  - [node-amqp](https://www.npmjs.org/package/amqp)
