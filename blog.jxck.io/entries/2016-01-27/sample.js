class Test {
  constructor(arg) {
    this.arg = arg
  }
  print() {
    console.log(this.arg)
  }
}

const test = new Test('hello')
test.print() // hello
