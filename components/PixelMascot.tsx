'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const WALK_SPEED = 1.3
const CHAR_W = 44
const GROUND_BOTTOM = 28

const EDGE_BUBBLES   = ['Careful! 😬', 'The void!', 'Whoa there!', 'Edge detected 🚨', 'Not going there.']
const CARD_BUBBLES   = ['Wow! 👀', 'Ooh nice one!', 'Cool stuff!', 'Lemme explore...', 'Interesting...']
const HELD_BUBBLES   = ['Hey!', 'Put me down!', 'Weeee 🎉', 'I can fly!!', 'Help!']
const IDLE_BUBBLES   = ['...', 'beep boop', '* walks *', 'exploring...', '🎵']
const RETURN_BUBBLES = ['back to it...', 'exploring!', '* resumes *']

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

type Mode = 'walking' | 'held' | 'walking-to' | 'at-card'

function MascotSVG({ dir, mode, walking }: { dir: 'left' | 'right'; mode: Mode; walking: boolean }) {
  const eyeX = dir === 'right' ? 1.2 : -1.2

  const mouth = mode === 'held'
    ? <circle cx="22" cy="33" r="3" fill="rgba(255,255,255,0.7)" />
    : mode === 'at-card'
    ? <path d="M14 32 Q22 37 30 32" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    : <path d="M15 33 Q22 36 29 33" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" fill="none" strokeLinecap="round" />

  return (
    <svg viewBox="0 0 44 58" width="44" height="58" style={{ display: 'block', overflow: 'visible' }}>
      {/* Antenna */}
      <line x1="22" y1="3" x2="22" y2="11" stroke="#2A2520" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="3" r="3.5" fill="#5B6B49" />

      {/* Body */}
      <rect x="3" y="10" width="38" height="30" rx="8" fill="#2A2520" />

      {/* Screen */}
      <rect x="7" y="14" width="30" height="22" rx="5" fill="#1a1814" />

      {/* Eye whites */}
      <circle cx="15.5" cy="24" r="6" fill="white" />
      <circle cx="28.5" cy="24" r="6" fill="white" />

      {/* Pupils */}
      <circle cx={15.5 + eyeX} cy="24" r="2.8" fill="#1a1814" />
      <circle cx={28.5 + eyeX} cy="24" r="2.8" fill="#1a1814" />

      {/* Shine */}
      <circle cx={13.5 + eyeX} cy="22" r="1.1" fill="white" opacity="0.5" />
      <circle cx={26.5 + eyeX} cy="22" r="1.1" fill="white" opacity="0.5" />

      {/* Mouth */}
      {mouth}

      {/* Left leg */}
      <g style={{
        transformOrigin: '13px 40px',
        animation: walking ? 'mascot-leg-l 0.42s ease-in-out infinite alternate' : 'none',
      }}>
        <rect x="8" y="40" width="10" height="11" rx="3.5" fill="#2A2520" />
        <rect x="6" y="48" width="14" height="5" rx="2.5" fill="#1a1814" />
      </g>

      {/* Right leg */}
      <g style={{
        transformOrigin: '31px 40px',
        animation: walking ? 'mascot-leg-r 0.42s ease-in-out infinite alternate' : 'none',
      }}>
        <rect x="26" y="40" width="10" height="11" rx="3.5" fill="#2A2520" />
        <rect x="24" y="48" width="14" height="5" rx="2.5" fill="#1a1814" />
      </g>
    </svg>
  )
}

export default function PixelMascot() {
  const mascotRef  = useRef<HTMLDivElement>(null)
  const posRef     = useRef({ x: 120 })
  const dirRef     = useRef<'right' | 'left'>('right')
  const modeRef    = useRef<Mode>('walking')
  const targetXRef = useRef<number | null>(null)
  const rafRef     = useRef<number>(0)
  const bubbleTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resumeTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragOffsetRef   = useRef({ x: 0, y: 0 })
  const didDragRef      = useRef(false)

  const [dir,     setDir]     = useState<'right' | 'left'>('right')
  const [mode,    setMode]    = useState<Mode>('walking')
  const [walking, setWalking] = useState(true)
  const [bubble,  setBubble]  = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const showBubble = useCallback((msg: string, ms = 2200) => {
    setBubble(msg)
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    bubbleTimerRef.current = setTimeout(() => setBubble(null), ms)
  }, [])

  const moveDOM = useCallback((x: number, bottom?: number) => {
    const el = mascotRef.current
    if (!el) return
    el.style.left = x + 'px'
    if (bottom !== undefined) el.style.bottom = bottom + 'px'
  }, [])

  const resumeWalking = useCallback(() => {
    modeRef.current = 'walking'
    setMode('walking')
    setWalking(true)
  }, [])

  // Main RAF loop
  const tick = useCallback(() => {
    const w = window.innerWidth

    if (modeRef.current === 'walking') {
      posRef.current.x += dirRef.current === 'right' ? WALK_SPEED : -WALK_SPEED

      if (posRef.current.x >= w - CHAR_W - 12) {
        posRef.current.x = w - CHAR_W - 12
        dirRef.current = 'left'; setDir('left')
        modeRef.current = 'at-card'; setWalking(false)
        showBubble(pick(EDGE_BUBBLES))
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(resumeWalking, 1400)
      }
      if (posRef.current.x <= 12) {
        posRef.current.x = 12
        dirRef.current = 'right'; setDir('right')
        modeRef.current = 'at-card'; setWalking(false)
        showBubble(pick(EDGE_BUBBLES))
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(resumeWalking, 1400)
      }
      moveDOM(posRef.current.x)
    }

    else if (modeRef.current === 'walking-to' && targetXRef.current !== null) {
      const dist = targetXRef.current - posRef.current.x
      if (Math.abs(dist) < 2) {
        posRef.current.x = targetXRef.current
        targetXRef.current = null
        modeRef.current = 'at-card'; setMode('at-card'); setWalking(false)
        showBubble(pick(CARD_BUBBLES), 3000)
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(resumeWalking, 3800)
      } else {
        const step = dist > 0 ? WALK_SPEED * 1.6 : -WALK_SPEED * 1.6
        const newDir: 'right' | 'left' = dist > 0 ? 'right' : 'left'
        if (dirRef.current !== newDir) { dirRef.current = newDir; setDir(newDir) }
        posRef.current.x += step
      }
      moveDOM(posRef.current.x)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [showBubble, moveDOM, resumeWalking])

  useEffect(() => {
    if (!mounted) return
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mounted, tick])

  // Random idle bubbles
  useEffect(() => {
    if (!mounted) return
    idleTimerRef.current = setInterval(() => {
      if (modeRef.current === 'walking' && Math.random() < 0.25) {
        showBubble(pick(IDLE_BUBBLES), 1600)
      }
    }, 9000)
    return () => { if (idleTimerRef.current) clearInterval(idleTimerRef.current) }
  }, [mounted, showBubble])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    didDragRef.current = false
    const rect = mascotRef.current!.getBoundingClientRect()
    dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    const savedMode = modeRef.current
    modeRef.current = 'held'; setMode('held'); setWalking(false)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)

    const onMove = (me: MouseEvent) => {
      didDragRef.current = true
      const el = mascotRef.current
      if (!el) return
      el.style.left   = (me.clientX - dragOffsetRef.current.x) + 'px'
      el.style.bottom = 'auto'
      el.style.top    = (me.clientY - dragOffsetRef.current.y) + 'px'
      posRef.current.x = me.clientX - dragOffsetRef.current.x
    }

    const onUp = (ue: MouseEvent) => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)

      const el = mascotRef.current
      if (!el) return
      el.style.top    = 'auto'
      el.style.bottom = GROUND_BOTTOM + 'px'

      if (!didDragRef.current) {
        // poke
        showBubble(pick(['Hey! 👋', 'Boo!', 'Hi there!', '* waves *', '😑']), 1500)
        modeRef.current = savedMode
        setMode(savedMode)
        if (savedMode === 'walking') setWalking(true)
        return
      }

      showBubble(pick(HELD_BUBBLES), 1200)

      const els = document.elementsFromPoint(ue.clientX, ue.clientY)
      const onCard = els.some(el => el.getAttribute?.('data-project-card') === 'true')

      if (onCard) {
        const card = els.find(el => el.getAttribute?.('data-project-card') === 'true')
        const cardRect = card?.getBoundingClientRect()
        if (cardRect) {
          const tx = cardRect.left + cardRect.width / 2 - CHAR_W / 2
          targetXRef.current = Math.max(12, Math.min(window.innerWidth - CHAR_W - 12, tx))
        }
        modeRef.current = 'walking-to'; setMode('walking-to'); setWalking(true)
        showBubble('On my way! 🏃', 1500)
      } else {
        showBubble(pick(RETURN_BUBBLES), 1500)
        modeRef.current = 'walking'; setMode('walking'); setWalking(true)
      }
    }

    showBubble(pick(HELD_BUBBLES), 1200)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [showBubble])

  if (!mounted) return null

  return (
    <div
      ref={mascotRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        bottom: GROUND_BOTTOM,
        left: posRef.current.x,
        zIndex: 997,
        cursor: mode === 'held' ? 'grabbing' : 'grab',
        userSelect: 'none',
        transform: `scaleX(${dir === 'left' ? -1 : 1})`,
        transition: 'transform 0.12s',
        filter: 'drop-shadow(0 2px 6px rgba(30,28,24,0.15))',
      }}
    >
      {/* Speech bubble — counter-flip so text stays readable */}
      {bubble && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: `translateX(-50%) scaleX(${dir === 'left' ? -1 : 1})`,
          marginBottom: '6px',
          background: 'white',
          border: '1.5px solid var(--border-solid)',
          borderRadius: '10px',
          padding: '5px 10px',
          whiteSpace: 'nowrap',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.58rem',
          color: 'var(--text)',
          pointerEvents: 'none',
          boxShadow: '0 2px 10px rgba(30,28,24,0.1)',
          letterSpacing: '0.03em',
        }}>
          {bubble}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid var(--border-solid)',
          }} />
        </div>
      )}

      <MascotSVG dir={dir} mode={mode} walking={walking} />
    </div>
  )
}
