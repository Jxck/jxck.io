'use strict';
let log = console.log.bind(console);

let ws = new WebSocket('ws://localhost:3000', [])
ws.onmessage = ({data}) => {
    if (data instanceof Blob) {
        console.log('<< recv', data.size)
    } else {
        console.log('<< recv', data.length)
    }
}
ws.onopen = (e) => {
  let blob = new Blob(new Array(2**16-1).fill(1))
  let text = "aaaaaaaa".repeat(16)
  console.log('>> send', blob.size)
  console.log('>> send', text.length)
  ws.send(blob)
  ws.send(text)
}
