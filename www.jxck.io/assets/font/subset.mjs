#!/usr/bin/env node
"use strict"

import fs from "fs"
import puppeteer from "puppeteer"
import PromiseLimit from "./promise-limit.mjs"

async function entries_url(browser) {
  const page = await browser.newPage()
  // get entries url
  await page.goto("file:///home/jxck/server/jxck.io/blog.jxck.io/index.html")
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
  await page.goto("file:///home/jxck/server/jxck.io/mozaic.fm/index.html")
  const episodes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2 > a')).map((e) => {
      return e.href
    })
  })
  await page.close()
  return episodes.map((href) => href.replace('file:///', 'file:///home/jxck/server/jxck.io/mozaic.fm/'))
}

async function getFont(page, URL) {
  console.error(URL)
  await page.goto(URL)
  await page._client.send("DOM.enable")
  await page._client.send("CSS.enable")
  const doc    = await page._client.send("DOM.getDocument")
  const selector = "span, div, a, li, dt, dd, h1, h2, h3, h4, h5, h6"
  const node   = await page._client.send("DOM.querySelectorAll", {nodeId: doc.root.nodeId, selector: selector})
  // console.error(node)
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

// セレクタの textContent を取り出す
async function selected_text(browser, urls, evaluate) {
  // each url
  const num = 15
  const {fulfilled, rejected} = await PromiseLimit(num, urls.map((url) => {
    return async (done, fail) => {
      const page = await browser.newPage()
      await page.goto(url, {waitUntil: 'networkidle0'})
      const emstrong = await page.evaluate(evaluate)
      await page.close()
      console.error(url)
      done(emstrong)
    }
  }))

  if (rejected.length > 0) {
    console.error('failed', rejected)
    process.exit(0)
  }
  const result = Array.from(new Set([...fulfilled.flat().join("")])).sort()
  return result.join('\n')
}
async function main() { const browser = await puppeteer.launch() 
  const entries  = await entries_url(browser)
  const episodes = await episodes_url(browser)

  const urls = [
    ...entries,
    ...episodes
  ]

  console.error(urls)

  const bold_text = await selected_text(browser, urls, () => {
    const selector = 'em, strong, dt, h1, h2, h3, h4, h5'
    return Array.from(document.querySelectorAll(selector)).map((e) => {
      return e.textContent.replace(/[\n, \t, ' ', '\xA0']/g, '')
    })
  })
  fs.writeFileSync('./font-bold.txt', bold_text)


  const regular_text = await selected_text(browser, urls, () => {
    // bold になるものを消す
    const selector = 'em, strong, dt, h2, h3, h4, h5, code, pre'
    Array.from(document.querySelectorAll(selector)).forEach((e) => {
      return e.remove()
    })
    return document.body.textContent.replace(/[\n, \t, ' ', '\xA0']/g, '')
  })
  // console.error(regular_text.split('\n').map((e) => {
  //   return `${e}: ${e.codePointAt(0)}`
  // }).join('\n'))
  fs.writeFileSync('./font-regular.txt', regular_text)


  await browser.close()
}

main()
