'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; decay: number
  size: number; isTeal: boolean
}

export default function SparkBurst() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef       = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const spawn = (x: number, y: number) => {
      const count = 22
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
        const speed = 1.2 + Math.random() * 3.8
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 1 / ((0.45 + Math.random() * 0.55) * 60),
          size: 1.2 + Math.random() * 2.4,
          isTeal: Math.random() < 0.55,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      for (const p of particlesRef.current) {
        p.x  += p.vx
        p.y  += p.vy
        p.vy += 0.04
        p.life -= p.decay
        const a = Math.max(0, p.life)
        ctx.fillStyle = p.isTeal
          ? `rgba(101,182,195,${a})`
          : `rgba(255,255,255,${a * 0.85})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2)
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('click', (e) => spawn(e.clientX, e.clientY))
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}
    />
  )
}
