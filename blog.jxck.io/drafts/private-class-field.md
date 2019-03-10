# [] JavaScript の Private Class Field

## Intro

ECMA Script の Private Class Field の実装が各ブラウザで進んでいる。

これにより、従来の JS にはなかった Class の Private Field が使えるようになる。

新しく入った構文や、挙動について解説する。


## Class Field Declaration

まず前提として、現状の Class の Field はコンストラクタで定義する必要がある。

例えば count フィールドを持つ Counter クラスを定義した場合、以下のようになる。


```js
class Counter {
  constructor() {
    this.count = 0
  }
  increment() {
    this.count ++
  }
  decrement() {
    this.count --
  }
  display() {
    console.log(this.count)
  }
}

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display() // 3
console.log(c.count) // 3
```

ここでコンストラクタを介さず、フィールドを定義し初期化する構文が提案されている。

- [tc39/proposal-class-fields](https://github.com/tc39/proposal-class-fields)

これが実装されると、以下のように書くことができる。


```js
class Counter {
  count = 0
  increment() {
    this.count ++
  }
  decrement() {
    this.count --
  }
  display() {
    console.log(this.count)
  }
}
```

ここまでを前提として話を進める。



## Private Field

JavaScript に Class 構文が導入されたのはかなり最近のことだ。

しかし、初期の提案に全てを詰め込むことはせず、いくつかの機能(前述の class field 含む)は、 Future Work になっていた。

もちろん、他の Class 構文を持つ言語と比較しても、 Private といった機能の要望はあり、これを入れるために議論が行われた。

結果、現状の仕様は以下のようになり、ブラウザの実装が進みつつある。

```js
class Counter {
  // private field
  #count = 0
  increment() {
    this.#count ++
  }
  decrement() {
    this.#count --
  }
  display() {
    console.log(this.#count)
  }
}

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display() // 3
console.log(c.#count) // SyntaxError
```


## なぜこの構文になったのか

かなり珍しい構文に落ち着いたこともあり、どうして `#` なのかは FAQ であり、本家のリポジトリにおおよそ書いてある。

[proposal-class-fields/PRIVATE_SYNTAX_FAQ.md](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md)

多くの人は読まないと思われるので、ここでまとめておくことにする。


## なぜ Private にするのか

Private なフィールドを持つ理由は、意図しないものを外部に公開しないというモチベーションがまずある。

例えばこれまで JS にはそれがなかったため、公開を意図しないフィールドには `_` をつけるなどの運用でカバーされてきた。

```js
class Counter {
  _count = 0
  increment() {
    this._count ++
  }
  decrement() {
    this._count --
  }
  display() {
    console.log(this._count)
  }
}
const c = new Counter()
```

あくまで意図を示しているだけで、実際にはアクセスできてしまう。

結果、例えばライブラリの中の意図しない部分が開発者によってアクセスされ、実装を変更すると互換性が壊れるといったことが起こってしまう。


```js
console.log(c._count)
```

しかし、別の実装方法を用いると、 Private に近いことは実現が可能だ。


## Symbol を用いた Soft Private


もう少し隠す方法として Symbol を使うこともできる。

```js
const Counter = (function() {
  const count = Symbol("count");
  return class {
    constructor() {
      this[count] = 0;
    }
    increment() {
      this[count] ++
    }
    decrement() {
      this[count] --
    }
    display() {
      console.log(this[count])
    }
  }
})()
const c = new Counter()
console.log(c[Object.getOwnPropertySymbols(c).pop()])
```

この場合は、シンボルを保持していなければアクセスできない。

しかし、このシンボル自体は `getOwnPropertySymbols` などで取ることができる。

これは、通常の(パブリックな)プロパティと同等のアクセス手段は絶っただけで、実際には、そうしたプロパティが存在することを知ることが可能であり、かつアクセスする方法も残されている。

この挙動を *Soft Private* と呼ぶ。


## WeakMap を用いた Hard Private

WeakMap とクロージャを用いれば、完全にアクセス方法を断つことも可能だ。

```js
const Counter = (function() {
  const privates = new WeakMap();
  return class {
    constructor() {
      const count = 0
      privates.set(this, {count})
    }
    increment() {
      const count = privates.get(this).count ++
      privates.set(this, {count})
    }
    decrement() {
      const count = privates.get(this).count --
      privates.set(this, {count})
    }
    display() {
      console.log(privates.get(this).count)
    }
  }
})()

const c = new Counter()
c.increment()
c.increment()
c.increment()
c.display()
console.log(c.count) // undefined
```


この場合、 WeakMap(`privates`) はクロージャの中にあるため、外からはアクセスできない。

また、外からは Counter オブジェクトが内部でどのような private field を持っているかを知ることができない。

WeakMap は内部的には、[オブジェクトそのものに値を紐づけるような実装が可能](https://mozaic.fm/episodes/19/es7-sideshow.html) であるため、まさしくこの用途にあっている。

この挙動を *Hard Private* と呼ぶ。


## Soft / Hard Private

ECMAScript が Private Field を定義する上で、目指すのは Soft/Hard Private どちらであるかが議論となった。

- [Hard-private vs soft-private #33](https://github.com/tc39/proposal-private-fields/issues/33)

例えばライブラリにおいて、作者が意図しないアクセスを完全に断つためには Hard Private が必要になる。

もし Soft Private で良いのであれば、 Symbol を用いた方法で、ある程度実現可能だ。

そこで、先の WeakMap で実現したような挙動を、構文レベルでサポートすることにより、より手軽に Hard Private を実現することがこの仕様のゴールとなった。

そうでなければ、構文を拡張してまでやる必要があまりなく、 Decorator などを使えば良いことになる。

具体的に求められる挙動は [以下](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md#what-do-you-mean-by-encapsulation--hard-private) のようになる。


1. Private Field にアクセスする方法が一切ない
  1. Reflection など、迂回する方法も提供しない
2. Private Field があることが外からわからない
  1. getOwnPropertyNames などで取得する方法も提供しない
  2. Private Field と同じ Public Field が定義できる、これをエラーにすると存在がわかる
  3. 継承した子クラスや親クラスからもアクセスできない
3. ただし同じクラスの別のインスタンスではアクセスが可能
4. 以上を一定のパフォーマンスで実装できる
  1. Private へのアクセスが遅くない
  2. Public なアクセスや Obejct の精製など既存の挙動にに影響が極力無い


これを満たす構文を定義することになる。


## 構文と動的言語

まず思いつくのが、 JS がこの時のために予約しておいた Java などが採用している `private` キーワードである。

```js
class Counter {
  private count = 0
}
```

これで良ければ何の問題もなかったが、これではいくつか問題がある。

まず、以下のように private と同じ名前の public なフィールドが定義された場合の挙動に曖昧さが残る。

前述の通り、 private count が定義されている場合に public な count の定義をエラーにすると、 private に count があることがわかってしまう。

```js
class Counter {
  private count = 0
  increment() {
    this.count += 1
  }
}
c = new Counter()
c.count = 10 // ?
```

例えば同じことを Java でやると、コンパイルでエラーになる。

JS はコンパイルが無いから、挙動が複雑になってしまうのだ。


また、 3 で書いたように、以下のようなコードで同じクラスなのかの判別が難しくなる。

もし other も Counter であれば、その private フィールドを返す必要がある。

しかし、もし other が別のクラスだったら、単に public なフィールドを返す必要がある。

```js
class Counter {
  equals(other) {
    return this.count === other.count
  }
}
```

これも Java のように型があれば、コンパイルが通った時点で other がどのクラスのインスタンスかがわかるため、問題にならない。

まとめると、動的な言語で private キーワードを使って定義を許した瞬間、全てのプロパティアクセスが「private なのか public なのか?」といった識別をする場面が出てくる。

これは、 Private を使ってない既存のコードを含めて、全体的にオーバーヘッドが増えそうなことが、想像に難くないだろう。







