// add mozaic player
import MozaicPlayer from '/assets/js/mozaic-player.mjs'

// Enable debug log adding #debug into url
const log = location.hash === "#debug" ? console.log.bind(console) : () => {}
EventTarget.prototype.on  = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener
const $ = document.querySelector.bind(document)

// keybind
function playerKeybind(e) {
  log(e.key, e.target, document.activeElement)

  if ([e.target, document.body].includes(document.activeElement) === false) return

  switch(e.key) {
    case ' ':
      log('play/pause')
      $('mozaic-player').play()
      e.preventDefault()
      break
    case 'ArrowLeft':
      log('back')
      $('mozaic-player').back()
      break
    case 'ArrowRight':
      log('forward')
      $('mozaic-player').forward()
      break
      // case 'ArrowUp':
      //   log('volume up')
      //   $('mozaic-player').volumeup()
      //   break
      // case 'ArrowDown':
      //   log('volume down')
      //   $('mozaic-player').volumedown()
      //   break
  }
}
if (window.matchMedia( "(max-width: 800px)" ).matches || window.customElements === undefined) {
  // スマホの UI は デフォルトの controls が一番使いやすい気がする
  // custom element 無い場合も controls
  const $audio = $('audio')
  if ($audio === null) return
  $audio.controls = true
  $audio.style.width = '100%'
} else {
  log(MozaicPlayer)
  customElements.define('mozaic-player', MozaicPlayer);

  document.on('keydown', playerKeybind)
}

if (navigator.share) {
  const $share = $('#share')
  if ($share === null) return
  $share.style.display = 'block'
  $share.addEventListener('click', (e) => {
    console.log(e)
    navigator.share({
      url:   location.href,
      title: document.title,
      text:  document.querySelector('section:nth-of-type(2) p').textContent

    })
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

document.on('DOMContentLoaded', (e) => {
  if (window.HTMLDialogElement) {
    // <dialog> があったら検索 Form を <dialog> で出す
    const searchDiag = document.importNode($('#search_diag').content, true)
    document.body.appendChild(searchDiag)

    $('.search').on('click', (e) => {
      log(e)
      e.preventDefault()

      // player が使ってるキーバインドを一旦外す
      document.off('keydown', playerKeybind)

      const $dialog = $('dialog')
      $dialog.on('click', (e) => {
        console.log(e.target, $dialog)
        if (e.target === $dialog) {
          $dialog.close()
        }
      })
      $dialog.on('cancel', (e) => {
        log(e.type, $dialog.returnValue)
      })
      $dialog.on('close', (e) => {
        log(e.type, $dialog.returnValue)

        // player が使ってるキーバインドを戻す
        document.on('keydown', playerKeybind)
      })
      $dialog.showModal()
    })
  }
})
