# [ca][https][security] eMudhra のインシデントは Web にとって何を意味するのか

## Intro

PHP2Shell は、時の総理大臣も対応を発信するなどの動きがあり、一般のニュースですら大きく報じられていた。

しかし、同時期に報じられた eMudhra のインシデントの方が、比較にならないくらいヤバいと、筆者は思っている。

Web の信頼を失墜させるほどにだ。


## CA のおさらい

"Mudhra" は「印」のような意味で、カタカナで書くなら「ムドラー」らしい。"e" + "印" でデジタル認証局を意味するインドの Root CA だ。

我々は HTTPS をデプロイするとき、サーバ内部で秘密鍵を作り、対になる公開鍵をクライアントに提示する。これがなりすまされていないかを証明するために、既に広く普及した CA に自分たちの証明書への署名を依頼する。

これが、我々が Let's Encrypt などに発行を依頼する、いわゆる HTTPS のサーバ証明書だ。

クライアントは、デバイスに入っている証明書リストの中から、対応する CA の証明書を取り出し、署名を検証する。これが成功して初めて、サーバの提示する証明書が、なりすまされていないことが確認できるのだ。

これは、証明書リストに入っているような CA は、正しく、健全に、安全に運営され、証明書を適切に発行しているという前提に則っている。ここは信用できるという前提を置き、そこから数珠つなぎで上位の信頼を構築していく基盤だ。

「トラストアンカー」と呼ばれるゆえんだ。


## CA のインシデント

それでも、CA が侵害され、サービスの意図しない証明書が発行される「誤発行」が、近年ではよく話題になる。バグを突かれたり、内部の操作ミスだったり、理由は様々だ。

例えば Google が知らないところで正規の google.com の証明書が発行され、それが中間者攻撃に利用されると、Google がどんなにセキュリティに気を配っても、防げない攻撃が発生してしまう。

そこで「自分の知らないところで、自社サービスの証明書を発行されないよう、CA を監視するため」に、CT Log という仕組みが作られた。

CT Log に登録して発行される SCT が無ければ、ブラウザはその証明書を無視する。つまり CT に登録していない証明書は Web では意味を持たないので、攻撃者も登録をバイパスできない。でも、登録すれば CT Log をくまなく監視している Google に発行がバレ、失効される。

誤発行をやらかした CA は、CA/Browser Forum で「信頼できない」という烙印を押され、ブラウザやデバイスから Distrust される。そうやって消えていった CA もある。


## CA の運用

このようにトラストアンカーとなる CA は、高い水準で運用されている必要がある。

例えば、Root CA の秘密鍵は、それさえあれば全世界のドメインに対して、証明書を発行できる能力を持つことになる。作った鍵は 10 年などのスパンで使われるため、厳重に管理される。

鍵の生成自体は OpenSSL コマンドでもできるが、OpenSSL を叩いて出てきた秘密鍵を、`chmod 400` して特定のディレクトリに保存する、などという Web サービスの秘密鍵のような運用とは根本から違う。

CA の鍵は Hardware Security Module と呼ばれる、特殊なハードウェアの中で作られる。

内部で鍵のペアを生成し、その公開鍵だけを外に出す。秘密鍵はハードの中にあり、基本的に取り出すことができない。外から署名を依頼すると、内部の鍵を使って生成された署名が出てくる。

データセンターの中にこれがあり、物理的にも厳重に管理される。もし、データセンターに忍び込んだり、フォークリフトで押し入ってハードごと引っ剥がして盗んだとしても、破壊して鍵をサルベージしようとした瞬間に揮発して消え失せる。いわゆる「耐タンパー性」と呼ばれる作りになっている。

CA では、この HSM 内で秘密鍵を生成する際、「キーセレモニー」という文字通り「儀式」が行われる。

どんな儀式かと言うと、IANA のキーセレモニー(CA ではなく DNSSEC だが)が YouTube で公開されている。関係者が集まり、手順を確認しながら進め、全員で進行を見守る。思ったより「儀式」だということがわかるだろう。

<iframe src="https://www.youtube.com/embed/Tis4aV_zwqo" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>

- Root KSK Ceremony 49
  - https://www.iana.org/dnssec/ceremonies/49

途中で出てくるのが HSM で、それを保管する厳重な金庫っぽいものも見える。言ってしまえばたかが数 Byte のデジタルデータだが、それを作るために 5 時間を超える大掛かりな儀式を行う。それに値するだけのデータなのだ。

(筆者は人生で 1 度でいいから、キーセレモニーに参加してみたいとずっと思っているが、そんなチャンスが無い。)

このような運用が、きちんと行われているか第三者がチェックするため、CA は WebTrust の監査を受ける。Let's Encrypt だと、その監査報告書も公開している。

- Policy and Legal Repository - Let's Encrypt
  - https://letsencrypt.org/repository/

こうした資料をもとに、「本当にこの CA はきちんと運用されているか?」「信用に値する CA か?」を CA/Browser Forum などで議論する。信用されれば、この CA の証明書がデバイスに入る。

Mac で言えば Keychain、Windows で言えば Certificate Store に収められた CA のリストが「信頼された CA」だ。そのデバイスを選んだユーザは、推移的にその CA を信頼していることになり、その CA が発行した証明書を Valid として検証することができるようになるのだ。


## eMudhra は何をやらかしたのか?

eMudhra も Root CA として広く信頼されている。

つまり、キーセレモニーをして秘密鍵を作り、その運用体制も監査で確認されているはずだ。

ところが、このキーセレモニーに不備があった。本来使うべき厳重な鍵とは別に、スクリプトのバグによって非常に弱い鍵が生成され、それが取り違えによって中間 CA の鍵として採用されてしまったのだ。

- eMudhra Statement on Recent Certificate Security Incident | eMudhra
  - https://emudhra.com/en/post/certificate-security-incident
- eMudhra Intermediate CA Compromise
  - https://emudhra.we-have-a-problem.com/

具体的には、楕円曲線暗号 P-384 の鍵を作った。本来の秘密鍵は 1 ~ 2^384 から選んだランダムな 48 byte であるはずが、実際には上位 47 byte が全部 0 で、実質 1 byte の鍵になっていたという。その 8 つの鍵が以下だ。

```
4, 56, 66, 115, 155, 156, 230, 237
```

- Eight Bits of Trust; eMudhra's CA keys cracked in milliseconds
  - https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/

楕円曲線の強みである離散対数問題の困難性なんかそっちのけで、「256 回ほど総当たりすれば逆算できる」ことになる。つまり、eMudhra の秘密鍵がこのように弱いことに気づきさえすれば、簡単にこの鍵を復元できる。

つまり、本来 HSM に保管されているはずの CA の鍵が手に入るのだ。

この鍵を使って署名した証明書は、もちろん署名を確認しても Valid だ。デバイスにとっては「正規の証明書」でしかない。

誰でも、世界中のドメインの、正規の証明書を複製することが可能なのだ。

持っている端末のテザリングを「Airport Free WiFi」などにして、空港に置いておく。何も知らずにつながってきたユーザの通信をすべてキャプチャし、HTTPS の接続先をすべて改ざんしても、警告は出ない。

あと何をするかは、攻撃者の匙加減だ。

PHP を使っていたら、などという限定はない。

すべての Web について、この攻撃が成立するポテンシャルがある。

このヤバさがわかるだろうか?


## 信頼の破綻

Google では、「秘密鍵のセキュリティレベルはプルトニウムと同じ」という逸話がある。実際は知らないが、その能力と影響を考えれば、そのくらい厳重に扱っても妥当だ。とはいえ、Google がやらかしても、困るのは Google だ。

広く信頼された CA の秘密鍵が漏洩するなどということは、決してあってはならない。

確かに今回も、漏洩自体はしていない。が、攻撃者が秘密鍵を手に入れることができるということは、実質「CA の秘密鍵が漏洩した」と等価だ。

**Web において、絶対に起こってはいけないことが、実際に起こったのだ。**

インターネットの信頼は、トラストアンカーは信用できるという前提の上に積み上げられている。「そこだって信頼できるかわからない」という前提を作り出すと、何かを信頼することは原理的に不可能になるからだ。

それを担保するために、トラストアンカーはコストをかけてその健全性を維持する。多くの人間が目を光らせ、信頼に足る運用がされていることを確認する。PKI が長年積み上げてきた資産そのものだ。

先程のセレモニーは、確かに規模が大きいかもしれない。でも CA であれば、小規模でもキーセレモニーをするはずだ。「ちょっとスクリプトがバグった」でこんなミスが起こるなら、そのキーセレモニーは本当にマジメにやっていたんだろうか?

そんなずさんな運営体制は、監査に全く引っかからなかったんだろうか? そうだとしたら、何のための監査なんだろうか?

「ちょっとスクリプトに不備があって、弱い鍵が出来てしまった。でも中間証明書だしそんなに使ってない。すぐ失効したし、大した問題は無いだろう。」で済む話ではない。

これは、あるプログラムにちょっとしたバグが見つかったから、修正版にアップデートしないといけない、などという話とは次元の違う問題なのだ。


## 取りうる対応

実は、ブラウザで表示する HTTPS ページについては、ちょっと事情が違う。

偽装した証明書は、CT Log に登録しなければ SCT が無い。SCT が無ければブラウザは信用しない。しかし、攻撃者が CT Log に登録して SCT を取得すれば、バレるまでは使えるだろう。世の中、ちゃんと CT Log の監視までできている業者ばかりではないし、発覚しても失効するのにラグはある。

そうした攻撃を防ぐには eMudhra 自体をまるっと Distrust しないといけない。

ところが、ここで面倒な問題がある。問題の中間 CA は Sectigo の Cross Root なのだ。

![eMudhra 証明書チェーン](./emudhra.svg#768x763)

新興の CA は、証明書がデバイスに行き渡っていない期間があるため、証明書を発行しても使えない場面が出てしまう。そこで、既にデバイスに証明書が行き渡っている CA にも署名を依頼し、そちらが入っていれば信頼できるようにする。これが Cross Root の仕組みだ。

Let's Encrypt も出始めは IdenTrust との Cross Root だった。これ自体は珍しい仕組みではない。

問題は、証明書ストアが基本的に Allow List だという点だ。

eMudhra を外しても、Sectigo が入っていれば、そちらの中間証明書を偽装証明書に添えることで、信頼されてしまう経路が残る。かといって Sectigo まで外すと、その Root にぶら下がる Sectigo の証明書も全部 Distrust されてしまう。

この場合は、明示的な「失効」が必要になる。

一般的に eMudhra が発行した証明書を失効するためには、eMudhra が CRL や OCSP を提供する。しかし、今回は発行したサーバ証明書ではなく、中間 CA 自体の問題だ。

ブラウザは CRLSet や OneCRL などの失効ファイルを、ブラウザのアップデートとは別に同期して、いちはやく失効を確認できるようにしている。ここに eMudhra を入れれば、Sectigo を Root から外さなくても、問題の中間 CA を失効により Distrust できる。


## 個別の証明書ストア

ブラウザや OS は失効でなんとかなるとしても、それ以外の細かい CLI や言語だって HTTPS を話す。それらが OS のネットワーク実装を使い、OS の証明書ストアを見ていれば、一緒に更新されるだろう。

ところが、自前で HTTPS を実装し、証明書リストを同梱しているものも少なくない。

筆頭は Electron アプリだ。

Electron は Chromium を元にしている。Chromium は自前の証明書ストアを同梱している。加えて Node もある。つまり、Electron アプリは、Chromium や Node を更新してビルドし直さないと、ストアが更新されないのだ。

さて、読者のみなさんの端末には、どのくらい Electron アプリがいるだろう?

Slack, Discord, VSCode etc etc etc .......

それら全部、すぐに更新しないといけない。

ところが世の中には更新の止まっている Electron アプリもある。そうしたアプリは利用をやめ、Web 版があるならそちらを使うべきということになる。

さらには、curl などの CLI、プログラミング言語の HTTPS 実装なども、個別にストアを持つものがある。

筆頭は `cacert.pem` のような実装だ。これはもともと Mozilla がメンテしていたものだが、実態は PEM の並んだ Allow List だ。

そして、CLI や言語実装は、失効リストや OCSP、CT の確認などの仕組みが無いことが多いため、先程の Cross Root の問題が残ってしまう。

eMudhra と Sectigo を両方リストから外し、巻き添えを食う Valid な証明書を捨てるか。

最悪、実装側に問題の中間証明書の Deny を、ハードコードする必要が出てしまう。


## Sectigo と Comodo

ところが、実は Cross Root 側の Sectigo は既に `cacert.pem` からは外されていた。

Sectigo はもともと Comodo という大手 CA だった。Comodo と聞くとピンと来る人もいるだろう。

2011 年に侵害され google.com などの証明書を誤発行し、その後事業売却して、行き着いた先が Sectigo だ。

「CA はやらかしばかりで信用できない」と Google が Public Key Pinning などを開始し、後の CT に繋がる CA の監視体制を模索するきっかけになった事件の 1 つだ。

Sectigo は、既に Mozilla に Distrust されていたのだ。

`cacert.pem` でない場合も、同じ影響範囲を飲めるのであれば、2 つの CA を Allow List から外せば良い。

もしこの Cross Root が Let's Encrypt だったりしたらと思うと、、不幸中の幸いでしかない。


### 暫定策

消すだけと一言で言っても、今回はサーバだけでなく、ローカル PC はもちろん、スマホや IoT 機器まですべてが対象だ。その中で、HTTPS を話すすべての実装をリストアップし、個々の証明書リストをくまなく更新しないといけない。

MDM (Mobile Device Management) でアップデートを配れば終わりとはいかない難しさが、ここにある。

社員の端末をガチガチに管理し、あらゆるインストールを見張っていれば、ある程度は更新漏れを防げるかもしれない。しかし、そんな不自由な環境を開発者に強いてしまうと、みんな辞めてしまうのでできない、といった事情も、読者には身に覚えがあるだろう。

ある程度リテラシーのある開発者なら、「AI でもなんでも使って全部アップデートしろ」という通達が効くかもしれないが、非エンジニアの社員だって同じリスクを抱えている。

ところが、この問題の悪用には、中間者攻撃も必要になる。それ自体は Free WiFi などで簡単に成立するが、例えば VPN に接続していれば、通信はすべて暗号化された経路を通るため、その区間における単純な中間者攻撃は成立しにくい。

そのため、全社員を守るなら、「全部更新しろ」と並行して「仕事をするときはしばらく VPN を必ず使え」という号令もありかもしれない。対症療法ではあるが、「全部更新」の難しさを高い解像度で理解しているほど、時間がかかることは想定できる。そう考えれば、無いよりはマシだ。

VPN の脆弱性を突いた侵入もあり、ゼロトラストで非 VPN へ移行しようという流れもある中だが、こういうときはトンネル環境が便利だったりする。もし社内で VPN を使っていなくても、Cloudflare WARP などを自衛のために入れるのもありかもしれない。

じゃあ、一般のユーザは、誰がどうすれば守り切れるんだろうか?

OS やアプリの更新ですら、なかなか行き渡らない世の中だ。仮にそれをちゃんとやっているユーザですら、付け入る隙は残りやすい。

家族には、「しばらくフリー WiFi は使わない方が良い」とアドバイスするべきかもしれない。


## eMudhra の撤退

Mozilla の Bugzilla でもこのインシデントが議論されている。所管が Mozilla でも、Chrome の Root Program の関係者なども交えて議論しており、実質 CA/Browser Forum の Issue のような場所だ。

ここで、eMudhra から以下の返信があった。

> we have been subject to intense social media scrutiny and analysis by investors/customers over the last few days
> and it has made doing any meaningful analysis of the event pretty much impossible.
>
> ここ数日間、私たちは SNS での厳しい詮索、投資家や顧客による分析の対象となっており、
> この出来事について有意義な分析を行うことは事実上不可能になっている。
>
> --- https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c39

CA にとって、この件の調査以上に大事なことがあるだろうか?

まあ、ビジネスでやっている以上、SNS と投資家と顧客の相手をする方が大事なんだろう。

そして、eMudhra はあっさりと TLS 証明書事業からの撤退をアナウンスした。

- eMudhra to Exit global SSL/TLS Certificate Business
  - https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business

そのアナウンスは、本当にヒドイものだ。

> eMudhra handled the recent incident diligently, revoking the affected CAs within 14 hours of discovery and disclosing promptly.
> There were no end entity certificates issued out of the affected CA's. Its infrastructure was not compromised and no data was breached.
> All physical and logical security controls remained intact.
>
> eMudhra は発見から 14 時間以内に影響を受けた CA の失効処理を行い、速やかに公表するなど、この事案に真摯に対処した。
> 影響を受けた CA からは、エンドエンティティ証明書は発行されていなかった。
> 同社のインフラは侵害されておらず、データの漏洩も発生していない。
> すべての物理的および論理的なセキュリティ対策は、引き続き完全に機能していた。

問題はそこではない。Root CA として本当に守らないといけない、最後の一線を守れなかったことへの反省が無い。

> global SSL/TLS is a small part of eMudhra's business contributing to about 1% of the global revenue.
> Due to increasing data sovereignty & compliance requirements, complexity and cost associated with this business is increasing over the years.
> This, paired with the fact that some of the large entities issue the SSL/TLS free of cost,
> the business potential and RoI of this line of business also has considerably reduced for eMudhra
> when measured against our cumulative revenue base.
>
> グローバル SSL/TLS 事業は eMudhra の事業の一部に過ぎず、全世界の売上高の約 1% でしかない。
> データ主権やコンプライアンス要件の強化に伴い、この事業に関連する複雑さとコストは年々増加している。
> 加えて、一部の大手企業が SSL/TLS を無償で発行しているという事実もあり、当社の累積売上高ベースで測定した場合、
> eMudhra にとってこの事業分野のビジネスポテンシャルと投資収益率(RoI)も大幅に低下している。

要するに「金にもならないのに、こんな面倒なことやってられない」ということか。

> However, the level of social media amplification around this incident has brought scrutiny that is out of proportion to SSL/TLS's place in our business.
> In view of this, after detailed deliberations our board has concluded that withdrawing from global SSL/TLS is the right decision for eMudhra and its shareholders.
> For many certifying authorities, SSL/TLS is the whole business.
> For eMudhra it is one part of a much broader digital solutions portfolio.
> We will put our energy where we create the most value for customers with Sharpened Focus on Core Enterprise Solutions and trust services other than SSL/TLS.
>
> しかし、この件をめぐる SNS 上での反響の大きさは、当社事業における SSL/TLS の占める割合に見合わないほどの厳しい批判を招いた。
> こうした状況を踏まえ、取締役会は詳細な検討の結果、グローバルな SSL/TLS 事業からの撤退が eMudhra およびその株主にとって正しい決断であると結論づけた。
> 多くの認証局にとって、SSL/TLS は事業のすべてだが、eMudhra にとっては、はるかに広範なデジタルソリューションの一部に過ぎない。
> 当社は、中核となるエンタープライズソリューションと SSL/TLS 以外のトラストサービスに焦点を絞り、顧客にとって最大の価値を創出できる分野に注力していく。

「SNS での炎上も、見合わないのでやってられない。他に比べて大した事業じゃないので、損切りするのが妥当なので辞める。」

この言い草が、たとえ小さい事業規模であっても、まがりなりにも Web のトラストアンカーを担っていた組織から出るということ自体が、本当に腹立たしい。


## CA の向かう先

筆者の Mac の Keychain には、158 ほどの Root 証明書がある。

世界には、このようなトラストアンカーを担う Root がそれだけあるという意味だ。

そのすべてが、同じような責任感と品質で運用されているかというと、おそらくそんなことは無いんだろう。

もちろん、何人が束で見張っても、人間のやることにミスは絶対に起こる。

それ自体の問題は以前からあり、署名できる範囲を絞るべきといった指摘もある。

HTTPS が一般的になり、それを普及させるために無料で参入した Let's Encrypt は、ACME, PQC, Short-lived などで他の CA を先導してきた。その Let's Encrypt のせいで事業が縮小し、小さいチームで運営している CA もあるだろう。

HTTPS が普及し、トラストアンカーの重要度が増した今、リスクに見合うリターンが見込めず、eMudhra のようにやる気を無くす CA も出るかもしれない。Google や Amazon に続き Cloudflare も参入表明したので、生態系はより一層変わっていく。

ただ、どんなに健全に運営された CA でも、やる気なく雑に運営されている CA でも、世界中のドメインを署名できるという能力が等しくあるのだ。

失敗したからといって、事業を放り投げて終わるのではなく、きちんと次の信頼に繋がるだけの責任は果たして欲しい。

最近のインシデントニュースの流量で麻痺しているかもしれないが、この問題は、AI のせいとか、誰にでも起こるとか、防戦は不利とか、そういう話とは種類が違う。

我々が当たり前のように信頼している相手が、信頼に足るだけの責任を果たしていると思っていた相手が、それを裏切った話なのだ。


## まとめ

CA 事業者にとっては、決して良い時代じゃないかもしれない。

それでも、今 CA をやっている以上は、その責任を全うして欲しい。

証明書ストアに Root CA 証明書を入れた状態で、信頼を投げ出さないで欲しい。

あなたはトラストアンカーで、我々はあなたを信頼することで、Web の安全を担保しているのだから。