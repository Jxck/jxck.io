const v = 2;
console.info(` worker${v}`);

self.addEventListener('install', (e) => {
  console.info(` install${v}`);
  //e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${v}`);
});
