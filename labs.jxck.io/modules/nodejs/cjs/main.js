// const {sum} = require("./module.js")
// console.log(sum)
// console.log(sum(10, 20))

async function main() {
const esm = await import("../mjs/module.mjs")
console.log(esm)
}

main()