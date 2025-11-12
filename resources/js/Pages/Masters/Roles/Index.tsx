import React from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import { Button } from '@/Components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Plus, Shield } from 'lucide-react'

//TODO: 値は仮のまま
type Role = {
  id: number
  company_id: number
  slug: string
  name: string
  description: string | null
}

//TODO: 値は仮のまま
const roles: Role[] = [
  {
    id: 1,
    company_id: 1,
    slug: 'admin',
    name: '管理者',
    description: 'システム全体の管理権限',
  },
  {
    id: 2,
    company_id: 1,
    slug: 'manager',
    name: 'マネージャー',
    description: '部門の管理権限',
  },
  {
    id: 3,
    company_id: 1,
    slug: 'employee',
    name: '一般社員',
    description: '基本的な操作権限',
  },
]

export default function RolesIndex() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                ロール一覧
              </CardTitle>
              <CardDescription>登録されているロールの一覧</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規登録
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>識別子</TableHead>
                <TableHead>ロール名</TableHead>
                <TableHead>説明</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell className="font-mono">{role.slug}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/roles/${role.id}/edit`}>編集</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
;(RolesIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="ロールマスタ">{page}</Layout>
)
