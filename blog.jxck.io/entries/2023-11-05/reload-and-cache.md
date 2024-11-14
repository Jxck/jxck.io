# ブラウザでリロードしながらキャッシュの挙動を確認してる全ての開発者へ

## Intro

こういうタイトルを付けるのはあまり好きではないが、あえてこのようにした。


## 「ブラウザでキャッシュがヒットしない」

以下は、Web における Caching の FAQ だ。

- サーバで `Cache-Control` を付与したのにキャッシュがヒットしない
- サーバで `ETag` を付与したのに `If-None-Match` が送られない
- サーバで `Last-Modified` を付与したのに `If-Modified-Since` が送られない

先日も、筆者が書いた MDN の Cache セクションで「記述が間違っているのでは?」と同様の質問を受けた。

- Issue about the Age response header and the term "Reload" · Issue #29294 · mdn/content
  - https://github.com/mdn/content/issues/29294#issuecomment-1746290336

日本語で言えば、以下の例もこれに該当する。

- Cache-Control ヘッダは仕様通り実装されていない? - Qiita
  - https://qiita.com/shibukawa/items/bdf56e0adbc292666cfb#comment-f8af1c05a7b8abed7a82

本人が RFC などを確認していることがバイアスとして働き、「記述が間違っているのではないか」「仕様に準拠していないのでは」「バグがあるのではないか」と勘違いしがちだ。

確かに、これについてきちんと解説しているリソースは、決して多くはないかもしれない。そのため、昨年 MDN の Cache セクションを書き直した際にはこの件の解説を追加したし、自分が書いた本にもより詳細な解説を一節使って行っている。

- HTTP caching - HTTP | MDN
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
- Browser API | Cache 解体新書
  - https://zenn.dev/jxck/books/cache-anatomia/viewer/browser

今後、この記事を渡すだけで説明が終わるように、改めてまとめておく。


## 原因は検証方法

ブラウザごとの差なども含めて丁寧に話をすると記事が長くなるうえに、こうした検証で問い合わせてくる人が試しているのは大抵 Chrome なので、今回は Chrome に絞って話をする。

結論から言うと、これらの勘違いは全て「*ブラウザをリロードしながら DevTools の Network パネルを見ている*」ことが原因だ。

まず、ブラウザから発生するリクエストには、大きく 3 つある。(細かく分ければもっとあるが割愛)

1. Navigation
2. Reload
3. Force Reload (Super Reload)


### Navigation

Navigation とは、要するにリンクをクリックした場合に発生する画面遷移のリクエストだ。

このリクエストに対し、Fresh なレスポンスが Store されていれば Reuse される(意訳: ブラウザにキャッシュがあればヒットする)。

もし、`ETag` や `Last-Modified` が付与されていた場合は、Validation が発生する(意訳: `If-None-Match` や `If-Modified-Since` が付与されたリクエストが送られ、304 が返ってくれば再利用される)。

```http
GET / HTTP/1.1
Host: example.com
If-None-Match: "deadbeef"
If-Modified-Since: Thu, 20 Feb 2020 20:20:20 GMT
```

これが RFC に書かれており、勘違いしている人が再現してほしい挙動だ。


### Reload

Reload は、画面の更新だ。ブラウザの URL バーの隣にあるリロードボタンや、CMD-r / F5 などで実行される。

Reload はそもそも、何らかの理由で壊れた画面の修復や、最新情報への更新のために実装されている。したがって、「キャッシュが再利用されてほしくない」というのがユーザの要求であるため、当然のように、ブラウザが Fresh なレスポンスを Store していようがいまいが、バイパスして Origin にリクエストする。(意訳: サーバに最新の HTML を取りに行く)

つまり、いくら `max-age` が切れてなくても、Reload しながら DevTools でキャッシュがヒットする様子を見ることはできないのだ。

なお、リクエストは以下のようになる。

```http
GET / HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-None-Match: "deadbeef"
If-Modified-Since: Thu, 20 Feb 2020 20:20:20 GMT
```

Conditional Request は行われているため、厳密にはブラウザに Response が保存されているが、Validation を強制していることになる(意訳: 304 が返ることはある)。

*普段、結果の表示を Reload でデバッグしている癖でやってしまいがちではあるが、「Reload の挙動は Navigation とは違う」という点は、Cache 周りをいじっているなら念頭におきたい*。

`max-age=0` を使っている理由は後述する。


## Force Reload

Force Reload は Super Reload などとも呼ばれ、Shift + Reload や DevTools の "Disable Cache" 相当の機能を有効にすると発生するものだ。

したがって、一般ユーザによる実行ではなく、開発者が実行するという意図で実装されている。

リクエストは以下のようになる。

```http
GET / HTTP/1.1
Host: example.com
Cache-Control: no-cache
```

`no-cache` を用いているため、「Origin に Validation を強制」していることがわかるだろう。しかし、`If-Modified-Since` や `Last-Modified` が消えていることから、Conditional Request ではない。つまり、Validation ではなく「Origin から最新の Response を取得する」という挙動になることがわかる。

意訳: ブラウザに `max-age` の切れていないキャッシュがあってもヒットしないし、サーバからは 304 が返ることもなく、必ず 200 が返る。

これこそが、「画面を最新の情報にする挙動」だろう、実際仕様的にもこれが最もそれに相応しい Request と言える。

では、なぜ Reload は `max-age=0` なのかというと、`no-cache` が仕様化されたのは、ブラウザが登場してからかなり経ってからだからだ。それ以前は `max-age=0` が使われていたため、ブラウザのリロードの実装もそのころから `max-age=0` を使っていた。後に `no-cache` が登場したからといって Reload の実装を変えると、クライアントが `no-cache` を送ってくることを想定していないサービスにおいては、互換性が壊れる可能性があり、現状でもそのままの実装となっている。

しかし、ブラウザが開発環境を兼ね、Devtools のような機能が入り、より複雑な開発が行われるようになると、より厳密な Reload である `no-cache` の実装が求められた。そこで、開発者向けに別途 Force Reload として実装された。Devtools に Disable Cache があるのは、Force Reload を強制するためだ。


## 正しい検証方法

では、「キャッシュの挙動」、正確には「ユーザが体験するキャッシュの挙動」はどのように検証すれば良いのだろうか?

答えは、最初に言ったように Navigation を用いることだ。

よくあるユースケースとして、例えば `/home.html` のレスポンスが以下だったとする。

```http
HTTP/1.1 200 OK
...
Cache-Control: max-age=100
ETag: deadbeef
If-Modified-Since: Sat, 11 Nov 2023 11:11:11 GMT

<!doctype html>
...
```

このキャッシュがヒットするところが見たい場合は、以下のようなリンクをクリックし、そこに遷移すれば良い。もちろん、"Disable Cache" は無効にする。

```css
<a href="/home.html">Home</a>
```

もし、100s 以内ならキャッシュがヒットするだろうし、100s すぎたら以下のようなリクエストが飛ぶだろう。

```http
GET /home.html HTTP/1.1
...
If-None-Match: deadbeef
If-Modified-Since: Sat, 11 Nov 2023 11:11:11 GMT
```

これで、仕様に記載されたリクエストを見ることができる。


### サブリソースの Revalidate

ただし、もう 1 つ注意点がある。

近年の Web では、サービスの実装バグなどによって表示が壊れるといった事象は、滅多に見られなくなってきた。つまり、ユーザがリロードをする理由の大半は、表示情報を最新にしたいケースと言える。

一方、現在の Web は 1 つのページが非常に多くのサブリソースに依存している。メインリソースである HTML の情報を最新にするために、多くのサブリソースを同時に更新するのは、非常に無駄な処理が多い。特に最近のサブリソースは、ビルド結果のハッシュを URL に付与し、キャッシュバスティングするケースが一般的だ。そうしたサブリソースは内容が一切変更されず、内容を変更する場合は URL が変更されることになる。

つまり、リロードで大量のサブリソースまで同時に更新するのは、大抵の場合無駄でしかないのだ。

そこで、「このリソースは更新されないからリロード時に取得し直す必要がない」と明示的に示す `immutable` が定義された。

- RFC 8246 - HTTP Immutable Responses
  - https://www.rfc-editor.org/rfc/rfc8246

Firefox と Safari はこれを実装している。しかし Chrome は実装をしてない。

Chrome は独自の調査の結果、`immutable`がなくても Reload 時にサブリソースを Validation する必要はないという結論に至った。そのため、Reload 時にはメインリソースのみを再取得し、サブリソースは`immutable` がデフォルトという実装に変更されている。

この変更については、以下に詳細がある。

- Chromium Blog: Reload, reloaded: faster and leaner page reloads
  - https://blog.chromium.org/2017/01/reload-reloaded-faster-and-leaner-page_26.html

つまり、先ほどの「リロードしながらキャッシュの挙動を観察する」においては、Chrome でサブリソースは常にキャッシュがヒットしている状態と考えることができる。この場合に出る以下のエラーメッセージが、かなり不親切なため、余計に混乱するかもしれないが、リクエストセクションの表示がないのはリクエストが発生すらしてないからだと思って良い。

```
Provisional headers are shown, Disable cache to see full headers.
```

![Provisional headers are shown, Disable cache to see full headers.](immutable-subresource-request.png#1766x480)


## おまけ

> `no-cache` という名前はキャッシュの仕様における最大の間違いだ、"キャッシュしない" は `no-store` なのでそちらを使うべきだ

や

> 世の中には `no-store` を無視するブラウザがあるから、`no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate...` とすべきだ

といったこの話につきものの言説も、仕様を少しかじった人たちや、古い資料の知識から更新されてない人たちによって、決して正しいとは言えない解説とともに、いまだに更新されず流布している。

これらについても MDN および書籍のなかで解説しているので、世界の知識が更新されていくことを待つばかりだ。