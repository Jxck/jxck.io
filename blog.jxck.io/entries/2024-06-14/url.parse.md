# [url][chromium] URL.parse を Chromium で Ship するまで

## Intro

Chrome 126 で筆者が実装した URL.parse が Ship された。

Chromium にコントリビュートしたことは何回かあったが、単体機能を Ship したのは初めてだった。


## invalid URL の処理

`new URL()` によって、文字列の URL をパースすることができるようになって久しいが、この API は invalid な場合に例外を投げる。

例外処理をするよりも、先に URL としてパース可能かどうかを知るための `URL.canParse()` が提案され、先に実装が進んだ。

```js
URL.canParse(str) // boolean
```

しかし、これでは二回パースが必要になるため無駄が多い。

```js
if (URL.canParse(str)) { // 1 回目のパース
  return new URL(str) // 2 回目のパース
}
```

そこで、失敗したら null にし、成功したら URL を返せば良いという発想が、 `URL.parse()` だ。

そもそも、リアルワールドでは以下のように例外を握りつぶすコードがよく使われていることも知られていたため、賛同が多かった。

```js
function URLparse(str) {
  try {
    return new URL(str)
  } catch (err) {
    return null
  }
}
```


## URL.parse

URL.parse の提案は以下で議論された。

- Consider adding non-throwing URL.parse(input, base) · Issue #372 · whatwg/url
  - https://github.com/whatwg/url/issues/372

その後 URL の仕様にマージされている。

- Add URL.parse() by annevk · Pull Request #825 · whatwg/url
  - https://github.com/whatwg/url/pull/825
- URL Standard
  - https://url.spec.whatwg.org/#dom-url-parse

使い方もそのままだ。

```js
URL.parse(str) // null or URL
```

機能としては小さく、 Firefox や Safari は比較的早く実装を進めていた。

- Firefox
  - 1887611 - Implement URL.parse()
    - https://bugzilla.mozilla.org/show_bug.cgi?id=1887611
  - Intent to prototype & ship: URL.parse()
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3QgJqDYpEwA/m/4n1pJEtqAAAJ
- WebKit
  - Implement URL.parse() by annevk · Pull Request #26403 · WebKit/WebKit
    - https://github.com/WebKit/WebKit/pull/26403

Firefox と Safari が実装したので、そろそろこの機能を使おうと思ったところ、 Chrome が未実装だったことに気づいた。


## Implementor Assign

Issue を調べると、その時点では Chrome だけまだアサインが浮いていた。

- Implement URL.parse() [331041242] - Chromium
  - https://issues.chromium.org/u/0/issues/331041242

仕様が小さいことも、ほぼ `URL.canParse()` と同じように実装できることがわかっていたので、自分で手を挙げたところアサインしてもらうことになり、実装に着手した。

小さいパッチは投げたことはあっても、単体の機能を実装するのは初めてだった。また、 crrev などはちょっと使わないとすぐにわからなくなるので、中の人にはかなり手取り足取り教えてもらいながら進めることになった。

一度教えてもらったことを何度も聞かないで済むよう、この作業中に教わったことは全て以下にまとめている。

- Chromium にコントリビュートするための周辺知識 | blog.jxck.io
  - https://blog.jxck.io/entries/2024-03-26/chromium-contribution.html

実装したパッチのレビューなどは以下で行った。

- Implement URL.parse() (5414853) · Gerrit Code Review
  - https://chromium-review.googlesource.com/c/chromium/src/+/5414853

書くコード自体は特に難しいところはなく、ただ書くだけだ。どちらかというと、レビュアーとの非同期なやり取りや、 CI を回すにも権限のある中の人に頼まないといけないあたりに、時間がかかったと思う。

また、こんな小さい機能でありながらも、新しい標準機能を Web Platform に出すためには、様々な角度からのレビューが行われる。具体的には、 Privacy, Security, Enterprise, Debuggability, Testing, API Owners の各 Approve を得て、初めて Ship できるのだ。

- URL.parse() - Chrome Platform Status
  - https://chromestatus.com/feature/6301071388704768?gate=4813144208965632

実装に着手したのが 4 月頭で、マージが 4 月末、そこから Ship のプロセスを進めたので、まるまる 1 ヶ月かかったことになる。


## Intent to Ship

今回もっとも良い経験になったのは、 Intents を初めて出したことだろう。

- Intent to Ship: URL.parse()
  - https://groups.google.com/u/0/a/chromium.org/g/blink-dev/c/G070zUd0e4c

これまで 10 年近く、ほぼ全ての Intents に目を通してきたが、自分がそれを出す側になることで、裏にあるプロセスやツールなど初めて知ることも多く、解像度もかなり上がった。

通常、新しい機能を実装するには、膨大なステップがある。

1. 仕様の提案
2. Explainer, Draft の作成
3. WG や Issue での議論
4. Tag Review
5. WPT などの整備
6. Intent to Prototype
7. Intent to Experiment
8. 様々な修正
9. Intent to Ship

本来、これを外部のコントリビューターが全て行うのは難しい。通常は中の人が行うのを手伝ったり、議論に参加したり、細かいバグを後から直したり、仕様の差分だけを実装したりといったコントリビュートが多いだろう。

しかし、今回は仕様策定がすでに終わり、他のブラウザも Implement/Ship 済みだったため、全部すっ飛ばして実装と Ship だけを行えるという、社会科見学としては最高のタスクに運良く携わることができた。

Stable が 124 の時にマージし、今週リリースされた Chrome M126 が Stable に落ちてきて、無事 `URL.parse()` の挙動を確認することができたので、やっとタスクとして終了した実感がある。

![Chrome 126 で URL.parse が動いているところ](url-parse-on-m126.png#1552x326)


## Outro

Chromium のコードはちょくちょくいじってはいるが、機能を Ship するのは基本的に敷居が高いため、良い経験になった。

ここまで面倒を見てくれた [@horo](https://x.com/horo) さん、 [@hayatoito](https://x.com/hayatoito) さん、 [@toyoshim](https://x.com/toyoshim) さんには非常に感謝しています。ありがとうございました。今後もコントリビュートは続けたいので、引き続きよろしくお願いします。


## Blink API Owners Gift

コードがマージされたあと、中の人(API Owner)からメールをもらった。機能の Ship までを行った人には、お祝いとしてギフトを贈るというものだった。

後日忘れた頃に国際郵便で届いたのは、 Chromium の LGTM ステッカーだった。

![Blink API Owners Gift](blink-api-owners-gift.png#4032x3024)

嬉しい。

すでに次のタスクももらってるので、そっちもガンバる。