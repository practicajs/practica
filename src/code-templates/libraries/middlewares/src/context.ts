import { AsyncLocalStorage } from 'node:async_hooks';

let currentContext: AsyncLocalStorage<unknown>;

export function context<T = any>(): AsyncLocalStorage<T> {
  if (currentContext === undefined) {
    currentContext = new AsyncLocalStorage<T>();
  }

  return currentContext as AsyncLocalStorage<T>;
}
