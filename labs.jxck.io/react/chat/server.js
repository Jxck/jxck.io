const WebSocket = require("ws");
const port = 3333;
const wss = new WebSocket.Server({ port });
var participantList = {};

wss.on("connection", ws => {
    ws.on("message", message => {
        console.log("received; %s", message);
        wss.clients.forEach(client => {
            client.send(message);
        });
    });
});

console.log(`Running WebSocket server. Listening port: ${port}`);
