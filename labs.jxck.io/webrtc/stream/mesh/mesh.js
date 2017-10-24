'use strict'

const id = btoa(Math.floor(Math.random()*10000)).replace(/=/g, "").toLowerCase()
const constraint = {video:true}

///////////////////////////////////////////////////////////
document.querySelector('#id').textContent = id
document.querySelector('#peer').value = ''


///////////////////////////////////////////////////////////
console.info('RTCPeerConnection を生成')
const connection = new RTCPeerConnection()
console.log(connection)


///////////////////////////////////////////////////////////
console.info('WS を接続')

const ws = new WebSocket('wss://ws.jxck.io', ['broadcast', 'webrtc-stream-p2p-demo'])
ws.onopen = async () => {

  ///////////////////////////////////////////////////////////
  // WebSocket 各イベントリスナを設定
  ///////////////////////////////////////////////////////////
  ws.onmessage = async ({data}) => {
    const {type, message} = JSON.parse(data)
    console.log(message)

    if (message.to !== id) return;

    if (type == 'offer') {
      console.log('自分宛の offer を受信')
      console.log(message)

      console.log('remote offer を 適用')
      await connection.setRemoteDescription(message.data)

      console.log('answer を作成')
      const answer = await connection.createAnswer()

      console.log('answer を local に適用')
      await connection.setLocalDescription(answer)

      console.log('answer を peer に送信')
      ws.send(JSON.stringify({
        id: id,
        type: 'answer',
        message: {
          from: id,
          to: message.from,
          data: answer
        }
      }))
    }

    if (type == 'answer') {
      console.log('自分宛の answer を受信')
      console.log(message)

      await connection.setRemoteDescription(message.data)
    }

    if (type == 'candidate') {
      console.log('自分宛の ice candidate を受信')
      console.log(message)

      await connection.addIceCandidate(message.data)
    }
  }


  ///////////////////////////////////////////////////////////
  // RTCPeerConnection 各イベントリスナを設定
  ///////////////////////////////////////////////////////////
  connection.onnegotiationneeded = async ({type}) => {
    console.log('onnegotiationneeded', type)
    console.log('シグナリングを開始する')


    ///////////////////////////////////////////////////////////
    console.log('offer を生成')
    const offer = await connection.createOffer()
    console.log(offer)


    ///////////////////////////////////////////////////////////
    console.log('offer を local に適用')
    await connection.setLocalDescription(offer)


    ///////////////////////////////////////////////////////////
    console.log('offer を peer に送信')
    ws.send(JSON.stringify({
      id: id,
      type: 'offer',
      message: {
        from: id,
        to: window.peerid,
        data: offer
      }
    }))
  }

  connection.onicecandidate = ({candidate}) => {
    if (candidate === null) return

    ///////////////////////////////////////////////////////////
    console.log('ice candidate を送信')
    ws.send(JSON.stringify({
      id: id,
      type: 'candidate',
      message: {
        from: id,
        to: window.peerid,
        data: candidate
      }
    }))
  }

  connection.ontrack = ({streams}) => {
    ///////////////////////////////////////////////////////////
    console.log('track を受信', streams)
    document.querySelector('#remote').srcObject = streams[0]
  }

  connection.onaddstream = ({stream}) => {
    ///////////////////////////////////////////////////////////
    console.log('stream を受信', stream)
    document.querySelector('#remote').srcObject = stream
  }

  connection.onicecandidateerror = (e) => {
    console.error(e.type, e)
  }

  connection.onsignalingstatechange = (e) => {
    console.log(e.type, connection.signalingState)
  }

  connection.oniceconnectionstatechange = (e) => {
    console.log(e.type, connection.iceConnectionState)
  }

  connection.onicegatheringstatechange = (e) => {
    console.log(e.type, connection.signalingState)
  }

  connection.onconnectionstatechange = (e) => {
    console.log(e.type, connection.connectionState)
  }

  console.info('準備完了')
  document.querySelector('#call').disabled = false

  ///////////////////////////////////////////////////////////
  document.querySelector('#start').onsubmit = async (e) => {
    console.info('シグナリングを開始')
    e.preventDefault()

    ///////////////////////////////////////////////////////////
    console.info('ローカルビデオを開始')
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    console.log(stream)

    document.querySelector('#local').srcObject = stream


    ///////////////////////////////////////////////////////////
    console.info('Peer ID を取得')
    // TODO: Edge は FormData の get() をサポートしてない
    // const peerid = new FormData(submit.target).get('peer')
    window.peerid = document.querySelector('#peer').value
    if (peerid === '') return alert('input peerid')
    console.log(peerid)


    ///////////////////////////////////////////////////////////
    console.info('Stream を追加')
    if (connection.addTrack) {
      stream.getTracks().forEach((track) => {
        console.log('addTrack', track)
        connection.addTrack(track, stream)
      })
    } else {
      console.log('addStream', stream)
      connection.addStream(stream)
    }
  }
}
