// 以降の相対パスは .src 基準なので、どこから起動されても cwd を固定する
process.chdir(import.meta.dirname)

import { readFileSync, statSync } from "fs"
import { readFile as _readFile, writeFile, stat } from "fs/promises"
import { styleText } from "util"

import ejs from "ejs"
import { encode, decode, traverse, Node, hsc, map, create_id_from_text, to_toc } from "markdown"

/**
 * dump for debug
 */
function dump(ast: Node): void {
  console.log(
    JSON.stringify(
      ast,
      (key, value) => {
        if (key === `parent`) return undefined
        return value
      },
      `  `,
    ),
  )
}

function logger(color: Parameters<typeof styleText>[0], ...args: string[]) {
  const bright = `${color}Bright` as Parameters<typeof styleText>[0]
  console.log(styleText(bright, args.join(" ")))
}

function logg(color: Parameters<typeof styleText>[0], ...args: string[]) {
  process.stdout.write(styleText(color, args.join(" ")))
}

async function readFile(path: string) {
  return await _readFile(path, { encoding: `utf-8` })
}

/**
 * Calculate hash from mtime
 */
export function cache_busting(path: string): string {
  const mtime = statSync(path).mtime
  const formatter = new Intl.DateTimeFormat(`ja-JP`, {
    year: `2-digit`,
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`,
  })
  const parts = Object.fromEntries(
    formatter.formatToParts(mtime).map(({ type, value }) => [type, value]),
  )
  const { year, month, day, hour, minute, second } = parts
  return `?${year}${month}${day}_${hour}${minute}${second}`
}

/**
 * Over Write File if modified
 */
export async function overWriteFile(path: string, body: string): Promise<void> {
  try {
    const current = await readFile(path)
    if (body === current) return
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // creating new file, do nothing
    } else {
      return console.error(err)
    }
  }
  logger("green", "overwrite", path)
  return await writeFile(path, body)
}

/**
 * serialize description
 */
function serialize_description(node: Node, acc = ``): string {
  if (node.name === `heading`) return ``
  if (node.name === `text`) return node.text
  return node.children.map((child) => serialize_description(child, acc)).join(``)
}

/**
 * Convert mtime into yy-mm-dd fmt
 */
function updated_at(mtime: Date): string {
  const formatter = new Intl.DateTimeFormat(`ja-JP`, {
    year: `numeric`,
    month: `2-digit`,
    day: `2-digit`,
  })
  return formatter
    .formatToParts(mtime)
    .map(({ type, value }) => {
      if (type === `literal`) return `-`
      return value
    })
    .join(``)
}

/**
 * indent helper
 */
function indent(str: string, i = 2): string {
  return str
    .split(`\n`)
    .map((line) => {
      if (line === ``) return line + `\n`
      return line.padStart(line.length + i) + `\n`
    })
    .join(``)
    .trimStart()
}

/**
 * shorten description less than 140
 */
function short(str: string, n = 140): string {
  str = str.replaceAll(`\n`, ``)
  if (str.length <= n) return str
  return str.slice(0, n - 3) + `...`
}

/**
 * cache busting helper
 */
function version(src: string): string {
  const url = new URL(src, `https://www.jxck.io`)
  const pathname = url.pathname
  const busting = cache_busting(`../www.jxck.io${pathname}`)
  return `${src}${busting}`
}

/**
 * render template with context
 */
async function renderFile(template: string, context: any): Promise<string> {
  return ejs.render(await readFile(template), context, { filename: template })
}

interface Param {
  host: string
  base: string
}

interface CustomizeResult {
  root: Node
  tags: string[]
  title: string
  description: string
  toc: Node
}

/**
 * Customize AST with traverse()
 */
function customize(ast: Node, { host, base }: Param): CustomizeResult {
  interface State {
    tags: string[]
    title: string
    description: string
    headings: Node[]
    style: Record<string, boolean>
  }
  const state: State = {
    tags: [],
    title: "",
    description: "",
    headings: [],
    /**
     * table, pre など必ず出てくるわけではない CSS は
     * 登場したら一度だけ CSS を読み込むように
     * <link rel=stylesheet> を挿入する。
     * 挿入したかを保持するグローバルフラグ
     */
    style: {
      table: false,
      pre: false,
    },
  }

  const root = traverse(ast, {
    enter: (node) => {
      return node
    },
    leave: (node) => {
      if (node.name === `heading`) {
        if (node.level === 1) {
          const result = customize_heading(node)
          state.tags = result.tags
          node = result.node
          state.title = node.children.map((child) => encode(child)).join(``)
        }
        if (node.level === 2) {
          const text = node.children.at(0)!.text
          if (text === `Intro` || text === `Theme`) {
            state.description = serialize_description(node.parent)
          }
        }

        // TOC を作りつつ、そこからリンクできるように <hn> に id を生成する
        // id は <h2>text</h2> の部分から生成するが、そこにもタグがあった場合のために
        // create_id_from_text でシリアライズしてエスケープした文字をベースにする
        // 正式な id ではないので _id で保存。 _ がついてるとレンダリングしない実装
        const _id = create_id_from_text(node)
        node.attr.set(`_id`, _id)

        // かぶるものが前にあったら _1, _2 などを suffix につける
        // そのために、 TOC にある値を調べて重複をカウントする
        // reduceRight できるかと思ったけど break できないので reduce で頭から見ていく
        const last = state.headings.reduce<Node | null>((prev, curr) => {
          return curr.attr.get(`_id`) === _id ? curr : prev
        }, null)

        // あったらその重複カウント、なければ 0
        const _id_count = last !== null ? parseInt(last.attr.get(`_id_count`)!) + 1 : 0
        const suffix = _id_count === 0 ? `` : `_${_id_count}`
        const id = `${_id}${suffix}`

        // 重複カウントを保存しつつ、 suffix をつけたものを正式 id として登録
        node.attr.set(`_id_count`, `${_id_count}`)
        node.attr.set(`id`, id)
        state.headings.push(node)

        const attr = new Map()
        if (node.level === 1) {
          node.attr.delete(`id`)
          attr.set(`href`, ``)
        } else {
          attr.set(`href`, `#${id}`)
        }
        const a = new Node({
          name: `a`,
          type: `inline`,
          attr,
          children: node.children,
        })
        node.children = []
        node.appendChild(a)
      }
      if (node.name === `figure`) {
        if (state.style.table === false) {
          // 一度だけ table css を差し込む
          state.style.table = true
          return append_css(node, `https://www.jxck.io/assets/css/table.css`)
        }
      }
      if (node.name === `pre`) {
        if (node.attr.has(`path`)) {
          const path = node.attr.get(`path`)
          const code = readFileSync(`${base}${path}`, { encoding: `utf-8` }).trimEnd()
          node.addText(code)
        }
        if (state.style.pre === false) {
          // 一度だけ pre css を差し込む
          state.style.pre = true
          return append_css(node, `https://www.jxck.io/assets/css/pre.css`)
        }
      }
      if (node.name === `img`) {
        return customize_image(node, base)
      }
      if (node.name === `a`) {
        const href = new URL(node.attr.get(`href`)!, `https://${host}`)
        if (href.host !== host) {
          node.attr.set(`target`, `_blank`)
        }
      }
      return node
    },
  })
  const { title, tags, description, headings } = state
  const toc = to_toc(headings, { list: `ol` })
  return { root, tags, description, toc, title }
}

function append_css(node: Node, css: string): Node {
  const link = new Node({
    name: `link`,
    type: `inline`,
    attr: map({
      rel: `stylesheet`,
      property: `stylesheet`,
      type: `text/css`,
      href: version(css),
    }),
  })
  const empty = new Node({ name: `empty`, type: `block` })
  empty.appendChildren([link, node])
  return empty
}

/**
 * # [tag] title => {title: "title", tags: [tag]}
 */
function customize_heading(node: Node): { node: Node; tags: string[] } {
  const text = node.children[0].text
  const result = /(?<tag>\[.*\])?(?<title>.*)/.exec(text)!.groups!
  const { tag, title } = result
  // tag は optional
  const tags = Array.from(tag?.matchAll(/\[(?<tag>.*?)\]/g) ?? [])
    .map((match) => {
      return match.groups!.tag
    })
    .map((tag) => {
      if (/[A-Z]+/.test(tag)) throw new Error(`tag should be lowercase: ${tag}`)
      return tag
    })
  node.children[0].text = title.trim()
  return { node, tags }
}

/**
 * .png/.jpeg/.gif -> picture
 * .svg -> img
 * .mp4 -> video
 */
function customize_image(node: Node, base: string): Node {
  const attr = node.attr
  /**
   * TODO: parse 方法を見直す
   */
  const path = /(?<src>.*?)#(?<width>\d*?)x(?<height>\d*?)$/.exec(attr.get(`src`)!)
  if (path === null) throw new Error(`missing <width>x<height> in "${attr.get(`src`)}"`)
  const { src, width, height } = path.groups!

  const query = (() => {
    if (src.startsWith("https:")) return ``
    return cache_busting(`${base}/${src}`)
  })()
  attr.set(`src`, `${src}${query}`)
  attr.set(`width`, width)
  attr.set(`height`, height)

  // .svg はそのまま <img>
  if (src.endsWith(`.svg`)) {
    return new Node({ name: `img`, type: `block`, attr })
  }

  // .mp4 のときは Video にする
  if (src.endsWith(`.mp4`)) {
    const video = new Node({
      name: `video`,
      type: `block`,
      attr: map({
        title: attr.get(`alt`),
        width: attr.get(`width`),
        height: attr.get(`height`),
        controls: null,
        playsinline: null,
      }),
    })
    const mp4 = new Node({
      name: `source`,
      type: `inline`,
      attr: map({
        type: `video/mp4`,
        src: attr.get(`src`),
      }),
    })

    const webm_src = src.replace(/.mp4/, `.webm`)
    const webm_query = cache_busting(`${base}/${webm_src}`)
    const webm = new Node({
      name: `source`,
      type: `inline`,
      attr: map({
        type: `video/webm`,
        src: `${webm_src}${webm_query}`,
      }),
    })
    video.appendChildren([mp4, webm])
    return video
  }

  if (src.endsWith(`.png`) || src.endsWith(`.jpeg`) || src.endsWith(`.gif`)) {
    const picture = new Node({ name: `picture`, type: `block` })
    // support webp/avif in picture
    Array.of("avif", "webp").forEach((type) => {
      const file = src.replace(/\.png$|\.jpeg$|\.gif$/, `.${type}`)
      const query = cache_busting(`${base}/${file}`)
      const srcset = `${file}${query}`
      const source = new Node({
        name: `source`,
        type: `block`,
        attr: map({
          type: `image/${type}`,
          srcset,
        }),
      })
      picture.appendChild(source)
    })
    const img = new Node({ name: `img`, type: `block`, attr })
    picture.appendChild(img)
    return picture
  }

  throw new Error(`<img> should ".jpeg" or ".png" or ".svg" and <video> should ".mp4" in "${src}"`)
}

interface Blog {
  target: string
  canonical: string
  relative: string
  host: string
  title: string
  tags: string[]
  toc_html: string
  article: string
  icon: string
  description: string
  created_at: string
  updated_at: string
}

interface BlogMeta {
  canonical: string
  title: string
  tags: string[]
  description: string
  created_at: string
  updated_at: string
}

/**
 * parse entry file into context
 */
async function parse_entry(entry: string): Promise<Blog> {
  logg("blue", "b")
  const md = await readFile(entry)
  const target = entry.replace(`.md`, `.html`)
  const canonical = target.replace(`../`, `https://`)
  const { mtime } = await stat(entry)

  const [up, host, entries, created_at, filename] = target.split(`/`)
  const base = `${up}/${host}/${entries}/${created_at}/`
  const relative = `${entries}/${created_at}/${filename}`

  const ast = decode(md)
  const { root, description, tags, toc, title } = customize(ast, { host, base })
  // h1 は除く
  const ol = toc.children.at(-1)!
  const toc_html = encode(ol, { indent: 12 })
  const article = encode(root, { indent: 4 })

  return {
    target,
    canonical,
    relative,
    host: `blog.jxck.io`,
    title,
    tags,
    toc_html,
    article,
    icon: `https://blog.jxck.io/assets/img/jxck`,
    description,
    created_at,
    updated_at: updated_at(mtime),
  }
}

/**
 * build entry
 */
async function blog(file: string): Promise<void> {
  const entry = await parse_entry(file)
  const entry_template_file = `./template/blog.html.ejs`
  const entry_template = await readFile(entry_template_file)

  const context = {
    indent,
    short,
    hsc,
    version,
    entry,
  }
  const result = ejs.render(entry_template, context, { filename: entry_template_file })
  await overWriteFile(context.entry.target, result)

  const meta: BlogMeta = {
    canonical: entry.canonical,
    title: entry.title,
    tags: entry.tags,
    description: entry.description,
    created_at: entry.created_at,
    updated_at: entry.updated_at,
  }
  const meta_path = entry.target.replace(/\.html$/, `.json`)
  await overWriteFile(meta_path, JSON.stringify(meta, null, 2) + `\n`)
}

/**
 * build blog index/rss/sitemap/tags
 */
async function blog_index(meta_files: string[]): Promise<void> {
  logger("blue", "\ncompile blog entries:", meta_files.length.toString())

  const ICON = `https://blog.jxck.io/assets/img/jxck`

  const metas: BlogMeta[] = await Promise.all(
    meta_files.map(async (f) => JSON.parse(await readFile(f)) as BlogMeta),
  )

  const entries = metas
    .map((m) => {
      const url = new URL(m.canonical)
      return {
        ...m,
        host: url.host,
        relative: url.pathname.replace(/^\//, ``),
        icon: ICON,
      }
    })
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))

  // build index
  const entries_per_year = entries.reduce((acc, entry) => {
    const year = entry.created_at.split(`-`)[0]
    if (acc.has(year)) {
      acc.get(year).push(entry)
    } else {
      acc.set(year, [entry])
    }
    return acc
  }, new Map())

  const index_result = await renderFile(`./template/blog.index.html.ejs`, {
    indent,
    short,
    hsc,
    version,
    entries_per_year,
    first: entries[0],
  })
  await overWriteFile(`../blog.jxck.io/index.html`, index_result)

  // build rss
  const rss_result = await renderFile(`./template/blog.atom.xml.ejs`, {
    entries,
  })
  await overWriteFile(`../blog.jxck.io/feeds/atom.xml`, rss_result)

  // build sitemap
  const sitemap_result = await renderFile(`./template/blog.sitemap.xml.ejs`, {
    entries,
  })
  await overWriteFile(`../blog.jxck.io/feeds/sitemap.xml`, sitemap_result)

  // build tags
  const tag_map = entries.reduce((acc, entry) => {
    entry.tags.forEach((tag) => {
      if (acc.has(tag)) {
        acc.get(tag).push(entry)
      } else {
        acc.set(tag, [entry])
      }
    })
    return acc
  }, new Map())

  const tags = Array.from(tag_map.entries())
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([k, v]) => [k, v.sort()])

  const tags_result = await renderFile(`./template/blog.tags.html.ejs`, {
    tags,
    tag: `Tags`,
    icon: `icon`,
    host: `host`,
    first: entries[0],
    version,
    indent,
  })
  await overWriteFile(`../blog.jxck.io/tags/index.html`, tags_result)
}

/**
 * Makefile などから渡される project-root 基準のパスを
 * .src/ 基準 (../<host>/...) に正規化する
 */
function normalize_path(file: string): string {
  if (file.startsWith(`../`)) return file
  return `../${file.replace(/^\.\//, ``)}`
}

/**
 * main
 */
async function main(arg: string, rest: string[]): Promise<void> {
  if (arg === `blog_index`) {
    if (rest.length === 0) {
      throw new Error(`build.ts blog_index requires one or more meta.json paths`)
    }
    await blog_index(rest.map(normalize_path))
  }

  if (arg === `blog`) {
    if (rest.length === 0) {
      throw new Error(`build.ts blog requires one or more md file paths`)
    }
    const entries = rest.map(normalize_path)
    await Promise.all(entries.map(blog))
  }
}

await main(process.argv[2], process.argv.slice(3))
console.log("")
