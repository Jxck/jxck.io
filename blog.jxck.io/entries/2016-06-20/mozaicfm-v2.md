# [mozaic.fm][rss][podcast] mozaic.fm の v2 のリリースと Podcast の実装と移行

## Intro

[mozaic.fm](https://mozaic.fm) をリニューアルし、 v2 としてリリースした。

今回の更新のモチベーションは大きく分けて 2 つある。

- tumblr を捨てたかった
- feedburner を捨てたかった

これによる breaking change 含む変更の内容と、実装のメモを記す。


## Podcast の仕組み

そもそも Podcast の実体は、単なる RSS である。

音声やアイコンなどのリソース URL が適切にマークアップされた RSS 形式の XML を配布するだけで実装できる。
Podcast アプリは、このフィードを購読し、音声などを取得し、再生する feed reader の一種といえる。

旧 mozaic.fm は、 tumblr 上に作ったサイトに、音声をリンクしたエントリを上げることで更新していた。
feed は tumblr に feedburner というサービスを連携して提供していた。

サイト上でも音声は再生できるが、 Podcast 自体はアプリで聴くことが多いため、 RSS さえ生成すればサイト自体は必須では無い。


## 旧 mozaic.fm の問題点

mozaic.fm は、  Web の技術について「**今何がおこっているか**」と「**これからどうなっていくか**」を議論する Podcast である。

必然的に、最新の Web の技術や、セキュリティ/パフォーマンスなどの周辺技術についても触れることが多い。

最近では特に HTTPS 化についての議論も多くあるが、 Tumblr はダッシュボード(編集画面)以外を暗号化することができない。

HTTPS 化をしていないために、使うことができない API も最近は多い。

そもそも Tumblr であるため、最新の技術の適用も難しい。

Feed さえ適切に配布できていれば、基本的にバグがあっても大した問題にならないという利点があり、

アクセスする人も、ほとんどが Web の技術に多少なりとも興味があるリスナーに限定されているという特殊性があるにも関わらず、

エピソード内で言及している技術を一切使ってないというのもどうかと思い、脱 Tumblr を決定した。

また feedburner は、ずっと「もうすぐサービスが終了しそう」といったうわさも絶えず、それ以前に使いにくいので嫌いだった。

ついでに脱 feedburner も決定した。


## ブログ実装

いきなりサイトを更新するのも難しいため、まず基礎となるブログを作ることにした。

それが、本サイト [https://blog.jxck.io](https://blog.jxck.io) である。

基本的には http2 ベースで設計しており、その他多くの技術を試しているが、その記録は全てこのサイト自体のエントリとして書き、ドックフーディングしてきたので、そちらをご覧いただきたい。

新しい [https://mozaic.fm](https://mozaic.fm) は、本サイトのコピペをベースとしている。


## RSS 実装

RSS の仕様には、主に RSS1.0, RSS2.0, Atom の三つがある。

本サイト blog.jxck.io では最新である Atom を採用したが、 Podcast の RSS は **RSS2.0** を用いる必要があった。

RSS2.0 の仕様は以下にある。

[http://cyber.law.harvard.edu/rss/rss.html](http://cyber.law.harvard.edu/rss/rss.html)


また、 Apple は Podcast 向けの拡張ボキャブラリを追加しているため、それらも対応している。

- [https://help.apple.com/itc/podcasts_connect/#/itc1723472cb](https://help.apple.com/itc/podcasts_connect/#/itc1723472cb)
- [https://help.apple.com/itc/podcasts_connect/#/itca5b22233a](https://help.apple.com/itc/podcasts_connect/#/itca5b22233a)
- [https://help.apple.com/itc/podcasts_connect/#/itc2b3780e76](https://help.apple.com/itc/podcasts_connect/#/itc2b3780e76)


基本的には RSS2.0 に加え `<itunes:xxx>` な名前空間のタグが拡張されている。


- アートワークは 1400x1400 ~ 3000x3000 の間で 72dpi, JPEG/PNG (gzip 可)
- 音声形式は M4A, MP3, MOV, MP4, M4V, PDF, EPUB
- `<enclosure>` でエピソードを囲む
- `<channel>` `<item>` レベルの title, author, description が itunes search で使われる
- `<itunes:summary>` 無ければ `<description>` に詳細、メディアフォーマット、スケジュールなど詳細を記す
- `<itunes:category>` にサブカテゴリーを定義できる
- `<itunes:summary><![CDATA[<a href="http://www.apple.com">Apple</a>]]></itunes:summary>` とコメント化し display issue を防ぐ
- `<item>` を追加して行く、順番は `<pubDate>` で判断される。 24h 以内なら `<itunes:order>` で上書きもできる


音声の配信は、通常の HTTP サーバから行うことができる。
ただし、 Podcast は長い音声を再生するため、途中からの再生が可能なように HTTP の byte-range ヘッダをサポートする必要がある。

音声ファイルは HTTPS で配信することが可能だ。
しかし、 RSS 自体は HTTPS で配信すると iPhone の Podcast アプリでは読めないようであったため、 HTTP での提供も行っている。

また RSS2.0 的には `<enclosure>` の url は http じゃないとだめらしい。

## podcast connect

itunes は podcast connect という場所がわかりにくい画面から、 feed url を変えられる。

[https://podcastconnect.apple.com](https://podcastconnect.apple.com)


## 移行作業

tumblr に mozaic.fm ドメインを貼り、 feedburner と連携してフィードを配信しているため、移行には以下の作業を行った。


1. 先に新しいサイトと feed を作る
1. feed をサブドメインとして先に運用する
1. tumblr 上で最後のエピソードを更新し、 feedburner のフィードに反映させる
1. DNS を変更し、 mozaic.fm を tumblr から新サイトへ向ける
1. feedburner が新サイトを見ないように、独自ドメインを剥がした tumblr に向ける
1. mozaic.fm が自サーバを向いたので、 let's encrypt の certbot を走らせ [https://mozaic.fm](https://mozaic.fm) を有効にする
1. [http://mozaic.fm](http://mozaic.fm) を全て [https://mozaic.fm](https://mozaic.fm) にリダイレクト
1. 旧エピソードの tumblr 自体の URL を、新 URL にリダイレクトする
1. itunes の podcast connect から itunes に登録された mozaic.fm の feed を新しいものにする


feedburner の URL を直接 Podcast アプリに登録している場合は、どうしても新しい feed の URL に変更する必要がある。

このため、移行後の最初のエピソードは、その旨の説明回とし、新旧両方のフィードに載せた。


## v3 への展望

今回の更新で **脱 Tumblr** と **脱 feedburner** という目標は達成した。

今後は、このサイト上だけで以下を完結可能な PWA なサイトにしていきたいと考えている。

- mozaic.fm 自体のインストール
- エピソードの自動ダウンロード
- Push 通知
- オフライン再生
- 再生中の他エピソード閲覧 (SPA)


blog.jxck.io は静的なコンテンツサイトであり、現状はそのコピーであるが、今後はこれをベースに、この土台を維持することでサーバサイドレンダリングが不要な状態で、 SPA な実装へシフトしていく。

少しずつ機能を追加し、どこかのタイミングで v3 をアナウンスするかもしれない。
