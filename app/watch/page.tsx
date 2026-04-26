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
      <article className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-24 fade-up">
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          If you&apos;ve scrolled this far,
        </h1>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
          you&apos;re not leaving empty handed.
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: '3rem', fontStyle: 'italic' }}>
          Here&apos;s what I&apos;d put on this weekend.
        </p>

        {movies.length === 0 ? (
          <div className="rounded-xl p-10 text-center" style={{ background: 'var(--border)' }}>
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Movie picks coming soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
            {movies.map((movie: {
              _id: string
              title: string
              poster?: string
              whyRecommend?: string
              whereToWatch?: string
            }) => (
              <div key={movie._id} className="rounded-xl overflow-hidden" style={{ background: 'var(--border)' }}>
                <div className="relative aspect-[2/3] overflow-hidden" style={{ background: '#e8e0d4' }}>
                  {movie.poster && <Image src={movie.poster} alt={movie.title} fill className="object-cover" unoptimized />}
                </div>
                <div className="p-4">
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '0.25rem' }}>{movie.title}</h3>
                  {movie.whereToWatch && (
                    <p className="text-xs mb-2" style={{ color: 'var(--accent)' }}>{movie.whereToWatch}</p>
                  )}
                  {movie.whyRecommend && (
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{movie.whyRecommend}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--border)' }}
        >
          <div>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
              What&apos;s yours?
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Send me a recommendation. I&apos;ll watch it.
            </p>
          </div>
          <a
            href="mailto:reach.nimesh.g@gmail.com?subject=You should watch this"
            className="flex-shrink-0 text-sm px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#fff', fontWeight: 500 }}
          >
            Tell me →
          </a>
        </div>
      </article>
      <Footer />
    </main>
  )
}
