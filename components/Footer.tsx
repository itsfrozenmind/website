export default function Footer() {
  const contactOptions = [
    { label: 'Say hi',    href: 'mailto:reach.nimesh.g@gmail.com?subject=Hey Nimesh!' },
    { label: 'Collab',   href: 'mailto:reach.nimesh.g@gmail.com?subject=Let\'s collab' },
    { label: 'Just talk', href: 'mailto:reach.nimesh.g@gmail.com?subject=Wanna talk' },
  ]

  const links = [
    { label: 'LinkedIn',   href: 'https://linkedin.com/in/nimeshgurjar' },
    { label: 'Instagram',  href: 'https://instagram.com/itsfrozenmind' },
    { label: 'Letterboxd', href: 'https://letterboxd.com/itsfrozenmind' },
    { label: 'Calendar',   href: 'https://cal.com/nimesh-s4ysft/15min' },
  ]

  return (
    <footer className="max-w-5xl mx-auto px-6 md:px-12 py-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>Reach out as</p>
          <div className="flex flex-wrap gap-2">
            {contactOptions.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                className="text-xs px-3 py-2 rounded transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--muted)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className="text-xs" style={{ color: 'var(--muted)' }}>© 2026 Nimesh</p>
        <p className="text-xs" style={{ color: 'var(--border)' }}>built fast, shipped faster.</p>
      </div>
    </footer>
  )
}
