import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pong Mania',
  description: 'Ping Pong Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="inter.className flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </body>
    </html>
  )
}
