import ProjectCard from './ProjectCard'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  status: string
  image?: string
}

export default function Building({ projects }: { projects: Project[] }) {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Building</h2>
      {projects.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['Dream 11', 'HABit', 'Fn+G', 'Task Tracker', 'Aasha'].map((name) => (
            <div
              key={name}
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
            >
              <div className="aspect-video flex items-center justify-center" style={{ background: '#e8e0d4' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem', color: 'var(--muted)', opacity: 0.4 }}>
                  {name[0]}
                </span>
              </div>
              <div className="p-4">
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem' }}>{name}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
