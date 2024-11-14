# [cookie][3pca] 3PCA 20 日目: 3rd Party Cookie Deprecation

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 20 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

ここまで ITP について見てきたが、これはあくまで Safari が独断で行っていたことだ。

それに対して、他が追従するかどうかはブラウザ次第だっただろう。

では、他のブラウザはどのような反応をしたか。この反応には、その時の情勢も鑑みる必要がある。


## プライバシー事件の多発

2018 年、ITP で広告業界が騒然となっているのと同時期に、「ケンブリッジ・アナリティカ事件」が発生する。

これは、2018 年にケンブリッジ・アナリティカという選挙コンサルの会社が、Facebook で集めたユーザの統計情報を利用して、ユーザの同意なしにマイクロターゲティングを行ったという問題だ。これはトランプの大統領当選や、イギリスの EU 脱退にまで影響したとされていることからも、影響の大きさがわかるだろう。

日本でも、翌年 2019 年に、リクルートが同じくリクナビの「内定辞退率」データをユーザの同意なしに提供したという、「リクナビ事件」が発覚する。

こうした一連の流れによって、世間ではビッグテックによる「プライバシーの侵害」というキーワードについて、非常にセンシティブな局面に再度突入することになった。


## そして Deprecation へ

GDPR をはじめとした法制度の整備は各国で進んではいるが、ここまでに繰り返してきた事件を踏まえると、法制度だけで全てを防ぐのは難しいのが現実だった。

結果、この問題を根本から解決していく方向性として、ITP の始めた「3rd Party Cookie のブロック」という方針に、Chrome, Firefox, Edge を含む全てのブラウザが同調し、本格的に Deprecate していく合意がなされた。

まず、2019/06/04 に Firefox は Enhanced Tracking Protection (ETP) というトラッキング防止機能をデフォルトで有効にするアナウンスをした。

- Firefox Now Available with Enhanced Tracking Protection by Default Plus Updates to Facebook Container, Firefox Monitor and Lockwise
  - https://blog.mozilla.org/en/products/firefox/firefox-now-available-with-enhanced-tracking-protection-by-default/

その直後、2019/06/27 には Edge も Tracking Prevention という機能を Preview で発表した。

- Introducing tracking prevention, now available in Microsoft Edge preview builds
  - https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/

どちらも細かい違いはあり、「3rd Party Cookie を完全にブロックする機能」とは言い切れないが、おおよそトラッカーがブロックされる機能だと言えるだろう。

そして、2019/08/22 に Chrome は 3rd Party Cookie のユースケースを、個別の API として代替する Privacy Sandbox のアイデアを発表する。

- Building a more private web
  - https://blog.google/products/chrome/building-a-more-private-web/

それを踏まえ、2020/01/14 に「3rd Party Cookie を 2022 年には廃止する」という方針を発表した。

- Chromium Blog: Building a more private web: A path towards making third party cookies obsolete
  - https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html

しかし、2022 年の廃止は Chrome だけでなくエコシステム全体として作業が間に合わなかったため、延長された。

現時点では、**2024/01/04** (JST で 1/5) から徐々にリリースを開始し、2024 年中には 100% Deprecate するという計画が発表されている。

- Google shares update on next step toward phasing out third-party cookies in Chrome
  - https://blog.google/products/chrome/privacy-sandbox-tracking-protection/


## Web 史上最大の破壊的変更

3rd Party Cookie は、すでに ITP によってブロックされているものの、世の中には Chrome でしか動かないサイトが現実的に多数存在する。

最大シェアである Chrome が Deprecate に成功すれば、Firefox や Edge もより厳密なブロッキングができると期待されるため、実質 Chrome の掲げているマイルストーンが Web における 3rd Party Cookie 終了のマイルストーンとして捉えられている。

これが来年始まる「3rd Party Cookie の終わり」の実態であり、今 Web エコシステム全体が総出で取り組んでいるテーマ、「Web 史上最大の破壊的変更」の実態なのだ。

以降は、Privacy Sandbox を中心とした代替 API などについて解説しながら、今後のユースケースのあり方について解説していく。