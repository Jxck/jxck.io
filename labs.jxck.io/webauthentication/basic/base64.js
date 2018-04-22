'use strict';

// TODO: make me es module if https://crbug.com/680046 fixed

function b64enc(uint8array, opt={urlsafe:true}) {
  const str = btoa(String.fromCharCode(...uint8array))
  if (opt.urlsafe) {
    return str
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }
  return str
}

function b64dec(b64str, opt={urlsafe:true}) {
  if (opt.urlsafe) {
    const len = b64str.length
    b64str = b64str
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(len+((4-len%4)%4), "=")
  }
  return new Uint8Array([...atob(b64str)].map((e) => e.charCodeAt(0)))
}
