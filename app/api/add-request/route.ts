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

