# Vender Prefix から Origin Trials へ

## intro

ブラウザに追加される新しい機能に対して、 Vender Prefix の代替となる Origin Trials の仕組みが徐々に動き始めている。
今回は、これまでの Vender Prefix の問題点と、新しく導入された Vender Prefix の導入方法などについて記す。


## Avoid Breaking the Web

Web が壊れることがあってはならない。

Web に関する、特にブラウザが実装するような機能については、その仕様や実装を変更することにより、既存の Web 資産が、正しく動かなくなることがある。
これを Breaking the Web といい、プロトコルにしても API にしても、標準化団体やブラウザベンダなどは、これを極力避けることを念頭に置いて作業を行っている。
(セキュリティ的な理由など、すべてがそうとは限らないが。)

一方で、新しいく提案される仕様は、実際に実装して使ってみないと、その仕様が妥当か、実装が可能か、安全か、本当に問題を解決するか、などわからないことが多いことも多々ある。
このため、ブラウザは新しい仕様をドラフトなどの提案段階でも実装してシップすることで、開発者からのフィードバックを集めることも多い。

もちろん、固まっていない仕様の場合は、後に変更が入る可能性が高い。
そのため、新しい仕様の実験は、常に Breaking the Web と表裏一体の関係になりやすいという問題をはらむ。

ソフトウェア開発には、実装とドックフーディング、そのフィードバックによる更新が常套手段だが、一度作られたコンテンツが更新されない可能性がある Web においては、それが非常に難しい。

そこで、かつてブラウザや端末のメーカが取った手法が Vender Prefix だった。


## Vender Prefix

今ではおなじみとなった Vender Prefix は、各ベンダが以下のような接頭辞を、標準プロパティの前に置いている。

```
moz
ms
o
webkit
```

Vender Prefix はまさしくその機能が **実験中** であることを示すために用いられてきたため、これを付したベンダは、実験の結果をより積極的に反映できると期待したのだろう。
そして、実験が終わればプレフィックスは取られ、標準プロパティに置きかわり役目を終える。はずだった。


ところが、実際には多くのコンテンツが以下のようなコードを書く結果となった。
(HTML5 時代に、こうしたコードを多く見た/書いたのでは無いだろうか?)


```css
.radius {
  -webkit-border-radius: 1em;
  -ms-border-radius: 1em;
}
```

```js
var peerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
```


特に、仕様の策定、実験に時間のかかる 機能があった場合、仕様策定



しかし、上記のようなコードに強く依存されたコンテンツが普及してしまうと、もはやちょっとした変更がすぐに Break the Web を招いてしまう。

また、実装が安定して Vender Prefix が不要となっても、 Vender Prefix 付きのものだけで書かれた CSS/JS も多くあるため、実装から消すのも難しい実情がある。

Vender Prefix は、「変更や消滅がありえる」ということを、使う側に強制することができなかったため、本来の目的を果たすためには少し弱い仕組みだったといえる。

```css
.radius {
  -webkit-border-radius: 1em;
  -ms-border-radius: 1em;
  -o-border-radius: 1em;
  -webkit-border-radius: 1em;
  border-radius: 1em;
}
```

JS ならこうだ。

```js
var peerConnection = window.RTCPeerConnection
                  || window.mozRTCPeerConnection
                  || window.webkitRTCPeerConnection
                  || window.msRTCPeerConnection;
```


## Origin Trials

ブラウザが適切なフィードバックを得るための先行実装を行うためには、その途中の実装に依存したコンテンツが広まりすぎない仕組みが必要となる。

機能の変更や削除を行っても、 Break the Web を招かないように、閉じた範囲にだけ新機能のトライアルを提供する。

そこで考えられた仕組みが Origin Trials だ。

https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md

Origin Trials は、その名の通り「特定のオリジンにだけ、実験中の機能を、期限付きで提供する」仕組みである。


今回は、ブラウザの持つ新しい機能を、筆者の持つ新機能実験用オリジンである [https://labs.jxck.io](https://labs.jxck.io) でのみ使えるように、実際に申請をしながら解説する。


### 対象機能

Origin Trials の対象となる機能は、執筆時点で以下のとおりである。

- Persistent Storage (Experimenting until mid-October 2016)
- Web Bluetooth (Experimenting until Late January 2017)
- Web UDB (Experimenting until March 2017)
- Foreign Fetch (Experimenting until March 2017)

それぞれ、トライアルのおおよその期間も記されている。
この期間になったら、トライアルが終わり、機能が使えなくなる可能性があることを、開発者は事前に了解する必要がある。

今後、 Origin Trials 対象となる機能については、以下にリストされるようである。

https://github.com/jpchase/OriginTrials/blob/gh-pages/available-trials.md

また、最初にトライアルに登録した時点で自動で登録される ML でアナウンスを得ることもできるらしい。


### 申請

今回は、 "Foreign Fetch" の Origin Trials を申請してみることとする。

申請は以下のフォームから行う。

[http://bit.ly/OriginTrialSignup](http://bit.ly/OriginTrialSignup)

- 使用者のメールアドレス
- 使用する機能 (Foreign Fetch)
- 使用するオリジン (labs.jxck.io)
- いくつかの質問


### Origin Trial Token

しばらくすると、メールでトークンが送られてくる。
このトークンを、 HTML か HTTP Header の中に仕込むことで、ブラウザが Origin Trials へのオプトインを認識し、申請した機能が使えるようになる。


#### HTML の場合

```
<meta
  http-equiv="origin-trial"
  data-feature="Foreign Fetch"
  data-expires="2016-10-27"
  content="AjWBjwNj3D6ajLeOwcUojZHss8sYj1mPvbhnmUQRcdrLzXKs13uUlR4pXvlOB7e9R5oMUNZbngniw6X2SLHlXgYAAABXeyJvcmlnaW4iOiAiaHR0cHM6Ly9sYWJzLmp4Y2suaW86NDQzIiwgImZlYXR1cmUiOiAiRm9yZWlnbkZldGNoIiwgImV4cGlyeSI6IDE0Nzc1OTMwMDB9">
```


#### HTTP Header の場合

```
Origin-Trial: AjWBjwNj3D6ajLeOwcUojZHss8sYj1mPvbhnmUQRcdrLzXKs13uUlR4pXvlOB7e9R5oMUNZbngniw6X2SLHlXgYAAABXeyJvcmlnaW4iOiAiaHR0cHM6Ly9sYWJzLmp4Y2suaW86NDQzIiwgImZlYXR1cmUiOiAiRm9yZWlnbkZldGNoIiwgImV4cGlyeSI6IDE0Nzc1OTMwMDB9
```


### 動作検証

コンテンツの開発自体は、 localhost で行うが、この場合はブラウザのフラグを設定することで、自分だけ有効にして開発すればいいだろう。
実際に Foreign Fetch を使って作成したコンテンツを以下に設置した。

完成したコンテンツをドメインに配置するが、ここで Origin Trials Token を入れたものと入れなかったもの二つを用意してみた。


- [Token 有り]()
- [Token 無し]()

Token が無い方では、動かないことがわかる。
ただし、利用者本人のブラウザでフラグが有効にされている場合は、 Token の有無に関係なく動作することに留意したい。


### Tools

- [Origin Trials Chrome Extension](https://chrome.google.com/webstore/detail/origin-trials/abpmcigmbmlngkajkikaghaibaocdhkp/related)
