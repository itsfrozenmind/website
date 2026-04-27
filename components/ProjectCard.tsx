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

const statusConfig: Record<string, { label: string; color: string; bg: string; pulse: boolean }> = {
  Live:     { label: 'LIVE',     color: '#4ADE80', bg: 'rgba(74,222,128,0.1)',  pulse: false },
  Building: { label: 'BUILDING', color: '#F5E642', bg: 'rgba(245,230,66,0.1)', pulse: true  },
  Paused:   { label: 'PAUSED',   color: '#6b6855', bg: 'rgba(107,104,85,0.1)', pulse: false },
}

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig.Paused

  return (
    <Link href={`/${project.slug.current}`} className="group block">
      <div
        className="rounded-lg overflow-hidden transition-all duration-200 group-hover:translate-y-[-2px]"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', color: 'var(--border)', fontWeight: 600 }}>
                {project.title[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to top, rgba(17,16,8,0.6), transparent)' }} />
        </div>

        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 500 }}>{project.title}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
              style={{ background: status.bg, color: status.color, fontWeight: 500, letterSpacing: '0.05em' }}
            >
              {status.pulse && <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.color }} />}
              {status.label}
            </span>
          </div>
          {project.tagline && (
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{project.tagline}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
