interface ExperienceItem {
  _id: string
  role: string
  company: string
  period?: string
  description?: string
}

const fallback: ExperienceItem[] = [
  { _id: '1', role: 'Student Marketeer', company: 'Red Bull', period: '2023 – 2024', description: 'Drove campus activations and brand presence at IIT Guwahati.' },
  { _id: '2', role: "Founder's Office",  company: 'SBNRI',    period: '2024 – Present', description: 'Working directly with the founder on product and growth.' },
]

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const data = items.length > 0 ? items : fallback

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest mb-1 block" style={{ color: 'var(--muted)' }}>02 — experience</span>
        <h2 style={{ fontSize: '1.3rem' }}>Where I&apos;ve been</h2>
      </div>

      <div className="flex flex-col gap-0">
        {data.map((item, i) => (
          <div
            key={item._id}
            className="flex items-start justify-between py-5 gap-4"
            style={{ borderBottom: i < data.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 500 }}>{item.role}</p>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                  {item.company}
                </span>
              </div>
              {item.description && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.description}</p>
              )}
            </div>
            {item.period && (
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif' }}>{item.period}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
