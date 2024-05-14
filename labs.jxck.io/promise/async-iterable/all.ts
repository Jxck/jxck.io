import { sleep, task } from "./task.ts";

console.time();

const result = await Promise.all([
  sleep(3),
  sleep(2),
  sleep(1),
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
