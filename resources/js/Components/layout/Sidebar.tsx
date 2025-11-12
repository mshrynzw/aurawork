import React from 'react'
import { Link } from '@inertiajs/react'
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
} from 'lucide-react'

export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="backdrop-blur-lg bg-black/50 shadow-lg px-4 py-2">
      <SidebarHeader className="border rounded-lg border-white/20 pb-4 shadow-lg bg-transparent">
        <div className="flex items-center gap-2 px-2">
          <span className="text-4xl font-semibold text-white/90 group-data-[collapsible=icon]:hidden">
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
                <SidebarMenuButton asChild className="text-xl">
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
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/time-entries">
                    <Clock />
                    <span>勤怠一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/leave-requests">
                    <Calendar />
                    <span>休暇申請</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
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
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/approvals">
                    <CheckCircle />
                    <span>承認一覧</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
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
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/companies">
                    <Building2 />
                    <span>会社</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/departments">
                    <FolderTree />
                    <span>部門</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/employments">
                    <Briefcase />
                    <span>雇用情報</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/roles">
                    <Shield />
                    <span>ロール</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/permissions">
                    <Key />
                    <span>権限</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/pay-items">
                    <Coins />
                    <span>賃金項目</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/masters/holidays">
                    <Calendar />
                    <span>休日</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-xl">
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
                <SidebarMenuButton asChild className="text-xl">
                  <Link href="/users">
                    <Users />
                    <span>ユーザー</span>
                  </Link>
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
