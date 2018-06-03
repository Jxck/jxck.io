#!/home/jxck/dotfiles/pkg/nodebrew/current/bin/node

const fs = require("fs");
const FILE = `${process.cwd()}/ping.log`;

const content_length = process.env["CONTENT_LENGTH"]
const content_type   = process.env["CONTENT_TYPE"]
const request_method = process.env["REQUEST_METHOD"]

// console.error(process.env)

process.stdin.setEncoding("utf-8")
process.stdin.on("readable", async (e) => {
  //console.error(process.env["REQUEST_URI"])
  if (request_method !== "POST") {
    return
  }
  //console.error(process.env["HTTP_COOKIE"])

  const req = process.stdin.read(content_length)
  const body = new URLSearchParams(req)

  const res = `
  name: ${body.get("name")}
  article: ${body.get("article")}
  `

  console.log("Status: 201 Created")
  console.log("Content-Type: text/plain")
  console.log("Content-Length: ", res.length)
  console.log("")
  console.log(res)
})
