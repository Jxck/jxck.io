# [security][hasegawayosuke][mozaic.fm] ep16 Security (application)

<audio preload="none" src="https://files.mozaic.fm/mozaic-ep16.mp3" controls></audio>

<ul class=info>
  <li>published_at: <time datetime=2015-03-27>2015-03-27</time>
  <li>guest: <a href=https://twitter.com/hasegawayosuke>@hasegawayosuke</a>
</ul>


## Theme

第 16 回目のテーマは Security (application) です。

今回は [@hasegawayosuke](https://twitter.com/hasegawayosuke) さんをお迎えして、 Web アプリケーションの開発技術が進化することによって、同じように変わっている筈のセキュリティに関して、その変化をどう考えればいいのか?

開発者とセキュリティ関係者のあいだで、足りてないと認識されているものは何か?

それらをふまえてセキュリティをとりまく環境で「今何が起こっているのか」、そして「これからどうなっていくのか」について議論しました。

hasegawa さんが本を書いてる件は、許可を取っておりカットしてません。公表して自分を追い込むメソッドだそうです w

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。


## Show Note

- [iframe で 2sh を表示す](http://t.umblr.com/redirect?z=http%3A%2F%2Fd.hatena.ne.jp%2Fhasegawayosuke%2F20141212%2Fp1&t=YTllMDNlMTRjMzUwOWM1OTVmNGMwNTJjZDI2OGU5NDVjZTNiZGQ3YSxNOEk2bE9USw%3D%3D)
- [XSS](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FGlossary%2FCross-site_scripting&t=MGRhMDQyNGI0ZGM4YzlmY2UyZjZmYzlmOTBiZmYwY2ZiMzVhOTg1MixNOEk2bE9USw%3D%3D)
- [CSRF](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2FPersona%2FThe_implementor_s_guide%2FProblems_integrating_with_CRSF_protection&t=NzFiMGRlYjY5NGVkMmFkZjNkODlkYjhlNDdkYTFmYmE1NTZiODEyNCxNOEk2bE9USw%3D%3D)
- [SQL Injection](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FGlossary%2FSQL_Injection&t=YWJmNGVkNTFhOTU0MmJhOGQ1MjcyNTIxNWZkNjU5MzZjMjg3MzUxOSxNOEk2bE9USw%3D%3D)
- [E4X](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fja%2Fdocs%2FE4X&t=NzNiNzE5N2UyMDliN2JlNDlhODcyNTc5Y2EwMTkzMDU4NGEzZTA5MyxNOEk2bE9USw%3D%3D)
- [ES6 時代における Web 開発者とセキュリティ業界の乖離](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fhasegawayosuke%2Fkobe-45571422&t=ZTViMmUyOTI1OWIxNzcyYjJiODFhNjg3ZWYwMDQzZWY4YzY2ODI1MixNOEk2bE9USw%3D%3D)
- [CSP](http://t.umblr.com/redirect?z=https%3A%2F%2Fdeveloper.mozilla.org%2Fja%2Fdocs%2FSecurity%2FCSP&t=ZTQ5ZjQ0ZjBlN2Y4YTQzYjViODE1Yjc4ZTIwODRjZDY0MTlhZDgyNixNOEk2bE9USw%3D%3D)
- [XSS Filter(IE 独自)](http://t.umblr.com/redirect?z=http%3A%2F%2Fwindows.microsoft.com%2Fja-jp%2Finternet-explorer%2Fproducts%2Fie-9%2Ffeatures%2Fcross-site-scripting-filter&t=YWNjNmUxOTk4OGVjNmY1MGY3NTYyM2M1NjYzMTMwNDU3NTM0MzhhMixNOEk2bE9USw%3D%3D)
- [Extensible Web](http://t.umblr.com/redirect?z=http%3A%2F%2Fextensiblewebmanifesto.org%2Fja&t=YmI2YzdkOWMzMGRjYmQwMzM0ZmQxYTA0NmNjNDBjZmRjNjc3OTNhNCxNOEk2bE9USw%3D%3D)
- [TCP and UDP Socket API](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.w3.org%2F2012%2Fsysapps%2Ftcp-udp-sockets%2F&t=MGUxMjMxN2FjM2MwNTliY2EzZTVlZWM5MzA2YjdmOTA0ZmFlN2JiZSxNOEk2bE9USw%3D%3D)
- [「安全なウェブサイトの作り方」改訂第 7 版(3/12 改訂)](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.ipa.go.jp%2Fsecurity%2Fvuln%2Fwebsecurity.html&t=Yjk2M2Q3ODgxOGY0NWYxN2FkZGExYWRhMDY2Y2U5YzUyYmJjYjA5ZSxNOEk2bE9USw%3D%3D)
- [Mozilla セキュリティバグ報奨金制度](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.mozilla-japan.org%2Fsecurity%2Fbug-bounty.html&t=ODgxMDUzNzY5ZjMwM2QwMjhmNzk2Yjc4N2JlYjcwMzc2MmE5MjJjNyxNOEk2bE9USw%3D%3D)
- [Mozilla の報奨金制度で 200 万円ほど稼いだ話](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fmuneakinishimura%2Fmozilla200&t=N2FlYzZhZmY2MTBhOGZmZGVmZTU1NWNkZTdmNDc3YmIzNTNiYWRlZixNOEk2bE9USw%3D%3D)
- [XSS 対策としての ES6 テンプレートリテラル](http://t.umblr.com/redirect?z=http%3A%2F%2Futf-8.jp%2Fpublic%2F20150214%2Fes6-literals-xss.pdf&t=NmM5MWExOTBkYjYwZDM3YmY3NTBhZmQ3ZjA2NzMwNjQyZWY5YzUxMyxNOEk2bE9USw%3D%3D)
- [iframe sandbox のブログ](http://t.umblr.com/redirect?z=http%3A%2F%2Fd.hatena.ne.jp%2Fhasegawayosuke%2F20150130&t=NDdmMTdjN2VlNGY0ODVlYWY5Y2JjMmU3YzMyZDc2ZDAxMDY2M2Q3OCxNOEk2bE9USw%3D%3D)
- [toStaticHTML](http://t.umblr.com/redirect?z=https%3A%2F%2Fmsdn.microsoft.com%2Fja-jp%2Flibrary%2Fie%2Fcc848922%28v%3Dvs.85%29.aspx&t=YzRlOTk2ZGZkOGVkMGNhNjNhODZmZDFjZDQzM2I3NThlMTJkZjIzYixNOEk2bE9USw%3D%3D)
- [ECMAScript 6 from an Attacker's Perspective - Breaking Frameworks, Sandboxes, and everything else](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.slideshare.net%2Fx00mario%2Fes6-en&t=ODI5ZTk4Y2E3MjEzOTY4ODQ2MTRjNTcxMTg5YWZkNDRjMTlmYjNiZixNOEk2bE9USw%3D%3D)
- [体系的に学ぶ 安全な Web アプリケーションの作り方(通称:徳丸本)](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.sbcr.jp%2Fproducts%2F4797361193.html&t=ZGQ0NTdjZmRhMDA2ZTMyOWUxOGRhM2ZkODQyZGI4NzEwZGYzMWY3YixNOEk2bE9USw%3D%3D)
- [めんどうくさい Web セキュリティ](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.shoeisha.co.jp%2Fbook%2Fdetail%2F9784798128092&t=OWU4MzA0YTE5YWRmMjU1YWM5MDVjNGJiY2QyOTZhYTgzMGEzYTFlZixNOEk2bE9USw%3D%3D)
- [HTML5 を利用した Web アプリケーションのセキュリティ問題に関する調査報告書(JPCERT CC)](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.jpcert.or.jp%2Fresearch%2Fhtml5.html&t=MGQ2MGYyNTZjYzM1MmZhZGUxZDI2YjM1NjYzZGU1OTMyYzc5NmIwMSxNOEk2bE9USw%3D%3D)
- [OWASP Japan](http://t.umblr.com/redirect?z=https%3A%2F%2Fwww.owasp.org%2Findex.php%2FJapan&t=MzViNjg2MTI5OWZlMDAyMDk3ZGI5MzJhMDUzYjQwYjE4OGY2YjZiOSxNOEk2bE9USw%3D%3D)(ずっと owaps だと思ってました。。)
- [100 種類の言語で Quine](http://t.umblr.com/redirect?z=http%3A%2F%2Fd.hatena.ne.jp%2Fku-ma-me%2F20141225%2Fp1&t=YTdjZjU1NmJiYzhjNWUyYmVmOTNmYjg4N2E1MDE3NWUwYzA4ZDdjMSxNOEk2bE9USw%3D%3D)

BGM: [public domain jazz](http://t.umblr.com/redirect?z=http%3A%2F%2Fwww.jazz-on-line.com%2F&t=NDYyNzVhOGIwN2I3NmNjMWFhMjE4MDk4NjZmNzgxOTNlMjMyMTMxOCxNOEk2bE9USw%3D%3D)
