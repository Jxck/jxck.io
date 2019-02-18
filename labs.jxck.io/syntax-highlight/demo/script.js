import file from fs

function callback(err, file) {
  if (err) return console.error(err);

  /* ここで色々する */
};

file.open(callback);

class Test extends EventEmitter {
  constructor(data) {
    this.data = data
  }

  jquery() {
    $('body').innerHTML = "alert('xss')"
  }

  promise() {
    return Promise.resolve('foo')
  }
}

const test = new Test()
test.promise().then((e) => {
  console.log(e)
})

export module;
