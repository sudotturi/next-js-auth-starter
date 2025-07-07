import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SF Sudofolks',
  description: 'Next.js app with authentication and PWA support',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SF Sudofolks',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'SF Sudofolks',
    title: 'SF Sudofolks',
    description: 'Next.js app with authentication and PWA support',
  },
  twitter: {
    card: 'summary',
    title: 'SF Sudofolks',
    description: 'Next.js app with authentication and PWA support',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}