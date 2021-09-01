# [cache] 最も勘違いされた `Cache-Control: public` という設定


## Intro

以下のようなレスポンスヘッダを見て何を思うだろうか?


```http
Cache-Control: public, max-age=31536000
```

実はこの場合 `public` には全く意味がなく、不要な設定だ。


## public の誤解

`Cache-Control` には `public` と `private` という、いかにも対をなしていそうな 2 つのディレクティブが定義されている。

通常 Public / Private と聞けば、公開範囲の制御を思い浮かべるのが自然であり、それは `Cache-Control` においても当てはまると言える。

当てはまるのだが、その当てはまり方のイメージが、おそらく多くの開発者が想像しているものとは違うというのがことの発端だと筆者は考えている。

この話をちゃんとすると本一冊書ける。そして、これはその本を書いている中で、絶対に書きたいと思っていたネタの 1 つだが、本がなかなか完成しないのでスピンオフとして小出しにするものだ。したがって、ある程度端折って抜粋する。

まず、仕様を元に少しおさらいをしよう。

ちなみに仕様はもうすぐ改訂されるので、改訂版のドラフトを参照し RFC が出たら置き換える。


### private directive

`private` directive の定義は以下だ。

- https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-18.html#section-5.2.2.7

重要なのは、これがあると *Shared Cache はこのレスポンスをキャッシュできない* という点だ。

これは、 Session Cookie によってパーソナライズされたコンテンツなどが、中間のキャッシュによって Store され、別のユーザにヒットしてしまうのを避けるといった用途になる。(最近では透過 Proxy のような中間キャッシュを意識する場面も減っためあまりピンとこない開発者も多いかもしれない)。

結果として Local Cache Storage (要するにブラウザキャッシュ)にのみ保存しても良いという制限を課しているという点で、まだ用途が想像しやすいだろう。


### public directive

`private` が Local Cache Storage に制限するなら、それ以外に保存する場合が `public` だという理解を、おそらく多くの開発者がしているのだろう。

そもそも、キャッシュしても良いか? は `max-age` が明示されている時点で Yes であり、 `private` で制限されてない以上、 Local か Shared かに関らずどんな Cache Storage もそれをキャッシュすることができる。 `public` など必要ない。

では、 `public` はそもそもなんだったのか? 仕様では以下に定義がある。

- https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-18.html#section-5.2.2.9

ここで重要なのは Heuristic Cache と `Authorization` ヘッダとの存在だ。


### Heuristic Cache

これもよく勘違いされているが、 `Cache-Control` がなくてもブラウザはキャッシュをすることがある。

例えば `Last-Modified` が一年前を示しており、 `Date` が今日だったとすると、少なくとも 1 年は更新されてないことがわかる。


```
HTTP/1.1 200 OK
Last-Modified: ${1年前}
Date: ${今}
```

1 年更新されてないものが、今突然更新される可能性は経験的に低い、という経験則でこのレスポンスを保存しておき、次のリクエストにキャッシュヒットされる。

これを Heuristic Cache と呼び、別にブラウザが勝手にやっているわけでなく仕様上も定義されている挙動だ。

- https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-18.html#section-4.2.2

これを知らないと、 `Cache-Control` をつけてないのだから、キャッシュするやつなどいないだろうという勘違いをしがちだ。実際それがインシデントにつながることもある。

仕様では、推奨地として `Date` - `Last-Modified` の 10% 程度を目安としているので、それに従うと上の場合 0.1 年 = 36 日程度はこのキャッシュがヒットしても良いことになる。これはあくまで推奨であり、実際のブラウザがどう実装しているかは別の話だ。

ここで、よく教育された Web エンジニアほど、「では実際にブラウザがどう実装しているか?」を気にし出すが、そうではない。

この挙動はあくまで、 `Cache-Control` が存在しなかった時代のコンテンツを効率よく制御するための措置であり、新しく作るコンテンツは明示的に、 `Cache-Control` で明示的にキャッシュのコントロールをするべきなのだ。

「`Cache-Control` はキャッシュさせるためにつける」という理解は半分正しい、が Web はキャッシュと親和性が高いモデルになっているため、基本はキャッシュが自動で行われる。 `Cache-Control` はむしろそこからオプトアウトし、「意図しないキャッシュが行われない」ために明示的な指定を行うというニュアンスが本来は強いと言える。


### Authorization とキャッシュ

`Authorization` ヘッダは OAuth などで触れる機会があるかもしれないが、この仕様はもっと前の Basic 認証を暗黙的に指している。

Basic 認証は、もはやあまり使われる機会がないかもしれないが、 Web が標準で持つ認証方式により、ざっくり言えばヘッダを付与するだけで URL に対して認証が可能になる。 Cookie すら不要だ。

例えば、制限を掛けたメンバーにのみアカウントを配布し、そのアカウントでしか閲覧できないようにする用途で使われ、例えば W3C のサイトではいまだにその用途で使われたりしている。(これもまた触れる機会が少ないとは思うが)

制限されたメンバーにしかアクセスできないのであれば、それが共有キャッシュに保存されると困るだろう。そこで `Authorization` ヘッダがある場合は Heuristic Cache がされないよう、特別扱いされるように定義されている。

- https://www.ietf.org/archive/id/draft-ietf-httpbis-cache-18.html#section-3.5

これによって `Cache-Control` がなくても `Authorization` ヘッダがあるレスポンスは誰かにキャッシュされることがないのだ。


## つまり `public` とは

`public` は、  *Basic 認証で保護された Authorization ヘッダ付きレスポンスであるが Heuristic Cache してもよい* という用途で効果を発揮する。

仕様にもあるように、元々の用途がほぼこれだったが、今はアルゴリズムになっているため、もちろん他のルートも見つかるかもしれない。

しかし、逆に `Authorization` ヘッダがついているものをキャッシュしたいのであれば、明示的に `max-age` や `private` をつければ良いだけであり、あえて Heuristic Cache を積極的に狙う必要もなり。

だからこそ、もはや Basic 認証の対象であろうとも、 `public` を積極的に付ける必要もない。

ましてや、 Public CDN にデプロイした JS のライブラリやら、 font セットなどに対して、 `public` をつける必要など本来は皆無だ。

同一サイト内でも、 `private` の逆の意図で `public` を付けるのは、単にバイト数の無駄でしかない。

`max-age` は何よりも明示的な指定だ。キャッシュを制御する場合、これがついていれば適切にキャッシュが行われる。それで必要十分だ。


```http
Cache-Control: max-age=31536000
```


## Real World public

バイト数の無駄でしかないのに、 IETF で HTTP working group の Chair をしている Fastly の mnot の調査によれば、「`public` がついているレスポンスの 93% に `max-age` か `s-maxage` がついている」という報告がある。

> The popularity of public isn't surprising either, but it does illustrate how prevalent misconceptions about this directive are. 97.3% of responses containing it have max-age or s-maxage too, making it redundant (unless HTTP authentication is in use, or in cases where the status code doesn't allow heuristic freshness). As a result, almost all instances of Cache-Control: public are just wasting response bytes; caches don't need it to store them.
> public の人気は驚くべきものではありませんが、このディレクティブに関する誤解がいかに広まっているかを示しています。このディレクティブを含むレスポンスの 97.3% は max-age または s-maxage を含んでおり(HTTP 認証が使用されている場合や、ステータスコードが Heuristic Cache を許可していない場合を除き)このディレクティブは冗長です。結果として、 Cache-Control: public のほとんどすべてのインスタンスは、レスポンスのバイト数を無駄にしているだけであり、キャッシュがそれを保存する必要はありません。
--- https://www.fastly.com/blog/cache-control-wild

レスポンスのステータスコードによって Heuristic Cache ができない場合も `public` で上書きできることも確かにあるが、大抵の場合そこまで意図してヘッダを使い分けられる開発者が明示的に `max-age` などを使わない理由もないので無視して良いだろう。

皮肉なのは、そんな Fastly のドキュメントでも `public` が以下のように書かれていることだ。

> Cache-Control: public - どのキャッシュもコンテンツのコピーを保存できます。
> Cache-Control: public, max-age=[seconds] - キャッシュはこのコンテンツを n 秒間保存することができます。
--- https://docs.fastly.com/ja/guides/how-caching-and-cdns-work

英語版も見たが同じなので、翻訳のせいというわけでもなさそうだ。そして、その下に Cache Control のチュートリアルとしてリンクされているのが mnot のサイトで、そこには正しい解説が書かれている。

> public - marks authenticated responses as cacheable; normally, if HTTP authentication is required, responses are automatically private.
--- https://www.mnot.net/cache_docs/#CACHE-CONTROL

mnot もあきらめているのかもしれない。


## QPACK

これを踏まえ、キャッシュヘッダを正しく理解して `public` を消すべきかというと、まあどっちでも良いというのが本音でもある。`max-age` が一緒についているなら、どちらにせよそちらが強いため、バイト数の無駄だが、それ以上に困る副作用はあまりないのが実際だからだ。(無いかどうかは実装とコンテンツの内容次第なので保証はない)

そして、もう 1 つ、残念というか妥当というか困ったことというか、 QPACK の Static Header の静的ヘッダのエントリが以下のように提案されている。

- https://www.ietf.org/archive/id/draft-ietf-quic-qpack-21.html#section-appendix.a

これを解説すると長くなるから端折るが、要するに HTTP3 では、ここにあるヘッダと同じであれば数バイト程度で転送できるということだ。

ここから、 `Cache-Control` に関するエントリを抜粋すると以下だ。

|Index | Name        | Value                      |
|:-----|:------------|:---------------------------|
| 36   |cache-control|max-age=0                   |
| 37   |cache-control|max-age=2592000             |
| 38   |cache-control|max-age=604800              |
| 39   |cache-control|no-cache                    |
| 40   |cache-control|no-store                    |
| 41   |cache-control|public, max-age=31536000    |


このリストは仕様策定の段階で、インターネット上の実トラフィックから、頻出するヘッダの値を取り出したものなので、使われているからこそ追加されてしまったのは仕方がない。

追加したドラフト著者がこのヘッダの意味に気づいてないとは想像し難いし、 mnot もこの事実を見落としているとは考えにくい。わかった上でこの表は定義されている。

もしこの値から `pubic` を消したところで、多くのサービスがそれに追従して実装を更新するとは望むべくもないし、であればより多くのヘッダが圧縮されることを選ぶのは妥当だ。 IETF においては Running Code の重要度は高い、これもまたインターネットらしいものの決め方と言える。

これがこのまま標準化されれば、ここにある値から選ぶのは転送効率上理にかなっていることになるため、 Versioning などによって永続キャッシュ可能な Public CDN などにおいては、これからも「誤解された妥当な値」として以下の値が使われていくのだろう。


```http
Cache-Control: public, max-age=31536000
```


## Outro

逆を言えば `max-age=31536000` でない場合はその限りではない。 `public` が無いとダメだという勘違いから、`max-age=31536000` を選ぶ理由も無いことは注意したい。

まあ、通常 `max-age` を付与する場合は Version や Hash の付与による Cache Busting がほぼ必須であり、ブラウザのキャッシュストレージが有限でユーザがサイトをめぐるたびにローカルのキャッシュは LRU により更新されていることを考えると、 `max-age` が 3 ヶ月だろうが 1 年だろうが実質大差はない。

というのを踏まえて、何を選ぶのか。もしかしたら我々は試されているのかもしれない。


## DEMO

特になし。


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
