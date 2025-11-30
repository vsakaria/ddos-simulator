'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClickPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleClick = async () => {
    setStatus('sending')
    try {
      const response = await fetch('/api/add-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => setStatus('idle'), 2000)
      } else {
        setStatus('idle')
      }
    } catch (error) {
      console.error('Error sending request:', error)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 underline"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-800">
          Student Clicker
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleClick}
            disabled={status === 'sending'}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-2xl py-8 px-16 rounded-lg shadow-xl transition duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
          >
            {status === 'sending' ? 'Sending...' : 'Send Request'}
          </button>
          
          {status === 'success' && (
            <div className="text-green-600 text-xl font-semibold animate-pulse">
              ✓ Request sent!
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mt-8">
          Click the button to simulate a request to the server
        </p>
      </div>
    </div>
  )
}

