'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

window.on('load', async (e) => {
  const res = await fetch('index.html')
  console.log(res)
})

window.on('pageshow', (e) => {
  console.log(e)
  if (e.persisted) {
    console.log('BFCache Hit')
  }
})
