# [xss][security] 安全な文字列であると型付ける Trusted Types について

## Intro

XSS の原因となる DOM 操作の代表例として `elem.innerHTML` や `location.href` などが既に知られている。

こうした操作対象(sink) に対して、文字列ベースの代入処理をする際に、一律して検証をかけることができれば、脆弱性の発見や防止に役立つだろう。

そこで処理前の文字列に対し、処理後の文字列を安全であるとして明示的に型付ける TrustedTypes という提案がされている。

まだ未解決の部分が多い提案だが、現時点での仕様と実装を元に、このアイデアについて解説する。


## Sink

XSS の原因となる DOM 操作として、 DOM に直接文字列を展開する処理がある。

- `element.innderHTML`
- `location.href`
- `script.src`
- `script.innerHTML`

こうした API は WebIDL でいう DOMString を許容しており、おおよそ任意の文字列を受け入れる。

そこで、開発者は意図しない文字列が代入されないように、エスケープなど事前処理を行う必要がある。

しかし、適切な前処理はあくまで開発者側が担保するものなので、往往にして抜けが出る。

規模が大きければ、レビューなどを行なっても、それらを見つけ出すことは難しい。


これらの API を利用する場合は、意図しない文字列が代入されても良いように、適切な事前処理を行う必要がある。


規模が大きくなれば、テストやセキュリティレビューで全てをあぶりだすことも難しい。

最近では、そもそもの DOM 処理をフレームワークに任せるか、型による検証を通して抜け漏れを防ぐといった工夫がなされている。


Trusted Types は、ブラウザ自体に型を認識させ、処理をフックすることで、意図しない処理を見つけ出すことが目的とされている。




## Trusted Types

Trusted Types は、安全に処理されたことを型として定義し、それをブラウザが認識することで、安全で無い処理を防ぐことを目的としている。

具体的には、現時点では DOM に以下の型を追加している。

- TrustedHTML
- TrustedURL
- TrustedScriptURL
- TrustedScript

これらの型は、特定の前処理を経てしか生成できない。

前処理は用途に応じて複数定義できるよう、ポリシーという形で定義する。

ここでは HTML Special Chars を処理する `escape` というポリシー `createHTML` に対して定義する。

```js
const createHTMLPolicy = TrustedTypes.createPolicy('escape', {
  createHTML: (unsafe) => {
    // escape html special chars
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }
});
```

このポリシーを用いると、 innerHTML に渡せる TrustedHTML オブジェクトを得ることができる。


```js
const trustedHTML = createHTMLPolicy.createHTML('<img src=/ onerror="alert(10)">')
document.querySelector('div').innerHTML = trustedHTML
```

最後に、ブラウザに対して CSP によって *型の検証* とこの *Policy の利用* を知らせることで、有効にできる。


```http
"Content-Security-Policy: trusted-types escape
```

これにより trustedHTML は、ほぼただの文字列だが、ブラウザはその型を認識するため、もし以下のように TrustedTypes でない文字列を入れると例外が上がる。

```js
document.querySelector('body').innerHTML = '<img src=/ onerror="alert(10)">'
// Uncaught TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires `TrustedHTML` assignment.
```


## Policy

ポリシーは、複数定義できるが、利用するものは CSP で指定する必要がある。

これは Policy から `createHTML` すれば型としては TrustedType であるため、なんらかの方法で Policy も仕込まれてしまうことを防ぐ目的もある。


```js
const dummyPolicy = TrustedTypes.createPolicy('dummy', {
  createHTML: (unsafe) => unsafe
})

// CSP で dummuy が定義されていなければ使えない
const trustedHTML = dummyPolicy.createHTML('<img src=/ onerror="alert(10)">')
document.querySelector('div').innerHTML = trustedHTML
```


また、



## Trusted Types



## Performance

## 効果

開発の場面でフレームワークを使うことが一般的となり、今回解説したような Sink を直接操作する機会はかなり減ってきた。
逆を言えば、直接操作せず FW に任せることにより、安全性を担保し、特に innerHTML に起因する典型的な XSS については滅多に発生しない状況まできていると筆者は考える。

しかし、それでも `location.href` など、画面自体に関わらない部分では少し気を抜くことで突破口となる場面は今でも少なくない。

TrustedTypes は、デプロイ時に有効にして XSS 発生時に防ぐというよりは、開発時に「未検証の操作が無いか」を検出することで、穴を未然に防ぐ形で使う方が現実的に思う。

特に TypeScript など、既に静的な型付けが行われている環境であれば、同じことが既に行われているかもしれない。

その場合は TrustedTypes を DOM 側の WebIDL から導入することで、ビルド時にも使える。



また、これまで設計に依存していたエスケープの所在が標準化され、それがブラウザと統合されることにより、安全な設計を考える上での共通言語ができるのは良いことかもしれない。


