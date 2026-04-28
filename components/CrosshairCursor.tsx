'use client'

import { useEffect, useRef } from 'react'

export default function GlowCursor() {
  const ballRef    = useRef<HTMLDivElement>(null)
  const coordXRef  = useRef<HTMLSpanElement>(null)
  const coordYRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let rawX = 0, rawY = 0
    let curX = 0, curY = 0
    let animId: number
    const pad = (n: number) => String(Math.round(n)).padStart(4, '0')

    const shoveEls = () => {
      document.querySelectorAll<HTMLElement>('[data-shove]').forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = rawX - cx
        const dy = rawY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < 95 && dist > 0) {
          const force = (1 - dist / 95) * 16
          el.style.transform = `translate(${(dx / dist) * force}px, ${(dy / dist) * force}px)`
        } else {
          el.style.transform = ''
        }
      })
    }

    const loop = () => {
      curX += (rawX - curX) * 0.28
      curY += (rawY - curY) * 0.28
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${curX - 12}px, ${curY - 12}px)`
      }
      shoveEls()
      animId = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      rawX = e.clientX
      rawY = e.clientY
      if (ballRef.current) ballRef.current.style.opacity = '1'
      if (coordXRef.current) coordXRef.current.textContent = pad(e.clientX)
      if (coordYRef.current) coordYRef.current.textContent = pad(e.clientY)
    }

    const onLeave = () => { if (ballRef.current) ballRef.current.style.opacity = '0' }

    loop()
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ballRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.88)',
        boxShadow: '0 0 10px 4px rgba(255,255,255,0.35), 0 0 28px 8px rgba(101,182,195,0.22)',
        transition: 'opacity 0.18s',
      }}
    >
      {/* Coordinate readout */}
      <div style={{
        position: 'absolute',
        left: '30px',
        top: '4px',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.5rem',
        color: 'rgba(101,182,195,0.8)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.05em',
        lineHeight: 1.7,
      }}>
        X:<span ref={coordXRef}>0000</span><br />
        Y:<span ref={coordYRef}>0000</span>
      </div>
    </div>
  )
}
