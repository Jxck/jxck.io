# [tag] Referrer-Policy によるリファラ制御

## Intro

リファラはリンクなどでページを遷移する際に、遷移元の URL をリクエストの Referer ヘッダに載せる仕様である。

この付与はブラウザが自動で行うため、場合によっては非公開として扱っている URL が意図せず漏れることがある。

この挙動を制御することができる、 Referrer-Policy ヘッダについて解説する。


## Referer

例えば `https://example.com/index.html` に貼られたリンクから `https://blog.jxck.io` に遷移する場合を考える。

そのリクエストには、条件次第で以下のように HTTP Referer ヘッダが含まれる。


```http
GET / HTTP/1.1
Host: blog.jxck.io
Referer: https://example.com/index.html
```

`blog.jxck.io` の管理者は、このリファラを見ることで、 `example.com` に自分のサイトへのリンクが貼られていることを知ることができる。

結果、簡易的なトラックバックとして機能するため、アクセスログにこの情報を含むことで、流入元を解析するための情報源として使うのがメジャーなユースケースだろう。


<!--


また、逆にリファラが期待しないものであればエラーを返すといった使い方がされることもある。

例えば、画像が無断利用されることを防ぐために、 Referer が他のサイトからのものであればブロックするといった用途や、 CSRF の可能性のあるリクエストを弾くといった使い方だ。

しかし、 Referer が必ず送られると期待するのも、改ざんされてないことを保証するのも難しいため、 Referer は補助的な情報として利用するのが一般的と認識している。

-->


## Referer による情報漏洩

例えば、社内に閉じたサイトにあるリンクから、社外のサイトに遷移した場合にも、社内のサイトの URL が送信されることになる。

もちろん URL を辿ってもページ自体にはアクセスできないが、 URL 自体から秘情報の断片が漏洩する可能性がある。

例として、架空の *Example* 社が *Orange* という新プロジェクトを開始した場合を考える。

Orange については、


### ドメイン情報

Example 社は社内で Orange プロジェクトに関する情報共有のために、社内ブログやチケット管理などを運用している。

- redmine.orange.example.com
- trac.orange.exmaple.com
- dev.orange.example.com
- orange.git.example.com
- orange.intra.example.com
- etc

ここで、社内ブログやチケットに誰かのブログへのリンクが貼ってあった場合、そのリンクを踏んだブラウザからのリクエストに、このドメイン名が入った Referer が付与される。

リンクされたブログの持ち主は、アクセス解析の結果、 Example 社が Orange というプロジェクトをやっていることが推測できる可能性がある。


### URL 情報

ドメインだけではなく、パス部分も多くの情報を持つ。

例えば、 Example 社の社員は、社内ブログで情報を共有しており、ブログのタイトルが以下のようになっている場合。


```url
https://blog.orange.example.com/{社員名}/entries/how-to-solve-app-broken-issue
```

また URL の一部に日本語が URL エンコードされて入るタイプのコンテンツもある。


```url
https://ticket.orange.example.com/{社員名}/issue/xxxxxx/あれが壊れているので直す
```

他にも、キーワード検索の結果から外部のページに飛べる場合、検索したキーワードが残る場合もある。


```url
https://intra.orange.example.com/search?q=大事なキーワード
```


### アクセス可能な社外秘ページ

通常、社内のネットワークは外からアクセスできないようにするだろう。

しかし、作ったデモを外部サービスにデプロイしたり、 snippet サービスで共有する場合もあるだろう。

「URL を知っている人しかアクセスできない」という半プライベートな仕様の場合、 URL の共有を慎重に行っていても、 Referrer から漏れる場合がある。


## Referer の制御

こうした理由から、特に社内ネットークに閉じた情報が外に漏れないよう、何らかの形でリファラを制御するといったことは、古くから行われている。


### ブラウザ設定

Firefox の about:config や、 Chrome のコマンドラインオプションなど、リファラの送信を制限するオプションを提供するブラウザもある。

また、それらを実現する拡張も存在する。

こうした設定を社内ポリシーとして適用している組織があるかはわからないが、方法としては一番確実だろう。

ただし、 Refere に期待した値が送られることを確認するようなサービスがあった場合に問題となることが想像されるが、現実的にどのくらいあるかは不明だ。


### 社内 Proxy

社内ネットワークに Proxy を立てている場合は、その Proxy で Referer ヘッダを落とす/書き換えるといった運用方法もある。

この場合、あくまで社内から社外に出る Referer だけを落とすため、外にあるサービスに対しての不具合は少ないだろう。

しかし、 HTTPS 化が進んでいる昨今、社内といえども暗号化が行われている場合は少なくないだろう。

証明書の運用次第では暗号化を解くこともできなくないかもしれないが、この方法での運用は難しくなりつつあるのではないかと考える。


### Referrer Policy

そもそもブラウザが自動的に Refferrer を送るという挙動が、コンテンツに合わせて制御できれば、こうした問題は解決する。

そこで、提案されたのが Referrer Policy である。

社内で HTTP サーバを立てる際に、このヘッダを適切に設定することで、意図しない漏洩のリスクを軽減できるだろう。

また、 Origin を軸としたいくつかの設定が可能なため、単純に Referrer を一切無効にすることによる不具合などを防ぐこともできる。


## Referrer-Policy

Referrer-Policy は、ヘッダもしくは HTML の特定の要素、そのページからの遷移に伴う Referer ヘッダを制御するための Policy である。

- <https://w3c.github.io/webappsec-referrer-policy/>

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

ポリシーによっては、 URL 全体ではなく Origin のみを送るものがある。


```http
Referer: https://blog.jxck.io/
```

これなら、どのサイトから来たかはわかるが、どのパスから来たかまではわからないという状態になる。

特に Origin ヘッダが付与される場合は、これと同等の情報が載るため、 Origin ヘッダが送信される状況では Referer を禁止しても同等の情報が送信されていることは認識しておきたい。

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

これを unsafe と言う理由は、 http -> http や https -> http(Downgrade) でも送られるところにある。

平文通信の場合は、先ほどの Proxy のように削除したり、改ざんすることが可能であるためだ。


### origin

送る条件: 必ず送る

送る値: Origin のみ

unsafe-url と同じ条件だが、送る値が Origin のみになる。

Path 以下の情報が送られない点で、漏洩の観点からは情報が絞られているが、平文通信でも送られる点はそのままだ。


### same-origin

送る条件: Same Origin のみ

送る値: URL 全体

Origin が一致した場合だけ URL 全体を送る。

つまり Downgrade では送られないが、 Upgrade でも送られない。

さらに、 http -> http では送られるということになる。


### strict-origin

送る条件: Downgrade 以外

送る値: Origin のみ

`origin` と同じく Origin の情報のみを送るが、 Downgrade の場合だけ送らない。

つまり以下のようになる。

- https -> https: 送る
- https -> http : 送らない
- http  -> https: 送る
- http  -> htto : 送る


### no-referrer-when-downgrade (default)

送る条件: Downgrade 以外

送る値: URL 全体

条件は strict-origin と同じだが、 URL 全体を送る。

これがブラウザのデフォルトの挙動とされている。


### origin-when-cross-origin

送る条件: Cross Origin の場合

送る値: Origin のみ

送る条件: Same Origin の場合

送る値: URL 全体

内部遷移では URL 全体を送るが、外に出る場合は Origin のみを送る挙動になる。

Down/Upgrade も Cross Origin 扱いになるため、 Origin のみ送られる。


### strict-origin-when-cross-origin

送る条件: Downgrade の場合

送る値: 無し

送る条件: Cross Origin の場合

送る値: Origin のみ

送る条件: Same Origin の場合

送る値: URL 全体

`orign-when-cross-origin` に Downgrade での送信禁止を追加した挙動となる。

改ざんを避けつつ、内部では URL を送り、外部には Origin だけに制限する。

多くの場合は、この設定が適用できるのが理想だろう。


### 空文字列

Policy を指定しないことを意味する。

より上位の指定内容か、 User Agent のデフォルトが反映される。


## Referrer-Policy の適用方法

Policy を適用する方法は 4 つある。

優先度順に並べると以下だ。

1. `rel=noreferrer`
1. referrerpolicy 属性
1. `<meta>` の referrer 属性
1. HTTP の Referrer-Policy ヘッダ

<https://html.spec.whatwg.org/multipage/urls-and-fetching.html#referrer-policy-attribute>


### `<a>`, `<area>` の `rel=noreferrer`

`<a>` と `<area>` には `rel=noreferrer` をつけることで、その遷移のリクエストを `no-referrer` の挙動とすることができる。


```html
<a href="https://example.com" rel="noreferrer">
```

値が違うのは Referrer-Policy が策定される前の仕様だからであり、ここに適用できる値は noreferrer のみだ。

なお、この時 `target="_blank"` を使用すると別タブが開き、これは Opener を生成しない。

つまり


```html
<a href="https://example.com" rel="noreferrer" target="_blank">
```

は


```html
<a href="https://example.com" rel="noreferrer noopener" target="_blank">
```

と同じ挙動となる。

参考: [リンクのへの rel=noopener 付与による Tabnabbing 対策 | blog.jxck.io](https://blog.jxck.io/entries/2016-06-12/noopener.html)


### referrerpolicy 属性

`<a>` などに対して referrerpolicy 属性を付与することができる。


```html
<a href="http://example.com" referrerpolicy="origin">
```

値は前述した policy から選んで適用できる。

後述するページ全体への設定より優先されるため、特定のリンクだけ挙動を変えると言った使い方ができる。

また、 markdown から html に変換する CMS などを使っている場合は、ビルド時に外部へのリンクだけ policy をつけると言った使い方ができる。

`<a>` には必ずこの属性をつけるが、 Policy 自体はページ全体のものに準拠したいといった場合は、属性を `""` (空文字) にすれば良い。

<https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-delivery-referrer-attribute>


### `<meta>` の referrer 属性

`<meta>` タグを利用することでページ全体に Policy を適用できる。


```
<meta name="referrer" content="origin-when-cross-origin">
```

CMS のテンプレートに追加するといった適用が考えられる。

なお、 `never` / `default` / `always` といった古い仕様が存在したため、対応表を元に新しい値を指定することが望ましい。

<https://html.spec.whatwg.org/multipage/semantics.html#meta-referrer>


### HTTP Header

レスポンスの HTTP ヘッダで指定することにより、ページ全体に Policy を適用できる。


```http
Referrer-Policy: no-referrer
```

コンテンツに手を入れられない場合や、漏れなく全てのレスポンスに適用したい場合などに利用できる。

<https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-header-dfn>


## 社内サイトへの適用例

漏洩という観点では `no-referrer` が一番安全と言えるだろう。

しかし、運用しているサービスが何らかの形で Referer を見ている場合は問題が出る可能性もある。

Referer 自体は残しつつ外部への流出を制限するという点では

- 基本のポリシーは `strict-origin-when-cross-origin`
- 重要度が高く Origin すら送られて欲しくない場合は `no-referrer` で上書き

といった運用が考えられる。

あとは要件次第だが、現状何も制御していないのであれば `no-referrer-when-downgrade` となっているという点は認識したい。


## 本サイトへの適用

本サイトには漏れて困る URL はない。

また、技術ブログという性質上、外部のリソースを参考としてリンクすることはよくある。

それらリンク先のサイトに対して、どのページからリンクされているのかを隠すつもりもない。

本サイトは HSTS 対応済みであるため、デフォルトの `no-referrer-when-downgrade` では、 HTTP しか提供していないサイトに対しては Referrer が飛ばないことになる。

外部へのリクエストが POST などを利用することもないため、実験も兼ねて `https://blog.jxck.io` の Origin については HTTP ヘッダで `unsafe-url` を適用し様子を観察することとした。

問題があれば、ヘッダを削除することで、デフォルトに戻すこととする。


## Referer or Referrer

本来の英語としては *RefeRRer* が正しいが、 HTTP Header ではスペルミスした *RefeRer* が互換性を保つためそのまま使われている。

しかし、新しく定義された Referre-Policy は、正しいスペルが採用されている。
