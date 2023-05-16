# [bnf][sfv][http][ietf] IETF RFC における ABNF と Parsing Algorithm の関係

## Intro

HTTPBis では、 RFC 8941: Structured Field Values (以下 SFV) の更新作業が行われている。

- RFC 8941: Structured Field Values for HTTP
  - https://www.rfc-editor.org/rfc/rfc8941.html

機能面では Date 型が追加されるという点が大きいが、個人的にはその裏で行われるもっと興味深い議論に注目したい。

それは、「RFC における ABNF の立ち位置」に関するものだ。


## ABNF と Parsing Algorithm

SFV は、簡単に言えば HTTP Field Value のための構造化フォーマットで、 JSON がそのまま使えなかったことに対する代替仕様だ。よって、基本的には目的となる構造体と文字列フォーマット間の Encode / Decode が定義されている。

文字列フォーマットの解析といえば、 ABNF による仕様定義がよく知られており、 IETF の RFC では古くから利用されている。HTTP/1.1 のプロトコルも、 JSON も、 URL も、全部 ABNF が仕様の中にあり、それをパースするためのノウハウもよく知られている。

そして、 SFV にも ABNF による定義が書かれている。

- https://www.rfc-editor.org/rfc/rfc8941.html#section-3

しかし、同時に「この値はこの順序でパースすべき」という "Parsing Algorithm" も定義されている。両者が全く同じ結果になるのなら良いかもしれないが、両者はそもそもやっていることが違う。

ABNF は「実装の結果」を示すのみであり、実装方法は実装者に委ねられる側面が強い。一方 Parsing Algorithm は、その通り実装することが求められているため、実装によるブレが減る。

では、実装者はどちらに従うべきだろうか?

もちろん、それは RFC の中に記されている。

> When parsing from HTTP fields, implementations MUST have behavior that is indistinguishable from following the algorithms.
> If there is disagreement between the parsing algorithms and ABNF, the specified algorithms take precedence.
> --- https://www.rfc-editor.org/rfc/rfc8941.html#section-1.2-3

ABNF がもたらす実装方法の幅は、互換性の問題を生じやすいのは事実だ。特に Web においては、その実装差がブラウザの挙動として現れるのを極力避けたい。

わかりやすい例では、 URL の仕様は IETF と WHATWG で別々に存在する。

IETF の RFC 3986 は "インターネット" で広く利用される仕様であり、 ABNF ベースで記されている。

- RFC 3986: Uniform Resource Identifier (URI): Generic Syntax
  - https://www.rfc-editor.org/rfc/rfc3986

一方 WHATWG は、 "ブラウザ" が実装することを目的とした仕様であるため、 Parsing Algorithm が細かく書かれている。

- URL Standard
  - https://url.spec.whatwg.org/

もともと WHATWG URL は、 RFC ベースだったことによるブラウザ間の実装差異を無くし、互換性を高めるための基盤として書かれたものであるため、同じ "URL" に 2 つの別の仕様があるのは、目的の違いだと言える。

(なお、実際ここで整理された仕様と、 WPT によってよって浮き彫りになった URL の実装差を埋める作業は、 Interop 2023 のテーマとして採択されている)


## ABNF は載せるべきか

SFV 仕様を策定している段階から、この ABNF の扱いについては度々議論になった。

例えば、 RFC になるための IESG の Ben による最終レビューでは、以下のようなコメントがつけられている。

> Most notably, there is the inherent risk of skew when both prose algorithms and ABNF constructions are provided for the same structures.
> While Section 1.2 is careful to disclaim that the prose algorithm takes precedence over the ABNF for parsing, to my reading the coverage in the following paragraph of serialization procedures imply that it is the ABNF that is authoritative.
> In particular, "[i]mplementations MAY vary from the specified behavior so long as the output still matches the ABNF" seems to admit deviations from the prose algorithms but require compliance with the ABNF, in effect making the ABNF take precedence over the prose algorithm.
> Having a different description of the procedure normative for generation vs. consumption invites interoperability-affecting feature skew, such as the handling of empty lists as Julian noted on the list.
> --- https://lists.w3.org/Archives/Public/ietf-http-wg/2020AprJun/0168.html

- 同じ構造をパースするのに Algorithm と ABNF が両方提供されているため、両者の差異が生じるリスクがある
- Algorithm 優先と書いているが、シリアライズは ABNF ベースで行うよう暗黙的に書かれているように読める
- "実装は、少なくとも ABNF を満たす範囲であれば、仕様に書かれた方法からある程度の逸脱は認める" という文は実質 ABNF を優先しているように読める
- 生成と消費で手順が異なることは、相互互換性に影響する可能性がある。(実際に empty list の処理で見つかったように)

この指摘は、個人的には全くその通りだと感じている。

実際、筆者は SFV を実装する際に、 Parsing Algorithm と ABNF 両方で実装し、 ABNF 側の間違いを発見して Issue を立てたこともある(その Issue が RFC 化目前だったため、みんなで慌てて直したりした)。

SFV に限らず、割と色々な RFC の ABNF を実装してきたが、残念ながら ABNF は大抵間違っている。間違っているという表現が正しいかは難しいので正確に言うと、「そのまま機械的にパーサを生成すると、矛盾を生じる」ものがほとんどだ。そして、同様に壁に当たった先人の Errata がファイルされていても、何年も放置されている。

例えば IPv6 アドレスの ABNF なんかも矛盾があるが、それでも世の中回っているのだから、実装側もわざわざ ABNF から実装を起こしたりしてないことが伺える。 ABNF から愚直に起こした実装なんて速いわけがないので、当たり前ではある。機械的にパースはできなくても生成は大抵できるので、 ABNF から生成したテストケースをパスし、あとは相互接続して動けばそれはデプロイされるというのが実態だ。インターネットの実装は、基本そうやって動いてると思う。

なんでそんなことになるかというと、おそらく多くの ABNF はおそらく勘で書かれている。実際にその ABNF からパーサを生成してテストしたりはされていない。 ML やリポジトリや議事録を探っても、そういう検証をした記録や実装が出てきたのをほとんど見ない。だいたい、 WG がリポジトリを持つようになったのも比較的最近だし、そこに実装者向けのテストケースを追加するようになったのも、ここ数年の話だ。

筆者があえて、あまり実用的ではない ABNF からの愚直実装を作るのは、 RFC 前にそれをやれば、 ABNF を検証して直せるかもしれないという、それ自体が目的だからだ。


### ABNF を消すかどうか

先のコメントに対し、 Chair である mnot の返信はこうだった。

> As has been said many times, the ABNF in the specification is not normative; it's illustrative.
> The proposed edit clarifies that.
> If that's still felt to be confusing, the right thing to do would be to remove ABNF from the spec completely, to avoid the confusion.
> I'm happy to do that if the IESG wishes so.
> --- https://lists.w3.org/Archives/Public/ietf-http-wg/2020AprJun/0175.html

確かに、 Parsing Algorithm が正であり、そこに ABNF があることで問題が生じるのであれば、 ABNF を消してしまうのは理に叶っているように思う。

> Julian, you've had many opportunities to bring this up before (having participated in the original issue about empty lists).
> It would have been much more helpful if you'd expressed your concerns earlier -- even during WGLC -- instead of after IETF LC.

そして、「消してしまってもいい」という mnot に対する反応は、賛成ではなかった。

Julian のコメント

> WRT removing the ABNF: please, no. Absent the ABNF, the algorithms are the only thing to look at, and they really only help if you implement them.
> --- https://lists.w3.org/Archives/Public/ietf-http-wg/2020AprJun/0176.html

Ben のコメント

> I do agree with Julian that making the (minor!) change to the ABNF to remove that axis of skew seems worthwhile, though I do not think I can make that a Discuss point (given that I, like him, would prefer to keep the ABNF as-is over removing it entirely as you propose).
> --- https://lists.w3.org/Archives/Public/ietf-http-wg/2020AprJun/0178.html

どっちも、 ABNF は残すべきだという意見だった。

Julian の言うように、 Algorithm だけになってしまうと、実装しないとフォーマットの全体像が掴めないという点は確かにある。むしろ、 ABNF は実際のところ、その目的の方が大きい。そこから正確なパーサを生成するというよりも、「結果がこのような形になる」というシリアライザのソースとしての側面は、どの ABNF も大抵は担保されている。まあ、くっ付ける方が数段楽なので、シリアライズなら慣れれば勘でも正確に書ける。そして、多くの ABNF は、そう運用されてきただろう。

問題は、 ABNF にパースの役割を担わせた点、そしてその上位互換として Algorithm が併記されていることで起こっている。

で、これはどうなるんだろう。と思っていた。


## RFC と Bis

結局 RFC 8941 は ABNF + Parsing Algorithm のまま、 ABNF を修正して公開された。流石にあそこから大きく書き直すのは、難しかったというのもあると思う。

そして、 RFC が出てすぐくらいに次の作業が始まった。Retrofit と Bis だ。Bis は改訂作業につく Suffix で、ラテン語で繰り返すという意味だ。(イタリアでは「アンコール」の際に "bis! bis!" と叫ぶらしい)

- Retrofit: 既存の HTTP Header の値をどうにか SFV にできないかという別作業
- Bis: Retrofit で必要になった Date を RFC 8941 に追加する改訂作業

mnot がここで Bis の範囲として提示した作業が以下だ。

> - Adding a Date type (using the current text in the Retrofit draft[1] as a starting point)
> - Removing ABNF from the specification (as discussed, it's confusing and current editorial style is NOT to use it[2])
> - Addressing technical issues that are or could qualify as errata (e.g., minor algorithm clarifications)
> - Minor and purely editorial work (e.g., improving wording, explanations, correcting typos if found)
> --- https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0013.html

ここで改めて、 ABNF をどうするかという話があがっている。(やっぱり mnot は ABNF 消したいんだなという感じも伺える)

この議論は GitHub に Issue が立ち、そこで続きを行うことになった。

- ABNF - Issue #2338 - httpwg/http-extensions
  - https://github.com/httpwg/http-extensions/issues/2338

その議論の結果、折衷案として「ABNF は残すが Appendix に移す」となり、本文(Appendix 以前)の全ての項目から ABNF が消えて Parsing Algorithm のみが残ることになった。(mnot が押し切って、 Julian はあまり納得してない感じがするが)

少なくとも「実装をする開発者」にとって、ブレのない実装が行われることの期待と、「実装を持たない開発者」が SFV の姿を ABNF から想起するという二点は満たされているため、落とし所としては妥当なのかと思う。


### SFV の参照

この変更は、 SFV を参照する側にも多少の影響が出る。

- https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0147.html

要するに、 SFV を参照する仕様は以下のように ABNF の仕様を参照するものがあるという点だ。

```http
Foo: sf-list
```

これは、 ABNF ではなく SFV で定義されているデータ型(この場合 "List")で書く方が望ましいことになる。

HTTPWG では、新しく定義する Header Field は基本的に SFV を使うべきことが、 Style Guide で定義されている。今回の変更も Style Guide に明記され、その基づいて先の例を書き直すと以下のようになる。

> The Foo header field's value is a List of Integers.
> - https://httpwg.org/admin/editors/style-guide#structured-fields

この変更は httpwg の中ですでに SFV を参照する仕様に適用されている。

- https://github.com/httpwg/http-extensions/issues/1974
- https://github.com/httpwg/http-extensions/pull/1977

この変更を見るとわかるが、 ABNF を参照しなくなったことで、自然と参照元からも ABNF が消えている。

つまり、少なくとも HTTPWG の範囲では、その仕様自体が ABNF を必要としなければ ABNF が書かれる機会は減り、書かれるとしても同じように Appendix になっていくのだろう。


## Outro

この流れは、 IETF でも、少なくとも HTTPWG の仕様については、 WHATWG の定義の仕方と近くなっていることを意味する。

HTTPWG の仕様はブラウザで実装されることが多いため、ブラウザの互換性を防ぐ意味でも自然な流れと言えるが、 IETF/WHATWG 両方の仕様を実装してきた筆者からすると、なかなか興味深い流れに感じる。

今回の話だけで、「本当に ABNF は必要なのか」という議論事態に決着がついたわけではない。 Julian の言うように、 ABNF があることで仕様が読みやすくなる人は一定いるのも事実だろう。 SFV くらい複雑になると、全てを Example で書き下すよりは、ワイヤーフォーマットを想起する方法として妥当ではあると思う。

問題はやはり「パースするための仕様」として ABNF を扱う部分だろう。実装してる身としても、「エラーにする」「無視する」などの細かい例外処理の表現については、どうしても ABNF よりも Parsing Algorithm に分があると感じる。

実装者は少なくとも "仕様に明記されている通り" Parsing Algorithm に基づいて実装を行うべきだろう。

一方で、 Appendix にある non-normative だからといって、 ABNF が勘で適当に書かれた、明らかに間違っているものになっていて良いとも思えない。

なお、今回の SFVbis Draft-02 については実装し、挙動を確認した。

- https://github.com/Jxck/structured-field-values

今後も、少なくとも筆者が気づいた範囲では、ドラフト段階(できれば WGLC、最低でも IESG レビューの前)くらいには、実装して動くことを確認し、矛盾があれば指摘できるように、貢献を続けたいと思う。