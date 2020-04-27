// Enable debug log adding #debug into url
const log = location.hash === '#debug' ? console.log.bind(console) : () => {}
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on   = EventTarget.prototype.addEventListener
EventTarget.prototype.off  = EventTarget.prototype.removeEventListener
EventTarget.prototype.emit = EventTarget.prototype.dispatchEvent

function reportingObserver() {
  log('ReportingObserver')
  /**@type{ReportingObserver} */
  const observer = new ReportingObserver((reports, observer) => {
    /**@type{string} */
    const URL = 'https://reporting.jxck.io/beacon'
    for (const report of reports) {
      navigator.sendBeacon(URL, JSON.stringify(report))
    }
  })
  observer.observe()
}

// keybind
async function playerKeybind(e) {
  log(e.key, e.target, document.activeElement)
  const $mozaic_player = $('mozaic-player')

  switch(e.key) {
    case 'Enter':
      // document body 以外の Enter は、コントロールが必要かもしれないので無視
      if (document.activeElement !== document.body) return
      log('play/pause')
      $mozaic_player.play()
      e.preventDefault()
      break
    case 'ArrowLeft':
      log('back')
      $mozaic_player.back()
      break
    case 'ArrowRight':
      log('forward')
      $mozaic_player.forward()
      break
    case '/':
      log('shortcut')
      /**@type{HTMLDialogElement}*/
      const $shortCutDiag = $('dialog.shortcut')
      if ($shortCutDiag.open) {
        $shortCutDiag.close()
        break
      }
      $shortCutDiag.showModal()
      $shortCutDiag.on('click', (e) => {
        if (e.target === $shortCutDiag) {
          $shortCutDiag.close()
        }
      })
      break
  }
}

async function enablePortal() {
  /**@type{HTMLPortalElement}*/
  const $portal = $('portal#preview')
  if ($portal === null) return
  $portal.style.display = 'block'

  /**@type{NodeListOf<Element>}*/
  const $links = $$('article li a')
  $links.forEach(($a) => {
    let timer
    $a.on('mouseover', (e) => {
      timer = setTimeout(() => {
        $portal.src = /**@type{HTMLAnchorElement}*/(e.target).href
      }, 1000)
    })
    $a.on('mouseout', (e) => {
      clearTimeout(timer)
    })
  })
  $portal.on('click', (e) => {
    if ($portal.src === '') return
    $portal.classList.add('activate')
    $portal.on('transitionend', (e) => {
      $portal.activate()
    })
  })
}

async function enablePlayer() {
  const MozaicPlayer = await import('./mozaic-player.js')
  customElements.define('mozaic-player', MozaicPlayer.default)
  document.on('keydown', playerKeybind)
  $$('background-fetch').forEach(async ($bgfetch) => {
    $bgfetch.classList.remove('disabled')
  })
}

async function enableWebShare() {
  /**@type{HTMLLIElement}*/
  const $share = $('#share')
  if ($share !== null) {
    $share.classList.remove('disabled')
    $share.on('click', (e) => {
      const url   = location.href
      const title = document.title
      const $meta = /**@type{HTMLMetaElement}*/($('meta[name=description]'))
      const text  = $meta.content
      navigator.share({url, title, text})
    })
  }
}

// <dialog> があったら shortcut を <dialog> で出す
async function enableShortCutDiag() {
  /**@type{Node}*/
  const shortCutDiag = document.importNode($('#shortcut_diag').content, true)
  document.body.appendChild(shortCutDiag)
}

async function enableBackgroundFetch(registration) {
  log('registration.backgroundFetch')
  const BackgroundFetch = await import('./background-fetch.js')
  customElements.define('background-fetch', BackgroundFetch.default)
}

async function enablePeriodicSync(registration) {
  /**@type{PermissionStatus}*/
  const status = await navigator.permissions.query({name:'periodic-background-sync'})
  if (status.state === 'granted') {
    /**@type{DOMString[]}*/
    const tags = await registration.periodicSync.getTags()
    log('remove periodicSync tags', tags)
    await Promise.all(tags.map((tag) => registration.periodicSync.unregister(tag)))
    await registration.periodicSync.register('test-3h', {
      minInterval: 12 * 60 * 60 * 1000 // 12h
    })
  }
}

/**
 * @param {BeforeInstallPromptEvent} install_prompt
 */
async function enableBeforeInstallPrompt(install_prompt) {
  install_prompt.preventDefault()
  /**@type{HTMLLIElement}*/
  const $install = $('#install')
  $install.classList.remove('disabled')
  $install.on('click', async () => {
    install_prompt.prompt()
    /**@type{string}*/
    const choice = await install_prompt.userChoice
    console.log(choice)
  })
}

// main
if (window.ReportingObserver) {
  reportingObserver()
}

document.on('DOMContentLoaded', async (e) => {
  if (navigator.clearAppBadge) {
    navigator.clearAppBadge()
  }

  // Enable Mozaic Player
  if (window.customElements) {
    await enablePlayer()
  } else {
    // custom element 無い場合は controls
    /**@type{HTMLAudioElement}*/
    const $audio = $('audio')
    if ($audio !== null) {
      $audio.controls = true
    }
  }

  // Enable Web Share
  if (navigator.share) {
    await enableWebShare()
  }

  // Enable ShortCut Dialog
  if (window.HTMLDialogElement) {
    await enableShortCutDiag()
  }

  if (window.HTMLPortalElement) {
    await enablePortal()
  }

  /**@type{ServiceWorkerRegistration}*/
  const registration = await navigator.serviceWorker.register('/assets/js/sw.js', { scope: '/' })
  await navigator.serviceWorker.ready

  if (registration.backgroundFetch) {
    await enableBackgroundFetch(registration)
  }

  if (registration.periodicSync) {
    await enablePeriodicSync(registration)
  }

  window.on('beforeinstallprompt', async (/**@type{BeforeInstallPromptEvent}*/e) => {
    await enableBeforeInstallPrompt(e)
  })
})
