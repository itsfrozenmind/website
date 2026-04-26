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
      <div className="rounded-xl p-8 text-center" style={{ background: 'var(--border)' }}>
        <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Calvin & Hobbes strips coming soon...</p>
      </div>
    )
  }

  const strip = strips[current]

  const handleShare = async () => {
    const url = `${SHARE_BASE}/${strip._id}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--border)' }}>
        <div className="relative aspect-[3/1] w-full" style={{ background: '#e8e0d4' }}>
          <Image src={strip.image} alt={strip.altText || 'Calvin and Hobbes'} fill className="object-contain" unoptimized />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent((c) => (c - 1 + strips.length) % strips.length)}
            className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--border)]"
            style={{ color: 'var(--muted)' }}
          >
            ← prev
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % strips.length)}
            className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--border)]"
            style={{ color: 'var(--muted)' }}
          >
            next →
          </button>
        </div>

        <button
          onClick={handleShare}
          className="text-sm px-4 py-1.5 rounded-lg transition-all"
          style={{
            background: copied ? '#4A7C59' : 'var(--accent)',
            color: '#fff',
          }}
        >
          {copied ? 'Link copied!' : 'Share this strip'}
        </button>
      </div>

      <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted)' }}>
        {current + 1} / {strips.length}
      </p>
    </div>
  )
}
