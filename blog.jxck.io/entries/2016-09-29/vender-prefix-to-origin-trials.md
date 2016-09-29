# [origin-trials][web] Web 標準化のフィードバックサイクルを円滑にする Origin Trials について

## Intro

ブラウザに追加される新しい機能に対して、 Vender Prefix の代替となる Origin Trials の導入が徐々に始まっている。
今回は、これまでの Vender Prefix の問題点と、代替として提案された Origin Trials のデザインや導入方法などについて記す。


## Avoid Breaking the Web

Web が壊れることは、避けねばならない。

Web に関する、特にブラウザが実装するような機能については、その仕様や実装を変更することにより、既存の資産の挙動が壊れることがある。
これを *Breaking the Web* といい、プロトコルにしても API にしても、標準化団体やブラウザベンダなどは、これを避けることを念頭に置いて作業を行っている。(セキュリティ的な理由など、例外は多く有る。)

一方で、新しく提案される仕様は、ブラウザが実装し、開発者がそれを使ったコンテンツをデプロイし、フィードバックを集めなれば、その仕様や実装が妥当か、安全か、本当に問題を解決するかなど、わからないことが多い。

ところが、一度作られたコンテンツが更新されない可能性がある Web においては、 Breaking the Web を避けながらフィードバックを反映する変更を入れるのが難しい場合がある。

そこで、かつてブラウザや端末のメーカが取った手法が Vender Prefix だった。


## Vender Prefix

Vender Prefix とは、各ベンダが以下のような接頭辞を、標準プロパティの前に置くものをさす。


- webkit (Chrome, Safari, newer versions of Opera.)
- moz (Firefox)
- o (Old versions of Opera)
- ms (Internet Explorer)

([Vendor Prefix - Glossary \| MDN](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix))


Vender Prefix は、まさしくその機能が **実験中** であることを示すために用いられ、これを付したベンダは、実験の結果をより積極的に反映できると期待した。
そして、実験が終われば Prefix は取られ、標準プロパティに置きかわり役目を終える。はずだった。


ところが、実際には多くのコンテンツが以下のようなコードを含む結果となった。


```css
.radius {
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
}
```

```js
var peerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
```

このコードには以下のような問題がある。

- webkit/moz 以外のブラウザがその機能を実装しても有効にならない
- webkit/moz の実装が安定しても、ブラウザが Prefix を捨てられない。
- 実験だった筈が、挙動を大きく変更しにくい。


本来は以下のように書かれるべきだった。


```css
.radius {
  -webkit-border-radius: 1em;
  -ms-border-radius: 1em;
  -o-border-radius: 1em;
  -webkit-border-radius: 1em;
  border-radius: 1em;
}
```

```js
var peerConnection = window.RTCPeerConnection
                  || window.mozRTCPeerConnection
                  || window.webkitRTCPeerConnection
                  || window.msRTCPeerConnection;
```


HTML5 時代には、特に実装が早い webkit/moz あたりを取り上げて「こう書けば動く」という形でコードが広まる結果となった。
特に、仕様の策定に時間がかかった機能は、 Vender Prefix 付きの実装が多くのプロダクトに根強く染み込んでしまった。


Vender Prefix は、 **「変更や消滅がありえる」ということを使う側に強制することができなかった** ため、本来の目的を果たすためには弱い仕組みだったといえる。


![warning message for vender prefix at devtools](vender-prefix-warning.png#570x194 "vender prefix warning")


また、 Prefix が付いていたのが、ベンダの独自拡張であったとしても、それに依存するサイトは同様の理由で産まれた。
今年 Firefox が [Prefix のついた webkit 独自拡張を見るようになった](http://www.otsukare.info/2016/01/04/webkit-resolved-fixed) のも、 Vender Prefix の性質を象徴する現象と言えると思う。


## Doing Science On The Web

かといって新しい仕様の検討や実装をあきらめるわけにはいかない。

仮説と検証、実装とドックフーディング、机上の空論で終わらないためには、実際にシップしてフィードバックを集めるプロセスは欠かせない。


[Doing Science On The Web](https://infrequently.org/2015/08/doing-science-on-the-web/)


新しい機能の実装を、特定の開発者にのみ提供するのであれば、既に方法はいくつかある。


- about:flags によるフラグの有効化([#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features) etc)
- ブラウザの起動フラグによる有効化([--es_staging](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) etc)
- beta, dev, canary ビルドの提供
- devtools での有効化


いずれも、明示的に有効にしたユーザにのみ機能が提供できるが、実際にサービスなどにアクセスしてきたユーザに対しては機能が提供できない(だから Vender Prefix があった)。

開発者がリアルワールドにデプロイして検証するためには、ユーザにいちいちベータブラウザの利用や、 about:flags の設定変更を求める訳にもいかない。

ブラウザが適切なフィードバックを得るための先行実装を行うには、その **途中の実装に依存したコンテンツが広まりすぎない仕組み** が必要となる。

そこで、新しく提案されたのが Origin Trials だ。


## Origin Trials

Origin Trials は、その名の通り「**特定のオリジンにだけ、実験中の機能を、期限付きで提供する**」仕組みである。

[Motivation and Explainer](https://github.com/jpchase/OriginTrials/blob/gh-pages/explainer.md)


開発者が Origin Trials の対象となっている機能を試したい場合、利用するオリジン(scheme + domain + port)へのトークンを申請する。

コンテンツにそのトークンを付与すると、ブラウザがそのトークンを認識し、そのオリジンでのみ実験中の機能を有効にする。

トークンには期限があり、役目を終えると Expire され、そうしたステータスの更新は登録時のアドレスにメールで通知される。


オプトイン形式にすることで、利用範囲や期限を限定し、途中の挙動に依存したコンテンツが広がること/残ることを防ぐことができる。


そしてなにより利用者との **連絡手段** を確保することにより、フィードバックの収集や利用者の量的データ、何かあった時の連絡などができるようになる点が大きい。


特に最近追加される、より高度で低レイヤな機能については、実装も仕様も難易度が高く、こうした仕組みの重要性は高い。


## 利用の流れ

今回は、以下のガイドに沿って、ブラウザの持つ新しい機能を、筆者の持つ新機能実験用オリジンである [https://labs.jxck.io](https://labs.jxck.io) でのみ使えるように、実際に申請をしながら解説する。

[Origin Trials Guide for Web Developers](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)


### 対象機能

Origin Trials の対象となる機能は、執筆時点で以下のとおりである。

- Persistent Storage (Experimenting until mid-October 2016)
- Web Bluetooth (Experimenting until Late January 2017)
- Web UDB (Experimenting until March 2017)
- Foreign Fetch (Experimenting until March 2017)

それぞれ、トライアルのおおよその期間も記されている。
この期間になったら、トライアルが終わり、機能が使えなくなる可能性があることを、開発者は事前に了解する必要がある。

今後、 Origin Trials 対象となる機能については、以下にリストされるようである。

[Current Experimental Features](https://github.com/jpchase/OriginTrials/blob/gh-pages/available-trials.md)


また、最初にトライアルに登録した時点で自動で登録される ML でアナウンスを得ることもできるらしい。


### 申請

今回は、 "Foreign Fetch" の Origin Trials を申請してみることとする。

申請は以下のフォームから行う。

[http://bit.ly/OriginTrialSignup](http://bit.ly/OriginTrialSignup)

- 使用者のメールアドレス
- 使用する機能 (Foreign Fetch)
- 使用するオリジン (labs.jxck.io)
- いくつかの質問


## Origin Trial Token

しばらくすると、メールでトークンが送られてくる。
このトークンを、 HTML か HTTP Header の中に仕込むことで、ブラウザが Origin Trials へのオプトインを認識し、申請した機能が使えるようになる。


### HTML の場合

HTML ページがある場合は、 `<meta>` タグに埋め込むことで、ブラウザがそれを認識し、ページ上で機能が有効になる。

```
<meta
  http-equiv="origin-trial"
  data-feature="Foreign Fetch"
  data-expires="2016-10-27"
  content="AjWBjwNj3D6ajLeOwcUojZHss8sYj1mPvbhnmUQRcdrLzXKs13uUlR4pXvlOB7e9R5oMUNZbngniw6X2SLHlXgYAAABXeyJvcmlnaW4iOiAiaHR0cHM6Ly9sYWJzLmp4Y2suaW86NDQzIiwgImZlYXR1cmUiOiAiRm9yZWlnbkZldGNoIiwgImV4cGlyeSI6IDE0Nzc1OTMwMDB9">
```


### HTTP Header の場合

HTTP ヘッダの `Origin-Trial` ヘッダに埋め込むこともできる。ページの無い API などの場合はこちらを使う。

```
Origin-Trial: AjWBjwNj3D6ajLeOwcUojZHss8sYj1mPvbhnmUQRcdrLzXKs13uUlR4pXvlOB7e9R5oMUNZbngniw6X2SLHlXgYAAABXeyJvcmlnaW4iOiAiaHR0cHM6Ly9sYWJzLmp4Y2suaW86NDQzIiwgImZlYXR1cmUiOiAiRm9yZWlnbkZldGNoIiwgImV4cGlyeSI6IDE0Nzc1OTMwMDB9
```


## Tool

一応 Origin Trials が有効になっているかを知る Chrome Extension があるが、これは HTML の方しか見ていない模様。

[Origin Trials Chrome Extension](https://chrome.google.com/webstore/detail/origin-trials/abpmcigmbmlngkajkikaghaibaocdhkp/related)


## Foreign Fetch

次回は、この Origin-Trial token によって有効になった Foreign Fetch について、実際のデモを作成しながら解説する。
