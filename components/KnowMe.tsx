import Link from 'next/link'
import CalvinCarousel from './CalvinCarousel'

interface Strip {
  _id: string
  image: string
  altText?: string
}

export default function KnowMe({ strips }: { strips: Strip[] }) {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Know Me</h2>
      <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
        The things that make me, me.
      </p>

      <div className="mb-10">
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
          Calvin & Hobbes — a strip I keep coming back to.
        </p>
        <CalvinCarousel strips={strips} />
      </div>

      <div
        className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'var(--border)' }}
      >
        <div>
          <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.15rem', marginBottom: '0.25rem' }}>
            I watch a lot of films.
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Let me suggest one for your weekend.
          </p>
        </div>
        <Link
          href="/watch"
          className="flex-shrink-0 text-sm px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
          style={{ background: 'var(--accent)', color: '#fff', fontWeight: 500 }}
        >
          Get a rec →
        </Link>
      </div>
    </section>
  )
}
