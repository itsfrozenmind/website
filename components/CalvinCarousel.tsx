'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Strip {
  _id: string
  image: string
  altText?: string
}

const SHARE_BASE = 'https://hifromnimesh.vercel.app/strip'

export default function CalvinCarousel({ strips }: { strips: Strip[] }) {
  const [current, setCurrent] = useState(0)
  const [copied, setCopied] = useState(false)

  if (strips.length === 0) {
    return (
      <div className="rounded-lg p-6 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>Strips coming soon...</p>
      </div>
    )
  }

  const strip = strips[current]

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${SHARE_BASE}/${strip._id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="rounded-lg overflow-hidden mb-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
          <Image src={strip.image} alt={strip.altText || 'Calvin and Hobbes'} fill className="object-contain" unoptimized />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => setCurrent((c) => (c - 1 + strips.length) % strips.length)}
            className="text-xs px-2.5 py-1.5 rounded transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % strips.length)}
            className="text-xs px-2.5 py-1.5 rounded transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            →
          </button>
          <span className="text-xs px-2.5 py-1.5" style={{ color: 'var(--muted)' }}>
            {current + 1}/{strips.length}
          </span>
        </div>
        <button
          onClick={handleShare}
          className="text-xs px-3 py-1.5 rounded transition-all"
          style={{
            background: copied ? 'rgba(74,222,128,0.1)' : 'var(--accent-dim)',
            color: copied ? '#4ADE80' : 'var(--accent)',
            border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'rgba(245,230,66,0.2)'}`,
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
          }}
        >
          {copied ? 'Copied!' : 'Share strip'}
        </button>
      </div>
    </div>
  )
}
