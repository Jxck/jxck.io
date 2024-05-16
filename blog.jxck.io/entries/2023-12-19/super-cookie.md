# [cookie][3pca] 3PCA 19 日目: Super Cookie

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 19 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は Super Cookie の解説をする。迂回手段ゾーンとしては、最後に紹介する手法だ。


## Super Cookie

Super Cookie は、最初筆者も非常に驚いた、トラッカーの執念を感じる手法だ。

まず前提として、ブラウザのどこかに情報を保存でき、それがある程度の期間永続化され、かつ自動的に取得できるようなものであれば、トラッキングに応用が効く。

そこで目がつけられたのが HSTS (HTTP Strict Transport Security)だ。

HSTS は、サイトが HTTPS に対応していることをブラウザに知らせ、次からは `http://` なリンクで遷移しても自動で `https://` にアップグレードさせるものだ。つまりこれは Origin ごとに 1bit の情報を保存しているとみなすことができる。

そこで `example.com` の下に `sc00.example.com` から `sc16.example.com` まで 16 個のサブドメインを用意したとする。

```
sc00.example.com
sc01.example.com
sc02.example.com
...
sc16.example.com
```

まず、最初にアクセスしたユーザは、この 16 個のドメインを知らないため、全部に `http://` で `fetch()` しても、どれもアップグレードしない。

```js
domains.forEach(async (domain) => {
  const res = await fetch(`http://${domain}`)
  // ...アップグレード判定
})
```

そこで、このユーザには、例えば sc00 だけ HSTS を有効にするようにレスポンスする。

```http
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=31536000
```

これは 1 年間保存されるため、次回また `fetch()` で判定すれば sc00 だけが有効になったユーザであることがわかる。

この方法を使えば、2^16 で 6 万通りのユーザを区別できるのだ。もちろん、`fetch()`の時間は増えるがドメイン数を増やせば、いくらでも精度を上げることができる。


## Super Cookie 対策

Super Cookie の利点は、 HSTS 情報がブラウザにグローバルに保存されるため、どのページから `fetch()` しても、同様の情報が取得できる点にあった。

その問題に対処するのが、前述した Network (State) Partitioning だ。ブラウザの実装によるところはあるが、すでに Partition しているものもある。

その場合は、あるサイトで HSTS を設定していても、別のサイトでは HSTS 情報が共有されないため、クロスサイトのトラッキングには使用できない。

また、 HSTS はそもそも HTTPS by Default というゴールに向けた過渡的な技術だ。

世界中のサイトが HTTPS をデプロイを進めていくため、今後は HTTP に接続すること自体を防いでいくフェーズに入りつつある。

例えば、 Chrome は既に `http://` なリンクでも、最初から HTTPS で接続する方向に移行しつつある。

つまり HSTS がブラウザでデフォルトになっていき、 HTTP に対応していないサイトに接続する場合は、ユーザにリスクを認識させるために、何らかの操作負荷を加えていくことになるだろう。