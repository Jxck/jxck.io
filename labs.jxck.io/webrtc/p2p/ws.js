export class WS extends EventEmitter {
  constructor(url) {
    super();

    this.ws = new WebSocket(url);

    this.ws.onopen = (e) => {
      this.emit('open', e);
    };

    this.ws.onmessage = (e) => {
      this.emit('message', JSON.parse(e.data));
    };

    this.ws.onclose = (e) => {
      this.emit('close', e);
    };

    this.ws.onerror = (e) => {
      this.emit('error', e);
    };
  }

  send(message) {
    this.ws.send(JSON.stringify(message));
  }

  close(code, reason) {
    this.ws.close(code, reason);
  }
}
