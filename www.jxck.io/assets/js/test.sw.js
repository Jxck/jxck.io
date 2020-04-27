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

  self.addEventListener('periodicsync', (e) => {
    console.log('periodicsync', e)
    e.waitUntil(async function() {
      // feed json を取得し etag を確認
      const URL  = 'https://feed.mozaic.fm/index.json'
      const feed = await fetch(URL)
      const etag = feed.headers.get('etag')
      console.log(etag)

      // 保存済みの feed の etag を取得してから更新
      const cache_general = await caches.open(CACHE_GENERAL)
      const stored        = await cache_general.match(URL)
      const stored_etag   = stored?.headers?.get('etag')
      await cache_general.add(URL, feed)

      console.log(stored_etag, etag)

      if (stored_etag === etag) return

      // 更新されてるのでパースして最新のエピソードを取得
      const json = await feed.json()
      const item = json.rss.channel.item[0] // last: 72
      const html = item.link
      const mp3  = item["media:content"].url
      const title = item.title
      const subtitle = item["itunes:subtitle"]

      await cache_general.add(html)
      const cache_mp3 = await caches.open(CACHE_MP3)
      await cache_mp3.add(mp3)

      console.log('cache updated')

      if (navigator.setAppBadge) {
        navigator.setAppBadge()
        console.log('show badge')
      }

      // content index に追加
      if (self.registration.index === undefined) return
      await self.registration.index.add({
        id: html,
        url: html,
        title: title,
        category: `article`,
        launchUrl: html,
        description: subtitle,
        icons: [
          {src: '/assets/img/mozaic.jpeg', type: 'image/jpeg', sizes: '2000x2000'},
          {src: '/assets/img/mozaic.webp', type: 'image/webp', sizes: '256x256'},
          {src: '/assets/img/mozaic.png',  type: 'image/png',  sizes: '256x256'},
          // {src: '/assets/img/mozaic.svg',  type: 'image/svg+xml'} SVG はエラーになる?
        ]
      })

      console.log('content index added')

      return
    }())
  })
}
worker()
