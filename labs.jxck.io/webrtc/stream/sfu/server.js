'use strict'

const ws = require('ws')
const events = require('events')
const mediasoup = require('mediasoup')

const port = 9000
const wsServer = new ws.Server({ port })

const log = console.log.bind(console)

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
      log(this.id, 'leave')
    })

    this.rtc.on('close', () => {
      log(this.id, 'close')
    })

    this.rtc.on('signalingstatechange', (e) => {
      log(this.id, 'signalingstatechange', this.rtc.signalingState)
    })

    this.rtc.on('negotiationneeded', async () => {
      log(this.id, 'negotiationneeded')

      const option = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      }

      const rtcSessionDescription = await this.rtc.createOffer(option)
      await this.rtc.setLocalDescription(rtcSessionDescription)

      const sdp = this.rtc.localDescription.serialize()
      const message = { to: this.id, sdp: sdp }
      const data = { id: 'sfu', name: 'offer', message }
      log('<< send', this.id, data.name)
      this.ws.send(JSON.stringify(data))
    })
  }

  async setOffer(sdp) {
    await this.rtc.setCapabilities(sdp)
    log(this.id, 'setCapabilities')

    const option = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
    }
    const rtcSessionDescription = await this.rtc.createOffer(option)
    await this.rtc.setLocalDescription(rtcSessionDescription)

    const message = {
      to: this.id,
      sdp: this.rtc.localDescription.serialize(),
    }
    const data = { id: 'sfu', name: 'offer', message }
    log('<< send', this.id, data.name)
    log(JSON.stringify(data))
    this.ws.send(JSON.stringify(data))
  }

  async setAnswer(message) {
    const rtcSessionDescription = new RTCSessionDescription(message)

    await this.rtc.setRemoteDescription(rtcSessionDescription)
    log(this.id, 'setRemoteDescription')
  }
}

let server = mediasoup.Server({
  dtlsCertificateFile : "/keys/cert.pem",
  dtlsPrivateKeyFile  : "/keys/key.pem",
  logLevel   : "debug",
  rtcMinPort : 40000,
  //rtcMaxPort : 40006
});

(async () => {
  try {
    const room = await server.createRoom(roomOptions)
    const clients = new Map()

    wsServer.on('connection', (ws) => {
      log('ws connected')

      ws.on('close', () => {
        log('ws closed')
      })

      ws.on('error', (err) => {
        console.error(err)
      })

      ws.on('message', (str) => {
        const {id, name, message} = JSON.parse(str)
        log('>> received', id, name)
        log(message)

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
  } catch (err) {
      console.error(err)
  }
})()
