import Image from 'next/image'

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-20">
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-10">
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src="https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512"
              alt="Nimesh"
              width={80}
              height={80}
              className="rounded-lg"
              style={{ border: '1px solid var(--border)' }}
              unoptimized
            />
            <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>v1.0 — Final Year, IIT Guwahati</span>
          </div>
          <h1 className="cursor" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', lineHeight: 1.05, marginBottom: '0.75rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
            Nimesh
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            breaker, builder and explorer of the shenanigans of the world.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          <span className="pulse-dot" />
          Building SBNRI
        </div>
        <div className="text-xs px-3 py-1.5 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          5 things shipped
        </div>
        <div className="text-xs px-3 py-1.5 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          More cooking →
        </div>
      </div>
    </section>
  )
}
