# [tag] <img> で srcset 指定時に選択される画像

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

ここでは後述のデモをわかりやすくするため sizes を省略している。 img に CSS を当てておらず、 body のマージンを消したので、画面いっぱいに表示されることになる。

つまり Viewport Width が Image Width となっている。

ここで、どういう場合にどの画像が選択されるかを考えてみる。


## Viewport Width

そこそも適切な画像がデバイスごとに異なるとされる理由の一つが、 Viewport の大きさの違いだ。

例えば Viewport Width が 512px のデバイスは、 width が 512px の画像が最も適していることになる。

それより大きすぎると無駄だし、逆に小さい場合は画像が荒くなってしまうので、 512px よりも大きいなかで一番小さいものを選ぶことになるだろう。

先の srcset の中では 640px が適切だと考えられる。


## DPR

しかし、実際は Viewport だけでは決められず、必ず DPR を考慮する必要がある。

DPR が 2 のデバイスは、 1 のデバイスよりもピクセルが小さく、半分のサイズになっている。 CSS でいう 1px を表示するために、物理的には 2px 使っているため、密度が 2 倍でその分キレイということだ。

つまり DPR が 2 で、 Viewport Width が 512px だったら、適切な画像の width は 1024px ということになる。

srcset の中ではちょうど 1024px があるので、それが適切と考えられるだろう。


## 検証

仮説としては、画像は Image Width (今回は Viewport Width に等しい)と DPR の値をかけ、それよりも大きい中で最小の画像が選ばれると考えた。

そこで、 Mobile View mode で Width を変えながら選択される画像を調べていく。

Safari, Firefox では以下の様に、想定した挙動になった。

TODO: スクショ

Chrome/Edge は DPR が 1 の場合は想定した挙動だったが、 DPR を 2, 3 に変えたときだけ想定とは違う動きをした。

TODO: スクショ

この理由をつきとめるのが今回の本題となる。


## 調査

この挙動だけを見ると、「Chromium の実装にバグが有るのでは」や、「Devtools の Emulation がおかしいのでは」といった点が浮かびがちだが、まずは仕様がどうなっているのかを見てみる。

対象の仕様は HTML であるため、 <https://html.spec.whatwg.org> のどこかにあり、探すとまさしく "4.8.4.3.6 Selecting an image source" に該当の記述がある。

- [HTML Standard - 4.8.4.3.6 Selecting an image source]
 -  https://html.spec.whatwg.org/multipage/images.html#selecting-an-image-source

短いので該当部分を引用する。

> When asked to select an image source for a given img or link element el, user agents must do the following:
>  1. Update the source set for el.
>  2. If el's source set is empty, return null as the URL and undefined as the pixel density.
>  3. Otherwise, take el's source set and let it be source set.
>  4. If an entry b in source set has the same associated pixel density descriptor as an earlier entry a in source set, then remove entry b. Repeat this step until none of the entries in source set have the same associated pixel density descriptor as an earlier entry.
>  5. In a user agent-specific manner, choose one image source from source set. Let this be selected source.
>  6. Return selected source and its associated pixel density.

答えは 5 にそのまま書かれている。

```
5. In a user agent-specific manner, choose one image source from source set. Let this be selected source.
```

つまり、 srcset の中からどの画像を選ぶのかは「User Agent の実装に任せる」という仕様になっているのだ。


## 仕様の意図

こうした仕様に慣れている人にとっては、この意図を汲み取るのはいつものことだろうが、念の為解説しておく。

W3C に限らず、 IETF によるプロトコルの仕様にもよくあることだが、詳細な挙動を仕様に *あえて* 明示せず、実装に委ねる場合がある。

これは、特に最適化が可能な部分によく見られ、たとえば「この方法でソートする」と決めてしまうとその方法以外でソートするのは仕様違反になってしまうが、単に「ソートする」としておけば以下のようなメリットが有る。

- 実装が、その時考案されている高速なソートのアルゴリズムから選べる
- 保持しているデータの数や状態によってアルゴリズムを変えられる
- 特定のソートアルゴリズムに欠陥が見つかった場合仕様をいじらずに実装側で更新できる
- 単なる速さだけではなく、モバイルや IoT など電力消費を考慮したアルゴリズムを選択するといったことができる

したがって、この *あえて* 明示しない仕様の意図は、「実装側に選択の猶予を残す」ことに繋がる。

今回の画像選択も同じ理由だ。

前段での想定は、 Viewport と DPR で画像は決まると解釈していたが、実際に画像の選択には他の変数もある。

例えば、 499px と 1024px の srcset があった場合、 Image Width が 500px だったら前者を選んだほうがいいかもしれない。

他にも、モバイルで電力が残り少なかったり、 回線が 3G だったり、 ギガ消費を抑えるようなモードの設定が端末になされていたら、より小さい画像が選ばれるべきだろう。

この一文によって、先程検証した挙動は、決して仕様に準拠してなかったわけではないことがわかる。

なんらかの変数を元に、ブラウザごとに適切な選択をした結果なので、コンテンツ作成者の立場では、 srcset にバリエーションを指定したら、選択はブラウザに任せるのが筋ということになる。

しかし、興味として「じゃあどうやって選んであの結果になったのか」は気になるところだ。ここからは夏休みの自由研究として Chrome のコードを見ていく。


## Chromium の実装

コードを探すとそれっぽい関数を見つけた。

- PickBestImageCandidate
  - https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;l=422;drc=7b27ab4f4e042b410230e267d31f8e6f67d1bdc4?originalUrl=https:%2F%2Fcs.chromium.org%2F


- SelectionLogic
  - https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;drc=23f61cb65a94208dc2c4728e895e87d47f64a8b6;bpv=1;bpt=1;l=380?originalUrl=https:%2F%2Fcs.chromium.org%2F






## Outro




## Resources

- Spec
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
- Other

