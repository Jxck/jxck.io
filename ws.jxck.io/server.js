'use strict';

import http from 'http';
import websocket from 'websocket'
import echo from './echo.js';
import broadcast from './broadcast.js';

const p = console.log.bind(console);
const logger = console.log.bind(console);

const PORT = process.env.PORT;

/**
 * Registering Handlers
 * { protocol: function(request) {} }
 */
const handlers = {
  echo,
  broadcast,
  // push_register: require('./push_register'),
}

// http server
const server = http.createServer((request, response) => {
  logger('http', request.url);
  response.writeHead(404);
  response.end();
});

// listen
server.listen(PORT, () => {
  logger('start server port:', PORT);
});

// websocket handler
const ws = new websocket.server({
  httpServer: server,
  autoAcceptConnections: false
});

// routing
ws.on('request', (request) => {
  const protocol = request.requestedProtocols[0];
  logger('request', request.origin, protocol);

  const handler = handlers[protocol];
  if (handler === undefined) {
    request.reject();
    return logger('reject', request.requestedProtocols);
  }
  handler(request);
});

// cleanup
process.on('exit', () => {
  ws.shutDown();
});
