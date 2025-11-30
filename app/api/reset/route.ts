import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function POST() {
  try {
    const redis = await getRedisClient()
    
    await redis.set('requestCount', '0')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reset count' },
      { status: 500 }
    )
  }
}

