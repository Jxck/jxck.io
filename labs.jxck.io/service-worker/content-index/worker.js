console.info('worker')

self.addEventListener('install', async (e) => {
  console.info(e.type, e)

  console.log('index', self.registration.index)

  if ('index' in self.registration) {
    await self.registration.index.add({
      id: '01',
      title: 'title for content',
      description: 'description for content',
      category: 'article',
      icons: [
        {
          src: 'https://logo.jxck.io/jxck.60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          src: 'https://logo.jxck.io/jxck.1200x1200.png',
          sizes: '1200x1200',
          type: 'image/png',
        },
      ],
      launchUrl: 'https://blog.jxck.io'
    })
  }

  e.waitUntil(skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.info(e.type, e)
  e.waitUntil(self.clients.claim())
})
