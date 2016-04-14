# Stale-While-Revalidate の Service Worker 実装によるブラウザキャッシュ最適化

## Intro

Web においてキャッシュの扱いは常に難しく、パフォーマンスにおいてキャッシュは永遠の課題である。

そこで、新しく提案されている Stale-Whilte-Revalidate ヘッダを解説する。

また、これを Service-Worker を用いて実装し、対応した経緯について記す。


## Web におけるキャッシュ

### キャッシュの種類

まず、ブラウザが持つ従来のキャッシュの機構について整理する。

これまでは HTTP ヘッダを用いて、ブラウザにキャッシュを管理させる方法を用いてきた。

キャッシュの指定には大きく二つの方式がある。

- ブラウザはリクエストを発行せず、保持するキャッシュを使用する(`Cache-Control`)
- ブラウザはリクエストを発行し、サーバにキャッシュの有効性を確認してから、キャッシュを使用する(conditional get)

そして、キャッシュを行う意義は大きく二つある。

- サーバへの負荷を減らす
- 表示を高速化する


また、これらは基本的/一般的な内容であり、キャッシュに関わるヘッダは他にもある点、そしてブラウザは独自の判断でキャッシュを使う場合があることに注意されたい。


### Cache-Control

`Cache-Control` ヘッダで `max-age` を指定すると、ブラウザはその期間内であればサーバに問い合わせることなくキャッシュを使用する。(キャッシュ指定の一つ目)

```
Cache-Control: max-age=3600
```


つまり、ネットワークへはパケットは一切発生せず、理論上は最速でリソースを取得できる。

しかし、 Web に限らずキャッシュの難しさはその更新にあるように、 `Cache-Control` もブラウザ内で完結してしまう以上、更新の問題が出る。

例えば、 `max-age` を長い期間で指定したスクリプトにバグがあった場合は、サーバから修正したスクリプトを配信することができなくなる。

かと言って、 `max-age` の長さを消極的な値にしては、高頻度でリクエストが発生してキャッシュの効果が薄れる。

そこで、現実的にはリソースに長い `max-age` を指定し、更新があったら URL を変更するという運用がよく行われる。

たとえば `production.min.js` があったとする。ヘッダには `max-age=31536000` (1年)を指定してブラウザにキャッシュさせる。

この JS を HTML に指定する際は、以下のようにバージョンを含める。

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

ただし、この `<script>` を含む、 HTML ファイル自体は、 `max-age` による長期のキャッシュがしにくいという問題は残る。


### Conditional GET

HTTP には、 **Conditional GET** (条件付き GET) という仕組みがある。

これは、「**すでに保持しているキャッシュが今でも有効かどうか**」をサーバに問い合わせる方法である。

具体的には、サーバは `ETag`, `Last-Modified` などのヘッダをレスポンスに付与することで、リソースに関する情報をサーバに伝える。
(以下のヘッダは、どちらかを使えば良い)

- ETag: そのリソースを一意に特定する値、要するにリソースのハッシュ値
- Last-Modified: そのリソースが最後に更新されたタイムスタンプ


この値を保存したブラウザは、同じ URL へのリクエストに、キャッシュしたリソースに付与されていた値を設定してサーバに問い合わせる。

- If-Non-Match: ETag で受け取った値を付与
- If-Modified-Since: Last-Modified で受け取った値を付与。

サーバは、リクエストされたリソースについて以下を検証する。

- If-Non-Match で指定された値と、リソースの ETag(ハッシュ) が同じ
- If-Modified-Since で指定された日時以降に、リソースが更新されていない

これによって、ブラウザがキャッシュしたリソースが、まだ新鮮であるかどうかをサーバが判断でき、新鮮でなければ新しいリソースをレスポンスし、新鮮ならば `304 Not Modified` を返すことで、ブラウザにキャッシュが再利用できることを伝える。

この仕組みは、もしキャッシュが有効と分かればレスポンスボディが空になるため、通信効率が向上する。

キャッシュが古い場合の更新も同時に行えるため、更新が多いリソースで、最新のコンテンツを提供する場合に使用できる。

ただし `Cache-Control` と違い、必ずリクエストが発生するため RTT の削減にはならない。


## Stale-While-Revalidate

ここまでの二つの仕組みは、下手に設定すると更新されない、弱気になるとキャッシュが効かないという、設計の難しさをはらむ。

したがって「**キャッシュは効かせたいが、更新が多いのでなるべく新鮮なリソースを提供したい。**」などといった要望に対処するのが難しかった。

そこで提案されたのが **Stale-While-Revalidate** (SwR)である。

簡単に言えば「**キャッシュから表示するが、裏で非同期にキャッシュを更新しておく**」という仕組みである。


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





