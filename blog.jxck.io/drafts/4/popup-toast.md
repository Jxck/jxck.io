# [dialog][popover] Dialog と Popover #3

## Intro

ここまでで `<dialog>` 要素が標準化され、 Modal/non-Modal な Dialog がネイティブで出せるようになった。

今まで自前で実装してた `z-index` の指定や、フォーカスの管理や、非活性化、キーボードでの処理、スタイルなども、細かい仕様がほぼ標準によってカバーされた。

- Top Layer
- inert
- :modal / ::backdrop
- CloseWatcher
- Focusable Scrollers
- etc

しかし、 `<dialog>` はあくまで「ユーザのインタラクションを求める」という用途で使うものであり、 `role=dialog` ではない、例えばちょっとしたメッセージの通知などに使うものではない。

そこで、これらの資産を活用し、より汎用的な UI を標準化しようと言う話が、 `<dialog>` の標準化の裏で並行して行われた。

## Toast

最初の目立った提案は、 `<toast>` だった。

Toast UI とは、画面の右下などに、焼けたトーストのようにひょこっと通知が飛び出し、しばらくしたら消えるような UI を指す。

![Toast UI](./1.toast.drawio.svg#400x150)

Toast は元々 iOS 文化圏の表現らしく、Android では Snackbar とも言うらしい。いずれも、英語圏ですらそこまで馴染みのある言葉ではないらしく。「なぜ Toast なのか？」は FAQ だったようだ。

Toast 自体は、通知の意味合いが強く、特にユーザにインタラクションを求めなかったり、操作しなくても時間が経てば消えるといったケースが多い。名前に差はあれど、様々な UI ライブラリが提供しており、これも HTML に欲しいということで、 `<toast>` や `<std-toast>` といった提案がなされた。

ちなみに、様々な実装の調査(共通する仕様、できることできないこと)が以下にまとまっている。

- std-toast/study-group at master - jackbsteinberg/std-toast
  - https://github.com/jackbsteinberg/std-toast/tree/master/study-group

この調査を見てもわかるように、頻出パターンでありながらばらつきはかなりある。そして、決して使いやすい実装ばかりでもない。

もちろん、少し古い記事を探せば "How to build a Toast component" といったノウハウ記事はたくさん出てくるように、自前での実装も多々なされてきた。しかし、使いにくいものばかりではないのは `<dialog>` と同様だ。

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

ところが、この提案を実装する上で "Intent to Implement" には、「Chrome が勝手に思いつきで標準を実装するな」といったような意見が出てきた。

- Intent to Implement: Toast UI element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gl7FIKM5IFw/m/tA70X9ZIBQAJ

これは、「試しに実装してみるよ」の Intents が "Intent to Implement" という名前であり、その次は "Intent to Ship" という流れだったのもある。これはあくまでプロトタイプなんだということを強調するために、この後 "Intent to Implement" はなくなり、代わりに "Intent to Prototype" というステップに名前が変えられた。

これはまだ 2019 年ごろの話で、当時は Layered API という、頻出するパターンは共通する基盤を整備して、その上に実装できるようにしようといったコンセプトが一時的に流行っていた。(fetch, URL, FormData, Encoder... の頃)

`<std-toast>` があれば、飛び出して他の要素の上に被さる系の UI は、全てその応用で実装可能というイメージで、それを `std-` をつけることで、カスタムコンポーネントのブラウザネイティブライブラリのような位置付けで実装する、という取り組みの流れを汲んだ最初で最後の HTML 提案だった。

ちなみに、この "Intent to Prototype" は 2019 年で、 Firefox が `<dialog>` をリリースするのは 2020 年だ。つまり、 `<toast>` の議論時期的は `<dialog>` の実装がまだ Chrome くらいしかない頃から、並行して行われていたことがわかる。先に `<dialog>` の作業を進める間一旦影をひそめ、ひと段落してから再度議論が盛り上がっていく。

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
  - Focus が `<popup>` の外に行く

ESC で閉じるのは Modal Dialog でも同じだった。しかしそれ以外にもフックがあり、ライトに表示させてライトに閉じられることを重視してることがわかる。

実際には Light Dismiss の概念が `<popup>` で議論され、それを逆輸入する形で `<dialog>` に部分的に持っていくことになったのだ。

- Support disabling CloseWatcher integration in `<dialog>` · Issue #10592 · whatwg/html
  - https://github.com/whatwg/html/issues/10592

しかし `<dialog>` は Popover ほどは Light Dismiss ではなく、 ESC で閉じたりはできるが、背面クリックなどは自分で実装する必要がある。もし `<dialog>` をより Light Dismiss にしたい場合については、後ほど「`<dialog>` を `popover` する」という方法を解説する。

次に大きいのが Anchoring だ。 Anchoring も次回詳細を解説するが `<popup>` を開いた対象と、相対的なポジショニングができるように紐づけると言ったものだ。これも `<popup>` の時点で言及がある。

個人的なツボは、前回解説したメソッド名の対称性だ。「`<dialog>` は show/close を選んだが、それはあんま良くない。 `<popup>` は show/hide を選ぶし、 `<dialog>` は仕様なおした方が良い」といったことを書いている。

この Light Dismiss から派生して出てきた仕様が 2021 年に公開される。

それが ModalCloseWatcher だ。

## ModalCloseWatcher

`<popup>` の Intents とほぼ同時に、もう一個 Intents が出る。

- Intent to Prototype: ModalCloseWatcher
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NA5NC16OmsU

で、 Explainer はというと

- history_api/history_and_modals.md at master - slightlyoff/history_api
  - https://github.com/slightlyoff/history_api/blob/master/history_and_modals.md

もともとは history_api にあったことがわかる。

そう。これこそ Android の戻るボタン問題で、 Android では「戻る」でも modal を閉じることができたんだ。それを実現するために変に「戻る」をフックするために keyup とか history で実装しがちだから、新しく history API の整理上ですげー邪魔だったんだよね。って話を Domenic がしてる。

- Domenic Denicola on Twitter / X
  - https://x.com/Domenic/status/1339675541083971586

たぶん history API の改善版ともいえる、 Navigation API をちょうどこのころやってたから何だろうなぁって感じ。

だから、 Android の戻るが「画面を戻る」ことも「Modal を閉じる」ことも、 OS が用意した体験がちゃんとできるように、 Modal を Close するようなイベントを監視する Watcher が欲しいってことでできたもの。

そう、これこそ dialog でやった CloseWatcher の原型なんだんよね。これが Light Dismiss の実現にも大きく寄与していくし、結果的に dialog にも使われることになる。

後の Close Watcher の Explainer の方を確認していおこう。

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

あと、 OS が用意している Modal Close な操作が他にも書かれてるんだけど、 iOS の VoiceOver には "z" ジェスチャーってのがあるとか、他にも将来的に何かあたらしいデバイスが出ても吸収できるってされてて、そうだよねーって感じ。

ちなみに、単体で使うとこう。とはいっても、単体で使うことはあまりないと思うけどね。

(仕様として整備して、 API は Export してるけど、大抵は dialog や popover を使うべき)

```js
const watcher = new CloseWatcher();

watcher.onclose = () => {
  myModal.close();
};
```

## `<popup>` の問題

dialog の議論と実装がブラウザ間でゴリゴリと進んだちょっとあとくらい 2022/3 にさっきの `<popup>` の Intents (長らく止まってたスレッド)に突然こんなメッセージが投稿される。

> I'm sending a PSA/update to this (old!) intent to prototype thread. Based on some conversations that we've been having in OpenUI about the shape of the popup API, we've decided to modify the approach.
>
> この (old!) intent to prototype スレッドに PSA/update を送ります。popup API について OpenUI で交わされたいくつかの議論に基づき、アプローチを変更することにしました。
>
> The prior I2P described a new `<popup>` element. I've updated the chromestatus entry and re-wrote the explainer to describe a `popup` content attribute.
>
> 以前の I2P では、新しい `<popup>` 要素について説明しました。私は chromestatus のエントリを更新し、`popup`属性を記述するように Explainerを書き直しました。
>
> This new idea avoids some serious accessibility issues with `<popup>`, and also enables a more powerful API that can be used for more applications.
>
> この新しいアイデアによって、 `<popup>` のアクセシビリティに関するいくつかの深刻な問題を回避することができ、また、より多くのアプリケーションに使用できる、より強力な API を実現することができます。
>
> I plan to implement the new API under a new flag, leaving the HTMLPopupElement flag around in the meantime, because the `<selectmenu>` prototype depends on that implementation.
>
> `<selectmenu>` プロトタイプはこの実装に依存しているので、その間に HTMLPopupElement フラグを残しておきます。
>
> Once I've migrated `<selectmenu>` to the new API, I'll remove the old `<popup>` element implementation.
>
> `<selectmenu>` を新しいAPIに移行したら、古い `<popup>` 要素の実装を削除します。

なんと、 `<popup>` には問題があったんだね。で、ここで `popup` 属性に変えられたと。(まだ `popover` じゃないよ！)

OpenUI の議論ってどんなだったんだろうというと、ここだね。

- New Approach for Popup - Issue #455 - openui/open-ui (github.com)
  - https://github.com/openui/open-ui/issues/455#issuecomment-1050172067

ここは議論のまとめって感じの issue だけど、そこにリンクされている最も大きいものの一つが、 Domenic があげた「`<popup>` の role は何か？」というものだ。

- HTMLPopupElement · Issue #680 · w3ctag/design-reviews
	- https://github.com/w3ctag/design-reviews/issues/680#issuecomment-943472331

もともと、 `<popup>` には「select menu を出す」とか、「ティーチング UI」とか、浮かび上がる系の UI をカバーするという目的で考えられてたけど、それってセマンティクスはなんなんだろう？ "select menu" と "teaching ui" が同じってことはなくね？それとも、それぞれの目的ごとに HTML 要素作るつもり？？

みたいなもの。そう、 popup ってのは「動き」のことであって、その中にあるコンテンツの「意味」とは別だよねってことだったんだ。これは、責任も分離されてないので、そこをきちんと分離するためには、「意味」は既存の HTML / role に任せて、その任意の HTML を Top Layer に表示したり Light Dismiss するための機能として popup を属性としてなんにでも使えるように変えることになったんだ。

ということで、 `<popup>` がダメだった理由がそんな感じに仕様にもまとめられてるよ。

- Popup API Alternatives | Open UI
	- https://open-ui.org/components/popup.proposal.alternatives/#alternative-dedicated-popup-element


## popup 属性

ということで `<popup>` 要素から、 popup 属性に進化した新しいプロポーサルができまして。

- mfreed7/popup: Alternative popup proposal
  - https://github.com/mfreed7/popup

で、今こんな感じになった。

```html
<div popup=popup>I'm rendered on top!</div>
```

おお、だいぶ今俺らが知ってる popover に近づいてきたぞ！

そして、この要素には三つの値が定義されている。

1.  popup=popup
    1.  他の popup / hint を閉じる
    2.  light dismiss する
2.  popup=hint
    1.  他の hint は閉じるが popup は残す
    2.  light dismiss に加えて時間が経つと勝手に消える
3.  popup=async
    1.  他を閉じない
    2.  light dismiss もしない

で、ここで初めて trigger という概念も一緒に入るんだ。 JS がなくても button を使ってこの popup を popup できるようにしようってこと

```html
<button triggerpopup=mypopup>Click me</button>
<div id=mypopup popup=popup>Popup content</div>
```

で、 Chrome も早速 2022/8 に Intents を出すよ。

- Intent to Experiment: The Pop-Up API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sp5UI7RaaGg

これを使うブログも公開

- Pop-ups: They're making a resurgence!  |  Blog  |  Chrome for Developers
  - https://developer.chrome.com/blog/pop-ups-theyre-making-a-resurgence


2022/9 には TPAC があって、そこでも popup の現状が議論されてるよ。この時点でももうすでに属性値とか色々変わってることがわかる。

TODO: popup の属性は auto/hint/manual がある

さらに、 HTML からの操作のための属性も増えてる。

TODO: popup を操作するための 3 つの属性

そして、 この TPAC では、 Anchor Positioning についても紹介されるんだ。

- TPAC 2022 - CSS Anchoring
  - https://jhey-presents.netlify.app/tpac-2022/

popup した要素は、 Top Layer に表示されちゃうから、例えば button をクリックして開いた時に、 button の近くに表示するってことができない。(なぜなら、 button は Top Layer にないから)

これを解決するために、 button を popup の anchor として指定すると、そこからの相対位置で表示できるよってもの。しかも、 popup が画面をはみ出さないように、　 viewport に合わせて位置を変えてくれるような機能ももうすでに考えられていたことがわかるね。

TODO: anchor で viewport が縮まった時に自動で位置を修正する

今の popover に通じる考え方が、もうすでにだいぶ揃ってるね。

## popup という名前

ところで、 popup って言葉は、今までも Web で使われてたんだよねぇ。。

例えば、 `window.open()` で開く window を popup って言ってきたし、それらを踏まえた上ですでに Web には `allow-popups` みたいな用語が Permission とかで使われてたりしてたんだ。

それを Top Layer に表示するみたいな、全く別の機能に使っていいのか？っていう指摘が、また Domenic から入る。

- New feature proposal: Popover API · Issue #7785 · whatwg/html
  - https://github.com/whatwg/html/issues/7785#issuecomment-1284656230

確かにそうだよねぇってことで、再度名前どうするかって議論が再開するんだ。

- [popup] Should we rename popup due to potential developer confusion? · Issue #627 · openui/open-ui
  - https://github.com/openui/open-ui/issues/627

候補はこんな感じだったみたい。

- float
- floatable
- popover
- positioned
- overlay
- popout
- popper
- (Domenic は toplayer って提案してた)

で、議論(bikeshed ?)した結果 2022/10 くらいに、ついに popover に決まったわけだ！

あー popover までいけなかったーーー

いよいよ次回は、このような紆余曲折を経てたどり着いた popover について！