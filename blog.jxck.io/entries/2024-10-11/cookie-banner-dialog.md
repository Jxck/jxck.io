# [dialog][popover] Dialog と Popover #8

## Intro

ここまで解説した仕様を踏まえ、いくつかの代表的なユースケースの実装について考えていく。

あくまで仕様の組み合わせ方についての解説であり、実装そのものの推奨ではない。

**また、ここで紹介する仕様はまだ変更の可能性があり、かつ実装も揃っていないものがある点に注意**


## Cookie バナー

次は、「Cookie 利用への同意」、いわゆる Cookie バナーの UI について考えてみる。想定するのは以下のようなものだ。

![画面の右下に表示される Cookie への同意 UI](./cookie-banner-dialog.drawio.svg#600x600)

前回の規約への同意と異なり、このバナーは画面表示時から右下に表示され、同意か拒否を選択するまで表示し続ける。つまり、表示中は他の操作をブロックしたりはしない。

つまり Dialog ではあるが Modal ではないため、`show()` する前提で実装を考えていく。


### HTML

HTML の注意点は、前回の規約と大きくは変わらない。

まず、最初から表示しておくために `open` 属性を付与しておく。

```html
<dialog open>
</dialog>
```

コントローラとしてはボタンが 2 つあり、ここに value を設定しておく。

```html
<form method="dialog">
  <button type="submit" value="reject">拒否する</button>
  <button type="submit" value="accept">同意する</button>
</form>
```


### CSS

次に CSS を考える。(`<dialog>` と関係ない部分は省略)

まず、配置としては画面の右下に固定配置するため、`position: absolute` で配置する。

```css
dialog {
  position: absolute;
  top: auto;
  right: 1%;
  bottom: 1%;
  left: auto;
}
```

アニメーションは規約と異なり、初期表示はアニメーションなしで、閉じる時だけアニメーションを行う実装にする。

```css
/* transition style */
dialog:not([open]) {
  opacity: 0;
  transition: 
    display var(--duration) allow-discrete, 
    overlay var(--duration) allow-discrete, 
    opacity var(--duration);
}
```

表示する場合は `display: none` からのトランジションになり、`@starting-style` が必要だが、今回は消すだけなので不要だ。


### JS

最後は JS だ。

同意の取得時にそのまま form を submit し、結果は `<button value>` の値として、`"close"` イベントのなかで取得できる。

```js
document.querySelector("dialog").addEventListener("close", (e) => {
  const returnValue = e.target.returnValue
  if (returnValue === "reject") {
  }
  if (returnValue === "accept") {
  }
})
```

この値で Cookie の利用を分岐すれば良さそうだ。


## DEMO

動作する DEMO を以下に用意した。

- Term Dialog DEMO | labs.jxck.io
  - https://labs.jxck.io/dialog/cookie.html