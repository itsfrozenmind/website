import Link from 'next/link'
import Image from 'next/image'

interface Project {
  _id: string; title: string; slug: { current: string }
  tagline: string; status: string; image?: string
}

const statusConfig: Record<string, { label: string; color: string }> = {
  Live:     { label: 'SHIPPED',  color: '#4D9E7A' },
  Building: { label: 'BUILDING', color: '#B8834A' },
  Paused:   { label: 'PAUSED',   color: '#4A4A5A' },
}

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig.Paused

  return (
    <Link href={`/${project.slug.current}`} className="group block" data-project-card="true">
      <div
        data-project-card="true"
        className="hud-card rounded-sm overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5"
        style={{ background: 'var(--surface)' }}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--muted)', fontWeight: 300, opacity: 0.4 }}>
                {project.title[0]}
              </span>
            </div>
          )}
          {/* Scan line on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(74,127,160,0.04) 100%)' }} />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--text)' }}>{project.title}</h3>
            <span className="mono" style={{ color: status.color, fontSize: '0.58rem' }}>{status.label}</span>
          </div>
          {project.tagline && (
            <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{project.tagline}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
