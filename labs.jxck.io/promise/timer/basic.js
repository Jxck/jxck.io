'use strict';
let log = console.log.bind(console);

let $a = document.querySelector('#a')
let $b = document.querySelector('#b')

let i = 0
let ida = setInterval(() => {
  $a.textContent = ++i
  if (i >= 10) return clearInterval(ida)
}, 500);

let j = 0
let idb = setInterval(() => {
  $b.textContent = ++j
  if (j >= 10) return clearInterval(idb)
}, 600);

import "./c.mjs"
import "./d.mjs"
