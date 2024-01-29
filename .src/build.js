import { readFile, writeFile, stat } from "fs/promises";
import { readFileSync, statSync } from "fs"
import { promisify } from "util"
import { render } from "ejs"
import { exec } from "child_process"
import { glob } from "glob"
import {
  encode,
  decode,
  traverse,
  Node,
  hsc,
  map,
  create_id_from_text,
  to_toc
} from "markdown"

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

/**
 * Calculate hash from mtime
 * @param {string} path
 * @returns {string}
 */
export function cache_busting(path) {
  const mtime = statSync(path).mtime
  const formatter = new Intl.DateTimeFormat(`ja-JP`, {
    year: `2-digit`,
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`
  })
  const parts = Object.fromEntries(formatter.formatToParts(mtime).map(({ type, value }) => [type, value]))
  const { year, month, day, hour, minute, second } = parts
  return `?${year}${month}${day}_${hour}${minute}${second}`
}

/**
 * Over Write File if modified
 * @param {string} path
 * @param {string} body
 */
export async function overWriteFile(path, body) {
  const current = await readFile(path, { encoding: `utf-8` })

  if (body === current) {
    return console.log(`skip overwrite ${path}`)
  }
  return await writeFile(path, body)
}

/**
 * serialize description
 * @param {Node} node
 * @param {string} acc
 * @returns {string}
 */
function serialize_description(node, acc = ``) {
  if (node.name === `heading`) return ``
  if (node.name === `text`) return node.text
  return node.children.map((child) => {
    return serialize_description(child, acc)
  }).join(``)
}

/**
 * Convert mtime into yy-mm-dd fmt
 * @param {Date} mtime
 * @returns {string}
 */
function updated_at(mtime) {
  const formatter = new Intl.DateTimeFormat(`ja-JP`, { year: `numeric`, month: `2-digit`, day: `2-digit` })
  return formatter.formatToParts(mtime).map(({ type, value }) => {
    if (type === `literal`) return `-`
    return value
  }).join(``)
}

/**
 * indent helper
 * @param {string} str
 * @param {number} i
 * @returns
 */
function indent(str, i = 2) {
  return str
    .split(`\n`)
    .map((line) => {
      if (line === ``) return line + `\n`
      return ` `.repeat(i) + line + `\n`
    })
    .join(``)
    .trimStart()
}

/**
 * shorten description less than 140
 * @param {string} str
 * @param {number} [n]
 * @returns {string}
 */
function short(str, n = 140) {
  str = str.replaceAll(`\n`, ``)
  if (str.length <= n) return str
  return str.slice(0, n - 3) + `...`
}

/**
 * parse yaml int object
 * @param {string} str
 * @returns {Info}
 */
function parse_yaml(str) {
  /**@type {any} */
  const init = { guests: [] }
  return str.split(`\n`)
    .map((line) => line.match(/^(?<key>.*?): (?<value>.*)/).groups)
    .reduce((acc, { key, value }) => {
      if (key === `tags`) {
        acc.tags = value
          .match(/^\[(?<values>.*?)\]/).groups.values
          .split(`, `)
          .map((value) => value.match(/"(?<value>.*)"/).groups.value)
          .map((tag) => {
            if (/[A-Z]+/.test(tag)) throw new Error(`tag should be lowercase: ${tag}`)
            return tag
          })
        return acc
      }
      if (key === `guest`) {
        const matched = value.match(/^\[(?<name>.*?)\]\((?<url>.*)\)/)
        let name = value
        let url = null
        if (matched) {
          ({ url, name } = matched.groups)
        }
        if (acc.guests) {
          const values = acc.guests
          acc.guests = [...values, { url, name }]
        } else {
          acc.guests = [{ url, name }]
        }
        return acc
      }
      acc[key] = value
      return acc
    }, init) // guests は必須で無い場合は空
}

/**
 * read mp3 duration and serialize as 00:00:00 fmt
 * @param {string} audio
 * @returns {Promise<string>}
 */
async function audio_duration(audio) {
  const stdout = await (async () => {
    if (process.platform === `darwin`) {
      return (await promisify(exec)(`afinfo ./${audio} | grep duration | cut -d' ' -f 3`)).stdout
    } else {
      return (await promisify(exec)(`mp3info -p "%S\n" ./${audio}`)).stdout
    }
  })()

  const sec = parseInt(stdout.trim())
  const formatter = new Intl.DateTimeFormat(`ja-jp`, {
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`,
    hour12: false,
    timeZone: `UTC`
  });
  return formatter.format(new Date(sec * 1000))
}

/**
 * @typedef {Object} Guest
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} Info
 * @property {string} published_at
 * @property {string} audio
 * @property {Array.<Guest>} guests
 * @property {Array.<string>} tags
 */

/**
 * create info section from yaml
 * @param {{published_at: string, guests: Array.<Guest>, toc: Node}} param
 * @returns {Node}
 */
function info_section({ published_at, guests, toc }) {
  // console.log({ published_at, guests })

  // validate date format
  if (/20[1-2]\d-[0-1]\d-[0-3]\d/.test(published_at) === false) throw new Error(`${published_at} is invalid date format`)

  const dl = new Node({
    name: `dl`,
    type: `block`,
    attr: map({ class: `info` })
  });

  // published_at
  (() => {
    const div = new Node({ name: `div`, type: `block` })
    const dt = new Node({ name: `dt`, type: `inline` })
    const dd = new Node({ name: `dd`, type: `inline` })
    dt.addText(`published_at`)
    dd.addText(published_at)
    div.appendChildren([dt, dd])
    dl.appendChild(div)
  })()

  // guests
  guests.forEach(({ name, url }) => {
    const div = new Node({ name: `div`, type: `block` })
    const dt = new Node({ name: `dt`, type: `inline` })
    const dd = new Node({ name: `dd`, type: `inline` })
    dt.addText(`guest`)
    if (url) {
      const a = new Node({
        name: `a`,
        type: `inline`,
        attr: map({
          href: url,
          target: `_blank`
        })
      })
      a.addText(name)
      dd.appendChild(a)
    } else {
      dd.addText(name)
    }
    div.appendChildren([dt, dd])
    dl.appendChild(div)
  });

  // toc
  (() => {
    const div = new Node({ name: `div`, type: `block` })
    const dt = new Node({ name: `dt`, type: `inline` })
    const dd = new Node({ name: `dd`, type: `block` })
    const details = new Node({ name: `details`, type: `block` })
    const summary = new Node({ name: `summary`, type: `inline` })
    const nav = new Node({ name: `nav`, type: `block` })

    div.appendChildren([dt, dd])
    dt.addText(`toc`)
    dd.appendChild(details)
    details.appendChildren([summary, nav])
    nav.appendChild(toc)
    summary.addText(`headings`)
    dl.appendChild(div)
  })()

  return dl
}

/**
 * cache busting helper
 * @param {string} src
 * @returns {string}
 */
function version(src) {
  const url = new URL(src, `https://www.jxck.io`)
  const pathname = url.pathname
  const busting = cache_busting(`../www.jxck.io${pathname}`)
  return `${src}${busting}`
}

/**
 * render template with context
 * @param {string} template
 * @param {any} context
 * @returns {Promise.<string>}
 */
async function renderFile(template, context) {
  context.filename = template
  return render(await readFile(template, { encoding: `utf-8` }), context)
}

/**
 * @typedef {Object} Param
 * @property {string} host
 * @property {string} base
 */

/**
 * Customize AST with traverse()
 * @param {Node} ast
 * @param {Param} param
 * @returns
 */
function customize(ast, { host, base }) {

  const state = {
    /**@type {Array.<string>} */
    tags: [],
    /**@type {string} */
    description: null,
    /**@type {Array.<Node>} */
    headings: [],
    /**@type {string} */
    title: null,

    /**
     * table, pre など必ず出てくるわけではない CSS は
     * 登場したら一度だけ CSS を読み込むように
     * <link rel=stylesheet> を挿入する。
     * 挿入したかを保持するグローバルフラグ
     * @type {Object.<string, boolean>}
     */
    style: {
      table: false,
      pre: false,
    }
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
          const text = node.children.at(0).text
          if (text === `Intro` || text === `Theme`) {
            state.description = hsc(serialize_description(node.parent))
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
        const last = state.headings.reduce((prev, curr) => {
          return curr.attr.get(`_id`) === _id ? curr : prev
        }, null)

        // あったらその重複カウント、なければ 0
        const _id_count = last !== null ? parseInt(last.attr.get(`_id_count`)) + 1 : 0
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
        const a = new Node({ name: `a`, type: `inline`, attr, children: node.children })
        node.children = []
        node.appendChild(a)
      }
      if (node.name === `figure` && state.style.table === false) {
        if (state.style.table === false) {
          // 一度だけ table css を差し込む
          state.style.table = true
          return append_css(node, `https://www.jxck.io/assets/css/table.css`)
        }
      }
      if (node.name === `pre`) {
        if (node.name === `pre` && node.attr.has(`path`)) {
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
        const href = new URL(node.attr.get(`href`), `https://${host}`)
        if (href.host !== host) {
          node.attr.set(`target`, `_blank`)
        }
      }
      return node
    }
  })
  const { tags, description, headings, title } = state
  const toc = to_toc(headings, { list: `ol` })
  return { root, tags, description, toc, title }
}


/**
 * @param {Node} node
 * @param {string} css
 * @returns {Node}
 */
function append_css(node, css) {
  const link = new Node({
    name: `link`,
    type: `inline`,
    attr: map({
      rel: `stylesheet`,
      property: `stylesheet`,
      type: `text/css`,
      href: version(css)
    })
  })
  const empty = new Node({ name: `empty`, type: `block` })
  empty.appendChildren([link, node])
  return empty
}

/**
 * # [tag] title => {title: "title", tags: [tag]}
 * @param {Node} node
 * @returns {{node: Node, tags: Array.<string>}}
 */
function customize_heading(node) {
  const text = node.children[0].text
  const result = /(?<tag>\[.*\])?(?<title>.*)/.exec(text)?.groups
  const { tag, title } = result
  // tag は optional
  const tags = Array.from(tag?.matchAll(/\[(?<tag>.*?)\]/g) ?? []).map((match) => {
    return match.groups.tag
  }).map((tag) => {
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
 * @param {Node} node
 * @param {string} base
 * @returns 
 */
function customize_image(node, base) {
  const attr = node.attr
  /**
   * TODO: parse 方法を見直す
   */
  const path = /(?<src>.*?)#(?<width>\d*?)x(?<height>\d*?)$/.exec(attr.get(`src`))
  if (path === null) throw new Error(`missing <width>x<height> in "${attr.get(`src`)}"`)
  const { src, width, height } = path.groups

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
      })
    })
    const mp4 = new Node({
      name: `source`,
      type: `inline`,
      attr: map({
        type: `video/mp4`,
        src: attr.get(`src`),
      })
    })

    const webm_src = src.replace(/.mp4/, `.webm`)
    const webm_query = cache_busting(`${base}/${webm_src}`)
    const webm = new Node({
      name: `source`,
      type: `inline`,
      attr: map({
        type: `video/webm`,
        src: `${webm_src}${webm_query}`
      })
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
          srcset
        })
      })
      picture.appendChild(source)
    })
    const img = new Node({ name: `img`, type: `block`, attr })
    picture.appendChild(img)
    return picture
  }

  throw new Error(`<img> should ".jpeg" or ".png" or ".svg" and <video> should ".mp4" in "${src}"`)
}


/**
 * @typedef {Object} Blog
 * @property {string} target
 * @property {string} canonical
 * @property {string} relative
 * @property {string} host
 * @property {string} title
 * @property {Array.<string>} tags
 * @property {string} toc_html
 * @property {string} article
 * @property {string} icon
 * @property {string} description
 * @property {string} created_at
 * @property {string} updated_at
 */


/**
 * parse entry file into context
 * @param {string} entry
 * @returns {Promise.<Blog>}
 */
async function parse_entry(entry) {
  console.log(entry)
  const md = await readFile(entry, { encoding: `utf-8` })
  const target = entry.replace(`.md`, `.html`)
  const canonical = target.replace(`../`, `https://`)
  const { mtime } = await stat(entry)

  const [up, host, entries, created_at, filename] = target.split(`/`)
  const base = `${up}/${host}/${entries}/${created_at}/`
  const relative = `${entries}/${created_at}/${filename}`

  const ast = decode(md)
  const { root, description, tags, toc, title } = customize(ast, { host, base })
  // h1 は除く
  const ol = toc.children.at(-1)
  const toc_html = encode(ol, { indent: 14 })
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
 * parse episodes file into context
 * @param {Podcast} entry
 * @param {number} order
 * @returns {Promise.<any>}
 */
async function parse_episode(entry, order) {
  console.log(entry.path)
  const md = await readFile(entry.path, { encoding: `utf-8` })
  const target = entry.path.replace(`.md`, `.html`)
  const canonical = target.replace(`../`, `https://`)

  const groups = md.match(/^---\n(?<frontmatter>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m).groups
  const { frontmatter, markdown } = groups
  const yaml = parse_yaml(frontmatter)
  const { tags, published_at, audio, guests } = yaml

  const [up, host, episodes, ep, filename] = entry.path.split(`/`)
  const base = `${up}/${host}/${episodes}/${ep}/`
  const ast = decode(markdown)

  const { root, description, toc, title } = customize(ast, { host, base })
  const ol = toc.children.at(-1) // toc から h1 を除く

  // yaml の情報を info section にして ast に差し込む
  const info = info_section({ published_at, guests, toc: ol })
  ast.children[0].children.splice(1, 0, info)

  const article = encode(root, { indent: 2 })

  // Top ページのために Theme だけ別で encode する
  const theme_section = ast.children[0].children[2]
  theme_section.children.shift()
  const theme = encode(theme_section, { indent: 4 }).trim()

  const audio_file = audio.replace(`https://`, `../`)
  const audio_stat = await stat(audio_file)
  const audio_size = audio_stat.size
  const audio_mtime = Math.floor(audio_stat.mtime.getTime() / 1000)
  const duration = await audio_duration(audio_file)

  return {
    target,
    canonical,
    url: entry.url,
    prev: entry.prev,
    next: entry.next,
    host: `mozaic.fm`,
    title,
    theme,
    tags,
    guests,
    toc,
    article,
    icon: `https://mozaic.fm/assets/img/mozaic`,
    description,
    published_at,
    audio,
    audio_file,
    audio_size,
    audio_mtime,
    duration,
    order,
  }
}

/**
 * @typedef {Object} BuildOption
 * @property {boolean} preview
 */

/**
 * build podcast episodes
 * @param {Array.<string>} files
 * @param {BuildOption} params
 */
async function blog(files, params = { preview: false }) {
  const entries = await Promise.all(
    files
      .sort()
      .reverse()
      .map((file) => parse_entry(file))
  )

  // build entries
  const entry_template_file = `./template/blog.html.ejs`
  const entry_template = await readFile(entry_template_file, { encoding: `utf-8` })
  for (const entry of entries) {
    const context = {
      indent,
      short,
      hsc,
      version,
      entry,
      filename: entry_template_file,
    }
    const result = render(entry_template, context)
    await overWriteFile(context.entry.target, result)
  }

  if (params.preview) return

  console.log(await promisify(exec)(`../compression-dictionary-transport.sh`))

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

  const dict_path = (await glob(`../blog.jxck.io/dictionary/*.dict`)).at(0).split("/").at(-1)
  console.log({ dict_path })

  const index_result = await renderFile(`./template/blog.index.html.ejs`, {
    indent,
    short,
    hsc,
    version,
    entries_per_year,
    first: entries[0],
    dict_path
  })
  await overWriteFile(`../blog.jxck.io/index.html`, index_result)

  // build rss
  const rss_result = await renderFile(`./template/blog.atom.xml.ejs`, { entries })
  await overWriteFile(`../blog.jxck.io/feeds/atom.xml`, rss_result)

  // build sitemap
  const sitemap_result = await renderFile(`./template/blog.sitemap.xml.ejs`, { entries })
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

  const tags = Array.from(tag_map.entries()).sort((a, b) => {
    return a[0] > b[0] ? 1 : -1
  }).map(([k, v]) => {
    return [k, v.sort()]
  })

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
 * @typedef {Object} Podcast
 * @property {number} ep
 * @property {string} canonical
 * @property {string} url
 * @property {string} path
 * @property {string} file
 * @property {string} title
 * @property {Podcast} [next]
 * @property {Podcast} [prev]
 */

/**
 * build podcast episodes
 * @param {Array.<string>} files
 * @param {BuildOption} params
 */
async function podcast(files, params = { preview: false }) {
  /**@type {Array.<Podcast>} */
  const paths = files.map((path) => {
    const [dot, mozaic, episodes, ep, file] = path.split(`/`)
    const title = readFileSync(path, { encoding: `utf-8` }).match(/# (?<h1>.*)/).groups.h1
    return {
      ep: parseInt(ep),
      canonical: `https://${mozaic}/${episodes}/${ep}/${file.replace(`.md`, `.html`)}`,
      url: `/${episodes}/${ep}/${file.replace(`.md`, `.html`)}`,
      path,
      file,
      title,
      next: null,
      prev: null
    }
  })
    .sort((a, b) => {
      if (a.ep === b.ep) {
        return a.file.length - b.file.length
      }
      return a.ep - b.ep
    })
    .map((curr, i, arr) => {
      curr.next = arr[i + 1]
      curr.prev = arr[i - 1]
      return curr
    })
    .reverse()

  const episodes = await Promise.all(paths.map((path, i) => parse_episode(path, i)))
  const latest = episodes.at(0)

  if (params.preview === false) {
    // set id3
    console.log(await promisify(exec)(`eyeD3 --remove-all ../${latest.audio_file}`))
    console.log(await promisify(exec)(`
      eyeD3 --title "${latest.title}" \
      --track ${episodes.length} \
      --artist 'Jxck' \
      --album 'mozaic.fm' \
      --genre 'Podcast' \
      --add-image ../www.jxck.io/assets/img/mozaic.jpeg:FRONT_COVER \
      --to-v2.3 \
      --preserve-file-times \
      ../${latest.audio_file}
    `.trim()))
  }

  // build episodes
  const podcast_template_file = `./template/podcast.html.ejs`
  const podcast_template = await readFile(podcast_template_file, { encoding: `utf-8` })
  for (const episode of episodes) {
    const context = {
      indent,
      short,
      hsc,
      version,
      episode,
      filename: podcast_template_file,
    }
    const result = render(podcast_template, context)
    await overWriteFile(episode.target, result)
  }

  if (params.preview) return

  // build index
  const result = await renderFile(`./template/podcast.index.html.ejs`, {
    indent,
    short,
    hsc,
    version,
    episodes,
    first: episodes[0],
  })
  await overWriteFile(`../mozaic.fm/index.html`, result)

  // build rss
  const rss_result = await renderFile(`./template/podcast.rss2.xml.ejs`, { episodes })
  await overWriteFile(`../feed.mozaic.fm/index.xml`, rss_result)

  // build rss json
  const json_result = await renderFile(`./template/podcast.rss2.json.ejs`, { episodes })
  await overWriteFile(`../feed.mozaic.fm/index.json`, json_result)

  // build id3all
  const id3_result = await renderFile(`./template/podcast.id3all.ejs`, { episodes })
  await overWriteFile(`../id3all.sh`, id3_result)
}

async function workbox() {
  const js = await readFile(`../www.jxck.io/assets/js/workbox.js`, { encoding: `utf-8` })

  const boundary = `---build.js---`
  const reg = new RegExp(`\\/\\*${boundary}\\*\\/(?<list>[\\s\\S]*)\\/\\*${boundary}\\*\\/`, `m`)
  const matched = js.match(reg)
  /**@type {Array.<string>} */
  const scripts = eval(matched.groups.list)

  const array = scripts.map((script) => {
    const url = new URL(script)
    const pathname = url.pathname
    const busting = cache_busting(`../www.jxck.io${pathname}`)
    url.search = busting
    return `  "${url.toString()}",`
  }).join(`\n`)

  const fragment = [
    `/*${boundary}*/`,
    `[`,
    array,
    `]`,
    `/*${boundary}*/`,
  ].join(`\n`)

  const replaced = js.replace(reg, () => fragment)
  await overWriteFile(`../www.jxck.io/assets/js/workbox.js`, replaced)
}

/**
 * main
 * @param {string} arg
 */
async function main(arg) {
  if (arg === `build`) {
    const [entries, episodes] = await Promise.all([
      glob(`../blog.jxck.io/entries/**/*.md`),
      glob(`../mozaic.fm/episodes/**/*.md`),
    ])
    return await Promise.all([
      blog(entries),
      podcast(episodes),
      workbox(),
    ])
  }

  if (arg === `preview`) {
    // const entries = [`../blog.jxck.io/entries/2016-01-27/new-blog-start.md`]
    const entries = await glob(`../blog.jxck.io/entries/**/*.md`)
    await blog([entries.at(0)], { preview: true })

    // const episodes = [`../mozaic.fm/episodes/0/introduction-of-mozaicfm.md`]
    const episodes = await glob(`../mozaic.fm/episodes/**/*.md`)
    return await podcast([episodes.at(0)], { preview: true })
  }

  if (arg === `draft`) {
    const entries = [`../blog.jxck.io/drafts/index.md`]
    return await blog(entries, { preview: true })
  }
}

await main(process.argv[2])
