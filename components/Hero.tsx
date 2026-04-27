import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="orb absolute" style={{ width: '80px', height: '80px', top: '22%', left: '52%', transform: 'translateX(-50%)' }} />

      <div className="relative z-10 fade-up">
        <p className="mono mb-4" style={{ color: 'var(--muted)' }}>WELCOME TO</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1.0, marginBottom: '2rem', fontWeight: 300, letterSpacing: '-0.01em' }}>
          Nimesh&apos;s Universe
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontStyle: 'italic' }}>
          breaker, builder and explorer<br />of the shenanigans of the world.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            href="#building"
            className="mono px-6 py-2.5 rounded-full transition-all hover:bg-white hover:text-[var(--bg)]"
            style={{ border: '1px solid rgba(240,237,232,0.3)', color: 'var(--text)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
          >
            EXPLORE →
          </Link>
          <p className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>SCROLL TO EXPLORE</p>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 text-center px-6">
        <p className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
          <span style={{ color: 'var(--text)' }}>BUILDING</span> IS OUT THERE, WAITING · TO BE DONE. WHY NOT <span style={{ color: 'var(--text)' }}>BY YOU?</span>
        </p>
      </div>
    </section>
  )
}
