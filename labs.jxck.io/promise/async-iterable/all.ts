import { sleep, task } from "./task.ts";

console.time();

try {
  const result = await Promise.race([
    sleep(-3),
    sleep(-2),
    sleep(-1),
    sleep(-2),
  ]);
  console.log({ result });
} catch (err) {
  console.error("err", err);
}
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
