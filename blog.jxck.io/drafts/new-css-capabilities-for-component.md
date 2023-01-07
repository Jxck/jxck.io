# 次世代 CSS 仕様とコンポーネント時代の Web についてのメモ

## Intro

SPA の隆盛で進化したフロントエンドライブラリによって生み出された「コンポーネント」という資産は、それを View 層の最小単位として扱うエコシステムにその重心をずらした。

近年の Web 開発は、虫食いのテンプレートエンジンにデータをはめ込む方式から、デザインシステムにカタログされたコンポーネント群に、 API から取得したステートを流し込み、それらを「いつ、どこで、どう」レンダリングするかという課題への最適解を、各位が模索するフェーズとなっている。

コンポーネントを敷き詰めるコンテナ側の設計は、 Flexbox および Grid の登場によるレイアウトの進化が手助けしたところも多いにある。しかし、「ページ」を前提に設計された CSS は、「コンポーネント」を前提にした設計に移行するうえで、ミッシングピースが多かった。

現在、提案/実装が進んでいる CSS の新機能群には、この「コンポーネントベースの Web 開発」に大いに影響を与えるポテンシャルを持つものが多い。

今回は、 2023 年の予習として、それらの仕様を「開発スタイルに与えうる影響」の側面から俯瞰し妄想したものをメモに残す。


## Cascading

### @scope

CSS のスコープは、長きに渡り開発者が求め続けていた機能の代表格だろう。かつて CSS Scoping (`<style scoped>`) として提案されたが、実装もされず仕様から削除された。ファイルを分けることで達成される要件は、依然として「ページ」前提であるため、 Shadow DOM によって「ページ」の方を分けてしまうというユースケースに巻き取られ、別途策定が進んで現在に至る。

WebComponents のナラティブを体現できたのは AMP くらいであり、 特に 1st party に閉じた開発において Shadow DOM の展開はオーバースペックであった。また SSR の需要に対して Declarative Shadow DOM が後出しになったことによる片手落ち感も否めず、気持ちはわかるけどこれじゃない、といった本音が WebComponents に対する違和感として聞こえるように思う。

結果として BEM をはじめとした命名規則ベースの設計や、ビルド時に Prefix を付与することによるスコーピングのエミュレートが未だに行われている。

Scoped Style (CSS Scoping や Scoped CSS と分けつつ仕様に沿ってこう呼ぶ) は、まさしく CSS に Scope を手に入れる提案であり、現在作業が進められている。

Scoped Style のメリットは、ファイルの中でコンポーネント単位にスコープを分断できるところだけではない。コンポーネントベースの開発は、かならず「コンポーネントを敷き詰めるコンテナ」側の要求に答える必要がある、もちろん同じファイル内でだ。

上限だけを決めてそれ以下をスコープにするだけではなく、下限を指定することで「ドーナツスコープ」を実現する仕様になっているのはこのためだ。ドーナッツないしマグカップの輪っかには、任意の別コンポーネントを配置でき、そのコンポーネントが持つスコープに所有権を移譲できる。

Figma に定義された「各コンポーネントのスタイル」と「レイアウトのためのコンテナのスタイル」が、そのまま Scoped Style で定義できれば、中間に橋を渡すレイヤは、かなり軽量にできるだろう。ビルドも `@scope` に流し込むだけで完成するため、複雑なロジックを要さず高速化できるだろうし、使われてないスコープを丸ごと消すといった Tree Shake も自然と実現できるだろう。

スコープの設計を複雑にすれば、当たり前のように読みにくくなっていくだろうという自明な危惧を除けば、過去の CSS 設計ノウハウを全て更地にするくらいのインパクトがあると考えられる。

フレームワークにおける Style の扱いにも大きく影響し、CSS をより直感的に「あるべきところ」に「自然な定義」で配置できると期待できる。CSS in JS / CSS Modules などの取り回し系フレームワークは、ビルド結果だけを変えることも、新しい発想で作り直すこともできそうだ。

まだ作業途中ではあるが、 2023 年もっとも注目すべき機能と言えるだろう。

- CSS Cascading and Inheritance Level 6
  - https://drafts.csswg.org/css-cascade-6/#scoped-styles
- @scope - Chrome Platform Status
  - https://chromestatus.com/feature/5100672734199808
- Explainer: Scope Proposal & Explainer
  - https://css.oddbird.net/scope/explainer/
- Chrome: Intent to Prototype: @scope
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O2xZZT_xCZM
- Firefox: @scope · Issue #625 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/625
- Safari: CSS Cascading and Inheritance Level 6 (@scope) · Issue #13 · WebKit/standards-positions
  - https://github.com/WebKit/standards-positions/issues/13
- CSS Scoping Solutions Brainstorming - Google Document
  - https://docs.google.com/document/d/1hhjmuQE6BTTnAyKP3spDr8sU6lpXArh8LDfihZh78hw/edit


### @layer

対象としている問題は CSS の詳細度であるため、特にバリエーションを提供するタイプの CSS での利用が期待されている。が、Interop 2022 の成果として急速に進みすぎた結果、開発者側が今ひとつ正体を掴みきれないまま 2023 年に持ち越された機能だ。

特に近年は、 User Preference (`prefer-color-scheme`, `prefer-contrast` etc) を反映したスタイルや、 `color-scheme`, `accent-color` などによるカスタマイズの提供が進むようになり、ユーザ全員が同じ見た目でサービスを使う時代は過去のものになった。

これらを Design System で吸収し管理するのは必須となりつつある一方、各 Figma の中に定義されたスタイルのバリエーションをどうシリアライズするのかは、決まり手に欠けている部分がある。

ITCSS などで実践されている、クラスプレフィックスベースのレイヤリングで Specificity Graph を管理しているような場合は、ほぼそのまま `@layer` に置き換えられるだろう。

また、 `!important` されがちな 3rd Party が提供する CSS のテーマを、よりカスタマイズしやすくするという用途もある。これは Tailwind / Bootstrap のような CSS フレームワークの作り方を変えるだけでなく、同一組織内の共有デザインシステムという Private 3rd Party でも活用できそうだ。

コンポーネント側から見れば、コンテナから提供されるレイヤを自身のレイヤで上書きするといった使い方が概ね目指すところではあるが、ここで重要なのはコンポーネントの知識量だ。

外側のスタイルに暗黙的に依存するのはグローバル変数を参照するのと同義だし、コンテナ側にある Layer の名前を知りすぎるのは、コンポーネントの汎用性を下げることにもつながる(といっても、普段開発者が作っているコンポーネントはプロジェクトローカルなもので、汎用性などあってないような場合が多いが)。

まずは 3rd Party の CSS フレームワークあたりから導入が始まり、徐々にデザインシステムでよく管理されたスタイルの展開あたりから、普及していくのだろうと思う。 Layer の扱いは 2023 年最初の課題だろう。

- CSS Cascading and Inheritance Level 5
  - https://w3c.github.io/csswg-drafts/css-cascade-5/#layering
- CSS cascade layers - Chrome Platform Status
  - https://chromestatus.com/feature/5663362835808256
- Cascade Layers Explainer
  - https://css.oddbird.net/layers/explainer/
- Cascade layers are coming to your browser
  - https://developer.chrome.com/blog/cascade-layers/


### Nesting

記法の変化だけといえばだけだが、各ネスティングブロックが詳細度によるスコープを作っているような見た目になる。より詳細度を直感的に表現できるため、書く側のメンタルモデルが変わり、より厳密な CSS が書かれることを期待できる。

同時に、最初のセレクタがヒットしなければ全部使われない点でこちらも Tree Shake しやすくなりそうだ。

現在 Syntax をどうするかを議論中であるため、アンケートを行っている。筆者としては、上記のメリットを享受する上で、記法がライトウェイトであればあるほど良いと考えるので、 `@nest` に投票した。

まだ投票してなければ、自身の納得できる構文を投票しておくといいと思う。投票は最後の記事の下部にリンクがある。

- CSS Nesting Module
  - https://drafts.csswg.org/css-nesting/
- CSS Nesting - Chrome Platform Status
  - https://chromestatus.com/feature/5800613594529792
- Help pick a syntax for CSS nesting
  - https://developer.chrome.com/blog/help-css-nesting/


### `:is()`, `:where()`

単純な利用では記述量が減らせるだけだが、 Nesting が普通に使われるようになると、入れ子の途中に複数セレクタを表現するといった用途でも必要になるため、特に `:is()` を使う機会は増えそうだ。

`:where()` との違いは詳細度だが、ユースケースに示されるような明示的に詳細度を下げたい場面は、そもそも Layer を用いた構成では Layer の順序でコントロールできるので前提が変わってくるだろう。その辺は、実際に設計を変えていく過程を経ないと見えてこない。

少なくとも 1st Party の中では、他の機能に対してカジュアルに導入していけそうに思う。

- Selectors Level 4
  - https://drafts.csswg.org/selectors-4/#matches
  - https://drafts.csswg.org/selectors-4/#zero-matches
- CSS Selectors 4 Pseudo-Classes :is(), :where() - Chrome Platform Status
  - https://chromestatus.com/feature/5445716612743168
- `:is()` Design Doc - Google Document
  - https://docs.google.com/document/d/1ZUNf4eXIABKYtOb2IWdzkHqMSC9GWgX5740McqQ5ur0/edit


## コンポーネントにおけるカスケード

今目立っているフロントエンドフレームワークにおいて、 CSS はコンポーネントに付随するおまけフラグメントとして扱われるか、 Tailwind/Bootstrap か MUI/Chakra のように外で解決される何かになっていた。どう扱っても扱いにくいため、なんとなく妥当に見える形で扱い、手厚くプロセスを通してなんとか吐き出す困った何かだ。

問題の 1 つは、 CSS という名前には皮肉なことだが、コンポーネントはそこまでカスケードを求めていない点にあるのだと思う。あるとすれば、共通するテーマカラーなどはコンテナから降ってきても良いかもしれないが、それも別にカスタムプロパティに吐いたカラーパレットを共有できていれば足りる場合が多いだろう。

かといって、コンテナから全てをプロパティとして渡し、コンポーネントのスタイルは全てスコープに閉じ込めるような作りは、愚直すぎて重複も多そうなため、コンテンツサイズの肥大を考えるともう少しスマートにやりたくなる。

Scope と Layer を用いた設計は、これまでのカスケーディングの発想とかなり変わるため、納得感のあるオーガナイズをするには、設計方針がかなり変わってくるだろう。それこそ BEM, SMACS, ITCSS etc で行われていた設計の "工夫" や、 CSS in JS や CSS Modules (Webpack) のような管理を、 Scope, Layer, CSS Modules (標準) などを上手に用いて変えていくことになる。

CSS がコンポーネントのプロパティとして初めて堂々と扱える存在になると、ビルドのプロセスも、生成結果も、ブラウザでの扱いも変わる。この時点で、今出ている CSS に関するあらゆるノウハウが、一旦過去のものになる程度には転換があるだろう。

また Scope/Layer に合わせて Shadow Realms/Modules が揃うと、 Shadow DOM が狙っていたはずのユースケースはカバーできそうに思う。各フレームワークがそれらを束ねて Custom Elements を必要に応じて登録すれば、軽量で SSR もできてブラウザにも認識させられる。それこそが開発者が本当に求めてた Web Components なのではないだろうか?


## State

### `:has()`

Parent Selector も、古くから CSS に求められていた機能の 1 つだ。 1990 年代から定期的に議論に上がっては、実装されずに今に至る。ブラウザにおいて HTML がストリーミング処理される以上、遡って要素を特定する Parent Selector を実現するには、パフォーマンスの課題が避けて通れなかったためだ。

- Why we don't have a parent selector - Snook.ca
  - https://snook.ca/archives/html_and_css/css-parent-selectors

この機能が Interop 2022 で急速に進んだ理由は、 Igalia が各エンジンの実装を調査し、このパフォーマンス問題に真っ向から取り組んだ結果だった。 仕様側で致命的になる書き方を抑制しているとはいえ、この努力とその結果は賞賛に値するものだと思う。

- Can I :has()
  - https://bkardell.com/blog/canihas.html

Parent Selector が存在することは、セレクタにおける Node 探索に革命が起こったと言える。

例えば、 `<input>` の Validation 状態に応じて、親である `<form>` 内にあるその他の要素のスタイルを変更したい場合、基本的には JS を用いて Validation 状態に応じた class を `<form>` に付与し、対応するスタイルはその class に書き分けて提供するのが一般的だった。

一方 `:has()` を用いると、 `form:has(input:invalid)` のように子要素の状態をクエリした結果を親に反映できる。これを `container:has(component.state)` に置き換えれば、コンポーネントは自分の状態を自身の DOM にセレクタで表現できる何らかの方法で表明し、コンテナにクエリさせることができることを意味する。

コンポーネントの処理はコンポーネントに閉じ、コンテナは Pull ベースの処理を JS 無しで動的にレイアウトに反映できるのだ。つまり、コンポーネントが API を公開していたが、コンテナ側が「クエリできなかった」というミッシングピースを埋めるのが `:has()` と見ることもできそうだ。

`:has()` には様々なユースケースが紹介され、特に BEM などで実現されていた「バリエーションを表明する class を減らす」という点で便利そうに思える。が、もともとパフォーマンスの問題が無視できないセレクタである以上、いくらエンジンが優秀であっても、 `:has()` を多用した時に 60fps が実現できるのかはまだわからない。問題が無いうちは好きなだけ使って書き換えれば良いが、いつか壁にあたる可能性もある。

であれば、「`:has()` があれば短く書けるが、なくてもできる」といったユースケース、特にコンポーネント内に閉じた処理であれば従来の方法で書き、「`:has()` あってこそ」のユースケース、特にコンポーネントを跨ぐ部分に優先して使うといった観点は、方針の一つとしてありそうに思う。(他にも Clickable Card のような例は今後も出てくるだろう)

- Selectors Level 4
  - https://www.w3.org/TR/selectors-4/#relational
- `:has()` pseudo class - Chrome Platform Status
  - https://chromestatus.com/feature/5794378545102848
- Why we don't have a parent selector - Snook.ca
  - https://snook.ca/archives/html_and_css/css-parent-selectors
- Can I `:has()`
  - https://bkardell.com/blog/canihas.html
- `:has()`: the family selector
  - https://developer.chrome.com/blog/has-m105/
- Creating Animated, Clickable Cards With the `:has()` Relational Pseudo Class | CSS-Tricks - CSS-Tricks
  - https://css-tricks.com/creating-animated-clickable-cards-with-the-has-relational-pseudo-class/


### Container Query

従来のメディアクエリは、「ページ」をレスポンシブ対応するという前提が色濃く反映された仕様だった。したがって、コンポーネントベースの設計では、親コンポーネントが Viewport のサイズを咀嚼したプロパティを子に渡すか、全コンポーネントが Viewport を意識したスタイルを提供するしかなかった。

ところが、実際にコンテナやコンポーネントにとって関心があるのは「Viewport がいくつか」よりも「自分がどうレイアウトされているか」だ。最終的には Viewport に対するレスポンシブを実現したいとしても、コンポーネントにとってはその情報は遠すぎるため、 Viewport そのものに関心を持つのはトップレベルのコンテナに閉じている方が構成しやすい。

Container Query はその名の通り、コンポーネントを敷き詰めるためのコンテナをクエリ用に `container` として定義することで、リアクティブにレイアウトバリエーションを変更することができる仕様だ。コンポーネントは Viewport から疎結合になる。

コンポーネントの表示バリエーションは、コンテナ側が明示的に決められた方が良い場合が多いとは思うが、なんでもかんでもコンテナ側が指示しないといけないコンポーネントもまた使いにくい。その場合にデフォルトとして提供するスタイルは、 Media Query よりも Container Query で定義されている方が妥当に思える。ひと足先に Range Syntax が進んでいることも、利用を後押しするだろう。

- CSS Containment Module Level 3
  - https://www.w3.org/TR/css-contain-3/
- Container Queries - Chrome Platform Status
  - https://chromestatus.com/feature/6525308435955712
- sturobson/Awesome-Container-Queries: A repo with links to posts of things around container queries.
  - https://github.com/sturobson/Awesome-Container-Queries


### Style Query

Container Query は (inline) size のみをクエリできる仕様であるのに対し、 Style Query は CSS の値(computed value)をクエリできる仕様として提案されている。非常に初期段階の仕様であり、まだ賛否もあるようだ。

`:has()` が「コンテナがコンポーネントの状態をクエリできる」仕様であると見なすならば、 Style Query は「コンポーネントがコンテナの状態をクエリできる」という仕様であると見なすこともできる。

例えば、コンテナクエリで自分が 「200px で表示される」のか「700px で表示されるのか」を知っても、「Grid で 200px」なのか「Flex で 700px」なのかで話が変わるケースもあるだろう。

また、特にコンテナ側に指定されたカスタムプロパティをクエリできれば、カラーテーマの提供などをグローバルカスタムプロパティの共有や、親から子へのプロパティ渡し以外の方法で実現できる可能性もある。

従来の CSS はそうしたバリエーションはコンテナ側が全て定義してカスケードするのが基本だったが、クエリによって反映できることはコンポーネントが自我を持ってカプセル化できることを意味する。意味はするが、これは依存の方向に関わる重要な問題なので、できればそれで嬉しいものかというと一概には言えないだろう。

そんなことができるべきなのか、パフォーマンスへの影響はどうなのかも含め、まだまだ議論は必要だろうが、もし Container Query が必要なケースが多く見出され広く使われるなら、そのスーパーセットとみなせる Style Query も潜在需要があることを意味する様に思う。今年もっとも注目したい議論の一つだ。

- CSS Containment Module Level 3
  - https://drafts.csswg.org/css-contain-3/#style-container
- Intent to Ship: Style Container Queries for CSS Custom Properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ACL23q_nbK0/m/PaNJ81_qDAAJ
- Container Style Query Explainer
  - https://css.oddbird.net/rwd/style/explainer/
- [css-contain-3] Move style queries of standard properties to level 4 · Issue #7185 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/7185


### 状態と依存方向

`:has()` や Container Query を積極的に使うことによって発生しえるのは、これまで JS でハンドリングしていた状態が CSS へと染み出すことと、従来一方向だったコンテナ - コンポーネント感の依存方向に変化が起こることを意味する。

コンポーネントで発生した状態の変化はコンポーネント自体に、コンテナはコンテナ自体に反映し、双方が相手の状態に応じて有機的に変化したい場合はそれをクエリする。これを、スタイル自体もセレクタやクエリによって API のような扱いができると見れば、ある種フロントエンドの求めていた「リアクティブ」性を CSS のレイヤだけで完結できると見ることもできる。

従来 JS の State に管理していたあらゆる状態は、データや CSS(class or style) として逐一ロジックでコンポーネントに反映されていたが、極端な話 `:has()` や Query が可能なフラグだけ立っていればあとは CSS 側で実現するといったことが可能になる。

問題は、それを規模が大きいコードで制御しきる統率方法だろう。なんのレールも敷かずに書いていけばあっというまにスパゲッティが茹で上がるが、フレームワークがうまくそれらを抽象化し牽引できれば体験/前提は大きく変わりえる。


## まとめ

近年のレイアウトに関する改善は、 float を使わなくて済むようになった、 margin をつけずに gap を使うようになったというレベルの変化だったため、使い方さえ覚えれば水平線上にある変化だった。

しかし、今回挙げたような機能は、今ある CSS のプラクティスや、ライブラリ/フレームワークの設計、それを解説している書籍などのコンテンツが全て過去のものになり、書き方も、管理の仕方も、セレクタパフォーマンスの考え方も、デバッグの仕方も、再度手懐け直す必要がある程度の転換を迎えているのだ。

コンポーネントベースの設計が定番となり、スタイルのカスタマイズ/バリエーションが増え、Design System を抱えるのが一般的になったことが、 CSS に求める機能を高度化した。と同時に、 IE がリタイアし、 Interop によって互換性の達成が推進されている現状、その進化がここから加速していくための土壌が十分に整いつつある。

使えるようになったからといって、迂闊に飛びついても絶対に上手く使えない機能群であるため、今から少しづつ議論を注視し、各仕様を咀嚼し、ノウハウを貯めていく必要がある。そういう 2023 年になるだろう。

次の数年で我々が書く CSS がどんなものになるのかを妄想するには、一番楽しい時期であることは間違いなさそうだ。