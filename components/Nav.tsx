import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-5 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <Link href="/" className="mono" style={{ color: 'var(--text)', fontWeight: 400 }}>
        NIMESH
      </Link>
      <div className="flex items-center gap-5 mono" style={{ color: 'var(--muted)' }}>
        <a href="https://linkedin.com/in/nimeshgurjar" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">LI</a>
        <a href="https://instagram.com/itsfrozenmind" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">IG</a>
        <a
          href="https://cal.com/nimesh-s4ysft/15min"
          target="_blank" rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full hover:bg-[var(--surface-2)] transition-colors"
          style={{ border: '1px solid var(--border-solid)' }}
        >
          TALK →
        </a>
      </div>
    </nav>
  )
}
