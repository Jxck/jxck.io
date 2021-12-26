import { readFile, writeFile, stat } from "fs/promises";
import { encode, decode, traverse, hsc, Node } from "markdown"
import ejs from "ejs"
import glob from "glob"
import { readFileSync, statSync } from "fs"
import { exec } from "child_process"
import { promisify } from "util"

const { sync } = glob
const { render } = ejs

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
  try {
    const mtime = statSync(path).mtime
    const y = (mtime.getFullYear() % 100).toString().padStart(2, `0`)
    const m = (mtime.getMonth() + 1).toString().padStart(2, `0`)
    const d = (mtime.getDate()).toString().padStart(2, `0`)
    const H = (mtime.getHours()).toString().padStart(2, `0`)
    const M = (mtime.getMinutes()).toString().padStart(2, `0`)
    const S = (mtime.getSeconds()).toString().padStart(2, `0`)
    return `?${y}${m}${d}_${H}${M}${S}`
  } catch (err) {
    if (err.code === `ENOENT`) {
      console.error(`not found`, err.path)
    } else {
      console.error(err)
    }
    return ``
  }
}

// function description(md) {
//   const _desc = md.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2]
//     .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => p1)
//     .replace(/<(http.*?)>/g, (m, p1) => p1)
//     .trim()
//   const desc = hsc(_desc)
//   return desc
// }

/**
 * serialize Node to string
 * @param {Node} node
 * @param {string} acc
 * @returns {string}
 */
function to_text(node, acc = ``) {
  if (node.name === `headding`) return ``
  if (node.name === `text`) return node.text
  return node.children.map((child) => {
    return to_text(child, acc)
  }).join(``)
}

/**
 * Date into mtime as yy-mm-dd fmt
 * @param {Date} mtime
 * @returns
 */
function updated_at(mtime) {
  const year = mtime.getFullYear()
  const month = (mtime.getMonth() + 1).toString().padStart(2, `0`)
  const date = mtime.getDate().toString().padStart(2, `0`)
  return `${year}-${month}-${date}`
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
 * @param {{published_at: string, guests: Array.<Guest>}} param
 * @returns {Node}
 */
function info_section({ published_at, guests }) {
  // console.log({ published_at, guests })

  const dl = new Node({ name: `dl`, type: `block`, attr: { "class": "info" } })

  // published_at
  const div = new Node({ name: `div`, type: `block` })
  const dt = new Node({ name: `dt`, type: `inline` })
  const dd = new Node({ name: `dd`, type: `inline` })
  dt.addText(`published_at`)
  dd.addText(published_at)
  div.appendChild(dt)
  div.appendChild(dd)

  dl.appendChild(div)

  // guests
  guests.forEach(({ name, url }) => {
    const div = new Node({ name: `div`, type: `block` })
    const dt = new Node({ name: `dt`, type: `inline` })
    const dd = new Node({ name: `dd`, type: `inline` })
    dt.addText(`guest`)
    if (url) {
      const a = new Node({ name: `a`, type: `inline`, attr: { href: url } })
      a.addText(name)
      dd.appendChild(a)
    } else {
      dd.addText(name)
    }
    div.appendChild(dt)
    div.appendChild(dd)
    dl.appendChild(div)
  })

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
 * Customise AST with traverse()
 * @param {Node} ast
 * @param {string} base
 * @returns
 */
function customise(ast, base) {
  /**
   * table, pre など必ず出てくるわけではない CSS は
   * 登場したら一度だけ CSS を読み込むように
   * <link rel=stylesheet> を挿入する。
   * 挿入したかを保持するグローバルフラグ
   */
  const style_flag = {
    table: false,
    pre: false,
  }

  /**@type {Array.<string>} */
  let tags = []
  let description = ''

  const root = traverse(ast, {
    enter: (node) => {
      return node
    },
    leave: (node) => {
      if (node.name === `headding` && node.level === 1) {
        const result = customise_headding(node)
        tags = result.tags
        return result.node
      }
      if (node.name === `headding` && node.level === 2) {
        if (node.attr.id === `intro` || node.attr.id === `theme`) {
          description = hsc(to_text(node.parent))
        }
      }
      if (node.name === `table` && style_flag.table === false) {
        if (style_flag.table === false) {
          // 一度だけ table css を差し込む
          style_flag.table = true
          return append_css(node, `https://www.jxck.io/assets/css/table.css`)
        }
      }
      if (node.name === `pre`) {
        if (node.name === `pre` && node.attr.path) {
          const code = readFileSync(`${base}${node.attr.path}`, { encoding: `utf-8` }).trimEnd()
          node.addText(code)
        }
        if (style_flag.pre === false) {
          // 一度だけ pre css を差し込む
          style_flag.pre = true
          return append_css(node, `https://www.jxck.io/assets/css/pre.css`)
        }
      }
      if (node.name === `img`) {
        return customise_image(node, base)
      }
      return node
    }
  })
  return { root, description, tags }
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
    attr: {
      rel: `stylesheet`,
      property: `stylesheet`,
      type: `text/css`,
      href: version(css)
    }
  })
  const empty = new Node({ name: `empty`, type: `block` })
  empty.appendChild(link)
  empty.appendChild(node)
  return empty
}

/**
 * # [tag] title => {title: "title", tags: [tag]}
 * @param {Node} node
 * @returns {{node: Node, tags: Array.<string>}}
 */
function customise_headding(node) {
  const text = node.children[0].text
  const result = /(?<tag>\[.*\])?(?<title>.*)/.exec(text)?.groups
  const { tag, title } = result
  // tag は optional
  const tags = Array.from(tag?.matchAll(/\[(?<tag>.*?)\]/g) ?? []).map((match) => {
    return match.groups.tag
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
function customise_image(node, base) {
  const attr = node.attr
  /**
   * TODO: parse 方法を見直す
   */
  const path = /(?<src>.*?)#(?<width>\d*?)x(?<height>\d*?)$/.exec(attr.src)
  if (path === null) throw new Error(`missing <width>x<height> in "${attr.src}"`)
  const { src, width, height } = path.groups

  const query = cache_busting(`${base}/${src}`)
  attr.src = `${src}${query}`
  attr.width = width
  attr.height = height

  // .svg はそのまま <img>
  if (src.endsWith(`.svg`)) {
    return new Node({ name: `img`, type: `block`, attr })
  }

  // .mp4 のときは Video にする
  if (src.endsWith(`.mp4`)) {
    const video = new Node({
      name: `video`,
      type: `block`,
      attr: {
        title: attr.alt,
        width: attr.width,
        height: attr.height,
        controls: null,
        playsinline: null,
      }
    })
    const mp4 = new Node({
      name: `source`,
      type: `inline`,
      attr: {
        type: `video/mp4`,
        src: attr.src,
      }
    })

    const webm_src = src.replace(/.mp4/, `.webm`)
    const webm_query = cache_busting(`${base}/${webm_src}`)
    const webm = new Node({
      name: `source`,
      type: `inline`,
      attr: {
        type: `video/webm`,
        src: `${webm_src}${webm_query}`
      }
    })
    video.appendChild(mp4)
    video.appendChild(webm)
    return video
  }

  if (src.endsWith(`.png`) || src.endsWith(`.jpeg`) || src.endsWith(`.gif`)) {
    const picture = new Node({ name: `picture`, type: `block` })
    // TODO: replace 1 つでいける
    const webp = src.replace(/\.png$|\.jpeg$|\.gif$/, `.webp`)
    const query = cache_busting(`${base}/${webp}`)
    const srcset = `${webp}${query}`
    const img = new Node({ name: `img`, type: `block`, attr })
    const source = new Node({ name: `source`, type: `block`, attr: { type: `image/webp`, srcset } })
    picture.appendChild(source)
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
 * @property {Array.<import("./markdown").Toc>} toc
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

  const [up, blog, entries, created_at, filename] = target.split(`/`)
  const base = `${up}/${blog}/${entries}/${created_at}/`
  const relative = `${entries}/${created_at}/${filename}`

  const ast = decode(md)
  const { root, description, tags } = customise(ast, base)
  const encoded = encode(root, { indent: 4 })

  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const title = h1.text

  return {
    target,
    canonical,
    relative,
    host: `blog.jxck.io`,
    title,
    tags,
    toc,
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

  const [up, mozaic, episodes, ep, filename] = entry.path.split(`/`)
  const base = `${up}/${mozaic}/${episodes}/${ep}/`
  const ast = decode(markdown)

  // yaml の情報を info section にして ast に差し込む
  const info = info_section({ published_at, guests })
  ast.children[0].children.splice(1, 0, info)

  const { root, description } = customise(ast, base)

  const encoded = encode(root, { indent: 2 })

  // Top ページのために Theme だけ別で encode する
  const theme_section = ast.children[0].children[2]
  theme_section.children.shift()
  const theme = encode(theme_section, { indent: 4 }).html.trim()

  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const title = h1.text

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
  const entries = await Promise.all(files.map((file) => parse_entry(file)).reverse())

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
    await writeFile(context.entry.target, result)
  }

  if (params.preview) return

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
  await writeFile(`../blog.jxck.io/index.html`, index_result)

  // build rss
  const rss_result = await renderFile(`./template/blog.atom.xml.ejs`, { entries })
  await writeFile(`../blog.jxck.io/feeds/atom.xml`, rss_result)

  // build sitemap
  const sitemap_result = await renderFile(`./template/blog.sitemap.xml.ejs`, { entries })
  await writeFile(`../blog.jxck.io/feeds/sitemap.xml`, sitemap_result)

  // build tags
  const tagmap = entries.reduce((acc, entry) => {
    entry.tags.forEach((tag) => {
      if (acc.has(tag)) {
        acc.get(tag).push(entry)
      } else {
        acc.set(tag, [entry])
      }
    })
    return acc
  }, new Map())

  const tags = Array.from(tagmap.entries()).sort((a, b) => {
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
  await writeFile(`../blog.jxck.io/tags/index.html`, tags_result)
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
  const pathes = files.map((path) => {
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

  const episodes = await Promise.all(pathes.map((path, i) => parse_episode(path, i)))

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
    await writeFile(episode.target, result)
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
  await writeFile(`../mozaic.fm/index.html`, result)

  // build rss
  const rss_result = await renderFile(`./template/podcast.rss2.xml.ejs`, { episodes })
  await writeFile(`../feed.mozaic.fm/index.xml`, rss_result)

  // build rss json
  const json_result = await renderFile(`./template/podcast.rss2.json.ejs`, { episodes })
  await writeFile(`../feed.mozaic.fm/index.json`, json_result)

  // build id3all
  const id3_result = await renderFile(`./template/podcast.id3all.ejs`, { episodes })
  await writeFile(`../id3all.sh`, id3_result)
}

async function workbox() {
  const js = await readFile(`../www.jxck.io/assets/js/workbox.js`, { encoding: `utf-8` })

  const boudary = `---build.js---`
  const reg = new RegExp(`\\/\\*${boudary}\\*\\/(?<list>[\\s\\S]*)\\/\\*${boudary}\\*\\/`, `m`)
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
    `/*${boudary}*/`,
    `[`,
    array,
    `]`,
    `/*${boudary}*/`,
  ].join(`\n`)

  const replaced = js.replace(reg, () => fragment)
  await writeFile(`../www.jxck.io/assets/js/workbox.js`, replaced)
}

async function main() {
  if (process.argv[2] === `build`) {
    const files = sync(`../blog.jxck.io/entries/**/*.md`)
    const pathes = sync(`../mozaic.fm/episodes/**/*.md`)

    return await Promise.all([
      blog(files),
      podcast(pathes),
      workbox(),
    ])
  }

  if (process.argv[2] === `preview`) {
    // const files = [`../blog.jxck.io/entries/2016-01-27/new-blog-start.md`]
    const files = sync(`../blog.jxck.io/entries/**/*.md`)
    await blog([files.pop()], { preview: true })

    // const pathes = [`../mozaic.fm/episodes/0/introduction-of-mozaicfm.md`]
    const pathes = sync(`../mozaic.fm/episodes/**/*.md`)
    return await podcast([pathes.pop()], { preview: true })
  }

  if (process.argv[2] === `draft`) {
    const files = [`../blog.jxck.io/drafts/index.md`]
    return await blog(files, { preview: true })
  }
}

await main()
