# URL バーの表示の変遷

## Intro

最近 Chrome の URL バーから、 EV 証明書の組織表示が消されるアナウンスが発表された。

思えば、 URL バーの見た目も、だいぶ変わってきたように思う。

今後また使う予定があるので、 URL バーの表示の変遷を一度まとめておく。


## URL バーの再現

本当なら古いブラウザのスクショを集めたいところだったが、これは非常に難しい。ネットで色々落ちてるものをかき集めても、ライセンスや解像度や表示されている URL などを考えると、使い勝手は決して良くない。

スクショを撮り直すため、試しに古い Chromium ビルドを CI から取得してみたが、一定より古いものはうまく開くことすらできなかった。開くことができたバージョンもあったが、どうやらそれだけでは当時の URL バーの UI までは再現されないようだ。

そこで、いずれ様々な資料やブログで同様の画像が必要になるのを見越し、これを機に自分で再現しておくことにした。

画像は、特定のブラウザの実装ではなく、「一般的な URL バーのイメージ」で筆者が作った架空の URL バーであることを断っておく。

同様の要件をもつ稀有な人は、 URL バーの画像のみ、自由に使ってもらって構わない(CC0)。


## 原始の URL バー

もっとも基本的な URL バーは、表示している URL をそのまま表示するものだったと言えるだろう。

```
TODO: [http://example.com]
```

そして、 HTTPS が登場して以降ここに「安全である」という意味合いを追加する UI が付与される。一般的に鍵アイコンと呼ばれるものだ。

```
TODO: [🔐: https://example.com]
```

さらに、その証明書が EV であれば、発行先の組織名が表示された。

```
TODO: [🔐 Example, Inc: https://example.com]
```

Netscape や IE5.5, 6 とかのレベルになると、もっと異なる UI だった。ここから徐々に変わっていくので、一般にこのイメージが定着したのがいつかというと、断定は難しい。

推定すると、 Chrome は 2010 年にリリースされ、初期のころからこの UI だったように思う。ずっと空いて 2016 年に Let's Encrypt が始まるが、その時点では HTTPS の普及率は決して高くなく、逆に銀行などが EV を入れていて「鍵が出てると安全」「組織名の表示を確認を」みたいな啓蒙がリテラシーの高い一般ユーザに対して行われていたと思う。

したがって、このイメージの定着は 2012~15 年くらいの間に、一般に定着していったと思う。 IE でいうと 9,10 くらいか。

## HTTPS EveryWhere

HTTP が大半である中に、 Advanced なものとして HTTPS が提供されていたために、それを「Secure」とラベル付するのは一定の納得感があった。

その後、 AT&T が無料 WiFi で広告を差し込んだり、 DigiNotor が不正発行をやらかしたり、エドワードスノーデンが告発したりなどの色々な社会の変化で HTTPS の重要性が増し、 Let's Encrypt あたりから一気に広まった。

その結果前提が代わり、それに伴い URL バーのデザインも変わっていくことになる。


## HTTP as Non Secure

HTTPS が前提の世界ができると、表示に際しても前提が変わってくる。

HTTPS のいう "Secure" はあくまで「通信の安全」であり、証明書の発行は基本的に「そのドメインを本当に保持しているか + α」を基準に行われる。

そのサイトのコンテンツまで安全かなどということは、たとえ EV であっても保証はしてない。つまり、 HTTPS でありながらフィッシングサイトである可能性もある。

しかし、多くのユーザは鍵アイコンの意味をそのようには理解しておらず、もちろん中身も安全なのだろうと誤解した。

そこで、 HTTPS が前提な世界においては「HTTPS が Secure」なのではなく「HTTP が　Non Secure」だという価値観にシフトする必要があった。

```
   http    https
---- | ---- |
     0     +1
    -1      0
```

結果 HTTPS を控えめに表示し、 HTTP の場合のみ No Secure であることを表示するように変わっていく。

TODO:

この流れは 2016 年ごろから長期の計画として開始された。

- Google Online Security Blog: Moving towards a more secure web
  - https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html
  - 長期的な secure -> not secure の流れの開始地点
  - https://developer.chrome.com/blog/avoid-not-secure-warn/


## HTTP as Non Secure 2

最終的には HTTP をエラーとして赤などで表示し注意を促したいが、いきなりその変更ではドラスティックすぎるため、一旦は控えめに No Secure を表示することになる。


- (2018/05: M70)
- Chromium Blog: Evolving Chrome's security indicators
https://blog.chromium.org/2018/05/evolving-chromes-security-indicators.html
  - HTTP ページを Insecure と表示する
  - HTTPS ページを Secure とは表示しなくなる
  - 
  - Chrom 70 から HTTPS を緑にするのではなく、 HTTP を赤(form input 時)にする
  - Marking HTTP As Non-Secure
    - https://www.chromium.org/Home/chromium-security/marking-http-as-non-secure/
  -  Google Online Security Blog: A secure web is here to stay
    - https://security.googleblog.com/2018/02/a-secure-web-is-here-to-stay.html



## ドメインのみが表示されるようになる(2020/08: M86)

フィッシング攻撃の典型的な方式の一つが、よく似たサイトを偽装して、そこにクレデンシャルを入力させるといったものがある。

理想としては Password Manager などで機械的に検出することだが、それにしてもやはり URL の中で特にドメイン(eTLD+1)を確認するのは、防衛手段の基本となる。

一方、ユーザは URL の仕様を正しく認識しているわけではなく、サブドメインが知ってるサイトだったり、長いパスやクエリで特にモバイルでの視認性が下がっている場合などに、攻撃にひっかかる可能性がある。

そこで、 URL の中でとりわけ重要な、そのサイトのアイデンティティとも言える eTLD+1 のみを表示することで、ユーザにサイトをより明確に認識させるという方式が、特にモバイルで採用されるようになった。


- Chromium Blog: Helping people spot the spoofs: a URL experiment(2020/08: M86)
  - https://blog.chromium.org/2020/08/helping-people-spot-spoofs-url.html
  - ユーザが URL を正しく理解しているわけではない
  - フィッシング対策のために、ドメインの重要な部分(eTLD+1)を視覚的に強調する
  - Chrome86 から
  - https:// や www を消す







- Chromium Blog: Increasing HTTPS adoption(2021/07: M94)
  - https://blog.chromium.org/2021/07/increasing-https-adoption.html
  - HTTPS First モードを M94 から導入し HSTS がデフォルトな状態に
  - 調査の結果ロックアイコンは接続が安全なだけであるということが正しく伝わってない
    - https://research.google/pubs/pub45366/
  - Lock icon をやめてよりニュートラルなアイコンに




## Removing EV Badge

EV 証明書の発行は、基本的に組織の実在チェック(ペーパーカンパニーではないか)であり、そのプロセスがある程度重たくなっていることで信頼性が認められている。逆を言えば、その要件を満たせば取得はできる。アメリカなどでは州ごとに同じ社名の会社が作れる(?)とかで、実際に Stripe と同じ組織名が表示される EV 証明書が取得可能であること実証された。

こうした研究から、 EV 証明書の組織名は、表示する方がむしろ良くないのではないかという論調が、特にセキュリティ研究者周りで強まった。 2017 年くらいのことだ。

- On the value of EV
  - https://groups.google.com/g/mozilla.dev.security.policy/c/szD2KBHfwl8/m/kWLDMfPhBgAJ

結果、 2019 年に Chrome と Firefox が EV の組織名表示を消すと発表し、 EV は他の証明書と同じ扱いになった。

- Upcoming Change to Chrome's Identity Indicators
  - https://groups.google.com/a/chromium.org/forum/#!topic/security-dev/h1bTcoTpfeI
  - https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/ev-to-page-info.md
  - EV バッジを Omnibox から消して、 Site Info に移す話


- Ship: Move Extended Validation Information out of the URL bar
https://groups.google.com/forum/#!msg/mozilla.dev.platform/o18n0SZRyUE/bsbGzuO6AQAJ
  - Chrome の動きを受けて Firefox もアドレスバーでの EV 表示をやめる流れに
  - ポップアップには前から組織名が出るようになっている
  - 並行して鍵アイコンの緑色を灰色にするパッチも投入
  - Firefox 70 から



## ロックアイコン

HTTPS は、緑ではないにせよロックアイコン自体は表示されていた。

しかし、 HTTP as Non Secure というベースシフトが起こたことに合わせ、 HTTPS を Secure とする UI からより Normal なものとしていくことになる。

結果、 Chrome は HTTPS からロックアイコンの削除をすると発表した。

当初の計画では、単純にロックアイコンがなくなるような絵がかかれていたが、実際には今ロックアイコンは Permission や Cookie など、この間にブラウザに実装されたさまざまな設定へのエントリポイントを兼ねていた。

そこで、ロックアイコンを単純に消すのではなく、代わりに「このサイトが安全かどうかを示してそうに見えない」何か、ハンバーガーメニューや三点メニューのようなメニューアイコンに置き換える必要が出た。そこで Chrome がデザインしたのが Tune アイコンだ。



Chromium Blog: An Update on the Lock Icon
https://blog.chromium.org/2023/05/an-update-on-lock-icon.html





## EV バッジ





- TLS: browser UI — Anne’s Blog
  - https://annevankesteren.nl/2014/10/tls-browser-ui
  - Anne が 2014 から書いてた

Firefox 70 Address Bar Gets New Security Indicators, Shames Insecure Sites
https://www.bleepingcomputer.com/news/security/firefox-70-address-bar-gets-new-security-indicators-shames-insecure-sites/



Chromium Docs - Guidelines for URL Display
https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/url_display_guidelines/url_display_guidelines.md