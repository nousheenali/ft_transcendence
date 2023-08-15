import MainLayout from '@/components/layout'
// import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ft_transcendence',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
