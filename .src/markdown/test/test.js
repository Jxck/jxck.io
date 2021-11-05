import { encode, decode, traverse, node, dump } from "../index.js"
import { deepStrictEqual } from "assert";
import fs from "fs";

const text = fs.readFileSync("./test.txt").toString()
const cases = text.split(`=`.repeat(30))
  .filter((line) => {
    return !line.startsWith("\n//")
  })
  .map((block) => {
    const [md, expected] = block.split(`-`.repeat(30))
    return [md, expected.trim()]
  })

for (const [md, expected] of cases) {
  try {
    // console.log(md)
    const ast = decode(md)
    // dump(ast)
    const { html, toc } = encode(ast, { base: `./` })
    // console.log({expected})
    // console.log({html})
    deepStrictEqual(html, expected + `\n`, html)
    console.log(`.`)
  } catch ({ message }) {
    deepStrictEqual(message, expected, expected)
  }
}

function api() {
  const root = node({ name: `root`, type: `block` })

  const div = node({ name: `div`, type: `block` })
  div.addText(`test div`)
  root.appendChild(div)

  const p = node({ name: `p`, type: `block` })
  p.addText(`test p`)
  root.appendChild(p)

  const pre = node({ name: `pre`, type: `block` })
  pre.addText(`test pre`)
  p.insertBefore(pre)

  deepStrictEqual(root.children.map((child) => child.name), [`div`, `pre`, `p`])

  const walk = []
  traverse(root, {
    enter: (node) => {
      walk.push(`enter:${node.name}`)
      return node
    },
    leave: (node) => {
      walk.push(`leave:${node.name}`)
      return node
    }
  })
  deepStrictEqual(walk, [
    `enter:div`,
    `enter:text`,
    `leave:text`,
    `leave:div`,
    `enter:pre`,
    `enter:text`,
    `leave:text`,
    `leave:pre`,
    `enter:p`,
    `enter:text`,
    `leave:text`,
    `leave:p`
  ])
}

api()
