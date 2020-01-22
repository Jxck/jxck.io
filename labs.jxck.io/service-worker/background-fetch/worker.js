console.info('worker')

const CACHE_NAME = "v0.0.0"

self.addEventListener('install', (e) => {
  console.info('install', e)
  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info('activate', e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('backgroundfetchsuccess', (e) => {
  console.log(e.type)
  e.waitUntil(async function() {
    try {
      // 結果を取り出す
      const id = e.registration.id
      const record = await e.registration.match(id)
      console.log(id, record)

      // キャッシュ対象
      const request = record.request
      const response = await record.responseReady
      console.log(request, response)

      // キャッシュ先
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request.url, response)

      // 通知
      await e.updateUI({ title: id })
    } catch (err) {
      console.error(err)
      e.updateUI({ title: `download failed ${e.registration.id}` })
    }
  }())
})

self.addEventListener('backgroundfetchfail', (e) => {
  // 特に何もする必要ないっぽい
  console.error(e)
})

self.addEventListener('backgroundfetchabort', (e) => {
  // 特に何もする必要ないっぽい
  console.error(e)
})

// download タスクをクリックした場合
self.addEventListener('backgroundfetchclick', (e) => {
  console.log(e)
  e.waitUntil(async function() {
    const url = e.registration.id
    console.log(url)
    // TODO: エピソードのページを開く
    clients.openWindow(url)
  }())
})

// ダウンロードしたものを返す
self.addEventListener('fetch', (e) => {
  const url = e.request.url
  console.log(url)

  e.respondWith(async function() {
    const cachedResponse = await caches.match(e.request.url)
    if (cachedResponse) {
      console.log("hit", cachedResponse)
      return cachedResponse
    }

    // Maybe it's mid-download?
    const bgFetch = await registration.backgroundFetch.get(url)
    console.log(bgFetch)

    if (bgFetch) {
      const record = await bgFetch.match(e.request)
      console.log(record)
      if (record) return record.responseReady
    }

    return fetch(e.request)
  }())
})
