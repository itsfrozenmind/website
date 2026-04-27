import Image from 'next/image'

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pt-14 pb-20 fade-up">
      <div className="flex items-start gap-5 mb-10">
        <Image
          src="https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512"
          alt="Nimesh"
          width={72}
          height={72}
          className="rounded-xl flex-shrink-0"
          style={{ border: '1.5px solid var(--border-solid)' }}
          unoptimized
        />
        <div>
          <p className="mono mb-2" style={{ color: 'var(--muted)' }}>FINAL YEAR · IIT GUWAHATI</p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.05 }}>
            Nimesh
          </h1>
          <p className="mt-2" style={{ color: 'var(--muted)', fontSize: '1rem', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
            breaker, builder and explorer of the shenanigans of the world.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="mono flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          <span className="status-dot" />
          Building SBNRI
        </span>
        <span className="mono px-3 py-1.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          5 things shipped
        </span>
        <span className="mono px-3 py-1.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)' }}>
          More cooking →
        </span>
      </div>
    </section>
  )
}
