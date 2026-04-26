export default function Footer() {
  const links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nimeshgurjar' },
    { label: 'Instagram', href: 'https://instagram.com/itsfrozenmind' },
    { label: 'Letterboxd', href: 'https://letterboxd.com/itsfrozenmind' },
    { label: 'Calendar', href: 'https://cal.com/nimesh-s4ysft/15min' },
  ]

  const contactOptions = [
    { label: 'Say hi', href: 'mailto:reach.nimesh.g@gmail.com?subject=Hey Nimesh!' },
    { label: 'Collab', href: 'mailto:reach.nimesh.g@gmail.com?subject=Let\'s collab' },
    { label: 'Just talk', href: 'mailto:reach.nimesh.g@gmail.com?subject=Wanna talk' },
  ]

  return (
    <footer className="max-w-4xl mx-auto px-6 md:px-12 py-12" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>Reach out</p>
          <div className="flex flex-wrap gap-3">
            {contactOptions.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-[var(--border)]"
                style={{ border: '1px solid var(--border)' }}
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
              className="text-sm transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--muted)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="text-xs mt-10" style={{ color: 'var(--muted)' }}>© 2026 Nimesh</p>
    </footer>
  )
}
