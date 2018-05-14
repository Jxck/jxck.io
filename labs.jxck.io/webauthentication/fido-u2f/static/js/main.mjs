"use strict"
import {b64enc, b64dec} from "./base64.mjs"

async function fetchJSON(url, opt) {
  const res = await fetch(url, opt)
  return res.json()
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  // GET /session
  const res = await fetch("session", {
    method:      "GET",
    credentials: "include",
  })
  if (res.status === 200) {
    const {username} = await res.json()
    document.querySelector("#status").textContent = `logged in as ${username}`
    return
  }
  document.querySelector("#status").textContent = "please login"
})


// Registration
document.querySelector("#register").addEventListener("submit", async (e) => {
  e.preventDefault()

  /**
   * 1. request challenge for registration
   */

  const username = new FormData(e.target).get("username")

  const url = new URL(location.href)
  url.pathname += "credential/new"
  url.searchParams.append("username", username)

  // GET /reqistration?username=${username}
  const option = await fetchJSON(url, {
    method:      "GET",
    credentials: "include",
  })
  console.log(option)

  // deserialize base64url to buffer
  option.challenge = b64dec(option.challenge)
  option.user.id   = b64dec(option.user.id)
  option.timeout   = 60000 // 1 min

  // create() PublicKeyCredential
  const credential = await navigator.credentials.create({publicKey: option})


  /**
   * 2. register publick key to service
   */

  // serialize buffer to base64url
  const body = {
    id:    credential.id, // base64 of rawID
    type:  credential.type,
    response: {
      attestationObject: b64enc(credential.response.attestationObject),
      clientDataJSON:    b64enc(credential.response.clientDataJSON),
    }
  }

  // POST /credential
  const registered = await fetchJSON("credential", {
    method:      "POST",
    credentials: "include",
    headers:     {"Content-Type": "application/json"},
    body:        JSON.stringify(body),
  })
  console.log(registered)


  // GET /session
  const session = await fetchJSON("session", {
    method:      "GET",
    credentials: "include",
  })
  console.log(session)

  document.querySelector("#status").textContent = `login as ${session.username}`
})


// Authentication
document.querySelector("#login").addEventListener("submit", async (e) => {
  e.preventDefault()

  /**
   * 1. request challenge for authentication
   */

  const username = new FormData(e.target).get("username")

  const url = new URL(location.href)
  url.pathname += "session/new"
  url.searchParams.append("username", username)

  // GET /session/new?username=${username}
  const option = await fetchJSON(url, {
    method:      "GET",
    credentials: "include",
  })
  console.log(option)

  // deserialize base64url to buffer
  option.challenge = b64dec(option.challenge)
  option.allowCredentials = option.allowCredentials.map((credential) => {
    credential.id = b64dec(credential.id)
    return credential
  })


  /**
   * 4. send publi key to service
   */

  // get() PublicKeyCredential
  const credential = await navigator.credentials.get({publicKey: option})
  console.log(credential)

  // serialize buffer to base64url
  const body = {
    id: credential.id,
    response: {
      type:              credential.response.type,
      authenticatorData: b64enc(credential.response.authenticatorData),
      signature:         b64enc(credential.response.signature),
      userHandle:        b64enc(credential.response.userHandle),
      clientDataJSON:    b64enc(credential.response.clientDataJSON),
    }
  }

  // POST /session
  const authResult = await fetchJSON("session", {
    method:      "POST",
    credentials: "include",
    headers:     {"Content-Type": "application/json"},
    body:        JSON.stringify(body)
  })
  console.log(authResult)

  // GET /session
  const session = await fetchJSON("session", {
    method:      "GET",
    credentials: "include"
  })
  console.log(session)

  document.querySelector("#status").textContent = `logged in as ${session.username}`
})


// Logout
document.querySelector("#logout").addEventListener("submit", async (e) => {
  e.preventDefault()

  // DELETE /session
  const res = await fetch("session", {
    method:      "DELETE",
    credentials: "include",
  })
  if (res.status === 200) {
    return document.querySelector("#status").textContent = "please login"
  }
  console.error(res)
})
