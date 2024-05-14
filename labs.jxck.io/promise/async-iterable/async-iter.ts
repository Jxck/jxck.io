import { sleep } from "./task.ts";

const tasks = [
  sleep(3),
  sleep(-2),
  sleep(1),
  sleep(2),
];

// https://stackoverflow.com/questions/70044213/async-generator-yielding-promise-results-as-they-are-resolved
tasks[Symbol.asyncIterator] = async function* () {
  const promises: Array<Promise<any>> = [];
  const resolves: Array<(value: any) => void> = [];
  const rejects: Array<(reason: any) => void> = [];
  for (const task of this) {
    //@ts-ignore
    const { promise, resolve, reject } = Promise.withResolvers();
    promises.push(promise);
    resolves.push(resolve);
    rejects.push(reject);
    task
      .then((result) => {
        resolves.shift()?.(result);
        rejects.shift();
      })
      .catch((error) => {
        resolves.shift();
        rejects.shift()?.(error);
      });
  }
  for (const promise of promises) {
    yield promise;
  }
};

try {
  for await (const task of tasks) {
    console.log(task);
  }
} catch (err) {
  console.error(err);
}
