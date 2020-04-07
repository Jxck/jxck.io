"use strict";

const puppeteer = require("puppeteer");

(async () => {
  const URL = "https://mozaic.fm/episodes/65/monthly-web-202003.html"
  const selector = "h1, h2, h3, h4, h5, h6, a, li, span"
  const browser = await puppeteer.launch();
  const page    = await browser.newPage();
  await page.goto(URL);

  await page._client.send("DOM.enable");
  await page._client.send("CSS.enable");
  const doc    = await page._client.send("DOM.getDocument");
  const node   = await page._client.send("DOM.querySelectorAll", {nodeId: doc.root.nodeId, selector: selector});
  console.log(node)
  const fonts  = await Promise.all(node.nodeIds.map((nodeId) => {
    return page._client.send("CSS.getPlatformFontsForNode", {nodeId});
  }))

  const families = new Set(fonts.map(({fonts}) => fonts.map(({familyName}) => familyName)).flat())
  console.log(families)
  await browser.close();
})();
