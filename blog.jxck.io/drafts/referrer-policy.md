# [tag] Referrer-Policy によるリファラ流出制御


## Intro

リファラはリンクなどでページを遷移する際に、遷移元の URL を Referer ヘッダに載せる仕様である。

これはブラウザが自動で行うため、場合によっては社内の公開したくない URL などが漏れることがある。

この挙動を制御することができる、 Referrer-Policy ヘッダについて解説する。


## Referer

例えば `https://example.com/index.html` に貼られたリンクから `https://blog.jxck.io` に遷移する場合を考える。

そのリクエストには、以下のように HTTP Referer ヘッダが含まれる場合がある。

```http
GET / HTTP/1.1
Host: blog.jxck.io
Referer: https://example.com/index.html
```



## Referer による情報漏洩

例えば、社内に閉じたサイトにあるリンクから、社外のサイトに遷移した場合、社内のサイトの URL が送信されることになる。

場合によっては、ここから非情報の断片が漏洩する可能性がある。

例として、架空の Example 社が、まだ未公開の Orange という新プロジェクトを開始したとする。


### ドメイン情報

Example 社は社内で Orange プロジェクトに関する情報共有のために、社内ブログやチケット管理などを整備している。

- redmine.orange.example.com
- trac.orange.exmaple.com
- dev.orange.example.com
- orange.git.example.com
- orange.intra.example.com
- etc

それらの中に、外部へのリンクがあると、このドメイン名が Referer に付与される。

見る人が見ると、 Example 社が Orange というプロジェクトをやっていることが推測できる。


### URL 情報

ドメインだけではなく、パス部分も多くの情報を持つ。

例えば、 Example 社の社員は、社内ブログで情報を共有しており、ブログのタイトルが以下のようになっている場合。

```
https://blog.orange.example.com/{社員名}/entries/how-to-solve-app-broken-issue
```

また URL の一部に日本語が URL エンコードされて入るタイプのコンテンツもある。

```
https://ticket.orange.example.com/{社員名}/issue/xxxxxx/あれが壊れているので直す
````

他にも、キーワード検索の結果から外部のページに飛べる場合、検索したキーワードが入っていたりもする。


### 社外秘ページ

ここまでの例は、社内(Intra)に閉じたページの情報が Referer で漏れる場合であった。

しかし、社外秘だが訳あって Internet 経由で誰でもアクセスできてしまうものもある。

これは、 example.com 社のドメインであるが、アクセス制限を間違えており Public になっている場合もある。

また、 private gist のように「URL を知っている人だけアクセス可能」というポリシーの Semi Private なページもある。

こうした URL は Refere を辿ればそのままアクセスできてしまう。



### Referer による検証






## Referer が載る条件



## Referer 制御の観点


Referer を制御する際には、以下の 3 つの観点が考えられる。

- Origin / URL
- Dowgrade / Upgrade
- 載せる条件




## Referrer-Policy

Referrer-Policy は、ヘッダもしくは HTML の特定の要素、そのページからの遷移に伴う Referer ヘッダを制御するためのヘッダである。

- <https://w3c.github.io/webappsec-referrer-policy/>

指定は以下のように行う。


```http
Referrer-Policy: no-referrer
```

指定できるポリシーは以下が定義されている。

- `no-referrer`
- `no-referrer-when-downgrade`
- `same-origin`
- `origin`
- `strict-origin`
- `origin-when-cross-origin`
- `strict-origin-when-cross-origin`
- `unsafe-url`
- `""`


ポリシーの違いを見極める観点としてはまず載せる値がある。

ヘッダに URL が載る場合、例えばこのページでは以下のようになる。


```http
Referer: https://blog.jxck.io/entries/2018-09-22/referrer-policy.html
```

ポリシーによっては、この URL の詳細度を下げるため、 Origin のみを送るものがある。

```http
Referer: https://blog.jxck.io/
```

これなら、どのサイトから来たかはわかるが、どのパスから来たかまではわからないという状態になる。

特に Origin ヘッダが付与される場合は、これと同等の情報が載るため、 Origin ヘッダが送信される状況では Referer を禁止してもこの情報は送信されていることは認識しておきたい。


これを踏まえて、それぞれ解説していく。




### no-referrer

送る条件: 一切送らない


Referer ヘッダそのものが省かれるため、情報の漏洩の観点から言うと一番安全ではある。

しかし、同じサイト内でも送られなくなるため、 Referer をベースとした検証がどこかに入っている場合は問題になる。

社内ドメイン内の遷移でも送られなくなるので、内部での遷移についてもメトリクスを取りたい場合を考えると制限が強い。



### unsafe-url

送る条件: 必ず送る
送る値: URL 全体

Referer ヘッダに URL 全体を載せ、必ず送る。


### same-origin

送る条件: Same Origin のみ
送る値: URL 全体

Same Origin なので、 http -> http / https -> https となり、 Downgrade/Upgrade では送られない。



### origin

送る条件: 必ず送る
送る値: Origin のみ


送る対象は全ての遷移なので、パス情報を秘匿したいが Origin だけは知りたいといった用途で利用できる。

ただし、 Downgrade しても送られるため、 MITM などで書き換えられるリスクがあるため、検証要素としては弱いと考えるべきだろう。


### strict-origin

送る条件: Downgrade 以外
送る値: Origin のみ


全てのドメインに対して

- https -> https であれば送る。
- https -> http であれば送らない。
- http -> https/http は送る。


つまり、ダウングレードだけを警戒した `origin` ということになる。

送る内容は前述と同じ Origin のみである。


### no-referrer-when-downgrade (default)

送る条件: Downgrade 以外
送る値: URL 全体


http 間や、 https 間では送られるが、 https -> http だけ送られない。

これがブラウザのデフォルトの挙動になる。



### origin-when-cross-origin

送る条件: Cross Origin の場合
送る値: Origin のみ

送る条件: Same Origin の場合
送る値: URL 全体


内部遷移では URL 全体を送るが、外に出る場合は Origin のみを送る挙動になる。

https -> http も Cross Origin 扱いになるため、 Origin のみ送られる。



### strict-origin-when-cross-origin

送る条件: Downgrade の場合
送る値: 無し

送る条件: Cross Origin の場合
送る値: Origin のみ

送る条件: Same Origin の場合
送る値: URL 全体


`orign-when-cross-origin` にダウングレードでの送信禁止を追加した挙動となる。

ダウングレードでは送りたいくない、内部ではパスが欲しいが、外部にはオリジンだけに制限したいという用途になる。




### 空文字列

Policy を指定しないことを意味する。

より上位の指定内容か、 User Agent のデフォルトが反映される。




## Referer or Referrer

本来の英語としては *RefeRRer* が正しいが、 HTTP Header ではスペルミスした *RefeRer* が互換性を保つためそのまま使われている。

しかし、新しく定義された Referre-Policy は、正しいスペルが採用されている。
