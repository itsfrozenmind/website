'use client'

import { useEffect, useState } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-40 mono" style={{ color: 'var(--muted)' }}>
      <div>{time}</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="status-dot" />
        <span>5 THINGS SHIPPED</span>
      </div>
    </div>
  )
}
