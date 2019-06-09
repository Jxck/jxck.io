console.info('worker')

const KEY  = 'cache-quota'

self.addEventListener('install', (e) => {
  console.info('install', e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  e.waitUntil(async function() {
    // remove old cache
    // await caches.delete(KEY)
    // console.log('clear cache')
    return self.clients.claim()
  }())
})

self.addEventListener('message', async (e) => {
  const cache = await caches.open(KEY)
  const URL   = `https://labs.jxck.io/assets/dummy_video.mp4?${Date.now()}`
  await cache.addAll([URL])
})
