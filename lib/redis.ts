import { createClient } from 'redis'

let client: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not set')
  }

  // In serverless environments, check if client exists and is connected
  if (client && client.isOpen) {
    return client
  }

  // Create new client if none exists or if disconnected
  if (client) {
    try {
      await client.quit()
    } catch (e) {
      // Ignore errors when quitting
    }
  }

  client = createClient({
    url: process.env.REDIS_URL
  })
  
  client.on('error', (err) => console.error('Redis Client Error', err))
  
  await client.connect()
  return client
}

