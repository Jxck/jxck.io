'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const stringify = function(e) { return JSON.stringify(e, '  ', '  ') }
EventTarget.prototype.on = EventTarget.prototype.addEventListener

async function enumerateDevices() {
  const $tbody = $('#mediaDeviceInfo tbody')
  const keys             = ['deviceId', 'kind', 'label', 'groupId']

  const devices = await navigator.mediaDevices.enumerateDevices()
  devices.forEach((device) => {
    const $tr = document.createElement('tr')
    const name = device.kind.replace('input', '.deviceId.value')
    const disabled = device.kind.endsWith('output') ? 'disabled' : ''
    $tr.innerHTML = `
      <tr>
        <td><input type=radio value=${device.deviceId} name=${name} ${disabled}></td>
        <td>${device.kind     }</td>
        <td>${device.label    }</td>
        <td>${device.deviceId}</td>
        <td>${device.groupId  }</td>
      </tr>
    `
    $tbody.appendChild($tr)
  })
}

function displayConstraints(supportedConstraints) {
  // spec defined keys
  const defined = ['width', 'height', 'aspectRatio', 'frameRate', 'facingMode', 'resizeMode', 'volume', 'sampleRate', 'sampleSize', 'echoCancellation', 'autoGainControl', 'noiseSuppression', 'latency', 'channelCount', 'deviceId', 'groupId']
  const $tbody = $('#supportedConstraints tbody')
  $tbody.innerHTML = ""
  Object.entries(supportedConstraints)
    .forEach(([k, v]) => {
      const $tr = document.createElement('tr')
      $tr.innerHTML = `
        <td class=${defined.includes(k) && "bold"}>${k}</td>
        <td>${v.supported    ? JSON.stringify(v.supported)   : "" } </td>
        <td>${v.constraints  ? JSON.stringify(v.constraints) : "" } </td>
        <td>${v.capabilities ? JSON.stringify(v.capabilities): "" } </td>
        <td>${v.settings     ? JSON.stringify(v.settings)    : "" } </td>
      `
      $tbody.appendChild($tr)
    })
}


// class
class Track {
  constructor(track) {
    this.track = track
  }

  get kind      () { return this.track.kind       }
  get id        () { return this.track.id         }
  get label     () { return this.track.label      }
  get enabled   () { return this.track.enabled    }
  get muted     () { return this.track.muted      }
  get readyState() { return this.track.readyState }

  getConstraints() {
    const support = !!MediaStreamTrack.prototype.getConstraints
    return support ? this.track.getConstraints() : {}
  }

  getCapabilities() {
    const support = !!MediaStreamTrack.prototype.getCapabilities
    return support ? this.track.getCapabilities() : {}
  }

  getSettings() {
    const support = !!MediaStreamTrack.prototype.getSettings
    return support ? this.track.getSettings() : {}
  }

  stop() {
    return this.track.stop()
  }
}

class Stream {
  static async getUserMedia(constraint) {
    const stream = await navigator.mediaDevices.getUserMedia(constraint)
    return new Stream(stream, constraint)
  }

  constructor(stream, constraint) {
    this.stream = stream
    this.constraint = constraint
  }

  get id() {
    return this.stream.id
  }
  get active() {
    return this.stream.active
  }

  tracks() {
    return this
      .stream
      .getTracks()
      .map((track) => new Track(track))
  }

  stop() {
    this.tracks().forEach((track) => track.stop())
  }
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
  displayConstraints(navigator.mediaDevices.getSupportedConstraints())

  const store = new Store($('form'))
  store.load()
  store.display()

  $('form').on('reset', (e) => {
    store.clear()
  })

  $('form').on('change', async ({target}) => {
    store.sync()
    store.display()
    store.save()
  })

  $('form').on('submit', async (e) => {
    e.preventDefault()
    const constraint = JSON.parse(JSON.stringify(store))
    const stream = await Stream.getUserMedia(constraint)

    $('#video').srcObject = stream.stream

    const $tracks   = $('#tracks')
    const keys      = ["kind", "label", "enabled", "muted", "readyState"]

    $('#tracks tbody').innerHTML = ""
    stream.tracks().forEach((track) => {
      const $tr = document.createElement('tr')
      $tr.innerHTML = `
        <td class=kind      >${track.kind       }</td>
        <td class=label     >${track.label      }</td>
        <td class=enabled   >${track.enabled    }</td>
        <td class=muted     >${track.muted      }</td>
        <td class=readyState>${track.readyState }</td>
      `
      $('#tracks tbody').appendChild($tr)

      const constraints  = track.getConstraints()
      const capabilities = track.getCapabilities()
      const settings     = track.getSettings()

      const supportedConstraints = Object
        .entries(navigator.mediaDevices.getSupportedConstraints())
        .reduce((acc, [k, v]) => {
          acc[k] = {supported: v}
          return acc
        }, {})

      Object.entries(constraints).forEach(([k,v]) => {
        if (typeof supportedConstraints[k] === 'boolean') {
          supportedConstraints[k] = {}
        }
        supportedConstraints[k]["constraints"] = v
      })
      Object.entries(capabilities).forEach(([k,v]) => {
        if (typeof supportedConstraints[k] === 'boolean') {
          supportedConstraints[k] = {}
        }
        supportedConstraints[k]["capabilities"] = v
      })
      Object.entries(settings).forEach(([k,v]) => {
        if (typeof supportedConstraints[k] === 'boolean') {
          supportedConstraints[k] = {}
        }
        supportedConstraints[k]["settings"] = v
      })

      displayConstraints(supportedConstraints)
    })
  })
})
