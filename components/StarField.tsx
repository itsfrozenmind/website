'use client'

import { useMemo } from 'react'

interface StarDot {
  top: string
  left: string
  w: number
  h: number
  op: number
}

function makeStars(count: number, baseSize: number): StarDot[] {
  const arr: StarDot[] = []
  for (let i = 0; i < count; i++) {
    const s = baseSize * (0.4 + Math.random() * 1.2)
    arr.push({
      top:  `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      w: s,
      h: s,
      op: 0.08 + Math.random() * 0.5,
    })
  }
  return arr
}

export default function StarField() {
  const far  = useMemo(() => makeStars(280, 0.8),  [])
  const mid  = useMemo(() => makeStars(160, 1.2),  [])
  const near = useMemo(() => makeStars(70,  1.8),  [])

  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield__layer starfield__layer--far">
        {far.map((s, i) => (
          <span key={i} className="star" style={{ top: s.top, left: s.left, width: s.w, height: s.h, opacity: s.op }} />
        ))}
      </div>
      <div className="starfield__layer starfield__layer--mid">
        {mid.map((s, i) => (
          <span key={i} className="star" style={{ top: s.top, left: s.left, width: s.w, height: s.h, opacity: s.op }} />
        ))}
      </div>
      <div className="starfield__layer starfield__layer--near">
        {near.map((s, i) => (
          <span key={i} className="star" style={{ top: s.top, left: s.left, width: s.w, height: s.h, opacity: s.op }} />
        ))}
      </div>
    </div>
  )
}
