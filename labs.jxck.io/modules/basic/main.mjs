import {WS} from './ws.mjs'

const ws = new WS('wss://ws.jxck.io')
console.log(ws)
ws.on('open', (e) => {
  ws.send(JSON.stringify({
    id:      ws.id,
    type:    'hello',
  }))

  ws.emit('hello', ws.id, 'world')

  ws.on('hello', (e) => {
    console.log(e)
  })
})
