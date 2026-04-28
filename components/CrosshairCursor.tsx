'use client'

import { useEffect, useRef } from 'react'

export default function CrosshairCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const coordXRef  = useRef<HTMLSpanElement>(null)
  const coordYRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const pad = (n: number) => String(Math.round(n)).padStart(4, '0')

    const onMove = (e: MouseEvent) => {
      const el = cursorRef.current
      if (!el) return
      el.style.left    = e.clientX + 'px'
      el.style.top     = e.clientY + 'px'
      el.style.opacity = '1'
      if (coordXRef.current) coordXRef.current.textContent = pad(e.clientX)
      if (coordYRef.current) coordYRef.current.textContent = pad(e.clientY)
    }

    const onLeave = () => { if (cursorRef.current) cursorRef.current.style.opacity = '0' }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.15s',
      }}
    >
      {/* Crosshair lines */}
      <div style={{ position: 'absolute', top: '50%', left: '-20px', width: '16px', height: '1px', background: 'rgba(74,127,160,0.7)', transform: 'translateY(-50%)' }} />
      <div style={{ position: 'absolute', top: '50%', right: '-20px', width: '16px', height: '1px', background: 'rgba(74,127,160,0.7)', transform: 'translateY(-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '-20px', height: '16px', width: '1px', background: 'rgba(74,127,160,0.7)', transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', bottom: '-20px', height: '16px', width: '1px', background: 'rgba(74,127,160,0.7)', transform: 'translateX(-50%)' }} />

      {/* Center ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '6px', height: '6px',
        border: '1px solid rgba(74,127,160,0.9)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Coordinate readout */}
      <div style={{
        position: 'absolute',
        left: '14px',
        top: '6px',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.52rem',
        color: 'rgba(74,127,160,0.85)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.05em',
        lineHeight: 1.6,
      }}>
        X:<span ref={coordXRef}>0000</span>
        <br />
        Y:<span ref={coordYRef}>0000</span>
      </div>
    </div>
  )
}
