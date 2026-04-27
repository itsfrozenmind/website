'use client'

import { useEffect, useState } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50 mono" style={{ color: 'var(--muted)' }}>
      <div>{time}</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="status-dot" />
        <span>5 THINGS SHIPPED</span>
      </div>
    </div>
  )
}
