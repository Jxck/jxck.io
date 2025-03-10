# [cookie][3pca] 3PCA 6 日目: トラッキングの問題

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 6 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

前回は、3rd Party Cookie にはネガティブ/ポジティブを含め、さまざまなユースケースがあるという解説をした。

では、なぜ 3rd Party Cookie は今「問題」になっているのだろうか?


## トラッキング

前述したリターゲティングの例を思い出してみよう。

例えば媒体主(前述の例で言う Yahoo)に表示された広告主(前述で言う楽天)の広告をクリックし、実際にユーザがミネラルウォーターを購入したら、楽天から Yahoo に成果報酬が入ることになる。

しかし、媒体主は自分の表示した広告をクリックしたユーザが、その先で買い物をしたかどうかなんて知らないし、広告主も自分の店で水を買ったユーザが、どの広告から来たかは知らないため、両者の間に「広告ネットワーク」が入り、その 3rd Party Cookie が両者を取り継いでいる構造だった。

同じ広告ネットワークを、様々な Web サイトが導入することで、「どんなサイトで何を見たか」「どんなサービスで何を調べたか」などの断片的な情報を蓄積すれば、「誰か(識別)」は不明なままでも、「どんな人か(区別)」の解像度を上げていくことも可能だ。

これが「*ユーザのトラッキング*」と呼ばれる。今回のアドベントカレンダーの根底にある問題だ。


## 機能とユースケース

「さっき見ていた商品が、全然別のサイトでおすすめされる」という現象を、「気持ち悪い」と感じる人も多くいる。トラッキングを用いた広告の方法は、広告を出す側にとって非常に効果がある一方、「そのやり方はどうなんだろうか?」という疑問は、実は Cookie が登場してから 20 数年の間、ずっと議論され続けてきた。

ここで、本アドベントカレンダーを通じて、最も大事な点を書いておく。

「*ユーザが問題視しているのはトラッキングだ*」という点だ。

エンジニア向けに言うのであれば

「*問題は 3rd Party Cookie という要素技術そのものではなく、そのユースケースとしてトラッキングの方にある*」と言える。

ユーザは "3rd Party Cookie" などという技術的要素は知らない。トラッキングの実現に何が使われているかは、実際のところユーザには関係のない問題なのだ。


## トラッキング問題の表面化

2000 年代に入って、トラッキングをプライバシーの問題として決定づける大きな事件がいくつかあった。

特にエポックメイキングだった事件として、2000 年にアドネットワークの DoubleClick(後に Google に買収される)が、プライバシーの侵害を理由に消費者団体によって FTC(連邦取引委員会)に異議を申し立てられ、集団訴訟に繋がったのだ。

- Privacy Groups Eye DoubleClick | WIRED
  - https://www.wired.com/2000/02/privacy-groups-eye-doubleclick/

この事件は、もともと DoubleClick が 3rd Party Cookie で収集していたトラッキングデータに、買収したマーケティング会社 Abacus Direct の持っていた氏名/住所などの顧客データを紐づけるという計画の発表に端を発する。匿名だったはずの、いわゆる「ネットサーフィン」が大規模に監視されることを懸念してのことだ。これは、そもそもの DoubleClick のプライバシーポリシーにも違反していることが指摘された。

この事件は、3rd Party Cookie が引き起こしているトラッキングの問題を、プライバシーについての社会問題として捉える流れを助長するきっかけとなったのだ。


## トラッキングからのオプトアウト

ユーザはトラッキングを行う事業者にオプトアウトを求めることになるが、ここでは基本的に 3 つの方法が考えられている。

1. オプトアウトを示す Cookie を保存し、それを送られた広告ネットワークはトラッキングしない。
2. トラッキングしている業者のリストを作り、それをブラウザなどに読み込んで設定する。
3. ユーザの意図を何らかの方法で表明する(ブラウザからオプトアウトを示す HTTP ヘッダなどを送るか、ダイアログで同意を取るなど)。

当時から現在に至るまで、広告会社が行っていたのは、基本的には 1 だ。「この URL にあるボタンをクリックすればオプトアウトできる」という運用だ。

しかし、そういう業者が何百もあるため、ユーザはそれぞれ全部を巡回して Cookie を集めて回らないといけない。Cookie はそのドメインにしか送られない仕様上、一個保存して全部オプトアウトというわけにはいかないのだ。

また、その Cookie もあくまでただの Cookie であるため、どこかで消える。むしろ、プライバシーに敏感で、毎回 Cookie を削除しているようなユーザは、そのタイミングでオプトアウト Cookie も消えてしまうわけだ。


## 対策の歴史

したがって、この問題への対策は「トラッキングを勝手にはできないようにすべきだ」というものだ。トラッキングするのであれば「ユーザの許可を取るべきだ」という話になる。

しかし、単に「許可を取りましょう」と言っても、サービス側にとって従うインセンティブがない。もし企業に強制するなら、制度を整備し法的にアプローチする必要がある。しかし、何をどう法律にすると解決するのかは、決して簡単に決められる問題ではない。

一方、「3rd Party Cookie があるせいでトラッキングできるんだから、3rd Party Cookie をなくしてしまえばいいじゃないか」という話も、実は何度も出てきている。

3rd Party Cookie を単純に無効にすれば、確かにトラッキングはできなくなる一方、ここまでに紹介した便利な認証連携などもできなくなってしまう。

- 埋め込まれた YouTube がユーザのアカウントにならないため、課金ユーザにも広告が出る
- 埋め込まれた Disqus がユーザのアカウントにならないため、コメントを投稿すると Anonymous になる
- 埋め込まれた Facebook がユーザのアカウントにならないため、Facebook に遷移しないと「いいね」できない
- 埋め込まれた Stripe がユーザのアカウントにならないため、Stripe に遷移しないと支払えない

単に不便になるだけならまだしも、連携しているサービスに遷移し、認証して戻ってきても、埋め込んだ側が認識できないためいつまでもログインできない、つまり完全に壊れてしまうサイトもあるだろう。

3rd Party Cookie を野放しにすると、トラッキングが横行する。

3rd Party Cookie を消すと、Web が壊れる。

これが、人類が 20 数年闘い続けてきた、Web の一大トピックの背景だ。

次回以降は、この歴史を振り返りながら、この闘いがいかに簡単ではないかを解説していく。