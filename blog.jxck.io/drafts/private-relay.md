# [tag] Private Relay とは

## Intro

iOS15 がリリースされたため、 Private Relay のベータを試すことができた。

実際に挙動を簡単に確認しつつ、解説する。


## 背景

そもそも、なぜこのようなサービスが出てきたのかを理解するには、現在のインターネットが抱える問題の背景を理解する必要がある。

特に Web において問題になっている「トラッキング」を防ぐために、法的な規制や業界団体の自制による対策は長いこと行われてきたが、それでも看過できないインシデントなどが目立ったために、 Apple の ITP を皮切りに 3rd Party Cookie の制限が始まった。

ここで重要なのは、「*本来防ぎたいのは 3rd party Cookie という技術ではなく Tracking というユースケースだ*」という点だ。

この前提が伝わっていない場合、トラッキングのユースケースを持つパーティにとっては「3rd Party Cookie が使えないから別の方法で Tracking をしよう」という発想になる。

そこで代替技術として上がるのが Fingerprinting だ。

実際、広告やアナリティクスを 3rd Party Cookie で行っていた事業者には「最悪 Fingerprinting があるから、なんとかなる」と思っている人もいるようで、「新しい技術により n% の精度でトラッキングが可能」といった宣伝を行なっている商品の実態はこの Fingerprinting であることが多い。

仮に Fingerprintin で精度の高いトラッキングがでるのであれば、当初の「トラッキングを防ぐ」という本質的問題が解決してないことになるため、あたりまえのように「3rd Party Cookie だけでなく Fingerprinting も防ぐ必要が出る」という話になる。

では、実際に Fingerprinting はどう行われているだろうか。


## Fingerprinting

Fingerprinting は、クライアントから取得できるエントロピーの高い情報を組み合わせて、クライアントを区別する仕組みと言える。

そして、エントロピーが高い情報の代表が IP アドレスと User-Agent 文字列だ。

2012 年に Microsoft が公開した研究では IP + User-Agent だけで 80% 程度の精度がでるとされている。

- [Host Fingerprinting and Tracking on the Web:Privacy and Security Implications - Microsoft Research](https://www.microsoft.com/en-us/research/publication/host-fingerprinting-and-tracking-on-the-webprivacy-and-security-implications/)

ここからさらに、 HTTP の `Accept` ヘッダや `If-Non-Match` を含めたり、 JS でさまざまな API を叩いてみたりして、精度を上げるために各社が凌ぎを削っている。

そこで、ブラウザベンダ各社は、これらの情報量を減らすことで Fingerprint の精度を下げるために議論と検証を進めていた。

- IP アドレスを隠蔽する
- User-Agent を固定する
- 既存/新規の API が Fingerprint ベクタにならないように仕様/実装ともに注意を払う

そして、特にこうした取り組みを先導しているのが Apple で、 ITP や Freezing User-Agent を先んじて実施し、他のブラウザもそれに追従して作業を進めているのは周知の通りだ。

IP Blindness についても、 Google が [Willful IP Blidness](https://github.com/bslassey/ip-blindness) を提案したり、 IETF では [Oblivious HTTP](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) として標準化に向けた議論が始まったばかりだった。

そんな中いつも通り Apple が先行して実施した。それが Private Relay だ。

独自の規格/仕様かつオープンな実装ではなく iCloud サービスの一環としてリリースするるという、よくも悪くも Apple らしいやり方なので、 Apple が突然また過激なことを言い出したと思う人もいるかもしれないが、この流れがわかっていれば、順当以外の何者でもないとも言える。

という背景を踏まえて中身を見ていこう。

## Private Relay

標準技術では無いため、公開された情報もそこまで多くないが、最初に Private Relay って話が出たのは今年の WWDC だった。 Hide My Email などと合わせて Privacy Pillars の枠で解説されている。

そのあと IETF の PEARG というワーキンググループでも、 Apple の人による詳細な解説があった。

- Apple’s privacy pillars in focus - WWDC21 (24:30~)
  - <https://developer.apple.com/videos/play/wwdc2021/10085>
- IETF-111-PEARG-Private-Relay
  - <https://youtu.be/J8sBCPYDHJo?t=4229>
  - <https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-private-relay-00>


簡単に言えば、接続先サービスに IP アドレスが露出し Fingerprint ベクターとなることを防ぐために、 IP を隠すという技術だ。

クライアントがサーバに通信すれば、 IP アドレスが伝わることは防ぎようがない(伝えなければレスポンスを受け取れない)。そこで、間に Apple が用意した Proxy を挟むことによって、サービスには Proxy の IP しか伝わらないというのが基本の発想だ。

Proxy を 1 つ挟むというのは、 OHTTP など他の提案でも共通しているところだが、 Private Relay の特徴は Proxy が 2 つある点だろう。


TODO: 図

Apple の資料によれば、 Private Relay が有効になると、 Ingress Proxy(前段) と Egress Proxy(後段) という 2 つ Proxy が割り当てられる。

これらをどう使うかというと、まず Client は Egress Proxy (後段)と TLS を確立する。つまり全てのパケットは Client と Egress 間で暗号化されるのだ。

Client は Server に送りたいパケットを、(それが Server との TLS で暗号化されていても) Egress との TLS で暗号化して Ingress に送る。 Ingress はそれをそのまま Egress に送る。 Egress は Client との TLS を解いて Server に転送する。

これによって Ingress と Egress が知り得る情報は以下になる。

- Ingress: Client の IP を知っているが、パケットが暗号化されているので Server の IP はわからない
- Egress: Ingress から転送されたので Client の IP はわからないが、パケットが解けるので Server の IP はわかる

なぜこのようなことをするかというと、もし Proxy が 1 台だった場合は、 Proxy は Client と Server の IP のマッピングを知ることができるが、 Private Relay はそのマッピングができないため、 Apple ですらだれがどこにアクセスしたのかが、わからないようになっているのだ。


## Private Relay の挙動







```sh
rvictl -s 736b78b32beb502f1cfc262c6747ae03b52a31a7
```


```
2021/09/21 04:28:11.010 180.10.203.175 HTTP/2 200 GET jxck.io / "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"

2021/09/21 04:40:07.430 2606:54c0:3b00:10::16:e1 HTTP/2 200 GET jxck.io / "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"

2021/09/21 04:42:01.384 2606:54c0:3b40:30::16:129 HTTP/2 200 GET jxck.io / "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
```

##  


## 懸念点


IP アドレスを隠す/偽装するために Proxy を挟むという発想は、別に新しいものではない。

特に平成では「串を刺す」といった隠語に代表される Proxy の利用は行われており、海外 IP でしか遊べないゲームを遊んだり、匿名サイトに書き込む際に使われたりしていた。

ダークウェブで知られる Tor も、Onion Proxy を用いた IP blindness を行なっていると見れば、やっていることは実質変わらない。

つまり IP には、やましいことをする上で隠すメリットがあるという側面もあるのが事実だ。特にサイバー犯罪の検挙が IP を手がかりに行われている例があるように、サービスに IP の開示を依頼し、 ISP にマッピングを問い合わせ、自宅を突き止めるという操作も一般的だ。

単一 Proxy によって、 Apple がマッピングテーブルを持つのであれば、法的な開示依頼に応じるかどうかという話になるが、本当にマッピングテーブルが無いのであれば、何かが起こった場合にどうなるのだろうか? そのあたりの話もまだ見つけられてはいない。(とはいえどっちも Apple の Proxy だからなんとでもなりそうにも思えるが)


## Outro





## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other

