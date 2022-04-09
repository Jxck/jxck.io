'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

window.on('load', async (e) => {
  console.log(e.type, e)
  const res = await fetch('index.html')
  console.log(res)
})

document.on('DOMContentLoaded', (e) => {
  console.log(e.type, e)
})

window.on('pageshow', (e) => {
  console.log(e.type, e)
  if (e.persisted) {
    console.log('BFCache Hit')
  }
})
