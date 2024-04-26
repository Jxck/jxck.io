# [csrf][security] 令和時代の API 実装のベースプラクティスと CSRF 対策

## Intro

CSRF という古の攻撃がある。この攻撃を「古(いにしえ)」のものにすることができたプラットフォームの進化の背景を、「Cookie が SameSite Lax by Default になったからだ」という解説を見ることがある。

確かに、現実的にそれによって攻撃の成立は難しくなり、救われているサービスもある。しかし、それはプラットフォームが用意した対策の本質から言うと、解釈が少しずれていると言えるだろう。

今回は、「CSRF がどうして成立していたのか」を振り返ることで、本当にプラットフォームに足りていなかったものと、それを補っていった経緯、本当にすべき対策は何であるかを解説していく。

結果として見えてくるのは、今サービスを実装する上での「ベース」(not ベスト)となるプラクティスだと筆者は考えている。


## CSRF 成立の条件

例えば、攻撃者が用意した attack.example に以下のような form が仕込まれていたとする。

```html
<!-- attack.example に仕込まれた攻撃用 form -->
<form method=post action=https://sns.example/post>
  <input type=hidden name=body value="こんにちはこんにちは">
  <button type=submit>いますぐここをクリック</button>
</form>
```

この form は、どのサイトに埋め込まれていても、ボタンをクリックすることで form の submit によるリクエストが対象のドメインに飛ぶ。

もしこのボタンをクリックしたユーザが、 sns.example のユーザであり、ログイン済みの Cookie を持っていた場合、発生するリクエストが以下のようになったとする。

```http
POST /post HTTP/1.1
Host: sns.example
Content-Type: application/x-www-form-urlencoded
Cookie: deadbeef

body=こんにちはこんにちは
```

このリクエストが sns.example の持つ投稿の API に準拠している場合、ログイン済みの Cookie が付与されたことを理由に投稿が受理されれば、そのユーザのアカウントで body が投稿される。

無作為な攻撃なら誰かしらにボタンをクリックさせるのは容易であり、狙いすまして攻撃する場合も JS などを組み合わせて方法はいくらでもある。

この攻撃の手軽さと影響の大きさによって、 CSRF 攻撃は XSS や SQL Injection などと並ぶ有名な攻撃手法として認知されるまでになった。

対策としては、 sns.example そのものが設置する投稿のフォームに One Time Token (以下 CSRF Token)を仕込み、その Token の一致によって投稿を受理することで、「それ以外の form からの投稿を無視する」という方法が一般的だった。

```html
<form method=post action=https://sns.example/post>
  <textarea name=body></textarea>
  <input type=hidden name=csrf_token value=facefeedbadcoffee>
  <button type=submit>post</button>
</form>
```

さて、ではそもそも「CSRF が成立するのはプラットフォームに何が足りないから」だったのだろうか?


## CSRF が成立する問題点

CSRF Token が無い状態で CSRF が成立するのは、以下のようなサーバの実装が想定される。

```js
app.post("/post", session(), async (req, res) => {
  await createPost(req.body)
  // ...
})
```

この実装では、 Cookie による Session がミドルウェアで実現され、 Cookie を持ったユーザのアカウントで body を投稿に採用している。

つまり、攻撃者が用意した別の form からの投稿が成立するのは、「攻撃者の form からのリクエストにも SNS の Cookie が付与されるから」という点を問題とみなすことができる。

すると、 SameSite Cookie という概念を導入し、「別の Site からのリクエストには Cookie が付与されないようにする」という変更は、対策として成立していると考えられるだろう。

ところが、この問題の対策として CSRF Token が機能していたという事実は、「このリクエストはどこから来たものなのか」が分かれば対策できるという証拠でもある。

つまり、「*リクエストの出自がわからない*」ということの方が、本来注目すべき欠落であるはずなのだ。


## Origin ヘッダの付与

この問題に対するプラットフォームの回答は、「リクエストに Origin ヘッダを付与する」というものだ。

現在のブラウザで先ほどの攻撃 form を submit すると、送られるリクエストは以下のように Origin ヘッダが付与されている。

```http
POST /post HTTP/1.1
Host: sns.example
Content-Type: application/x-www-form-urlencoded
Origin: attack.example
Cookie:deadbeef

body=こんにちはこんにちは
```

Origin ヘッダの値に着目すれば、これが少なくとも sns.example からではないことは容易に判別できる。つまり、 Cookie があろうとなかろうと、 sns.example は以下のような実装によって「意図しない Origin からのリクエスト」を弾くことができるのだ。

```js
app.post("/post", session(), (req, res) => {
  if (req.headers.origin !== "https://sns.example") {
    return res.send(400)
  }
  // ...
})
```

このヘッダの必要性は少なくとも 16 年前くらいから言われており、 7 年前に Firefox が実装することで、全てのブラウザが form からの submit に Origin ヘッダを付与するようになっている。

- 446344 - Implement Origin header CSRF mitigation
  - https://bugzilla.mozilla.org/show_bug.cgi?id=446344
- 1424076 - Enable network.http.sendOriginHeader by default
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1424076

つまり、 SameSite Cookie が導入されるずっと以前から、「リクエストの出自を知る」ことはでき、それを用いて攻撃リクエストを弾くことはできたのだ。

もちろん、そもそも form を使わずに `fetch()` を用いた実装にし、 Origin を確認しながら適切な `Access-Control-Allow-Origin` を返しているならば、「どこから来たかわからないリクエスト」を弾くことはずっと可能であった。


### SameSite Cookie の登場

SameSite Cookie が登場したことで、上記のような Active な対策をしてこなかったサービスも、 Passive な変更によって保護される結果になった。

しかし、これはかなり副次的な効果だったと言って良い。

そもそも SameSite Cookie が出たのは、 3rd Party Cookie をマークする目的が大きい。インターネットを飛び交う `SameSite=None` Cookie の数が、未対策の 3rd Party Cookie であり、 3rd Party Cookie Deprecate の執着地点は `SameSite=None` Cookie が送られれないようにすることだからだ。それがたまたま 3rd Party Cookie を攻撃に使っている CSRF の対策にも繋がっているだけだ。

- 3PCA 21 日目: SameSite Cookie | blog.jxck.io
  - https://blog.jxck.io/entries/2023-12-21/same-site.html

別途 3rd Party Cookie が今のように問題になる前の Web においては、 Cookie は「Cross Site でも送られる」ことに依存して、比較的自由な連携が行われており、それによって成立する認証連携などのポジティブなユースケースで広く使われていた。

CSRF の方が遥かに古くから問題だったのに、最近まで「どの form からも Cookie が付与されるのはよくない」という方針での対策が出なかったのは、「サイトを跨いだ Cookie が送られること」よりも「リクエストの出自がわからないこと」の方が、 CSRF に対してプラットフォームが対策すべき問題であるとされていたからだ。

今 SameSite Lax が default になったのを理由に、「Origin のチェック」を怠った実装をしているのであれば、それは本質的な対策を怠った片手落ちの実装で、たまたま助かっているだけだと言えるだろう。


### CSRF Token は不要なのか

OWASP の CSRF Cheat Sheet では、今でも Token ベースの対策が推奨されている。

- Cross-Site Request Forgery Prevention - OWASP Cheat Sheet Series
  - https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

たまに更新されるが、そのベースは変わらず、かつ、 "そうでないといけない理由" は不明瞭な部分が多い。

- CSRF 対策はいまだに Token が必須なのか?
  - https://zenn.dev/jxck/scraps/704a507575a7d2

筆者はこの推奨がずっと気になっており、おりをみて OWASP その他 CSRF Token ベースの対策を推奨する人に質問をするが、だいたい以下のような理由が帰ってくる。

- XSS があった場合
- ヘッダをいじっている可能性
- GET で API があると成立する攻撃
- サブドメインが乗っ取られる攻撃

まずわかりやすいのは、 XSS などで sns.example 自体に偽装の form をつくられたら、 Origin ヘッダを見ても偽装されたリクエストの判別ができないことへの指摘だ。しかし、基本的に XSS などがあるならそれは XSS の問題であり、 XSS を対策すべきという話でしか無い。その XSS によって、 DOM に展開された CSRF Token を盗めない道理はないため、 CSRF Token なら優位である根拠も希薄だ。

また、 CSRF Token はランダムな値を毎回用いることに対して、 Origin ヘッダは固定値であることを理由に、任意のヘッダが Inject できる脆弱性があった場合に効果がないといった指摘もある。これはかつてブラウザの拡張などの脆弱性で、任意のヘッダが付与できた事件があったことなどを根拠にされるものだ。これも、仮に拡張やブラウザ自体に脆弱性があったら、どんなにサービスが対策をしてもいくらでもバイパスできるという点で、サービス提供者が想定するべき対策として視点がずれている。ブラウザや拡張に問題があれば、それはブラウザベンダ側が対策する以外にサービスができることは基本的にない。また、ユーザ設定や Proxy が意図的に Origin ヘッダを落としたり改変するような環境があるという話を持ち出す人もいるが、「サービスを安全に提供する」という観点で言えば、相手がルールを守ってないならこちらがそれをサポートする道理はない。むしろ、そういう環境をサービス側が許容してしまうとの方が、ルールを守っているクライアントにインシデントをもたらしかねないため、積極的に落とすべきだろう。

特に SameSite や Origin が対策にならない理由として、様々な条件(prerender, iframe etc etc)によってそれらが機能しないリクエストを生成できるという指摘もある(OWASP はこの側面を強調しているように思う)。ただし、これらの条件はその裏に「API が GET だった場合に攻撃が成立する」という条件に収束することがほとんどだ。そもそも、副作用のある API を GET で提供している実装に救いはないので、セキュリティのプラクティスを語る上でバッドプラクティスを前提にしているというズレが生じている。

SameSite Cookie だけに依存した対策は、サブドメインが SameSite であることを理由に攻撃が可能であるという指摘は真っ当だ、だからこそ一次防御は「Cookie が Lax であること」ではなく「リクエストの Origin のチェックすること」である必要があるのだ。

一方で、 CSRF Token を付与する実装はだいぶこなれており、堅牢であることも確かだ。フレームワークなどもデフォルトで提供することが多く、開発者の間でも認知が広がっている。導入するコストもかなり低くなっていため、少なくとも現状入っているなら「積極的に外す理由」とまではいかないだろう。筆者も「そんな実装古いから外してしまえ」というつもりはない。

ところが、防御の一層目として認識されていたこの手法も、今となっては多層防御の二層目だという認識を持つべきだ。つまり Token を出していたとしても「リクエストの出自を確認する」という実装は一層目にあるべきだし、それはもはや CSRF 対策にとどまらない。 CSRF 対策のリスクがあるから Origin を見るのではなく、全ての場所で Origin を確認するのがプラクティスだと考えて良い。


### 令和時代の対策

本来なら、 GET も含めた全てのリクエストに Origin をつければ良いのだが、「Origin ヘッダのあるリクエストは XHR からのものだ」という前提の実装が世に蔓延った後なので、そこまでドラスティックな変更ができずにいた。

そこで、 Origin ヘッダとは別に定義されたのが Fetch Metadata だ。今のブラウザで先ほどのリクエストを見れば、実際にはこうなっているだろう。

```http
POST /post HTTP/1.1
Host: sns.example
Content-Type: application/x-www-form-urlencoded
Origin: attack.example
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Cookie:deadbeef

body=こんにちはこんにちは
```

このように、リクエストの出自を確認する手法はかなり整備されてきた。これらを見ずに捨てるのは、プラットフォームが差し伸べている手を振り払っているのと同じだ。

これを踏まえて、現代において「*副作用があるエンドポイントをどう実装すべきか*」をまとめると、優先順位としては以下のようになる。

1. POST にする(副作用のある API を GET にしないの意)
2. Origin を確認する
3. SameSite Lax/Strict を明示する
4. Fetch Metadata も確認する

もし Fetch Metadata のサポートに不安がある場合「存在したら値をチェックする」という実装でも良いだろう。 `Sec-` は JS から弄れないヘッダであるため、値がある場合だけのチェックでも意味がある。

実装に落とすとミドルウェアとエンドポイントは、以下のようなものになる。

```js
app.use((req, res, next) => {
  // post である場合は origin と sec-fetch-site をチェック
  if (req.method === "post") {
    // origin は必ずチェック
    if (req.headers.origin !== "https://sns.example") {
      return res.send(400)
    }
    // sec-fetch-site は、存在した場合だけチェック
    if (req.headers.secFetchSite && req.headers.secFetchSite !== "same-origin") {
      return res.send(400)
    }
  }
  return next()
})

// デフォルトに頼らず Cookie に Lax を明示
// 理想は read と write に cookie を分け write を Strict にする
app.use(session("Lax"))

// 副作用のある API は必ず POST にする
app.post("/post", async (req, res) => {
  await createPost(req.body)
  // ...
})
```

実際のところこれは「CSRF 対策のベストプラクティス」というよりは、今アプリを実装する上でのベースであるべき実装だ。 7 年前からそうで、今は令和 6 年なので、ちょうど令和のプラクティスと言って良いだろう。

追加のストレージコストなども不要で、コードだけで実装できるためレイテンシーも最小だ。もし今からフレームワークを実装するなら、これがそのレールの基盤として存在するのが望ましい。

そして、これを逸脱するコードが必要になって初めて、そこに「自分は今のプラットフォームが推奨するレールから外れている」ということを認識した上で、 CORS などの適切な対策をしながら拡張していくのが、サイト間の連携をしていく正しいあり方と言えるだろう。

これを踏まえた上で、「やっぱり Token がないと不安だ」というのであれば、それを止めることはしない。が、このベースを伴わずに Token を載せても片手落ちだということは、念を押しておきたい。

むしろ、この実装をベースにしても Token が無いと防げない CSRF が可能であるならば、そのケースはおそらくプラットフォームにおけるバグの可能性があり、プラットフォームで対処すべき問題である可能性が高い。見つけたら、ぜひ W3C の WebAppSec などで議論すべき題材だろう。


## Ack

この記事は [@shhnjk](https://twitter.com/shhnjk) さんにレビューしていただきました。ありがとうございました。


## Outro

少し長くなったが、ここまでの話は今の Web 開発においての大前提となる知識であって、本当に書きたかったことはこの話を踏まえた次のエントリに書くことにする。