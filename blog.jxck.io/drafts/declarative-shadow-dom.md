# [shadow dom] Declarative Shadow DOM による SSR

## Intro

Shadow DOM は JS を用いた命令的 API により有効にする必要があった。

しかし、 JS を実行しないと DOM が構築されないことは、一般的に SSR を必要とするような文脈では扱いづらかった。

これを宣言的に記述するための仕様として Decralative Shadow DOM の仕様策定と実装が進んでいる。

現在の仕様と実装について解説する。


## Imperative Shadow DOM API

おさらいとして、 Shadow DOM を用いて Custom Element に Shadow Root を追加するには、以下のようなコードが必要となる。







## DEMO

動作する DEMO は以下に用意した。

- TODO:

## Outro



## Resources

- Spec
  - DOM: https://github.com/whatwg/dom/pull/858
  - HTML: https://github.com/whatwg/html/pull/5465
- Explainer
  - https://github.com/mfreed7/declarative-shadow-dom/blob/master/README.md
- Requirements Doc
- Mozilla Standard Position
  - https://github.com/mozilla/standards-positions/issues/335
- Webkit Position
  - https://lists.webkit.org/pipermail/webkit-dev/2020-May/031218.html
- TAG Design Review
  - https://github.com/w3ctag/design-reviews/issues/494
- Intents
  - Intent to Prototype: Declarative Shadow DOM
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/nJDc-1s3R9U/m/uCJKsEqpAwAJ
  - Intent to Experiment: Declarative Shadow DOM
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/DuvhXyYo7Pc/m/_zcDVQmCAAAJ
- Chrome Platform Status
  - https://www.chromestatus.com/features/5191745052606464
- DEMO
- Blog
- Presentation
- Issues
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1042130
- Other
