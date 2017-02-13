const log   = console.debug.bind(console)
const info  = console.info.bind(console)
const error = console.error.bind(console)
const warn  = console.warn.bind(console)


class Channel extends EventEmitter {
  constructor(channel) {
    super()

    this.channel = channel

    this.channel.onopen = (e) => {
      console.debug(`${this.label}[${this.id}]#on('${e.type}')`, e)
      this.emit('open', e)
    }

    this.channel.onmessage = (e) => {
      console.debug(`${this.label}[${this.id}]#on('${e.type}')`, e.data, e)
      this.emit('message', e.data, e)
    }

    this.channel.onclose = (e) => {
      console.debug(`${this.label}[${this.id}]#on('${e.type}')`, e)
      this.emit('close', e)
    }

    this.channel.onerror = (e) => {
      console.error(`${this.label}[${this.id}]#on('${e.type}')`, e)
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
    console.debug(`${this.label}#send(data)`, data)
    this.channel.send(data)
  }

  close() {
    console.debug(`${this.label}#close()`)
    this.channel.close()
  }
}


class RTC extends EventEmitter {
  constructor(id) {
    super()

    this.id = id

    this.connection = new RTCPeerConnection({
      iceServers: [],
    })

    this.connection.onicecandidate = (e) => {
      console.debug(`${this.id}#on('${e.type}')`, e.candidate, e)
      if (e.candidate === null) return
      this.emit('icecandidate', e.candidate, e)
    }

    this.connection.oniceconnectionstatechange = (e) => {
      console.debug(`${this.id}#on('${e.type}')`, this.iceConnectionState, this.iceGatheringState, e)
      this.emit('iceconnectionstatechange', this.iceConnectionState, e)
    }

    this.connection.onsignalingstatechange = (e) => {
      console.debug(`${this.id}#on('${e.type}')`, this.signalingState, e)
      this.emit('signalingstatechange', this.signalingState, e)
    }

    this.connection.onnegotiationneeded = (e) => {
      console.debug(`${this.id}#on('${e.type}')`, e)
      this.emit('negotiationneeded', e)
    }

    this.connection.ondatachannel = (e) => {
      console.debug(`${this.id}#on('${e.type}')`, e.channel.label, e)
      const channel = new Channel(e.channel)
      channel.on('open', (e) => {
        this.emit('channel', channel, e)
      });
    }

    // TODO: deprecated
    this.connection.onaddstream = (e) => {
      console.debug(this.id, 'addStream', e)
      this.emit('addStream', e.stream, e)
    }

    // TODO: deprecated
    this.connection.onremovestream = (e) => {
      console.debug(this.id, 'removeStream', e)
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
    console.debug(`${this.id}#createDataChannel(label, dataChannelDict)`, label, dataChannelDict)
    const dataChannel = new Channel(this.connection.createDataChannel(label, dataChannelDict))

    dataChannel.on('open', (e) => {
      this.emit('channel', dataChannel, e);
    });
  }

  addIceCandidate(candidate) {
    console.debug(`${this.id}#addIceCandidate(candidate)`, candidate)
    return this.connection.addIceCandidate(candidate)
  }

  createOffer(options) {
    console.debug(`${this.id}#createOffer(options)`, options)
    return this.connection.createOffer(options)
  }

  createAnswer(options) {
    console.debug(`${this.id}#createAnswer(options)`, options)
    return this.connection.createAnswer(options)
  }

  setLocalDescription(description) {
    console.debug(`${this.id}#setLocalDescription(description)`, description)
    this.connection.setLocalDescription(description)
  }

  setRemoteDescription(description) {
    console.debug(`${this.id}#setRemoteDescription(description)`, description)
    this.connection.setRemoteDescription(description)
  }

  // TODO: deprecated
  addStream(stream) {
    console.debug(this.id, 'addStream', stream)
    this.connection.addStream(stream)
  }

  // TODO: deprecated
  removeStream(stream) {
    console.debug(this.id, 'removeStream', stream)
    this.connection.removeStream(stream)
  }
}


const local = new RTC('local')
const remote  = new RTC('remote')

local.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. local で上がった ice candidate を remote に渡す')
  log(candidate.candidate)
  remote
    .addIceCandidate(candidate)
    .then(log)
    .catch(error)
})

remote.on('icecandidate', (candidate) => {
  if (candidate === null) return

  info('7. remote で上がった ice candidate を local に渡す')
  log(candidate.candidate)
  local
    .addIceCandidate(candidate)
    .then(log)
    .catch(error)
})

local.on('iceconnectionstatechange', (e) => {
  info('8. local  の state が変わる', local.iceConnectionState, local.iceGatheringState)
})

remote.on('iceconnectionstatechange', (e) => {
  info('8. remote  の state が変わる', remote.iceConnectionState, remote.iceGatheringState)
})


Promise.all([
  new Promise((done, fail) => {
    local.on('negotiationneeded', done)
  }),
]).then(([e1, e2]) => {
  info('2. onnegotiationneeded が発生したらネゴシエーションする')
  info('3. local の offer を作成')
  return local.createOffer()
}).then((rtcSessionDescription) => {
  info('4. local の offer を双方に適応')
  log(rtcSessionDescription.type, rtcSessionDescription.sdp)
  return Promise.all([
    local.setLocalDescription(rtcSessionDescription),
    remote.setRemoteDescription(rtcSessionDescription),
  ])
}).then((e) => {
  info('5. remote の offer を作成')
  return remote.createAnswer()
}).then((rtcSessionDescription) => {
  info('6. remote の offer を双方に適応')
  log(rtcSessionDescription.type, rtcSessionDescription.sdp)
  return Promise.all([
    local.setRemoteDescription(rtcSessionDescription),
    remote.setLocalDescription(rtcSessionDescription),
  ])
})
  .then(console.log.bind(console))
  .catch(console.error.bind(console))


local.on('channel', (channel) => {
  info('9. local で remote との接続が open する')

  setTimeout(() => {
    info('11, local から remote にメッセージを送る')
    channel.send("from local")
  }, 100)

  channel.on('message', (data) => {
    info('14. local で remote からのメッセージを受け取る')
    log(data)

    channel.on('close', (e) => {
      info('16. local で on close が発生')
    })

    info('15. local を close する')
    channel.close()
  })
})

remote.on('channel', (channel) => {
  info('10. remote で DataChannel ができる')

  channel.on('message', (data) => {
    info('12. remote で local からのメッセージを受け取る')
    log(data)

    info('13. remote から local にメッセージを送る')
    channel.send("from remote")

    channel.on('close', (e) => {
      info('17. remote で local の close を補足')

      info('18. remote を close する')
      channel.close()
    })
  })
})


// firefox では createDataChannel か addStream してないと
// createOffer() できない
info('1. createDataChannel()')
local.createDataChannel('channel')
