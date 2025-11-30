import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const redis = await getRedisClient()
    
    const countStr = await redis.get('requestCount')
    const count = countStr ? parseInt(countStr, 10) : 0
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error fetching status:', error)
    // Return error details for debugging
    return NextResponse.json(
      { 
        count: 0, 
        error: 'Failed to fetch status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

