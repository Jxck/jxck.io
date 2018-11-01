import CustomH2 from './custom-h2.mjs'


document.querySelector('h2[is=custom-h2]').style.display = 'none'
customElements.whenDefined('custom-h2').then((e) => {
  document.querySelector('h2[is=custom-h2]').style.display = 'block'
})

customElements.define('custom-h2', CustomH2, {extends: 'h2'});

setTimeout(() => {
  const r = ~~(Math.random()*255)
  const g = ~~(Math.random()*255)
  const b = ~~(Math.random()*255)
  document.querySelector('h2[is=custom-h2]').setAttribute('color', `rgb(${r}, ${g}, ${b})`)
}, 500)
