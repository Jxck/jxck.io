`use strict`;

/**
 * @typedef {Object} Serialized
 * @property {string} html
 * @property {Array.<Toc>} toc
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
 * @param {number} indent
 * @returns {string}
 */
function spaces(indent) {
  return ` `.repeat(indent)
}

/**
 * @param {string} str
 * @returns {string}
 */
export function hsc(str) {
  return str
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`)
    .replace(/'/g, `&apos;`)
    .replace(/^--- $/g, `&mdash; `) // for <blockquote>
}

/**
 * unescape markdown syntax
 * @param {string} str
 * @returns string
 */
function unescape(str) {
  return str.replace(/\\([\*|\`|\!|\[|\]|\<|\>|\(|\)|])/g, '$1')
}

/**
 * @param {Node} node
 * @returns {string}
 */
export function serialize_child_text(node) {
  if (node.name === `text`) return node.text
  return node.children.map((child) => serialize_child_text(child)).join(``)
}

/**
 * @typedef {Object} Attr
 * @prop {string} [id]
 * @prop {string} [class]
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
 * @prop {string} [rel]
 * @prop {string} [property]
 * @prop {string} [href]
 * @prop {string} [translate]
 * @prop {string} [loading]
 * @prop {string} [decoding]
 * @prop {string} [controls]
 * @prop {string} [playsinline]
 * @prop {Array.<"center" | "left" | "right">} [aligns]
 * @prop {"center" | "left" | "right"} [align]
 * @prop {Array.<string>} [tags]
 */

/**
 * @param {Attr} attr
 * @returns {string}
 */
function attr_str(attr = {}) {
  // TODO: スペース " ' ` = <  > が無ければ quote は不要
  // https://html.spec.whatwg.org/#a-quick-introduction-to-html
  const quote = [`title`, `cite`, `alt`]
  return Object.entries(attr).map(([k, v]) => {
    if (k === `aligns`) return `` // TODO: 元から消せる?
    if (quote.includes(k)) return ` ${k}="${v}"`
    if (v === null) return ` ${k}`
    return ` ${k}=${v}`
  }).join('')
}

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
export function node({ name, type, parent = null, children = [], level = undefined, text = undefined, attr = undefined }) {
  return new Node({
    name,
    type,
    parent,
    children,
    level,
    text,
    attr,
  })
}

export class Node {
  /**
   * @param {NodeParam} param
   */
  constructor({ name, type, parent = null, children = [], level = undefined, text = undefined, attr = undefined }) {
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
    const child = node({ name: `text`, type: `inline`, text: unescape(text) })
    this.appendChild(child)
  }
}

/**
 * @typedef {Object} EncodeOption
 * @prop {number} [indent]
 */

/**
 * Convert Markdown AST to HTML
 * @param {Node} node
 * @param {EncodeOption} [option]
 * @returns {Serialized}
 */
export function encode(node, option = {}) {

  /** @type {Array.<string>} */
  const tags = []

  /** @type {Array.<Toc>} */
  const toc = []

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function text(node, indent) {
    return `${spaces(indent)}${hsc(node.text)}`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function headding(node, indent) {
    const name = `h${node.level}`
    const text = node.children.map((child) => serialize(child)).join(``)
    const id = node.attr.id

    // ID が既出な場合は、一意にするために _連番 を後ろにつける
    const prev = toc.reduce((last, curr) => {
      // id が同じやつを頭からたどっていく
      // TODO: 後ろから見れば良さそう
      return curr.id === id ? curr : last
    }, null)
    const count = prev ? prev.count + 1 : 0
    const suffix = count === 0 ? `` : `_${count}`
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
    // url 内の () を escape してるので戻す
    const href = unescape(node.attr.href)
    return `<a href="${href}">${node.children.map((child) => serialize(child)).join(``)}</a>`
  }

  /**
   * @param {Node} node
   * @param {number} indent
   * @returns {string}
   */
  function pre(node, indent) {
    const lang = node.attr.lang ? ` class=${node.attr.lang}` : ``
    const path = node.attr.path ? ` data-path=${node.attr.path}` : ``
    const code = node.children.map((child) => child.text).join(`\n`)
    return [
      `${spaces(indent)}<pre${lang}${path}><code translate=no>`,
      hsc(code),
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
  function serialize(node, indent = 0) {
    const name = node.name
    if (name === `text`) /*          */ return text(node, indent)
    if (name === `headding`) /*      */ return headding(node, indent)
    if (name === `section`) /*       */ return section(node, indent)
    if (name === `a`) /*             */ return a(node, indent)
    if (name === `pre`) /*           */ return pre(node, indent)
    if (name === `root`) /*          */ return root(node, indent)
    if (name === `th` || name === `td`) return td(node, indent)
    if (name === `dt` || name === `dd`) return dt(node, indent)
    if (name === `p`) /*             */ return mix_inline(node, indent)
    if (name === `li`) /*            */ return mix_inline(node, indent)

    // Print HTML as-is
    if (name === `html`) {
      return node.children.map(({ text }) => `${spaces(indent)}${text}\n`).join(``)
    }

    // 要素をまとめるためだけの疑似要素
    if (name === `empty`) {
      // inline なら indent しない
      const i = node.type === `inline` ? 0 : indent
      return node.children.map((child) => serialize(child, i)).join(``)
    }

    if (node.children.length === 0) {
      // 子要素が無いやつ (link, srouce, img)
      const name = node.name
      const attr = attr_str(node.attr)
      return `${spaces(indent)}<${name}${attr}>\n`
    }

    // Other Inlines
    if (node.type === `inline`) {
      const attr = attr_str(node.attr)
      return `<${name}${attr}>${node.children.map((child) => serialize(child)).join(``)}</${name}>`
    }

    // Other Blocks
    if (node.type === `block`) {
      const attr = attr_str(node.attr)
      return [
        `${spaces(indent)}<${name}${attr}>\n`,
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

    // タグの [] のせいで複数の text node に別れている場合がある
    // あとで使いにくいのでマージする
    const children = inline(text).reduce((acc, curr) => {
      if (curr.name === `text` && acc[acc.length - 1]?.name === `text`) {
        acc[acc.length - 1].text += curr.text
      } else {
        acc.push(curr)
      }
      return acc
    }, [])

    const h = node({
      name: `headding`,
      type: `inline`,
      level,
      children,
    })

    const id = serialize_child_text(h)
      .replace(/[!"#$%&'()*+,/:;<=>?\[\\\]^{|}~]/g, ``) // 記号は .-_ のみ
      .replace(/[、。「」]/g, ``) // 全角記号も消す
      .replace(/ /g, `-`)
      .toLocaleLowerCase()

    h.attr = { id }

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
    if (ast.name !== `html`) {
      const html = node({
        name: `html`,
        type: `block`,
      })
      html.addText(result.input)
      ast.appendChild(html)
      return parse(rest, html)
    } else {
      ast.addText(result.input)
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
      const url = link[0].attr.href
      blockquote.attr = { cite: url }

      // also adding <cite>${url}</cite>
      const cite = node({
        name: `cite`,
        type: `inline`,
        children: link
      })
      p.addText(`--- `)
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
    let start = i
    let child
    const parent = node({ name: `parent`, type: `inline` })
    while (i < input.length) {
      if (input[i] === `\\`) {
        i += 2
        continue
      }
      if (input[i] === `*` && input[i + 1] === `*`) {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        if (input[i + 2] === ` `) throw new Error(`too many spaces in "${input}"`)
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = strong(input, i + 2))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
        parent.appendChild(child)
      }
      else if (input[i] === `*`) {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        if (input[i + 1] === ` `) throw new Error(`too many spaces in "${input}"`)
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = em(input, i + 1))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
        parent.appendChild(child)
      }
      else if (input[i] === "`") {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        if (input[i + 1] === ` `) throw new Error(`too many spaces in "${input}"`)
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = code(input, i + 1))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
        parent.appendChild(child)
      }
      else if (input[i] === `[`) {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        // link じゃないかもしれないので、ここでは空白判定はしない
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = link(input, i + 1))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
        parent.appendChild(child)
      }
      else if (input[i] === `<`) {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        // これがただの < かもしれないので、ここでは空白判定はしない
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = short_link(input, i + 1))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
        parent.appendChild(child)
      }
      else if (input[i] === `>` && input[i + 1] === ` ` && (i === 0 || input[i - 1] === ` `)) {
        if (start < i) {
          // 文の途中にある > はタダのカッコ
          i++
        } else {
          if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`);
          ({ child, i } = inline_blockquote(input, i + 2))
          start = i
          parent.appendChild(child)
        }
      }
      else if (input[i] === `!` && input[i + 1] === `[`) {
        if (input[i - 1] === ` ` && input[i - 2] === ` `) throw new Error(`too many spaces before "${input}"`)
        if (input[i + 2] === ` `) throw new Error(`too many spaces in "${input}"`)
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = img(input, i + 2))
        if (input[i] === ` ` && input[i + 1] === ` `) throw new Error(`too many spaces after "${input}"`)
        start = i
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
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = smart_link(input, i))
        start = i
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
        if (start < i) parent.addText(input.slice(start, i));
        ({ child, i } = smart_link(input, i))
        start = i
        parent.appendChild(child)
      }
      else {
        i++
      }
    }
    if (start < i) {
      if (input[i - 1] === ` `) throw new Error(`too many spaces around "${input}"`)
      parent.addText(input.slice(start, i))
    }
    return { child: parent.children, i }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function img(input, i) {
    // parse alt
    const alt_start = i
    // parse alt
    while (i < input.length) {
      if (input[i] === `]` && input[i + 1] === `(`) {
        break
      }
      i++
    }
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)

    const alt = input.slice(alt_start, i)

    i += 2 // skip `](`

    if (input[i + 1] === ` `) throw new Error(`too many spaces in "${input}"`)

    // parse url
    const url_start = i
    let title_exists = false
    while (i < input.length) {
      if (input[i] === `)`) {
        break
      }
      if (input[i] === ` `) {
        if (url_start === i) throw new Error(`too many spaces in "${input}"`)
        title_exists = true
        break
      }
      i++
    }

    const src = input.slice(url_start, i)
    i++

    /** @type {Attr} */
    const attr = {
      loading: `lazy`,
      decoding: `async`,
      src,
      alt,
    }

    if (title_exists) {
      const title_open = input[i]
      if (![`'`, `"`].includes(title_open)) throw new Error(`invalid ![img]() title open in "${input}"`)
      i++

      if (input[i] === ` `) throw new Error(`too many spaces in "${input}"`)

      const title_start = i
      while (true) {
        if (i > input.length - 1) throw new Error(`invalid ![img]() title close in "${input}"`)
        if (input[i] === title_open && input[i + 1] === `)`) {
          break
        }
        i++
      }

      if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)

      const title = input.slice(title_start, i)
      attr.title = title
      i += 2
    }

    const img = node({ name: `img`, type: `block`, attr })
    return { child: img, i }
  }

  /**
   * e.g. [link](https://example.com)
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function link(input, i) {
    let start = i
    let text_start = i
    const child = node({ name: `a`, type: `inline` })
    while (i < input.length) {
      if (input[i] === `\\`) {
        i += 2
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
          break
        } else {
          // 実はリンクじゃなかった (e.g. "this is [not] link")
          const child = node({ name: `text`, type: `inline`, text: input.slice(text_start - 1, i) })
          return { child, i }
        }
      }
      i++
    }

    // link だったことがわかったのでここで空白判定
    if (input[start] === ` `) throw new Error(`too many spaces in "${input}"`)
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)

    const text = input.slice(text_start, i)
    i += 2 // skip `](`
    const url_start = i

    if (input[i] === ` `) throw new Error(`too many spaces in "${input}"`)

    while (i < input.length) {
      if (input[i] === `\\`) {
        i += 2
        continue
      }
      if (input[i] === `)`) {
        break
      }
      i++
    }

    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)

    const href = input.slice(url_start, i)
    i++ // skip `)`
    child.attr = { href }
    child.addText(text)
    return { child, i }
  }

  /**
   * e.g. <https://example.com>
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function short_link(input, i) {
    const url_start = i
    while (true) {
      if (i > input.length - 1) {
        // 実際は Link じゃなかったので text として処理 (e.g.  10 < 20)
        const text = `<${input.slice(url_start, i)}`
        const child = node({ name: `text`, type: `inline`, text })
        return { child, i }
      }
      if (input[i] === `>`) {
        break
      }
      i++
    }

    if (input[url_start] === ` `) throw new Error(`too many spaces in "${input}"`)
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)

    const href = input.slice(url_start, i)
    const child = node({ name: `a`, type: `inline`, attr: { href } })
    child.addText(href)

    i++ // skip `>`

    return { child, i }
  }

  /**
   * e.g. go to https://example.com page
   * e.g. example page (https://example.com)
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function smart_link(input, i) {
    const url_start = i
    while (i < input.length) {
      if ([` `, `)`].includes(input[i])) {
        break
      }
      i++
    }
    const href = input.slice(url_start, i)
    const child = node({ name: `a`, type: `inline`, attr: { href } })
    child.addText(href)
    return { child, i }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function em(input, i) {
    let text_start = i
    const child = node({ name: `em`, type: `inline` })
    while (true) {
      // "* a * b *" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </em> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i += 2
        continue
      }

      // 終了
      if (input[i] === `*`) break

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
      i++
    }
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)
    if (text_start < i) child.addText(input.slice(text_start, i))
    return { child, i: i + 1 }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function strong(input, i) {
    let text_start = i
    const child = node({ name: `strong`, type: `inline` })
    while (true) {
      // "** a" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </strong> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i += 2
        continue
      }

      // 終了
      if (input[i] === `*` && input[i + 1] === `*`) break

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
      i++
    }
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)
    if (text_start < i) child.addText(input.slice(text_start, i))
    return { child, i: i + 2 }
  }

  /**
   *
   * @param {string} input
   * @param {number} i
   * @returns
   */
  function code(input, i) {
    const text_start = i
    const child = node({ name: `code`, type: `inline`, attr: { translate: `no` } })
    while (true) {
      // "` a ` b `" みたいにマッチしてない場合
      if (i > input.length) throw new Error(`unmatch </code> on "${input}"`)

      // escape を無視
      if (input[i] === `\\`) {
        i += 2
        continue
      }

      // 終了
      if (input[i] === "`") break

      // ネストは許可しない

      i++
    }
    if (input[i - 1] === ` `) throw new Error(`too many spaces in "${input}"`)
    if (text_start < i) child.addText(input.slice(text_start, i))
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
 * @typedef {Object} Plugin
 * @property {function(Node): Node} enter
 * @property {function(Node): Node} leave
 */

/**
 * Traverse Node Tree
 * @param {Node} ast
 * @param {Plugin} plugin
 */
export function traverse(ast, plugin) {
  ast.children = ast.children.map((child) => {
    child = plugin.enter(child)
    child = traverse(child, plugin)
    child = plugin.leave(child)
    return child
  })
  return ast
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
export function dump(ast) {
  console.log(JSON.stringify(ast, (key, value) => {
    if (key === `parent`) return undefined
    return value
  }, `  `))
}


// function main() {
//   [
//     `# hoo`
//   ].forEach((line) => {
//     const ast = decode(line)
//     // dump(ast)
//     const { html, toc } = encode(ast, { indent: 2 })
//     // console.log(line)
//     console.log(html)
//   })
// }
// main()
// const tmp = readFileSync("tmp.txt", "utf-8")
// console.log(encode(decode(tmp), { indent:2 }))
