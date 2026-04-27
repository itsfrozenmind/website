import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-5 px-6 md:px-12">
      <Link href="/" className="mono" style={{ color: 'var(--muted)' }}>
        NIMESH
      </Link>
      <div className="flex items-center gap-6 mono" style={{ color: 'var(--muted)' }}>
        <a href="https://linkedin.com/in/nimeshgurjar" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">LI</a>
        <a href="https://instagram.com/itsfrozenmind" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">IG</a>
        <a href="https://cal.com/nimesh-s4ysft/15min" target="_blank" rel="noopener noreferrer"
          className="hover:text-[var(--text)] transition-colors px-3 py-1.5 rounded-full"
          style={{ border: '1px solid var(--border)' }}>
          TALK →
        </a>
      </div>
    </nav>
  )
}
