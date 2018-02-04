#!/home/jxck/dotfiles/pkg/nodebrew/current/bin/node

const fs = require('fs');
const FILE = `${process.cwd()}/ping.log`;

console.error(process.env)
const content_length = process.env['CONTENT_LENGTH'];
const content_type   = process.env['CONTENT_TYPE'];
const ping_from      = process.env['HTTP_PING_FROM'];
const ping_to        = process.env['HTTP_PING_TO'];

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', async (e) => {
  try {
    if (content_type !== "text/ping") {
      console.log('Status: 400 Bad Request')
      console.log('')
      return
    }

    const req = process.stdin.read(content_length)
    if (req !== "PING") {
      console.log('Status: 400 Bad Request')
      console.log('')
      return
    }

    fs.appendFile(FILE, `${ping_from}\t${ping_to}\n`, (err) => {
      if (err) {
        console.error(err)
        console.log('Status: 500 Internal Server Error')
      } else {
        console.log('Status: 201 Created')
      }
      console.log('')
    })
  } catch (err) {
    console.error(err)
    console.log('Status: 500 Internal Server Error')
  }
})
