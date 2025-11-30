import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Get current count or initialize to 0
    const currentCount = await kv.get<number>('requestCount') || 0
    
    // Increment count
    const newCount = currentCount + 1
    
    // Store back to KV
    await kv.set('requestCount', newCount)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error incrementing request count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to increment count' },
      { status: 500 }
    )
  }
}

