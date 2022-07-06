import { createClient, RedisClientType } from 'redis'
import redisUrlBuilder from './redis-url-builder'

export interface RedisTLSOptions {
  ca: string
  cert: string
  rejectedUnauthorized: boolean
}

export interface RedisOptions {
  host?: string
  port?: number
  username?: string
  password?: string
  connectionTimeout?: number
  maxReconnectionAttempts?: number
  tlsOptions?: RedisTLSOptions
  logLevel?: string
}

export enum ConnectionState {
  DISCONNECTED,
  CONNECTED,
  ERROR,
}

export const create = (options: RedisOptions): RedisClientType => {
  const defaults: RedisOptions = {
    host: 'localhost',
    port: 6379,
  }
  const finalOptions = Object.assign({}, defaults, options)
  const url = redisUrlBuilder(finalOptions)

  return createClient({ url })
}
