#!/usr/bin/env node
import { decode, spaces, Node, dump } from "./markdown/index.js"
import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import process from "process"

const FULL_HALF = /(?<full>[\p{sc=Hira}\p{sc=Kana}\p{sc=Han}]+)(?<half>[a-zA-Z0-9]+)/gu
const HALF_FULL = /(?<half>[a-zA-Z0-9]+)(?<full>[\p{sc=Hira}\p{sc=Kana}\p{sc=Han}]+)/gu

/**
 * 全角と半角の間にスペースを入れる
 * @param {string} text
 * @returns {string}
 */
function spacer(text) {
  return text
    .replaceAll(FULL_HALF, (all, left, right) => {
      return `${left} ${right}`
    })
    .replaceAll(HALF_FULL, (all, left, right) => {
      return `${left} ${right}`
    })
}

/**
 * 全角 2 文字、半角 1 文字としてカウント
 * @param {string} text
 * @returns {number}
 */
function count(text) {
  return [...text].reduce((count, char) => {
    // スペースから ~ までなら半角
    return count + (char.match(/[ -~]/) ? 1 : 2)
  }, 0)
}

/**
 * @param {Node} node
 * @returns {string}
 */
function table(node) {
  /**
   * @typedef {Object} Format
   * @property {string} align
   * @property {number} len
   */

  /**
   * { align, len } のタプルを積んでいく
   * @type {Array.<Format>}
   */
  const format = []

  /**
   * 列のヘッダ
   * @type {Array.<string>}
   */
  const thead = node.children.shift().children.shift().children.map((td, i) => {
    const text = td.children.map((child) => serialize(child)).join(``)
    const align = td.attr.align
    const len = count(text)
    format.push({ align, len })
    return text
  })

  /**
   * 行の各値
   * @type {Array.<Array.<string>>}
   */
  const tbody = node.children.shift().children.map((tr) => {
    return tr.children.map((td, i) => {
      const text = td.children.map((child) => serialize(child)).join(``)
      const len = count(text)
      if (format.at(i).len < len) format.at(i).len = len
      return text
    })
  })

  /**
   * 行ヘッダのシリアライズ
   * @type {string} th
   */
  const th = thead.map((th, i) => {
    const { align, len } = format.at(i)
    const diff = len - count(th)
    return ` ${th}${" ".repeat(diff)} `
  }).join(`|`)

  /**
   * ここまでに計算した長さで separator を生成
   * |:----|----:|
   * @type {string} separator
   */
  const separator = format.map(({ align, len }) => {
    if (align === `left`) {
      return `:`.padEnd(len + 2, `-`)
    }
    if (align === `right`) {
      return `:`.padStart(len + 2, `-`)
    }
    if (align === `center`) {
      return `:${"-".repeat(len)}:`
    }
  }).join(`|`)

  /**
   * 行ヘッダのシリアライズ
   * @type {Array.<string>} td
   */
  const td = tbody.map((line) => {
    return line.map((td, i) => {
      const { align, len } = format.at(i)
      const diff = len - count(td)
      if (align === `right`) {
        return ` ${" ".repeat(diff)}${td} `
      }
      return ` ${td}${" ".repeat(diff)} `
    }).join(`|`)
  })

  td.unshift(separator)
  td.unshift(th)
  return `|${td.join("|\n|")}|\n`
}

/**
 * @param {Node} node
 * @returns string
 */
function li(node) {
  // grouping lines into array
  // [inline, inline, block, block, inline]
  // to
  // [[inline, inline], block, block, [inline]]
  const lines = node.children.reduce((lines, child) => {
    if (child.type === `block`) {
      lines.push(child)
      return lines
    }
    if (child.type === `inline`) {
      const last = lines.pop()
      if (Array.isArray(last)) {
        last.push(child)
        lines.push(last)
        return lines
      }
      else if (last === undefined) {
        lines.push([child])
        return lines
      }
      else {
        lines.push(last)
        lines.push([child])
        return lines
      }
    }
  }, [])

  const symbol = (() => {
    // ul の場合は `- a`
    if (node.parent.name === `ul`) return `- `
    // ol の場合は `1. a`
    const num = node.parent.children.indexOf(node)
    return `${num + 1}. `
  })()

  if (lines.length === 1 && Array.isArray(lines[0])) {
    // children に inline のみしかないので一列で閉じなし
    return `${spaces(node.level * 2)}${symbol}${lines[0].map((child) => serialize(child)).join(``)}\n`
  }

  // block と inline が同居している場合
  const child = lines.map((line) => {
    if (Array.isArray(line)) {
      // inline はまとめて一行
      return `${line.map((child) => serialize(child)).join(``)}\n`
    } else {
      // block は他とくっつける
      return serialize(line)
    }
  }).join(``)

  return `${spaces(node.level * 2)}${symbol}${child}`
}

/**
 * @param {Node} node
 * @param {Object} [option]
 * @returns {string}
 */
function serialize(node, option) {
  const name = node.name
  // console.log({ name })

  const children = node.children.map((child) => serialize(child))

  if (name === `text`) {
    // console.log(`${node.parent.name} > ${node.name}`)

    let text = node.text
    // console.log({ before: text })

    if ([`code`, `pre`, `html`].includes(node.parent.name) === false) {
      // escape する
      text = text.replace(/([\*\`\<])/g, '\\$1')
    }

    // console.log({ after: text })
    return spacer(text)
  }
  if (name === `em`) /*      */ return `*${children.join(``)}*`
  if (name === `strong`) /*  */ return `**${children.join(``)}**`
  if (name === `code`) /*    */ return `\`${children.join(``).replaceAll("`", "\\`")}\``
  if (name === `dt`) /*      */ return `${children.join(``)}\n`
  if (name === `dd`) /*      */ return `: ${children.join(``)}\n`
  if (name === `table`) /*   */ return table(node)
  if (name === `li`) /*      */ return li(node)
  if (name === `p`) /*       */ return `${children.join(``)}\n`

  if (name === `figcaption`) return `Caption: ${node.text.trim()}\n`

  if (name === `img`) {
    const { alt, src, title } = node.attr
    if (title) {
      return `![${alt}](${src} "${title}")`
    }
    return `![${alt}](${src})`
  }

  if (name === `a`) {
    const href = node.attr.href
    const text = children.join(``)
    if (href.startsWith(`chrome://`)) {
      if (href === text) return `<${href}>`
      return `[${text}](${href})`
    }
    if (href === text) return href
    return `[${text}](${href})`
  }

  if (name === `headding`) {
    /** headding の手前が headding 以外だったら改行入れたい */
    // # aaa
    // (<< ここは改行x1 )
    // ## bbb
    //
    // ccc
    // (<< ここは改行x2)
    //
    // ## ddd
    //
    // eee
    // (<< ここも改行x2)
    //
    // ### fff
    //
    // ggg

    // 自分が所属する section
    const section = node.parent
    // もう一段上の section
    const grand = section.parent
    // その section の中で自分のポジション
    const i = grand.children.indexOf(section)
    // デフォルトでは 2 回改行するが
    let space = `\n`
    if (i > 0) { // 自分より前に要素があり
      const prevsection = grand.children.at(i - 1)
      // それが headding だった場合は
      if (prevsection.name === `headding`) {
        // 1 回しか改行しない
        space = ``
      }
    }
    return `${space}${`#`.repeat(node.level)} ${children.join(``)}\n`
  }

  if (name === `pre`) {
    const pre = "```"
    const lang = node.attr.lang || ``
    const path = node.attr.path ? `:${node.attr.path}` : ``
    const code = children.join(`\n`).replaceAll("```", "\\`\\`\\`")
    if (code.length === 0) return `${pre}${lang}${path}\n${pre}\n`
    return `${pre}${lang}${path}\n${code}\n${pre}\n`
  }

  // Print HTML as-is
  if (name === `html`) {
    return node.children.map(({ text }) => `${text}\n`).join(``)
  }

  if (name === `section`) {
    // console.log({ level: node.level, parent: node.parent.level })
    // dump(children)
    return `${children.join(`\n`)}`
  }

  if (name === `blockquote`) {
    return `> ${children.join(`> `)}`
  }

  // other: ul, ol
  return children.join(``)
}

/**
 * Convert Markdown AST to Markdown
 * @param {string} md
 * @param {Object} [option]
 * @returns {string}
 */
export function format(md, option) {
  const ast = decode(md)
  return serialize(ast, option).trim()
}


async function test() {
  const dir = dirname(new URL(import.meta.url).pathname)
  let md = await readFile(`${dir}/formatter.md`, { encoding: `utf-8` })
  // console.log(md)

  // md = `- [function\*](https://developer.com)`
  const formatted = format(md)
  // console.log(formatted)
  // console.log({ formatted })
}
// test()

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pwd = process.env.PWD
  /**@type{Array.<string>}*/
  const files = process.argv.slice(2)

  files.forEach(async (file) => {
    console.log(file)
    const filepath = join(pwd, file)
    const original = await readFile(filepath, { encoding: `utf-8` })
    const formatted = format(original)
    if (original !== formatted) {
      await writeFile(filepath, formatted)
    }
  })
}
