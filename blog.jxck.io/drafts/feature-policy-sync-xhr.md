# [performance][xhr][feature-policy] Feature Policy で同期 XHR を禁止する


## Intro

ブラウザの機能を制限する Feature Policy の策定が進みつつある。

今回は、 Feature Policy のモチベーションおよび適用について、 sync-xhr を用いて解説する。


## 機能制限のニーズ

パフォーマンスやセキュリティの観点から、実装はあるが、使用する上で制限を設けたい機能がいくつか存在する。

例えば、同期 XHR や `document.write()` は、レンダリングを阻害するため、代替される非同期 API の利用が推奨される(ex AMP)。

fullScreen, payment, geolocation などは、 `<iframe>` などからユーザの意図しない実行がなされると問題になる場合もある。

しかし、一律でこうした機能を制限しては互換性を保つことができない(すでに動いているサイトが動かなくなる)。

そこで、 HTTP や HTML などから明示的に設定し、制限を行うための API が Feature Policy である。

こうした制限は、 1st Party のみならず、手を出すことができない 3rd Party の実装についても波及させることができる。

よって、レンダリングを止めてでもクリックを誘発するような実装を行う広告などに対しても、効果が期待できる。


## CSP/iframe sandbox との違い

Feature Policy は CSP と非常に似ている。

例えば、 `<iframe sandbox>` とすれば、その iframe の中で実行可能な機能は制限される。

しかし、これは `<iframe>` タグそのものに手を加える必要があるため、 3rd Party のコンテンツでは手が出せない場合もある。

また、機能がホワイトリスト(許可したい機能を列挙する)方式で制限の緩和を行うが






[HTML5] defines a sandbox attribute for iframe elements that allows developers to reduce the risk of including potentially untrusted content by imposing restrictions on content’s abilities - e.g. prevent it from submitting forms, running scripts and plugins, and more. The sandbox directive defined by [CSP2] extends this capability to any resource, framed or not, to ask for the same set of restrictions - e.g. via an HTTP response header (Content-Security-Policy: sandbox). These mechanisms enable the developer to:

Set and customize a sandbox policy on any resource via CSP.
Set and customize individual sandbox policies on each iframe element within their application.
However, there are several limitations to the above mechanism: the developer cannot automatically apply a policy across all contexts, which makes it hard or impossible to enforce consistently in some cases (e.g. due to third-party content injecting frames, which the developer does not control); there is no mechanism to selectively enable features that may be off by default; the sandbox mechanism uses a whitelist approach which is impossible to extend without compatibility risk.

Feature Policy is intended to be used in combination with the sandbox mechanism (i.e. it does not duplicate feature controls already covered by sandbox), and provides an extensible mechanism that addresses the above limitations.


[HTML5]は、フォームの送信、スクリプトやプラグインの実行などを防ぐなど、コンテンツの能力に制限を加えることで、潜在的に信頼できないコンテンツを含むリスクを軽減するsandboxためのiframe要素の属性を定義します。サンドボックスによって定義された指令[CSP2]は、制限の同じセットを求めるために、フレームかどうか、任意のリソースへのこの機能を拡張- HTTPレスポンスヘッダを介して、例えば、（ Content-Security-Policy: sandbox）。これらのメカニズムにより、開発者は以下を行うことができます。

CSPを使用して任意のリソースのサンドボックスポリシーを設定およびカスタマイズします。
iframeアプリケーション内の各要素の個別のサンドボックスポリシーを設定およびカスタマイズします。
ただし、上記のメカニズムにはいくつかの制限があります。開発者はすべてのコンテキストにわたってポリシーを自動的に適用できないため、場合によっては一貫して適用することが困難または不可能です（たとえば、コントロール）; デフォルトでオフになっている機能を選択的に有効にするメカニズムはありません。サンドボックスメカニズムは、互換性のリスクなしに拡張することが不可能なホワイトリストアプローチを使用します。

機能ポリシーは、サンドボックスメカニズムと組み合わせて使用​​することを意図しています（つまり、サンドボックスで既にカバーされている機能コントロールを複製しません）。また、上記の制限に対応する拡張可能なメカニズムを提供します。








## Feature Policy

Chrome 65 では Feature Policy として sync-xhr が実装された。

同期の XHR は、 `xhr.open()` の第三引数を `false` にすることで有効になり、レスポンスが戻るまで `xhr.send()` でブロックする。


```javascript
document.querySelector('button').onclick = (e) => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', '/', false)
  try {
    xhr.send()
  } catch (e) {
    console.log(e.name, e.message)
    console.error(e)
  }
}
```

このレスポンスに対して、以下のようなヘッダを付与すると、 `xhr.send()` が `NetworkError` で fail する。
`'none'` は、トップレベル以下全体にこのポリシーを設定する。

```
Feature-Policy: sync-xhr 'none'
```


`'self'` にした場合は、 Same Origin であれば (`<iframe>` でも)許可される。


```
Feature-Policy: sync-xhr 'self'
```

他にも許可したいオリジンがあれば、ホワイトリスト方式で列挙し、他の機能があった場合も、同じように機能をリストしていく。


```
Feature-Policy: sync-xhr 'none'; geolocation 'self' http://example.com
```


## DEMO

<https://labs.jxck.io/feature-policy/sync-xhr/>


## 
