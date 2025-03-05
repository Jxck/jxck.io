# [css] CSS の if と function の提案

## Intro

CSS に `if()` および `@function` が提案されている。

背景及び現状について解説する。

なお、先に言っておくが関数の再起は、初期仕様から外されている。「関数と分岐」と聞いて想像するであろう「CSS のチューリング完全化」は、まだきてない。

## if()

- Intents
  - Intent to Ship: CSS if() function
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/EOz7NK6Y0cE
  - Intent to Prototype: CSS if() function
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ySEBHgVlhBM
- Explainer
  - Explainer: CSS if() function - Google Docs
    - https://docs.google.com/document/d/1mbHBUR40jUBay7QZxgbjX7qixs5UZXkdL9tVwGvbmt0/edit?tab=t.0#heading=h.xzptrog8pyxf
- Spec
  - CSS Values and Units Module Level 5
    - https://drafts.csswg.org/css-values-5/#if-notation
- Issue
  - [css-values-5] What is the MVP for inline conditionals on custom properties? · Issue #10064 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/10064
  - [css-values] Short-circuit if() evaluation · Issue #11500 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/11500

まず Dark/Light 2 つのモードをもつコンポーネントを考える。

Old School な書き方だとこうなるだろう。

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

この場合、コンポーネントの持つバリエーションごとに、重複したプロパティを全て指定している状態になる。

ここでは Class で指定しているが、Prefer Color Scheme に対応して Color Scheme を切り替える場合は、`dark-light()` で以下のように書ける。

```html
<style>
  my-div {
    color: light-dark(#000, #fff);
    background-color: light-dark(#fff, #000);
  }
</style>
<my-div>dark or light</my-div>
```

ここでは、`color` と `background-color` という 2 つのプロパティの指定が、一箇所に集約されている状態に注目したい。

`light-dark()` は Prefer Color Scheme を参照した分岐になっているが、これを個別に指定できるようにするには、汎用的な条件分岐の仕組みが必要となる。

そこで提案されたのが `if()` だ。先の例は以下のようになる。

`light-dark()` をより汎用的に、何らかの値に対して条件分岐を実現する処理に昇華しようというのが、`if()` の発想だ。

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

ここでは `dark` / `light` という値を定義し、スタイルではこの値に応じた分岐を行っているのがわかるだろう。

この設計では大外の切り替えを Class によって行っているが、実態は「*1 つのカスタムプロパティを定義するだけで、スタイルが全て決まる*」という状態であることに注意したい。

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
let klass = ".light"
if (mode === "dark") {
  klass = ".dark"
}
```

しかし、`if()` を用いてカスタムプロパティからスタイルが導出できるようになっている現状、JS 側で行うのは HTML `mode` attr の CSS `--mode` Custom Properties への転記だけだ。

```js
return `--mode: ${mode}`
```

従来の CSS Custom Property は、一度に一つの値を定義できるだけであるため、単なる「変数」としての役割しか果たすことができなかった。

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

しかし、`if()` の分岐条件に用いる Custom Properties は、本来の意味での "Custom Property" を実現し、この場合も値を `--size` の指定だけにまとめられるのだ。

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

もちろん、恣意的に全てインラインで書いているだけで、両者の中間の記述も可能だ。

特に今は CSS Variable ベースのスタイルライブラリが多く出回っているため、それらを条件分岐の中で参照するといったこと使い方が馴染むだろう。

一方、変数を計算するためだけに、不必要に増えた中間 Variable のようなものは、ある程度減らしていける可能性もあるのだ。


### 用途と注意

単に「CSS に条件分岐が入った」と聞くと、これまで SASS などで運用した経験からアレルギーを持つ開発者もいるだろう。

しかし、「スタイルをカプセル化し、そのスタイルを有意な Custom Property で制御する」ということを CSS 内で簡潔に行うというユースケースがあると言えば、ある程度の納得感はあるのではないだろうか?

もともは、こうした要件を満たすために「他の Style がどう変わったかを変更検知して追従する」という Observer 方式の仕様も提案されていたことからも、ユースケースが見えてくるだろう。結果としては実装上の都合で実現しなかったが、もし Observer 方式でやるとしたら、おそらく `if()` 以上に複雑な結果になっていたのではないかと筆者は感じる。

- observedStyles · Issue #856 · WICG/webcomponents
  - https://github.com/WICG/webcomponents/issues/856

つまり `if()` の導入には、前提としてのコンポーネント設計がきちんと行われており、そのスタイルバリエーションを実現するために、Custom Property とそこから導出されるスタイルの設計ができてる場合が理想となる。

思いつきで「ここは `if()` 使えば一行で書けるな」程度の無秩序な分岐を伴うコードは、あまり良い結果にならないだろう。

実際、現状はまだ Experimental であるため、DevTools のデバッグも特に支援はない。シンタックスハイライトも大体壊れる。動かない場合に何が悪いのかぱっとはわかりにくい。もちろん、それらはこれから整備されていくことにはなるが、それでも無秩序に「使えるところから使っていこう」では後悔するように思う。

では、どうやってその秩序を維持するかは、ここからエコシステム側が考えていくことになる。


## @function

CSS の中にも、 `calc()` や `minmax()` など、動的に値を算出する構成は増えてきた。特に、デザインシステムのようにオーガナイズされたスタイルは、ベースとなる特定の値からのバリエーションを、機械的に計算できるように設計するのが主流になっている。

また、 `random()` や `sin()`/`cos()` など、頻出する関数のネイティブ化の流れも顕著で、追加の仕様検討も頻繁に行われている。

となれば、やはりカスタムファンクションを定義したいという要望が当然出てくることになる。

もともとは、「処理の一部を共通化する」という類似した目的から、 function と mixin が同軸で議論されており、ドラフトも両方を同時に定義している。しかし、今回実装する範囲は function のみとなっている。

先程の出てきた、色の計算部分を抜き出してみよう。

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

このように一部のパラメータだけが違う場合は、以下のように関数化出来る。

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

他の例として、 `dark-light(A, B)` のメディアクエリ版として、 `--pc-mobile(A, B)` をカスタムファンクションとして考えてみよう。

960px を起点に、大きければ PC と判断し A を、小さければ Mobile と判断し B を返すようなイメージだ。

```css
@function --pc-mobile(--PC, --Mobile) {
  @media (width <= 960px) {
    result: var(--PC);
  }
  @media (960px < width) {
    result: var(--Mobile)
  }
}

body {
  width: --pc-mobile(60vw, 94vw);
}
```

これまで、分散しがちだったメディアクエリによる定義も、一箇所に集約できており、発生しえるバリエーションも明示的になっただろう。




- Intents
  - Intent to Ship: CSS Custom Functions (@function)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/bvi4D7eD7wI
- Explainer
  - CSS Mixins & Functions Explainer
    - https://css.oddbird.net/sasslike/mixins-functions/


## 使い所

こちらは、いわゆる DRY 的な文脈で処理を一元管理できるという点で、一定の簡素化には繋がるかもしれない。特にこれまで `var()` や `calc()` の連鎖でのみバリエーションを広げていく書き方をしていたのと比べると、コードもかなり減るだろう。プリプロセッサで展開されてコードが肥大していたころよりは、ダイエットになる可能性は高い。

しかし、こちらも何をどのレベルで関数化するのかといった側面にガバナンスが無いと、非常に複雑なコードの連鎖と化したコードが容易に想像できる。

今回の `if()` や `@function` の前提として、やはりコンポーネント指向の Web 開発は、分けては考えられないだろう。 `@scope` や Container Query などは、 HTML / JS と合わせて CSS を同梱したコンポーネントを基本に開発し、アプリとはそれを敷き詰めた実装であるというスタンスが前提にあるか、それとも古き良き HTML で組まれたサイトに、 CSS ファイルを読み込み、そこにページ全体のスタイルが書かれているような作り方とでは、影響が変わってくるだろう。

コンポーネントに閉じるということは、ある程度スコープの狭い CSS だけを対象にすればよく、そこに当てたいスタイルそのものよりもその「コンポーネントが置かれている条件」のハンドリングの方が関心事として大きい。

汎用的な設計のコンポーネントは、それらを外から引数として注入され、その値に応じて形を変え、それ以上のこと(自分がコンテナ側でどう扱われるか)は呼び出したがわ(コンテナ)に任せるという発想に必然的に行き着く。

コンポーネントの中はある程度見通しの効く量の CSS であるべきだし、そこでの実装が、設計に応じたカスタムプロパティとそれを反映するための `if()` や、その実装を共通化する `@function` によって書かれていても、そこまで大きく可読性を失うことは無いだろう。むしろ、下手に JS との行き来が発生する方が汚れやすい可能性すらある。

また、デザインシステムの中で、デザインは Token ベースの設計を行い、Headless 系のコンポーネントと繋ぎこむ設計も多くなってきたが、この Token の設計に使える `@function` を共通の Utility として整備したり、 Token として提供していた Custom Property の代わりに Custom Function そのものを利用者に提供してしまうという設計もあるだろう。

Figma がどうやって吐いてくれるのか
ロジックが入ってくるとデバッグはどうするのか
テストを書きたくなるがそれは JS の方がやりやすくないか？
CSS Variable ベースのスタイルライブラリはどうなっていくのか？
CSS Modules / CSS in JS / Tailwind などの選定にどう影響していくのか？

など、かなり考え方が変わってきそうだ。

ここまで CSS で出来ることが増えると、デザインシステムを作り始めていたころの前提ともかなり変わってくるだろう。

次の 10 年、CSS がどうなっていくのか、また全くわからなくなってきた。











```
$ --enable-blink-features=CSSFunctions
```


## Outro




## DEMO

動作するデモを以下に用意した。

Chrome で以下の 2 つのフラグを有効にすると動作する。


- chrome:flags
  - `chrome://flags/#enable-experimental-web-platform-features`
- runtime flag
  - `--enable-blink-features=CSSFunctions`
```

- https://labs.jxck.io/css/if.html
- https://labs.jxck.io/css/function.html


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other