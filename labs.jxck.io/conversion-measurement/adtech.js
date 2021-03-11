'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener


document.on('DOMContentLoaded', async (e) => {
  // insert ads
  const ads = [
    "https://adtech.labs.jxck.io/conversion-measurement/travel-ad.html",
    "https://adtech.labs.jxck.io/conversion-measurement/shopping-ad.html",
  ]
  ads.forEach((src) => {
    const iframe = document.createElement('iframe')
    iframe.src= src
    iframe.allow = 'conversion-measurement'
    console.log(iframe)
    document.body.appendChild(iframe)
  })
})

