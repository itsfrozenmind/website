import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nimesh — breaker, builder and explorer',
  description: 'breaker, builder and explorer of the shenanigans of the world',
  openGraph: {
    title: 'Nimesh',
    description: 'breaker, builder and explorer of the shenanigans of the world',
    url: 'https://hifromnimesh.vercel.app',
    siteName: 'Nimesh',
    images: [{ url: 'https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512', width: 512, height: 512 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
