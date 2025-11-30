import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const count = await kv.get<number>('requestCount') || 0
    
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

