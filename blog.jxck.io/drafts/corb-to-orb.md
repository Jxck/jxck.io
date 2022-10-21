# [corb][isolation][spectre][security]　CORB から ORB へ

## Intro

CORB (Cross Origin Read Blocking) が Fetch の仕様から消え、 ORB (Opaque Response Blocking) の提案がレビュー中である。

ここでどのような変更が起こっているのかを調査し、記録する。

## CORB

- Remove CORB by annevk · Pull Request #1441 · whatwg/fetch
  - https://github.com/whatwg/fetch/pull/1441



## ORB

- annevk/orb: Opaque Response Blocking (CORB++)
  - https://github.com/annevk/orb
- Define opaque-response blocking by annevk · Pull Request #1442 · whatwg/fetch
  - https://github.com/whatwg/fetch/pull/1442



詳細はここで解説されている。

- Cross-Origin Read Blocking / Opaque Resource Blocking (CORB/ORB)
  - https://chromium.googlesource.com/chromium/src/+/HEAD/services/network/public/cpp/corb/README.md



## ORB (Opaque Read Blocking)

Firefox は CORB を実装しておらず、その理由が Mozilla Standard Position に書かれている。

> Blocklist certain opaque responses based on MIME type and return an 'emptied' response instead.
> While this is an important aspect of a robust Spectre-defense, we would like to see a safelist-based approach pursued, e.g., Opaque Response Blocking.
> --- https://mozilla.github.io/standards-positions/#corb

つまり、 CORB は「こういうケースの読み込みは許可しない」という Block List で定義していたのに対し、「このケースは良いがそれ以外は許可しない」という Allow List 方式の方が望ましいとするものだ。セキュリティ系の制御/制限はコーナーケースの安全性を担保しやすいため Allow List 方式の方が好まれる。

そして、 CORB の Allow List 版として策定されているのが ORB だ。

- annevk/orb: Opaque Response Blocking (CORB++)
  - https://github.com/annevk/orb

仕様についてはまだ策定中なので細かくは触れないが、基本的には CORB と同様の Intervention を CORB とは異なるアプローチで仕様化することを目指している。挙動としては「おかしな読み込みをブロックする」という点と、壊れた場合は読み込み方法を見直すという点は基本的には変わらないと思って良いだろう。

すでに Fetch の仕様からは CORB が消され、 ORB への置き換えが進んでいる。

- Remove CORB by annevk · Pull Request #1441 · whatwg/fetch
  - https://github.com/whatwg/fetch/pull/1441





## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other