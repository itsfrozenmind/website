import ProjectCard from './ProjectCard'

interface Project {
  _id: string; title: string; slug: { current: string }
  tagline: string; status: string; image?: string
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
    <section id="building" className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="mono mb-1" style={{ color: 'var(--muted)' }}>01. Building</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 300 }}>Things I&apos;ve made</h2>
        </div>
        <span className="mono" style={{ color: 'var(--muted)' }}>{data.length} projects</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((p) => <ProjectCard key={p._id} project={p} />)}
      </div>
    </section>
  )
}
