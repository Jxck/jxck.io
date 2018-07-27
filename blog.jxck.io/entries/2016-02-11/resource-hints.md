# [resource hints][performance] Resource Hints API でリソースの投機的取得

## Intro

Resource Hints とは現在提案されている以下のドラフトであり、ブラウザに「次に必要となるリソースを教える」ことで、投機的な取得を行う API 群である。

<https://w3c.github.io/resource-hints/>

主に以下がある。

- [dns-prefetch](https://w3c.github.io/resource-hints/#dfn-dns-prefetch)
- [preconnect](https://w3c.github.io/resource-hints/#dfn-preconnect)
- [prefetch](https://w3c.github.io/resource-hints/#dfn-prefetch)
- [prerender](https://w3c.github.io/resource-hints/#dfn-prerender)

今回は本サイトでこれを適用した話。


## 投機的なリソース取得

例えば、ログインページの次には、そのサービスのメインページに遷移する頻度が高い。

そして、メインページでは、以下のような追加のリソースが必要になるだろう。

- 追加の JS
- 追加の CSS
- 追加の Image
- 追加の API アクセス

それぞれを DNS 解決 -> TCP 接続 -> リソースのフェッチ、と繰り返していくと、イニシャル表示は必然的に時間がかかる。

ところが、この遷移には以下の特徴がある。

- *ログインページの滞在時間は長い*
- *同一サービス内なので、その次のメインページで必要なリソースは予測可能性が高い*

であれば、ログインページでユーザが操作している間に必要なものを裏で取得しておければ、ログイン後の表示に必要なリソース収集は終わっているので表示が速くなる。

投機的な取得の代表シナリオはこんな感じになる。


## Resource Hints

Resource Hints はそうしたリソース取得のヒントをブラウザに伝える API 群であり、基本的には前のページ(上記ならログインページ)の中で、次のページ(上記ならメインページ)で使うリソースのヒントを HTML の Link タグで記述する。

現在は四種類ある


```html
<link rel="dns-prefetch" href="//example.com">
<link rel="preconnect" href="//example.com">
<link rel="preconnect" href="//cdn.example.com" crossorigin>
<link rel="prefetch" href="//example.com/next-page.html" as="html" crossorigin="use-credentials">
<link rel="prefetch" href="/library.js" as="script">
<link rel="prerender" href="//example.com/next-page.html">
```


### dns-prefetch

DNS の問い合わせを事前に行い、キャッシュしておくことで、名前解決コストを下げる方法である。


```html
<link rel="dns-prefetch" href="//example.com">
```

例えば、メインページで接続する API サーバや、 CDN のエッジへの名前解決を行うなどが予想されるだろう。

以下のようなケースで使用できる。

- 既に接続先ドメインがわかっている
- 接続する具体的な URI までは定まらない


### preconnect

DNS の解決に加えて TCP の接続まで確立しておくことで、リクエストをすぐにでも発行できるようにする方法である。

仕様では、クロスオリジンも張ることができる。


```html
<link rel="preconnect" href="//example.com">
<link rel="preconnect" href="//cdn.example.com" crossorigin>
```

例えば API エンドポイントは決まっており、そこに対して連続したリクエストが発生すると分かっているような場合が予想される。

以下のようなケースで使用できる。

- 既に接続先ドメインがわかっている
- URI は分かっているが、レスポンスが動的なため後述する prefetch はできない


### prefetch

もはや取得するリソースが分かっており、それが投機的に取得しても内容が変わらないもの、要するに静的リソースである場合に、事前に取得してブラウザにキャッシュする方法である。


```html
<link rel="prefetch" href="/library.js" as="script">
<link rel="prefetch" href="//example.com/next-page.html" as="html" crossorigin="use-credentials">
```

以下のようなケースで使用できる。

- 既に URI が分かっている
- 静的リソース、もしくは投機的に取得しても内容に問題の無いコンテンツ


### prerender

prefetch 可能なリソースのみからなるページならば、ページ全体を事前に取得することが可能な筈である。

そこで、そのページ全体を取得し、バックグラウンドに起こしたタブの中で、描画まで行ってしまうという方法である。


```html
<link rel="prerender" href="//example.com/next-page.html">
```

描画が完了しているため、実際の遷移が発生したら、そのタブを切り替えるだけでよくなる。理論上は最速表示となるだろう。

以下のようなケースで使用できる。

- prefetch 可能なリソースのみからなるページ


## API 選択フロー

どの API を選ぶフローは、接続するドメインが分かっている前提であれば、以下のように考えることができる。

![接続する URL まで決まっている N -> dns-prefetch, Y -> 静的リソースか、事前取得可能である N -> preconnect, Y -> prefetch 可能かリソースだけでなる N -> prefetch, Y -> prerender](resource-hints.svg#546x608 "Resource Hints API の選択フロー")


## サイトへの適用

このサイトは現状こうした特徴がある。

- ほとんどが静的リソースで成り立っている
- 遷移の導線が(意図的に)少ない
- 外部へのアクセスも基本的には少ない

これを考慮して、以下の二つを実施した。

- jxck.io にアクセスした際、サブドメインを名前解決だけする
- blog.jxck.io (エントリ一覧)にアクセスした際、最新のエントリだけ裏でレンダリングする

名前解決の方は確認が難しいので、後者のみ確認結果を載せる。

Chrome の場合は Prerender の状況について [chrome://net-internals](chrome://net-internals) から確認できる。

![chrome://net-internals#prerender による Prerender の状況確認](net-internals-prerender.png#1058x299 "chrome://net-internals#prerender")
