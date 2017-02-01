'use strict';
const log = console.log.bind(console);
const table = console.table !== undefined ? console.table.bind(console) : log;
const dir = console.dir !== undefined ? console.dir.bind(console) : log;
const $ = document.querySelector.bind(document);
const j = JSON.stringify.bind(JSON);
const p = JSON.parse.bind(JSON);

// polyfill
navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || function(conf) {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  return new Promise((resolve, reject) => {
    navigator.getUserMedia(conf, resolve, reject);
  });
};

/**
 * basic stream info
 */
function streamInfo(stream) {
  $('.stream .active').textContent = stream.active;
  $('.stream .id').textContent  = stream.id;
  $('.tracks tbody').innerHTML = '';
  $('.constraints tbody').innerHTML = '';
  $('.devices tbody').innerHTML = '';

  ['onaddtrack', 'onremovetrack'].forEach((ev) => {
    stream[ev] = (e) => {
      log('[stream]', e.type, e);
      streamInfo(stream);
    };
  });

  let tracks = stream.getTracks();
  tracks.forEach((track) => {
    // display infomations
    trackInfo(track);
    getConstraints(track);
    getCapabilities(track);
    getSettings(track);

    // mute/unmute is uncontrollable, switch by device
    ['onmute', 'onunmute', 'onended'].forEach((ev) => {
      track[ev] = (e) => {
        log('[track]', e.type, e);
        streamInfo($('video.local').stream);
      };
    });
  });
}

/**
 * basic track info
 */
function trackInfo(track) {
  let $info = [
    track.kind,
    track.id,
    track.label,
    track.enabled,
    track.muted,
    track.readyState,
  ].map((v) => {
    let $td = document.createElement('td');
    $td.textContent = v;
    return $td;
  }).reduce(($tr, $td) => {
    $tr.appendChild($td);
    return $tr;
  }, document.createElement('tr'));
  $('.tracks tbody').appendChild($info);
}

/**
 * getConstraints()
 */
function getConstraints(track) {
  if (track.getConstraints === undefined) {
    $('.getConstraints').innerHTML = 'not supported';
    return
  }

  let keys = p($('.constraints').dataset.keys);
  let constraints = track.getConstraints();

  let $tr = keys.map((key, i) => {
    if (i === 0) return `${track.kind} constraints`;
    return j(constraints[key]);
  }).map((v) => {
    let $td = document.createElement('td');
    $td.textContent = v;
    return $td;
  }).reduce(($tr, $td) => {
    $tr.appendChild($td);
    return $tr;
  }, document.createElement('tr'));

  $('.constraints tbody').appendChild($tr);
}

/**
 * getSettings()
 */
function getSettings(track) {
  if (track.getSettings === undefined) {
    $('.getSettings').innerHTML = 'not supported';
    return
  }

  let keys = p($('.constraints').dataset.keys);
  let settings = track.getSettings();

  let $tr = keys.map((key, i) => {
    if (i === 0) return `${track.kind} settings`;
    return j(settings[key]);
  }).map((v) => {
    let $td = document.createElement('td');
    $td.textContent = v;
    return $td;
  }).reduce(($tr, $td) => {
    $tr.appendChild($td);
    return $tr;
  }, document.createElement('tr'));

  $('.constraints tbody').appendChild($tr);
}

/**
 * getCapabilities()
 */
function getCapabilities(track) {
  if (track.getCapabilities === undefined) {
    $('.getCapabilities').innerHTML = 'not supported';
    return
  }

  let keys = p($('.constraints').dataset.keys);
  let capabilities = track.getCapabilities();

  let $tr = keys.map((key, i) => {
    if (i === 0) return `${track.kind} capabilities`;
    return j(capabilities[key]);
  }).map((v) => {
    let $td = document.createElement('td');
    $td.textContent = v;
    return $td;
  }).reduce(($tr, $td) => {
    $tr.appendChild($td);
    return $tr;
  }, document.createElement('tr'));

  $('.constraints tbody').appendChild($tr);
}

/**
 * getSupportedConstraints()
 */
function getSupportedConstraints() {
  if (navigator.mediaDevices.getSupportedConstraints === undefined) {
    $('.getSupportedConstraints').innerHTML = 'not supported';
    return
  }

  const constraints = navigator.mediaDevices.getSupportedConstraints();

  // sortedkeys
  let keys = Object.keys(constraints).sort((a, b) => {
    if (a.startsWith('moz')) return 1;
    return (a.length > b.length) ? 1 : -1;
  });
  keys.unshift(''); // for method
  $('.constraints').dataset.keys = j(keys);

  // th line
  let $tr = keys
    .map((c) => {
      let $th = document.createElement('th');
      $th.textContent = c;
      return $th;
    }).reduce(($tr, $th) => {
      $tr.appendChild($th);
      return $tr;
    }, document.createElement('tr'));
  $('.constraints thead').appendChild($tr);
}

/**
 * enumerateDevices()
 */
function enumerateDevices() {
  navigator.mediaDevices.ondevicechange = (e) => {
    log('[devices]', e.type, e);
    enumerateDevices();
  };
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.map((device) => {
      return [
        device.kind,
        device.label,
        device.deviceId,
        device.groupId
      ];
    }).map((devices) => {
      return devices.map((device) => {
        let $td = document.createElement('td');
        $td.textContent = device;
        return $td;
      }).reduce(($tr, $td) => {
        $tr.appendChild($td);
        return $tr;
      }, document.createElement('tr'));
    }).forEach(($tr) => {
      $('.devices tbody').appendChild($tr);
    });
  });
}

/**
 * main()
 */
document.addEventListener('DOMContentLoaded', (a) => {
  enumerateDevices();
  getSupportedConstraints();


  $('button.start').addEventListener('click', () => {
    let value = $('[name=facingMode]').value;
    const constraints = {
      audio: true,
      video: {facingMode: value}
    };

    navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        streamInfo(stream);
        $('video.local').src = URL.createObjectURL(stream);
        $('video.local').stream = stream;

        $('button.stop').addEventListener('click', () => {
          stream.getTracks().forEach((track) => {
            log('[track]', 'stop', track.kind, track.id, track.label);
            track.stop();
          });
        });
      })
      .catch(log);
  });

  // $('button.start').dispatchEvent(new Event('click'));
});
