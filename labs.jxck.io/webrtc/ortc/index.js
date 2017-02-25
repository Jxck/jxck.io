debug = DEBUG ? console.debug.bind(console) : ()=>{}

class WS extends EventEmitter {
  constructor(url, protocols) {
    super()

    this.id = btoa(Math.random()*1000)

    this.ws = new WebSocket(url, protocols)

    this.ws.onopen = (e) => {
      debug(`ws#on('${e.type}')`, e, this.id)
      super.emit('open', e)
    }

    this.ws.onmessage = (e) => {
      const {id, name, message} = JSON.parse(e.data)
      if (id === this.id) return;
      debug(`ws#on('${name}')`, message)
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
    debug(`ws#send(name, data)`, name, message)
    this.ws.send(JSON.stringify({id: this.id, name, message}))
  }

  close(code, reason) {
    debug(`ws#close(code, reason)`, code, reason)
    this.ws.close(code, reason)
  }
}


class Util {
  static Caps2Params(sendCaps, remoteRecvCaps) {
    let muxId = '';
    let codecs = Util.filterCodecParams(sendCaps.codecs, remoteRecvCaps.codecs);
    let headerExtensions = Util.filterHdrExtParams(sendCaps.headerExtensions, remoteRecvCaps.headerExtensions);
    let encodings = [];

    // RTCRtcpParameters
    let rtcp = {
      ssrc: 0,
      cname: '',
      reducedSize: false,
      mux: true,
    };

    // RTCRtpParameters
    return { muxId, codecs, headerExtensions, encodings, rtcp };
  }

  static filterCodecParams(left, right) {
    let codecPrms = [];

    if (left && right) {
      left.forEach(function(leftItem) {
        for (let i = 0; i < right.length; i++) {
          let codec = right[i];
          let equality = (leftItem.name == codec.name &&
            leftItem.kind === codec.kind &&
            leftItem.preferredPayloadType === codec.preferredPayloadType &&
            leftItem.numChannels === codec.numChannels);

          if (equality) {
            let codecParams = {
              name: codec.name,
              payloadType: codec.preferredPayloadType,
              clockRate: codec.clockRate,
              numChannels: codec.numChannels,
              rtcpFeedback: codec.rtcpFeedback,
              parameters: codec.parameters,
            };
            codecPrms.push(codecParams);

            break;
          }
        }
      });
    }

    return codecPrms;
  }

  static filterHdrExtParams(left, right) {
    let hdrExtPrms = [];
    return hdrExtPrms;
  }

  static RTCRtpEncodingParameters(ssrc, codecPayloadType, fec, rtx, priority, maxBitrate, minQuality, framerateBias, resolutionScale, framerateScale, active, encodingId, dependencyEncodingId) {
    codecPayloadType = codecPayloadType || 0;
    fec = fec || 0;
    rtx = rtx || 0;
    priority = priority || 1.0;
    maxBitrate = maxBitrate || 2000000.0;
    minQuality = minQuality || 0;
    framerateBias = framerateBias || 0.5;
    resolutionScale = resolutionScale || 1.0;
    framerateScale = framerateScale || 1.0;
    active = active || true;

    return {
      ssrc,
      codecPayloadType,
      fec,
      rtx,
      priority,
      maxBitrate,
      minQuality,
      framerateBias,
      resolutionScale,
      framerateScale,
      active,
      encodingId,
      dependencyEncodingId,
    }
  }
}



class ORTC {
  constructor() {
    this.id = location.hash;

    this.socket = new WS('wss://ws.jxck.io', ['broadcast', 'ortc-demo']);
    this.iceOptions = { gatherPolicy: 'all', iceServers: [] };

    this.iceGathr = null;
    this.iceTr = null;
    this.dtlsTr = null;

    this.Transports = {
      sender: {
        video: null,
        audio: null,
      },
      recver: {
        video: null,
        audio: null,
      }
    };

    // local capabilities
    this.Caps = {
      sender: {
        video: null,
        audio: null,
      },
      recver: {
        video: null,
        audio: null,
      }
    };

    // remote parameters
    this.Params = {
      sender: {
        video: null,
        audio: null,
      },
      recver: {
        video: null,
        audio: null,
      }
    }

    this.videoRenderer = document.getElementById('remote');
    this.renderStream = new MediaStream();

    this.selfInfo = {};
    this.peerInfo = {};
    this.remoteCandidates = [];
    this.localCandidatesCreated = false;
    this.remoteIceParams = null;
    this.remoteDtlsParams = null;

    this.trackCount = 0;

    this.SSRC = {
      audio: 100,
      video: 200,
    };

    this.socket.on('connectRequest', (message) => {
      console.log(JSON.stringify(message));

      this.handleCallRequest(message);
    });

    this.socket.on('start', (message) => {
      console.log(JSON.stringify(message));

      this.selfInfo.dtlsRole = message.dtlsrole;
      this.initiateConnection();
    });

    this.socket.on('candidate', (message) => {
      console.log(JSON.stringify(message));
      if (!(this.iceTr && this.dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      console.log('Remote ICE candidate:', message.candidate.ip + ':' + message.candidate.port);

      if (Object.keys(message.candidate).length > 0) {
        this.remoteCandidates.push(message.candidate);
      } else {
        console.info('---- Remote ICE Candidate Complete ----');
        this.iceTr.setRemoteCandidates(this.remoteCandidates);
      }
    });

    this.socket.on('params', (message) => {
      console.log(JSON.stringify(message));
      if (!(this.iceTr && this.dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      // 相手からの parameter を受け取った

      // candidate を送り終わって無いと start() できないので取っておく
      let remote = message.params;
      this.remoteIceParams = remote.ice;
      this.remoteDtlsParams = remote.dtls;

      // すでに local からの candidate を全て送り終わっていたら
      // 受け取った parameter で start()
      if (this.localCandidatesCreated) {
        this.iceTr.start(this.iceGathr, this.remoteIceParams, this.selfInfo.dtlsRole);
        this.dtlsTr.start(this.remoteDtlsParams);
      }
    });

    this.socket.on('capability', (message) => {
      console.log(JSON.stringify(message));
      if (!(this.iceTr && this.dtlsTr)) {
        return console.error('iceTr, dtlsTr does not initiated');
      }

      // 相手から来た capability を受け取る
      // すでに sender/receiver が作られていれば send()/receive() を
      // なければ Params に保存する。
      let remote = message.caps;
      let kind = remote.kind;

      // role は送ってきた側が sender/receiver のどちあらかを表す
      // 逆側に設定する。
      if (remote.role === 'sender') {
        if (this.Transports.recver[kind]) {
          this.transportRecv(kind, remote);

          this.trackCount++;
          if (this.trackCount == 2) {
            this.videoRenderer.srcObject = this.renderStream;
          }
        } else {
          this.Params.recver[kind] = remote;
        }
      }

      if (remote.role === 'receiver') {
        if (this.Transports.sender[kind]) {
          this.transportSend(kind, remote);
        } else {
          this.Params.sender[kind] = remote;
        }
      }
    });
  }

  sendTrack(track) {
    let kind = track.kind;
    this.Transports.sender[kind] = new RTCRtpSender(track, this.dtlsTr);
    this.Caps.sender[kind] = RTCRtpSender.getCapabilities(kind);
    this.socket.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'sender',
        caps: this.Caps.sender[kind],
        muxId: null,
      }
    });
  }

  recvTrack(kind) {
    this.Transports.recver[kind] = new RTCRtpReceiver(this.dtlsTr, kind);
    this.Caps.recver[kind] = RTCRtpReceiver.getCapabilities(kind);
    this.renderStream.addTrack(this.Transports.recver[kind].track);
    this.socket.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'receiver',
        caps: this.Caps.recver[kind],
      }
    });
  }

  connectRequest() {
    console.info('---- connectRequest ----');
    this.socket.emit('connectRequest', {
      id: this.id,
    });
  }

  handleCallRequest(message) {
    console.info('---- handleCallRequest ----');

    // accept
    this.peerInfo.id = message.id;

    // 送ってきた 相手を controlling として start する
    this.socket.emit('start', {
      id: this.id,
      dtlsrole: 'controlling',
    });

    // 自分を controlled として start する
    this.selfInfo.dtlsRole = 'controlled';
    this.initiateConnection();

    console.log('Accepted Peer:', this.peerInfo.id, 'connection request.');
  }

  transportSend(kind, remote) {
    const ssrc = this.SSRC[kind];
    const encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    const sendParams = Util.Caps2Params(this.Caps.sender[kind], remote.caps);
    sendParams.encodings.push(encodingParams);
    this.Transports.sender[kind].send(sendParams);
  }

  transportRecv(kind, remote) {
    const ssrc = this.SSRC[kind];
    const encodingParams = Util.RTCRtpEncodingParameters(ssrc);
    const recvParams = Util.Caps2Params(remote.caps, this.Caps.recver[kind]);
    recvParams.muxId = remote.muxId;
    recvParams.encodings.push(encodingParams);
    this.Transports.recver[kind].receive(recvParams);
  }

  initiateConnection() {
    console.log('---- initiateConnection ----');

    this.iceGathr = new RTCIceGatherer(this.iceOptions);
    this.iceTr = new RTCIceTransport();
    this.dtlsTr = new RTCDtlsTransport(this.iceTr);

    this.iceGathr.ongatherstatechange = (e) => {
      console.error(e);
    }

    this.iceGathr.onlocalcandidate = (evt) => {
      this.socket.emit('candidate', {
        id: this.id,
        candidate: evt.candidate,
      });

      this.localCandidatesCreated = false;

      if (Object.keys(evt.candidate).length == 0) {
        console.info('---- Local ICE Candidate Complete ----');

        // candidate の生成が終了
        this.localCandidatesCreated = true;

        // parameter を相手に送る
        this.socket.emit('params', {
          id: this.id,
          params: {
            ice: this.iceGathr.getLocalParameters(),
            dtls: this.dtlsTr.getLocalParameters()
          }
        });

        // candidate を生成してる途中に相手から
        // すでに parameter を受け取っていたらここで start()
        // まだなら onparameter で start()
        if (this.remoteIceParams) {
          this.iceTr.start(this.iceGathr, this.remoteIceParams, this.selfInfo.dtlsRole);
          this.dtlsTr.start(this.remoteDtlsParams);
        }
      } else {
        console.log('Local ICE candidate: ', evt.candidate.ip + ':' + evt.candidate.port);
      }
    };

    this.iceTr.onicestatechange = (e) => {
      console.log('ICE State Change', this.iceTr.state, e.state);
    };

    this.iceTr.oncandidatepairchange = (e) => {
      console.info('ICE Candidate Pair Change:', e.pair, e);
    };

    this.iceGathr.onerror = (e) => {
      console.error('ICE ERROR', e);
    };

    this.dtlsTr.ondtlsstatechange = (e) => {
      console.log('DTLS State Change', this.dtlsTr.state, e.state);
    };

    this.dtlsTr.onerror = (e) => {
      console.error('DTLS ERROR', e);
    };


    // Get a local stream
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        facingMode: 'user'
      }
    }).then((stream) => {
      console.info('---- getUserMedia ----', stream);
      let $local = document.getElementById('local');
      $local.srcObject = stream;

      return stream;
    })
      .then(this.gotMedia.bind(this))
      .catch(console.error.bind(console));
  }

  gotMedia(stream) {
    // gUM で取得した stream を sender/recver を生成
    // capability を送る。

    // Send Audio/Video
    const audioTracks = stream.getAudioTracks();
    const videoTracks = stream.getVideoTracks();
    const audioTrack = audioTracks[0];
    const videoTrack = videoTracks[0];
    this.sendTrack(audioTrack);
    this.sendTrack(videoTrack);

    // Receive Audio/Video
    this.recvTrack('audio');
    this.recvTrack('video');

    // この時点で先に相手の Parameter を受け取っていたら
    // sender.send() / recver.receive() を始める
    // もしまだ transport がなかったら
    // transport 作るときにやるからここは無視
    if (this.Params.recver.audio) {
      const remote = this.Params.recver.audio;
      if (this.Transports.recver.audio) {
        const kind = remote.kind;
        this.transportRecv(kind, remote);

        this.trackCount++;
        if (this.trackCount == 2) {
          this.videoRenderer.srcObject = this.renderStream;
        }
      }
    }

    if (this.Params.recver.video) {
      let remote = this.Params.recver.video;
      if (this.Transports.recver.video) {
        let kind = remote.kind;
        this.transportRecv(kind, remote);

        this.trackCount++;
        if (this.trackCount == 2) {
          this.videoRenderer.srcObject = this.renderStream;
        }
      }
    }

    if (this.Params.sender.audio) {
      let kind = 'audio';
      let remote = this.Params.sender[kind];
      if (this.Transports.sender[kind]) {
        this.transportSend(kind, remote);
      }
    }

    if (this.Params.sender.video) {
      let kind = 'video';
      let remote = this.Params.sender[kind];
      if (this.Transports.sender[kind]) {
        this.transportSend(kind, remote);
      }
    }
  }
}

window.onload = function() {
  const ortc = new ORTC();
  document.getElementById('connect').addEventListener('click', ortc.connectRequest.bind(ortc));
};
