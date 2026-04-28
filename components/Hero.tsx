import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-14 pb-20 fade-up">
      <div className="flex items-start gap-5 mb-10">
        <div className="relative flex-shrink-0">
          <Image
            src="https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512"
            alt="Nimesh"
            width={72}
            height={72}
            className="rounded-sm"
            style={{ border: '1px solid var(--border-solid)', filter: 'grayscale(20%)' }}
            unoptimized
          />
          {/* HUD corner brackets on avatar */}
          <div style={{ position: 'absolute', top: -3, left: -3, width: 10, height: 10, borderTop: '1.5px solid var(--accent)', borderLeft: '1.5px solid var(--accent)', opacity: 0.7 }} />
          <div style={{ position: 'absolute', bottom: -3, right: -3, width: 10, height: 10, borderBottom: '1.5px solid var(--accent)', borderRight: '1.5px solid var(--accent)', opacity: 0.7 }} />
        </div>
        <div>
          <p className="mono mb-2" style={{ color: 'var(--muted)' }}>FINAL YEAR · IIT GUWAHATI · 22°34&apos;N 88°21&apos;E</p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.05, color: 'var(--text)' }}>
            Nimesh
          </h1>
          <p className="mt-2" style={{ color: 'var(--muted)', fontSize: '1rem', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
            breaker, builder and explorer of the shenanigans of the world.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="mono flex items-center gap-2 px-3 py-1.5 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          <span className="status-dot" />
          BUILDING SBNRI
        </span>
        <span className="mono px-3 py-1.5 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          5 SHIPPED
        </span>
        <span className="mono px-3 py-1.5 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          MORE COOKING →
        </span>
      </div>
    </section>
  )
}
