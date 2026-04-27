export default function Footer() {
  const contactOptions = [
    { label: 'SAY HI',     href: 'mailto:reach.nimesh.g@gmail.com?subject=Hey Nimesh!' },
    { label: 'COLLAB',     href: "mailto:reach.nimesh.g@gmail.com?subject=Let's collab" },
    { label: 'JUST TALK',  href: 'mailto:reach.nimesh.g@gmail.com?subject=Wanna talk' },
  ]
  const links = [
    { label: 'LINKEDIN',   href: 'https://linkedin.com/in/nimeshgurjar' },
    { label: 'INSTAGRAM',  href: 'https://instagram.com/itsfrozenmind' },
    { label: 'LETTERBOXD', href: 'https://letterboxd.com/itsfrozenmind' },
    { label: 'CALENDAR',   href: 'https://cal.com/nimesh-s4ysft/15min' },
  ]

  return (
    <footer className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-10 pb-24" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
        <div>
          <p className="mono mb-4" style={{ color: 'var(--muted)' }}>REACH OUT AS</p>
          <div className="flex flex-wrap gap-2">
            {contactOptions.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                className="mono px-4 py-2 rounded-full transition-all hover:bg-white hover:text-[var(--bg)]"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.65rem' }}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="mono transition-colors hover:text-[var(--text)]"
              style={{ color: 'var(--muted)', fontSize: '0.65rem' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mono" style={{ color: 'rgba(240,237,232,0.1)', fontSize: '0.6rem' }}>© 2026 NIMESH · BUILT FAST, SHIPPED FASTER.</p>
    </footer>
  )
}
