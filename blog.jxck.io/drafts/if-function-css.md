# [css] CSS の if と function の提案

## Intro

CSS に `if()` および `@function` が提案されている。

背景及び現状について解説する。

なお、先に言っておくが


## if()

- Intents
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
    color: light-dark(#000, #fff);
    background-color: light-dark(#fff, #000);
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


## function()

- Intent to Ship: CSS Custom Functions (@function)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bvi4D7eD7wI


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