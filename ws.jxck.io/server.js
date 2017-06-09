'use strict';

let p = console.log.bind(console);
let logger = console.log.bind(console);

let http = require('http');
let WebSocketServer = require('websocket').server;

const PORT = process.env.PORT;

/**
 * Registering Handlers
 * { protocol: function(request) {} }
 */
let handlers = {
  echo:          require('./echo'),
  broadcast:     require('./broadcast'),
  // push_register: require('./push_register'),
}

// http server
let server = http.createServer((request, response) => {
  logger('http', request.url);
  response.writeHead(404);
  response.end();
});

// listen
server.listen(PORT, () => {
  logger('start server port:', PORT);
});

// websocket handler
let ws = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

// routing
ws.on('request', (request) => {
  const protocol = request.requestedProtocols[0];
  logger('request', request.origin, protocol);

  let handler = handlers[protocol];
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
