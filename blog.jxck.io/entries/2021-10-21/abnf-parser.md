# [abnf][ietf] ABNF Parser の実装

## Intro

IETF の RFC では ABNF 形式の表現がよく使われ、たまに実装することがある。

しかし、実装するたびに前のコードを引っ張り出して思い出す、を繰り返しているので、自分用にメモとしてやり方をまとめる。

完全に我流であり、目的は「その ABNF が正しいかを確認すること」なので、高速化や効率的を求める実用実装とは目的が違う点は先に言っておく。


## ABNF パーサ

筆者が直近で書いた [RFC 8941: Structured Field Values for HTTP](https://www.rfc-editor.org/rfc/rfc8941.html) を例にする。

例えば、ヘッダが複数の値をリスト形式で取る場合

```http
Example-List: sugar, tea, rum
```

これを ABNF で表現するとこうなる。

```abnf
sf-list       = list-member *( OWS "," OWS list-member )
list-member   = sf-item / inner-list
```

`inner-list` を無視すると、これは `sf-item` がスペース(OWS)と `,` で区切られて複数あることになるといった具合だ。`sf-item` はさらに別で定義されている。

`ALPHA` や `DIGIT` のように仕様をまたいで共通する定義は [ABNF](https://www.rfc-editor.org/rfc/rfc5234.html) の RFC としてまとめられ、各仕様が参照している。

ABNF は、実装方法を規定せずに、汎用的に「この形式であるべき」を定義する目的で使われているため、この形式でやりとりができるのであれば、Parse/Serialize ともにどう実装されていても良い。

BNF から機械的にパーサを生成する手法などは知られているが、RFC は実装にそれを強制するものではないため、メモリ効率や速度を重視してそうした手法を採用しないことが一般的だろう。

しかし、ABNF に忠実な実装ができると、それは逆に *ABNF が意味的に正しいか* を検証する手段にもなる。

経験的に RFC の ABNF は、厳密に見ると意味的に間違っていることが多い。これは、仕様策定の段階で、機械的な検証などがされてないことが多いからだ。そこで、そうした検証の意味も含め、筆者はパフォーマンスやメモリ効率よりも、ABNF に対する厳密性を重視して実装することが多い。

実装にあたっては、特にツールなどを利用するわけではなく、以下のように愚直に ABNF を関数に起こして組み合わせていくだけだ。


## JS での実装

もともとは Erlang のパターンマッチを使って書いていたものだが、JS だとそれができないので、最小限の正規表現に置き換えている。

基本の形は、各 ABFN の定義ごとに、「文字列を受け取ると結果を返す関数」を返す高階関数を作り、それを組み合わせていくという方式だ。


### token

最も基本的な、パターン(正規表現)を受け取ったら、そのパターンを文字列の先頭から取り出し、結果を返す形が以下のようになる。

```js
const ok = true

// a => token(/^a/)
export function token(reg) {
  return (rest) => {
    const result = reg.exec(rest)
    if (result === null) {
      return {ok: false, rest}
    } else {
      const value = result[0]
      return {ok, value, rest: rest.substr(value.length)}
    }
  }
}
```

使い方はこうなる。

```js
token(/^a/)("abcde")
// { ok: true, value: 'a', rest: 'bcde' }
```

このパターンを変えることで、一番基本の部分 (ALPHA / DIGIT) などはこれを用いて実装できる。

```js
// ALPHA = A-Z / a-z
const alpha = token(/^[a-zA-Z]/)

// DIGIT = "0"/"1"/"2"/"3"/"4"/"5"/"6"/"7"/"8"/"9"
const digit = token(/^[0-9]/)
```


### alt

ABNF における Alternatives (OR) は以下のように使われる。

```abnf
BIT  =  "0" / "1"
```

実装は以下のようになる。

```js
// (a / b) => alt([a(), b()])
export function alt(fns) {
  return (rest) => {
    for (let i = 0; i < fns.length; i ++) {
      const result = fns[i](rest)
      if (result.ok) {
        return result
      }
    }
    return {ok: false, rest}
  }
}
```

これは、先の `token()` のような高階関数のリストを受け取り、最初に成功したところで終了している。

```js
// ALPHA / DIGIT
const alpha_digit = alt([alpha, digit])
alpha_digit("aaa")
// { ok: true, value: 'aaa', rest: '' }
alpha_digit("111")
// { ok: true, value: '111', rest: '' }
alpha_digit("?")
// { ok: false, rest: '?' }
```


### list

複数の token が順番に並ぶように合成する際に利用する。

```abnf
CRLF  =  CR LF
```

実装は以下。

```js
// (a b c) => list([a(), b(), c()])
export function list(fns) {
  return (rest) => {
    const value = []
    const orig  = rest
    for (let i = 0; i < fns.length; i ++) {
      const result = fns[i](rest)
      if (result.ok === false) {
        return {ok: false, rest: orig}
      }
      value.push(result.value)
      rest = result.rest
    }
    return {ok, value, rest}
  }
}
```

使い方は以下。

```js
// CRLF  =  CR LF
const crlf = list([token(/\r/), token(/\n/)])
crlf("\r\n")
// { ok: true, value: [ '\n', '\r' ], rest: '' }
```


### repeat

ABNF の繰り返しは以下のように使われる。

```abnf
NUMBER = 1*DIGIT
```

- `1*` は 1 回以上
- `1*10` は 1 回以上 10 回未満

といった具合だ。これを 0 回以上 1 回未満とみなせば、Optional も手に入る。

実装は以下のようになる。

```js
// *(a b) => repeat(0, Infinity, list([a(), b()]))
export function repeat(min, max, fn) {
  return (rest) => {
    const value = []
    const found = 0
    const orig  = rest
    while(true) {
      const result = fn(rest)
      if (result.ok) {
        value.push(result.value)
        rest = result.rest
        if (value.length === max) break
      } else {
        break
      }
    }

    if (value.length < min) {
      return {ok: false, rest: orig}
    } else {
      return {ok, value, rest}
    }
  }
}
```

使い方はこうだ。

(仕様上上限がなくても、実装上適当な上限を指定する)。

```js
// NUMBER = 1*DIGIT
const number = repeat(1, 1024, digit)

number("0123")
// { ok: true, value: [ '0', '1', '2', '3' ], rest: '' }
```


### ABNF 実装

`token()`, `list()`, `alt()`, `repeat()` があると、あとはこれを組み合わせていくだけだ。

例えば最初の Structured Filed Values の一例の場合

```abnf
sf-list       = list-member *( OWS "," OWS list-member )
list-member   = sf-item / inner-list
```

こんな感じになる。

```js
const sf_list = list([
  list_member(),
  repeat(0, 1024, list([
    ows(),
    token(/,/),
    ows(),
    list_member()
  ]))
])

const list_member = alt([
  sf_item,
  inner_list
])
```

これを書き下していきながら、一番下層の `token()` まで実装しきれば、パース自体はできあがる(実際には下から書くが)。

あとはパースしながら、例えば数字を `parseInt()` したり、Dict を Map や Object に詰めたり、多少の最適化(`CRLF = CR / LF` を `token(/\r\n/)` にする)などを適宜入れる、などの処理を間にはさみながら組み上げれば良い。

組み上げた結果は、以下のようになる。

- Jxck/structured-field-values
  - https://github.com/Jxck/structured-field-values/blob/master/bnf/bnf.js

こうした処理を高度に抽象化したものがツールとして提供されていたりもするが、この考え方だけ覚えておけば、どんな言語でも RFC の ABNF 程度であれば実装が可能になるだろう。

そして、この実装の過程で処理ができない ABNF が出てくれば、そこで ABNF 側のバグを見つけることができるというわけだ。この実装によって見つかった [SFV の Issue](https://github.com/httpwg/http-extensions/issues/1273) もある。


## IETF と WHATWG での違い

おそらく、実際のプロトコル実装は、ここで紹介したような実装を採用しているものは少ないと思われる。

この実装は、ABNF に忠実な実装ができるかもしれないが、それがパフォーマンスやメモリ効率の視点から最適とは限らないからだ。

したがって、各実装者が ABNF のルールに基づいて、それを再現できる実装を起こす。その過程で、見落とされる ABNF 上の曖昧な点があっても、実装同士を通信させてそれが動いていればそれで良いのだ。

一方で WHATWG は、主にブラウザの API を対象としているため、ブラウザ同士の厳密な互換性を維持することを考えると ABNF のような定義を採用するのは難しい。

代表例としては URL の仕様は、IETF の RFC と WHATWG それぞれに仕様がある。

- [RFC3986 - IETF](https://datatracker.ietf.org/doc/html/rfc3986)
- [URL Standard - WHATWG](https://url.spec.whatwg.org/)

RFC の方は URL のフォーマットが ABNF で書かれているが、WHATWG はパースのアルゴリズムが書かれている。前者は、実装方法に制限が無いが、WHATWG は実装のアルゴリズムが基本的にはどの言語でも同じになる。

もちろん、WHATWG の方はブラウザ特有の様々な要件が含まれているため、RFC のような汎用的な URL の定義とは担っている範囲が違うとはいえ、それぞれの仕様におけるフォーマットの扱いが垣間見えておもしろい。

IETF の方は昔書いて公開せずどこかに言ってしまったが、WHATWG の方は [公開](https://github.com/Jxck/URL/blob/master/url.ts) しているので、参考まで。