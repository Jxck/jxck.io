'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

console.log('master')

document.on('DOMContentLoaded', async (e) => {
  const registration = await navigator.serviceWorker.register('worker.js')
  console.log(registration)
  await navigator.serviceWorker.ready
})

async function* scheduler(interval, max = 10) {
  let counter = 0
  while(true) {
    if (counter > max) break
    await new Promise(done => setTimeout(done, interval))
    yield counter ++
  }
}

$('#cache').on('click', async () => {
  const chan = new MessageChannel()
  for await (const n of scheduler(10)) {
    navigator.serviceWorker.controller.postMessage(JSON.stringify({n}))
    const info = await navigator.storage.estimate()
    console.log(`cache: ${n}, usage: ${info.usage/(1024*1024)}, quota: ${info.quota/(1024*1024)}\n`)
  }
})
