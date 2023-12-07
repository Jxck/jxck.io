# [cookie][3pca] 3PCA 11 日目: Cookie Banner

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 11 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

前回は、各国で法律が整備され、合意の取得が義務化されていく流れを解説した。

しかし、法律はあくまで法律であり仕様ではないため、「何についての合意をどういう UI で取れば良いのか」は実装に委ねられている。

この同意の取得を Web の実装に落とし込むと、いわゆる「Cookie バナー」になるわけだ。今回は、実世界でどのようなバナーが提供されているのかを見ていく。


## Cookie Banner

Cookie Banner, Cookie Notice, Cookie Consent など表現は色々あるが、要するに同意取得のために画面に追加される UI をこのように呼ぶ。

パターンは以下のようなものが多いだろう。

- 画面の下に Window 幅で Sticky
- 画面の上に Window 幅で Sticky
- 画面右/左下に必要幅で Popup

多くの開発者が知りたいのは、ここに何を書くかだ。もっと言えば、コピペすれば終わりなコード片を求めているだろう。

しかし、ここまで話したように、ユーザの情報をどのように扱っているかはサービスによって全く異なるし、そこでどういう同意取得が求められているかも、適用される法律によって微妙に異なる。つまり、「これを貼っておけばよし」とはならないのだ。

立法側ももちろんそうしたコンポーネントのようなものを提供しているわけではなく、提供しているのはあくまで法律だ。一般的に法律は解釈と判例に基づいて運用されるため、自分が実装した結果が正しいかどうかも「Ask your lawyer」ということになり、最終的には裁判をしないとわからないところがある。

もちろん、筆者も「このように実装すべき」といったアドバイスをする立場ではなく、またその責任を負うものではない。

それを踏まえた上で、実装するための手掛かりになるものをいくつか紹介していく。


## 必須の Cookie

「Cookie の利用に合意をとる」と言っているが、ここまでの成り立ちを考えると「トラッキング目的の 3rd Party Cookie の利用に合意をとる」という目的であることがわかるだろう。

したがって、「Cookie を使うならなんでも合意が必要」というわけではないと解釈される。例えば Session を維持するための Cookie にまで合意が必要なわけではなく、これをユーザが拒否してショッピングカートが使えなくなっても、それはユーザが求めるプライバシー保護とはいえないだろう。

こうした Cookie は「必須の Cookie」とみなされ、合意取得の対象外とされている。

例として、 GitHub は 2022 年に全ての Cookie バナーを削除すると発表した。これは、必須 Cookie のみの利用にとどめたという意味だ。

- No cookie for you - The GitHub Blog
  - https://github.blog/2020-12-17-no-cookie-for-you/

ただし、これを「1st Party Cookie の利用には合意がいらない」と解釈するのは非常に怪しい。

各法律の目的は「3rd Party Cookie の利用を規制」することではなく、「ユーザのプライバシーを守る」ことが目的だ。たとえ 1st Party Cookie でも、それを用いて 3rd Party と連携し、かしらのトラッキングを実現しているような場合は、合意取得の対象となることだろう。

法律の目的が、実装方法の規制ではないという点は、再度認識しておくべきだろう。


## ガイドライン

GDPR は「同意についてのガイドライン」を公開しており、個人情報保護委員会による訳が公開されている。

- Guidelines 05/2020 on consent under Regulation 2016/679
  - https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf
- 同意に関するガイドライン 05/2020 - 個人情報保護委員会 - (ppc.go.jp)
  - https://www.ppc.go.jp/files/pdf/doui_guideline_v1.1_koushin.pdf

筆者の感覚では、どの法律も細かい差異はあれど目的はほとんど一緒で「ユーザのプライバシーを守る」であるため、例えば GDPR に準拠すれば、他への対応はそこまで大きな飛躍はないと考える。その意味でも、世界で広く適用された GDPR のガイドラインは、他の法律に対応する上でも参考になるだろう。

特に注目したい点が、以下の 4 項目だ。

- freely given
  - 自由に選んでる、つまり同意の圧力をかけられたりしていない。
- specific
  - 特定されている、つまりどのデータが何に使われてるのが「それぞれ個別に」同意できる
- informed and
  - わかるように説明を受けている、要するに「専門用語でユーザを捲し立てて取った同意」は認めない
- unambiguous indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her.
  - 本人の明確で積極的な意思表示によって得た同意が必要
  - 「デフォルトで同意になっておりあとで無効にできる」ではなく「自分で同意ボタンをクリックする」である必要がある


## 欧州委員会

最初は EU の政策執行機関である欧州委員会のサイト。 GDPR の実装でいえばある種のお手本と捉えられるだろう。

- European Commission, official website (europa.eu)
  - https://commission.europa.eu/index_en

バナーはサイト下部に Window 幅のパターンで実装されている。

![欧州委員会の Cookie Banner](europa.eu.png#2442x460)

まず、文言を見てみる。

> This site uses cookies to offer you a better browsing experience. Find out more on [how we use cookies.](https://commission.europa.eu/cookies-policy_en "https://commission.europa.eu/cookies-policy_en")

シンプルにまとめ、詳細は別ページにしている。

そして、ボタンとしては `"Accept all cookies"` と `"Accept only essential cookies"` の二択となっている。後者が「必須 Cookie だけ許可する」にあたる。ここを "essential" じゃなくて "necessary" と表しているサイトもある。

このボタンを明示的に自分でクリックすることが、さっき言ったような条件を満たしてるわけだ。ここで Deny だけあって Deny しなかったら同意とみなすや、あらかじめチェックボックスをチェックしておく、 Accept だけ表示して Deny はリンク先に隠すといった実装は、ガイドラインに違反してると判断されかねないだろう。

"how we use cookies" のリンク先に以下のページがある。

- Cookies policy (europa.eu)
  - https://commission.europa.eu/cookies-policy_en

このページでは「Cookie とは何か」から始まって、「なぜ、どのように使っているのか」といったことも全部説明している。これが「十分な説明」の実装ということだろう。

特に注目したいのは以下のテーブルだ。

![Cookie の名前や用途のテーブル](europa.eu.cookie-table.png#1644x2058)

サイトで利用する全 Cookie の名前と、目的、そして保存期間までがリストになってる。

かなりの数があるが、どれが何に使われているかが明確になっている。実装する側としては、ここのテーブルを実装と同期するのは大変そうだ。


## ドイツ連邦政府

- Website of the Federal Government | Bundesregierung
  - https://www.bundesregierung.de/breg-en

こちらは、サイトの上部に Window 幅 Sticky のパターンで実装されている。

![ドイツ連邦政府の Cookie Banner](bundesregierung.de.png#2348x1000)

今回は少し複雑で、必須 Cookie だけあらかじめチェックが入ってる。そして、追加で Statistics を選ぶことができる作りだ。 "Select all" すると "Statistics" も選ばれるが、おそらくもっと多くの用途で Cookie があっても、選択肢が増やせる使える作りにあらかじめ実装されているのだろう。

"Confirm selection" するとバナーが消え、選択結果が Cookie として保存される。なお GDPR では、合意をとる前に Cookie を用いることはできないと解釈されているため、この時点で JS から Cookie を保存するのが一般的だ。従って `HttpOnly` にはできない。

![選択結果が反映されたことを保存する Cookie](./bundesregierung.de.cookie.png#1738x192)

なお、一旦バナーは消えるが、この同意は簡単に取り消せる(オプトアウトできる)必要がある。そのため、ページ下部にある "Privacy Settings" のリンクから、またバナーを出すことができる。

次はポリシーのページだ。

- Data Privacy Policy (bundesregierung.de)
  - https://www.bundesregierung.de/breg-en/service/data-privacy-information/data-privacy-policy-1534306#[anker]

GDPR に準拠していることや、使っている Cookie の値も書かれている。

![使っている Cookie の値の説明](./bundesregierung.de.explanation.png#1912x2294)


## イギリス政府

- Welcome to GOV.UK (www.gov.uk)
  - https://www.gov.uk/

次はイギリス、こちらもページトップの実装だ。

![イギリス政府サイトの Cookie Banner](gov.uk.png#1628x648)

もうここはいいね。注目は View Cookies のページ。

- Cookies on GOV.UK
  - https://www.gov.uk/help/cookies

このページは、さらに詳細な Cookie の説明を別ページにし、その上で以下のような設定 UI を持つ。

![イギリス政府の Cookie についての説明のページ](gov.uk.explanation.png#1372x2434)

ここでは、三つの Cookie について個別に設定できるようになっている。

- GA, SpeedCurve による measurement
- YouTube などによるコミュニケーションとマーケティング
- ユーザの設定保存

最初の "Accept Additional Cookies" すると、これが全部有効になり、ここで GDPR が求める「用途ごとに同意が必要」を実現しているわけだ。

前 2 つはわかるが、最後の「ユーザ設定」は言語設定やダークモードといったものだろうか? 筆者としては、それはファーストパーティーの必須機能の一つとして考えて良いのではと思うが、こうした部分も "Ask your lawyer" しないと確信が持てないあたりは、開発者としてはむず痒い。


## Guardian

政府系以外も見てみよう、メディア系の例として Guardian のバナーが以下。

![Guardian の Cookie Banner](guardian.png#2314x2538)

割と大きめに表示し、かつ背景をブラーしている。これはどちらか選ばないと先に進めないという作り。

こういう作りを "Cookie Wall" などと言い、特に広告収入が重要なメディア系企業では良くある作りだ。昔はここで同意しないとサイトが閲覧できないといった実装もあったが、 GDPR 的には良くないという解釈が広まったのか、今は Reject できるようになっている。

Manage or reject を選ぶと、以下のポップアップが出てくる。

![Guardian の Cookie Settings](guardian.settings.png#1128x2360)

結構複雑で、一般ユーザが読んでわかるかは疑問だ。

これも用途ごとの合意という UI になっていることはわかる。そして上に小さく "Reject All" があるのを見つけられると、全体のオプトアウトになる。

ちなみに、これをしないとサイトのヘッダに常に広告が出る。最初に思わず "Accept" した場合は、やっぱりサイト下部の "Privacy Setting" リンクから、バナーを出せる。いつでも簡単にオプトアウトできる GDPR の条件を満たしているといえるだろう。


## Financial Times

[Financial Times (ft.com)](https://www.ft.com/)

同じくメディア系企業である Financial Times。ここはポップアップ実装だ。

![Financial Times の Cookie Banner](financial-times.png#982x600)

Manage cookies の UI もわかりやすい。

![Financial Times の Manage Cookies](financial-times-manage-cookies.png#1348x2182)


## デジタル庁

さて我が国はどうだろう?最後は日本を代表してデジタル庁

[デジタル庁 (digital.go.jp)](https://www.digital.go.jp/)

![デジタル庁のトップページ](digital.go.jp.png#2440x906)

特に Cookie バナーは無いようだ。

プライバシーポリシーを見る。

![クッキーの利用に関する説明](digital.go.jp.cookies.png#2412x1800)

アナリティクスツールである User Insight を入れているようだ。 Cookie 自体は 1st Party のようだが、ネットワークをみると外部に送ってるように見える。

![リンクされているユーザローカルのページ](userlocal.jp.policy.png#2140x1622)

ユーザローカルのページに行くと、ここにはオプトアウトの UI がある。

これは、各種要件を満たしているのだろうか? こうした部分の判断に自信が持てないのがむず痒いが、デジタル庁のサイトだからさすがに大丈夫だと信じたい。。

一応問い合わせが可能であったため、改正電気事業者法等に沿っているのかといった解釈について問い合わせをしてみた。2 週間ほど前に送ったが、返事はいまのところない。もし返事があれば、本エントリを更新したいと思う。

ということで、いろいろな Cookie バナーを見てきた。

もし今バナーを出しておらず「もしかして、出さないといけないのでは?」と思ったら「なんの法律に基づいて」「誰の何に対する同意を」「どういう実装で取得するのか」といった点を整理し、実装の際は "Ask your lawyer" で確認することをお勧めする。