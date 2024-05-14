// n >= 0 : resolve in n sec
// n <  0 : reject  in n sec
export function sleep(n: number): Promise<number> {
  // @ts-ignore
  const { promise, resolve, reject } = Promise.withResolvers();

  setTimeout(() => {
    if (n < 0) return reject(n);
    resolve(n);
  }, Math.abs(n) * 1000);
  return promise;
}

function ack(m: number, n: number): number {
  if (m == 0) return n + 1;
  if (n == 0) return ack(m - 1, 1);
  return ack(m - 1, ack(m, n - 1));
}

// n = 1, 2, 3
export function task(n: 1 | 2 | 3) {
  return ack(3, 7 + n);
}
