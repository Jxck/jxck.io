const DEBUG = true
registerPaint('border-double-custom', class {
  static get inputProperties() {
    return [
      '--debug',
    ]
  }

  static get inputArguments() {
    return [
      '<color>',
      '<length>',
      '<color>',
      '<length>',
      '<length>',
    ]
  }

  paint(ctx, {width: w, height: h}, styleMap, [color1, line1, color2, line2, margin]) {
    console.log(ctx)
    console.log(color1, line1, color2, line2, margin)

    // --debug
    const DEBUG = styleMap.get('--debug').value == "true"
    if (DEBUG) {
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, w, h);
    }

    // outer
    this.rect(ctx, color1.value, line1.value, 0, 0, w, h)

    // inner
    let m = margin.value
    this.rect(ctx, color2.value, line2.value, m, m, w-(2*m), h-(2*m))
  }

  rect(ctx, color, l, x, y, w, h) {
    ctx.strokeStyle = color
    ctx.lineWidth = l
    // shit inside for half of line width
    ctx.strokeRect(x+(l/2), y+(l/2), w-l, h-l)
  }
})
