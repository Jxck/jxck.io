'use strict';
let log = console.log.bind(console);

let ws = new WebSocket('ws://localhost:3000', [])
ws.onmessage = (ev) => {
    console.log('<< recv', ev.data.size)
}
ws.onopen = (e) => {
  let blob = new Blob(Array.from(new Array(2**16-1)).fill(1))
  console.log('>> send', blob.size)
  ws.send(blob)
}
