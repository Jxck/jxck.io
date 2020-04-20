export default class CircleProgress extends HTMLElement {
  static get observedAttributes() {
    return ['max', 'value'];
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
        <style>
        #progress {
          --ratio: 0;
          stroke-dasharray: calc(314*var(--ratio)) 314;
        }
        </style>

        <svg viewBox="0 0 100 100">
          <circle id="base"     part="base"     cx="50" cy="50" r="46" stroke-width="8" transform="rotate(-90, 50, 50)" />
          <circle id="progress" part="progress" cx="50" cy="50" r="46" stroke-width="8" transform="rotate(-90, 50, 50)" />
          <path id="arrow" part="arrow" d="
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
      `
    return template.content.cloneNode(true)
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.template)
    this.max   = 0
    this.value = 0
    this.$progress = this.shadowRoot.querySelector('#progress')
  }

  connectedCallback(e) {
    console.log(e)
    this.update()
  }

  disconnectedCallback() {
    console.log(e)
  }

  adoptedCallback() {
    console.log(e)
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // console.log(attrName, oldVal, newVal)
    this[attrName] = parseFloat(newVal)
    this.update()
  }

  update() {
    const ratio = (this.max === 0) ? 0 : (this.value / this.max)
    console.log(ratio)
    this.$progress.style.setProperty('--ratio', ratio)
    console.log(this.$progress)
  }
}
