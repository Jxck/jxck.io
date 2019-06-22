'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

console.log('master');

document.on('DOMContentLoaded', async (e) => {
  console.log(e)
  const registration = await navigator.serviceWorker.register('worker.js')
  registration.on('updatefound', (e) => {
    console.info('update', e);
  })
  $('#update').on('click', async () => {
    console.log(await registration.update())
  })
  await navigator.serviceWorker.ready
})
