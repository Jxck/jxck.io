'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const stringify = function(e) { return JSON.stringify(e, '  ', '  ') }
EventTarget.prototype.on = EventTarget.prototype.addEventListener

async function enumerateDevices() {
  const $mediaDeviceInfo = $('#mediaDeviceInfo')
  const $template        = $mediaDeviceInfo.querySelector('template')
  const keys             = ['deviceId', 'kind', 'label', 'groupId']

  const devices = await navigator.mediaDevices.enumerateDevices()
  devices.forEach((device) => {
    const $tr = document.importNode($template.content, true).querySelector('tr')
    keys.map((prop) => {
      $tr.querySelector(`.${prop}`).textContent = device[prop]
      $tr.querySelector('.select > input').name = device.kind
      $tr.querySelector('.select > input').value = device.deviceId
    })
    if (device.kind.endsWith('output')) {
      $tr.querySelector('.select > input').disabled = true
    }
    $mediaDeviceInfo.appendChild($tr)
  })
}

async function getTracks(track) {
  const $track    = $('#track')
  const $template = $track.querySelector('template')
  const $tbody    = $track.querySelector('tbody')
  const keys      = ['kind', 'id', 'label', 'enabled', 'muted']

  keys.forEach((key, i) => {
    const $tr = document.importNode($template.content, true).querySelector('tr')
    $tr.querySelector('.index').textContent = key
    $tr.querySelector('.value').textContent = track[key]
    if (i === 0) {
      const $td = document.createElement('td')
      $td.rowSpan = keys.length
      $td.textContent = track.label
      $tr.insertBefore($td, $tr.querySelector('.index'))
    }
    $tbody.appendChild($tr)
  })
}

async function getCapabilities(track) {
  const $track    = $('#capabilities')
  const $template = $track.querySelector('template')
  const $tbody    = $track.querySelector('tbody')
  // Capabilities: not in Firefox
  const keys      = track.getCapabilities ? track.getCapabilities() : []

  Object.entries(keys).forEach(([key, value], i, j) => {
    const $tr = document.importNode($template.content, true).querySelector('tr')
    $tr.querySelector('.index').textContent = key
    $tr.querySelector('.value').textContent = stringify(value)
    if (i === 0) {
      const $td = document.createElement('td')
      $td.rowSpan = j.length
      $td.textContent = track.label
      $tr.insertBefore($td, $tr.querySelector('.index'))
    }
    $tbody.appendChild($tr)
  })
}

async function getConstraints(track) {
  const $track    = $('#constraints')
  const $template = $track.querySelector('template')
  const $tbody    = $track.querySelector('tbody')
  const keys      = track.getConstraints()

  // Constraints
  Object.entries(keys).forEach(([key, value], i, j) => {
    const $tr = document.importNode($template.content, true).querySelector('tr')
    $tr.querySelector('.index').textContent = key
    $tr.querySelector('.value').textContent = stringify(value)
    if (i === 0) {
      const $td = document.createElement('td')
      $td.rowSpan = j.length
      $td.textContent = track.label
      $tr.insertBefore($td, $tr.querySelector('.index'))
    }
    $track.appendChild($tr)
  })
}

async function getSettings(track) {
  const $track    = $('#settings')
  const $template = $track.querySelector('template')
  const $tbody    = $track.querySelector('tbody')
  const keys      = track.getSettings()

  // Settings
  Object.entries(track.getSettings()).forEach(([key, value], i, j) => {
    const $tr = document.importNode($template.content, true).querySelector('tr')
    $tr.querySelector('.index').textContent = key
    $tr.querySelector('.value').textContent = stringify(value)
    if (i === 0) {
      const $td = document.createElement('td')
      $td.rowSpan = j.length
      $td.textContent = track.label
      $tr.insertBefore($td, $tr.querySelector('.index'))
    }
    $track.appendChild($tr)
  })
}

async function getSupportedConstraints() {
  const $supportedConstraints = $('#supportedConstraints tbody')
  const $template = $supportedConstraints.querySelector('template')

  const keys = [ 'width', 'height', 'aspectRatio', 'frameRate', 'facingMode', 'resizeMode', 'volume', 'sampleRate', 'sampleSize', 'echoCancellation', 'autoGainControl', 'noiseSuppression', 'latency', 'channelCount', 'deviceId', 'groupId', ]
  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints()

  Object.entries(supportedConstraints).forEach(([key, value]) => {
    const $tr = document.importNode($template.content, true)
    $tr.querySelector(`.index`).textContent = key
    $tr.querySelector('.value').textContent = value
    if (keys.includes(key)) {
      $tr.querySelector(`.index`).classList.add('bold')
    }
    $supportedConstraints.appendChild($tr)
  })
}

async function getUserMedia(constraints) {
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  const $video = $('video')
  $video.srcObject = stream
  return stream
}


document.on('DOMContentLoaded', async () => {
  enumerateDevices()
  getSupportedConstraints()

  const $textarea = $('textarea')
  const $button = $('button')

  $textarea.value = stringify({audio:{}, video:{}})

  function updateValue(k1, k2, v) {
    const value = JSON.parse($textarea.value)
    value[k1][k2] = v
    $textarea.value = stringify(value)
  }


  $('form').on('change', async ({target}) => {
    console.log(target)
    switch (target.name) {
      case 'audioinput':
        updateValue('audio', 'deviceId', target.value)
        break;
      case 'videoinput':
        updateValue('video', 'deviceId', target.value)
        break;
      default:
        console.log('noop')
    }
  })

  $('form').on('submit', async (e) => {
    e.preventDefault()

    const form_data = new FormData(e.target)
    const object = Array.from(form_data).reduce((o, [k, v]) => { o[k] = v; return o }, {})
    console.log(stringify(object, '  ', '  '))

    // Edge が FormData 対応していないので動かない。

    //const stream = await getUserMedia(constraints)

    //stream.getTracks().forEach((track) => {
    //  getTracks(track)
    //  getCapabilities(track)
    //  getConstraints(track)
    //  getSettings(track)
    //})

  })
})
