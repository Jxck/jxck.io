#!/usr/bin/env node

import { decode } from "markdown"
import { readFile } from "fs"
import { promisify, inspect } from "util"

// const file = await promisify(readFile)("../blog.jxck.io/entries/2016-01-27/new-blog-start.md", {encoding: 'utf-8'})
const input = await promisify(readFile)("/dev/stdin", "utf8")
const md = decode(input)
const json = JSON.stringify(md, (key, value) => {
  if (key === 'parent') return undefined
  return value
})

console.log(json)