# [shadow dom] Declarative Shadow DOM による SSR

## Intro

Shadow DOM は JS を用いた命令的 API により有効にする必要があった。

しかし、 JS を実行しないと DOM が構築されないことは、一般的に SSR を必要とするような文脈では扱いづらかった。

これを宣言的に記述するための仕様として Decralative Shadow DOM の仕様策定と実装が進んでいる。

現在の仕様と実装について解説する。


## Imperative Shadow DOM API

おさらいとして、 Shadow DOM を用いて Custom Element に Shadow Root を追加するには、以下のようなコードが必要となる。


## Streaming

Chromium has shipped [1] a version of declarative shadow DOM in M90 which currently has 0.014% usage [2]. Mostly, the low usage is due to the spec PR being stalled with no input from other implementers. Recently, there has been renewed interest in the feature, and discussions have resumed. As part of those discussions, two changes have been generally agreed upon:

Chromium は M90 で declarative shadow DOM のバージョンを出荷しましたが [1]、現在の使用率は 0.014% です [2]。使用率が低いのは、他の実装者からの意見もなく、仕様PRが滞っていることが原因です。最近、この機能に対する関心が再び高まり、議論が再開されています。その議論の中で、2つの変更点が概ね合意された。

 1. Rename the `<template>` attribute from `shadowroot` to `shadowrootmode`.
 2. Support streaming, by attaching the shadow root on the opening, rather than the closing, template tag.

While the PR hasn't landed, and there is still an open issue (related to the DOMParser), we would like to ship the agreed upon behavior listed above. WebKit has already enabled this behavior by default.

PRはまだ到着しておらず、（DOMParserに関連する）未解決の問題がありますが、私たちは上記の合意された動作を出荷したいと思います。WebKit はすでにこの動作をデフォルトで有効にしています。






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
