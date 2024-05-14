export function get(n: number): Promise<number> {
  // @ts-ignore
  const { promise, resolve, reject } = Promise.withResolvers();

  setTimeout(() => {
    if (n === 0) return reject(0);
    resolve(n);
  }, n * 1000);
  return promise;
}

export function ack(m: number, n: number): number {
  if (m == 0) return n + 1;
  if (n == 0) return ack(m - 1, 1);
  return ack(m - 1, ack(m, n - 1));
}

export function task(n) {
  return ack(3, 7 + n);
}
