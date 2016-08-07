'use strict';
let p = console.log.bind(console);

let http = require('http');
http.get({
  hostname: 'example.com'
}, (res) => {
  res.on('data', (data) => {
    console.log('------------');
    console.log(data.toString());
  });
  res.on('data', (data) => {
    console.log('++++++++++++');
    console.log(data.toString());
  });
});
