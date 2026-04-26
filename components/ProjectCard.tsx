import Link from 'next/link'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  status: string
  image?: string
}

const statusColors: Record<string, string> = {
  Live: '#4A7C59',
  Building: '#C4704F',
  Paused: '#6b6560',
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/${project.slug.current}`} className="group block">
      <div
        className="rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
        style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: '#e8e0d4' }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem', color: 'var(--muted)', opacity: 0.4 }}>
                {project.title[0]}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem' }}>{project.title}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--bg)', color: statusColors[project.status] || 'var(--muted)', fontWeight: 500 }}
            >
              {project.status}
            </span>
          </div>
          {project.tagline && (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{project.tagline}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
