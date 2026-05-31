# [antigravity][gemini][io][google] Google I/O 2026

## Intro

Google I/O 2026 に参加した。


## Google I/O 2026

Google I/O 2026 は、想像通り "Gemini I/O" だった。

Chrome, Android, Cloud 全てにおいて Gemini が関わらない話はほぼなかった。

![会場入口にある Google IO のオブジェ](io.png#1127x845)

Web はオープンなので、I/O で知らない話が出てくることはほぼない。

そこで AI を中心に周った。

![開発者向け AI デモブース](ai-dev-zone.png#1296x972)

全体のハイライトは Gemini だが、開発視点では Antigravity だった。

どの Googler と話しても、Antigravity をドッグフーディングしているようだった。

出た瞬間だけ話題になり、完全に忘れ去られていただろう Antigravity だが、G 社内では使われているという噂は聞いていた。

それでも、ここまで大々的に返り咲くとは、思ってなかった。

![Antigravity CLI Demo](antigravity-cli.png#1296x972)

今表に出ている Antigravity は、本命のそれではないらしい。

おそらくそれは、Gemini 3.5 Pro が出てないからなんだろう。

これだけ Gemini でまとめ

あらゆるサービスに Gemini を入れ込み

Spark も Gemma4 も出た I/O で

なぜ本命の 3.5 Pro だけが、出せなかったのだろう?

![カリフォルニアの日差しは強い](strong-sun.png#1296x972)

俺達はすでに、モデルを直では使ってない。

Skill で何かを覚えさせ

MCP で何かを繋ぎ

メモリやコンテキストを共有し

Finetune で改善し

そのためのハーネス構築に勤しんでいる

Antigravity は、VSCode をちょっといじっただけではなく

エージェントオーケストレーション、ハーネス基盤、Finetune までスコープらしい

欲しかったものだ

「こういうものが必要だ」と思って手元で捏ね回しても、ふと顔を上げるとサービスとしてリリースされてる時代。

![A fireside chat on the evolution of the developer craft](fireside-chat.png#1296x972)

AI の価値は、ちょっと前まで「モデル」そのものだった。

どれだけ「頭の良いモデル」か。

モデルを育てるには、莫大なリソースが必要だ。

- 膨大なデータ
- 膨大なチップ
- 膨大な電力
- それを支えるデータセンター
- それを成す技術力

新興の AI ベンダーは、最後以外を持つのが難しいが、先行してここまで逃げ切ってきた。

- インターネット中にあるデータと、ずっと戦ってきた。昨日今日じゃない。
- 自前でチップを作れる。最近はじめたんじゃなく、ずっとやっていた。
- ゴリゴリにデータセンターを増やしている。US では原発も再加熱してる。
- 世界有数の AI エンジニアがいる。そのトップが伝説の Jeff Dean だ。

そういえば、そういう会社だったよなと思い知らされた感じはあった。

![Google Logo](google.png#1041x1389)

俺達がハーネスを組んでまで AI に、繋ぎたいのは「既存資産」だ。

モデルが知らない、社内にしかない知識を与え、「社員」としてオンボーディングしている

何かを繋ぐたびに、「この情報は、こっちの AI に読ませていんだっけ?」という折衝が、各地で行われている。

もし Google Workspace を使っていれば、そこはバイパスできる。

学習さえ拒否すれば、Google Drive の中身が Gemini に伝わることを恐れる意味はない。

Gmail や Chat の中身や、Drive に放り込んだファイル

開発で使ってる GCP

社員に配った Android

全部 Google の何かしらに放り込んで、Gemini に巻き込まれておけば。その点は楽だろうな。

![find your way](find-your-way.png#1041x1389)

Google Workspace にいる Gemini も、今はポンコツだが、「ここに居られるモデル」は Gemini しかない。

デバイスがあり、ブラウザもあり、Workspace もあり、それら全部が統一したエージェントに囲い込まれたら。

チャットとドキュメントだけもう少し頑張って欲しいけど。

![Canalun](canalun.png)

Chromium のログも以前は、Claude で Co-Sign されたコミットをチラホラみたが、最近は見なくなった気がする。こちらも Antigravity が中心らしい。

Gemini しか使えないのが嫌で辞めた開発者もいた。Sundar の号令もあって、それぐらい使われているんだろう。

Google は、開発者の環境を育てる専門のチームがある。GitHub を使わずに Gerrit や Monorail を自分たちで作って使ってるのは、載せたら GitHub が耐えられないからだと聞いた。

世界中に散らばった CI クラスタが落ちる理由の一部が宇宙線だ。宇宙から降り注ぐ線がメモリ上のビットを反転させて、エラーになって CI が落ちる。そんなものがちょいちょい観測される規模で並列実行されている CI を、GitHub Actions なんかに乗せられるはずがない。

逆を言うと、それを長年実現しているチームがある。AI だけのチームでも、開発するだけのチームでもなく、「開発できるようにする」ためのチームだ。

そんな社内で Gemini をみんなで育ててたら、まあ育ってるんだろうなぁ。

![yuku](yuku.png#1041x1389)

俺達は、今までさんざんモデル開発競争を見てきた。

昨日はこのモデルのリリースに驚き、今日はこのモデルの性能に湧いてきた。

全部賭けようと思って移行が終わる頃には、もっと良い何かがでてきている。

会場には Podcast を収録できるブースがあった。Press 向けだが、空いてれば自由に使って良いということなので、初日の終わりに借りて撮ってきた。

Chrome チームのパーティーに参加した。懐かしい人とも挨拶できた。

![Chrome チームのパーティー](chrome-party.png#1255x945)

SF で WebKit の niwa さんとディナー。WWDC も楽しみ。

![dinner](dinner.png#1296x972)

CHM は 2h じゃ回れない。

![The Mosaic Handbook](mosaic-handbook.png#729x972)

Stanford はデカい。

![Stanford Univ](stanford-univ.png#1080x810)

SF へ向かう道中も Podcast を収録。

![SF への移動中にドライブトーク収録](drive-talk.png#1080x810)

完全版は以下。

- ep206 Google I/O 2026 | mozaic.fm
  - https://mozaic.fm/episodes/206/google-io-2026.html

カリフォルニアは日差しが強い。