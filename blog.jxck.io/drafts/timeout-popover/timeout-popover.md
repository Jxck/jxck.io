
### Toast の Timeout

Toast といえば、時間が経てば勝手に消えるイメージがないだろうか?

Popover の仕様の源流ともなった `<toast>` の提案でも、調査の結果多くの実装がそうなっているという点が挙げられている。

>  Toasts are often displayed in the corner of app UI, and often disappear on a timeout.
> --- https://open-ui.org/components/toast.research/

筆者も、 Toast とはそういうもので、 Popover で Toast を実装する際も `setTimeout` で `hidePopover` する実装が普通に行われるだろうと思っていた。

なんなら、当時の HTML の仕様には、以下のようなサンプルコードが載っていた。

- 6.12 The popover attribute
  - https://html.spec.whatwg.org/multipage/popover.html#the-popover-attribute

```html
<button id=submit>Submit</button>
<p><output><span popover=manual></span></output></p>

<script>
 const sBtn = document.getElementById("submit");
 const outSpan = document.querySelector("output [popover=manual]");
 let successMessage;
 let errorMessage;

 /* define logic for determining success of action
  and determining the appropriate success or error
  messages to use */

 sBtn.addEventListener("click", ()=> {
  if ( success ) {
   outSpan.textContent = successMessage;
  }
  else {
   outSpan.textContent = errorMessage;
  }
  outSpan.showPopover();

  setTimeout(function () {
   outSpan.hidePopover();
  }, 10000);
 });
</script>
```

であれば `showPopover()` に AbortSignal が渡せれば、 `AbortSignal.timeout()` で閉じられるから便利ではないかという質問をしたところ、「そもそも時間が経ったら消える UI は WCAG 違反だ」というコメントを、Keith Cirkel から受けた

- Add AbortSignal for popover.showPopover() for initialize internal CloseWatcher · Issue #10428 · whatwg/html
  - https://github.com/whatwg/html/issues/10428#issuecomment-2186642041

引用しているのは以下だ。

- G5: Allowing users to complete an activity without any time limit | WAI | W3C
  - https://www.w3.org/WAI/WCAG22/Techniques/general/G5.html

> The objective of this technique is to provide users with all the time they need to complete an activity.
> This technique involves providing a specified activity which does not require timed interaction. 
> Users are allowed as much time as they need to interact with the activity.
> --- https://www.w3.org/WAI/WCAG22/Techniques/general/G5.html

筆者の解釈は「ユーザに明示的な操作を求める場合はそもそも `<dialog>` などを使うべき」という点で話がずれているように感じていたが、そうではなく Keith にとってはタイムアウトする `<toast>` はアウトらしい。

> Any interaction that is timed fails the criterion. A `<toast>` which pops up a temporal message fails the criterion.
> --- https://github.com/whatwg/html/issues/10428#issuecomment-2186785118

ここには "activity" とされているものの解釈が、 Example にあるように明示的な「操作」を指しているのか、「メッセージの確認も含む」と解釈するのかによって、幅があるように思わなくもない。また、これまで時間が経ったら消える `<toast>` 実装が多かったのは、通知が溜まることに対する問題もあったように思う。

あまりに早く消えても困るという当たり前の点を除いて、