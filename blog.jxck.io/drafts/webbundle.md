# [cbor][webbundle][webpackaging] Web Bundles によるコンテンツの結合と WebPackaging

## Intro

依存コンテンツを 1 つにまとめて配信する、 Web Bundles の仕様策定と実装が進んでいる。

これは Signed HTTP Exchange と合わせて WebPackaging を実現するための仕様であり、組み合わせれば WebBundle に対して署名することでコンテンツの配信を通信と分けて考えることができる。

Signed HTTP Exchange に比べると格段に簡単な仕様なので、現状のフォーマットと挙動について解説する。

- [draft-yasskin-wpack-bundled-exchanges-latest](https://wicg.github.io/webpackage/draft-yasskin-wpack-bundled-exchanges.html)


## Web Bundles

かつて Bundled HTTP Exchanges と呼ばれていた仕様だ。

複数のコンテンツを 1 つにまとめ、配信することができる仕様であり、例えば index.html とそれが依存する css/js/favicon etc を 1 つのファイルで配信しブラウザ上ではそれぞれの URL から取得したように展開することができる。

WebPackaging の文脈では、以前解説した Signed HTTP Exchanges によって署名をすることで、そのコンテンツの物理的な URL と論理的な URL を差し替えて表示することができた

- [WebPackaging の Signed HTTP Exchanges \| blog.jxck.io](https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.html)

要するに AMP の URL を AMP Cache から取得しつつ、自分の URL で表示するというアレだ。

Signed HTTP Exchange は単一の Response に対する署名であるため、 Web Bundle でサブリソースを 1 つにまとめてから署名をすれば、サブリソースも合わせて配信できるというモチベーションがある。

例えばこのページ `https://blog.jxck.io/` のページを Web Bundle でまとめ、署名する。

それを USB, Bluetooth, AirDrop, WebShare など、任意の方法で取得し、 `file:///` でブラウザに表示すると、 URL バーには `https://blog.jxck.io` で表示されるというのがゴールだ。

Signing には、拡張に対応した証明書が必要で、今は有料でしか手に入らない。

しかし Web Bundles は無料で試すことができるため、今回は Web Bundles のみを対象とする。


## draft-yasskin-wpack-bundled-exchanges-latest

Web Bundles の仕様は非常にシンプルだ。

例として、仕様をもとに以下のような構成のページを Bundle してみる。

- http://localhost.jxck.io
  - index.html
  - script.js
  - style.css
  - favicon.ico


### CBOR

IETF のフォーマットといえば、 TLV (Type-Length-Value) 形式で定義される場合が多い。

しかし、この仕様はシリアライズを全面的に CBOR に移譲している。

CBOR はざっくりいうと JSON のバイナリ版といった感じなので、プログラミング上は JSON のような構造体で表現し、それを Encoder に渡せば生成できるといった感じになるだろう。

したがて、 CBOR の実装さえ手元にあれば、ほとんど終わる。

CBOR にはストリーミング対応なども入っているが、 Web Bundle には使わないので、基本的な構造だけ雑に実装しつつ進める。


### CDDL

Web Bundles のフォーマットは、 CBOR のスキーマ定義である CDDL で表現されている。

特に仕様を読まなくても、見ればわかる程度のものなので雰囲気で見ていく。


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

最初は、全体が CBOR の Array で、その要素が 6 と決まっており、 magic は String のヘッダに続くので、最初の 10 byte が以下に固定になる。


```
[0x86, 0x48, 0xF0, 0x9F, 0x8C, 0x90, 0xF0, 0x9F, 0x93, 0xA6]
```

以上より、最初の 10byte を見れば、そのファイルが Web bundle であることが判定できる。

ただし、将来に全体の配列要素が増える変更(例えば sections と length の間に何か増えるなど)があると、ここが非互換になるのは少し気になる。


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

つまり、単にレスポンスをまとめるだけではなく、他の情報も入れられるようになっているのだ。

普通こうした type には、 8bit の値を割り当てて領域を節約したりするが、単純な文字列を使っている。

容量を犠牲にして、拡張や実装のしやすさが選ばれているようだ。 


### section-length

section-length には、それぞれの section 長さが書かれているため、特定の section にアクセスしたい場合、そこまでジャンプすることができるようになっている。

今回は、 "index" と "response" しか使わないため、以下のようになる。


```json
["index",188,"responses",1268]
```

ページ全体をまとめる場合、ファイル全体が大きくなることが容易に想像できるため、このように必要のない部分の処理を飛ばしてアクセスできるようにしている。


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


```json
{
  "http://localhost.jxck.io:3000/": [["ja;gz"],   1, 100],
  "http://localhost.jxck.io:3000/": [["ja;br"], 101, 100],
  "http://localhost.jxck.io:3000/": [["en;gz"], 201, 100],
  "http://localhost.jxck.io:3000/": [["en;br"], 301, 100],
}
```


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


## length

最後に全体の長さが 64 bit で入っている。

通常の TLV 形式なら、長さはヘッダ部に来るが、最後に長さを入れると末尾追記とそこまでの再署名などが容易になる。

zip や Electron の ASAR のように末尾にする[要望](https://github.com/WICG/webpackage/issues/20)がありこうなった。


### 全体

結果としては、だいたいこんな感じで組み立てた構造体を、 CBOR の実装でエンコードすれば Web Bundles になる。


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

あとは、 CBOR でエンコードした結果をフィアルに保存すればよい。

拡張子としては `.wbn` が IANA に登録される予定になっている。


## application/webbundle

MIME は application/webbundle が登録される予定になっている。

HTTP でサーブする場合は、 Content-Type にこれを付与する。

また、 sniff による脆弱性を防ぐために、最初から nosniff の設定が MUST となっている点も面白い。

- Content-Type: application/webbundle
- X-Content-Type-Options: nosniff


## DEMO

以下に動作するデモを用意した。

http でも wbn をサーブしているが、執筆時の Chrome は `file:///` からの展開にしか対応してないようなので、ローカルにダウンロードしてブラウザで開かないと動かない。

- TODO: URL

TODO: screen shot


## bundling の単位

現状の Web Bundles は、解説したように Primary URL を起点としたサブリソースの bundling をターゲットとしている。

ところが、筆者が一番期待しているのは、例えば JS の依存の bundling だ。

例えば npm で package.json に書く module は複数でも、 node_modules には大量のファイルが存在することは周知だろう。

これが全て es modules の記法で書かれており、 [import maps](https://wicg.github.io/import-maps/) で解決できるようにすれば、ブラウザでも動くかもしれない。

ただし npm はローカルで解決できるのを前提に、小さいモジュールを大量に依存させる substack 由来の設計を良しとしてきたが、ブラウザでは fetch が多すぎる。

すると、ブラウザ内部の IPC 負荷が大きくなり、例え http2 で多重化されると言えども、無視できないオーバーヘッドとなる。

実際に 2017 年に行われた Chrome チームの調査結果では、[100 以上もしくは依存のネストが 5 以上の場合は WebPack の利用を強く推奨](https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit)と報告されていた。

これは WebPackaging ではなく、ツールの WebPack であり、すでに広く普及しているため、多くの開発者にとってはそのままでいいという話にはなる。

しかし、現在の Web における JS の依存は、この制限を超えることがしばしばあるため、せっかく仕様も実装も手に入った ES Modules へ以降する妨げになっていた。

結果、 `import` は単に WebPack に向けたアノテーションとしてしか使われてないという非常に残念な現状があり、今も開発者は全体を bundle.js に固めて配布している。

ここでもし、例えば npm モジュール単位で依存を .wbn にまとめ、 1 回の fetch で依存をまるごと取得し、かつ展開した全てのファイルを個別に fetch したかのように保存できたらどうだろうか。

普通に `import` を用いたコードを書けるし、別々にキャッシュされればページを跨いだ再利用や、更新による再デプロイも変わってくるだろう。

JS のように依存がなくても、単にまとめられることは、 CSS Sprite(画像のまとめ), WebFont(weight など), Icon(favivcon.ico と apple-touch-cion etc)などにも適用できるのでは無いかと筆者は考えている。

今は、そうした議論よりも先に、当初の目標である AMP のようなケースにフォーカスしていると思うが、ゆくゆくはそういうことに応用できるように、 feedback していきたいと思っている。
