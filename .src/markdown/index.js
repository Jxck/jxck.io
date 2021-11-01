`use strict`;
import { readFileSync, statSync } from "fs";

/**
 * @typedef {Object} Serialized
 * @property {string} html
 * @property {Array.<Object>} toc
 * @property {Array.<string>} tags
*/

/**
 * @typedef {Object} Toc
 * @property {number} level
 * @property {string} id
 * @property {string} hashed
 * @property {number} count
 * @property {string} text
 */


/**
 * @param {string} str
 * @returns {string}
 */
function htmlescape(str) {
  return str
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`)
    .replace(/'/g, `&apos;`)
    .replace(/^--- $/g, `&mdash; `) // for <blockquote>
    .replace(/\\\|/g, `|`) // TODO: あとで消す
}

/**
 * unescape markdown syntax
 * @param {string} str
 * @returns string
 */
function unescape(str) {
  return str
    .replace(/\\\*/g, `*`)
    .replace(/\\\`/g, '`')
    .replace(/\\\!/g, `!`)
    .replace(/\\\[/g, `[`)
    .replace(/\\\]/g, `]`)
    .replace(/\\\</g, `<`)
    .replace(/\\\>/g, `>`)
    .replace(/\\\(/g, `(`)
    .replace(/\\\)/g, `)`)
}

/**
 * Calculate hash from mtime
 * @param {string} path
 * @returns {string}
 */
export function cache_busting(path) {
  const mtime = statSync(path).mtime
  const y = (mtime.getFullYear() % 100).toString().padStart(2, `0`)
  const m = (mtime.getMonth() + 1).toString().padStart(2, `0`)
  const d = (mtime.getDate()).toString().padStart(2, `0`)
  const H = (mtime.getHours()).toString().padStart(2, `0`)
  const M = (mtime.getMinutes()).toString().padStart(2, `0`)
  const S = (mtime.getSeconds()).toString().padStart(2, `0`)
  return `${y}${m}${d}_${H}${M}${S}`
}

/**
 * @typedef {Object} Attr
 * @prop {string} [title]
 * @prop {string} [width]
 * @prop {string} [height]
 * @prop {string} [cite]
 * @prop {string} [lang]
 * @prop {string} [path]
 * @prop {string} [type]
 * @prop {string} [src]
 * @prop {string} [srcset]
 * @prop {string} [url]
 * @prop {string} [alt]
 * @prop {Array.<"center" | "left" | "right">} [aligns]
 * @prop {"center" | "left" | "right"} [align]
 * @prop {Array.<string>} [tags]
 */

/**
 * @typedef {Object} NodeParam
 * @prop {string} name
 * @prop {string} type
 * @prop {Node} [parent]
 * @prop {Array.<Node>} [children]
 * @prop {number} [level]
 * @prop {string} [text]
 * @prop {Attr} [attr]
 */

/**
 * @param {NodeParam} param
 * @returns {Node}
 */
function node({ name, type, parent = null, children = [], level = undefined, text = undefined, attr = undefined }) {
  return new Node(
    name,
    type,
    parent,
    children,
    level,
    text,
    attr,
  )
}

class Node {
  /**
   * @param {string} name
   * @param {string} type
   * @param {Node} parent
   * @param {Array.<Node>} children
   * @param {number} level
   * @param {string} text
   * @param {Attr} attr
   */
  constructor(name, type, parent = null, children = [], level = undefined, text = undefined, attr = undefined) {
    this.name = name
    this.type = type
    this.parent = parent
    this.level = level
    this.text = text
    this.attr = attr
    this.children = children
  }

  /**
   * @param {Node} child
   */
  appendChild(child) {
    child.parent = this
    this.children.push(child)
  }

  /**
   * @returns {Node}
   */
  lastChild() {
    return this.children[this.children.length - 1]
  }

  /**
   * @param {string} text
   */
  addText(text) {
    const child = node({ name: `text`, type: `inline`, text })
    this.appendChild(child)
  }
}

/**
 * @typedef {Object} EncodeOption
 * @prop {string} base
 * @prop {number} [indent]
 */

/**
 * Convert Markdown AST to HTML
 * @param {Node} node
 * @param {EncodeOption} [option]
 * @returns {Serialized}
 */
export function encode(node, option) {

  /** @type {Array.<string>} */
  const tags = []

  /** @type {Array.<Toc>} */
  const toc = []

  /**
   * @param {number} indent
   * @returns {string}
   */
  function spaces(indent) {
    return ` `.repeat(indent)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function text(node, indent) {
    // unescape back slash (/)
    const text = htmlescape(unescape(node.text))
    return `${spaces(indent)}${text}`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function headding(node, indent) {
    const name = `h${node.level}`
    let text = node.children.map((child) => serialize(child)).join(``)
    if (node.level === 1) {
      // global tags に保存
      node.attr.tags.forEach((tag) => {
        tags.push(tag)
      })
    }

    /**
     * @param {Node} node
     * @returns {string}
     */
    function serialize_text(node) {
      if (node.name === `text`) return node.text
      return node.children.map((child) => serialize_text(child)).join(``)
    }

    const id = serialize_text(node)
      .replace(/[!"#$%&'()*+,/:;<=>?\[\\\]^{|}~]/g, ``) // 記号は .-_ のみ
      .replace(/[、。「」]/g, ``) // 全角記号も消す
      .replace(/ /g, `-`)
      .toLocaleLowerCase()

    // ID が既出な場合は、一意にするために _連番 を後ろにつける
    const prev = toc.reduce((last, curr) => {
      // id が同じやつを頭からたどっていく
      // TODO: 後ろから見れば良さそう
      return curr.id === id ? curr : last
    }, null)
    const count = prev ? prev.count + 1 : 0
    const suffix = count === 0 ? `` : `-${count}` // TODO _ に直す
    const hashed = `${id}${suffix}`

    // TOC に積む
    toc.push({ level: node.level, id, hashed, count, text })

    if (node.level === 1) {
      // href は "" にすることで自身の URL を示す
      return `${spaces(indent)}<h1><a href="">${text}</a></${name}>\n`
    } else {
      return `${spaces(indent)}<${name} id="${hashed}"><a href="#${hashed}">${text}</a></${name}>\n`
    }
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function a(node, indent) {
    const name = node.name
    const url = unescape(node.attr.url)
    return `<${name} href="${url}">${node.children.map((child) => serialize(child)).join(``)}</${name}>`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function code(node, indent) {
    const code = node.children.map((child) => child.text).join(``)
    const escaped = htmlescape(unescape(code))
    return `<code translate=no>${escaped}</code>`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function pre(node, indent) {
    const lang = node.attr.lang ? ` class=${node.attr.lang}` : ``
    const path = node.attr.path

    const code = path ?
      readFileSync(option.base + path).toString()
      :
      node.children.map((child) => child.text).join(`\n`)

    return [
      // TODO: remove trimEnd()
      `${spaces(indent)}<pre${lang}><code translate=no>`,
      htmlescape(code).trimEnd(),
      `</code></pre>\n`
    ].join(``)
  }

  /**
   * td & th
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function td(node, indent) {
    const name = node.name
    const { align } = node.attr
    return [
      `${spaces(indent)}<${name} class=align-${align}>`,
      node.children.map((child) => serialize(child)).join(``),
      `</${name}>\n`,
    ].join(``)
  }

  /**
   * dt & dd
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function dt(node, indent) {
    const name = node.name
    return [
      `${spaces(indent)}<${name}>`,
      node.children.map((child) => serialize(child)).join(``),
      `\n`
    ].join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function mix_inline(node, indent) {
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

    if (lines.length === 1 && Array.isArray(lines[0])) {
      // children に inline のみしかないので一列で閉じなし
      return `${spaces(indent)}<${node.name}>${lines[0].map((child) => serialize(child)).join(``)}\n`
    }

    // block と inline が同居している場合
    const child = lines.map((line) => {
      if (Array.isArray(line)) {
        // inline はまとめて一行
        return `${spaces(indent + 2)}${line.map((child) => serialize(child)).join(``)}\n`
      } else {
        // block はインデント
        return serialize(line, indent + 2)
      }
    }).join(``)

    // その結果を改行した <open></close> で閉じる
    return [
      `${spaces(indent)}<${node.name}>\n`,
      `${child}`,
      `${spaces(indent)}</${node.name}>\n`
    ].join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function source(node, indent) {
    if (node.parent.name === `picture`) {
      const { type, srcset } = node.attr
      const query = srcset.startsWith(`http`) ? `` : `?${cache_busting(option.base + srcset)}`
      return `${spaces(indent)}<source type=${type} srcset=${srcset}${query}>\n`
    } else {
      const { type, src } = node.attr
      const query = src.startsWith(`http`) ? `` : `?${cache_busting(option.base + src)}`
      return `${spaces(indent)}<source type=${type} src=${src}${query}>\n`
    }
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function img(node, indent) {
    const { src, alt, width, height, title } = node.attr
    const query = src.startsWith("http") ? `` : `?${cache_busting(option.base + src)}`
    return `${spaces(indent)}<img loading=lazy decoding=async src=${src}${query} alt="${alt}" title="${title}" width=${width} height=${height}>\n`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function root(node, indent) {
    return node.children.map((child) => serialize(child, indent)).join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function section(node, indent) {
    const name = node.level === 1 ? `article` : `section`
    return [
      `${spaces(indent)}<${name}>\n`,
      node.children.map((child) => serialize(child, indent + 2)).join(``),
      `${spaces(indent)}</${name}>\n`,
    ].join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function blockquote(node, indent) {
    const cite = (node?.attr?.cite) ? ` cite="${node.attr.cite}"` : ``
    return [
      `${spaces(indent)}<blockquote${cite}>\n`,
      node.children.map((child) => serialize(child, indent + 2)).join(``),
      `${spaces(indent)}</blockquote>\n`,
    ].join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function video(node, indent) {
    const { title, width, height } = node.attr
    return [
      `${spaces(indent)}<video title="${title}" width=${width} height=${height} controls playsinline>\n`,
      node.children.map((child) => serialize(child, indent + 2)).join(``),
      `${spaces(indent)}</video>\n`,
    ].join(``)
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function serialize(node, indent = 0) {
    const name = node.name
    if (name === `text`) /*          */ return text(node, indent)
    if (name === `headding`) /*      */ return headding(node, indent)
    if (name === `section`) /*       */ return section(node, indent)
    if (name === `blockquote`) /*    */ return blockquote(node, indent)
    if (name === `a`) /*             */ return a(node, indent)
    if (name === `code`) /*          */ return code(node, indent)
    if (name === `pre`) /*           */ return pre(node, indent)
    if (name === `img`) /*           */ return img(node, indent)
    if (name === `source`) /*        */ return source(node, indent)
    if (name === `video`) /*         */ return video(node, indent)
    if (name === `root`) /*          */ return root(node, indent)
    if (name === `th` || name === `td`) return td(node, indent)
    if (name === `dt` || name === `dd`) return dt(node, indent)
    if (name === `p`) /*             */ return mix_inline(node, indent)
    if (name === `li`) /*            */ return mix_inline(node, indent)

    // Print HTML as-is
    if (name === `html`) {
      return node.children.map(({ text }) => `${spaces(indent)}${text}\n`).join(``)
    }

    // Other Inlines
    if (node.type === `inline`) {
      return `<${name}>${node.children.map((child) => serialize(child)).join(``)}</${name}>`
    }

    // Other Blocks
    if (node.type === `block`) {
      return [
        `${spaces(indent)}<${name}>\n`,
        node.children.map((child) => serialize(child, indent + 2)).join(``),
        `${spaces(indent)}</${name}>\n`,
      ].join(``)
    }

    throw new Error(`can't be here`)
  }

  const html = serialize(node, option.indent)
  return { html, toc, tags }
}

/**
 * Parse Markdown text to AST
 * @param {string} md
 * @returns {Node}
 */
export function decode(md) {

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function headding(result, rest, ast) {
    const { symbol, spaces, text } = result.groups

    if (spaces.length > 1) throw new Error(`too many spaces in "${result.input}"`)
    if (text.startsWith(` `) || text.endsWith(` `)) throw new Error(`too many spaces in "${result.input}"`)

    const level = symbol.length

    const section = node({
      name: `section`,
      type: `block`,
      level,
    })

    const h = (() => {
      if (level === 1) {
        const result = /(?<tag>\[.*\])?(?<title>.*)/.exec(text)?.groups
        const { tag, title } = result
        // tag は optional
        const tags = Array.from(tag?.matchAll(/\[(?<tag>.*?)\]/g) ?? []).map((match) => {
          return match.groups.tag
        })
        return node({
          name: `headding`,
          type: `inline`,
          level,
          attr: { tags },
          children: inline(title.trim()),
        })
      } else {
        return node({
          name: `headding`,
          type: `inline`,
          level,
          children: inline(text),
        })
      }
    })()

    section.appendChild(h)

    if (ast.level < level) {
      // increment only +1
      if (ast.level !== level - 1) throw new Error(`invalid sectioning "${result.input}"`)
      // adding as child of <section>
      ast.appendChild(section)
      return parse(rest, section)
    }

    if (ast.level === level) {
      // adding as sibling of section
      // rise to parent section
      ast.parent.appendChild(section)
      return parse(rest, section)
    }

    if (ast.level > level) {
      // adding section to parent
      while (ast.level > level - 1) {
        ast = ast.parent
      }
      ast.appendChild(section)
      return parse(rest, section)
    }
  }

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function dl(result, rest, ast) {
    const { spaces, text } = result.groups

    if (spaces.length > 1) throw new Error(`too many spaces in "${result.input}"`)
    if (text.endsWith(` `)) throw new Error(`too many spaces around "${result.input}"`)

    const prev = ast.lastChild()

    if (prev?.name === `p`) {
      // まだ <dl> が始まっておらず、直前の <p> を <dt> にする

      const p = ast.children.pop() // p を ast から外す

      const div = node({
        name: `div`,
        type: `block`,
      })

      const dt = node({
        name: `dt`,
        type: `inline`,
        children: p.children
      })
      p.children = []

      const dd = node({
        name: `dd`,
        type: `inline`,
        children: inline(text),
      })

      div.appendChild(dt)
      div.appendChild(dd)

      // もし既に直前に閉じた <dl> があったらそっちに足す
      const parent = ast.lastChild()

      if (parent?.name === `dl`) {
        parent.appendChild(div)
        return parse(rest, ast)
      } else {
        const dl = node({
          name: `dl`,
          type: `block`,
        })
        dl.appendChild(div)
        ast.appendChild(dl)
        return parse(rest, ast)
      }
    }

    if (prev?.name === `dl`) {
      // すでに <dl> が始まっており <dd> が複数あるパターン
      const div = prev.lastChild()
      const dd = node({
        name: `dd`,
        type: `inline`,
        children: inline(text),
      })
      div.appendChild(dd)
      return parse(rest, ast)
    }

    throw new Error(`invalid <dd> in "${result.input}"`)
  }

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function table(result, rest, ast) {
    const row = result.groups.row
    const columns = row.split(`|`)

    if (ast.name === `thead`) {
      const aligns = columns.map((colmun) => {
        const start = Number(colmun.startsWith(`:`))
        const end = Number(colmun.endsWith(`:`))
        if (!(start ^ end)) return `center`
        if (start) return `left`
        if (end) return `right`
      })

      const tr = ast.children[0]
      tr.children.map((child, i) => {
        child.attr = { align: aligns[i] }
        return child
      })

      const table = ast.parent
      const tbody = node({
        name: `tbody`,
        type: `block`,
        attr: { aligns },
      })
      table.appendChild(tbody)
      return parse(rest, tbody)
    }

    if (ast.name === `tbody`) {
      const tr = node({
        name: `tr`,
        type: `block`,
        level: 0,
      })

      columns.forEach((colmun, i) => {
        const td = node({
          name: `td`,
          type: `inline`,
          attr: { align: ast.attr.aligns[i] },
          children: inline(colmun.trim()),
        })
        tr.appendChild(td)
      })

      ast.appendChild(tr)
      return parse(rest, ast)
    }

    // start table
    const table = node({
      name: `table`,
      type: `block`,
      level: 0,
    })

    const thead = node({
      name: `thead`,
      type: `block`,
      level: 0,
    })

    const th = columns.map((colmun) => {
      return node({
        name: `th`,
        type: `inline`,
        children: inline(colmun.trim()),
      })
    })

    const tr = node({
      name: `tr`,
      type: `block`,
      level: 0,
      children: th,
    })

    thead.appendChild(tr)
    table.appendChild(thead)
    ast.appendChild(table)
    return parse(rest, thead)
  }

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function pre(result, rest, ast) {
    const { lang, path } = result.groups

    if (lang.startsWith(` `) || lang.endsWith(` `)) throw new Error(`too many spaces around "${result.input}"`)
    if (path?.startsWith(` `) || path?.endsWith(` `)) throw new Error(`too many spaces around "${result.input}"`)

    // already in <pre>
    if (ast.name === `pre`) return parse(rest, ast.parent)

    const pre = node({
      name: `pre`,
      type: `block`,
      attr: { lang, path }
    })

    ast.appendChild(pre)
    return parse(rest, pre)
  }

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function html(result, rest, ast) {
    const child = node({
      name: `text`,
      type: `inline`,
      text: result.input
    })

    if (ast.name !== `html`) {
      const html = node({
        name: `html`,
        type: `block`,
        children: [child]
      })
      ast.appendChild(html)
      return parse(rest, html)
    } else {
      ast.appendChild(child)
      return parse(rest, ast)
    }
  }

  /**
   * @param {string} name
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function list(name, result, rest, ast) {
    const { indent, spaces, text } = result.groups

    if (spaces.length > 1) throw new Error(`too many spaces in "${result.input}"`)
    if (text.endsWith(` `)) throw new Error(`too many spaces in "${result.input}"`)

    const INDENT = 2

    if (indent.length % INDENT !== 0) throw new Error(`odd indent in list "${result.input}"`)

    const level = indent.length / INDENT

    const li = node({
      name: `li`,
      type: `inline`,
      level,
      children: inline(text),
    })

    // 親が <ul> / <ol> な場合、混ざっててもレベルで判断。
    if ([`ul`, `ol`].includes(ast.name)) {
      if (ast.level === level) {
        // in <ul>/<ol> and same level <li>
        ast.appendChild(li)
        return parse(rest, ast)
      }
      if (ast.level === level - 1) {
        // in <ul>/<ol> but lower level <li>
        const parent = ast.lastChild()
        const list = node({
          name,
          type: `block`,
          level,
        })
        list.appendChild(li)
        parent.appendChild(list)
        return parse(rest, list)
      }
      if (ast.level > level) {
        // in <ul>/<ol> but upper level <li>
        // TODO: rise 使えそう
        while (true) {
          if (ast.name === name && ast.level === level) break
          ast = ast.parent
        }
        ast.appendChild(li)
        return parse(rest, ast)
      }
    } else {
      // 親が <ul> / <ol> じゃないのでここからはじまる
      const list = node({
        name,
        type: `block`,
        level,
      })
      list.appendChild(li)
      ast.appendChild(list)
      return parse(rest, list)
    }
  }

  /**
   * @param {RegExpExecArray} result
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function blockquote(result, rest, ast) {
    const { spaces, text } = result.groups

    if (spaces.length > 1) throw new Error(`too many spaces in "${result.input}"`)
    if (text.endsWith(` `)) throw new Error(`too many spaces around "${result.input}"`)

    const blockquote = (() => {
      if (ast.name === `blockquote`) return ast
      const blockquote = node({
        name: `blockquote`,
        type: `block`,
      })
      ast.appendChild(blockquote)
      return blockquote
    })()

    const p = node({
      name: `p`,
      type: `inline`,
    })
    blockquote.appendChild(p)

    if (text.startsWith(`--- `)) {
      const link = inline(text.slice(4))

      // url to <blockquote cite=${url}>
      const url = link[0].attr.url
      blockquote.attr = { cite: url }

      // also adding <cite>${url}</cite>
      const cite = node({
        name: `cite`,
        type: `inline`,
        children: link
      })
      p.appendChild(node({ name: `text`, type: `inline`, text: `--- ` }))
      p.appendChild(cite)
    } else {
      p.children = inline(text)
    }
    return parse(rest, blockquote)
  }

  /**
   * @param {string} head
   * @param {Array.<string>} rest
   * @param {Node} ast
   * @returns {Node}
   */
  function p(head, rest, ast) {
    ast.children.push(node({
      name: `p`,
      type: `inline`,
      children: inline(head),
    }))
    return parse(rest, ast)
  }

  /**
   * 
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function inline(input, i = 0) {
    let child
    ({ child, i } = inline_parse(input, i))
    if (input.length !== i) console.assert(`input.length = ${input.length} but i = ${i}`)
    return child
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function inline_parse(input, i = 0) {
    let text = ``
    let child
    const parent = node({ name: `parent`, type: `inline` })
    while (i < input.length) {
      if (input[i] === `\\`) {
        text += input[i]
        text += input[i + 1]
        i = i + 2
        continue
      }
      if (input[i] === `*` && input[i + 1] === `*`) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = strong(input, i + 2))
        parent.appendChild(child)
      }
      else if (input[i] === `*`) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = em(input, i + 1))
        parent.appendChild(child)
      }
      else if (input[i] === "`") {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = code(input, i + 1))
        parent.appendChild(child)
      }
      else if (input[i] === `[`) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = link(input, i + 1))
        parent.appendChild(child)
      }
      else if (input[i] === `<`) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = short_link(input, i + 1))
        parent.appendChild(child)
      }
      else if (input[i] === `>` && input[i + 1] === ` ` && (i === 0 || input[i - 1] === ` `)) {
        if (text) {
          // 文の途中にある > はタダのカッコ
          text += `>`
          i++
        } else {
          ({ child, i } = inline_blockquote(input, i + 2))
          parent.appendChild(child)
        }
      }
      else if (input[i] === `!` && input[i + 1] === `[`) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = img(input, text, i + 2))
        parent.appendChild(child)
      }
      else if (
        input[i] === `h` &&
        input[i + 1] === `t` &&
        input[i + 2] === `t` &&
        input[i + 3] === `p` &&
        input[i + 4] === `:` &&
        input[i + 5] === `/` &&
        input[i + 6] === `/` &&
        input[i + 7] !== ` ` &&
        input[i + 7] !== undefined
      ) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = smart_link(input, i))
        parent.appendChild(child)
      }
      else if (
        input[i] === `h` &&
        input[i + 1] === `t` &&
        input[i + 2] === `t` &&
        input[i + 3] === `p` &&
        input[i + 4] === `s` &&
        input[i + 5] === `:` &&
        input[i + 6] === `/` &&
        input[i + 7] === `/` &&
        input[i + 8] !== ` ` &&
        input[i + 8] !== undefined
      ) {
        if (text) parent.addText(text)
        text = ``;
        ({ child, i } = smart_link(input, i))
        parent.appendChild(child)
      }
      else {
        text += input[i]
        i++
      }
    }
    if (text) parent.addText(text)
    return { child: parent.children, i }
  }

  /**
   *
   * @param {string} input
   * @param {string} output
   * @param {number} i
   * @returns
   */
  function img(input, output, i) {
    let alt = ''
    let url = ''
    let title = ''

    while (i < input.length) {
      if (input[i] === `]` && input[i + 1] === `(`) {
        i = i + 2
        break
      }
      alt += input[i]
      i++
    }
    while (i < input.length) {
      if (input[i] === `)`) {
        i = i + 1
        break
      }
      if (input[i] === ` ` && [`"`, `'`].includes(input[i + 1])) {
        i = i + 2

        while (i < input.length) {
          if ([`"`, `'`].includes(input[i]) && input[i + 1] === `)`) {
            i = i + 2
            break
          }
          title += input[i]
          i++
        }
        break
      }
      url += input[i]
      i++
    }

    /**
     * Note: src が Path だけだった場合 new URL ではパースできないので
     * location.href などが必要。 Node.js 側が面倒なので正規表現にする。
     */
    const path = /(?<src>.*?)#(?<width>\d*?)x(?<height>\d*?)$/.exec(url)
    if (path === null) throw new Error(`missing <width>x<height> in "${url}"`)
    const { src, width, height } = path.groups
    const picture = node({ name: `picture`, type: `block` })
    const attr = {
      src,
      alt,
      title,
      width,
      height
    }

    // .svg はそのまま <img>
    if (src.endsWith(`.svg`)) {
      // <img loading=lazy decoding=async src=test.svg?180105_115707#546x608 alt="test alt" title="test title" width=546 height=608>
      const img = node({ name: `img`, type: `block`, attr })
      return { child: img, i }
    }

    // .mp4 のときは Video にする
    if (src.endsWith(`.mp4`)) {
      const video = node({ name: `video`, type: `block`, attr: { title: alt, width, height } })
      const mp4 = node({ name: `source`, type: `inline`, attr: { type: `video/mp4`, src } })
      const webm = node({ name: `source`, type: `inline`, attr: { type: `video/webm`, src: src.replace(/.mp4$/, `.webm`) } })
      video.appendChild(mp4)
      video.appendChild(webm)
      return { child: video, i }
    }

    if (src.endsWith(`.png`) || src.endsWith(`.jpeg`) || src.endsWith(`.gif`)) {
      const srcset = src
        .replace(/\.png$/, `.webp`)
        .replace(/\.jpeg$/, `.webp`)
        .replace(/\.gif$/, `.webp`)
      const img = node({ name: `img`, type: `block`, attr })
      const source = node({ name: `source`, type: `block`, attr: { type: `image/webp`, srcset } })
      picture.appendChild(source)
      picture.appendChild(img)
      return { child: picture, i }
    }
    throw new Error(`<img> should ".jpeg" or ".png" or ".svg" and <video> should ".mp4" in "${src}"`)
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function link(input, i) {
    let text_start = i
    const child = node({ name: `a`, type: `inline` })
    while (i < input.length) {
      if (input[i] === `\\`) {
        i = i + 2
        continue
      }
      // code はネストして良い
      if (input[i] === "`") {
        // もしそこまでに text があったら
        // (e.g. "aaa `code`")
        if (text_start < i) {
          child.addText(input.slice(text_start, i))
        }
        const inline_code = code(input, i + 1)
        text_start = i = inline_code.i
        child.appendChild(inline_code.child)
        continue
      }
      // 中に [] がネストしてる場合だけ text 扱い
      if (input[i] === `[`) {
        while (input[i] !== `]`) {
          i++
        }
        i++
      }

      if (input[i] === `]`) {
        if (input[i + 1] === `(`) {
          i = i + 2
          break
        } else {
          // 実はリンクじゃなかった (e.g. "this is [not] link")
          const child = node({ name: `text`, type: `inline`, text: input.slice(text_start - 1, i) })
          return { child, i }
        }
      }
      i++
    }

    const text = input.slice(text_start, i - 2)
    const url_start = i

    while (i < input.length) {
      if (input[i] === `\\`) {
        i = i + 2
        continue
      }
      if (input[i] === `)`) {
        i = i + 1
        break
      }
      i++
    }

    const url = input.slice(url_start, i - 1)
    child.attr = { url }
    child.addText(text)
    return { child, i }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function short_link(input, i) {
    let url = ''
    while (true) {
      if (i > input.length - 1) {
        // 実際は Link じゃなかったので text として処理 (e.g.  10 < 20)
        const child = node({ name: `text`, type: `inline`, text: `<${url}` })
        return { child, i }
      }
      if (input[i] === `>`) {
        i = i + 1
        break
      }
      url += input[i]
      i++
    }

    const child = node({ name: `a`, type: `inline`, attr: { url } })
    child.addText(url)
    return { child, i }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function smart_link(input, i) {
    let url = ''
    while (i < input.length) {
      if ([` `, `)`].includes(input[i])) {
        break
      }
      url += input[i]
      i++
    }
    const child = node({ name: `a`, type: `inline`, attr: { url } })
    child.addText(url)
    return { child, i }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function em(input, i) {
    let start = i
    const child = node({ name: `em`, type: `inline` })
    while (true) {
      // "* a * b *" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </em> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i = i + 2
        continue
      }

      // 終了
      if (input[i] === `*`) break

      // code はネストして良い
      if (input[i] === "`") {
        // もしそこまでに text があったら
        // (e.g. "aaa `code`")
        if (start < i) {
          child.addText(input.slice(start, i))
        }
        const inline_code = code(input, i + 1)
        start = i = inline_code.i
        child.appendChild(inline_code.child)
        continue
      }
      i++
    }
    if (start < i) {
      child.addText(input.slice(start, i))
    }
    return { child, i: i + 1 }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function strong(input, i) {
    let start = i
    const child = node({ name: `strong`, type: `inline` })
    while (true) {
      // "** a" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </strong> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i = i + 2
        continue
      }

      // 終了
      if (input[i] === `*` && input[i + 1] === `*`) break

      // code はネストして良い
      if (input[i] === "`") {
        // もしそこまでに text があったら
        // (e.g. "aaa `code`")
        if (start < i) {
          child.addText(input.slice(start, i))
        }
        const inline_code = code(input, i + 1)
        start = i = inline_code.i
        child.appendChild(inline_code.child)
        continue
      }
      i++
    }
    if (start < i) {
      child.addText(input.slice(start, i))
    }
    return { child, i: i + 2 }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function code(input, i) {
    let start = i
    const child = node({ name: `code`, type: `inline` })
    while (true) {
      // "` a ` b `" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </code> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i = i + 2
        continue
      }

      // 終了
      if (input[i] === "`") break

      // ネストは許可しない

      i++
    }
    if (start < i) {
      child.addText(input.slice(start, i))
    }
    return { child, i: i + 1 }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function inline_blockquote(input, i) {
    const parsed = inline_parse(input, i)
    const p = node({ name: `p`, type: `inline`, children: parsed.child })
    const child = node({ name: `blockquote`, type: `block` })
    child.appendChild(p)
    return { child: child, i: parsed.i }
  }

  /**
   * @param {Array.<string>} lines
   * @param {Node} ast
   * @returns {Node}
   */
  function parse(lines, ast = node({ name: `root`, type: `block`, level: 0 })) {
    // proceed all lines
    if (lines.length === 0) return rise(ast, `root`)

    const [head, ...rest] = lines

    /**@type {RegExpExecArray} */
    let result

    // pre ((?<sp2> *)(?<after>.*))?
    if (result = /^```(?<lang>.*?)((:)(?<path>.*))?$/.exec(head)) return pre(result, rest, ast)

    // pre 中は各行を children にそのまま追加
    if (ast.name === `pre`) {
      ast.addText(head)
      return parse(rest, ast)
    }

    // html
    if (result = /^( *)\<(\/{0,1})(iframe|div|span|p|pre|code).*/.exec(head)) {
      return html(result, rest, ast)
    }

    // skip break line
    if (head === ``) return parse(rest, rise(ast, `section`))

    if (result = /^(?<symbol>#+)(?<spaces> +)(?<text>.+)$/.exec(head)) /*           */ return headding(result, rest, ast)
    if (result = /^(?<indent> *)(?<number>\d+)\.(?<spaces> +)(?<text>.+)$/.exec(head)) return list(`ol`, result, rest, ast)
    if (result = /^(?<indent> *)\-(?<spaces> +)(?<text>.+)$/.exec(head)) /*         */ return list(`ul`, result, rest, ast)
    if (result = /^(\:)(?<spaces> +)(?<text>.+)$/.exec(head)) /*                    */ return dl(result, rest, ast)
    if (result = /^(\>)(?<spaces> +)(?<text>.+)$/.exec(head)) /*                    */ return blockquote(result, rest, ast)
    if (result = /^\|(?<row>.*)\|$/.exec(head)) /*                                  */ return table(result, rest, ast)

    // space only line
    if (result = /^( *)$/.exec(head)) throw new Error(`space only line in "${head}"`)

    // rest are <p>
    return p(head, rest, ast)
  }

  const lines = md.split(`\n`)
  return parse(lines)
}

/**
 * TODO: fixme
 * 指定した親ノード、もしくは Root まで登る
 * @param {Node} ast
 * @param {string} name
 * @returns {Node}
 */
function rise(ast, name) {
  while (ast.name !== `root` && ast.name !== name) {
    ast = ast.parent
  }
  return ast
}

/**
 * dump for debug
 * @param {Node} ast
 */
function dump(ast) {
  console.log(JSON.stringify(ast, (key, value) => {
    if (key === `parent`) return undefined
    return value
  }, `  `))
}


function main() {
  [
    `[[CSP3] Suggestion for COOKIE directive](https://lists.w3.org/Archives/Public/public-webappsec/2018Oct/0029.html)`
  ].forEach((line) => {
    const ast = decode(line)
    // dump(ast)
    const { html, toc } = encode(ast, { base: './', indent: 2 })
    // console.log(line)
    console.log(html)
  })
}
// main()

// const tmp = readFileSync("tmp.txt", "utf-8")
// console.log(encode(decode(tmp), {base: './', indent:2 }))