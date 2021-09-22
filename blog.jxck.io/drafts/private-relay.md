# [private relay][proxy][ip blindness][privacy] Private Relay と IP Blindness による  Fingerprint 対策

## Intro

iOS15 がリリースされたため、 Private Relay のベータを試すことができた。

このようなサービスが提供されるようになった背景を踏まえ、挙動を簡単に確認しつつ、解説する。


## 背景

そもそも、なぜこのようなサービスが出てきたのかを理解するには、現在のインターネットが抱える問題の背景を理解する必要がある。

特に Web において問題になっている「トラッキング」を防ぐために、法的な規制や業界団体の自主規制による対策は長いこと行われてきたが、それでも看過できないインシデントなどが目立ったために、 Apple の ITP を皮切りに 3rd Party Cookie の制限が始まった。

ここで重要なのは、「*本来防ぎたいのは 3rd party Cookie という技術ではなく Tracking というユースケースだ*」という点だ。

この前提が伝わっていない場合、トラッキングのユースケースを持つパーティにとっては「3rd Party Cookie が使えないから別の方法で Tracking をしよう」という発想になる。

そこで代替技術として上がるのが Fingerprinting だ。

実際、広告やアナリティクスを 3rd Party Cookie で行っていた事業者には「最悪 Fingerprinting があるから、なんとかなる」と思っている人もいるようで、「新しい技術により n% の精度でトラッキングが可能」といった宣伝を行なっている商品の実態はこの Fingerprinting であることが多い。

仮に Fingerprintin で精度の高いトラッキングができるのであれば、当初の「トラッキングを防ぐ」という本質的問題が解決してないことになるため、あたりまえのように「3rd Party Cookie だけでなく Fingerprinting も防ぐ必要が出る」という話になる。

では、実際に Fingerprinting はどう行われているだろうか。


## Fingerprinting

Fingerprinting は、クライアントから取得できるエントロピーの高い情報を組み合わせて、クライアントを区別する仕組みと言える。

そして、エントロピーが高い情報の代表が IP アドレスと `User-Agent` 文字列だ。

2012 年に Microsoft が公開した研究では IP + `User-Agent` だけで 80% 程度の精度がでるとされている。

- [Host Fingerprinting and Tracking on the Web:Privacy and Security Implications - Microsoft Research](https://www.microsoft.com/en-us/research/publication/host-fingerprinting-and-tracking-on-the-webprivacy-and-security-implications/)

ここからさらに、 HTTP の `Accept` ヘッダや `If-Non-Match` を含めたり、 JS でさまざまな API を叩いて Canvas や Font などデバイス固有な挙動をするものを探し、精度を上げるために各社が凌ぎを削っている。 

そこで、ブラウザベンダ各社は、これらの情報量を減らすことで Fingerprint の精度を下げるために議論と検証を進めていた。具体的には以下のようなものだ。

- IP アドレスを隠蔽する
- User-Agent を固定する
- 既存/新規の API が Fingerprint ベクタにならないように仕様/実装ともに注意を払う

特にこうした取り組みを先導しているのが Apple で、 ITP や Freezing User-Agent の作業を先んじて進め、他のブラウザもそれに追従しているのは周知の通りだ。

IP Blindness についても、 Google が [Willful IP Blidness](https://github.com/bslassey/ip-blindness) を提案したり、 IETF では [Oblivious HTTP](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) として標準化に向けた議論が始まったばかりだった。そんな中、いつも通り Apple が先行して実施した、それが Private Relay だ。

独自の規格/仕様かつオープンな実装ではなく iCloud サービスの一環としてリリースするるという、よくも悪くも Apple らしいやり方なので、 Apple が突然また過激なことを言い出したと思う人もいるかもしれないが、この流れがわかっていれば、順当以外の何者でもないとも言える。

という背景を踏まえて中身を見ていこう。


## Private Relay

標準技術では無いため、公開された情報もそこまで多くないが、最初に Private Relay って話が出たのは今年の WWDC だった。 Hide My Email などと合わせて Privacy Pillars の枠で解説されている。

そのあと IETF の PEARG というワーキンググループでも、 Apple の人による詳細な解説があった。

- Apple's privacy pillars in focus - WWDC21 (24:30~)
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


### 設定

iOS15 にアップデートできたため、 iCloud に課金し実際に Private Relay を有効にしてみた。

UI は非常にシンプルで、以下から有効にできる。

TOOD: 図

位置情報については以下の選択肢がある。 IP ジオロケーションについては後述するが、おそらく以下のような差だろう。

- おおよその位置情報を保持: より詳細な IP ジオロケーション
- 国と時間帯を使用: タイムゾーンレベルの詳細度の低い位置情報


### 挙動

まず、無効状態で `https://jxck.io` に接続したところが以下だ。ちなみに SIM はラインモバイルを使用している。(IP は微妙に変えてある)


```
2021/09/21 04:28:11.010 180.10.203.175 HTTP/2 200 GET jxck.io / "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
```

次に Private Relay 有効状態だと以下のようになる。


```
2021/09/21 04:40:07.430 2606:54c0:3b00:10::16:e1 HTTP/2 200 GET jxck.io / "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
```

サーバは IPv6 対応しているため、 IPv6 でのアクセスになっていることがわかる。

この IP は Apple の Engress Proxy の IP List で見ると以下のエントリに該当する。


```
2606:54c0:3b00:10::/64,JP,,Tokyo,
```

日本の東京にある Proxy からリレーされいてることもわかる。


## 懸念点

Private Relay および今後 IP blindness を実現する技術が出てきた場合に、起こる懸念をまとめる。


### IP ジオロケーション

IP アドレスがあると、そこからおおよその位置情報がわかるため、「どの地域からのアクセスが多いのか」という情報を得ることができる。これは、アナリティクスツールではおおよそサポートされ、マーケティングなどで重宝されている。

IP が Proxy によって変わるとこの情報が落ちる懸念があるが、 Private Realy の場合は Egress Proxy の IP リストが以下で公開されている。

- IP ジオロケーションフィードへのアクセス - iCloud Private Relay に向けたネットワークの準備
  - <https://developer.apple.com/jp/support/prepare-your-network-for-icloud-private-relay/#h5o-6>

そして、各 IP には地域情報が記載されているため、例えば Tokyo 付近にいるユーザには Tokyo の Egress Proxy が割り当てられ、この CSV を引けば Tokyo からのアクセスであることがわかる。

日本でみれば Tokyo, Osaka, Nagoya, Hiroshima ... などの主要都市があるようなので、マーケティング用途レベルであればまかなえそうな粒度には見える。

それでもカバーできない用途については、 GeoHash (緯度経度のハッシュ)を Client Hints ヘッダに付与する提案がちょうど Apple から提案されたため、そちらでカバーするという流れだろう。

- The Geohash HTTP Client Hint
  - <https://tfpauly.github.io/privacy-proxy/draft-geohash-hint.html>

しかし、 GeoHash もエントロピーが高く、 Client Hints でも無尽蔵に取得させることはできないため、 Permission の取得や必要に応じた短縮などを行うべきという記載もある。別途提案されている Privacy Budget などによる制限もあるかもしれないので、あくまで補助的な情報として扱うことになるだろう。


### カウントフリーやフィルタリングサービスへの影響

Private Relay が公開されて以降、モバイルキャリアなどから、特定のサービスの利用をギガの消費にカウントしないカウントフリーサービスや、フィルタリングサービスのなどが正常に機能しなくなる可能性がアナウンスされている。

例としていくつか目についたものだけ抜粋する。

- ソフトバンクモバイル
  - <https://www.softbank.jp/mobile/info/personal/news/support/20210916a/>
- LINEMO
  - <https://www.linemo.jp/info/press/2021/21091601.html>
- 楽天モバイル
  - <https://network.mobile.rakuten.co.jp/information/news/service/803/>

こうしたサービスは、 IP アドレスが想定したものであることを前提に作られているであろうことを想像すると、やむをえないだろう。こうしたサービスを利用するユーザは Private Relay を利用することはできない。


### オーバーヘッド

Proxy を経由することによるオーバーヘッドがどの程度あるのかも気になるところだろう。もちろん、 TLS が一回多く実施されているという一点においても、オーバーヘッドが無いとはいえない。

しかし、ここの有意な比較を行うのは考えるほどなかなか難しい。

ネットワークアクセスのオーバーヘッドの多くは、 TLS に費やされる処理だけでなく、選択される経路とその経路の転送能力などの影響も無視できない。

したがって、 Private Relay の On/Off によってどういった経路の差が見られるかなども比較するのが妥当に思える。

さらにいうと、日本は狭い地域に Proxy が密集しているが、国によっては Proxy までの距離のオーバーヘッドも無視できないだろう。

また、なにより今はリリースされたばかりでトラフィックも少ないため、はずれ Proxy を引くことも少なそうだ。

こうした状況で安易に特定のポイント間の速度計測し、雑な比較してもあまり意味がないと思われるため控える。

すくなくとも現時点では、有効にして丸一日普通につかっていたが、半日後には有効にしていたことを忘れるくらいには違和感は感じていない。


### 犯罪捜査

IP アドレスを隠す/偽装するために Proxy を挟むという発想は、別に新しいものではない。

特に平成では「串を刺す」といった隠語に代表される Proxy の利用は行われており、海外 IP でしか遊べないゲームを遊んだり、匿名サイトに書き込む際に使われたりしていた。

ダークウェブで知られる Tor も、 Onion Proxy を用いた IP blindness を行なっていると見れば、やっていることは実質変わらない。

つまり IP には、やましいことをする上で隠すメリットがあるという側面もあるのが事実だ。特にサイバー犯罪の検挙が IP を手がかりに行われている例があるように、サービスに IP の開示を依頼し、 ISP にマッピングを問い合わせ、自宅を突き止めるという操作も一般的だ。

単一 Proxy によって、 Apple がマッピングテーブルを持つのであれば、法的な開示依頼に応じるかどうかという話になるが、本当にマッピングテーブルが無いのであれば、何かが起こった場合にどうなるのだろうか? そのあたりの話もまだ見つけられてはいない。(とはいえどっちも Apple の Proxy だからなんとでもなりそうにも思えるが)


## Outro

トラッキング対策のために 3rd Party Cookie, User-Agent ときて、ついに IP Blindness の取り組みが始まり、具体的なサービスとして Private Relay が Beta で展開され、実際に試してみることでその挙動を確認した。

IP Blindness の流れ自体はこれからも続くと思われ、標準化も始まっており、いずれは他のベンダもそれぞれのやり方で同様のサービスを実施する可能性は高そうに思う。

今後も、先陣を切った Apple により可視化される IP Blindness の様々な影響が、後発に活かされていく点も含めて注視していきたい。


## DEMO

特になし。


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
