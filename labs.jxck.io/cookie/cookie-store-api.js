"use strict"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

cookieStore.on("change", (e) => {
  for (const changed of e.changed) {
    console.log({ changed })
  }
  for (const deleted of e.deleted) {
    console.log({ deleted })
  }
})

document.on("DOMContentLoaded", async (e) => {
  const cookies = await cookieStore.getAll()
  console.log(cookies)
  for await (const { name } of cookies) {
    console.log({ name })
    await cookieStore.delete(name)
  }

  const name = "__Host-session-id"
  const oneyearlater = Date.now() + 1000 * 60 * 60 * 24 * 365
  await cookieStore.set({
    name,
    value: btoa(Math.random()),
    expires: oneyearlater,
    path: "/",
    sameSite: "lax",
    secure: true,
    domain: null,
  })

  console.log(await cookieStore.get(name))
  // {
  //   "name": "__Host-session_id",
  //   "value": "MC4xNzM5NDk4MjgwNzAwNzY0Mg==",
  //   "expires": 1714809896000,
  //   "path": "/",
  //   "sameSite": "lax",
  //   "secure": true,
  //   "domain": null,
  //   "partitioned": false,
  // }
})
