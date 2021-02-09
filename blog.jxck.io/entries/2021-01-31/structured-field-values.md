# [sfv][http][ietf] Structured Field Values による Header Field の構造化


## Intro

HTTP Header の値を構造化する Structued Field Values の仕様が RFC になった。

- [RFC 8941](https://www.rfc-editor.org/rfc/rfc8941.html)

この仕様の詳細について、筆者の実装を交えて解説する。


## Update

- 2021-02-09: SFV が [RFC 8941](https://www.rfc-editor.org/rfc/rfc8941.html) として公開されたたドラフト 19 を RFC に置き換えて編集


## 経緯


### HTTP ヘッダの構造

HTTP のヘッダは以下のようになっている。


```http
Host: example.com
Set-Cookie: session_id=deadbeef; SameSite=Strict; Path=/; Secure; HttpOnly
Content-Security-Policy:content-security-policy: default-src 'self' https://jxck.io; child-src https://blog.jxck.io; connect-src wss://ws.jxck.io;
Permission-Policy: syncxhr 'none' report-to=default-endpoint
```

HTTP の仕様では、この Header Name と Header Value をパースする部分が標準化されている。

しかし、 Header Value の中身をどうパースするかは、それぞれのヘッダの仕様、ここでいう Cookie, CSP, Permission-Policy によって決められており、そのフォーマットはバラバラだ。

それぞれのヘッダごとに仕様を定義するのも、それぞれパーサを書くのもあまりヘルシーではない。特にブラウザは新しいパーサを実装するとセキュリティ的なリスクがあるため、積極的には入れにくい。

そこで、この構造を共通化する作業として始まったのが Structured Headers だった。


### Headers から Field Values へ

少し脱線するが、 httpbis では、別途並行して HTTP Semantics という仕様を策定している。(RFC 目前の仕様だ)

- [draft-ietf-httpbis-semantics-14 - HTTP Semantics](https://tools.ietf.org/html/draft-ietf-httpbis-semantics-14)

HTTP 1.x 系のプロトコルは、パケットのフォーマットとセマンティクスが密結合なところがあったが、 HTTP2 や 3 ではバイナリフォーマットが使われるようになった。

そこで、 HTTP プロトコルが備えていたセマンティクス(意味)と転送方法をきちんと分離し、セマンティクスだけを取り出したのが HTTP Semantics の仕様となる。

このなかで、これまで慣習的に *HTTP Header* などとと呼ばれていたプロトコル上のメタデータを表現するパートも、 *Field* と呼ばれるように更新された。

いわゆるヘッダは、必ずしも Header (Body より上)にあるとは限らず、 Streaming などでは Trailer(Body より下)にある場合もあることから、上部にあれば Header Field 、下部にあれば Trailer Field で、共通して Field になる。

Field はさらに Field Name / Field Value から構成されるため、従来のように Header Name / Header Value という呼び方も更新されることになる。

話を戻して今回 *Structured Header* として始まった改善は、この方針に則ると *Structured Field Values* になるため、途中からドラフトの名前も変わっている。

古い情報では Structured Header で残っているものもあるだろうが、そういう経緯だ。


### JSON Encoding for Field Values (JFV)

既存のパーサを流用するという点で、わかりやすい方法の一つが Field Value を JSON にしてしまうという方針だ。

- [draft-reschke-http-jfv-12 - A JSON Encoding for HTTP Header Field Values](https://tools.ietf.org/html/draft-reschke-http-jfv-12)

これは、ドラフト段階からいくつかの新しい Field 定義によって使われている。例えば Network Error Logging や Reporting API だ。


```http
NEL: {"report-to": "default-endpoint", "max-age": 2592000}
Report-To: {
             "group": "default-endpoint",
             "max-age": "36000",
             "endpoints": [
               {"url": "https://report-uri.example.com"},
               {"url": "https://report-uri2.example.com"}
             ]
           }
```

しかし、これでは問題があることが指摘され、代替として提案されたのが Structured Field Values だ。

なぜ JSON じゃだめなのかは、 Structured Field Values の中に書かれている。

- [Structured Field Values for HTTP # Why Not JSON ?](https://www.rfc-editor.org/rfc/rfc8941.html#name-why-not-json)
- [翻訳: なぜ JSON じゃない?](https://triple-underscore.github.io/http-header-structure-ja.html#why-not-json)

詳細は原文にゆずるが、すでに汎用フォーマットとして使われている JSON をそのまま Field に応用はできないが、そこに制限を設けて注意喚起しても、実装も運用も追いつかないということだ。

JSON っぽいフォーマットだと、どうしても既存の JSON 実装が流用されることが想定されるため、 Field の要件に準拠した新しいフォーマットを作り、新しい実装を作ることで要件を満たすことになった。


## Structured Field Values

こうして、 Field の Value に Structured を持ち込むために提案された JSON ではない新しいフォーマットが Structured Field Values(以下 SFV) だ。

SFV には大きく 3 つの構造が定義されており、それを利用して Field に必要な情報を構造化する。

- Item: 単体の情報
- List: Item の配列
- Dict: Key-Value 形式で Value が Item


### Item

Item には Value と Parameter がある。


### Value

サポートされているのは以下。

| Type       | Value         | SFV     |
|:-----------|:--------------|:--------|
| Integer    | 10            | 10      |
| Decimal    | 3.14          | 3.14    |
| String     | "hello"       | "hello" |
| Token      | x             | x       |
| Byte Seq   | [0x1,0x2,0x3] | :AQID:  |
| Boolean    | true          | ?1      |


Token が文字列とは別に定義されているため、実装する言語によっては設計に悩む(JS 実装では Symbol を使っている)。


### Parameter

Parameter は Item に付与できるメタデータだ。

例えば以下は String の "abc" に対してパラメータを 2 つ付与している。


```js
// "abc";a=1;b=2
{
 "value": "abc",
 "params": {
  "a": 1,
  "b": 2
 }
}
```

データ表現には基本的に Key/Value/Metadata の 3 つがあることが望ましい。

例えば XML/HTML のようなフォーマットは Attribute がメタデータを担うが、これを再現可能になる。


```html
<p id="foo" class="bar">hello</p>
```


```js
// p="hello world";id="foo";class="bar"
{
 "p": {
  "value": "hello world",
  "params": {
   "id": "foo",
   "class": "bar"
  }
 }
}
```

これは、 Key/Value だけしかない JSON では表現しにくかった部分でもある。


### List

Item の配列。


```js
// 1,2,3,4
[
 { "value": 1, "params": {} },
 { "value": 2, "params": {} },
 { "value": 3, "params": {} },
 { "value": 4, "params": {} }
]
```


### Dict

Key に紐付けた Item の辞書。

Key は Item ほど柔軟ではなく、文字列で使える文字種も限られている。。


```js
// a=10,b=20,c=30
{
 "a": { "value": 10, "params": {} },
 "b": { "value": 20, "params": {} },
 "c": { "value": 30, "params": {} }
}
```


### Inner List

List や Dict の値として配列を使いたい場合は、 Inner List を使う。(List そのものは Top Level でしか使えない)


```js
// a="x", d=(1 2)
{
 "a": { "value": "x", "params": {} },
 "d": {
  "value": [
   { "value": 1, "params": {} },
   { "value": 2, "params": {} }
  ],
  "params": {}
 }
}

// "a", "b", (1 2)
[
 { "value": "a", "params": {} },
 { "value": "b", "params": {} },
 {
  "value": [
   { "value": 1, "params": {} },
   { "value": 2, "params": {} }
  ],
  "params": {}
 }
]
```


### 注意

その Field が Item/List/Dict どれでエンコードされているかは事前の知識が必要だ。

例えば SFV を採用している Client Hints の `Accept-CH` は、 List でエンコードすると仕様側で決まっている。

従って `Accept-CH` を受け取ったら `decodeList(value)` でパースするといった処理を書くことになるだろう。

これは、 Field 値を入れればなんかしらデコードされて出てくる `decode()` を定義することはできないことを意味する。

Dict としてパースしてエラーになったら List で、、などはできなくはないが、それは非効率だ。

通常、そうした場合は最初の一文字を見た時点で Item/List/Dict どれなのかを判定できるようにするが、この仕様はそうはなってない。

もし、自分が独自ヘッダで SFV を採用する際は、その点に注意する必要がある。

同じヘッダ名なのに Dict/List がバラバラだとパースできないし、もし Item だったのを List に変えるなどすると breaking change になる。


## 対応仕様

すでに SFV を用いて策定されている仕様も複数ある。

- [draft-ietf-httpbis-client-hints-15 - HTTP Client Hints](https://tools.ietf.org/html/draft-ietf-httpbis-client-hints-15)
- [draft-ietf-httpbis-cache-header-07 - The Cache-Status HTTP Response Header Field](https://tools.ietf.org/html/draft-ietf-httpbis-cache-header-07)
- [draft-ietf-httpbis-digest-headers-04 - Digest Headers](https://tools.ietf.org/html/draft-ietf-httpbis-digest-headers-04)
- [draft-ietf-httpbis-proxy-status-02 - The Proxy-Status HTTP Response Header Field](https://tools.ietf.org/html/draft-ietf-httpbis-proxy-status-02)
- [draft-ietf-httpbis-variants-06 - HTTP Representation Variants](https://tools.ietf.org/html/draft-ietf-httpbis-variants-06)
- [draft-ietf-httpbis-message-signatures-01 - Signing HTTP Messages](https://tools.ietf.org/html/draft-ietf-httpbis-message-signatures-01)

いずれもドラフトだが、実例の雰囲気がわかるよう参考として引用する。

特に httpbis の新しい仕様は基本的に SFV を使っていくことになるため、今後触れる機会も増えるだろう。


### Client Hints


```js
// Accept-CH: Sec-CH-Example, Sec-CH-Example-2
[
 {
  "value": "Symbol(Sec-CH-Example)",
  "params": {}
 },
 {
  "value": "Symbol(Sec-CH-Example-2)",
  "params": {}
 }
]
```


### Cache-Status


```js
// Cache-Status: OriginCache; hit; ttl=1100; collapsed, "CDN Company Here"; hit; ttl=545
[
 {
  "value": "Symbol(OriginCache)",
  "params": {
   "hit": true,
   "ttl": 1100,
   "collapsed": true
  }
 },
 {
  "value": "CDN Company Here",
  "params": {
   "hit": true,
   "ttl": 545
  }
 }
]
```


### Digest Headers


```js
//  Digest: sha-256=4REjxQ4yrqUVicfSKYNO/cF9zNj5ANbzgDZt3/h3Qxo=, id-sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=
(TODO: パースできないので報告)

// Want-Digest: sha-256;q=0.3, sha;q=1
[
 {
  "value": "Symbol(sha-256)",
  "params": {
   "q": 0.3
  }
 },
 {
  "value": "Symbol(sha)",
  "params": {
   "q": 1
  }
 }
]
```


### Proxy Status


```js
// Proxy-Status: ExampleProxy; error="http_protocol_error"; details="Malformed response header - space before colon"
[
 {
  "value": "Symbol(ExampleProxy)",
  "params": {
   "error": "http_protocol_error",
   "details": "Malformed response header - space before colon"
  }
 }
]
```


### HTTP Variants


```js
// Variants: Accept-Encoding=(gzip br), Accept-Language=(en fr)
// (TODO: パースできないので報告)
```


### HTTP Signature


```js
// Signature-Input: reverse_proxy_sig=(*created, host, date, signature:sig1, x-forwarded-for); keyId="test-key-a"; alg=hs2019; created=1402170695; expires=1402170695.25
// (TODO: パースできないので報告)

// Signature: reverse_proxy_sig=:ON3HsnvuoTlX41xfcGWaOEVo1M3bJDRBOp0Pc/OjAOWKQn0VMY0SvMMWXS7xG+xYVa152rRVAo6nMV7FS3rv0rR5MzXL8FCQ2A35DCENLOhEgj/S1IstEAEFsKmE9Bs7McBsCtJwQ3hMqdtFenkDffSoHOZOInkTYGafkoy78l1VZvmb3Y4yf7McJwAvk2R3gwKRWiiRCw448Nt7JTWzhvEwbh7bN2swc/v3NJbg/wJYyYVbelZx4IywuZnYFxgPl/qvqbAjeEVvaLKLgSMr11y+uzxCHoMnDUnTYhMrmOT4O8lBLfRFOcoJPKBdoKg9U0a96U2mUug1bFOozEVYFg==:
{
 "reverse_proxy_sig": {
  "value": Uint8Array[],
  "params": {}
 }
 }
```


## 実装

実装は以下に公開している。

- <https://github.com/jxck/structured-field-values>

npm にも上げており、 ES Module で書いてあるため Browser でもそのまま使える。

- <https://www.npmjs.com/package/structured-field-values>


### 実装による検証

この実装は、 SFV の実装を開発するというだけでなく、実装を開発することで仕様の不備を見つけることを目的として始めた。

そのため、パフォーマンスやメンテナンスなどを考えず、仕様にある汎用的なアルゴリズムを変数名やループ処理含めて極力そのまま実装している。

- [Implementation based on spec Algorithm](https://github.com/Jxck/structured-field-values/blob/54cfea375be670cfcb873b6c0c4c4fc57e642bc9/index.js)

また、本来 BNF は参考なので、仕様についても機械的な検証などはあまり行われてないことがほとんどだが、それを検証する意味で再起降下パーサを手書きした実装も行った。

- [Implementation based on spec ABNF](https://github.com/Jxck/structured-field-values/blob/54cfea375be670cfcb873b6c0c4c4fc57e642bc9/bnf.js)

結果、 RFC Editor Queue に間に合わず取り込まれなかったものもあるが、ドキュメントの言い回しや BNF の不備などを報告している。

RFC が出れば一旦の役目を終えるため、使い勝手やパフォーマンスの改善を行ってから 1.0.0 を公開する予定だ。


### テストケース

最近の IETF の良い傾向として、こうした提案に付随してテストケースが公開されている。

- [httpwg/structured-field-tests: Tests for HTTP Structured Field Values](https://github.com/httpwg/structured-field-tests)

実装する場合はこれを流すと互換性が上がるため、筆者もすべてパスしている。


### 他 Draft の検証

本来は SFV のドラフトの検証用に書いたものだが、ある日 [Issue](https://github.com/Jxck/structured-field-values/issues/1) で SFV を採用している別ドラフトの Example が SFV として正しいか相談を受けた。

前述のサンプルにもあるように、まだ SFV の RFC は出ておらず実装も少ないため、他のドラフト作成者も雰囲気で SFV の Example を書いている場面が多く、パースできないサンプルも多く見つかっている。

後述する DEMO などを使えば簡単に検証できるので、今後はこの実装を使ってそうした Example の修正などをサポートするのに使っていきたい。


## Outro

Structured Field Values の実装を行い仕様の検証を行った。

この仕様は今後新しく提案される仕様で採用されていく可能性が高いため、今後利用することも多くあるだろう。

また、比較的簡単な仕様なため、実装のない言語があったら実装してみると良いだろう。


## DEMO

動作するデモを以下に用意した。

- <https://jxck.github.io/structured-field-values/demo.html>


## Resources

- Spec
  - RFC 8941: Structured Field Values for HTTP
    - https://www.rfc-editor.org/rfc/rfc8941.html
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
  - <https://jxck.github.io/structured-field-values/demo.html>
- Blog
- Presentation
  - <https://speakerdeck.com/jxck/abnf-for-protocol-parser-at-ietf>
- Issues
- Other
