#!/usr/bin/env node
"use strict"

const puppeteer = require("puppeteer");

(async () => {
  const URL = "https://mozaic.fm/episodes/65/monthly-web-202003.html"
  const selector = "span, div, a, li, dt, dd, h1, h2, h3, h4, h5, h6"
  const browser = await puppeteer.launch()
  const page    = await browser.newPage()
  await page.goto(URL)
  await page._client.send("DOM.enable")
  await page._client.send("CSS.enable")
  const doc    = await page._client.send("DOM.getDocument")
  const node   = await page._client.send("DOM.querySelectorAll", {nodeId: doc.root.nodeId, selector: selector})
  // console.log(node)
  const fonts  = await Promise.all(node.nodeIds.map(async (nodeId) => {
    const {fonts} = await page._client.send("CSS.getPlatformFontsForNode", {nodeId})
    return fonts.map(({familyName}) => {
      return {nodeId, familyName}
    })
  }))
  const hits = fonts.flat().filter(({familyName}) => !familyName.startsWith("Noto"))
  console.log(hits)

  hits.forEach(async ({nodeId}) => {
    const node = await page._client.send("DOM.getOuterHTML", {nodeId})
    console.log(node)
  })

  await browser.close()
})()
