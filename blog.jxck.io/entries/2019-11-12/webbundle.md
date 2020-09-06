# [cbor][webbundle][webpackaging] WebBundle によるコンテンツの結合と WebPackaging


## Intro

依存コンテンツを 1 つにまとめて配信する WebBundle の仕様策定と実装が進んでいる。

これは Signed HTTP Exchange と合わせて WebPackaging を実現するための仕様であり、組み合わせれば WebBundle に対して署名することでコンテンツの配信を通信と分けて考えることができる。

Signed HTTP Exchange に比べると格段に簡単な仕様なので、現状のフォーマットと挙動について解説する。

- [draft-yasskin-wpack-bundled-exchanges-latest](https://wicg.github.io/webpackage/draft-yasskin-wpack-bundled-exchanges.html)


## WebBundle

かつて Bundled HTTP Exchanges と呼ばれていた仕様であり、複数のコンテンツを 1 つにまとめ、配信することができる。

例えば index.html とそれが依存する css/js/favicon etc を 1 つのファイルで配信しブラウザ上ではそれぞれの URL から取得したように展開することができる。

WebPackaging の文脈では、以前解説した Signed HTTP Exchanges によって署名をすることで、そのコンテンツの物理的な URL と論理的な URL を差し替えて表示することができた

- [WebPackaging の Signed HTTP Exchanges \| blog.jxck.io](https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.html)

要するに AMP の URL を AMP Cache から取得しつつ、自分の URL で表示するというアレだ。

Signed HTTP Exchange は単一の Response に対する署名であるため、 WebBundle でサブリソースを 1 つにまとめてから署名をすれば、サブリソースも合わせて配信できるというモチベーションがある。

例えばこのページ `https://blog.jxck.io/` のページを WebBundle でまとめ、署名する。

それを USB, Bluetooth, AirDrop, WebShare など、任意の方法で取得し、 `file:///` でブラウザに表示すると、 URL バーには `https://blog.jxck.io` で表示されるというのがゴールだ。

Signing には、拡張に対応した証明書が必要で、今は有料でしか手に入らない。

しかし WebBundle は無料で試すことができるため、今回は WebBundle のみを対象とする。


## draft-yasskin-wpack-bundled-exchanges-latest

WebBundle の仕様は非常にシンプルだ。

例として、仕様をもとに以下のような構成のページを Bundle してみる。

- http://localhost.jxck.io:3000
  - index.html
  - script.js
  - style.css
  - favicon.ico


### CBOR

IETF のフォーマットといえば、 TLV (Type-Length-Value) 形式で定義される場合が多い。

しかし、この仕様はシリアライズを全面的に CBOR に移譲している。

CBOR はざっくりいうと JSON のバイナリ版なので、プログラミング上は JSON のような構造体で表現し、それを Encoder に渡すといった感じになるだろう。

したがて、 CBOR の実装さえ手元にあれば、ほとんど終わる。

CBOR の実装は TLV でいくつかの型をシリアライズするが、ストリーミング対応などをサボれば実装はそこまで難しくない。


### CDDL

WebBundle のフォーマットは、 CBOR のスキーマ定義である CDDL で表現されている。

特に仕様を読まなくても、見れば雰囲気でわかるだろう。


```cddl
webbundle = [
  ; 🌐📦 in UTF-8.
  magic: h'F0 9F 8C 90 F0 9F 93 A6',
  version: bytes .size 4,
  primary-url: whatwg-url,
  section-lengths: bytes .cbor [* (section-name: tstr, length: uint) ],
  sections: [* any ],
  length: bytes .size 8,  ; Big-endian number of bytes in the bundle.
]

$section-name /= "index" / "manifest" / "signatures" / "critical" / "responses"

$section /= index / manifest / signatures / critical / responses

index = {* whatwg-url => [ variants-value, +location-in-responses ] }

variants-value = bstr

location-in-responses = (offset: uint, length: uint)

manifest = whatwg-url

responses = [*response]

response = [headers: bstr .cbor headers, payload: bstr]

headers = {* bstr => bstr}

critical = [*tstr]

whatwg-url = tstr
```


### magic

最初は地球(GLOBE WITH MERIDIANS)と箱(PACKAGE)の絵文字の UTF-8 をマジックナンバーとして使っている。

しかし、すでに CBOR の中にあるため、ファイルの最初のバイトが地球になるわけではない。

最初は、全体が CBOR の Array で、その要素数が 6 と決まっており、 magic は String のヘッダに続くので、最初の 10 byte が固定値になる。


```
[0x86, 0x48, 0xF0, 0x9F, 0x8C, 0x90, 0xF0, 0x9F, 0x93, 0xA6]
```

つまり、最初の 10byte を見れば、そのファイルが WebBundle であることが判定できる。

ただし、見ているのが version の手前までで、将来に全体の配列要素が増える変更(例えば sections と length の間に extension が増えるなど)があると、ここが非互換になるのは少し[気になっている](https://github.com/WICG/webpackage/issues/528)。


### version

4byte のバージョンであり、 仕様では `1` が入る。

だが、執筆時の Chrome は `b1` が入るようだ。


### primary-url

これがこのファイルの URL となる。

もしファイルが展開できなかった場合、ブラウザはフォールバックとしてこの URL へ実際にリクエストを行う。


### section

CBOR のメインとなるデータが section であり、 section にはいくつかの種類がある。

- "index"
- "manifest"
- "signatures"
- "critical"
- "responses"

つまり、単にレスポンスをまとめるだけではなく、他の情報も入れられる。

普通こうした type には、 8bit の id を割り当てて領域を節約したりするが、単純な文字列を使っている。

容量よりも、拡張や実装のしやすさが選ばれているようだ。


### section-length

section-length には、それぞれの section 長さが書かれているため、特定の section にアクセスしたい場合、そこまでジャンプすることができるようになっている。

今回は、 "index" と "response" しか使わないため、以下のようになる。


```json
["index",188,"responses",1268]
```

ページ全体をまとめる場合、ファイル全体が大きくなることが容易に想像できるため、先頭からのシーケンシャルアクセスではなく、必要な部分へのインデックスアクセスを可能にしている。


### index

responses section には、複数の Response が含まれる。その個々の Response の場所を示すのが index だ。

今回の場合、具体的には以下のようになる。


```json
{
  "http://localhost.jxck.io:3000/":            [[],   1, 396],
  "http://localhost.jxck.io:3000/script.js":   [[], 397, 267],
  "http://localhost.jxck.io:3000/style.css":   [[], 664, 275],
  "http://localhost.jxck.io:3000/favicon.ico": [[], 939, 329]
}
```

各 URL に対応する Response が、 responses セクションのどこ(offset)からどこ(length)までに入っているかを示している。

また、最初の `[]` にはヘッダで示されるバリエーションが含まれる。

例えば、多言語対応しており Content-Language が "en" と "ja" で、中身が変わる HTML がある場合、それらを区別でき、クライアントは展開時に必要なものを選ぶことができる。

さらに Content-Encoding が "gz" "br" とあった場合には、そこで 4 通りの組み合わせがあるため、ここにその組み合わせが入ることになる。

(仕様には、それを見る側のクライアントの挙動は書かれているが、サーバでどう生成するかといった部分は特に書かれてないため、雰囲気で入れる。)


```json
{
  "http://localhost.jxck.io:3000/": [["ja;gz"],   1, 100],
  "http://localhost.jxck.io:3000/": [["ja;br"], 101, 100],
  "http://localhost.jxck.io:3000/": [["en;gz"], 201, 100],
  "http://localhost.jxck.io:3000/": [["en;br"], 301, 100],
}
```

ただ、 WebBundle のなかに gz や br といった同じコンテンツの圧縮タイプ違いを同居させるメリットはあまり無いように思う。

すると、多言語対応の Content-Language ベースのものになるが、 Content-Language ヘッダを付けているサービスはあまり多くないのでコンテンツの中を見ないと作るのが難しい気がする。


### responses

index で示された位置個々の Response が入る。

Response は Header と Body の配列からなる。


```json
[ [header1, body1],
  [header2, body2],
  [header3, body3]
  //..
]
```

Header は CBOR でデシリアライズすると Map になる、つまり必要になってからパースすれば良い仕様だ。

Body はそのまま byte string で入っている。

このあたりも、 Web Bundle を構成する response が増えても効率よく特定の response にアクセスできるように作られている。

これが、単純な zip などといった既存仕様ではなく、新たに Web Bundle が定義された理由でもある。


## length

最後に全体の長さが 64 bit で入っている。

通常の TLV 形式なら、長さはヘッダ部に来るが、最後に長さを入れると末尾追記とそこまでの再署名などが容易になる。

zip や Electron の ASAR のように末尾にする[要望](https://github.com/WICG/webpackage/issues/20)がありこうなった。


### 全体

結果としては、だいたいこんな感じで組み立てた構造体を、 CBOR の実装でエンコードすれば WebBundle になる。


```js
[
  "🌐📦",
  ["b","1",0,0],
  "http://localhost.jxck.io:3000/",
  ["index",188,"responses",1268]
  [
    {
      "http://localhost.jxck.io:3000/":            [[],   1, 396],
      "http://localhost.jxck.io:3000/script.js":   [[], 397, 267],
      "http://localhost.jxck.io:3000/style.css":   [[], 664, 275],
      "http://localhost.jxck.io:3000/favicon.ico": [[], 939, 329]
    }
    [
      [
        {
          ":status":        "200",
          "content-length": "154",
          "content-type":   "text/html",
          "date":           "Mon, 11 Nov 2019 05:50:46 GMT",
          "etag":           "401301-9a-5dc8f6aa",
          "last-modified":  "Mon, 11 Nov 2019 05:50:34 GMT",
          "server":         "WEBrick/1.4.2 (Ruby/2.6.5/2019-10-01) OpenSSL/1.1.1c",
          "x-protocol":     "http"
        }
        "<!DOCTYPE html><meta charset=utf-8><title>DEMO</title><script src=script.js></script><link rel=stylesheet type=text/css href=style.css><h1>Test</h1>"
      ],
      [
        {
          ":status":        "200",
          "content-length": "21",
          "content-type":   "text/javascript",
          "date":           "Mon, 11 Nov 2019 05:50:46 GMT",
          "etag":           "401302-15-5dc8f615",
          "last-modified":  "Mon, 11 Nov 2019 05:48:05 GMT",
          "server":         "WEBrick/1.4.2 (Ruby/2.6.5/2019-10-01) OpenSSL/1.1.1c",
          "x-protocol":     "http"
        },
        "console.log(\"hello\")"
      ],
      [
        {
          ":status":        "200",
          "content-length": "35",
          "content-type":   "text/css",
          "date":           "Mon, 11 Nov 2019 05:50:46 GMT",
          "etag":           "401303-23-5dc8f6a2",
          "last-modified":  "Mon, 11 Nov 2019 05:50:26 GMT",
          "server":         "WEBrick/1.4.2 (Ruby/2.6.5/2019-10-01) OpenSSL/1.1.1c",
          "x-protocol":     "http"
        },
        "body {background-color: #ccc;}"
      ],
      [
        {
          ":status":        "200",
          "content-length": "73",
          "content-type":   "application/octet-stream",
          "date":           "Mon, 11 Nov 2019 05:50:46 GMT",
          "etag":           "8094f-49-5dbb97f5",
          "last-modified":  "Fri, 01 Nov 2019 02:27:01 GMT",
          "server":         "WEBrick/1.4.2 (Ruby/2.6.5/2019-10-01) OpenSSL/1.1.1c",
          "x-protocol":     "http"
        },
        [/*bin of favicon*/]
      ]
    ]
  ],
  <<0,0,0,0,0,0,6,0>>
]
```


### .wbn

あとは、 CBOR でエンコードした結果をファイルに保存すればよい。

拡張子としては `.wbn` が IANA に登録される予定になっている。


## application/webbundle

MIME は `application/webbundle` が登録される予定になっている。

HTTP でサーブする場合は、 Content-Type にこれを付与する。

また、 sniff による脆弱性を防ぐために、最初から nosniff の設定が MUST となっている点も面白い。


```http
Content-Type: application/webbundle
X-Content-Type-Options: nosniff
```


## DEMO

動作するデモを以下に用意した。

http でも wbn をサーブしているが、執筆時の Chrome は `file:///` からの展開にしか対応してないようなので、ローカルにダウンロードしてブラウザで開かないと動かない。

- orig: <http://labs.jxck.io/webpackaging/webbundle/example/index.html>
- .wbn: <http://labs.jxck.io/webpackaging/webbundle/labs.jxck.io.wbn>

Chrome Canary 80.0.3963.0 の挙動は以下のようになる。

![Chrome Canary 80 で WebBundle を展開した devtools のスクリーンショット。ローカルから取得されていることがわかる](webbundle.png#1366x556 'WebBundle DEMO')


## 考察


### bundling の単位

現状の WebBundle は、解説したように Primary URL を起点としたサブリソースの bundling をターゲットとしている。

ところが、筆者が一番期待しているのは、 JS の依存の bundling だ。

例えば npm で package.json に書く module は少数でも、 node_modules には大量のファイルが存在することは周知だろう。

npm はローカルで解決できるのを前提に、小さいモジュールを大量に依存させる substack 由来の設計を良しとしてきたためだ。

これが全て es modules の記法で書かれており、 [import maps](https://wicg.github.io/import-maps/) で解決できるようにすれば、ブラウザでも動くかもしれない。しかし fetch が多くなりすぎる。

すると、ブラウザ内部の IPC 負荷が大きくなり、例え http2 で多重化されると言えども、無視できないオーバーヘッドとなる。

実際に 2017 年に行われた Chrome チームの調査結果では、[100 以上もしくは依存のネストが 5 以上の場合は WebPack の利用を推奨](https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit)と報告されていた。

これは WebPackaging ではなくツールの WebPack であり、すでに広く普及しているため、多くの開発者にとってはそのままでいいという話にはなる。

しかし、現在の Web における JS の依存は、この制限を超えることがしばしばあるため、せっかく仕様も実装も手に入った ES Modules へ移行する妨げになっていた。

結果、 `import` は単に WebPack に向けたアノテーションとしてしか使われてないという非常に残念な現状があり、今も開発者は全体を bundle.js に固めて配布している。(かつ、問題が解決しているため、それで良いと思っている)

ここでもし、例えば npm モジュール単位で依存を .wbn にまとめ、 1 回の fetch で依存をまるごと取得し、かつ展開した全てのファイルを個別に fetch したかのように保存できたらどうだろうか。

普通に `import` を用いたコードを書けるし、別々にキャッシュされればページを跨いだ再利用や、更新による再デプロイも変わってくるだろう。

JS のように依存がなくても、単にまとめられることは、 CSS Sprite(画像のまとめ), WebFont(weight など), Icon(favivcon.ico と apple-touch-cion etc)などにも適用できるのでは無いかと筆者は考えている。

今は、そうした議論よりも先に、当初の目標である AMP のようなケースにフォーカスしていると思うが、ゆくゆくはそういうことに応用できるように、 [feedback](https://github.com/WICG/webpackage/issues/526) を続けたい。


### コンテンツの代理配布

WebBundle と SXG があり、ブラウザが対応すれば、究極的にはコンテンツがどこから来るかは本質的に関係なくなる。

もちろん、どこかにドメインを解決した結果の IP で繋がる Origin はあり、そこが一次配信元にはなるが、そこを離れたらコピーでも良い。

この変化が一番利用しやすいのは、トラフィックの制御だ。

AMP Cache から取得したファイルが元の Origin で展開されるというユースケースは、別 AMP Cache である必要はなく、どのサーバ、もっといえばサーバでなくても良い。

これが利用できる場面は多々ある。例えば先月日本を襲った台風のような災害時は、普段アクセスの少ない公共系サイトにトラフィックが殺到し、ダウンしている場面を目にした人も多いだろう。

筆者の周りには、有志でミラーを立てている人もいたが、こうしたミラーには常に改ざんの危険性がつきまとう。

OS などの場合は本家が Hash を掲載し、取得した人が手元で確認する習慣もあるが、一般の Web コンテンツでそれを求めるのは難しい。

もし公共サイトが SXG + WebBundle に対応して入れば、誰もそれを再配布し、展開したブラウザで署名が検証できるため、ミラーリングがしやすくなる。


### コンテンツの保存

同じことを視点を変えれば、 WebArchive.org や Web 魚拓がやっているような、コンテンツのスナップショットアーカイブには、この仕組みが非常に合う。

WebBundle することで、コンテンツの再現性も高まり、署名があれば「改ざん、なりすまし、否認」といったコンテンツにつきまとう問題もある程度改善が期待できる。

個人で、「このサイトは残しておきたい」と行った場合に利用している、「このページを保存」も改善が期待できるだろう。


### 共有キャッシュへの応用

Client から Server に接続するまでの間には、多くの middle box が中継役として介在している。

その中の一部は、 HTTP の仕組みに則った「共有キャッシュ」を提供し、コンテンツを代理配布することで、ネットワークトラフィックの削減に寄与していた。

しかし、近年の HTTPS 化で、 middle box は暗号化されたパケットを素通りさせることしかできず、共有キャッシュのメリットは減りつつある。

確かにプライバシーやセキュリティの観点から、そうであることが望ましい一方で、これだけ中間にサーバがあるのに、それが転送以外一切できない、俗に言う土管の状態でいることは、単純に勿体無いというジレンマもある。

Origin と暗号化した通信にどうやって middle box が共有キャッシュを提供するか、改ざん耐性はあるかもしれないがプライバシーはどうするのか、など多くの問題はあるが、 AMP がやっていることと図の上ではかわらないため、ユーザが合意できる何かしらの仕組みがあれば、不可能ではないだろうと漠然と思っている。


### logging

AMP もそうだが、いよいよサーバにリクエストが来ることを前提にした Acccess Log が限界を迎えつつある。

コンテンツを開いたことを、各位が beacon などで取得している現状があるが、ここがもう少しユーザの裁量(opt-outable)を反映した標準の API になるべきだろうと[常々思っている](https://discourse.wicg.io/t/proposal-html-ping-for-navigation/2839/7)。
