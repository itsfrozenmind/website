import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-5 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <Link href="/" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.02em' }}>
        nimesh<span style={{ color: 'var(--muted)' }}>.exe</span>
      </Link>
      <div className="flex items-center gap-5 text-xs" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
        <a href="https://linkedin.com/in/nimeshgurjar" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors uppercase">LinkedIn</a>
        <a href="https://instagram.com/itsfrozenmind" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors uppercase">Instagram</a>
        <a href="https://cal.com/nimesh-s4ysft/15min" target="_blank" rel="noopener noreferrer" className="transition-colors uppercase px-3 py-1.5 rounded" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(245,230,66,0.2)' }}>
          Let&apos;s talk
        </a>
      </div>
    </nav>
  )
}
