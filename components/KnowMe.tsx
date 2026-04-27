import Link from 'next/link'
import CalvinCarousel from './CalvinCarousel'

interface Strip { _id: string; image: string; altText?: string }

export default function KnowMe({ strips }: { strips: Strip[] }) {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      <div className="mb-6">
        <p className="mono mb-1" style={{ color: 'var(--muted)' }}>05. Know Me</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 300 }}>The rest of it</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: 'var(--surface)', border: '1.5px solid var(--border-solid)' }}>
          <p className="mono mb-4" style={{ color: 'var(--muted)' }}>CALVIN & HOBBES — A CONSTANT</p>
          <CalvinCarousel strips={strips} />
        </div>
        <div className="rounded-xl p-6 flex flex-col justify-between" style={{ background: 'var(--surface)', border: '1.5px solid var(--border-solid)' }}>
          <div>
            <p className="mono mb-3" style={{ color: 'var(--muted)' }}>IF YOU&apos;VE SCROLLED THIS FAR</p>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', lineHeight: 1.2, fontWeight: 300, marginBottom: '0.75rem' }}>
              You&apos;re not leaving<br />empty handed.
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              I watch a lot of films. Let me suggest one for your weekend — based on your mood, not an algorithm.
            </p>
          </div>
          <Link href="/watch" className="inline-flex items-center mono mt-6 px-4 py-2 rounded-full self-start transition-colors hover:bg-[var(--surface-2)]"
            style={{ border: '1.5px solid var(--border-solid)', color: 'var(--text)', fontSize: '0.65rem' }}>
            GET A REC →
          </Link>
        </div>
      </div>
    </section>
  )
}
