'use strict'

const ws = require('ws')
const events = require('events')
const mediasoup = require('mediasoup')

const port = 9000
const wsServer = new ws.Server({ port })


const {RTCPeerConnection, RTCSessionDescription} = mediasoup.webrtc

const roomOptions = {
  mediaCodecs : [
    {
      kind:        "audio",
      name:        "audio/opus",
      clockRate:   48000,
      payloadType: 100
    },
    {
      kind:        "video",
      name:        "video/vp8",
      clockRate:   90000,
      payloadType: 123
    },
  ]
}

class Client extends events.EventEmitter {
  constructor(id, ws, peer) {
    super()
    const usePlanB = true
    this.id = id
    this.ws = ws
    this.peer = peer
    this.rtc = new RTCPeerConnection({peer, usePlanB})

    this.rtc.on('leave', () => {
      console.log(this.id, 'leave')
    })

    this.rtc.on('close', () => {
      console.log(this.id, 'close')
    })

    this.rtc.on('signalingstatechange', (e) => {
      console.log(this.id, 'signalingstatechange', this.rtc.signalingState)
    })

    this.rtc.on('negotiationneeded', () => {
      console.log(this.id, 'negotiationneeded')

      const option = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      }

      this.rtc.createOffer(option)
        .then((rtcSessionDescription) => {
          return this.rtc.setLocalDescription(rtcSessionDescription)
        })
        .then(() => {
          const sdp = this.rtc.localDescription.serialize()
          const message = { to: this.id, sdp: sdp }
          const data = { id: 'sfu', name: 'offer', message }
          console.log('<< send', this.id, data.name)
          this.ws.send(JSON.stringify(data))
        })
    })
  }

  setOffer(sdp) {
    this.rtc.setCapabilities(sdp)
      .then((e) => {
        console.log(this.id, 'setCapabilities')

        const option = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1,
        }
        return this.rtc.createOffer(option)
      })
      .then((rtcSessionDescription) => {
        return this.rtc.setLocalDescription(rtcSessionDescription)
      })
      .then(() => {
        const sdp = this.rtc.localDescription.serialize()
        const message = { to: this.id, sdp: sdp }
        const data = { id: 'sfu', name: 'offer', message }
        console.log('<< send', this.id, data.name)
        this.ws.send(JSON.stringify(data))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  setAnswer(message) {
    const rtcSessionDescription = new RTCSessionDescription(message)

    this.rtc.setRemoteDescription(rtcSessionDescription)
      .then(() => {
        console.log(this.id, 'setRemoteDescription')
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

let server = mediasoup.Server()
server.createRoom(roomOptions)
  .then((room) => {

    const clients = new Map()

    wsServer.on('connection', (ws) => {
      console.log('ws connected')

      ws.on('close', () => {
        console.log('ws closed')
      })

      ws.on('error', (err) => {
        console.error(err)
      })

      ws.on('message', (str) => {
        const {id, name, message} = JSON.parse(str)
        console.log('>> received', id, name)

        const client = clients.get(id) || new Client(id, ws, room.Peer(id))
        clients.set(id, client)

        if (name === 'offer') {
          client.setOffer(message.sdp)
        }

        if (name === 'answer') {
          client.setAnswer(message)
        }
      })
    })
  })
  .catch((err) => {
    console.error(err)
  })
