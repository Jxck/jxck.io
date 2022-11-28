import { encode, decode, traverse, node, Node, to_toc, dump } from "../index.js"
import { format } from "../formatter.js";
import { deepStrictEqual } from "assert";
import fs from "fs";

function test_case() {
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
      const html = encode(ast)
      // console.log({expected})
      // console.log({html})
      deepStrictEqual(html, expected + `\n`, html)
      console.log(`.`)
    } catch (err) {
      // console.error(err)
      deepStrictEqual(err.message, expected, expected)
    }
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

function formatter() {
  const before_path = `formatter.before.md`
  const after_path = `formatter.after.md`
  const before = fs.readFileSync(before_path, { encoding: `utf-8` })
  const after = fs.readFileSync(after_path, { encoding: `utf-8` })
  deepStrictEqual(format(before), after)
}

function util() {
  function h(level, text) {
    const attr = new Map([[`id`, text]])
    const children = [node({ name: `text`, type: `inline`, text })]
    return node({ name: `heading`, type: `inline`, attr, level, children })
  }
  const headings = [
    h(1, `a`),
    h(2, `b`),
    h(3, `c`),
    h(2, `d`),
    h(1, `e`),
    h(2, `f`),
    h(2, `g`),
    h(3, `h`),
    h(3, `i`),
    h(2, `j`),
    h(1, `k`),
  ];
  const toc = to_toc(headings)
  const actual = encode(toc)

  const expected = `<ul>
  <li><a href="#a">a</a>
  <ul>
    <li><a href="#b">b</a>
    <ul>
      <li><a href="#c">c</a>
    </ul>
    <li><a href="#d">d</a>
  </ul>
  <li><a href="#e">e</a>
  <ul>
    <li><a href="#f">f</a>
    <li><a href="#g">g</a>
    <ul>
      <li><a href="#h">h</a>
      <li><a href="#i">i</a>
    </ul>
    <li><a href="#j">j</a>
  </ul>
  <li><a href="#k">k</a>
</ul>`
  console.assert(actual, expected)
}

test_case()
api()
formatter()
util()

console.log("[done] test.js")