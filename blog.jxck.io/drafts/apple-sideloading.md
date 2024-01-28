# [safari][browser] Apple によるブラウザエンジン規制の緩和

## Intro

以前から騒がれていた Apple によるサイドローディング周りの緩和について、正式な情報公開があった。

ストアやペイメントの緩和もあるが、ここでは Webkit に関する部分だけ抜粋し、どのような条件があるのかをまとめておく。

筆者が公開情報を読んで解釈したものなので、内容は保証しない。


## 前提

iOS/iPadOS に入れられるブラウザには、 Webkit を用いる必要があるという制限があった。

つまり、App Store から Chrome や Firefox を入れても、それは PC にインストールできる Chromium や Gecko ベースではなく、 Webkit の上に実装されたもの。つまり、 UI だけが異なる Safari のようなものだった。

従って Chromium Chrome で実装され PC では使える機能も、 iPhone Safari が実装してない機能は Webkit Chrome では同じように使えないといったものだ。

もし Webkit を使わないブラウザを作っても、それを App Store に公開する際に申請で落とされることになる。これは、ブラウザのフリをしたマルウェアがインストールされ、そこで Safari で行うような検索やログインといったアクティビティが実行された場合に、 Apple が iPhone ユーザを守ることができないといった理由だ。

しかしユーザの安全を理由とした、こうした Apple の制限は、一方で独占禁止法に抵触するという問題が指摘され、長いこと調査と議論が行われていた。

今回は、特にこの分野に敏感な EU からの要請を飲んだ形で、 Apple が EU 限定で制限を緩和したというものだ。


## 日本での対応

今回は EU だけだが、日本でもこの問題は政府を中心に調査、議論、パブコメの募集などが行われている。

- モバイル・エコシステムに関する競争評価 最終報告
  - https://www.kantei.go.jp/jp/singi/digitalmarket/kyosokaigi/dai7/siryou2s.pdf

この報告書では、ブラウザに関する部分に以下のようなまとめがある。

> (ウ)対応の方向性
> 以上を踏まえ、一定規模以上の OS を提供する事業者が、ブラウザを提供するサードパーティに対して、自らのブラウザ・エンジンの利用を義務付けることを禁止する規律を導入すべきである。

つまり、日本でも同様の制限緩和が行われる可能性は、ゼロでは無いと見て良さそうだ。


## EU でのブラウザエンジン緩和

今回の一連の発表の中で、ブラウザに関するものは以下だ。

- Using alternative browser engines in the European Union - Support - Apple Developer
  - https://developer.apple.com/support/alternative-browser-engines/#web-browser-engine-entitlement

この内容について、詳細をみていく。


## Browser Engine Entitlement

EU において、 iOS17.4 から Webkit 以外のブラウザエンジンが利用可能になるというものだ。

申請には、 2 つの種類があるとされている。

Web Browser Engine Entitlement
: ブラウザを開発する場合に通すべき申請
Embedded Browser Engine Entitlement
: 埋め込み用途で利用する場合に通すべき申請

ここで認定されたデベロッパーに、ブラウザ開発に必要な API (JIT や Multiprocess など) を解放する。

今回は *Web Browser Engine Entitlement* の方に絞る。


## Web Browser Engine Entitlement

各項目ごとに条件を要約する。


### Requirements

- EU 圏 iOS のみ
- ブラウザを作るなら Webkit 版とは別バイナリで出す
- 最低限以下を満たすエンジンであること
  - Web Platform Test の 90%
  - Test262 の 80%
  - JIT 無効モード(Lockdown mode)でも上記を満たす
- セキュリティ
  - 脆弱性報告の受付、対応の体制を整える
  - 30 日目安で修正をリリース
  - PKI は自前でも良い
    - CAB には参加
  - TLS は最新をサポート

なお、現時点で WPT 90% で Test262 80% を達成できているブラウザは、いわゆるメジャーブラウザくらいしか無いだろう。

PKI についても、Keychain を推奨しつつも、自前で持つのを禁止はしてないようなので、そこは意外ではあった。 Firefox も Chrome も、 PC 版は自前で持っているため、そことの兼ね合いもあるのかもしれない。


### Program Security Requirements

- メモリ安全な言語の使用や、メモリセーフな機能の利用
- 最新のセキュリティプラクティスの遵守
- プロセス分離と IPC の推奨
- サプライチェーン攻撃への対応
- 依存を最新に保つ
- 新規開発よりも脆弱性への対応を優先すること

1 つ目から、メモリ安全な言語などと指定してくるのもちょっと意外だった。後半でわかるが、 Rust を推奨してるという意味では無いようだ。


### Program privacy requirements

- 3rd Party Cookie はデフォルトブロック
- Storage Partitioning を実施
- アプリとの Cookie 共有禁止
- デバイス識別子の提供にはジェスチャベースの権限取得必須
- App Privacy Report でのネットワークタグ付
- Permission は一般的な Web 標準に準拠

Cookie や IDFA も、基本的に Webkit ベースのものを維持する。今回の緩和で Chrome のシェアがまた広がったとしても Cookie は ITP 相当を求めている。

Permission 周りは、条件や UI がまだブラウザ間や API ごとに揺れている部分もあるため、"Follow commonly adopted web standards" とあるが、それがなんなのかは変わっていくと思われる。そこを、 Webkit ベースに準拠するように求めることになるのだろう。


## Examples and resources

### Secure SDLC (Software Development Lifecycle)

前半は、「Web コンテンツは悪意だらけだから読み込む上での注意が必要」ということで、セキュリティ面、脆弱性対応、セキュアコーディングに注意するように求めてる。

後半は、またメモリセーフだ。ここではメモリセーフな言語として Swift を挙げており、 C++ への注意や std::span の紹介などをしている。

とにかく、バグったブラウザが iPhone で動くことを防ぎたいという気持ちが伝わる。


### Vulnerability Management

脆弱性報告を受け付ける体制や、トリアージや緊急リリースパスなど、対応プロセスを組むように求めたり、 CVE 採用を推奨している。

今のメジャーブラウザをやっているベンダは行っているが、「これを機に自分も独自ブラウザ作って iPhone に出す」と思った人が、 Blink をフォークしてコードが書けたとしても、ここが一番大変かもしれない。


### Network Security

全白は PKI について。 iOS の SDK に任せるのが推奨だが、自分で Root Store を運用する場合は、その運用についてやインシデント管理などについて注意が必要。

後半は TLS について。 1.2, 1.3 をベースとして、更新されたら対応していくこと。非推奨のプロトコルを必要とする際はユーザに通知すること。

前述したが、自前 Root Store を禁止してない。また、 TLS 1.0 や 1.1 も禁止はしてない。この辺は、思った以上に緩めている点で意外だった。


## その他

独自エンジンを開発する上での技術的ガイダンスが提供されている。

- [BrowserEngineKit](https://developer.apple.com/documentation/browserenginekit)
- [BrowserEngineCore](https://developer.apple.com/documentation/browserenginecore)
- [Preparing your app to be the default browser](https://developer.apple.com/documentation/xcode/preparing-your-app-to-be-the-default-browser)

それぞれ実装上の API や、細かな条件が書かれているが、特に最後のものは、対応すればデフォルトブラウザを自前エンジンのものに変更できる。

つまり、例えば Chromium Chrome をインストールして、それをデフォルトにする、ということが iPhone でも可能になるということだ。


## 所感

いよいよ来たなという印象だ。

細かい実装がどうなるのかは、実際に Chrome や Firefox が出てみないとわからないのが実際なので、実装面の制約についてはこれだけをみてもなんとも言えない。

しかし、 WPT 90%, Test262 80% はハードルとしては非常に高いため、新しくブラウザエンジンを実装して参入しようとしても、そんなに簡単では無い。習作のブラウザを公開して、といったことは不可能だろう。

また、もともとサイドローディングの根拠の 1 つに、 Apple による審査を通じたユーザの安全確保が強調されていた通り、別エンジン実装を許すからといって、その側面を緩めいないように強めの釘を打っていることを見て取れる。

つまり、仮に実装できても、体制の面で新規参入の敷居はやはり高い。

逆に、これらの条件を既に満たしている Chromium, Gecko をベースとした実装には、門戸が開かれた状況になった。

Chrome だけでなく、 Edge, Brave, Vivaldi, Opera といった Chromium 派生のブラウザも全て PC 同等の機能が提供可能になる。

これは Chromium ベースのブラウザのシェアが広がる可能性を示唆し、そこが最も Web に与えるインパクトが大きい部分と言える。

## ブラウザエンジンの多様性

iPhone に Safari 以外のブラウザをわざわざインストールするユーザがどのくら増えるかわからない。もし iPhone でも Chromium Chrome をインストールしてデフォルトブラウザにすることが一般的になれば、 Safari シェアを支える最後の砦が崩れることにも繋がり得る。

そうなった場合に懸念されるのが、ブラウザエンジンの多様性だ。

Edge, Opera, Brave, Vivaldi などChromium をベースとした「ブラウザ」の多様性は増える一方、 Trident/EdgeHTML を失って以降ブラウザエンジンの多様性とパワーバランスはかなり変わってしまっている。

使っているユーザーや、開発者にとっては特に大きな問題ではないかもしれないが、標準化などの場面で勢力の寡占は起こってしまうことには一定のリスクが指摘され続けている。

もちろん、 EdgeHTML が無くなったことはネガティブな影響ばかりではなかった。MS のチームは Chrome チームがカバーしきれてない OpenUI などにリソースを増やし、 HTML 周りの更新を推し進めているのも事実だ。また、リソースを Edge の UI に回せたからか、 Collection, Vertical Tab, Split Screen, Bing Chat など、最近の Edge はブラウザとして非常に使いやすくなっているとも感じる。筆者はここ数年 Edge をメインブラウザ、 Chrome を開発/検証用にしている。

ブラウザエンジンをゼロから作ることはもうできない。ましてや今スクラッチから WPT 90% の開発を目指しても、開発しているうちに WPT の方が膨らみ、追いつくのは難しいだろう。

結果 Chromium のフォークがベースとなり、ベースに入る機能のイニシアチブは Google が握っていることになる。Linux カーネルのように、それをみんなでメンテするという考え方もあるが、 Google が提唱し Mozilla/Apple の standard position で否定されている機能が少なくない数あることは、無視できない事実だ。

もっと懸念されるのは、 Web サービスの開発者側が Chrome でしか見れないページなどを提供する可能性だ。もし Privacy Sandbox 系の API が動くなら、メディア系のサービスはそちらを強制したいかもしれないし、 Fugu 系の API が動けばデバイス機能を活用したいサービスはそちらでしか動かないことになる。

近年の Safari のアップデートには、それまで音沙汰なかった機能が続々と追加されたように思うが、これもそうしたギャップをなるべく埋めた上でこの日を迎えたかったのではないかという邪推もできる。しかし、 API によっては Standard Position で否定され Safari には絶対に入らないことが決定済みなものもあるため、これを Chromium が提供できるとなると、その格差はスタンスよりも星取表で評価されてしまう可能性もあるだろう。

サービス開発者にとって、 iOS Safari の評判は決して良かったとは言えないため、もし Chromium ベースだけに向けた実装ができるなら、そんなに楽なことはないと思う人も多いだろう。しかし、それによってシェアが減ってしまうと、ブラウザ間のパワーバランスは一気に崩れるだろう。





