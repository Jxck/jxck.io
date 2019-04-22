// add mozaic player
import MozaicPlayer from '/assets/js/mozaic-player.mjs'

// Enable debug log adding #debug into url
const log = location.hash === "#debug" ? console.log.bind(console) : () => {}
EventTarget.prototype.on = EventTarget.prototype.addEventListener
const $ = document.querySelector.bind(document)

if (window.matchMedia( "(max-width: 800px)" ).matches || window.customElements === undefined) {
  // スマホの UI は デフォルトの controls が一番使いやすい気がする
  // custom element 無い場合も controls
  document.querySelector('audio').controls = true
  document.querySelector('audio').style.width = '100%'
} else {
  log(MozaicPlayer)
  customElements.define('mozaic-player', MozaicPlayer);

  // main
  document.on('keydown', (e) => {
    log(e.key, document.activeElement)

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
  })
}

if (navigator.share) {
  const $share = document.querySelector('#share')
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
      const $dialog = $('.dialog')
      $dialog.on('click', (e) => {
        if (e.target === $dialog) {
          $dialog.close()
        }
      })
      $dialog.on('cancel', (e) => {
        log(e.type, $dialog.returnValue)
      })
      $dialog.on('close', (e) => {
        log(e.type, $dialog.returnValue)
      })
      $dialog.showModal()
    })
  }
})
