const STRINGS = ['──────✦', '─────·', '────────·', '───────✦', '──────────·', '─────────✦', '────·', '───────────✦']

const STARS = [
  { str: STRINGS[0], top: '6%',  dur: '22s', delay: '0s',    op: 0.28 },
  { str: STRINGS[1], top: '14%', dur: '31s', delay: '-8s',   op: 0.20 },
  { str: STRINGS[2], top: '23%', dur: '18s', delay: '-4s',   op: 0.32 },
  { str: STRINGS[3], top: '38%', dur: '26s', delay: '-15s',  op: 0.22 },
  { str: STRINGS[4], top: '52%', dur: '20s', delay: '-6s',   op: 0.18 },
  { str: STRINGS[5], top: '61%', dur: '35s', delay: '-20s',  op: 0.26 },
  { str: STRINGS[6], top: '74%', dur: '24s', delay: '-11s',  op: 0.20 },
  { str: STRINGS[7], top: '85%', dur: '29s', delay: '-3s',   op: 0.24 },
]

export default function ShootingStars() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            whiteSpace: 'nowrap',
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            color: `rgba(240,237,232,${s.op})`,
            letterSpacing: '0.04em',
            animation: `shoot ${s.dur} linear ${s.delay} infinite`,
          }}
        >
          {s.str}
        </span>
      ))}
    </div>
  )
}
