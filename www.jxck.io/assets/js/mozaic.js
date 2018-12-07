// add mozaic player
import MozaicPlayer from 'https://mozaic.fm/assets/js/mozaic-player.mjs'

// Enable debug log adding #debug into url
const log = location.hash === "#debug" ? console.log.bind(console) : () => {}

if (window.matchMedia( "(max-width: 800px)" ).matches || window.customElements === undefined) {
  // スマホの UI は デフォルトの controls が一番使いやすい気がする
  // custom element 無い場合も controls
  document.querySelector('audio').controls = true
  document.querySelector('audio').style.width = '100%'
} else {
  log(MozaicPlayer)
  customElements.define('mozaic-player', MozaicPlayer);

  // main
  EventTarget.prototype.on = EventTarget.prototype.addEventListener
  const $ = document.querySelector.bind(document)
  document.on('keydown', ({key}) => {
    log(key, document.activeElement)

    if (document.activeElement.nodeName !== "BODY") return

    switch(key) {
      case ' ':
        log('play/pause')
        $('mozaic-player').play()
        break
      case 'ArrowLeft':
        log('back')
        $('mozaic-player').back()
        break
      case 'ArrowRight':
        log('forward')
        $('mozaic-player').forward()
        break
      case 'ArrowUp':
        log('volume up')
        $('mozaic-player').volumeup()
        break
      case 'ArrowDown':
        log('volume down')
        $('mozaic-player').volumedown()
        break
    }
  })
}

if (window.ReportingObserver) {
  (new ReportingObserver((reports, observer) => {
    reports.map((report) => {
      navigator.sendBeacon("https://report-uri.jxck.io/report-to.cgi", JSON.stringify(report))
    })
    console.log(reports)
  })).observe()
}
