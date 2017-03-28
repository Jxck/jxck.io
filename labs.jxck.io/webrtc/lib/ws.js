debug = DEBUG ? console. debug.bind(console) : ()=>{}

class WS extends EventEmitter {
  constructor(url, protocols) {
    super()

    this.id = btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase()

    this.ws = new WebSocket(url, protocols)

    this.ws.onopen = (e) => {
      debug(`ws#on('${e.type}')`, e, this.id)
      super.emit('open', e)
    }

    this.ws.onmessage = (e) => {
      const {id, name, message} = JSON.parse(e.data)
      if (id === this.id) return
      debug(`ws#on('${name}')`, e.data)
      super.emit(name, message)
    }

    this.ws.onclose = (e) => {
      debug(`ws#on('${e.type}')`, e)
      super.emit('close', e)
    }

    this.ws.onerror = (e) => {
      debug(`ws#on('${e.type}')`, e)
      super.emit('error', e)
    }
  }

  emit(name, message) {
    console.assert(name !== undefined && message !== undefined)
    const data = JSON.stringify({id: this.id, name, message})
    debug(`ws#emit('${name}')`, data)
    this.ws.send(data)
  }

  close(code, reason) {
    debug(`ws#close('${code}', '${reason}')`, code, reason)
    this.ws.close(code, reason)
  }
}
