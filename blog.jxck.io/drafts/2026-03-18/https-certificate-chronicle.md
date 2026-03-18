# [acme][ca][https] HTTPS 証明書クロニクル

## Intro

Web サービスをデプロイする際に、TLS 証明書を取得し HTTPS でデプロイするのが一般的となった。

この TLS 証明書の期限は、どんどん短くする方向で進めている。

なぜ HTTPS はデフォルトになり、証明書の期限はどんどん短くなっていくのか。

その背景をまとめる。


## 黎明期(90 年後半~2010 年頃)

90 年代の終わり頃、当時は TLS の前身にあたる SSL というプロトコルでデプロイされていたため、証明書は「**SSL 証明書**」として販売されていた。

当時はまだ、HTTPS のデプロイは企業サイトがわざわざ対応するものであり、証明書も企業が有料で購入するものだった。

2000 年に入ってからは、証明書は単体での販売だけでなく、企業向けセキュリティソリューションの一環として、認証基盤やメール署名、VPN などと抱き合わせで売られるようになる。

つまり PKI は BtoB ビジネスが主戦場であり、個人向けは非常にニッチな市場だったのだ。

この時期の証明書の発行は、メールベースで担当者同士がやりとりするパターンが主流だった。

企業の担当者は手元で鍵を生成し、対応するリクエストファイル(CSR: Certificate Signing Request)をメールに添付して CA の担当者に送る。担当が署名した証明書がメールで返ってくるような運用だ。

```console
$ openssl genrsa -out server.key 2048

$ openssl req -new
-key server.key
-out server.csr
```

企業ドメインのメールで送られていることにより、ドメインの保有が確認(Domain Validation)できるため、このフローで DV 証明書が発行可能だ。

追加で契約を結べば、CA 側が企業の所在や登記を別途確認したり、担当者への電話確認などを追加することで、OV(Organization Validation) や EV(Extended Validation) の証明書も発行された。

URL バーに緑の UI で組織名が表示されていたのは、この確認プロセスで「実在する組織が運用している」と保証できたからだ。今で言う SNS の公式アカウントに付くバッジのような意味合いだ。

TODO: 緑バー

また、セキュリティレベルの高いサービスでは、openssl コマンドでローカルに鍵ファイルを出すなどせず、秘密鍵が漏洩しないよう HSM(Hardware Security Module)が使われた。

作った鍵を 10 年使うような運用も多かったため、プチキーセレモニー(CA などがルートの鍵を発行する際に行うセレモニー)のようなものが行われることもあったようだ。自動化とは真逆の運用だ。

メールでの発行でも運用が回っていたのは、証明書の期限も 1〜5 年と長く、頻繁に行うことではなかったからだ。

また、HTTPS 化するのは「パスワードを盗聴されないため」という認識が強く、サイト全体ではなく「ログイン画面だけが HTTPS」という構成も一般的だった。

当時は TLS は CPU 処理が増えるため、負荷が上がる、パフォーマンスが下がるなどの理由から、極力暗号化するページは減らしたいといったモチベーションが働いていた。

それでも対応するのは、金融や EC など、影響の多いものばかりで、個人のサイトが暗号化されることはかなりレアだった。

今とはかなり、雰囲気の違う運用だったことがわかるだろう。


## WiFi の普及(2000~2010 年頃)

2000 年前半頃から WiFi が普及し始めた(当時は主に無線 LAN と呼ばれていた)。2008 年に iPhone が出たあたりからは、自宅に WiFi を置くことも、会社/図書館/空港/学校などに AP が公開されている環境も徐々に増えていった。

まだ多くのサイトは「ログインだけ HTTPS」や「HTTPS もあるが HTTP と選択式」などのサービスも多く、全ては暗号化されていなかった。すると問題になるのは Cookie だ。パスワードを暗号化しても、ログイン済みの Session Cookie は経路上を平文で転送されていたため、盗聴が可能だった。

経路の盗聴は、有線接続時代では物理的な侵入なども必要になったりとハードルは高かったが、WiFi となると話は別だ。同一ネットワークの他人の通信のキャプチャは有線に比べれば容易だし、自分のモバイル AP の SSID を "Airport Free WiFi" などとして空港にいれば、勝手にユーザの方が繋いできてくれる。

これらのことを鑑み、大手サイトが HTTPS への移行を始めた。それまで HTTPS は設定画面で有効にしないとデフォルトにはならないのが普通だったが、それをデフォルトで有効にする取り組みとして、2010 年 1 月の Gmail はエポックメイキングだったと思う。

- Official Gmail Blog: Default https access for Gmail (2010/1/12)
  - https://gmail.googleblog.com/2010/01/default-https-access-for-gmail.html
  - HTTPS だと処理が重くなる懸念があり両方を提供していた
  - 調査の結果その影響は緩和されており、むしろ WiFi の方がリスクとなった

ちなみに Gmail が移行に向けて行った調査には、当時の HTTPS に対する認識がうかがえる記述がある。

- Google オンラインセキュリティブログ:ウェブアプリケーション向け HTTPS セキュリティ
  - https://security.googleblog.com/2009/06/https-security-for-web-applications.html
  - 無料で常時接続の HTTPS はメール業界ではかなり珍しい
  - HTTPS をデフォルトにしてるのはパワーユーザーのみ
  - 場合によっては特定の動作が遅くなることもあるため、トレードオフを調査している

当時のネットワーク、デバイス、サーバ、プロトコル実装などを考えると、まだまだ枯れた技術ではなかったこともわかる。

同年 6 月には EFF(電子フロンティア財団)が、HTTPS に対応しているサイトへの接続を、強制的に HTTPS にリダイレクトする拡張 "HTTPS Everywhere" を公開した。

- Encrypt the Web with the HTTPS Everywhere Firefox Extension | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2010/06/encrypt-web-https-everywhere-firefox-extension?utm_source=chatgpt.com

同年 10 月に公開された Firesheep という Firefox 拡張は、こうした一連の「盗聴->なりすまし」を体現するために PoC 的に公開された。同一ネットワーク上に出てくるサービスのアイコンをクリックするだけで、簡単になりすましができたのだ。

- Firesheep, a day later - codebutler
  - https://codebutler.com/firesheep-a-day-later

2 つの拡張の公開は、まだオプションだった HTTPS への切り替えを、一般ユーザに啓蒙する目的として役目を果たしていた。

これらの状況を鑑み、2010~2011 年ごろ他の大手サイトも続々と Full HTTPS の構成に移行していくことになる。

- A Continued Commitment to Security | Facebook (2011/1/26)
  - https://web.archive.org/web/20111102153945/http://blog.facebook.com/blog.php?post=486790652130
  - まだ完全に移行はしてないが、オプションを提供し、対応を拡大していく
- Making Twitter more secure: HTTPS (2011/3/15)
  - https://blog.x.com/en_us/a/2011/making-twitter-more-secure-https
  - HTTPS 対応のオプションを提供
  - 有効にすることを推奨

他にもあるはずだが、一次ソースがことごとく消えてサルベージできなかったが、大手はだいたいこの時期に集中して移行をしていたと思って良い。


## Snowden と PRISM(2013)

2013 年 6 月、NSA の契約社員だった Edward Snowden が、PRISM を始めとした大規模監視システムの存在をリークした。

この事実が明るみに出たことは、それまでのインターネットの前提を覆すことになる。

- NSA Prism program taps in to user data of Apple, Google and others | US national security | The Guardian
  - https://www.theguardian.com/world/2013/jun/06/us-tech-giants-nsa-data

例えば HTTPS がなければ Cookie の漏えい等でなりすましはできるが、その攻撃モデルはあくまで、悪意を持った Eve が Alice と Bob の間に入るような、単独や少数グループによる犯行のような暗黙の前提があった。

ところが、こうした監視プログラムを国が運営しているという事実は、その Eve が「国」レベルの機関であることを意味する。

このころ既に人々の生活は、インターネットへの依存がかなり大きく、その通信を様々な形で寄せ集めれば、その人のプロフィールどころか、家族構成や生活スタイル、政治思想や病歴まで高い解像度で把握できてしまう可能性があるのだ。

この事態を重く見た IETF は、「広域盗聴は攻撃である」と定義する RFC を策定した。

- RFC 7258 - Pervasive Monitoring Is an Attack
  - https://datatracker.ietf.org/doc/html/rfc7258

これ以降、「**IETF で策定されるあらゆる通信プロトコルは暗号化を前提とする**」という合意がとられることとなる。直後に策定される HTTP/2 や WebRTC が暗号化を前提としているのも、こうした背景によるものだった。


## HTTPS Everywhere と Powerful Features(2014~)

HTTPS の普及が叫ばれる中、「**自分のサイトは Cookie も使ってないし、大した情報もないから暗号化する必要はない**」という勘違いは非常に多く残っていた。

筆者もこの時期、自治体のサイトを運営している担当者から、「誰が見ても問題ない情報しかないのだから HTTPS 化する意味がわからない」と実際に聞いたこともある。

確かに Firesheep レベルの攻撃であれば、そのリスクはない。しかし、インターネット全体が戦っているリスクは、もうそんなマクロな話ではなくなった。

例えば、全ての通信が盗聴されている状態を考えよう。(その前提はかつては絵空事だったかも知れないが、2013 年以降はそうではない)

もし、あるユーザが千代田区の自治体サイトを見ていれば、千代田区在住の可能性が高くなる。子育て給付について調べていれば、介護サポートについて調べていれば、給付金について調べていれば...

このように、ログインを必要とせず、パーソナライズされていなくても、そのサイトを閲覧したという事実の集積も、その個人を知る上で無視できないのだ。

なんてことない個人ブログや、誰でも編集できる Wiki であっても、関係はない。

「**暗号化するかしないかを選ぶ時代は終わった**」という認識が広まるのを待つフェーズになったのだ。

ところが、悠長に待っているわけにもいかないので、あらゆる角度からインターネットを安全にするための取り組みが行われた。

例えば、ブラウザは新しい機能を HTTPS 接続下でのみ動作するように制限し始めた。

筆者の記憶では筆頭は 2014 年ごろリリースされた Service Worker だ。SW の前身の App Cache というオフライン対応機能は、平文通信に悪意のある App Cache を仕込まれると、攻撃が永続的に残ってしまうという問題があった。そこで SW は最初から HTTPS でしか登録できないという制限を設けてリリースされた。その後も、`getUserMedia` や `geolocation` など、強力な機能(Powerful Features)は最初から HTTPS 前提となり、先の理由で 2015 年頃策定された HTTP/2 もブラウザ実装は HTTPS 前提だ。

これは、攻撃を受けたときの被害を抑える目的もあったが、「新しい機能を使いたかったら HTTPS にするしかない」といった強制力として、開発の現場に影響していたことも無視できないと思っている。


## Let's Encrypt (2015)

冒頭で述べたように、まだこの時点でも HTTPS のための証明書は、TLS ではなく SSL 証明書として売られており、個人でも有料のものを購入する必要があった。

筆者の場合は、メールの履歴を見ると 2014 年頃に KingSSL というかなり安い証明書ベンダから、990 円で 3 年の証明書を買っていたようだ。これは業界ではかなり安く、まだまだ数千円の証明書が普通に取引されていた時代だと思う。(無料で配っていたサービスもあったが、怖くて使わなかった。)

筆者はどちらかというと、SW や HTTP/2 など、ブラウザの新しい機能を試し、まさしくこのブログで試すことを目的に購入していた。

体感的には TLS 証明書も、ドメインの更新料と同じくらいのコスト感で、無くても良いなら買わないと思う個人や組織は相当に多かっただろう。

そこで TLS 証明書を誰でも無料で取得でき、HTTPS 化が可能になるように始まったのが Let's Encrypt だ。2014 年に構想がアナウンスされ、2015 年にパブリックベータが提供された。

- Let's Encrypt: Delivering SSL/TLS Everywhere - Let's Encrypt
  - https://letsencrypt.org/2014/11/18/announcing-lets-encrypt

Let's Encrypt も、最初は理解されておらず「無料の証明書なんか怪しい」や「ビジネスで使えるものではない」といった風評もあったように思う。また、当時はまだ EV 証明書も使われており、DV 証明書のみの発行であったことなどが敬遠されたり、Wildcard 証明書に対応してなかったことからデプロイの課題などもあった。

Let's Encrypt の白眉だった点は、構想の段階から 90 日という短命の証明書と、それを自動で更新する ACME プロトコルの策定を前提にしていたところだ。それまで、5 年に一度のメールでのやり取りだった証明書を、短期で入れ替えていくモデルは、当時のデプロイモデルからはかなり乖離していた。

しかし、同年 ACME は IETF に提案され、策定が進む。RFC になるのは 2019 年だが、その間に他の CA も対応を進め、「DV 証明書は自動で更新する」というモデルが徐々に広がっていくこととなった。

では、なぜ自動で更新するプロトコルを策定してまで、証明書の期限を 90 日にする必要があったのだろうか。ここには HTTPS 普及の裏側にあった、CA (PKI)業界の様々な戦いがあった。


## DigiNotar 事件(2011)

遡ること 2011 年 8 月末、イラン在住の開発者が [google.com](http://google.com) アクセス時に、不正な証明書を発見し報告した。

- Is This MITM Attack to Gmail's SSL ? - Gmail Help
  - https://web.archive.org/web/20111018230222/https://www.google.co.uk/support/forum/p/gmail/thread?tid=2da6158b094b225a&hl=en

スクリーンショットはストレージサービスごと失われてしまったが、いくつか転載されたリソースがあったので引用する。

- tls - MITM Attack on Gmail's SSL in 2011 - Information Security Stack Exchange
  - https://security.stackexchange.com/questions/232099/mitm-attack-on-gmails-ssl-in-2011
- DNSSEC Musings Diginotar, DANE, and Deployment - Olaf M. Kolkman
  - https://conference.apnic.net/__data/assets/pdf_file/0005/58901/dnssec-diginotar-dane_1361864377.pdf

![][image1]()

Google の調査の結果、これは DigiNotar という CA によって発行された証明書を用いた中間者攻撃(Person-in-the-Middle)であるとした。

DigiNotar 自体は正規の CA であるが、問題は `*.google.com` の証明書を Google に隠れて発行していたことだ。

- An update on attempted man-in-the-middle attacks
  - https://security.googleblog.com/2011/08/update-on-attempted-man-in-middle.html

その後の調査では、この一連の攻撃は "Operation Black Tulip (ブラックチューリップ作戦)" と呼ばれ、イランから行われた攻撃により、イラン国内の 30 万 IP アドレスが盗聴されていたとされる。検索(www.google.com)やメール(mail.google.com)、ドキュメント(docs.google.com)などを監視する目的で使われた可能性があるとされ、イラン国内にはルート CA がないために、オランダの DigiNotar を攻撃し証明書の発行に成功したというもののようだった。

- Iranian Man-in-the-Middle Attack Against Google Demonstrates Dangerous Weakness of Certificate Authorities | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2011/08/iranian-man-middle-attack-against-google
- A Post Mortem on the Iranian DigiNotar Attack | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2011/09/post-mortem-iranian-diginotar-attack
- DigiNotar Certificate Authority breach "Operation Black Tulip"
  - https://www.sec.gov/Archives/edgar/data/1044777/000119312511241796/dex992.htm

つまり、これは正規の CA が発行した正規の証明書であるため、通常ブラウザはそのまま信用してしまう。しかし、Chrome はこの直前(5 月)に Public Key Pinning の機能を入れており、[`google.com`](http://google.com) の証明書は Verisign などを含めた Google が普段証明書の発行を依頼している CA から発行された場合に、これをエラーにする機能を入れていた。結果、中間者攻撃にあったユーザには、証明書エラーが表示され、使われている証明書が不正発行であるとわかったわけだ。

- ImperialViolet - Public key pinning
  - https://www.imperialviolet.org/2011/05/04/pinning.html

これは、Google は気づくことができたが、他にも同様の攻撃が行われていた可能性を示唆する。そして、その後の調査では偽装証明書は 500 以上発覚し、CIA, MI6, モサドなども含まれていたとされた。

- DigiNotar Certificate Authority Breach Crashes e-Government in the Netherlands - IEEE Spectrum
  - https://spectrum.ieee.org/diginotar-certificate-authority-breach-crashes-egovernment-in-the-netherlands

これを受け、DigiNotar の運営は信頼に値しないとし、ブラウザベンダは DigiNotar の証明書をトラストストアから外すことを決定した。

トラストストアから外れるということは、DigiNotar によって発行されて使用されている全ての証明書が、期限が切れてないにも関わらず全て使えなくなるということだ。実際、オランダ政府機関サイトをはじめとするかなりのサービスが、HTTPS エラーでアクセスできなくなったのだ。

これは非常にインパクトのある事件であり、CA の信頼自体が揺らぐエポックメイキングなインシデントだった。

DigiNotar はそのまま倒産した。


## CA の信用と技術的カバー

実は DigiNotar の侵害を Chrome が Pinning で発見できたのは、その直前 2011/3 にも、Comodo という証明書ベンダーが攻撃に遭い、偽装証明書発行が行われていたからだ。

- Comodo Report of Incident - Comodo detected and thwarted an intrusion on 26-MAR-2011
  - https://www.comodo.com/Comodo-Fraud-Incident-2011-03-23.html

被害者の筆頭である Google からすれば、どんなに Google 自身がセキュリティ対策に気をつけていても、Google の手が及ばない CA が一個でも侵害に遭えば、全ての Google サービスが影響を受けるという状況となる。そんな CA が数百あり、その全てが `*.google.com` を発行する権限を持っている状況なのだ。

「CA は信用できないかもしれない」という懸念はずっとあったとは言え、Comodo の事件でそれがいよいよ無視できなくなった。

Chrome に Pinning を入れたのは、「自分たちが普段取引している大手の CA 以外が、侵害により証明書を発行するリスク」を防ぐために入れた、防御手段だったと言える。

皮肉にもそれによって、DigiNotar の侵害が発覚した。Trust Anchor として CA は、HTTPS が普及すればするほど「攻撃するインセンティブ」が増加した格好の標的となる。攻撃者にとっては、どれか一個落とせるだけで、`*.google.com` を盗聴できるとなれば、成功した時のリターンが多い。

「CA は監査を受けているから大丈夫」などと言ってられる存在ではなくなったのだ。

そこで Chrome が内部で独自に行なっていた証明書の Pinning 機能を、標準仕様とする HTTP Public Key Pinning の作業が始まる。

# HPKP(HTTP Public Key Pinning)

後に RFC 7469 として標準化された Public Key Pinning は、以下のように「このハッシュの証明書が使われているはず。そうでなければ偽装されている可能性がある」ということを明示する目的だ。

```http
Public-Key-Pins:
max-age=36000;
pin-sha256="7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=";
pin-sha256="+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=";
report-uri="https://report.example/hpkp"
```

ところが、このヘッダはあまりにも罠が多く、運用もままならなかった。

特に、証明書を更新する際はハッシュが変わるため、ヘッダを変える必要がある。しかし、`max-age` で古いハッシュが保存されていると、どんなにリロードしてもサーバのハッシュとブラウザに保存されたハッシュが異なり、エラーとなってしまう。`max-age` をうっかり長くしすぎると、サイト自体が復旧不能になり得るのだ。そのために、複数のバックアップハッシュを指定できる仕様ではあるが、ローテーション後に使う証明書が先に確定している必要があり、現実的ではなかった。

また、中間者攻撃が成立している場合、攻撃者は長い `max-age` で適当なハッシュを pin してしまえば、そのユーザに対して長期間サイトにアクセス不能な状態を作ることができてしまう。この攻撃を広範囲のクライアントに実施できれば、深刻な DoS につながる。

結果、発案者の Chrome も後に機能を Deprecate し、仕様自体が過去のものとなっている。

# Certificate Transparency (2013)

Pin での防御は難しいが、それでも CA の防御努力だけに依存するのは難しい。特に Google からしてみれば、どんな CA も `*.google.com` を発行できる以上、全ての CA を監視したくなる。

そこで作られたのが Certificate Transparency (CT) だ。これは文字通り、「CA の証明書発行を監視する仕組み」と言える。

まず CA は、証明書を発行したらそれを CT Log というログサーバに記録する。この CT Log は、仮想通貨などで使う分散台帳と同じようなものであり、追加した記録を改ざんすることができない。したがって、台帳を監視していれば、`*.google.com` の証明書を誰かが発行した瞬間に判明し、それが、自分たちで発行依頼したものでなければ、侵害や誤発行によるものだとわかるのだ。

それだけであれば、攻撃者は CT Log に記録しないように発行することで、回避できてしまう。そこで使うのが SCT (Signed Certificate Timestamp) だ。SCT は、証明書を CT Log に登録すると発行されるタイムスタンプであり、CA はそれを証明書に埋め込んで発行する。ブラウザは「SCT の無い証明書は信用しない」とすれば、ブラウザで表示できる全ての証明書は CT Log に登録されたものであることを、保証できるという仕組みだ。

逆を言えば、実質全てのデプロイされたドメインが CT Log に残るので、秘密裏にドメインをデプロイすることができなくなるといった反対もあった。しかし、証明書発行を監視しないと攻撃を受けた時のリスクが大きいという事情もあり、CT の普及が進むこととなった。

正直、どのくらいの会社が CT Log の監視をちゃんとやっているのかは分からないが、GAFAM のような大手は、これによって自分たちのサービスを守れているようだ。もし、攻撃された CA から、自分たちの証明書が偽装発行されていないかを知りたければ、CT Log を監視する体制を整えると良いだろう。

# CA と CAB/Forum

CA とブラウザの両者を繋ぐのが、CAB/Forum (CA Browser Forum)だ。

ここでは、ざっくり「ブラウザはどの CA を信用するか」を議論する場として機能している。

「どの CA を信用するかは、OS が決めることでは?」と思うかもしれない。たしかに昔はそうだった。Root CA の証明書ストアは OS が持ち、それをブラウザが見る構図が自然だ。

しかし、Firefox は初期から自前で証明書ストアを持っていた。クロスブラウザで同じように動くこともあるだろうが、Trust Anchor の選定自体もベンダーから中立でありたいという意図もあると考えられる。例えば、Windows の証明書ストアに MS の独自証明書を入れて、全てのユーザを MS が監視することも、構造的には可能だからだ。Mozilla はそれを許さないためにも、証明書ストアを自分で持つ。

その後、Chrome も証明書ストアを自分で持つようになった。度重なるインシデントで発行される対象となることも多かった `*.google.com` を所有する立場としては、信頼に足る CA を自分で選びたいという思惑もあるだろう。例えば、国によっては政府の権限でバックドア用の証明書をデバイスに入れるように強制される可能性もある。また Distrust された CA は、OS のアップデートを待たなければ消えないが、ブラウザに同梱していれば Chrome のアップデート(ものによってはコンポーネントアップデート)でコントロールできるため、ロールアウトが迅速になる。

- Chromium Blog: Announcing the Launch of the Chrome Root Program
  - https://blog.chromium.org/2022/09/announcing-launch-of-chrome-root-program.html

Safari や Edge は、そもそも OS を持っているベンダーのため、OS を依然利用している。

すると、ブラウザに信用されなければ DigiNotar のように倒産にまで追い込まれるという点で、実は Trust Anchor である CA よりも、ブラウザの方が力を持っている構図になる。

したがって、CAB/Forum での対応は CA にとっては死活問題だ。ちょっとでも「ダメな CA」の烙印を押されると、実質終わる。

例えば、大手だった Symantec も 2015 年に大きなインシデントを発生し、最終的にはブラウザから Distrust され CA 事業売却に至った。翌年 2016 年には WoSign も同じように Distrust される。似たような事件は多発している。

- Sustaining Digital Certificate Security
  - https://security.googleblog.com/2015/10/sustaining-digital-certificate-security.html
- Distrusting WoSign and StartCom Certificates
  - https://security.googleblog.com/2016/10/distrusting-wosign-and-startcom.html

ちなみに、日本政府が運用する GPKI(政府認証基盤)という政府・行政用の CA に至っては、運用基準を満たさないとして Distrust 以前に Trust すらしてもらえなかった。

- Japan GPKI Root Renewal Request
  - https://groups.google.com/g/mozilla.dev.security.policy/c/Mezqdljjerc/

CA のインシデントがニュースで目立つようになったのは、CA の運用に対するブラウザからの監視の目が強まったことで、それまで発覚すらしていなかったインシデントが発覚するようになったという側面と、HTTPS 化していく Web における Trust Anchor の重要性の高まり、攻撃が激化しているという２つの側面があると、筆者は考えている。

Distrust までいかなくても、何か運用不備があれば対応は必要だ。ここで問題になるのが「失効」である。


## 失効の難しさ

証明書の有効期限が短ければ、侵害による発行に成功しても、その影響を短くすることができる。その事実は、証明書の期限を短縮する流れにつながっているのは確かだ。

しかし、証明書にはもう一つ重要な課題がある。それが「失効(revocation)」だ。

例えば証明書の発行を受けたサービスが、秘密鍵を漏洩したといった場合、有効期間内の正規の証明書でも無効にする必要がある。つまり、CA は何らかの方法で「その証明書は期限内だが無効である」と知らせる必要があるのだ。

これが先程のように CA の侵害による誤発行や、その他ポリシーに違反するインシデントがあれば、大量の有効な証明書を一気に失効させる必要も出てくる。

本来は提示された証明書を、ローカルにある CA 証明書で検証すればよかったところに、「失効していないかどうか」という外部への問い合わせが発生するのだ。これは非常に面倒な要件だ。

CA が失効を伝える方法は、大きく分けて 2 つある。

- CRL
- OCSP


## CRL

CRL(Certificate Revocation List) は、要するに全ての失効リストをファイルにして配る方法だ。PKI の黎明期から使われている愚直な手法だ。

証明書を受け取ったクライアントは、そこに書かれた CRL を取りに行き、リストに入っていないか調べる想定だ。ところが、当然バカデカいファイルになる。ブラウザで HTTPS 通信をするたびに CA ごとに取りに行くわけにも行かず、CA 側もリアルタイムにファイルを更新するのも難しく、少なくとも Web で使うのは現実的ではなかった。

あまりにも使いづらいため、派生仕様が色々と作られることになり、Chrome では「影響が大きいと判断したもの」だけを集めた CRLSet(Chrome) や CRLite(Mozilla) を用いたりした。


### OCSP

当然、DNS のように該当ドメインの情報だけをクエリできる DB のようなものがあった方が効率が良い。そこでできたのが OCSP だ。小さいペイロードで済むため、リアルタイム性が向上する。

ところが、HTTPS 接続ごとに CA にドメイン情報をクエリするということは、CA から見れば「この IP の人はこのドメインにアクセスしようとしてる」ということが、リアルタイムにわかることになる。その通信を監視すれば第三者にもわかるというプライバシーの問題がある。また、中間者攻撃で不正な証明書が使われている場合、OCSP レスポンスも一緒に改竄すれば発覚が防げてしまう。

なにより、CA が持つ OCSP データベースにはクエリが大量に届くため、落ちることもある。Proxy に阻まれてクエリが届かないこともある。ここがボトルネックになると、サイトが速くても検証でパフォーマンスが落ちることもある。結果、ブラウザは OCSP を「クエリが正常にすぐ返れば見るが、それ以外は無視して証明書の失効は見ない」という中途半端な運用をせざるをえなかった。

代わりに、OCSP の結果をサーバ側で取得しておき、レスポンスに添付する Stapling が使われるようになり、クライアントは OCSP クエリしないでも、添付されたレスポンスの署名を検証すればよくなった。サーバ側で失効した事実を認識していれば、最新のレスポンスを Stapling すればいいため、OCSP クエリを集約できる。ただ、リアルタイム性は失われているため、サーバが OCSP レスポンスを添付し続ければ、その有効期限内は CRL など別で発覚しない限り失効を隠せてしまう問題もある。

CA の責務としては、失効した証明書はすぐさま発覚するようにしたい。

しかし、Web でそれを実現するには、検証を優先し表示が遅くなるか、検証が失敗したら念の為表示をエラーにするなど、なにかしらが犠牲になる。

しょっちゅう CA の Distrust が起こり、大規模な失効が発生すると、移行が間に合わないサービスは接続エラーになり、多くの人に影響が出る。

そんなことが続けば、誰も HTTPS にしなくなってしまう。

ユーザのために、世界の全ての通信を暗号化したいが、暗号化が邪魔をして Web が不便になるのはとにかく避けたい。

CT で監視体制を敷き、不正な発行が見つかっても、失効にラグがあればその間は攻撃に使われてしまう。

つまり、「失効」という考え方自体が限界にきているのだ。それ自体は、もうかなり前から言われていることなのだ。

- ImperialViolet - Revocation doesn't work
  - https://www.imperialviolet.org/2011/03/18/revocation.html

# 失効の先へ

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

もし本当に緊急で、24h 以内に対応が必要なインシデントなどは、ブラウザ側でなんとかし、CRL や OCSP に頼った失効確認は使わない方向にシフトしていく。

といっても、すぐに全ての証明書を 6 日にするのは難しい。

ACME があるといっても、インフラ側の対応がまだ 90 日を前提としている可能性もある。なにより、証明書の発行がさらに増えるため、Let's Encrypt 自体が耐えきれないだろう。

まずは半分の 45 日に短縮し、6 日になるかはわからないが、おそらく徐々に短くしていくだろう。

そうなると OCSP のクエリも急増するが、そもそも失効には頼らないため、Let's Encrypt は既に OCSP の提供を止めている。

- Ending OCSP Support in 2025 - Let's Encrypt
  - https://letsencrypt.org/2024/12/05/ending-ocsp

一方、完全に失効情報を無くすわけにはいかないので、むしろもともと対応してなかった CRL の方に移行した。といっても、CRL は既にブラウザプロセス自体が代表して取得し、各種検証に使うようなモデルになっている上に、Bloom filter で圧縮されているため効率も良くなっている。

- A New Life for Certificate Revocation Lists - Let's Encrypt
  - https://letsencrypt.org/2022/09/07/new-life-for-crls

6 日で期限が切れる証明書を使うということは、余裕をもって 2, 3 日くらいで再発行をリクエストしないといけない。2,3 日に一度 HTTP や DNS への変更を外部のツールに委ねるといった状態は、負荷の増大や脆弱性を埋め込む可能性があるため避けたい。

そこで ACME の発行プロセスも、従来の Validation から改善が提案されている。これまでは、クライアントが One Time Token を取得し、それを DNS や HTTP でデプロイする方法が使われていた。しかし、これを公開鍵暗号の方式に移し、クライアントが作った公開鍵を DNS に置く方式に変えることで、鍵のローテーションが無い限りは DNS クエリを書き換える必要がなくなるようにしていく提案だ。

- DNS-PERSIST-01: A New Model for DNS-based Challenge Validation - Let's Encrypt
  - https://letsencrypt.org/2026/02/18/dns-persist-01.html

一度発行されたクライアントの情報を TXT レコードに設定すれば、鍵の管理さえちゃんとしている以上、何も変更せずに証明書を更新し続けられる。

# まとめ