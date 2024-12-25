# 3PCA 30 日目: 2024 年の 3rd Party Cookie まとめ

## Intro

このエントリは、**2023 年**の 3rd Party Cookie Advent Calendar の 30 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

このアドベントカレンダーを開始した 2023 年末の時点では、2024 年(つまり今年)の年始に Chrome による 1% Deprecate が始まり、2024 年をかけてその範囲を広げ、今頃は Post 3rd Party Cookie の世界が訪れている見通しだった。

しかし、その予定は大きく変更され、これからどうなるのかも不透明だ。

つまり、この話は 2025 年も継続することになってしまったため、2024 年の現状を一旦まとめておくこととする。


## 2024 年の Recap

まず、本当にざっくりとここまでの話を振り返ろう。正確性度外視の tl;dr というやつだ。

- Google は 3rd Party Cookie を 2024 年に廃止するアナウンスをしていた
- 独断で決めるのではなく、CMA (日本で言う公正取引委員会)と協議をして進めていた
- 並行して Privacy Sandbox を進めていたが、業界の移行が進んだとは言い難い
- 今 3rd Party Cookie を Deprecate するのは、影響が大きすぎる
- そこで 2024 年 7 月「Privacy Sandbox に関する方針転換」を Chrome が公表
- 「Chrome は 3rd Party Cookie 廃止を辞めると言っている、けしからん」と一部業界は反発
- しかし内容は「Chrome がブロックするのではなく、ユーザが選択する UI を提供する」というもの

最後の行を無視して「3rd Party Cookie 廃止を辞める」だけをかいつまむと、「Google は 3rd Party Cookie を今後も使い続けられるようにするといっている、許すわけにはいかない」という話になる。実際、そこに対する反発が業界各団体や W3C からも出ている。


### Google の発表への反発

W3C TAG は、2 年くらい前に "Improving the web without third-party cookies" という Finding を出している。これはタイトル通り「今後 3PC deprecation を進めていく」という趣旨の内容だったが、Google の発表を受けて、この内容が大幅に更新された。

- Third Party Cookies Must Be Removed
  - https://www.w3.org/2001/tag/doc/web-without-3p-cookies/

このアップデートについてのブログも出ている。

- Third-party cookies have got to go | 2024 | Blog | W3C
  - https://www.w3.org/blog/2024/third-party-cookies-have-got-to-go/

要するに以下のようなものだ

- 3rd Party Cookie は無くす方向で進めてきた
- Privacy Sandbox だって進めてきた
- それなのに話が違う、Google には失望した。
- Google は撤回を撤回すべきだ


### TAG の発表への反発

この TAG の発表に対して、元 Google, 現在 MS であり、自身も TAG のメンバーだった Alex Russell は、以下のブログを公開した。

- Misfire - Infrequently Noted
  - https://infrequently.org/2024/07/misfire/

彼のブログはいつも長く、言い回しが独特で読むのが難しい。よって、内容は筆者もざっくりとしか把握できてないが、おおよそ以下のようなものだ。

- TAG は Google を批判しているが、代替案を提示できているかというと、できてない。
- 3PC の削除を主張するのは美徳かもしれないが、現実的な問題を踏まえた行動ができてない。
- そもそも消せば解決というわけでもなく、恐れていた 1st Party Cookie での追跡は始まってる。
- とくにメールアドレスの紐付けが行われ、簡単にはオプトアウトできなくなっている。
- 唯一の解決手段は、プライバシー法を確立することで、それ以外は応急処置だ。
- また、ベンダに対して in-app browser をやめるように求めるべきだ。
- そういうことができてない、TAG は中途半端な仕事しかしていない。

この 3PCA でも散々述べてきた点もまとまっており、一部筆者の考えとの違いはあれど、概ね同意できる内容と思う。


### 本当に反発すべきものは何か?

重要なのは、Google の発表自体も CMA との連携の上で出されているという点だ。

ここまで散々 Chrome を(事実上)監視していた CMA が、「Chrome が完全に 3PC のブロックを辞める」と言い出したとして、それをすんなり受け入れるかどうかは、ちょっと考えればわかるだろう。

TAG の Finding は、まだ確定していない「方針の転換先がなんであるか」を決めつけて批判している点だと筆者は考える。

仮に Chrome を批判するのであれば、「批判するにも値しない程度の情報しか、公開されてない」という点かもしれない。

しかし、具体的に「方針の転換先」つまり「ユーザの選択 UI」がどんなものであるかも、おそらく本当に決まってないのだろう。

中途半端な状態で公開などできない代物になってしまったため、Chrome が慎重にならざるを得ないのもわかる。

今我々ができるのは、Chrome が「ユーザ選択の UI」を出してきた時に、それをどのように評価すべきかと言う点を整理しておくことくらいだ。


## 「ユーザの選択 UI」とは何か?

以下でも書いたことだが、あらためてまとめておく。

- 3PCA 29 日目: Privacy Sandbox の方針転換は何を意味するか | blog.jxck.io
  - https://blog.jxck.io/entries/2024-07-31/deprecating-the-deprecation.html

この方針転換で最も重要な「ユーザの選択 UI」は、プロンプトであるだろうことが発表されているため、であれば実装で注目すべき点は「出るタイミング」と「影響範囲」の二点だろう。

「プロンプトが出るタイミング」としては、大きく以下の 2 つが考えられる。

- 3PC を使うたびに出る、かつての Push Notification Prompt のような実装なのか?
- ユーザが選択操作しないと出ない、従来の Settings の中にあった設定の配置換えなのか?

これによってだいぶ変わってくる。

前者であれば、既に Push がほぼブロックされていた実績から、3PC も同等にブロックされることが予想できる。そうであれば、Chrome は Deprecate しなかったが、業界的にはほぼ制度が出ず Deprecate されたも同然。という状態があり得るため、あとは「サービスプロバイダ」と「サービスユーザ」という構図で、サポートをどうするかといった話に落とし込まれる。

一方、後者であればほぼ今と変わらないため、「3PC の Deprecate はやめた」に近い状態が想像できる。しかし、それをそのまま CMA が受け入れるとは想像し難い(今までやってきたのは、なんだったのかとなる)。

また、3rd Party が対象であるため、ページで出す UI 設定の影響スコープも難しい。

- 無効化の設定は、3PC のドメインに対して保存され、一度ブロックした 3PC はどのページに行ってもブロックされるのか?
- ブロックはページ単位(つまりブロックも Isolation される)であり、別ページでは有効になり、全ページでブロックが必要なのか?

前者なら、ブロックの広まりはかなり速く進む可能性がある。一方後者だと、ユーザがプロンプトを操作する機会が増えすぎるため、ユーザにとってはかなりマイナスな UX が提供されることになる可能性がある。

![User Choice Prompt の実装観点](./user-choice-prompt.svg#800x400)

さて、では Chrome はどんなプロンプトを出すのだろうか?


## CMA の報告

Chrome が夏に方針転換をアナウンスした際に、CMA も小さくコメントを公開していた。

今は消えているが、前回のエントリで引用していたものが残っているため、再度引用する。

> On 22 July 2024, Google announced that it is changing its approach to Privacy Sandbox.
> Instead of removing third-party cookies from Chrome, **it will be introducing a user-choice prompt,**
> **which will allow users to choose whether to retain third party cookies.**
> The CMA will now work closely with the ICO to carefully consider Google's new approach to Privacy Sandbox.
> We welcome views on Google's revised approach, including possible implications for consumers and market outcomes.
> ...
>
> --- https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes

つまり、CMA と Google の間では「user-choice prompt」を出す点で、合意が取れていたことが伺える。

すると注目すべきは CMA の Quarterly Report だ。

CMA は本件を Google と進める中で、Google がコミットメントに対してどのような振る舞いをしたか、それが妥当なものであったのかを四半期ごとに報告している。

本来は 7 月に Q2 のレポートが出るはずだったのだが、Google の方針転換と被ったため、一旦先送りにし Q2/Q3 合同のレポートが出ることになったのだ。

筆者は、何かアップデートがあるとしたらそこだろう、と思い、そのレポートの公開を待っていた。


## CMA Q2/Q3 Report

Q2/Q3 レポートは 11 月に公開された。以下の 3 つから構成されている。

- Google のコミットメント(これをやる)の内容(P15)
  - https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf
- Google の報告書(P44)
  - https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf
- CMA の報告書(P115)
  - https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf

非常に長いが、公開されてすぐに一通り目を通した。

内容についてブログを書かなかったのは、残念ながらこのレポートで特に新しい情報がなかったからだ。

一応メモは残っているので、ざっくりまとめておこう。


### Google のコミットメント

要するに「Google はこういうことをする」といった、業界用語でいうと「CMA と Google の間の握り」にあたるもの。

- Privacy Sandbox を進めている
- Google だけが有利にならないように配慮している
- CMA に逐一報告し、協力して進めている
- いざ削除が決まった場合の進め方も CMA と握っている
- etc. etc. etc.

プロンプトの件も触れられていない。


### Google の報告書

Privacy Sandbox についての進捗の報告。

- 策定も啓蒙も進めており、CMA にも報告している。
- 2024/7 に方針の変更を発表した。
  - 具体的なタイムラインなどは未定。
  - これが与える影響を調査・検証するために Q2 の報告は延期した。
- その他、いつも通りの進捗。
- 業界のフィードバックを募集中。
  - それについてここで回答する。
- 「3PCD のプランは今どうなっているのか?」
  - ユーザが選択するアプローチに変える予定。
  - それについて CMA と協議中。
- 「User Choice がどんなものか?」
  - 新しいアプローチがどうなるか、まだ詳細は言える状態ではない。
  - ただし、Cookie のない通信が大幅に増えると予想している。
  - だから Privacy Sandbox の必要性は変わらない。
  - UI もどうなるか決まっていない。
  - それでも今回の変更に関する決定は、早く伝える必要を感じ行った。
- その他、Privacy Sandbox API に対するフィードバックと回答など。

少なくともここからは、「ユーザの大半が無視できて、今まで通り 3PC が使い続けられるようなプロンプトの出し方」にするつもりはなさそうに感じる。

とはいえ、まだ何もわからない状態なのは変わらない。

本当は年末ごろ、プロトタイプでも実装が見られれば、それを元に今年最後のまとめブログとしようとしたが、それもできなかった。


### CMA の報告書

こちらが本丸だ。

- 冒頭の Summary に重要なことがいくつかある。
- コミットメントに基づいて現状や懸念をまとめる。
- Q1 報告以降、Google は方針転換を発表した。
  - ユーザに選択させる方式になった。
  - 検討が必要なので Q2 の報告はスキップした。
  - 方針転換に対して意見募集を行ったので、それを載せる。
  - コミットメントは修正が必要だ。
  - その辺を含めて引き続き Google と協議している。
- とりあえずこれまでの Privacy Sandbox の進捗についてまとめる。
  - 業界からのフィードバックと Google の回答をまとめる。
  - 現在ある問題については、おおよそ解決されてきている。
- 法律の話
- ICO の立場の話
- 様々な検証を行ったが、Google はこの期間コミットメントを遵守していた。

つまり、ここまでの Google の取り組みについて、方針転換の部分を除いて Privacy Sandbox の作業を CMA はポジティブに捉えているように読めた。

また、いくつか気になるのは「Engagement with market participants」のところだ。

- 94: PS の開発がオープンでグローバルになるように、業界各位と協力して進めている。
- 95: W3C での議論や質疑にも Google は参加している。もしここにコミットしていなければ、CMA からもクレームする。
- 96: Q2 以降のフィードバックも、Google と取り組んでいる。
- 97: そのまとめは、おおよそこの報告書に書いた通りだ。
- 98: 7 月に公開したアプローチにはいろいろな意見が届いた。業界各位はほぼ全員一致で「競争上の懸念は残っている(competition concerns remain)」としており、「CMA は引き続き Google をこの点でも監視すべき」という意見が上がっている。
- 99: また、少ないが主に個人から「Google はやはり 3PC を完全に廃止すべきだ」という意見もあった。これらも本件にとって重要だ。

Appendix 2 にも以下のようにある。

- 13: Google の新しいアプローチで 3PC が減ったトラフィックにおいても、ターゲティングや測定のために、Privacy Sandbox は引き続き重要になるため、引き続き取り組む必要がある。

このレポートで CMA は、少なくとも Google の方針変更を現時点で批判してはいない。これは、Google と CMA のやり取りの中でも「Google は完全に 3PC 無効化を諦め、今後の 3PC は今まで通り使えるから Privacy Sandbox もいらなくなった」などという極端な話には、なっていない証左になると言えそうだ。

憶測で極端な批判をするには、現時点ではあまりにも材料が足らないことだけは、はっきりしていることがわかるだろう。


## まとめ

以上のように、Q2/Q3 のレポートでは、あくまで「変更以前の活動」に対する報告と評価が中心だった。Q4 のレポートが出るのは年が明けてからになるため、これ以上特に情報は得られないだろう。

一方、Chrome からも「ユーザ選択 UI」の続報はなく、試すことができる状態でもない。

そこがはっきりしない限り、批判することもできない状況だ。

まずは 2025 年に、Chrome からこの UI の方針や実装が出るところから、この話がどうなっていくのかが見えてくることになるだろう。

2024 年には結論が出るだろうと思っていた本件だが、2025 年に持ち越しになった。

2025 年に結論が出るのかも怪しいが、引き続き注視していきたい。というか、行かざるを得なくなってしまった。