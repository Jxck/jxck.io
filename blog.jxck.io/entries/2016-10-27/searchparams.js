const URL = require('url').URL;

const u = new URL('https://jxck.io?log=warn&lang=ja');
const searchParams = u.searchParams;
searchParams.get('log') // "warn"
searchParams.getAll('log') // ["warn"]
searchParams.delete('log') // undefined
searchParams.has('log') // false
searchParams.append('debug', true) // undefined
searchParams.toString() // "lang=ja&debug=true"

for ([k, v] of searchParams) {
  console.log(k, v);
  // lang ja
  // debug true
}
