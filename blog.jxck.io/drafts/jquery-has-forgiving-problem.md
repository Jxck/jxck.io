# [css] 誇りを被った仕様の針に意図を通す

## Intro

Interop 2022 の目覚ましい成果の一つとして `:has()` の存在がある。

これまでの CSS の限界を突破する、革新的な仕様であり、多くの開発者が期待を寄せる機能の一つだろう。

こうした仕様策定の裏には、必ずと言って良いほど互換性の問題がつきまとい、時にそれはそこまでの作業の蓄積を無に帰すレベルで影響を与える場合がある。

一方それらは Web 開発者が使う時点では解決されており、基本的に気にされることはない。

だからといって、気にする必要がないわけではない。ことを象徴する事件が、今回も裏で起こっていた。


## jQuery と :has()

`:has()` は、従来の CSS Selector の常識を変え、子の状態を元に親をクエリすることが可能となった。親から子を見る場合と比べて探索範囲が爆発的に増えるため、非常に実装が難しいとされていた。

Igalia の詳細な調査によって目処が立ち、いよいよ実装できそうとなると、そこからは早かった。実装が進むのも、開発者が騒ぐのも、 Ship されるのもだ。

問題が見つかったのは 2022 年の 9 月。 Chrome や Safari の開発者ブログに革新的な機能として紹介記事があがったのは 2022 年 8 月であることから、「いまさら見つかってしまった」感がわかるだろう。

- [selectors] The forgiving nature of :has breaks jQuery when used with a complex :has selector · Issue #7676 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/7676

ギュッとすると jQuery との互換性に関する問題だ。 jQuery は元々カスタムセレクタとして `:has()` や `:contains()` などを実装していた。そうしたセレクタを `$()` に渡した場合、一旦 `querySelectorAll()` に渡し、ブラウザがバースできなければ jQuery 側の Sizzle という独自パーサにフォールバックすることで、 CSS の機能を上書きする実装になっていた。

ブラウザに `:has()` が実装されることは、これまでエラーを挙げていた `querySelectorAll()` が結果を返すことで、単に Sizzle にフォールバックしなくなるだけという想定は、当時 Progressive Enhancement などと呼ばれていたマナーに則っていると言える。

問題は、 `:has(:contains(div))` のような場合だ。 `:has()` が実装されても `:contains()` は実装されてないため、 jQuery の想定では qSA が例外をあげて Sizzle に移れば問題ないはずだが、実際には例外が上がらなかった。


## Forgiving Selector List

新しく定義される `:has()` には、ちょっとしたおまけ仕様が付与されていた。

例えば以下のような例を考えてみよう。

```css
form:has(input:user-valid, input:-moz-ui-valid, input.user-valid) {
}
```

`:user-valid` は CSS Selectors Level 4 にある提案で、かつて独自実装として `:-moz-ui-valid` を実装していた Firefox だけが対応している。

こうした新しい機能に対応してないブラウザが上記のセレクタを解釈した場合、 `:user-valid` が存在しないことを理由に全体をパースエラーとしてしまうのは、新しい機能や UA 固有の機能を展開していく上でいささか窮屈だ。

そこで `:has()` は、「渡されたセレクタリストのうち、失敗したものは無視する」という仕様として定義された。これは、仕様上 *forgiving-selector-list* と呼ばれている。

- Selectors Level 4
  - https://w3c.github.io/csswg-drafts/selectors-4/#forgiving-selector

つまり、上の例は Firefox 以外の実装でも、前二つを無視して最後のクラスセレクタを引っ掛けることができるのだ。

この仕様のモチベーションは、以下のように記されている。

> For legacy reasons, the general behavior of a selector list is that if any selector in the list fails to parse
> (because it uses new or UA-specific selector features, for instance),
> the entire selector list becomes invalid.
> This can make it hard to write CSS that uses new selectors and still works correctly in older user agents.
> --- https://w3c.github.io/csswg-drafts/selectors-4/#forgiving-selector


## Forgiving vs Unforgiving

`:has(:contains(div))` のようなセレクタがエラーにならいのは、まさしく Forgiving な評価によって、実装されてない `:contains()` が無視されて、 qSA が空の結果を返し、 Sizzle にフォールバックしないことが原因だった。

発生条件としては、 jQuery を使い、 `:has()` の中でブラウザが対応してないセレクタを用いることで、 Sizzle にフォールバックすることを想定したクエリを書いているケースだ。

そんな使い方がどのくらいされているのか、と思うかもしれないが、実際に Chrome に `:has()` が Ship されてから、この挙動によって壊れるサイトが見つかり、冒頭の Issue が立てられることになる。

(実際には jQuery では許可されるが、標準では許可されてない `:has()` の入れ子のパースで発覚した)

多くのバージョンの jQuery で起こるため、様々なサイトが影響を受ける可能性がある。それを無視して現状の `:has()` を押し通すことはできない。

さまざまな議論を経て、仕様では `:has()` を Unforgiving な挙動に修正し、もし当初想定していた挙動を用いたい場合は、依然として Forgiving な `:is()` や `:where()` を併用することになった。

```css
form:has(:is(input:user-valid, input:-moz-ui-valid, input.user-valid)) {
}
```

この挙動に実装が修正されることで、 `:has(:contains(div))` のような CSS は、無事に Sizzle に処理が渡るようになり、晴れて互換性が維持されることになるだろう。

とはいえ、この対応は非常にギリギリのところだったと言える。

もし、 jQuery のカスタムセレクタの中に `:is()` や `:where()` があれば、このワークアラウンドは実現しなかった。それどころか、 `:is()` や `:where()` にも潜在的に同じ問題があることになる。

`:has()` は既にその有用性が広く宣伝され、 Interop で世界中が取り組み、そのリリースが待ち望まれていた機能であるため、気の早い開発者なら十分に `:has()` をデプロイしていた可能性もある。

既に `:has()` が Forgiving であることに依存したコードが広くデプロイされていたら、 `:has()` の挙動を修正すること自体が互換性に甚大な影響をもたらし、文字通り詰んでいた可能性も考えられる。


## エコシステムの力

もちろん、 `:has()` が実装されたことで壊れるサイト自体には、なんの罪もない。

Forgiving な仕様がない時代における実装方法としての妥当性から、 jQuery にも罪はない。それどころか jQuery こそが `:has()` の有用性証明の一旦を担っていたと言える。

jQuery を修正しろなどと言う意見が付き物だが、したところで全てのサイトが更新されることは望めず、そうした更新されないサイトに文句を言う筋合いもない。そうしたサイトこそが、これまでの Web を繋いできたからこそ、今がある。

Web とはそういうもので、それを前提に互換性を踏まえた上で先に進むことは、標準化の大前提だからだ。

惜しむらくは、相手がかつて世界で最も使われていたライブラリでありながら、リリースするまで誰もこの問題に気づくことができなかったことだろう。それも単に標準化グループやブラウザベンダだけの責任にするのは簡単だが、実際のところ動かしてみないことには、こうした細かくかつ複雑な問題を網羅的に発覚することは、難しいことが容易に想像できる。

仕様策定の段階で、互換性に関する議論や調査はかなり慎重に行われているが、現存する全ての　Web サイトに一切影響を与えないことを証明するのは現実的に不可能だ。潜在的な問題は、結局誰かが見つけるしかない。

今回の件は、リリースされる前から多くの人が期待を寄せ、「Stable に落ちてくる」ことを心待ちにしながら、それ以前の Experimental 段階で、フラグの有効化や Nightly の利用などによって、問題を早期に発見する人が誰もいなかった不幸によるところが大きい。

単に新しい機能が Stable に落ちてくるまで手をこまねいているだけでなく、普段使うブラウザにちょっと手を加え、それを日常的に使うことを開発者が心がけていれば、世界で誰か一人くらいは Ship 前にこの問題に気づけたかもしれない。

そうした振る舞いは、仕様策定の議論や、実装へのパッチ提供のような直接的なものでないながらも、全ての開発者ができるであろう、最も手軽かつ重要な Web へのコントリビューションの一つだと思う。

こうした問題を見つけるにはエコシステムというスケールメリットが必要不可欠であり、その価値が最もわかりやすく発揮されるときだ。問題を発見する難しさと比べれば、それを反映するコードを書くこと自体は、全く大した問題ではない。

Web もかなり長い歴史を積み上げて今があり、一方で先進的な提案は日々なされていく。今後も、 30 年近いランニングコードとの互換を保ちながら進歩するうえで、こうした問題は度々起きており、今後も何度も起きるだろう。

現存する古いコードや、古い実装が積み上げた歴史の延長に今があることを意識せず、「jQuery のせいだ」「古い実装が足をひっぱてる」「仕様策定者は何をしてるんだ」などと吐き捨てるのは簡単だが、「(開発者の一端として)自分のせいだ」と思えるリテラシーをどのくらいの開発者が持てるのかは、今後の Web の進化がどのくらいスムーズに進むのかに与える Unforgiving な変数なのかもしれない。


## Outro

この問題に筆者よりもずいぶん早く気づき、筆者に教えてくれた人間がいるが、事態が一定の解決した今、そいつは多分これを書かないし、もう話題になることもないだろう。

Web エコシステムの一端としての反省の意をこめて、代わりにこれを書き残しておく。


## Resources

- Spec
  - https://w3c.github.io/csswg-drafts/selectors-4/#forgiving-selector
  - https://w3c.github.io/csswg-drafts/selectors-4/#relational
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
  - https://chromestatus.com/feature/5166714197639168
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - https://github.com/jquery/jquery/issues/5098
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1359246
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1358953
  - https://github.com/w3c/csswg-drafts/issues/7676
- Other