#!/usr/bin/env node
'use strict';
let log = console.log.bind(console);

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

const Buffer = require('buffer').Buffer

ws.on('open', (e) => {
    console.log('open', e)

    let blob = Buffer.from(new Array(2**16).fill(1))
    ws.send(blob)

    let sendFrame = ws._sender.sendFrame.bind(ws._sender)
    ws._sender.sendFrame = function(list, cb) {
        const buf = list[0]
        console.log(buf)
        const bufs = Array.from(buf.entries()).map(([i,b]) => [Buffer.from([b])])
        send(sendFrame, bufs)
    }
});

// send each byte with interval
// this is for server state machine test
function send(sendFrame, bufs) {
    let buf = bufs.shift()
    if (buf === undefined) return
    console.log(buf)
    sendFrame(buf, ()=>{});
    setTimeout(() => {
        send(sendFrame, bufs)
    }, 100)
}

ws.on('pong', (e) => {
    console.log('pong', e)
    ws.send("aaaa")
})

ws.on('message', (data) => {
    console.log('message', data.length)
    ws.ping()
});
