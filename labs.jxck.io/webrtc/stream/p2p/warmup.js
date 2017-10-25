'use strict';
let log = console.log.bind(console);
const signaling = new SignalingChannel(); // handles JSON.stringify/parse
const configuration = { iceServers: [{ urls: "stuns:stun.example.org" }] };
const audio = null;
const audioSendTrack = null;
const video = null;
const videoSendTrack = null;
const started = false;
let pc;

// Call warmup() to warm-up ICE, DTLS, and media, but not send media yet.
async function warmup(isAnswerer) {
  pc = new RTCPeerConnection(configuration);
  if (!isAnswerer) {
    audio = pc.addTransceiver("audio");
    video = pc.addTransceiver("video");
  }

  // send any ice candidates to the other peer
  pc.onicecandidate = {candidate} => signaling.send({ candidate });

  // let the "negotiationneeded" event trigger offer generation
  pc.onnegotiationneeded = async () => {
    try {
      await pc.setLocalDescription(await pc.createOffer());
      // send the offer to the other peer
      signaling.send({ desc: pc.localDescription });
    } catch (err) {
      console.error(err);
    }
  };

  // once media for the remote track arrives, show it in the remote video element
  pc.ontrack = async event => {
    try {
      if (event.track.kind === "audio") {
        if (isAnswerer) {
          audio = event.transceiver;
          audio.setDirection("sendrecv");
          if (started && audioSendTrack) {
            await audio.sender.replaceTrack(audioSendTrack);
          }
        }
      } else if (event.track.kind === "video") {
        if (isAnswerer) {
          video = event.transceiver;
          video.setDirection("sendrecv");
          if (started && videoSendTrack) {
            await video.sender.replaceTrack(videoSendTrack);
          }
        }
      }

      // don't set srcObject again if it is already set.
      if (remoteView.srcObject) return;
      remoteView.srcObject = event.streams[0];
    } catch (err) {
      console.error(err);
    }
  };

  try {
    // get a local stream, show it in a self-view and add it to be sent
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    selfView.srcObject = stream;
    audioSendTrack = stream.getAudioTracks()[0];
    if (started) {
      await audio.sender.replaceTrack(audioSendTrack);
    }
    videoSendTrack = stream.getVideoTracks()[0];
    if (started) {
      await video.sender.replaceTrack(videoSendTrack);
    }
  } catch (err) {
    console.erro(err);
  }
}

// Call start() to start sending media.
function start() {
  started = true;
  signaling.send({ start: true });
}

signaling.onmessage = async ({desc, candidate}) => {
  if (!pc) warmup(true);

  try {
    if (desc) {
      // if we get an offer, we need to reply with an answer
      if (desc.type === "offer") {
        await pc.setRemoteDescription(desc);
        await pc.setLocalDescription(await pc.createAnswer());
        signaling.send(JSON.stringify({ desc: pc.localDescription }));
      } else {
        await pc.setRemoteDescription(desc);
      }
    } else if (message.start) {
      started = true;
      if (audio && audioSendTrack) {
        await audio.sender.replaceTrack(audioSendTrack);
      }
      if (video && videoSendTrack) {
        await video.sender.replaceTrack(videoSendTrack);
      }
    } else {
      await pc.addIceCandidate(message.candidate);
    }
  } catch (err) {
    console.error(err);
  }
};
