import { readFile, writeFile, stat } from "fs/promises";
import { encode, decode, cache_busting } from "markdown"
import ejs from "ejs"
import glob from "glob"
import { fstat, readFileSync } from "fs";


// function description(ast) {
//   const intro_section = ast.children[0].children[1]
//   return sum(intro_section)
// }

function description(md) {
  const _desc = md.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2]
    .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => p1)
    .replace(/<(http.*?)>/g, (m, p1) => p1)
  const desc = hsc(_desc)
  return desc
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

function version(src) {
  const url = new URL(src, "https://www.jxck.io")
  const pathname = url.pathname
  const busting = cache_busting(`../www.jxck.io${pathname}`)
  return `${src}?${busting}`
}


async function parse_entry(entry) {
  const md = await readFile(entry, { encoding: 'utf-8' })
  const target = entry.replace(".md", ".html")
  const canonical = target.replace("../", "https://")
  const { mtime } = await stat(entry)

  const [up, blog, entries, created_at, filename] = target.split('/')
  const base = `${up}/${blog}/${entries}/${created_at}/`
  const relative = `${entries}/${created_at}/${filename}`

  const ast = decode(md)
  const encoded = encode(ast, { indent: 4, base })

  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const tags = encoded.tags
  const title = h1.text

  return {
    target,
    canonical,
    relative,
    host: "blog.jxck.io",
    title,
    tags,
    toc,
    article,
    icon: "https://blog.jxck.io/assets/img/jxck",
    description: description(md),
    created_at,
    updated_at: updated_at(mtime),
  }
}


async function render_podcast(entry, entry_template) {
  const template = await readFile(entry_template, { encoding: 'utf-8' })
  const md = await readFile(entry.path, { encoding: 'utf-8' })
  const target = entry.path.replace(".md", ".html")
  const canonical = target.replace("../", "https://")

  const groups = md.match(/^---\n(?<frontmatter>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m).groups
  const { frontmatter, markdown } = groups
  const yaml = parse_yaml(frontmatter)
  const { tags, published_at, audio } = yaml

  const [up, mozaic, episodes, ep, filename] = entry.path.split('/')
  const base = `${up}/${mozaic}/${episodes}/${ep}/`
  const ast = decode(markdown)
  const encoded = encode(ast, { indent: 4, base })
  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const title = h1.text

  const context = {
    indent,
    short,
    hsc,
    version,
    filename: entry_template,
    episode: {
      canonical,
      prev: entry.prev,
      next: entry.next,
      host: "mozaic.fm",
      title,
      tags,
      toc,
      article,
      icon: "https://mozaic.fm/assets/img/mozaic",
      description: description(md),
      published_at,
      audio,
    }
  }

  const result = ejs.render(template, context)
  await writeFile(target, result)
}


async function blog() {
  const entry_template_file = "./template/blog.html.ejs"
  const entry_template = await readFile(entry_template_file, { encoding: 'utf-8' })

  // const files = ["../blog.jxck.io/entries/2016-08-05/sql-for-file-search.md"]
  const files = glob.sync("../blog.jxck.io/entries/**/*.md")
  const entries = await Promise.all(files.map((file) => parse_entry(file)))

  for (const entry of entries) {
    console.log(entry.target)
    const context = {
      indent,
      short,
      hsc,
      version,
      filename: entry_template_file,
      entry
    }
    const result = ejs.render(entry_template, context)
    await writeFile(context.entry.target, result)
  }

  const archive_template_file = "./template/blog.index.html.ejs"
  const archive_template = await readFile(archive_template_file, { encoding: "utf-8" })

  const entries_per_year = entries.reverse().reduce((acc, entry) => {
    const year = entry.created_at.split("-")[0]
    if (acc.has(year)) {
      acc.get(year).push(entry)
    } else {
      acc.set(year, [entry])
    }
    return acc
  }, new Map())

  const result = ejs.render(archive_template, {
    indent,
    short,
    hsc,
    version,
    entries_per_year,
    first: entries[0],
    filename: archive_template_file,
  })

  await writeFile("../blog.jxck.io/index.html", result)
}

async function podcast() {
  const podcast_template = "./template/podcast.html.ejs"
  //["../mozaic.fm/episodes/0/introduction-of-mozaicfm.md"]
  const pathes = glob.sync("../mozaic.fm/episodes/**/*.md")
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

if (process.argv[2] === "blog") {
  await blog()
}

if (process.argv[2] === "podcast") {
  await podcast()
}

if (process.argv.length < 3) {
  await blog()
  await podcast()
}