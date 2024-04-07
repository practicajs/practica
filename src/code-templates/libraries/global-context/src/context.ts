import { AsyncLocalStorage } from 'node:async_hooks';

let currentContext: AsyncLocalStorage<unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function context<T = any>(): AsyncLocalStorage<T> {
  if (currentContext === undefined) {
    currentContext = new AsyncLocalStorage<T>();
  }

  return currentContext as AsyncLocalStorage<T>;
}
