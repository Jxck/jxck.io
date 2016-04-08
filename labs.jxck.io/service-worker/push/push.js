#!/usr/bin/env node

var https = require('https');

var Key = "key=AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ";
var IDs = ["c6Wbq7isMLU:APA91bFl9FiNmTiylACCZWc_DnpnbYvy-mcSqhN49kcE6AFk36Mm9nQXbf1vaFjYkZDdVRTIo0aIz4yZ2kQSbzxaQCFCKgjGwIccODcIZ37oCYbv074NsMmcF0UM5Xb973DCnbFkExJR"];

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
      'Authorization': key,
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
