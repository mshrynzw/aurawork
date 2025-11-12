import React from 'react'
import { SidebarProvider, SidebarInset } from '@/Components/ui/sidebar'
import Header from './Header'
import Footer from './Footer'
import AppSidebar from './Sidebar'
import AuroraBackground from './AuroraBackground'
import { Toaster } from '@/Components/ui/toaster'

type Props = {
  title?: string
  children: React.ReactNode
}

export default function Layout({ title = 'aurrawork', children }: Props) {
  return (
    <SidebarProvider className="relative min-h-dvh text-white overflow-x-hidden">
      {/* ===== 背景レイヤー（黒＋オーロラ） ===== */}
      <AuroraBackground />

      {/* ===== サイドバー ===== */}
      <AppSidebar />

      {/* ===== メインコンテンツエリア ===== */}
      <SidebarInset className="bg-transparent overflow-x-hidden md:ml-[var(--sidebar-width)] md:group-data-[collapsible=icon]:ml-[var(--sidebar-width-icon)]">
        {/* ===== ヘッダー ===== */}
        <Header title={title} />

        {/* ===== コンテンツ ===== */}
        <div className="w-full max-w-full px-4 py-8 pt-22">{children}</div>

        {/* ===== フッター（任意） ===== */}
        <Footer />
      </SidebarInset>
      {/* ===== トースト ===== */}
      <Toaster />
    </SidebarProvider>
  )
}
