import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-12 max-w-4xl mx-auto w-full">
      <Link href="/" style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'var(--text)' }}>
        Nimesh
      </Link>
      <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--muted)' }}>
        <a href="https://linkedin.com/in/nimeshgurjar" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">LinkedIn</a>
        <a href="https://instagram.com/itsfrozenmind" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">Instagram</a>
        <a href="https://cal.com/nimesh-s4ysft/15min" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">Calendar</a>
      </div>
    </nav>
  )
}
