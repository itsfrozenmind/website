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

const statusConfig: Record<string, { label: string; color: string }> = {
  Live:     { label: 'LIVE',     color: '#4ADE80' },
  Building: { label: 'BUILDING', color: 'rgba(240,237,232,0.5)' },
  Paused:   { label: 'PAUSED',   color: 'rgba(240,237,232,0.2)' },
}

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig.Paused

  return (
    <Link href={`/${project.slug.current}`} className="group block">
      <div
        className="rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'rgba(240,237,232,0.1)', fontWeight: 300 }}>
                {project.title[0]}
              </span>
            </div>
          )}
        </div>
        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400 }}>{project.title}</h3>
            <span className="mono" style={{ color: status.color, fontSize: '0.6rem' }}>{status.label}</span>
          </div>
          {project.tagline && (
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{project.tagline}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
