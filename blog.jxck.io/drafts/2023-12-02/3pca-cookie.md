# [cookie][3pca] 2 日目: Cookie による区別と識別

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 2 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie


## Cookie とは

例として、 https://example.com が以下のようなレスポンスを返すとする。

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Set-Cookie: deadbeef

<!doctype html>

...
```

ブラウザは次に https://example.com にアクセスするときは、必ずこの `Set-Cookie` の値を `Cookie` に載せて返す。

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html
Cookie: deadbeef
```

なお、この値は任意の文字列を指定可能だ。


## Cookie による区別

さて、このように「送ったら次から送り返してくる」というシンプルな仕組みで、いったい何ができるのだろうか?そもそも何が嬉しいのか? これが重要だ。

例えば、ユーザが最初にアクセスしてくるときは `Cookie` を送ってこないため、「`Cookie` のないユーザは新しくアクセスしてきたユーザだ」ということがわかる。

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html

# Cookie が無いので新規訪問
```

このレスポンスで、そのユーザに一意な ID を `Set-Cookie` する。

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Set-Cookie: 31d4d96e407aad42 # 一意な ID を付与
```

以降、このユーザは Cookie の期限が切れるまで、これを返し続ける。

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html
Cookie: 31d4d96e407aad42 # 付与された ID を送ってくる
```

これをアクセスしてくるユーザそれぞれに行えば、それぞれを ID で *区別* することが可能だ。

本来 HTTP とは、こうした識別子のようなものを持っておらず、デフォルトでは全員がまったく *区別* のつかないリクエストを送ってくるような作りになっている。もちろん、誰がアクセスしてきても同じコンテンツを返せばよい "ブログ" や "WiKi" のようなサービスなら良いが、これだけでは実現できないユースケースがある。

例えばショッピングカートだ。「商品をカゴに追加する」というリクエストがきても、それをどのカゴに追加したら分からなければ、実装ができない。


## 区別と識別

一意な値を Cookie として付与すれば、ユーザが *区別* できるが、この時点では *識別* はしてない。

つまり、誰だかはわからないが ID として `31d4d96e407aad42` をとりあえず振っている状態だ。そして「`31d4d96e407aad42` は何者なのか?」を知るために行うのが「認証」、つまり「ログイン」となる。

例えば `31d4d96e407aad42` を付与された筆者がログインすることで、 `31d4d96e407aad42` は Jxck だとわかる。このことから、「ログイン」とは「区別していた ID に対してアカウントを紐づける行為」と言える。

もちろん、ログインするまで Cookie を付与せず、認証と同時に Cookie を付与することもできるが、それではログインするまでショッピングカートが使えない。最近の EC サービスは、ログインしていなくてもショッピングカートに追加でき、決済直前で認証を挟む実装が多いが、これは先にカートのための *区別* を行い、あとから *識別* していることになる。

このように、 Cookie とは必ずしも認証結果というわけではなく、ユーザ同士が *区別* できれば良いだけのユースケースもあるというのが、 Cookie の使い方を考える上で非常に大事なことだ。