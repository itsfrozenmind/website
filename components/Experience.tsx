interface ExperienceItem {
  _id: string
  role: string
  company: string
  period?: string
  description?: string
}

const fallback: ExperienceItem[] = [
  { _id: '1', role: 'Student Marketeer', company: 'Red Bull', period: '2023 – 2024' },
  { _id: '2', role: "Founder's Office", company: 'SBNRI', period: '2024 – Present' },
]

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const data = items.length > 0 ? items : fallback

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Experience</h2>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex items-start justify-between py-4"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.05rem' }}>{item.role}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{item.company}</p>
              {item.description && (
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{item.description}</p>
              )}
            </div>
            {item.period && (
              <span className="text-sm flex-shrink-0 ml-4" style={{ color: 'var(--muted)' }}>{item.period}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
