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

### PickBestImageCandidate

- https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;l=422;drc=7b27ab4f4e042b410230e267d31f8e6f67d1bdc4?originalUrl=https:%2F%2Fcs.chromium.org%2F


色々手を加えたコードを引用する。基本の流れは

- srcset にある候補について、 img.width を size (w) で割った値を Dencity として算出
- その Dencity で候補をソートし重複を排除
- Save Data が有効な場合は最も小さいものを選択して終わり
- SelectionLogic に候補を渡して画像を選択


```c
// device_scale_factor = DPR
// source_size = sizes attr value
static ImageCandidate PickBestImageCandidate(float device_scale_factor, float source_size, Vector<ImageCandidate>& image_candidates, Document* document = nullptr) {
  const float kDefaultDensityValue = 1.0;
  bool ignore_src = false;

  // 画像がなければ無視
  if (image_candidates.IsEmpty()) {
    return ImageCandidate();
  }

  // 画像ごとに表示領域に対する密度を計算(1.0 だとフィット)
  // http://picture.responsiveimages.org/#normalize-source-densities
  for (ImageCandidate& image : image_candidates) {
    if (image.GetResourceWidth() > 0) {
      float gensity = (float)image.GetResourceWidth() / source_size;
      image.SetDensity(gensity);
      ignore_src = true;
    } else if (image.Density() < 0) {
      image.SetDensity(kDefaultDensityValue);
    }
  }

  // 密度でソート
  std::stable_sort(image_candidates.begin(), image_candidates.end(), CompareByDensity);

  Vector<ImageCandidate*> de_duped_image_candidates;
  float prev_density = -1.0;

  // 同じ密度を省く?
  for (ImageCandidate& image : image_candidates) {
    if (image.Density() != prev_density && (!ignore_src || !image.SrcOrigin())) {
      de_duped_image_candidates.push_back(&image);
    }
    prev_density = image.Density();
  }

  // SelectionLogic で画像を選択
  // Save Data してる場合は一番小さいの、ここでは無視
  // unsigned winner = blink::WebNetworkStateNotifier::SaveDataEnabled() && base::FeatureList::IsEnabled(blink::features::kSaveDataImgSrcset) ? 0 : SelectionLogic(de_duped_image_candidates, device_scale_factor);
  unsigned winner = SelectionLogic(de_duped_image_candidates, device_scale_factor);
  DCHECK_LT(winner, de_duped_image_candidates.size());
  winner = AvoidDownloadIfHigherDensityResourceIsInCache(de_duped_image_candidates, winner, document);

  float winning_density = de_duped_image_candidates[winner]->Density();
  // 16. If an entry b in candidates has the same associated ... pixel density
  // as an earlier entry a in candidates,
  // then remove entry b
  while ((winner > 0) && (de_duped_image_candidates[winner - 1]->Density() == winning_density))
    --winner;

  return *de_duped_image_candidates[winner];
}
```


### SelectionLogic

- https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/parser/html_srcset_parser.cc;drc=23f61cb65a94208dc2c4728e895e87d47f64a8b6;bpv=1;bpt=1;l=380?originalUrl=https:%2F%2Fcs.chromium.org%2F


ここで実際に画像を選択している。

- 候補を順に見ていき、現在の値を curr 次を next とする
- next の dencity が DPR を超えるまで先に進む
- `curr < DPR < next` になったらそこで curr/next どちらを見るか決める
- まず curr/next の dencity の相乗平均(幾何平均)をとる
- 以下は next を使う
  - DPR が 1 で curr.dencity がそれより小さい
  - 相乗平均が DPR より小さい
- そうでなければ curr

(DPR に 1 以下はあるのだろうか?)


```c
// device_scale_factor = DPR
static unsigned SelectionLogic(Vector<ImageCandidate*>& image_candidates, float device_scale_factor) {
  unsigned i = 0;

  for (; i < image_candidates.size() - 1; ++i) {
    unsigned next = i + 1;
    float next_density;
    float current_density;
    float geometric_mean;

    next_density = image_candidates[next]->Density();

    // next の密度が DSF より小さいならまだ先をみる必要
    if (next_density < device_scale_factor) {
      continue;
    }

    // next の密度が DSF より大きい、つまり表示に十分だとわかった
    // そこで curr とのどっちを表示するかを考える
    current_density = image_candidates[i]->Density();

    // そのために相乗平均をまず取る
    geometric_mean  = sqrt(current_density * next_density);

    // curr が DPR より低くても、 DPR が 1 なら next を使う
    // もしくは
    // Geo が DSF より小さいなら next
    // (そうでないなら curr)
    if (((current_density < device_scale_factor) && (device_scale_factor <= 1.0)) || (geometric_mean <= device_scale_factor)) {
      return next;
    }
    break;
  }
  return i;
}
```

つまり挙動としてはこうなるだろう。

- DPR が 1 の場合
  - dencity が 1 を超える一番小さいものを選ぶ
- DPR が 1 以上の場合
  - dencity が DPR を上下にまたぐ 2 つの画像を選ぶ
  - その 2 つの dencity の相乗平均を取る
  - 相乗平均 `<` DPR なら next
  - 相乗平均 `>` DPR なら curr


例として、 320w と 640w の画像を DPR 2 の端末で表示する場合を考える。

これまでは DPR が 2 なので、 160 を超えると 320w では足らなくなり 640w に切り替わると考えていたが、実際に計算してみると

img.width = 226 の時、 `sqrt((320/226) * (640/226))` は 2.001 で DPR より大きいため、 320w が採用される。
img.width = 227 の時、 `sqrt((320/227) * (640/227))` は 1.992 で DPR より小さいため、 640w が採用される。

つまり、 160 を超えても画像は切り替わらず 227 までは 320w が使われている結果となる。


## bug

なぜこうなってるのかは該当部分のログに書かれていた。

> 425511 - Avoid loading srcset resources that are marginally larger/smaller than DPR - chromium
>
> Currently the srcset resource selection simply picks the first candidate with a density that's equal or larger than DPR.
>
> That results in cases where slight zooming causes a DPR of 1.1 and the download of a 2x resource, 
> even though the 1x resource would have been enough.
> --- <cite>https://bugs.chromium.org/p/chromium/issues/detail?id=425511</cite>




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

