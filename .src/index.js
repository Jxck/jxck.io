import { readFile, writeFile, stat, readdir } from "fs/promises";
import { encode, decode, cache_busting } from "markdown"
import ejs from "ejs"
import glob from "glob"
import { readFileSync } from "fs";

function description(ast) {
  const intro_section = ast.children[0].children[1]
  return sum(intro_section)
}

function sum(node, acc = "") {
  if (node.name === 'headding') return ''
  if (node.name === 'text') return node.text
  return node.children.map((child) => {
    return sum(child, acc)
  }).join("")
}

function updated_at(mtime) {
  const year = mtime.getFullYear()
  const month = (mtime.getMonth() + 1).toString().padStart(2, '0')
  const date = mtime.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${date}`
}

function hsc(str) {
  return str
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`)
    .replace(/'/g, `&apos;`)
}

function indent(str, i = 2) {
  return str
    .split("\n")
    .map((line) => {
      if (line === "") return line + "\n"
      return " ".repeat(i) + line + "\n"
    })
    .join("")
    .trimStart()
}

function short(str) {
  str = str.replaceAll("\n", "")
  if (str.length <= 140) return str
  return str.slice(0, 137) + "..."
}

function jsonescape(str) {
  return str
}

async function rendering(type, entry, entry_template) {
  const template = await readFile(entry_template, { encoding: 'utf-8' })
  const target = entry.replace(".md", ".html")
  const md = await readFile(entry, { encoding: 'utf-8' })
  const canonical = target.replace("../", "https://")

  const context = {
    indent,
    short,
    hsc,
    jsonescape,
    filename: entry_template
  }

  if (type === 'blog') {
    const path = entry.split('/')
    const base = path.slice(0, 4).map((p) => p + "/").join("")
    const created_at = path[3]
    const { mtime } = await stat(entry)
    const ast = decode(md)
    const encoded = encode(ast, { indent: 4, base })
    const article = encoded.html
    const [h1, ...toc] = encoded.toc
    const tags = encoded.tags
    const title = h1.text

    const description = (() => {
      const intro = md.match(/## (Intro)(([\n\r]|.)*?)##/m)
      const _description = intro[2]
      const __description = _description
        .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => {
          return p1
        })
        .replace(/<(http.*?)>/g, (m, p1) => p1)
      return hsc(__description)
    })()

    context.entry = {
      canonical,
      host: "blog.jxck.io",
      title,
      tags,
      toc,
      article,
      icon: "https://blog.jxck.io/assets/img/jxck",
      description, //description(ast),
      created_at,
      updated_at: updated_at(mtime),
    }
    context.version = (url) => {
      const pathname = new URL(url, "https://www.jxck.io").pathname
      const busting = cache_busting(`../www.jxck.io${pathname}`)
      return `${url}?${busting}`
    }
  }

  if (type === 'podcast') {

    // console.log(md)
    const groups = md.match(/^---\n(?<yaml>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m).groups
    const { yaml, markdown } = groups
    const obj = yaml
      .split("\n")
      .map((line) => line.match(/^(?<key>.*?): (?<value>.*)/).groups)
      .reduce((acc, { key, value }) => {
        if (key === "tags") {
          value = value
            .match(/^\[(?<values>.*?)\]/).groups.values
            .split(", ")
            .map((value) => value.match(/"(?<value>.*)"/).groups.value)
        }
        acc[key] = value
        return acc
      }, {})

    const path = entry.split('/')
    const base = path.slice(0, 4).map((p) => p + "/").join("")
    const ast = decode(markdown)
    const encoded = encode(ast, { indent: 4, base })
    const article = encoded.html
    const [h1, ...toc] = encoded.toc

    const title = h1.text

    const description = (() => {
      const info = md.match(/## (Theme)(([\n\r]|.)*?)##/m)
      const _description = info[2]
      const __description = _description
        .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => {
          return p1
        })
        .replace(/<(http.*?)>/g, (m, p1) => p1)
      return hsc(__description)
    })()

    context.episode = {
      canonical,
      host: "mozaic.fm",
      title,
      tags: obj.tags,
      toc,
      article,
      icon: "https://mozaic.fm/assets/img/mozaic",
      description, // : description(ast),
      published_at: obj.published_at,
      audio: obj.audio
    }
    context.version = (url) => {
      const pathname = new URL(url, "https://mozaic.fm").pathname
      const busting = cache_busting(`../mozaic.fm${pathname}`)
      return `${url}?${busting}`
    }
  }
  const result = ejs.render(template, context)
  await writeFile(target, result)
}

function parse_yaml(str) {
  return str.split("\n")
    .map((line) => line.match(/^(?<key>.*?): (?<value>.*)/).groups)
    .reduce((acc, { key, value }) => {
      if (key === "tags") {
        value = value
          .match(/^\[(?<values>.*?)\]/).groups.values
          .split(", ")
          .map((value) => value.match(/"(?<value>.*)"/).groups.value)
      }
      acc[key] = value
      return acc
    }, {})
}


async function render_podcast(entry, entry_template) {
  const template = await readFile(entry_template, { encoding: 'utf-8' })
  const target = entry.path.replace(".md", ".html")
  const md = await readFile(entry.path, { encoding: 'utf-8' })
  const canonical = target.replace("../", "https://")

  const context = {
    indent,
    short,
    hsc,
    jsonescape,
    filename: entry_template
  }

  const groups = md.match(/^---\n(?<frontmatter>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m).groups
  const { frontmatter, markdown } = groups
  const yaml = parse_yaml(frontmatter)

  const path = entry.path.split('/')
  const base = path.slice(0, 4).map((p) => p + "/").join("")
  const ast = decode(markdown)
  const encoded = encode(ast, { indent: 4, base })
  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const title = h1.text

  const description = (() => {
    const theme = md.match(/## (Theme)(([\n\r]|.)*?)##/m)[2]
      .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => p1)
      .replace(/<(http.*?)>/g, (m, p1) => p1)
    return hsc(theme)
  })()

  context.episode = {
    canonical,
    prev: entry.prev,
    next: entry.next,
    host: "mozaic.fm",
    title,
    tags: yaml.tags,
    toc,
    article,
    icon: "https://mozaic.fm/assets/img/mozaic",
    description, // : description(ast),
    published_at: yaml.published_at,
    audio: yaml.audio
  }
  context.version = (url) => {
    const pathname = new URL(url, "https://mozaic.fm").pathname
    const busting = cache_busting(`../mozaic.fm${pathname}`)
    return `${url}?${busting}`
  }

  const result = ejs.render(template, context)
  await writeFile(target, result)
}


async function blog() {
  const entry_template = "./template/blog.html.ejs"
  const files = glob.sync("../blog.jxck.io/entries/**/*.md")
  // const files = ["../blog.jxck.io/entries/2016-08-05/sql-for-file-search.md"]

  for (const entry of files) {
    console.log(entry)
    await rendering('blog', entry, entry_template)
  }
}
await blog()

async function podcast() {
  const podcast_template = "./template/podcast.html.ejs"
  const pathes = glob.sync("../mozaic.fm/episodes/**/*.md")
    //["../mozaic.fm/episodes/0/introduction-of-mozaicfm.md"]
    .map((path) => {
      const [dot, mozaic, episodes, ep, file] = path.split("/")
      const title = readFileSync(path, { encoding: "utf-8" }).match(/# (?<h1>.*)/).groups.h1
      return {
        ep: parseInt(ep),
        canonical: `https://${mozaic}/${episodes}/${ep}/${file.replace(".md", ".html")}`,
        url: `/${episodes}/${ep}/${file.replace(".md", ".html")}`,
        path,
        file,
        title
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

  for (const episode of pathes) {
    console.log(episode.path)
    await render_podcast(episode, podcast_template)
  }
}
await podcast()
