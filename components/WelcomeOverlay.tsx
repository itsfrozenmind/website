'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// G major chord: G2 D3 G4 B4 D5 G5 G6
function playSunrise() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const t = ctx.currentTime

    // Reverb impulse
    const buf = ctx.createBuffer(2, Math.floor(ctx.sampleRate * 2.4), ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3.2)
    }
    const reverb = ctx.createConvolver()
    reverb.buffer = buf
    const out = ctx.createGain(); out.gain.value = 0.55; out.connect(ctx.destination)
    const rvg = ctx.createGain(); rvg.gain.value = 0.55; reverb.connect(rvg); rvg.connect(out)
    const send = (n: AudioNode) => { n.connect(out); n.connect(reverb) }

    // Layer 1 — sawtooth bass (G2, D3, G4)
    ;[196, 293.66, 392].forEach(f => {
      [-7, 7].forEach(dt => {
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.085, t + 0.7)
        g.gain.setValueAtTime(0.085, t + 1.6)
        g.gain.exponentialRampToValueAtTime(0.001, t + 3.2)
        const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 1500; flt.Q.value = 0.6
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = dt
        o.connect(flt); flt.connect(g); send(g); o.start(t); o.stop(t + 3.4)
      })
    })

    // Layer 2 — triangle mid (B4, D5)
    ;[493.88, 587.33].forEach(f => {
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.075, t + 0.9)
      g.gain.setValueAtTime(0.075, t + 1.7)
      g.gain.exponentialRampToValueAtTime(0.001, t + 3)
      const flt = ctx.createBiquadFilter(); flt.type = 'highpass'; flt.frequency.value = 320; flt.Q.value = 0.5
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f
      o.connect(flt); flt.connect(g); send(g); o.start(t + 0.15); o.stop(t + 3.2)
    })

    // Layer 3 — vibrato sines (G4, B4, D5, G5)
    const lfo = ctx.createOscillator(); lfo.frequency.value = 4.5
    const lfoG = ctx.createGain(); lfoG.gain.value = 4
    lfo.connect(lfoG); lfo.start(t + 0.2); lfo.stop(t + 3.2)
    ;[392, 493.88, 587.33, 783.99].forEach(f => {
      [-10, 0, 10].forEach(dt => {
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.06, t + 1)
        g.gain.setValueAtTime(0.06, t + 1.8)
        g.gain.exponentialRampToValueAtTime(0.001, t + 3.2)
        const flt = ctx.createBiquadFilter(); flt.type = 'bandpass'; flt.frequency.value = 950; flt.Q.value = 0.55
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.detune.value = dt
        lfoG.connect(o.detune); o.connect(flt); flt.connect(g); send(g); o.start(t + 0.2); o.stop(t + 3.2)
      })
    })

    // Layer 4 — chime hit at +0.75s (G5, G6)
    const ct = t + 0.75
    ;[783.99, 1174.66].forEach((f, i) => {
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, ct)
      g.gain.linearRampToValueAtTime(i === 0 ? 0.32 : 0.18, ct + 0.015)
      g.gain.exponentialRampToValueAtTime(0.001, ct + 1.4)
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.detune.value = i === 0 ? 0 : 4
      o.connect(g); send(g); o.start(ct); o.stop(ct + 1.5)
    })
  } catch {}
}

async function sunriseDisc(x: number, y: number) {
  const disc = document.createElement('div')
  disc.style.cssText = [
    'position:fixed',
    `left:${x}px`,
    `top:${y}px`,
    'width:260vmax',
    'height:260vmax',
    'margin-left:-130vmax',
    'margin-top:-130vmax',
    'background:var(--bg)',
    'border-radius:50%',
    'z-index:10001',
    'pointer-events:none',
    'transform:scale(0.01)',
    'will-change:transform',
  ].join(';')
  document.body.appendChild(disc)

  try {
    await disc.animate(
      [{ transform: 'scale(0.01)' }, { transform: 'scale(1)' }],
      { duration: 1100, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' }
    ).finished
  } catch {}

  return disc
}

export default function WelcomeOverlay() {
  const [gone, setGone]   = useState(false)
  const firedRef          = useRef(false)
  const btnRef            = useRef<HTMLButtonElement>(null)

  const enter = useCallback(async (x: number, y: number) => {
    if (firedRef.current) return
    firedRef.current = true
    playSunrise()
    const disc = await sunriseDisc(x, y)
    setGone(true)
    try {
      await disc.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 400, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
      ).finished
    } catch {}
    disc.remove()
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    enter(r.left + r.width / 2, r.top + r.height / 2)
  }, [enter])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || firedRef.current) return
      const btn = btnRef.current
      if (!btn) return
      const r = btn.getBoundingClientRect()
      enter(r.left + r.width / 2, r.top + r.height / 2)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enter])

  if (gone) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
      }}
    >
      {/* Nebula glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(101,182,195,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p className="mono" style={{ color: 'rgba(101,182,195,0.5)', fontSize: '0.6rem', letterSpacing: '0.35em' }}>
        N · I · M · E · S · H
      </p>

      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 300,
        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
        color: 'var(--text)',
        textAlign: 'center',
        lineHeight: 1.08,
        letterSpacing: '-0.01em',
      }}>
        Welcome to<br />
        <span style={{ color: 'var(--teal)', textShadow: '0 0 50px rgba(101,182,195,0.3)' }}>
          the Universe.
        </span>
      </h1>

      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        color: 'var(--muted)',
        fontSize: '1rem',
        marginTop: '0.25rem',
        marginBottom: '0.75rem',
      }}>
        breaker, builder, explorer of shenanigans.
      </p>

      <button
        ref={btnRef}
        onClick={handleClick}
        className="mono"
        style={{
          color: 'var(--teal)',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          border: '1px solid rgba(101,182,195,0.35)',
          padding: '0.75rem 2.2rem',
          borderRadius: '2px',
          background: 'rgba(101,182,195,0.05)',
          transition: 'all 0.2s ease',
        }}
      >
        ENTER →
      </button>

      <p className="mono" style={{ color: 'var(--muted)', fontSize: '0.5rem', letterSpacing: '0.12em', opacity: 0.45 }}>
        or press ↵
      </p>
    </div>
  )
}
