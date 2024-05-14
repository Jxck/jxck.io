import { get } from "./task.ts";

const tasks = [
  get(3),
  get(1),
  get(-2),
  get(2),
];

// https://stackoverflow.com/questions/70044213/async-generator-yielding-promise-results-as-they-are-resolved
tasks[Symbol.asyncIterator] = async function* () {
  const promises = new Set(tasks.map((task) => {
    // @ts-ignore
    const { promise, resolve, reject } = Promise.withResolvers();
    task
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        promises.delete(promise);
      });
    return promise;
  }));

  while (promises.size) {
    yield Promise.race(promises);
  }
};

try {
  for await (const task of tasks) {
    console.log(task);
  }
} catch (err) {
  console.error(err);
}
