import { RedisClientType } from '@redis/client'
import { ConnectionState, create, RedisOptions } from './redis-client'
import { RedisResult } from './redis-result'

let client: RedisClientType

let state: ConnectionState = ConnectionState.DISCONNECTED

export const init = async (options: RedisOptions) => {
  if (client == null) {
    client = create(options) as RedisClientType

    await client.connect()
    state = ConnectionState.CONNECTED
    client.on('error', (err) => {
      console.log('err', err)
      state = ConnectionState.ERROR
    })
    client.on('ready', () => {
      console.log('ready')
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

  if (value == null) {
    return { error: new TypeError('Value cannot be null or undefined') }
  }

  try {
    ttlSeconds
      ? await client.setEx(key, ttlSeconds, value)
      : await client.set(key, value)

    return {}
  } catch (error) {
    return { error: error as Error }
  }
}

export const setJson = async (
  key: string,
  value: object,
  ttlSeconds?: number
): Promise<RedisResult> => {
  try {
    return set(key, JSON.stringify(value), ttlSeconds)
  } catch (error) {
    return { error: error as Error }
  }
}

export const get = async (key: string): Promise<RedisResult> => {
  if (state !== ConnectionState.CONNECTED) {
    return { error: new Error('Connection Error') }
  }
  try {
    const result = await client.get(key)

    return { value: result }
  } catch (error) {
    return { error: error as Error }
  }
}

export const getJSON = async (key: string): Promise<RedisResult> => {
  const data = await get(key)
  if (data.error || data.value === null) {
    return data
  }

  try {
    const value = JSON.parse(data.value as string)
    return { value }
  } catch (error) {
    return { error: error as Error }
  }
}
