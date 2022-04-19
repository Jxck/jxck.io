"use strict"
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

async function delay(ms) {
  return await new Promise((done) => setTimeout(done, ms))
}

async function getPage(url, option) {
  const res    = await fetch(url, option)
  const html   = await res.text()
  const parser = new DOMParser()
  const doc    = parser.parseFromString(html, "text/html")
  const title  = doc.title
  const body   = doc.body
  return { title, body }
}

navigation.on("navigate", async (e) => {
  console.log("----------------------------------")
  console.log("navigationType ", e.navigationType )
  console.log("destination    ", e.destination    )
  console.log("canTransition  ", e.canTransition  )
  console.log("userInitiated  ", e.userInitiated  )
  console.log("hashChange     ", e.hashChange     )
  console.log("signal         ", e.signal         )
  console.log("formData       ", e.formData       )
  console.log("downloadRequest", e.downloadRequest)
  console.log("info           ", e.info           )
  console.log("----------------------------------")

  if (e.canTransition === false) return

  if (e.hashChange === true) return

  e.transitionWhile((async () => {
    const url    = e.destination.url
    const signal = e.signal

    signal.on("abort", () => {
      console.log("navigation aborted")
      location.reload()
    })

    console.log("before delay")
    await delay(500)
    console.log("after delay")

    const headers = { "Cache-Control": "no-cache" }
    const cache   = "no-cache"
    const { title, body } = await getPage(url, { cache, signal })

    document.title = title
    document.body  = body
    console.log("transition end")
  })())
})

window.on("pageshow", async (e) => {
  console.log(e.type, e)
})

document.on("DOMContentLoaded", async (e) => {
  console.log(e.type, e)
})

navigation.on("navigatesuccess", (e) => {
  console.log(e)
})

navigation.on("navigateerror", (e) => {
  console.log(e)
})
