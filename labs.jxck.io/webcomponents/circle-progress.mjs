export default class CircleProgress extends HTMLElement {
  static get observedAttributes() {
    return ['max', 'value'];
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
        <style>
        svg {
          transform: rotate(-90deg);
        }

        #progress {
          --ratio: 0;
          stroke-dasharray: calc(314*var(--ratio)) 314;
        }
        </style>

        <svg viewBox="0 0 120 120">
          <circle               cx="60" cy="60" r="50" fill="transparent" stroke="#ccc" stroke-width="18"/>
          <circle id="progress" cx="60" cy="60" r="50" fill="transparent" stroke="#333" stroke-width="18"/>
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
    this.shadowRoot.querySelector('#progress').style.setProperty('--ratio', ratio)
  }
}
