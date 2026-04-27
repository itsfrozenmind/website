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
  { _id: '1', title: 'Dream 11',     slug: { current: 'dream-11' },     tagline: 'Coming soon', status: 'Building', image: '' },
  { _id: '2', title: 'HABit',        slug: { current: 'habit' },        tagline: 'Coming soon', status: 'Building', image: '' },
  { _id: '3', title: 'Fn+G',         slug: { current: 'fng' },          tagline: 'Coming soon', status: 'Paused',   image: '' },
  { _id: '4', title: 'Task Tracker', slug: { current: 'task-tracker' }, tagline: 'Coming soon', status: 'Live',     image: '' },
  { _id: '5', title: 'Aasha',        slug: { current: 'aasha' },        tagline: 'Coming soon', status: 'Building', image: '' },
]

export default function Building({ projects }: { projects: Project[] }) {
  const data = projects.length > 0 ? projects : fallbackProjects

  return (
    <section id="building" className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="mono mb-2" style={{ color: 'var(--muted)' }}>01 — WORK</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>Building</h2>
        </div>
        <span className="mono" style={{ color: 'var(--muted)' }}>{data.length} projects</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  )
}
