import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const count = await kv.get<number>('requestCount') || 0
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error fetching status:', error)
    return NextResponse.json(
      { count: 0, error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
}

