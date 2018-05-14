const btoa = typeof window !== "undefined" ? window.btoa : function(b) {
  return Buffer.from(b, "binary").toString("base64")
}

const atob = typeof window !== "undefined" ? window.atob : function atob(a) {
  return Buffer.from(a, "base64").toString("binary")
}

export function b64enc(bin, opt={urlsafe:true}) {
  const uint8array = new Uint8Array(bin)
  // TODO: use {window|util}.TextDecoder
  const str = btoa(String.fromCharCode(...uint8array))
  if (opt.urlsafe) {
    return str
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")
  }
  return str
}

export function b64dec(b64str, opt={urlsafe:true}) {
  if (opt.urlsafe) {
    const len = b64str.length
    b64str = b64str
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(len+((4-len%4)%4), "=")
  }
  return new Uint8Array([...atob(b64str)].map((e) => e.charCodeAt(0)))
}
