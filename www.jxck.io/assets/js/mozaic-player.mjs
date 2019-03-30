const ICON = {
  PAUSE:   "&#xf04c;",
  PLAY:    "&#xf04b;",
  FORWARD: "&#xf04e;",
  BACK:    "&#xf04a;",
  VOLUP:   "&#xf027;",
  VOLDOWN: "&#xf027;",
}

// Enable debug log adding #debug into url
const log = location.hash === "#debug" ? console.log.bind(console) : () => {}

export default class MozaicPlayer extends HTMLElement {
  static get observedAttributes() { return ['src'] }

  get src()      { return this.querySelector('audio').src }
  set src(value) { return this.querySelector('audio').src = value }

  get template() {
    const template = document.createElement('template')
    // TODO: html-modules
    template.innerHTML = `
      <style>
        :host * {
          font-family: "FontAwesome5Free";
          color: #fff;
        }

        /* progress bar */
        .progress-line {
          display:     inline-flex;
          align-items: center;
          width:       100%;
        }
          .progress-line .current {
          }
          .progress-line .progress {
            -webkit-appearance: none;
            -moz-appearance:    none;
            appearance:         none;
            border-radius:      2px;
            border: none;
            width:  100%;
            height: 6px;
            margin: 0 0.6rem;
          }

          progress[value]::-webkit-progress-bar {
            background-color: white;
            border-radius:    2px;
          }
          progress[value]::-moz-progress-bar {
            background-color: royalblue;
            border-radius:    2px;
          }
          progress[value]::-webkit-progress-value {
            background-color: royalblue;
            border-radius:    2px;
          }


        /* control-line */
        .control-line {
          width:                 100%;
          display:               grid;
          grid-template-columns: 2fr 1fr 2fr;
          grid-template-areas:   "left center right";
          grid-column-gap:       10%;
          margin-top:            1%;
        }
          .control-line .grid-left {
            display:         flex;
            grid-area:       left;
            align-items:     center;
            justify-content: flex-end;
          }
          .control-line .grid-center {
            display:         flex;
            grid-area:       center;
            align-items:     center;
            justify-content: space-between;
          }
          .control-line .grid-right {
            display:         flex;
            grid-area:       right;
            align-items:     center;
            justify-content: flex-start;
          }
          .control-line button {
            border:           none;
            background-color: initial;
            font-size:        1.4rem;
          }
          .control-line input[type=range] {
            -webkit-appearance: none;
            -moz-appearance:    none;
            background-color:   #fff;
            height:             2px;
            border-radius:      2px;
          }
          .control-line input::-moz-range-track {
            background-color:   #fff;
          }
          .control-line .volume,
          .control-line .playbackRate {
            margin: 0 1em;
          }

      </style>

      <div class=mozaic-player>
        <slot name=audio></slot>

        <div class=progress-line>
          <time class=current datetime=00:00:00>00:00:00</time>
          <progress class=progress value=0></progress>
          <time class=duration datetime=00:00:00>00:00:00</time>
        </div>

        <div class=control-line>

          <div class=grid-left>
            <span>&#xf027;</span><input class=volume type=range title=volume value=0.5><span>&#xf028;</span>
          </div>

          <div class=grid-center>
            <button class=back title="back 10s">&#xf04a;</button>
            <button class=play title=play>&#xf04b;</button>
            <button class=forward title="forward 30s">&#xf04e;</button>
          </div>

          <div class=grid-right>
            <input class=playbackRate type=range title=speed min=0.6 max=3.0 step=0.2 value=1.0 list=playbackRate><output class=rate>x1.0</output>
          </div>
          <datalist id=playbackRate>
            <option value=0.6 label="x0.6">
            <option value=0.8>
            <option value=1.0 label="x1.0">
            <option value=1.2>
            <option value=1.4>
            <option value=1.6>
            <option value=1.8>
            <option value=2.0 label="x2.0">
            <option value=2.2>
            <option value=2.4>
            <option value=2.6>
            <option value=2.8>
            <option value=3.0 label="x3.0">
          </datalist>

        </div>
      </div>
    `
    return template.content.cloneNode(true)
  }

  constructor() {
    super()
    log(this, 'created')

    // create shadow dom
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.template)

    // get slotted <audio>
    this.audio = this.shadowRoot.querySelector('slot').assignedNodes().pop()
    console.assert(this.audio.tagName.toLowerCase() === "audio", '<audio slot=audio> should assigned to <mozaic-player>')

    // get delta
    this.forwardDelta = parseFloat(this.audio.dataset['forward']) || 30
    this.backDelta    = parseFloat(this.audio.dataset['back'])    || -10

    // audio evnet bindings
    this.audio.addEventListener('abort',          this.onAudioAbort.bind(this))
    this.audio.addEventListener('canplay',        this.onAudioCanplay.bind(this))
    this.audio.addEventListener('canplaythrough', this.onAudioCanplaythrough.bind(this))
    this.audio.addEventListener('durationchange', this.onAudioDurationchange.bind(this))
    this.audio.addEventListener('emptied',        this.onAudioEmptied.bind(this))
    this.audio.addEventListener('ended',          this.onAudioEnded.bind(this))
    this.audio.addEventListener('error',          this.onAudioError.bind(this))
    this.audio.addEventListener('loadeddata',     this.onAudioLoadeddata.bind(this))
    this.audio.addEventListener('loadedmetadata', this.onAudioLoadedmetadata.bind(this))
    this.audio.addEventListener('timeupdate',     this.onAudioTimeupdate.bind(this))
    this.audio.addEventListener('loadstart',      this.onAudioLoadstart.bind(this))
    this.audio.addEventListener('pause',          this.onAudioPause.bind(this))
    this.audio.addEventListener('play',           this.onAudioPlay.bind(this))
    this.audio.addEventListener('playing',        this.onAudioPlaying.bind(this))
    this.audio.addEventListener('progress',       this.onAudioProgress.bind(this))
    this.audio.addEventListener('ratechange',     this.onAudioRatechange.bind(this))
    this.audio.addEventListener('seeked',         this.onAudioSeeked.bind(this))
    this.audio.addEventListener('seeking',        this.onAudioSeeking.bind(this))
    this.audio.addEventListener('stalled',        this.onAudioStalled.bind(this))
    this.audio.addEventListener('suspend',        this.onAudioSuspend.bind(this))
    this.audio.addEventListener('volumechange',   this.onAudioVolumechange.bind(this))
    this.audio.addEventListener('waiting',        this.onAudioWaiting.bind(this))

    // caching dom
    this.$play         = this.shadowRoot.querySelector('.play')
    this.$forward      = this.shadowRoot.querySelector('.forward')
    this.$back         = this.shadowRoot.querySelector('.back')
    this.$volume       = this.shadowRoot.querySelector('.volume')
    this.$playbackRate = this.shadowRoot.querySelector('.playbackRate')
    this.$current      = this.shadowRoot.querySelector('.current')
    this.$progress     = this.shadowRoot.querySelector('.progress')
    this.$duration     = this.shadowRoot.querySelector('.duration')
    this.$outputRate   = this.shadowRoot.querySelector('output.rate')


    // tooltip event bindings
    this.$play        .addEventListener('click', this.onPlay.bind(this))
    this.$forward     .addEventListener('click', this.onForward.bind(this))
    this.$back        .addEventListener('click', this.onBack.bind(this))
    this.$volume      .addEventListener('input', this.onVolume.bind(this))
    this.$playbackRate.addEventListener('input', this.onPlaybackrate.bind(this))

    // dragging progress bar
    this.dragging = false
    this.$progress.addEventListener('mouseup',   this.onMouseup.bind(this))
    this.$progress.addEventListener('mousedown', this.onMousedown.bind(this))
    this.$progress.addEventListener('mousemove', this.onMousemove.bind(this))
    this.$progress.addEventListener('mouseout',  this.onMouseout.bind(this))

    // load the audio
    this.audio.load()
  }


  ///////////////////////////
  // WebComponents Callback
  ///////////////////////////
  connectedCallback() {
    log(this, 'added')
  }

  disconnectedCallback() {
    log(this, 'disconnected')
  }

  attributeChangedCallback(name, from, to) {
    log(this, `changed ${name}="${from}" to ${name}="${to}"`)
  }

  adoptedCallback() {
    log(this, 'adopted')
  }


  ///////////////////////////
  // Public Interface
  ///////////////////////////
  play() {
    this.$play.dispatchEvent(new Event('click'))
  }

  forward() {
    this.$forward.dispatchEvent(new Event('click'))
  }

  back() {
    this.$back.dispatchEvent(new Event('click'))
  }

  volumeup() {
    this.$volume.stepUp()
    this.$volume.dispatchEvent(new Event('input'))
  }

  volumedown() {
    this.$volume.stepDown()
    this.$volume.dispatchEvent(new Event('input'))
  }


  ///////////////////////////
  // Logic
  ///////////////////////////
  seek({offsetX, target}) {
    const percent  = offsetX / target.offsetWidth
    const duration = this.audio.duration
    const seekTime = duration * percent
    log('seekTime', seekTime)
    return seekTime
  }

  timeFormat(time) {
    const h = (~~(time / 3600)).toString().padStart(2, 0)
    const m = (~~(time % 3600 / 60)).toString().padStart(2, 0)
    const s = (~~(time % 60)).toString().padStart(2, 0)
    return `${h}:${m}:${s}`
  }

  setDuration() {
    const duration = this.audio.duration
    log('duration', duration)
    this.$progress.max         = duration
    this.$duration.textContent = this.timeFormat(duration)
    this.$duration.dateTime    = this.timeFormat(duration)
  }

  setTime() {
    const currentTime = this.audio.currentTime
    log('currentTime', currentTime)
    this.$progress.value      = currentTime
    this.$current.textContent = this.timeFormat(currentTime)
    this.$current.dateTime    = this.timeFormat(currentTime)
  }


  ///////////////////////////
  // Save Setting
  ///////////////////////////
  saveCurrentTime() {
    const currentTime = this.audio.currentTime
    log('saveCurrentTime', currentTime)
    localStorage.setItem(`${this.src}:currentTime`, currentTime)
  }

  saveVolume() {
    const volume = this.audio.volume
    log('saveVolume', volume)
    localStorage.setItem(`mozaic.fm:volume`, volume)
  }

  savePlaybackRate() {
    const playbackRate = this.audio.playbackRate
    log('savePlaybackRate', playbackRate)
    localStorage.setItem(`mozaic.fm:playbackRate`, playbackRate)
  }


  ///////////////////////////
  // Load Setting
  ///////////////////////////
  loadCurrentTime() {
    const currentTime = parseFloat(localStorage.getItem(`${this.src}:currentTime`) || '0')
    log('loadCurrentTime', currentTime)
    this.audio.currentTime = currentTime
  }

  loadVolume() {
    const volume = parseFloat(localStorage.getItem(`mozaic.fm:volume`) || '0.5')
    log('loadVolume', volume)
    this.audio.volume = volume
    this.$volume.value = volume*100
  }

  loadPlaybackRate() {
    const playbackRate = parseFloat(localStorage.getItem(`mozaic.fm:playbackRate`) || '1.0')
    log('loadPlabackRate', playbackRate)
    this.audio.playbackRate      = playbackRate
    this.$playbackRate.value     = playbackRate
    this.$outputRate.textContent = `x${playbackRate}`
  }


  ///////////////////////////
  // Audio Event Binding
  ///////////////////////////
  onAudioAbort(e) {
    log(e.type, e)
  }

  onAudioCanplay(e) {
    log(e.type, e)
  }

  onAudioCanplaythrough(e) {
    log(e.type, e)
  }

  onAudioDurationchange(e) {
    log(e.type, e)
    this.setDuration()
  }

  onAudioEmptied(e) {
    log(e.type, e)
  }

  onAudioEnded(e) {
    log(e.type, e)
  }

  onAudioError(e) {
    log(e.type, e)
  }

  onAudioLoadeddata(e) {
    log(e.type, e)
  }

  onAudioLoadedmetadata(e) {
    log(e.type, e)
    this.loadVolume()
    this.loadPlaybackRate()
    this.loadCurrentTime()
  }

  onAudioTimeupdate(e) {
    log(e.type, e)
    this.setTime()
    if (this.audio.currentTime === 0) return
    this.saveCurrentTime()
  }

  onAudioLoadstart(e) {
    log(e.type, e)
  }

  onAudioPause(e) {
    log(e.type, e)
    this.$play.innerHTML = ICON.PLAY
  }

  onAudioPlay(e) {
    log(e.type, e)
  }

  onAudioPlaying(e) {
    log(e.type, e)
  }

  onAudioProgress(e) {
    log(e.type, e)
  }

  onAudioRatechange(e) {
    log(e.type, e)
  }

  onAudioSeeked(e) {
    log(e.type, e)
  }

  onAudioSeeking(e) {
    log(e.type, e)
  }

  onAudioStalled(e) {
    log(e.type, e)
  }

  onAudioSuspend(e) {
    log(e.type, e)
  }

  onAudioVolumechange(e) {
    log(e.type, e)
  }

  onAudioWaiting(e) {
    log(e.type, e)
  }


  ///////////////////////////
  // Event Bindings
  ///////////////////////////
  onPlay(e) {
    if (this.audio.paused) {
      log('play()')
      this.audio.play()
      e.target.innerHTML = ICON.PAUSE
    } else {
      log('pause()')
      this.audio.pause()
      e.target.innerHTML = ICON.PLAY
    }
  }

  onForward(e) {
    log(this.audio.currentTime, this.forwardDelta)
    this.audio.currentTime += this.forwardDelta
  }

  onBack(e) {
    log(this.audio.currentTime, this.backDelta)
    this.audio.currentTime += this.backDelta
  }

  onVolume(e) {
    const volume = parseFloat(e.target.value)/100
    log(e.type, volume)
    this.audio.volume = volume
    this.saveVolume()
  }

  onPlaybackrate(e) {
    const playbackRate = parseFloat(e.target.value)
    log(e.type, playbackRate)
    this.audio.playbackRate = playbackRate
    this.$outputRate.textContent = `x${playbackRate}`
    this.savePlaybackRate()
  }

  onMousedown(e) {
    log(e.type, e)
    this.dragging = true
    this.audio.currentTime = this.seek(e)
  }

  onMousemove(e) {
    // log(e.type, e)
    if (!this.dragging) return
    this.audio.currentTime = this.seek(e) // seek if dragging
  }

  onMouseup(e) {
    // log(e.type, e)
    this.dragging = false
  }

  onMouseout(e) {
    // log(e.type, e)
    this.dragging = false
  }
}
