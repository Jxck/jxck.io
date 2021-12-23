'use strict';

const logger = console.log.bind(console);

const connectionmap = new Map();
logger('initial connection Map()');

setInterval(() => {
  connectionmap.clear();
  logger('reset connection Map()');
}, 1000*60*60);

// export handler
export default function broadcast(request) {
  logger(request.requestedProtocols);

  const [main, sub] = request.requestedProtocols
  const connection = request.accept(main)
  logger('accept', main, sub);

  const connections = connectionmap.has(sub) ? connectionmap.get(sub) : new Set();
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
    connections.deconste(connection);
  });

  connection.on('error', (err) => {
    logger('error', err);
    connections.deconste(connection);
  });
}
