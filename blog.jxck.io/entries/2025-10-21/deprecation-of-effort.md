# [cookie][3pca] 3PCA 32 日目: Privacy Sandbox の後始末

## Intro

このエントリは、_2023_ 年の 3rd Party Cookie Advent Calendar の 32 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

宙に浮いていた Privacy Sandbox プロジェクトの「後始末」が公開された。


## Privacy Sandbox の軌跡

Privacy Sandbox の開始は、以下のエントリの公開と捉えることにする。

- 2019/08/22: Building a more private web
  - https://blog.google/products/chrome/building-a-more-private-web/

そして、2025/4 に Privacy Sandbox の方針転換が公開され、「3rd Party Cookie の Deprecation はしない」という結論が公開された。

- 2025/04/22: Next steps for Privacy Sandbox and tracking protections in Chrome
  - https://privacysandbox.com/news/privacy-sandbox-next-steps/

この時点では、「Privacy Sandbox の作業は続ける」といった言い回しで締められていた。

ところが、多くの API は Chrome でしか実装されていない、または他のブラウザが実装するつもりのないものであり、Chrome が 3rd Party Cookie を消さないのであれば、不要な API ばかりであった。

今回出た発表は、そうした「これ以上不要な API」についての作業を中止し、実装されていないものも含めて Deprecate していくというものだった。

- 2025/10/17: Update on Plans for Privacy Sandbox Technologies
  - https://privacysandbox.com/news/update-on-plans-for-privacy-sandbox-technologies/

来月に TPAC も控えており、このままでは該当する WG で「この API はどうするのか」といった議論になる可能性があっただろう。それを防ぐためにも、このタイミングだったように取れる。

いくつかの API は残るが、それを Privacy Sandbox と括る必要ももうないだろう。つまり、これが _Privacy Sandbox の終わり_ と捉えることができそうだ。


## API の今後

それぞれの API がどうなるかについては、以下にまとまっている。

- Privacy Sandbox feature status
  - https://privacysandbox.google.com/overview/status

Privacy Sandbox の大半を占めていた「広告関連ユースケース」として提案されていたものは、軒並み廃止の対象となった形だ。

- Continue to support
  - Bounce tracking mitigations
  - CHIPS
  - FedCM
  - Fenced Frames
  - frame-ancestors directive
  - Private State Tokens
  - Storage and Network State Partitioning
  - Storage Access (including Storage Access Header)
  - User-Agent Client Hints
  - User-Agent reduction
- Deprecate and remove
  - Aggregation Service
  - Attribution Reporting
  - Private Aggregation
  - Protected Audience
  - Related Web Sites (including requestStorageAccessFor())
  - Shared Storage (including Select URL)
  - Topics
- Discontinue
  - IP Protection
  - Partitioned Popins
  - Related Website Partition
- Do not launch
  - Fenced Storage Read
  - Private Proofs
  - Probabilistic Reveal Tokens
  - Script Blocking

ところが、3rd Party Cookie が無くとも、「広告効果の計測は行いたい」というユースケースは、ITP や ETP を推し進めた Safari/Mozilla をしても妥当と捉えられている。Web における広告事業には効果測定が必須であり、それをユーザを追跡することなく行うことのモチベーションは共通しているからだ。

Chrome 主導だった Attribution Reporting API、Apple 提案の PPA、Mozilla 主導の PCM と提案が乱立していた。

- WICG/attribution-reporting-api: Attribution Reporting API
  - https://github.com/WICG/attribution-reporting-api
- Privacy-Preserving Attribution: Level 1
  - https://www.w3.org/TR/privacy-preserving-attribution/
- Introducing Private Click Measurement, PCM | WebKit
  - https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/

これらを統合した Attribution API だけは残り、継続して PATWG で議論されるようだ。

- Attribution Level 1
  - https://w3c.github.io/attribution/

CHIPS や FedCM のように、既に一定の合意があり実装が進んでいるもの以外は、全て終わるということになる。Private State Token はまたかなり毛色が違い、広告以外にもかなり応用が期待されているため、残ったのだろう。

IP Protection は、Safari でいう Private Relay 相当の機能だ。[4 月の段階](https://privacysandbox.com/news/privacy-sandbox-next-steps/)では「2025/Q3 で提供予定で、引き続き取り組む」という旨が書かれていたが、廃止のリストに入っている。すでにドメインリストベースの実装がプライベートモード向けに Ship のアナウンスが出ているが、どうなるのかは気になるところだ。

- Intent to Ship: IP Protection in Incognito using published Masked Domain list
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EbdlJ3pc3NM/m/onR2VnBgAgAJ


## CMA の反応

この連載の中でも何度も解説したが、この話を調べる上では、必ず CMA の反応を踏まえる必要がある。基本的には Google は CMA とのコミットメントの上で、全ての話を進めてきたからだ。

- Investigation into Google's 'Privacy Sandbox' browser changes - GOV.UK
  - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes

4 月の方針転換(Deprecating Deprecation)が出たばかりの Q1 のレポートには、特に何も書かれなかった。

そして、Q2 で Google が提出したレポートは以下だ。

- Privacy Sandbox Progress Report Q2 Reporting Period
  - https://assets.publishing.service.gov.uk/media/6889f52a6478525675738fe0/Google_s_Q2_2025_report.pdf

これは、すでに Google が 3PC を維持する方針に変化したために、2 つの変更が生じることを提起している。

- Privacy Sandbox API が今後も必要か、エコシステムと協議(つまり広告ベンダにヒアリング)が必要
- CMA の懸念がなくなるため Google がもはや CMA とのコミットメントを維持する必要がなくなる

重要なのは後者だ。


## CMA とのコミットメントとは?

今回の連載を追っているとわかるが、多くの人が勘違いしている点は、CMA と Google が何をしていたかだ。

よく Google が、自分たちが使うために Privacy Sandbox を始め、そこで好き放題しないように監視をするのが CMA という構図だと思われている。

実態はそうではない。

Google が 3rd Party Cookie を廃止すると、もはや 3PC を用いたトラッキングは不可能になる。

するとどうなるかというと、「1st Party Data (1PD)」を用いた広告戦略が重要になり、それを大量に持っている企業が有利になるのだ。

Google は、メールからカレンダー、YouTube から Store まで大量の 1PD を持ちつつ広告もやっている。1PD を持たない広告プロバイダは、どうしたって敵わない。

そのうえで Chrome を持っていることもあり、Google が独自に Chrome だけで使える機能などを入れないか、といった点ももちろん考慮される。

つまり CMA が懸念していたのは、「業界の準備が整っていない状態で 3rd Party Cookie を廃止する」ことで、Google が一人勝ちすることだったのだ。

そうならないための「準備」に当たるのが、代替手段としての Privacy Sandbox であり、それは Google のためというよりも、Google 以外のためと言っても過言ではなかった。

しかし、今回 Google が「3rd Party Cookie の廃止をやめる」と宣言したことで、CMA が懸念していた問題自体がなくなったのだ。

結果、法的なプロセスに則り、コミットメントの解除に向けて進める、というのが Q2 の段階で始まっていた。


## コミットメント解除

CMA が行うべきことは、「コミットメントを解除しても問題ないか?」という部分だ。

当初懸念されていたのは、前述の通り「Google が Chrome で 3PC をブロックすることで、一人勝ちする」ことだったと考えれば、その前提が崩れた今、懸念は一緒に消えている。

6/13 ~ 7/4 (サイトの記載が間違っている)に実施した外部コンサルテーションの意見も集め、調査検証した結果、コミットメントを解除しても問題ないという結論に至った。

- Decision to release the commitments previously accepted by the CMA in respect of Google's Privacy Sandbox proposals
  - https://assets.publishing.service.gov.uk/media/68f213ce06e6515f7914c728/Decision_to_release_the_commitments_previously_accepted_by_the_CMA_in_respect_of_Google_s_Privacy_Sandbox_proposals.pdf

2025/06/13 には、CMA から「コミットメント解除」の意向がアナウンスされ、関係する第三者からのコメントを募集していた。

合わせて Google からの Privacy Sandbox API のテスト(トライアル)結果なども公開されている。

- Testing of Google's Privacy Sandbox proposals: CMA summary
  - https://assets.publishing.service.gov.uk/media/684bee68df3ce2ce31e3f948/Summary_of_testing_of_Google_Privacy_Sandbox_proposals.pdf

こうしたプロセスに則り、慎重に検討を重ねた結果、2025/10/17 に CMA はコミットメントを解除した。

> After carefully considering the consultation responses to the June 2025 consultation,
> the CMA remains of the view that it has reasonable grounds for believing that
> its competition concerns no longer arise and that it is appropriate to release the commitments.
> On 17 October 2025, the CMA issued its Decision to release the commitments.
>
> 2025 年 6 月の協議に対する回答を慎重に検討した結果、
> CMA は、競争上の懸念はもはや生じず、
> コミットメントを解除することが適切であると考える合理的な根拠があるとの見解を維持している。
> 2025 年 10 月 17 日、CMA はコミットメントを解除する決定を下した。
>
> --- https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes

合わせて、冒頭の Google からのアナウンスが行われた。


## Privacy Sandbox とは何だったのか

Web から 3rd Party Cookie を廃止しようと始まった 1 つのサーガだった、この一連の流れだった。

Privacy Sandbox のアナウンスは 2019 年だが、Safari が ITP をアナウンスしたところまで遡れば 2017 年だ。

Web が登場してから、その時点までの 30 年近くの間、3rd Party Cookie は確実に総力を結集してでも解決すべき「問題」だった。

では、その戦いに人間が負けたという結論で、よいのだろうか?


### 市場の変化

Google が CMA に提出したレポートに、Deprecation を辞める根拠として、市場に起こっている変化が 3 つ挙げられている。

- privacy-enhancing technologies (新しいプライバシー保護機構)
- new AI-driven safeguards (AI による安全確保技術)
- evolving global regulations (グローバルな規制の進化)

ところが、重要そうな点でありながら、いずれもインラインで列挙しているだけで、具体例などがない。とにかく、今はもう始めたころと時代が変わって、Deprecation しなくてもなんとかなるとでも言いたそうだ。しかし、それが言えてるのかは非常に曖昧に思える。

ここで別の視点も見てみる。

Google は CMA との本件以外に、US の DOJ (司法省)とも裁判を行っていた。いわゆる「Chrome 売却令」のアレだ。こちらも、ビジネスの寡占が火種となっている。

結果として、「Chrome の売却は不要」という点で落ち着いたが、この中で Google が提出してた Memorandum が以下だ。

- GOOGLE LLC'S MEMORANDUM ADDRESSING THE LEGAL FRAMEWORK APPLICABLE TO REMEDIES
  - https://storage.courtlistener.com/recap/gov.uscourts.vaed.533508/gov.uscourts.vaed.533508.1664.0.pdf

意訳すると

- AI is reshaping ad tech at every level
  - AI はあらゆるレベルで AdTech の形を変えつつある
- non-open web display ad formats like Connected TV and retail media are exploding in popularity
  - Connected TV や Retail Media のような、Open でない Web Display Ad の人気が爆発的に高まっている
- Google's competitors are directing their investments to these new growth areas.
  - Google の競合他社は、こうした新たな成長分野に投資している。

そして、こうも付け足している。

> The fact is that today, the open web is already in rapid decline and Plaintiffs' divestiture proposal would only accelerate that decline, harming publishers who currently rely on open-web display advertising revenue.
> As the law makes clear, the last thing a court should do is intervene to reshape an industry that is already in the midst of being reshaped by market forces.
>
> 事実、今日の Open Web (Ads) はすでに急速に衰退しており、原告の分割提案はその衰退を加速させ、
> 現在 Open Web のディスプレイ広告収入に依存しているパブリッシャーに打撃を与えるだけである。
> 法律が明示しているように、裁判所は、すでに市場原理によって再構築されつつある業界に介入するべきではない。

ここでは "the open web is already ~" とされているため、「Web そのものの衰退」としてニュースで喧伝されているが、全体を読めば、あくまで「他の媒体と比べた時の、クローズでない、Web 広告」のことを指していると捉える方が妥当だろう。

その点は、今回の係争そのものに対する Google からの非難にも現れている。

> Harms to the open web.
> In the face of this significant hardship and uncertainty accompanying divestiture, Plaintiffs fail to acknowledge (let alone take into account) the reality that the world has moved significantly away from open-web display
> In January 2025, only 11% of display advertising impressions purchased by AdWords advertisers were for open-web display (for comparison, down from over 40% in January 2019).
> Plaintiffs are fighting for a remedy that would vanquish a past that has been overtaken by technological and market transformations in the way digital ads are consumed.
>
> Open Web への弊害
> 分割に伴うこの重大な苦難と不確実性に直面して、原告は、世界が Open Web Display (ads) から大きく離れているという現実を認めていない(ましてや考慮に入れていない)。
> 2025 年 1 月、AdWords の広告主が購入したディスプレイ広告のインプレッションのうち、Open Web Display 向けはわずか _11%_ だった(2019 年 1 月比較で 40% 超減少)。
> 原告は、デジタル広告の消費方法における技術と、市場の変革に追い越された過去を、打ち消す救済策を求めて戦っている。

2025 年 1 月の次点で 2019 年から 40% 減っているということは、既にコロナ前と比べて半減しているということだ。もう Web におけるディスプレイ広告は、広告市場の「中心」ではないと捉えるのが妥当と言えるだろう。

では、広告市場の中心はどこに行ったのか? それは以下で述べられている。

> Google's ad tech provider competitors, many of whom are major household names, have also uniformly directed their investments and focus to the most rapidly growing ad formats-not open-web display.
> Connected TV advertising via providers like Netflix and Disney is now "the fastest-growing advertising channel in the U.S."
> And retail media advertising has experienced enormous investments by "retailers of all sizes," with $60 billion expected to be spent in 2025.
> For example, Amazon invested in its demand-side platform, in particular through partnerships with TV providers, "to clobber rivals The Trade Desk and Google in a key area of advertising";
> The Trade Desk worked with Spotify, a digital audio platform, to launch a Spotify ad exchange;
> and Magnite partnered with Samsung Ads to support Samsung's TV advertising and with Netflix to support Netflix's new, in-house ad suite.
>
> AdTech プロバイダとしての Google の競合他社(その多くは大手有名企業)もまた、オープン Web のディスプレイ広告ではなく、最も急速に成長している広告フォーマットに投資と集中を向けている。
> Netflix や Disney などのプロバイダを通じた Connected TV 広告は、今や「米国で最も急成長している広告チャンネル」である。
> また、小売メディア広告は「あらゆる規模の小売業者」によって莫大な投資が行われており、2025 年には _600 億ドル_ が投じられると予想されている。
> 例えば、Amazon は Demand-Side Platform、特に TV プロバイダとの提携に投資し、「広告の主要分野でライバルである Trade Desk や Google を打ち負かした」
> Trade Desk はデジタルオーディオプラットフォームの Spotify と協力し、Spotify の広告取引所を立ち上げた。
> そして Magnite は、Samsung のテレビ広告をサポートするために Samsung Ads と提携し、Netflix の新しい自社広告スイートをサポートするために Netflix と提携した。

動画/音声市場の強さが強調されている。そしてその市場は YouTube を持つ Google ですら掌握はできていない。つまり、そこに寡占状態があると認めるのは難しいことは、我々の体感とも合いそうだ。

また他にも、例に漏れず AI の登場による市場の転換についても、随所に述べられている。

問題は、これらの変化が 1 年そこらで起こっている点だ。CMA にしても DOJ にしても、話が始まったときと比べて Web を取り巻く産業構造は前提からして変わってしまったのだ。


## 損切りとしての中止

Chrome 売却を避けるためとはいえ、「もう Web の広告は儲からない」と、それで一時代を成してきた Google が、重厚なレビューを経た公式の文書で自ら言っているのだから、実際にそうなのだろう。

つまり、3rd Party Cookie のユースケースだった「トラッキング」を最も必要としていた「_Web のディスプレイ広告_」は、デジタル広告事業の中心的なポジションには全くない。

それは同時に、3rd Party Cookie 自体が、もうそんなに気にするほど重要な「問題」ではなくなってきていることを、暗に示唆しているようにも思う。

むしろ、こうして産業構造が変化した中で、新聞社のようなニュースメディアが、どのように収入源を確保するのかを考える方が、全体としては重要な課題になっていることは、読者にも実感があるだろう。

もう我々が戦うべき相手はとっくに変わっており、これ以上 3PC にリソースを投じること自体の価値が目減りした、つまりこれは「_損切り_」だったという解釈が、妥当だったように思う。

Safari と Firefox が 3PC のサポートを再開することもないだろう。他にも、エコシステムが用意した自衛手段は多々ある。今後は、ブラウザ内蔵の AI モデルによる、非決定的防御機構なども一定の期待ができ、それによって解消される懸念もあるだろう。

3PC を一律に廃止して Web をぶっ壊す正義よりも、そこにかけるリソースを転嫁してでも戦うべき相手が、もう我々を取り囲んでいるのかもしれない。


## Outro

アナウンスが出て 2 日ほどしか経っていないため、今回のアナウンスに対する他のパーティーの反応は、今のところ確認できていない。

前回の「Deprecating Deprecation」発表も、そこまで大きな騒ぎにならなかったように記憶しているため、もう業界自体が「どうでもいい」というフェーズになっているのかもしれない。

気になるのは、わざわざアナウンスまでしていた IP Protection をどうするのか。そして、W3C でこれら API の策定に取り組んできた各 WG の反応くらいだ。

こちらは、ちょうど来月日本で開催される TPAC に参加できるため、そこで様子を見てきたいと思う。

そこで特に何もなければ、不覚にも 2023 年から続いてしまったこのアドベントカレンダーも、いよいよ終わらせることができそうだ。

Privacy Sandbox というプロジェクトが、世紀の大失敗プロジェクトだったのか、日の目を見なかった人類の叡智だったのかの判断は、後世に委ねたい。