# #19 ES7

<audio preload=none controls src=http://files.mozaic.fm/mozaic-ep19.mp3"></audio>


## Theme

第 19 回のテーマは ES7 です。

今回は [@Constellation](https://twitter.com/Constellation) さんをお迎えして、先日公開された ES6 をふまえ、次の仕様として議論が始まった ES7 について、 ブラウザのエンジンを実装する立場から見た、現状や懸念点などについて話を聞きながら、これから ECMAScript はどうなっていくのか、どうなっていくべきなのかについて議論しました。


## Guest

- [@Constellation](https://twitter.com/Constellation)


## Show Note

- [Lv.5](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2FConstellation%2Fiv%2Ftree%2Fmaster%2Fiv%2Flv5%23iv--lv5&t=NGM5YmQ4NDA4OWQ1MDkwNjc1NDYwNWE2ZDg2ODgxMmU0OTlhNzFiZix3ak5CTUpqYw%3D%3D)
- [exprima](http://t.umblr.com/redirect?z=http%3A%2F%2Fesprima.org%2F&t=MjVjYzAwMjljMDFiMTg2ZjAzMzg4Y2M2MjI0YmM2MmQ0ODY5OWY0ZCx3ak5CTUpqYw%3D%3D)
- [estraverse](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Festools%2Festraverse&t=ZTI4MmFlMGI1YzM0NzAyNmZjZWI0YzZkZDMwMDVmOTQ4OTdhNTM3Mix3ak5CTUpqYw%3D%3D)
- [escodegen](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Festools%2Fescodegen&t=MGEwMTNmMWJmMDA3YmM5MGJmNTgxZTI0NzBlMDViNjY3NDBhMTNhNix3ak5CTUpqYw%3D%3D)
- [ES6 symbol](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FSymbol&t=ZDE2YTgxMTVlZWM2YjY5ZWQ3ZjhjY2ZmMjBiZGI1NmMwOTIxMmZmNSx3ak5CTUpqYw%3D%3D)
- [TDZ](http://t.umblr.com/redirect?z=http%3A%2F%2Fjsrocks.org%2F2015%2F01%2Ftemporal-dead-zone-tdz-demystified%2F&t=ZTQ5NzBmMTViMjU2ZDdjNjI4M2Y3ZDFkNWUyOTEzN2FiZWI0MjA1Yyx3ak5CTUpqYw%3D%3D)
- [TDZ のパフォーマンス](http://t.umblr.com/redirect?z=https%3A%2F%2Fesdiscuss.org%2Ftopic%2Fperformance-concern-with-let-const&t=NWEwMjljNWMwNzA1ZjY2YjJiMGRhMjk0OWIxZGY3MmU0ODhjYjBkNyx3ak5CTUpqYw%3D%3D)
- [ES6 generator](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FGenerator&t=OWQ0ZjIxNWYyMjg3NTJmYzkwZGQ2YTY1YjdiYTc2NzJkOTRiNDk2Nix3ak5CTUpqYw%3D%3D)
- [eslint no-var](http://t.umblr.com/redirect?z=http%3A%2F%2Feslint.org%2Fdocs%2Frules%2Fno-var&t=OTViMzkwYThmMzBlNTkzYzEyMzgxMzliMWMyNzQ1YzhkYWFkYmRhNix3ak5CTUpqYw%3D%3D)
- [ES7 の提案一覧](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Ftc39%2Fecma262&t=MWM5OTJmYTlkYzA5N2I1MGQ4OGY0ZWZhODEzZTY3ZDI5ZDUxYzFmZix3ak5CTUpqYw%3D%3D)
- [Array.prototype.includes](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2Fincludes&t=YmZhZTU0NWIxODYyZTc3ZTdhZWIwOTY5MDM3MTNiYTZmYTI2NzZhYyx3ak5CTUpqYw%3D%3D)
- [Object.observe](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fobserve&t=YzA2ZWQzZjBjMGE5ZDRjNGJiN2Y3NDY4ZDc3YTc4NDNjZjFjOTkxMyx3ak5CTUpqYw%3D%3D)
- [async-await](http://t.umblr.com/redirect?z=https%3A%2F%2Ftc39.github.io%2Fecmascript-asyncawait%2F&t=ZjVmMDg0YTFjNGYyZThjMjJkMjQwNGIxMDczYjBjZGQ1ZmFiYzc2Zix3ak5CTUpqYw%3D%3D)
- [Promise](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise&t=NWQ2ZTA4MDYwYmMzOWFkYmE2ZjFlMWU4ZTYzNmQ3YWJhZDcwN2UyNSx3ak5CTUpqYw%3D%3D)
- [Generator](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FGenerator&t=OWQ0ZjIxNWYyMjg3NTJmYzkwZGQ2YTY1YjdiYTc2NzJkOTRiNDk2Nix3ak5CTUpqYw%3D%3D)
- [cancelable promise](http://t.umblr.com/redirect?z=https%3A%2F%2Fesdiscuss.org%2Ftopic%2Fcancelable-promises&t=ZjdiMWQzNmNkZGJiOWZhYTk1MjZjYzAyMzdiOWQ0NTNjZDU4NmFhNyx3ak5CTUpqYw%3D%3D)
- [monadic-promise](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fpromises-aplus%2Fpromises-spec%2Fissues%2F94&t=OTMxOGVhYjM5OGI0ZWQxZjU0YWNmZTkzYjEzZGZlYTllOWU5YWMwZCx3ak5CTUpqYw%3D%3D)
- [promise-flatmap](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fpetkaantonov%2Fbluebird%2Fissues%2F50&t=NjgxNTM3YzE4ZGU1MTVkNTM4OGI2OTdkM2I0YjNiYjc3MDM1MWNmNix3ak5CTUpqYw%3D%3D)
- [promise.chain](http://t.umblr.com/redirect?z=https%3A%2F%2Fgist.github.com%2FJxck%2F129ed81ad6bce4710758&t=ODAxMDQ2ZTgwOTk1YzE2OGJjYzdiYWNiZTdiZDI3OTBlZjUzNDYzNyx3ak5CTUpqYw%3D%3D)
- [es-observable](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2Fzenparsing%2Fes-observable&t=OTM3MzUyY2IyNmQ0YWM5NWUzZjMzNTY2MjA1ZDFiMTIxOTQyMWI2Zix3ak5CTUpqYw%3D%3D)
- [RxJS](http://t.umblr.com/redirect?z=https%3A%2F%2Fgithub.com%2FReactive-Extensions%2FRxJS&t=MzY1ZWI1YTExMTI4NzRlOTVmYmQyY2UxNTg0MDk0ZjllMjZhYmYyMix3ak5CTUpqYw%3D%3D)
- [Array comprehensions](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FArray_comprehensions&t=MTBkYWRkZWYxMzZkYWRiNGUzNjhhOTE3MzgyOGZhM2NlZDc5YTc2Nyx3ak5CTUpqYw%3D%3D)
- [let](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Flet&t=MTVmMTU2OTg2MWE4YjMzN2I5YWQ1ZmE3YWJhNGFhMTc4ODA1NmY2NCx3ak5CTUpqYw%3D%3D)
- [class](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FClasses&t=MTYxMjkwMjc5NTA2NWYxNjA1MDk5YmE1NDFkMmIxNDRkZmY5OWI4MCx3ak5CTUpqYw%3D%3D)
- [tail call optimization](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.2ality.com%2F2015%2F06%2Ftail-call-optimization.html&t=NzIyMTI3YzQ0YzlhZDA5NWY1M2IyOTgzMzhmZTZkNzY4MGM5ODUzZix3ak5CTUpqYw%3D%3D)
- [template literal](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2Ftemplate_strings&t=MThmYmM5OGQzODRhNjJmOWU3ZGRjNGMwYzkyYTk1Y2FkMjI0MDk1NSx3ak5CTUpqYw%3D%3D)
- [iterator](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols&t=YTY1MzhiMDdiNGE5MDU1Y2E0NzVkNTYxMmYwOGExOWUxZTM1MDQ0Nix3ak5CTUpqYw%3D%3D)
- [Proxy](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy&t=ZjRhYjU3ZDlhMzVkZWYyYjU1YTI3YmIwNjI4NzkwYTQyYjhkMDJmMyx3ak5CTUpqYw%3D%3D)
