'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  const registration = await navigator.serviceWorker.register('worker.js')
  await navigator.serviceWorker.ready

  if (navigator.serviceWorker.controller) {
    console.log(navigator.serviceWorker.controller)
    return navigator.serviceWorker.controller
  }

  const controller = await new Promise((done, fail) => {
    navigator.serviceWorker.addEventListener('controllerchange', (e) => {
      console.log(e)
      done(navigator.serviceWorker.controller)
    })
  })

  console.log(controller)
  console.log(await fetch('/test'))
})
