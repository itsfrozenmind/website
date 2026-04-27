import Link from 'next/link'
import CalvinCarousel from './CalvinCarousel'

interface Strip {
  _id: string
  image: string
  altText?: string
}

export default function KnowMe({ strips }: { strips: Strip[] }) {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'var(--muted)' }}>03 — know me</span>
        <h2 style={{ fontSize: '1.3rem' }}>The rest of it</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>Calvin & Hobbes — a constant</p>
          <CalvinCarousel strips={strips} />
        </div>

        <div className="rounded-lg p-6 flex flex-col justify-between" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>If you&apos;ve scrolled this far</p>
            <h3 style={{ fontSize: '1.3rem', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              You&apos;re not leaving<br />empty handed.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              I watch a lot of films. Let me suggest one for your weekend — based on your mood, not an algorithm.
            </p>
          </div>
          <Link
            href="/watch"
            className="inline-flex items-center gap-2 text-sm mt-6 px-4 py-2.5 rounded transition-opacity hover:opacity-80 self-start"
            style={{ background: 'var(--accent)', color: '#111008', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Get a rec →
          </Link>
        </div>
      </div>
    </section>
  )
}
