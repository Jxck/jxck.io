export default class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
  }

  async connectedCallback() {
    const res      = await fetch("profile-card/template.html")
    const text     = await res.text()
    const template = document.createElement("template")
    template.innerHTML = text
    const node = template.content.cloneNode(true)
    this.shadowRoot.appendChild(node)
  }
}
