# [xss][trusted types][security] 安全な文字列であると型で検証する Trusted Types について

## Intro

脆弱性の原因となる DOM 操作の代表例として `elem.innerHTML` や `location.href` などが既に知られている。

こうした操作対象(sink) に対して、文字列ベースの代入処理を行う際に、一律して検証をかけることができれば、脆弱性の発見や防止に役立つだろう。

そこで処理前の文字列に対し、処理後の文字列を安全であるとして明示的に型付ける TrustedTypes という提案がされている。

まだ未解決の部分が多い提案だが、現時点での仕様と実装を元に、このアイデアについて解説する。

- [WICG/trusted-types](https://github.com/WICG/trusted-types)
- [Intent to Experiment: Trusted Types](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/I9To21DXcLo/NrU9P0M4EAAJ)


## Sink

XSS などの原因となる DOM 操作として、 DOM に直接文字列を展開する処理がある。

- `element.innderHTML`
- `location.href`
- `script.src`
- `script.textContent`

こうした API は WebIDL でいう DOMString を許容しており、おおよそ任意の文字列を受け入れる。

そこで、開発者は意図しない文字列が代入されないように、エスケープなど事前処理を行う必要がある。

しかし、適切な前処理はあくまで開発者側が担保するものなので、往々にして抜けが出る。

規模が大きければ、レビューなどを行なっても、それらを見つけ出すことは難しい。

これらの API を利用する場合は、意図しない文字列が代入されても良いように、適切な事前処理を行う必要がある。

規模が大きくなれば、テストやセキュリティレビューで全てをあぶりだすことも難しい。

最近では、そもそもの DOM 処理をフレームワークに任せるか、型による検証を通して抜け漏れを防ぐといった工夫がなされている。

Trusted Types は、ブラウザ自体に型を認識させ、処理をフックすることで、意図しない処理を見つけ出すことが目的とされている。


## CSP trusted-types

TrustedTypes は CSP により Opt-In で利用する。


```http
Content-Security-Policy: trusted-types
```

これにより、現時点では以下のような処理がエラーとなる。

- `element.innderHTML`
- `location.href`
- `script.src`
- `script.textContent`


```js
const $ = document.querySelector.bind(document);

// Uncaught TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires `TrustedHTML` assignment.
$('div').innerHTML = '<img src=/ onerror="alert(10)">'

// Uncaught TypeError: Failed to set the 'href' property on 'Location': This document requires `TrustedURL` assignment.
location.href = 'https://fishing.example.com';

// Uncaught TypeError: Failed to set the 'src' property on 'HTMLScriptElement': This document requires `TrustedScriptURL` assignment.
const $script = document.createElement('script')
$script.src = 'https://attack.example.com/script.js'

// Uncaught TypeError: Failed to set the 'textContent' property on 'Node': This document requires `TrustedScript` assignment.
$('script').textContent = 'alert(0)'
```

エラーを見るとわかるように、それぞれの処理は単なる文字列、 WebIDL でいう DOMString ではなく、それぞれ以下の型を要求していることがわかる。

- TrustedHTML
- TrustedURL
- TrustedScriptURL
- TrustedScript

各処理は、 DOMString をこの型に変換してからでないと行えないようになった。


## Trusted Types

DOMString を TrustedTypes に変換するには、まず TrustedTypePolicy を生成する必要がある。

これは、以下のように `createPolicy()` を用いて生成する。


```js
const policy = TrustedTypes.createPolicy('application-policy', {
  createHTML:      (unsafe) => {/*..*/},
  createURL:       (unsafe) => {/*..*/},
  createScriptURL: (unsafe) => {/*..*/}
  createScript:    (unsafe) => {/*..*/}
})
```

例えば `innerHTML` できる TrustedHTML は、この Policy に定義した `createHTML()` を通して取得することができる。


```js
const trustedHTML = escapePolicy.createHTML('<img src=/ onerror="alert(10)">')
$('div').innerHTML = trustedHTML
```

つまり、 `innerHTML` の前には HTML Special Chars のエスケープを必須としたいという場合は、 `createPolicy()` の引数に渡す関数にその処理を入れれば良い。


```js
const policy = TrustedTypes.createPolicy('application-policy', {
  createHTML: (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})

const trustedHTML = escapePolicy.createHTML('<img src=/ onerror="alert(10)">')
$('div').innerHTML = trustedHTML // html special chars escaped
```

これで全ての innerHTML は確実にエスケープされていることを保証できる。

このように Trusted Types は、安全に処理されたことを型として定義し、それをブラウザが認識することで、安全で無い処理を防ぐことを目的としている。


## Opt-In Policy

先のように `createPolicy('application-policy')` で定義した Policy を利用するためには、必ず CSP に「利用を許可する Policy の名前」の指定が必要だ。

これをしなければポリシーを利用した時点で CSP エラーとなる。


```http
Content-Security-Policy: trusted-types application-policy
```

これは Policy から `createHTML` すれば型としては TrustedType であるため、なんらかの方法で Policy も仕込まれてしまうことを防ぐ目的もある。


```js
const dummyPolicy = TrustedTypes.createPolicy('dummy', {
  createHTML: (unsafe) => unsafe
})

// CSP で dummuy が定義されていなければ使えない
const trustedHTML = dummyPolicy.createHTML('<img src=/ onerror="alert(10)">')
document.querySelector('div').innerHTML = trustedHTML
```

ここで定義した Policy 名の `dummy` は、 CSP で指定されていないため使うことができない。


## 名前空間

Policy オブジェクトは戻り値でしか取得できないため、広く参照される場合は expose によって明示的に公開することができる。


```js
TrustedTypes.createPolicy('escape', {
  createHTML: (unsafe) => {/*...*/}
}, true); // expose = true
```

expose された Policy は `getExposedPolicy(name)` で取得が可能だ。


```js
const escapePolicy = TrustedTypes.getExposedPolicy('escape')
const escapedValue = escapePolicy.createHTML('<b>escape me</b>');
```

Global に Policy が定義されるため、名前が衝突する再定義はエラーになる。

基本は expose せずに閉じた範囲で利用し、ライブラリなどによって提供される Policy の場合は Prefix をつけるなどした方が良さそうだ。


## Example

アプリケーション全体で共通するポリシー例を考察する。

- createHTML:      HTML Special Chars をエスケープする
- createURL:       同じオリジンでない場合はエラーとする
- createScriptURL: ホワイトリストに無いオリジンはエラーとする
- createScript:    定義しないことで利用そのものをエラーとする


```js
TrustedTypes.createPolicy('https://labs.jxck.io', {
  createHTML: (unsafe) => {
    console.log('createHTML')
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },
  createURL: (unsafe) => {
    console.log('createURL')
    const unsafeurl = new URL(unsafe)
    const currenturl = new URL(location.href)

    if (unsafeurl.origin !== currenturl.origin) {
      throw new Error('url of unexpected origin')
    }
    return unsafeurl
  },
  createScriptURL: (unsafe) => {
    console.log('createScriptURL')
    const unsafeurl = new URL(unsafe)
    const currenturl = new URL(location.href)

    const whitelist = [
      currenturl.origin,
      'https://unpkg.com',
      'https://www.google-analytics.com',
    ]

    if (whitelist.includes(unsafeurl.origin) === false) {
      throw new Error('url of unexpected origin')
    }

    return unsafe
  },
  /* not define createScript */
}, true);
```


## 考察


### 何もしない、はできない。

意図しないものを省くために、エスケープのように強制的に変換できれば良いが、意図しない場合は明示的にエラーを投げるか、定義しないことでエラーを発生させるしか方法が無い。

エラーにできることもメリットであるが、エラー処理に悩まされるくらいなら操作を無視できた方が良い場合もありそうだ。

例えば `createURL()` で `null` や `undefined` を返しても、 `location.href` へ代入は行われてしまい、遷移がおこる。

せっかくなら、何もしないということがうまく表現できると、エラー処理を気にせずにいられるので良さそうだ。


### 同期処理のみ

Policy に定義する関数は同期処理しかできない。

これは `innerHTML` などの API がそもそも同期(代入)なのでしかたがない。

しかし、例えば URL の WhiteList を IndexedDB や fetch で取得する、といった処理は書けないため、そのあたりはコード側で工夫する必要がある。


### expose が boolean

`createPolicy()` の第三引数の expose が、現時点では boolean で定義されている。


```js
TrustedTypePolicy createPolicy(DOMString policyName, TrustedTypeInnerPolicy policy, optional boolean expose = false);
```

これでは、仮にもう一つオプションを増やしたいという場合に、拡張に対して閉じてしまっている。

同じことは [PassiveEventListener](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html#feature-detection) でもあったため、基本的に最後のオプションはオブジェクトの方が良いだろう。

これは、 [issue](https://github.com/WICG/trusted-types/issues/123) を上げておいた。


### Performance

CSP で有効にした時点で、対象となる全ての処理にフックが入る設計となっている。

まだ Experimental であるため、性能を測る段階では無いが、オーバーヘッドが気になってくるところでもある。


### Reporting

現時点では Reporting API の対応は入っていないようだが、 Intents を見ると under consideration であるようだ。

対応すれば、 CSP Report Only でもデプロイできるようになることが想像されるため、導入の敷居は下がるだろう。


### CSP 無効での利用

CSP によって有効になるのは、型が違う場合にエラーをあげることだけだ。

つまり Pocliy のメソッドを経由して DOMString を TrustedTypes に変換することは、 CSP で有効にしなくても可能だ。

これだけでも以下の二つのメリットが考えられる

- 標準化された型があることにより、 WebIDL を参考に TypeScript などに導入し、型の検証に利用することができる。
- これまで設計に依存していたエスケープの所在が標準化され、フレームワークやライブラリとの間で、安全な設計を共有する共通言語ができる。

エスケープを強制する規約を設けたり、そこに型を与えて静的に解析することで、 TrustedTypes と同等のことを自前でやっている場面は少なく無いだろう。

そこに共通の作法が生まれることは、現実的なメリットがあるように感じる。


### 懸念点

他の CSP と同様 TrustedTypes をデプロイすることは、多くの拡張や bookmarklet などの DOM への介入を一括して阻害する可能性がある。

もちろん拡張などに対して Policy を expose すればいいが、対応する方のコストは現実的では無い。

従って他の CSP と同様に、テストやステージングで有効にし、違反が無いかを Reporting などで検出する、対応したら Report-Only でデプロイすることで様子を見るのがしばらくは良さそうに感じた。


## まとめ

開発の場面でフレームワークを使うことが一般的となり、今回解説したような Sink を直接操作する機会はかなり減ってきた。

直接操作せず FW に任せることにより、安全性を担保し、特に innerHTML に起因する典型的な XSS については滅多に発生しない状況まできていると筆者は考える。

(それでも `location.href` などは FW のスコープ外にあり、穴が開きやすいところでもあるとは思う)

その点では、現状でこの API に注目できる程度に対策が行えているプロジェクトにおいて、導入するコストに対して堅牢性がどの程度向上するかは、なんとも言えなさそうだというのが最初の印象だ。

特にユーザが拡張等を利用できなくなることは、脆弱性以上のデメリットをもたらす可能性もあるだろう。

一方、エスケープの所在の標準化や、標準型の導入による静的解析の支援などは、標準化に至ればエコシステムの共通言語として使われる可能性は無くはなさそうだ。

それを踏まえて、現状の設計を見直す際に、参考にするのは現状の適切な距離の取り方かもしれない。

あとは、ビルド時の静的な型検査、ステージングなどでのランタイム検査の恩恵を受ければ、 CSP Report Only や off  でデプロイでも一定の効果は予想され、当面はそこが現実的な気もする。

実際に TrustedTypes を使うかどうかを別としても、「型によるランタイム検証」の方針は W3C では新しい試みなので、この波が今後の API 設計にどう影響していくかは興味がある。

それらを踏まえ、検証とフィードバックが行なっていければと考える。


## DEMO

以下に DEMO を用意した。

動作は Chrome Canary 74.0.3684.0 で確認している。

[TrustedTypes Labs \| labs.jxck.io](https://labs.jxck.io/trusted-types/)


## 本サイトの適用

本サイトは JS による DOM 操作を行なっていない。

また、閲覧者の拡張による変更を許容したいため、適用はしない。


## Links

- [WICG/trusted-types: Polyfill implementation of Trusted Types - a proposal to get rid of DOM XSS vulnerabilities in the web platform.](https://github.com/WICG/trusted-types)
- [Intent to Experiment: Trusted Types](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/I9To21DXcLo/NrU9P0M4EAAJ)
- [Trusted Types issue #20 mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/20)
- [Trusted Types issue #198 w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/198)
