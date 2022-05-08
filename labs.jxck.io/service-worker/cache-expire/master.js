'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.info(e.type, e)

  const registration = await navigator.serviceWorker.register('worker.js')
  await navigator.serviceWorker.ready
})
