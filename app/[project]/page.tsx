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

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  Live:     { label: 'LIVE',     color: '#4ADE80', bg: 'rgba(74,222,128,0.1)'  },
  Building: { label: 'BUILDING', color: '#F5E642', bg: 'rgba(245,230,66,0.1)' },
  Paused:   { label: 'PAUSED',   color: '#6b6855', bg: 'rgba(107,104,85,0.1)' },
}

export default async function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug }).catch(() => null)

  if (!project) notFound()

  const status = statusConfig[project.status] || statusConfig.Paused

  return (
    <main>
      <Nav />
      <article className="max-w-5xl mx-auto px-6 md:px-12 pt-10 pb-24 fade-up">
        <Link href="/" className="text-xs uppercase tracking-widest mb-10 inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
          ← back
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: status.bg, color: status.color, fontWeight: 500, letterSpacing: '0.05em', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {status.label}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, marginBottom: '0.75rem' }}>
          {project.title}
        </h1>

        {project.tagline && (
          <p style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '560px' }}>
            {project.tagline}
          </p>
        )}

        {project.image && (
          <div className="relative rounded-lg overflow-hidden mb-10" style={{ aspectRatio: '16/9', background: 'var(--surface)' }}>
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {project.whatAndWhy && (
            <div className="rounded-lg p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>What & Why</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{project.whatAndWhy}</p>
            </div>
          )}
          {project.howItWorks && (
            <div className="rounded-lg p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>How it works</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{project.howItWorks}</p>
            </div>
          )}
        </div>

        {project.arcadeEmbed && (
          <div className="mb-10 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid var(--border)' }}>
            <iframe src={project.arcadeEmbed} className="w-full h-full" allowFullScreen />
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-5 py-2.5 rounded transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#111008', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Visit project →
          </a>
        )}
      </article>
      <Footer />
    </main>
  )
}
