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
    router.get('/login')
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="backdrop-blur-lg bg-black/50 shadow-lg px-4 py-2 overflow-visible"
    >
      <SidebarHeader className="border rounded-lg border-white/20 pb-4 shadow-lg bg-transparent">
        <div className="flex items-center gap-2 px-2">
          <span
            className="text-4xl font-semibold tracking-wider animate-dimlight box-reflect group-data-[collapsible=icon]:hidden aurawork-logo"
            data-text="aurawork"
          >
            aurawork
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* メインメニュー */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">メイン</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/" className="flex items-center gap-3">
                      <Home className="transition-transform duration-300" />
                      <span>ダッシュボード</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 勤怠・休暇 */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">勤怠・休暇</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/time-entries')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/time-entries')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/time-entries" className="flex items-center gap-3">
                      <Clock className="transition-transform duration-300" />
                      <span>勤怠一覧</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/leave-requests')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/leave-requests')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/leave-requests" className="flex items-center gap-3">
                      <Calendar className="transition-transform duration-300" />
                      <span>休暇申請</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/leave-balances')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/leave-balances')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/leave-balances" className="flex items-center gap-3">
                      <Calendar className="transition-transform duration-300" />
                      <span>休暇残高</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 承認・給与 */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">承認・給与</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/approvals')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/approvals')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/approvals" className="flex items-center gap-3">
                      <CheckCircle className="transition-transform duration-300" />
                      <span>承認一覧</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/pay-runs')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/pay-runs')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/pay-runs" className="flex items-center gap-3">
                      <DollarSign className="transition-transform duration-300" />
                      <span>給与締め</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* マスタ管理 */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">マスタ管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/companies')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/companies')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/companies" className="flex items-center gap-3">
                      <Building2 className="transition-transform duration-300" />
                      <span>会社</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/departments')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/departments')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/departments" className="flex items-center gap-3">
                      <FolderTree className="transition-transform duration-300" />
                      <span>部門</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/employments')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/employments')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/employments" className="flex items-center gap-3">
                      <Briefcase className="transition-transform duration-300" />
                      <span>雇用情報</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/roles')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/roles')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/roles" className="flex items-center gap-3">
                      <Shield className="transition-transform duration-300" />
                      <span>ロール</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/permissions')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/permissions')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/permissions" className="flex items-center gap-3">
                      <Key className="transition-transform duration-300" />
                      <span>権限</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/pay-items')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/pay-items')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/pay-items" className="flex items-center gap-3">
                      <Coins className="transition-transform duration-300" />
                      <span>賃金項目</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/holidays')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/holidays')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/holidays" className="flex items-center gap-3">
                      <Calendar className="transition-transform duration-300" />
                      <span>休日</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/masters/approval-flows')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/masters/approval-flows')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/masters/approval-flows" className="flex items-center gap-3">
                      <Workflow className="transition-transform duration-300" />
                      <span>承認フロー</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ユーザー管理（既存） */}
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">ユーザー管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/users')}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300 relative shadow-lg',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20',
                      isActive('/users')
                        ? 'sidebar-menu-button-active bg-blue-400/50! text-white! hover:bg-blue-500/50!'
                        : 'bg-blue-800/10 text-gray-300 hover:bg-blue-800/10 hover:text-white'
                    )}
                  >
                    <Link href="/users" className="flex items-center gap-3">
                      <Users className="transition-transform duration-300" />
                      <span>ユーザー</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="sidebar-menu-item">
                <div className="sidebar-menu-button-wrapper pl-2">
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className={cn(
                      'text-xl rounded-lg transition-all duration-300',
                      'hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20',
                      'bg-blue-800/10 text-gray-300 hover:bg-red-600/50 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="transition-transform duration-300" />
                      <span>ログアウト</span>
                    </div>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
