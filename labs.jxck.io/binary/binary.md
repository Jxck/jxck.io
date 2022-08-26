# JS でのバイナリ操作

## Intro

年に 1 回くらいやるけど、その度いつも忘れるのでメモ。

## ArrayBuffer

いわゆるバイト配列の基本。

直接いじるものではなく、 DataView 経由でいじる。

自分で作る場合も、基本直接は作らない。

```js
const ab = new ArrayBuffer(4);
console.log(ab); // ArrayBuffer { [Uint8Contents]: <00 00 00 00>, byteLength: 4 }
```

## TypedArray

ArrayBuffer を型付き配列として扱う。扱った結果は ArrayBuffer に反映される。

```js
const ab = new ArrayBuffer(4);
const u = new Uint8Array(ab, 0, 4);
u[0] = 0xff;
u[1] = 0xff;
u[2] = 0;
u[3] = 1;
console.log(u); // Uint8Array(4) [ 255, 255, 0, 1 ]
console.log(ab); // ArrayBuffer { [Uint8Contents]: <ff ff 00 01>, byteLength: 4 }
```

TypedArray から ArrayBuffer を取り出すこともできる。

```js
const u8a = new Uint8Array([255, 255, 0, 1]);
console.log(u8a.buffer); // ArrayBuffer { [Uint8Contents]: <ff ff 00 01>, byteLength: 4 }
```

- Int8Array
- Int16Array
- Int32Array
- Uint8Array
- Uint16Array
- Uint32Array
- Float32Array
- Float64Array
- BigInt64Array
- BigUint64Array
- Uint8ClampedArray

## DataView

ArrayBuffer を読み書きするメソッドの生えたインタフェース。

```js
const dv = new DataView(ab);
dv.setUint8(0, 0xff);
dv.setUint8(1, 0xff);
dv.setUint16(2, 1);

const ab = dv.buffer;
console.log(ab); // ArrayBuffer { [Uint8Contents]: <ff ff 00 01>, byteLength: 4 }
```

## Buffer

Node は Buffer で返る。

Buffer のままメソッド経由で取り回して操作してもよいが、標準の世界にもってくるなら ArrayBuffer に変換。

TypedArray に渡すとコピーが走る。そこから ArrayBuffer を取り出してもコピー。

```js
const buf = Buffer.from([0xff, 0xff, 0, 1]);
const u8a = new Uint8Array(buf);
console.log(u8a);
const ab = u8a.buffer;
console.log(ab);
```

ゼロコピーで View だけ欲しいなら範囲を渡す。

```js
const buf = Buffer.from([0xff, 0xff, 0, 1]);
const u8a = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
u8a[0] = 10;

const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
dv.setUint8(1, 11);

console.log(buf); // <Buffer 0a 0b 00 01>
```

そもそも確保される Buffer のサイズに注意。

## 基本操作

- API から受け取るものは基本 ArrayBuffer で、そこから TypedArray か DataView を作って操作する
- 自前で作る場合は Uint8Array とかで初期化して ArrayBuffer を取り出す
- Node は Buffer をコピーするか View を作っていじる。
