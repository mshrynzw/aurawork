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
import { Plus, Key } from 'lucide-react'

//TODO: 値は仮のまま
type Permission = {
  id: number
  key: string
  description: string | null
}

//TODO: 値は仮のまま
const permissions: Permission[] = [
  { id: 1, key: 'time.read', description: '勤怠情報の閲覧' },
  { id: 2, key: 'time.write', description: '勤怠情報の登録・編集' },
  { id: 3, key: 'leave.read', description: '休暇情報の閲覧' },
  { id: 4, key: 'leave.write', description: '休暇申請の作成' },
  { id: 5, key: 'pay.read', description: '給与情報の閲覧' },
  { id: 6, key: 'pay.write', description: '給与処理の実行' },
  { id: 7, key: 'approval.read', description: '承認情報の閲覧' },
  { id: 8, key: 'approval.write', description: '承認操作の実行' },
  { id: 9, key: 'master.read', description: 'マスタ情報の閲覧' },
  { id: 10, key: 'master.write', description: 'マスタ情報の編集' },
]

export default function PermissionsIndex() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                権限一覧
              </CardTitle>
              <CardDescription>登録されている権限の一覧</CardDescription>
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
                <TableHead>権限キー</TableHead>
                <TableHead>説明</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map(permission => (
                <TableRow key={permission.id}>
                  <TableCell className="font-mono">{permission.key}</TableCell>
                  <TableCell>{permission.description || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/permissions/${permission.id}/edit`}>編集</Link>
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
(PermissionsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="権限マスタ">{page}</Layout>
)

