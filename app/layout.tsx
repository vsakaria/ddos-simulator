import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DDoS Simulator - Classroom Teaching Tool',
  description: 'A safe, educational DDoS simulation tool for teaching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

