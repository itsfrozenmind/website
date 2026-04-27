import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client } from '@/lib/sanity'
import { moviesQuery } from '@/lib/queries'
import Image from 'next/image'

export const revalidate = 60

export default async function WatchPage() {
  const movies = await client.fetch(moviesQuery).catch(() => [])

  return (
    <main>
      <Nav />
      <article className="max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-24 fade-up">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest mb-3 block" style={{ color: 'var(--muted)' }}>— from nimesh&apos;s watchlist</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '0.75rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500 }}>
            If you&apos;ve scrolled this far,<br />you&apos;re not leaving empty handed.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
            Here&apos;s what I&apos;d put on this weekend.
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="rounded-lg p-10 text-center mb-12" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Movie picks coming soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
            {movies.map((movie: {
              _id: string
              title: string
              poster?: string
              whyRecommend?: string
              whereToWatch?: string
            }) => (
              <div key={movie._id} className="rounded-lg overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="relative aspect-[2/3] overflow-hidden" style={{ background: 'var(--surface-2)' }}>
                  {movie.poster && <Image src={movie.poster} alt={movie.title} fill className="object-cover" unoptimized />}
                </div>
                <div className="p-3">
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem' }}>{movie.title}</h3>
                  {movie.whereToWatch && (
                    <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>{movie.whereToWatch}</p>
                  )}
                  {movie.whyRecommend && (
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{movie.whyRecommend}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', marginBottom: '0.25rem' }}>What&apos;s yours?</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Send me a recommendation. I&apos;ll actually watch it.</p>
          </div>
          <a
            href="mailto:reach.nimesh.g@gmail.com?subject=You should watch this"
            className="flex-shrink-0 text-sm px-4 py-2.5 rounded transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#111008', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Tell me →
          </a>
        </div>
      </article>
      <Footer />
    </main>
  )
}
