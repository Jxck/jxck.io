# [performance][xhr][feature-policy] Feature Policy による Permission Delegation


## Intro

ブラウザの機能を制限する Feature Policy の実装が進みつつある。

Feature Policy は、ブラウザが持つ機能について選択的に許可/制限を行う API だ。

AMP のように特定の機能を制限する目的にも使えるが、クロスオリジン iframe に対する権限移譲のための API としても使用される。

Feature Policy のモチベーションおよび適用方法について、類似する CSP や iframe sandbox と合わせて解説する。

なお、今回解説する内容は、まだブラウザの実装に反映されていない部分があるため、注意されたい。


## Motivation

まず Feature Policy のモチベーションとして、 **機能の制限** と **権限の移譲** という二つのニーズを解説する。


### 機能の制限

パフォーマンスやセキュリティの観点から、実装はあるが、使用する上で制限を設けたい機能がいくつか存在する。

例えば、同期 XHR や `document.write()` は、レンダリングを阻害するため、使用を避けるのが望ましい。

しかし、ブラウザのデフォルト挙動が、一律でこうした機能を制限しては互換性を保つことができない(すでに動いているサイトが動かなくなる)。

AMP は、最初から機能が制限されたサブセットの仕様を定義し、それを強制するアプローチをとった。

同等のことを、 HTTP や HTML などから明示的に設定し、機能を許可/制限する方法は長いこと模索されていた。


### 権限の移譲

geolocation, getusermedia など、強力な API については、ユーザに対して許可を求めるようになっている。

一方で、こうした許可を iframe に読み込んだクロスオリジンのコンテンツに対していかに付与するかという方法についも、長いこと議論されてきた。

例えば、 <https://jxck.io> の中で <https://payment.example.com> を iframe で埋め込んでいたとする。

iframe では強力な API が実行されるため、ユーザに許可を求める必要がある。

- **jxck.io の画面上** に **「example.com が xxx の許可を求めている」** とプロンプトが出ても、その意味がユーザに伝わるか。
- 仮に権限が付与されたとして、別のページが同じように example.com を埋め込んでいた場合、その権限はどうすべきか。
- iframe が複数埋め込まれていた場合に、複数プロンプトを出すことの UX はどうか
- ユーザが権限を削除したいと考えた時、 jxck.io を見ていたのに、削除するのは example.com への権限だと、どのように気づかせるか。

こうした問題について、実際に検証した結果は以下に報告されている。

- [Permission Delegation Proposal](https://docs.google.com/document/d/1x5QejvpyQ71LPWhMLsaM1lWCfSsBsSQ8Dap9kJ6uLv0)
- [Understanding Permission Requests From Iframes](https://docs.google.com/presentation/d/1suzMhtvMtA11jxPUdH1jL1oPh-82rTymCnslgR3ehEE)

そして、結論としては以下のようなモデルが採用されることとなった。

- iframe 内では、強力な機能の権限を [デフォルトでオフにする](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/mG6vL09JMOQ)
- ユーザは基本的に URL バーに表示された <https://jxck.io> を信頼の対象とする
- permission ui は、 `「このサイトに権限を許可するか」` をユーザに問う
- 権限を付与された <https://jxck.io> は <https://example.com> へ、その **権限を移譲** できる

例えば、 Payment のために 3rd Party iframe を埋め込んだサイトがある場合、ユーザが信頼するかどうかを決めるのはあくまでその **サイト自体** ということだ。

埋め込まれた Payment 用の iframe を選定したのはそのサイトであり、そこを含めてユーザはそのサイトを信頼するかどうかを決めるべきという方針である。

もし既にサイト自体に権限があれば、サイトはプロンプト無しに iframe に権限を移譲できる。

サイトが権限を得る前ならば、 iframe が権限を必要とした時点で、 **サイト自体に権限を与えるか** のプロンプトが出る。

そして、この **機能の制限** および **権限の移譲** は Feature Policy を用いて行うこととなった。

**ただし、まだ方針がきまりつつある段階であり、実装がその通りにされているわけではない。**

それを踏まえた上で、類似する API である iframe sandbox とその CSP 版も合わせて、これら API について解説する。


## iframe sandbox

iframe sandbox は、 iframe 内に展開したコンテンツにおいて、機能を制限できる。

これは、信頼の無いコンテンツを安全に読み込む場合などに利用できる。

<https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox>

iframe sandbox の特徴は、何をブロックするのかが先に決まっているという点だ。

もし制限を緩める場合は、許可する機能を明示的に指定するホワイトリスト方式を採用している。

執筆時点では、以下のような `allow-*` ディレクティブが定義されている。

- allow-forms
- allow-modals
- allow-orientation-lock
- allow-pointer-lock
- allow-popups
- allow-popups-to-escape-sandbox
- allow-presentation
- allow-same-origin
- allow-scripts
- allow-top-navigation
- allow-top-navigation-by-user-activation

何も許可せず、全てブロックする場合は以下のようになる。


```html
<iframe sandbox="" src="example.com"></iframe>
```

DEMO: <http://labs.jxck.io/iframe>


## CSP

HTML に埋め込む sanbox 属性は、埋め込んだ iframe にしか適用されない。

これを HTTP ヘッダで適用できるように、 CSP2 では sandbox ディレクティブが追加された。


```
Content-Security-Policy: sandbox
```

<https://w3c.github.io/webappsec-csp/#directive-sandbox>

機能は基本的に HTML に書く場合と同じだ。

しかし、元々がホワイトリスト方式であることにより、いくつか微妙なところがある。

まず、他の CSP ディレクティブと違い、「何をブロックしたい」というブラックリストではないため Reporting の対象では無い。

もし Report-Only で適用した場合は、単に無視されることになる。

また、ホワイトリスト方式では、サンドボックス対象のブロックしたい機能を増やした場合に問題になる。

仕様に機能制限が追加されると、古い仕様で sandbox を検証した際に動いていた別の機能が、ブラウザのアップデートで急に動かなくなってしまう可能性があるからだ。

つまり、 sandbox は **互換性のリスクなしに拡張することが実質できない**。

CSP のように、ブラックリスト方式を取っていれば、制限したい項目を増やしオプトインで適用していけるため、拡張に対して開いた設計となるのは、後から判明したのだろう。

DEMO: <http://labs.jxck.io/content-security-policy/sandbox.html>


## Feature Policy

sandbox iframe のように埋め込むコンテンツ以外にも、広くコンテンツ一般に対して機能を制限したい場合がある。

また、逆にデフォルトでは無効になっている API へのアクセスを、明示的に許可したい場合もある。

このように、リソースに対して機能の制限/許可を行う汎用的な方法として定義されたのが Feature Policy である。

<https://wicg.github.io/feature-policy/>

Feature Policy はレスポンスヘッダに付与し、対象機能の制限/許可をオリジン単位で設定することができる。

ここでは、 Chrome に実装されている `sync-xhr` で、同期 XHR の制限/許可を例に解説する。


### 'none'

`none` は、全てのオリジンに対して制限を適用する。つまりこれでページ上全ての同期 XHR が制限される。


```
Feature-Policy: sync-xhr 'none'
```


### 'self'

`self` は、同一オリジン上は許可し、それ以外のオリジンでは制限する。

iframe があった場合も、同一オリジンなら許可されるが、クロスオリジンでは制限される。


```
Feature-Policy: sync-xhr 'self'
```


### allowlist

機能を許可するオリジンをホワイトリストで指定できる。

例えば以下のようにすれば、同一オリジンに加え、 iframe 内の example.com では許可される。


```
Feature-Policy: sync-xhr 'self' https://example.com
```

sync-xhr の場合は、もともとブラウザで有効になっている機能を Feature Policy によって機能を制限しつつ、ホワイトリストで例外を設ける形になる。


### 権限移譲

最近の強力な機能は、 iframe からの呼び出しがデフォルトで制限されているものがある。

例えば、現在 Chrome では iframe から Geolocation API を呼び出すことはデフォルトで制限されている。

これを、特定のドメインにのみ許可したい場合は、以下のように指定する。


```
Feature-Policy: geolocation 'self' https://example.com
```

すると、この iframe で Geolocation API が呼び出された時、埋め込んだサイト上でプロンプトが表示される。

ユーザがこれを許可すると、サイトに対して権限が付与され、それが example.com にも移譲される。

これにより、 iframe 内で Geoloation API が実行できることになる。

(執筆時点では、この Prompt はまだ 「example.com が現在位置の取得を求めている」という表示になっているが、この表示はいずれ変更されるようだ)

もし Geolocation API の呼び出しを全オリジンに対して許可したい場合は以下のように指定することも可能だ。


```
Feature-Policy: geolocation *
```

DEMO: <https://labs.jxck.io/feature-policy/geolocation/basic.html>


### with iframe sandbox

前述のように iframe sandbox は制限事項の追加拡張に対して閉じている。

そこで、 iframe に対して sandbox に入っていない機能を、追加で無効化する用途でも Feature Policy を用いる。

Feature Policy は **sandbox が制限する機能は重複して持たず** sandbox と組み合わせて利用することが想定されている。

設定する際は、 CSP の sandbox を基準とし、許可したいものを `allow-*` で、追加で制限したいものを Feature Policy で行うことになるだろう。

例として、 iframe Sandbox を有効にしつつ、 Geolocation API を許可したい場合は、 JS の実行を許可する必要がある。

が、それによって sycn-xhr が行われるのは制限したいといった場合は以下のようになるだろう。


```
Content-Security-Policy: sandbox allow-scripts;
Feature-Policy: sync-xhr 'none'; geolocation https://example.com;
```

(執筆時点では、この組み合わせは想定通りの挙動をしないため、報告中である。)

DEMO: <https://labs.jxck.io/feature-policy/geolocation/sandbox.html>


## Feature 一覧

仕様自体には Feature の一覧が無いが、いくつかリストを持っているドキュメントは存在する。

この辺の扱いについてはよくわかっていないが、現時点では実装ベースで判断する必用がありそうだ。

- <https://github.com/WICG/feature-policy/blob/gh-pages/features.md>
- <https://docs.google.com/document/d/1k0Ua-ZWlM_PsFCFdLMa8kaVTo32PeNZ4G7FFHqpFx4E/edit>
- <https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/feature_policy/FeaturePolicy.cpp?sq=package:chromium&dr=C&l=225>


## Reporting

Feature Policy には執筆時点で Reporting の仕様が無い。

しかし、これは Reporing 側で CORS の Preflight をどうするかの問題がブロッカーとなっているだけで、盛り込む予定ではあるようだ。

<https://github.com/WICG/feature-policy/issues/142>


## Outro

Feature Policy には 2 つの側面がある

- 機能の制限
- 権限の移譲

3rd Party への Permission Delegation の側面は、今後強力な機能を安全に活用していく上で、非常に重要だ。

そもそも 1st Party でブロックされていてはどうしようもないという点で、プロンプトで許可を求める UX は、さらに一層慎重になるべきだろう。

上手く使えば 1st Party におけるパフォーマンスやセキュリティの面でも、効果を出すことができそうだ。

まだ、ブラウザの実装が整っていないため、そこを注視しつつ、今後実装される Policy やリアルワールドレポートの知見を貯めていきたい。
