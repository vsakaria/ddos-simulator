'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Graph from '@/components/Graph'

export default function MonitorPage() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status')
        const data = await response.json()
        setCount(data.count || 0)
        setHistory((prev) => {
          const newHistory = [...prev, data.count || 0]
          // Keep only last 30 data points for graph
          return newHistory.slice(-30)
        })
      } catch (error) {
        console.error('Error fetching status:', error)
      }
    }

    // Initial fetch
    fetchStatus()

    // Poll every 500ms
    const interval = setInterval(fetchStatus, 500)

    return () => clearInterval(interval)
  }, [])

  const handleReset = async () => {
    setIsResetting(true)
    try {
      const response = await fetch('/api/reset', {
        method: 'POST',
      })

      if (response.ok) {
        setCount(0)
        setHistory([])
      }
    } catch (error) {
      console.error('Error resetting:', error)
    } finally {
      setIsResetting(false)
    }
  }

  const isOverloaded = count >= 1600

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <Link
        href="/"
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 underline"
      >
        ← Back to Home
      </Link>

      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Server Monitor
        </h1>

        {isOverloaded && (
          <div className="bg-red-600 text-white text-center py-6 px-8 rounded-lg shadow-xl animate-pulse">
            <h2 className="text-3xl font-bold">SERVER OVERLOADED</h2>
            <p className="text-xl mt-2">Request count has exceeded safe limits!</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Current Request Count
            </h2>
            <div className="text-6xl font-bold text-blue-600">
              {count.toLocaleString()}
            </div>
          </div>

          <div className="mb-6">
            <Graph data={history} />
          </div>

          <div className="text-center">
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200"
            >
              {isResetting ? 'Resetting...' : 'Reset Counter'}
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>Updates every 500ms</p>
          <p className="mt-2">Safe threshold: 1600 requests</p>
        </div>
      </div>
    </div>
  )
}

