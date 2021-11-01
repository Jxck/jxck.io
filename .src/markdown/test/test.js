import { encode, decode } from "../index.js"
import { deepStrictEqual } from "assert";
import fs from "fs";


function dump(ast) {
  console.log(JSON.stringify(ast, (key, value) => {
    if (key === `parent`) return undefined
    return value
  }, `  `))
}

function integration_test() {
  const file = fs.readFileSync("./test.md")
  const ast = decode(file.toString())
  const { html, toc } = encode(ast)
  fs.writeFileSync("./tmp.html", html)
}
// integration_test()

const text = fs.readFileSync("./test.txt").toString()
const cases = text.split('='.repeat(30))
  .filter((line) => {
    return !line.startsWith("\n//")
  })
  .map((block) => {
    const [md, expected] = block.split('-'.repeat(30))
    return [md, expected.trim()]
  })

for (const [md, expected] of cases) {
  try {
    // console.log(md)
    const ast = decode(md)
    // dump(ast)
    const { html, toc } = encode(ast, { base: './' })
    // console.log({expected})
    // console.log({html})
    deepStrictEqual(html, expected + '\n', html)
    console.log('.')
  } catch ({ message }) {
    deepStrictEqual(message, expected, expected)
  }
}