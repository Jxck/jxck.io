const log = localStorage.getItem("background-fetch") === "true" ? console.log.bind(console) : () => {}

export default class BackgroundFetch extends HTMLElement {
  /**
   * @returns {string[]}
   */
  static get observedAttributes() {
    return [
      // number
      'data-value',
      'data-size',
      'data-mtime',
      // string
      'data-url',
      'data-page',
      'data-title',
    ]
  }

  /**
   * @returns {Node}
   */
  get template() {
    /** @type {HTMLTemplateElement} */
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
      #progress {
        --ratio: 0;
        stroke-dasharray: calc(314*var(--ratio)) 314;
      }

      button {
        padding: 0;
        margin: 0;
        border: none;
        object-fit: fill;
        background-color: unset;
        width: 100%;
        height: 100%;
      }
      </style>

      <button tabindex=0 aria-label="download this audio" title="download this audio">
        <svg viewBox="0 0 100 100">
          <circle id="base"     part="base"     cx="50" cy="50" r="46" stroke-width="8" transform="rotate(-90, 50, 50)" />
          <circle id="progress" part="progress" cx="50" cy="50" r="46" stroke-width="8" transform="rotate(-90, 50, 50)" />
          <path   id="arrow"    part="arrow" d="
          M 40 20
          L 60 20
          L 60 50
          L 75 50
          L 50 80
          L 25 50
          L 40 50
          L 40 20
          "/>
        </svg>
      </button>
    `
    return template.content.cloneNode(true)
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.template)
    /** @type {HTMLElement} */
    this.$progress = this.shadowRoot.querySelector('#progress')
    /** @type {HTMLElement} */
    this.$arrow = this.shadowRoot.querySelector('#arrow')
    /** @type {string} */
    this.dataset.value = '0'
    /** @type {string} */
    this.dataset.size  = '0'
    /** @type {string} */
    this.dataset.mtime = '0'
    /** @type {string} */
    this.dataset.url   = ''
    /** @type {string} */
    this.dataset.page  = ''
    /** @type {string} */
    this.dataset.title = ''
  }

  async connectedCallback(e) {
    this.update()
    const cached = await this.etag()
    log({cached})
    log(this)
    log([
      this.dataset.value,
      this.dataset.size,
      this.dataset.mtime,
      this.dataset.url,
      this.dataset.page,
      this.dataset.title,
    ])

    if (cached) {
      // cache がある
      this.dataset.value = this.dataset.size
      this.$arrow.part.add('done')
    } else {
      /**@type{ServiceWorkerRegistration}*/
      const registration = await navigator.serviceWorker.ready
      let task = await registration.backgroundFetch.get(this.dataset.page)
      log(task)
      if (task) {
        task.on('progress', (e) => {
          const {downloaded, downloadTotal} = /**@type{BackgroundFetchRegistration}*/(e.target)
          log(downloaded, downloadTotal)
          this.dataset.value = downloaded.toString()
        })
      }

      // cache がない
      this.on('click', async (e) => {
        // html も一緒に取得したいが、 downloadTotal を出すのが面倒なので
        // cache の追加を sw に依頼

        /**@type{ServiceWorker}*/
        const controller = navigator.serviceWorker.controller
        controller.postMessage({type: 'save', url: this.dataset.page})

        /**@type{BackgroundFetchOptions}*/
        const option = {
          title: this.dataset.title,
          icons: [
            {src: '/assets/img/mozaic.jpeg', type: 'image/jpeg',    sizes: '2000x2000'},
            {src: '/assets/img/mozaic.webp', type: 'image/webp',    sizes: '256x256'},
            {src: '/assets/img/mozaic.png',  type: 'image/png',     sizes: '256x256'},
            {src: '/assets/img/mozaic.svg',  type: 'image/svg+xml', sizes: 'any'}
          ],
          downloadTotal: parseFloat(this.dataset.size)
        }
        log(option)

        /**@type{BackgroundFetchRegistration}*/
        let task = await registration.backgroundFetch.get(this.dataset.page)
        if (task === undefined) {
          task = await registration.backgroundFetch.fetch(this.dataset.page, [this.dataset.url], option)
        }
        log(task)
        task.on('progress', (e) => {
          const {downloaded, downloadTotal} = /**@type{BackgroundFetchRegistration}*/(e.target)
          log(downloaded, downloadTotal)
          this.dataset.value = downloaded.toString()
        })
      })
    }
  }

  disconnectedCallback(e) {
    log(e)
  }

  adoptedCallback(e) {
    log(e)
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal === newVal) return
    log(`${attrName}, ${oldVal}, ${newVal}`)
    this.dataset[attrName.match(/^data-(.*)/)[1]] = newVal
    this.update()
  }

  update() {
    /** @type{Number} */
    const value = parseFloat(this.dataset.value)
    /** @type{Number} */
    const size  = parseFloat(this.dataset.size)
    /** @type{Number} */
    const ratio = (size === 0) ? 0 : (value / size)
    this.$progress.style.setProperty('--ratio', ratio.toString())
    if (ratio === 1) {
      /** @type{Element} */
      const $arrow = this.shadowRoot.querySelector('#arrow')
      $arrow.part.add('done')
      log('done')
    }
  }

  // check etag
  async etag() {
    /** @type{Number} */
    const mtime = parseFloat(this.dataset.mtime)
    /** @type{Number} */
    const size  = parseFloat(this.dataset.size)
    /**@type{Response}*/
    const cache = await caches.match(this.dataset.url)
    /**@type{string}*/
    const saved_etag = cache?.headers.get('etag')
    /**@type{string}*/
    const current_etag = `"${mtime.toString(16)}-${size.toString(16)}"`
    return current_etag === saved_etag
  }
}
