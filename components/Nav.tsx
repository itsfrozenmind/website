import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="relative z-10 flex items-center justify-between py-5 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <Link href="/" className="mono" style={{ color: 'var(--text)', fontWeight: 400, letterSpacing: '0.12em' }}>NIMESH</Link>
        <span className="mono" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>// PORTFOLIO v1.0</span>
      </div>
      <div className="flex items-center gap-5 mono" style={{ color: 'var(--muted)' }}>
        <a href="https://linkedin.com/in/nimeshgurjar" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">LI</a>
        <a href="https://instagram.com/itsfrozenmind" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">IG</a>
        <a href="https://cal.com/nimesh-s4ysft/15min" target="_blank" rel="noopener noreferrer"
          className="px-3 py-1.5 rounded transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
          style={{ border: '1px solid var(--border-solid)' }}>
          TALK →
        </a>
      </div>
    </nav>
  )
}
