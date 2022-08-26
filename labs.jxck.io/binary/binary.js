function a() {
  const ab = new ArrayBuffer(4);
  console.log(ab);

  const u8a = new Uint8Array(ab, 0, 4);
  u8a[0] = 0xff;
  u8a[1] = 0xff;
  u8a[2] = 0;
  u8a[3] = 1;
  console.log(u8a);
  console.log(ab);
  console.log(u8a.buffer);
}

function b() {
  const u8a = new Uint8Array([0xff, 0xff, 0, 1]);
  console.log(u8a.buffer);
}

function c() {
  const ab = new ArrayBuffer(4);
  const dv = new DataView(ab);
  dv.setUint8(0, 0xff);
  dv.setUint8(1, 0xff);
  dv.setUint16(2, 1);
  console.log(dv);
  console.log(dv.buffer); // ArrayBuffer { [Uint8Contents]: <ff ff 00 01>, byteLength: 4 }
}

function d() {
  if (this.Buffer === undefined) return
  const buf = Buffer.from([0xff, 0xff, 0, 1]);
  const u8a = new Uint8Array(buf);
  console.log(u8a);
  const ab = u8a.buffer;
  console.log(ab);
}

function e() {
  if (this.Buffer === undefined) return
  const buf = Buffer.from([0xff, 0xff, 0, 1]);
  const u8a = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  u8a[0] = 10;

  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  dv.setUint8(1, 11);

  console.log(buf); // <Buffer 0a 0b 00 01>
}

[a, b, c, d, e].forEach((f) => f());
