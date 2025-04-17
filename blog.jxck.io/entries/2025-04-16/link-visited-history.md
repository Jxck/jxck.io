# [history][privacy] 閲覧履歴があってもリンクの色が変わらないケースについて

## Intro

4 月末にリリースされる Chrome 136 からは、一部のケースで「閲覧履歴があってもリンクの色が変わらない」状態が発生する。

もしこの挙動に依存して閲覧をしているユーザがいれば、多少不便に感じるかもしれない。

しかし、これは長年問題視されてきた、ユーザのプライバシー保護のための更新だ。

ユーザ側でも、「サイトが壊れたのでは?」と思う人もいるだろうため、前半は技術用語を少なめに解説し、エンジニア向けの解説は後半で行う。


## 従来の挙動

例えば、Wikipedia では、リンクをクリックして閲覧先を確認すると、閲覧済みのリンクの色が変わる。

これは、ブラウザに保存された閲覧履歴に該当するリンクの色を、訪問済みとして変えるブラウザの機能だ。

![リンク先が閲覧済みの場合色が変わる](./link-visited.drawio.svg#500x321)

多くのリンクがある場合、確認済みかどうかがわかるために、便利に使われることもあるだろう。

(最近では、閲覧済みでもリンクの色を変えないように実装したサイトも多い。)


## 問題となるケース

ここで Google 検索で「ハイパーテキスト Wikipedia」を検索し、そこから Wikipedia のページに遷移したとしよう。

![Google 検索から直接ページにアクセスする](./google-search.drawio.svg#500x206)

その後また Wikipedia の「ハイパーリンク」ページに戻ったら、当然閲覧済みの「ハイパーテキスト」のリンクは色が変わると想定されるだろう。

ところが、今後この場合は、色が変わらなくなる。

![閲覧済みなのにリンクの色が変わらない](./link-visited-but-unchanged.drawio.svg#500x167)

これは例えば、以下のような不便として現れる可能性がある。

- 何か別のメモサービスに GitHub の読むべき Issue を管理していた
  - メモサービスをリンクして辿った Issue は色が変わる
  - ただし、GitHub の中で辿った Issue の閲覧は、メモサービス側では変わらない
- 複数のまとめサイトを見て、情報収集に活用している
  - まとめサイト A で見たニュースは A では色が変わる
  - まとめサイト B で他を見ようと思ったが、A で閲覧済みのニュースも色が変わらない

ユーザとしては、「サービスのアップデートで壊れたのではないか?」「ブラウザのバグではないか?」と思うかもしれない。

しかし、これらはすべてユーザのプライバシーを守るために意図して行われている変更なのだ。


## 閲覧履歴とプライバシー

例えば、攻撃者がある動画サイトを運営していたとしよう。メールアドレスでログインしたら、無料で動画が楽しめるページだ。

攻撃者は、そのページの隅っこに、小さく「トランプ大統領の Twitter アカウント」を埋め込んでいたとする。

```
<a style="font-size: 1px" href="https://x.com/realdonaldtrump">🤫</a>
```

ユーザはそんなことに気づかず、動画を楽しんでいる。

しかし攻撃者は、このリンクの色がどちらかを調べれば、「このユーザはトランプ大統領のアカウントを閲覧したことがあるか」がわかってしまうのだ。

だから何だと思うかもしれないが、ログインユーザのメールアドレスと紐づけ、その数が何万ともなれば、このリストは何らかの意味を持ってこないだろうか? 実はこういう名簿は、それなりの価値をもって取引されている場合があるのだ。

Caption: Visited Table
| email               | visited DT ? |
|:--------------------|:------------:|
| alice@example.com   | 0            |
| bob@example.com     | 1            |
| charlie@example.com | 0            |
| dave@example.com    | 0            |
| ...                 | ...          |

同じようなことを応用すると、様々なことが可能だ。

- ある商品のページで、「どうやってこの商品にたどり着いたか知りたい」とする
  - Referer が送られてくれば良いが、今は制限されている
  - 商品を PR した URL のリストを埋め込んでおく
  - 色が変わってれば、それを見た可能性が高いとわかる
- 社員しかログインできない社内サイトがあるとする
  - 気づかれないように「求人サイト」の URL を複数埋め込んでおく。
  - その色の変化を調べると、求人サイト閲覧の履歴が分かる。
  - 多くの履歴のある人は、、、?
- Alice は自分の作ったサービスを、気になっている Bob に DM で送る
  - サイトの中に、都内のあらゆる病院の URL を埋め込んでおく。
  - Bob がリンクを開いて、そのどれかが履歴に引っかかったら、、、?

確かに、「ブラウザにある閲覧履歴をまるっと盗み出す」というわけではない。あくまで、貼ったリンクに対する情報だけだ。

それでも、無作為に情報を得ることや、ターゲットを絞って情報を得ることは、工夫次第では可能になってしまう。


## 対策

この事実は、もちろん以前から知られており、かなり長く議論が重ねられてきた。

そして、ブラウザは「そんなに簡単にリンクの色変化を取得できない」ように改善を続けてきている。

特に 2010 年頃に、大きめの修正が入ったのを記憶している人もいるかもしれない。

詳細は以下に詳しい。

- A proposal to partition :visited link history by top-level site and frame origin.
  - https://github.com/explainers-by-googlers/Partitioning-visited-links-history?tab=readme-ov-file#motivation
- Browsing History Sniffing 最前線 - あなたのブラウザ履歴を狙う攻撃たち - やっていく気持ち
  - https://diary.shift-js.info/browsing-history-sniffing/

しかし、現実的に画面上で色が変わっているのであれば、その事実を取得する方法は工夫次第で色々と見つかってしまう。

細かい情報ではあるが、それが蓄積するとかなりインパクトのあるインシデントにも繋がりかねない。

かといって、Web における古くからの慣習だった「閲覧したらリンクの色が変わる」を完全に無効にしてしまっては、ユーザにとって不便な可能性が高い。非常に悩ましい課題だった。


## 今回の変更

このようなプライバシーリスクからユーザを守るために、今回 Chrome に大きな変更が加わることになった。

簡単に言えば「**リンクの色が変わるのは、そのサイトのリンクから遷移した履歴だけにする**」というものだ。

これまでは、どこから遷移しても、閲覧した Wikipedia のページはすべてのサイトで色が変わった。

しかし、Wikipedia のリンクの色が変わるのは、Wikipedia のリンクから遷移した場合のみで、別のサイト、例えば Google 検索から遷移した Wikipedia の履歴は反映されないようになる。

一般ユーザにとっては、なかなかわかりにくいだろうし、どうしてそうなったのかを説明するのも難しいが、すべてはユーザを守るためだという点は強調したい。


## 技術的説明

エンジニア向けに今回の変更を解説するならば、「*閲覧履歴が複合キーで管理されるようになる*」ということになる(Partitioning)。

これまで閲覧履歴は URL の単一キーで、閲覧した事実だけ入っているハッシュのようなイメージだ。

```js
history = {
  "https://example.com": 1,
  "https://example.jp": 1
  // ...
}
```

リンクをレンダリングする際は、`href` に指定された URL がこの中にあるかを探索し、あれば `:visited` にする。

ブラウザデフォルトのスタイルでは `:visited` は色が変わり、CSS で色を指定することも可能だ。

```css
:visited {
  color: pink;
}
```

履歴はブラウザのグローバルな値なので、どのページに行ってもこの履歴が参照される。それがサイドチャネルアタックの原因となっていた。

そこで、今後は「*どのサイトの*」「*どの URL か*」という、複合キーに変更したのだ。

例えば、同じ `https://example.com` でもそれを Google 検索から見たのか、Wikipedia から見たのかでキーが変わることになる。

```js
// JS に Tuple があったら...
history = {
  #["https://google.com",    "https://example.com"]: 1,
  #["https://wikipedia.org", "https://example.com"]: 1,
}
```

これにより、全く異なる `https://x.com` に `https://example.com` のリンクがあっても、これまで二回閲覧しているにもかかわらず、リンクの色が変わらない。

そして、もっというと `<iframe>` で埋め込んだ場合を考えないといけない。

```html
<!-- https://wikipedia.org -->
<iframe src="https://example.co.jp">
  <a href="https://example.com">Link</a>
</iframe>
```

この場合、複合キーの最初を `https://wikipedia.org` にすると、この `<iframe>` の `src` がなんであっても履歴が共有されてしまう。

逆に、複合キーの最初を `<iframe>` の `src` にすれば、この `<iframe>` が埋め込まれたサイトであれば、どこで履歴が共有されてしまう。

そこで、実際には「*どのサイトの*」「*どの `<iframe>` に埋め込まれた*」「*どの URL か*」という 3 つのキーで管理されている。(Triple Keying)

```js
// JS に Tuple があったら...
history = {
  #["https://google.com",    "https://example.co.jp", "https://example.com"]: 1,
  #["https://wikipedia.org", "https://example.co.jp", "https://example.com"]: 1,
}
```

もちろん、フレームがなければそこは `null` だ。

このキーがすべて一致して初めて、リンクに閲覧履歴が反映されることとなった。

単一の Key だった頃と比べて、色が変わる範囲が減ることが分かるだろう。


## ブラウザの対応

今回の変更は Chrome チームにより、2023 年頃に計画されたものだ。

- A proposal to partition :visited link history by top-level site and frame origin.
  - https://github.com/explainers-by-googlers/Partitioning-visited-links-history

本ブログでも何回か言及しているが、Partitioning しているのは History だけでなく、Cookie や Cache その他様々なものが対象となっているため、順当な流れと見ることができる。

この実装を、2024 年までに Phase 1, 2 の二段階でテストしてきた。

- Intent to Experiment: Partitioning :visited links history Phase 1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U5AX0OXaxM8
- Intent to Experiment: Partitioning :visited links history Phase 2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qbHl0W-75zA

それがトライアルを終え、今回 Ship されることとなったのだ。

- Intent to Ship: Partitioning :visited links history
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8dZqt8JuLdc

Chrome チームからのエントリも出ている。

- Making :visited more private
  - https://developer.chrome.com/blog/visited-links

なお、他のブラウザの反応については、Firefox が既に Positive で Safari は No Signal だ。

- Partitioned :visited links history · Issue #1040 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/1040
- Partitioning :visited links history · Issue #363 · WebKit/standards-positions
  - https://github.com/WebKit/standards-positions/issues/363

しかし、初期の提案についての W3C/WebAppSec のミーティングでは Positive だった記録が残っている。

- webappsec/meetings/2023/2023-06-21-minutes.md at main · w3c/webappsec
  - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-06-21-minutes.md

前述のように、既にブラウザは様々な対策をしていたため、この変更が入らなければすぐに危険というほどではないと考えてよいだろう。しかし、この変更を入れたブラウザが現れると、対策をしていないブラウザは相対的に「脆弱である」とみなされてしまう可能性はある。特に Safari はプライバシーを非常に重要視するため、最終的には実施することになるだろうと筆者は考えている。

一方で、このように挙動の変わるリリースを行えば、様々なフィードバックや不具合が報告され、その対応を行う必要がある。先にリリースするブラウザがあるのなら、様子を見て後からリリースする方が、ベンダにとっては楽なのが実際のところだろう。


## FYI

関係ないが、「リンクはなぜ青いのか」を歴史的に調査したエントリがあり、面白いので参考までに載せておく。

- Why are hyperlinks blue?
  - https://blog.mozilla.org/en/internet-culture/deep-dives/why-are-hyperlinks-blue/
- Revisiting why hyperlinks are blue
  - https://blog.mozilla.org/en/internet-culture/why-are-hyperlinks-blue-revisited/


## Outro

失念したが、トライアル中にユーザから「問い合わせ」があったという話を見たように思う。

ユーザにとっては「不便な変更がサービスに入ったのかも」と思う気持ちはわからなくない。

背景がわかっていないと変更の把握が難しく、説明も決して簡単ではない変更であるため、そうした対応への参考にもなればと思う。


## Resources

- Spec
  - Selectors Level 4
    - https://drafts.csswg.org/selectors-4/#visited-privacy
- Explainer
  - A proposal to partition :visited link history by top-level site and frame origin.
    - https://github.com/explainers-by-googlers/Partitioning-visited-links-history
- Requirements Doc
- Mozilla Standard Position
  - Partitioned :visited links history · Issue #1040 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1040
- Webkit Position
  - Partitioning :visited links history · Issue #363 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/363
- TAG Design Review
  - Partitioning :visited links history · Issue #896 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/896
- Intents
  - Intent to Experiment: Partitioning :visited links history Phase 1
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/U5AX0OXaxM8
  - Intent to Experiment: Partitioning :visited links history Phase 2
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/qbHl0W-75zA
  - Intent to Ship: Partitioning :visited links history
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/8dZqt8JuLdc
- Chrome Platform Status
  - Partitioning :visited links history - Chrome Platform Status
    - https://chromestatus.com/feature/5101991698628608
- WPT (Web Platform Test)
- DEMO
- Blog
  - Making :visited more private
    - https://developer.chrome.com/blog/visited-links
- Presentation
- Issues
  - Partition :visited links history [40064793] - Chromium
    - https://issues.chromium.org/issues/40064793
- Other
  - webappsec/meetings/2023/2023-06-21-minutes.md at main · w3c/webappsec
    - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-06-21-minutes.md