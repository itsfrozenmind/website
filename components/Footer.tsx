export default function Footer() {
  const contacts = [
    { label: 'Say hi',    href: 'mailto:reach.nimesh.g@gmail.com?subject=Hey Nimesh!' },
    { label: 'Collab',   href: "mailto:reach.nimesh.g@gmail.com?subject=Let's collab" },
    { label: 'Just talk', href: 'mailto:reach.nimesh.g@gmail.com?subject=Wanna talk' },
  ]
  const links = [
    { label: 'LinkedIn',   href: 'https://linkedin.com/in/nimeshgurjar' },
    { label: 'Instagram',  href: 'https://instagram.com/itsfrozenmind' },
    { label: 'Letterboxd', href: 'https://letterboxd.com/itsfrozenmind' },
    { label: 'Calendar',   href: 'https://cal.com/nimesh-s4ysft/15min' },
  ]
  return (
    <footer className="max-w-5xl mx-auto px-6 md:px-12 py-10 pb-28" style={{ borderTop: '1px solid var(--border-solid)' }}>
      <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
        <div>
          <p className="mono mb-3" style={{ color: 'var(--muted)' }}>REACH OUT AS</p>
          <div className="flex flex-wrap gap-2">
            {contacts.map((c) => (
              <a key={c.label} href={c.href}
                className="mono px-3 py-2 rounded-full transition-colors hover:bg-[var(--surface-2)]"
                style={{ border: '1.5px solid var(--border-solid)', color: 'var(--muted)', fontSize: '0.65rem' }}>
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
      <p className="mono" style={{ color: 'var(--border-solid)', fontSize: '0.6rem' }}>© 2026 NIMESH · BUILT FAST, SHIPPED FASTER.</p>
    </footer>
  )
}
