'use strict'
EventTarget.prototype.on  = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener
/**
 * 同じ VERSION であれば、キャッシュにないものだけ追加する
 * VERSION を変えると、あたらしく作り追加する
 */
const VERSION       = 'v0.5.24'
const CACHE_GENERAL = `${VERSION}.general`
const CACHE_MP3     = `${VERSION}.mp3`
const log = console.debug.bind(console)
console.log('sw.js')

// Service Worker
async function worker() {

  self.addEventListener('install', async(e) => {
    e.waitUntil(skipWaiting())
  })

  self.addEventListener('activate ', async(e) => {
    e.waitUntil(self.clients.claim())
  })

  self.addEventListener('message', async (e) => {
    const { type, url } = e.data;
    if (type === 'save') {
      // url を general cache に追加
      const cache = await caches.open(CACHE_GENERAL)
      cache.add(url)
    }
  })

  self.addEventListener('backgroundfetchsuccess', (e) => {
    console.log(e.type)
    e.waitUntil(async function() {
      try {
        // 結果を取り出す
        const id = e.registration.id
        const records = await e.registration.matchAll()

        // キャッシュ先
        const cache = await caches.open(CACHE_MP3)

        // キャッシュ対象
        const promises = records.map(async (record) => {
          const response = await record.responseReady;
          await cache.put(record.request, response);
        })
        await Promise.all(promises);

        // 通知
        await e.updateUI({title: `downloaded: ${id}`})
      } catch (err) {
        console.error(err)
        e.updateUI({title: `download failed: ${id}`})
      }
    }())
  })

  self.addEventListener('backgroundfetchfail', (e) => {
    console.error(e)
  })

  self.addEventListener('backgroundfetchabort', (e) => {
    console.error(e)
  })

  // download タスクをクリックした場合
  self.addEventListener('backgroundfetchclick', (e) => {
    console.log(e)
    e.waitUntil(async function() {
      const url = e.registration.id
      clients.openWindow(url)
    }())
  })
}
worker()
