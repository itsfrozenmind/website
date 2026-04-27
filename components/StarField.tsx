'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
  type: 'dot' | 'cross' | 'sparkle'
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        twinkleOffset: Math.random() * Math.PI * 2,
        type: Math.random() < 0.07 ? 'cross' : Math.random() < 0.04 ? 'sparkle' : 'dot',
      }))
    }

    const drawCross = (x: number, y: number, size: number, opacity: number) => {
      ctx.strokeStyle = `rgba(240,237,232,${opacity})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(x - size * 3, y)
      ctx.lineTo(x + size * 3, y)
      ctx.moveTo(x, y - size * 3)
      ctx.lineTo(x, y + size * 3)
      ctx.stroke()
    }

    const drawSparkle = (x: number, y: number, size: number, opacity: number) => {
      ctx.strokeStyle = `rgba(240,237,232,${opacity})`
      ctx.lineWidth = 0.4
      const arms = 4
      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2
        const len = size * 4
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len)
        ctx.stroke()
      }
    }

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      stars.forEach((star) => {
        const t = frame * star.twinkleSpeed + star.twinkleOffset
        const opacity = star.opacity * (0.5 + 0.5 * Math.sin(t))
        if (star.type === 'cross') {
          drawCross(star.x, star.y, star.size, opacity)
        } else if (star.type === 'sparkle') {
          drawSparkle(star.x, star.y, star.size, opacity)
        } else {
          ctx.fillStyle = `rgba(240,237,232,${opacity})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.9 }}
    />
  )
}
