'use strict';

// server for CSP report-uri
const PORT = process.env['PORT'];
const FILE = `${process.env['SERVER']}/logs/report-csp.log`

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', (e) => {
    // csp-report
    let json = JSON.parse(body);

    // add header to json
    json['headers'] = req.headers;

    // add url to header
    json.headers['url'] = req.url;
    json.headers['method'] = req.method;

    // save with CRLF
    let str = JSON.stringify(json)+'\r\n';
    fs.appendFile(FILE, str, (err) => {
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end();
    });
  });
}).listen(PORT);
