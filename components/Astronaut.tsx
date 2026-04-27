'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type CharState = 'idle' | 'poked' | 'jailed' | 'dragging' | 'falling' | 'rising'

const POKE_MESSAGES: Record<number, string> = {
  1:  'Hey!',
  3:  'Ow ow ow!',
  5:  'Stop poking me!',
  10: '...ok I kinda like this',
  15: 'Are you okay?',
  20: 'You need help.',
  30: 'I\'m calling mission control.',
  50: 'Fine. I live here now.',
}

function getPokeMessage(count: number) {
  const milestones = Object.keys(POKE_MESSAGES).map(Number).sort((a, b) => b - a)
  for (const m of milestones) {
    if (count >= m) return POKE_MESSAGES[m]
  }
  return 'Hey!'
}

function AstronautSVG({ state }: { state: CharState }) {
  const visorColor = state === 'jailed' ? '#2a2a2a' : '#1a2a4a'
  const suitColor = '#D0DAEE'
  const suitStroke = '#9AAAC8'

  const face = {
    idle: (
      <>
        <circle cx="19" cy="21" r="1.8" fill="#4ADE80" />
        <circle cx="26" cy="21" r="1.8" fill="#4ADE80" />
        <path d="M18 25.5 Q22.5 28 27 25.5" stroke="#4ADE80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </>
    ),
    poked: (
      <>
        <path d="M17 19 L20 22 M20 19 L17 22" stroke="#F5E642" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25 19 L28 22 M28 19 L25 22" stroke="#F5E642" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="22.5" cy="27" rx="3" ry="2" fill="#F5E642" opacity="0.6" />
      </>
    ),
    jailed: (
      <>
        <path d="M18 20 Q19.5 22 18 25" stroke="#aaa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M25 20 Q26.5 22 25 25" stroke="#aaa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M18 28 Q22.5 26 27 28" stroke="#aaa" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </>
    ),
    falling: (
      <>
        <circle cx="19" cy="21" r="2.2" fill="white" opacity="0.9" />
        <circle cx="26" cy="21" r="2.2" fill="white" opacity="0.9" />
        <path d="M18 27 Q22.5 25 27 27" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </>
    ),
    rising: (
      <>
        <circle cx="19" cy="22" r="1.8" fill="#4ADE80" />
        <circle cx="26" cy="22" r="1.8" fill="#4ADE80" />
        <path d="M18 25 Q22.5 28.5 27 25" stroke="#4ADE80" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    dragging: (
      <>
        <circle cx="19" cy="21" r="1.8" fill="#F5E642" />
        <circle cx="26" cy="21" r="1.8" fill="#F5E642" />
        <path d="M18 25 Q22.5 27 27 25" stroke="#F5E642" strokeWidth="1" fill="none" strokeLinecap="round" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 45 75" width="52" height="76" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Jetpack */}
      <rect x="17" y="40" width="11" height="16" rx="3" fill="#8899BB" stroke={suitStroke} strokeWidth="0.8" />
      <rect x="19" y="54" width="3" height="5" rx="1.5" fill="#F5E642" opacity="0.7" />
      <rect x="23" y="54" width="3" height="5" rx="1.5" fill="#F5E642" opacity="0.5" />

      {/* Body */}
      <rect x="11" y="38" width="23" height="22" rx="7" fill={suitColor} stroke={suitStroke} strokeWidth="1" />
      {/* Chest detail */}
      <rect x="16" y="43" width="13" height="8" rx="2" fill="#B8C8E0" stroke={suitStroke} strokeWidth="0.5" />
      <circle cx="22.5" cy="47" r="2" fill="#4ADE80" opacity="0.7" />

      {/* Left arm */}
      <path d="M11 44 Q3 48 5 56" stroke={suitStroke} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M11 44 Q3 48 5 56" stroke={suitColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="5" cy="57" r="3.5" fill={suitColor} stroke={suitStroke} strokeWidth="0.8" />

      {/* Right arm */}
      <path d="M34 44 Q42 48 40 56" stroke={suitStroke} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M34 44 Q42 48 40 56" stroke={suitColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="57" r="3.5" fill={suitColor} stroke={suitStroke} strokeWidth="0.8" />

      {/* Left leg */}
      <path d="M17 60 Q14 68 12 73" stroke={suitStroke} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M17 60 Q14 68 12 73" stroke={suitColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="73" rx="4" ry="2.5" fill={suitColor} stroke={suitStroke} strokeWidth="0.8" />

      {/* Right leg */}
      <path d="M28 60 Q31 68 33 73" stroke={suitStroke} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M28 60 Q31 68 33 73" stroke={suitColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="73" rx="4" ry="2.5" fill={suitColor} stroke={suitStroke} strokeWidth="0.8" />

      {/* Helmet */}
      <circle cx="22.5" cy="20" r="19" fill={suitColor} stroke={suitStroke} strokeWidth="1" />
      {/* Visor */}
      <ellipse cx="22.5" cy="21" rx="13" ry="11" fill={visorColor} />
      {/* Visor reflection */}
      <ellipse cx="17" cy="16" rx="3.5" ry="2.5" fill="white" opacity="0.15" />
      {/* Face */}
      {face[state]}

      {/* Jail bars overlay */}
      {state === 'jailed' && (
        <g>
          <rect x="0" y="0" width="45" height="75" fill="rgba(0,0,0,0.3)" rx="4" />
          {[8, 16, 24, 32, 40].map((x) => (
            <rect key={x} x={x} y="0" width="2.5" height="75" fill="#888" opacity="0.8" rx="1" />
          ))}
          <rect x="0" y="30" width="45" height="2.5" fill="#888" opacity="0.6" />
        </g>
      )}
    </svg>
  )
}

export default function Astronaut() {
  const [state, setState] = useState<CharState>('idle')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [pokeCount, setPokeCount] = useState(0)
  const [bubble, setBubble] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })
  const lastScrollY = useRef(0)
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pokeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stateRef = useRef<CharState>('idle')

  stateRef.current = state

  useEffect(() => {
    setMounted(true)
    setPos({ x: window.innerWidth - 110, y: window.innerHeight - 180 })
  }, [])

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (stateRef.current === 'jailed' || stateRef.current === 'dragging') return
      const delta = window.scrollY - lastScrollY.current
      lastScrollY.current = window.scrollY

      if (Math.abs(delta) > 5) {
        setState(delta > 0 ? 'falling' : 'rising')
      }

      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => {
        if (stateRef.current !== 'jailed' && stateRef.current !== 'dragging') setState('idle')
      }, 600)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showBubble = useCallback((msg: string, duration = 2000) => {
    setBubble(msg)
    if (pokeTimer.current) clearTimeout(pokeTimer.current)
    pokeTimer.current = setTimeout(() => setBubble(null), duration)
  }, [])

  const handlePoke = useCallback((e: React.MouseEvent) => {
    if (isDragging) return
    e.stopPropagation()
    if (stateRef.current === 'jailed') {
      setState('idle')
      showBubble('Freedom!! 🚀', 2000)
      return
    }
    const next = pokeCount + 1
    setPokeCount(next)
    setState('poked')
    showBubble(getPokeMessage(next))
    setTimeout(() => {
      if (stateRef.current === 'poked') setState('idle')
    }, 700)
  }, [isDragging, pokeCount, showBubble])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (stateRef.current === 'jailed') return
    e.preventDefault()
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }

    const onMove = (me: MouseEvent) => {
      const dx = me.clientX - dragStart.current.mx
      const dy = me.clientY - dragStart.current.my
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        setIsDragging(true)
        setState('dragging')
      }
      setPos({ x: dragStart.current.px + dx, y: dragStart.current.py + dy })
    }

    const onUp = (ue: MouseEvent) => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)

      // Check if dropped on a project card
      const els = document.elementsFromPoint(ue.clientX, ue.clientY)
      const onCard = els.some((el) => el.getAttribute?.('data-project-card') === 'true')

      if (onCard) {
        setState('jailed')
        showBubble('Let me out!! 🔒', 99999)
      } else {
        setState('idle')
        setBubble(null)
      }
      setTimeout(() => setIsDragging(false), 50)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [pos, showBubble])

  const animStyle = (): React.CSSProperties => {
    if (state === 'idle') return { animation: 'astro-float 3s ease-in-out infinite' }
    if (state === 'falling') return { animation: 'astro-fall 0.5s ease-in-out infinite' }
    if (state === 'rising') return { animation: 'astro-rise 0.4s ease-in-out infinite' }
    if (state === 'poked') return { animation: 'astro-poke 0.3s ease-in-out 2' }
    if (state === 'dragging') return { animation: 'none', transform: 'scale(1.08) rotate(-8deg)' }
    return {}
  }

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes astro-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes astro-fall {
          0%, 100% { transform: rotate(-15deg) translateY(2px); }
          50% { transform: rotate(15deg) translateY(-2px); }
        }
        @keyframes astro-rise {
          0% { transform: translateY(0) rotate(5deg); }
          100% { transform: translateY(-6px) rotate(-5deg); }
        }
        @keyframes astro-poke {
          0%, 100% { transform: scale(1) translateX(0); }
          25% { transform: scale(1.15) translateX(-4px); }
          75% { transform: scale(0.9) translateX(4px); }
        }
        @keyframes bar-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          zIndex: 999,
          cursor: state === 'jailed' ? 'pointer' : isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          filter: state === 'jailed' ? 'brightness(0.7)' : 'drop-shadow(0 0 8px rgba(200,220,255,0.3))',
          animation: state === 'jailed' ? 'bar-shake 2s ease-in-out infinite' : 'none',
        }}
        onMouseDown={onMouseDown}
        onClick={handlePoke}
      >
        {/* Speech bubble */}
        {bubble && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            padding: '6px 10px',
            whiteSpace: 'nowrap',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(240,237,232,0.9)',
            pointerEvents: 'none',
            letterSpacing: '0.05em',
          }}>
            {bubble}
            {pokeCount > 0 && state !== 'jailed' && (
              <span style={{ color: 'rgba(240,237,232,0.4)', marginLeft: '4px' }}>×{pokeCount}</span>
            )}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(255,255,255,0.15)',
            }} />
          </div>
        )}

        <div style={animStyle()}>
          <AstronautSVG state={state} />
        </div>

        {/* Drag hint on first render */}
        {pokeCount === 0 && state === 'idle' && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '4px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.55rem',
            color: 'rgba(240,237,232,0.25)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}>
            poke or drag me
          </div>
        )}
      </div>
    </>
  )
}
