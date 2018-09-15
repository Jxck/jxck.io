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





## Referer が載る条件

## Referrer-Policy

Referrer-Policy ヘッダは、そのページからの遷移に伴う Referer ヘッダを制御するためのヘッダである。

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

それぞれ解説していく。


### no-referrer

Referer ヘッダそのものが無くなり、一切送信されなくなる。



# no-referrer
# no-referrer-when-downgrade
# same-origin
# origin
# strict-origin
# origin-when-cross-origin
# strict-origin-when-cross-origin
# unsafe-url

# 空文字列






## Referer or Referrer

本来の英語としては *RefeRRer* が正しいが、 HTTP Header ではスペルミスした *RefeRer* が互換性を保つためそのまま使われている。

しかし、新しく定義された Referre-Policy は、正しいスペルが採用されている。
