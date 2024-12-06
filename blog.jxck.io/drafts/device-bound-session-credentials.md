# Device Bound Session Credentials による Cookie Theft 対策

## Intro

Chrome チームより提案された Device Bound Session Credentials の実装が進み、 Flag 付きで試すことができる。

この提案の背景と、解決する問題、現時点での挙動について解説する。

## 背景

2FA や Passkey の普及により、認証部分はかなりセキュアになってきた。インシデントによりパスワードが漏洩しても、それだけでなりすましを成立するのも困難になっている。

そこで攻撃者の注目をあつめているのが、 Cookie の窃取(Cookie Theft)だ。

認証がいかに強固になっても、有効な Session Cookie を盗むことができれば、その値を `Cookie` Field に付与してリクエストするだけ、なりすましを成立されることができる。

いわゆる Session Cookie は Proof of Authentication であるため、その有効期限内はユーザの持つ権限と同等の操作が可能になるが、 Bearer Token であるため誰が送ってもその効果を発揮してしまうためだ。

いかに Cookie を守るのかは、今後の Web セキュリティの 1 つの重要なトピックと言える。

## Cookie をどう盗むか

HTTPS が前提となり、通信が暗号化されているのだから、 Cookie を盗むのは難しいと考えるかもしれない。

しかし、 Cookie Theft の攻撃ベクタは通信ではなく、マルウェアやフィッシングによるものとされている。

### マルウェア対策

Cookie はあくまでブラウザがローカルに保存している値であるため、ユーザの権限でインストールされたマルウェアは、保存されたファイルにアクセスできてしまうのだ。

なお、昔のブラウザは、それこそ平文でファイルに保存されていたりもしたが、さすがに今はそこまで脆弱ではない。

例えば Chrome は様々なデータをローカルの SQLite に保存することが多いが、Cookie に関しては Mac の Keychain, Linux の Kwallet
 など、アプリからしかアクセスできない安全な領域に保存している。

ところが Windows は、 DPAPI というログインユーザ権限で実行されたアプリからはアクセスできてしまう領域にあるため、これを App-Bound Encryption という機能で保護する変更が進んでいる。

- Improving the security of Chrome cookies on Windows
  - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html


### フィッシング対策

マルウェアよりも簡単なのは、ユーザの方を騙す手口だ。

フィッシングサイトでログイン画面を偽装し、 ID/Password を窃取する方法は知られていたが、二段階認証等があれば Password だけを盗まれても攻撃のリスクは減らせる。しかし、入力された ID/Password を裏で Proxy して本サイトに転記し、同様に TOTP Token などもユーザに求めてそれを転記すれば、フィッシングサイトの裏にいる攻撃者が、ログイン済みの Cookie 発行を受けることができる場合がある。

ユーザは本サイトにリダイレクトしておけば、「なんかログインできなかった」ともう一度正規のログインを行うだけなので、一般ユーザだと攻撃されたことすら気づけないかもしれない。

偽のサイトであることをドメインで気づくのが第一の策であるため、各ベンダーはパスワードマネージャを推奨し、機械的に偽ドメインに気付けるようにユーザへの啓蒙を進めている。パスワードマネージャの普及が求められるのは、忘れるから簡単な文字列が使われることだけではないからだ。

## Cookie Theft 対策

Cookie が Bearer Token である以上、送られてきた値が Valid でも、それが窃取されたものかどうかは確信が持てない。

そこで、 Session に紐づけてメタ情報を保存しておき、ユーザの行動に発生する変化を監視する方法が知られている。

ベクタとしては以下のようなものだ

- IP
- User-Agent
- Accept
- Accept-Language
- Sec-Fetch-*

これらの値をリクエストから取得し、 Cookie を発行した時と値が変わっていれば、それは窃取され他のユーザから使われている可能性が高い。

偽陽性があるため確実ではないが、安全側に倒し再認証や CAPTCHA を挟むことで、リスクを低減する方式は広く実装されている。

(Private Relay を有効にしていると、Google で CAPTCHA が頻出するなど、不便もあるため閾値は難しいが)

Slack は、タイムスタンプなどの要素も追加することで、より強固な対策を実施している。

- Catching Compromised Cookies - Engineering at Slack
  - https://slack.engineering/catching-compromised-cookies/









## Cookie をどう守るか

「盗まれないようにする」のと同じように、「盗まれても大丈夫にする」という対策も考えられている。

そもそも、 Session Cookie が Bearer Token であることは、扱いを容易にする一方で、前述のような攻撃に対して本質的に脆弱だ。



そこで、 Cookie を「送ってきた人が誰か」を確認できる Sender Constraint 