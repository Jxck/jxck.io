declare module "node:fs/promises" {
  function glob(pattern: string): AsyncIterator<string>;
}

interface ArrayConstructor {
  fromAsync<T>(iterator: AsyncIterator<string>): Promise<string[]>;
}