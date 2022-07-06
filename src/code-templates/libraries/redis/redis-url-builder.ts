import { RedisOptions } from './redis-client'

export default (options: RedisOptions): string => {
  let url = 'redis://'
  if (options.username && options.password) {
    url += `${options.username}:${options.password}@`
  }
  url += `${options.host}:${options.port}`
  return url
}
