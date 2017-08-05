console.log('master');

navigator.serviceWorker.register('worker.js')
  .then((registration) => {
    const ID = btoa(Math.random());
    console.log(ID);
    return registration.navigationPreload.setHeaderValue(ID).then(() => {
      return Promise.resolve(registration)
    })
  })
  .then((registration) => {
    return registration.navigationPreload.getState()
  })
  .then((state) => {
    console.log(state.enabled)
    console.log(state.headerValue)
  })
