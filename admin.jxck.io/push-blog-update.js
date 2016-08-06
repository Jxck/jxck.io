'use strict';
let p = console.log.bind(console);

let push = require('web-push');
let sqlite3 = require('sqlite3');

const GCM_API_KEY = require('fs').readFileSync('./blog.jxck.io.key', {encoding:'utf8'}).trim();
push.setGCMAPIKey(GCM_API_KEY);

const table = 'Blog';
const data = (new Date).toISOString();
const PUSH_DB = `${process.env['SERVER']}/db/push.sqlite3`;

let db = new sqlite3.Database(PUSH_DB, sqlite3.OPEN_READ);

/** CHANGE ME **/
const url = 'https://blog.jxck.io/entries/2016-06-12/noopener.html';
const body = 'リンクのへの rel=noopener 付与による Tabnabbing 対策';
/***************/

const PAYLOAD = JSON.stringify({
  tag: 'blog update',
  title: 'blog を更新しました',
  icon: '/assets/img/jxck.png',
  url: url,
  body: body,
});

function send_update(row) {
  push.sendNotification(row.endpoint, {
    TTL: 60*60*24*7, // 1 week
    payload: PAYLOAD,
    userAuth: row.userAuth,
    userPublicKey: row.userPublicKey,
  })
  .then((result) => {
    if (result === '') return { success: true };
    console.log(row.userAuth, result);
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
}

let where = ` where userAuth = '${auth}'`;
db.each(`SELECT userAuth, userPublicKey, endpoint FROM ${table}`, (err, row) => {
  if (err) return console.error(err);
  send_update(row);
});
