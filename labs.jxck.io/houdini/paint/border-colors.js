
registerPaint('border-colors', class {
  static get inputProperties() {
    return [
      '--border-width',
    ];
  }

  paint(ctx, size, styleMap) {
    console.log(ctx);
    const {width: w, height: h} = size
    console.log(w, h);

    const bw = parseInt(styleMap.get('--border-width'))
    console.log(bw);

    const hm = (h-bw*2)/2 + bw; // height middle


    ctx.fillStyle = 'blue'

    ctx.lineWidth = 2;

    // space
    const s = ctx.lineWidth * 3;

    // 左上
    ctx.beginPath();
    ctx.moveTo( 0, bw);
    ctx.lineTo(bw, bw);
    ctx.stroke();

    // 左中
    ctx.beginPath();
    ctx.moveTo(s, bw+s);
    ctx.lineTo(bw-(s*2), hm);
    ctx.lineTo(s, h-(bw+s));
    ctx.stroke();

    // 左下
    ctx.beginPath();
    ctx.moveTo( 0, h-bw);
    ctx.lineTo(bw, h-bw);
    ctx.stroke();


    // 右上
    ctx.beginPath();
    ctx.moveTo(   w, bw);
    ctx.lineTo(w-bw, bw);
    ctx.stroke();

    // 左中
    ctx.beginPath();
    ctx.moveTo(w-s, bw+s);
    ctx.lineTo(w-bw-s*2, hm);
    ctx.lineTo(w-s, h-(bw+s));
    ctx.stroke();

    // 右下
    ctx.beginPath();
    ctx.moveTo(   w, h-bw);
    ctx.lineTo(w-bw, h-bw);
    ctx.stroke();


    // 上
    const width = w - 2*bw - 2*s;
    console.log(width);


    ctx.beginPath();
    ctx.moveTo(   bw+s, bw);
    ctx.lineTo( w-bw-s, bw);
    ctx.stroke();

  }
});
