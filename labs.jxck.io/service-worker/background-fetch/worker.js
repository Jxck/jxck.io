console.info('worker')

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
    // 保存
    try {
      console.log(e.registration.id)

      const cache    = await caches.open(e.registration.id)
      console.log(cache)

      const records  = await e.registration.matchAll()
      console.log(records)

      const promises = records.map(async (record) => {
        const response = await record.responseReady
        console.error(response)
        await cache.put(record.request, response)
      })

      await Promise.all(promises)
      await e.updateUI({ title: 'downloaded!' })
    } catch (err) {
      e.updateUI({ title: `Movie download failed` })
    }
  }())
})

// 失敗した場合
self.addEventListener('backgroundfetchfail', (e) => {
  console.log(e)
  e.waitUntil(async function() {
    // 成功した分だけ保存
    try {
      const cache    = await caches.open(e.registration.id)
      const records  = await e.registration.matchAll()
      const promises = records.map(async (record) => {
        const response = await record.responseReady.catch(() => undefined)
        if (response && response.ok) {
          await cache.put(record.request, response)
        }
      })
      await Promise.all(promises)
    } finally {
      await e.updateUI({ title: `download failed.` })
    }
  }())
})

// download タスクをクリックした場合
self.addEventListener('backgroundfetchclick', (e) => {
  console.log(e)
  e.waitUntil(async function() {
    const url = e.registration.id
    console.log(url)
    clients.openWindow(url)
  }())
})

// ダウンロードしたものを返す
self.addEventListener('fetch', (e) => {
  const url = e.request.url
  if (!url.endsWith('.zip')) return
  console.log(url)

  e.respondWith(async function() {
    const cachedResponse = await caches.match(e.request)
    if (cachedResponse) return cachedResponse

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
