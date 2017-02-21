'use strict';

let logger = console.log.bind(console);

let connectionmap = new Map();
logger('initial connection Map()');

setInterval(() => {
  connectionmap = new Map();
  logger('reset connection Map()');
}, 1000*60*60);

// export handler
module.exports = function(request) {
  logger(request.requestedProtocols);

  const [main, sub] = request.requestedProtocols
  const connection = request.accept(main)
  logger('accept', main, sub);

  let connections = connectionmap.get(sub);
  if (connections === undefined) {
    connections = new Set();
  }

  logger('connected', connections.size);

  connections.add(connection);

  connectionmap.set(sub, connections);

  connection.on('message', (message) => {
    if (message.type !== 'utf8') {
      return connection.drop(connection.CLOSE_REASON_UNPROCESSABLE_INPUT, 'support utf8 only');
    }
    logger('message', message);

    connections.forEach((c) => {
      c.send(message.utf8Data);
    });
  });

  connection.on('close', (reasonCode, description) => {
    logger('close', connection.remoteAddress, reasonCode, description);
    connections.delete(connection);
  });

  connection.on('error', (err) => {
    logger('error', err);
    connections.delete(connection);
  });
}
