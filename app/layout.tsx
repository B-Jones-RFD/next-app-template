import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.APP_NAME ?? 'Next App Starter',
  description: 'Starter application',
}

export const viewport: Viewport = {
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
