import { RedisClientType } from '@redis/client'
import { ConnectionState, create, RedisOptions } from './redis-client'
import { RedisResult } from './redis-result'

let client: RedisClientType

let state: ConnectionState = ConnectionState.DISCONNECTED

export const init = async (options: RedisOptions) => {
  if (client == null) {
    client = create(options)
    await client.connect()
    state = ConnectionState.CONNECTED
    client.on('error', () => {
      state = ConnectionState.ERROR
    })
    client.on('ready', () => {
      state = ConnectionState.CONNECTED
    })
  }
}

export const set = async (
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<RedisResult> => {
  if (state !== ConnectionState.CONNECTED) {
    return { error: new Error('Connection Error') }
  }

  if (ttlSeconds) {
    await client.setEx(key, ttlSeconds, value)
    return {}
  }

  await client.set(key, value)
  return {}
}

export const get = async (key: string): Promise<RedisResult> => {
  if (state !== ConnectionState.CONNECTED) {
    return { error: new Error('Connection Error') }
  }
  const result = await client.get(key)

  return { value: result }
}
