# ブラウザでリロードしながら「キャッシュがヒットしない」と勘違いしてる全ての人へ

## Intro

こういうタイトルを付けるのはあまり好きでは無いが、あえてこのようにした。


## 「ブラウザでキャッシュがヒットしない」

- サーバで `Cache-Control` を付与したのにキャッシュがヒットしない
- サーバで `ETag` を付与したのに `If-None-Match` が送られない
- サーバで `Last-Modified-Since` を付与したのに `If-Modified-Since` が送られない

などが、 Web における Caching の FAQ だ。

先日も、筆者が書いた MDN の Cache セクションで「記述が間違っているのでは?」と同様の質問がきた。

- Issue about the Age response header and the term "Reload" · Issue #29294 · mdn/content
  - https://github.com/mdn/content/issues/29294#issuecomment-1746290336

日本語でいうと、例えば以下もこれにあたる。

- Cache-Control ヘッダは仕様通り実装されていない? - Qiita
  - https://qiita.com/shibukawa/items/bdf56e0adbc292666cfb#comment-f8af1c05a7b8abed7a82

特に、自分で RFC などを確認している場合、ある種のバイアスが働き「このブラウザは仕様に準拠してないのでは」とか「ブラウザにバグがあるのでは」などと勘違いしがちだ。

確かに、これについてちゃんと解説しているリソースは、決して多く無いかもしれない。そのため MDN の Cache セクションを書き直した際には、このことも解説しているし、自分が書いた本にもこの説明を 1 節使って行っている。

- Browser API | Cache 解体新書
- https://zenn.dev/jxck/books/cache-anatomia/viewer/browser

今後、この記事を渡すだけで説明が終わるように、改めてまとめておく。


## 原因は仕様でも実装でもなく検証方法

ブラウザごとの差なども含めて丁寧に話をすると記事が長くなるうえに、こうした検証で問い合わせてくる人が試しているのは大抵 Chrome なので、今回は Chrome に絞って話をする。

結論から言うと、これらの勘違いは全て「_ブラウザをリロードしながら DevTools の Network パネルを見てる_」ことが原因だ。

まず、ブラウザから発生するリクエストには、大きく 3 つある。(細かく分ければもっとあるが割愛)

1. Navigation
2. Reload
3. Force Reload (Super Reload)


### Navigation

Navigation とは、要するにリンクをクリックした場合に発生する画面遷移のリクエストだ。

このリクエストに対し、 Fresh なレスポンスが Store されていれば Reuse される(意訳: ブラウザにキャッシュがあればヒットする)。

もし、 `ETag` や `Last-Modified` が付与されていた場合は、 Validation が発生する(意訳: `If-None-Match` や `If-Modified-Since` が付与されたリクエスト送られ、 304 が返ってくれば再利用される)。

これが RFC に書いてあり、勘違いしている人が再現してほしい挙動だ。


### Reload

Reload は、その名の通りリロード、再読み込みだ。ブラウザの URL バーの隣にあるリロードボタンや、 cmd-r や F5 などで実行される。

Reload はそもそも、一旦表示はしたが何らかの理由で壊れた画面の修復や、古い表示の更新のために実装されている。したがって、「キャッシュが再利用されてほしく無い」というのがユーザの要求であるため、当然のように、ブラウザが Fresh なレスポンスを Store していようがいまいが、バイパスして Origin にリクエストする。(意訳: サーバに最新の HTML を取りに行く)

つまり、 Reload を押しながら DevTools を眺めても、キャッシュがヒットする様や Validation が発生する様を見ることができるはずはないのだ。

普段、結果の表示を Reload でデバッグしている癖でやってしまいがちではあるが、「_Reload の挙動は Navigation とは違う_」という点は、 Cache 周りをいじっているなら念頭におきたい。


## Force Reload

Force Reload は Super Reload などとも呼ばれ、 Shift + Reload や DevTools の "Disable Cache" 相当の機能を有効すると発生するものだ。

したがって、一般ユーザによる実行ではなく、開発者が実行するという意図で実装されている。

違いはキャッシュがバイパスされるだけでなく、 Request のヘッダが異なる。

```css
# Reload Request
Cache-Control: max-age=0

# Force Reload Request
Cache-Control: no-cache
```

古くからブラウザにある「更新」ボタンは、当時のサーバ実装などを踏まえて `max-age=0` が使われていたため、それを引き継いで Reload の仕様自体がこれを継承して今にいたる。

しかし、実際「すべてのキャッシュをバイパスして Origin から最新のリソースを得たい」なら仕様上 `no-cache` がこれにあたる。しかし、 Reload の実装を変えると、クライアントが `no-cache` を送ってくることを想定してないサービスにおいては、互換性が壊れる可能性がある。そこで、開発者向けとして別途 Force Reload として実装されたのだ。

そこの差をさておいても、「ブラウザのキャッシュは無視され、 Validation も発生しない」のは同じだ。 言うまでもなく「Cache を検証しているなら DevTools の "Disable Cache" は無効にする必要がある」(自明だが)。


## 正しい検証方法

では、キャッシュの挙動はどう検証すれば良いのか?そは、最初に言ったように、 Navigation を用いることだ。

よくあるユースケースとして、例えば `/home.html` のレスポンスが以下だったとする。

```css
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Cache-Control: max-age=100
ETag: deadbeef

<!doctype html>
...
```

このキャッシュがヒットするところが見たい場合は、 DevTools のネットワークパネルを開いたまま、以下のようなリンクをクリックし、そこに遷移すれば良い。もちろん、 "Disable Cache" は無効にする。

```css
<a href="/home.html">Home</a>
```

もし、 100s 以内ならキャッシュがヒットするだろうし、 100s すぎたら以下のようなリクエストが飛ぶだろう。

```css
GET /home.html HTTP/1.1
If-None-Match: deadbeef
```

これで意図したリクエストを見ることができるだろう。


### 注意点