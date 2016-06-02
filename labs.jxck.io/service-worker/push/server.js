'use strict';
let p = console.log.bind(console);

let sqlite3 = require('sqlite3');
let webPush = require('web-push');
const GCM_API_KEY = "AIzaSyAJs2U3XSP39SjeY5RhGXPqc0P2Xw_2byI";
webPush.setGCMAPIKey(GCM_API_KEY);

const table = 'notification';

let db = new sqlite3.Database('../../../../db/push.sqlite3', sqlite3.OPEN_READWRITE);

const data = (new Date).toISOString();
p(data);
db.each('SELECT userAuth, userPublicKey, endpoint FROM notification', (err, row) => {
  if (err) return console.error(err);

  webPush.sendNotification(row.endpoint, {
    payload: row.userAuth,
    userPublicKey: row.userPublicKey,
    userAuth: row.userAuth,
  })
  .then((result) => {
    if (result === '') return { success: true };
    console.log('aaaaaaaaaa', row.userAuth, result);
    return JSON.parse(result)
  })
  .then((result) => {
    if (result.success) return;
    console.log(row.userAuth, result.failure);
    return new Promise((resolve, reject) => {
      console.log('delete');
      db.run(`delete from ${table} where userAuth = ?`, row.userAuth, resolve);
    });
  })
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((err) => {
    console.log('fail', err);
  });
});

//webPush.sendNotification(req.body.endpoint, {
//  TTL: req.body.ttl,
//  payload: req.body.payload,
//  userPublicKey: req.body.key,
//  userAuth: req.body.authSecret,
//});
