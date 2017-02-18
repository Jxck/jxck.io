debug = DEBUG ? console.debug.bind(console) : ()=>{}

class Channel extends EventEmitter {
  constructor(channel) {
    super()

    this.channel = channel

    this.channel.onopen = (e) => {
      debug(`${this.label}[${this.id}]#on('${e.type}')`, e)
      this.emit('open', e)
    }

    this.channel.onmessage = (e) => {
      debug(`${this.label}[${this.id}]#on('${e.type}')`, e.data, e)
      this.emit('message', e.data, e)
    }

    this.channel.onclose = (e) => {
      debug(`${this.label}[${this.id}]#on('${e.type}')`, e)
      this.emit('close', e)
    }

    this.channel.onerror = (e) => {
      error(`${this.label}[${this.id}]#on('${e.type}')`, e)
      this.emit('error', e)
    }
  }

  get id() {
    return this.channel.id
  }

  get label() {
    return this.channel.label
  }

  send(data) {
    debug(`${this.label}#send(data)`, data)
    this.channel.send(data)
  }

  close() {
    debug(`${this.label}#close()`)
    this.channel.close()
  }
}


class RTC extends EventEmitter {
  constructor(id, config) {
    super()

    this.id = id

    this.connection = new RTCPeerConnection(config)

    this.connection.onicecandidate = (e) => {
      debug(`${this.id}#on('${e.type}')`, e.candidate, e)
      if (e.candidate === null) return
      this.emit('icecandidate', e.candidate, e)
    }

    this.connection.oniceconnectionstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.iceConnectionState, this.iceGatheringState, e)
      this.emit('iceconnectionstatechange', this.iceConnectionState, e)
    }

    this.connection.onsignalingstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.signalingState, e)
      this.emit('signalingstatechange', this.signalingState, e)
    }

    this.connection.onnegotiationneeded = (e) => {
      debug(`${this.id}#on('${e.type}')`, e)
      this.emit('negotiationneeded', e)
    }

    this.connection.ondatachannel = (e) => {
      debug(`${this.id}#on('${e.type}')`, e.channel.label, e)
      const channel = new Channel(e.channel)
      channel.on('open', (e) => {
        this.emit('channel', channel, e)
      });
    }

    // TODO: deprecated
    this.connection.onaddstream = (e) => {
      debug(this.id, 'addStream', e)
      this.emit('addStream', e.stream, e)
    }

    // TODO: deprecated
    this.connection.onremovestream = (e) => {
      debug(this.id, 'removeStream', e)
      this.emit('removeStream', e.stream, e)
    }
  }

  get signalingState() {
    return this.connection.signalingState
  }

  get iceConnectionState() {
    return this.connection.iceConnectionState
  }

  get iceGatheringState() {
    return this.connection.iceGatheringState
  }

  createDataChannel(label, dataChannelDict) {
    debug(`${this.id}#createDataChannel(label, dataChannelDict)`, label, dataChannelDict)
    const dataChannel = new Channel(this.connection.createDataChannel(label, dataChannelDict))

    dataChannel.on('open', (e) => {
      this.emit('channel', dataChannel, e);
    });
  }

  addIceCandidate(candidate) {
    debug(`${this.id}#addIceCandidate(candidate)`, candidate)
    return this.connection.addIceCandidate(candidate)
  }

  createOffer(options) {
    debug(`${this.id}#createOffer(options)`, options)
    return this.connection.createOffer(options)
  }

  createAnswer(options) {
    debug(`${this.id}#createAnswer(options)`, options)
    return this.connection.createAnswer(options)
  }

  setLocalDescription(description) {
    debug(`${this.id}#setLocalDescription(description)`, description)
    return this.connection.setLocalDescription(description)
  }

  setRemoteDescription(description) {
    debug(`${this.id}#setRemoteDescription(description)`, description)
    return this.connection.setRemoteDescription(description)
  }

  // TODO: deprecated
  addStream(stream) {
    debug(this.id, 'addStream', stream)
    this.connection.addStream(stream)
  }

  // TODO: deprecated
  removeStream(stream) {
    debug(this.id, 'removeStream', stream)
    this.connection.removeStream(stream)
  }
}
