import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24 fade-up">
      {/* Top row: avatar + status pills */}
      <div className="flex items-start gap-5 mb-12">
        <div className="relative flex-shrink-0">
          <Image
            src="https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512"
            alt="Nimesh"
            width={68}
            height={68}
            className="rounded-sm"
            style={{ border: '1px solid var(--border-solid)', filter: 'grayscale(15%)' }}
            unoptimized
          />
          <div style={{ position: 'absolute', top: -3, left: -3, width: 10, height: 10, borderTop: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)', opacity: 0.7 }} />
          <div style={{ position: 'absolute', bottom: -3, right: -3, width: 10, height: 10, borderBottom: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', opacity: 0.7 }} />
        </div>
        <div className="pt-1">
          <p className="mono mb-1" style={{ color: 'var(--muted)' }}>FINAL YEAR · IIT GUWAHATI · 22°34&apos;N 88°21&apos;E</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="mono flex items-center gap-2 px-3 py-1 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.6rem' }}>
              <span className="status-dot" />
              BUILDING SBNRI
            </span>
            <span className="mono px-3 py-1 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.6rem' }}>
              5 SHIPPED
            </span>
          </div>
        </div>
      </div>

      {/* Main title */}
      <div className="mb-8">
        <p
          className="mono mb-3"
          style={{ color: 'rgba(101,182,195,0.5)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
        >
          WELCOME TO
        </p>
        <h1 style={{ lineHeight: 1.0, fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
          <span
            data-shove
            style={{
              display: 'block',
              fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            Nimesh&apos;s
          </span>
          <span
            data-shove
            style={{
              display: 'block',
              fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
              color: 'var(--teal)',
              textShadow: '0 0 40px rgba(101,182,195,0.25)',
              letterSpacing: '-0.01em',
            }}
          >
            Universe.
          </span>
        </h1>
      </div>

      <p
        data-shove
        style={{
          color: 'var(--muted)',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          fontFamily: 'Cormorant Garamond, serif',
          maxWidth: '460px',
          lineHeight: 1.5,
          marginBottom: '2.5rem',
        }}
      >
        breaker, builder and explorer of the shenanigans of the world.
      </p>

      <div className="flex items-center gap-5">
        <a
          href="#building"
          data-shove
          className="mono"
          style={{
            color: 'var(--teal)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            border: '1px solid rgba(101,182,195,0.3)',
            padding: '0.6rem 1.4rem',
            borderRadius: '2px',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            background: 'rgba(101,182,195,0.04)',
          }}
        >
          EXPLORE →
        </a>
        <a
          href="#vibes"
          data-shove
          className="mono"
          style={{
            color: 'var(--muted)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            opacity: 0.7,
          }}
        >
          or check the vibes ↓
        </a>
      </div>
    </section>
  )
}
