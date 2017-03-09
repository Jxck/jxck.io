class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }

  on(type, callback) {
    const listeners = this.listeners.get(type) || []
    this.listeners.set(type, [...listeners, callback])
    return this
  }

  off(type, callback) {
    if (!this.listeners.has(type)) return

    if (!callback) {
      this.listeners.delete(type)
      return this
    }

    const listeners = this.listeners.get(type) || []
    const filtered = listeners.filter((listener) => {
      return listener !== callback
    })
    this.listeners.set(type, filtered)
    return this
  }

  emit(type, ...args) {
    if (!this.listeners.has(type)) return
    const listeners = this.listeners.get(type) || []
    listeners.forEach((listener) => { listener.apply(this, args) })
    return this
  }
}
