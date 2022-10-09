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