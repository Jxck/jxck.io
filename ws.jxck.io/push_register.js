'use strict';
let logger = console.log.bind(console);

let sqlite3 = require('sqlite3');

const PUSH_DB = `${process.env['SERVER']}/db/push.sqlite3`;
const LABS = 'https://labs.jxck.io';

let db = new sqlite3.Database(PUSH_DB, sqlite3.OPEN_READWRITE);

function save(table, data) {
  logger('save', table, data.userAuth);
  const insert = `INSERT INTO ? (userAuth, userPublicKey, endpoint) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.run(insert, [table, data.userAuth, data.userPublicKey, data.endpoint], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
}

function allowedOrigin(origin) {
  if (origin === 'https://blog.jxck.io') return true;

  return false;
}

// export handler
module.exports = function(request) {
  const protocol = request.requestedProtocols[0];
  const origin = request.origin;

  if (allowedOrigin(origin) === false) {
    request.reject();
    return logger('reject', origin, protocol);
  }

  let connection = request.accept(protocol, origin);
  logger('accept', origin, protocol);

  new Promise((resolve, reject) => {
    connection.on('message', resolve);
    connection.on('error', reject);
  }).then((message) => {
    logger('message', message);
    if (message.type !== 'utf8') throw new Error('support utf8 only');

    // TODO: remove table name
    return save('blog', JSON.parse(message.utf8Data));
  }).catch((err) => {
    logger('error', err);
    return connection.drop(connection.CLOSE_REASON_UNPROCESSABLE_INPUT, err.message);
  });

  connection.on('close', (reasonCode, description) => {
    logger('close', connection.remoteAddress, reasonCode, description);
  });
}

// cleanup
process.on('exit', () => {
  db.close();
});
