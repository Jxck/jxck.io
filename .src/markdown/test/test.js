import { encode, decode, traverse, Node, node, dump } from "../index.js"
import { deepStrictEqual } from "assert";
import fs from "fs";

function testcase() {
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
      const { html, toc } = encode(ast)
      // console.log({expected})
      // console.log({html})
      deepStrictEqual(html, expected + `\n`, html)
      console.log(`.`)
    } catch (err) {
      deepStrictEqual(err.message, expected, expected)
    }
  }
}
testcase()

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
  root.appendChild(pre)

  deepStrictEqual(root.children.map((child) => child.name), [`div`, `p`, `pre`])

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
    `enter:p`,
    `enter:text`,
    `leave:text`,
    `leave:p`,
    `enter:pre`,
    `enter:text`,
    `leave:text`,
    `leave:pre`,
  ])
}

api()

console.log("[done] test.js")