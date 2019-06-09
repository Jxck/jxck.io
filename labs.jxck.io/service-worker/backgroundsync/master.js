'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  const registration = await navigator.serviceWorker.register('worker.js')
  await navigator.serviceWorker.ready

  // register sync task
  $('#button').on('click', async () => {
    await registration.sync.register('sync-data')
    console.log('sync registered')
  })
})
