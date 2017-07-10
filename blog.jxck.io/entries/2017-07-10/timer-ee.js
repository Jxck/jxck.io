EventEmitter = require('events')
class Timer extends EventEmitter {
  constructor(interval) {
    super()
    setInterval(() => {
      this.emit('tick', 'tick')
    }, interval)
  }
}

timer = new Timer(100)
timer.on('tick', console.log.bind(console))
