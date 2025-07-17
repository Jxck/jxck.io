# [passkey] Passkey への道 #7: そして Username-Less へ

## Intro

Apple が突如発表した Passkey。

実態は「WebAuthn の秘密鍵を iCloud で共有」するサービスだった。

そして、業界は本格的な Password-Less に向けて進んでいく。


## Passkey と FIDO

Passkey は Apple のサービスとして始まったが、単なるいちベンダのサービスでは終わらなかった。

もともと生体認証を牽引していた FIDO を中心にこの方式についての議論が行われ、最終的には業界全体が Passkey を用いて Password-Less を目指す方向で概ね合意することになる。

Apple 以外のパスワードマネージャも Passkey に対応(つまり、秘密鍵を登録しそれを共有する)ようになり、様々な場所で Passkey への移行が啓蒙されるようになった。

ちょうどコロナ禍と重なるくらいの時期だ。

ちなみに、ここまで WebAuthn の鍵と言っているものは、FIDO では "FIDO(2) の Credential" という呼称になる。

ところが、FIDO の中では「Passkey」=「共有された FIDO Credential」ではないことになった。

これだけ「共有されることが革新だった」という話をしてきたが、厳密にはそれは FIDO の言う Passkey にとって必要条件ではない。

FIDO にとって大事なのは、どちらかというと Discoverable Credentials や Resident Key と呼ばれるものだ。


## Username-Less

安い YubiKey や Titan の Security Key には、単純に「秘密鍵の入ったデバイス」なものもある。こうしたデバイスは、スマホ/PC での保存を Platform Authenticator と呼ぶのに対して、Roaming Authenticator と呼び分ける。

Roaming Authenticator の場合、WebAuthn の API を使うと、その秘密鍵からサイトごとの公開鍵を作成し、サイトのドメインに紐づけて保存するが、このとき、自身は「どのサイトに使う鍵を保存しているか」は知らない場合がある。WebAuthn の API で、鍵の ID を知らされてそれを返すだけだ。

しかし、このとき生成した鍵に紐づけて、「どのサイト用」「どのアカウント用」などの情報を紐づけて保存できると、以下のようにポップアップで「保存している Passkey」一覧を表示できるのだ。ここにアカウント名(Email など)が同時に表示されているため、選んでクリックするだけでログインできる。

![passkey を用いた username-less ログイン](username-less.png#555x314)

つまり、ユーザは「ユーザ名」すら入力していないのだ。この状態は Password-Less の先にある **Username-Less** な状態と言える。

このように、ユーザ情報も紐づけて保存している鍵が、前述の Discoverable Credentials や Resident Key と呼ばれるもので、これが保存できる Authenticator では Username-Less が実現できるのだ。


## Passkey の定義?

実は、FIDO における Passkey とは、この Discoverable Credentials、つまり Username-Less が実現できる状態を指すことになった。これをクラウドで同期するかどうかは、Passkey そのものとは関係ない、オプショナルなものであるという立場だ。

- Passkeys: Passwordless Authentication | FIDO Alliance
  - https://fidoalliance.org/passkeys/

なお、Username-Less で入れるということは、その Authenticator さえあれば他に何もなくログインできてしまう。したがって、必ず User Verification つまり、指紋や顔認証などを用いた「本人確認」が必要となる。スマホであれば何度も言っているアンロックプロセスがそれにあたり、Roaming Authenticator の場合も、単なるタッチではなくちゃんと指紋を登録し確認するタイプの Authenticator などであれば、Passkey と言えるのだ。

この User Verification が生体認証で行われている限りは、実質的に二要素認証と同等の安全性が見込めることも、Password/Username-Less が従来の Password+TOTP より安全である根拠にもなっている。つまり、Username-Less できる記憶領域があり、生体認証できるなら、パスワードマネージャと呼ばれるものではない、単体デバイスの Roaming Authenticator でも Passkey を保存することは可能だ。つまり、「Passkey にはパスワードマネージャが必要」ではないということだ。

ところで、FIDO には Passkey について色々書かれており、公式ロゴっぽいものも公開しているが、FIDO が Passkey という標準を決めているわけではない。Password に仕様がないように、IETF や W3C を探しても "Passkey" という標準仕様は無いのだ。あくまで WebAuthn などの「ユースケース」であり、iCloud などのサービス固有の名前ではない「普通名詞」であり、従来の認証を次に進めていくための「ブランド」のような立ち位置になっている。

「Passkey の定義は?」という質問に対する説明の歯切れが悪くなりがちなのは、こうした微妙な構図がある。したがって、一般ユーザの視点で言えば「何も入力せず、タップだけでログインできれば Passkey」くらいの認識で問題ないとも言える。


## Single Factor Auth via Passkey

さて、User Verification さえすれば、アカウントを選ぶだけで入れる。つまりこれは Single Factor Auth だ。

さんざん 2FA で堅牢に、と言ってやってきた今、行き着く先が 1FA で良いのだろうか?

実は Passkey は、これまでの認証の問題だった点を、基本的にはすべてカバーできている状態とみなされる。

- 使い回せない
- エントロピーも高い
- 平文文字列を使わない
- ドメインの機械的検証ができる
- 簡単には盗めない
- 使用時に生体などでユーザ認証
- 同期できれば詰むこともない

つまり、ここに余計なプロセスを追加する必要はないほど、単体で十分堅牢なのだ。

今の認証の暫定的なゴールは、Password も TOTP もやめ、Passkey で Password/Username-Less を実現し、詰まないためにそれをクラウドで同期する。ユーザは、そのパスワードマネージャの管理だけに集中すれば良い、という状態なのだ。

ユーザもサービスも、基本的にはその方向に進んでいくのが、令和における認証の目的地と言えるだろう。


## 認証をロックインしたいベンダの陰謀?

Passkey の管理は、人間が記憶などに頼って行うことができない(させないのが目的)。

したがって、何かしらの Platform / Roaming Authenticator を用意する必要が出てくる。これらは Passkey の管理という面で、まとめて「Passkey Provider」と呼ばれたりもする。

中には、Passkey はパスワードマネージャが必須で、そこを握ればユーザの認証を大きく押さえることができるため、ベンダとしてはビジネス上有利になる。だからユーザを自社のパスワードマネージャに移行させようとしている、という論調もある。

仮にビッグテックがユーザのアカウントを抑えることでロックインしたいと思うのであれば、抑えるべきは Passkey よりアカウントの源泉である「メール」の方だろう。パスワードが他者のパスワードマネージャに保存されても、特にデメリットはなかったのと同じだ。それが Passkey に置き換わったときに、ベンダの陰謀を持ち出す論調は少し雑がすぎると、少なくとも筆者は感じる。

あらゆるサービスが Passkey への移行を呼びかけるのは、**いよいよ Password に限界が来ている** からだ。そして、その保存先が何であれ Passkey に移行してもらわない限りは、サービスがユーザを守りきれるか怪しい局面まで来ていることの現れだと、素直に受け取ったところでユーザに大きなデメリットはない。

例えば、最近 [20 億を超えるユーザに対して移行を啓蒙している Gmail](https://news.yahoo.co.jp/articles/4156cd473dc89d7c650b7ef76d8af06844412d08) にしてみれば、保存先が iCloud だろうとなんだろうと、とにかく Passkey を使ってもらうこと自体の方が優先度が高くなる。Gmail が攻撃されたときの被害に比べれば、別ベンダの Passkey Provider を使っている事実は些末なことだ。

もし、ビッグテックの Platform Authenticator が嫌なのであれば、好きな Passkey Provider を使えばよい。パスワードマネージャで同期されることに違和感を覚えるなら、Roaming Authenticator を買ってくれば良い。

実際、一般ユーザにとっては、共有されることで「詰み」を回避するインセンティブがあるが、別手段でなんとでもできるエンタープライズでは、ベンダに依存しないために、生体認証が可能な物理デバイス(User Verification が可能な Roaming Authenticator)を配布することもあるだろう。このあたりに、FIDO で Passkey に同期を必須にしなかったことが効いてくることになる。

同時に、Passkey を Authenticator 間で安全に共有できるようにする仕様も検討されている。これを使えば、iCloud で作った Passkey を Google Password Manager にも移せるということだ。ユーザは対応する任意の Passkey Provider を選択でき、ロックインを逃れることができるようになる。

- FIDO Credential Exchange Specifications | FIDO Alliance
  - https://fidoalliance.org/specifications-credential-exchange-specifications/

こうした仕様を議論する FIDO の円卓には、Google, Apple, MS といった Platform Authenticator 提供ベンダも並んでいるのだ。

「ロックインされたくないから Passkey を使いたくない」という姿勢は、ロックインされない方法で Passkey を導入する方法を知らないことの表明でしかない。

「Passkey はベンダの陰謀だ」とするのは自由だし、使わないのも自由だが、それはもう反ワクチンなどに近い論争に思える。


## 企業における Passkey

企業は情シスなどが主導し、ルールを策定することで、認証強度がコントロールされるのが一般的だ。

今だと「TOTP を必須」にし、社員に配った社用スマホで SMS 認証させたりしているだろう。

それを根拠に、「TOTP の二要素認証を必須にしており、十分なセキュリティ対策をしているため、Passkey に移行する必要はないという認識だ」といったポリシーも、今は多いだろう。

ここまで解説してきたことからもわかるように、TOTP の二要素であれば、昨今発生している攻撃に対しては、対策として不十分、というか対策したことになっていないのだ。

直近でも、多くの企業がサイバー犯罪の被害を受け、甚大な損害を出していることが、連日報道されている。これらのきっかけは、金融口座乗っ取りなどと同じように、フィッシング詐欺や Infostealer によって突破口を開いた例も複数ある。

たとえば、以下のような攻撃だ。

- LinkedIn からリクルーターとしてコンタクトし、入社試験のためとして GitHub を Clone-Init させたら、それがマルウェアだった。
  - https://www.npa.go.jp/bureau/cyber/pdf/020241224_pa.pdf
- DeepFake の動画で知人になりすまし Zoom 会議に参加、声が聞こえないから解決のためにドライバを更新してほしいと、マルウェアのリンクを送って感染させる。
  - https://internet.watch.impress.co.jp/docs/column/netliteracy/2025729.html

人を狙うのは、機械よりも人間の方が騙しやすいからだ。企業には社員の数だけ脆弱性があり、攻撃者からすればそのどれか一人を落とせればよいだけなので、一度ターゲットにされれば基本的には逃げきれない。

落とした一人を皮切りに、そこから社内に潜入し、全てのデータを暗号化した上で身代金を要求したり、仮想通貨をまるっと盗み出したり、顧客情報を全て盗んでダークネットで売り捌いたり、なんとでも攻撃はできる。翌日には新聞に載り、記者会見で頭を下げ、復旧作業のために数週間働き詰めになっても、「対策に問題はなかった」と言い切れるだろうか。

何かに入られるということは、何らかの形で認証が突破されたということだ。もちろん、Passkey にしたら完璧な防御になるわけではない。むしろ、今後はやっていて当たり前の対策になっていく。これだけ攻撃が多様化していることを考えると、「TOTP 必須だから大丈夫」という認識がもう平成のものなのだ。

もうしばらくは、大きな企業被害が続き「原因は Passkey への移行をしなかったから」といった記事が出たり、より強制力の強いガイドラインなどで必須にならない限り、この層を動かすのは啓蒙だけでは無理だろうと思う。

ただ、会社で必須でなくても、個人的に Passkey に移行するのは可能なサービスが多い。突破口に自分がならないために、Passkey に移行しておく、という自衛はあるだろう。そこで Passkey に移行できるように、パスワードマネージャなどを導入して基盤を整えておくのは、リテラシの範囲だ。

Passkey を使える状態にしておくのは、もう自分の金融口座や SNS の裏垢を、盗まれないように守るだけの話でもないのだ。


## Links

- [Passkey への道 #0: Intro](https://blog.jxck.io/entries/2025-07-07/load-to-passkey-0.html)
- [Passkey への道 #1: 平成の Password 感](https://blog.jxck.io/entries/2025-07-08/load-to-passkey-1.html)
- [Passkey への道 #2: 2FA/TOTP](https://blog.jxck.io/entries/2025-07-09/load-to-passkey-2.html)
- [Passkey への道 #3: 手入力の限界](https://blog.jxck.io/entries/2025-07-10/load-to-passkey-3.html)
- [Passkey への道 #4: 文字列の限界](https://blog.jxck.io/entries/2025-07-11/load-to-passkey-4.html)
- [Passkey への道 #5: 2FA/WebAuthn](https://blog.jxck.io/entries/2025-07-12/load-to-passkey-5.html)
- [Passkey への道 #6: タブーを破った Apple](https://blog.jxck.io/entries/2025-07-13/load-to-passkey-6.html)
- [Passkey への道 #7: そして Username-Less へ](https://blog.jxck.io/entries/2025-07-14/load-to-passkey-7.html)
- [Passkey への道 #8: サービスにとって「移行」のゴールは何か?](https://blog.jxck.io/entries/2025-07-15/load-to-passkey-8.html)
- [Passkey への道 #9: ユーザに求められる令和のアカウントリテラシ](https://blog.jxck.io/entries/2025-07-16/load-to-passkey-9.html)