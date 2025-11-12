import React from 'react'
import { SidebarTrigger } from '@/Components/ui/sidebar'

type HeaderProps = {
  title?: string
}

export default function Header({ title = 'aurawork' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur md:hidden">
      <div className="flex h-14 w-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-sm font-semibold tracking-wide text-white/90">
            {title}
          </h1>
        </div>
      </div>
    </header>
  )
}

