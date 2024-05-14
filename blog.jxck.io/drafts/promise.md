# 複数 Promise 処理の頻出考慮漏れ集

Promise には標準で `all()`, `race()`, `any()` などが備わっているが、 `allSettled()` 以外を使っているコードの大半は、何かの考慮が漏れている可能性が高いと、筆者は経験的に感じている。

今回は、それぞれの典型的な処理を見ていき、何の考慮が漏れ、どう考慮したら良いかを解説する。


## Promise.race / any

`race()` は、最初に resolve か reject が確定した場合にその結果を返す。

個人的にはこの API の用途は非常に限られていると感じる。

仮に、例えば二つの API を同時に叩き、先に返って来た方を採用しようと考えている場合、以下のようになるかもしれない(そんな要件があるかはわからないが)。

```js
const result = await Promise.race([
  fetch("https://a.example/api"),
  fetch("https://b.example/api"),
])
// resolve, reject 限らず先に終わった結果が全体の結果
```

この要件では、先にどちらかが成功すればその結果を使うのだろうが、先に a が失敗した場合、 b が成功したとしてもその結果は得られずに、全体として reject される。

したがって、そもそもこのような用途では `race()` は向いてないため、あとから `any()` が追加された。 `any()` であれば先に resolve された結果が利用できる。

```js
const result = await Promise.any([
  fetch("https://a.example/api"),
  fetch("https://b.example/api"),
])
// 先に resolve した結果、もしくは全部失敗したら reject
```

ところが、このコードも考慮が漏れいている部分がある。

仮に「全部が終了するのを待つ必要はない」という過程であれば、基本的には `any()` の結果が 1 つ出た瞬間に、本来は残りの処理を中断するべきであることがほとんどだ。これも、大袈裟に 10 個を同時に競わせて、 1 つ結果が出たとしたら、基本的には残りの 9 個は中断すべきはずだ。 fetch() の場合は以下のようなイメージだ。

```js
const controller = new AbortController()
const signal = controller.signal

const result = await Promise.any([
  fetch("https://a.example/api", { signal }),
  fetch("https://b.example/api", { signal }),
])
console.log(result)
controller.abort() // 残りを終了する
```

そうでなくても、 AbortSignal を用いた終了処理は、特に frontend では雑に行われがちなので、「失敗した場合」だけでなく「中断処理」もきちんと管理するべきだ。

- `any()` を直接使っている場合 abort まで考えられてないケースが多い
- そうでなくても abort が考えられてない処理は結構多い。
- `race()` の使い道は、一般的な開発ではそこまでない


## Promise.all() / allSettled()

複数の Promise を並列して実行する目的で、最もよく使われるだろう。

```js
const results = await Promise.all([
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
])
```

`all()` は、「全て resolve した場合にのみその結果を配列で返す」。逆を言えば、一個でも失敗した場合は全体が reject する。

しかし、 Promise は I/O を伴うコストの高い処理を非同期化する目的で使われることが多く、複数同時に行っているにもかかわらず、「全部成功した時以外は結果に興味がない」ということはほぼない。

大袈裟に言えば、 10 個実行して、たった 1 つの失敗のために 9 個の成果も無視してしまうのだ。普通に考えれば 9 個は保持し、 1 つだけリトライかフィードバックなどのケアをするのが典型だろう。

逆に、 `all()` では「最初に reject した結果」しかわからない。つまり失敗したのが 10 個のうち 1 つだったのか、 2 つだったのか、はたまた全部だったのかも後からは知ることができない。全部失敗ならリトライしてもしょうがないかもしれない、そういったケアができない。

基本的に、全部実行するなら `allSettled()` を使えば、 resolve / reject どちらであろうと結果が収集できるため、上記は解決する。

もし、`all()` と同様に一個でも成功しなかったら reject したいなら、それも結果の status を見て自分で行えば良い。

```js
const results = await Promise.allSettled([
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
])

console.log(results)
// [
//   { status: "fulfilled", value },
//   { status: "fulfilled", value },
//   { status: "fulfilled", value },
//   { status: "rejected", reason }
// ]
```


## 並列実行して終わった順に処理したい

実のところ、平行処理している Promise の実行時間などを考慮する必要がある場合、標準の Promise Static Method は割と貧弱だ。

例えば `allSettled` で全体を待ち合わせる場合に、カバーできないユースケースがいくつかある。

まず、「全部 resolve しないと全体が resolve しない」こと自体が場合によっては問題になる。特に `fetch()` などは、失敗する場合は非常に時間がかかってからタイムアウトするような場合が多い。他が ms オーダーで終わってても、 1 つが s オーダーだった場合にそこに律速してしまうのだ。

逆に、 ms オーダーですぐに失敗した Promise があるのに、他が全て s オーダーで実行されたために、失敗した Promise の処理までにラグができることもある。

このような要件は、成功する Promise と失敗する Promise のライフタイムのラグが大きい場合に、 UI へのフィードバックなどを伴う要件で問題になりえる。しかし、それは `allSettled()` では解決できない。

要するに、「並列に実行したいが、終わった順から結果を使いたい」という処理が標準からはすっぽり抜けているのだ。

そして、筆者の感想としては「終わった順に処理したい」のケースが `race()` や `any()` でカバーされているという勘違いをしてそうな実装をみることがある。


## for await of

次々に処理をしていく方法の 1 つとして `for await of` の利用が考えられる。

しかし、注意が必要だ。以下の例を見てみよう。

```js
const tasks = [
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
]

for await (const task of tasks) {
  console.log(task)
}
// 3s
// 2s
// 1s
```

この場合、処理は同時に走るが、結果は Promise の配列自体の順番通りに取り出してループしていくことになる。

つまり、この場合は 3s かかる結果が最初に resolve するまで 3s 待ち、その後既に終わっている 2s, 1s が取り出されるのだ。イメージはこんな感じだ。

```js
// 処理は並行して走る
const tasks = [
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
]

// 配列の順に結果を取り出す
await tasks.at(0)
await tasks.at(1)
await tasks.at(2)
```

決して、「最初に終わった結果から順に取り出される」わけではない。


## Async Iterator

これは、 Async Iterator としての取り出し順を少し細工してやることで、一応実現が可能だ。

```js
const tasks = [
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
]

tasks[Symbol.asyncIterator] = async function* () {
  const promises = new Set(tasks.map((task) => {
    // @ts-ignore
    const { promise, resolve, reject } = Promise.withResolvers();
    task
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        promises.delete(promise);
      });
    return promise;
  }));

  while (promises.size) {
    yield Promise.race(promises);
  }
};
```

tasks の分身のような Promise を作り、それを Set に詰め込む。

Set が空になるまで、「結果が出た Promise」を取り出し `yield` しつつ、取り出したら Set から消していく。

ここで、「結果が出た Promise」を取り出すのにまさしく `race()` を利用できる。内部で既に resolve/reject 済みなものを、結果の出た順に取り出すことができるからだ。

これを用いると、実行が終わった順に `for await of` できる。

```js
const tasks = [
  fetch("3s"),
  fetch("2s"),
  fetch("1s"),
]

for await (const task of tasks) {
  console.log(task); // 1s -> 2s -> 3s
}
```

これはあくまで筆者が雰囲気で書いただけで、あまり当てになる実装ではない。

この Set が Queue であるため、 "Async", "Queue", "Generator" などの名前で検索すると、こうした処理をまとめたライブラリが色々と出てくると思うので、そういった実装を使い、そのライブラリの作法に則って導入するといいだろう(一度入れたら剥がしにくい類の処理なので注意)。


## 同期処理をセットにした Promise

フィードバックを早くしたいだけなら、処理が終わった順に Promise を取り出すよりは、「フィードバック処理を一緒にした Promise」にし、最後の最後に同期するためだけの `allSettled()` を用意する方が、よりシンプルな場合が多い。

つまり、イメージとしてはこうだ。

```js
async function fetchAndFeedback(url) {
  const { promise, resolve, reject } = Promise.withResolvers();

  const res = await fetch(url)
  if (!res.ok) {
    // feedback 処理
    notification("fetch failed")
    reject(new Error("fetch failed ......."))
  }

  const json = await res.json()
  // feedback 処理
  // UI の特定部分への反映までしてしまう
  const dom = render(json)

  resolve(/*何かしら役にたつ情報*/)
}

const results = await Promise.allSettled([
  fetchAndFeedback("3s"),
  fetchAndFeedback("2s"),
  fetchAndFeedback("1s"),
])

console.log(results)
// [
//   { status: "fulfilled", value },
//   { status: "fulfilled", value },
//   { status: "fulfilled", value },
//   { status: "rejected", reason }
// ]
```

このような処理ができるよう、 Promise のタスクそれぞれが独立して「成功/失敗時の UI フィードバック」を単体でできるような設計にしておく。

これであれば、 I/O の部分だけを並列化し、その待ち合わせをしてから UI へフィードバックするという処理フローで発生する、 UI へのフィードバックラグをある程度解消することができる。

最後の最後に、それらをどこかしらで待ち合わせる合流地点では、 `allSettled` で全てを確認し、ここの結果をケアする。