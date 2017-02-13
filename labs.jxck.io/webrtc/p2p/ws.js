debug = DEBUG ? console.debug.bind(console) : ()=>{}

class WS extends EventEmitter {
  constructor(url, protocols) {
    super()

    this.ws = new WebSocket(url, protocols)

    this.ws.onopen = (e) => {
      debug(`ws#on('${e.type}')`, e)
      this.emit('open', e)
    }

    this.ws.onmessage = (e) => {
      debug(`ws#on('${e.type}')`, e)
      this.emit('message', JSON.parse(e.data))
    }

    this.ws.onclose = (e) => {
      debug(`ws#on('${e.type}')`, e)
      this.emit('close', e)
    }

    this.ws.onerror = (e) => {
      debug(`ws#on('${e.type}')`, e)
      this.emit('error', e)
    }
  }

  json(data) {
    debug(`ws#json(data)`, data)
    this.ws.send(JSON.stringify(data))
  }

  send(data) {
    debug(`ws#send(data)`, data)
    this.ws.send(data)
  }

  close(code, reason) {
    debug(`ws#close(code, reason)`, code, reason)
    this.ws.close(code, reason);
  }
}
