import ProjectCard from './ProjectCard'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  status: string
  image?: string
}

const fallbackProjects = [
  { _id: '1', title: 'Dream 11', slug: { current: 'dream-11' }, tagline: 'Coming soon', status: 'Building', image: '' },
  { _id: '2', title: 'HABit',    slug: { current: 'habit' },    tagline: 'Coming soon', status: 'Building', image: '' },
  { _id: '3', title: 'Fn+G',     slug: { current: 'fng' },      tagline: 'Coming soon', status: 'Paused',   image: '' },
  { _id: '4', title: 'Task Tracker', slug: { current: 'task-tracker' }, tagline: 'Coming soon', status: 'Live', image: '' },
  { _id: '5', title: 'Aasha',    slug: { current: 'aasha' },    tagline: 'Coming soon', status: 'Building', image: '' },
]

export default function Building({ projects }: { projects: Project[] }) {
  const data = projects.length > 0 ? projects : fallbackProjects

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'var(--muted)' }}>01 — work</span>
          <h2 style={{ fontSize: '1.3rem' }}>Building</h2>
        </div>
        <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
          {data.length} projects
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  )
}
