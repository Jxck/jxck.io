debug = DEBUG ? console.debug.bind(console) : ()=>{}

// polyfill
window.RTCIceRole  = (window.RTCIceRole !== undefined)  ? RTCIceRole  : { controlling: "controlling", controlled: "controlled" }
window.RTCDtlsRole = (window.RTCDtlsRole !== undefined) ? RTCDtlsRole : { auto: "auto", client: "client", server: "server" }


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


class ORTC extends EventEmitter {
  constructor(id) {
    super();

    this.id = id;

    this.iceOptions = {
      gatherPolicy: 'all',
      iceServers: []
    };

    this.rtcIceGatherer = null;
    this.rtcIceTransport = null;
    this.rtcDtlsTransport = null;

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
    this.remoteCandidates = [];
    this.localCandidatesCreated = false;
    this.remoteIceParams = null;
    this.remoteDtlsParams = null;

    this.trackCount = 0;

    this.SSRC = {
      audio: 100,
      video: 200,
    };
  }

  start() {
    this.rtcIceTransport.start(this.rtcIceGatherer, this.remoteIceParams, this.selfInfo.dtlsRole);
    this.rtcDtlsTransport.start(this.remoteDtlsParams);
  }

  sendTrack(track) {
    let kind = track.kind;
    this.Transports.sender[kind] = new RTCRtpSender(track, this.rtcDtlsTransport);
    this.Caps.sender[kind] = RTCRtpSender.getCapabilities(kind);
    this.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'sender',
        caps: this.Caps.sender[kind],
        muxId: null,
      }
    });
  }

  recvCandidate(message) {
    console.log(JSON.stringify(message));
    if (!(this.rtcIceTransport && this.rtcDtlsTransport)) {
      return console.error('rtcIceTransport, rtcDtlsTransport does not initiated');
    }

    // console.log('Remote ICE candidate:', message.candidate.ip + ':' + message.candidate.port);

    if (Object.keys(message.candidate).length > 0) {
      this.remoteCandidates.push(message.candidate);
    } else {
      // console.info('---- Remote ICE Candidate Complete ----');
      this.rtcIceTransport.setRemoteCandidates(this.remoteCandidates);
    }
  }

  recvParams(message) {
    console.log(JSON.stringify(message));
    if (!(this.rtcIceTransport && this.rtcDtlsTransport)) {
      return console.error('rtcIceTransport, rtcDtlsTransport does not initiated');
    }

    // 相手からの parameter を受け取った

    // candidate を送り終わって無いと start() できないので取っておく
    let remote = message.params;
    this.remoteIceParams = remote.ice;
    this.remoteDtlsParams = remote.dtls;

    // すでに local からの candidate を全て送り終わっていたら
    // 受け取った parameter で start()
    if (this.localCandidatesCreated) {
      this.start();
    }
  }

  recvCapability(message) {
    console.log(JSON.stringify(message));
    if (!(this.rtcIceTransport && this.rtcDtlsTransport)) {
      return console.error('rtcIceTransport, rtcDtlsTransport does not initiated');
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
  }

  recvTrack(kind) {
    this.Transports.recver[kind] = new RTCRtpReceiver(this.rtcDtlsTransport, kind);
    this.Caps.recver[kind] = RTCRtpReceiver.getCapabilities(kind);
    this.renderStream.addTrack(this.Transports.recver[kind].track);
    this.emit('capability', {
      id: this.id,
      caps: {
        kind: kind,
        role: 'receiver',
        caps: this.Caps.recver[kind],
      }
    });
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

  initiateConnection(dtlsRole) {
    this.selfInfo.dtlsRole = dtlsRole;
    this.rtcIceGatherer = new RTCIceGatherer(this.iceOptions);
    this.rtcIceTransport = new RTCIceTransport();
    this.rtcDtlsTransport = new RTCDtlsTransport(this.rtcIceTransport);

    this.rtcIceGatherer.onstatechange = (e) => {
      console.log(e);
    }

    this.rtcIceGatherer.error = (e) => {
      console.log(e);
    }

    this.rtcIceGatherer.onlocalcandidate = (e) => {
      console.log(this.rtcIceGatherer.state, e);
      super.emit('localcandidate', e);
    };

    this.rtcIceTransport.onicestatechange = (e) => {
      // console.log('ICE State Change', this.rtcIceTransport.state, e.state);
    };

    this.rtcIceTransport.oncandidatepairchange = (e) => {
      // console.info('ICE Candidate Pair Change:', e.pair, e);
    };

    this.rtcIceGatherer.onerror = (e) => {
      // console.error('ICE ERROR', e);
    };

    this.rtcDtlsTransport.ondtlsstatechange = (e) => {
      // console.log('DTLS State Change', this.rtcDtlsTransport.state, e.state);
    };

    this.rtcDtlsTransport.onerror = (e) => {
      // console.error('DTLS ERROR', e);
    };

    super.emit('needstream');
  }

  addStream(stream) {
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
  const id = location.hash
  const ortc = new ORTC(id)
  const socket = new WS('wss://ws.jxck.io', ['broadcast', 'ortc-demo'])

  ortc.on('localcandidate', (e) => {
    socket.emit('candidate', {
      id: id,
      candidate: e.candidate,
    });

    ortc.localCandidatesCreated = false;

    if (Object.keys(e.candidate).length == 0) {
      // console.info('---- Local ICE Candidate Complete ----');

      // candidate の生成が終了
      ortc.localCandidatesCreated = true;

      // parameter を相手に送る
      socket.emit('params', {
        id: id,
        params: {
          ice: ortc.rtcIceGatherer.getLocalParameters(),
          dtls: ortc.rtcDtlsTransport.getLocalParameters()
        }
      });

      // candidate を生成してる途中に相手から
      // すでに parameter を受け取っていたらここで start()
      // まだなら onparameter で start()
      if (ortc.remoteIceParams) {
        ortc.start()
      }

    } else {
      // console.log('Local ICE candidate: ', e.candidate.ip + ':' + e.candidate.port);
    }
  });

  ortc.on('needstream', () => {
    // Get a local stream
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: id,
      },
    }).then((stream) => {
      // console.info('---- getUserMedia ----', stream);
      let $local = document.getElementById('local');
      $local.srcObject = stream;
      ortc.addStream(stream);
    }).catch((err) => {
      console.error(err);
    });
  });

  ortc.on('capability', (e) => {
    socket.emit('capability', e);
  });

  socket.on('params', (message) => {
    ortc.recvParams(message);
  });

  socket.on('candidate', (message) => {
    ortc.recvCandidate(message);
  });

  socket.on('capability', (message) => {
    ortc.recvCapability(message);
  });

  socket.on('start', (message) => {
    // console.log(JSON.stringify(message));
    ortc.initiateConnection(message.dtlsrole);
  });

  socket.on('connectRequest', (message) => {
    // console.log(JSON.stringify(message))

    // 送ってきた 相手を controlling として start する
    socket.emit('start', {
      id: id,
      dtlsrole: 'controlling',
    });

    // 自分を controlled として start する
    ortc.initiateConnection('controlled');
  });

  socket.on('open', () => {
    console.log('open');
    document.getElementById('connect').addEventListener('click', () => {
      socket.emit('connectRequest', { id })
    })
  })
}
