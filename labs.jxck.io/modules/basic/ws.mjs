// {
//   id:   peerid
//   type: type,
//   message: {
//     from: id,
//     to:   peerid,
//     data: data
//   }
// }
export class WS extends WebSocket {
  constructor(url, protocols=['echo']) {
    super(url, protocols)
    this.id  = btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase();

    const events = ['open', 'close', 'error'];
    events.forEach((name) => {
      this.addEventListener(name, (e) => {
        console.debug(`ws#on('${e.type}')`, e, this.id)
      })
    })

    this.addEventListener('message', ({data}) => {
      const {id, type, message} = JSON.parse(data)
      if (id !== this.id) return
      this.dispatchEvent(new CustomEvent(type, {detail: message}))
    })
  }

  on(type, listener) {
    this.addEventListener(type, ({detail}) => listener(detail))
  }

  emit(type, to, data) {
    const message = JSON.stringify({
      id:      this.id,
      type:    type,
      message: data
    })
    this.send(message)
  }
}
