registerPaint('border-double-custom', class {
  static get inputProperties() {
    return [
      '--debug',
    ]
  }

  static get inputArguments() {
    return [
      '<color>',  // outer_color
      '<length>', // outer_width
      '<color>',  // inner_color
      '<length>', // inner_width
      '<length>', // margin
    ]
  }

  paint(ctx, {width: w, height: h}, styleMap, args) {
    console.log(ctx)
    console.log(args)

    const [
      {value: outer_color},
      {value: outer_width},
      {value: inner_color},
      {value: inner_width},
      {value: margin}
    ] = args

    console.log(outer_color, outer_width, inner_color, inner_width, margin)

    // --debug
    const DEBUG = styleMap.get('--debug').value == "true"
    if (DEBUG) {
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, w, h);
    }

    // outer
    this.rect(ctx, outer_color, outer_width, 0, 0, w, h)

    // inner
    let m = margin + outer_width
    this.rect(ctx, inner_color, inner_width, m, m, w-(2*m), h-(2*m))
  }

  rect(ctx, color, l, x, y, w, h) {
    ctx.strokeStyle = color
    ctx.lineWidth = l
    // shit inside for half of line width
    ctx.strokeRect(x+(l/2), y+(l/2), w-l, h-l)
  }
})
