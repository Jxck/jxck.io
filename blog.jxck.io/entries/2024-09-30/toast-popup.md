# [dialog][popover] Dialog と Popover #4

## Intro

ここまでで `<dialog>` 要素が標準化され、 Modal/non-Modal な Dialog がネイティブで出せるようになった。

今まで自前で実装していた `z-index` の指定や、フォーカスの管理、非活性化、キーボードでの処理、スタイルなども、細かい仕様がほぼ標準によってカバーされた。

- Top Layer
- inert
- :modal / ::backdrop
- CloseWatcher
- Focusable Scrollers
- etc

しかし、 `<dialog>` はあくまで「ユーザのインタラクションを求める」という用途で使うものであり、 `role=dialog` ではない、例えばちょっとしたメッセージの通知などに使うものではない。

そこで、これらの資産を活用し、より汎用的な UI を標準化しようという話が、 `<dialog>` の標準化の裏で並行して行われた。


## Toast

最初の目立った提案は `<toast>` だった。

Toast UI とは、画面の右下などに、焼けたトーストのようにひょこっと通知が飛び出し、しばらくしたら消えるような UI を指す。

![Toast UI](./1.toast.drawio.svg#400x150)

Toast は元々 iOS 文化圏の表現らしく、Android では Snackbar とも言うらしい。いずれも、英語圏でそこまで馴染みのある言葉ではないらしく「なぜ Toast なのか?」は FAQ だったようだ。

Toast 自体は、通知の意味合いが強く、特にユーザにインタラクションを求めなかったり、操作しなくても時間が経てば消えるといったケースが多い。名前に差はあれど、様々な UI ライブラリが提供しており、これも HTML に欲しいということで、 `<toast>` や `<std-toast>` といった提案がなされた。

ちなみに、様々な実装の調査(共通する仕様、できることできないこと)が以下にまとまっている。

- std-toast/study-group at master - jackbsteinberg/std-toast
  - https://github.com/jackbsteinberg/std-toast/tree/master/study-group

この調査を見てもわかるように、頻出パターンでありながらばらつきはかなりある。そして、決して使いやすい実装ばかりでもない。

もちろん、 Dialog と同様 "How to build a Toast component" といったノウハウ記事はたくさん出てくるように、自前での実装も多々なされてきた。しかし、使いにくいものばかりなのも Dialog と同様だ。

調査の結果、 Toast UI を提供する上で望ましい機能が、以下のようにまとめられた。

- タイトルがつけられる
- 本文が書ける
- アイコンがつけられる
- タイムアウトができる
  - タイムアウトまでのプログレスバーも出せる
- Close Button がある
- Toast 上にも Button が置ける
- Dismiss する方法がある
- 状態に応じた Event が発火し Callback が書ける

ところが、この提案を実装する上で "Intent to Implement" には、 `<toast>` もセマンティクスではなくスタイルの問題である点を指摘しつつ「Chrome がマーケット支配力を利用して、勝手に実装を標準にするな」といったような意見が出てきた。

- Intent to Implement: Toast UI element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gl7FIKM5IFw/m/tA70X9ZIBQAJ

これは、「試しに実装してみるよ」の Intents が "Intent to Implement" という名前であり、その次は "Intent to Ship" という流れだったのもある。これはあくまでプロトタイプなんだということを強調するために、この後 "Intent to Implement" はなくなり、代わりに "Intent to Prototype" というステップに名前が変えられた。

この議論をしている 2019 年ごろは、 Layered API という、頻出するパターンは共通する基盤を整備して、その上に実装できるようにしようといったコンセプトが一時的に流行っていた。(fetch, URL, FormData, Encoder... の頃)

その流れから、 `<std-toast>` があれば、飛び出して他の要素の上に被さる系の UI は、全てその応用で実装可能というイメージで、それを `std-` をつけることで、カスタムコンポーネントのブラウザネイティブライブラリのような位置付けで実装する、という取り組みの流れを汲んだ最初で最後の HTML 提案だった。

ちなみに、この "Intent to Prototype" は 2019 年で、 Firefox が `<dialog>` をリリースするのは 2020 年だ。つまり、 `<toast>` の議論時期的には `<dialog>` の実装がまだ Chrome くらいしかない頃から、並行して行われていたことがわかる。先に `<dialog>` の作業を進める間一旦影をひそめ、ひと段落してから再度議論が盛り上がっていく。


## `<popup>` 要素

2020 年に `<dialog>` が躍進した翌年、 2021 年のはじめに `<popup>` の Intents が出される。

- Intent to Prototype: HTMLPopupElement - `<popup>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9y-Thg9UCxY

Explainer は以下。

- MSEdgeExplainers/Popup/explainer.md at main - MicrosoftEdge/MSEdgeExplainers
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Popup/explainer.md

つまり、 OpenUI 側で議論した結果 `<toast>` ではなく `<popup>` の方が良いということで、リネームされたものだ。

そして、この Intents の時点では `<dialog>` との違いについて以下のように説明されている。

> This new element is similar to `<dialog>`, but has several important differences, including Light Dismiss behavior, anchoring, and the lack of a "modal" mode.
>
> `<dialog>` との大きな違いは、 Light Dismiss で anchoring があって、 Modal mode がないこと。

ここで言ってる Light Dismiss は、前回解説したものだ。初期は `<popover>` において大事な概念とされ、要するに「割と簡単に閉じられる」といった意味だった。この時点の仕様では以下のように書かれている。

- 以下の場合に Light Dismiss になって暗黙的に閉じる
  - ESC を押す
  - Layout が変わる
  - 他の `<popup>` が開く
  - Focus が `<popup>` の外に行く

ESC で閉じるのは Modal Dialog でも同じだった。しかしそれ以外にもフックがあり、ライトに表示させてライトに閉じられることを重視していることがわかる。

実際には Light Dismiss の概念が `<popup>` で議論され、それを逆輸入する形で `<dialog>` に部分的に持っていくことになったのだ。

- Support disabling CloseWatcher integration in `<dialog>` · Issue #10592 · whatwg/html
  - https://github.com/whatwg/html/issues/10592

しかし `<dialog>` は Popover ほどは Light Dismiss ではなく、 ESC で閉じたりはできるが、 backdrop クリックなどは自分で実装する必要がある。もし `<dialog>` をより Light Dismiss にしたい場合については、後ほど「`<dialog>` を `popover` する」という方法を解説する。

次に大きいのが Anchoring だ。 Anchoring も次回詳細を解説するが `<popup>` を開いた対象と、相対的なポジショニングができるように紐づけるといったものだ。これも `<popup>` の時点で言及がある。

個人的なツボは、前回解説したメソッド名の対称性だ。「`<dialog>` は show/close を選んだが、それはあんま良くない。 `<popup>` は show/hide を選ぶし、 `<dialog>` は仕様を直した方が良い」といったことを書いている。

この Light Dismiss から派生して出てきた仕様が 2021 年に公開される。

それが ModalCloseWatcher だ。


## ModalCloseWatcher

`<popup>` の Intents とほぼ同時に、もう一つ Intents が出る。

- Intent to Prototype: ModalCloseWatcher
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NA5NC16OmsU

で、 Explainer はというと

- history_api/history_and_modals.md at master - slightlyoff/history_api
  - https://github.com/slightlyoff/history_api/blob/master/history_and_modals.md

もともとは History API にあったことがわかる。

そう。これこそ Android の戻るボタン問題で、 Android では「戻る」でも modal を閉じることができた。それを実現するために変に「戻る」をフックするために `keyup` や History をいじって実装しがちだが、新しく History API を整理する上で問題になった。という話を Domenic がしている。

- Domenic Denicola on Twitter / X
  - https://x.com/Domenic/status/1339675541083971586

おそらく History API の改善版ともいえる、 Navigation API に丁度この頃取り組んでいたからだろう。

これを解決するため、Android の戻るが「画面を戻る」ことも「Modal を閉じる」ことも、 OS が用意した体験がちゃんとできるように、 Modal を Close するようなイベントを監視する Watcher が欲しいということでできたものだ。

これこそ `<dialog>` で解説した Close Watcher の原型だ。これが Light Dismiss の実現にも大きく寄与していくし、結果的に `<dialog>` にも使われることになる。

後の Close Watcher の Explainer の方を確認しておこう。

- close-watcher/README.md at main - WICG/close-watcher
  - https://github.com/WICG/close-watcher/blob/main/README.md

> Various UI components have a "modal" or "popup" behavior. For example:
>
> - a `<dialog>` element, especially the `showModal()` API;
> - a sidebar menu;
> - a lightbox;
> - a custom picker input (e.g. date picker);
> - a custom context menu;
> - fullscreen mode.

他にも OS が用意している Modal Close な操作が書かれており、 iOS VoiceOver にある "z" ジェスチャーや、他にも将来的に何か新しいデバイスが出た際も、ここで吸収できる。


## `<popup>` の問題

`<dialog>` の議論と実装が進んだ少し後の 2022/3 に、先ほどの `<popup>` の Intents (長らく止まっていたスレッド)に以下のメッセージが投稿される。

> I'm sending a PSA/update to this (old!) intent to prototype thread. Based on some conversations that we've been having in OpenUI about the shape of the popup API, we've decided to modify the approach.
> The prior I2P described a new `<popup>` element. I've updated the chromestatus entry and re-wrote the explainer to describe a `popup` content attribute.
> This new idea avoids some serious accessibility issues with `<popup>`, and also enables a more powerful API that can be used for more applications.
> I plan to implement the new API under a new flag, leaving the HTMLPopupElement flag around in the meantime, because the `<selectmenu>` prototype depends on that implementation.
> Once I've migrated `<selectmenu>` to the new API, I'll remove the old `<popup>` element implementation.
>
> この (old!) intent to prototype スレッドに PSA/update を送ります。popup API について OpenUI で交わされたいくつかの議論に基づき、アプローチを変更することにしました。
> 以前の I2P では、新しい `<popup>` 要素について説明しました。私は chromestatus のエントリを更新し、`popup` 属性を記述するように Explainer を書き直しました。
> この新しいアイデアによって、 `<popup>` のアクセシビリティに関するいくつかの深刻な問題を回避することができ、また、より多くのアプリケーションに使用できる、より強力な API を実現することができます。
> `<selectmenu>` プロトタイプはこの実装に依存しているので、その間に HTMLPopupElement フラグを残しておきます。
> `<selectmenu>` を新しい API に移行したら、古い `<popup>` 要素の実装を削除します。

`<popup>` という要素自体にあった問題を解決するため、要素から `popup` 属性に変えられたという内容だ。(まだ `popover` ではない)

OpenUI の議論は以下だ。

- New Approach for Popup - Issue #455 - openui/open-ui (github.com)
  - https://github.com/openui/open-ui/issues/455#issuecomment-1050172067

ここは議論のまとめという感じの Issue だが、ここにリンクされている最も大きいものの一つが、 Domenic があげた「`<popup>` の `role` は何か?」というものだ。

- HTMLPopupElement · Issue #680 · w3ctag/design-reviews
  - https://github.com/w3ctag/design-reviews/issues/680#issuecomment-943472331

もともと、 `<popup>` には「select menu を出す」、「Teaching UI」など、浮かび上がる系の UI をカバーするという目的で考えられていたが、そのセマンティクスはなんなんだろう? というものだ。"select menu" と "teaching ui" が同じということはないだろう、しかし、それぞれの目的ごとに HTML 要素を作り続けるのだろうか?といったものだ。 Intent to Implement を出した時の指摘も同じだ。

つまり "popup" というのは「動き」のことであり、その中にあるコンテンツの「意味(semantics)」とは別だということだ。ここをきちんと分離するためには、「意味」は既存の HTML / Role に任せ、その任意の HTML を Top Layer に表示したり Light Dismiss するための機能として "popup" するための属性にし、様々なユースケースに使える方が妥当という判断だ。

- Popup API Alternatives | Open UI
  - https://open-ui.org/components/popup.proposal.alternatives/#alternative-dedicated-popup-element


## popup 属性

以上のように `<popup>` 要素から popup 属性に変更した、新しいプロポーサルができた。

- mfreed7/popup: Alternative popup proposal
  - https://github.com/mfreed7/popup

現状は以下のようなものだ。

```html
<div popup="popup">I'm rendered on top!</div>
```

そして、この要素には 3 つの値が定義されている。

- popup="popup"
  - 他の popup / hint を閉じる
  - Light Dismiss する
- popup="hint"
  - 他の hint は閉じるが popup は残す
  - Light Dismiss に加えて時間が経つと勝手に消える
- popup="async"
  - 他を閉じない
  - Light Dismiss もしない

ここで初めて trigger という概念が入る。 JS がなくても button を使ってこの `popup` を Popup できるようにするものだ。

```html
<button triggerpopup="mypopup">Click me</button>
<div id="mypopup" popup="popup">Popup content</div>
```

これを受け、Chrome も早速 2022/8 に Intents を出し、ブログを公開する。

- Intent to Experiment: The Pop-Up API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sp5UI7RaaGg
- Pop-ups: They're making a resurgence!  |  Blog  |  Chrome for Developers
  - https://developer.chrome.com/blog/pop-ups-theyre-making-a-resurgence

2022/9 には TPAC があり、そこでも popup の現状が議論された。この時点で、もうすでに属性値とか色々変わってることがわかる。

- Open UI TPAC Update 2022.pptx - Microsoft PowerPoint Online
  - https://onedrive.live.com/view.aspx?resid=5ACBE28A578FB511!3079257&ithint=file%2cpptx&authkey=!AH8NhgDiDmD1j-M

- auto
  - menu や control に最適
- hint
  - tooltip に最適
- manual
  - notification, toast, alert に最適

さらに、 HTML からの操作のための属性も増えている。

- popupshowtarget
- popuphidetarget
- popuptoggletarget

そして、この TPAC では、 Anchor Positioning についても紹介される。

- TPAC 2022 - CSS Anchoring
  - https://jhey-presents.netlify.app/tpac-2022/

Popup した要素は、 Top Layer に表示されるため、例えば `<button>` をクリックして開いた時に、 `<button>` の近くに表示することができない。(なぜなら、 `<button>` は Top Layer にないから)

これを解決するために、 `<button>` を `popup` の Anchor として指定すると、そこからの相対位置で表示できるものだ。さらに、 `popup` が画面をはみ出さないように、 Viewport の大きさに合わせて自動で配置を変える、Anchoring のデモで必ず出てくる機能も、ここですでに考えられていたことがわかる。

今の `popover` に通じる考え方が、もうすでにだいぶ揃っている。


## popup という名前

"popup" という言葉は、今までも Web で使われてきた。

例えば、 `window.open()` で開く Widnwo を Popup と呼んできたし、それらを踏まえた上で、すでに Web には `allow-popups` などの用語が Permission などで使われている。

これを Top Layer に表示するといった、全く別の機能に使っていいのか? という指摘が、また Domenic から入る。

- New feature proposal: Popover API · Issue #7785 · whatwg/html
  - https://github.com/whatwg/html/issues/7785#issuecomment-1284656230

ここで、再度名前を変更する議論が再開した。

- [popup] Should we rename popup due to potential developer confusion? · Issue #627 · openui/open-ui
  - https://github.com/openui/open-ui/issues/627

候補は以下のようなものが見て取れる。

- float
- floatable
- popover
- positioned
- overlay
- popout
- popper
- (Domenic は toplayer と提案していた)

議論(bikeshed)の結果、2022/10 くらいに名前が "popover" に決まった。

いよいよ次回は、このような紆余曲折を経てたどり着いた Popover の仕様について解説する。