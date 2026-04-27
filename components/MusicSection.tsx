'use client'

import { useEffect, useRef, useState } from 'react'

// Pink Floyd - Wish You Were Here (YouTube video ID)
// Update this if the video becomes unavailable
const YT_VIDEO_ID = 'IXdNnw99-Ic'

const SYMBOLS = ['♪', '♫', '♩', '♬', '♥', '☆', '&', '?', '!', '*', '+', '=', '~', '#', '○', '<', '∿', '≈', '…', '·']
const MUSIC_SYMS = ['♪', '♫', '♩', '♬']
const PLAY_COLORS = [
  'rgba(240,237,232,',
  'rgba(100,210,200,',
  'rgba(220,100,180,',
  'rgba(245,230,66,',
]

interface Sym {
  x: number; y: number; char: string; size: number
  opacity: number; vx: number; vy: number
  colorIdx: number; phase: number; speed: number; isMusic: boolean
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: { Player: new (id: string, opts: any) => YTPlayer }
    onYouTubeIframeAPIReady: () => void
  }
}

export default function MusicSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const symsRef = useRef<Sym[]>([])
  const animRef = useRef<number>(0)
  const playerRef = useRef<YTPlayer | null>(null)
  const playingRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(false)

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) { setReady(true); return }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => setReady(true)
  }, [])

  // Init player once API is ready
  useEffect(() => {
    if (!ready) return
    playerRef.current = new window.YT.Player('yt-hidden-player', {
      videoId: YT_VIDEO_ID,
      playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 },
      events: {},
    })
    return () => playerRef.current?.destroy()
  }, [ready])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.max(Math.floor((canvas.width * canvas.height) / 7000), 35)
      symsRef.current = Array.from({ length: count }, () => {
        const isMusic = Math.random() < 0.25
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: isMusic ? MUSIC_SYMS[Math.floor(Math.random() * MUSIC_SYMS.length)] : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          size: Math.random() * 10 + 8,
          opacity: Math.random() * 0.35 + 0.08,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          colorIdx: isMusic ? Math.floor(Math.random() * PLAY_COLORS.length) : 0,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003,
          isMusic,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isPlaying = playingRef.current
      const mult = isPlaying ? 2.8 : 1

      symsRef.current.forEach((s) => {
        s.phase += s.speed * mult
        s.x += s.vx * mult
        s.y += s.vy * mult
        if (s.x < -20) s.x = canvas.width + 20
        if (s.x > canvas.width + 20) s.x = -20
        if (s.y < -20) s.y = canvas.height + 20
        if (s.y > canvas.height + 20) s.y = -20

        const pulse = isPlaying && s.isMusic
          ? 0.3 + 0.7 * Math.abs(Math.sin(s.phase * 2.5))
          : 0.3 + 0.7 * Math.abs(Math.sin(s.phase))

        const sizeBoost = isPlaying && s.isMusic ? Math.sin(s.phase * 2) * 3 : 0
        const colorBase = isPlaying ? PLAY_COLORS[s.colorIdx] : PLAY_COLORS[0]

        ctx.font = `${s.size + sizeBoost}px monospace`
        ctx.fillStyle = `${colorBase}${(s.opacity * pulse).toFixed(2)})`
        ctx.fillText(s.char, s.x, s.y)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current) }
  }, [])

  const toggle = () => {
    if (!clicked) setClicked(true)
    if (playing) {
      playerRef.current?.pauseVideo()
      playingRef.current = false
      setPlaying(false)
    } else {
      playerRef.current?.playVideo()
      playingRef.current = true
      setPlaying(true)
    }
  }

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-24">
      <div className="mb-6">
        <p className="mono mb-2" style={{ color: 'var(--muted)' }}>04 — VIBES</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}>
          A song that lives in my head.
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
          {!clicked ? 'Click anywhere below to play.' : playing ? 'Now playing...' : 'Paused.'}
        </p>
      </div>

      {/* Hidden YouTube player */}
      <div id="yt-hidden-player" style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }} />

      <div
        onClick={toggle}
        className="relative rounded-lg overflow-hidden cursor-pointer select-none"
        style={{
          height: '260px',
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${playing ? 'rgba(100,210,200,0.35)' : 'var(--border)'}`,
          transition: 'border-color 0.6s ease',
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Idle label */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'rgba(240,237,232,0.45)', fontStyle: 'italic', lineHeight: 1.2 }}>
                Wish You Were Here
              </p>
              <p className="mono mt-2" style={{ color: 'var(--muted)', fontSize: '0.58rem', letterSpacing: '0.12em' }}>
                PINK FLOYD · {clicked ? 'CLICK TO RESUME' : 'CLICK TO PLAY'}
              </p>
            </div>
          </div>
        )}

        {/* Now playing bar */}
        {playing && (
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="status-dot" />
            <span className="mono" style={{ color: 'rgba(100,210,200,0.85)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              WISH YOU WERE HERE — PINK FLOYD
            </span>
          </div>
        )}

        {playing && (
          <p className="absolute bottom-3 right-4 mono pointer-events-none" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
            CLICK TO PAUSE
          </p>
        )}
      </div>
    </section>
  )
}
