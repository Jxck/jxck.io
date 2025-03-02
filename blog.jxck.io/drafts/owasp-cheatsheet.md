# [cookie][owasp][security] OWASP に Cookie Cheft 対策 CheatSheet を執筆した

## Intro

OWASP に Cookie Cheft 対策の CheatSheet を提案し、マージされた。


## Cookie Cheft

2FA や Passkey の普及により、Password そのものを盗んだとしても、可能な攻撃は限られている。

一方 Session Cookie は、認証済みであることを示し(Proof of Authentication)、かつ持っているだけで効果を発揮する値(Bearer Token)であるため、Password 以上に盗む価値がある。

Session Cookie が盗まれれば、いかに Password を無くしていようが、Passkey をデプロイしていようが、何段階の認証にしようが、全ての努力は水の泡なのだ。

従って「Session Cookie を盗まれないようにする」のが重要だが、それはサービスにとっては従来も同じだった。しかし、クライアントも攻撃の対象となりえる。

よく言われるのは、マルウェアをインストールさせ、ブラウザが保存する Cookie を盗む方法や、フィッシングサイトで入力させた値を本家サイトに転載し、払い出された Session Cookie を窃取する Proxy 型の攻撃だ。

従って、本来であれば Cookie を「盗んでも使えない」値にするために、公開鍵暗号などの方式で送信者が意図したものかを確認する方式が理想であり、それが現在提案されている Device Bound Session Credentials に繋がる。

しかし、その標準化と普及にはまだまだ時間がかかるため、現状でも「Cookie が盗まれた場合に、迅速にその事実を検出する」という対策が必須となる。

これが Cookie Cheft Mitigation だ。


## Cookie Cheft Mitigation

Cookie Cheft Mitigation は、要するに「今まで送ってきたユーザと、大きく異なる属性のユーザが送ってきたら、それは盗まれている可能性がある」とみなすのが、基本的な考え方だ。

わかりやすく言えば、「Cookie を発行したときは日本の IP アドレスだったユーザが、急にロシアからアクセスしてきた」などと言う場合は、なんらかの攻撃にあっている可能性がある。といったものだ。

こうした対策自体は、理論的には既知であり、多くのサービスが実装しているだろう。自前で実装していなくとも、WAF などがサービスの一部にそうした機能を提供している場合も多いはずだ。

しかし、体系立てて「こうした対策が必要である」ことと、「具体的にどう対策すべきか」は、何故かあまり知見が共有されて来なかった。と、少なくとも筆者は感じている。

その代表例として、様々なセキュリティ対策ガイドライン(チートシート)を公開している OWASP には、この話が一切書かれていなかったのだ。

Password Less が進み、認証プロセスが強化された今こそ、次なるターゲットとなりうる Cookie Cheft Mitigation について、OWASP はチートシートをまとめた方が良いのではないか?というのが筆者の発想だった。


## OWASP への提案

OWASP には、筆者が現在執筆している原稿を、一部切り出してまとめたものをドラフトとして提案した。

丁度 Slack も同等のことをブログで公開した良いタイミングであったため、中の人を loop-in しつつ議論を進めた。

- Catching Compromised Cookies - Engineering at Slack
  - https://slack.engineering/catching-compromised-cookies/

特に大きな反論もなく PR の提出まで進み、Editorial な編集だけで大きな変更もなくそのままマージされた。

既に OWASP のサイトで公開されている。

- Cookie Theft Mitigation - OWASP Cheat Sheet Series
  - https://cheatsheetseries.owasp.org/cheatsheets/Cookie_Theft_Mitigation_Cheat_Sheet.html

CheatSheet は、いわゆる概要レベルの解説が基本であるため、細かい実装に踏み入る内容までは書かれてない。

しかし、この CheatSheet をたたき台に、今後の Cookie Cheft 事情のアップデートがマージできる場となればと思う。


## Outro

OWASP の他の CheatSheet は、長い事継ぎ足しで更新されているため、少しチグハグになっている部分もある。

今回のコントリビューションを足がかりに、そうした既存部分の更新にも貢献していきたいと思う。