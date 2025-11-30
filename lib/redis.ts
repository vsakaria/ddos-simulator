import { createClient } from 'redis'

let client: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
  if (!client) {
    if (!process.env.REDIS_URL) {
      throw new Error('REDIS_URL environment variable is not set')
    }
    
    client = createClient({
      url: process.env.REDIS_URL
    })
    
    client.on('error', (err) => console.error('Redis Client Error', err))
    
    await client.connect()
  }
  return client
}

