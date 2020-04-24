#!/usr/bin/env node
"use strict"

const puppeteer = require("puppeteer");

const URLS = [
  "https://mozaic.fm/episodes/65/monthly-web-202003.html",
  "https://mozaic.fm/episodes/64/monthly-web-202002.html",
  "https://mozaic.fm/episodes/63/cross-origin-info-leaks-sideshow.html",
  "https://mozaic.fm/episodes/63/cross-origin-info-leaks.html",
  "https://mozaic.fm/episodes/62/monthly-web-202001.html",
  "https://mozaic.fm/episodes/61/yearly-web-2019.html",
  "https://mozaic.fm/episodes/60/monthly-web-201911.html",
  "https://mozaic.fm/episodes/59/monthly-web-201910.html",
  "https://mozaic.fm/episodes/58/wasi-sideshow.html",
  "https://mozaic.fm/episodes/58/wasi.html",
  "https://mozaic.fm/episodes/57/monthly-web-201909.html",
  "https://mozaic.fm/episodes/56/monthly-web-201908.html",
  "https://mozaic.fm/episodes/55/monthly-web-201907.html",
  "https://mozaic.fm/episodes/54/monthly-web-201906.html",
  "https://mozaic.fm/episodes/53/monthly-web-201905.html",
  "https://mozaic.fm/episodes/52/monthly-web-201904.html",
  "https://mozaic.fm/episodes/51/translation.html",
  "https://mozaic.fm/episodes/50/monthly-web-201903.html",
  "https://mozaic.fm/episodes/49/monthly-web-201902.html",
  "https://mozaic.fm/episodes/48/monthly-web-201901.html",
  "https://mozaic.fm/episodes/47/monthly-web-201812.html",
  "https://mozaic.fm/episodes/46/yearly-web-2018.html",
  "https://mozaic.fm/episodes/45/monthly-web-201811.html",
  "https://mozaic.fm/episodes/44/monthly-web-201810.html",
  "https://mozaic.fm/episodes/43/permission.html",
  "https://mozaic.fm/episodes/42/monthly-web-201809.html",
  "https://mozaic.fm/episodes/41/monthly-web-201808.html",
  "https://mozaic.fm/episodes/40/monthly-web-201807.html",
  "https://mozaic.fm/episodes/39/monthly-web-201806.html",
  "https://mozaic.fm/episodes/38/monthly-web-201805.html",
  "https://mozaic.fm/episodes/37/monthly-web-201804.html",
  "https://mozaic.fm/episodes/36/monthly-web-201803.html",
  "https://mozaic.fm/episodes/35/security-bugbounty.html",
  "https://mozaic.fm/episodes/34/monthly-web-201802.html",
  "https://mozaic.fm/episodes/33/monthly-web-201801.html",
  "https://mozaic.fm/episodes/32/yearly-web-2017.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/31/ietf.html",
  "https://mozaic.fm/episodes/30/monthly-web-201711.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/29/houdini.html",
  "https://mozaic.fm/episodes/28/monthly-web-201710.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/27/monthly-web-201709.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/26/monthly-web-201708.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/25/monthly-web-201707.html",
  "https://mozaic.fm/episodes/24/angular2.html",
  "https://mozaic.fm/episodes/23/lets-encrypt.html",
  "https://mozaic.fm/episodes/22/amp.html",
  "https://mozaic.fm/episodes/21/mozaic-v2-release.html",
  "https://mozaic.fm/episodes/20/browser.html",
  "https://mozaic.fm/episodes/19/es7-sideshow.html",
  "https://mozaic.fm/episodes/19/es7.html",
  "https://mozaic.fm/episodes/18/nginx.html",
  "https://mozaic.fm/episodes/17/service-worker.html",
  "https://mozaic.fm/episodes/16/security-application.html",
  "https://mozaic.fm/episodes/15/extensible-web.html",
  "https://mozaic.fm/episodes/14/whatwg.html",
  "https://mozaic.fm/episodes/13/virtual-dom-sideshow.html",
  "https://mozaic.fm/episodes/13/virtual-dom.html",
  "https://mozaic.fm/episodes/12/rails-sideshow.html",
  "https://mozaic.fm/episodes/12/rails.html",
  "https://mozaic.fm/episodes/11/high-performance-browser-networking.html",
  "https://mozaic.fm/episodes/10/nodejs-sideshow.html",
  "https://mozaic.fm/episodes/10/nodejs.html",
  "https://mozaic.fm/episodes/9/socket.io.html",
  "https://mozaic.fm/episodes/8/altjs.html",
  "https://mozaic.fm/episodes/7/rest.html",
  "https://mozaic.fm/episodes/6/webrtc.html",
  "https://mozaic.fm/episodes/5/typescript.html",
  "https://mozaic.fm/episodes/4/secuirty-protocol.html",
  "https://mozaic.fm/episodes/3/angularjs.html",
  "https://mozaic.fm/episodes/2/http2-sideshow.html",
  "https://mozaic.fm/episodes/2/http2.html",
  "https://mozaic.fm/episodes/1/webcomponents.html",
  "https://mozaic.fm/episodes/0/introduction-of-mozaicfm.html",
];


async function getFont(page, URL) {
  console.log(URL)
  await page.goto(URL)
  await page._client.send("DOM.enable")
  await page._client.send("CSS.enable")
  const doc    = await page._client.send("DOM.getDocument")
  const selector = "span, div, a, li, dt, dd, h1, h2, h3, h4, h5, h6"
  const node   = await page._client.send("DOM.querySelectorAll", {nodeId: doc.root.nodeId, selector: selector})
  // console.log(node)
  const fonts  = await Promise.all(node.nodeIds.map(async (nodeId) => {
    const {fonts} = await page._client.send("CSS.getPlatformFontsForNode", {nodeId})
    return fonts.map(({familyName}) => {
      return {nodeId, familyName}
    })
  }))
  const hits = fonts.flat().filter(({familyName}) => !familyName.startsWith("Noto"))

  return Promise.all(hits.map(async ({nodeId}) => {
    const {outerHTML} = await page._client.send("DOM.getOuterHTML", {nodeId})
    return {outerHTML, hits}
  }))
}

(async () => {
  const browser = await puppeteer.launch()
  const page    = await browser.newPage()
  for (let i = 0; i < URLS.length; i ++) {
    const result  = await getFont(page, URLS[i])
    result.forEach(({hits, outerHTML}) => {
      console.log(hits)
      console.log(outerHTML)
    })
  }
  console.log('close')
  await browser.close()
})()
