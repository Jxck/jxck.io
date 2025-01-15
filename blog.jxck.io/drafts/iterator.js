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
// 10 ~ 20 までの連続値を生成
for (const n of new Range(10, 20)) {
  // console.log(n);
}

class FibonacciIterator extends Iterator {
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
    this.#a = this.#b;
    this.#b += value;
    return { done: false, value };
  }
}

function* FibonacciGenerator() {
  let a = 0, b = 1
  while (true) {
    const value = a
    yield value
    a = b
    b += value
  }
}

const fib = FibonacciGenerator()
for (const n of fib) {
  // console.log(n)
  break
}




const arr = [1, 2, 3]
for (const n of arr) {
  console.log(n)
}
const itr = arr[Symbol.iterator]()

console.log(itr)

console.log(itr.next())
console.log(itr.next())
console.log(itr.next())
console.log(itr.next())

console.log(FibonacciGenerator()[Symbol.iterator]())

// 使用例
const fib10 = FibonacciGenerator().take(10).toArray()
// const fib10 = new FibonacciIterator().take(10).toArray()
//console.log(fib10)
// for (const n of fibGen) {
//   console.log(n)
// }

