'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Strip { _id: string; image: string; altText?: string }
const SHARE_BASE = 'https://hifromnimesh.vercel.app/strip'

export default function CalvinCarousel({ strips }: { strips: Strip[] }) {
  const [current, setCurrent] = useState(0)
  const [copied, setCopied] = useState(false)

  if (strips.length === 0) {
    return (
      <div className="rounded-lg p-6 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-solid)' }}>
        <p className="mono" style={{ color: 'var(--muted)' }}>STRIPS COMING SOON...</p>
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
      <div className="rounded-lg overflow-hidden mb-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-solid)' }}>
        <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
          <Image src={strip.image} alt={strip.altText || 'Calvin and Hobbes'} fill className="object-contain" unoptimized />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <button onClick={() => setCurrent(c => (c - 1 + strips.length) % strips.length)}
            className="mono px-2.5 py-1.5 rounded transition-colors hover:bg-[var(--surface-2)]"
            style={{ border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.65rem' }}>←</button>
          <button onClick={() => setCurrent(c => (c + 1) % strips.length)}
            className="mono px-2.5 py-1.5 rounded transition-colors hover:bg-[var(--surface-2)]"
            style={{ border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.65rem' }}>→</button>
          <span className="mono ml-1" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>{current + 1}/{strips.length}</span>
        </div>
        <button onClick={handleShare}
          className="mono px-3 py-1.5 rounded-full transition-colors hover:bg-[var(--surface-2)]"
          style={{ border: '1px solid var(--border-solid)', color: copied ? 'var(--green)' : 'var(--muted)', fontSize: '0.65rem' }}>
          {copied ? 'COPIED!' : 'SHARE STRIP'}
        </button>
      </div>
    </div>
  )
}
