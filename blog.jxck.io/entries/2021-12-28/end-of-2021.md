# [blog] 2021 年をふりかえる

## Intro

例年通り 2021 年を振り返る。

## blog

13 本書いた。

- [Web のセマンティクスにおける Push と Pull](/entries/2021-12-08/web-semantics-push-and-pull.html)
- [自作 Markdown プロセッサベースの blog.jxck.io v2 リリース](/entries/2021-11-30/blog-v2-release.html)
- [ABNF Parser の実装](/entries/2021-10-21/abnf-parser.html)
- [Private Relay と IP Blindness による Fingerprint 対策](/entries/2021-09-22/private-relay-for-ip-blindness.html)
- [mouseover 中に表示される DOM のデバッグ](/entries/2021-08-20/how-to-debug-mouseover.html)
- [Cross Origin iframe からの alert/confirm/prompt 呼び出しの無効化](/entries/2021-08-02/3rd-party-iframe-dialog.html)
- [本サイトの AMP 提供の停止とここまでの振り返り](/entries/2021-06-26/amp-tone-down.html)
- [Non AMP SXG による Prefetch 対応と AMP 提供の停止](/entries/2021-05-28/blog-over-sxg.html)
- [IE11 サポート終了の歴史](/entries/2021-05-11/end-of-ie.html)
- [Public Suffix List の用途と今起こっている問題について](/entries/2021-04-21/public-suffix-list.html)
- [Web Font のメトリクス上書きによる CLS の改善](/entries/2021-02-25/font-metrics-override.html)
- [Cache-Control: must-understand ディレクティブとは何か](/entries/2021-02-12/cache-control-must-understand.html)
- [Structured Field Values による Header Field の構造化](/entries/2021-01-31/structured-field-values.html)

きっちり毎月ではないが、 1 ヶ月に 1 本ペースは継続している。

また、本サイトの [Markdown パーサ](https://blog.jxck.io/entries/2021-11-30/blog-v2-release.html)を完全自作に切り替え、自分のユースケースを完全に満たせるようにカスタマイズした。ついでに色々と技術的な負債を払拭して v2 としてリリースした。

文章とコードのバランスは良かったかもしれない。

## mozaic.fm

- [ep78 TC39](/episodes/78/tc39.html)
- [ep79 Monthly Web 202101](/episodes/79/monthly-web-202101.html)
- [ep80 Monthly Web 202102](/episodes/80/monthly-web-202002.html)
- [ep81 Monthly Web 202103](/episodes/81/monthly-web-202103.html)
- [ep82 Monthly Web 202104](/episodes/82/monthly-web-202104.html)
- [ep83 IE](/episodes/83/ie.html)
- [ep84 Monthly Web 202105](/episodes/84/monthly-web-202105.html)
- [ep85 Monthly Web 202106](/episodes/85/monthly-web-202106.html)
- [ep86 Monthly Web 202107](/episodes/86/monthly-web-202107.html)
- [ep87 Monthly Web 202108](/episodes/87/monthly-web-202108.html)
- [ep88 Monthly Web 202109](/episodes/88/monthly-web-202109.html)
- [ep89 Monthly Web 202110](/episodes/89/monthly-web-202110.html)
- [ep90 Monthly Web 202111](/episodes/90/monthly-web-202111.html)
- [ep91 Yearly Web 2021](/episodes/91/yearly-web-2021.html)

blog の方で Markdown パーサを改善できたので、 mozaic.fm の方も改善し、できれば PWA 周りもアップデートして来年には v3 を出したい。

あと、このままいくと来年には ep100 を迎えそうだ。

何をするとか考えてないが、今まで何もしてないので、なんかしてもいいかなぁ。

## オンラインイベント

オンラインイベントはあまり楽しいと感じられなかったので、開催するモチベーションが全く無かった。

ただ、思った以上に長引いたので、「どうせオンラインでしかできないなら、オンラインでしか出来ないことをやろう」と思って 2 つだけ実施した。

### Web24

トラックを分けるのではなく縦にくっつけてしまおう、という発想で始まった Web のことをただひたすら 24 時間議論するイベント。

大きな配信トラブルもなくやり通せたし、内容も濃くなったのでおもしろかった。

- Web24 - connpass
  - https://connpass.com/event/211877/

自分は、主に全てのセッションが終わった深夜(早朝?)の繋ぎ枠を担当した。

初日最後のセッションを終えた 4:30 から、翌日のセッションが始まる 9:30 までを埋めるという深夜枠は、残ってた人がいたら雑談するというどう転ぶか全く読めない枠だった。

最悪全員が寝落ちしたら mozaic.fm の録音を流してごまかそうと、事前に収録しておいたが、結局流す必要はなく誰かしらがいて議論できた。

寝落ちて減っていくことばかり危惧していたが、朝になれば人は起きてくるということを忘れており、参加者も視聴者も 7:00 くらいから増え始めたのが発見だった。

### TC39 Study

TC39 の Stage にある Proposal を 1 つ 30~90s で LT するのを 40 人くらいで 57 個やるというイベント。

- tc39_study - connpass
  - https://web-study.connpass.com/event/213676/

過去にもリアルでやったことはあり、それもスピード感とワイワイ感があって楽しかった。

ただ、その時はスライド持ち込みで PC 切り替えがあったため、今回スライドを 1 個にまとめ Zoom 上で話者だけ切り替える構成にしたところ、よりスピード感が出た。

学生などもたくさん参加してくれたので、懇親会もそれなりに楽しかった。

今思うと、この LT/h (単位時間あたりの LT 数)を超えるイベントはなかなか無いかもしれない。

## 執筆

年始にやりきってしまいたいと思っていた解体新書の執筆は、まだ継続中だ。

一年経って一章書ききってないのかと思うと、、ただまあ、サボっていたわけではなく時間を見つけてやってはいたし、副作用として得たものもある。

いつか出せるように、自分のペースを崩さないように、来年も続けていく。

## Outro

徐々に社会がもとの姿に戻りつつあり、出社なども再開し始めている。

すっかり、新しい人との出会いが無くなったため、また勉強会などで今までできなかった物理コミュニケーションが、そろそろ戻ることを期待したい。

2022 年も引き続き、よろしくお願いいたします。


Jxck
