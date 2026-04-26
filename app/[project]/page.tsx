import { client } from '@/lib/sanity'
import { projectBySlugQuery, projectsQuery } from '@/lib/queries'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery).catch(() => [])
  return projects.map((p: { slug: { current: string } }) => ({ project: p.slug.current }))
}

export default async function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug }).catch(() => null)

  if (!project) notFound()

  return (
    <main>
      <Nav />
      <article className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-24 fade-up">
        <Link href="/" className="text-sm mb-8 inline-block transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
          ← back
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'var(--border)',
              color: project.status === 'Live' ? '#4A7C59' : project.status === 'Building' ? 'var(--accent)' : 'var(--muted)',
              fontWeight: 500
            }}
          >
            {project.status}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: '0.75rem' }}>
          {project.title}
        </h1>

        {project.tagline && (
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
            {project.tagline}
          </p>
        )}

        {project.image && (
          <div className="relative rounded-xl overflow-hidden mb-10" style={{ aspectRatio: '16/9', background: 'var(--border)' }}>
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}

        {project.whatAndWhy && (
          <div className="mb-8">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>What & Why</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{project.whatAndWhy}</p>
          </div>
        )}

        {project.howItWorks && (
          <div className="mb-8">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>How it works</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{project.howItWorks}</p>
          </div>
        )}

        {project.arcadeEmbed && (
          <div className="mb-10 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <iframe src={project.arcadeEmbed} className="w-full h-full" allowFullScreen />
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#fff', fontWeight: 500 }}
          >
            Visit project →
          </a>
        )}
      </article>
      <Footer />
    </main>
  )
}
