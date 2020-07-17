export default class CustomH2 extends HTMLHeadingElement {
  static get observedAttributes() {
    return ['color']
  }

  get color() {
    return this.getAttribute('color')
  }

  set color(value) {
    console.log(value)
    return this.setAttribute('color', value)
  }

  get template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
          --theme-color: ${this.color};
        }

        h2 {
          font-weight:   bold;
          font-style:    italic;
          color:         var(--theme-color);
          border-left:   solid 6px var(--theme-color);
          border-bottom: solid 1px var(--theme-color);
          padding-left:  0.6rem;
        }
      </style>
      <h2 id=h2><slot></slot></h2>
    `
    return template.content.cloneNode(true)
  }

  constructor() {
    super()
    console.log(this, 'created')
    this.attachShadow({mode: 'open'})
    this.render()

    this.shadowRoot.querySelector('#h2').addEventListener('click', (e) => {
      console.log(e)
      const r = ~~(Math.random()*255)
      const g = ~~(Math.random()*255)
      const b = ~~(Math.random()*255)
      this.color = `rgb(${r}, ${g}, ${b})`
    })

  }

  render() {
    this.shadowRoot.appendChild(this.template)
  }

  connectedCallback() {
    console.log(this, 'added')
  }

  disconnectedCallback() {
    console.log(this, 'disconnected')
  }

  attributeChangedCallback(name, from, to) {
    console.log(this, `changed ${name}="${from}" to ${name}="${to}"`)
    this.shadowRoot.host.style.setProperty('--theme-color', to)
  }

  adoptedCallback() {
    console.log(this, 'adopted')
  }
}
