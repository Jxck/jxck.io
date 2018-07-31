#!/home/jxck/dotfiles/pkg/nodebrew/current/bin/node

// only for labs.jxck.io, no for https://report-uri.jxck.io
// reporting daemon is report-uri.jxck.io/report.rb

const fs = require('fs');
const content_length = process.env['CONTENT_LENGTH'];
const FILE = `${process.cwd()}/report.log`;

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', async (e) => {
  try {
    const req = process.stdin.read(content_length)
    if (req === null)  return

    fs.appendFile(FILE, req+'\r\n', (err) => {
      let status = 201;
      if (err) {
        console.error(err);
        console.log('Status: 500 Internal Server Error')
      } else {
        console.log('Status: 201 Created')
      }
      console.log('');
    });
  } catch (err) {
    console.error(err);
    console.log('Status: 500 Internal Server Error')
  }
})
