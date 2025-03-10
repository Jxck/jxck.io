# [css] CSS における if と function の提案

## Intro

CSS に `if()` および `@function` が提案されている。

仕様がこれで確定したとは言い切れないため、背景および現状にフォーカスして解説する。

なお先に言っておくが、関数の再帰は初期仕様から外されているため、「CSS がプログラミング言語になった」という話ではない。


## if()

まず Dark/Light 2 つのモードをもつコンポーネントを考える。Old School な書き方だとこうなるだろう。

```html
<style>
  .dark {
    color: #fff;
    background-color: #000;
  }
  .light {
    color: #000;
    background-color: #fff;
  }
</style>
<my-div class="dark">dark</my-div>
<my-div class="light">light</my-div>
```

この場合、スタイルのバリエーションごとに、プロパティを重複して指定している状態になる。

ここでは class で指定しているが、Prefer Color Scheme に対応して Color Scheme を切り替える場合は、`light-dark()` で以下のように書ける。

```html
<style>
  my-div {
    color-scheme: light, dark;
    color: light-dark(#000, #fff);
    background-color: light-dark(#fff, #000);
  }
</style>
<my-div>dark or light</my-div>
```

ここでは、先ほど重複していた `color` と `background-color` という 2 つのプロパティ指定が、一箇所に集約されている点に注目したい。

`light-dark()` は Prefer Color Scheme を参照した分岐を自動で行うが、これを明示的に指定できるようにするには、汎用的な条件分岐の仕組みが必要となる。

そこで提案されたのが `if()` だ。先の例は以下のようになる。

```html
<style>
  div {
    background-color: if(
      style(--mode: dark): #000;
      else: #fff
    );
    color: if(
      style(--mode: dark): #fff;
      else: #000
    );
  }
  .dark {
    --mode: dark;
  }
  .light {
    --mode: light;
  }
</style>
<div class="dark">dark</div>
<div class="light">light</div>
```

まず注目したいのは、クラスに合わせて定義しているカスタムプロパティの `--mode` だ。

ここでは `dark` / `light` という値を定義し、スタイルはこの値に応じた分岐で重複無く定義されているのがわかるだろう。

この設計では大外の切り替えを class によって行っているが、実態は「*1 つのカスタムプロパティを定義するだけで、スタイルが全て決まる*」という状態であることに注意したい。

もしこの実装を Custom Elements にし、スタイルを隠蔽する場合は、外側には以下のように `mode` プロパティだけを出すのが一般的だ。

```html
<my-div mode=dark>dark</my-div>
```

従来の指定方法では、JS で取得した `mode` の値でスタイルの塊、もしくは具象クラスを指定しただろう。

```js
if (mode === "dark") {
  return css`
    color: #fff;
    background-color: #000;
  `
}
// or
const klass = (mode === "dark") ? ".dark" : ".light"
```

しかし、`if()` を用いてカスタムプロパティからスタイルが導出できるようになっている現状、JS 側で行うのは HTML `mode` attr の CSS `--mode` Custom Properties への転記だけだ。

```js
return `--mode: ${mode}`
```

従来の CSS Custom Property は、一度に 1 つの値を定義できるだけであるため、単なる「変数」としての役割しか果たすことができなかった。

```html
<style>
  :root {
    --unit: 10px;
    --color: #deadbeef;

    --s-width: calc(var(--unit) * 1.0);
    --m-width: calc(var(--unit) * 1.2);
    --l-width: calc(var(--unit) * 1.4);

    --s-height: calc(var(--unit) * 2.0);
    --m-height: calc(var(--unit) * 3.0);
    --l-height: calc(var(--unit) * 4.0);

    --s-color: oklch(from var(--color) 20% c h);
    --m-color: oklch(from var(--color) 40% c h);
    --l-color: oklch(from var(--color) 60% c h);
  }
  div {
    border: solid 1px #000;
    width: var(--unit);
    height: var(--unit);
    color: var(--color);
  }
  div.s {
    width:  var(--s-width);
    height: var(--s-height);
    color:  var(--s-color);
  }
  div.m {
    width:  var(--m-width);
    height: var(--m-height);
    color:  var(--m-color);
  }
  div.l {
    width:  var(--l-width);
    height: var(--l-height);
    color:  var(--l-color);
  }
</style>
<div class="s">S</div>
<div class="m">M</div>
<div class="l">L</div>
<div>X</div>
```

しかし、`if()` を用いると、分岐条件に用いる Custom Properties として `--size` の指定だけにまとめられるのだ。

不要となる中間 Variable を消すとしたら、以下のようにまとめることもできる。

```html
<style>
  :root {
    --unit: 20px;
    --color: #deadbeef;
  }
  div {
    border: solid 1px #000;
    color: if(
      style(--size: s): oklch(from var(--color) 20% c h);
      style(--size: m): oklch(from var(--color) 40% c h);
      style(--size: l): oklch(from var(--color) 60% c h);
      else: var(--color);
    );

    width: if(
      style(--size: s): calc(var(--unit) * 1.0);
      style(--size: m): calc(var(--unit) * 2.0);
      style(--size: l): calc(var(--unit) * 4.0);
      else: var(--unit);
    );

    height: if(
      style(--size: s): calc(var(--unit) * 1.2);
      style(--size: m): calc(var(--unit) * 1.3);
      style(--size: l): calc(var(--unit) * 1.4);
      else: var(--unit);
    );
  }
  div.s { --size: s; }
  div.m { --size: m; }
  div.l { --size: l; }
</style>
<div class="s">S</div>
<div class="m">M</div>
<div class="l">L</div>
<div>X</div>
```

もちろん、恣意的に全てインラインで書いているだけで、各値を CSS Variable に残す中間の記述も可能だ。

特に今は CSS Variable ベースのスタイルライブラリが多く出回っているため、それらを条件分岐の中で参照するといった使い方が馴染むだろう。

一方、変数を計算するためだけに、不必要に増えた中間 Variable のようなものは、ある程度減らしていける可能性もあるのだ。


### 提案の背景

`if()` 相当が提案されたのは、初めてのことではない。2018 年にも Less の `if()` をベースとした提案がなされていた。

- [css-values] if() function · Issue #3455 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/3455

しかし、この時点では条件式がどのように挙動するのかが非常に曖昧だった。

ところが、その後 Style Query の仕様が先に進んだことで、条件式にはその仕様をほとんど再利用することができたのだ。

これをきっかけに 2023 年頃から話が進み、現在は Values and Units Lv5 に組み込む形でドラフトが書かれている。

- CSS Values and Units Module Level 5
  - https://drafts.csswg.org/css-values-5/#if-notation

Style Query の条件に書けるものは、ほぼそのまま `if()` でも使えるため、実装も比較的早く進んだ。

このあたりの経緯は以下に詳しい。

- Inline conditionals in CSS? • Lea Verou
  - https://lea.verou.me/blog/2024/css-conditionals/


### Style Query との使い分け

ほぼ Style Query と同じことができるわけだが、それぞれはユースケースが異なる。

Style Query は「コンテナコンポーネントのスタイルに応じた指定」を行うためのものだ。しかし、スタイルが指定できるのはコンテナ内の子孫だけなので、コンテナそのものには指定ができなかった。

こうした場合に、親側のスタイルだけを指定するために `pill`, `size`, `outline` など、具体的な値を入れ、それをそのまま CSS に反映するような、Presentational Attributes と呼ばれる属性が提供されることが多かった。そのため、コンポーネントライブラリの中には、「属性経由で指定されるスタイル」と「カスタムプロパティ経由で指定されるスタイル」が入り交じるような設計も多くあったのだ。

`if()` にはそうした制限がないため、コンテナそのものは `if()` で、コンテナ内の子孫は Style Query で参照しつつ指定する、といった使い分けもできるだろう。これにより、Presentational Attributes が不要となれば、「HTML の属性にスタイルそのものを書く」に近い状態を脱することができる(まあ、Tailwind が流行っている今、文書/スタイルの分離に価値を見出している人がどのくらいいるかは疑問だが)。


### 用途と注意

単に「CSS に条件分岐が入った」と聞くと、これまで SASS などで運用した経験からアレルギーを持つ開発者もいるだろう。

しかし先の例 `--mode` は、「スタイルそのものを入れた単なる変数」ではなく、「バリエーションを示しそれにより複数のプロパティが決定」するプロパティだった。これは、議論の中で *Higher Level Custom Properties* と呼ばれている。

- [css-variables?] Higher level custom properties that control multiple declarations · Issue #5624 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/5624

しかし、「スタイルバリエーションを凝集し、それらを代表する Higher Level Custom Property の指定のみで制御する」という設計を CSS だけで簡潔に行うというユースケースがあると言えば、ある程度の納得感はありそうだ。そして、これこそが `if()` を入れる最終的なモチベーションであると筆者は理解している。

もともとは、こうした要件を満たすために「他の Style がどう変わったかを変更検知して追従する」という Observer 方式の仕様も提案されていた。

- observedStyles · Issue #856 · WICG/webcomponents
  - https://github.com/WICG/webcomponents/issues/856

結果としては実装上の都合で実現しなかったが、もし Observer 方式でやるとしたら、おそらく `if()` 以上に複雑な結果になっていたのではないかと筆者は感じる。

つまり `if()` の導入は、前提としてのコンポーネント設計がきちんと行われており、そのスタイルバリエーションを実現するために、Higher Level Custom Property の指定のみに集約できている状態が理想となる。

思いつきで「ここは `if()` 使えば一行で書けるな」程度の無秩序な分岐を伴うコードは、あまり良い結果にならないだろう。

実際、現状はまだ Experimental であるため、DevTools のデバッグも特に支援はない。Syntax Highlight も Formatter も大体動かない。意図した挙動をしない場合に、何が悪いのかぱっとはわかりにくい。もちろん、開発環境はこれから整備されていくことにはなるが、それでも無秩序に「使えるところから使っていこう」では後悔するように思う。

では、どうやってその秩序を維持するかは、ここからエコシステム側が考えていくことになるだろう。


## @function

CSS の中にも、`calc()` や `minmax()` など、動的に値を算出する API は増えてきた。特に、デザインシステムのようにオーガナイズされたスタイルは、ベースとなる特定の値 (Primary Color や Base Gap など) を定義し、バリエーションは機械的に計算できるように設計するのが主流になっている。

また、`random()` や `sin()`/`cos()` など、頻出する関数のネイティブ化の流れも顕著で、追加の仕様検討も頻繁に行われている。

となれば、やはりカスタムファンクションを定義したいという要望が出てくることになる。

もともとは、「処理の一部を共通化する」という類似した目的から、function と mixin が同軸で議論されており、ドラフトも両方を同時に定義している。しかし、今回実装する範囲は function のみとなっている。

先程出てきた、色の計算部分を抜き出してみよう。

```css
:root {
  --color: #deadbeef;
}
div {
  color: if(
    style(--size: s): oklch(from var(--color) 20% c h);
    style(--size: m): oklch(from var(--color) 40% c h);
    style(--size: l): oklch(from var(--color) 60% c h);
    else: var(--color);
  );
}
```

このように一部のパラメータだけが違う場合は、以下のように関数化できる。

```css
@function --color(--l) {
  result: oklch(from #deadbeef var(--l) c h);
}

div {
  color: if(
    style(--size: s): --color(20%);
    style(--size: m): --color(40%);
    style(--size: l): --color(60%);
  );
}
```

ここまで、グローバル変数として `--color` を定義していたが、同じ名前のままカスタムファンクションになった。代わりに、定義が一箇所なので、それまで独立させていた基本色は、関数に直書きしているがこれはまあ、従来通り外に出しても良いだろう。

使う側を見れば、何によるバリエーションがスタイルを変えているのかが、ある程度わかりやすくなっているとは思う。

他の例として、`light-dark(A, B)` のメディアクエリ版として、`--pc-mobile(A, B)` をカスタムファンクションとして考えてみよう。

960px を起点に、大きければ PC と判断し A を、小さければ Mobile と判断し B を返すようなイメージだ。

```css
@function --pc-mobile(--PC, --Mobile) {
  @media (width <= 960px) {
    result: var(--PC);
  }
  @media (960px < width) {
    result: var(--Mobile);
  }
}

body {
  width: --pc-mobile(60vw, 94vw);
}
```

これまで、分散しがちだったメディアクエリによる定義も、一箇所に集約できており、発生し得るバリエーションも明示的になっただろう。


### 提案の背景

同様の提案は、おそらく歴史上複数回あっただろうが、直近では 2022 年に Declarative Custom Functions という形で提案されたものがある。

- Declarative custom functions · Issue #7490 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/7490

やはり、プリプロセッサベースで行われてきた「定義の再利用」を、ネイティブでどのように提供できるかというモチベーションが大きい。

この提案を拡張し、構文の変更や function/mixin の分離、その他細かいところを変更してまとめられたのが、今回紹介した提案となる。

- Proposal: Custom CSS Functions & Mixins · Issue #9350 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/9350

両者は共通点が多いため、同一のスレッドで議論されることになったが、今回実装されたのは `@function` の方のみだ。


### 用途と注意

こちらは、いわゆる DRY 的な文脈で処理を一元管理できるという点で、一定の簡素化につながるかもしれない。特にこれまで `var()` や `calc()` の連鎖でのみバリエーションを広げていく書き方をしていたのと比べると、コードもかなり減るだろう。プリプロセッサで展開されてコードが肥大していた頃よりは、ダイエットになる可能性は高い。

しかし、こちらも何をどのレベルで関数化するのかといった側面にガバナンスが無いと、非常に複雑なコードの連鎖と化したコードが容易に想像できる。

今回の `if()` や `@function` の前提として、やはりコンポーネント指向の Web 開発は、分けては考えられないだろう。`@scope` や Container Query などは、HTML / JS と合わせて CSS を同梱したコンポーネントを基本に開発し、アプリとはそれを敷き詰めた実装であるというスタンスが前提にあるか、それとも古き良き HTML で組まれたサイトに、CSS ファイルを読み込み、そこにページ全体のスタイルが書かれているような作り方とでは、影響が変わってくるだろう。

コンポーネントに閉じるということは、ある程度スコープの狭い CSS だけを対象にすればよく、そこに当てたいスタイルそのものよりもその「コンポーネントが置かれている条件」のハンドリングの方が関心事として大きい。

汎用的な設計のコンポーネントは、それらを外から引数として注入され、その値に応じて形を変え、それ以上のこと(自分がコンテナ側でどう扱われるか)は呼び出した側(コンテナ)に任せるという発想に必然的に行き着く。

コンポーネントの中はある程度見通しの効く量の CSS であるべきだし、そこでの実装が、設計に応じたカスタムプロパティとそれを反映するための `if()` や、その実装を共通化する `@function` によって書かれていても、そこまで大きく可読性を失うことは無いだろう。むしろ、下手に JS との行き来が発生する方が汚れやすい可能性すらある。

また、デザインシステムの中で、デザインは Token ベースの設計を行い、Headless 系のコンポーネントと繋ぎこむ設計も多くなってきたが、この Token の設計に使える `@function` を共通の Utility として整備したり、Token として提供していた Custom Property の代わりに Custom Function そのものを利用者に提供してしまうという設計もあるだろう。

- Figma がどうやって吐いてくれるのか
- ロジックが入ってくるとデバッグはどうするのか
- テストを書きたくなるがそれは JS の方がやりやすくないか?
- CSS Variable ベースのスタイルライブラリはどうなっていくのか?
- CSS Modules / CSS in JS / Tailwind などの選定にどう影響していくのか?
- プリプロセッサに残された役割とは?

など、かなり考え方が変わってきそうだ。


## いつ Ship するか

今回特筆すべきは、Chrome の Intents を出す早さだった。どちらの機能も I2P が出た直後に I2S が出されたのだ。

- `if()`
  - I2P: 2025/01/28
  - I2S: 2025/02/26
- `@function`
  - I2P: 2025/02/13
  - I2S: 2025/02/25

筆者としても「やってるなぁ」と思った直後には Ship が出たので、非常に驚いた。

さすがに、「重要な機能であるため、Ship を急がずにトライアルをもっと試した方が良い」というフィードバックがあり、少なくとも `@function` の Ship は 3 ヶ月延期された。

しかし、それでも 3 ヶ月は流石に短いと感じる。昨今の CSS では、途中で名前や挙動を変えることが度々あり、Ship してから互換性の問題が見つかることもあったため、あまり焦ってリリースしない方が良いのは間違いない。一方で、ダラダラ議論しても先に進まないのも事実であり、互換性の問題は Ship してみないと見つかりにくいのも事実だ。もしかしたら、この Ship は意図して早急に出し周囲を急かす目的もあるのかもしれない。

なお、Firefox / Safari のポジションは現時点では出ていない。

一方、ドラスティックな提案でありながら TAG の反応は意外にもポジティブ寄りに見える。


## Outro

議論の中期段階程度だが、詳細な仕様はどうあれ、CSS WG としては「やっていく」こと自体に一定の合意がある状態と言えるだろう。

ここまで CSS でできることが増えると、デザインシステムを作り始めていたころの前提ともかなり変わってくるだろう。

次の 10 年、CSS がどうなっていくのか、また全くわからなくなってきた。

そんな重要な議論を、受け身で与えられてから仕様に文句を言っても遅いため、我々も、今この時点から「CSS における `if()` / `@function` がどうあるべきか」を考える必要があるのだ。

その啓蒙の意味を込めて、仕様の詳細解説ではなく、議論の現状を解説した。


## DEMO

動作するデモを以下に用意した。

Chrome で以下の 2 つのフラグを有効にすると動作する。

- chrome:flags
  - `chrome://flags/#enable-experimental-web-platform-features`
- runtime flag
  - `--enable-blink-features=CSSFunctions`

- https://labs.jxck.io/css/if.html
- https://labs.jxck.io/css/function.html


## Resources

- Spec
  - CSS Values and Units Module Level 5
    - https://drafts.csswg.org/css-values-5/#if-notation
  - CSS Functions and Mixins Module
    - https://drafts.csswg.org/css-mixins-1/
- Explainer
  - Explainer: CSS if() function - Google Docs
    - https://docs.google.com/document/d/1mbHBUR40jUBay7QZxgbjX7qixs5UZXkdL9tVwGvbmt0/
  - CSS Mixins & Functions Explainer
    - https://css.oddbird.net/sasslike/mixins-functions/
- Requirements Doc
- Mozilla Standard Position
  - CSS if() function · Issue #1167 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1167
  - CSS Functions and Mixins 1 (@function) · Issue #1148 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1148
- Webkit Position
  - CSS if() function · Issue #453 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/453
  - CSS Functions and Mixins 1 (@function) · Issue #437 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/437
- TAG Design Review
  - CSS if() function · Issue #1045 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/1045
  - Custom Functions (@function) · Issue #1031 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/1031
- Intents
  - Intent to Ship: CSS if() function
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/EOz7NK6Y0cE
  - Intent to Prototype: CSS if() function
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ySEBHgVlhBM
  - Intent to Ship: CSS Custom Functions (@function)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/bvi4D7eD7wI
  - Intent to Prototype: CSS functions
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/b-BTxKD-Ldc/
- Chrome Platform Status
  - CSS if() function - Chrome Platform Status
    - https://chromestatus.com/feature/6313805904347136
  - CSS Custom Functions - Chrome Platform Status
    - https://chromestatus.com/feature/5179721933651968
- WPT (Web Platform Test)
  - if
    - https://wpt.fyi/results/css/css-values?label=master&q=if-
  - function
    - https://wpt.fyi/results/css/css-mixins?label=experimental&label=master&aligned
- DEMO
- Blog
  - Inline conditionals in CSS? • Lea Verou
    - https://lea.verou.me/blog/2024/css-conditionals/
- Presentation
- Issues
  - [css-values] if() function · Issue #3455 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/3455
  - [css-values-5] What is the MVP for inline conditionals on custom properties? · Issue #10064 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/10064
  - [css-values] Short-circuit if() evaluation · Issue #11500 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/11500
  - [css-mixins] Allow mixins/functions to be called via custom properties · Issue #10006 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/10006
  - Proposal: Custom CSS Functions & Mixins · Issue #9350 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/9350
- Other