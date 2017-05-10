# [whatwg][web-share] Web Share API

## Intro

Web Share API が Origin Trials を卒業したという知らせが届いた。

コンテンツを他のサービスなどと連携するこの API について紹介する。


## Web Share

ブラウザで開いている Web コンテンツを、他のサービスやアプリと連携するための方法は、以前から検討されていた。
主だったものとしては、すでに策定は止まっているが Android の Intent を参考にした [Web Intents](https://www.w3.org/TR/web-intents/) が挙げられる。

Android の Intent は、当然 Android に強く依存しているため、そのまま標準化する方針に近かった Web Intents は、より汎用的なデバイス連携を視野に入れ、大きく複雑になったことが問題となった。

同様に、 Safari を含めた多くのデバイスは、独自に閲覧中の URL/Title などを他のアプリと連携する機能を有しているが、これらはデバイスに強く依存し、コンテンツ制作者はデバイスの挙動に最適化する必要があり、制限も大きい。

Web Share API は、 Web コンテンツと SNS やメールなどとの連携を主目的とした、より簡素で軽量な API となっているため、コンテンツ制作者は、その範囲で share の挙動をコントロールし、デバイスとの安定した連携が可能になる。


## DEMO

DEMO を以下に公開している。
(まだ Origin Trials のトークンはそのままになっている)

[http://labs.jxck.io/webshare/](http://labs.jxck.io/webshare/)


## API

API は非常に簡素だ。
現状設定可能なパラメータは、 `title`, `text`, `url` のみである。

```js
if (navigator.share !== undefined) {
  document.getElementById("support").textContent = "supported";
}

const shareButton = document.getElementById("share");
navigator
  .share({
    title: "Web Share DEMO",
    text: "DEMO of Web Share API enabled by Origin Trials",
    url: window.location.href
  })
  .then(console.log.bind(console))
  .catch(console.log.bind(console));
```

こうした API であるため、 `navigator.share` を見ることで、サポートの有無を判別できる。
結果は Promise を返し、 Share の成功可否によって変わる。

また、 Web Share は Share の発信だけで無く、受信についても視野に入れいている。
現状その API は議論中だが、同様に navigator を基本に拡張されていくと思われる。


簡素な Share の送信だけであれば、以下のような URI Scheme の策定も可能かもしれない。

```html
<a href="share:?title=Example%20Page&amp;url=https://example.com/page">Share this</a>
```

しかし、上述のような サポート判別/成功判別/受信側の拡張 などを考えると JS API としての策定が妥当であるとし、今回の API が策定された。


Web Share を標準化する上での方針などについては以下にまとまっている。

[https://github.com/WICG/web-share/blob/master/docs/explainer.md


## Origin Trials の卒業

Web Share は Origin Trials を卒業したため、しばらくするとトークンなしでも機能が使えるようになる予定とのことだ。
しかし、これは仕様の策定が終わったことも、ブラウザの普及が進んだことも意味しない。

あくまで、仕様策定作業を開始するにあたっての WIP リクエストが、最低限のフィードバックを集めマージされたようなものだと考えるのが近いかもしれない。
