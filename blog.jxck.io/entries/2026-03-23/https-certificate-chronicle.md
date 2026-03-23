# [acme][ca][https] HTTPS 証明書クロニクル

## Intro

Web サービスをデプロイする際に、CA から証明書を取得し HTTPS で暗号化するのが一般的となった。かつては "SSL 証明書" として、メールでやり取りし有料で購入するのが常識だったが、自動/無料で取得することが増えた。かつては 5~10 年あった有効期限もどんどん短くなり、今では 6 日の証明書も発行されている。

このように、証明書を取り巻く変遷は目覚ましく、それは Web を取り巻く環境の劇的な変化を色濃く反映した結果と言える。

`http://` が `https://` になった裏で何が起こり、これからどうなっていくのか。まとめていく。

(極力ソースを付記するが、既に消えて WebArchive にも残っていないものも多く、筆者の記憶に頼る情報も多い。)


## 黎明期 (90 年代後半~2010 年頃)

90 年代の終わり頃、当時は TLS の前身にあたる SSL のデプロイが主流だったため、証明書も「**SSL 証明書**」として販売されていた。(いまでもその呼び名は商習慣として[残っている](https://ssl.sakura.ad.jp/))。

当時はまだ、HTTPS のデプロイは企業サイトがわざわざ対応するものであり、証明書も企業が有料で購入するものだった。

2000 年に入り、証明書は単体での販売だけでなく、企業向けセキュリティソリューションの一環として、認証基盤やメール署名、VPN などと抱き合わせで売られるようになった。つまり PKI は BtoB ビジネスが主戦場であり、個人向けは非常にニッチな市場だったのだ。

当時の証明書発行は、担当者同士がメールベースでやりとりするのが主流だった。企業の担当者は手元で鍵を生成し、対応するリクエストファイル (CSR: Certificate Signing Request) をメールに添付して送る。CA 担当者は、署名した証明書をメールで送り返す運用だ。

```console
$ openssl genrsa -out server.key 2048

$ openssl req -new \
-key server.key \
-out server.csr # これを送る
```

企業ドメインのメールで送られていることにより、ドメインの保有が確認 (Domain Validation) できるため、このフローで DV 証明書が発行可能だった。

追加で契約を結べば、CA 側が企業の所在や登記を別途確認したり、担当者への電話確認などを追加することで、OV (Organization Validation) や EV (Extended Validation) の証明書も発行された。

URL バーに緑の UI で組織名が表示されていたのは、この確認プロセスで「実在する組織が運用している(ペーパーカンパニーではない)」と保証できたからだ。今で言う SNS の公式アカウントに付くバッジのような意味合いだ。

![先頭に EV の組織名が追加された HTTPS の URL バー](https-full-green-ev.svg#400x80)

メールベースのフローでも運用が回っていたのは、証明書の期限も 1〜5 年と長く、頻繁に行うことではなかったからだ。

また、HTTPS 化するのは「パスワードを盗聴されないため」という前提が強く、サイト全体ではなく「ログイン画面だけが HTTPS」という構成も一般的だった。当時、TLS は CPU 処理が増えるため「負荷が上がる」「パフォーマンスが下がる」などの理由から、極力暗号化するページを減らしたいというモチベーションが働いていたためだ。

それでも対応するのは、金融や EC など、影響の多いものばかりで、個人のサイトが暗号化されることはかなりレアだった。そこまで、セキュリティレベルの高いサービスでは、秘密鍵ファイルをローカルに生成したりせず、商用 HSM (Hardware Security Module) を導入する。作った鍵を 10 年使うような運用も多かったため、キーセレモニー (CA がルートの鍵を発行する際に関係者が集って立ち会う) のようなものが行われることもあったようだ。

GAFAM レベルになると「秘密鍵のセキュリティレベルは、プルトニウムと同じ扱い」という例え話もあった。漏洩すれば全通信が盗聴できるため、あながち冗談でもない。

今とはかなり、雰囲気の違う運用だったことがわかるだろう。


## WiFi の普及 (2000~2010 年頃)

2000 年前半頃から無線 LAN、今で言う WiFi が普及し始めた。2007 年に iPhone が登場したあたりからは、お店で配っている AP をもらってきて自宅に設置したり、会社/図書館/空港/学校などに公開 AP が設置されている環境も徐々に増えていった。

まだ多くのサイトは「ログインだけ HTTPS」や「HTTPS もあるが HTTP と選択式」などのサービスも多く、全てが暗号化されていなかった。すると問題になるのは Cookie だ。パスワードを暗号化しても、ログイン済みの Session Cookie は経路上を平文で転送されていたため、盗聴が可能だった。

経路の盗聴は、有線接続時代では物理的な侵入なども必要になったりとハードルは高かったが、WiFi となると話は別だ。同一 AP に繋げれば他人の通信のキャプチャは容易だし、自分のモバイル AP の SSID を "Airport Free WiFi" などとして空港にいれば、勝手にユーザの方が繋いできてくれる。

これらのことを鑑み、大手サイトが HTTPS への移行を始めた。それまで HTTPS は設定画面で有効にしないとデフォルトにはならないのが普通だったが、それをデフォルトで有効にする取り組みとして、2010 年 1 月の Gmail はエポックメイキングだったと思う。

- Official Gmail Blog: Default https access for Gmail (2010/1/12)
  - https://gmail.googleblog.com/2010/01/default-https-access-for-gmail.html
  - HTTPS だと処理が重くなる懸念があり両方を提供していた
  - 調査の結果その影響は緩和されており、むしろ WiFi の方がリスクとなった

ちなみに Gmail が移行に向けて行った調査には、当時の HTTPS に対する認識がうかがえる記述がある。

- Google オンラインセキュリティブログ: ウェブアプリケーション向け HTTPS セキュリティ
  - https://security.googleblog.com/2009/06/https-security-for-web-applications.html
  - 無料で常時接続の HTTPS はメール業界ではかなり珍しい
  - HTTPS をデフォルトにしているのはパワーユーザのみ
  - 場合によっては特定の動作が遅くなることもあるため、トレードオフを調査している

同年 6 月には EFF(電子フロンティア財団)が、HTTPS に対応しているサイトへの接続を、強制的に HTTPS にリダイレクトする拡張 "HTTPS Everywhere" を公開した。

- Encrypt the Web with the HTTPS Everywhere Firefox Extension | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2010/06/encrypt-web-https-everywhere-firefox-extension?utm_source=chatgpt.com

ほぼ同時期、10 月に公開された Firesheep という Firefox 拡張は、こうした一連の「盗聴->なりすまし」を体現するために PoC 的に公開された。同一ネットワーク上に出てくるサービスのアイコンをクリックするだけで、簡単になりすましができたのだ。

- Firesheep, a day later - codebutler
  - https://codebutler.com/firesheep-a-day-later

2 つの拡張の公開は、まだオプションだった HTTPS への切り替えを、一般ユーザに啓蒙する目的として役目を果たしていた。

これらの状況を鑑み、2010~2011 年ごろ他の大手サイトも続々と Full HTTPS の構成に移行していくことになる。

- A Continued Commitment to Security | Facebook (2011/1/26)
  - https://web.archive.org/web/20111102153945/http://blog.facebook.com/blog.php?post=486790652130
  - まだ完全に移行はしていないが、オプションを提供し、対応を拡大していく
- Making Twitter more secure: HTTPS (2011/3/15)
  - https://blog.x.com/en_us/a/2011/making-twitter-more-secure-https
  - HTTPS 対応のオプションを提供
  - 有効にすることを推奨

多くのサービスで、一次ソースになるアナウンスなどが消えてサルベージできなかったが、他にも大手サービスはだいたいこの時期に集中して移行をしていたと思う。


## Snowden と PRISM (2013)

2013 年 6 月、NSA の契約社員だった Edward Snowden が、PRISM を始めとした大規模監視システムの存在をリークした。

この事実が明るみに出たことは、それまでのインターネットの前提を覆すことになる。

- NSA Prism program taps into user data of Apple, Google and others | US national security | The Guardian
  - https://www.theguardian.com/world/2013/jun/06/us-tech-giants-nsa-data

このときまで、中間者攻撃のモデルは、あくまで悪意を持った Eve が Alice と Bob の間に入るような、単独や少数グループによる犯行という、暗黙の前提があった。

ところが、こうした監視プログラムを国が運営しているという事実は、その Eve が「国家」レベルの機関たりうることを意味する。机の上では想定しても、ディストピア小説の世界だけだと思っていたことが、現実だったと判明したのだ。

Ajax -> HTML5 の流れもあり、生活がインターネットへの依存度を高めていく中、その通信を様々な形で寄せ集めれば、その人のプロフィールどころか、家族構成や生活スタイル、政治思想や病歴まで高い解像度で把握できてしまう可能性がある。

この事態を重く見た IETF は、「広域盗聴は攻撃である」と定義する RFC を策定した。

- RFC 7258 - Pervasive Monitoring Is an Attack
  - https://datatracker.ietf.org/doc/html/rfc7258

これ以降、「**IETF で策定されるあらゆる通信プロトコルは暗号化を前提とする**」という合意が取られることとなった。


## HTTPS Everywhere と Powerful Features (2014~)

HTTPS の普及が叫ばれる中、「**自分のサイトは Cookie も使っていないし、大した情報もないから暗号化する必要はない**」という勘違いは非常に多く残っていた。

筆者もこの時期、自治体のサイトを運営している担当者から、「誰が見ても問題ない情報しかないのだから HTTPS 化する意味がわからない」と実際に聞いたこともある。

確かに Firesheep レベルの攻撃であれば、そのリスクはない。しかし、インターネット全体が戦っているリスクは、もうそんなミクロな話ではなくなった。

例えば、全ての通信が盗聴されている状態を考えよう。(その前提はかつては絵空事だったかもしれないが、2013 年以降はそうではない)

もし、あるユーザが千代田区の自治体サイトを見ていれば、千代田区在住の可能性が高くなる。子育て給付について調べていれば、介護サポートについて調べていれば、給付金について調べていれば...

このように、ログインを必要とせず、パーソナライズされていなくても、そのサイトを閲覧したという事実の集積も、その個人を知る上で無視できないのだ。

なんてことない個人ブログや、誰でも閲覧できる Wiki であっても、関係はない。「**暗号化するかしないかを選ぶ時代は終わった**」という認識が広まるのを待つフェーズになったのだ。

ところが、悠長に待っているわけにもいかないので、あらゆる角度からインターネットを安全にするための取り組みが行われた。

例えば、ブラウザは新しい機能を HTTPS 接続下でのみ動作するように制限し始めた。

筆者の記憶では筆頭は 2014~2015 年にかけてリリースされた Service Worker だ。

SW の前身の App Cache というオフライン対応機能は、平文通信に悪意のある App Cache を仕込まれると、攻撃が永続的に残ってしまうという問題があった。そこで SW は最初から HTTPS でしか登録できないという制限を設けてリリースされた。

その後も、`getUserMedia` や `geolocation` など、強力な機能 (Powerful Features) は最初から HTTPS 前提となり、先の理由で 2015 年頃策定された HTTP/2 もブラウザ実装は HTTPS 前提だ。

これは、「攻撃を受けたときの被害を最小化する」目的もあったが、「新しい機能を使いたかったら HTTPS にするしかない」といった強制力として、開発の現場に影響していたことも無視できないと思っている。


## Let's Encrypt (2015)

冒頭で述べたように、まだこの時点でも HTTPS のための証明書は BtoB が中心で、個人でも有料のものを購入する必要があった。

メールの履歴を見ると、筆者が最後に買った証明書は、2014 年に 990 円で買った 3 年の証明書だった。これは KingSSL という CA で、業界でもかなり安い。一般には、千円 ~ 数千円という、ドメイン代と同じくらいの価格感だったと思う。(無料で配っていたサービスもあったが、怖くて使わなかった。)

筆者はどちらかというと、SW や HTTP/2 など、ブラウザの新しい機能を試し、まさしくこのブログで試すことを目的に購入していたが、無くても良いなら買わないと思う個人や組織は相当に多かっただろう。

証明書を購入する敷居のために、暗号通信の普及が遅れるならばと、「Trust Anchor による相手の検証」の部分を省き、「鍵交換による暗号化」だけを実施する日和見暗号(Opportunistic Encryption)という提案も Mozilla から出るくらい、証明書はなんとかすべき課題だった。

そこで TLS 証明書を誰でも無料で取得でき、HTTPS 化が可能になるように始まったのが Let's Encrypt だ。2014 年に構想がアナウンスされ、2015 年にパブリックベータが提供された。

- Let's Encrypt: Delivering SSL/TLS Everywhere - Let's Encrypt
  - https://letsencrypt.org/2014/11/18/announcing-lets-encrypt

Let's Encrypt も、最初は理解されておらず「無料の証明書なんか怪しい」や「ビジネスで使えるものではない」といった風評もあったように思う。また、当時はまだ EV 証明書も使われており、DV 証明書のみの発行であったことなどが敬遠されたり、ワイルドカード証明書に対応していないといったデプロイ面の課題もあった。

Let's Encrypt の白眉だった点は、構想の段階から 90 日という短命の証明書と、それを自動で更新する ACME プロトコルの策定を前提にしていたところだ。証明書発行の自動化自体は、業界自体が何度か取り組んできたが、ここで初めて今現在多くのユーザが使うプロトコルが誕生する。

では、なぜ自動で更新するプロトコルを策定してまで、証明書の期限を 90 日にする必要があったのだろうか。ここには HTTPS 普及の裏側にあった、CA (PKI) 業界の様々な戦いがあった。


## 日本の HTTPS 移行 (2017)

日本は HTTPS 化の流れに少し出遅れていた。

2016 年に筆者が GDE になった時に面接があったが、実態は知り合いのエンジニアとの雑談だった。そこで「日本の HTTPS の普及がすごく遅いんだけど、なんでだと思う?」という議論をしたのを覚えている。

![2016 年の段階で日本の HTTPS 移行が他国より遅れている](https-over-chrome.png#516x528)

- ウェブ上での HTTPS 暗号化 - Google 透明性レポート
  - https://transparencyreport.google.com/https/overview

要因としては、広告や UGC の Mixed Content 問題が大きかったが、それは日本固有とは言い難かった。おそらく「ガラケー対応」が残っているという事情もあるといった議論をしたと思う。

2017 年頃、日本のサービスも、Search Rank への反映や、HTTP as non-secure の流れを汲み、追いかけるように移行を進めた。Upgrade Insecure Requests と HTTPS Strict Transport Security をデプロイする流れだ。

- Web サービスの完全 HTTPS 化 - クックパッド開発者ブログ
  - https://techlife.cookpad.com/entry/2017/04/19/190901
- はてなブログへの接続をすべて HTTPS にできる機能の実装予定と、利用を検討するユーザー様に準備いただきたいこと - はてなブログ開発ブログ
  - https://staff.hatenablog.com/entry/2017/09/25/143000
- Yahoo! JAPAN サービスは常時 SSL(AOSSL)に対応します
  - https://web.archive.org/web/20160404084538/http://docs.yahoo.co.jp/info/aossl/index.html


## DigiNotar 事件 (2011)

遡ること 2011 年 8 月末、イラン在住の開発者が `www.google.com` アクセス時に、不正な証明書を発見し報告した。

- Is This PITM Attack to Gmail's SSL? - Gmail Help
  - https://web.archive.org/web/20111018230222/https://www.google.co.uk/support/forum/p/gmail/thread?tid=2da6158b094b225a&hl=en

スクリーンショットはストレージサービスごと失われてしまったが、いくつか転載されたリソースがあったので引用する。

![Google Certificate Error caused by DigiNotar](diginotar-certificate-error.png#569x320)

- tls - PITM Attack on Gmail's SSL in 2011 - Information Security Stack Exchange
  - https://security.stackexchange.com/questions/232099/mitm-attack-on-gmails-ssl-in-2011
- DNSSEC Musings Diginotar, DANE, and Deployment - Olaf M. Kolkman
  - https://conference.apnic.net/__data/assets/pdf_file/0005/58901/dnssec-diginotar-dane_1361864377.pdf

Google の調査の結果、これは DigiNotar という CA によって発行された証明書を用いた中間者攻撃 (Man-in-the-Middle) として、インシデント認定した。

DigiNotar 自体は正規の CA であるが、問題は `*.google.com` の証明書が Google 以外の人間によって発行されていたことだ。検索 (www.google.com) やメール (mail.google.com)、ドキュメント (docs.google.com) などを盗聴できるため、影響は計り知れない。

- An update on attempted man-in-the-middle attacks
  - https://security.googleblog.com/2011/08/update-on-attempted-man-in-middle.html

その後の調査では、この一連の攻撃は "Operation Black Tulip (ブラックチューリップ作戦)" と呼ばれ、イランから行われた攻撃により、イラン国内の約 30 万の IP アドレスが影響を受けたとされる。当時イラン国内には、ブラウザに信用されているルート CA がなかったため、別の CA を攻撃したようだ。

- Iranian Man-in-the-Middle Attack Against Google Demonstrates Dangerous Weakness of Certificate Authorities | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2011/08/iranian-man-middle-attack-against-google
- A Post Mortem on the Iranian DigiNotar Attack | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2011/09/post-mortem-iranian-diginotar-attack
- DigiNotar Certificate Authority breach "Operation Black Tulip"
  - https://www.sec.gov/Archives/edgar/data/1044777/000119312511241796/dex992.htm

証明書自体は正規の CA が発行したものであるため、通常ブラウザはそのまま信用してしまう。

しかし、Chrome はこの直前 (5 月) に Public Key Pinning の機能を入れていた。これは、普段 `*.google.com` の証明書を発行している CA のリストを Chrome に入れ、そこ以外から発行されたものはエラーにする機能だ。

結果、中間者攻撃にあったユーザには、証明書エラーが表示され、使われている証明書が不正発行であると判明した。

- ImperialViolet - Public key pinning
  - https://www.imperialviolet.org/2011/05/04/pinning.html

つまり、Google は気づくことができたが、他にも同様の攻撃が行われていた可能性もある。実際、その後の調査では、DigiNotar で発行された偽装証明書は 500 以上発覚し、CIA, MI6, モサドなども含まれていたようだ。

- DigiNotar Certificate Authority Breach Crashes e-Government in the Netherlands - IEEE Spectrum
  - https://spectrum.ieee.org/diginotar-certificate-authority-breach-crashes-egovernment-in-the-netherlands

これを受け、DigiNotar の運営は信頼に値しないとし、ブラウザベンダは DigiNotar の証明書を証明書ストアから外すことを決定した。

証明書ストアから外れるということは、DigiNotar によって発行されて使用されている全ての証明書が、期限が切れていないにも関わらず全て使えなくなるということだ。実際、オランダ政府機関サイトをはじめとするかなりのサービスが、HTTPS エラーでアクセスできなくなった。

これは非常にインパクトのある事件であり、CA の信頼自体が揺らぐエポックメイキングなインシデントだった。

DigiNotar はそのまま倒産した。


## CA の信用と技術的カバー

実は DigiNotar の侵害を Chrome が Pinning で発見できたのは、その直前の 2011 年 3 月にも、Comodo という証明書ベンダが攻撃に遭い、偽装証明書発行が行われていたからだ。

- Comodo Report of Incident - Comodo detected and thwarted an intrusion on 26-MAR-2011
  - https://www.comodo.com/Comodo-Fraud-Incident-2011-03-23.html

被害者の筆頭である Google からすれば、どんなに Google 自身がセキュリティ対策に気をつけていても、Google の手が及ばない CA が 1 つでも侵害に遭えば、全ての Google サービスが影響を受けるという状況となる。そんな CA が数百あり、その全てが `*.google.com` を発行する権限を持っている状況なのだ。

「CA は信用できないかもしれない」という懸念はずっとあったとは言え、Comodo の事件でそれがいよいよ無視できなくなった。

Chrome に Pinning を入れたのは、「自分たちが普段取引している大手の CA 以外が、侵害により自分たちの証明書を発行するリスク」を防ぐための、自衛手段だったと言える。

すぐに DigiNotar の侵害が発覚する成果が出たため、Trust Anchor としての CA がいかに脅威にさらされているのかが可視化された。HTTPS が普及すればするほど「攻撃するインセンティブ」が増加し、格好の標的となっていたのだ。攻撃者にとっては、どれか 1 つ落とせるだけで、`*.google.com` を盗聴できるとなれば、成功した時のリターンが多い。

「CA は監査を受けているから大丈夫」などと言っていられる状況ではなくなったのだ。

そこで Chrome が内部で独自に行っていた証明書の Pinning 機能を、標準仕様とする HTTP Public Key Pinning の作業が始まる。


## Public Key Pinning

後に RFC 7469 として標準化された HPKP (HTTP Public Key Pinning) は、以下のように「このハッシュの証明書が使われているはず。そうでなければ偽装されている可能性がある」ということを明示する目的がある。

```http
Public-Key-Pins:
max-age=36000;
pin-sha256="7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=";
pin-sha256="+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=";
report-uri="https://report.example/hpkp"
```

ところが、このヘッダはあまりにも罠が多く、運用もままならなかった。pin の更新に失敗したり、悪意のある pin を仕込んだヘッダで `max-age` が長ければ、その間サービスに一切接続できなくなるからだ。

特にミスが起こりやすいのは、証明書のローテーションだ。複数のバックアップハッシュを指定できる仕様ではあるが、ローテーション後に使う証明書が先に確定している必要があり、現実的ではなかった。

結果、発案者の Chrome も後に機能を廃止し、仕様自体が過去のものとなっている。


## Certificate Transparency (2013)

Pin での防御は難しいが、それでも CA の努力だけに依存するのは難しい。特に Google からしてみれば、どんな CA も `*.google.com` を発行できる以上、全ての CA を監視したくなる。

そこで作られたのが Certificate Transparency (CT) だ。これは文字通り、「CA の証明書発行を監視する仕組み」と言える。

まず CA は、証明書を発行したらそれを CT Log Server に記録する。記録時に発行される SCT (Signed Certificate Timestamp) を付与した証明書でなければ、ブラウザは接続をエラーにするという仕組みだ。

SCT が必須になるため、CT Log への登録が必須となる。つまり、あらゆる証明書の発行履歴が CT Log に残るため、これを監視すれば「自分が発行した覚えのないエントリが、CT Log に追加された」という事実で、CA の偽装発行を検知できるという仕組みだ。

全てのドメイン名が公になるという副作用もあるが、CT がなければ DigiNotar の二の舞がいつ現れるかもわからないため、CT の普及が進むこととなった。


## CA と CAB/Forum

CAB/Forum (CA Browser Forum)は、ざっくり「ブラウザはどの CA を信用するか」を議論する場として機能している。

昔は、証明書ストアは OS が持つのが一般的だったが、Firefox は初期から自前でストアを持っていた。

クロスプラットフォームでの動作保証もあるが、Trust Anchor の選定自体もベンダから中立でありたいという意図もある。例えば、国によっては政府の権限で、バックドア用の証明書をデバイスに入れるように、法で強制する可能性もあるからだ。

その後、Chrome も証明書ストアを自分で持つようになった。度重なるインシデントで悪用される `*.google.com` を所有する立場としては、信頼に足る CA を自分で選びたいという思惑もあるだろう。また Distrust された CA がある場合、OS のアップデートを待たずに、Chrome のアップデート(ものによってはコンポーネントアップデート)でロールアウトできるようになる。

- Chromium Blog: Announcing the Launch of the Chrome Root Program
  - https://blog.chromium.org/2022/09/announcing-launch-of-chrome-root-program.html

Safari や Edge は、そもそも OS を持っているベンダだ。つまり、ブラウザベンダに信用されなければ DigiNotar のように倒産にまで追い込まれるという点で、実は Trust Anchor である CA よりも、ブラウザベンダの方が力を持っている構図になる。

したがって、CAB/Forum での対応は CA にとっては死活問題だ。ちょっとでも「ダメな CA」の烙印を押されると、実質終わる。

例えば、大手だった Symantec も 2015 年に大きなインシデントを発生し、最終的にはブラウザから Distrust され CA 事業売却に至った。翌年 2016 年には WoSign や StartCom も同じように Distrust される。似たような事件は多発している。

- Sustaining Digital Certificate Security
  - https://security.googleblog.com/2015/10/sustaining-digital-certificate-security.html
- Distrusting WoSign and StartCom Certificates
  - https://security.googleblog.com/2016/10/distrusting-wosign-and-startcom.html

ちなみに、日本政府が運用する GPKI(政府認証基盤)という政府・行政用の CA に至っては、運用基準を満たさないとして Distrust 以前に Trust すらしてもらえなかった。

- Japan GPKI Root Renewal Request
  - https://groups.google.com/g/mozilla.dev.security.policy/c/Mezqdljjerc/

CA のインシデントがニュースで目立つようになったのは、CA の運用に対するブラウザからの監視の目が強まったことで、それまで発覚すらしていなかったインシデントが発覚するようになったという側面と、HTTPS 化していく Web における Trust Anchor の重要性の高まり、攻撃が激化しているという 2 つの側面があると、筆者は考えている。

Distrust までいかなくても、何か運用不備があれば対応は必要だ。ここで問題になるのが「失効」である。


## 失効の難しさ

例えば、証明書の発行を受けたサービスが秘密鍵を漏洩したといった場合、有効期間内の正規の証明書でも無効にする必要がある。つまり、CA は何らかの方法で「その証明書は期限内だが無効である」と知らせる必要があるのだ。

本来は、提示された証明書をローカルにある CA 証明書で検証すればよかったところに、「失効していないかどうか」という外部への問い合わせが発生する。これは非常に面倒な要件だ。

CA が失効を伝える方法は、大きく分けて 2 つある。

- CRL
- OCSP


### CRL

CRL(Certificate Revocation List)は、要するにすべての失効リストを愚直にファイルにして配る、PKI の黎明期から使われている手法だ。

HTTPS 通信をするたびに、CA ごとに取りに行くとなると非常にオーバーヘッドが高い。また、CA 側もリアルタイムにファイルを更新するのは難しく、少なくとも Web でそのまま使うのは現実的ではなかった。

あまりにも使いづらいため、派生仕様がいろいろと作られることになり、「影響が大きいと判断したもの」だけを集めて圧縮した CRLSet(Chrome)や CRLite(Mozilla)を用いたりした。


### OCSP

当然、DNS のように該当ドメインの情報だけをクエリできる、DB のようなものがあった方が効率が良い。そこでできたのが OCSP だ。小さいペイロードで済むため、リアルタイム性が向上する。

ところが、HTTPS 接続ごとにドメイン情報をクエリするため、CA に「この IP はこのドメインにアクセスしようとしている」ということが、リアルタイムにわかってしまうという、プライバシーの問題がある。

また、クライアントがプロキシに阻まれたり、OCSP サーバが落ちている場合、サイトが速くても検証でパフォーマンスが落ちたり、最悪繋がらないこともある。結果、ブラウザは「クエリが正常にすぐ返れば見るが、落ちてもエラーにはしない」という消極的な検証に留めている。要するに、あってもなくても良いということだ。

代わりに、署名付きの OCSP レスポンスを、サーバが取ってレスポンスに付与する、Stapling が使われるようになった。いちいちクエリをしないで良い点は大きいが、リアルタイム性は失われているため、サーバが OCSP レスポンスを添付し続ければ、その有効期限内は失効を隠せてしまう問題もある。

CA の責務としては、失効した証明書はすぐさま発覚するようにしたい。そのために行う運用で、パフォーマンスや接続に影響が出ては、誰も HTTPS を使わなくなってしまう。

ユーザの安全のために、全ての通信を暗号化したいが、そこにデメリットがあり移行が阻害されるのはとにかく避けたい。

CT で監視体制を敷き、不正な発行が見つかっても、失効にラグがあればその間は攻撃に使われてしまう。

つまり、「失効」という考え方自体が限界にきているのだ。それ自体は、もうかなり前から言われていることなのだ。

- ImperialViolet - Revocation doesn't work
  - https://www.imperialviolet.org/2011/03/18/revocation.html


## 失効の先へ

前述のブログに、その解法が書かれている。

> A much better solution would be for certificates to only be valid for a few days and to forget about revocation altogether.
>
> より良い解決策は、証明書の有効期間を数日間に限定し、失効については一切考慮しないことだろう。
>
> --- https://www.imperialviolet.org/2011/03/18/revocation.html

そう、証明書の期間が短ければ問題はある程度解決するのだ。

これが Let's Encrypt が「6 日間の短命証明書」を出すに至った最大の理由だ。

- 6-day and IP Address Certificates are Generally Available - Let's Encrypt
  - https://letsencrypt.org/2026/01/15/6day-and-ip-general-availability

最初は 5~10 年だったことを考えると、信じられないほど短縮される。逆を言えば、ここまで短ければもう失効について考える必要は前ほどはなくなる。

もし本当に緊急で、24 時間以内に対応が必要なインシデントなどは、ブラウザ側でなんとかし、CRL や OCSP に頼った失効確認は使わない方向にシフトしていく。

といっても、すぐに全ての証明書を 6 日にするのは難しい。

ACME があるといっても、インフラ側の対応がまだ 90 日を前提としている可能性もある。なにより、証明書の発行がさらに増えるため、Let's Encrypt 自体が耐えきれるかわからない。

2028 年 2 月には、半分の 45 日に短縮することが決まっている。そのまま 6 日になるかはわからないが、おそらく徐々に短くしていくだろう。

そうなると OCSP のクエリも急増するが、そもそも失効には頼らないため、Let's Encrypt は既に OCSP の提供を止めている。

- Ending OCSP Support in 2025 - Let's Encrypt
  - https://letsencrypt.org/2024/12/05/ending-ocsp

一方、完全に失効情報を無くすわけにはいかないので、むしろもともと対応していなかった CRL の方に移行した。といっても、CRL は既にブラウザプロセス自体が代表して取得し、各種検証に使うようなモデルになっている上に、Bloom filter で圧縮されているため効率も良くなっている。

- A New Life for Certificate Revocation Lists - Let's Encrypt
  - https://letsencrypt.org/2022/09/07/new-life-for-crls

6 日で期限が切れる証明書を使うということは、余裕をもって 2, 3 日くらいで再発行をリクエストしないといけない。2, 3 日に一度 HTTP や DNS への変更を外部のツールに委ねるといった状態は、負荷の増大や脆弱性を埋め込む可能性があるため避けたい。

そこで ACME の発行プロセスも、従来の Validation から改善が提案されている。これまでは、クライアントが One Time Token を取得し、それを DNS や HTTP でデプロイする方法が使われていた。しかし、これを公開鍵暗号の方式に移し、クライアントが作った公開鍵を DNS に置く方式に変えることで、鍵のローテーションが無い限りは DNS クエリを書き換える必要がなくなるようにしていく提案だ。

- DNS-PERSIST-01: A New Model for DNS-based Challenge Validation - Let's Encrypt
  - https://letsencrypt.org/2026/02/18/dns-persist-01.html

一度発行されたクライアントの情報を TXT レコードに設定すれば、鍵の管理さえちゃんとしている以上、何も変更せずに証明書を更新し続けられる。


## Fallback

6 日の短命証明書の世界に入ると、気になるのは Let's Encrypt が SPoF になることだ。

仮に Let's Encrypt が 6 日落ちれば、そのサイトは時間がくれば止まる。証明書の更新失敗に気づき、急いで代替を探し、発行プロセスを移行し、期限前に再発行しきるというリカバリを、4~5 日で完遂する必要があるかもしれない。

90 日や、せめて 45 日あればまだ良いが、6 日となると、先に落ちた場合を想定してフォールバック先を決め、備えておきたいところだ。

理想は、ACME に対応しており、無料で発行できる CA だ。例えば以下が該当する。

- Google Public CA: Root は GTS Root で元は GlobalSign から買ったもの
- ZeroSSL: Root は USERTrust RSA Certification Authority (Sectigo/旧 Comodo)
- Buypass: 2025/10 に無料の証明書提供は停止


## Outro

このまますぐに、全ての証明書が 6 日になるとは限らない。しかし、失効の問題が本質的に解決しないとなれば、期限はどんどん短くなっていくだろう。つまり、自動化はもう待ったなしのところまで来ている。

自動化さえうまく回っていれば、デプロイ側にとっては 90 日でも、45 日でも、6 日でもそこまで変わらない。問題は、発行する側のインフラと、監視する(CT)インフラだ。

Let's Encrypt が十分に広がり、業界を牽引するに値する影響力を持った今、どこまでこうした積年の課題を解決していくか、注視していきたい。


## DEMO

本サイトを Let's Encrypt の 6 日間の短命証明書に移行した。