# [srcset][picture][image] img の srcset 指定時に選択される画像

## Intro

`<img>` や `<picture>` で srcset に複数の画像を指定することで、デバイスに応じて適切な解像度の画像を提供することができる。

この画像が、どういった条件で選択されるのかを頭では勝手に理解していたつもりだが、理解とは違う挙動があったため、仕様と実装を確認した。

その記録を記す。なお、先に言うがどのブラウザも *仕様に準拠して* 実装されている。


## srcset attribute

まず以下のようなコードを考える。

```html
<style>
body {
  margin: 0;
}
</style>
<body>
<img id=hero_image
     src=320x240.png
     srcset=" 320x240.png   320w,
              640x480.png   640w,
              800x600.png   800w,
             1024x768.png  1024w,
             1280x960.png  1280w,
             1600x1200.png 1600w"
>
</body>
```

ヒーローイメージを表示するが、そのサイズを複数用意し、デバイスに合わせて提供する、いわゆるレスポンシブイメージの一種だ。

ここでは後述のデモをわかりやすくするため sizes を省略している。img に CSS を当てておらず、body のマージンを消したので、画面いっぱいに表示されることになる。

つまり Viewport Width が Image Width となっている。

ここで、どういう場合にどの画像が選択されるかを考えてみる。


## Viewport Width

そこそも適切な画像がデバイスごとに異なるとされる理由の一つが、Viewport の大きさの違いだ。

例えば Viewport Width が 512px のデバイスは、width が 512px の画像が最も適していることになる。

それより大きすぎると無駄だし、逆に小さい場合は画像が荒くなってしまうので、512px よりも大きいなかで一番小さいものを選ぶことになるだろう。

先の srcset の中では 640px が適切だと考えられる。


## DPR

しかし、実際は Viewport だけでは決められず、必ず DPR を考慮する必要がある。

DPR が 2 のデバイスは、1 のデバイスよりもピクセルが小さく、半分のサイズになっている。CSS でいう 1px を表示するために、物理的には 2px 使っているため、密度が 2 倍でその分キレイということだ。

つまり DPR が 2 で、Viewport Width が 512px だったら、適切な画像の width は 1024px ということになる。

srcset の中ではちょうど 1024px があるので、それが適切と考えられるだろう。


## 検証

仮説としては、画像は Image Width (今回は Viewport Width に等しい)と DPR の値をかけ、それよりも大きい中で最小の画像が選ばれると考えた。

そこで、Mobile View mode で Width を変えながら選択される画像を調べていく。

Firefox, Safari では以下の様に、想定した挙動になった。(代表して Firefox の挙動を載せる)

![Firefox では仮定したサイズで画像が切り替わっている](srcset-firefox.gif#482x547 "srcset image selection on firefox")

Chrome/Edge は DPR が 1 の場合は想定した挙動だったが、DPR を 2, 3 に変えたときだけ想定とは違う動きをした。

![Chrome では DPR が 1 でないとき、サイズの切り替わりが想定と異なる](srcset-chrome.gif#482x547 "srcset image selection on chrome")

この理由をつきとめるのが今回の本題となる。


## 調査

この挙動だけを見ると、「Chromium の実装にバグが有るのでは」や、「Devtools の Emulation がおかしいのでは」といった点が浮かびがちだが、まずは仕様がどうなっているのかを見てみる。

対象の仕様は HTML であるため、https://html.spec.whatwg.org のどこかにあり、探すとまさしく "4.8.4.3.6 Selecting an image source" に該当の記述がある。

- [HTML Standard - 4.8.4.3.6 Selecting an image source](https://html.spec.whatwg.org/multipage/images.html#selecting-an-image-source)

短いので該当部分を引用する。

> When asked to select an image source for a given img or link element el, user agents must do the following:
> 1. Update the source set for el.
> 2. If el's source set is empty, return null as the URL and undefined as the pixel density.
> 3. Otherwise, take el's source set and let it be source set.
> 4. If an entry b in source set has the same associated pixel density descriptor as an earlier entry a in source set, then remove entry b. Repeat this step until none of the entries in source set have the same associated pixel density descriptor as an earlier entry.
> 5. In a user agent-specific manner, choose one image source from source set. Let this be selected source.
> 6. Return selected source and its associated pixel density.

答えは 5 にそのまま書かれている。

```
5. In a user agent-specific manner, choose one image source from source set. Let this be selected source.
```

つまり、srcset の中からどの画像を選ぶのかは「User Agent の実装に任せる」という仕様になっているのだ。


## 仕様の意図

こうした仕様に慣れている人にとっては、この意図を汲み取るのはいつものことだろうが、念の為解説しておく。

W3C に限らず、IETF によるプロトコルの仕様にもよくあることだが、詳細な挙動を仕様に *あえて* 明示せず、実装に委ねる場合がある。

これは、特に最適化が可能な部分によく見られ、たとえば「この方法でソートする」と決めてしまうとその方法以外でソートするのは仕様違反になってしまうが、単に「ソートする」としておけば以下のようなメリットが有る。

- 実装が、その時考案されている高速なソートのアルゴリズムから選べる
- 保持しているデータの数や状態によってアルゴリズムを変えられる
- 特定のソートアルゴリズムに欠陥が見つかった場合仕様をいじらずに実装側で更新できる
- 単なる速さだけではなく、モバイルや IoT など電力消費を考慮したアルゴリズムを選択するといったことができる

したがって、この *あえて* 明示しない仕様の意図は、「実装側に選択の猶予を残す」ことに繋がる。

今回の画像選択も同じ理由だ。

前段での想定は、Viewport と DPR で画像は決まると解釈していたが、実際に画像の選択には他の変数もある。

例えば、499px と 1024px の srcset があった場合、Image Width が 500px だったら前者を選んだほうがいいかもしれない。

他にも、モバイルで電力が残り少なかったり、回線が 3G だったり、ギガ消費を抑えるようなモードの設定が端末になされていたら、より小さい画像が選ばれるべきだろう。

この一文によって、先程検証した挙動は、決して仕様に準拠してなかったわけではないことがわかる。

なんらかの変数を元に、ブラウザごとに適切な選択をした結果なので、コンテンツ作成者の立場では、srcset にバリエーションを指定したら、選択はブラウザに任せるのが筋ということになる。

しかし、興味として「じゃあどうやって選んであの結果になったのか」は気になるところだ。ここからは夏休みの自由研究として Chrome のコードを見ていく。


## Chromium の実装

コードを探すとそれっぽい関数を見つけた。


### PickBestImageCandidate

- https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;l=422;drc=7b27ab4f4e042b410230e267d31f8e6f67d1bdc4?originalUrl=https:%2F%2Fcs.chromium.org%2F

色々手を加えたコードを引用する。基本の流れは

- srcset にある候補について、img.width を size (w) で割った値を Density として算出
- その Density で候補をソートし重複を排除
- Save Data が有効な場合は最も小さいものを選択して終わり
- SelectionLogic に候補を渡して画像を選択

```cpp:pick-best-image-candidate.cpp
```


### SelectionLogic

- https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;drc=23f61cb65a94208dc2c4728e895e87d47f64a8b6;bpv=1;bpt=1;l=380?originalUrl=https:%2F%2Fcs.chromium.org%2F

ここで実際に画像を選択している。

- 候補を順に見ていき、現在の値を curr 次を next とする
- next の density が DPR を超えるまで先に進む
- curr &lt; DPR &lt; next になったらそこで curr/next どちらを見るか決める
- まず curr/next の density の幾何平均(相乗平均)をとる
- 以下は next を使う
  - DPR が 1 で curr.density がそれより小さい
  - 幾何平均が DPR より小さい
- そうでなければ curr

(DPR に 1 以下はあるのだろうか?)

```cpp:selection-logic.cpp
```

つまり挙動としてはこうなるだろう。

- DPR が 1 の場合
  - density が 1 を超える一番小さいものを選ぶ
- DPR が 1 以上の場合
  - density が DPR を上下にまたぐ 2 つの画像を選ぶ
  - その 2 つの density の幾何平均を取る
  - 幾何平均 \< DPR なら next
  - 幾何平均 > DPR なら curr


## 確認

例として、1024w と 1280w の画像を DPR 2 の端末で表示する場合を考える。

これまでは DPR が 2 なので、512px を超えると 1024w では足らなくなり 1280w に切り替わると考えていたが、実際に計算してみると

img.width = 572 の時、sqrt((1024/572) \* (640/572)) は 2.001 で DPR より大きいため、1024w が採用される。

img.width = 573 の時、sqrt((1024/573) \* (640/573)) は 1.998 で DPR より小さいため、1280w が採用される。

つまり、512px を超えても画像は切り替わらず 572px までは 1024w が使われている結果となるはずだ。

Density とその幾何平均を見ながら画像の切り替わりポイントを確かめたところ、計算通りの結果になった。

- ![Chrome で DPR2 のとき 572px では 1024w が、 573px では 1280w が選択された](srcset-chrome-dpr2.gif#622x862 "srcset image selection on chrome as expected")

## なぜ幾何平均なのか

幾何平均を使っている理由は、おそらく画像 A と B の間が大きい時、A では 1px 足りないがその 1px のために B を選ぶというのを割けるためだろう。

A と B の密度の幾何平均を、デバイスの密度と比較しそこを基準に選択することで、完全にピクセル密度が足りるわけではないが、妥協的なサイズの画像が選べているということだと考えられる。

などと考えながらログを探したら、該当部分の issue に理由がずばり書かれていた。

> Currently the srcset resource selection simply picks the first candidate with a density that's equal or larger than DPR.
> That results in cases where slight zooming causes a DPR of 1.1 and the download of a 2x resource,
> even though the 1x resource would have been enough.
> --- [425511 - Avoid loading srcset resources that are marginally larger/smaller than DPR - chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=425511)

もともともモチベーションは、ズームで DPR が 1 -> 1.1 のようにずれることに起因するらしい。これも考察した理由と根底では同じと言えるだろう。

(ズームで DPR がちゃんと変わってることは知らなかった)


## Outro

こうした挙動の差を見ると、それを踏まえた上でどのブラウザでも同じ画像が選ばれるように強制するといった発想を持つ開発者が必ずいるだろう。

例えば media query を用いて viewport でスイッチする、Client Hints で viewport や DPR を送らせてサーバ側で出し分ける、などをすれば、条件に応じて意図した画像を強制する実装は可能だ。

しかし、そうした強制は、今回解説した「実装が選択する余地」をクライアントから完全に奪い取っていることに注意したい。

そもそも、今回のデモでは srcset をわかりやすく変えているが、基本的には全く同じ画像を違うサイズで提供するための API だ。

Media Query は、例えば PC では引きの写真だが、モバイルではアップにする、といった画像そのものを切り替えるために使われる API であり、用途が違う。

DPR 1 用の画像をそのまま 3 で表示するとさすがに気になることもあるかもしれないが、基本的には数種のサイズを srcset で提供できていれば、あとの選択はブラウザに任せれば十分だし、そうであるべきだ。

そもそも、数 px 程度のズレはよほど注意して見ないと気づくことすらないだろうし、気になるなら、ある程度のサイズバリエーションを提供しておけば問題ない。

今回は、Chrome だけ大きく挙動が違ったのでそこだけ調査したが、他のブラウザにも Data Saver mode のような実装や、その他の最適がおそらく入っているだろう。

そして、今入っていなくても、今後入ってくることも十分に考えられる。

クライアントの置かれている状態は基本的にはクライアントにしかわからない、最終的にユーザに最適化を提供する上で最も適しているのはクライアントで、サーバはそこに対して十分な選択肢を与えるのが責務と言える。

srcset についても、十分なバリエーションを提供しつつ、後の選択はクライアントに任せる、というのが正しいスタンスと言えるだろう。


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/image/srcset/


## Resources

- Spec
  - https://html.spec.whatwg.org/multipage/images.html#selecting-an-image-source
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- DEMO
- Blog
- Presentation
- Issues
  - https://bugs.chromium.org/p/chromium/issues/detail?id=425511
- Other
  - https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;l=395;drc=23f61cb65a94208dc2c4728e895e87d47f64a8b6;bpv=1;bpt=0?originalUrl=https:%2F%2Fcs.chromium.org%2F
  - https://source.chromium.org/chromium/chromium/src/+/bb57934c360a33560365cc47af176a7c71d51f9d?originalUrl=https%2F:%2F%2F%2Fcs.chromium.org%2F