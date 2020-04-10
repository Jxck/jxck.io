// add mozaic player
import MozaicPlayer from '/assets/js/mozaic-player.mjs'

// Enable debug log adding #debug into url
const log = location.hash === '#debug' ? console.log.bind(console) : () => {}
EventTarget.prototype.on  = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function reportingObserver() {
  console.log('ReportingObserver');
  const observer = new ReportingObserver((reports, observer) => {
    console.log(reports)
    const URL = 'https://reporting.jxck.io/beacon'
    for (const report of reports) {
      navigator.sendBeacon(URL, JSON.stringify(report))
    }
  }, {buffered: true})
  observer.observe()
}

// keybind
function playerKeybind(e) {
  log(e.key, e.target, document.activeElement)

  switch(e.key) {
    case 'Enter':
      // document body 以外の Enter は、コントロールが必要かもしれないので無視
      if (document.activeElement !== document.body) return
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
    case '/':
      log('shortcut')
      const $shortCutDiag = $('dialog.shortcut')
      if ($shortCutDiag.open) {
        $shortCutDiag.close()
        break
      }
      $shortCutDiag.showModal()
      $shortCutDiag.on('click', (e) => {
        log(e.target, $shortCutDiag)
        if (e.target === $shortCutDiag) {
          $shortCutDiag.close()
        }
      })
      break
  }
}

function enablePortal($portal) {
  if ($portal === null) return
  $portal.style.display = 'block'
  const $links = document.querySelectorAll('article li a')
  $links.forEach(($a) => {
    let timer;
    $a.on('mouseover', (e) => {
      log(e)
      timer = setTimeout(() => {
        $portal.src = e.target.href
      }, 1000)
    })

    $a.on('mouseout', (e) => {
      log(e)
      clearTimeout(timer)
    })
  })
  $portal.on('click', (e) => {
    log(e)
    if ($portal.src === '') return
    $portal.classList.add('activate')
    $portal.on('transitionend', (e) => {
      log(e)
      $portal.activate()
    })
  })
}

function enablePlayer() {
  log(MozaicPlayer)
  customElements.define('mozaic-player', MozaicPlayer);
  // document.on('keydown', playerKeybind)
}

function enableWebShare() {
  const $share = $('#share')
  if ($share !== null) {
    $share.style.display = 'block'
    $share.addEventListener('click', (e) => {
      log(e)
      const url   = location.href
      const title = document.title
      const text  = document.querySelector('meta[property="og:description"]').content
      navigator.share({url, title, text})
    })
  }
}

function enableDialog() {
  // <dialog> があったら検索 Form を <dialog> で出す
  const searchDiag = document.importNode($('#search_diag').content, true)
  document.body.appendChild(searchDiag)
  $('.search').on('click', (e) => {
    log(e)
    e.preventDefault()

    // player が使ってるキーバインドを一旦外す
    document.off('keydown', playerKeybind)

    const $dialog = $('dialog.search')
    $dialog.on('click', (e) => {
      log(e.target, $dialog)
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

function enableShortCutDiag() {
  // <dialog> があったら shortcut を <dialog> で出す
  const shortCutDiag = document.importNode($('#shortcut_diag').content, true)
  document.body.appendChild(shortCutDiag)
}



// main
if (window.ReportingObserver) {
  reportingObserver()
}

document.on('DOMContentLoaded', async (e) => {
  // Enable Mozaic Player
  if (window.customElements) {
    enablePlayer()
  } else {
    // custom element 無い場合は controls
    const $audio = $('audio')
    if ($audio !== null) {
      $audio.controls = true
    }
  }

  // Enable Web Share
  if (navigator.share) {
    enableWebShare()
  }

  // Enable Search/ShortCut Dialog
  if (window.HTMLDialogElement) {
    enableDialog()
    enableShortCutDiag()
  }

  if (window.HTMLPortalElement) {
    enablePortal($('portal#preview'))
  }

  if (location.hash === '#clear') {
    const registrations = await navigator.serviceWorker.getRegistrations()
    registrations.forEach(async (registration) => {
      log(registration)
      await registration.unregister()
    })
    return
  }

  const controllerChange = new Promise((resolve, reject) => {
    if (navigator.serviceWorker.controller) {
      resolve(navigator.serviceWorker.controller);
    } else {
      navigator.serviceWorker.addEventListener('controllerchange', (e) => {
        log(e.type)
        resolve(navigator.serviceWorker.controller)
      })
    }
  })

  const registration = await navigator.serviceWorker.register('/assets/js/sw.js', { scope: '/' })
  await Promise.all([
    navigator.serviceWorker.ready,
    controllerChange
  ])

  if (registration.periodicSync) {
    const status = await navigator.permissions.query({name:'periodic-background-sync'});
    log(status)
    if (status.state === 'granted') {
      const tags = await registration.periodicSync.getTags()
      log('remove periodicSync tags', tags)
      await Promise.all(tags.map((tag) => registration.periodicSync.unregister(tag)))
      await registration.periodicSync.register('test-12h', {
        minInterval: 12 * 60 * 60 * 1000 // 12h
      })
    }
  }
})
