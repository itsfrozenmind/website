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

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  Live:     { label: 'SHIPPED',  color: '#5B8A58', bg: 'rgba(91,138,88,0.12)'  },
  Building: { label: 'BUILDING', color: '#C47040', bg: 'rgba(196,112,64,0.12)' },
  Paused:   { label: 'PAUSED',   color: '#7A7568', bg: 'rgba(122,117,104,0.1)' },
}

export default function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig.Paused

  return (
    <Link href={`/${project.slug.current}`} className="group block" data-project-card="true">
      <div
        data-project-card="true"
        className="rounded-xl overflow-hidden transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
        style={{ background: 'var(--surface)', border: '1.5px solid var(--border-solid)' }}
      >
        <div className="aspect-video relative overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--border-solid)', fontWeight: 300 }}>
                {project.title[0]}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400 }}>{project.title}</h3>
            <span
              className="mono px-2 py-0.5 rounded-full"
              style={{ background: status.bg, color: status.color, fontSize: '0.58rem' }}
            >
              {status.label}
            </span>
          </div>
          {project.tagline && (
            <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>{project.tagline}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
