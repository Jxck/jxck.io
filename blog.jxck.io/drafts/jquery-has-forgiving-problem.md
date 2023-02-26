---
title: "..."
emoji: "📝"
type: "tech"
topics: ["", ""]
published: false
---

# [tag] 誇りを被った仕様の針に意図を通す

## Intro

Interop 2022 の目覚ましい成果の一つとして :has の存在があるだろう。

また、今 TC39 で提案されている Array の groupBy の機能は、集計処理を楽にする可能性が大いにある。

こうした仕様策定の裏には、必ずと言って良いほど互換性の問題がつきまとい、時にそれはそこまでの作業の蓄積を無に帰すレベルで影響を与える場合がある。

こうした問題は Web 開発者が使うときには全て解決されているため、基本的に気にされることはない。

だから、気にする必要も、おそらくないだろう。


## jQuery と :has

:has は、従来の CSS Selector の常識を変え、子の状態を元に親をクエリすることが可能となった。もちろん、使い方によってはパフォーマンスは非常に悪くなるため、そもそも非常に実装が難しいとされていた。

Igalia の献身的な調査によって目処がたち、いよいよ実装できそうとなると、そこからは早かった。実装が進むのも、開発者が騒ぐのも、 Ship されるのもだ。

問題が見つかったのは 2022 年の 9 月だ。 Chrome や Safari の開発者ブログに革新的な機能として紹介記事があがったのは 2022 年 8 月であることから、「いまさら見つかってしまった」感がわかるだろう。

- [selectors] The forgiving nature of :has breaks jQuery when used with a complex :has selector · Issue #7676 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/7676

簡単に言えば、 jQuery が元々






## Outro





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