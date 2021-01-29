# [sfv][http] Structured Field Values

## Intro

HTTP Header の値を構造化する Structued Field Values の仕様が RFC になった。

この仕様をドラフト段階から実装しており




### Item

| Type       | Value         | SFV     |
|:-----------|:--------------|:--------|
| Integer    | 10            | 10      |
| Decimal    | 3.14          | 3.14    |
| String     | "hello"       | "hello" |
| Token      | x             | x       |
| Byte Seq   | [255,254,0,1] |         |
| Boolean    | true          | ?1      |



### List


```js
// 1,2,3,4
[1, 2, 3, 4]
```

### Dict


```js
// a=10,b=20,c=30
{
  "a": 10,
  "b": 20,
  "c": 30,
}
```


### Parameter

ここまでの値に Parameter というメタデータを付与することができる。
例えば以下は String の "abc" に対してパラメータを 2 つ付与している。

```js
// "abc";a=1;b=2
{
 "value": "abc",
 "params": {
  "a": 1,
  "b": 2
 }
}
```

データ表現には基本的に Key/Value/Metadata の 3 つがあることが望ましい。

例えば XML/HTML のようなフォーマットは Attribute がメタデータを担うが、これを再現可能になる。

```html
<p id="foo" class="bar">hello</p>
```

```js
// p="hello world";id="foo";class="bar"
{
 "p": {
  "value": "hello world",
  "params": {
   "id": "foo",
   "class": "bar"
  }
 }
}
```

Key/Value だけしかない JSON では表現しにくかったものも表現可能になっている。


## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://jxck.github.io/structured-field-values/demo.html>


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
