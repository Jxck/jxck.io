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

    this.connection.onconnectionstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.connectionState, e)
      this.emit('connectionstatechange', this.connectionState, e)
    }

    this.connection.oniceconnectionstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.iceConnectionState, e)
      this.emit('iceconnectionstatechange', this.iceConnectionState, e)
    }

    this.connection.onsignalingstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.signalingState, e)
      this.emit('signalingstatechange', this.signalingState, e)
    }

    this.connection.onicegatheringstatechange = (e) => {
      debug(`${this.id}#on('${e.type}')`, this.iceGatheringState, e)
      this.emit('icegatheringstatechange', this.iceGatheringState, e)
    }

    this.connection.onnegotiationneeded = (e) => {
      debug(`${this.id}#on('${e.type}')`, e)
      this.emit('negotiationneeded', e)
    }

    this.connection.ontrack = (e) => {
      debug(`${this.id}#on('${e.type}')`, e)
      this.emit('track', e)
    }

    this.connection.ondatachannel = (e) => {
      debug(`${this.id}#on('${e.type}')`, e.channel.label, e)
      const channel = new Channel(e.channel)
      channel.on('open', (e) => {
        this.emit('channel', channel, e)
      })
    }

    this.connection.onicecandidateerror = (e) => {
      debug(`${this.id}#on('${e.type}')`, e)
      this.emit('icecandidateerror', e)
    }

    this.connection.onfingerprintfailure = (e) => {
      debug(`${this.id}#on('${e.type}')`, e)
      this.emit('fingerprintfailure', e)
    }
  }

  get signalingState() {
    return this.connection.signalingState
  }

  get iceGatheringState() {
    return this.connection.iceGatheringState
  }

  get iceConnectionState() {
    return this.connection.iceConnectionState
  }

  get connectionState() {
    return this.connection.connectionState
  }

  get localDescription() {
    return this.connection.localDescription
  }

  get currentLocalDescription() {
    return this.connection.currentLocalDescription
  }

  get pendingLocalDescription() {
    return this.connection.pendingLocalDescription
  }

  get remoteDescription() {
    return this.connection.remoteDescription
  }

  get currentRemoteDescription() {
    return this.connection.currentRemoteDescription
  }

  get pendingRemoteDescription() {
    return this.connection.pendingRemoteDescription
  }

  get canTrickleIceCandidates() {
    return this.connection.canTrickleIceCandidates
  }

  createDataChannel(label, dataChannelDict) {
    debug(`${this.id}#createDataChannel(label, dataChannelDict)`, label, dataChannelDict)
    const dataChannel = new Channel(this.connection.createDataChannel(label, dataChannelDict))

    dataChannel.on('open', (e) => {
      this.emit('channel', dataChannel, e)
    })
  }

  addIceCandidate(candidate) {
    if (!(candidate instanceof RTCIceCandidate)) {
      candidate = new RTCIceCandidate(candidate);
    }
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
    if (!(description instanceof RTCSessionDescription)) {
      description = new RTCSessionDescription(description);
    }
    debug(`${this.id}#setLocalDescription(description)`, description)
    return this.connection.setLocalDescription(description)
  }

  setRemoteDescription(description) {
    if (!(description instanceof RTCSessionDescription)) {
      description = new RTCSessionDescription(description);
    }
    debug(`${this.id}#setRemoteDescription(description)`, description)
    return this.connection.setRemoteDescription(description)
  }

  addTrack(track, stream) {
    debug(`${this.id}#addTrack(track, stream)`, track, stream)
    return this.connection.addTrack(track, stream)
  }

  addStream(stream) {
    // deprecated in spec but living in chrome
    debug(`${this.id}#addStream(stream)`, stream)
    return this.connection.addStream(stream)
  }
}
