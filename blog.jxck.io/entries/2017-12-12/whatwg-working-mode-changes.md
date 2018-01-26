# [w3c][whatwg] WHATWG の IPR Policy と Governance Structure

## Intro

WHATWG が IPR Policy と Governance Structure についての更新を発表した。

おおまかな流れと、これによって引き起されそうな変化について解説する。


## Working Mode Changes

昨夜(JST)、 WHATWG は以下のブログをポストした。

[The WHATWG Blog - Further working mode changes](https://blog.whatwg.org/working-mode-changes)

ブラウザベンダ各社もこれに賛同を表明している。

- mozilla: <https://twitter.com/mozhacks/status/940258410477604864>
- chrome:  <https://twitter.com/ChromiumDev/status/940253003587694593>
- safari:  <https://twitter.com/webkit/status/940254938092879874>
- edge:    <https://twitter.com/MSEdgeDev/status/940255204032765953>

W3C も、公式ブログでこれに言及している。

[WHATWG Working Mode Changes \| W3C Blog](https://www.w3.org/blog/2017/12/whatwg-working-mode-changes/)


## WHATWG と W3C

現状 HTML の仕様については WHATWG が仕様を策定し、 W3C がそれをフォークしバージョニングして勧告している状態である。

詳細は以下で解説している。

[ep14 WHATWG \| mozaic.fm](https://mozaic.fm/episodes/14/whatwg.html)

簡単に言うと今から 20 年近く前、HTML4.01 の作業がひと段落した W3C は、当時盛り上がっていた XML ベースの仕様に舵を切るため XHTML の策定に注力し始めた。

しかし、既存の HTML との互換性を重視するブラウザベンダとしては W3C の進め方に懸念があった。

そこで Mozilla や Opera から、互換性重視での HTML の進化を望む旨を提言したが、 W3C はそれを相手にしなかった。

結果、既存のスタックの更新を行うためのフォーラムとして WHATWG が作られ、他のブラウザベンダも参加した。

そこから、既存の HTML の延長上にある仕様の策定が始まり、これがいわゆる HTML5 と呼ばれたものだった。

その後、XML 路線を進めていた W3C は、結局それがうまくいかないことに気づき、互換を保つ HTML の策定への注力に舵を切り戻すことにした。

そのベースの仕様として WHATWG の仕様に注目した。


## 2 つの HTML

WHATWG は、ブラウザベンダが中心になっているため互換性維持に対する思いが強い。

Web において、互換性が壊れることはあってはならない。 だから、 Web は互換を保ったまま先に進むしかない。

つまり **Web にはバージョンが無い**

として、 HTML のスペックからバージョンを無くし、 Living Standard としてメンテナンスすることを選んだ。

一方 W3C は、この仕様をある時点でスナップショットを取得し、各プロセスを経てバージョンを付与して勧告するという作業を行なっている。

これが、 WHATWG と W3C がほぼ同じ仕様を別々に公開している現状に繋がる。

両者が単なるコピーで片付くならまだよかったのだが、実際には微妙に違いがある。

具体的には、 W3C は WHATWG からコピーする際に細かい部分に独自パッチを当てていることと、 W3C にはパテントポリシーがある点だ。


## Further working mode changes

W3C はロイヤリティフリーを基本とするパテントポリシーを持っているが、 WHATWG にはそれがない。

それどころか、 WHATWG はその実態がコミュニティベースのグループのようなものであり、会員グループで法人格を持ち厳密なプロセスを走らせる W3C ほど盤石な組織といったものではない。

これにより、 W3C で勧告された仕様は、特定の企業にとっては安心して実装できる部分がある。

企業にとって特許問題は重要であり、ある意味でこの点が W3C が WHATWG の仕様をフォークしてでも、 W3C 側で勧告する意義だったと言っても良いだろう。

(W3C 会員企業にとっては W3C 側でコンセンサスが取られた結果が入っていることも重要かもしれない、例えば a11y 的な観点などで WHATWG と diff があるのはこうした背景がある)

今回の WHATWG の発表は、この WHATWG の体制を整備することと、 Patent Policy を導入するという点に注目すべきだろう。


## Steering Group

基本的に、 WHATWG のやり方自体は今までと変わらないことが強調されている。

つまり、コミュニティベースで Living Standard を策定していくというこれまでの流れだ。

従来との大きな違いは、 Steering Group が設置されることだろう。

[whatwg/sg: A place to raise issues with the WHATWG Steering Group](https://github.com/whatwg/sg)

この組織の目的は、前述の通りこれまでのやり方を維持していくことに加え、 IPR Policy に関わる作業を担うこととされている。

ここには Mozilla, Apple, Microsoft, Google が参加しており、先の W3C のポストでは [W3C も invite された](https://www.w3.org/blog/2017/12/whatwg-working-mode-changes/) とある。


## IPR Policy

WHATWG が導入した IPR Policy は以下にある。

[The WHATWG Intellectual Property Rights Policy](https://whatwg.org/ipr-policy)

ドキュメントの末尾にはこうある。

> This document includes material derived from the W3C Patent Policy.
> --- <cite>[The WHATWG Intellectual Property Rights Policy](https://whatwg.org/ipr-policy)</cite>

W3C をベースにし、多くの標準化団体が行なっているそれと基本的には同じだとされている。

具体的にはロイヤリティフリーを基本としたポリシーだ。

今後は、 W3C が行なっていたような Patent 関連の調整を、このポリシーを元に Steering Group が行なっていくことになりそうだ。

HTML は、過去に Apple が保有する Canvas の特許を巡るパテントの扱いで揉めたこともあったが、こうした問題も今後は減る/適切に対処されるだろう。


## Contributor and Workstream Participant Agreement

関連する技術のロイヤリティフリーを保証して仕様を策定していくため、 OSS でいう CLA (Contributor License Agreement) に似た Agreement が用意された。

[Contributor and Workstream Participant Agreement](https://participate.whatwg.org/agreement)

今後 WHATWG HTML にコントリビュートする際には、これへの同意を求められるようだ。

すでに Chrome(Google), Safari(Apple), Firefox(Mozilla), Edge(Microsoft) は、これに同意している。


## なにが変わるか

その他、多くのポリシーが整備されており、 WHATWG の作業が明確にされている。

これにより、一般の開発者、つまり仕様を参照し Web コンテンツ/サービスを開発する開発者にとって大きな変更があるかというと、あまりないだろう。

一方で、 HTML の実装を持つ企業や、 W3C 会員として HTML に関わるメンバ、 WHATWG の HTML にコントリビュートする開発者には、多少変化があるだろう。

一番大きいのは、ずっと懸念されていた WHATWG の特許関連がクリアになりそうだという点だろう。

また、いよいよ W3C がフォークしている WHATWG の仕様に、特許の観点からのアドバンテージがなくなる。

これによって、分離するモチベーションが W3C 自身にしかなくなれば、いよいよフォークがなくなる可能性があるかもしれない。

(それでも、 W3C 内でのコンセンサスによる diff の行き場としてのこるかもしれないが、そこは Steering Group の手腕に期待したい)

先日 HTML5.2 の PR を期に [Travis Leithead, Arron Eicholz, Alex Danilo の 3 人がエディタから退いた](https://lists.w3.org/Archives/Public/public-html/2017Nov/0001.html) ことも記憶に新しい。

TPAC では HTML5.3 の話も始まっていたが、来年の HTML どうなるだろうか。
