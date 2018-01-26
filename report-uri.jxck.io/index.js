'use strict';

// server for CSP report-uri
const PORT = process.env['PORT'];
const FILE = `${process.env['SERVER']}/logs/report-csp.log`

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.headers['content-type'] !== 'application/csp-report') {
    res.writeHead(400);
    return res.end();
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', (e) => {
    // csp-report
    let json;
    try {
      json = JSON.parse(body);
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      return res.end();
    }

    // add header to json
    json['headers'] = req.headers;

    // add url to header
    json.headers['url'] = req.url;
    json.headers['method'] = req.method;

    // save with CRLF
    let str = JSON.stringify(json)+'\r\n';
    fs.appendFile(FILE, str, (err) => {
      let status = 201;
      if (err) {
        console.error(err);
        status = 500;
      }
      res.writeHead(status);
      res.end();
    });
  });
}).listen(PORT);
