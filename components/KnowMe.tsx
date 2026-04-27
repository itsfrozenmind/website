import Link from 'next/link'
import CalvinCarousel from './CalvinCarousel'

interface Strip {
  _id: string
  image: string
  altText?: string
}

export default function KnowMe({ strips }: { strips: Strip[] }) {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-24">
      <div className="mb-10">
        <p className="mono mb-2" style={{ color: 'var(--muted)' }}>05 — KNOW ME</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>The rest of it</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
          <p className="mono mb-4" style={{ color: 'var(--muted)' }}>CALVIN & HOBBES — A CONSTANT</p>
          <CalvinCarousel strips={strips} />
        </div>

        <div className="rounded-lg p-6 flex flex-col justify-between" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
          <div>
            <p className="mono mb-4" style={{ color: 'var(--muted)' }}>IF YOU&apos;VE SCROLLED THIS FAR</p>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '1rem', fontWeight: 300 }}>
              You&apos;re not leaving<br />empty handed.
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
              I watch a lot of films. Let me suggest one for your weekend — based on your mood, not an algorithm.
            </p>
          </div>
          <Link
            href="/watch"
            className="inline-flex items-center gap-2 mono mt-6 px-4 py-2.5 rounded-full self-start transition-all hover:bg-white hover:text-[var(--bg)]"
            style={{ border: '1px solid rgba(240,237,232,0.2)', color: 'var(--text)', fontSize: '0.65rem' }}
          >
            GET A REC →
          </Link>
        </div>
      </div>
    </section>
  )
}
