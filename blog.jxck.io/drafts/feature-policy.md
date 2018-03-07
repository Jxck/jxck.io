# [performance][xhr][feature-policy] Feature Policy と iframe sandbox による機能制限と選択的許可


## Intro

ブラウザの機能を制限する Feature Policy の策定が進みつつある。

Feature Policy は、ブラウザが持つ機能について選択的に許可/制限を行う API だ。

似たモチベーションの iframe sandbox よりも、汎用的な設計がされている。

Feature Policy のモチベーションおよび適用方法について解説する。


## 機能制限のニーズ

パフォーマンスやセキュリティの観点から、実装はあるが、使用する上で制限を設けたい機能がいくつか存在する。

例えば、同期 XHR や `document.write()` は、レンダリングを阻害するため、使用は避けるのが望ましい。

fullScreen, payment, geolocation などは、 クロスオリジン iframe などからユーザの意図しない実行がなされると問題になる場合もある。

しかし、ブラウザのデフォルト挙動が、一律でこうした機能を制限しては互換性を保つことができない(すでに動いているサイトが動かなくなる)。

そこで、 HTTP や HTML などから明示的に設定し、機能を許可/制限する方法が長いこと模索されていた。


## iframe sandbox

iframe sandbox は、 iframe 内に展開したコンテンツにおいて、機能を制限できる。

これは、信頼の無いコンテンツを安全に読み込む場合などに利用できる。

<https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox>

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

また、ホワイトリスト方式では、サンドボックス対象となる、ブロックしたい機能を増やした場合に問題になる。

仕様に機能制限が追加されると、古い仕様で `sandbox` を検証した際に動いていた別の機能が、ブラウザのアップデートで急に動かなくなってしまう可能性があるからだ。

つまり、 `sandbox` は **互換性のリスクなしに拡張することが実質できない**。

DEMO: <http://labs.jxck.io/content-security-policy/sandbox.html>


## Feature Policy

sandbox iframe のように埋め込むコンテンツ以外にも、広くコンテンツ一般に対して機能を制限したい場合がある。

また、逆にデフォルトでは無効になっている API のアクセスを、明示的に許可したい場合もある。

このように、リソースに対して機能の制限/許可を付与する汎用的な方法として定義されたのが Feature Policy である。

<https://wicg.github.io/feature-policy/>

Feature Policy はレスポンスヘッダに付与し、対象機能の許可/制限をオリジン単位で設定することができる。

ここでは、 Chrome に実装されている `sync-xhr` で、同期 XHR の制限を例に解説する。


### 'none'

`none` は、全てのオリジンに対して制限を適用する。つまりこれでページ上全ての同期 XHR が制限される。


```
Feature-Policy: sync-xhr 'none'
```


### 'self'

`self` は、同一オリジン上は許可し、それ以外のオリジンでは制限する。

iframe があった場合も、同一オリジンなら許可されるが、 クロスオリジンでは制限される。


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

しかし、最近の強力な機能は、 Feature Polic が無くとも iframe からの呼び出しがデフォルトで制限されているものがある。

Feature Policy は、こうした機能に対して許可を与えるための機能という側面もある。

例えば、現在 Chrome では iframe から Web MIDI API を呼び出すことはデフォルトで制限されている。

これを、特定のドメインにのみ許可したい場合は、以下のように指定する。


```
Feature-Policy: midi 'self' https://example.com
```

もし Web MIDI API の呼び出しを全オリジンに対して許可したい場合は以下のように指定することも可能だ。


```
Feature-Policy: midi *
```


### with iframe sandbox

前述のように iframe sandbox は制限事項の追加拡張に対して閉じている。

そこで、 iframe に対して sandbox に入っていない機能を、追加でに無効化する用途でも Feature Policy が使用可能だ。

Feature Policy は **sandbox が制限する機能は重複して持たず** sandbox と組み合わせて利用することが想定されている。

設定する際は、 CSP の sandbox を基準とし、許可したいものを `allow-*` で、追加で制限したいものを Feature Policy で行うことになるだろう。

例として、 iframe Sandbox を有効にしつつ、 Web MIDI API を許可したい場合は、 JS の実行を許可する必要がある。

が、それによって sycn-xhr が行われるのは制限したいといった場合は以下のようになるだろう。


```
Content-Security-Policy: sandbox allow-scripts;
Feature-Policy: sync-xhr 'none'; midi https://example.com;
```

## DEMO

DEMO: <https://labs.jxck.io/feature-policy/>


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


## Feature Policy と Permission

許可という側面で言えば、 Feature Policy は iframe に対して明示的に許可を与えることで安全側に倒すという側面がある。

しかし、これはあくまでページ自体での機能の利用がユーザによって許可されていることが前提となる。

例えば、 iframe に Feature Policy で Web MIDI API を許可する前提として、ユーザが Web MIDI API を許可している必要がある。

この場合、 Feature Policy は、その権限を iframe (および top level)に対して移譲する API と見ることができるだろう。


## 今後

品質の低い埋め込み広告などでは、いまだに同期処理を実行することで他のレンダリングを阻害することで、クリックを稼ぐといったことが行われる場合もある。

こうした iframe に埋め込む、手出しできない 3rd Party のコンテンツに対して、明示的な制限を化すことは、 AMP と同様にパフォーマンス的なメリットに繋がる可能性はあるだろう。

また、 CSP とは違い、 Script の実行を許しつつ影響の大きい機能の呼び出しだけを防ぐことができるため、セキュリティ的には二次的な予防策として期待できそうだ。

Report Only が実装されれば、潰しきれていない sync-xhr を発見するといった用途も考えられる。

今後も、 Policy の実装は増えていくと予想されるため、それに合わせて使い方を模索していきたい。
