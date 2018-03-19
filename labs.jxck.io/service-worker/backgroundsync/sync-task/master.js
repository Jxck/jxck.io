//navigator.serviceWorker.register('worker.js').then((registration) => {
//  return navigator.serviceWorker.ready;
//}).then((registration) => {
//  // register sync
//  return registration.sync.register('save-task');
//}).catch(console.error.bind(console));



new Promise((done, fail) => {
  let request = indexedDB.open('tasks');
  request.addEventListener('error', fail);
  request.addEventListener('success', (e) => {
    done(e.target.result);
  });
}).then((db) => {
  console.log(db);

  let store = db.createObjectStore('task', { keyPath: 'key' });

  objectStore.createIndex('key', 'key', { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers');
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  };

}).catch(console.error.bind(console));
