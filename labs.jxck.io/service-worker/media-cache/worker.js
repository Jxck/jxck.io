console.info('worker')

const KEY  = 'media-cache'
const URLS = ['mozaic-ep66.mp3']

self.addEventListener('install', (e) => {
  console.info(e.type, e)
  e.waitUntil(async function() {
    const cache = await caches.open(KEY)
    const res   = await cache.match(URLS)
    if (res === undefined) {
      await cache.addAll(URLS)
    }
    return skipWaiting()
  }())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.log(e)
  e.respondWith((async () => {
    const req = e.request
    print_req(req)

    const cache = await caches.open(KEY)
    let   res   = await cache.match(req.url)

    if (res) {
      console.log('cache hit')
      const range   = req.headers.get('range')?.match(/^bytes\=(\d+)\-$/)[1]
      const type    = res.headers.get('content-type')
      const buf     = await res.arrayBuffer()
      const partial = buf.slice(range)
      const status  = 206
      const headers = new Headers({
        'Content-Type':  type,
        'Content-Range': `bytes ${range}-${buf.byteLength - 1}/${buf.byteLength}`
      })
      res = new Response(partial, {status, headers})
    } else {
      res = await fetch(req)
    }

    print_res(res)
    return res
  })())
})


function headers(r) {
  return Array.from(r.headers.entries()).map(([k,v]) => {
    return `${k}: ${v}`
  }).join("\n")
}

function print_req(req) {
  console.log(`
${req.method} ${req.url}
${headers(req)}
`)
}

function print_res(res) {
  console.log(`
${res.status} ${res.statusText}
${headers(res)}
`)
}
