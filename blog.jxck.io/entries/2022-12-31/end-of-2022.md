# [blog] 2022 年を振り返る

## Intro

例年通り 2022 年を振り返る。


## blog

今年は 10 本書いた。

- [CORB から ORB へ](https://blog.jxck.io/entries/2022-10-25/corb-to-orb.html)
- [XMLHttpRequest とはなんだったのか](https://blog.jxck.io/entries/2022-09-30/XMLHttpRequest.html)
- [HPKE とは何か](https://blog.jxck.io/entries/2022-08-25/hpke.html)
- [HTTP 関連 RFC が大量に出た話と 3 行まとめ](https://blog.jxck.io/entries/2022-06-16/HTTP-RFCs.html)
- [JavaScript のメディアタイプと RFC 9239](https://blog.jxck.io/entries/2022-05-31/text-javascript.html)
- [Navigation API による「JS での画面遷移」と SPA の改善](https://blog.jxck.io/entries/2022-04-22/navigation-api.html)
- [Markdown の Table 記法を CSS で実現する](https://blog.jxck.io/entries/2022-03-06/markdown-style-table-css.html)
- [サイトの HTTP3 化と DNS HTTPS RR および Alt-Svc Header によるアドバタイズ](https://blog.jxck.io/entries/2022-02-05/http3.html)
- [画像最適化戦略 AVIF 編](https://blog.jxck.io/entries/2022-01-07/avif.html)

少し Blog を書く時間を取れてなかったところがある。

今年は mozaic.fm の収録が倍に増えたこともあるので、多少はそれに甘えた気がするが、来年からは目標の月一本のペースに戻したい。

また、今年はあまりこのサイト自体をいじってなかった。最近は h2o のビルドがなんか調子悪いので、そろそろサーバの方も何か手を入れていきたいとは思う。


## mozaic.fm

今年は Podcast 的にはかなり転機だった。過去最高の 20 本の公開となった。

8 月に ep100 を迎え、そこでこれまでの活動を振り返った。

そこから、 **Monthly Web** を **Monthly Platform** と **Monthly Ecosystem** に分離し、今まで [@myakura](https://twitter.com/myakura) との Monthly では意識的に外していたエコシステム周りの動向を [@sakito](https://twitter.com/__sakito__) と [@hiroppy](https://twitter.com/about_hiroppy) と共に追っていく Monthly を別途始めた。

ものすごくコストがかかってはいるが、逆にこれだけのキャッチアップがこの負荷でできるのであれば、十分やる価値はあると思う。

収録が増えため、ゲストを読んでの通常回が目標 3 本のなか 2 本しか取れなかったので、来年は諸々軌道に乗せていきたい。

- [ep92 Monthly Web 202201](https://mozaic.fm/episodes/92/monthly-web-202201.html)
- [ep93 Web3](https://mozaic.fm/episodes/93/web3.html)
- [ep94 Monthly Web 202202](https://mozaic.fm/episodes/94/monthly-web-202202.html)
- [ep95 Monthly Web 202203](https://mozaic.fm/episodes/95/monthly-web-202203.html)
- [ep96 Monthly Web 202204](https://mozaic.fm/episodes/96/monthly-web-202204.html)
- [ep97 Monthly Web 202205](https://mozaic.fm/episodes/97/monthly-web-202205.html)
- [ep98 Monthly Web 202206](https://mozaic.fm/episodes/98/monthly-web-202206.html)
- [ep99 Monthly Web 202207](https://mozaic.fm/episodes/99/monthly-web-202207.html)
- [ep100 State of mozaic.fm](https://mozaic.fm/episodes/100/state-of-mozaic.fm.html)
- [ep101 Passwordless](https://mozaic.fm/episodes/101/passwordless.html)
- [ep102 Monthly Ecosystem 202208](https://mozaic.fm/episodes/102/monthly-ecosystem-202208.html)
- [ep103 Monthly Platform 202208](https://mozaic.fm/episodes/103/monthly-platform-202208.html)
- [ep104 Monthly Ecosystem 202209](https://mozaic.fm/episodes/104/monthly-ecosystem-202209.html)
- [ep105 Monthly Platform 202209](https://mozaic.fm/episodes/105/monthly-platform-202209.html)
- [ep106 Monthly Ecosystem 202210](https://mozaic.fm/episodes/106/monthly-ecosystem-202210.html)
- [ep107 Monthly Platform 202210](https://mozaic.fm/episodes/107/monthly-platform-202210.html)
- [ep108 Monthly Ecosystem 202211](https://mozaic.fm/episodes/108/monthly-ecosystem-202211.html)
- [ep109 Monthly Platform 202211](https://mozaic.fm/episodes/109/monthly-platform-202211.html)
- [ep110 Yearly Ecosystem 2022](https://mozaic.fm/episodes/110/yearly-ecosystem-2022.html)
- [ep111 Yearly Platform 2022](https://mozaic.fm/episodes/111/yearly-platform-2022.html)

## イベント

開催したイベントは 2 本。

- [HTTP RFC Publication Study - connpass](https://web-study.connpass.com/event/250730/)
  - 今年は HTTP 周りの RFC が大量に発行されたので、それを祝う意味でそれぞれをサマライズする
- [IE 卒業式 - connpass](https://web-study.connpass.com/event/250191/)
  - IE の卒業を祝う

年間で 2 回しか登壇しなかったのは何年ぶりだろうか。来年はもっとオフラインイベントが開催可能になると思うので、主催/登壇を少しづつ戻していきたい。


## 執筆

今年はやっと [Web 技術解体新書](https://zenn.dev/jxck/articles/web-anatomia-concepts) の第二章である [Cache 解体新書](https://zenn.dev/jxck/books/cache-anatomia) を公開した。

- Web 技術解体新書「第二章 Cache 解体新書」リリース
  - https://zenn.dev/jxck/articles/cache-anatomia-release-note

なかなか長い章になってしまったが、同時に MDN の Cache 関連ページをまるっと更新したことをきっかけに、間接的に mnot 直々にレビューしてもらえたのは良い経験だった。

おおよそ Cache に関する必要な知識は詰め込んだので、今後も標準やブラウザの更新に追従してメンテナンスしていきたい。

Zenn には非常にお世話になった。エディタ/レビュー部分は痒いところが残ってるが、公開/課金周りは出来が良いので、執筆環境は自分で作り、デプロイ先として活用させてもらってる。今後も応援したい。

来年は次の章の公開を目標にする。


## Outro

イベントも戻りつつあり、オフラインで人と物理コミュニケーションできるようになり、新しい人との出会いも増えてきた。

さまざまなコミュニティ活動が再開して、空白の期間が取り戻せるような一年になることを願いたい。

2023 年も引き続き、よろしくお願いします。

Jxck
