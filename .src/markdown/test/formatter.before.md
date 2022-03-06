# h1
## em
test *test* test
### strong
test **test** test
### link
https://eample.com
[\*-foo](https://example.com)
### code
test `test` test
### dl
foo
: bar
bee
: buz
### img
![aaa](bbb.png 'fff')
### ul
- a
  - **bbb**
    - *c*
  - `d`
- [e](/)
- > fff

### ol
1. a
2. b **bbb**
3. c *c*
4. d `d`
5. e [e](/)

### blockquote
> fooo
> asd
> --- http://example.com

### table
Caption: キャプション
| |*em* th|**strong** th|right|
|-|:-:|:-|-:|
|`code` aaa|[bbb](/)|c **ccc** c|d *ddd* d|

### details
:::details サマリ
これは *details* です
改行しても **大丈夫**
```js
console.log(0)
```
Caption: table
| left | right |
|:-----|------:|
| aaa  | bbb    |
| aaa  | bbb    |
- リスト
  - リスト
> blockquote
> --- http://example.com
:::
### pre
```
hello
```
```js
console.log(`${1*2}`)
```
```js:path.js
```
escape \` and \< or > in \* end
[aaa | bbb](https://example.com)
- [function\*](https://developer.com)