debug = DEBUG ? console.debug.bind(console) : ()=>{}

class WS extends EventEmitter {
  constructor(url, protocols) {
    super()

    this.id = btoa(Math.random()*1000)

    this.ws = new WebSocket(url, protocols)

    this.ws.onopen = (e) => {
      debug(`ws#on('${e.type}')`, e, this.id)
      this.emit('open', e)
    }

    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.id === this.id) return
      debug(`ws#on('${e.type}')`, data.data)
      this.emit('message', data.data)
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

  send(data) {
    debug(`ws#send(data)`, data)
    this.ws.send(JSON.stringify({id: this.id, data: data}))
  }

  close(code, reason) {
    debug(`ws#close(code, reason)`, code, reason)
    this.ws.close(code, reason)
  }
}
