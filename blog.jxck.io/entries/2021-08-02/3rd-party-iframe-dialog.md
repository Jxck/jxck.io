# [iframe][security] Cross Origin iframe からの alert/confirm/prompt 呼び出しの無効化

## Intro

直近で話題になっている Chrome の挙動変更についてまとめた。

Reverse OT による延命はあるが、もともとが「セキュリティ的な理由でできなくする」のが目的のため、 OT 期間中に修正が必要そうであることを先に述べておく。

なお、これはあくまで筆者が調べた結果に基づいた見解であるため、該当する開発者は常に公式のアナウンスなどに注意し、最新の情報を踏まえて自身で判断すべきである。


## 問題の事象

周知の通り `alert()`, `confirm()`, `prompt()` は、ブラウザのもつネイティブのダイアログ UI を呼び出す。

この JS は、埋め込まれた `<iframe>` で実行しても、 Top Level Frame でダイアログ UI を表示できる。

しかし、 Chrome M92 からは、 Cross Origin (3rd Party) の `<iframe>` がこれを呼び出しても、ダイアログが出ないというものだ。

これは、 Google のもの含むいくつかのサービスで問題となり、その事象が ML や Issue Tracker などに報告されている。

- 1065085 - Implement window.{alert, prompt, confirm} removal from cross-origin iframes - chromium
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1065085

大きなサービスとしては Salesforce も影響を受けたようで、ユーザに対して Chrome のフラグにより(無効にする)機能を無効にするように案内しているようだ。

- Salesforce functionality impacted in Chrome 92 after recent change to cross-origin iframe JavaScript dialogs
  - https://trailblazer.salesforce.com/issues_view?id=a1p4V000002BRMXQA4


## Remove: Cross origin subframe JS Dialogs

ことの発端は *2020/03/25* に投稿された以下の Intents だ。

- Intent to Remove: Cross origin subframe JS Dialogs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/

ダイアログ(alert, confirm, prompt)を呼び出す JS は、 Top Level で呼ばれたのか 3rd Party iframe で呼ばれたのかがわかりにくいという問題があった。

Chrome の場合は、ダイアログに「*誰がこれを呼び出したのか*」を表示している。

以下は labs.jxck.io のトップレベルで呼び出した場合の挙動だ。

![トップレベルで prompt() を呼んだ場合 "labs.jxck.io says" と表示される](1st-prompt.png#1260x700)

以下は Cross Origin iframe として埋め込んだ lab2.jxck.io で呼び出した場合の挙動だ。

![Cross Origin iframe で prompt() を呼んだ場合 "An embedded page at lab2.jxck.io sayz" と表示される](3rd-prompt.png#1260x700)

ユーザにとってこの表示の意味を理解するのは必ずしも容易ではない。 ただの `alert()` であれば得られる情報はないが、 `prompt()` の場合はユーザに入力を求め、それを JS で取得することができてしまう。

これを利用し、悪意のあるものが 3rd Party iframe から `prompt()` を表示し、ユーザを騙して情報を入力させる攻撃が実際に存在するそうだ。ユーザがこれを、自分が訪れたサイトが出したものだと勘違いすれば、そこでは「*なりすまし*(spoofing)」が成立していることを意味する。「先に進むにはパスワードを入力してください」とでも言われれば、うっかり入れてしまうユーザも存在するだろう。

この Intent to Remove は、ユーザに「この `prompt()` は誰が出しているのか」を UI で説明するのは難しく、それは UI を不必要に複雑にするだけであると説明している。

そこで、以下の理由からこの機能自体を削除しようという提案だ。

- Cross Origin iframe の JS ダイアログの使用率は低い
- JS ダイアログが使用されていても一般的にサイトの主要な機能には必要ない
- ダイアログがどこから来ているのかを確実に説明することが難しい

さらに、 Cross Origin のダイアログがそもそもなくなれば、ホスト名の表示を削除してダイアログをさらに簡素化したり、ダイアログをコンテンツエリアの中央に表示してページの一部であることをより明らかにするよう改善できるといったメリットも説明されている。

Cross Origin iframe が埋め込まれたページにおいては、他にも [Permission を求める際に「誰が求めているのか」をユーザに伝えるのが難しい](https://docs.google.com/document/d/1x5QejvpyQ71LPWhMLsaM1lWCfSsBsSQ8Dap9kJ6uLv0/edit#heading=h.u4dloygy0zkd) という問題も知られているため、これと同等の議論があったと予想される。

Intents には Use Counter も載っているので引用する。

Caption: API ごとの Use Counter
| Feature        | % of Page Loads with usage (from cross-origin iframes) |
|:--------------:|:------------------------------------------------------:|
| window.Alert   | 0.006                                                  |
| window.Confirm | 0.003                                                  |
| window.Prompt  | 0.00006                                                |
| Total          | 0.00906                                                |

しかし、実際に M92 がリリースされてからは、この機能が壊れたことによる影響が多数報告されていたため、実装者が想定していた以上に影響はあったといえるだろう。


## 他のブラウザの反応

実際にロールアウトしたのが Chrome/Edge であったため、いつものように「また Google が勝手にやっている」と思う人もいるようだが、実際には他のブラウザも Positive を表明している。

- Firefox: https://github.com/whatwg/html/issues/5407#issuecomment-606417807
- Safari: https://github.com/whatwg/html/issues/5407#issuecomment-760574422

また、この合意が取れているため、既に仕様にもマージされている。

- Add early return to JS dialogs triggered from different origin-domain iframes by carlosjoan91 - Pull Request #6297 - whatwg/html
  - https://github.com/whatwg/html/pull/6297

それでも、「まだそこにはユースケースがある」と食いつてる Issue は以下にある。

- Cross-origin prompts still have significant use cases - Issue #6897 - whatwg/html
  - https://github.com/whatwg/html/issues/6897

ここでの仕様策定者の反応を見れば、これはもう「*Web において決まった変更だ*」と理解した方が良いだろうことがわかる。


## 回避方法

ML のスレッドにも、回避方法が知りたいという声が多数あるが、基本的には無いと言うことになる。もし回避できるのであれば、問題自体が解決しないため意味が無いからだ。

しかし、このように互換を壊す場合は、デプロイされたコンテンツが修正するための猶予期間として、 Reverse Origin Trials を提供するのが最近の Chrome の運用だ。

- Request for Deprecation Trial: Remove alert(), confirm(), and prompt for cross origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VOePv--Qa-4

Origin Trials は、新しい機能を先取りして試すために、 Token を取得してそれをコンテンツに追加することで Opt-In する方法だ。トライアルが終われば Token は無効になるため、実験中の実装が残るリスクを減らすことができる。またトライアルを実施しているユーザと連絡手段ができるため、実装の変更などのアナウンスが可能になる。

この仕組みを利用して、例えば Token を付与しその Token が有効である間は機能を延命し、その間に修正できるよう猶予を与えるというのが Reverse Origin Trials だ。ただアナウンスなどをしても誰も修正をしないために考え出された機能であり、 WebComponents V0 の deprecate などでも運用された。

今回の Token は以下から取得できる。使い方は [過去に書いた記事](https://blog.jxck.io/entries/2016-09-29/vender-prefix-to-origin-trials.html) が参考になるだろう。

- Trial for Disable Different Origin Subframe Dialog Suppression
  - https://developer.chrome.com/origintrials/#/view_trial/2541156089743802369

ちなみに、試したところ Token を追加するのは *埋め込まれた iframe 側* で、埋め込む側には必要無さそうなので、提供する側が対応すれば良さそうだ。

期間は *Chrome 92 to 96 (Dec 15, 2021)* となっている。

これはあくまで Chrome の話で、 Firefox や Safari がいつリリースするかわわからない。 Firefox はおそらく Chrome に続くのではないかと思うが、 Safari は例年通り次の 9 月に 15 が出ると予想すると、最速でそこに入れてくる可能性が無いとは言い切れ無さそうだ。

つまり、今分かっているのは「*Reverse Origin Trials に登録し、なるべく早く、遅くとも 12 月までに直すしか無い*」ということだと言えるだろう。


## 修正方法

実際にどういう実装があるのかは筆者にはよくわからないが、想定されるケースを筆者なりに考えてみた。

できることは、提供している方法によって違うだろう。


### iframe を埋め込む JS を提供している場合

Ad のタグなどは、 JS が提供され、サイトは `<script>` タグを埋め込む。その JS が実行された際に `<iframe>` を埋め込むという形式の提供が多いように思う。

この場合は、埋め込む `<iframe>` が Top Level で実行された JS に messaging ができるのであれば、トップレベルでダイアログを呼ぶというような方式が考えられそうだ。

ただ、そこまでできているのであれば、 Dialog API (alert/confirm/prompt) を使うよりは、きちんと UI を設計する方が良いように思うが、時間がなければとりあえずはダイアログで間に合わせることになるだろう。

エントリポイントが JS である時点で、選択肢は広くあると思われる。


### iframe を直接提供している場合

`<iframe>` を提供し、コンテンツがその `<iframe>` を直接埋め込んでいる場合は、もうその `<iframe>` 内でなんとかするしかないだろう。

`<iframe>` が領域を広めに確保していれば、その中で出せる範囲のダイアログを出すしか無いし、 `<iframe>` が十分な領域を持ってない場合(ボタンだけなど)の場合はできることは少ないだろう。

サイト側に `<iframe>` からのメッセージを送り、それを受け取って何かをするようにサイト側の JS を直してもらえるならなんとかなるが、そうでない場合は `<iframe>` での提供をやめて前述の JS 提供の形態に変えるか、もしくはダイアログ自体を諦めて仕様を変えるしか無いように思う。

もちろん筆者が見落としている実装方法があるかもしれないので、良い方法があれば共有すると良いだろう。


## Web の互換性と安全性

今回の件で、実装が壊れて対応に追われた人もいるだろう。そういう人達からすれば迷惑な話だと思うし、恨みの一つも言いたくなる気持ちはわからなくはない。

実際、ここまで問題になれば、 Chrome にしてもプランの変更や OT の延長などがあり得るかもしれないが、実装の変更をしないで済むかというと、そうはならないだろう。どうあれ、近い将来にこの機能は無効になると思われるし、そう思って行動すべきだ。

「*Web は互換性を維持する*」という大原則は知られているだろう。そこと比べれば今回は大きく互換性を壊していることになる。しかし、実は Web には互換性よりも大事なことがある。それが「*ユーザの安全*」だ。

Web には歴史的に様々な機能があり、それらがその時点では「正しいユースケース」とみなされていても、時代が変わるとごとにそうではなく「危険な機能」であると見直されることがよくある。

例えば Spectre の登場により Shared Array Buffer が無効になるのも、 Cookie のデフォルトが SameSite=Lax になるのも、 HTTPS でないと URL バーが赤くなるのも、全ては時代とともに高度になる潜在的な危険から、ユーザを守るために「互換性を壊してでも直すべきだ」とされて起こる変更だ。

そして、そうした変更は Opt-In で提供しても実装が変わらないと浸透せず、多くの実装はいつまでたっても変わらないために、ブラウザがデフォルトとしてリリースすることで、変更を実装に強制するということを、分かった上で積極的に行っていく時代に既になっている。

Web がそうなっている以上、その変更に合わせてユーザが安全に使えるように実装を更新するのも、開発者およびサービス/コンテンツ提供者の使命といっても、過言でないのではないだろうか。

一方で、 Reverse Origin Trials があるとはいえ、 Google のアナウンスが適切であったかについては、筆者も疑問に思わなくない。一次情報として blink-dev の話はあるが、それ以外にもう少しアナウンスがあっても良さそうには思う。

本サイトや、筆者が行っている [mozaic.fm](https://mozaic.fm) の Monthly Web が少しでもそうした情報の提供に役立てば幸いだ。


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/iframe/dialog.html


## Resources

- Spec
  - Add early return to JS dialogs triggered from different origin-domain iframes by carlosjoan91 - Pull Request #6297 - whatwg/html
    - https://github.com/whatwg/html/pull/6297
- Explainer
- Requirements Doc
- Mozilla Standard Position
  - https://github.com/whatwg/html/issues/5407#issuecomment-606417807
- Webkit Position
  - https://github.com/whatwg/html/issues/5407#issuecomment-760574422
- TAG Design Review
- Intents
  - Intent to Remove: Cross origin subframe JS Dialogs
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/
  - Request for Deprecation Trial: Remove alert(), confirm(), and prompt for cross origin iframes
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/VOePv--Qa-4
- Chrome Platform Status
  - Remove alert(), confirm(), and prompt for cross origin iframes - Chrome Platform Status
    - https://www.chromestatus.com/feature/5148698084376576
- WPT (Web Platform Test)
- DEMO
  - https://labs.jxck.io/iframe/dialog.html
- Blog
- Presentation
- Issues
  - 1065085 - Implement window.{alert, prompt, confirm} removal from cross-origin iframes - chromium
    - https://bugs.chromium.org/p/chromium/issues/detail?id=1065085
  - Cross-origin prompts still have significant use cases - Issue #6897 - whatwg/html
    - https://github.com/whatwg/html/issues/6897
- Other
  - Salesforce functionality impacted in Chrome 92 after recent change to cross-origin iframe JavaScript dialogs
    - https://trailblazer.salesforce.com/issues_view?id=a1p4V000002BRMXQA4