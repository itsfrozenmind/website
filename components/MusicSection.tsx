'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// "Wish You Were Here" - G pentatonic scale notes (Hz)
// Ambient sequence evokes the song's opening mood
const NOTES = [
  392.00, // G4
  440.00, // A4
  493.88, // B4
  587.33, // D5
  659.25, // E5
  329.63, // E4
  293.66, // D4
  392.00, // G4
]

const AMBIENT_SEQ = [
  { note: 392.00, dur: 1.8 }, // G4
  { note: 493.88, dur: 1.4 }, // B4
  { note: 587.33, dur: 2.0 }, // D5
  { note: 440.00, dur: 1.6 }, // A4
  { note: 392.00, dur: 2.2 }, // G4
  { note: 329.63, dur: 1.5 }, // E4
  { note: 440.00, dur: 1.8 }, // A4
  { note: 659.25, dur: 2.0 }, // E5
  { note: 587.33, dur: 1.4 }, // D5
  { note: 392.00, dur: 2.5 }, // G4
]

const SYMBOLS = ['♪', '♫', '♩', '♬', '♥', '☆', '&', '?', '!', '*', '+', '=', '~', '#', '○', '<', '∿', '≈', '…', '·']
const MUSIC_SYMS = ['♪', '♫', '♩', '♬']
const PLAY_COLORS = ['rgba(30,28,24,', 'rgba(91,107,73,', 'rgba(196,112,64,', 'rgba(91,138,88,']

interface Sym {
  x: number; y: number; char: string; size: number
  opacity: number; vx: number; vy: number
  colorIdx: number; phase: number; speed: number
  isMusic: boolean; noteIdx: number
  pulse: number
}

function createSynth(ctx: AudioContext, freq: number, volume = 0.18) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  // Delay nodes for simple reverb
  const delay1 = ctx.createDelay(0.5)
  const delay2 = ctx.createDelay(0.5)
  const delayGain1 = ctx.createGain()
  const delayGain2 = ctx.createGain()

  delay1.delayTime.value = 0.12
  delay2.delayTime.value = 0.28
  delayGain1.gain.value = 0.3
  delayGain2.gain.value = 0.15

  filter.type = 'lowpass'
  filter.frequency.value = 1800
  filter.Q.value = 0.5

  osc.type = 'sine'
  osc.frequency.value = freq

  // Soft attack, slow release
  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.12)
  gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, now + 0.5)
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.8)

  // Routing: osc → filter → gain → output + reverb
  osc.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)
  gainNode.connect(delay1)
  delay1.connect(delayGain1)
  delayGain1.connect(ctx.destination)
  delayGain1.connect(delay2)
  delay2.connect(delayGain2)
  delayGain2.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 3.2)
}

export default function MusicSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const symsRef = useRef<Sym[]>([])
  const animRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const seqTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const seqIdxRef = useRef(0)
  const playingRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [clicked, setClicked] = useState(false)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const playNote = useCallback((freq: number, volume = 0.18) => {
    const ctx = getCtx()
    createSynth(ctx, freq, volume)
  }, [getCtx])

  const scheduleNext = useCallback(() => {
    if (!playingRef.current) return
    const step = AMBIENT_SEQ[seqIdxRef.current % AMBIENT_SEQ.length]
    playNote(step.note, 0.14)

    // Pulse the matching symbol
    const sym = symsRef.current.find(s => s.isMusic)
    if (sym) sym.pulse = 1.0

    seqIdxRef.current++
    const gap = step.dur * 1000 + Math.random() * 600
    seqTimerRef.current = setTimeout(scheduleNext, gap)
  }, [playNote])

  const startSequencer = useCallback(() => {
    if (seqTimerRef.current) clearTimeout(seqTimerRef.current)
    scheduleNext()
  }, [scheduleNext])

  const stopSequencer = useCallback(() => {
    if (seqTimerRef.current) clearTimeout(seqTimerRef.current)
  }, [])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.max(Math.floor((canvas.width * canvas.height) / 7500), 32)
      symsRef.current = Array.from({ length: count }, (_, i) => {
        const isMusic = Math.random() < 0.25
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: isMusic ? MUSIC_SYMS[Math.floor(Math.random() * MUSIC_SYMS.length)] : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          size: Math.random() * 9 + 8,
          opacity: Math.random() * 0.3 + 0.08,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          colorIdx: isMusic ? (i % PLAY_COLORS.length) : 0,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.007 + 0.002,
          isMusic,
          noteIdx: i % NOTES.length,
          pulse: 0,
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isPlaying = playingRef.current
      const mult = isPlaying ? 2.5 : 1

      symsRef.current.forEach((s) => {
        s.phase += s.speed * mult
        s.x += s.vx * mult
        s.y += s.vy * mult
        if (s.pulse > 0) s.pulse = Math.max(0, s.pulse - 0.04)

        if (s.x < -20) s.x = canvas.width + 20
        if (s.x > canvas.width + 20) s.x = -20
        if (s.y < -20) s.y = canvas.height + 20
        if (s.y > canvas.height + 20) s.y = -20

        const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(s.phase))
        const pulseMod = 1 + s.pulse * 0.8
        const sizeBoost = isPlaying && s.isMusic ? Math.sin(s.phase * 2) * 2.5 + s.pulse * 4 : 0
        const opacityMod = isPlaying && s.isMusic ? Math.min(1, s.opacity * 2 + s.pulse * 0.5) : s.opacity

        const colorBase = isPlaying ? PLAY_COLORS[s.colorIdx] : PLAY_COLORS[0]
        const opacity = opacityMod * twinkle

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.scale(pulseMod, pulseMod)
        ctx.font = `${s.size + sizeBoost}px monospace`
        ctx.fillStyle = `${colorBase}${Math.min(opacity, 0.95).toFixed(2)})`
        ctx.fillText(s.char, 0, 0)
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current) }
  }, [])

  // Click on canvas → play a note at that position
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find nearest symbol to click
    let nearest: Sym | null = null
    let minDist = Infinity
    symsRef.current.forEach((s) => {
      const d = Math.hypot(s.x - x, s.y - y)
      if (d < minDist) { minDist = d; nearest = s }
    })

    if (nearest) {
      const sym = nearest as Sym
      playNote(NOTES[sym.noteIdx], 0.22)
      sym.pulse = 1.0
    }
  }, [playNote])

  const toggle = useCallback(() => {
    if (!clicked) setClicked(true)
    getCtx()
    if (playing) {
      playingRef.current = false
      setPlaying(false)
      stopSequencer()
    } else {
      playingRef.current = true
      setPlaying(true)
      startSequencer()
    }
  }, [clicked, playing, getCtx, startSequencer, stopSequencer])

  useEffect(() => {
    return () => {
      stopSequencer()
      audioCtxRef.current?.close()
    }
  }, [stopSequencer])

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-24">
      <div className="mb-6">
        <p className="mono mb-2" style={{ color: 'var(--muted)' }}>04 — VIBES</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}>
          A song that lives in my head.
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
          {!clicked ? 'Click the canvas to play notes. Click the button to start the ambient sequence.' : playing ? 'Softly playing...' : 'Paused — click to resume.'}
        </p>
      </div>

      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          height: '260px',
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${playing ? 'rgba(100,210,200,0.35)' : 'var(--border)'}`,
          transition: 'border-color 0.6s ease',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onClick={handleCanvasClick}
        />

        {/* Center label */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'rgba(240,237,232,0.4)', fontStyle: 'italic' }}>
                Wish You Were Here
              </p>
              <p className="mono mt-2" style={{ color: 'var(--muted)', fontSize: '0.58rem', letterSpacing: '0.12em' }}>
                CLICK SYMBOLS · PINK FLOYD
              </p>
            </div>
          </div>
        )}

        {/* Now playing */}
        {playing && (
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="status-dot" />
            <span className="mono" style={{ color: 'rgba(100,210,200,0.85)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
              WISH YOU WERE HERE — PINK FLOYD
            </span>
          </div>
        )}

        <p className="absolute bottom-3 right-4 mono pointer-events-none" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
          CLICK SYMBOLS TO PLAY NOTES
        </p>
      </div>

      {/* Play / pause button */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={toggle}
          className="mono px-5 py-2 rounded-full transition-all"
          style={{
            border: `1px solid ${playing ? 'rgba(100,210,200,0.4)' : 'var(--border)'}`,
            color: playing ? 'rgba(100,210,200,0.9)' : 'var(--muted)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            background: playing ? 'rgba(100,210,200,0.06)' : 'transparent',
          }}
        >
          {playing ? '◼ STOP AMBIENT' : '▶ PLAY AMBIENT'}
        </button>
        <p className="mono" style={{ color: 'var(--muted)', fontSize: '0.58rem' }}>
          or click the symbols above to pluck individual notes
        </p>
      </div>
    </section>
  )
}
