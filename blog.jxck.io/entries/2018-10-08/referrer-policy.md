# [referrer-policy][referer][http] Referrer-Policy によるリファラ制御

## Intro

リファラはリンクなどでページを遷移する際に、遷移元の URL をリクエストの Referer ヘッダに載せる仕様である。

この付与はブラウザが自動で行うため、場合によっては非公開として扱っている URL が意図せず漏れることがある。

この挙動を制御することができる、 Referrer-Policy ヘッダについて解説する。


## Referer or Referrer

本来の英語としては *RefeRRer* が正しいが、 HTTP Header ではスペルミスした *RefeRer* が互換性を保つためそのまま使われている。

しかし、新しく定義された Referre-Policy は、正しいスペルが採用されている。


## Referer ヘッダ

例えば `https://example.com/index.html` に貼られたリンクから `https://blog.jxck.io` に遷移する場合を考える。

そのリクエストには、条件次第で以下のように HTTP Referer ヘッダが含まれる。


```http
GET / HTTP/1.1
Host: blog.jxck.io
Referer: https://example.com/index.html
```

`blog.jxck.io` の管理者は、このリファラを見ることで、 `example.com` に自分のサイトへのリンクが貼られていることを知ることができる。

その性質上、個人情報の観点からこれを好まないユーザもおり、ブラウザには古くから Referer の送信を行わない設定が実装されていることが多い。

また、別途提供される拡張や、今回紹介する Referer Policy によっても、無効に設定することができる。

したがって、 Application Logic の観点からは、 Referer はあくまで補助的な情報として使われること(無くても動く)が望ましい。

用途によっては、別途定義されている Origin ヘッダを見る方が良い場合もある。


## Referer の用途


### 簡易トラックバック

簡易的なトラックバックとして機能するため、アクセスログにこの情報を含むことで、流入元を解析するための情報源として使うのがメジャーなユースケースだろう。

例えば、検索エンジンの検索結果が検索キーワードを URL に含んでいれば、サイトオーナーはどういう検索結果からユーザが遷移してきたかを知ることができる。


```http
Referer: https://search.example.com/q=http+referer+policy
```

Referer が送信された時だけ、そこから付加的な情報を得ることになる。


### CSRF 対策

CSRF 対策の 1 つとして Referer を確認するという方法がある。

しかし、この場合も前述の通り、あくまでも補助的な効果しか得られない場合もある。

また、 Form からの POST を対象とする場合は Origin ヘッダの方が用途として適しているだろう。

ただし、 Origin ヘッダにしても Referer ヘッダにしても、値が予測可能なため、任意のヘッダを含むことが可能な脆弱性が Extension や Plugin で見つかるとバイパスが可能となる。

そうした脆弱性は、残念ながら [最近でも見つかっている](https://insert-script.blogspot.com/2018/05/adobe-reader-pdf-client-side-request.html) ため、いまだに Token ベースの制御が行われている。

(SameSite Cookie などが普及すればこの部分はもっと変わって行くだろうと思われるが、今回は触れない)

一方で、どんなに Token が正しくても Referer が明らかにおかしければ攻撃の可能性もあるため、やはり補助的な情報として採用は可能だ。


### 盗用防止

画像などのサブリソースが直リンクによって無断転載されることを防ぐために、 Referer が他のサイトからのものであればブロックするといった使われ方が存在する。

確実に盗用を防ぐことはできず、あくまで補助的な効果となる。

逆に、 Referer を必須にしてしまうと、 Referer を送らないユーザには、意図したページ上でも画像が表示されないことになるため注意が必要だ。

Origin ヘッダはサブリソースへの GET には [付与されない](https://wiki.mozilla.org/Security/Origin#When_Origin_is_served_.28and_when_it_is_.22null.22.29) ため、代替はできない。


## Referer による情報漏洩

ブラウザが Referer を自動で付与する挙動を意識していないと、意図せず非公開として扱っていた URL が漏れる場合がある。

URL が知られることを望まない例としては大きく以下があるだろう。

- URL を知っている人だけアクセス可能な限定共有 URL
- イントラ(企業内など)に閉じた非公開 URL


### 限定共有 URL の漏洩

身近な例として Private Gist のように、 URL さえ共有すればアクセスできるタイプのサービスがよくある。

こうしたサービは、検索エンジンのクローラなどに対しては robots.txt などで index を拒否している場合が多い。

しかし、 Referer を制御しないと、リンク先に URL が送られ、意図しない人からアクセスされる可能性がある。


### イントラ情報の漏洩

例として、架空の *Example* 社が *Orange* という新プロジェクトを開始した場合を考える。

Orange については、商標の関係もありプレスリリースまでは名前含め非公開だ。

Example 社は社内で Orange プロジェクトに関する情報共有のために、社内ブログやチケット管理などを運用している。

ここで、社内ブログやチケットに誰かのブログへのリンクが貼ってあった場合、そのリンクを踏んだブラウザからのリクエストに、このドメイン名が入った Referer が付与される。


```url
https://orange.trac.example.com/
```

ドメインだけで無く URL エンコードされている日本語が入っている場合もある。


```url
https://ticket.orange.example.com/%7B%E7%A4%BE%E5%93%A1%E5%90%8D%7D/issue/xxxxxx/[%E7%A4%BE%E5%A4%96%E7%A7%98]1%E6%9C%8811%E6%97%A5%E3%81%AE%E3%83%97%E3%83%AC%E3%82%B9%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E5%8E%9F%E7%A8%BF
// https://ticket.orange.example.com/{社員名}/issue/xxxxxx/[社外秘]1月11日のプレスリリース原稿
```

他にも、キーワード検索の結果から外部のページに飛べる場合、検索したキーワードが残る場合もある。


```url
https://intra.orange.example.com/search?q=Apache+CVExxxxx
```

リンクされたブログの持ち主は、たとえそのリンクを辿ってアクセスができないとしても、 Example 社が Orange というプロジェクトをやっていることや、付随する情報が推測できる可能性がある。

よく設計された URL は情報量が多く、多弁だ。


## Referer の制御

こうした理由から、コンテンツに応じて、何らかの形でリファラを制御するといったことは、古くから行われている。


### ブラウザ設定

Firefox の about:config や、 Chrome のコマンドラインオプションなど、リファラの送信を制限するオプションを提供するブラウザもある。

また、それらを実現する拡張も存在する。

これは、組織からの情報漏洩以前に、個人情報の観点から、ユーザの選択肢として古くから実装されていると筆者は認識している。


### 社内 Proxy

社内ネットワークに Proxy を立てている場合は、その Proxy で Referer ヘッダを落とす/書き換えるといった運用方法もある。

この場合、 Referer に社内のドメインがある場合だけ落とすといった実装が可能なため、社外にあるサービスに対しての不具合は少ないだろう。

しかし、 HTTPS 化が進んでいる昨今、実質的に MITM を行なっているこの方法は限界と言える。

証明書の運用次第では暗号化を解くこともできなくないかもしれないが、運用は難しだろう。


### Referrer Policy

そもそもブラウザが自動的に Referer を送るという挙動が、コンテンツに合わせて制御できれば、こうした問題は解決する。

そこで、提案されたのが Referrer Policy である。

社内で HTTP サーバを立てる際に、このヘッダを適切に設定することで、意図しない漏洩のリスクを軽減できるだろう。

また、 Origin を軸としたいくつかの設定が可能なため、単純に Referrer を一切無効にすることによる不具合などを防ぐこともできる。


## Referrer-Policy

Referrer-Policy は、ヘッダもしくは HTML の特定の要素に指定し、そのページからの遷移に伴う Referer ヘッダを制御するための Policy である。

- <https://w3c.github.io/webappsec-referrer-policy/>

執筆時点で、仕様には以下の Policy が定義されている。

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
Referer: https://blog.jxck.io/entries/2018-10-08/referrer-policy.html
```

ポリシーによっては、 URL 全体ではなく Origin のみを送るものがある。


```http
Referer: https://blog.jxck.io/
```

どのサイトから来たかはわかるが、それ以上の情報は載らないという状態になる。

これは Origin ヘッダが付与する情報と同等であり、 *Origin ヘッダが送信される状況では Referer を禁止しても同等の情報が送信されている* ことは認識しておきたい。

以上を踏まえて、それぞれ解説していく。


### no-referrer

送る条件
: 一切送らない

Referer ヘッダそのものが省かれるため、情報の漏洩の観点から言うと一番安全ではある。

しかし、同じサイト内でも送られなくなるため、 Referer をベースとした検証がどこかに入っている場合は問題になる。

社内ドメイン内の遷移でも送られなくなるので、内部での遷移についてもメトリクスを取りたい場合を考えると制限が強い。

また、 Referer ヘッダは消えるが Origin ヘッダは残る点は意識しておきたい。


### unsafe-url

送る条件
: 必ず送る

送る値
: URL 全体

Referer ヘッダに URL 全体を載せ、必ず送る。

これを unsafe と言う理由は、 http -> http や https -> http(Downgrade) でも送られるところにある。

平文通信の場合は、先ほどの Proxy のように MITM で削除したり、改ざんすることが可能であるためだ。


### origin

送る条件
: 必ず送る

送る値
: Origin のみ

unsafe-url と同じ条件だが、送る値が Origin のみになる。

Path 以下の情報が送られない点で、漏洩の観点からは情報が絞られているが、平文通信でも送られる点はそのままだ。


### same-origin

送る条件
: Same Origin のみ

送る値
: URL 全体

Origin が一致した場合だけ URL 全体を送る。

つまり Downgrade では送られないが、 Upgrade でも送られない。

さらに、 http -> http では送られるということになる。


### strict-origin

送る条件
: Downgrade 以外

送る値
: Origin のみ

`origin` と同じく Origin の情報のみを送るが、 Downgrade の場合だけ送らない。


### no-referrer-when-downgrade (default)

送る条件
: Downgrade 以外

送る値
: URL 全体

条件は strict-origin と同じだが、 URL 全体を送る。

これがブラウザのデフォルトの挙動とされている。


### origin-when-cross-origin

送る条件
: Cross Origin の場合

送る値
: Origin のみ

送る条件
: Same Origin の場合

送る値
: URL 全体

内部遷移では URL 全体を送るが、外に出る場合は Origin のみを送る挙動になる。

Down/Upgrade も Cross Origin 扱いになるため、 Origin のみ送られる。


### strict-origin-when-cross-origin

送る条件
: Downgrade の場合

送る値
: 無し

送る条件
: Cross Origin の場合

送る値
: Origin のみ

送る条件
: Same Origin の場合

送る値
: URL 全体

`orign-when-cross-origin` に Downgrade での送信禁止を追加した挙動となる。

改ざんを避けつつ、内部では URL を送り、外部には Origin だけに制限する。

多くの場合は、この設定が適用できるのが理想だろう。

なお、前述した Private Gist はこれを適用している。


### 空文字列

Policy を指定しないことを意味する。

より上位の指定内容か、 User Agent のデフォルトが反映される。


### Policy のまとめ

表にまとめるとこうなる

| Policy                           | Condition       | Value   |
|:---------------------------------|----------------:|--------:|
| noreferrer                       | 必ず            | 無し    |
| unsafe-url                       | 必ず            | URL     |
| origin                           | 必ず            | Origin  |
| same-origin                      | Same Origin     | URL     |
| strict-origin                    | Downgrade 以外  | Origin  |
| no-referrer-when-downgrade       | Downgrade 以外  | URL     |
| origin-when-cross-origin         | Cross Origin    | Origin  |
| origin-when-cross-origin         | Same Origin     | URL     |
| strict-origin-when-cross-origin  | Downgrade       | 無し    |
| strict-origin-when-cross-origin  | Cross Origin    | Origin  |
| strict-origin-when-cross-origin  | SameO rigin     | URL     |



## Referrer-Policy の適用方法

Policy を適用する方法は 4 つある。

優先度順に並べると以下だ。

1. `rel=noreferrer`
1. referrerpolicy 属性
1. `<meta>` の referrer 属性
1. HTTP の Referrer-Policy ヘッダ

仕様: <https://html.spec.whatwg.org/multipage/urls-and-fetching.html#referrer-policy-attribute>


### `<a>`, `<area>` の `rel=noreferrer`

`<a>` と `<area>` には `rel=noreferrer` をつけることで、その遷移のリクエストを `no-referrer` の挙動とすることができる。


```html
<a href="https://example.com" rel="noreferrer">
```

値が違うのは Referrer-Policy が策定される前の仕様だからであり、ここに適用できる値は `noreferrer` のみだ。

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

参考: [リンクのへの rel=noopener 付与による Tabnabbing 対策 \| blog.jxck.io](https://blog.jxck.io/entries/2016-06-12/noopener.html)


### referrerpolicy 属性

`<a>` などに対して referrerpolicy 属性を付与することができる。


```html
<a href="http://example.com" referrerpolicy="origin">
```

値は前述した policy から選んで適用できる。

後述するページ全体への設定より優先されるため、特定のリンクだけ挙動を変えると言った使い方ができる。

つまり、 markdown から html に変換する CMS などを使っている場合は、ビルド時に外部へのリンクだけ policy をつけると言った使い方ができる。

`<a>` には必ずこの属性をつけるが、 Policy 自体はページ全体のものに準拠したいといった場合は、属性を `""` (空文字) にすれば良い。

仕様: <https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-delivery-referrer-attribute>


### `<meta>` の referrer 属性

`<meta>` タグを利用することでページ全体に Policy を適用できる。


```
<meta name="referrer" content="origin-when-cross-origin">
```

サーバ指定だと影響範囲が大きい場合に CMS のテンプレートに追加するといった適用が考えられる。

なお、 `never` / `default` / `always` といった古い仕様が存在したため、対応表を元に新しい値を指定することが望ましい。

仕様: <https://html.spec.whatwg.org/multipage/semantics.html#meta-referrer>


### HTTP Header

レスポンスの HTTP ヘッダで指定することにより、ページ全体に Policy を適用できる。


```http
Referrer-Policy: no-referrer
```

コンテンツに手を入れられない場合や、漏れなく全てのレスポンスに適用したい場合などに利用できる。

仕様: <https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-header-dfn>


## DEMO

動作する DEMO を以下に用意した。

- <https://labs.jxck.io/referrer-policy/>


## 本サイトへの適用

本サイトには漏れて困る URL はない。

また、技術ブログという性質上、外部のリソースを参考としてリンクすることはよくあり、それらリンク先のサイトに対して、どのページからリンクされているのかを隠すつもりは無い。

Cross Origin で URL 全体を送るのは `unsafe-url` か `no-referrer-when-downgrade` であり、その差は Downgrade の扱いになる。

本サイトは HSTS 対応済みであるため、 `no-referrer-when-downgrade` では、 HTTP しか提供していないサイトに対しては Referrer が飛ばないことになる。

しかし、近年の動向からも、リンクする先が HTTPS に対応している方が本サイトとしても望ましいため、 `no-referrer-when-downgrade` を採用することにした。

この Policy はブラウザのデフォルトとされているため、明示的な Referrer-Policy Header の追加は行わないこととする。
