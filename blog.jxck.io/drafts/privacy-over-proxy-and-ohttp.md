# [tag] Privacy のための Proxy と OHTTP

## Intro

Apple が Private Relay を発表し、Google が Privacy Prefetch Proxy に取り組んでおり、そして IETF では Mozilla と Cloudflare が共著で OHTTP の提案を行っている。

これらはいずれも、同時多発的に発生した IP アドレスの漏洩を防ぐために Proxy を用いるという手法に関するものだ。

なぜ今になって Proxy の議論が盛り上がっているのか、なぜ違うところで同じような取り組みが行われているのか、ここまでの流れと筆者の理解を記録したい。


## Fingerprint ベクタとしての IP アドレス

サーバを立てたことがある人なら、ログファイルの先頭は大抵タイムスタンプで、その次にクライアントの IP アドレスが記録されているのを見ることが多いだろう。

この情報は、障害解析のヒントであったり、 DoS 攻撃のブロック対象だったり、ときには犯罪の証拠として扱われることもある。非常に重要な情報だ。

ログの中で重要であることは、エントロピーが高いこととほぼ同義と言える。 NAT によって書き換えられたりと、まさしくクライアントが取得した IP そのものではないが、実質そのクライアントの出自を示すものと論理的には捉えられるからだ。

こと HTTP においては、 IP アドレスに `User-Agent` を組み合わせれば、 60-90% の精度でクライアントを識別することが可能というレポートもある。

TODO: https://www.microsoft.com/en-us/research/wp-content/uploads/2012/02/ndss2012.pdf

つまり、 IP アドレスは重要なフィンガープリントベクタであり、トラッキング広告などの文脈でも従来から活用されている。 これを根拠に、 3rd Party Cookie が防がれても、「まあ、最悪 fingerprint できるからなんとかなる」と考えている広告関係者もいるようだ。 Cookie は任意の識別子が付与できるため、データの突き合わせ処理が容易だが、そこがちょっと面倒になるだけで IP + User-Agent でも、実際あるていどはなんとかなってしまうのだろうと筆者は予想している。

一方ブラウザベンダもその問題は認識しており、昨今のプライバシー重視の流れは一見 3rd Party Cookie にフォーカスしているように見えて、それだけにはとどまらない。彼らの本質的な目的は「3rd Party Cookie を deprecate する」ことではなく、「ユーザのプライバシーを守る」ことだ。大体として使える Fingerprint ベクタをみすみす見過ごすはずがない。

`User-Agent` については、そのエントロピーを下げるために Freeze (固定化)しつつ、 Client Hints などの代替を提供するなどの動きが見られる。それはまた、別で解説したい。

そして、筆者も「IP アドレスはどうするんだろうか?」と思っていたが、そこに入ったメスが Proxy ということだろう。


## Proxy による IP 隠蔽

広義に Proxy といっても、狭義には様々な形態がある。

例えば、最近は減ったかもしれないが、会社貸与の PC に `.pac` ファイルを設定しないと社内システムにつながらない、といった環境で仕事をしている(していた)人もいるだろう。社員が漏洩をやらかさないように防御するもくてきや、アドレスフィルタを入れて業務中の不適切なサイト閲覧を防ぐといった使われ方が一般的だ。これのせいで、開発中にいろいろなコマンドやツールが動かずにフラストレーションを溜めた読者も少なくないように思う。思い出すだけで...やめておこう。

これは、ブラウザの通信をすべて一旦社内にある Proxy サーバを経由させ、そこでリクエスト/レスポンスの中身をチェックするといった用途だ。その構成を俯瞰すると、出ていくパケットが一旦経由するので Forward Proxy と呼ばれる。

近年は HTTPS が普及してパケットが全部暗号化されるため、 Proxy を経由しても宛先の IP は見られるが URL などは見えないため、効果が薄くなってきているため、もしかしたらこの形式での導入は減っているのかもしれない。

逆に、データセンタの入り口に立てたサーバが一旦全てのパケットを受け取り、そこで DOS のブロック、 TLS の終端、 WAF によるチェック、ロードバランスなどの共通処理を一括で行い、そこからデータセンタ内の各 Origin Server に転送する用途を Reverse Proxy と呼ぶ。

大抵の場合 Reverse Proxy が TLS を終端し、復号された HTTP の生メッセージを見ることができるため、リクエストヘッダやボディの中身を見て様々な処理が可能だ。

最後に、ただ単に左からきたパケットを右に中継するだけの Proxy を Tunnel Proxy と呼ぶ。これは、例えばアメリカでしか遊べないゲームを日本から行うために、アメリカの Tunnel Proxy を経由することで IP アドレスをアメリカのものにして、サーバに国内ユーザだと思わせるといった目的や、匿名掲示板での身バレを防ぐ目的などで使われることが多い。これを指す隠語として「串をさす」などという表現が使われていた時代もあった。

ダークウェブと呼ばれるようなアングラサイトで知られる Tor は、ユーザの匿名性を保つために様々な技術を使うが、いくつかの Tunnel Proxy を経由する方式が含まれている。サーバに残った IP からクライアントを割り出す場合、通常 ISP に問い合わせれば NAT のテーブルをたどってユーザが判明するが、 Tor は Tunnel Proxy を通るたびに IP アドレスが書き換わり、 Proxy が対応表を保存していて開示請求に応じなければ、たどるのが困難という、ざっくり言えばそんな感じだ。

このように Proxy は本来様々な用途で使われてきたが、いずれにせよ「パケットが経由することで Src IP が Proxy のものに差し替わる」という部分は共通している。つまり、サーバには Proxy の IP はわかっても、 Client の IP が直接はわからないのだ。


## Google の Private Prefetch Proxy

先に筆者が観測したのは、 Google が昨年公開した以下の記事に言及されている "*Private Prefetch Proxy*" だ。

- Chromium Blog: Continuing our journey to bring instant experiences to the whole web
  - <https://blog.chromium.org/2020/12/continuing-our-journey-to-bring-instant.html>
- buettner/private-prefetch-proxy: Proposal to use a CONNECT proxy to obfuscate the user IP address for privacy-enhanced prefetching.
  - <https://github.com/buettner/private-prefetch-proxy>

これは、パフォーマンスの文脈で Google が勧めていた、 Resource Hints による投機的取得にモチベーションがある。

例えば、あるサイト A に別のサイト B の Prefetch が実装されていたら、サイト A を訪問したユーザはその時点でサイト B のリソースを取得し、サイト B に遷移したときにはキャッシュがヒットして速くなる。これを Prerender にすれば、取得だけでなくレンダリングも実施できるため、遷移したらそのレンダリング済みのフレームを表示するだけで済む。

ところが、ここでユーザが B に遷移しなかった場合は、 B にはリクエストだけが飛んだ結果になる。そこに Cookie や Referer があれば、サイト B のオーナーは、ユーザの情報をサイト A 上から取得できることになる。

この問題のため Chrome は、投機的実行時に Cookie や Referer などの情報を送らないように実装を変更(NoState Prefetch)したが、それでも IP が送られるのを防ぐことはできない。

ここで考えられたのが Google が Tunnel Proxy を用意し、そこを経由させることでクライアントの実際の IP が漏れることなく Prefetch/Prerender できるというのが、 Private Prefetch Proxy の発想だ。

接続は基本的に HTTPS であるため、 Google の Proxy が通信の中身を知ることはできず、判明するのは クライアントとサーバの IP アドレスだけとなる。

実際、この Proxy のインフラががどのような構成になっているかは把握できておらず、実装の挙動もまだ確認できてない。ちょうど今 Prerender を Proxy などを用いて改善した Prerender2 が進んでおり、 Same Origin での Intent to Experiment が出された。

- Intent to Experiment: Same-origin prerendering triggered by the speculation rules API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/3JwGNnqH3QI>


Same Origin であれば、 IP のリークなどを気にする必要はないため、この Cross Origin の Experiment が始まったら、実際に試して別途解説したいと考えている。



## Apple の Private Relay

Google から Proxy の話が小出しで聞こえ始めてしばらくしたのち、 Apple が今年 6 月の WWDC で発表したのが Private Relay だ。

- Apple’s privacy pillars in focus - WWDC 2021 - Videos - Apple Developer
  - <https://developer.apple.com/videos/play/wwdc2021/10085>

また、同内容のより詳細な解説が先日 IETF で行われており、資料も録画も公開されているため、こちらをもとに解説する。

- IETF-111-PEARG-Private-Relay
  - <https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-private-relay-00>
  - <https://youtu.be/J8sBCPYDHJo?t=4235>


Google の Private Prefetch Proxy には、 Prefetch/Prerender という特定の目的があったが、 Apple の Private Relay は純粋に Safari の全てのトラフィックや、 DNS のトラフィックを Proxy を通すように変え、 IP のリークを防ぐのが目的とされている。

また、 Google とは違い Apple の場合は Ingress Proxy と Egress Proxy と呼ばれる 2 台の Proxy を経由させる構成をとっている。

TODO: P10 図

1 台目の Ingress Proxy は Client と Egress Proxy をトンネルする役目であり、このサーバが知り得るのは Client の IP アドレスだ。

2 代目の Egress Proxy は Ingress から転送されたパケットを Server に転送するため、  Ingress の IP はわかるが Client の IP はわからない。

ここで注目したいのは、 Ingress Proxy にサーバの IP アドレスを知らせない方法だが、このために Client は Engress Proxy と TLS を行う。つまり Server との間で暗号化された通信をさらに Egress との間で暗号化するのだ。

これにより、 Ingress を経由するのは Egress 宛の暗号化メッセージで、最終的に接続したい Server のアドレスは Egress にしかわからない。

まとめると、 Ingress は Client の IP はわかるが Server の IP はわからず、 Egress は Server の IP はわかるが Client の IP はわからない状態となる。

これを iCloud のインフラで行い、 iOS15 と macOS Monterey から提供するようだ。

すでに、ネットワーク管理者に向けたガイダンスも公開されている。

- iCloud Private Relayに向けたネットワークの準備 - サポート - Apple Developer
  - <https://developer.apple.com/jp/support/prepare-your-network-for-icloud-private-relay/>

このなかで Egress Proxy の IP アドレスも公開されている。試しに本サイトのアクセスログを調べてみたところ、少ないが該当 IP が観測できた。

こちらも実際の挙動をまだ確認したわけではないが、近いうちに公開されたら検証してみたい。


## OHTTP

OHTTP は Oblibious HTTP の略であり、このような Proxy を用いた IP 隠匿の仕様を標準化する目的として、 Mozilla の Martin Thomson と Cloudflare の C.A. Wood が共著で出しているドラフトだ。

ー Oblivious HTTP
  - <https://unicorn-wg.github.io/oblivious-http/draft-thomson-http-oblivious.html>

もともと Cloudflare は ODNS (Oblibious DNS)として、 Proxy を使い DNS クエリを隠匿する技術を既にサポートしており、それを HTTP に適用するということで、共著になっている。

ー Improving DNS Privacy with Oblivious DoH in 1.1.1.1
  - <https://blog.cloudflare.com/oblivious-dns/>

OHTTP も最近話題に出始め、先日の IETF111 で BoF (Bird of Feather: 興味のある人がとりあえず集まって議論する標準化の初期段階)が初めて行われた。

- minutes
  - <https://datatracker.ietf.org/meeting/111/materials/minutes-111-ohttp-00>
- agenda
  - <https://datatracker.ietf.org/meeting/111/materials/slides-111-ohttp-chair-slides-00>
- slide
  - <https://datatracker.ietf.org/meeting/111/materials/slides-111-ohttp-oblivious-http-01>





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

