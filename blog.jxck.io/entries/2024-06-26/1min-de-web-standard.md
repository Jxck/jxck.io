# [wdc][web]「1 分 de Web 標準」のやり方 at Web Developer Conference 2024 #wdc2024

## Update

無事開催し、想定した通りの LT を実施できました。

当日の録画などは以下に掲載しています。

- Web Developer Conference 2024 開催後記 #wdc2024 | blog.jxck.io
  - https://blog.jxck.io/entries/2024-09-09/web-developer-conference.html#lt


## Intro

9/7 開催予定の Web Developer Conference 2024 では、「1 分 de Web 標準」という LT 大会を予定しています。

CFP も募集中ですが、(筆者の周り以外では)聞き馴染みのないやり方だと思うので、この LT のやり方を解説します。

- プロポーザル | Web Developer Conference 2024 - fortee.jp
  - https://fortee.jp/web-dev-conf-2024/proposal/all


## 1 分 de Web 標準

「Web 標準」な何らかのトピックについて、1 人 1 ページ 1 分で LT するというものです。


### Slide

スライドはこちらで用意する Google Slides を共有し、そこに割り当てられた 1 ページのみを使えます。

その 1 ページは、マスターで振るページ番号以外は、どういじっても構いません。

今回は以下のスライドを使います。CFP 採用者にはあとで編集権限を配ります。

- 1 分 de Web 標準 Slide
  - https://docs.google.com/presentation/d/129kIOTlNJTta9ilhyN5W2MKPAz_0KkX3N2Rwpb6lnDo/edit?usp=sharing)

参考までに、過去に tc39_study で使ったスライドを貼っておきます。

- tc39_study slide
  - https://docs.google.com/presentation/d/17znKhpHu__5SBcT0BNIaYHegy4mMs5MWzj59r-qzmeE/edit)


### LT

事前にスライドを作っておき、当日は主催がこのスライドをプロジェクタに投影します。

つまり、LT に発表者の PC は使いません。

1 分ごとに次々にページをめくり、それに合わせて発表者もどんどん入れ替わるので、壇上には発表者がずらっと並んでいる形になります。

1 分経つとレゲエホーン([こう言う音](https://www.myinstants.com/ja/instant/mlg-air-horn/))を鳴らし、スライドを強制的に次に送ります。

つまり、話終わってなくても強制的にぶった斬られるので注意してください。終わったら次の人にマイクを渡して、列から抜けてください。

これを 50 人(予定)、ノンストップで繰り返します。

![1 分 de Web 標準の実施イメージ](1min-de-web-standard.svg#2190x4188)


### 時間管理

1 人 1 分です。10 秒前に鈴が鳴る、みたいなのはありません。

最後のホーンは 2 秒くらいあり、それが鳴り終わった瞬間に次の人が始まるので、実質 58s と考えてください。

![58秒トーク 2秒転換](timer.svg#295x246)

準備ができたらカウントを始めるのではなく、時計はずっと止まらず、人間が合わせるスタイルです。


## テーマ

「1 分 de Web 標準」というテーマなので、募集しているのは Web 標準にまつわるトークです。

以下のようなところが策定している標準仕様と考えるとわかりやすいでしょう。

- W3C/WHATWG
- IETF
- TC39
- etc

しかし、「Web 標準」といっても厳密な定義があるわけではなく、特に最近はランタイムが増えて多様性も増してきています。

そして、まだ標準になってないドラフトなども多くあるので、そうしたものも雰囲気で含みます。

例えば以下のようなものです

- WASI
- Winter TC
- Open UI
- etc


## Demo

このフォーマットは、tc39 の draft (stage0 ~ 4)を全部紹介する LT イベントをやろう、として始まったものです。

最初オフラインでやったのですが、その映像は残ってないので、オンラインでやった時の様子を貼っておきます。

- #tc39_study - YouTube
  - https://www.youtube.com/live/mcq8l3LGkcA?si=iFq9D1qcpD4bwUBI&t=2272


## CFP

というイベントの CFP を募集してます。応募は 7/12 までです。

- プロポーザル応募 | Web Developer Conference 2024 - fortee.jp
  - https://fortee.jp/web-dev-conf-2024/speaker/proposal/cfp

1 slide 1 分という制約がある時点で、内容はどうしても限定されます。

逆を言うと準備負荷は低く、技術的なレベルの敷居も低いです。

初めて LT をやる人なども、ここでデビューしてみてはいかがでしょうか?