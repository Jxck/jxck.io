"use strict"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

cookieStore.addEventListener("change", (e) => {
  console.log(e.type, e)
  for (const changed of e.changed) {
    console.log({ changed })
  }
  for (const deleted of e.deleted) {
    console.log({ deleted })
  }
})

document.on("DOMContentLoaded", async (e) => {
  const name = "__Host-session_id"
  const oneyearlater = Date.now() + 1000 * 60 * 60 * 24 * 365
  const cookie = [`__Host-session_id=${btoa(Math.random())}`, `Path=/`, `expires=${new Date(oneyearlater).toGMTString()}`, `Secure`, `SameSite=Lax`].join("; ")

  console.log(cookie)
  document.cookie = cookie
  console.log(document.cookie)

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

  cookieStore.delete(name)
})
