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
      $tr.querySelector('.select > input').name = device.kind.replace('input', '.deviceId.value')
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


class Store {
  constructor(form) {
    this.form = form
    this.video = new Media('video')
    this.audio = new Media('audio')
    this.fake  = undefined
    this.sync()
  }

  sync() {
    const map = new FormData(this.form)
    for (let [k, v] of map.entries()) {
      v = (v === "") ? null : v;
      if (k === 'fake') {
        this.fake = true
      } else {
        const [kind, name, prop] = k.split('.')
        this[kind][name].set(prop, v)
      }
    }
  }

  load() {
    const arg = localStorage.getItem('args')
    if (!!!arg) return

    this.form.reset();
    const inputs = Array.from(this.form.querySelectorAll('input'));

    JSON.parse(arg).forEach(([k, v]) => {
      const input = inputs.filter((i) => i.name === k).pop()
      if (k === 'video.facingMode.value') {
        $(`option[value="${v}"]`).selected = true
      } else if (['checkbox', 'radio'].includes(input.type)) {
        input.checked = (v === "") ? false : true
      } else {
        input.value = v
      }
    })

    this.sync()
  }

  save() {
    const map = new FormData(this.form)
    localStorage.setItem('args', stringify([...map]))
  }

  display() {
    $('textarea').value = stringify(this)
  }

  clear() {
    localStorage.removeItem('args')
    this.video = new Media('video')
    this.audio = new Media('audio')
    this.fake  = undefined
    this.display()
  }

  toJSON() {
    return {
      audio: this.audio,
      video: this.video,
      fake : this.fake
    }
  }
}

class Media {
  constructor(kind) {
    this.deviceId = new DeviceValue()

    if (kind === 'video') {
      this.facingMode  = new FacingModeValue()
      this.width       = new Value()
      this.height      = new Value()
      this.latency     = new Value()
      this.frameRate   = new Value()
      this.aspectRatio = new Value()
    }

    if (kind === 'audio') {
      this.volume      = new Value()
      this.sampleRate  = new Value()
      this.sampleSize  = new Value()
    }
  }
}

class FacingModeValue {
  constructor(mode, ideal, exact) {
    this.mode  = mode
    this.ideal = ideal
    this.exact = exact
  }

  set(key, value) {
    console.log(key, value)
    if (key === 'value') {
      this.mode = value
    }
    if (['ideal', 'exact'].includes(key)) {
      this[key] = (value === 'on')
    }
  }

  toJSON() {
    const {mode, ideal, exact} = this

    if (!!!mode) {
      return undefined
    }
    if (exact) {
      return { exact : mode }
    }
    if (ideal) {
      return { ideal: mode }
    }

    return mode
  }
}

class DeviceValue {
  constructor() {
    this.deviceId = null
  }
  set(key, value) {
    this.deviceId = value
  }
  toJSON() {
    if (this.deviceId) return this.deviceId
    return undefined
  }
}

class Value {
  constructor() {
    this.min   = null
    this.value = null
    this.max   = null
    this.ideal = null
    this.exact = null
  }

  set(key, value) {
    if (['min', 'value', 'max'].includes(key)) {
      this[key] = value
    }
    if (['ideal', 'exact'].includes(key)) {
      this[key] = (value === 'on')
    }
  }

  parseFloat(val) {
    if (val === "") return null
    if (val === null) return null
    return parseFloat(val)
  }

  toJSON() {
    const {min, value, max, ideal, exact} = this

    if (exact) {
      if (value === null) return null
      return { exact : this.parseFloat(value) }
    }

    if (ideal) {
      if (value === null && min === null && max === null) return null
      let result = {}
      if (value || value ===0) result.ideal = this.parseFloat(value)
      if (min   || min   ===0) result.min = this.parseFloat(min)
      if (max   || max   ===0) result.max = this.parseFloat(max)
      return result
    }

    if (value === null) return undefined

    return this.parseFloat(value)
  }
}


document.on('DOMContentLoaded', async () => {
  await enumerateDevices()
  await getSupportedConstraints()

  const store = new Store($('form'))
  store.load()
  store.display()

  $('form').on('reset', (e) => {
    store.clear()
  })

  $('form').on('change', async ({target}) => {
    const store = new Store($('form'))
    store.display()
    store.save()
  })

  $('form').on('submit', async (e) => {
    e.preventDefault()

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
