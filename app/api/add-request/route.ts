import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const redis = await getRedisClient()
    
    // Get current count or initialize to 0
    const currentCountStr = await redis.get('requestCount')
    const currentCount = currentCountStr ? parseInt(currentCountStr, 10) : 0
    
    // Increment count
    const newCount = currentCount + 1
    
    // Store back to Redis
    await redis.set('requestCount', newCount.toString())
    
    return NextResponse.json({ success: true, count: newCount })
  } catch (error) {
    console.error('Error incrementing request count:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to increment count',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

