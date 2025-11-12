import React from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/Components/ui/sidebar'
import {
  Home,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  DollarSign,
  Building2,
  FolderTree,
  Briefcase,
  Shield,
  Key,
  Coins,
  Workflow,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AppSidebar() {
  const { url } = usePage()

  const isActive = (href: string) => {
    if (href === '/') {
      return url === '/'
    }
    return url.startsWith(href)
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post('/logout')
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="backdrop-blur-lg bg-black/50 shadow-lg px-4 py-2">
      <SidebarHeader className="border rounded-lg border-white/20 pb-4 shadow-lg bg-transparent">
        <div className="flex items-center gap-2 px-2">
          <span 
            className="text-4xl font-semibold tracking-wider animate-dimlight box-reflect group-data-[collapsible=icon]:hidden"
            data-text="aurawork"
          >
            aurawork
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* メインメニュー */}
        <SidebarGroup>
          <SidebarGroupLabel>メイン</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/">
                    <Home />
                    <span>ダッシュボード</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 勤怠・休暇 */}
        <SidebarGroup>
          <SidebarGroupLabel>勤怠・休暇</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/time-entries')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/time-entries')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/time-entries">
                    <Clock />
                    <span>勤怠一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/leave-requests')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/leave-requests')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/leave-requests">
                    <Calendar />
                    <span>休暇申請</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/leave-balances')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/leave-balances')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/leave-balances">
                    <Calendar />
                    <span>休暇残高</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 承認・給与 */}
        <SidebarGroup>
          <SidebarGroupLabel>承認・給与</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/approvals')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/approvals')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/approvals">
                    <CheckCircle />
                    <span>承認一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/pay-runs')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/pay-runs')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/pay-runs">
                    <DollarSign />
                    <span>給与締め</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* マスタ管理 */}
        <SidebarGroup>
          <SidebarGroupLabel>マスタ管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/companies')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/companies')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/companies">
                    <Building2 />
                    <span>会社</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/departments')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/departments')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/departments">
                    <FolderTree />
                    <span>部門</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/employments')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/employments')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/employments">
                    <Briefcase />
                    <span>雇用情報</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/roles')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/roles')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/roles">
                    <Shield />
                    <span>ロール</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/permissions')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/permissions')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/permissions">
                    <Key />
                    <span>権限</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/pay-items')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/pay-items')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/pay-items">
                    <Coins />
                    <span>賃金項目</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/holidays')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/holidays')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/holidays">
                    <Calendar />
                    <span>休日</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/masters/approval-flows')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/masters/approval-flows')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/masters/approval-flows">
                    <Workflow />
                    <span>承認フロー</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ユーザー管理（既存） */}
        <SidebarGroup>
          <SidebarGroupLabel>ユーザー管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/users')}
                  className={cn(
                    'text-xl rounded-lg transition-colors',
                    isActive('/users')
                      ? '!bg-blue-400/50 !text-white hover:!bg-blue-500/50'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  )}
                >
                  <Link href="/users">
                    <Users />
                    <span>ユーザー</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className={cn(
                    'text-xl rounded-lg transition-colors bg-gray-800/50 text-gray-300 hover:bg-red-600/50 hover:text-white'
                  )}
                >
                  <LogOut />
                  <span>ログアウト</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
