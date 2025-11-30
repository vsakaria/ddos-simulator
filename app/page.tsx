import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-800">
          DDoS Simulator
        </h1>
        <p className="text-xl text-gray-600">
          Classroom Teaching Tool
        </p>
        <div className="space-y-4">
          <Link
            href="/click"
            className="block w-64 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-200"
          >
            Student Clicker
          </Link>
          <Link
            href="/monitor"
            className="block w-64 mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-200"
          >
            Server Monitor
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Safe educational tool - no real attacks performed
        </p>
      </div>
    </div>
  )
}

