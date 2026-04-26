import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

async function getStrip(id: string) {
  return client.fetch(
    `*[_type == "calvinHobbes" && _id == $id][0] { _id, "image": image.asset->url, altText }`,
    { id }
  ).catch(() => null)
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const strip = await getStrip(id)
  if (!strip) return {}
  return {
    title: 'Nimesh sent you this',
    description: 'A Calvin & Hobbes strip, from Nimesh.',
    openGraph: {
      title: 'Nimesh sent you this',
      description: 'A Calvin & Hobbes strip, from Nimesh.',
      images: [{ url: strip.image }],
    },
  }
}

export default async function StripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const strip = await getStrip(id)
  if (!strip) notFound()

  return (
    <main>
      <Nav />
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-24 fade-up">
        <Link href="/" className="text-sm mb-8 inline-block transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
          ← back to Nimesh
        </Link>

        <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
          Nimesh sent you this.
        </p>

        <div className="rounded-xl overflow-hidden mb-6" style={{ background: 'var(--border)' }}>
          <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
            <Image src={strip.image} alt={strip.altText || 'Calvin and Hobbes'} fill className="object-contain" unoptimized />
          </div>
        </div>

        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          This is from Nimesh&apos;s personal collection.{' '}
          <Link href="/" className="underline hover:text-[var(--accent)] transition-colors">
            See who he is →
          </Link>
        </p>
      </div>
      <Footer />
    </main>
  )
}
