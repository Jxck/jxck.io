'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  const registration = await navigator.serviceWorker.register('worker.js')
  const ID = btoa(Math.random())
  console.log(ID)

  await registration.navigationPreload.setHeaderValue(ID)
  const state = await registration.navigationPreload.getState()
  console.log(state.enabled)
  console.log(state.headerValue)
})
