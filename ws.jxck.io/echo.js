'use strict';

// export handler
module.exports = function(request) {
  const protocol = request.requestedProtocols[0];

  let connection = request.accept(protocol, allowOrigin);
  logger('accept', allowOrigin, protocol);

  connection.on('message', (message) => {
    if (message.type !== 'utf8') {
      return connection.drop(connection.CLOSE_REASON_UNPROCESSABLE_INPUT, 'support utf8 only');
    }
    connection.send(message);
  });

  connection.on('close', (reasonCode, description) => {
    logger('close', connection.remoteAddress, reasonCode, description);
  });

  connection.on('error', (err) => {
    logger('error', err);
  });
}
