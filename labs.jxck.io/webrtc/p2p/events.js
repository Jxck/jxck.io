class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(type, callback) {
    const listeners = this.listeners.get(type) || [];
    this.listeners.set(type, [...listeners, callback]);
    return this;
  }

  off(type, callback) {
    if (!this.listeners.has(type)) return;

    if (!callback) {
      this.listeners.delete(type);
      return this;
    }

    const listeners = this.listeners.get(type) || [];
    const filtered = listeners.filter((listener) => {
      return listener !== callback;
    });
    this.listeners.set(type, filtered);
    return this;
  }

  emit(type, ...args) {
    if (!this.listeners.has(type)) return;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach((listener) => { listener.apply(this, args) });
    return this;
  }
}

function _test() {
  class Foo extends EventEmitter {
  }

  let foo = new Foo();

  foo.on('test', (...e) => {
    console.log('test', e);
  });

  foo.emit('test');
  foo.emit('test', 1);
  foo.emit('test', 1, 2);

  let cb1 = () => console.log('111');
  let cb2 = () => console.log('222');
  let cb3 = () => console.log('333');

  foo.on('del', cb1);
  foo.on('del', cb2);
  foo.on('del', cb3);
  foo.emit('del');
  console.log('========');
  foo.off('del', cb1);
  foo.emit('del');
  console.log('========');
  foo.off('del');
  foo.emit('del');
}
