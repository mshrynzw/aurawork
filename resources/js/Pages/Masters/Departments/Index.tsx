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
import { Plus, FolderTree } from 'lucide-react'
import type { Department } from '@/schemas'

//TODO: 値は仮のまま

//TODO: 値は仮のまま
const departments: Department[] = [
  {
    id: 1,
    company_id: 1,
    name: '営業部',
    code: 'SALES',
    parent_id: null,
    parent_name: null,
  },
  {
    id: 2,
    company_id: 1,
    name: '営業一課',
    code: 'SALES-1',
    parent_id: 1,
    parent_name: '営業部',
  },
  {
    id: 3,
    company_id: 1,
    name: '開発部',
    code: 'DEV',
    parent_id: null,
    parent_name: null,
  },
]

export default function DepartmentsIndex() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                部門一覧
              </CardTitle>
              <CardDescription>登録されている部門の一覧</CardDescription>
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
                <TableHead>部門コード</TableHead>
                <TableHead>部門名</TableHead>
                <TableHead>親部門</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map(department => (
                <TableRow key={department.id}>
                  <TableCell className="font-mono">{department.code}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.parent_name || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/departments/${department.id}/edit`}>編集</Link>
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
;(
  DepartmentsIndex as React.ComponentType<Record<string, never>> & {
    layout?: (page: React.ReactNode) => React.ReactNode
  }
).layout = (page: React.ReactNode) => <Layout title="部門マスタ">{page}</Layout>
