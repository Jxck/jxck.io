'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.log(await navigator.serviceWorker.register('worker.js'))

  const registration = await navigator.serviceWorker.ready
  console.log(registration)

  await registration.sync.register('sync-data')

  const cache = await caches.open('background-sync')
  const keys = await cache.keys()
  const $ul  = $('ul')
  keys.forEach(async (key) => {
    const res  = await cache.match(key)
    const date = res.headers.get('date')
    const $li  = document.createElement('li')
    $li.textContent = date
    $ul.appendChild($li)
  })
})
