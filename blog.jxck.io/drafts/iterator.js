class Range {
  #from;
  #to;
  constructor(from = 0, to = 0) {
    this.#from = from;
    this.#to = to;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.#from > this.#to) {
      return { done: true };
    }
    return { done: false, value: this.#from++ };
  }
}
for (const n of new Range(10, 20)) {
  console.log(n);
}

class Fibonacci extends Iterator {
  #a;
  #b;
  constructor() {
    super();
    this.#a = 0;
    this.#b = 1;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const value = this.#a;
    if (value > 1000) return { done: true };
    this.#a = this.#b;
    this.#b += value;
    return { done: false, value };
  }
}

const fibonacci = new Fibonacci().filter((n) => n < 10);
for (const n of fibonacci) {
  // console.log(n);
}
