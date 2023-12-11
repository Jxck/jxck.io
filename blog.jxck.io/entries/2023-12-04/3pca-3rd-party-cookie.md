# [cookie][3pca] 3PCA 4 日目: 3rd Party Cookie の正体

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 4 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

前回は「サブリソースにまで Cookie が送られて何が嬉しいのか」という話だった。

今回はそのユースケースについて考えていく。


## 「さっき見てた商品が出る」のからくり

例えば、 EC サイトで色々な商品を探した後に、全然関係のないサイトで、なぜかさっきまで見ていた商品がそのサイト内でおすすめされている、という経験があるだろう。

今回はリアルワールドの例として、楽天の実装を引用する。

まず、楽天市場のサイトでミネラルウォーターを物色する。

![楽天市場のサイトでミネラルウォーターを物色している様子](rakuten.jpeg#5120x2880)

その後、 Yahoo! Japan のトップページにアクセスすると、楽天からミネラルウォーターの広告が表示される。

![Yahoo! Japan のトップページの右端に楽天市場の広告が表示され水がおすすめされている](yahoo.jpeg#1974x2198)

このように、一見異なるサイトが連携しているかのように見えるこの実装にこそ、ここまで解説した Cookie の性質が利用されている。


## 広告での Cookie

実際の広告配信の構造は非常に複雑なので、ここからは実際とは異なる簡素化した仮想的な実装例で考えていく。

通常、 Web における広告は以下の 3 つのロールがある。

- 媒体主(publisher.example): サイト内の広告枠を売りたい(上の例では Yahoo)
- 広告主(advertiser.example): 広告枠を買い、広告を表示したい(上の例では楽天)
- 広告ネットワーク(ads.example): 両者を繋ぐ代理店

まず、広告主のサイトには以下のように、「広告ネットワークのスクリプト」が埋め込まれている。

```html
<!doctype html>
...
<title>Shopping Site</title>
<script src="https://ads.example/advertiser.js?interest=water"></script>
```

このとき「このユーザは水をみている」といった情報を付与してリクエストすることで、広告ネットワークは「このユーザが誰かは不明だが、水を探している」という事実を把握できる。

```http
GET /advertiser.js?interest=water HTTP/1.1
Host: ads.example
```

このレスポンスに「区別するための Cookie」を 3rd Party Cookie として付与する。

```http
HTTP/1.1 200 OK
Content-Type: text/javascript
Set-Cookie: 31d4d96e407aad42
```

媒体主のページも同様に、広告ネットワークのスクリプトを埋め込んでいる。

```html
<!doctype html>
...
<title>Portal Top</title>
<script src="https://ads.example/publisher.js"></script>
```

このページにアクセスした際、広告ネットワークには以下のようなリクエストが飛ぶ。

```http
GET /publisher.js HTTP/1.1
Host: ads.example
Cookie: id=31d4d96e407aad42
...
```

このリクエストを受け取った楽天は、「アカウントは不明だが、このユーザは、先ほどミネラルウォーターを見ていたユーザだ」とわかる。結果、返した JS が動的に `<iframe>` を埋め込み、そこにミネラルウォーターに関する広告を返すことができるのだ。

実際に閲覧データや購買データをやり取りしなくても、両者が同じ広告ネットワークを利用しているだけで、この仕組みが実現できているわけだ。


## 3rd Party Cookie の正体

このとき、ユーザ自身は広告主(ex. 楽天)や媒体主(ex. Yahoo)にアクセスしているため、広告主や媒体主の Cookie を付与されても特に不思議なことではない。しかし裏では「直接アクセスしていない広告ネットワークにも Cookie が送られている」ことになり、こちらはユーザが意図したものとは言えないだろう。

ここで「広告主」と「媒体主」が 1st Party で、第三者である「広告ネットワーク」が 3rd Party となり、付与される Cookie がそれぞれ 1st Party Cookie と 3rd Party Cookie になるのだ。こう考えれば「2nd Party Cookie」と呼ばれるものは存在しないことがわかるだろう。

また、「先ほど興味がありそうだったけど購買に繋がらなかった広告を、別のサイトでもリコメンドする」というこの方式を、「リターゲティング」などと呼ぶ。リターゲティングは、広告における 3rd Party Cookie の代表的なユースケースの 1 つだ。

そして、もちろんこのような仕組みになっていることを知らない一般ユーザの中には、「他のサイトで水を見ていたら、別のサイトでも水の広告が出た」という事実を、単純に「気持ち悪い」と感じるユーザもいる。これが、 3rd Party Cookie が問題視される原因の一つでもあるのだが、それについては追って解説する。