# [cookie][3pca] 3PCA 25 日目: Reporting

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 25 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は、広告の測定について解説する。


## 広告の効果測定というユースケース

広告ビジネスは、広告枠を売る媒体主と、それを買い出稿する広告主で成り立つ。

最終的には表示した広告が「どのくらい表示されたか」「どのくらいクリックされたのか」「どのくらい購買につながったか」などを計測し、その結果に応じて対価が支払われるのだ。

ここが測れなくなると、広告ビジネスというもの自体が成り立たなくなる。

他とは違い、 Chrome だけでなく Safari や Firefox も、これができなくなることは問題だと感じているのだ。

なぜなら、たとえトラッキングがなくても、広告の表示自体はできる。そのサイトの内容に合わせたコンテキスト広告や、タイアップの広告など、広告の選択手段はリターゲティングだけではないからだ。

せっかく「リターゲティングができなくなったから、コンテンツの質を上げ、そこに合った適切なクリエイティブを表示していこう」というポジティブな方向に舵を切るとしても、計測ができなければ足枷になってしまう。

プライバシーに配慮した形で、表示数やクリック数、購買へのコンバージョンなどを取得できる API の必要性は、 3 ベンダともに認めている。しかし、 API は別々だ。


## Measurement & Reporting API

### Private Click Measurement

最初に提案したのは Safari だ。これは ITP の途中で「トラッキングはいいとしても、計測できないのはこまる」という前述したようなフィードバックをもとに出された。

最初は Ad Click Attribution という名前で、後に Private Click Measurement という名前に変わっている。

- Privacy Preserving Ad Click Attribution For the Web
  - https://webkit.org/blog/8943/privacy-preserving-ad-click-attribution-for-the-web/

- Introducing Private Click Measurement, PCM
  - https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/

この API は、「広告のクリックと、それによってつながった購買を、ブラウザ上で紐づける」というものだ。

紐づいた結果はレポートとしてサーバに送られるが、すぐに送るとサーバ側でタイミングをみて紐付けができてしまうため、結果をブラウザ上に溜めて、 24h ~ 48h の間でランダムにレポートされる。

しかし、この API はプライバシーに強く配慮した結果、広告側が 8bit で購買側が 4bit しか情報を紐づけられない。

例えば、広告ごとに ID を振っていてもそれは 8bit に収まらないため、広告で言う「キャンペーン」の ID くらいしか送れない。コンバージョンも「購入した個数」とかそういう荒い情報しかわからないのだ。

レポートも、クリックが発生したドメインの `.well-known` に送られるため、送り先を広告プロバイダなどに変えることができない。

結果、かなり狭いケースしかサポートできない API であるため、広告プロバイダは CNAME Cloaking などを使って 1st Party Cookie で行う方法を ITP 対策として出しているのが現実のようだ。

確かにプライバシーに敏感で ITP をやるような Safari だからこそ、制限がきついのはうなづける。しかし、筆者にとって意外だったのは「**それでも計測ユースケースには別の API を出した**」という点だ。

それだけ「計測」はポジティブなユースケースであるとみなされており、 3rd Party Cookie なき後も必要性を認めているということだろう。

また、 Ad Click Attribution のように「ユースケースを単体で API にする」というこの発想は、のちの Privacy Sandbox に強く影響したと筆者は感じている。


### Attribution Reporting API

Privacy Sandbox Family として Google が出したのが Conversion Measurement API であり、今は名前が変わって Attribution Reporting API だ。

- WICG/attribution-reporting-api: Attribution Reporting API
  - https://github.com/WICG/attribution-reporting-api/tree/main

Safari との違いは、広告のクリック(Click Throught Conversion)だけでなく表示(View Throught Conversion) もサポートしている点だ。

Click は `<a>` に、 View は `<img>` に属性を仕込むことになる。

```html
<a href="https://advertiser.example/landing"
   attributionsrc="https://adtech.example/attribution_source?my_ad_id=123">
  <img src="https://advertiser.example/pixel"
     attributionsrc="https://adtech.example/attribution_source?my_ad_id=123">
</a>
```

ID も 64bit とかなり大きく、広告一つ一つを識別できるため、既存のユースケースのカバーとしては有利だ。一方、もちろんこれが Safari や Firefox からは批判される的となっている。

表示やクリックの情報がブラウザに溜まり、遅延をかけて送られるのは Safari と同じだ。ただし、送り先は 3rd Party も指定できる。

また、より詳細なデータを集計結果として必要とするユースケースのために、Private Aggregation API (Summery Report とも言われる)という追加の仕様も提案されている。

集計は広告プロバイダに依頼するために、ブラウザから情報が送られるが、暗号化され広告プロバイダには中身が読めない。

代わりに、 Protected Audience API の時に解説したのと同じく TEE を用いて、そこにデータを入れると、その中で複合され、集計され、結果が取り出せるというものだ。

Safari に比べればかなり色々とできる API であることはわかるだろう。


### Interoperable Private Attribution

最後が Meta が Mozilla と組んで取り組んでいると発表した Interoperable Private Attribution だ。

- ipa/IPA-End-to-End.md at main · patcg-individual-drafts/ipa
  - https://github.com/patcg-individual-drafts/ipa/blob/main/IPA-End-to-End.md

特徴はサーバ側での計算に、複数サーバが分散で処理する MPC (Multi Party Computation) モデルを用いてる点だ。複数の参加者がセグメントに分割したデータを暗号化して共有し、特定の組織がユーザのトラッキングをできないようにするものだ。

これがホストされている GitHub の PATCG とは W3C の Private Advertising Technology Community Group のことで、その名の通りプライバシーに配慮した広告 API を策定するためのグループだ。

ここでは近年、 TEE よりも MPC を利用する流れがあるように感じる。

これは Chrome の提案するような TEE を GCP にデプロイして Google が Aggregation を利用したとして、信用できるのか? という問題へのアンチテーゼなんだろうというのが筆者の理解だ。


### Private Ad Measurement

今年 Safari が、追加で提案してきた仕様だ。

Private Click Measurement にはなかった、 Aggrigation Report 相当のものを追加する仕様だ。

これも TEE ではなく MPC を用いている。

- patcg-individual-drafts/private-ad-measurement: Privacy preserving advertising attribution
  - https://github.com/patcg-individual-drafts/private-ad-measurement/tree/main

もちろん、 Attribution Reporting と比べれば制限は強いが、それでも Safari があえて追加で仕様を提案してくるくらい、「計測」というユースケースを重要視していることはわかるだろう。


## まとめ

Standard Position で言えば、もちろんそれぞれが API を提案しているため、ポジションとしては「自分が提案している API 以外は Negative」というのが回答になるだろう。

しかし、どのベンダーも「広告の効果測定」というユースケース自体には、ポジティブであるという一定の合意があることが、見て取れると思う。

とはいえ、それぞれの仕様がバラバラであるため、全てのブラウザの違いを吸収した製品を出すといったことは、広告プロバイダにとってはかなり難しい課題になりそうだ。

どの程度これらの API が使われるのか、それによって既存の広告ビジネスの要件がどの程度満たされるのかは、現時点ではよくわからない。

本来広告はトラッキングが前提ではないはずだ。コンテキスト/純広告を出すために、コンテンツの質に注力するメディアが存続するためにも、この分野の発展は重要だろう。

どこにいってもコンプレックス広告が出たり、とにかく全画面で出してクリックを誘ったり、全てのメディアが課金前提になって検索してもなにも辿り着けない Web になることを避けるためにも、測定だけはうまく着地して欲しいとは思う。