# [user-agent][safari] Safari による User-Agent 固定化と Web における Feature Detection


## Update

- 2018/3/1 : Safari 11.0.3 の UA を追記
- 2018/4/16: Safari 11.1 の UA を追記
- 2018/5/1 : OS のバージョンは固定されなくなった件を追記

2 月に方針が変更され、 OS のバージョンは固定されなくなった。
このため、iOS のバージョンアップにより発生するバグなどを回避する道は残されたことになる。
一方 Webkit のバージョンは(予定では `605.1.15` に)固定されることになりそうだ。詳細は、以下を参照。

[SafariのUA文字列が固定されて固定されなくなったおはなし \- fragmentary](https://myakura.hatenablog.com/entry/2018/04/16/083000)


## Intro

少し前に Safari Technology Preview 46 がリリースされた。

Service Worker のアナウンスに目がそちらに盗まれている一方、しれっと以下の一文がある。

> Froze the user-agent string to reduce web compatibility risk and to prevent its use for fingerprinting
> --- <cite>[Release Notes for Safari Technology Preview 46](https://webkit.org/blog/8042/release-notes-for-safari-technology-preview-46/)</cite>

すぐには無理だろうと思ったが、 TP47 でもこれを打ち消すアナウンスはなかったため、これを取り上げることにした。

TP はあくまで Preview であり、これが *このままリリースされるとは限らない* 点に注意したい。

今回は、これがそのままリリースされた場合の影響について考察するため、現在の User-Agent の使われ方を解説する。


## Freeze User Agent

リリースノートの一文は、初見では何か違う意味かとも思ったが、これはやはり Safari の User-Agent を今後変更しないという意味のようだ。

Safari 開発者の Tweet で、モチベーションが補足されている。

> STP 46 freezes Safari's user agent string. It will not change in the future. This fixes two issues:: Updating the string breaking websites sniffing for particular versions of Safari, It being used for fingerprinting. Don't UA sniff; detect features directly.
> --- <cite><https://twitter.com/rmondello/status/943545865204989953></cite>

ちなみに MacOS High Sierra の Safari TP46 と Safari 11.0.2 の UA は以下のようになっている(Update: Safari 11.0.3, 11.1 を追加)


```
(TP46):   User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15
(11.0.2): User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7
(11.0.3): User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0.3 Safari/604.5.6
(11.1)  : User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15
```

(一応その次の TP47 でも値は変わっていないが、これまで TP Update で UA が変わっていたのかは未確認)

実際の UA の用途はいくつかあるが、ここでは Tweet でも言及されている Finger Printing と Feature Detection の視点から見ていく。


## Finger Printing

User-Agent 単体では大別しかできないが、そこに対して他の情報を組み合わせていけば、徐々に一意性が増してゆく。

- IP Address
- Accept-Language
- Client Hints (DPR, Width, Device Memory)
- E-Tag
- HSTS
- etc

「それが誰であるか」は特定できなくとも、それが「さっきと同じ人である」がわかれば、それだけで Tracking が可能だ。

もし 3rd Party Cookie を付与できれば確実だが、 Cookie 付与前、 Cookie 削除後、 Private Browse などでもユーザを特定したいというニーズはある。


### Tracking by Fingerpirnt ?

Apple が実施する **ITP**(Intelligent Tracking Prevention) によって、 3rd Party Cookie が絶たれるため、広告プロバイダは Finger Printing などの代替技術に救いを求めるのは想像に難くない。

特に広告関係では、ターゲットに対してパーソナライズするため、サービスをまたいでの識別、つまり追跡(Tracking)には、こうした固定情報が扱いやすい。

Safari の今回の変更は、この Finger Printing の手段を断つのが目的と見ることができそうだ。

(ちなみに、現在の Finger Printing はかなりの精度であるという話と、実際使って見るとそうでもないという話を両方聞く。パーソナライズの場合は、精度が低いと「自分へのおすすめが全く興味ないもので埋まる」といった結果になり得るため、 Finger Printing だけでの Tracking は厳しいらしい。)


## User Metrics

サービスの Access Log や、 Analytics 系のツールでは、必ずと言って良いほど User Agent を収集しているだろう。

これは、ユーザの傾向や、サポートブラウザの決定などに使われる重要なメトリクスとなっている。

今回のように User Agent が Freeze すると、 **PC** の **MacOS** の **Safari** であることまではわかるが、それ以降の細かいバージョンまではわからなくなる。

一方で Web の仕様が Living Standard になり、ブラウザの自動アップデートが普及しつつある現在では、細かいバージョンまでを見る用途も限定されてきている。

このビジネスインパクトはそのメトリクスの用途によるが、ユーザの大まかな傾向は、どの **デバイス** の、どの **OS** の、どの **ブラウザ** かまでわかれば一般的な用途はカバーできそうだ。

後述するがそもそも、サポートブラウザの決定は UA を元にすべきではない。

ただし、特定のバージョンの脆弱性やバグに対して細かいハンドリングを余儀なくされるケースでは、他にそれをフックする変数がない限り難しくなる。

本来、特定バージョンの実装不備については、ブラウザ側の速やかな自動バージョンアップによって解決されるべきなので、リリースサイクルが比較的長い Safari では、そこは少し懸念がありそうだ。


## UserAgent Detection

UA のもう 1 つの用途として、利用したい機能をそのブラウザがサポートしているかで分岐する Feature Detection がある。

同一実装に対する不備の場合わけとは少し違い、有無そのものを調べる用途だ。

古くは、 CSS の実装が壊滅的だった IE だけ別の CSS を返すといった用途のため、 UA を解析するといったものだ。

もっと古くは、サービスそのものが **特定のブラウザしかサポートしない** といったことが、普通に行われていた。

当時 Netscape Navigator が、コードネームの `Mozilla` を UA に含んでおり、それを見て(Sniffing)処理を分岐していたサービスがあったようだ。

サーバ側の疑似コードとしてはこのようなイメージだ。


```javascript
if (UserAgent.match(/Mozilla.*/)) {
  // Netscape 用の処理
}
```

すると、競合だった IE は素直に `MSIE...` で始まる UA を送ると、そのサービスが動作せず、ユーザに「使えないブラウザ」と認定されてしまう。

そこで、やむをえず IE も UA を `Mozilla...` で始まる文字として実装をした。

その後、いわゆる HTML5 期、 IE を外した Chrome や Safari のみに提供するサービス実装も登場したため、後発の Edge は UA に `Chrome` や `Safari` を含むこととなった。

現在、多くのブラウザが `Mozilla...` で始まり、他の実装名を含む、ぱっと見なんなのかわからない文字列となっているのは、こうした歴史的な経緯がある。

つまり、「ブラウザを識別し処理を分岐したいサービス開発者」と「そうしたサービスと互換性を保持したいブラウザベンダ」のいたちごっこが原因と言える。

こうしたことは、歴史が長いソフトウェアではよくある話だ、 Windows 9 が出なかった理由も同様の理由と言われている。

ブラウザが独自実装による差別化で戦争をしていた時代ならまだしも、今から処理の分岐条件に UA を用いるのは、あまり良い手ではない。

その時点でのブラウザが望む機能を持っていなかったとしても、リリースが進めば改善される可能性がある。

基本的に、開発者は **UA ではなく、依存したい機能そのものの有無を確認し、処理を分岐すべきである** 。


## Feature Detection

機能の有無による分岐は Feature Detection と呼ばれ、対象機能によりいくつかの方法がある。


### JS

対象がプログラムであるため、比較的簡単に行える。

多くの DOM API はクラスやプロパティの有無によって判断が可能だ。


```javascript
if (navigator.serviceWorker !== undefined) {
  // service worker supported
}
```

ECMAScript API (JS native の機能)の場合もメソッドの場合は同様に prototype などで判断する。


```javascript
if (String.prototype.padStart !== undefined) {
  // padStart supported
}
```

構文の場合は物によるが、例えば ES Module サポートをどうしても調べたいといった場合は以下のような手段が一応ある。


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

それができたところでどうするかというのもあるので、移行期に必要な分岐は基本的に後述の modules/nomodule の方法の方が良いだろう。


### CSS

CSS はいわゆるプログラミング言語ではないため、基本的には Detection をするよりも、 Progressive Enhancement で進めてきた。

しかし、 CSS の API も複雑になってきたため最近では `@support` を用いた Detection がサポートされている。


```css
@supports (display: flex) {
  /* flexbox supported */
}
```

`and`, `or`, `not` などもあり、是非は別として複雑な Detection も可能となってきた。


### HTML

コンテントネゴシエーションでは、基本はクライアントのヘッダ情報を元にサーバが選択するという方向になる。

しかし、これではクライアントが全ての情報を事前に送りサイズが大きくなるか、サーバに情報提供を依頼し 1RTT 増えるかという選択になる。

サーバから選択肢を提示し、クライアントがそこから選択するという方向を取れば、一度で解決する場合も多い。


#### Picture

例えば、 `<picture>` は、サーバが対応可能なフォーマットやサイズに関する情報を全て列挙することで、クライアントがそこから選択できる。

また、 `<picture>` そのものに対応していなければ、 `<img>` にフォールバックできるため、 `<picture>` 対応を detection する必要もない。


#### modules/nomodule

同じように、 ES Modules も、 `<script type=modules>` によって、サーバ側に用意があることを伝え、 `<script nomodule>` でフォールバックが可能だ。

そもそも、 ES Modules は MIME Type が従来の JS と同じになったため、クライアントが Accept Header に何かを追加して対応を伝えることができない。


### Content Negotiation

通信やフォーマットに関わるものは HTTP ヘッダによるネゴシエーションが基本である。

例えば、 Brotli や WebP のサポートなどは以下のように明示される場合がある。


```
Accept-Encoding: gzip, deflate, br
Accept: image/webp,image/apng,image/*,*/*;q=0.8
```

ヘッダのデフォルト情報は、それが使われるか使われないかに限らず、ブラウザからのリクエストの大半に付与されることになる。

Brotli 対応が `, br` という 4byte であったとしても、メジャーブラウザが Web のスケールで使われると、無視できる数字ではない。

既に普及しきった PNG や JPEG は `*` の中に丸め込まれているが、 WebP が普及しきったあと `image/webp` を消して `*` に丸め込まれたら、壊れるサイトも少なくないだろう。

従って、ブラウザベンダは、ヘッダの追加には非常に慎重である。

これは、新しいフォーマットが出るたびに、ヘッダの値が増えていくかというと、必ずしも期待できないことを意味する。

最近では、デフォルトではない追加の情報については、サーバから Client Hints で要求することもできる。


```
// Previous Response
Accept-CH: DPR, Viewport-Width

// Next Request
Viewport-Width: 1366
DPR:1
```

1RTT 必要になるため、メインリソースのレスポンスで返し、サブリソースで適用させるような用途が中心となる。


### Protocol

HTTP2 や TLS1.3, QUIC その他プロトコルの対応は、基本的にはプロトコルレベルで解決される。

多くの場合はハンドシェイクを行い、互いの対応を出し合って合意を取るか、一方が提示し相手が受け入れるか無視するかだ。

拡張として追加される機能については、基本的に「対応してなければ無視される」という設計になる。

従って、サーバ側で Feature Detection = Handshake なので、他の情報から機能の有無を類推するような方法はあまり取られない。

一方このレイヤでは、ブラウザのバージョンというより、そのプロトコル実装そのもののバージョン(ex, openssl)が問題になる場合はある。


### まとめ

現時点では、この変更に乗っかる別のブラウザは確認していないため、将来的に全てのブラウザのマイナーアップデートで UA が固定される世界が来るかは未知だ。

しかし、Feature Detection の方法は UA に頼らずともかなり選択肢があり、よほど細かい部分の挙動差でもない限り、基本的にはカバーされている。

Uaser-Agent を元にした Detection は、さらに未知の User Agent の User-Agent 文字列がどうなるのか予想ができないという点で、歴史的にも負債を残してきた。

UA で分岐するような実装がある場合は本当にそれが妥当か見直すべきだろう。

それを踏まえた上で、アップデートが自動化し、仕様も Living Standard になった現状、メジャーブラウザについて細かくバージョンを把握するニーズがどのくらいあるのかは、今一度考え直すタイミングかもしれない。
