interface ExperienceItem {
  _id: string; role: string; company: string; period?: string; description?: string
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
        <p className="mono mb-1" style={{ color: 'var(--muted)' }}>02. Experience</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 300 }}>Where I&apos;ve been</h2>
      </div>
      <div>
        {data.map((item, i) => (
          <div key={item._id} className="flex items-start justify-between py-5 gap-4"
            style={{ borderBottom: i < data.length - 1 ? '1px solid var(--border-solid)' : 'none' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400 }}>{item.role}</h3>
                <span className="mono px-2 py-0.5 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.6rem' }}>
                  {item.company}
                </span>
              </div>
              {item.description && <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item.description}</p>}
            </div>
            {item.period && <span className="mono flex-shrink-0" style={{ color: 'var(--muted)', fontSize: '0.62rem' }}>{item.period}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
