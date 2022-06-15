# [HTTP][IETF] HTTP 関連 RFC が大量に出た話と 3 行まとめ

## Intro

2022/06/06 ~ 9 あたりに、長きに渡って策定作業が行われていた HTTP 関連の RFC が大量に公開された。

- [RFC 9110: HTTP Semantics](https://rfc-editor.org/info/rfc9110)
- [RFC 9111: HTTP Caching](https://rfc-editor.org/info/rfc9111)
- [RFC 9112: HTTP/1.1](https://rfc-editor.org/info/rfc9112)
- [RFC 9113: HTTP/2](https://rfc-editor.org/info/rfc9113)
- [RFC 9114: HTTP/3](https://rfc-editor.org/info/rfc9114)
- [RFC 9163: Expect-CT Extension for HTTP](https://www.rfc-editor.org/rfc/rfc9163.html)
- [RFC 9204: QPACK: Field Compression for HTTP/3](https://rfc-editor.org/info/rfc9204)
- [RFC 9205: Building Protocols with HTTP](https://www.rfc-editor.org/rfc/rfc9205)
- [RFC 9209: The Proxy\-Status HTTP Response Header Field](https://www.rfc-editor.org/rfc/rfc9209)
- [RFC 9211: The Cache-Status HTTP Response Header Field](https://www.rfc-editor.org/rfc/rfc9211)
- [RFC 9213: Targeted HTTP Cache Control](https://www.rfc-editor.org/rfc/rfc9213)
- [RFC 9218: Extensible Prioritization Scheme for HTTP](https://www.rfc-editor.org/rfc/rfc9218)
- [RFC 9220: Bootstrapping WebSockets with HTTP/3](https://www.rfc-editor.org/rfc/rfc9220)
- [RFC 9230: Oblivious DNS over HTTPS](https://www.rfc-editor.org/rfc/rfc9230.html)

いったい何が起こっているのか、それぞれの経緯と開発者が知っておいた方がいいこと、そうでもないことを解説する。


## 大きな流れ

### HTTP 仕様のリファクタリング

HTTP/1.1 は、以下のような文字列を TCP で送るプロトコルであるため、「送りたい情報」と「送るフォーマット」が合わさったプロトコルになっていた。

```http
GET / HTTP/1.1
Host: example.com
Accept: */*
Accept-Language: ja-JP
Accept-Encoding: gz, br
```

これが HTTP/2 や HTTP/3 になれば、同じ情報をバイナリで送ることになる。「送りたい情報」は同じだが「送るフォーマット」が変わるのだ。

そこで、 HTT/1.1 の仕様に一緒くたになっていた「送りたい情報」を HTTP/1.1 特有の「送るフォーマット」から引き剥がし、独立させるたのが RFC 9110 HTTP Semantics だ。

HTT/1.1, HTTP/2, HTTP/3 の各仕様は、 HTTP Semantics を参照し、それぞれの「送るフォーマット」だけを定義することになった。これが RFC9112, 9113, 9114 だ。

その過程で、 1 つの大きなトピックで括れる Caching をさらに Semantics から引き剥がしたのが RFC 9111 となる。

今回新しく HTTP/3 を出すには

- トランスポートである QUIC
- 暗号化の TLS1.3
- ヘッダを圧縮する QPACK
- 「送るフォーマット」である HTTP/3
- 「送りたい情報」である HTTP Semantics
- Caching

が必要となる。 QUIC や TLS1.3 はすでに出ていたのに QPACK と HTTP/3 がなかなか出なかったのが、このリファクタリングを終わらせて、依存を整理してから出すためだった。

つまり、新しいのは HTTP/3 と QPACK くらいで、それ以外の HTTP 関連 RFC は、(Errata のマージなどはあるが)ほとんど既存のものと変わらない。

その意味では、ほとんどの開発者にとっては、あまり気にしなくても困らない話と言えそうだ。


### 新しい仕様

それ以外は、ほとんどが新しい仕様だ。特に新しく定義された Header Field だったり、プロトコルのたりてない部分を補うものだ。

ものによっては、これから使われていくものもあるだろうため、なんとなくでも知っておくと良いかもしれない。


## 概要

各 3 行で紹介していく。


### RFC 9110: HTTP Semantics

- HTTP をリファクタリングした結果の「送りたい情報」を切り出した仕様。
- HTTP Header と慣習的に読んでるアレの中には Trailer で送れるものがあるため、全ての仕様で Field (Header Field / Trailer Field)と呼ばれるようになった。
- HTTP/1.1 の時は Header-改行-Body となっていたが、他のプロトコルではそうではないので、 Body と読んでいたものが Content と呼ばれるようになった。(HTTP/1.1 は Content を Body で送る)


### RFC 9111: HTTP Caching

- いわゆるキャッシュに関する挙動と `Cache-Control` Field を切り出したもの
- ちょこちょこ改善されたり、古い記述が消えたりしてるが、おおむね今までと変わらない
- `must-understand` が追加された。詳細は [こちら](https://blog.jxck.io/entries/2021-02-12/cache-control-must-understand.html)。


### RFC 9112: HTTP/1.1

- HTTP Semantics を Text Format でエンコードして TCP で送るバージョン
- つまり多くの開発者がよく知ってるアレ


### RFC 9113: HTTP/2

- HTTP Semantics を Binary Format でエンコードして TCP で送るバージョン
- HTTP Push はなくなった(Early Hints が代替)
- もともとあった Priority も複雑すぎたので修正


### RFC 9114: HTTP/3

- HTTP Semantics を Binary Format でエンコードして QUIC で送るバージョン
- QUIC が TLS1.3 を含んでるので実質暗号が必須に
- Field は QPACK でエンコード


### RFC 9163: Expect-CT Extension for HTTP

- `Expect-CT` Field のこと
- [以前解説](https://blog.jxck.io/entries/2018-03-27/certificate-transparency.html) したあれ
- しかし、 SCT はブラウザで必須になりつつあり、その移行期間を支えてたものなので、今後使いことはなさそうと思ってよい


### RFC 9204: QPACK: Field Compression for HTTP/3

- HTTP/3 の Field を圧縮するための仕様、 HPACK の後継。
- HPACK よりも事前定義 Field のリストが増えた
- そこから選ぶと 1byte で送れるので知っておくと良さそう


### RFC 9205: Building Protocols with HTTP

- HTTP ってこうやって使うと旨味を一段と引き出せるよっていうベストプラクティス集(Best Current Practice)
- それの今回の更新対応版
- ちょっと知ってる人には当たり前のことしか書いてないけど、当たり前ができてない人は多い


### RFC 9209: The Proxy-Status HTTP Response Header Field

- `Proxy-Status` Field のこと
- Proxy って知らないうちに挟まってそこで何かが起こってるけど、何が起こってるかわからん、を知らせるための Field
- 昔は `Via` とか `Warning` とかあったけど、それの現代版ぽいイメージ


### RFC 9211: The Cache-Status HTTP Response Header Field

- `Cache-Status` Field のこと
- Shared Cache も知らないうちに挟まってそこで何かが起こってるけど、何が起こってるかわらかん、を知らせるための Field
- よく CDN が `x-cache-hit` とか送ってるあれの標準仕様


### RFC 9213: Targeted HTTP Cache Control

- `CDN-Cache-Control` Field のこと
- 特定のキャッシュ(主に CDN)に対してだけ有効にしたい `Cache-Control` の名指し版
- Fastly でいう `Surrogate-Control` の標準仕様


### RFC 9218: Extensible Prioritization Scheme for HTTP

- HTTP/2 には優先度制御が最初から含まれていた
- でも難しすぎて誰も使いこなせなかった
- そっちは deprecate してもう少しシンプルで使いやすくしよう


### RFC 9220: Bootstrapping WebSockets with HTTP/3

- WebSocket を HTTP/3 の上で流すためのバインディング的な仕様
- 開発者はあまり気にするところではない


### RFC 9230: Oblivious DNS over HTTPS

- ネットワークで Server につなぐと Client の IP が伝わってトラッキングできちゃうの良くない
- じゃあ間に Proxy を挟めば、 Server が知るのは Proxy の IP だから良さそう => Oblivious
- それを DoH に適用して、 DNS にも「誰が何を解決したのか」をわからなくする


## HTTP RFC Publication Study

「これが出たら 1 人 10 分で雑に紹介する勉強会を出てから 3 日以内にやろう」という話を 1, 2 ヶ月前に深夜テンションで言い出し、先日それが出てしまったため大慌てで準備して行ったのが以下の勉強会だ。

- HTTP RFC Publication Study
  - https://web-study.connpass.com/event/250730/

アーカイブは以下に公開している。このあたりの話が資料付きで解説されているのでそちらで補足してほしい。

- HTTP RFC Publication Study - YouTube
  - https://www.youtube.com/watch?v=_hfG0HCufbs

優秀な bokken だけが、言い出したときからコツコツ準備していたが、それ以外は本当に 3 日で準備したので、前日の夜チャットで「誰だよこんなこと言い出したの」といった怒号が飛び交うなか資料を作るあのヒリヒリ感は、なんか久々だった。

次あったら、もっとしっかり準備してから行いたいとは思うが、結局前夜の様相は変わらないんだろうとも思う。


## Outro

RFC の数を見るとかなり大きな転換期だったが、真新しい内容ばかりではなかったのは、 HTTPWG が総力を上げて「今ある HTTP を壊さないように、でも今後も発展させていけるように」という大規模リファクタリングを行った結果だからだ。

その結果 HTTP/3 をスッキリした形でリリースできたという点では、この苦労は後世の Web のために欠かすことができない重要な作業だったと見るべきだろう。

まだ Cookie Bis (Cookie 仕様のリファクタリング)など残っているところもがあるが、しばらくは HTTPWG も少し休みをとる感じになりそうだ。

HTTPWG を献身的に支え、牽引してくれた Mark Nottingham 氏には、この場を借りて感謝したい。