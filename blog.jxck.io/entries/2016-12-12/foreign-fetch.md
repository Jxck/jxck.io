# [fetch][service worker][origin trials] Foreign Fetch による Micro Service Workers

## Update

Foreign Fetch は削除される方向で進んでいる。

別途エントリを上げたのでそちらを参照。

[Foreign Fetch が削除されそうな理由と Cookie の double keying \| blog.jxck.io](https://blog.jxck.io/entries/2017-09-19/remove-foreign-fetch.html)


## Intro

Service Worker に Foreign Fetch という機能が提案されている。

この機能があるとクロスオリジンへの fetch をフックできる Service Worker を、その対象オリジンから提供できるようになる。

一体どういう仕組みなのか、これによって何が可能になるのかについて、デモを交えて記す。


## 1st Party と 3rd Party

例えばこのブログであれば、筆者自身が Service Worker を登録することで、 Push などの機能を提供することができる。

ここではこれを、 1st Party の Service Worker とする。

またこのブログは、 3rd Party のサービスとして Google Analytics や Youtube などを利用している。

もしサイト全体をオフライン対応するとなれば、 1st Party のコンテンツのみだけではなく、 3rd Party のコンテンツや API についても、オフライン対応が必要となるだろう。

方法の 1 つとして、 1st Party の Service Worker の中で、全ての 3rd Party サービスも onfetch と cache を用いてオフライン対応をすることが可能だ。

ところが、別オリジンから配布される JS/CSS のライブラリや、 Font/Image などのコンテンツ、地図やカレンダーなど、依存する 3rd Party サービスが増えてくれば、対応すべき対象は増えていくことになる。


## 1st Party Service Worker の限界

そして、 1st Party と 3rd Party のサービスは基本的には Cross Origin の関係になるだろう。

この場合 3rd Party コンテンツへの fetch を 1st Party Service Worker でフックした場合、そのレスポンスは Opaque となり中身を見ることができない。 Cache API への単純な保存は可能だが、より細かい制御を必要とする場合、オリジンが異なることは大きな制限となる。

もし 3rd Party のサービスが CORS に対応しているなら、 Same Origin の Response と同じく中身を見ることができるため、この問題はない。

しかし、 1 つのページの controller になれる Service Worker は 1 つだけであるため、 1 つの Service Worker の中で依存する全ての 1st, 3rd Party へのリクエストを処理する必要がある。

自分の管理下にある 1st Party でさえ、適切に Service Worker を作成し適用するのは簡単とは現状言い難い。

ましてやそれぞれ特性の違う 3rd Party のサービスを、全て適切にオフライン対応し、それら全てを 1 つの Service Worker にマージして、適切にアップデートしながら提供することは、かなり難しいことだろうと筆者は感じている。


## 3rd Party Service Worker

3rd Party のサービスの特性は、そのサービスの提供者が一番よく把握している。

つまり、 3rd Party のサービスをオフライン対応するのであれば、その Service Worker のロジックは同じく 3rd Party のプロバイダがサービスと合わせて提供する方が合理的だと言えるだろう。

しかし、前述の通り 1 つのページに対しては、同時に 1 つの Service Worker しか controller になれない。

そこで、ページに対しては 1st Party Service Worker を登録し、それとは別に 3rd Party Service Worker を 3rd Party サービスに対して登録可能にするというのが、 foreign-fetch である。


## foreign-fetch の仕組み

さて、言葉での解説では想像しにくいと思うので、実際のデモを交えて解説をしていく。

以下は `https://labs.jxck.io` をオリジンとする 1 つだけボタンを持つページに遷移する。これが 1st Party にあたる。

ページ内のボタンは `https://api.jxck.io` という別オリジンの API を叩き、乱数を取得して表示するだけの簡単なものだ。

これは 3rd Party にあたり、 CORS に対応している。

<https://labs.jxck.io/service-worker/foreign-fetch/index.html>

ページに読み込まれる `index.html` と `worker.js` は 1st Party Service Worker でキャッシュされており、オフライン対応されている。


```js:worker.js
```

しかし、この 1st Party Service Worker は、 3rd Party API についてはキャッシュをしていない。乱数を返す API で、特定の 1 つをキャッシュしても意味がないからだ。

キャッシュがないリクエストは実際に fetch を発行しているため、本来なら乱数の取得で失敗するはずだが、このページはオフラインでも乱数を取得し表示することができる。

これは、 1st Party とは別に 3rd Party の Service Worker が登録されているためである。


## 3rd Party Service Worker の登録

乱数の API は `https://api.jxck.io/random/number` への GET である。

実はこの API のレスポンスには、以下のようなヘッダが登録されている。


```
Link: </random/worker.js>; rel="serviceworker"
Origin-Trial: Ai32KiE0NsOIRPR/NxvUwEpcM4hYyo6RPRvkG8liNEIX...
```

この Link タグは、 [前回の記事](https://blog.jxck.io/entries/2016-12-11/link-rel-service-worker.html) で紹介した HTTP Header ベースの Service Worker 登録であり、以下のような Service Worker が登録されている。


```js:random.js
```

この `foreignfetch` イベントが今回の要である。

`install` イベントで指定した origin (ここでは全オリジン) から、 scope の範囲にあるリクエストをハンドルできる。

先ほどの 1st Party Service Worker がキャッシュしていなかった乱数のリクエストを、実際に fetch した時、二段目としてこの 3rd Party Service Worker に渡ってくる。 Origin と Scope が対象範囲であるこのリクエストは `foreginfetch` イベントを発火する。

実際に fetch を発行し、失敗した Service Worker は、フォールバックとして乱数を JS で生成しそれを返す。

これにより、 1st Party の Service Worker は fetch が成功したかのように挙動するのである。


## foreign-fetch によるサービス間連携

この 3rd Party Service Worker は、ページに紐づいている訳ではなく、イメージとしては API に紐づいている。

例えば、今回は `labs.jxck.io` から fetch していたが、別のオリジン/ページから同じ API を fetch しても、 Origin/Scope が範囲内であれば、同じ 3rd Party Service Worker が起動して処理を行う。

つまり、 3rd Party Service Worker は異なる 1st Party Service Worker 間で共有されるのだ。

これはかつて同じオリジンのキャッシュが別ページ間で使い回される CDN の利点のように、別のページで既に登録されている 3rd Party Service Worker はそのまま使いまわせることを意味し、例えば font のような大きいアセットファイルのキャッシュなども、ページ間で使いまわすことができるということを意味する。

使い回せるのはキャッシュだけではない。

例えばコメント投稿の API を通じて、あるページで投稿されたコメントデータを、瞬時に別のページで表示できるようなる。

サービス連携のような使い方が可能になるのだ。


## Micro Serivce Workers

1st Party Service Worker で全ての処理を行う必要があったモデルには、かなり無理があった。

3rd Party が持つロジックを全て適切に 1st Party 内に実装するのは難しいし、そもそも 1st Party が必ずそれを行うことを前提とするのは非現実的だ。

3rd Party が API に Service Worker を含めて提供し、それが 1st Party から見れば透過的に動作するのは非常に自然かつ妥当であると言える。

それだけでなく、 3rd Party Service Worker が 1st Party とは別に同時に起動できるのは、これまでの Service Worker がページに対して必ず 1 つだけしか起動できなかった制限を大きく解消する。

Service Worker をレイヤリングすることで、ロジックを分割し、凝集度を高めることができる。

責務の分離を促すことは、 Service Worker の鬼門であるアップデートの負荷を下げることに繋がる。

また、この 3rd Party API を使うことで、サービス間の連携が行えることは、さらに可能性を広げるだろう。

Micro Services に分割されたそれぞれの API は、対応する Service Worker を合わせて提供することで、オフライン対応のみならず、 1st Party に委ねていた幅広いユースケースへの対応を、取り戻すことができる。


## foreign-fetch

foreign-fetch は現状まだ Origin-Trials の対象であるが、 Trials を外れれば、今後各 API が Service Worker を提供するのが一般的になっていく可能性がある。

また Microservices 化を進める 1 つの Origanization の中の複数の Service も、 foreign-fetch を用いたもろもろの連携が視野に入ってくると、 JSON API までにとどまりがちだった Service の定義がもう少し広がるかもしれない。

デバッグなどが難しいという問題があるが、本ブログでも積極的に導入し知見を貯めていきたい。
