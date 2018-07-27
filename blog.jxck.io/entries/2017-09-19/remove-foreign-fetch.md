# [foreign fetch][service worker][cookie] Foreign Fetch が削除されそうな理由と Cookie の double keying


## Intro

以前、本ブログでも紹介した Foreign Fetch が、仕様から削除される方向で進んでいる。

[Foreign Fetch による Micro Service Workers \| blog.jxck.io](https://blog.jxck.io/entries/2016-12-12/foreign-fetch.html)

これは、 Safari などが進めている Cookie の double keying が影響しているらしいので、現状についてまとめる。


## Foreign Fetch

Foreign Fetch は、簡単に言えば 3rd Party Origin の Service Worker が、その Origin に向けた Fetch をハンドルできるようにするという仕様である。

これによって、 Origin 単位での Service Worker の責務が分離できるため、以下のような設計が期待できた。

- サブドメインごとに SW の責務を分離でき、更新などのライフライクルを変えられる
- 3rd Party が、自サービスのための Offline 対応などを提供できる

しかし、この機能が仕様から削除されようとしている。

[Remove foreign fetch #1188](https://github.com/w3c/ServiceWorker/issues/1188)


## Foreign Fetch Origin Trial results

そもそも Origin Trials が終わった時点で、結果があまり芳しくなかったようだ。

(筆者が書いた短いフィードバックまで結果に載っていることから、そもそも Trial Token を取得したユーザも少なかったのではないかと推測する)

- [Foreign Fetch Origin Trial Results 2017-03-07](https://docs.google.com/document/d/1G3XkRy972OkYEPNmBRvdWRWPNaiSPvnnnWyYNXnkWwU/edit)
- [Foreign Fetch Origin Trial Results](https://groups.google.com/a/chromium.org/forum/?pli=1#!topic/blink-dev/pJ4PwgVcKjY)
- [True Sadness - End of Experiment: Foreign Fetch](https://groups.google.com/a/chromium.org/d/msg/blink-dev/sIzHpZVhmBE/hHXlHP7wAAAJ)

しかし、実装のみではなく仕様からも消える大きなモチベーションとしてセキュリティがあるようだ。

ここには 3rd party cookie で行われる行動追跡に対応するための、 double keying という仕組みが関わっているらしい。


## double keying cookie


### 3rd party cookie tracking

まず、 3rd Party Cookie による行動追跡について簡単に解説する。

例えば、本サイト (jxck.io) が EC サイト(ec.example.com) の Ad などを埋め込んでいたとする。

すると、 jxck.io の閲覧者には ec.example.com からの `Set-Cookie` が送られ、保存される。


```
// response-from: ec.example.com
Set-Cookie: history=jxck.io
```

同じく、筆者が保有する別のサイト (mozaic.fm) にも同じ Ad が含まれていたとした場合。

ユーザが mozaic.fm を閲覧すると、 Ad を取得する時に以下のように Cookie が送られる。


```
// request-for: ec.example.com
Cookie: history=jxck.io
```

すると Ad プロバイダは、このユーザが過去に jxck.io を閲覧したということがわかる。

おおよそこのように行われるのが、 3rd Party Cookie によるユーザの行動追跡となる。


## double keying

Cookie は、ブラウザ内で「*どこから付与されたか*」をキーとして保存されている。

したがって、閲覧しているサイトが jxck.io であれ mozaic.fm であれ、同じ ec.example.com にアクセスする際は、そこから取得した Cookie をつける。

このブラウザの挙動が、こうしたトラッキングを可能にしていた。

そこで、この Cookie のキーを 2 つに変更する。

- どのページを見ている時に
- どこから付与されたのか

こうすれば、 jxck.io を見ているときに付与された Cookie は、同じサブリソースを取得するとしても mozaic.fm では送信されない。

よって、ユーザが 3rd Party Cookie で追跡されることが無くなる。

このように、 2 つの情報をキーとして保存するのを double keying と言うらしい。


## ITP (Intelligent Tracking Prevention)

Mac OS は HiSierra から ITP というトラッキング防止の機能を追加する。

https://webkit.org/blog/7675/intelligent-tracking-prevention/

これにより、 Safari が保存する Cookie の保存に関するポリシーが変更される。

簡単に言えば 3rd Party Cookie の保存が厳しめに制限されるわけだが、こうした変更が Double Keying によって実現されているということらしい。

この発表は 3rd Party Cookie を使っているアドや Analytics など、多くの実装に影響を与えサービスによっては株価への [影響](http://adworld.hatenablog.com/entry/2017/06/13/004208) もある。


## double keying と foreign fetch

同じことを、 SW で考えてみる。

先の例で ec.example.com から付与される 3rd Party SW は、 jxck.io / mozaic.fm 両方からの ec.example.com への fetch をハンドルできる。

これは、 3rd Party Cookie と、本質的には同じ、もしくはそれ以上に柔軟な追跡ができる可能性がある。

したがって、 foreign fetch についても double keying を考慮する必要が出てくるのだ。

すると、例えば font.example.com というサービスから WebFont を埋め込んでおり、これを SW でキャッシュしたいと考える。

そのための SW は font.example.com が実装して配布すれば、 jxck.io も mozaic.fm もその SW が勝手に登録され、勝手にキャッシュを処理してくれるため、 1st Party SW で実装する手間が省ける。

ところが、 SW も double keying されていると、 jxck.io が font.example.com から取得した WebFont と mozaic.fm が font.example.com から取得した WebFont は、例え同じファイルだったとしても別の領域に保存されてしまう。


## 3rd Party SW のユースケース

3rd Party SW は、 SW で規模の大きいアプリを開発する際、必須になるだろうと筆者は考えていた。

- SW の責務を分離した設計を行う
- SW のライフサイクルを分け、更新による影響を局所化する
- 1st Party による 3rd Party コンテンツへの重複実装を防ぐ

しかし、 Cookie 以上に柔軟な追跡などの可能性を考えると、 double keying の適用は妥当とも言える。

SW も分離して別プロセス、別保存領域で動くようでは、 Foreign Fetch のメリットも減る。

すると仕様から削除されるのも妥当と言わざるをえないのかもしれない。


## 代替手段

3rd Party コンテンツの処理(offline, background sync etc) は、ライブラリベースで提供して import script で組み込む以外ないだろう。

Fetch で言えば URL ベースでの分岐が必要となるため、 Express の MiddleWare 的な構成を取ることになる。

個人的には micro service worker 的な実装が可能となる Foreign Fetch の代替案が出てくれると嬉しいが、現時点でそのような話はない。

3rd Party での Tracking を考えると、根本的に同等の仕組みを提案するのも難しそうに思う。

SW のデプロイが進み、実装が複雑になっていった場合、どう設計をしていくか、再考する必要が出てきた。
