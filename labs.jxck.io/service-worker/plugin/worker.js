console.info(` worker`)

console.log('before')
importScripts('fetch1.js')
importScripts('fetch2.js')
console.log('after')

const ver = 1

self.addEventListener('install', (e) => {
  console.info(e.type, ver, e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, ver, e)
  e.waitUntil(self.clients.claim())
})
