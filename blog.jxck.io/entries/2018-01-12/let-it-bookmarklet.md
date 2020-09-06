# [boolmarklet] Bookmarklet という一番身近な自動化技術


## Intro

「毎回やるなら bookmarklet にでもすれば?」と言ったら、後輩が「そんな便利なことできたんですね、知りませんでした」と言ってた。

そんな時代にこそ、今更だれも解説しないであろう、 bookmarklet という技術についてもう一度書いておく。


## Bookmarklet

簡単に言えば、 JS を書き、それを Bookmark として登録すれば、クリックするだけで現在のページでそれが動くというもの。

ブラウザ上で何かを自動化したいと思うなら、一番簡単に実現できる便利な技術だ。

似たような手法ではブラウザの Extension などもあるが、 Bookmarklet の良いところは一切誰にも邪魔されないというところだ。

開発者登録も、ストアへのアップロードも、難解なドキュメントを忖度して煩雑な設定ファイルを書く必要もない。

開発者ツールで、「こんなことできないかな」と試し終わった時には、もうそれは完成していると言って良い。


## チュートリアル

1. 開発者ツールで、そのページに対して行いたい処理を書く(ここでは `alert("hello")` としておく)
2. そのコードの最初に `javascript:` を付与する (`javascript:alert("hello")`)
3. ブックマークを登録する処理を行い、 URL の欄にコードを追加する

![screencast of adding bookmarklet to browser](bookmarklet.gif#832x539 'bookmarklet on firefox')


## 使用例

用途がイメージしやすそうな例を書いておく。

もちろん、ページの仕様が変われば動かなくなるが、雑に直しても誰にも迷惑がかからないのが良いところだ。


### github pdf

その後輩は、 github の markdown を PDF にして協力会社に送る(!!?)のに、ページごとに開発者ツールから周りの DOM をポチポチ消して整形していた。

例えば、以下の README.md だった場合は、雑にやるとこんな感じでできそうだ。


```js
javascript: (() => {
  const readme = document.querySelector('#readme');
  document.body.innerHTML = "";
  document.body.appendChild(readme);
})()
```

整形したら印刷で PDF に保存すれば良い。

ただ、そもそもの解決策が本当にこれなのかは疑問もあるが。


### header id link

ヘッダ要素が ID を持ってるので、ヘッダに対してリンクを貼りたいが、リンクになってないのでソースを見ないといけない場合。

それをリンクに直して、遷移できるようにする。


```js
javascript: (() => {
  let url = new URL(location.href);
  for (let $h of document.querySelectorAll('h1, h2, h3, h4')) {
    let $a = document.createElement('a');
    $a.textContent = $h.textContent;
    $h.textContent = '';
    url.hash = $h.id;
    $a.href = url.toString();
    $a.style.color = getComputedStyle($h).color;
    $h.appendChild($a);
  };
})();
```

共有したい場合なども便利。


### Twitter Colored Link

Twitter のリンクが色も Underline も付かなくなって以降、 URL がどこにあるのかパッとわかりにくい。

そこで、対象の `<a>` に色をつける。


```js
javascript:Array.from(document.querySelectorAll('.js-display-url')).forEach((a) => a.style.color="red")
```

それっぽい Class をなんとか探すのがポイント。


### m3

Google の検索結果は、「期間指定」ができるが「1 ヶ月」の次が「1 年」で、極端な指定しかできない。

特に技術的な話などは、直近 3 ヶ月くらいがちょうど良い。

この期間選択は、検索結果の URL にクエリとして反映されているので、そこを置き換えると実現できる。

例えば 1 ヶ月を選ぶと以下が付与される。


```text
&tbs=qdr:m
```

この `m` を `m3` にすると 3 ヶ月になる。


```js
javascript:location.href += '&tbs=qdr:m3'
```


### canonical

綺麗な URL を取得したいのに、遷移元などの影響で不要なゴミクエリが付いているといった場合にそれを除去する。


```js
javascript:location.href = document.querySelector('link[rel="canonical"]').href
```

ところで、 Amazon の URL の canonical は以下のようになっている。


```url
https://www.amazon.co.jp/商品名/dp/XXXXXXXX
```

ただ、商品名が長いとブログなどに貼る時に URL が見づらくなる。

実際は dp 以降だけで良いので、商品名を削除してしまった方が使いやすかったりする。


```js
javascript:location.href = document.querySelector('link[rel="canonical"]').href.replace(/amazon.co.jp\/.*\/dp/, 'amazon.co.jp/dp');
```


### preslide

ネットワークが重いところで slideshare を見ると、ページを進めるたびにローディングでストレスだったので書いたもの。

一旦、最後のページまで自動で遷移させ、全ページ読み込みが終わったあたりで頭から読んでいる。

最後のページまで読むと次のスライドに映るという悪仕様があるため、手前で止めている。


```js
javascript: function loop(n) {
  if (n == 0) {return;}
  setTimeout(function() {
    document.querySelector("#svPlayerId > div.stage > div.rightpoint.pointly").click();
    loop(n-1);
  }, 100);
}; loop(parseInt(document.querySelector('#total-slides').textContent)-2);
```


### safari picture-in-picture

今の Safari は PinP に対応している。

`<video>` タグで再生されていれば基本的に表示が可能だが、 UI がない場合は以下で再生中のビデオを PinP できる。


```js
javascript: document.querySelector('video').webkitSetPresentationMode('picture-in-picture')
```

新しい Mac は touch bar に UI があるので、無い機種で使ってる。


### 代替手段

Bookmarklet は、表示時に自動実行するといったことはできない。

かつて Chrome では User Script など、ブラウザそのものに仕込んで、指定したページで自動実行する技術もあったが、今はない。

現在では、 Tampermonkey などを用いれば同等のことを行うことができる。

頻繁に使うようなものであれば、それに特化したブラウザ拡張などの代替手段もあるだろう。

逆に有用なものは、拡張にまとめて公開する、 Tampermonkey に公開するといった方法もある。

一方、拡張は入れれば入れるほどブラウザが重くなるので、筆者は拡張を減らすために bookmarklet に戻したものも多い。


## Outro

いくつか例は出したが、なによりも JS でできることはなんでもできるので、ちょっと面倒だと思ったら書いてみれば良いと思う。

何かをインストールすることも、そのためにユーザ登録することもなく、最短で実行できるハックとして、知っておくと便利だ。
