#[SwR][http][cache][performance] Stale-While-Revalidate ヘッダによるブラウザキャッシュの非同期更新

## Intro

システムにおいてキャッシュの設計は永遠の課題であり、 Web のパフォーマンスにおいても非常に重要である。

Web では、 HTTP ヘッダを用いてブラウザやプロキシにキャッシュの制御を指定する。

Stale-Whilte-Revalidate ヘッダは、このキャッシュ制御に選択肢を追加する新しい仕様である。

このヘッダの概要と、本サイトへの適用を解説する。


## Web におけるキャッシュ

### キャッシュの種類

まず、ブラウザが持つ従来のキャッシュの機構について整理する。

そもそも、キャッシュを行う意義は大きく二つある。

- リソースの取得を高速化する
- サーバへの負荷を減らす


これまでは HTTP ヘッダを用いて、ブラウザにキャッシュを管理させる方法を用いてきた。
Web における、キャッシュの指定には大きく二つの方式がある。

- ブラウザはリクエストを発行せず、保持するキャッシュを使用する(`Cache-Control`, `Expires`)
- ブラウザはリクエストを発行し、サーバにキャッシュの有効性を確認してから、キャッシュを使用する(`ETag`, `Last-Modified`)


また、キャッシュは、「再利用」を行う目的でありながら、ある一定の範囲で「更新」を行いたいという、相反するコントロールが求められる。
筆者の認識として、キャッシュ設計の最も難しい点は、ここである。

また、これらは基本的/一般的な内容であり、キャッシュに関わるヘッダや機能は他にもある点、そしてブラウザは独自の判断でキャッシュを使う場合があることに注意されたい。


### Cache-Control

`Cache-Control` ヘッダで `max-age` を指定すると、ブラウザはその期間内であればサーバに問い合わせることなくキャッシュを使用する。

```
Cache-Control: max-age=3600
```


つまり、この指定によるキャッシュがヒットする場合、ネットワークへはパケットは一切発生せず、理論上は最速でリソースを取得できる。

しかし、 `Cache-Control` に基づくキャッシュヒットはブラウザ内で完結してしまうため、期限が切れるまでサーバが介入することができない。

例えば、 `max-age` を長い期間で指定したスクリプトにバグがあった場合は、サーバから修正したスクリプトを配信することができなくなる。

かと言って、 `max-age` の長さを消極的な値にしては、高頻度でリクエストが発生してキャッシュの効果が薄れる。

そこで、現実的には `max-age` を長く指定し、更新があったらそのリソースの URL を変更するという運用がよく行われる。

たとえば `production.min.js` があったとする。ヘッダには `max-age=31536000` (1 年)を指定してブラウザにキャッシュさせる。

この JS を `index.html` に指定する際は、以下のようにバージョンを含める。

```html
<script src=production.min.js?ver=1></script>
```

これで `ver=1` を参照している間はキャッシュが使われる。
もし JS が更新されたらバージョンを変える事で、 URL を以下のように変更する。

```html
<script src=production.min.js?ver=2></script>
```

ブラウザのキャッシュは基本的に URL 単位で行われるため、この URL を毎回変えてやれば、古いキャッシュが使われるのを避けることができる。

URL を変えることが目的なので、バージョンの代わりにタイムスタンプやハッシュを使っても良い。

ただし、この `<script>` を含む、 `index.html` 自体が長期にキャッシュされてしまうと、 `production.min.js` の URL も更新できない。

したがって、 `index.html` 自体は `max-age` による長期のキャッシュがしにくいという問題は残る。


### Etag, Last-Modified

HTTP には、 **Conditional GET** (条件付き GET) という仕組みがある。

これは、「**すでに保持しているキャッシュが今でも有効かどうか**」をサーバに問い合わせる方法である。

具体的には、サーバは `ETag`, `Last-Modified` などのヘッダをレスポンスに付与することで、リソースに関する情報をサーバに伝える。

- ETag: そのリソースを一意に特定する値、要するにリソースのハッシュ値
- Last-Modified: そのリソースが最後に更新されたタイムスタンプ


この値を保存したブラウザは、同じ URL へのリクエストに、キャッシュしたリソースに付与されていた値を設定してサーバに問い合わせる。

- If-Non-Match: ETag で受け取った値を付与
- If-Modified-Since: Last-Modified で受け取った値を付与。


サーバは、リクエストされたリソースについて以下を検証する。

- If-Non-Match で指定された値と、リソースの ETag(ハッシュ) が同じ
- If-Modified-Since で指定された日時以降に、リソースが更新されていない


これによって、ブラウザがキャッシュしたリソースが、まだ新鮮であるかどうかをサーバが判断できる。

新鮮ならば `304 Not Modified` を返すことで、ブラウザにキャッシュが再利用できることを伝える。

新鮮でなければ新しいリソースをレスポンスし、キャッシュは更新される。

この仕組みは、キャッシュが有効と分かればレスポンスボディが空になるため、ペイロードサイズが大幅に減る。

キャッシュが古い場合は、常に新しいリソースを提供できるため、更新が多いリソースで、最新のコンテンツを提供する場合に使用できる。

ただし、あくまでサーバへの問い合わせ自体は発生するため、ラウンドトリップ自体の削減にはならない。


## Stale-While-Revalidate

ここまでの二つの仕組みは、下手に設定すると更新されない、弱気になるとキャッシュが効かないという、設計の難しさをはらむ。

したがってヘッダのみを用いて、「**キャッシュは効かせたいが、なるべく新鮮なリソースを提供したい。**」などといった要望に対処するのが難しかった。

そこで提案されたのが **Stale-While-Revalidate** (SwR)という `Cache-Control` の拡張である。

簡単に言えば「**キャッシュから表示するが、裏で非同期にキャッシュを更新しておく**」という仕組みである。


### max-age

まず、従来の方法で以下のヘッダがあった場合を考える。

```
Cache-Control: max-age=3600;
```

すると、 fetch したレスポンスは 3600s の間は **fresh** とみなされ、その期間はキャッシュヒットする。
しかし、 3600s をすぎるとキャッシュは **stale** とみなされ破棄し、次のリクエストで fetch が走る。


### stale-while-revalidate

Cache-Control に `stale-while-revalidate` を指定する。

```
Cache-Control: max-age=3600, stale-while-revalidate=360
```

すると、 fetch から 3600s 経過したキャッシュは **stale** となるが、そこから 360s は、その **stale** なキャッシュを引き続き使用して良い。

しかし、一度 **stale** なキャッシュを使用したら、裏で非同期に fetch を行い、サーバにキャッシュの鮮度を問い合わせる(validate)。

もしサーバから新しいリソースを fetch したなら、そこに付与された新しいヘッダに従ってキャッシュを更新する。

なんらかの理由で 360s の間に validate が完了しなければ、キャッシュを **true stale** とみなして破棄し、次のリクエストで fetch が走る。

TODO: 図


### stale-if-error

仕様にはもう一つ、 `stale-if-error` という拡張もある。

同じく Cache-Control に指定する。

```
Cache-Control: max-age=3600, stale-if-error=360
```

すると、 3600s でキャッシュは **stale** になり、次のリクエストで fetch が走る。
しかし、もしその fetch がサーバの 500 やネットワークエラーにより失敗した場合は、 360s 間は stale cache を使用しても良い。
これにより、ブラウザのエラー画面が表示されるのを防ぐことができる。

もちろん、上記二つは組み合わせて使うことができる。


## SwR のデモ

執筆時点では、実装ブラウザは Chrome のみであり、フラグを有効にすることで使用できる。

[chrome://flags/#enable-stale-while-revalidate](chrome://flags/#enable-stale-while-revalidate)

以下に用意したデモページは、 SwR ヘッダを有効にしている。


https://labs.jxck.io/stale-while-revalidate/


```
Cache-Control: max-age=5, stale-while-revalidate=10, stale-if-error=15
```


## SwR を用いたキャッシュ戦略の考察

この仕組みを用いたキャッシュ戦略について考察する。

まず、 SwR を用いると何が変わるのかを確認するため、極端な設定例を用いて考察する。


### 1 year fresh cache

```
Cache-Control: max-age=31536000
```

この設定ではキャッシュは 1 年間 **fresh** となる。
例えば、 `favicon.ico` や `jquery.min.js` などといった更新が少ない、もしくは更新が無い(ある場合はファイル名が変わる) といった場合に設定が可能になる。

キャッシュが途中で消されない理想状態においては、そのブラウザからサーバへのリクエストは 1 年間無いことになる。

ただし、取得されるリソースは常に最初に取得したものであり、最大で 1 年前のものとなる。


### 1 year stale cache

```
Cache-Control: max-age=1, stale-while-revalidate=3153600
```

この設定は、キャッシュはすぐに **stale** となる。
しかし、 1 年間はこの **stale** cache を使用することが許可されているため、次のリクエストはキャッシュヒットする。

そして、その裏で **validate** として fetch が走る。もしレスポンスが同じヘッダを持てば、そこからまた 1 年キャッシュが **stale** になる。

つまり、キャッシュは常に 1 度だけヒットし、最後にアクセスした直後の内容に更新されていることになる。

`max-age` との最大の違いは、サーバへの負荷になるだろう。この場合 fetch が行われる **回数** 自体は、 `Cache-Control` が無かった状態と変わらない。 fetch のタイミングが少し後ろにずれるだけである。

最初にキャッシュしてから 1 年間は、必ずキャッシュヒットするが、リソースの状態は最後にアクセスした時のもの、という状態になる。


### 1 year fresh/stale cache

```
Cache-Control: max-age=15768000, stale-while-revalidate=15768000
```

両方を半年づつ設定した場合、半年づつ **fresh** / **stale** になる。

この場合 `stale-while-revalidate` に ***対応していないブラウザ** でも、半年はキャッシュが効く。
まだ `stale-while-revalidate` の実装が行き渡らないうちは、こうした両方での指定が必要となっていくだろう。

また、この二つをうまく使うと、例えばキャッシュの更新を行き渡らせる際に応用が考えられるが、長くなるため次節に記す。


## Cache のロールアウト

リソースの更新を一瞬で行き渡らせるには、 URL を変えてしまうのがもっとも簡単であるのは前述の通りである。

ただし、 URL を変えるということは、既に古いキャッシュを持っていても必ず一回は fetch が走るということになる。

しかし、 SwR を使うと、ある一定の期間を設定し、常にキャッシュヒットさせつづけたまま、新しいリソースにキャッシュを更新しすることが可能であると考えられる。

特にセキュリティ的な問題のある更新などでなければ、キャッシュヒット状態を維持したまま更新を反映されられるのは、パフォーマンス上のメリットがあるだろう。

実施内容は TTL を調整しての(一般に **浸透** と誤用される) DNS の更新に似ている。


### Expires でのロールアウト

以降は、現在提供しているリソース v1 を、 100日後に v2 をリリースする計画を、 URL 変えずに行うというストーリーを考える。

なお、この用途であれば、 `Expires` ヘッダに 100日目の日時を指定するのが妥当な筋である。

絶対時間指定はマシンの時計のずれの影響を受けるが、おおよそ100日後にキャッシュミスして、リクエストが来るだろう。


Cache-Control を用いてもできないわけではない。

現在 v1 に付与している `max-age` は 10日だとする。

この場合、90日経過した時点から、毎日 `max-age` を 1 日ずつ減らしていけば、 100日目移行にアクセスする全てのリクエストでキャッシュミスする。

v2 の内容に切り替えてからは、 `max-age` を 10日に戻せば良い。

こちらは、 Proxy にキャッシュされると、クライアントとの間で微妙にずれが起こる可能性があるため `no-store` を指定して Proxy キャッシュを禁止する方が正確に行えるだろう。


### SwR でのロールアウト

以上のように、 `Expires`, `Cache-Control` どちらを用いても、計画されたリソースの更新に合わせてキャッシュを切ることは理論上可能だ。

しかし、いずれの案も「**キャッシュを切ってリクエストさせる**」という手法である。どうせリクエストさせるなら、 URL を変える方がよっぽど楽であり、確実である。

SwR を用いれば、ある期限付きで「**キャッシュをヒットさせたまま更新を反映させる**」ことが可能になる。


再び、 v1 に付与している `max-age` を 10日だとし、 `stale-while-revalidate` を 10日とする。





## 本サイトでの適用

本サイトでは、現状 `Cache-Control` は web font 以外にはつけておらず、 ETag による Conditional GET でのキャッシュを利用している。
これは、ブログの修正などがいち早く取得されて欲しいからである。

全体のアクセスもまだまだ多くはなく、バージョンの付与による URL の変更は最終手段として、あまり使いたくは無いというモチベーションもある。

リクエストが頻発しても、もし実際にリソースの更新がないのであれば、 304 を返すだけで足りる。

従って、 **リクエストを減らすため** のキャッシュは考慮になく、 **表示の最適化** のためのキャッシュを積極的に行いたい。

そして、ブログは平均週一回程度の更新であるため、ユーザのアクセスは以下のパターンがある。


- 更新された日に RSS などからアクセスし、多少うろついて帰る
- 長いスパンを開けて、検索などからアクセスし、多少うろついて帰る

すると、後者の長いスパンの中で、前回アクセス時のキャッシュの適用を期待するのは難しい。
どちらかというと、その日のアクセス後の導線上でキャッシュが効き、かつ、公開直後に発覚した修正を筆者が適用しても、ある程度の速さで反映されて欲しい。


合わせて、操作ミスなどでブログが落ちていたとしても、その日のうちはキャッシュがが代替表示として十分に機能すると考える。

結果、以下のように設定することとした。

リソースの種類によって設定を変えることも考えたが、基本的にどのリソースでも更新が短期間に反映されて欲しいため、リソースによって差はない。

- max-age=1sec : SwR 非対応ブラウザではキャッシュしない
- SwR=10min : その時滞在しているセッションの中ではキャッシュを使用
- SiE=1day : その日のうちは、エラーの代替表示として stale cache を利用

```
Cache-Control: max-age=1, stale-while-revalidate=600, statle-if-error=864000
```

非常に短期のセッションでキャッシュを有効にする設定である。
一方、長期のキャッシュは、どうしてもアクセスしてない期間に行われた更新を、バックグラウンドで反映したくなる。

そうした場合は、 Service-Worker を使ったキャッシュ機構を適用するため、別途対応する。


TODO: 図


キャッシュから返すため、取得は高速に行うことができる。同時にバックグラウンド(例えばそのページを読んでいる間)で非同期のリクエストが発生し、キャッシュを更新する。

これによって、次回のリクエストはキャッシュヒットが発生するが、その中身は最初のキャッシュよりも新しくなっているというものである。

指定は以下のように `Cache-Control` に `Statle-While-Revalidate` を設定して行う。


```
Cache-Control: max-age=36000, stale-while-revalidate=3600
```

この設定の場合

- 36000s はキャッシュが新鮮と判断し、それをそのまま使用する
- 36000s 過ぎたらキャッシュは古いと判断するが、次の 3600s の間はそれを返す
- 3600s の間にキャッシュの更新を試みる
- 3600s 経過してもキャッシュが更新できなければ、キャッシュが完全に古くなったとみなし捨てる

よって、 SwR の期間に非同期で行われたリクエストへのレスポンスに `Cache-Control` が付いていればまたキャッシュが更新される。

ここでの更新がうまくいけば、ユーザにとっては最初の一回以降は常にキャッシュがヒットしているように見える。

もし、なんらかの事情でキャッシュの更新が裏で行われなかったとしても `max-age + stale-while-revalidate` の時間経てば完全にキャッシュは切れる。


## 鮮度重視のキャッシュ





















A response containing

```
Cache-Control: max-age=600, stale-while-revalidate=30
```

indicates that it is fresh for 600 seconds, and it may continue to be
served stale for up to an additional 30 seconds while an asynchronous
validation is attempted.

If validation is inconclusive, or if there is not traffic that triggers it,
after 30 seconds the stale-while-revalidate function will cease to operate,
and the cached response will be "truly" stale
(i.e., the next request will block and be handled normally).

これは 600s はキャッシュがフレッシュ(新鮮) であり、追加で 30s はステイル(古い)
キャッシュを、非同期のバリデーションが実行される裏で提供される。
バリデーションが確定しない、もしくはトラフィックが発生しなかった場合、
30s 後には stale-while-revalidate は実行を終了し、キャッシュは完全なステイルと判断される。
(i.e., 次のリクエストは実際にフェッチが走る)


Generally, servers will want to set the combination of max-age and stale-while-revalidate to the longest total potential freshness lifetime that they can tolerate.
For example, with both set to 600, the server must be able to tolerate the response being served from cache for up to 20 minutes.

通常、サーバは max-age と stale-while-revalidate をセットで用いることで、キャッシュのライフタイムを最大化する。
例えば、両方を 600s にしたら、キャッシュは最大 20min 使われる。


Since asynchronous validation will only happen if a request occurs after the response has become stale,

非同期バリデーションのリクエストは、レスポンスがステイルになった後に発生するので、


but before the end of the stale-while-revalidate window,
stale-while-revalidate の期間が切れる前に、期間のサイズと、

the size of that window and the likelihood of a request
期間の長さとリクエストの可能性

during it determines how likely it is
どのくらいそうか判明する

that all requests will be served without delay.
全てのリクエストが遅延なく提供される




If the window is too small, or traffic is too sparse, some requests will fall outside of it, and block until the server can validate the cached response.

window が小さすぎると、トラフィックが貧弱だったり、リクエストの幾つかが落ちたり、サーバがキャッシュしたレスポンスをバリデートできるまでブロックします。





