# [tc39] TC39 に新設された Stage 2.7 について

## Intro

TC39 の Stage 2 と Stage 3 の間に、新たに Stage 2.7 が追加された。

これは何だろうと思った人が検索で辿り着けるよう、その経緯と目的をまとめる。


## TC39 Stages

TC39 は、 ECMAScript (つまりまあ JS) の新機能を議論する Task Group だ。

ここでは、比較的自由に新機能の提案がなされ、定期的に行われるミーティングでの議論や、実装からのフィードバックを経て、 Stage が上がっていく仕組みをとっている。

旧来の Stage は 0~4 まであった。ざっくり言うと以下のようなものだ。

Stage 0
: ただドラフトが提案された状態、メンバーならだれでもできる。
Stage 1
: 仕様の責任者的な "Champion" が決まり、ユースケースやおおよその API が示され、それをもとに「TC39 で取り組む価値がある」と認められた状態
Stage 2
: 仕様(構文やセマンティクス)を書き起こし、実装に必要な材料が揃った状態。
Stage 3
: 実際に JS エンジンなどに実装され、十分なテストも整備され、実装からのフィードバックを待つ状態
Stage 4
: 最低二つの実装があり、 Issue も全て解決し、承認された状態。次の ECMA 262 に取り込まれるのを待つだけ。

細かな条件や基準は、以下のドキュメントにまとめられている。

- The TC39 Process
  - https://tc39.es/process-document/


## Communication while working towards Stage 4

最初の提案は、 2023 年 5 月の TC39 meeting で提案された以下から始まる。

- Stage 3 Proposals and Implementors - Communication while working towards Stage 4
  - https://github.com/msaboff/tc39/blob/master/Proposal%20Implementation%20Status.pdf

ここでは、 Array Grouping の作業が二転三転した経緯から振り返っている。

簡単にまとめると、 Array Grouping は 2021/12 に Stage 3 になったが、そこから数回メソッド名が変更された。さらには互換性の問題で Prototype から Static メソッドに変えるため一度 Stage 3 から Stage 2 に Down Stage もしている。

他の例では、現在作業中の Temporal は、 Stage 2 の段階でおおよその目的や API が決まっているにも関わらず、数年に渡って Normative Changes が継続的に発生し、その度に実装側にも修正が入ることになる。

一方、この機能を各エンジンは実装し、リリースのスケジュールを組んだり、実際に Ship を予定したりもするのだ。

実装があっての Stage 4 であるため、実装者は Stage 3 の仕様を実装する方向で進めるが、実際には Stage 3 だからといって「今すぐリリースしても大丈夫とは限らない」という微妙な仕様も存在するのが現状だ。そして、実装者はそこまで細かく自体を把握できずに、現状の仕様で Ship してしまう場合もある。

そこで、各 Stage 3 の仕様に、メタ情報として「Ship しても大丈夫か?」というステータスを表示しようと言うのが、最初の提案だった。


## Reducing wasted effort due to proposal churn

次の 7 月のミーティングでは、別の人が以下の提案をしている。

- reducing wasted effort due to proposal churn
  - https://docs.google.com/presentation/d/1V3Fg6HVC-VA41YCu0Yhqynvqhsu5kVj7tiWuVfp8S90

この提案は、別の人でありながら、先の提案と解決したい問題は同じだ。

ここでは Stage 2 と 3 の間の行き来によるオーバーヘッドを減らすことにフォーカスしている。

そもそも、 Stage 3 になった時点では Test262 は求められてないため、実装する人が一緒に Test262 を書きながら実装するというのが、現在の標準的なフローになっている。しかし、仕様に手戻りがあれば、実装および Test262 の修正など、実装側に大きな手戻りを発生させることになっている。

そこで、 Stage 2 と 3 の間に、もう一つ以下のようなステージを用意してはどうか? というのがこの提案だ。

New Stage
: test262 などを整備する状態。簡単な Polyfill などはあってもいいが、エンジンへの本格実装のタイミングでは無い。

このステージで、スペックの整備と実装の開始の間を埋め、 Test262 の知見から Normative Changes をできる限り潰してから実装に入れるように吸収する。そして、 Test262 も最初の実装者に丸投げするのではなく、(完璧では無いにせよ) Champion が行うべきでは? という点も付け加えられている。

この発想は、色々と議論があったが、概ね支持された。問題は Stage の名前だ。

この時点では仮に Stage 2¾ と呼ばれていた。


## Bikeshed

あとは想像通り Bikeshed だ。

既存のステージに対する解釈の齟齬を防ぐためにも、 Stage を一個ずらして 0 ~ 5 にするといったことはできない。つまり、 2 と 3 の間にどういう名前にするかという自由闊達な議論が 11 月に行われた。

議事録から出てきた案を拾ってまとめてみる。

- Stage 2¾
- Stage e (2.718...)
- Stage 25 (既存は全部 10 倍する)
- Stage 2.b
- Stage 2B
- Stage pre-3
- Stage 2.5
- Stage 2.7
- Stage 2.9

そしてこの中で Temperature Check (投票) を行なったが、議事録を見る限り、 TC39 は投票に慣れてないために色々とごたついてたようだが、それでも一応 2.7 に落ち着いた。


## New Stage 2.7

結果、最初に貼った Process Document は既に更新されており、 Stage 2.7 が追加されている。

- The TC39 Process
  - https://tc39.es/process-document/

ざっくりと言うと以下だ。

Stage 0
: ただドラフトが提案された状態、メンバーならだれでもできる。
Stage 1
: 仕様の責任者的な "Champion" が決まり、ユースケースやおおよその API が示され、それをもとに「TC39 で取り組む価値がある」と認められた状態
Stage 2
: 仕様(構文やマンティクス)を書き起こし、実装に必要な材料が揃った状態。
Stage 2.7
: *仕様は固まり、実装する前にテストやプロトタイピングで実験する状態。*
Stage 3
: 実際に JS エンジンなどに実装され、十分なテストも整備され、実装からのフィードバックを待つ状態
Stage 4
: 最低二つの実装があり、 Issue も全て解決し、承認された状態。次の ECMA 262 に取り込まれるのを待つだけ。

なお、既存の提案では、 Stage 3 で少しグダついている Decorator Metadata の仕様が、 2.7 に戻されることになった。


## Outro

TC39 の Stage に Stage 2.7 が新設された。