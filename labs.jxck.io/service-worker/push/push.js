#!/usr/bin/env node

var https = require('https');

var Key = "AIzaSyARN6lPU8s_fsPs5gWIrm9E1g3ifjiM-tg";
var IDs = [
  "fMg4Z5zSVy4:APA91bFW-VHOqFZz3esGi5jKR7UM3rILHa6nIvx-0ykCSfgE-49Qx9jLDLFUijyOxUyWiMl2ZdhDLv0pa7mzBnEvQHAxozBcDyD152vL9xVmjMzxCHUai8rrPOUVL1SQNojjO-KrNXr4"
];

function Push(key, ids) {
  'use strict';
  let body = JSON.stringify({
    registration_ids: ids
  });
  let options = {
    hostname: 'android.googleapis.com',
    port: 443,
    path: '/gcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${Key}`,
      'Content-Length': body.length
    },
  }
  return new Promise((resolve, reject) => {
    let result = [];
    let req = https.request(options, (res) => {
      result.push(res.statusCode);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        result.push(chunk);
      });
      res.on('end', () => {
        resolve(result);
      })
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(body);
    req.end();
  });
}

Push(Key, IDs).then((res) => {
  console.log(res.join(' '));
}).catch((err) => {
  console.error(err);
});
