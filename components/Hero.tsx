import Image from 'next/image'

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-20 fade-up">
      <div className="flex items-start gap-6 mb-8">
        <Image
          src="https://ca.slack-edge.com/TR5LSGPS7-U0A8HGB0B8D-7c45095e0d94-512"
          alt="Nimesh"
          width={72}
          height={72}
          className="rounded-full flex-shrink-0"
          style={{ border: '2px solid var(--border)' }}
          unoptimized
        />
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Nimesh
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', fontStyle: 'italic' }}>
            breaker, builder and explorer of the shenanigans of the world
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--muted)' }}>
        <span style={{ background: 'var(--border)', padding: '4px 12px', borderRadius: '999px' }}>
          Final Year, IIT Guwahati
        </span>
        <span style={{ background: 'var(--border)', padding: '4px 12px', borderRadius: '999px' }}>
          Building SBNRI
        </span>
      </div>
    </section>
  )
}
