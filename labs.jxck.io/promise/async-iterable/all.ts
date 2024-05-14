import { get, task } from "./task.ts";

console.time();

const result = await Promise.all([
  get(3),
  get(2),
  get(1),
]);
console.log({ result });
console.timeLog();

// result.forEach((n) => {
//   console.log(task(n));
// });

console.timeEnd();
export {};

// { result: [ 3, 2, 1 ] }
// default: 3013ms
// 8189
// 4093
// 2045
// default: 3359ms
