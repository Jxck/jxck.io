# [user-agent][safari] Safari による User-Agent 固定化と Web における Feature Detection


## Intro

少し前に Safari Technology Preview 46 がリリースされた。

<https://webkit.org/blog/8042/release-notes-for-safari-technology-preview-46/>

Service Worker のアナウンスが含まれ多くの目がそちらに盗まれている一方、しれっと以下の一文がある。

> Froze the user-agent string to reduce web compatibility risk and to prevent its use for fingerprinting

先に言っておくが、 TP はあくまで Preview であり、これが *このままリリースされるとは限らない* 点に注意したい。

今回は、これがそのままリリースされた場合の影響について考察するため、現在の User-Agent の使われ方を解説する。


## Freeze User Agent

リリースノートの一文は、初見では何か違う意味かとも思ったが、これはやはり Safari の User-Agent を今後変更しないという意味のようだ。

Safari 開発者の Tweet で、モチベーションが補足されている。

<https://twitter.com/rmondello/status/943545865204989953>


> STP 46 freezes Safari’s user agent string. It will not change in the future. This fixes two issues:
> - Updating the string breaking websites sniffing for particular versions of Safari
> - It being used for fingerprinting
> Don’t UA sniff; detect features directly.


ちなみに TP46 と Safari 11.0.2 の UA は以下のようになっている

```
(TP46):   User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15
(11.0.2): User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7
```

実際の UA の用途はいくつかあるが、ここでは Tweet でも言及されている Finger Printing と Feature Detection の視点から見ていく。


## Finger Printing

User-Agent 単体では大別しかできないが、そこに対して他の情報を組み合わせていけば、徐々に一意性が増してゆく。

- IP Address
- Accept-Language
- Client Hints (DPR, Width, Device Memory)
- E-Tag
- etc


「それが誰であるか」は特定できなくとも、それが「さっきと同じ人である」がわかれば、それだけで Tracking が可能だ。

もし Cookie を付与できれば確実だが、 Cookie 付与前、 Cookie 削除後、 Private Browse などでもユーザを特定したいというニーズはある。


### Tracking by Fingerpirnt ?

Apple が実施する ITP によって、 3rd Party Cookie が絶たれるため、広告プロバイダは Finger Printing などの代替技術に救いを求めるのは想像に難くない。

特に広告関係では、ターゲットに対してパーソナライズするため、サービスをまたいでの識別、つまり追跡(Tracking)には、こうした固定情報が扱いやすい。




トラッキングの精度は、既に 9 割近いという話も聞けば、実際使うと 4 割程度だったという話も聞く。






Safari の今回の変更は、この Finger Printing の手段を断つのが目的と見ることができそうだと考える。

(ちなみに、現在の Finger Printing はかなりの精度であるという話もあるが、一方で実際使って見るとそうでもないという話も聞く。
パーソナライズの場合は、精度が低いと「自分へのおすすめが全く興味ないもので埋まる」といった結果になり得るため、 Finger Printing だけでの Tracking は厳しいらしい。)


## Feature Detection

UA のもう 1 つの用途として、利用したい機能をそのブラウザがサポートしているかで分岐する Feature Detection がある。

古くは、 CSS の実装が壊滅的だった IE だけ別の CSS を返すといった用途のため、 UA を解析するといったものだ。

もっと古くは、サービスそのものが **特定のブラウザしかサポートしない** といったことが、普通に行われていた。

当時 Netscape Navigator が、コードネームの `Mozilla` を UA に含んでおり、それを見て(Sniffing)処理を分岐していたサービスがあったようだ。

サーバ側の擬似コードとしてはこのようなイメージだ。


```javascript
if (UserAgent.match(/Mozilla.*/)) {
  // Netscape 用の処理
}
```

すると、競合だった IE は素直に `MSIE...` で始まる UA を送ると、そのサービスは利用できず、ユーザに「使えないブラウザ」と認定されてしまう。

そこで、やむをえず IE も UA を `Mozilla...` で始まる文字として実装をした。

その後、いわゆる HTML5 期、 IE を外した Chrome や Safari のみに提供するサービス実装も登場したため、後発の Edge は UA に `Chrome` や `Safari` を含むこととなった。

現在、多くのブラウザが `Mozilla...` で始まり、他の実装名を含む、ぱっと見なんなのかわからない文字列となっているのは、こうした歴史的な経緯がある。

つまり、「ブラウザを識別し処理を分岐したいサービス開発者」と「そこと互換性を保持したいブラウザベンダ」のいたちごっこが原因であった。

ブラウザが独自実装による差別化で戦争をしていた時代ならまだしも、今から処理の分岐条件に UA を用いるのは、あまり良い手ではない。

その時点でのブラウザが望む機能を持っていなかったとしても、リリースが進めば改善される可能性がある。

開発者は、依存したい機能そのものの有無を確認し、処理を分岐すべきである。




## CSS

CSS はいわゆるプログラミング言語ではないため、基本的には Detection をするよりも、 Progressive Enhancement で進めてきた。

しかし、 CSS の API も複雑になってきたため最近では `@support` を用いた Detection がサポートされている。


```css
@supports (display: flex) {
  /* flexbox supported */
}
```

`and`, `or`, `not` などもあり、是非は別として複雑な Detection も可能となってきた。



## Content Negotiation

フォーマット系のサポートは、変わらず HTTP ヘッダによるネゴシエーションが基本である。

例えば、 Brotli や WebP のサポートなどは以下のように明示される場合がある。


```
Accept-Encoding: gzip, deflate, br
Accept: image/webp,image/apng,image/*,*/*;q=0.8
```


これ以外にも、一部の情報は Client Hints としてクライアントに送信を要求することもできる。


```
Accept-CH: DPR, Viewport-Width

Viewport-Width: 1366
DPR:1
```


一方、ヘッダの情報は、それが使われるか使われないかに限らず、ブラウザからのリクエストの大半に付与されることになる。

たとえ `, br` という 4byte であったとしても、メジャーブラウザが Web のスケールで使われると、無視できる数字ではない。

新しいフォーマットが出るたびに、ヘッダの値が増えていくかというとそれも難しいかもしれない。

既に普及しきった PNG や JPEG は `*` の中に丸め込まれているが、 WebP が普及しきったあと `image/webp` を消して `*` に丸め込まれたら、壊れるサイトも少なくないだろう。

だから、ブラウザベンダは、この部分の追加には非常に慎重である。


## HTML

コンテントネゴシエーションでは、基本はクライアントのヘッダ情報を元にサーバが選択するという方向になる。

しかし、これではクライアントが全ての情報を事前に送りサイズが大きくなるか、サーバから情報提供を依頼し 1RTT 増えるかという選択になる。

サーバから選択肢を提示し、クライアントがそこから選択するという方向を取れば、一度で解決する場合も多い。

### Picture

例えば、 `<picture>` は、サーバが対応可能なフォーマットやサイズに関する情報を全て列挙することで、クライアントがそこから選択できる。

また、 `<picture>` そのものに対応していなければ、 `<img>` にフォールバックできるため、 `<picture>` 対応を detection する必要もない。


### modules/nomodule

同じように、 ES Modules も、 `<input type=modules>` によって、サーバ側に用意があることを伝え、 `<input nomodule>` でフォールバックが可能だ。

そもそも、 ES Modules は MIME Type が従来の JS と同じになったため、クライアントが Accept Header に何かを追加して対応を伝えることができない。


## JS

対象がプログラムであるため、比較的簡単に行える。

多くの DOM API はクラスやプロパティの有無によって判断が可能だ。

```javascript
if (navigator.serviceWorker !== undefined) {
  // service worker supported
}
```

ECMAScript API の場合もメソッドの場合は同様に prototype などで判断する。

構文の場合は物によるが、例えば ES Module の場合は以下のような手段がある。


```javascript
function supportsStaticImport() {
  const script = document.createElement('script')
  return 'noModule' in script
}

function supportsDynamicImport() {
  try {
    new Function('import("")')
    return true
  } catch (err) {
    return false
  }
}
```

ただし、移行期は前述の modules/nomodule の方法の方が良いだろう。


### まとめ

このように Feature Detection の方法はかなり選択肢があり、よほど細かい部分の挙動差でもない限り、基本的にはカバーされている。

Uaser-Agent を元にした Detection は、それをされないように作られた文字列をベースにし、さらに未知の User Agent の User-Agent 文字列がどうなるのか予想ができないという点で、非常に貧弱な処理になる。

今、  UA の挙動差異に依存した実装は、多くの場合には負債しか残らないだろうと思われる。

すると、そもそもユーザがどのようなブラウザを使ってアクセスしているかを集めること自体には、そこからユーザ属性を想像するという目的があるが、ここまで標準化が進むと、それも徐々に不要になって行くのかもしれない。


現時点では、メトリクス収集のための情報源としての UA にはまだ利用価値があると思われるので、今回の Safari のようにそこを固定化する判断が他のブラウザに広まっても良いように

現時点で UA からなんの情報を得ているのかを整理し
そこに過度に依存しない開発を心がける方が良いだろう。

