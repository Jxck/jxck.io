class Timer extends EventTarget {
  constructor(interval) {
    super()
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('tick'))
    }, interval)
  }
}

timer = new Timer(100)
timer.addEventListener('tick', console.log.bind(console))
