#!/usr/bin/env node
"use strict"

import puppeteer from "puppeteer"

async function entries_url(browser) {
  const page = await browser.newPage()
  // get entries url
  await page.goto("https://blog.jxck.io")
  const entries = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('time + a')).map((e) => {
      return e.href
    })
  })
  await page.close()
  return entries
}

async function episodes_url(browser) {
  const page = await browser.newPage()
  // get episodes url
  await page.goto("https://mozaic.fm")
  const episodes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2 > a')).map((e) => {
      console.log(e.href)
      return e.href
    })
  })
  await page.close()
  return episodes
}

async function getFont(page, URL) {
  console.log(URL)
  await page.goto(URL, {waitUntil: 'networkidle0'})
  await page.reload({waitUntil: 'networkidle2'});
  await page._client.send("DOM.enable")
  await page._client.send("CSS.enable")
  const doc      = await page._client.send("DOM.getDocument")
  // 対象外を消す
  await page.evaluate(() => {
    document.querySelectorAll('pre, code, footer').forEach((e) => {
      return e.remove()
    })
  })
  const selector = "p, ul, ol, dl, table, h1, h2, h3, h4, h5, h6"
  const node     = await page._client.send("DOM.querySelectorAll", {nodeId: doc.root.nodeId, selector: selector})
  const fonts    = await Promise.all(node.nodeIds.map(async (nodeId) => {
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
  const browser  = await puppeteer.launch()
  const entries  = await entries_url(browser)
  const episodes = await episodes_url(browser)

  const urls = [
    ...entries,
    ...episodes
  ]

  const page = await browser.newPage()
  await page.setCacheEnabled(false);
  for (const url of urls) {
    const result  = await getFont(page, url)
    result.forEach(({hits, outerHTML}) => {
      console.log(hits)
      console.log(outerHTML)
    })
  }
  console.log('close')
  await browser.close()
})()
