import { readFile, writeFile, stat } from "fs/promises";
import { encode, decode, cache_busting } from "markdown"
import ejs from "ejs"
import glob from "glob"
import { readFileSync } from "fs"
import { exec } from "child_process"
import { promisify } from "util"

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

// function description(ast) {
//   const intro_section = ast.children[0].children[1]
//   return sum(intro_section)
// }

function description(md) {
  const _desc = md.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2]
    .replace(/\[(.*?)\]\(.*?\)/g, (m, p1, p2) => p1)
    .replace(/<(http.*?)>/g, (m, p1) => p1)
    .trim()
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
      if (key === "guest") {
        const matched = value.match(/^\[(?<name>.*?)\]\((?<url>.*)\)/)
        if (matched) {
          const { url, name } = matched.groups
          value = `<a href="${url}">${name}</a>`
        }
        if (acc["guests"]) {
          const values = acc["guests"]
          acc["guests"] = [...values, value]
        } else {
          acc["guests"] = [value]
        }
        return acc
      }
      acc[key] = value
      return acc
    }, { guests: [] }) // guests は必須で無い場合は空
}

async function duration(audio) {
  let sec = 0
  if (process.platform === 'darwin') {
    const { stdout } = await promisify(exec)(`afinfo ./${audio} | grep duration | cut -d' ' -f 3`)
    sec = parseInt(stdout.trim())
  } else {
    const { stdout } = await promisify(exec)(`mp3info -p "%S\n" ./${audio}`)
    sec = parseInt(stdout.trim())
  }
  var formatter = new Intl.DateTimeFormat("ja-jp", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC"
  });
  return formatter.format(new Date(sec * 1000))
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


async function parse_episode(entry, order) {
  const md = await readFile(entry.path, { encoding: 'utf-8' })
  const target = entry.path.replace(".md", ".html")
  const canonical = target.replace("../", "https://")

  const groups = md.match(/^---\n(?<frontmatter>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m).groups
  const { frontmatter, markdown } = groups
  const yaml = parse_yaml(frontmatter)
  const { tags, published_at, audio, guests } = yaml

  const [up, mozaic, episodes, ep, filename] = entry.path.split('/')
  const base = `${up}/${mozaic}/${episodes}/${ep}/`
  const ast = decode(markdown)

  const encoded = encode(ast, { indent: 4, base })

  const theme_section = ast.children[0].children[1]
  theme_section.children.shift()
  const theme = encode(theme_section, { indent: 4, base }).html.trim()

  const article = encoded.html
  const [h1, ...toc] = encoded.toc
  const title = h1.text

  const audio_file = audio.replace("https://", "../")
  const audio_stat = await stat(audio_file)
  const audio_size = audio_stat.size
  const audio_mtime = Math.floor(audio_stat.mtime.getTime() / 1000)

  const audio_duration = await duration(audio_file)

  return {
    target,
    canonical,
    url: entry.url,
    prev: entry.prev,
    next: entry.next,
    host: "mozaic.fm",
    title,
    theme,
    tags,
    guests,
    toc,
    article,
    icon: "https://mozaic.fm/assets/img/mozaic",
    description: description(md),
    published_at,
    audio,
    audio_file,
    audio_size,
    audio_mtime,
    duration: audio_duration,
    order,
  }
}

async function blog() {
  // const files = ["../blog.jxck.io/entries/2016-08-05/sql-for-file-search.md"]
  const files = glob.sync("../blog.jxck.io/entries/**/*.md")
  const entries = await Promise.all(files.map((file) => parse_entry(file)).reverse())

  // build entries
  const entry_template_file = "./template/blog.html.ejs"
  const entry_template = await readFile(entry_template_file, { encoding: 'utf-8' })
  for (const entry of entries) {
    console.log(entry.target)
    const context = {
      indent,
      short,
      hsc,
      version,
      entry,
      filename: entry_template_file,
    }
    const result = ejs.render(entry_template, context)
    await writeFile(context.entry.target, result)
  }

  // build index
  const archive_template_file = "./template/blog.index.html.ejs"
  const archive_template = await readFile(archive_template_file, { encoding: "utf-8" })
  const entries_per_year = entries.reduce((acc, entry) => {
    const year = entry.created_at.split("-")[0]
    if (acc.has(year)) {
      acc.get(year).push(entry)
    } else {
      acc.set(year, [entry])
    }
    return acc
  }, new Map())

  const index_result = ejs.render(archive_template, {
    indent,
    short,
    hsc,
    version,
    entries_per_year,
    first: entries[0],
    filename: archive_template_file,
  })
  await writeFile("../blog.jxck.io/index.html", index_result)

  // build rss
  const rss_template_file = "./template/blog.atom.xml.ejs"
  const rss_template = await readFile(rss_template_file, { encoding: "utf-8" })
  const rss_result = ejs.render(rss_template, { entries })
  await writeFile("../blog.jxck.io/feeds/atom.xml", rss_result)

  // build sitemap
  const sitemap_template_file = "./template/blog.sitemap.xml.ejs"
  const sitemap_template = await readFile(sitemap_template_file, { encoding: "utf-8" })
  const sitemap_result = ejs.render(sitemap_template, { entries })
  await writeFile("../blog.jxck.io/feeds/sitemap.xml", sitemap_result)
}

async function podcast() {
  // ["../mozaic.fm/episodes/0/introduction-of-mozaicfm.md"]
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
    .reverse()

  const episodes = await Promise.all(pathes.map((path, i) => parse_episode(path, i)))

  // build episodes
  const podcast_template_file = "./template/podcast.html.ejs"
  const podcast_template = await readFile(podcast_template_file, { encoding: 'utf-8' })
  for (const episode of episodes) {
    console.log(episode.target)
    const context = {
      indent,
      short,
      hsc,
      version,
      episode,
      filename: podcast_template_file,
    }
    const result = ejs.render(podcast_template, context)
    await writeFile(episode.target, result)
  }

  // build index
  const index_template_file = "./template/podcast.index.html.ejs"
  const index_template = await readFile(index_template_file, { encoding: "utf-8" })
  const result = ejs.render(index_template, {
    indent,
    short,
    hsc,
    version,
    episodes,
    first: episodes[0],
    filename: index_template_file,
  })
  await writeFile("../mozaic.fm/index.html", result)

  // build rss
  const rss_template_file = "./template/podcast.rss2.xml.ejs"
  const rss_template = await readFile(rss_template_file, { encoding: "utf-8" })
  const rss_result = ejs.render(rss_template, { episodes })
  await writeFile("../feed.mozaic.fm/index.xml", rss_result)

  // build id3all

  const id3_template_file = "./template/podcast.id3all.ejs"
  const id3_template = await readFile(id3_template_file, { encoding: "utf-8" })
  const id3_result = ejs.render(id3_template, { episodes })
  await writeFile("../id3all.sh", id3_result)

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