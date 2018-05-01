# [layered api][extensible web][whatwg] Layered APIs と High Level API の標準化指針


## Intro

Extensible Manifest 以降、標準化作業は Low Level API にフォーカスし、一定の成果が出ている。

そこで、これらをベースとし、よりアプリレイヤの需要を満たすための High Level API をどう標準化するか、という点について指針が提案された。

基本は、Low Level API を元に Polyfill を作り、そこからのフィードバックにより策定を進めるという方針だ。

合わせて ES Module の Import を用いて、 pollyfill とネイティブ実装をスムーズに切り替える拡張が合わせて提案されている。

本記事では Layered APIs (LAPIs) と呼ばれる、この一連の枠組みについて、実例を交えて解説する。

また、同等の話を [東京 Node 学園 #tng30](https://nodejs.connpass.com/event/83639/) で行った資料は以下である。

[Web over Layered APIs](https://speakerdeck.com/jxck/web-over-layered-apis)



## Storage in Service Worker

Service Worker を触った際に Local Storage が無いことに気づいた開発者も少なく無いだろう。

理由は単純で Local Storage は同期 API であるため、同期 API を許容しない Service Worker には実装されてない。

後発の IndexedDB や Cache Storage は、定義した時から非同期であるため、 Window/Service Worker 両方にあるが、 Local Storage は Window にのみ残っている状態だ。

IndexedDB は、 version や transaction など、 DB に必要そうな API をしっかり積んでいるが、結果としてセレモニー(データを保存する前準備)は長くなる。

単純な version 番号や 1bit の flag を登録するためにも IndexedDB のセレモニーを経て出し入れする必要がある。


一方 Cache Storage はもう少し単純な API だ。これなら、小規模なデータも少し手軽に保存できそうだ。

しかし、 Request/URL を Key に Response を紐づけるという用途(もはや SW という usecase そのもの)に特化したもので、汎用性は無い。

汎用的な Key Value Store があって、その特化として Cache Storage なら階層もわかるが、そうしたレイヤを抜きにして取ってつけたように定義された API になっている。

Low Level API というのであれば、 Cache API の下層としての Async Local Storage という発想は割と自然では無いだろうか。

また Window 側でも Local Storage が同期のままでよいわけでも無いと思うので、これを非同期にする API の提案は考慮されてもいいのではいかと、筆者は考えた。

(もともと、 offline で発生した Request を online になるまで保存する適切な場所が無いというところから、こうした設計の歪みがずっと気になっていたが、その話はやめておく。)


## do it yourself

Extensible Web 全盛期だったこともあり、上記のような提案は、全くの想像通り以下のような回答がつくこととなる。

- you can do that with lovefiled
- you can do that with localforage
- you can do that with indexeddb
- etc

全く想像通りだし、たぶん

たぶんこれ以上何か言っても話は進まないだろうと思って放置したが、




















## Standarize Low Level API

Extensible Manifest 以降、標準化の場面では Low Level な Primitive の策定に注力してきた。

[Extensible Web Manifesto](https://extensiblewebmanifesto.org/ja)

これにより、多様化する開発者のニーズを、標準化のタイムラインから解放し、開発者自身がある程度の裁量を持って機能を実装できることを目的とした。

Low Level API の整備は、関連する他の API との整合性にも良い影響を与え、結果として一定の成果を出したと言って良いだろう。

例えば、ブラウザが内部で行っていることを表に出すという点で、以下のような API が整備された。

- [Encoding Standard](https://encoding.spec.whatwg.org/)
- [URL Standard](https://url.spec.whatwg.org/)
- [Streams Standard](https://streams.spec.whatwg.org/)
- [Fetch Standard](https://fetch.spec.whatwg.org/)
- etc

また、 CustomElement など、ユーザが任意の拡張を行うことができる仕様も、こうした動きを加速させている。

しかし、実際にアプリケーションを開発する上では、その Low Level API の上に被せたライブラリや、それを束ねるフレームワークのコードが増える一方だった。

ブラウザが読み込むコードの総量は増え、ネットワークコストやブラウザでの実行コストも無視できないものとなる。

ブラウザがネイティブに実装していれば、そうしたコストの大部分は削減されるため、当然のように High Level API も標準化要求は増える。

こうした High Level API の要求を、 Low Level API にこそ注力すべきだと無視し続けることもできない。

Low Level API の整備が軌道に乗った今こそ、 High Level API に対して標準化の側面からどういう態度を取るか、を考える時期でもある。


## Standarize High Level API

High Level API を標準化するといっても、闇雲に採用し実装するわけにもいかない。

新しい実装によるバグ、セキュリティホール、オーバーヘッド、技術的負債の発生を、いかに防ぐかを考える必要がある。

また、策定しても実装されるまでの間は、 Polyfill を利用するだろう。これが安全に行われなければ、 Ever Green な Web を作るのは難しい。

global namespace に追加される何かは、それがなんであれメンテし続けるか、絶大な努力と慎重なプロセスと膨大な時間を用いて deprecate していくことになる。いずれも望ましいことではない。

そこで、 Polyfill によるユーザランドの実装を積極的に許容し、標準化プロセスからブラウザへの実装と相互にフィードバックさせ、緩やかにネイティブ実装へと移行していくパスを用意する。

これを目指すのが Layered API の基本的なモチベーションと言って良いだろう。


## Layered APIs

Layered API の所以は、単に High Level API を定義する上で、それは必ず現在定義されている Low Level API の上に成り立つように定義するというだけの話だ。

別に難しいことではないが、これによりいくつかのメリットがある。

- ブラウザが既に実装している Low Level API を使って Polyfill が可能
- 既にレビューを通った Low Leve API だけに依存するため、新たなプライバシー/セキュリティリスクを産みにくい

逆にもし Polyfill が不可能であれば、新たな Low Level API の可能性(Use Case)がそこに存在するとし、そちらを先に定義することになるだろう。

ここでは例として Async Local Storage (Local Storage の非同期版) を例に解説していく。




## Layered APIs fallback syntax

これまで Polyfill へのフォールバックは、様々な方法で行われてきた。

例えば以下のような例を考える。

```js
if (window.AsyncLocalStorage=== undefined) {
  // polyfill for async local storage
}

window.AsyncLocalStorage // native or polyfill
```

この例では、あらかじめ polyfill のコードを読み込んでおき、 Global における関数の有無を用いてどちらの実装を使うかを切り分けている。

この場合、もしブラウザが API を実装していても、使われない Polyfill のコードは依然として読み込まれることになる。

また、新しい API を global に追加していくことは、影響もメンテナンスコストも大きい。

そこで、 ES Module の API を用いて、以下のように読み込む構文拡張が提案されている。


```js
import { storage } from "std:async-local-storage";
```

現行の仕様では `from` の後ろには module への URL が書かれるが、ここに `std:` で始まるラベルを書くと、ブラウザの実装する標準 API を読み込むことができる。

これは Opt-In で読み込むことになるため、 Global を汚染せずに新しい API を Ship できるというメリットがある。

また以下のように書くと、もしブラウザが実装していなかった場合に、後半に書いた polyfill へフォールバックすることができる。

```js
import { storage } from "std:async-local-storage|https://cdn.example.com/async-local-storage.js";
```

これにより、もしブラウザに実装があれば、 polyfill のコードは読み込む必要がなくなり、ネットワークコストが削減される。

また、最初からこの形で書いておけば、ブラウザの実装の差を低いコストで埋め、そのまま放置されてもネイティブのコードで置き換わるため、移行コストを低く抑えることができる。

同じことは、 HTML Element の実装においても利用が想定されている。

```html
<script type=module src="std:infinite-list|https://some.cdn.com/infinite-list.js"></script>
<infinite-list></infinite-list>
```

いずれも、まだ提案段階の仕様である。


## proposals

Layered API での仕様策定の候補として、以下の 3 つがある。

- [domenic/async-local-storage](https://github.com/domenic/async-local-storage)
  - promise base の非同期 local storage
- [domenic/infinite-list-study-group](https://github.com/domenic/infinite-list-study-group)
  - ページネーションなどで使われる無限読み込みリスト
- [GoogleChromeLabs/tasklets](https://github.com/GoogleChromeLabs/tasklets)
  - task を別 worker で実装するための API

内容を見ても、まだ始まったばかりであることがよくわかるだろう。


## premature-polyfill

まだまだ始まったばかりの提案ではあるが、 Polyfill の効果的な使い方に注力するこの仕様は、現状の Polyfill の問題をそのまま引きずる。

例えば、以下の場合 polyfill とブラウザの実装で API が異なる場合は、ブラウザアップデートでアプリが壊れることになる。

```js
import { storage } from "std:async-local-storage|https://cdn.example.com/async-local-storage.js";
```

もし十分に API が議論される前に「先走った Polyfill」が作られるとその問題は必ず起こる。

また、経験上 `std:xxx` のタグは取り合いになるだろう。同じタグを記述するサイトでも、全然別の API を元に作られている状態も容易に想像できる。

現時点でおこなわれている polyfilling でも同じことは起こっているため、何も変わってないと言えば変わってないし、 Module を使うことでマシにはなっている。

一方、そうした Polyfill の存在が、標準側で API を変更する際に足を引っ張ることは目に見えているわけだが、この問題へのアドレスは一切ない。

なにより、 Layered API は Polyfill が先に作られることをこそ是としているため、こうした問題に対する何らかの事前策が無くて良いのかとも思う。











## Problem

The [Extensible Web Manifesto](https://extensiblewebmanifesto.org/)'s focus on low-level primitives promotes a healthy, well-layered platform that encourages innovation and experimentation in JavaScript. But focusing on low-level primitives means that developers must build most application-level components on their own, creating a high barrier to entry for new web developers.

拡張可能なウェブ・マニフェストの低レベルプリミティブ上の焦点は、 JavaScript での技術革新と実験を奨励し、健全で、よくレイヤ分けされたプラットフォームを促進します。しかし、低レベルのプリミティブに焦点を当てることは、開発者がアプリケーションレベルのコンポーネントを独自に構築しなければならないことを意味し、新しい Web 開発者の参入障壁が高くなります。

This lack of built-in high-level features also bloats page load size. The average site payload is [2.5 MB and takes 19 seconds to load](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).

high-level な機能が組み込まれていないため、ページの読み込みサイズが大きくなります。平均サイトペイロードは 2.5 MB で、ロードには 19 秒かかります。

Historically, standards bodies and implementers have been reluctant to work on higher-level APIs. In particular, introducing new capabilities via high-level APIs is dangerous, as when we get something wrong, developers are often left with no other way to access these capabilities. Shipping features also incurs an ongoing maintenance and runtime cost - every new feature pollutes the browser namespace, increases JS startup costs, and represents a new surface to introduce bugs throughout the codebase.

歴史的に、標準化団体と実装者は、より高いレベルの API を扱うことに消極的でした。特に、高度な API を使用して新しい機能を導入することは危険です。何か問題が生じた場合、開発者はこれらの機能にアクセスするための他の手段を持たないことがよくあります。機能を sip することは、継続的なメンテナンスとランタイムコストも発生します。新しい機能はすべてブラウザの名前空間を汚染し、 JS の起動コストを増加させ、コードベース全体にバグを導入する新しい面を表します。

Additionally, the incentive for web developers to adopt higher-level APIs is low due to uneven browser uptake. If a feature does not add some essential new capability, but instead makes your application easier to write in newish browsers, it's rarely seen as worthwhile to go through the feature-detection dance if you have to write the fallback code anyway. Instead, developers often just use libraries built on top of the widely-supported lower-level APIs, incurring the attendant costs on all of their users.

さらに、 Web 開発者がより高いレベルの API を採用するインセンティブは、不均一なブラウザの摂取により低いです。機能が何らかの重要な新機能を追加するのではなく、新しいブラウザで簡単にアプリケーションを書き込めるようにする場合は、代わりに代替コードを記述する必要がああり、 feature-detection ダンスを実行するので、価値があるとは思われません。代わりに、開発者は広くサポートされている低レベル API の上に構築されたライブラリを使用して、すべてのユーザーに付随するコストを負担します。


## Goal

Enable the creation of high-level features such that:

- They stay layered on top of low-level features, never getting access to new capabilities unavailable to web developers
- Runtime costs for web developers using the features scale
- Maintenance costs for standardizing and implementing the features scale
- Fallback to polyfills, for browsers that do not support the features, is easy and transparent

次のような高レベル機能の作成を有効にします。

- 低レベルの機能の上に階層化されており、 Web 開発者が利用できない新しい機能にはアクセスできません
- フィーチャスケールを使用する Web 開発者のランタイムコスト
- フィーチャスケールを標準化し実装するためのメンテナンス費用
- 機能をサポートしていないブラウザでは、ポリフィルへのフォールバックは簡単で透過的です


## Solution


### Part 1: the infrastructure

We propose a new syntax for accessing certain web platform features, known as _layered APIs_, by importing them from special URLs:

特別な URL からそれらをインポートすることによって、レイヤード API と呼ばれる特定の Web プラットフォーム機能にアクセスするための新しい構文を提案します。


```html
<script type="module"
        src="std:virtual-list|https://some.cdn.com/virtual-list.js">
</script>

<virtual-list>...</virtual-list>
```


```html
<script type="module">
import { storage } from "std:async-local-storage|https://other.cdn.com/async-local-storage.js";

storage.get("key").then(...);
</script>
```

As shown here, this `std:x|y` URL syntax contains both an _API identifier_ (e.g. "`infinite-list`" or "`async-local-storage`"), and a _fallback URL_. If the browser does not support the layered API specified by the given API identifier, it instead loads the contents of the fallback URL.

ここに示すように、この `std:x|y` URL 構文には、 API 識別子(例: "infinite-list" または "async-local-storage")と代替 URL の両方が含まれています。ブラウザが指定された API 識別子で指定された階層化 API をサポートしていない場合は、代わりに代替 URL のコンテンツを読み込みます。

See [this document](https://docs.google.com/document/d/1jRQjQP8DmV7RL75u_67ps3SB1sjfa1bFZmbCMfJCvrM/edit) for an exploration of alternate syntax options; the above is our tentative choice for now.

See [the proto-spec](./spec.md) for more details on LAPIs infrastructure.


### Part 2: the standards process

Like all web platform features, layered APIs would go through the standards process, producing specifications for their API surface and behavior. However, they would have an important additional constraint: their specifications _must not_ use any "magic" that is inaccessible to web developers. A concrete way of stating this is that a web developer must be able to implement a given layered API's specification, purely in unprivileged JavaScript.

すべての Web プラットフォームの機能と同様に、階層化された API は標準化プロセスを経て、 API サーフェスとビヘイビアの仕様を生成します。しかし、彼らは重要な追加の制約があります:彼らの仕様は、 Web 開発者がアクセスできない "魔法"を使用してはならない。これを具体的に述べる方法は、 Web 開発者があたかも特権のない JavaScript で階層化された API の仕様を実装できることでなければならないということです。

Apart from this additional requirement, layered APIs would be standardized in the same way as other APIs: incubation and explainers; transition to a standards body; TAG review; etc.

この追加要件とは別に、レイヤード API は他の API と同じように標準化されるでしょう:インキュベーションと説明者。標準化団体への移行。タグのレビュー。等


## Benefits for web developers


### Cheaper high-level features

Layered APIs will reduce the amount of script developers need to load over the network.

階層化された API は、スクリプト開発者がネットワーク経由でロードする必要がある量を削減します。

Also, because developers explicitly import the features they use, we don't bloat the global context of the platform for everyone. You only pay the cost of a feature for features that you use. Because of the requirement to import, implementations can use a variety of implementation strategies, ranging from business-as-usual to lazily-loading the feature from their own servers on every use.

また、開発者は使用する機能を明示的にインポートするため、誰にとってもプラットフォームのグローバルコンテキストを肥えさせません。あなたはあなたが使用する機能のための機能のコストを支払うだけです。インポートする必要があるため、実装では、通常どおりのビジネスからあらゆる用途で自分のサーバーの機能を遅延ロードするまで、さまざまな実装戦略を使用できます。


### Encourage layering

By requiring that layered APIs not use any unexposed primitives, we are forced to identify and ship the appropriate low-level primitives needed to build the high-level feature. This gives web developers the tools they need to build their own applications and libraries. And new capabilities are never locked up inside of a higher-level API.

Layered API が expose されてないプリミティブを使用しないように強制することにより、高水準フィーチャを構築するために必要な適切な低水準プリミティブを特定して出荷することが強制されます。これにより、 Web 開発者は独自のアプリケーションとライブラリを構築するために必要なツールを手に入れることができます。また、新しい機能は、上位レベルの API の中に閉じ込められません。


### Built-in fallback

Layered APIs are instantly usable in all browsers via the built-in fallback to polyfill code. At the same time, newer browser versions that do include the feature will not be shipped unnecessary code, thus decreasing page size and JavaScript parsing time.

階層化された API は、ポリフィルコードへの組み込みフォールバックを介して、すべてのブラウザで即座に使用できます。同時に、この機能を含む新しいブラウザのバージョンでは不要なコードは出荷されないため、ページサイズや JavaScript の解析時間が短縮されます。


## Benefits for standardization and implementation


### Healthier platform implementation

Requiring that layered APIs sit on top of the platform's primitives provides a clean implementation boundary. Changing a layered API can't create thorny bugs throughout other specifications or parts of the implementation.

レイヤード API をプラットフォームのプリミティブの上に置くことを要求すると、実装の境界がきれいになります。階層化された API を変更しても、実装の他の仕様や部分に厄介なバグは作成できません。


### Decreased maintenance overhead

Implementers often shy away from building high-level features since they can create large, ongoing technical debt. Layered APIs can reduce this risk, as the clean separation means that much less maintenance work will be required. (Generally, maintenance would only be required if the browser purposefully breaks backward-compatibility in a lower-level features the layered API builds on, or fixes some bug upon which the layered API implementation inadvertently depended.)

実装者は、大量かつ継続的な技術的負債を生み出すことができるため、高度な機能を構築することを躊躇します。クリーンな分離は、保守作業が大幅に少なくて済むため、階層化された API はこのリスクを軽減できます。(一般的に、メンテナンスは、階層化された API が構築する下位レベルの機能でブラウザが意図的に下位互換性を破壊した場合や、レイヤード API 実装が不注意に依存していたバグを修正した場合にのみ必要です。


### Security and privacy

Layered APIs will have an easier time with security and privacy review, since they build on top of other APIs which have already passed security and privacy review. By definition, they are unable to do anything that web developers can't already do themselves, which sets an upper bound on the amount of harm possible.

階層化された API は、すでにセキュリティとプライバシーの審査に合格している他の API の上に構築されるため、セキュリティとプライバシーの審査が楽になります。定義上、 Web 開発者が自ら行うことができないことは何もできないため、可能な害の量の上限が設定されます。


## Caveats

We believe that the layering restriction, and the benefits that come from it, is necessary in order for the web to responsibly ship high-level features. However, this restriction has its tradeoffs:

私たちは、レイヤリングの制限、およびそれに由来する利益は、 Web が責任を持って高水準の機能を提供するために必要であると考えています。ただし、この制限には次のようなトレードオフがあります。

- Privacy and security sensitive features could not be implemented using this method
- Features that require new low-level primitives would be blocked on those primitives being standardized and shipped first

- このメソッドを使用してプライバシーとセキュリティに敏感な機能を実装できませんでした
- 新しい低レベルプリミティブを必要とする機能は、標準化され出荷されているプリミティブではブロックされます


## What makes a good layered API candidate?

When judging whether a feature is a good fit for the layered APIs effort, here are some criteria to consider:

フィーチャが階層化された API の作業に適しているかどうかを判断するときは、考慮すべきいくつかの基準があります。

- **Does this feature need new low-level capabilities to work successfully?** If so it, it isn't a good candidate yet; we need to fill in those gaps first.
- この機能は正常に動作するためには新しい低水準の機能が必要ですか?もしそうなら、それはまだ良い候補者ではありません。最初にそれらのギャップを埋める必要があります。

- **Can this feature stand on its own, or does it require integration into existing APIs?** For example, adding methods or properties to existing web platform objects like `Array` or `HTMLElement` is potentially tricky, and we're not sure yet whether we should create layered APIs that, upon importing, have global side effects. For now, features that require such integration are not a good candidate for layered APIs.
- この機能は単独で使用できますか、既存の API に統合する必要がありますか?例えば、のような既存の Web プラットフォームのオブジェクトにメソッドやプロパティを追加 Array または HTMLElement 潜在的にトリッキーで、我々は、インポート時に、グローバルな副作用を持って、層状の API を作成するかどうかはまだわかりません。今のところ、このような統合を必要とする機能は、階層化された API にとっては適していません。

- **Is this feature tricky to implement performantly or correctly?** It's better for the platform if such features can be standardized once, and implemented by browsers, instead of requiring developers to get them right every time independently. This criteria motivates the potential infinite list or [tasklets](https://github.com/GoogleChromeLabs/tasklets) permafills.
- パフォーマンスを上手く、または正しく実装するには、この機能は難しいですか?このような機能を一度標準化してブラウザで実装すれば、開発者が毎回独立して適切に機能することが求められるのではなく、プラットフォームにとっては優れています。この基準は、潜在的な無限のリストや動機タスクレット permafills を。

- **Do the APIs for this feature vary wildly across the JS ecosystem, or have they mostly settled down?** Layered APIs will be less successful when they try to pick a winner that excludes popular styles or paradigms. For example, a virtual DOM layered API would likely be a poor idea at this time.
- この機能の API は、 JS エコシステム全体で大きく変化するのですか、またはほとんどが解決しましたか?階層化された API は、一般的なスタイルやパラダイムを除いた勝者を選択しようとすると、あまりうまくいかないでしょう。たとえば、仮想 DOM を階層化した API は現時点ではうまくいかない可能性があります。

- **Does this feature involve a lot of styling choices for its UI?** If so, we're still figuring that out (see below), so the feature is probably not (yet) a good fit for the layered APIs effort.
- この機能には UI のスタイル設定が数多く含まれていますか?もしそうなら、我々はまだそれを理解している(下記参照)ので、この機能はおそらく(まだ)階層化された API の努力には適していません。

- **Will this feature be used commonly, or rarely?** In the long term, layered APIs are a good fit for both cases. But for the initial batch of layered APIs, we'd like to focus on ones that will be used widely to show their value in terms of bringing down code size and making it easier to build web apps out of the box.
- この機能は一般的に使用されるのか、まれにしか使用されませんか?長期的には、レイヤード API はどちらの場合にも適しています。しかし、階層化された API の最初のバッチでは、コードサイズを小さくし、 Web アプリケーションを簡単に構築できるという点で、その価値を示すために幅広く使用される API に焦点を当てたいと考えています。


## Styling and UI-component layered APIs

Several potentially good layered APIs, including the [infinite list component](https://github.com/domenic/infinite-list-study-group), are UI components. Such components should generally come with minimal styling-at least as minimal, if not more, than existing standard HTML UI components. It would not be appropriate to encode a specific UI styling, like Material Design (Google) or Cupertino (Apple), into the layered APIs.

無限リストコンポーネントを含む、潜在的に優れた複数のレイヤードAPIは、UIコンポーネントです。そのようなコンポーネントは、一般に、少なくとも既存の標準HTML UIコンポーネントよりも少なくても最小限のスタイリングが必要です。Material Design（Google）やCupertino（Apple）などの特定のUIスタイリングをレイヤードAPIにエンコードすることは適切ではありません。


At the same time, layered APIs should be extremely styleable: authors should be able to make them fit into their pages, ideally with only CSS modifications. In the current landscape, this will require care; e.g. we cannot over-use shadow DOM, since it cannot be styled inside. In the future, [CSS shadow parts](https://tabatkins.github.io/specs/css-shadow-parts/) will greatly help with this.

同時に、階層化されたAPIは非常にスタイルが可能でなければなりません。作成者はCSSの変更だけでページに収まるようにする必要があります。現在の状況では、これには注意が必要です。例えば、内部にスタイルを設定することはできないため、シャドウDOMを過剰に使用することはできません。将来的には、CSSのシャドウ部分がこれを大きく助けます。


That said, it's important that built in UI components on the platform look and feel good by default. So there's an open problem we'll have to figure out for how UI components should be themed by default such that they can be consistent with OS-specific expectations. We can avoid dealing with this problem by starting with UI components that have no visual aspect to them (e.g. infinite list, which has no expectations, vs. new form controls, which do).

つまり、デフォルトでは、プラットフォームのUIコンポーネントをルック＆フィールに組み込むことが重要です。したがって、OS固有の期待と一貫性があるように、UIコンポーネントをデフォルトでどのようにテーマ化するべきかを把握しなければならないというオープンな問題があります。この問題は、視覚的な視点を持たないUIコンポーネント（例：無限リスト、期待できないもの、新しいフォームコントロールなど）から始めることで回避できます。



## Links

- Layered Web APIs Design Doc
  - <https://docs.google.com/document/d/1VbU4z7xtU_kzuLAcj38KKL5qoOr2UYNUJW8vZB2AcWc/edit>
- Layered web APIs fallback syntax
  - <https://docs.google.com/document/d/1jRQjQP8DmV7RL75u_67ps3SB1sjfa1bFZmbCMfJCvrM/edit>
- Layered APIs: an overview and update
  - <https://docs.google.com/presentation/d/1_5EVAiuragdEqop8V9b1hJkOW38y4EsXYgNBKdpSHmA/edit>
- drufball/layered-apis: A new standards effort for collaborating on high-level features.
  - <https://github.com/drufball/layered-apis>
  - <https://github.com/drufball/layered-apis/blob/master/spec.md>
