const ok = true

// a => token(/^a/)
function token(reg) {
  return (rest) => {
    const result = reg.exec(rest)
    if (result === null) {
      return {ok: false, rest}
    } else {
      const value = result[0]
      return {ok, value, rest: rest.substr(value.length)}
    }
  }
}

// *(a b) => repeat(0, Infinity, list([a(), b()]))
function repeat(min, max, fn) {
  return (rest) => {
    const value = []
    const found = 0
    const orig  = rest
    while(true) {
      const result = fn(rest)
      if (result.ok) {
        value.push(result.value)
        rest = result.rest
        if (value.length === max) break
      } else {
        break
      }
    }

    if (value.length < min) {
      return {ok: false, rest: orig}
    } else {
      return {ok, value, rest}
    }
  }
}


// (a b c) => list([a(), b(), c()])
function list(fns) {
  return (rest) => {
    const value = []
    const orig  = rest
    for (let i = 0; i < fns.length; i ++) {
      const result = fns[i](rest)
      if (result.ok === false) {
        return {ok: false, rest: orig}
      }
      value.push(result.value)
      rest = result.rest
    }
    return {ok, value, rest}
  }
}


// ALPHA = A-Z / a-z
const alpha = token(/^[a-zA-Z]/)
console.log(alpha("a"))

// DIGIT = "0"/"1"/"2"/"3"/"4"/"5"/"6"/"7"/"8"/"9"
const digit = token(/^[0-9]/)
console.log(digit("0"))

const number = repeat(1, 1024, digit)
console.log(number("0123"))


const crlf = list([token(/\n/), token(/\r/)])
console.log(crlf("\n\r"))

