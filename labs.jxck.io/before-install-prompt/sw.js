console.info('worker')

const KEY  = 'beforeinstallprompt'

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  return
})
