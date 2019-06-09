'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  const registration = await navigator.serviceWorker.register('worker.js')
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e)
  })
  await navigator.serviceWorker.ready
})

$('#button').on('click', async (e) => {
  console.log(e)
  console.log(await (await fetch('test')).text())
})
