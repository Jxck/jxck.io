# [passkey] Passkey への道 #9: ユーザに求められる令和のアカウントリテラシ

## Intro

サービスは、ユーザを守るために Passkey をサポートし、ユーザの移行を促す努力をする必要があった。

このプロセスに対して、ユーザはまったくの受動的態度でいることはできない。

では、ユーザはいったい何をリテラシとして身につけ、どう自分の身を守っていくべきなのだろうか?


## パスワードマネージャという基盤

ユーザに「今すぐ Passkey を理解し、導入移行すべし」と言いたいところだが、それはさすがに飛躍が過ぎるだろう。

仮に、あまねくサービスが Passkey 対応を終わらせ、あとはユーザ次第という状態であれば、その態度もあり得るかもしれないが、現実は非常に中途半端な過渡期で黎明期だ。

今すぐにでもユーザが取り組めて、この先様々なフェーズに柔軟に対応していく現実的な解は、「**パスワードマネージャを導入する**」ことだろう。

平成においてパスワードマネージャは、セキュリティリテラシの高いユーザが、それなりのハードルを超えて導入する「プロユース」なものだった。

啓蒙する立場の専門家も、「使ってもらえれば理想的だが、一般ユーザに強制まではできない」という落とし所だっただろう。

しかし、国民のほとんどがスマホを持ち、大半が Android か iPhone である現状、実際には目の前にもうそれはある。あとは、ユーザが手を伸ばすかどうかだ。

まずは自分の持っているパスワードや TOTP を、すべてパスワードマネージャに記憶させ、必ず Autofill でログインできる状態にする。

あとは、サービス側の Passkey サポートを、パスワードマネージャを経由して知り、パスワードマネージャの助けを借りて登録していく。

これをせずには、ユーザが自分の身を守ることも、サービスがユーザを守ることも難しい。

令和における、アカウント管理のリテラシの下限は、パスワードマネージャの導入に始まると言っても過言ではない。


## 社内ポリシー

企業において、「社員に配ったスマホに、SMS TOTP で二要素認証を必須としているため、セキュリティ対策としては十分である」という認識を持つ会社も多いだろう。

しかし、それはもう十分ではない。

いざ社員のアカウント窃取に起因したインシデントが発生した際に、情シスなどが「十分に対策を講じていた」と主張しても、それで通すのは難しくなっていくだろう。

社員のセキュリティ基準を決める立場であれば、「パスワードマネージャの導入が必須」というルールを強いても、もはややり過ぎではない。社員の反発やコストなど、色々とやらない言い訳は並ぶだろうが、後手に回って攻撃が先立ってからでは遅い。

特定のパスワードマネージャを使うのが難しければ、Roaming Authenticator などのソリューションを導入して、社員に配っても良いだろう。保存容量が足りて、壊れても困らないサポート体制ができるなら、パスワードマネージャであるかどうかは問題ではない。

実は、意外とエンタープライズ方面でソリューションが充実していないような気もする。製品が無いわけではないが、ちょうど良いものがない、といった話もちらほら聞く。エンタープライズのアカウント管理は十人十色なため、対応するための業界の成熟も、急がないといけない課題だとも感じる。


## パスワードマネージャの選定

選択肢はかなり増えてきた。特に Google, Apple, Microsoft が、OS に同梱するマネージャを出してきたことで、Android(Google Password Manager),iPhone(Passwords), Windows PC(Hello) など、その世界で閉じた活動をしている人は、長いものに巻かれるだけで良くなってきている。これは、リテラシが高くないユーザをリードするには、最も有効な手段だろう。

一方、政治的な信条でビッグテックにロックインされたくないユーザや、複数のデバイス/OS を並行して使い、ユニバーサルなパスワードマネージャでなければ運用が面倒なユーザは、独立したソリューションを導入することもできる。

- 1Password
- Enpass
- LastPass
- Bitwarden
- etc etc

他にも、セキュリティ対策ソリューションに付いてくるものなど、様々なものがあり筆者も把握しきれていない。

なお筆者は、Mac, iPhone, Android, Windows, Linux 環境で、全メジャーブラウザを使い分けているため、全部がだいたいサポートされている 1Password をメインで使っている。

さらに 1Password は、単にアカウントを管理するだけではなく、それを共有する機能や、CLI によって自動化に応用する機能、ファミリープランなど、便利な部分が色々あるため、利害関係はまったくないが他人にも勧めている。利害関係があるわけではない。


## 集約と死守

Apple, Google, MS, 1Password なんでも良いが、導入する対象が決まったら、そこにきっちりとアカウントを集約するのが良いだろう。

パスワードや TOTP から、Passkey まで全部だ。そこを起点に、最終的には Passkey による 1 要素認証での Username-Less ログインに向かう。

したがって、よく言う「TOTP まで入れたら 1 要素 2 段階で〜」などという話は、気にしないで良い。そもそもそれは脆弱で、捨てていくべき方式だからだ。

また、大抵の製品はパスワードをエクスポートできるし、今後は Passkey も移行手段を提供していく方向なので、過度のロックインを気にする必要もないだろう。

最も注意したいのは「**パスワードマネージャには Passkey では入れない**」ところだ。もちろん、対応するソリューションもあるかもしれないが、「じゃあその Passkey は何で管理するのか?」といった問題が出てくる。

認証を集約したルートにあるパスワードマネージャは、基本的には記憶に頼るパスワードで入ることになる。つまり、Password-Less と言っているが、この「**最後のパスワード**」に集約していく Less-Password が実態と言える。

言うまでもなく「最後のパスワード」は、それが手に入れば、パスワードマネージャにある全アカウントに入ることができる。逆にこれを忘れると、パスワードマネージャに入れなくなり、すべてのサービスに入れなくなる。

ユーザは、他のパスワードは全部忘れて良い代わりに、この 1 つを十分な長さにし、忘れない/盗まれないよう、死守することになる。


## 1Password のリカバリ

ちなみに、1Password の場合は「パスワード」だけではログインすることができない。

Username + Master Password に加えて、1Password が発行する Secret Key という乱数が必要だ。

これは乱数だが、人間が簡単に覚えられる長さではないので、この値を何らかの方法で「所持」する 2FA に近い扱いとなる。

最初に一度入力すれば良いため、新しい端末でも買わなければ、入力する機会はあまりない。また、1Password 自体にも保存されているため、追加のデバイスログインには、すでにログイン中の 1Password を使った QR ログインなどもできる。

バックアップ用として、この Secret Key の書かれた Recovery Kit という PDF を 1Password が発行するため、それを保管しておけばいい。多くの人が、それを印刷して机にしまったり、Google Drive か何かに入れたりするだろう。

それで本当に足りるだろうか?


## アカウントの防災訓練

例えば、あなたのいる地域で大災害が発生し、体は無事だが持っているものを全て失ったとしよう。あなたは、新しいデバイスを手に入れたときに、無事に 1Password に入れるだろうか?

ここで入れなければ、せっかく生き延びても、それまでのオンライン上の人生を全てリセットすることになる。

印刷していた Recovery Kit は燃え、Google Drive に入るための Passkey も 1Password にある。セッションが生きたスマホも全部流された。詰んだ状態だ。

メールアドレスとパスワードだけで入れるパスワードマネージャは良いが、1Password でそうならないためには、被災してもなんとかして Secret Key だけは取り返せるように、日頃から考えておかなければならない。

方法はいくつかあるが、筆者の場合は以下の対策をしている。

- 燃えないもの(ドッグタグ)に Secret Key を刻印して防災バッグにつけておく
- SMS TOTP で入れるクラウドを一個用意しておき、そこに Secret Key を保管する
- TODO: 次回公開

SMS TOTP に頼れるのは、被災しても「自分が自分であることを証明」できれば、同じ番号の SIM を再発行できるからだ。端末が手に入れば、それを使って SMS が受け取れるため、パスワード + TOTP で入れ、常用していないクラウドサービスに、一見それとはわからない形で Secret Key を保存しておくようにしている。信用できない TOTP も、使いようということだ。

Secret Key と言っているが、実際は Master Password もわからなければ、それだけが漏れてもログインはできない。また、1Password で Secret Key を再生成して変えることもできる。「絶対に漏れてはいけない」だと、リカバリ手段の用意にも詰んでしまうので、少し緩く扱っても良いところは強調しておきたい。


## リスク

もちろん、パスワードマネージャに集約して、そのアカウントを盗まれたり、パスワードマネージャが漏洩をやらかすといった危惧はゼロではない。

パスワードマネージャは、性質上攻撃を集中的に浴びやすい。一方、その死守自体がビジネスであるため、リソースも専門性も集中できる。中核事業の片手間でパスワードを預かっている一般サービスとは、作りが根本から違う。しかし、完璧なソフトウェアも、サービスも存在しないため、絶対にリスクはゼロにはならない。

しかし、現状のアカウント管理の実態が抱えているリスクは、それよりも遥かに大きいものだ。ここを測り間違えると、貸金庫窃盗のニュースを見た人が、「銀行が信用できない」として、家の前の郵便受けに資産を隠すような事態に陥る。


## Outro

様々な攻撃が成功し、現金も株も仮想通貨も稼ぎ放題なサイバー犯罪市場は、Passkey の普及までのボーナスタイムの様相を呈している。

あと 1 年 Passkey の普及が早ければ、防げた攻撃は多々あっただろうと、ニュースを見て痛感する。完全に後手に回っているのは、悔しい限りだ。

過渡期とはいえ、そろそろリテラシが更新されないと、あまり悠長なことは言っていられないという危機感が伝わればと思い、この連載を書いた。


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