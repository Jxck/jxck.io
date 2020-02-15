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

/* player host */
.mozaic-player {
  display:          grid;
  color:            #fff;
  background-color: inherit;
  border-radius:    inherit;
  font-family:      "NotoSansMonoCJKjp-Jxck";
}
  .mozaic-player button {
    border:           none;
    background-color: initial;
  }
  .mozaic-player input[type=range] {
    width:              100%;
    -webkit-appearance: none;
    -moz-appearance:    none;
    background-color:   #fff;
    border-radius:      2px;
    height:             2px;
    margin:             0 1rem;
  }
  .mozaic-player input::-moz-range-track {
    background-color:   #fff;
  }

/* progress bar */
.grid-progress {
  grid-area:   progress;
  display:     inline-flex;
  align-items: center;
}
  .grid-progress .current {
  }
  .grid-progress .progress {
    -webkit-appearance: none;
    -moz-appearance:    none;
    appearance:         none;
    border-radius:      2px;
    border:             none;
    width:              100%;
    height:             6px;
    margin:             0 1rem;
  }
  .grid-progress progress[value]::-webkit-progress-bar {
    background-color: white;
    border-radius:    2px;
  }
  .grid-progress progress[value]::-moz-progress-bar {
    background-color: royalblue;
    border-radius:    2px;
  }
  .grid-progress progress[value]::-webkit-progress-value {
    background-color: royalblue;
    border-radius:    2px;
  }

/* controls */
.grid-volume {
  display:   flex;
  grid-area: volume;
  align-items:     center;
  justify-content: flex-end;
}

.grid-play {
  display:   flex;
  grid-area: play;
  align-items:     center;
  justify-content: space-between;
}
  .grid-play .play:disabled .svg-play path {
    fill:   #777;
    stroke: #777;
  }
  .grid-play .svg-pause {
    display: none;
  }

.grid-speed {
  display:   flex;
  grid-area: speed;
  align-items:     center;
  justify-content: flex-start;
}

/* layout for mobile */
@media screen and (max-width: 1024px) {
  .mozaic-player {
    grid-template:
      "progress" 1fr
      "play"     1fr
      "speed"    1fr
      / 1fr;
  }
  .mozaic-player svg {
    width: 2.8rem;
  }
  .grid-progress {
    margin: 0 1rem;
  }
  .grid-volume {
    display: none;
  }
  .grid-play {
    margin: 0 10%;
  }
  .grid-speed {
    margin: 0 10%;
  }
}

/* layout for PC */
@media screen and (min-width: 1024px) {
  .mozaic-player {
    grid-template:
      "progress progress progress progress progress" 2fr
      ".        volume   play     speed    ."        3fr
      /1fr      6fr      6fr      6fr      1fr;
    grid-row-gap: 1em;
    padding: 1%;
  }
  .mozaic-player svg {
    width: 3rem;
  }
  .grid-volume svg {
    width: 2rem;
  }
  .grid-play {
    margin: 0 20%;
  }
}
</style>


<div class=mozaic-player>
  <slot name=audio></slot>

  <div class=grid-progress>
    <time class=current datetime=00:00:00>00:00:00</time>
    <progress class=progress value=0 tabindex=0></progress>
    <time class=duration datetime=00:00:00>00:00:00</time>
  </div>

  <div class=grid-volume>
    <button class=volumeDown title="volume down">
      <svg class="svg-volume-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- volume-down -->
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="30"
          d="
          M  30 100
          L  90 100
          L 140  50
          L 140 250
          L  90 200
          L  30 200
          Z
          "/>

        <circle
          cx="170"
          cy="150"
          r="30"
          stroke="#fff"
          stroke-width="18"
          stroke-linecap="round"
          stroke-dashoffset="85"
          stroke-dasharray="124,110"
          fill="transparent">
        </circle>
      </svg>
    </button>

    <input class=volume type=range title=volume value=0.5>

    <button class=volumeUp title="volume up">
      <svg class="svg-volume-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- volume up -->
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="30"
          d="
          M  30 100
          L  90 100
          L 140  50
          L 140 250
          L  90 200
          L  30 200
          Z
          "/>

        <circle
          cx="170"
          cy="150"
          r="30"
          stroke="#fff"
          stroke-width="18"
          stroke-linecap="round"
          stroke-dashoffset="85"
          stroke-dasharray="124,110"
          fill="transparent">
        </circle>

        <circle
          cx="170"
          cy="150"
          r="70"
          stroke="#fff"
          stroke-width="18"
          stroke-linecap="round"
          stroke-dashoffset="96"
          stroke-dasharray="176,279"
          fill="transparent">
        </circle>

        <circle
          cx="170"
          cy="150"
          r="110"
          stroke="#fff"
          stroke-width="18"
          stroke-linecap="round"
          stroke-dashoffset="64"
          stroke-dasharray="185,448"
          fill="transparent">
        </circle>
      </svg>
    </button>
  </div>

  <div class=grid-play>
    <button class=back title="back 10s">
      <svg class="svg-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- back -->
        <circle
          cx="150"
          cy="150"
          r="110"
          stroke="#fff"
          stroke-width="21"
          stroke-dashoffset="0"
          stroke-dasharray="449,66"
          fill="transparent">
        </circle>

        <text
          x="150"
          y="150"
          fill="#fff"
          font-size="100"
          font-weight="bold"
          font-family="NotoSansMonoCJKjp-Jxck"
          text-anchor="middle"
          dominant-baseline="central">10</text>

        <path stroke="#fff"
              stroke-width="1"
              fill="#fff"
              d="
              M 160 5
              L 160 80
              L 100 40
              Z
              "/>
      </svg>
    </button>
    <button class=play title=play disabled>
      <svg class="svg-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- >  -->
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="30"
          d="
          M 70  30
          L 250 150
          L 70  270
          Z
          "/>
      </svg>
      <svg class="svg-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- ||(pause) -->
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linejoin="round"
          stroke-width="30"
          d="
          M   40  30
          L  110  30
          L  110 270
          L   40 270
          Z
          M  260  30
          L  260 270
          L  190 270
          L  190  30
          Z
          "/>
      </svg>
    </button>
    <button class=forward title="forward 30s">
      <svg class="svg-forward" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
        <!-- forward -->
        <circle
          cx="150"
          cy="150"
          r="110"
          stroke="#fff"
          stroke-width="21"
          stroke-dashoffset="0"
          stroke-dasharray="518,70"
          fill="transparent">
        </circle>

        <text
          x="150"
          y="150"
          fill="#fff"
          font-size="100"
          font-weight="bold"
          font-family="NotoSansMonoCJKjp-Jxck"
          text-anchor="middle"
          dominant-baseline="central">30</text>

        <path stroke="#fff"
              stroke-width="1"
              fill="#fff"
              d="
              M 140  5
              L 140 80
              L 200 40
              Z
              "/>
      </svg>
    </button>
  </div>

  <div class=grid-speed>
    <input class=playbackRate type=range title=speed min=0.6 max=3.0 step=0.2 value=1.0 list=playbackRate>
    <output class=rate>x1.0</output>
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

    // get data
    this.title        = this.audio.title
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
    this.$volumeUp     = this.shadowRoot.querySelector('.volumeUp')
    this.$volumeDown   = this.shadowRoot.querySelector('.volumeDown')
    this.$playbackRate = this.shadowRoot.querySelector('.playbackRate')
    this.$current      = this.shadowRoot.querySelector('.current')
    this.$progress     = this.shadowRoot.querySelector('.progress')
    this.$duration     = this.shadowRoot.querySelector('.duration')
    this.$outputRate   = this.shadowRoot.querySelector('output.rate')

    this.$svgPlay = this.shadowRoot.querySelector('.svg-play')
    this.$svgPause = this.shadowRoot.querySelector('.svg-pause')



    // tooltip event bindings
    this.$play        .addEventListener('click', this.onPlay.bind(this))
    this.$forward     .addEventListener('click', this.onForward.bind(this))
    this.$back        .addEventListener('click', this.onBack.bind(this))
    this.$volume      .addEventListener('input', this.onVolume.bind(this))
    this.$volumeUp    .addEventListener('click', this.onVolumeUp.bind(this))
    this.$volumeDown  .addEventListener('click', this.onVolumeDown.bind(this))
    this.$playbackRate.addEventListener('input', this.onPlaybackrate.bind(this))

    // dragging progress bar
    this.dragging = false
    this.$progress.addEventListener('mousedown',   this.onMousedown. bind(this), {passive: true})
    this.$progress.addEventListener('mousemove',   this.onMousemove. bind(this), {passive: true})
    this.$progress.addEventListener('mouseup',     this.onMouseup.   bind(this), {passive: true})
    this.$progress.addEventListener('mouseout',    this.onMouseout.  bind(this), {passive: true})

    this.$progress.addEventListener('touchstart',  this.onMousedown. bind(this), {passive: true})
    this.$progress.addEventListener('touchmove',   this.onMousemove. bind(this), {passive: true})
    this.$progress.addEventListener('touchend',    this.onMouseup.   bind(this), {passive: true})
    this.$progress.addEventListener('touchcancel', this.onMouseout.  bind(this), {passive: true})

    // load the audio
    this.audio.load()

    // MediaSession API
    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title:  this.title,
        artist: "Jxck",
        album:  "mozaic.fm",
        artwork: [
          {
            src:   "https://mozaic.fm/assets/img/mozaic.png",
            sizes: "256x256",
            type:  "image/png"
          },
          {
            src:   "https://mozaic.fm/assets/img/mozaic.webp",
            sizes: "256x256",
            type:  "image/webp"
          },
          {
            src:   "https://mozaic.fm/assets/img/mozaic.jpeg",
            sizes: "2000x2000",
            type:  "image/jpeg"
          },
          {
            src:   "https://mozaic.fm/assets/img/mozaic.svg",
            type:  "image/svg+xml"
          }
        ]
      })

      navigator.mediaSession.setActionHandler("play",         () => { this.onPlay()    })
      navigator.mediaSession.setActionHandler("pause",        () => { this.onPlay()    })
      navigator.mediaSession.setActionHandler("seekbackward", () => { this.onBack()    })
      navigator.mediaSession.setActionHandler("seekforward",  () => { this.onForward() })
      // TODO: other action if supported
    }
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
  percent(e) {
    let {clientX, touches} = e
    if (touches) {
      clientX = touches[0].clientX
    }
    const {offsetLeft, clientWidth} = e.target
    let percent = (clientX - offsetLeft) / clientWidth
    return percent
  }

  seek(e) {
    const percent  = this.percent(e)
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

  setCanPlayButton() {
    this.$play.disabled = false
    const $path = this.$svgPlay.querySelector('path')
    $path.style.fill   = "#fff"
    $path.style.stroke = "#fff"
  }

  setPlayButton() {
    this.$svgPlay.style.display  = "inline-block";
    this.$svgPause.style.display = "none";
  }

  setPauseButton() {
    this.$svgPlay.style.display  = "none";
    this.$svgPause.style.display = "inline-block";
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
    this.setCanPlayButton()
  }

  onAudioCanplaythrough(e) {
    log(e.type, e)
    this.setCanPlayButton()
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
    this.setPlayButton()
  }

  onAudioPlay(e) {
    log(e.type, e)
    this.setPauseButton()
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
    } else {
      log('pause()')
      this.audio.pause()
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

  onVolumeUp(e) {
    log(e.type, "volmeUp")
    this.volumeup()
  }

  onVolumeDown(e) {
    log(e.type, "volmeDown")
    this.volumedown()
  }

  onPlaybackrate(e) {
    const playbackRate = new Number(e.target.value)
    log(e.target.value, playbackRate)
    this.audio.playbackRate = playbackRate
    //   1.toPrecision(2) => 1.0
    // 0.8.toPrecision(1) => 0.8
    const precision = playbackRate < 1 ? 1 : 2
    this.$outputRate.textContent = `x${playbackRate.toPrecision(precision)}`
    this.savePlaybackRate()
  }


  // Mouse & Touch Events
  onMousedown(e) {
    log(e.type, e)
    this.dragging = true
    this.audio.currentTime = this.seek(e)
  }

  onMousemove(e) {
    log(e.type, e)
    if (!this.dragging) return
    this.audio.currentTime = this.seek(e) // seek if dragging
  }

  onMouseup(e) {
    log(e.type, e)
    this.dragging = false
  }

  onMouseout(e) {
    log(e.type, e)
    this.dragging = false
  }
}
