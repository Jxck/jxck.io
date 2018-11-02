const ICON = {
  PAUSE:   "&#xf04c;",
  PLAY:    "&#xf04b;",
  FORWARD: "&#xf04e;",
  BACK:    "&#xf04a;",
  VOLUP:   "&#xf027;",
  VOLDOWN: "&#xf027;",
}

export default class MozaicPlayer extends HTMLElement {
  static get observedAttributes() { return ['src', 'type'] }

  get src()      { return this.getAttribute('src') }
  set src(value) { return this.setAttribute('src', value) }

  get type()      { return this.getAttribute('type') }
  set type(value) { return this.setAttribute('type', value) }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host * {
          font-family: "FontAwesome5Free";
        }

        /* progress bar */
        .progress-line {
          display: inline-flex;
          width: 100%;
        }
          .progress-line .current {
          }
          .progress-line .progress {
            width: 100%;
            margin: 0 0.6rem;
          }
          .progress-line .duration {
          }


        /* control-line */
        .control-line {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr;
          grid-template-areas: "left center right";
          grid-column-gap: 2em;
          margin-top: 1rem;
        }
          .control-line .grid-left {
            display: flex;
            grid-area: left;
            align-items: center;
            justify-content: flex-end;
          }
          .control-line .grid-center {
            display: flex;
            grid-area: center;
            align-items: center;
            justify-content: space-between;
          }
          .control-line .grid-right {
            display: flex;
            grid-area: right;
            align-items: center;
            justify-content: flex-start;
          }
          .control-line button {
            border: none;
            background-color: initial;
            font-size: 1.4rem;
          }
          .control-line input[type=range] {
            margin: 0 1em;
          }
          .control-line select {
            background-color: #eee;
            border-radius: 1em;
            padding: 0.2rem 0.4rem;
          }
      </style>

      <div class=mozaic-player>
        <slot name=audio></slot>

        <div class=progress-line>
          <time class=current>00:00:00</time>
          <progress class=progress value=0></progress>
          <time class=duration>00:00:00</time>
        </div>

        <div class=control-line>

          <div class=grid-left>
            <span>&#xf027;</span><input class=volume type=range><span>&#xf028;</span>
          </div>

          <div class=grid-center>
            <button class="back">&#xf04a;</button>
            <button class="play">&#xf04b;</button>
            <button class="forward">&#xf04e;</button>
          </div>

          <div class=grid-right>
            <span>&#xf103;</span><input class=playbackRate type=range min=0.6 max=3.0 step=0.2><span>&#xf102;</span>
          </div>

        </div>
      </div>
    `
    return template.content.cloneNode(true)
  }
  //get template() {
  //  const template = document.querySelector('template')
  //  return template.content.cloneNode(true)
  //}

  constructor() {
    super()
    console.log(this, 'created')

    // shadow dom
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this.template);

    // slotted <audio>
    this.audio = this.shadowRoot.querySelector('slot').assignedNodes().pop()
    this.forwardDelta = parseFloat(this.audio.dataset['forward']) || 30
    this.backDelta    = parseFloat(this.audio.dataset['back'])    || -10
    console.assert(this.audio.tagName.toLowerCase() === "audio", '<audio slot=audio> should assigned to <mozaic-player>')

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

    // tooltip event bindings
    this.shadowRoot.querySelector('.play'        ).addEventListener('click', this.onPlay.bind(this))
    this.shadowRoot.querySelector('.forward'     ).addEventListener('click', this.onForward.bind(this))
    this.shadowRoot.querySelector('.back'        ).addEventListener('click', this.onBack.bind(this))
    this.shadowRoot.querySelector('.volume'      ).addEventListener('input', this.onVolume.bind(this))
    this.shadowRoot.querySelector('.playbackRate').addEventListener('input', this.onPlaybackrate.bind(this))

    // dragging progress bar
    this.dragging = false
    const progress = this.shadowRoot.querySelector('.progress')
    progress.addEventListener('mouseup',   this.onMouseup.bind(this))
    progress.addEventListener('mousedown', this.onMousedown.bind(this))
    progress.addEventListener('mousemove', this.onMousemove.bind(this))
    progress.addEventListener('mouseout',  this.onMouseout.bind(this))
  }


  ///////////////////////////
  // WebComponents Callback
  ///////////////////////////
  connectedCallback() {
    console.log(this, 'added')
  }

  disconnectedCallback() {
    console.log(this, 'disconnected')
  }

  attributeChangedCallback(name, from, to) {
    console.log(this, `changed ${name}="${from}" to ${name}="${to}"`)
  }

  adoptedCallback() {
    console.log(this, 'adopted')
  }


  ///////////////////////////
  // Public Interface
  ///////////////////////////
  play() {
    this.shadowRoot.querySelector('.play').dispatchEvent(new Event('click'))
  }

  forward() {
    this.shadowRoot.querySelector('.forward').dispatchEvent(new Event('click'))
  }

  back() {
    this.shadowRoot.querySelector('.back').dispatchEvent(new Event('click'))
  }

  volumeup() {
    this.shadowRoot.querySelector('.volume').stepUp()
    this.shadowRoot.querySelector('.volume').dispatchEvent(new Event('input'))
  }

  volumedown() {
    this.shadowRoot.querySelector('.volume').stepDown()
    this.shadowRoot.querySelector('.volume').dispatchEvent(new Event('input'))
  }


  ///////////////////////////
  // Logic
  ///////////////////////////
  seek(e) {
    const percent     = e.offsetX / e.target.offsetWidth
    const duration    = this.audio.duration
    const seekTime = duration * percent
    console.log(seekTime)
    return seekTime
  }

  timeFormat(time) {
    const h = (~~(time / 3600)).toString().padStart(2, 0)
    const m = (~~(time % 3600 / 60)).toString().padStart(2, 0)
    const s = (~~(time % 60)).toString().padStart(2, 0)
    return `${h}:${m}:${s}`
  }

  setDuration() {
    const duration    = this.audio.duration
    const currentTime = this.audio.currentTime
    console.log(duration, currentTime)

    this.shadowRoot.querySelector('.progress').value = currentTime
    this.shadowRoot.querySelector('.progress').max = duration
    this.shadowRoot.querySelector('.duration').textContent = this.timeFormat(duration)
  }


  ///////////////////////////
  // Audio Event Binding
  ///////////////////////////
  onAudioAbort(e) {
    console.log(e.type, e)
  }

  onAudioCanplay(e) {
    console.log(e.type, e)
  }

  onAudioCanplaythrough(e) {
    console.log(e.type, e)
  }

  onAudioDurationchange(e) {
    console.log(e.type, e)
  }

  onAudioEmptied(e) {
    console.log(e.type, e)
  }

  onAudioEnded(e) {
    console.log(e.type, e)
  }

  onAudioError(e) {
    console.log(e.type, e)
  }

  onAudioLoadeddata(e) {
    console.log(e.type, e)
  }

  onAudioLoadedmetadata(e) {
    console.log(e.type, e)
    this.setDuration()
  }

  onAudioTimeupdate(e) {
    const currentTime = this.audio.currentTime
    console.log('timeupdate', currentTime)

    this.shadowRoot.querySelector('.progress').value = currentTime
    this.shadowRoot.querySelector('.current').textContent = this.timeFormat(currentTime)
  }

  onAudioLoadstart(e) {
    console.log(e.type, e)
  }

  onAudioPause(e) {
    console.log(e.type, e)
    this.shadowRoot.querySelector('.play').innerHTML = ICON.PLAY
  }

  onAudioPlay(e) {
    console.log(e.type, e)
    this.setDuration()
  }

  onAudioPlaying(e) {
    console.log(e.type, e)
  }

  onAudioProgress(e) {
    console.log(e.type, e)
  }

  onAudioRatechange(e) {
    console.log(e.type, e)
  }

  onAudioSeeked(e) {
    console.log(e.type, e)
    this.shadowRoot.querySelector('.progress').value = this.audio.currentTime
  }

  onAudioSeeking(e) {
    console.log(e.type, e)
    this.shadowRoot.querySelector('.progress').value = this.audio.currentTime
  }

  onAudioStalled(e) {
    console.log(e.type, e)
  }

  onAudioSuspend(e) {
    console.log(e.type, e)
  }

  onAudioVolumechange(e) {
    console.log(e.type, e)
  }

  onAudioWaiting(e) {
    console.log(e.type, e)
  }


  ///////////////////////////
  // Event Bindings
  ///////////////////////////
  onPlay(e) {
    if (this.audio.paused) {
      console.log('play()')
      this.audio.play()
      e.target.innerHTML = ICON.PAUSE
    } else {
      console.log('pause()')
      this.audio.pause()
      e.target.innerHTML = ICON.PLAY
    }
  }

  onForward(e) {
    console.log(this.audio.currentTime, this.forwardDelta)
    this.audio.currentTime += this.forwardDelta
  }

  onBack(e) {
    console.log(this.audio.currentTime, this.backDelta)
    this.audio.currentTime += this.backDelta
  }

  onVolume(e) {
    const value = parseFloat(e.target.value)/100
    console.log(e.type, value)
    this.audio.volume = value
  }

  onPlaybackrate(e) {
    const value = parseFloat(e.target.value)
    console.log(e.type, value)
    this.audio.playbackRate = value
  }

  onMousedown(e) {
    console.log(e.type, e)
    this.dragging = true
    this.audio.currentTime = this.seek(e)
  }

  onMousemove(e) {
    console.log(e.type, e)
    if (!this.dragging) return
    this.audio.currentTime = this.seek(e) // seek if dragging
  }

  onMouseup(e) {
    console.log(e.type, e)
    this.dragging = false
  }

  onMouseout(e) {
    console.log(e.type, e)
    this.dragging = false
  }
}
