'use strict';
// Enable debug log adding #debug into url
const log = location.hash === "#debug" ? console.log.bind(console) : () => {}
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

import CircleProgress from '../../webcomponents/circle-progress.mjs'
customElements.define('circle-progress', CircleProgress)

document.on('DOMContentLoaded', async (e) => {
  log(await navigator.serviceWorker.register('worker.js'))

  const FEED_URL = "https://feed.mozaic.fm"
  const MANIFEST_URL = "./manifest.webmanifest"

  async function fetch_rss(file) {
    // get media info from rss
    const rss = await fetch(FEED_URL)
    const xml = await rss.text()
    const dom = (new DOMParser()).parseFromString(xml, "application/xml")
    const q   = `enclosure[url="http://files.mozaic.fm/${file}"]`
    const enclosure = dom.querySelector(q)
    const item  = enclosure.closest('item')
    const title = item.querySelector('title').textContent
    const downloadTotal = parseInt(enclosure.getAttribute('length'))
    return {title, downloadTotal}
  }

  async function fetch_manifest() {
    const manifest = await fetch(MANIFEST_URL)
    const {icons}  = await manifest.json()
    return icons
  }

  $$('.download').forEach(async (download) => {
    const cached = await caches.match(download.href)
    if (cached) {
      console.log(download.href, cached)
      download.previousElementSibling.setAttribute('value', 100)
    }

    download.addEventListener('click', async (e) => {
      e.preventDefault()
      const registration = await navigator.serviceWorker.ready
      const url  = e.target.href
      const file = new URL(url).pathname.split("/").pop()
      const [{title, downloadTotal}, icons] = await Promise.all([
        fetch_rss(file),
        fetch_manifest()
      ])
      const option = {title, downloadTotal, icons}
      log(url, file, option)

      // init circle progress
      const $circle = e.target.previousElementSibling
      $circle.setAttribute('max', downloadTotal)

      // register background task
      const task = await registration.backgroundFetch.fetch(url, [url], option)
      task.addEventListener('progress', (e) => {
        log(task, task.downloaded)
        $circle.setAttribute('value', task.downloaded)
      })
    })
  })
})
