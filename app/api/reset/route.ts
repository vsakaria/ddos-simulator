import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await kv.set('requestCount', 0)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reset count' },
      { status: 500 }
    )
    }
}

