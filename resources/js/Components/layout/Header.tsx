import React, { useState, useEffect } from 'react'
import { SidebarTrigger } from '@/Components/ui/sidebar'
import { Button } from '@/Components/ui/button'

type HeaderProps = {
  title?: string
}

export default function Header({ title = 'aurawork' }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date, isMobile: boolean) => {
    if (isMobile) {
      // モバイル: HH:MM:SS
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    } else {
      // デスクトップ: YYYY年MM月DD日（曜日）HH:MM:SS
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')

      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const weekday = weekdays[date.getDay()]

      return `${weekday} ${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md shadow-lg md:left-[var(--sidebar-width)] md:group-data-[collapsible=icon]:left-[var(--sidebar-width-icon)]">
      <div className="flex h-14 w-full items-center justify-between px-4">
        <div className="flex items-center gap-3 md:hidden">
          <SidebarTrigger />
          <h1 className="text-sm font-semibold tracking-wide text-white/90">{title}</h1>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-mono text-white/90 datetime-display">
            <span className="hidden md:inline">{formatDateTime(currentTime, false)}</span>
            <span className="md:hidden">{formatDateTime(currentTime, true)}</span>
          </span>
        </div>
        <Button variant="outline" className="bg-blue-400/50 hover:bg-blue-500/50">
          出勤
        </Button>
      </div>
    </header>
  )
}
