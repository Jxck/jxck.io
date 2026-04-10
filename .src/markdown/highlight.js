import { createHighlighter } from "shiki"

/**
 * Shiki で読み込む言語のリスト
 */
const LANGS = [
  "javascript",
  "html",
  "http",
  "css",
  "erlang",
  "console",
  "json",
  "yaml",
  "toml",
  "cpp",
  "c",
  "ruby",
  "bash",
  "xml",
  "diff",
  "sql",
  "python",
  "go",
  "markdown",
  "ini",
]

const highlighter = await createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: LANGS,
})

/**
 * コードをハイライトして HTML を返す
 * @param {string} code
 * @param {string} lang
 * @param {Object} [opts]
 * @param {string} [opts.path]
 * @returns {string}
 */
export function highlight(code, lang, { path } = {}) {
  const loaded = highlighter.getLoadedLanguages()
  const safeLang = loaded.includes(lang) ? lang : "text"
  return highlighter.codeToHtml(code, {
    lang: safeLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          node.properties["data-code"] = lang
          if (path) {
            node.properties["data-path"] = path
          }
        },
        code(node) {
          node.properties["translate"] = "no"
        },
      },
    ],
  })
}
