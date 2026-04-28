export default function Footer() {
  const contacts = [
    { label: 'SAY HI',    href: 'mailto:reach.nimesh.g@gmail.com?subject=Hey Nimesh!' },
    { label: 'COLLAB',   href: "mailto:reach.nimesh.g@gmail.com?subject=Let's collab" },
    { label: 'JUST TALK', href: 'mailto:reach.nimesh.g@gmail.com?subject=Wanna talk' },
  ]
  const links = [
    { label: 'LINKEDIN',   href: 'https://linkedin.com/in/nimeshgurjar' },
    { label: 'INSTAGRAM',  href: 'https://instagram.com/itsfrozenmind' },
    { label: 'LETTERBOXD', href: 'https://letterboxd.com/itsfrozenmind' },
    { label: 'CALENDAR',   href: 'https://cal.com/nimesh-s4ysft/15min' },
  ]
  return (
    <footer className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-10 pb-28" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
        <div>
          <p className="mono mb-3" style={{ color: 'var(--muted)' }}>// REACH OUT AS</p>
          <div className="flex flex-wrap gap-2">
            {contacts.map((c) => (
              <a key={c.label} href={c.href}
                className="mono px-3 py-2 rounded-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                style={{ border: '1px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.65rem' }}>
                {c.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="mono transition-colors hover:text-[var(--text)]"
              style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p className="mono" style={{ color: 'var(--muted)', opacity: 0.4, fontSize: '0.6rem' }}>© 2026 NIMESH · BUILT FAST, SHIPPED FASTER.</p>
        <p className="mono" style={{ color: 'var(--muted)', opacity: 0.25, fontSize: '0.55rem' }}>EOF</p>
      </div>
    </footer>
  )
}
