'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.info(e.type, e)

  const registration = await navigator.serviceWorker.register('worker.js')
  const state = await registration.navigationPreload.getState()
  if (state.enabled) {
    const ID = btoa(Math.random())
    await registration.navigationPreload.setHeaderValue(ID)
    const {enabled, headerValue} = await registration.navigationPreload.getState()
    console.log({enabled, headerValue})
  }
})
