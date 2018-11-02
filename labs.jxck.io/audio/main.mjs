// add mozaic player
import MozaicPlayer from './mozaic-player.mjs'
console.log(MozaicPlayer)

if (window.matchMedia( "(max-width: 800px)" ).matches) {
  // スマホの UI は デフォルトの controls が一番使いやすい気がする
  document.querySelector('audio').controls = true
} else {
  customElements.define('mozaic-player', MozaicPlayer);

  // main
  EventTarget.prototype.on = EventTarget.prototype.addEventListener
  const $ = document.querySelector.bind(document)
  document.on('keydown', ({key}) => {
    console.log({key})
    console.log(document.activeElement)

    if (document.activeElement.nodeName !== "BODY") return

    switch(key) {
      case ' ':
        console.log('play/pause')
        $('mozaic-player').play()
        break
      case 'ArrowLeft':
        console.log('back')
        $('mozaic-player').back()
        break
      case 'ArrowRight':
        console.log('forward')
        $('mozaic-player').forward()
        break
      case 'ArrowUp':
        console.log('volume up')
        $('mozaic-player').volumeup()
        break
      case 'ArrowDown':
        console.log('volume down')
        $('mozaic-player').volumedown()
        break
    }
  })
}
