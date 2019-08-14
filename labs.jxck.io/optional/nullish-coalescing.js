'use strict';

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e)

  var param;

  param = 100
  param = param ?? 'default' // 100
  console.log(param)

  param = null
  param = param ?? 'default' // 'default'
  console.log(param)

  param = undefined
  param = param ?? 'default' // 'default'
  console.log(param)

  param = 0
  param = param ?? 'default' // 0
  console.log(param)

  param = false
  param = param ?? 'default' // false
  console.log(param)

  param = ''
  param = param ?? 'default' // ''
  console.log(param)



  const o = {
    nul:   null,
    undef: undefined,
    text:  '',
    num:   0,
    bool:  false,
  }

  console.log(o.reallyundef ?? 'alternate')
  console.log(o.undef ?? 'alternate')
  console.log(o.xxx   ?? 'alternate')
  console.log(o.text  ?? 'alternate')
  console.log(o.num   ?? 'alternate')
  console.log(o.bool  ?? 'alternate')
})
