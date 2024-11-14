# [cookie][3pca] 3PCA 11 日目: Cookie Banner

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 11 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

前回は、各国で法律が整備されていった流れや、主な法律の特徴を解説した。

しかし、法律はあくまで法律であり仕様ではないため、「どう実装するべきか」は各サービスに委ねられている(ガイドラインなどはあるが)。

多くの場合これを Web の実装に落とし込むと、いわゆる「Cookie バナー」相当になるわけだ。

今回は、実世界でどのようなバナーが提供されているのかを見ていく。


## Cookie Banner

"Cookie Banner", "Cookie Notice", "Cookie Consent" など表現は色々あるが、要するに同意取得のために画面に追加される UI をこのように呼ぶ。

パターンは以下のようなものが多いだろう。

- 画面の下に Window 幅で Sticky
- 画面の上に Window 幅で Sticky
- 画面右/左下に必要幅で Popup

多くの開発者が知りたいのは、ここに何を書くかだ。もっと言えば、コピペすれば終わりなコード片が欲しいかもしれない。

しかし、ここまで解説したように、ユーザの情報をどのように扱っているかはサービスによって全く異なり、そこでどういう同意取得が求められているかも、適用される法律によって微妙に異なる。つまり、「これをコピペすればよし」とはならないのだ。

立法側も、もちろんそうしたリファレンス実装のようなものを提供しているわけではなく、提供しているのはあくまで要件だ。一般的に法律は解釈と判例に基づいて運用されるため、実装した結果が正しいかどうかも "Ask your lawyer" ということになり、最終的には裁判をしないとわからないところもある。

**もちろん、筆者も「このように実装すべき」といったアドバイスをする立場にはなく、またその責任を負うものではない。**

それを踏まえた上で、実装するための手掛かりになるものをいくつか紹介していく。


## 必須の Cookie

「Cookie の利用に合意をとる」と言っているが、ここまでの成り立ちを考えると「トラッキング目的の 3rd Party Cookie の利用に合意をとる」という目的であることがわかるだろう。

したがって、「Cookie を使うならなんでも合意が必要」というわけではないと解釈される。例えば Session を維持するための Cookie に合意を取得したとして、これをユーザが拒否してショッピングカートが使えなくなっても、それはユーザが求めるプライバシー保護とはいえないだろう。

こうした Cookie は「必須の Cookie」とみなされ、合意取得の対象外と解釈されるのが一般的だ。

例として、GitHub は 2022 年に全ての Cookie バナーを削除すると発表した。これは、必須 Cookie のみの利用にとどめたという意味だ。

- No cookie for you - The GitHub Blog
  - https://github.blog/2020-12-17-no-cookie-for-you/

ただし、これを「1st Party Cookie の利用には合意がいらない」と解釈できるという話とは限らないだろう。

前述した通り、「問題は機能ではなくユースケース」だ。各法律の目的は「3rd Party Cookie の利用を規制」することではなく、「ユーザのプライバシーを守る」ことが目的であり、例え 1st Party Cookie でも、それを用いて 3rd Party と連携し、何かしらのトラッキングを実現しているような場合は、合意取得の対象となるだろう。

法律の目的が、実装方法の規制ではないという点は、再度認識しておきたい点だ。そこを取り違えると、「3rd Party Cookie が使えなくなったのなら、1st Party Cookie でやればいい」といった解釈に走りがちだ。1st Party Cookie であっても、やっていることが「トラッキングである」という認識がある場合は、法的な規制の範疇となる可能性はある。それが Fingerprinting や CNAME Cloaking など、Cookie を用いない手法であってもだ。


## GDPR

### GDPR ガイドライン

GDPR は「同意についてのガイドライン」を公開しており、個人情報保護委員会による訳が公開されている。

- Guidelines 05/2020 on consent under Regulation 2016/679
  - https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf
- 同意に関するガイドライン 05/2020 - 個人情報保護委員会 - (ppc.go.jp)
  - https://www.ppc.go.jp/files/pdf/doui_guideline_v1.1_koushin.pdf

筆者の感覚では、どの法律も細かい差異はあれど、目的は基本「ユーザのプライバシーを守る」であるため、例えば GDPR に準拠すれば、他への対応もそこまで大きな飛躍はないと考える。その意味でも、世界で広く適用され、参考実装の多い GDPR とそのガイドラインは、他の法律に対応する上でも参考になるだろう。

特に注目したい点が、以下の 4 項目だ。

- freely given
  - 自由に選んでる、つまり同意の圧力をかけられたりしていない。
  - 合意しないとコンテンツにアクセスできない、いわゆる Cookie Wall はだめ。
- specific
  - 特定されている、つまりどのデータが何に使われてるのが「それぞれ個別に」同意できる。
  - 用途ごとに Cookie を分け、それぞれの用途について別々に設定が可能な UI である。
- informed and
  - わかるように説明を受けている。
  - 「専門用語でユーザを捲し立てて取った同意」は認めないということ。
- unambiguous indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her.
  - 本人の明確で積極的な意思表示によって得た同意が必要
  - 「デフォルトで同意になっておりあとで無効にできる」ではなく「自分で同意ボタンをクリックする」である必要がある

実装方法に特段指定はなく、強いて言えば「ここで同意を取得して初めて Cookie を利用できる」ことになるため、`HttpOnly` ではなく JS から保存することになるだろう。

では実例を見ていこう。


### 欧州委員会

最初は EU の政策執行機関である欧州委員会のサイト。GDPR のお膝元という意味で、ある種のお手本と捉えられるだろう。

- European Commission, official website (europa.eu)
  - https://commission.europa.eu/index_en

バナーはサイト下部に Window 幅のパターンで実装されている。

![欧州委員会の Cookie Banner](europa.eu.png#2442x460)

まず、文言を見てみる。

> This site uses cookies to offer you a better browsing experience. Find out more on [how we use cookies.](https://commission.europa.eu/cookies-policy_en)

シンプルにまとめ、詳細は別ページにしている。

そして、ボタンとしては `"Accept all cookies"` と `"Accept only essential cookies"` の二択となっている。後者が「必須 Cookie だけ許可する」にあたる。ここを "essential" じゃなくて "necessary" と表しているサイトもある。

このボタンを明示的に自分でクリックすることが、先ほど挙げたような条件を満たしてるわけだ。ここで "Deny" だけあって "Deny" しなかった場合に同意とみなす実装や、あらかじめチェックボックスをチェックしておくような実装、"Accept" だけ表示して "Deny" はリンク先に隠すといった実装は、ガイドラインに違反してると判断されかねないだろう。

"how we use cookies" のリンク先は以下のページだ。

- Cookies policy (europa.eu)
  - https://commission.europa.eu/cookies-policy_en

このページでは「Cookie とは何か」から始まって、「なぜ、どのように使っているのか」といったことも全て説明している。これが「十分な説明」の実装にあたる。

特に注目したいのは以下のテーブルだ。

![Cookie の名前や用途のテーブル](europa.eu.cookie-table.png#1644x2058)

サイトで利用する全 Cookie の "Cookie 名" と、"目的" 、そして "保存期間(Max-Age)" までがリストになってる。メンテナンスを考えると、ここのテーブルを実装と同期するのは大変そうだ。

これだけ数があるからか、"Cookie ごとの設定" の実装はされてないようだ。これは 3rd Party Cookie 視点で言えば "All" or "Noting" に振っているわけだが、"Noting" があるため、個別指定の UI は省いても良さそうなことが見て取れる(実際、ここまで多いと個別に指定できるユーザは皆無だろう)。


### ドイツ連邦政府

次はドイツ政府だ。

- Website of the Federal Government | Bundesregierung
  - https://www.bundesregierung.de/breg-en

こちらは、サイトの上部に Window 幅 Sticky のパターンで実装されている。

![ドイツ連邦政府の Cookie Banner](bundesregierung.de.png#2348x1000)

今回は少し複雑で、必須 Cookie だけあらかじめチェックが入ってる。そして、追加で Statistics を選ぶことができる作りだ。"Select all" すると "Statistics" も選ばれるが、おそらくもっと多くの用途で Cookie があっても、選択肢が増やせる使える作りにあらかじめ実装されているのだろう。

"Confirm selection" するとバナーが消え、選択結果が JS で Cookie に保存される。

![選択結果が反映されたことを保存する Cookie](./bundesregierung.de.cookie.png#1738x192)

なお、一旦バナーは消えるが、この同意は簡単に取り消せる(オプトアウトできる)必要がある。そのため、ページ下部にある "Privacy Settings" のリンクから、またバナーを出すことができる。

次はポリシーのページだ。

- Data Privacy Policy (bundesregierung.de)
  - https://www.bundesregierung.de/breg-en/service/data-privacy-information/data-privacy-policy-1534306#[anker]

GDPR に準拠していることや、使っている Cookie の値も書かれている。

![使っている Cookie の値の説明](./bundesregierung.de.explanation.png#1912x2294)

`CM_SESSION_ID` は 1st Party の Session Cookie だが、その説明も含めて書かれていることがわかる。必須の 1st Party Cookie の説明は必須ではなさそうに思うが、筆者には判断の自信はない。


### イギリス政府

次はイギリス政府だ。2020 年の Brexit で EU から離脱しているが、独自の立法を GDPR 準拠と認め、基本的には互換のある法に従っている。

- Welcome to GOV.UK (www.gov.uk)
  - https://www.gov.uk/

こちらもページトップの実装だ。

![イギリス政府サイトの Cookie Banner](gov.uk.png#1628x648)

注目すべきは "View Cookies" のページだ。

- Cookies on GOV.UK
  - https://www.gov.uk/help/cookies

このページは、さらに詳細な Cookie の説明を別ページにし、その上で以下のような設定 UI を持つ。

![イギリス政府の Cookie についての説明のページ](gov.uk.explanation.png#1372x2434)

ここでは、3 つの Cookie について個別に設定できるようになっており、「用途ごとの同意」を実現しているわけだ。

- GA, SpeedCurve によるメジャーメント
- YouTube などによるコミュニケーションとマーケティング
- ユーザの設定保存

前 2 つはわかるが、最後の「ユーザ設定」は言語設定やダークモードといったものだろうか? 筆者としては、それは 1st Party の必須機能の 1 つとして考えて良いのではと思うが、こうした部分も "Ask your lawyer" しないと確信が持てないあたりは、開発者としてはむず痒い。


### Guardian

政府系以外も見てみよう、メディア系の例として Guardian を見てみる。

- News, sport and opinion from the Guardian's global edition | The Guardian
  - https://www.theguardian.com/international

![Guardian の Cookie Banner](guardian.png#2314x2538)

割と大きめに表示し、かつ背景をブラーしている。これはどちらか選ばないと先に進めないという作りだ。

ここで、同意しないと先に進めない場合は完全に "Cookie Wall" になるが、この場合は選択肢に Deny があったとしてもコンテンツに進めない実装なので、"freely given" が満たせているのかは筆者には判断しかねる。Guardian が "Ask your lawyer" した結果この判断になったのだろう。

Manage or reject を選ぶと、以下のポップアップが出てくる。

![Guardian の Cookie Settings](guardian.settings.png#1128x2360)

かなり複雑に思えるが、細かく説明がなされており、用途ごとの合意が実装されている。上には "Accept All" と "Reject All" があり、"Reject All" は要するに必須 Cookie 以外の Reject にあたる。

このバナーも、サイト下部の "Privacy Setting" リンクからいつでも出せる。いつでも簡単にオプトアウトできる GDPR の条件を満たしているといえるだろう。


## CCPA

### ガイドライン

CCPA のガイドラインにあたるものは以下にある。

- California Consumer Privacy Act (CCPA) | State of California - Department of Justice - Office of the Attorney General
  - https://oag.ca.gov/privacy/ccpa

特に注意すべきは、CCPA が認めている 6 つの権利だろう。

- The right to know (何が集められているかを知る)
- The right to delete (それを削除させる)
- The right to opt-out (集めることからオプトアウト)
- The right to non-discrimination (権利行使の差別を受けない)
- The right to correct (集められた情報の修正する)
- The right to limit (使用と開示の制限を課す)

また、オプトアウトのために "Do not sell (share) my informantion" リンクを含む必要があるとされているため、この文言に類似したリンクを footer にもつサイトが多くある。

実例を見ていきたいが、法律の適用範囲上、CCPA に対応してて GDPR には対応してないサイトを見つけるのが難しい。ある程度の規模のサイトは、やはり両方に対応しているようだ。


### Financial Times

メディア系企業である Financial Times。

- Financial Times
  - https://www.ft.com/

ここはポップアップ実装だ。

![Financial Times の Cookie Banner](financial-times.png#982x600)

"Manage cookies" の UI は、個別選択の実装をせず "Allow" / "Block" のみの、シンプルで分かりやすい実装だ。

![Financial Times の Manage Cookies](financial-times-manage-cookies.png#1348x2182)

"Manage cookies" のリンクも footer にある。

Privacy Policy をみると、GDPR だけでなく CCPA にも対応していることが言及されている。

- Privacy policy | Help Centre
  - https://help.ft.com/legal-privacy/privacy-policy/

"Do Not Sell My Personal Information" の Policy についても記載されている。


## Disqus

サイト上にコメント欄を埋め込める Disqus を見てみる。

- Disqus
  - https://disqus.com/

このサイト自体はバナーが出ないが、サービスは 3rd Party として機能を提供するものであるため、サイトの下部に "Do Not Sell or Share My Info" リンクがある。

![Disqus のフッター](disqus-footer.png#2584x360)

この先にオプトアウトの UI が設置されている。

![Disqus のオプトアウト](disqus-optout.png#2584x360)

どちらかというと、Disqus を導入している他のサイト上で表示された Privacy Policy などから、Disqus にオプトアウト目的で訪れた人がたどり着くべきページとして用意されていると考えられる。


## 電気通信事業者法

### ガイドライン

次は我が国の「個人情報保護法」および「電気通信事業者法」を見ていく。

ガイドラインとしては、前回紹介した「外部送信規律」についてのガイドが分かりやすい。

- 外部送信規律ガイドライン
  - https://www.soumu.go.jp/main_content/000862755.pdf


### デジタル庁

まず、日本を代表してデジタル庁を見てみる。

- デジタル庁
  - https://www.digital.go.jp/

![デジタル庁のトップページ](digital.go.jp.png#2440x906)

特に Cookie バナーは無い。

プライバシーポリシーを見る。

![クッキーの利用に関する説明](digital.go.jp.cookies.png#2412x1800)

アナリティクスツールである User Insight を入れているようだ。Cookie 自体は 1st Party を用いて連携している。

この場合、プライバシーポリシーが「外部送信規律」の「公表」に当たるのだろう。ここでカバーしているため「通知」にあたるバナーのような実装は不要となっている。

なお、User Insight を提供しているユーザローカルのページがリンクされている。

![リンクされているユーザローカルのページ](userlocal.jp.policy.png#2140x1622)

ここにはオプトアウトの UI がある。


### 日経電子版

最後は、日経新聞の電子版を見てみる。

- 日本経済新聞 - ニュース・速報 最新情報
  - https://www.nikkei.com/

Cookie バナーが表示される。

![日経電子版のバナー](nikkei-banner.png#1100x394)

これは、「外部送信規律」の「通知」にあたる UI だろう。特に Accpet/Reject ではなく、利用している事実のみを述べ、ポリシーへの導線のみを伝えている。

- 日本経済新聞社 - クッキーなどで取得する情報の取り扱いについて
  - https://www.nikkei.com/lounge/privacy/cookie/policy.html

今回世界中の様々なサイトを調べたが、この日経の Cookie ポリシーのページは、日本語であることを差し置いても、群を抜いて分かりやすく書かれている。

![日経電子版の Cookie ポリシー](nikkei-policy.png#1062x2128)

このページの中にも、行動ターゲティングのオプトアウト UI は設置されている。

そこからリンクされた「外部送信一覧」も見やすい。

- 日本経済新聞社 - ご利用履歴情報の外部送信一覧
  - https://www.nikkei.com/lounge/privacy/cookie/optout.html